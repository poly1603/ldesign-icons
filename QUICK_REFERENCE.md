# Icons 包 - 快速参考

> 一页掌握 @ldesign/icons 所有信息

## 📦 安装

```bash
pnpm add @ldesign/icons
```

## 🚀 使用

### Vue 3
```vue
<template>
  <HomeIcon size="24" color="#1890ff" :strokeWidth="2" />
</template>

<script setup>
import { HomeIcon } from '@ldesign/icons/vue'
</script>
```

### React
```tsx
import { HomeIcon } from '@ldesign/icons/react'

<HomeIcon size={24} color="#1890ff" strokeWidth={2} />
```

### Lit
```html
<script type="module">
  import '@ldesign/icons/lit'
</script>

<ld-icon-home size="24" color="#1890ff" stroke-width="2"></ld-icon-home>
```

## 📊 统计

- **图标总数**: 347
- **分类数**: 10
- **框架**: Vue 3, React, Lit
- **包大小**: 1.5 MB (gzipped)

## 🎨 属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| size | number/string | '1em' | 大小 |
| color | string | 'currentColor' | 颜色 |
| strokeWidth | number | 2 | 描边宽度 ⭐ |
| spin | boolean | false | 旋转动画 |
| rotate | number | 0 | 旋转角度 |
| flip | string | - | 翻转方向 |

## 📂 分类

- 🏠 通用 (42) - home, search, settings...
- ✏️ 编辑 (23) - edit, delete, save...
- 🧭 导航 (47) - arrows, chevrons...
- 🎵 媒体 (35) - play, pause, music...
- ✅ 状态 (46) - check, loading, wifi...
- 📄 文件 (36) - file, folder...
- 💬 通讯 (33) - mail, phone, message...
- 💼 商务 (30) - calendar, chart...
- 🌤️ 天气 (23) - sun, cloud, rain...
- 💻 设备 (32) - laptop, phone...

## 🔗 文档

- [图标目录](./ICONS_CATALOG.md) - 完整列表
- [迁移指南](./MIGRATION_GUIDE.md) - 从其他库迁移
- [自定义指南](./CUSTOMIZATION.md) - 添加自定义图标

## 🎮 演示

```bash
cd packages/icons/examples/vue-demo
npm install && npm run dev
```

## ⚡ 性能

| 场景 | 大小 |
|------|------|
| 单图标 | ~1KB |
| 20图标 | ~15KB |
| 100图标 | ~70KB |

比主流库小 **20-30%**！

## 📝 快速命令

```bash
# 构建
pnpm build

# 生成图标
pnpm generate

# 下载新图标
npx tsx scripts/download-lucide.ts

# 运行示例
cd examples/vue-demo && npm run dev
```

---

**更多信息**: [README.md](./README.md)


