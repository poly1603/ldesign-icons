# 性能优化

本指南介绍如何优化 @ldesign/icons 的性能，减少包体积和提升加载速度。

## 按需导入

### ✅ 推荐：按需导入

```ts
// 只会打包这两个图标（约 2-4KB）
import { HomeIcon, SearchIcon } from '@ldesign/icons/vue'
```

### ❌ 避免：批量导入

```ts
// 会打包所有图标（约 200KB+）
import * as Icons from '@ldesign/icons/vue'
```

## Tree-shaking

确保你的构建工具启用了 Tree-shaking：

### Vite

Vite 默认启用 Tree-shaking，无需配置：

```ts
// vite.config.ts
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    minify: 'terser', // 或 'esbuild'
  }
})
```

### Webpack

```js
// webpack.config.js
module.exports = {
  mode: 'production',
  optimization: {
    usedExports: true,
    sideEffects: false,
  }
}
```

确保 package.json 中设置了 `sideEffects`：

```json
{
  "sideEffects": false
}
```

## 代码分割

### 路由级代码分割

将图标按路由拆分：

```ts
// router/index.ts
const routes = [
  {
    path: '/home',
    component: () => import('./views/Home.vue') // 包含 HomeIcon
  },
  {
    path: '/settings',
    component: () => import('./views/Settings.vue') // 包含 SettingsIcon
  }
]
```

### 异步组件

对于非首屏图标，使用异步加载：

```vue
<script setup lang="ts">
import { defineAsyncComponent } from 'vue'

const ChartIcon = defineAsyncComponent(
  () => import('@ldesign/icons/vue').then(m => ({ default: m.ChartIcon }))
)
</script>
```

## 缓存优化

### 浏览器缓存

配置正确的缓存头：

```nginx
# nginx.conf
location ~* \.(js|css)$ {
  expires 1y;
  add_header Cache-Control "public, immutable";
}
```

### Service Worker

使用 Service Worker 缓存图标资源：

```js
// service-worker.js
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('icons-v1').then((cache) => {
      return cache.addAll([
        '/node_modules/@ldesign/icons/es/vue/icons/HomeIcon.js',
        // 添加其他常用图标
      ])
    })
  )
})
```

## 动态加载

### 使用动态导入

仅在需要时加载图标：

```vue
<script setup lang="ts">
import { ref, shallowRef } from 'vue'

const iconComponent = shallowRef(null)

async function loadIcon(name: string) {
  const module = await import('@ldesign/icons/vue')
  iconComponent.value = module[`${name}Icon`]
}

// 在用户操作时加载
loadIcon('Home')
</script>
```

### 虚拟滚动

显示大量图标时使用虚拟滚动：

```vue
<template>
  <div ref="container" @scroll="handleScroll" class="icon-list">
    <div :style="{ height: `${totalHeight}px` }">
      <div
        v-for="icon in visibleIcons"
        :key="icon.name"
        :style="{ transform: `translateY(${icon.offset}px)` }"
      >
        <component :is="icon.component" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const ITEM_HEIGHT = 50
const BUFFER = 5

const container = ref<HTMLElement>()
const scrollTop = ref(0)

const handleScroll = (e: Event) => {
  scrollTop.value = (e.target as HTMLElement).scrollTop
}

const visibleIcons = computed(() => {
  const start = Math.max(0, Math.floor(scrollTop.value / ITEM_HEIGHT) - BUFFER)
  const end = start + Math.ceil(window.innerHeight / ITEM_HEIGHT) + BUFFER * 2
  return icons.slice(start, end).map((icon, i) => ({
    ...icon,
    offset: (start + i) * ITEM_HEIGHT
  }))
})
</script>
```

## 压缩和优化

### Gzip/Brotli 压缩

启用服务器压缩：

```nginx
# nginx.conf
gzip on;
gzip_types text/plain text/css application/json application/javascript;
gzip_min_length 1000;

# 或使用 Brotli（更好的压缩率）
brotli on;
brotli_types text/plain text/css application/json application/javascript;
```

### 压缩效果对比

| 格式 | 大小 | 压缩率 |
|------|------|--------|
| 原始 | 200KB | - |
| Gzip | 50KB | 75% |
| Brotli | 45KB | 77.5% |

## CDN 优化

### 使用 CDN

```html
<!-- 使用 CDN 加速 -->
<script type="module">
  import { HomeIcon } from 'https://cdn.jsdelivr.net/npm/@ldesign/icons@latest/es/vue/icons/HomeIcon.js'
</script>
```

### 预连接

```html
<link rel="preconnect" href="https://cdn.jsdelivr.net">
<link rel="dns-prefetch" href="https://cdn.jsdelivr.net">
```

## 包体积分析

### Vite

使用 rollup-plugin-visualizer：

```ts
// vite.config.ts
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig({
  plugins: [
    visualizer({
      open: true,
      gzipSize: true,
      brotliSize: true,
    })
  ]
})
```

### Webpack

使用 webpack-bundle-analyzer：

```js
// webpack.config.js
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = {
  plugins: [
    new BundleAnalyzerPlugin()
  ]
}
```

## 性能监控

### 测量加载时间

```ts
// 使用 Performance API
performance.mark('icons-start')

import { HomeIcon } from '@ldesign/icons/vue'

performance.mark('icons-end')
performance.measure('icons-load', 'icons-start', 'icons-end')

const measure = performance.getEntriesByName('icons-load')[0]
console.log(`图标加载时间: ${measure.duration}ms`)
```

### 监控包体积

在 CI/CD 中监控包体积变化：

```json
// package.json
{
  "scripts": {
    "size": "size-limit",
    "size:why": "size-limit --why"
  },
  "size-limit": [
    {
      "path": "es/index.js",
      "limit": "10 KB"
    },
    {
      "path": "es/vue/icons/HomeIcon.js",
      "limit": "2 KB"
    }
  ]
}
```

## 渲染优化

### 使用 shallowRef

对于不需要深度响应的图标组件：

```vue
<script setup lang="ts">
import { shallowRef } from 'vue'
import { HomeIcon } from '@ldesign/icons/vue'

// 使用 shallowRef 减少响应式开销
const icon = shallowRef(HomeIcon)
</script>
```

### 避免不必要的重渲染

使用 memo（React）或 v-memo（Vue）：

```tsx
// React
import { memo } from 'react'
import { HomeIcon } from '@ldesign/icons/react'

const MemoizedIcon = memo(HomeIcon)
```

```vue
<!-- Vue -->
<template>
  <div v-memo="[size, color]">
    <HomeIcon :size="size" :color="color" />
  </div>
</template>
```

## 图标字体 vs SVG 组件

### 何时使用图标字体

适用于：
- 需要大量相同尺寸的图标
- 简单的单色图标
- 需要支持 IE11

```html
<link rel="stylesheet" href="@ldesign/icons/fonts/icons.css">
<i class="ld-icon-home"></i>
```

### 何时使用 SVG 组件

适用于：
- 需要动态改变颜色、大小
- 多色图标
- 需要动画效果
- 现代浏览器

```vue
<HomeIcon :size="24" color="#3b82f6" />
```

## 性能基准

### 单个图标性能

| 指标 | 值 |
|------|-----|
| 文件大小 | 1-2 KB (gzipped) |
| 加载时间 | < 10ms |
| 解析时间 | < 1ms |
| 渲染时间 | < 1ms |

### 100 个图标性能

| 指标 | 值 |
|------|-----|
| 总大小 | 100-200 KB (gzipped) |
| 首次加载 | < 100ms |
| TTI | < 200ms |

## 最佳实践总结

### ✅ 推荐

1. **按需导入** - 只导入需要的图标
2. **代码分割** - 按路由或功能拆分
3. **启用压缩** - 使用 Gzip/Brotli
4. **使用 CDN** - 利用 CDN 加速
5. **监控体积** - 持续监控包体积变化

### ❌ 避免

1. 批量导入所有图标
2. 在循环中动态导入
3. 过度使用动画
4. 忽略 Tree-shaking 配置

## 性能检查清单

- [ ] 使用按需导入
- [ ] 启用 Tree-shaking
- [ ] 配置代码分割
- [ ] 启用服务器压缩
- [ ] 使用 CDN
- [ ] 配置浏览器缓存
- [ ] 监控包体积
- [ ] 测量加载性能

## 下一步

- [API 参考](/advanced/api) - 查看完整的 API 文档
- [示例](/examples/) - 查看性能优化示例
- [开发指南](/development/) - 了解如何优化构建流程

