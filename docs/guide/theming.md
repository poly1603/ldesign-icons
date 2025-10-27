# 主题定制

@ldesign/icons 提供了灵活的主题定制能力，可以轻松适配你的设计系统。

## 使用 CSS 变量

推荐使用 CSS 变量来管理图标的主题：

```css
:root {
  /* 浅色主题 */
  --icon-color-primary: #3b82f6;
  --icon-color-secondary: #64748b;
  --icon-color-success: #10b981;
  --icon-color-warning: #f59e0b;
  --icon-color-error: #ef4444;
  --icon-size-sm: 16px;
  --icon-size-md: 24px;
  --icon-size-lg: 32px;
}

[data-theme="dark"] {
  /* 深色主题 */
  --icon-color-primary: #60a5fa;
  --icon-color-secondary: #94a3b8;
  --icon-color-success: #34d399;
  --icon-color-warning: #fbbf24;
  --icon-color-error: #f87171;
}
```

在组件中使用：

```vue
<template>
  <div class="icon-group">
    <HomeIcon class="icon-primary" />
    <SearchIcon class="icon-secondary" />
    <CheckIcon class="icon-success" />
  </div>
</template>

<style scoped>
.icon-primary {
  color: var(--icon-color-primary);
  font-size: var(--icon-size-md);
}

.icon-secondary {
  color: var(--icon-color-secondary);
  font-size: var(--icon-size-md);
}

.icon-success {
  color: var(--icon-color-success);
  font-size: var(--icon-size-md);
}
</style>
```

## 深色模式

### 自动检测系统主题

```css
/* 浅色模式（默认） */
:root {
  --icon-color: #1f2937;
  --icon-bg: #ffffff;
}

/* 深色模式 */
@media (prefers-color-scheme: dark) {
  :root {
    --icon-color: #f9fafb;
    --icon-bg: #111827;
  }
}
```

### 手动切换主题

```vue
<template>
  <div :data-theme="theme">
    <button @click="toggleTheme">
      <SunIcon v-if="theme === 'dark'" />
      <MoonIcon v-else />
    </button>
    <HomeIcon />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { HomeIcon, SunIcon, MoonIcon } from '@ldesign/icons/vue'

const theme = ref<'light' | 'dark'>('light')

const toggleTheme = () => {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
}
</script>

<style scoped>
[data-theme="light"] {
  --icon-color: #1f2937;
}

[data-theme="dark"] {
  --icon-color: #f9fafb;
}

svg {
  color: var(--icon-color);
}
</style>
```

## 颜色方案

### 语义化颜色

```vue
<template>
  <div class="status-icons">
    <CheckCircleIcon class="icon-success" />
    <AlertCircleIcon class="icon-warning" />
    <XCircleIcon class="icon-error" />
    <InfoIcon class="icon-info" />
  </div>
</template>

<style scoped>
.icon-success {
  color: #10b981;
}

.icon-warning {
  color: #f59e0b;
}

.icon-error {
  color: #ef4444;
}

.icon-info {
  color: #3b82f6;
}
</style>
```

### 品牌颜色

```css
:root {
  /* 主品牌色 */
  --brand-primary: #3b82f6;
  --brand-secondary: #8b5cf6;
  
  /* 渐变色 */
  --brand-gradient: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
}

.icon-brand {
  color: var(--brand-primary);
}

.icon-brand-gradient {
  background: var(--brand-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

## 大小系统

### 定义尺寸规范

```css
:root {
  /* 尺寸系统 */
  --icon-size-xs: 12px;
  --icon-size-sm: 16px;
  --icon-size-md: 24px;
  --icon-size-lg: 32px;
  --icon-size-xl: 48px;
  
  /* 或使用 rem */
  --icon-size-xs: 0.75rem;
  --icon-size-sm: 1rem;
  --icon-size-md: 1.5rem;
  --icon-size-lg: 2rem;
  --icon-size-xl: 3rem;
}
```

### 使用尺寸类

```vue
<template>
  <div>
    <HomeIcon class="icon-xs" />
    <HomeIcon class="icon-sm" />
    <HomeIcon class="icon-md" />
    <HomeIcon class="icon-lg" />
    <HomeIcon class="icon-xl" />
  </div>
</template>

<style scoped>
.icon-xs { font-size: var(--icon-size-xs); }
.icon-sm { font-size: var(--icon-size-sm); }
.icon-md { font-size: var(--icon-size-md); }
.icon-lg { font-size: var(--icon-size-lg); }
.icon-xl { font-size: var(--icon-size-xl); }
</style>
```

## 与 UI 框架集成

### Tailwind CSS

```vue
<template>
  <div>
    <!-- 使用 Tailwind 类 -->
    <HomeIcon class="w-6 h-6 text-blue-500" />
    <SearchIcon class="w-8 h-8 text-gray-700 hover:text-blue-500" />
  </div>
</template>
```

配置 Tailwind 自定义尺寸：

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      fontSize: {
        'icon-xs': '12px',
        'icon-sm': '16px',
        'icon-md': '24px',
        'icon-lg': '32px',
        'icon-xl': '48px',
      }
    }
  }
}
```

### Element Plus

```vue
<template>
  <el-button type="primary">
    <HomeIcon class="el-icon" />
    首页
  </el-button>
</template>

<style scoped>
.el-icon {
  margin-right: 8px;
  vertical-align: middle;
}
</style>
```

### Ant Design

```tsx
import { Button } from 'antd'
import { HomeIcon } from '@ldesign/icons/react'

function App() {
  return (
    <Button type="primary" icon={<HomeIcon />}>
      首页
    </Button>
  )
}
```

## 动画主题

### 悬停效果

```vue
<template>
  <HomeIcon class="icon-hover" />
</template>

<style scoped>
.icon-hover {
  transition: all 0.3s ease;
}

.icon-hover:hover {
  color: #3b82f6;
  transform: scale(1.1);
}
</style>
```

### 脉冲动画

```vue
<template>
  <BellIcon class="icon-pulse" />
</template>

<style scoped>
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.icon-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>
```

### 弹跳动画

```vue
<template>
  <ArrowDownIcon class="icon-bounce" />
</template>

<style scoped>
@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.icon-bounce {
  animation: bounce 1s ease-in-out infinite;
}
</style>
```

## 创建图标组件库

### 封装常用图标

```vue
<!-- components/IconButton.vue -->
<template>
  <button class="icon-button" :class="[type, size]">
    <component :is="icon" />
    <span v-if="$slots.default"><slot /></span>
  </button>
</template>

<script setup lang="ts">
import type { Component } from 'vue'

defineProps<{
  icon: Component
  type?: 'primary' | 'secondary' | 'danger'
  size?: 'sm' | 'md' | 'lg'
}>()
</script>

<style scoped>
.icon-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: all 0.2s;
}

.primary { background: #3b82f6; color: white; }
.secondary { background: #e5e7eb; color: #374151; }
.danger { background: #ef4444; color: white; }

.sm { padding: 0.25rem 0.5rem; font-size: 14px; }
.md { padding: 0.5rem 1rem; font-size: 16px; }
.lg { padding: 0.75rem 1.5rem; font-size: 18px; }
</style>
```

使用：

```vue
<template>
  <IconButton :icon="HomeIcon" type="primary">
    首页
  </IconButton>
  <IconButton :icon="TrashIcon" type="danger" size="sm">
    删除
  </IconButton>
</template>

<script setup lang="ts">
import { HomeIcon, TrashIcon } from '@ldesign/icons/vue'
import IconButton from './components/IconButton.vue'
</script>
```

## 响应式主题

```css
:root {
  --icon-size: 24px;
}

/* 平板 */
@media (max-width: 1024px) {
  :root {
    --icon-size: 20px;
  }
}

/* 手机 */
@media (max-width: 768px) {
  :root {
    --icon-size: 16px;
  }
}
```

## 最佳实践

### ✅ 推荐

- 使用 CSS 变量管理主题
- 定义统一的尺寸系统
- 使用语义化的颜色名称
- 提供深色模式支持

### ❌ 避免

- 在每个组件中硬编码颜色和尺寸
- 过度使用动画效果
- 忽略可访问性

## 下一步

- [性能优化](/guide/performance) - 了解性能优化技巧
- [API 参考](/advanced/api) - 查看完整的 API 文档
- [示例](/examples/) - 查看更多示例

