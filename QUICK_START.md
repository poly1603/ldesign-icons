# @ldesign/icons 快速开始

## 🚀 5 分钟快速上手

### 步骤 1：安装依赖

```bash
cd packages/icons
pnpm install
```

### 步骤 2：生成图标组件

```bash
# 生成 Vue/React/Lit 组件
pnpm generate

# 生成图标字体
pnpm generate:fonts
```

输出：
```
🚀 开始生成图标组件...
ℹ 找到 18 个 SVG 文件
ℹ 解析 SVG 文件...
ℹ 提取图标元数据...
ℹ 生成 Vue 组件...
✅ ✨ Vue 组件生成完成 (18 个)
ℹ 生成 React 组件...
✅ ✨ React 组件生成完成 (18 个)
ℹ 生成 Lit 组件...
✅ ✨ Lit 组件生成完成 (18 个)
ℹ 生成元数据文件...
✅ ✨ 元数据文件生成完成

🎉 成功生成 18 个图标组件！
```

### 步骤 3：查看生成的内容

```bash
# Vue 组件
src/vue/icons/Home.ts
src/vue/icons/Search.ts
...
src/vue/index.ts

# React 组件
src/react/icons/Home.tsx
src/react/icons/Search.tsx
...
src/react/index.ts

# Lit 组件
src/lit/icons/Home.ts
src/lit/icons/Search.ts
...
src/lit/index.ts

# 图标字体
fonts/ldesign-icons.ttf
fonts/ldesign-icons.woff
fonts/ldesign-icons.woff2
fonts/ldesign-icons.css
fonts/preview.html  # ← 在浏览器中打开查看所有图标
```

### 步骤 4：在项目中使用

#### Vue 3 项目

```vue
<template>
  <div class="app">
    <HomeIcon size="24" color="#1890ff" />
    <SearchIcon :spin="true" />
  </div>
</template>

<script setup lang="ts">
// 从生成的文件导入
import { HomeIcon, SearchIcon } from '@ldesign/icons/vue'
</script>
```

#### React 项目

```tsx
import { HomeIcon, SearchIcon } from '@ldesign/icons/react'

function App() {
  return (
    <div className="app">
      <HomeIcon size={24} color="#1890ff" />
      <SearchIcon spin />
    </div>
  )
}
```

#### Lit / Web Components

```html
<script type="module">
  import '@ldesign/icons/lit'
</script>

<div class="app">
  <ld-icon-home size="24" color="#1890ff"></ld-icon-home>
  <ld-icon-search spin></ld-icon-search>
</div>
```

#### 图标字体

```html
<link rel="stylesheet" href="fonts/ldesign-icons.css">

<i class="ld-icon ld-icon-home"></i>
<i class="ld-icon ld-icon-search"></i>
```

## 📦 添加新图标

### 步骤 1：准备 SVG 文件

创建或获取 SVG 文件，确保格式正确：

```svg
<!-- ✅ 正确格式 -->
<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
  <path d="M..."/>
</svg>
```

### 步骤 2：放入对应分类

```bash
# 通用图标
svg/general/my-icon.svg

# 编辑类图标
svg/editing/my-icon.svg

# 导航图标
svg/navigation/my-icon.svg
```

### 步骤 3：重新生成

```bash
pnpm generate
```

新图标会自动生成到所有框架！

## 🎨 所有可用图标

### 通用图标 (5个)
- `HomeIcon` / `ld-icon-home` - 主页
- `SearchIcon` / `ld-icon-search` - 搜索
- `SettingsIcon` / `ld-icon-settings` - 设置
- `UserIcon` / `ld-icon-user` - 用户
- `MenuIcon` / `ld-icon-menu` - 菜单

### 编辑图标 (4个)
- `EditIcon` / `ld-icon-edit` - 编辑
- `DeleteIcon` / `ld-icon-delete` - 删除
- `SaveIcon` / `ld-icon-save` - 保存
- `CopyIcon` / `ld-icon-copy` - 复制

### 导航图标 (4个)
- `ChevronDownIcon` / `ld-icon-chevron-down` - 向下
- `ChevronUpIcon` / `ld-icon-chevron-up` - 向上
- `ChevronLeftIcon` / `ld-icon-chevron-left` - 向左
- `ChevronRightIcon` / `ld-icon-chevron-right` - 向右

### 媒体图标 (2个)
- `PlayIcon` / `ld-icon-play` - 播放
- `PauseIcon` / `ld-icon-pause` - 暂停

### 状态图标 (5个)
- `LoadingIcon` / `ld-icon-loading` - 加载
- `CheckIcon` / `ld-icon-check` - 完成
- `CloseIcon` / `ld-icon-close` - 关闭
- `HeartIcon` / `ld-icon-heart` - 喜欢
- `StarIcon` / `ld-icon-star` - 星标

## 🎯 常用属性

```typescript
interface IconProps {
  size?: number | string    // 大小 (默认: '1em')
  color?: string           // 颜色 (默认: 'currentColor')
  strokeWidth?: number     // 描边宽度 (默认: 2)
  spin?: boolean          // 旋转动画 (默认: false)
  rotate?: number         // 旋转角度 (默认: 0)
  flip?: 'horizontal' | 'vertical' | 'both'  // 翻转
}
```

### 示例

```vue
<!-- 大图标 -->
<HomeIcon size="48" />

<!-- 彩色图标 -->
<HeartIcon color="red" />

<!-- 旋转动画 -->
<LoadingIcon :spin="true" />

<!-- 旋转 45 度 -->
<SettingsIcon :rotate="45" />

<!-- 水平翻转 -->
<ChevronRightIcon flip="horizontal" />
```

## 🛠️ 构建和发布

```bash
# 构建包
pnpm build

# 运行测试
pnpm test

# 发布到 NPM
pnpm publish
```

## 📚 深入学习

- [完整使用指南](./docs/USAGE.md)
- [开发指南](./docs/DEVELOPMENT.md)
- [项目计划](./PROJECT_PLAN.md)
- [实施总结](./IMPLEMENTATION_SUMMARY.md)

## ❓ 常见问题

### Q: 图标不显示？
A: 确保已运行 `pnpm generate` 生成组件

### Q: 如何改变图标颜色？
A: 使用 `color` 属性或 CSS 的 `color`

### Q: 如何自定义图标大小？
A: 使用 `size` 属性，支持数字（px）或字符串（em, rem）

### Q: 支持哪些框架？
A: Vue 3、React 18+、Lit 3+

### Q: 如何贡献新图标？
A: 将 SVG 文件放入 `svg/` 目录，运行 `pnpm generate`

## 🎉 完成！

你现在已经掌握了 @ldesign/icons 的基本使用！

有问题？查看[完整文档](./docs/USAGE.md)或提交 [Issue](https://github.com/ldesign/ldesign/issues)




