# Day 1 笔记（React + Go + Nginx + Docker Compose 方案）

## 今天完成了什么
- **项目骨架搭建**
  - 前端：React + Vite + TypeScript，简化为“轻路由版”（保留 React Router）
  - 后端：Go + Gin + GORM（MySQL）+ Viper + Zap
  - 部署：Nginx 配置与 Docker Compose 编排文件（暂未使用，环境不兼容）
  - 配置：采用 `confyg.yaml` + `confyg.dev.yaml`，支持环境变量覆盖

- **前端最小功能**
  - 首页 `/`：静态内容
  - 登录 `/login`：原生 `<form>` + `useState` 控制输入
  - 顶部导航与“Ping API”按钮（`fetch('/api/v1/ping')` 测试后端连通）

- **后端最小功能**
  - `GET /healthz`：健康检查
  - `GET /api/v1/ping`：返回 `{"message":"pong"}`
  - 配置加载：`CONFIG_PATH` 指向 `confyg.yaml`，`APP_*` 环境变量可覆盖
  - MySQL 连接：已指向本地 `127.0.0.1:3306`，当前使用系统库 `mysql`（确保先能跑）

- **本地运行**
  - 后端已启动：监听 `:8080`
  - 前端已启动：`http://localhost:5173`
  - 前端可通过按钮调用后端 `/api/v1/ping`

## 目录结构（简述）
- **/web**：前端（Vite + React + Router）
- **/api**：后端（Gin + GORM + 配置/日志/路由/中间件）
- **/deploy**：`docker-compose.yml`、`nginx.conf`、`confyg.yaml`、`.env`

## 可视化验证
- **前端**：访问 http://localhost:5173  
  - 顶部导航可切换 首页/登录  
  - 点击 “Ping API” 按钮，弹出 `Ping: pong`
- **后端**：
  - http://localhost:8080/healthz → `{"status":"ok"}`
  - http://localhost:8080/api/v1/ping → `{"message":"pong"}`

## 暂未完成/待办
- **数据库业务表**：尚未创建业务库与表（建议创建 `appdb`，并添加自动迁移示例 `users`）
- **鉴权**：未实现 JWT 登录/刷新逻辑
- **API 文档**：未生成 OpenAPI/Swagger
- **Compose 启动**：本机 Docker Compose 插件不兼容，未启用一键多容器
- **CI/CD**：未配置流水线
- **前端 UI 库**：为了易学，暂未引入 UI 组件库（后续可添加 Ant Design）

## 今天的关键收获
- **最小闭环**：前端按钮 → 后端 API → 浏览器反馈
- **结构清晰**：前后端目录分层、配置集中管理、Nginx 思路清楚
- **学习友好**：前端用最少依赖，聚焦 React 基础（组件/状态/路由/请求）

## 建议的下一步（Day 2）
- **数据库侧**
  - 在本地 MySQL 创建 `appdb`
  - 将后端 DSN 切换到 `appdb`，添加 `users` 表的自动迁移与简单 CRUD
- **前端学习**
  - 在首页加计数器（练 `useState`）
  - 在登录页做基础校验与“模拟登录”请求/响应处理
- **工具化**
  - 选择 UI 库（如 Ant Design），按需逐步引入
  - 视情况修复/安装 Docker Compose，以便一键多容器启动
