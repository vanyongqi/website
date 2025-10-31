# JSX 到底是什么？（React 小白友好指南）

## 1. JSX 是什么？
- JSX 读作“JavaScript XML”，是一种 React 的“超 HTML”写法。
- 用处：让你可以像写 HTML 一样描述界面，还能插 JS 变量、组件、条件、循环等。

## 2. JSX 和 JS 怎么结合？
- 任何 HTML 标签内部，你都能用`{}`花括号插入 JS 变量/表达式：
  ```jsx
  <div>
    <h1>{user.nick}</h1>
    <p>下一个数：{count+1}</p>
  </div>
  ```
- 可以用三元判断、数学运算、字符串拼接等：
  ```jsx
  <span>{age > 18 ? '成人' : '未成年'}</span>
  ```

## 3. JSX 里的判断/循环
- **判断**：推荐用三元运算符
  ```jsx
  {isLogin ? <LogoutBtn /> : <LoginBtn />}
  ```
- **循环**：推荐用数组 map
  ```jsx
  <ul>
    {list.map(item => <li key={item.id}>{item.name}</li>)}
  </ul>
  ```

## 4. 常见陷阱与和HTML的不一样
- `class` 变 `className`：JSX 里 class 是保留字
- 返回内容只能是**一个根元素**（用 div 或 <>包）
  ```jsx
  return <>
    <Header />
    <Content />
  </>
  ```
- 自定义组件首字母要大写（小写会当html标签）
- 注释必须写成 `{/* 注释内容 */}` 不能 <!-- -->

## 5. 支持组件嵌套和积木组合
- 任何 <MyComponent /> 都可以像标签一样随便用
- 可无限嵌套组合，页面怎么拆都自由

## 6. JSX 是怎么变成 JS 的？
- JSX **开发时写的是“类HTML”**，但 webpack/Babel 打包时自动变成
  ```js
  React.createElement('div', null, 
    React.createElement('h1', null, user.nick)
  )
  ```
- 所以浏览器不用担心不支持，这一步是“编译时”完成的

## 7. 总结
> JSX = “像 HTML/积木一样描述UI” + “可以插入任意 JS 逻辑和组件”，是 React 高效开发的灵魂武器。只要弄懂 JSX，React 页面就变得又稳又爽！
