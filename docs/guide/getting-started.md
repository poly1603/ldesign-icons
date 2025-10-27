# 快速开始

这个指南将帮助你在 5 分钟内开始使用 @ldesign/icons。

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

## 使用

### Vue 3

<div class="demo-container">
<div class="demo-preview">
  <!-- 这里会在实际页面中显示图标 -->
</div>
</div>

::: code-group

```vue [基础用法]
<template>
  <div class="icons">
    <HomeIcon />
    <SearchIcon />
    <SettingsIcon />
  </div>
</template>

<script setup lang="ts">
import { HomeIcon, SearchIcon, SettingsIcon } from '@ldesign/icons/vue'
</script>

<style scoped>
.icons {
  display: flex;
  gap: 1rem;
  font-size: 24px;
}
</style>
```

```vue [自定义属性]
<template>
  <div class="icons">
    <!-- 自定义大小 -->
    <HomeIcon size="32" />
    
    <!-- 自定义颜色 -->
    <SearchIcon color="#3b82f6" />
    
    <!-- 自定义描边宽度 -->
    <SettingsIcon :stroke-width="3" />
    
    <!-- 旋转动画 -->
    <LoadingIcon :spin="true" />
  </div>
</template>

<script setup lang="ts">
import {
  HomeIcon,
  SearchIcon,
  SettingsIcon,
  LoadingIcon
} from '@ldesign/icons/vue'
</script>
```

```vue [事件处理]
<template>
  <div>
    <HeartIcon
      :color="liked ? 'red' : 'currentColor'"
      @click="toggleLike"
      style="cursor: pointer"
    />
    <span>{{ liked ? '已喜欢' : '点击喜欢' }}</span>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { HeartIcon } from '@ldesign/icons/vue'

const liked = ref(false)
const toggleLike = () => {
  liked.value = !liked.value
}
</script>
```

:::

### React

::: code-group

```tsx [基础用法]
import { HomeIcon, SearchIcon, SettingsIcon } from '@ldesign/icons/react'

function App() {
  return (
    <div className="icons">
      <HomeIcon />
      <SearchIcon />
      <SettingsIcon />
    </div>
  )
}
```

```tsx [自定义属性]
import {
  HomeIcon,
  SearchIcon,
  SettingsIcon,
  LoadingIcon
} from '@ldesign/icons/react'

function App() {
  return (
    <div className="icons">
      {/* 自定义大小 */}
      <HomeIcon size={32} />
      
      {/* 自定义颜色 */}
      <SearchIcon color="#3b82f6" />
      
      {/* 自定义描边宽度 */}
      <SettingsIcon strokeWidth={3} />
      
      {/* 旋转动画 */}
      <LoadingIcon spin />
    </div>
  )
}
```

```tsx [事件处理]
import { useState } from 'react'
import { HeartIcon } from '@ldesign/icons/react'

function LikeButton() {
  const [liked, setLiked] = useState(false)

  return (
    <div>
      <HeartIcon
        color={liked ? 'red' : 'currentColor'}
        onClick={() => setLiked(!liked)}
        style={{ cursor: 'pointer' }}
      />
      <span>{liked ? '已喜欢' : '点击喜欢'}</span>
    </div>
  )
}
```

:::

### Lit / Web Components

::: code-group

```html [基础用法]
<!DOCTYPE html>
<html>
<head>
  <script type="module">
    import '@ldesign/icons/lit'
  </script>
</head>
<body>
  <div class="icons">
    <ld-icon-home></ld-icon-home>
    <ld-icon-search></ld-icon-search>
    <ld-icon-settings></ld-icon-settings>
  </div>
</body>
</html>
```

```html [自定义属性]
<div class="icons">
  <!-- 自定义大小 -->
  <ld-icon-home size="32"></ld-icon-home>
  
  <!-- 自定义颜色 -->
  <ld-icon-search color="#3b82f6"></ld-icon-search>
  
  <!-- 自定义描边宽度 -->
  <ld-icon-settings stroke-width="3"></ld-icon-settings>
  
  <!-- 旋转动画 -->
  <ld-icon-loading spin></ld-icon-loading>
</div>
```

```html [事件处理]
<ld-icon-heart id="likeBtn"></ld-icon-heart>
<span id="likeText">点击喜欢</span>

<script>
  const icon = document.getElementById('likeBtn')
  const text = document.getElementById('likeText')
  let liked = false

  icon.addEventListener('click', () => {
    liked = !liked
    icon.setAttribute('color', liked ? 'red' : 'currentColor')
    text.textContent = liked ? '已喜欢' : '点击喜欢'
  })
</script>
```

:::

## 常用属性

所有图标组件都支持以下属性：

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `size` | `number \| string` | `'1em'` | 图标大小，可以是数字（px）或字符串（'24px', '1em'等） |
| `color` | `string` | `'currentColor'` | 图标颜色，支持任何有效的 CSS 颜色值 |
| `strokeWidth` | `number` | `2` | 描边宽度，仅对描边图标生效 |
| `spin` | `boolean` | `false` | 是否旋转动画 |
| `rotate` | `number` | `0` | 旋转角度（度数） |
| `flip` | `'horizontal' \| 'vertical' \| 'both'` | - | 翻转方向 |

## 动画效果

### 旋转动画

适用于加载指示器：

```vue
<LoadingIcon :spin="true" />
<RefreshCwIcon :spin="true" />
```

### 自定义旋转角度

```vue
<ArrowUpIcon :rotate="45" /> <!-- 旋转 45 度 -->
<ArrowUpIcon :rotate="90" /> <!-- 旋转 90 度 -->
```

### 翻转效果

```vue
<ArrowRightIcon flip="horizontal" /> <!-- 水平翻转 -->
<ArrowRightIcon flip="vertical" />   <!-- 垂直翻转 -->
<ArrowRightIcon flip="both" />       <!-- 水平和垂直翻转 -->
```

## 响应式大小

### 使用相对单位

```vue
<!-- 跟随父元素字体大小 -->
<HomeIcon size="1em" />
<HomeIcon size="1.5em" />
<HomeIcon size="2em" />
```

### 使用 CSS 变量

```vue
<template>
  <div class="container">
    <HomeIcon />
  </div>
</template>

<style scoped>
.container {
  font-size: 24px; /* 图标会继承这个大小 */
}

@media (max-width: 768px) {
  .container {
    font-size: 16px; /* 移动端自动缩小 */
  }
}
</style>
```

## 下一步

- [安装指南](/guide/installation) - 了解更多安装选项
- [基础用法](/guide/usage) - 学习更多使用技巧
- [API 参考](/advanced/api) - 查看完整的 API 文档
- [浏览图标](/catalog) - 查看所有可用图标

