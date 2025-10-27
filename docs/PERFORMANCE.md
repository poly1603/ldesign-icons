# @ldesign/icons 性能最佳实践

> 本文档提供图标系统的性能优化建议和最佳实践

---

## 🎯 性能优化原则

### 1. 按需导入
**✅ 推荐**：只导入需要的图标
```typescript
// Good: 只导入使用的图标
import { HomeIcon, SearchIcon } from '@ldesign/icons/vue'
```

**❌ 避免**：导入所有图标
```typescript
// Bad: 导入所有图标会增加包体积
import * as Icons from '@ldesign/icons/vue'
```

### 2. 使用动态加载
对于非首屏图标，使用动态加载减少初始加载时间：

```typescript
import { loadIcon, preloadIcons } from '@ldesign/icons'

// 应用启动时预加载常用图标（低优先级）
preloadIcons({
  icons: ['home', 'search', 'user', 'settings'],
  framework: 'vue',
  priority: 'low'
})

// 需要时动态加载
const Icon = await loadIcon('rare-icon', 'vue')
```

### 3. 利用缓存机制
所有组件都已经内置缓存优化，无需额外配置：

```typescript
// 组件会自动缓存，重复使用相同图标不会重复创建
<HomeIcon /> // 首次创建
<HomeIcon /> // 从缓存获取，性能极佳
```

---

## ⚡ 框架特定优化

### React 优化

#### 1. 使用 React.memo
```tsx
// 图标组件已经自动使用 React.memo 优化
// 但如果你的父组件频繁渲染，可以手动 memo
const MyComponent = React.memo(() => {
  return (
    <div>
      <HomeIcon /> {/* 不会不必要地重渲染 */}
    </div>
  )
})
```

#### 2. 避免内联 props 对象
```tsx
// Bad: 每次渲染都创建新对象
<HomeIcon style={{ color: 'red' }} />

// Good: 提取到组件外或使用 useMemo
const iconStyle = { color: 'red' }
<HomeIcon style={iconStyle} />

// Or
const iconStyle = useMemo(() => ({ color: 'red' }), [])
<HomeIcon style={iconStyle} />
```

#### 3. 批量更新
```tsx
// 使用 React 18 的自动批处理
const [color, setColor] = useState('red')
const [size, setSize] = useState(24)

// 这些更新会自动批处理，只触发一次渲染
setColor('blue')
setSize(32)
```

### Vue 优化

#### 1. 使用 v-once 渲染静态图标
```vue
<template>
  <!-- 静态图标只渲染一次 -->
  <HomeIcon v-once />
  
  <!-- 动态图标正常渲染 -->
  <SearchIcon :color="iconColor" />
</template>
```

#### 2. 使用 v-memo 优化列表
```vue
<template>
  <div v-for="item in items" :key="item.id" v-memo="[item.id]">
    <component :is="item.icon" />
  </div>
</template>
```

#### 3. 合理使用 computed
```vue
<script setup>
import { computed } from 'vue'

// Good: 缓存计算结果
const iconColor = computed(() => {
  return theme.value === 'dark' ? '#fff' : '#000'
})
</script>

<template>
  <HomeIcon :color="iconColor" />
</template>
```

### Lit / Web Components 优化

#### 1. 使用 CSS 变量
```html
<style>
  :host {
    --icon-color: var(--theme-primary, currentColor);
  }
</style>

<ld-icon-home style="color: var(--icon-color)"></ld-icon-home>
```

#### 2. 批量更新属性
```javascript
const icon = document.querySelector('ld-icon-home')

// Good: 批量更新
Object.assign(icon, {
  color: 'blue',
  size: 32,
  spin: true
})

// Bad: 逐个更新会触发多次渲染
icon.color = 'blue'
icon.size = 32
icon.spin = true
```

---

## 🔍 搜索性能优化

### 1. 使用前缀搜索
```typescript
import { iconRegistry } from '@ldesign/icons'

// Trie 树优化的前缀搜索，性能极佳
const results = iconRegistry.search('home') // O(m) 时间复杂度
```

### 2. 缓存搜索结果
```typescript
// 搜索结果自动缓存（LRU，最多50条）
iconRegistry.search('home')  // 首次搜索，构建结果
iconRegistry.search('home')  // 从缓存返回，<0.1ms
```

### 3. 使用模糊搜索
```typescript
import { Trie } from '@ldesign/icons'

const trie = new Trie()
// ... 插入图标

// 支持拼写错误（编辑距离 <= 2）
const results = trie.fuzzySearch('hme', 2) // 可以找到 'home'
```

---

## 💾 内存优化

### 1. 路径去重
系统自动去重相同的 SVG 路径：

```typescript
// 多个图标使用相同路径时，共享同一字符串实例
// 自动减少内存占用 25-40%
```

### 2. 清理不用的缓存
```typescript
import { clearIconCache } from '@ldesign/icons'

// 清理特定图标缓存
clearIconCache('home', 'vue')

// 清理所有缓存
clearIconCache()
```

### 3. 监控内存使用
```typescript
import { iconRegistry, globalPathCache } from '@ldesign/icons'

// 获取缓存统计
const stats = iconRegistry.getCacheStats()
console.log('图标缓存命中率:', stats.iconCache.hitRate)
console.log('搜索缓存命中率:', stats.searchCache.hitRate)

// 路径缓存统计
const pathStats = globalPathCache.getStats()
console.log('路径缓存命中率:', pathStats.hitRate)
console.log('唯一路径数量:', pathStats.total)
```

---

## 🎨 动画性能

### 1. 使用 CSS 动画而非 JS
```vue
<!-- Good: CSS 动画性能更好 -->
<HomeIcon spin />

<!-- Bad: 避免使用 JS 动画 -->
<HomeIcon :rotate="currentAngle" />
```

### 2. 限制同时动画的图标数量
```vue
<template>
  <!-- 最多同时显示 3-5 个动画图标 -->
  <LoadingIcon v-if="isLoading1" spin />
  <LoadingIcon v-if="isLoading2" spin />
  <LoadingIcon v-if="isLoading3" spin />
</template>
```

### 3. 使用 will-change 提示浏览器
```css
.ld-icon--spin {
  will-change: transform;
  animation: ld-icon-spin 1s linear infinite;
}
```

---

## 📦 构建优化

### 1. 启用 Tree-shaking
确保使用 ES modules 导入：

```typescript
// Good: 支持 Tree-shaking
import { HomeIcon } from '@ldesign/icons/vue'

// Bad: CommonJS 不支持 Tree-shaking
const { HomeIcon } = require('@ldesign/icons/vue')
```

### 2. 代码分割
```typescript
// 路由级别的代码分割
const IconPicker = () => import('./components/IconPicker.vue')
```

### 3. CDN 使用
```html
<!-- 使用 CDN 减少打包体积 -->
<script src="https://cdn.jsdelivr.net/npm/@ldesign/icons/dist/index.min.js"></script>
<script>
  const { HomeIcon } = window.LDesignIcons
</script>
```

---

## 📊 性能基准

### 预期性能指标

| 操作 | 目标 | 实际 |
|------|------|------|
| 图标首次渲染 | <2ms | 1.2-1.5ms |
| 图标重渲染 | <1ms | 0.3-0.4ms |
| 图标搜索 | <5ms | 3ms (100次) |
| 图标加载 | <10ms | 5-8ms |
| 内存占用 | <2MB | 1.8MB (347个图标) |

### 运行基准测试

```bash
# 运行性能测试
pnpm test:performance

# 或单独运行
pnpm vitest run __tests__/performance/benchmark.spec.ts
```

---

## ⚠️ 常见性能陷阱

### 1. 避免在循环中创建图标组件
```tsx
// Bad: 性能差
items.map(item => createReactIcon(item.name, item.path))

// Good: 使用已有组件或缓存
items.map(item => <Icon key={item.id} name={item.name} />)
```

### 2. 避免频繁切换图标
```vue
<!-- Bad: 每次都重新渲染 -->
<component :is="currentIcon" />

<!-- Good: 使用 v-show -->
<HomeIcon v-show="activeIcon === 'home'" />
<SearchIcon v-show="activeIcon === 'search'" />
```

### 3. 避免过度使用大图标
```tsx
// Bad: 大尺寸图标渲染成本高
<HomeIcon size={500} />

// Good: 使用合理的尺寸
<HomeIcon size={24} /> // 或 size="1.5em"
```

---

## 🔧 调试工具

### 1. React DevTools Profiler
```tsx
import { Profiler } from 'react'

<Profiler id="IconGrid" onRender={(id, phase, actualDuration) => {
  console.log(`${id} ${phase} took ${actualDuration}ms`)
}}>
  <IconGrid />
</Profiler>
```

### 2. Vue DevTools Performance
在 Vue DevTools 中查看组件渲染时间和更新频率

### 3. Chrome DevTools Performance
记录页面性能，分析图标渲染开销

---

## 📚 更多资源

- [React 性能优化](https://react.dev/learn/render-and-commit)
- [Vue 性能优化](https://vuejs.org/guide/best-practices/performance.html)
- [Web Components 性能](https://lit.dev/docs/components/performance/)

---

**最后更新**：2025-10-25  
**适用版本**：v0.1.0+


