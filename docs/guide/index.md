# 介绍

@ldesign/icons 是一个企业级的 SVG 图标系统，提供了 347+ 高质量图标，支持 React、Vue 3 和 Lit (Web Components)。

## 特性

### 🎨 高质量图标库

我们基于 [Lucide Icons](https://lucide.dev/) 提供了 347+ 精心设计的图标，覆盖了日常开发中的绝大多数场景。所有图标都经过优化，保证了一致的视觉风格和最小的文件体积。

### 📦 多框架支持

一次安装，多处使用：

```bash
pnpm add @ldesign/icons
```

支持三大主流框架：

- **Vue 3** - 基于组合式 API，完全类型安全
- **React** - 支持 React 18+，使用 forwardRef
- **Lit** - Web Components 标准，可在任何框架中使用

### 🔥 按需导入

得益于现代打包工具的 Tree-shaking 特性，你只需要：

```ts
// 只会打包这两个图标
import { HomeIcon, SearchIcon } from '@ldesign/icons/vue'
```

不用担心包体积问题，未使用的图标不会被打包。

### 🎯 完整的 TypeScript 支持

```ts
import type { IconProps } from '@ldesign/icons/types'

// 所有 props 都有完整的类型定义
const props: IconProps = {
  size: 24,
  color: '#3b82f6',
  strokeWidth: 2,
  spin: false
}
```

### ⚡ 优秀的性能

- **轻量级** - 单个图标仅 1-2KB (gzipped)
- **零依赖** - 核心包没有外部运行时依赖
- **SSR 友好** - 支持服务端渲染
- **缓存优化** - 内置智能缓存机制

## 设计理念

### 一致性

所有图标遵循统一的设计规范：

- 统一的 viewBox：`0 0 24 24`
- 一致的描边宽度：默认 `2px`
- 统一的命名规范：驼峰命名 + Icon 后缀

### 可访问性

我们注重无障碍访问：

- 所有图标都有语义化的 `aria-label`
- 支持屏幕阅读器
- 可通过键盘导航

### 可维护性

清晰的项目结构，便于维护和扩展：

```
packages/icons/
├── svg/              # SVG 源文件
├── src/              # 生成的组件代码
├── scripts/          # 构建脚本
└── docs/             # 文档
```

## 技术栈

- **TypeScript** - 类型安全
- **Vite** - 快速构建
- **Rollup** - 打包优化
- **SVGO** - SVG 优化
- **Vitest** - 单元测试

## 浏览器支持

- Chrome >= 87
- Firefox >= 78
- Safari >= 14
- Edge >= 88

> 对于旧版浏览器，可以使用相应的 polyfill。

## 下一步

- [快速开始](/guide/getting-started) - 5 分钟上手
- [安装指南](/guide/installation) - 详细安装步骤
- [基础用法](/guide/usage) - 学习如何使用图标
- [浏览图标](/catalog) - 查看所有可用图标

