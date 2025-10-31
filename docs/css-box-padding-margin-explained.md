# CSS 盒模型（box model）与常见布局参数简明指南

---

## padding vs margin 到底有啥区别？

- **padding（内边距）**
  - “内容和盒子自己边的距离”，就像快递盒子里的泡沫垫，是内容和盒壁之间的空隙。
  - 作用：防止内容紧贴盒子边，看起来更美观/易读。

- **margin（外边距）**
  - “整个盒子和外面其它盒子的距离”，就像桌上两个饭盒之间的空隙，是盒子与盒子之间的隔离带。
  - 作用：让元素与其它元素间有间隔、不会挤一起。

**图形小比喻：**
```
|<- margin ->|<-padding->| 内容 |
-----------------------------------
|             盒子内容            |
-----------------------------------
|<------- 整个盒子（含padding） ------>|
^
外部空隙 (margin)
内部空隙 (padding)
```

---
## 其它常用 CSS 布局/美化参数一览

- `width`/`height`   — 宽度和高度，决定盒子本身有多大
- `minWidth`/`minHeight`    — 最小宽高，防止被压太小
- `maxWidth`/`maxHeight`    — 最大宽高，防止被撑太大
- `background`       — 背景色/背景图片
- `color`            — 字体颜色
- `border`           — 边框，如 `border: 1px solid #ccc;`
- `borderRadius`     — 圆角，让盒子/图片/按钮变圆滑
- `boxShadow`        — 阴影，美化立体感
- `fontSize`/`fontFamily`/`fontWeight` — 字号、字体、粗细
- `display: flex`    — 弹性布局，常和 gap 连用
- `gap`              — flex/grid 布局下子项间距
- `position`         — 定位方式（static/relative/absolute/fixed...）
- `top`/`left`/`right`/`bottom` — 定位时精确偏移
- `zIndex`           — 控制“层级”，谁盖在谁上面
- `transition`       — 过渡动画，使样式切换更丝滑

---
## 记忆口诀
- **padding=内部空，margin=外部空**
- 背景/边框/阴影/圆角/字体/大小，多调一调就记住
- flex/grid 布局和 gap 联用，页面分割没烦恼

---

有不懂的参数或布局效果，翻这个速查手册就够了！

---

# 更多常用 CSS 布局与样式参数详解！

## 布局与定位
- **display**        控制元素的排布方式：block, inline, inline-block, flex（弹性）, grid（网格）等
- **position**       定位方式：static（默认）, relative（相对）, absolute（绝对）, fixed（固定）, sticky（吸顶）
- **top / left / right / bottom**  搭配有定位的元素用，精确摆放
- **z-index**        谁覆盖谁，层级大小
- **float / clear**  元素环绕浮动、取消浮动（旧方案）

## 尺寸相关
- **width/height**           盒子本身尺寸
- **min-width/min-height**   最小值，避免被压得太小
- **max-width/max-height**   最大值，防止被撑得太大

## 字体与行
- **font-size**      字体大小
- **font-family**    字体类型
- **font-weight**    粗细（normal、bold、数字值）
- **line-height**    行高
- **color**          字体颜色
- **text-align**     内部文本水平对齐
- **vertical-align** 行内元素/表格单元格垂直对齐

## 背景/边框/美化
- **background/background-color/background-image** 背景色/图片
- **background-size/background-position/background-repeat** 图片如何分布铺排
- **border**         边框相关，常写一行完成：`border:1px solid #ccc;`
- **border-radius**  圆角、椭圆、做圆形
- **box-shadow**     阴影
- **opacity**        透明度

## flex布局专用参数
- **flex-direction**     主轴方向 row/column
- **justify-content**    主轴对齐
- **align-items**        交叉轴对齐
- **flex-wrap**          是否换行
- **gap**                子项间间距（比 margin 更优雅）

## grid 网格专用参数
- **grid-template-columns / grid-template-rows**   划分网格多少列/行
- **grid-gap**           网格间距
- **grid-area**          区块命名与定位

## 动画和过渡
- **transition**         过渡动画，属性变化变柔和
- **transform**          旋转、缩放、平移等
- **animation/@keyframes** 全套动画

## 列表与表格
- **list-style**         li列表符号
- **border-collapse**    表格边框是否合并
- **border-spacing**     表格单元间距

## 其它
- **overflow/overflow-x/overflow-y** 内容溢出滚动控制（scroll/hidden/auto）
- **cursor**             鼠标指针样式

-----

**实用小贴士**：只要遇到页面某种“外观/间距/对齐/动画/字体”，查查这些参数，基本都能搞定！
