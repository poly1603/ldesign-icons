# Vue 组件

@ldesign/icons 为 Vue 3 提供了完整的图标组件支持。

## 安装

```bash
pnpm add @ldesign/icons
```

确保你的项目使用 Vue 3.3+：

```bash
pnpm add vue@^3.3.0
```

## 导入

### 按需导入（推荐）

```ts
import { HomeIcon, SearchIcon, SettingsIcon } from '@ldesign/icons/vue'
```

### 全局注册

```ts
// main.ts
import { createApp } from 'vue'
import { HomeIcon, SearchIcon } from '@ldesign/icons/vue'
import App from './App.vue'

const app = createApp(App)

app.component('HomeIcon', HomeIcon)
app.component('SearchIcon', SearchIcon)

app.mount('#app')
```

## 基础用法

```vue
<template>
  <div>
    <HomeIcon />
  </div>
</template>

<script setup lang="ts">
import { HomeIcon } from '@ldesign/icons/vue'
</script>
```

## Props

所有 Vue 图标组件都接受以下 props：

### size

- **类型**：`number | string`
- **默认值**：`'1em'`
- **说明**：图标大小

```vue
<HomeIcon :size="24" />
<HomeIcon size="1.5em" />
<HomeIcon size="2rem" />
```

### color

- **类型**：`string`
- **默认值**：`'currentColor'`
- **说明**：图标颜色

```vue
<HomeIcon color="#3b82f6" />
<HomeIcon color="rgb(59, 130, 246)" />
<HomeIcon color="var(--primary-color)" />
```

### strokeWidth

- **类型**：`number`
- **默认值**：`2`
- **说明**：描边宽度（仅对描边图标生效）

```vue
<HomeIcon :stroke-width="1" />
<HomeIcon :stroke-width="3" />
```

### spin

- **类型**：`boolean`
- **默认值**：`false`
- **说明**：是否旋转动画

```vue
<LoadingIcon :spin="true" />
<RefreshCwIcon :spin="true" />
```

### rotate

- **类型**：`number`
- **默认值**：`0`
- **说明**：旋转角度（度数）

```vue
<ArrowUpIcon :rotate="45" />
<ArrowUpIcon :rotate="90" />
```

### flip

- **类型**：`'horizontal' | 'vertical' | 'both'`
- **默认值**：`undefined`
- **说明**：翻转方向

```vue
<ArrowRightIcon flip="horizontal" />
<ArrowRightIcon flip="vertical" />
<ArrowRightIcon flip="both" />
```

## 事件

所有原生 SVG 事件都被支持：

```vue
<template>
  <HomeIcon
    @click="handleClick"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  />
</template>

<script setup lang="ts">
const handleClick = (event: MouseEvent) => {
  console.log('点击图标', event)
}

const handleMouseEnter = () => {
  console.log('鼠标进入')
}

const handleMouseLeave = () => {
  console.log('鼠标离开')
}
</script>
```

## Attributes

支持所有原生 SVG 属性：

```vue
<HomeIcon
  class="my-icon"
  style="cursor: pointer"
  aria-label="首页"
  data-testid="home-icon"
/>
```

## TypeScript 类型

```ts
import type { IconProps } from '@ldesign/icons/types'
import type { Component } from 'vue'

// 图标 Props 类型
interface VueIconProps extends IconProps {
  class?: string
  style?: StyleValue
}

// 图标组件类型
type IconComponent = Component<VueIconProps>
```

## 组合式 API

### useIcon 钩子

创建自定义的图标钩子：

```ts
// composables/useIcon.ts
import { computed } from 'vue'
import type { IconProps } from '@ldesign/icons/types'

export function useIcon(props: IconProps) {
  const iconStyle = computed(() => ({
    width: typeof props.size === 'number' ? `${props.size}px` : props.size,
    height: typeof props.size === 'number' ? `${props.size}px` : props.size,
    color: props.color,
  }))

  const iconClass = computed(() => ({
    'icon-spin': props.spin,
  }))

  return {
    iconStyle,
    iconClass,
  }
}
```

使用：

```vue
<script setup lang="ts">
import { HomeIcon } from '@ldesign/icons/vue'
import { useIcon } from './composables/useIcon'

const props = defineProps<{
  size?: number | string
  color?: string
  spin?: boolean
}>()

const { iconStyle, iconClass } = useIcon(props)
</script>

<template>
  <HomeIcon v-bind="props" :style="iconStyle" :class="iconClass" />
</template>
```

## 动态图标

### 使用 component 指令

```vue
<template>
  <component :is="currentIcon" />
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { PlayIcon, PauseIcon } from '@ldesign/icons/vue'

const playing = ref(false)
const currentIcon = computed(() => playing.value ? PauseIcon : PlayIcon)
</script>
```

### 图标映射

```vue
<template>
  <component :is="getIcon(type)" />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { CheckCircleIcon, AlertCircleIcon, XCircleIcon, InfoIcon } from '@ldesign/icons/vue'

const props = defineProps<{
  type: 'success' | 'warning' | 'error' | 'info'
}>()

const iconMap = {
  success: CheckCircleIcon,
  warning: AlertCircleIcon,
  error: XCircleIcon,
  info: InfoIcon,
}

const getIcon = (type: string) => iconMap[type as keyof typeof iconMap]
</script>
```

## 插槽和内容

图标组件不支持插槽，因为它们是纯展示组件。如果需要在图标周围添加内容，请使用包装元素：

```vue
<template>
  <button>
    <HomeIcon />
    <span>首页</span>
  </button>
</template>
```

## 与 Vue 生态系统集成

### Vue Router

```vue
<template>
  <router-link to="/" class="nav-link">
    <HomeIcon />
    <span>首页</span>
  </router-link>
</template>

<script setup lang="ts">
import { HomeIcon } from '@ldesign/icons/vue'
</script>

<style scoped>
.nav-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
</style>
```

### Pinia

```ts
// stores/ui.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { HomeIcon, SearchIcon, SettingsIcon } from '@ldesign/icons/vue'
import type { Component } from 'vue'

export const useUIStore = defineStore('ui', () => {
  const currentIcon = ref<Component>(HomeIcon)

  const setIcon = (icon: Component) => {
    currentIcon.value = icon
  }

  return {
    currentIcon,
    setIcon,
  }
})
```

### Element Plus

```vue
<template>
  <el-button type="primary">
    <HomeIcon class="el-icon--left" />
    首页
  </el-button>
</template>

<script setup lang="ts">
import { ElButton } from 'element-plus'
import { HomeIcon } from '@ldesign/icons/vue'
</script>

<style scoped>
.el-icon--left {
  margin-right: 8px;
}
</style>
```

## SSR 支持

完全支持服务端渲染（Nuxt、Vite SSR 等）：

```vue
<!-- pages/index.vue (Nuxt) -->
<template>
  <div>
    <HomeIcon />
  </div>
</template>

<script setup lang="ts">
import { HomeIcon } from '@ldesign/icons/vue'
</script>
```

## 测试

### Vitest

```ts
import { mount } from '@vue/test-utils'
import { HomeIcon } from '@ldesign/icons/vue'
import { describe, it, expect } from 'vitest'

describe('HomeIcon', () => {
  it('renders correctly', () => {
    const wrapper = mount(HomeIcon)
    expect(wrapper.find('svg').exists()).toBe(true)
  })

  it('accepts size prop', () => {
    const wrapper = mount(HomeIcon, {
      props: { size: 32 }
    })
    const svg = wrapper.find('svg')
    expect(svg.attributes('width')).toBe('32')
    expect(svg.attributes('height')).toBe('32')
  })

  it('accepts color prop', () => {
    const wrapper = mount(HomeIcon, {
      props: { color: '#3b82f6' }
    })
    const svg = wrapper.find('svg')
    expect(svg.attributes('color')).toBe('#3b82f6')
  })

  it('handles click event', async () => {
    const wrapper = mount(HomeIcon)
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
  })
})
```

## 最佳实践

### ✅ 推荐

```vue
<!-- 按需导入 -->
<script setup lang="ts">
import { HomeIcon } from '@ldesign/icons/vue'
</script>

<!-- 使用语义化的大小 -->
<HomeIcon size="1.5em" />

<!-- 使用 currentColor -->
<HomeIcon color="currentColor" />
```

### ❌ 避免

```vue
<!-- 不要批量导入 -->
<script setup lang="ts">
import * as Icons from '@ldesign/icons/vue'
</script>

<!-- 不要使用固定像素值 -->
<HomeIcon :size="24" />

<!-- 不要硬编码颜色 -->
<HomeIcon color="#3b82f6" />
```

## 常见问题

### 为什么图标不显示？

检查：
1. 是否正确导入了组件
2. 图标名称是否正确（注意大小写）
3. CSS 样式是否被覆盖

### 如何修改图标大小？

```vue
<!-- 方法 1: 使用 size prop -->
<HomeIcon :size="24" />

<!-- 方法 2: 使用 CSS font-size -->
<HomeIcon style="font-size: 24px" />
```

### 如何添加动画？

```vue
<template>
  <HomeIcon class="icon-with-animation" />
</template>

<style scoped>
.icon-with-animation {
  transition: transform 0.3s;
}

.icon-with-animation:hover {
  transform: scale(1.2);
}
</style>
```

## 下一步

- [React 组件](/components/react) - React 使用指南
- [Lit 组件](/components/lit) - Web Components 使用指南
- [API 参考](/advanced/api) - 完整 API 文档
- [示例](/examples/vue) - Vue 示例

