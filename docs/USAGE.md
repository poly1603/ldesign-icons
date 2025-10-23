# @ldesign/icons 使用指南

## 快速开始

### 安装

```bash
pnpm add @ldesign/icons
```

## Vue 3 使用

### 基础用法

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
    
    <!-- 旋转角度 -->
    <SettingsIcon :rotate="45" />
    
    <!-- 翻转 -->
    <ChevronRightIcon flip="horizontal" />
  </div>
</template>

<script setup lang="ts">
import {
  HomeIcon,
  SearchIcon,
  HeartIcon,
  LoadingIcon,
  SettingsIcon,
  ChevronRightIcon
} from '@ldesign/icons/vue'
</script>

<style>
.my-icon {
  font-size: 32px;
}
</style>
```

### 动态图标

```vue
<template>
  <component :is="dynamicIcon" size="24" />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import * as Icons from '@ldesign/icons/vue'

const iconName = ref('Home')
const dynamicIcon = computed(() => Icons[`${iconName.value}Icon`])
</script>
```

## React 使用

### 基础用法

```tsx
import {
  HomeIcon,
  SearchIcon,
  HeartIcon,
  LoadingIcon
} from '@ldesign/icons/react'

function App() {
  return (
    <div>
      {/* 基础用法 */}
      <HomeIcon />
      
      {/* 自定义 */}
      <SearchIcon size={24} color="#1890ff" />
      
      {/* 使用 className 和 style */}
      <HeartIcon className="my-icon" style={{ color: 'red' }} />
      
      {/* 动画 */}
      <LoadingIcon spin />
      
      {/* forwardRef 支持 */}
      <HeartIcon ref={iconRef} />
      
      {/* 事件处理 */}
      <SearchIcon onClick={() => console.log('clicked')} />
    </div>
  )
}
```

### 动态图标

```tsx
import * as Icons from '@ldesign/icons/react'

function DynamicIcon({ name, ...props }) {
  const IconComponent = Icons[`${name}Icon`]
  return <IconComponent {...props} />
}

// 使用
<DynamicIcon name="Home" size={24} />
```

## Lit / Web Components 使用

### 基础用法

```html
<!DOCTYPE html>
<html>
<head>
  <script type="module">
    import '@ldesign/icons/lit'
  </script>
</head>
<body>
  <!-- 基础用法 -->
  <ld-icon-home></ld-icon-home>
  
  <!-- 自定义属性 -->
  <ld-icon-search size="24" color="#1890ff"></ld-icon-search>
  
  <!-- 旋转动画 -->
  <ld-icon-loading spin></ld-icon-loading>
  
  <!-- 旋转角度 -->
  <ld-icon-settings rotate="45"></ld-icon-settings>
</body>
</html>
```

### 在 TypeScript 中使用

```typescript
import { HomeIcon, SearchIcon } from '@ldesign/icons/lit'

// 创建元素
const homeIcon = new HomeIcon()
homeIcon.size = 32
homeIcon.color = '#1890ff'
document.body.appendChild(homeIcon)

// 或使用 DOM API
const icon = document.createElement('ld-icon-search')
icon.setAttribute('size', '24')
document.body.appendChild(icon)
```

## 图标字体使用

### 引入字体文件

```html
<link rel="stylesheet" href="node_modules/@ldesign/icons/fonts/ldesign-icons.css">
```

### 使用图标

```html
<!-- 基础用法 -->
<i class="ld-icon ld-icon-home"></i>
<i class="ld-icon ld-icon-search"></i>

<!-- 自定义样式 -->
<i class="ld-icon ld-icon-heart" style="font-size: 24px; color: red;"></i>

<!-- 使用 CSS -->
<style>
.my-icon {
  font-size: 32px;
  color: #1890ff;
}
</style>
<i class="ld-icon ld-icon-star my-icon"></i>
```

## API 参考

### Icon Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `size` | `number \| string` | `'1em'` | 图标大小，可以是数字（px）或字符串（em, rem 等） |
| `color` | `string` | `'currentColor'` | 图标颜色 |
| `strokeWidth` | `number` | `2` | 描边宽度 |
| `spin` | `boolean` | `false` | 是否旋转动画 |
| `rotate` | `number` | `0` | 旋转角度（0-360） |
| `flip` | `'horizontal' \| 'vertical' \| 'both'` | - | 翻转方向 |

### Vue 特有 Props

```typescript
interface VueIconProps extends IconProps {
  class?: string
  style?: StyleValue
  onClick?: (event: MouseEvent) => void
  // ... 其他 Vue 事件
}
```

### React 特有 Props

```typescript
interface ReactIconProps extends IconProps, Omit<SVGAttributes<SVGElement>, 'color'> {
  className?: string
  ref?: React.Ref<SVGSVGElement>
}
```

### Lit / Web Components 特有属性

所有属性都通过 HTML 属性传递：

```html
<ld-icon-home size="24" color="red" spin></ld-icon-home>
```

## 工具函数

### iconRegistry

```typescript
import { iconRegistry } from '@ldesign/icons'

// 搜索图标
const results = iconRegistry.search('home')
// [{ name: 'home', category: 'general', tags: [...] }]

// 列出所有图标
const allIcons = iconRegistry.list()

// 检查图标是否存在
if (iconRegistry.has('home')) {
  console.log('图标存在')
}
```

### createIcon

```typescript
import { createIcon } from '@ldesign/icons'

// 创建自定义图标
const MyIcon = createIcon({
  name: 'my-custom-icon',
  path: 'M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z',
  viewBox: '0 0 24 24',
  category: 'custom',
  tags: ['custom', 'special']
})
```

### 全局配置

```typescript
import { setIconConfig } from '@ldesign/icons'

// 设置全局配置
setIconConfig({
  defaultSize: '1.5em',
  defaultColor: '#333',
  classPrefix: 'my-icon'
})
```

## 性能优化

### 按需导入

```typescript
// ✅ 推荐：按需导入
import { HomeIcon, SearchIcon } from '@ldesign/icons/vue'

// ❌ 不推荐：导入所有图标
import * as Icons from '@ldesign/icons/vue'
```

### Tree-shaking

确保你的打包工具配置支持 Tree-shaking：

```javascript
// vite.config.js
export default {
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          icons: ['@ldesign/icons/vue']
        }
      }
    }
  }
}
```

## 最佳实践

### 1. 统一图标大小

```typescript
// 定义常量
export const ICON_SIZES = {
  small: 16,
  medium: 24,
  large: 32,
  xlarge: 48
} as const

// 使用
<SearchIcon :size="ICON_SIZES.medium" />
```

### 2. 主题色支持

```vue
<script setup>
import { computed } from 'vue'
import { useTheme } from '@/composables/useTheme'

const theme = useTheme()
const iconColor = computed(() => theme.value.primaryColor)
</script>

<template>
  <HomeIcon :color="iconColor" />
</template>
```

### 3. 图标包装组件

```vue
<!-- IconWrapper.vue -->
<template>
  <component
    :is="iconComponent"
    v-bind="$attrs"
    :size="size"
    :color="color"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import * as Icons from '@ldesign/icons/vue'

const props = defineProps<{
  name: string
  size?: number | string
  color?: string
}>()

const iconComponent = computed(() => Icons[`${props.name}Icon`])
</script>
```

## 常见问题

### Q: 如何自定义图标？

A: 使用 `createIcon` 函数：

```typescript
import { createIcon } from '@ldesign/icons/vue'

export const CustomIcon = createIcon('Custom', 'M...', '0 0 24 24')
```

### Q: 图标不显示？

A: 检查以下几点：
1. 是否正确导入了图标
2. 是否引入了样式文件
3. 检查图标名称是否正确
4. 确认 z-index 层级关系

### Q: 如何改变图标颜色？

A: 三种方式：
1. 使用 `color` prop
2. 使用 CSS `color` 属性
3. 设置父元素的 `currentColor`

### Q: 图标太大或太小？

A: 使用 `size` prop 调整：

```vue
<HomeIcon size="16" />  <!-- 16px -->
<HomeIcon size="1.5em" />  <!-- 1.5em -->
```

## 浏览所有图标

访问预览页面：

```bash
# 打开字体预览页面
open fonts/preview.html

# 或启动文档站点
pnpm dev:site
```

## 贡献

欢迎贡献新图标！请参阅 [CONTRIBUTING.md](./CONTRIBUTING.md)




