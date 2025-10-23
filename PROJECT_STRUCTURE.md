# @ldesign/icons 项目结构详解

## 📁 完整目录树

```
packages/icons/
│
├── 📁 svg/                                    # SVG 源文件（输入）
│   ├── 📁 general/                            # 通用图标（5个）
│   │   ├── 🏠 home.svg
│   │   ├── 🔍 search.svg
│   │   ├── ⚙️ settings.svg
│   │   ├── 👤 user.svg
│   │   └── ☰ menu.svg
│   │
│   ├── 📁 editing/                            # 编辑图标（4个）
│   │   ├── ✏️ edit.svg
│   │   ├── 🗑️ delete.svg
│   │   ├── 💾 save.svg
│   │   └── 📋 copy.svg
│   │
│   ├── 📁 navigation/                         # 导航图标（4个）
│   │   ├── ⬇️ chevron-down.svg
│   │   ├── ⬆️ chevron-up.svg
│   │   ├── ⬅️ chevron-left.svg
│   │   └── ➡️ chevron-right.svg
│   │
│   ├── 📁 media/                              # 媒体图标（2个）
│   │   ├── ▶️ play.svg
│   │   └── ⏸️ pause.svg
│   │
│   ├── 📁 status/                             # 状态图标（7个）
│   │   ├── ⏳ loading.svg
│   │   ├── ✔️ check.svg
│   │   ├── ❌ close.svg
│   │   ├── ❤️ heart.svg
│   │   ├── ⭐ star.svg
│   │   ├── ⬇️ download.svg
│   │   └── ⬆️ upload.svg
│   │
│   └── 📄 README.md                           # SVG 规范说明
│
├── 📁 scripts/                                # 构建脚本（核心系统）
│   │
│   ├── 📁 parsers/                            # ⚙️ 解析器系统
│   │   ├── 📄 svg-parser.ts                   # SVG 解析 + 元素转换
│   │   ├── 📄 svg-optimizer.ts                # SVGO 优化
│   │   └── 📄 metadata-extractor.ts           # 元数据提取 + 标签生成
│   │
│   ├── 📁 generators/                         # 🏗️ 组件生成器
│   │   ├── 📄 base-generator.ts               # 基础生成器类
│   │   ├── 📄 vue-generator.ts                # Vue 组件生成
│   │   ├── 📄 react-generator.ts              # React 组件生成
│   │   └── 📄 lit-generator.ts                # Lit 组件生成
│   │
│   ├── 📁 templates/                          # 📝 Handlebars 模板
│   │   ├── 📄 vue-component.hbs               # Vue 组件模板
│   │   ├── 📄 vue-index.hbs                   # Vue 索引模板
│   │   ├── 📄 react-component.hbs             # React 组件模板
│   │   ├── 📄 react-index.hbs                 # React 索引模板
│   │   ├── 📄 lit-component.hbs               # Lit 组件模板
│   │   └── 📄 lit-index.hbs                   # Lit 索引模板
│   │
│   ├── 📁 font/                               # 🔤 字体生成器
│   │   └── 📄 font-generator.ts               # TTF/WOFF/WOFF2/EOT + CSS
│   │
│   ├── 📁 utils/                              # 🛠️ 工具函数
│   │   ├── 📄 logger.ts                       # 彩色日志
│   │   └── 📄 file-utils.ts                   # 文件操作 + Prettier
│   │
│   └── 📄 generate-all.ts                     # 🚀 主生成脚本
│
├── 📁 src/                                    # 源代码（输出）
│   │
│   ├── 📁 types/                              # 📘 TypeScript 类型
│   │   └── 📄 index.ts                        # IconProps, IconDefinition 等
│   │
│   ├── 📁 utils/                              # 🔧 工具函数
│   │   └── 📄 index.ts                        # formatSize, getTransform 等
│   │
│   ├── 📁 vue/                                # ⚛️ Vue 3 组件
│   │   ├── 📄 IconBase.ts                     # Vue 基础组件
│   │   ├── 📁 icons/ (生成)                   # 22 个 Vue 图标组件
│   │   ├── 📄 index.ts                        # 统一导出
│   │   └── 📄 style.css                       # 样式
│   │
│   ├── 📁 react/                              # ⚛️ React 组件
│   │   ├── 📄 IconBase.tsx                    # React 基础组件
│   │   ├── 📁 icons/ (生成)                   # 22 个 React 图标组件
│   │   ├── 📄 index.tsx                       # 统一导出
│   │   └── 📄 style.css                       # 样式
│   │
│   ├── 📁 lit/                                # 🔥 Lit 组件（新增）
│   │   ├── 📄 IconBase.ts                     # Lit 基础组件
│   │   ├── 📁 icons/ (生成)                   # 22 个 Lit 图标组件
│   │   ├── 📄 index.ts                        # 统一导出
│   │   └── 📄 style.css                       # 样式
│   │
│   ├── 📄 metadata.json (生成)                # 图标元数据
│   └── 📄 index.ts                            # 主入口
│
├── 📁 fonts/ (生成)                           # 字体文件（输出）
│   ├── 🔤 ldesign-icons.ttf                   # TrueType 字体
│   ├── 🔤 ldesign-icons.woff                  # Web 字体
│   ├── 🔤 ldesign-icons.woff2                 # Web 字体（压缩）
│   ├── 🔤 ldesign-icons.eot                   # IE 兼容
│   ├── 📄 ldesign-icons.css                   # 样式文件
│   └── 📄 preview.html                        # 预览页面
│
├── 📁 __tests__/                              # 测试
│   └── 📁 unit/
│       ├── 📁 vue/
│       │   └── 📄 IconBase.spec.ts
│       ├── 📁 react/
│       │   └── 📄 IconBase.spec.tsx
│       ├── 📁 lit/
│       │   └── 📄 IconBase.spec.ts
│       └── 📁 utils/
│           └── 📄 utils.spec.ts
│
├── 📁 docs/                                   # 文档
│   ├── 📄 USAGE.md                            # 使用指南
│   ├── 📄 DEVELOPMENT.md                      # 开发指南
│   ├── 📄 QUICK_START.md                      # 快速开始
│   ├── 📄 IMPLEMENTATION_SUMMARY.md           # 实施总结
│   ├── 📄 VERIFICATION_CHECKLIST.md           # 验证清单
│   ├── 📄 PROJECT_COMPLETION_REPORT.md        # 完成报告
│   ├── 📄 FINAL_VERIFICATION_REPORT.md        # 最终验证
│   └── 📄 🎉_PROJECT_COMPLETE.md              # 完成庆祝
│
├── 📄 package.json                            # NPM 包配置
├── 📄 tsconfig.json                           # TypeScript 配置
├── 📄 eslint.config.js                        # ESLint 配置
├── 📄 README.md                               # 项目说明
├── 📄 LICENSE                                 # MIT 许可证
├── 📄 CHANGELOG.md                            # 变更日志
├── 📄 PROJECT_PLAN.md                         # 项目计划
└── 📄 PROJECT_STRUCTURE.md                    # 本文档
```

---

## 🔄 数据流图

### 组件生成流程

```
┌─────────────┐
│  SVG 文件   │ (22个)
│ svg/**/*.svg│
└──────┬──────┘
       │
       ↓
┌─────────────────┐
│   SvgParser     │ 解析 SVG
│ • 提取 path     │
│ • 提取 viewBox  │
│ • 转换元素      │
└──────┬──────────┘
       │
       ↓
┌──────────────────────┐
│ MetadataExtractor   │ 生成元数据
│ • 生成标签          │
│ • Unicode 映射      │
│ • RTL 判断          │
└──────┬───────────────┘
       │
       ├─────────┬─────────┬─────────┐
       ↓         ↓         ↓         ↓
   VueGen    ReactGen   LitGen   FontGen
      │         │         │         │
      ↓         ↓         ↓         ↓
   22个Vue   22个React 22个Lit  6个字体
   组件      组件      组件      文件
```

### 使用流程

```
┌──────────────┐
│ 用户安装包   │
│ pnpm add     │
│ @ldesign/    │
│ icons        │
└──────┬───────┘
       │
       ↓
┌──────────────────┐
│ 导入图标组件    │
│ import { Home   │
│ Icon } from     │
│ '@ldesign/      │
│ icons/vue'      │
└──────┬───────────┘
       │
       ↓
┌──────────────────┐
│ 使用组件         │
│ <HomeIcon       │
│   size="24"     │
│   color="blue"  │
│ />              │
└──────┬───────────┘
       │
       ↓
┌──────────────────┐
│ 按需导入         │
│ Tree-shaking    │
│ 仅打包使用的     │
│ 图标(<2KB)      │
└──────────────────┘
```

---

## 📦 包结构

### NPM 包导出

```json
{
  "exports": {
    ".": "./es/index.js",
    "./vue": "./es/vue/index.js",
    "./vue/*": "./es/vue/*.js",
    "./react": "./es/react/index.js",
    "./react/*": "./es/react/*.js",
    "./lit": "./es/lit/index.js",
    "./lit/*": "./es/lit/*.js",
    "./types": "./es/types/index.js",
    "./utils": "./es/utils/index.js"
  }
}
```

### 导入路径示例

```typescript
// 核心工具
import { iconRegistry, createIcon } from '@ldesign/icons'

// 类型
import type { IconProps } from '@ldesign/icons/types'

// Vue 组件
import { HomeIcon } from '@ldesign/icons/vue'
import { HomeIcon } from '@ldesign/icons/vue/icons/Home'

// React 组件
import { HomeIcon } from '@ldesign/icons/react'
import { HomeIcon } from '@ldesign/icons/react/icons/Home'

// Lit 组件
import { HomeIcon } from '@ldesign/icons/lit'
import { HomeIcon } from '@ldesign/icons/lit/icons/Home'
```

---

## 🔧 构建产物

### 运行 `pnpm build` 后

```
packages/icons/
├── 📁 es/                    # ESM 格式（推荐）
│   ├── index.js
│   ├── vue/
│   │   ├── index.js
│   │   └── icons/
│   │       ├── Home.js
│   │       └── ...
│   ├── react/
│   ├── lit/
│   ├── types/
│   └── utils/
│
├── 📁 lib/                   # CommonJS 格式
│   ├── index.cjs
│   ├── vue/
│   ├── react/
│   ├── lit/
│   ├── types/
│   └── utils/
│
└── 📁 fonts/                 # 字体文件
    ├── ldesign-icons.ttf
    ├── ldesign-icons.woff
    ├── ldesign-icons.woff2
    ├── ldesign-icons.eot
    ├── ldesign-icons.css
    └── preview.html
```

---

## 🎯 关键文件说明

### 核心组件

| 文件 | 作用 | 关键功能 |
|------|------|----------|
| `src/vue/IconBase.ts` | Vue 基础组件 | defineComponent, Composition API |
| `src/react/IconBase.tsx` | React 基础组件 | forwardRef, TypeScript |
| `src/lit/IconBase.ts` | Lit 基础组件 | LitElement, decorators, Shadow DOM |

### 解析器

| 文件 | 作用 | 关键功能 |
|------|------|----------|
| `scripts/parsers/svg-parser.ts` | SVG 解析 | 提取 path, 转换元素 |
| `scripts/parsers/svg-optimizer.ts` | SVG 优化 | SVGO 集成 |
| `scripts/parsers/metadata-extractor.ts` | 元数据生成 | 标签, Unicode |

### 生成器

| 文件 | 作用 | 输出 |
|------|------|------|
| `scripts/generators/vue-generator.ts` | 生成 Vue 组件 | .ts 文件 |
| `scripts/generators/react-generator.ts` | 生成 React 组件 | .tsx 文件 |
| `scripts/generators/lit-generator.ts` | 生成 Lit 组件 | .ts 文件 |

### 主脚本

| 文件 | 作用 | 命令 |
|------|------|------|
| `scripts/generate-all.ts` | 生成所有组件 | `pnpm generate` |
| `scripts/font/font-generator.ts` | 生成字体文件 | `pnpm generate:fonts` |

---

## 📋 NPM 脚本说明

### 生成相关

```bash
pnpm generate              # 生成所有框架组件
pnpm generate:vue          # 仅生成 Vue 组件
pnpm generate:react        # 仅生成 React 组件
pnpm generate:lit          # 仅生成 Lit 组件
pnpm generate:fonts        # 生成图标字体
pnpm generate:metadata     # 仅生成元数据
```

### 构建相关

```bash
pnpm build                 # 构建组件库
pnpm build:fonts           # 构建字体文件
pnpm clean                 # 清理构建产物
```

### 开发相关

```bash
pnpm dev                   # 开发模式
pnpm type-check            # 类型检查
pnpm lint                  # 代码检查
pnpm lint:check            # 检查（不修复）
```

### 测试相关

```bash
pnpm test                  # 运行测试
pnpm test:ui               # 测试 UI
pnpm test:run              # 单次测试
pnpm test:coverage         # 测试覆盖率
```

---

## 🔍 文件大小预估

### 单个组件

| 框架 | 大小（未压缩） | 大小（gzipped） |
|------|---------------|----------------|
| Vue | ~1.5KB | ~600B |
| React | ~1.2KB | ~500B |
| Lit | ~1.8KB | ~700B |

### 整个包

| 内容 | 大小 |
|------|------|
| 核心工具 | ~5KB |
| 22 个图标（单框架） | ~30KB |
| 字体文件（全部） | ~20KB |

---

## 🎓 最佳实践

### 添加新图标

1. 创建 SVG 文件
```bash
# 新建文件
svg/general/new-icon.svg
```

2. 确保格式正确
```svg
<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
  <path d="M..."/>
</svg>
```

3. 运行生成
```bash
pnpm generate
```

### 使用图标

```vue
<!-- Vue -->
<template>
  <HomeIcon size="24" color="#1890ff" />
</template>

<script setup>
import { HomeIcon } from '@ldesign/icons/vue'
</script>
```

### 自定义图标

```typescript
import { createIcon } from '@ldesign/icons'

const MyIcon = createIcon({
  name: 'my-icon',
  path: 'M...',
  viewBox: '0 0 24 24'
})
```

---

## 📊 技术栈

### 核心技术

- **TypeScript 5.7+** - 类型安全
- **Vue 3.4+** - Vue 组件
- **React 18.2+** - React 组件
- **Lit 3.1+** - Web Components

### 构建工具

- **@ldesign/builder** - 统一构建
- **SVGO** - SVG 优化
- **Handlebars** - 模板引擎
- **Prettier** - 代码格式化

### 字体工具

- **svgicons2svgfont** - SVG → Font
- **svg2ttf** - TTF 生成
- **ttf2woff** - WOFF 生成
- **ttf2woff2** - WOFF2 生成
- **ttf2eot** - EOT 生成

### 开发工具

- **Vitest** - 单元测试
- **ESLint** - 代码检查
- **Chalk** - 彩色日志
- **Fast-glob** - 文件查找

---

## 🎉 总结

这是一个**功能完善、架构清晰、文档完整**的企业级图标系统：

- ✅ **22 个 SVG 图标**（超额完成）
- ✅ **3 个框架支持**（Vue/React/Lit）
- ✅ **完整自动化构建**（一键生成）
- ✅ **图标字体生成**（6 种格式）
- ✅ **完善的文档**（9 个文档）
- ✅ **测试框架**（4 个测试套件）

**立即开始**: `pnpm install && pnpm generate` 🚀




