# 代码销售网站实现规划

## 参考网站分析

参考：[Liblib.art](https://www.liblib.art/inspiration) - 一个代码/作品展示和销售平台

### 核心功能需求

1. **代码展示**
   - 代码预览（支持语法高亮）
   - 代码分类和标签
   - 搜索结果
   - 代码详情页

2. **用户系统**
   - 用户注册/登录
   - 个人中心
   - 购买历史
   - 上传代码

3. **交易系统**
   - 购物车
   - 支付集成
   - 订单管理
   - 代码下载

4. **内容管理**
   - 代码上传
   - 代码编辑
   - 定价管理
   - 状态管理（上架/下架）

## 技术栈分析

### 当前技术栈
- ✅ **前端**：React + TypeScript + Vite + React Router
- ✅ **后端**：Go + Gin + GORM + MySQL
- ✅ **部署**：Docker + Nginx

### 需要添加的技术

1. **前端增强**
   - UI 组件库：Ant Design 或 Tailwind CSS
   - 代码高亮：Prism.js 或 highlight.js
   - 状态管理：Zustand 或 Redux（可选）
   - 文件上传：react-dropzone

2. **后端增强**
   - JWT 认证（已有配置，需实现）
   - 文件存储：本地存储或 OSS（阿里云/腾讯云）
   - 支付集成：Stripe、PayPal 或国内支付（微信/支付宝）
   - 代码存储：Git 仓库或文件系统

3. **数据库设计**
   - 用户表（users）
   - 代码表（code_items）
   - 订单表（orders）
   - 购物车表（cart_items）
   - 分类表（categories）

## 数据库设计

### 核心表结构

```sql
-- 用户表
CREATE TABLE users (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  avatar_url VARCHAR(255),
  role ENUM('user', 'admin') DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 代码表
CREATE TABLE code_items (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  user_id BIGINT NOT NULL,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  content TEXT NOT NULL,
  language VARCHAR(50) NOT NULL,
  category_id BIGINT,
  price DECIMAL(10, 2) DEFAULT 0,
  preview_image VARCHAR(255),
  file_path VARCHAR(255),
  status ENUM('draft', 'published', 'sold_out') DEFAULT 'draft',
  view_count INT DEFAULT 0,
  purchase_count INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (category_id) REFERENCES categories(id),
  INDEX idx_category (category_id),
  INDEX idx_status (status),
  FULLTEXT INDEX idx_search (title, description)
);

-- 分类表
CREATE TABLE categories (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL,
  slug VARCHAR(50) UNIQUE NOT NULL,
  parent_id BIGINT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 订单表
CREATE TABLE orders (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  user_id BIGINT NOT NULL,
  total_amount DECIMAL(10, 2) NOT NULL,
  status ENUM('pending', 'paid', 'cancelled', 'refunded') DEFAULT 'pending',
  payment_method VARCHAR(50),
  transaction_id VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- 订单项表
CREATE TABLE order_items (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  order_id BIGINT NOT NULL,
  code_item_id BIGINT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  FOREIGN KEY (order_id) REFERENCES orders(id),
  FOREIGN KEY (code_item_id) REFERENCES code_items(id)
);

-- 购物车表
CREATE TABLE cart_items (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  user_id BIGINT NOT NULL,
  code_item_id BIGINT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (code_item_id) REFERENCES code_items(id),
  UNIQUE KEY unique_cart_item (user_id, code_item_id)
);
```

## 功能模块拆分

### Phase 1: 基础功能（1-2周）

#### 前端
- [ ] 安装 UI 组件库（Ant Design）
- [ ] 代码列表页面（首页改造）
- [ ] 代码详情页面
- [ ] 用户注册/登录页面
- [ ] 基础路由配置

#### 后端
- [ ] 用户注册/登录 API（JWT 实现）
- [ ] 代码列表 API（分页、搜索、筛选）
- [ ] 代码详情 API
- [ ] 用户认证中间件

### Phase 2: 核心功能（2-3周）

#### 前端
- [ ] 代码上传页面
- [ ] 购物车功能
- [ ] 个人中心
- [ ] 代码语法高亮显示

#### 后端
- [ ] 代码上传 API（文件存储）
- [ ] 购物车 API（添加、删除、清空）
- [ ] 订单创建 API
- [ ] 文件存储系统

### Phase 3: 支付功能（1-2周）

#### 前端
- [ ] 支付页面
- [ ] 订单列表
- [ ] 代码下载功能

#### 后端
- [ ] 支付集成（Stripe/PayPal/微信支付）
- [ ] 订单支付回调
- [ ] 代码下载权限验证
- [ ] 支付状态更新

### Phase 4: 高级功能（1-2周）

#### 功能
- [ ] 代码搜索（全文搜索）
- [ ] 代码分类和标签
- [ ] 评价系统
- [ ] 代码预览（在线编辑器）
- [ ] 管理员后台

## 实现步骤（详细）

### Step 1: 环境准备

```bash
# 1. 安装前端依赖
cd web
npm install antd axios react-syntax-highlighter

# 2. 创建数据库
mysql -u root -p
CREATE DATABASE appdb CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE appdb;
# 执行上面的 SQL 建表语句
```

### Step 2: 后端 API 开发

#### 2.1 用户认证

**文件：`api/internal/handler/auth.go`**
```go
package handler

import (
    "net/http"
    "github.com/gin-gonic/gin"
)

// 注册
func Register(c *gin.Context) {
    // TODO: 实现用户注册逻辑
}

// 登录
func Login(c *gin.Context) {
    // TODO: 实现 JWT 登录逻辑
}

// 获取当前用户信息
func GetCurrentUser(c *gin.Context) {
    // TODO: 从 JWT 中提取用户信息
}
```

#### 2.2 代码管理

**文件：`api/internal/handler/code.go`**
```go
package handler

// 获取代码列表
func ListCodes(c *gin.Context) {
    // TODO: 分页、搜索、筛选
}

// 获取代码详情
func GetCode(c *gin.Context) {
    // TODO: 根据 ID 获取代码详情
}

// 创建代码（上传）
func CreateCode(c *gin.Context) {
    // TODO: 文件上传、保存到数据库
}
```

### Step 3: 前端页面开发

#### 3.1 代码列表页面

**文件：`web/src/pages/CodeList.tsx`**
```tsx
import { useState, useEffect } from 'react'
import { Card, Row, Col, Pagination, Input } from 'antd'

export default function CodeList() {
  const [codes, setCodes] = useState([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)

  useEffect(() => {
    fetchCodes()
  }, [page])

  const fetchCodes = async () => {
    setLoading(true)
    // TODO: 调用后端 API
    setLoading(false)
  }

  return (
    <div>
      <Input.Search placeholder="搜索代码..." />
      <Row gutter={16}>
        {codes.map(code => (
          <Col span={8} key={code.id}>
            <Card title={code.title}>
              <p>{code.description}</p>
              <p>价格: ¥{code.price}</p>
            </Card>
          </Col>
        ))}
      </Row>
      <Pagination current={page} onChange={setPage} />
    </div>
  )
}
```

#### 3.2 代码详情页面

**文件：`web/src/pages/CodeDetail.tsx`**
```tsx
import { useParams } from 'react-router-dom'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'

export default function CodeDetail() {
  const { id } = useParams()
  // TODO: 获取代码详情并显示
  // TODO: 语法高亮显示代码
  // TODO: 购买按钮
}
```

## 推荐的技术选择

### UI 组件库选择

**Ant Design**（推荐）
- ✅ 组件丰富
- ✅ 文档完善
- ✅ 中文支持好
- ✅ 企业级应用常用

安装：
```bash
npm install antd
```

### 代码高亮

**react-syntax-highlighter**（推荐）
- ✅ 支持多种语言
- ✅ 主题丰富
- ✅ React 集成简单

安装：
```bash
npm install react-syntax-highlighter @types/react-syntax-highlighter
```

### 文件上传

**react-dropzone**
- ✅ 拖拽上传
- ✅ 文件预览
- ✅ 进度显示

### 支付集成

**国内推荐：**
- 微信支付
- 支付宝

**国际推荐：**
- Stripe（国际信用卡）
- PayPal

## 注意事项

### 安全性
- ✅ 用户密码加密存储（bcrypt）
- ✅ JWT token 过期时间设置
- ✅ 文件上传类型和大小限制
- ✅ SQL 注入防护（使用 GORM）
- ✅ XSS 防护（React 自动转义）

### 性能优化
- ✅ 代码列表分页加载
- ✅ 图片懒加载
- ✅ 代码内容压缩存储
- ✅ 缓存策略（Redis，可选）

### 法律合规
- ✅ 用户协议和隐私政策
- ✅ 版权声明
- ✅ 发票开具（如需）

## 快速开始清单

### 第 1 天：基础设置
- [ ] 创建数据库表
- [ ] 安装 Ant Design
- [ ] 配置后端路由

### 第 2-3 天：用户系统
- [ ] 实现用户注册/登录
- [ ] 前端登录页面
- [ ] JWT 认证中间件

### 第 4-5 天：代码展示
- [ ] 代码列表 API
- [ ] 代码列表页面
- [ ] 代码详情页面

### 第 6-7 天：代码上传
- [ ] 文件上传功能
- [ ] 代码创建 API
- [ ] 上传页面

## 参考资源

- [Ant Design 文档](https://ant.design/docs/react/introduce-cn)
- [React Syntax Highlighter](https://react-syntax-highlighter.github.io/react-syntax-highlighter/)
- [Gin 框架文档](https://gin-gonic.com/docs/)
- [GORM 文档](https://gorm.io/docs/)
- [JWT 认证示例](https://github.com/gin-gonic/gin#using-middleware)

## 总结

基于你现有的技术栈，可以快速构建一个代码销售网站：

1. **技术栈匹配**：React + Go 完全满足需求
2. **增量开发**：在现有基础上逐步添加功能
3. **成本可控**：使用开源技术，无需购买额外服务（支付除外）

**建议优先实现的功能顺序：**
1. 用户系统（注册/登录）
2. 代码展示（列表/详情）
3. 代码上传
4. 购物车和支付
5. 高级功能（搜索、分类等）

开始实施后，我们可以逐步完善每个功能模块！

