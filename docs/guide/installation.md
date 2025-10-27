# 安装

@ldesign/icons 可以通过多种方式安装和使用。

## NPM / PNPM / Yarn

推荐使用包管理器安装：

::: code-group

```bash [pnpm (推荐)]
pnpm add @ldesign/icons
```

```bash [npm]
npm install @ldesign/icons
```

```bash [yarn]
yarn add @ldesign/icons
```

:::

## CDN

对于简单的项目或原型开发，可以使用 CDN：

### unpkg

```html
<script type="module">
  import { HomeIcon } from 'https://unpkg.com/@ldesign/icons/es/index.js'
</script>
```

### jsDelivr

```html
<script type="module">
  import { HomeIcon } from 'https://cdn.jsdelivr.net/npm/@ldesign/icons/es/index.js'
</script>
```

## 框架特定安装

### Vue 3

确保你的项目中已安装 Vue 3.3+：

```bash
pnpm add vue@^3.3.0
pnpm add @ldesign/icons
```

在 `main.ts` 中（可选，用于全局注册）：

```ts
import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)

// 可选：全局注册常用图标
import { HomeIcon, SearchIcon } from '@ldesign/icons/vue'
app.component('HomeIcon', HomeIcon)
app.component('SearchIcon', SearchIcon)

app.mount('#app')
```

### React

确保你的项目中已安装 React 18+：

```bash
pnpm add react@^18.0.0 react-dom@^18.0.0
pnpm add @ldesign/icons
```

无需额外配置，直接导入使用：

```tsx
import { HomeIcon } from '@ldesign/icons/react'
```

### Lit / Web Components

Lit 版本可在任何框架或纯 HTML 中使用：

```bash
pnpm add lit@^3.0.0  # 仅在开发时需要
pnpm add @ldesign/icons
```

直接在 HTML 中使用：

```html
<script type="module">
  import '@ldesign/icons/lit'
</script>

<ld-icon-home></ld-icon-home>
```

## TypeScript 配置

如果你使用 TypeScript，建议在 `tsconfig.json` 中添加以下配置：

```json
{
  "compilerOptions": {
    "moduleResolution": "bundler", // 或 "node16", "nodenext"
    "types": ["@ldesign/icons/types"]
  }
}
```

## 构建工具配置

### Vite

无需额外配置，Vite 会自动处理 Tree-shaking：

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  // @ldesign/icons 会自动被 tree-shake
})
```

### Webpack

确保开启了 Tree-shaking（生产模式默认开启）：

```js
// webpack.config.js
module.exports = {
  mode: 'production', // 开启 Tree-shaking
  optimization: {
    usedExports: true,
    sideEffects: false
  }
}
```

### Rollup

```js
// rollup.config.js
import { defineConfig } from 'rollup'
import { nodeResolve } from '@rollup/plugin-node-resolve'

export default defineConfig({
  plugins: [
    nodeResolve()
  ],
  treeshake: true // 开启 Tree-shaking
})
```

## 按需导入配置

### 自动按需导入 (unplugin-auto-import)

对于 Vue 和 React 项目，可以使用 `unplugin-auto-import` 实现自动导入：

```bash
pnpm add -D unplugin-auto-import
```

#### Vite 配置

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'

export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports: [
        {
          '@ldesign/icons/vue': [
            'HomeIcon',
            'SearchIcon',
            'SettingsIcon',
            // 添加你常用的图标
          ]
        }
      ]
    })
  ]
})
```

#### Webpack 配置

```js
// webpack.config.js
const AutoImport = require('unplugin-auto-import/webpack')

module.exports = {
  plugins: [
    AutoImport({
      imports: [
        {
          '@ldesign/icons/react': [
            'HomeIcon',
            'SearchIcon',
            'SettingsIcon',
          ]
        }
      ]
    })
  ]
}
```

## 验证安装

创建一个测试文件来验证安装：

::: code-group

```vue [Vue]
<template>
  <div>
    <HomeIcon size="24" />
    <p>如果你能看到图标，说明安装成功！</p>
  </div>
</template>

<script setup lang="ts">
import { HomeIcon } from '@ldesign/icons/vue'
</script>
```

```tsx [React]
import { HomeIcon } from '@ldesign/icons/react'

function App() {
  return (
    <div>
      <HomeIcon size={24} />
      <p>如果你能看到图标，说明安装成功！</p>
    </div>
  )
}
```

```html [Lit]
<script type="module">
  import '@ldesign/icons/lit'
</script>

<div>
  <ld-icon-home size="24"></ld-icon-home>
  <p>如果你能看到图标，说明安装成功！</p>
</div>
```

:::

## 常见问题

### Q: 为什么我的图标不显示？

A: 请检查：
1. 是否正确导入了图标组件
2. 图标名称是否正确（注意大小写）
3. 是否在浏览器控制台有错误信息
4. CSS 样式是否被覆盖（检查 `display` 和 `visibility` 属性）

### Q: 如何减小包体积？

A: 使用按需导入：

```ts
// ❌ 不推荐：导入所有图标
import * as Icons from '@ldesign/icons/vue'

// ✅ 推荐：按需导入
import { HomeIcon, SearchIcon } from '@ldesign/icons/vue'
```

### Q: 支持哪些浏览器？

A: 支持所有现代浏览器：
- Chrome >= 87
- Firefox >= 78
- Safari >= 14
- Edge >= 88

### Q: 是否支持服务端渲染 (SSR)？

A: 是的，完全支持。查看 [SSR 支持](/advanced/ssr) 了解详情。

## 下一步

- [快速开始](/guide/getting-started) - 5 分钟上手
- [基础用法](/guide/usage) - 学习如何使用图标
- [浏览图标](/catalog) - 查看所有可用图标

