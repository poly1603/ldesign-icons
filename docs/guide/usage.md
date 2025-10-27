# 基础用法

本指南将介绍 @ldesign/icons 的常见使用场景和最佳实践。

## 导入图标

### 按需导入（推荐）

只导入你需要的图标，最小化包体积：

```ts
// Vue
import { HomeIcon, SearchIcon, SettingsIcon } from '@ldesign/icons/vue'

// React
import { HomeIcon, SearchIcon, SettingsIcon } from '@ldesign/icons/react'

// Lit
import '@ldesign/icons/lit'
```

### 批量导入

如果需要动态使用多个图标：

```ts
import * as Icons from '@ldesign/icons/vue'

// 动态获取图标组件
const iconName = 'Home'
const IconComponent = Icons[`${iconName}Icon`]
```

::: warning 注意
批量导入会增加包体积，请谨慎使用。推荐使用按需导入。
:::

## 自定义大小

### 数字（像素）

```vue
<!-- 固定 24px -->
<HomeIcon :size="24" />

<!-- 固定 32px -->
<HomeIcon :size="32" />
```

### 字符串（相对单位）

```vue
<!-- 1em = 继承父元素的 font-size -->
<HomeIcon size="1em" />

<!-- 1.5em = 父元素 font-size 的 1.5 倍 -->
<HomeIcon size="1.5em" />

<!-- rem 单位 -->
<HomeIcon size="2rem" />
```

### 响应式大小

```vue
<template>
  <div class="icon-container">
    <HomeIcon />
  </div>
</template>

<style scoped>
.icon-container {
  font-size: 24px;
}

/* 移动端 */
@media (max-width: 768px) {
  .icon-container {
    font-size: 16px; /* 图标会自动缩小 */
  }
}
</style>
```

## 自定义颜色

### 使用 currentColor

图标默认继承父元素的文本颜色：

```vue
<template>
  <div style="color: #3b82f6">
    <HomeIcon /> <!-- 会显示为蓝色 -->
  </div>
</template>
```

### 直接指定颜色

```vue
<!-- 十六进制 -->
<HomeIcon color="#3b82f6" />

<!-- RGB -->
<HomeIcon color="rgb(59, 130, 246)" />

<!-- CSS 变量 -->
<HomeIcon color="var(--primary-color)" />

<!-- 命名颜色 -->
<HomeIcon color="blue" />
```

### 渐变色

```vue
<template>
  <svg width="0" height="0">
    <defs>
      <linearGradient id="icon-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color: #3b82f6" />
        <stop offset="100%" style="stop-color: #8b5cf6" />
      </linearGradient>
    </defs>
  </svg>
  
  <HomeIcon color="url(#icon-gradient)" />
</template>
```

## 描边宽度

调整图标的线条粗细（仅对描边图标有效）：

```vue
<!-- 细线条 -->
<HomeIcon :stroke-width="1" />

<!-- 默认 -->
<HomeIcon :stroke-width="2" />

<!-- 粗线条 -->
<HomeIcon :stroke-width="3" />
```

::: tip 提示
不是所有图标都支持 `strokeWidth`。填充类图标（如 logo）不受此属性影响。
:::

## 旋转和翻转

### 旋转动画

用于加载指示器或刷新按钮：

```vue
<LoadingIcon :spin="true" />
<RefreshCwIcon :spin="true" />
```

自定义旋转速度：

```vue
<template>
  <LoadingIcon :spin="true" class="slow-spin" />
</template>

<style scoped>
.slow-spin {
  animation-duration: 2s; /* 默认是 1s */
}
</style>
```

### 固定旋转角度

```vue
<ArrowUpIcon :rotate="45" />  <!-- 旋转 45° -->
<ArrowUpIcon :rotate="90" />  <!-- 旋转 90° -->
<ArrowUpIcon :rotate="180" /> <!-- 旋转 180° -->
```

### 翻转

```vue
<ArrowRightIcon flip="horizontal" /> <!-- 水平翻转 → ← -->
<ArrowRightIcon flip="vertical" />   <!-- 垂直翻转 ↓ ↑ -->
<ArrowRightIcon flip="both" />       <!-- 两个方向都翻转 -->
```

## 事件处理

### Vue

```vue
<template>
  <div>
    <HeartIcon
      :color="liked ? 'red' : 'currentColor'"
      @click="handleLike"
      @mouseenter="hover = true"
      @mouseleave="hover = false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { HeartIcon } from '@ldesign/icons/vue'

const liked = ref(false)
const hover = ref(false)

const handleLike = () => {
  liked.value = !liked.value
}
</script>
```

### React

```tsx
import { useState } from 'react'
import { HeartIcon } from '@ldesign/icons/react'

function LikeButton() {
  const [liked, setLiked] = useState(false)
  const [hover, setHover] = useState(false)

  return (
    <HeartIcon
      color={liked ? 'red' : 'currentColor'}
      onClick={() => setLiked(!liked)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ cursor: 'pointer' }}
    />
  )
}
```

## 样式定制

### 使用 class

```vue
<template>
  <HomeIcon class="my-icon" />
</template>

<style scoped>
.my-icon {
  color: #3b82f6;
  cursor: pointer;
  transition: color 0.3s;
}

.my-icon:hover {
  color: #2563eb;
}
</style>
```

### 使用 style

```vue
<HomeIcon :style="{ 
  color: '#3b82f6', 
  cursor: 'pointer',
  transition: 'all 0.3s'
}" />
```

### CSS 变量

```vue
<template>
  <div class="theme-container">
    <HomeIcon />
    <SearchIcon />
  </div>
</template>

<style scoped>
.theme-container {
  --icon-color: #3b82f6;
  --icon-size: 24px;
}

.theme-container svg {
  color: var(--icon-color);
  width: var(--icon-size);
  height: var(--icon-size);
}
</style>
```

## 动态图标

### 根据状态切换图标

```vue
<template>
  <component :is="currentIcon" @click="toggle" />
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { PlayIcon, PauseIcon } from '@ldesign/icons/vue'

const playing = ref(false)
const currentIcon = computed(() => playing.value ? PauseIcon : PlayIcon)

const toggle = () => {
  playing.value = !playing.value
}
</script>
```

### 根据名称动态加载

```vue
<template>
  <component :is="getIcon(iconName)" />
</template>

<script setup lang="ts">
import * as Icons from '@ldesign/icons/vue'

const iconName = ref('Home')

const getIcon = (name: string) => {
  return Icons[`${name}Icon`]
}
</script>
```

::: warning 注意
动态加载会导致所有图标都被打包。如果图标数量固定，建议使用条件渲染：

```vue
<HomeIcon v-if="iconName === 'Home'" />
<SearchIcon v-else-if="iconName === 'Search'" />
```
:::

## 可访问性

### 添加标签

```vue
<HomeIcon aria-label="返回首页" />
```

### 装饰性图标

如果图标仅用于装饰，应该隐藏它：

```vue
<HomeIcon aria-hidden="true" />
```

### 配合文本使用

```vue
<button>
  <HomeIcon aria-hidden="true" />
  <span>首页</span>
</button>
```

## 性能优化

### 懒加载

对于大量图标，可以使用异步组件：

```vue
<script setup lang="ts">
import { defineAsyncComponent } from 'vue'

const HomeIcon = defineAsyncComponent(
  () => import('@ldesign/icons/vue').then(m => ({ default: m.HomeIcon }))
)
</script>
```

### 虚拟滚动

显示大量图标时，使用虚拟滚动：

```vue
<template>
  <virtual-scroller :items="icons" :item-height="50">
    <template #default="{ item }">
      <component :is="item" />
    </template>
  </virtual-scroller>
</template>
```

## 最佳实践

### ✅ 推荐

```vue
<!-- 按需导入 -->
import { HomeIcon } from '@ldesign/icons/vue'

<!-- 使用语义化的大小 -->
<HomeIcon size="1.5em" />

<!-- 使用 currentColor 保持主题一致 -->
<HomeIcon color="currentColor" />

<!-- 添加可访问性标签 -->
<HomeIcon aria-label="首页" />
```

### ❌ 不推荐

```vue
<!-- 批量导入所有图标 -->
import * as Icons from '@ldesign/icons/vue'

<!-- 使用固定像素值（不利于响应式） -->
<HomeIcon :size="24" />

<!-- 内联复杂样式（难以维护） -->
<HomeIcon :style="{ color: '#fff', width: '24px', ... }" />
```

## 下一步

- [主题定制](/guide/theming) - 学习如何定制主题
- [性能优化](/guide/performance) - 了解更多性能优化技巧
- [API 参考](/advanced/api) - 查看完整的 API 文档
- [浏览图标](/catalog) - 查看所有可用图标

