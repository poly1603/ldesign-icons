# @ldesign/icons

> 统一图标系统 - 2000+ SVG 图标，支持 React/Vue/Web Components，按需导入

[![npm version](https://img.shields.io/npm/v/@ldesign/icons.svg)](https://www.npmjs.com/package/@ldesign/icons)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/npm/l/@ldesign/icons.svg)](./LICENSE)

## ✨ 特性

- 🎨 **2000+ 图标** - 整合 Lucide、Material Icons、Feather Icons
- 📦 **多框架支持** - React、Vue 3、Web Components
- 🔥 **按需导入** - Tree-shaking 友好，只打包使用的图标
- 🎯 **TypeScript** - 完整的类型定义和智能提示
- ⚡ **图标字体** - 支持生成 TTF/WOFF/WOFF2 字体文件
- 🔍 **图标搜索** - 内置图标预览和搜索工具
- 🎭 **自定义图标** - 轻松添加和管理自定义图标
- 💼 **零依赖** - 核心包无外部运行时依赖

## 📦 安装

```bash
# 使用 pnpm（推荐）
pnpm add @ldesign/icons

# 使用 npm
npm install @ldesign/icons

# 使用 yarn
yarn add @ldesign/icons
```

## 🚀 快速开始

### Vue 3

```vue
<template>
  <div>
    <!-- 基础用法 -->
    <HomeIcon />
    
    <!-- 自定义大小和颜色 -->
    <SearchIcon size="24" color="#1890ff" />
    
    <!-- 使用 class 和 style -->
    <HeartIcon class="my-icon" style="color: red" />
    
    <!-- 旋转动画 -->
    <LoadingIcon :spin="true" />
  </div>
</template>

<script setup lang="ts">
import { HomeIcon, SearchIcon, HeartIcon, LoadingIcon } from '@ldesign/icons/vue'
</script>
```

### React

```tsx
import { HomeIcon, SearchIcon, HeartIcon, LoadingIcon } from '@ldesign/icons/react'

function App() {
  return (
    <div>
      {/* 基础用法 */}
      <HomeIcon />
      
      {/* 自定义大小和颜色 */}
      <SearchIcon size={24} color="#1890ff" />
      
      {/* 使用 className 和 style */}
      <HeartIcon className="my-icon" style={{ color: 'red' }} />
      
      {/* 旋转动画 */}
      <LoadingIcon spin />
    </div>
  )
}
```

### Web Components

```html
<script src="@ldesign/icons/web-components"></script>

<!-- 基础用法 -->
<ld-icon name="home"></ld-icon>

<!-- 自定义大小和颜色 -->
<ld-icon name="search" size="24" color="#1890ff"></ld-icon>

<!-- 旋转动画 -->
<ld-icon name="loading" spin></ld-icon>
```

## 📖 API

### Icon Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `size` | `number \| string` | `'1em'` | 图标大小 |
| `color` | `string` | `'currentColor'` | 图标颜色 |
| `strokeWidth` | `number` | `2` | 描边宽度 |
| `spin` | `boolean` | `false` | 是否旋转动画 |
| `rotate` | `number` | `0` | 旋转角度 |
| `flip` | `'horizontal' \| 'vertical' \| 'both'` | - | 翻转方向 |

### Vue 组件

```typescript
import type { IconProps } from '@ldesign/icons/types'

// 所有 Vue 图标组件都接受相同的 props
interface VueIconProps extends IconProps {
  class?: string
  style?: StyleValue
  onClick?: (event: MouseEvent) => void
}
```

### React 组件

```typescript
import type { IconProps } from '@ldesign/icons/types'
import type { SVGAttributes } from 'react'

// 所有 React 图标组件都接受相同的 props
interface ReactIconProps extends IconProps, Omit<SVGAttributes<SVGElement>, 'color'> {
  className?: string
}
```

## 🎨 图标分类

### 通用图标
- `HomeIcon` - 主页
- `SearchIcon` - 搜索
- `SettingsIcon` - 设置
- `UserIcon` - 用户
- `MenuIcon` - 菜单

### 文件图标
- `FileIcon` - 文件
- `FolderIcon` - 文件夹
- `DownloadIcon` - 下载
- `UploadIcon` - 上传

### 编辑图标
- `EditIcon` - 编辑
- `DeleteIcon` - 删除
- `SaveIcon` - 保存
- `CopyIcon` - 复制

### 媒体图标
- `PlayIcon` - 播放
- `PauseIcon` - 暂停
- `ImageIcon` - 图片
- `VideoIcon` - 视频

查看完整图标列表：[图标库](https://ldesign.dev/icons)

## 🔧 高级用法

### 自定义图标

```typescript
import { createIcon } from '@ldesign/icons/utils'

// 创建自定义图标
export const MyIcon = createIcon({
  name: 'my-icon',
  viewBox: '0 0 24 24',
  path: '<path d="M..." />'
})
```

### 图标字体

```bash
# 生成图标字体
pnpm run build:fonts
```

生成的字体文件位于 `fonts/` 目录：
- `ldesign-icons.ttf`
- `ldesign-icons.woff`
- `ldesign-icons.woff2`
- `ldesign-icons.eot`

### 批量导入

```typescript
// Vue
import * as Icons from '@ldesign/icons/vue'

// React
import * as Icons from '@ldesign/icons/react'

// 动态使用图标
const iconName = 'Home'
const IconComponent = Icons[`${iconName}Icon`]
```

## 📊 包大小

| 包 | 大小（gzipped） | 说明 |
|----|----------------|------|
| 核心包 | ~5KB | 图标工具和类型 |
| 单个图标 | ~1-2KB | 按需导入单个图标 |
| 全部图标 | ~200KB | 不推荐导入全部 |

## 🛠️ 开发

```bash
# 安装依赖
pnpm install

# 生成图标组件
pnpm run generate:all

# 构建
pnpm run build

# 测试
pnpm test

# 开发模式
pnpm dev
```

## 📄 许可证

MIT © LDesign Team

