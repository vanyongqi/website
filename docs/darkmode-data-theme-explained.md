# 深色模式主题切换原理与实战（data-theme属性 × CSS）

---

## 目录

1. 什么是 `data-theme`
2. `document.documentElement`、`setAttribute`、`removeAttribute`作用
3. CSS 如何自动切换主题
4. 和 className 的对比
5. 完整实战例子
6. 扩展玩法
7. 结论

---

## 1. 什么是 `data-theme`

- `data-theme` 是 HTML 原生规定的“自定义属性”之一，用于**标记页面状态**最常见（如主题、语言等）。
- 用法：给任意标签加 `data-theme="dark"`，最常用于 `<html>` 标签。
- 不属于 React/Vue 专属，任何 JS 框架都适用！

---

## 2. `document.documentElement` 与 `setAttribute`/`removeAttribute`

- `document.documentElement` 就是整个页面的 `<html>` 标签。
- `setAttribute('data-theme', 'dark')` 向 `<html>` 标签动态添加 `data-theme="dark"`
- `removeAttribute('data-theme')` 会把 `<html>` 上的这种属性移除

### 代码核心如下：

```js
// 切换为深色
document.documentElement.setAttribute('data-theme', 'dark')
// 恢复为亮色
document.documentElement.removeAttribute('data-theme')
```

---

## 3. CSS 如何联动切换主题

- 你在 CSS 里写：
  ```css
  [data-theme="dark"] body {
    background: #181825; color: #fff;
  }
  [data-theme="dark"] .sidebar {
    background: #232335;
  }
  ```
- 只要 `<html data-theme="dark">`，所有以 `[data-theme="dark"]` 开头的样式规则会自动生效
- 一旦属性被移除，页面用回默认/亮色主题规则

---

## 4. 为什么不用 className 而用 data-theme

- data-属性本意是做扩展状态通用性很强，不会污染样式类（class）
- 权重高，不担心和现有组件样式冲突
- 易维护，易扩展主题（当然你用 class 也完全OK，只是 data-theme 更通用、一目了然）

---

## 5. 完整实战例子

### React Hooks 结合切换
```jsx
const [isDark, setIsDark] = useState(false)
const toggleDarkMode = () => {
  setIsDark(d => {
    if (!d) {
      document.documentElement.setAttribute('data-theme', 'dark')
    } else {
      document.documentElement.removeAttribute('data-theme')
    }
    return !d
  })
}
```

### 原生 JS/HTML 按钮
```html
<button onclick="document.documentElement.setAttribute('data-theme', 'dark')">夜间模式</button>
<button onclick="document.documentElement.removeAttribute('data-theme')">日间模式</button>
```

### CSS
```css
[data-theme="dark"] body { background: #1a1a24; color: #fff; }
[data-theme="dark"] .card { background: #22223b; border: none;}
```

---

## 6. 扩展玩法技巧

- 可扩展多主题：
  - `<html data-theme="blue">`
  - CSS: `[data-theme="blue"] body { ... }`
- 可记录到 localStorage，刷新自动回忆用户偏好
- 用 JS 动态切主题，只需一行，所有组件页面同步切换

---

## 7. 结论

- 加 data-theme 属性是现代前端项目多主题切换的最主流方式。
- 只需1-2行代码配合一份主题化 CSS，即可实现全站切换，不论你用 React, Vue 还是其它框架。
- 极其适合团队协作、组件封装、长期扩展和维护！

---

**如需深入机制，或多主题、动画切换、状态持久化方案，欢迎继续追问！**