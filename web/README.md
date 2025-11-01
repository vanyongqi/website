# Web 项目

基于 React + TypeScript + Vite + shadcn/ui 的前端项目。

## 技术栈

- **React 19** - UI 框架
- **TypeScript** - 类型安全
- **Vite** - 构建工具
- **Tailwind CSS** - 样式框架
- **shadcn/ui** - UI 组件库
- **React Router** - 路由管理
- **Framer Motion** - 动画库
- **Sonner** - Toast 通知

## 安装依赖

```bash
npm install
```

## 开发

```bash
npm run dev
```

## 构建

```bash
npm run build
```

## 预览生产构建

```bash
npm run preview
```

## 项目结构

```
web/
├── src/
│   ├── components/      # 组件目录
│   │   ├── ui/         # shadcn/ui 组件
│   │   └── layout/     # 布局组件
│   ├── pages/          # 页面组件
│   ├── lib/            # 工具函数
│   ├── hooks/          # 自定义 Hooks
│   ├── routes/         # 路由配置
│   └── ...
├── public/             # 静态资源
└── ...
```

## 添加 shadcn/ui 组件

使用 shadcn/ui CLI 添加组件：

```bash
npx shadcn@latest add [component-name]
```

例如：
```bash
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add input
```

## 下一步

