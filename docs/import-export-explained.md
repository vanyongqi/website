# JS/TS 的 import/export 到底怎么用（超级小白问答版）

## 1. 什么能被 export？
你 export 的可以是：变量、函数、常量、类、数组、对象、组件……总之只要能用 JS/TS 声明的“一个东西”都可以。

```js
export const foo = 123; // 导出变量
export function bar() {} // 导出函数
export class Baz {}
export default '主角';
```

---

## 2. default 导出 vs 命名导出

- **default 导出**（每个文件只能有1个）：
  ```js
  export default function App() {}
  // 或
  export default App;
  ```
  - 导入时不用花括号，名字随你（建议一致）：
    ```js
    import App from './App'
    import AnyNameYouLike from './App'  // 这样也能行
    ```

- **命名导出**（每个文件任意多个）：
  ```js
  export function Sidebar() {}
  export const a = 1;
  export class Car {}
  ```
  - 导入时必须花括号，名字要对得上：
    ```js
    import { Sidebar, a, Car } from './App'
    ```

---

## 3. 可以混用吗？
可以！如下：
```js
export default function App() {}
export const a = 1;
export function foo() {}
// 使用：
import App, { a, foo } from './App'
```

---

## 4. 变量/函数/类/组件都能导出导入吗？
是的！只要 export 出去的，无论本质是什么，import 花括号里名字写对，就能“引进来用”。

## 5. 实战例子
### sidebar.js
```js
export function Sidebar() { /*...*/ }
export const USER_LEVEL = 1;
export class MyClass {}
```
### 用法：
```js
import { Sidebar, USER_LEVEL, MyClass } from './sidebar'
```

---

## 6. 问答总结

- export default 只能有一个，import 不用花括号，名字随你。
- export xxx/const/let/function/class 可以很多个，import 时要花括号名字对。
- 导出的内容到底是变量、函数、数组、对象、组件、类都行，import 用花括号捞出来就能用。
- 推荐习惯：
  - 页面、业务主角用 export default
  - 工具/常量/多个组件用命名导出

---

## 总结口诀
> “主角用 default，配角命名导；数值函数都可导，引入按名跑！”

这下再看 import/export 就不会发愁啦！

---

# React useState 小白完全指南

## 1. 什么是 useState？
- useState 是 React 给你用来在函数组件里“存数据+自动刷新页面”的工具。只要是【页面显示要跟着它变】的数据都用它。
- 来自：import { useState } from 'react'

## 2. 基本用法和原理
```jsx
const [变量, 设置函数] = useState(初始值)
// 实际上 useState 返回的是一个包含两个元素的数组：
// 第1个是你当前的状态变量（名字你随意）
// 第2个是专门设置状态和值并刷新页面的函数（名字也随你）
// 比如：
const [count, setCount] = useState(0) // [0, function]
const [open, updateOpen] = useState(false) // [false, function]
// 但大家习惯约定用 setXXX 这种风格写变量
```
- setXXX 并不是固定的命名，和变量叫什么没绝对关系，只是常用写法。
- 建议名字相关、有意义，好维护。

## 3. 例子：点击计数器
```jsx
const [count, setCount] = useState(0)
// 也可以 const [lala, changeLala] = useState(0)
return (
  <div>
    <p>你点了 {count} 次</p>
    <button onClick={() => setCount(count + 1)}>点我加一</button>
    <button onClick={() => changeLala(100)}>也能这样用</button>
  </div>
)
// 重点：一定要用 useState “第二个”函数去改状态，页面才会刷新
```

## 4. 多个状态没问题
```jsx
const [open, setOpen] = useState(false)
const [name, setName] = useState('小明')
const [theme, setTheme] = useState({ color: 'blue' })
// 独立互不影响！
```

## 5. 别用 let/var 直接声明页面动态变量
普通 let/var 的数据变了页面不会自动刷新。
用 useState “声明状态”，页面才会变：
```js
let x = 1 // 页面不监听
const [y, setY] = useState(1) // y 改了页面才会跟着动
```

## 6. 易错点
- useState 返回的是**[变量, 改变量函数] 的数组**，名字随你，一般写 "setXXX" （但不强制）。
- **一定用 setXXX（或你定义的那个设置函数）改（别直接 y = 2）**
- 每次 setXXX 都会刷新 UI
- 可以传函数进去 setXXX(old => old+1)（防止异步问题）
- **如果直接改变量本身，页面不自动刷新！**

## 7. 口诀总结
> 用 useState，UI才能动；变量随意改，不刷页面空！

让你写所有 “会变、要刷UI的变量” 都会用！

---

# 前后端接口文档/接口格式约定说明

## 为什么必须“前后端一起定接口”？
- 如果不约定，后端返回的数据格式千奇百怪，前端根本无法知道里面的字段名、层级、数组结构，也没法写对代码。
- 只有明确接口格式（字段、结构、类型、枚举值等），前端才能放心拿数据——比如 data.xxx，data.list，data.user.name。
- 一旦谁临时改了字段名，另一个就必然出 bug，查起来超级麻烦。


## 没接口约定会发生什么？
- 前后端都不知道“变量”叫什么，拼错名字 UI 就拿不到内容
- 一但后端调整字段，前端全挂掉还不知道哪里错
- 项目多人大协作会推卸皮球，极度损耗效率

## 接口文档是干啥的？
- 明确每个接口的：
  - 路径（URL）
  - 请求方式（GET/POST/PUT...）
  - 请求参数（参数名/类型/是否必传/含义）
  - 响应结果（最重要，**字段名、类型、说明**）
- 常见工具：markdown写、postman、swagger（OpenAPI）、yapi、showdoc 等

## 一个接口文档示例
```markdown
### GET /api/v1/user/info
- 请求参数：token(string, header，必传)
- 响应：
{
  "code": 0,
  "msg": "OK",
  "user": {
    "id": 123,
    "username": "abc",
    "roles": ["admin", "user"],
    "profile": {
      "nickname": "张三",
      "avatar": "http://xx.png"
    }
  }
}
// 字段说明：
// code: 0表示成功，其它表示错误码，msg: 描述，user: 用户详情
```

## 总结
“前端要吃啥，后端就按食谱做啥；一起定好菜单，不然菜来了都不敢下口！”
> 接口文档就是“食谱/说明书”，前后端合作的必备工具。
