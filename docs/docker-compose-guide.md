# 项目 Docker 与 Docker Compose 使用指南

本文档汇总了本项目使用 Docker/Docker Compose 的启动步骤、常用命令、以及常见问题排查。请按章节逐步操作。

## 目录
- 1. 环境与目录结构
- 2. 一次性准备（建议）
- 3. 使用 Docker Compose 启动
- 4. 服务访问与验证
- 5. 停止与清理
- 6. 常见问题排查
- 7. 本地开发（不使用 Docker）

---

## 1. 环境与目录结构
- 操作系统：macOS（Docker Desktop）
- 主要目录：
  - `deploy/`：Compose 与部署配置
    - `deploy/docker-compose.yml`（后端本地联调用）
    - `deploy/nginx.conf`（仅作本地样例，生产不用 Compose 跑 Nginx）
    - `deploy/conf/`：后端配置文件（生产/本地/开发）
  - `api/`：后端（Go）
    - `api/Dockerfile`
  - `web/`：前端（Vite/Node）
    - `web/Dockerfile`

## 2. 一次性准备（建议）
- 安装 Docker Desktop，并确保可用。
- 如遇镜像拉取慢/失败，可调整 Docker 镜像源（Docker Desktop → Settings → Docker Engine）：
```json
{
  "experimental": false,
  "builder": { "gc": { "enabled": true, "defaultKeepStorage": "20GB" } },
  "registry-mirrors": [
    "https://docker.mirrors.sjtug.sjtu.edu.cn",
    "https://hub-mirror.c.163.com"
  ]
}
```
- 如果公司/本机走代理，请在 Docker Desktop → Settings → Resources → Proxies 中设置 HTTP/HTTPS 代理后重启。

- 预拉基础镜像（可选，但推荐验证网络）：
```bash
docker pull node:20-alpine
docker pull golang:1.23-alpine
docker pull gcr.io/distroless/base-debian12:latest
```
若 `gcr.io` 无法拉取，可将 `api` 运行镜像临时改为 `alpine:3.20`（见“常见问题排查”）。

- MySQL 版本与密码统一：
  - Compose 使用 `mysql:5.7`
  - 数据库密码统一为 `123456`
  - 配置文件统一：
    - `deploy/conf/confyg.yaml`：`app:123456@tcp(mysql:3306)/appdb`
    - `deploy/conf/confyg.dev.yaml`：`app:123456@tcp(localhost:3306)/appdb`
    - `deploy/conf/confyg.local.yaml`：`root:123456@tcp(127.0.0.1:3306)/appdb`
  - Compose 中已在 YAML 内联 MySQL 环境变量（无需 `.env`）。

## 3. 使用 Docker Compose 启动（本地后端联调）
- 进入 `deploy/` 目录执行：
```bash
cd deploy
# 前台构建并启动仅后端与数据库
docker compose up --build
# 或后台方式
# docker compose up --build -d
```
- 说明：
  - 该编排仅包含 `mysql:5.7` 与 `api` 服务，暴露 `http://localhost:8080`。
  - 生产环境不使用 Compose 跑前端/Nginx，前端由对象存储+CDN 或独立 Nginx 承载。

## 4. 服务访问与验证
- 后端健康检查（本地）：
```bash
curl -i http://localhost:8080/api/v1/ping
# 期望: HTTP/1.1 200 OK, {"message":"pong"}
```
- 查看运行状态与日志：
```bash
docker compose ps
docker compose logs -f api
docker compose logs -f mysql
```

## 5. 停止与清理
```bash
# 停止并移除容器（保留数据卷）
docker compose down

# 停止并删除数据卷（会清空 MySQL 数据）
docker compose down -v
```
- 从 MySQL 8.0 降至 5.7 时，若使用旧数据卷可能不兼容。需要清理卷后再启动：`docker compose down -v`。

## 6. 常见问题排查
- **镜像拉取失败/超时/404**：
  - 设置 Docker Desktop 代理（Settings → Resources → Proxies）
  - 或调整镜像源为较稳的 SJTUG、163（见“2. 一次性准备”）
  - 预拉镜像验证网络：
    ```bash
    docker pull node:20-alpine
    docker pull golang:1.23-alpine
    docker pull gcr.io/distroless/base-debian12:latest
    ```
  - 若 `gcr.io` 拉不动：
    - 修改 `api/Dockerfile` 运行阶段为：
      ```dockerfile
      FROM alpine:3.20
      WORKDIR /app
      COPY --from=builder /app/server /app/server
      ENV PORT=8080
      EXPOSE 8080
      ENTRYPOINT ["/app/server"]
      ```

- **前端页面/接口联调问题**：
  - 本地前端建议使用 `npm run dev`（Vite），并通过 Vite 代理将 `/api` 转发到 `http://localhost:8080`。
  - 如前端改为独立 Nginx 承载，请在该 Nginx 上配置 `/api/` 反代到后端，并确保 `proxy_pass http://127.0.0.1:8080;`（不带尾斜杠保留前缀）。

- **端口占用**：如本地 8080 被占用，可在 `deploy/docker-compose.yml` 的 `api.ports` 中改为 `"9090:8080"`，对应访问 `http://localhost:9090`。

- **Compose 顶部 `version` 警告**：
  - `version: "3.9"` 在新 Compose 规范中已弃用，可删除该行以消除警告（不影响功能）。

## 7. 本地开发（不使用 Docker）
- 后端（`api/`）：
```bash
cd api
export CONFIG_PATH="$(pwd)/../deploy/conf/confyg.dev.yaml"
go run ./cmd/server
# 后端监听 http://localhost:8080
```

- 前端（`web/`）：
```bash
cd web
# 推荐 Node 版本 18+（Node 20 最佳），可使用 nvm 安装与切换
# nvm install 20 && nvm use 20
npm install
npm run dev
# 前端默认 http://localhost:5173
```

- 前端联通后端的两种方式（二选一）：
  - 直接请求 `http://localhost:8080/api/...`
  - 在 `web` 的 Vite 代理中转发 `/api` 到 `http://localhost:8080`：
    ```ts
    // web/vite.config.ts（示例）
    export default {
      server: {
        proxy: {
          '/api': { target: 'http://localhost:8080', changeOrigin: true }
        }
      }
    }
    ```

## 8. Compose 命令速查与 --build 说明
- **为什么用 `--build`**
  - `docker compose up -d`：仅启动，默认不会重建镜像，可能使用旧镜像
  - `docker compose up --build -d`：启动前强制构建，确保镜像与当前代码一致
  - 适用场景：首次启动、修改了后端代码、`api/Dockerfile` 或依赖（go.mod）变化

- **分步执行**
  - 只构建：`docker compose build`（或 `--no-cache` 全量构建）
  - 只启动：`docker compose up -d`
  - 拉取预构建镜像（生产常用）：`docker compose pull && docker compose up -d`

- **v2 与 v1 命令对照**
  - v2 推荐：`docker compose ...`
  - v1 旧式：`docker-compose ...`
  - 指定文件：`-f deploy/docker-compose.yml`，或在 `deploy/` 目录直接运行省略 `-f`

- **常用命令**
  - 启动（前台/后台）：
    - `docker compose up --build`
    - `docker compose up --build -d`
  - 状态/日志：
    - `docker compose ps`
    - `docker compose logs -f api`
    - `docker compose logs -f mysql`
  - 健康检查：
    - `curl -i http://localhost:8080/api/v1/ping`
  - 停止/清理：
    - `docker compose down`
    - `docker compose down -v`（连同数据卷）

---
