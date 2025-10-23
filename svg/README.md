# SVG 图标规范

## 文件命名规范

- 使用 kebab-case：`home.svg`, `chevron-down.svg`
- 见名知意，避免缩写
- 同一系列使用相同前缀：`chevron-down`, `chevron-up`

## SVG 格式要求

- ViewBox: `"0 0 24 24"` （统一尺寸）
- 移除 `width`/`height` 属性
- 移除 `fill`/`stroke` 属性（由组件控制）
- 使用 `<path>` 元素（避免 `<circle>`, `<rect>` 等）
- 简化路径数据

## 优化要求

- 使用 SVGO 优化
- 移除注释和元数据
- 合并路径（如果可能）
- 精度保持 2 位小数

## 图标分类

### general/ - 通用图标
- home, search, settings, user, menu

### editing/ - 编辑类图标
- edit, delete, save, copy

### navigation/ - 导航图标
- chevron-down, chevron-up, chevron-left, chevron-right

### media/ - 媒体图标
- play, pause

### status/ - 状态图标
- loading, check, close, heart, star

## 示例

```svg
<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
  <polyline points="9 22 9 12 15 12 15 22"/>
</svg>
```




