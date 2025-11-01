# 快速开始指南

## 第一步：安装依赖

```bash
cd web
npm install
```

这将安装所有必要的依赖包，包括：
- React 和 React DOM
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui 相关的组件库
- React Router
- Framer Motion
- Sonner

## 第二步：启动开发服务器

```bash
npm run dev
```

然后在浏览器中打开显示的本地地址（通常是 http://localhost:5173）

## 第三步：添加 shadcn/ui 组件

当需要添加 UI 组件时，使用以下命令：

```bash
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add input
npx shadcn@latest add avatar
npx shadcn@latest add badge
# ... 等等
```

## 项目结构说明

```
web/
├── src/
│   ├── components/
│   │   ├── ui/          # shadcn/ui 组件存放位置
│   │   └── layout/      # 布局组件（Header, Sidebar, Footer 等）
│   ├── pages/           # 页面组件
│   ├── lib/             # 工具函数（utils.ts 已创建）
│   ├── hooks/           # 自定义 React Hooks
│   └── routes/          # 路由配置（可选）
├── public/              # 静态资源
├── tailwind.config.js   # Tailwind 配置
├── components.json      # shadcn/ui 配置
└── vite.config.ts       # Vite 配置（已配置路径别名 @/*）
```

## 下一步：开始复制 liblib.art

1. 分析网站结构和设计
2. 添加需要的 shadcn/ui 组件
3. 创建布局组件
4. 逐步实现各个页面和功能

祝开发顺利！🎉
