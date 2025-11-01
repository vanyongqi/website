# 大公司标准上线方案（前后端分离、独立交付）

本指南总结企业常见最佳实践，适用于“前端静态+后端 API”完全解耦、独立构建与发布、可灰度回滚、可观测。

常见做法：前后端分离、独立上线

### 前端静态资源托管在 CDN/对象存储

源站用对象存储或独立 Nginx（或 OSS+CDN，如 Cloudflare R2+CF CDN、阿里OSS+CDN、七牛、又拍等）。

前端由 CI 构建产物 dist/，产物推送到对象存储或 Nginx 的静态目录，开启强缓存与版本化文件名。

域名独立：www.example.com 或 app.example.com。

### 后端服务独立部署

独立域名 api.example.com，通过网关/Ingress（Kubernetes）或 Nginx/Envoy 在后端侧做路由与限流。

运行方式：容器编排（K8s 最常见）或独立 VM + systemd。日志、监控、告警接入平台（ELK/EFK、Prometheus/Grafana、APM）。

数据库用托管服务（RDS/MySQL），应用仅持连接信息。

###  CI/CD 分离

前端 CI：安装 Node → 构建 → 产物扫描 → 上传到制品库/对象存储/CDN → 原子切换版本（蓝绿/回滚）。

后端 CI：构建镜像/二进制 → 安全扫描 → 发布到环境（K8s/VM）→ 蓝绿/金丝雀发布。

###  域与安全
全站 HTTPS，证书由 CDN 或入口（Nginx/Ingress）统一管理。

CORS 策略最小化放行：前端域名白名单而非 *。

静态资源强缓存（指纹文件名），HTML 较短缓存，API 不缓存或按需缓存。


### 灰度/回滚

前端：CDN 版本切换、双 Bucket 切换。

后端：蓝绿或金丝雀（按流量权重/用户分群）。


## 1. 总体架构与域名
- **前端域名**：`www.example.com` 或 `app.example.com`
- **后端域名**：`api.example.com`
- **拓扑**：
  - 前端：CI 产物 `web/dist/` → 对象存储/制品库 → CDN 分发（强缓存、指纹文件名）
  - 后端：CI 构建镜像/二进制 → 镜像仓库/制品库 → K8s/VM 发布 → Ingress/Nginx 对外暴露
  - 数据库：托管 RDS（备份、只读实例、审计）
- **安全**：全链路 HTTPS、严格 CORS 白名单、WAF 与限流/熔断

## 2. 前端交付
- **构建**（`web/`）：
```bash
npm ci
npm run build
# 产物：web/dist/
```
- **发布**（二选一或组合）：
  - 对象存储 + CDN（Cloudflare R2+CF CDN、阿里OSS+CDN、七牛等）
  - 独立 Nginx 作为源站（`/var/www/website` 同步 dist）
- **缓存策略**：
  - 指纹静态：`Cache-Control: public, max-age=31536000, immutable`
  - `index.html`：`no-cache` 或短缓存，保证快速切版本
- **灰度/回滚**：双目录/双 Bucket（`/releases/<version>/` 与 `/current` 原子切换），CDN 精细刷新

- **Nginx 源站示例（静态）**：
```nginx
server {
  listen 80;
  server_name www.example.com;
  root /var/www/website;
  index index.html;
  location ~* \.(js|css|png|jpg|jpeg|gif|svg|ico|woff2?)$ {
    expires 7d;
    add_header Cache-Control "public,immutable";
    try_files $uri =404;
  }
  location / { try_files $uri /index.html; }
}
```

## 3. 后端交付
- **镜像**：`api/Dockerfile` 多阶段（示例：builder=`golang:1.23-alpine`，runtime=`gcr.io/distroless/base-debian12`）
```bash
docker build -f api/Dockerfile -t registry.example.com/website/api:<version> .
docker push registry.example.com/website/api:<version>
```
- **部署**：
  - 优先 K8s（Deployment + Service + Ingress/Gateway），支持健康检查、滚动/蓝绿/金丝雀
  - 备选 VM + systemd（稳定但扩展性较弱）
- **入口**：Ingress/Nginx/Envoy 统一 TLS、HSTS、限流、熔断、Header 透传
- **探针**：Liveness/Readiness（例：`/healthz`）

- **K8s Ingress 示例**：
```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: website-api
  annotations:
    cert-manager.io/cluster-issuer: letsencrypt
spec:
  tls:
  - hosts: [api.example.com]
    secretName: api-tls
  rules:
  - host: api.example.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: website-api-svc
            port:
              number: 8080
```

## 4. 配置与密钥
- **生产配置**：ENV/ConfigMap 注入；**切勿**将密钥写入镜像/仓库
- **密钥**：K8s Secrets/云 KMS 托管
- **CORS**：`server.cors.allowOrigins` 精确到前端域名（生产环境不使用 `*`）
- **数据库**：RDS，连接串由 Secret 注入，连接池参数可观测可调

## 5. CI/CD 分离
- **前端流水线**：Checkout → Node 安装 → `npm ci` → `npm run build` → 产物扫描/体积分析 → 上传对象存储/制品库 → CDN 刷新/切版本/回滚
- **后端流水线**：Checkout → Go 构建 → 镜像构建 → SCA/CVE 扫描 → 推送镜像仓库 → 部署（K8s/VM）→ 健康检查 → 蓝绿/金丝雀
- **环境推进**：dev → staging → prod（含审批/变更单）

## 6. 可观测性与稳定性
- **日志**：结构化，集中到 ELK/EFK（索引与保留策略）
- **监控**：Prometheus + Grafana（QPS/延迟/错误率/DB 指标）
- **APM**：OpenTelemetry/Jaeger 链路追踪，慢查询分析
- **告警**：IM/On-call，多阈值，SLO/SLA 报表

## 7. 发布策略
- **前端**：CDN 版本切换、双目录/Bucket 回滚
- **后端**：
  - 滚动发布：逐批替换 Pods
  - 蓝绿：A/B 并存，入口切换
  - 金丝雀：按百分比/用户分群放量

## 8. 与当前仓库的落地建议
- `deploy/docker-compose.yml`：仅用于本地一体化联调（api+mysql）。生产不使用其中的 `nginx` 服务
- `deploy/nginx.conf`：作为本地样例；生产用独立 Nginx/Ingress
- `deploy/conf/`：区分 dev/staging/prod；生产 CORS 白名单仅前端正式域名
- 前端发布：新增脚本（打包→上传→CDN 刷新）；产物按版本目录保存以便回滚
- 后端发布：新增 `k8s/` 或 `systemd/` 模板与部署脚本；镜像标签使用 `<semver|git-sha>`

## 9. 本地开发建议
- 后端（`api/`）：
```bash
export CONFIG_PATH="$(pwd)/../deploy/conf/confyg.dev.yaml"
go run ./cmd/server  # 监听 :8080
```
- 前端（`web/`）：
```bash
npm ci
npm run dev  # http://localhost:5173
```
- Dev 联调：Vite 代理 `/api` → `http://localhost:8080`，或直接调用 `http://localhost:8080/api/...`

## 10. 运维要点 Checklist
- **HTTPS**：证书生命周期/自动续期（cert-manager/ACME）
- **CORS**：生产白名单最小化
- **Secrets**：不入库，集中托管
- **备份与回滚**：前端版本化、后端镜像回滚与数据库备份演练
- **观测**：日志聚合、指标监控、链路追踪、告警联动
- **容量与成本**：自动扩缩容、CDN 命中率、存储分层


