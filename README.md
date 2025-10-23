# @ldesign/icons

> 统一图标系统 - 企业级 SVG 图标库，支持 React/Vue/Lit，按需导入

[![npm version](https://img.shields.io/npm/v/@ldesign/icons.svg)](https://www.npmjs.com/package/@ldesign/icons)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/npm/l/@ldesign/icons.svg)](./LICENSE)

## ✨ 特性

- 🎨 **18+ 核心图标** - 精心设计的 SVG 图标（持续扩展中）
- 📦 **多框架支持** - React、Vue 3、Lit (Web Components)
- 🔥 **按需导入** - Tree-shaking 友好，只打包使用的图标
- 🎯 **TypeScript** - 完整的类型定义和智能提示
- ⚡ **图标字体** - 自动生成 TTF/WOFF/WOFF2 字体文件
- 🔍 **图标搜索** - 内置图标预览和搜索工具
- 🎭 **自定义图标** - 轻松添加和管理自定义图标
- 💼 **零运行时依赖** - 核心包无外部运行时依赖
- 🛠️ **自动化构建** - SVG 自动转换为各框架组件

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

### Lit / Web Components

```html
<script type="module">
  import '@ldesign/icons/lit'
</script>

<!-- 基础用法 -->
<ld-icon-home></ld-icon-home>

<!-- 自定义大小和颜色 -->
<ld-icon-search size="24" color="#1890ff"></ld-icon-search>

<!-- 旋转动画 -->
<ld-icon-loading spin></ld-icon-loading>
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

### 快速开始

```bash
# 1. 安装依赖
pnpm install

# 2. 添加 SVG 图标到 svg/ 目录
# svg/general/my-icon.svg

# 3. 生成组件
pnpm generate        # 生成 Vue/React/Lit 组件
pnpm generate:fonts  # 生成图标字体

# 4. 构建
pnpm build

# 5. 测试
pnpm test
```

### 项目结构

```
packages/icons/
├── svg/                    # SVG 源文件（输入）
│   ├── general/            # 通用图标
│   ├── editing/            # 编辑类图标
│   ├── navigation/         # 导航图标
│   ├── media/              # 媒体图标
│   └── status/             # 状态图标
│
├── scripts/                # 构建脚本
│   ├── parsers/            # SVG 解析器
│   ├── generators/         # 组件生成器
│   ├── font/               # 字体生成器
│   ├── templates/          # Handlebars 模板
│   └── generate-all.ts     # 主生成脚本
│
├── src/                    # 源代码（输出）
│   ├── vue/                # Vue 组件
│   ├── react/              # React 组件
│   ├── lit/                # Lit 组件
│   └── metadata.json       # 图标元数据
│
└── fonts/                  # 字体文件（输出）
    ├── ldesign-icons.ttf
    ├── ldesign-icons.woff
    ├── ldesign-icons.woff2
    └── preview.html
```

### 核心概念

#### SVG → 组件自动生成流程

1. **解析** - `SvgParser` 解析 SVG 文件，提取 path 和 viewBox
2. **优化** - `SvgOptimizer` 使用 SVGO 优化 SVG
3. **元数据** - `MetadataExtractor` 生成图标元数据
4. **生成** - 使用 Handlebars 模板生成各框架组件
5. **字体** - 将 SVG 转换为 TTF/WOFF/WOFF2 字体

#### 参考的最佳实践

- **TDesign Icons** - 构建流程和工具链
- **Lucide** - 组件设计和 API
- **Heroicons** - SVG 优化和规范
- **Iconify** - 元数据和搜索系统

### 添加新图标

1. 将 SVG 文件放入 `svg/` 对应分类目录
2. 确保 SVG 格式符合规范（viewBox="0 0 24 24"）
3. 运行 `pnpm generate` 自动生成组件
4. 运行 `pnpm generate:fonts` 生成字体文件

详见：[DEVELOPMENT.md](./docs/DEVELOPMENT.md)

## 📚 文档

- [使用指南](./docs/USAGE.md) - 详细的 API 和使用示例
- [开发指南](./docs/DEVELOPMENT.md) - 贡献和扩展指南
- [项目计划](./PROJECT_PLAN.md) - 完整的项目规划

## 📄 许可证

MIT © LDesign Team






