# Day 3 - 抽离通用布局组件（TopBanner/Sidebar/TopHeader）

## 日期
2024-12-19

## 背景与目标
首页原本由 `App.tsx` 同时承担“全站框架（横幅/顶部导航/侧栏）+ 路由 + 页面内容容器”的职责，代码集中在一个文件中：
- 结构较重，不利于阅读与维护
- 无法直观表达“哪些是全站复用的框架元素，哪些是页面内容”
- 未来新增页面（或首页下拉切换至另一个页面）时，复用这些框架元素会变得别扭

因此，将“可复用的框架组件”从 `App.tsx` 中抽离出来，形成独立的、可被多页面复用的布局层组件。

## 具体改动

### 新增布局组件（可复用）
- `web/src/components/layout/TopBanner.tsx`：顶部广告横幅（sticky，位于最顶层）
- `web/src/components/layout/Sidebar.tsx`：左侧功能栏（折叠/菜单/底部操作）
- `web/src/components/layout/TopHeader.tsx`：顶部导航与搜索区（含暗色切换、购物车/用户/测试API 按钮）

### 更新引用位置
- `web/src/App.tsx`
  - 移除内联的横幅、侧栏、顶部导航 JSX
  - 改为引入上述三个组件，并保留：
    - 全局状态（暗色模式、侧栏折叠、移动端抽屉）
    - 路由容器（`<Routes>`）与移动端 `<Drawer>`

## 为什么要放到 components/layout（而不是 pages/Home）
- 这些元素属于“全站框架（骨架）”，并不依赖某个特定业务页面
- 未来即便首页有“下拉刷到另一个页面”的交互，也能直接复用这些框架组件
- 避免把复用组件放到 page 目录，造成“看起来是某页专属”的误解

## 收益
- 职责清晰：页面框架 vs 业务页面内容 分离
- 可复用性：后续页面直接复用 `TopBanner/Sidebar/TopHeader`
- 可维护性：`App.tsx` 更精简，阅读与定位逻辑更容易
- 可扩展性：为后续多页面/子应用/更多布局变化做好准备
- 便于测试：独立组件可单测/可视化调试更方便

## 变更文件清单（核心）
- 新增
  - `web/src/components/layout/TopBanner.tsx`
  - `web/src/components/layout/Sidebar.tsx`
  - `web/src/components/layout/TopHeader.tsx`
- 修改
  - `web/src/App.tsx`（替换为引用上述组件）

## 下一步建议
- 提取 `Header` 和 `Sidebar` 的菜单/按钮配置到独立配置文件，减少硬编码
- 根据路由动态高亮 `Sidebar` 的选中项
- 为布局组件添加更细粒度的响应式断点与动画细节
