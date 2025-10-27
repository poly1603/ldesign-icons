---
layout: home

hero:
  name: '@ldesign/icons'
  text: 统一图标系统
  tagline: 企业级 SVG 图标库，支持 React/Vue/Lit，按需导入
  image:
    src: /logo.svg
    alt: LDesign Icons
  actions:
    - theme: brand
      text: 快速开始
      link: /guide/getting-started
    - theme: alt
      text: 浏览图标
      link: /catalog
    - theme: alt
      text: GitHub
      link: https://github.com/ldesign/ldesign

features:
  - icon: 🎨
    title: 347+ 精美图标
    details: 基于 Lucide Icons 的高质量 SVG 图标库，覆盖10个常用分类
  - icon: 📦
    title: 多框架支持
    details: 提供 React、Vue 3、Lit (Web Components) 组件，开箱即用
  - icon: 🔥
    title: 按需导入
    details: Tree-shaking 友好，只打包使用的图标，优化包体积
  - icon: 🎯
    title: TypeScript
    details: 完整的类型定义和智能提示，提升开发体验
  - icon: 🎨
    title: 描边宽度控制
    details: 支持动态调整 strokeWidth，灵活适配设计需求
  - icon: ⚡
    title: 图标字体
    details: 自动生成 TTF/WOFF/WOFF2 字体文件，支持多种使用场景
  - icon: 🔍
    title: 交互式预览
    details: 精美的图标预览和搜索工具，快速找到需要的图标
  - icon: 🎭
    title: 自定义图标
    details: 轻松添加和管理自定义图标，满足个性化需求
  - icon: 💼
    title: 零运行时依赖
    details: 核心包无外部运行时依赖，纯净轻量
  - icon: 🛠️
    title: 自动化构建
    details: SVG 自动转换为各框架组件，开发效率倍增
  - icon: 🌗
    title: 深色模式
    details: 内置深色模式支持，适配不同主题
  - icon: 📱
    title: 响应式
    details: 完美适配各种屏幕尺寸，移动端友好
---

## 快速体验

::: code-group

```vue [Vue]
<template>
  <div>
    <HomeIcon size="24" color="#3b82f6" />
    <SearchIcon :spin="true" />
  </div>
</template>

<script setup lang="ts">
import { HomeIcon, SearchIcon } from '@ldesign/icons/vue'
</script>
```

```tsx [React]
import { HomeIcon, SearchIcon } from '@ldesign/icons/react'

function App() {
  return (
    <div>
      <HomeIcon size={24} color="#3b82f6" />
      <SearchIcon spin />
    </div>
  )
}
```

```html [Lit]
<script type="module">
  import '@ldesign/icons/lit'
</script>

<ld-icon-home size="24" color="#3b82f6"></ld-icon-home>
<ld-icon-search spin></ld-icon-search>
```

:::

## 安装

::: code-group

```bash [pnpm]
pnpm add @ldesign/icons
```

```bash [npm]
npm install @ldesign/icons
```

```bash [yarn]
yarn add @ldesign/icons
```

:::

## 为什么选择 @ldesign/icons？

### 🎯 统一的使用体验

无论你使用 Vue、React 还是 Web Components，API 保持一致，降低学习成本。

### 📦 极致的包体积优化

通过 Tree-shaking，只打包你实际使用的图标。单个图标仅 1-2KB（gzipped）。

### 🚀 开箱即用

无需配置，安装即用。完整的 TypeScript 支持，智能提示帮你快速开发。

### 🎨 灵活的定制能力

支持动态调整大小、颜色、描边宽度、旋转角度等，满足各种设计需求。

## 图标分类

我们提供 **347+ 图标**，精心分为 **10 个分类**：

- 🏠 **通用** (42) - 首页、搜索、设置、用户等常用图标
- ✏️ **编辑** (23) - 编辑、删除、保存、复制等操作图标
- 🧭 **导航** (47) - 箭头、方向、缩放等导航图标
- 🎵 **媒体** (35) - 播放、暂停、音乐、相机等媒体图标
- ✅ **状态** (46) - 勾选、关闭、加载、下载等状态图标
- 📄 **文件** (36) - 文件、文件夹、文档等文件图标
- 💬 **通讯** (33) - 邮件、消息、电话、分享等通讯图标
- 💼 **商务** (30) - 公文包、日历、图表等商务图标
- 🌤️ **天气** (23) - 太阳、月亮、云、雨等天气图标
- 💻 **设备** (32) - 手机、电脑、打印机等设备图标

[查看完整图标目录 →](/catalog)

## 社区支持

- 📖 [完整文档](https://ldesign.github.io/icons)
- 💬 [GitHub Discussions](https://github.com/ldesign/ldesign/discussions)
- 🐛 [报告问题](https://github.com/ldesign/ldesign/issues)
- ⭐ [Star on GitHub](https://github.com/ldesign/ldesign)

## 许可证

[MIT](https://github.com/ldesign/ldesign/blob/main/LICENSE) © LDesign Team

