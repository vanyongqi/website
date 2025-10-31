# JS/TS 的 export default 与命名导出傻瓜说明

前端工程师最常见的导出写法有两种：

## 1. 默认导出（Default Export）
- 形式：每个文件只能有一个。
- 写法：`export default xxx`（xxx 可以是函数、组件、对象等）
- 导入时不用花括号，名字可自取（但建议和导出对应）

#### 例子（App.tsx）
```tsx
// 导出
export default function App() {
  return <div>主入口</div>
}

// 导入
import App from './App'     // 推荐
import Whatever from './App' // 这样也行
```

## 2. 命名导出（Named Export）
- 形式：每个文件可以有很多个。
- 写法：`export xxx` 或 `export const xxx = ...` 或 `export function xxx() {}`
- 导入时必须写花括号，名字要和导出时一致

#### 例子（Sidebar.tsx）
```tsx
// 导出
export function Sidebar() {
  return <aside>侧边栏</aside>
}
export const USER_LEVEL = 1
export class MyClass {}

// 导入
import { Sidebar, USER_LEVEL, MyClass } from './Sidebar'
```

## 3. 可以混用吗？
可以，一般一个文件有一个主角用 default，配角用命名导出：
```tsx
export default App
export function Sidebar() {}
export const a = 1
// 导入：
import App, { Sidebar, a } from './App'
```

## 总结口诀
- “主角”用 default，一个文件最多一个
- “配角”都叫命名导出，可以一堆
- 默认导入不加花括号，命名导入要花括号
- 导入命名要和导出一致，默认导入名字随你

## 推荐习惯
- 页面（入口组件）一般用 default：export default function App() {}
- 工具函数、常量、多个组件建议用命名导出

让你一眼看懂，不迷糊！
