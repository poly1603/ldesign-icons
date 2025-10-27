# 示例

浏览各种使用场景的完整示例代码。

## 🚀 快速开始

选择你使用的框架：

<div class="feature-list">
  <div class="feature-item">
    <h3>📦 Vue 3</h3>
    <p>查看 Vue 3 组合式 API 示例</p>
    <a href="/examples/vue">查看示例 →</a>
  </div>

  <div class="feature-item">
    <h3>⚛️ React</h3>
    <p>查看 React Hooks 示例</p>
    <a href="/examples/react">查看示例 →</a>
  </div>

  <div class="feature-item">
    <h3>💡 Lit</h3>
    <p>查看 Web Components 示例</p>
    <a href="/examples/lit">查看示例 →</a>
  </div>
</div>

## 📚 示例分类

### 基础用法

- [基本图标显示](/examples/vue#基本显示)
- [自定义大小和颜色](/examples/vue#自定义属性)
- [事件处理](/examples/vue#事件处理)

### 进阶用法

- [动态图标切换](/examples/vue#动态图标)
- [图标动画](/examples/vue#动画效果)
- [响应式设计](/examples/vue#响应式)

### 实际应用

- [导航菜单](/examples/vue#导航菜单)
- [按钮图标](/examples/vue#按钮图标)
- [表单图标](/examples/vue#表单图标)
- [状态图标](/examples/vue#状态图标)

### 高级示例

- [图标选择器](/examples/interactive#图标选择器)
- [图标搜索](/examples/interactive#图标搜索)
- [图标库预览](/examples/interactive#图标库)

## 🎮 交互式演示

运行完整的交互式演示应用：

### Vue Demo

```bash
cd packages/icons/examples/vue-demo
pnpm install
pnpm dev
```

功能：
- ✨ 347+ 图标实时预览
- 🎨 动态调整 strokeWidth
- 🌗 深色/浅色主题切换
- 📋 一键复制代码
- 🔍 智能搜索和过滤

### React Demo

```bash
cd packages/icons/examples/react-demo
pnpm install
pnpm dev
```

功能：
- 🎯 完整的图标展示
- 💡 实时属性编辑
- 📱 响应式布局
- 🎨 主题定制

### Lit Demo

直接在浏览器中打开：

```bash
open packages/icons/examples/lit-demo.html
```

## 📖 代码片段

### 图标按钮

::: code-group

```vue [Vue]
<template>
  <button class="icon-button" @click="handleClick">
    <HomeIcon />
    <span>首页</span>
  </button>
</template>

<script setup lang="ts">
import { HomeIcon } from '@ldesign/icons/vue'

const handleClick = () => {
  console.log('点击首页')
}
</script>

<style scoped>
.icon-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border: none;
  background: #3b82f6;
  color: white;
  border-radius: 0.375rem;
  cursor: pointer;
}
</style>
```

```tsx [React]
import { HomeIcon } from '@ldesign/icons/react'

function IconButton() {
  return (
    <button className="icon-button" onClick={() => console.log('点击首页')}>
      <HomeIcon />
      <span>首页</span>
    </button>
  )
}

// CSS
const styles = {
  iconButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.5rem 1rem',
    border: 'none',
    background: '#3b82f6',
    color: 'white',
    borderRadius: '0.375rem',
    cursor: 'pointer',
  }
}
```

:::

### 导航菜单

::: code-group

```vue [Vue]
<template>
  <nav>
    <a
      v-for="item in menuItems"
      :key="item.path"
      :href="item.path"
      class="nav-item"
      :class="{ active: currentPath === item.path }"
    >
      <component :is="item.icon" />
      <span>{{ item.label }}</span>
    </a>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { HomeIcon, SearchIcon, SettingsIcon, UserIcon } from '@ldesign/icons/vue'

const currentPath = ref('/')

const menuItems = [
  { path: '/', label: '首页', icon: HomeIcon },
  { path: '/search', label: '搜索', icon: SearchIcon },
  { path: '/settings', label: '设置', icon: SettingsIcon },
  { path: '/profile', label: '个人', icon: UserIcon },
]
</script>
```

```tsx [React]
import { useState } from 'react'
import { HomeIcon, SearchIcon, SettingsIcon, UserIcon } from '@ldesign/icons/react'

const menuItems = [
  { path: '/', label: '首页', icon: HomeIcon },
  { path: '/search', label: '搜索', icon: SearchIcon },
  { path: '/settings', label: '设置', icon: SettingsIcon },
  { path: '/profile', label: '个人', icon: UserIcon },
]

function Navigation() {
  const [currentPath, setCurrentPath] = useState('/')

  return (
    <nav>
      {menuItems.map(item => (
        <a
          key={item.path}
          href={item.path}
          className={`nav-item ${currentPath === item.path ? 'active' : ''}`}
          onClick={() => setCurrentPath(item.path)}
        >
          <item.icon />
          <span>{item.label}</span>
        </a>
      ))}
    </nav>
  )
}
```

:::

### 加载状态

::: code-group

```vue [Vue]
<template>
  <button :disabled="loading" @click="handleSubmit">
    <LoadingIcon v-if="loading" :spin="true" />
    <CheckIcon v-else />
    <span>{{ loading ? '提交中...' : '提交' }}</span>
  </button>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { LoadingIcon, CheckIcon } from '@ldesign/icons/vue'

const loading = ref(false)

const handleSubmit = async () => {
  loading.value = true
  try {
    await submitForm()
  } finally {
    loading.value = false
  }
}
</script>
```

```tsx [React]
import { useState } from 'react'
import { LoadingIcon, CheckIcon } from '@ldesign/icons/react'

function SubmitButton() {
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    setLoading(true)
    try {
      await submitForm()
    } finally {
      setLoading(false)
    }
  }

  return (
    <button disabled={loading} onClick={handleSubmit}>
      {loading ? <LoadingIcon spin /> : <CheckIcon />}
      <span>{loading ? '提交中...' : '提交'}</span>
    </button>
  )
}
```

:::

## 🎨 样式示例

### Tailwind CSS

```vue
<template>
  <div class="flex items-center gap-4">
    <HomeIcon class="w-6 h-6 text-blue-500" />
    <SearchIcon class="w-8 h-8 text-gray-700 hover:text-blue-500 transition" />
    <SettingsIcon class="w-10 h-10 text-green-600" />
  </div>
</template>
```

### CSS Modules

```vue
<template>
  <HomeIcon :class="$style.icon" />
</template>

<style module>
.icon {
  width: 24px;
  height: 24px;
  color: #3b82f6;
  transition: color 0.3s;
}

.icon:hover {
  color: #2563eb;
}
</style>
```

## 📦 更多示例

- [完整 Vue 示例](/examples/vue)
- [完整 React 示例](/examples/react)
- [完整 Lit 示例](/examples/lit)
- [交互式演示](/examples/interactive)

## 🔗 相关资源

- [GitHub 仓库](https://github.com/ldesign/ldesign)
- [NPM 包](https://www.npmjs.com/package/@ldesign/icons)
- [问题反馈](https://github.com/ldesign/ldesign/issues)

