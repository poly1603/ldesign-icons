# @ldesign/icons 示例项目

本目录包含了 @ldesign/icons 的完整使用示例，展示如何在不同框架中使用图标库。

## 📂 示例列表

### 1. Vue 3 示例 (`vue-demo/`)

完整的 Vue 3 + Vite 项目，展示：
- ✅ 所有 22 个图标的展示
- ✅ 图标搜索功能
- ✅ 分类筛选
- ✅ 自定义大小和颜色
- ✅ 属性演示（size, color, rotate, spin）
- ✅ 代码预览弹窗

**运行方式**：
```bash
cd examples/vue-demo
pnpm install
pnpm dev
```

访问 `http://localhost:5173` 查看效果

### 2. React 示例 (`react-demo/`)

完整的 React + Vite 项目，展示：
- ✅ 所有 22 个图标的展示
- ✅ 图标搜索功能
- ✅ 分类筛选
- ✅ 自定义大小和颜色
- ✅ 代码示例

**运行方式**：
```bash
cd examples/react-demo
pnpm install
pnpm dev
```

访问 `http://localhost:5173` 查看效果

### 3. Lit / Web Components 示例 (`lit-demo.html`)

纯 HTML + Lit 组件，无需构建：
- ✅ 所有 22 个图标展示
- ✅ 属性演示（size, color, spin, rotate）
- ✅ 分类展示
- ✅ 代码示例

**运行方式**：

方法 1 - 直接在浏览器中打开：
```bash
start lit-demo.html
# 或
open lit-demo.html
```

方法 2 - 使用开发服务器：
```bash
# 在 icons 目录运行
pnpm dev
# 然后访问 examples/lit-demo.html
```

## 🎨 示例功能

### Vue 3 和 React 示例包含

1. **图标展示**
   - 网格布局显示所有图标
   - 悬停效果
   - 点击查看详情

2. **搜索功能**
   - 按图标名称搜索
   - 按标签搜索（中英文）
   - 实时过滤

3. **分类筛选**
   - 全部
   - 通用（5个）
   - 编辑（4个）
   - 导航（4个）
   - 媒体（2个）
   - 状态（7个）

4. **自定义控制**
   - 大小滑块 (16-64px)
   - 颜色选择器
   - 实时预览

5. **代码预览**
   - 基础用法示例
   - 属性使用示例
   - 可复制代码

6. **属性演示**
   - size - 图标大小
   - color - 图标颜色
   - rotate - 旋转角度
   - spin - 旋转动画

### Lit 示例包含

1. **所有图标展示** - 22个图标按分类展示
2. **属性演示** - size, color, spin, rotate
3. **代码示例** - 每个功能都有对应代码
4. **纯 HTML** - 无需构建，直接打开即可

## 📖 使用方法

### Vue 3 中使用

```vue
<template>
  <div>
    <!-- 基础用法 -->
    <HomeIcon />
    
    <!-- 自定义属性 -->
    <SearchIcon size="24" color="#1890ff" />
    
    <!-- 旋转动画 -->
    <LoadingIcon :spin="true" />
    
    <!-- 旋转角度 -->
    <SettingsIcon :rotate="45" />
  </div>
</template>

<script setup>
import {
  HomeIcon,
  SearchIcon,
  LoadingIcon,
  SettingsIcon
} from '@ldesign/icons/vue'
</script>
```

### React 中使用

```tsx
import {
  HomeIcon,
  SearchIcon,
  LoadingIcon,
  SettingsIcon
} from '@ldesign/icons/react'

function App() {
  return (
    <div>
      {/* 基础用法 */}
      <HomeIcon />
      
      {/* 自定义属性 */}
      <SearchIcon size={24} color="#1890ff" />
      
      {/* 旋转动画 */}
      <LoadingIcon spin />
      
      {/* 旋转角度 */}
      <SettingsIcon rotate={45} />
    </div>
  )
}
```

### Lit / Web Components 中使用

```html
<script type="module">
  import '@ldesign/icons/lit'
</script>

<!-- 基础用法 -->
<ld-icon-home></ld-icon-home>

<!-- 自定义属性 -->
<ld-icon-search size="24" color="#1890ff"></ld-icon-search>

<!-- 旋转动画 -->
<ld-icon-loading spin></ld-icon-loading>

<!-- 旋转角度 -->
<ld-icon-settings rotate="45"></ld-icon-settings>
```

## 🎯 可用的图标 (22个)

### 通用图标 (5个)
- `HomeIcon` / `ld-icon-home` - 主页
- `SearchIcon` / `ld-icon-search` - 搜索
- `SettingsIcon` / `ld-icon-settings` - 设置
- `UserIcon` / `ld-icon-user` - 用户
- `MenuIcon` / `ld-icon-menu` - 菜单

### 编辑图标 (4个)
- `EditIcon` / `ld-icon-edit` - 编辑
- `DeleteIcon` / `ld-icon-delete` - 删除
- `SaveIcon` / `ld-icon-save` - 保存
- `CopyIcon` / `ld-icon-copy` - 复制

### 导航图标 (4个)
- `ChevronDownIcon` / `ld-icon-chevron-down` - 向下
- `ChevronUpIcon` / `ld-icon-chevron-up` - 向上
- `ChevronLeftIcon` / `ld-icon-chevron-left` - 向左
- `ChevronRightIcon` / `ld-icon-chevron-right` - 向右

### 媒体图标 (2个)
- `PlayIcon` / `ld-icon-play` - 播放
- `PauseIcon` / `ld-icon-pause` - 暂停

### 状态图标 (7个)
- `LoadingIcon` / `ld-icon-loading` - 加载
- `CheckIcon` / `ld-icon-check` - 完成
- `CloseIcon` / `ld-icon-close` - 关闭
- `HeartIcon` / `ld-icon-heart` - 喜欢
- `StarIcon` / `ld-icon-star` - 星标
- `DownloadIcon` / `ld-icon-download` - 下载
- `UploadIcon` / `ld-icon-upload` - 上传

## 📊 Icon Props API

所有框架都支持以下属性：

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `size` | `number \| string` | `'1em'` | 图标大小 |
| `color` | `string` | `'currentColor'` | 图标颜色 |
| `strokeWidth` | `number` | `2` | 描边宽度 |
| `spin` | `boolean` | `false` | 旋转动画 |
| `rotate` | `number` | `0` | 旋转角度 (0-360) |
| `flip` | `'horizontal' \| 'vertical' \| 'both'` | - | 翻转 |

## 🚀 快速开始

### 方法 1: 查看 Lit 示例（最快）

```bash
# 直接在浏览器打开
start examples/lit-demo.html
```

### 方法 2: 运行 Vue 示例

```bash
cd examples/vue-demo
pnpm install
pnpm dev
```

### 方法 3: 运行 React 示例

```bash
cd examples/react-demo
pnpm install
pnpm dev
```

## 💡 提示

- Vue 和 React 示例需要先安装依赖
- Lit 示例可以直接在浏览器中打开
- 所有示例都使用 `../../src/` 中的源代码（开发模式）
- 生产环境请使用构建后的包 `es/` 或 `lib/`

## 📚 更多信息

- [主文档](../README.md)
- [使用指南](../docs/USAGE.md)
- [开发指南](../docs/DEVELOPMENT.md)



