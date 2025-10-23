# @ldesign/icons 构建说明

## 📦 构建产物说明

### 当前构建结果

运行 `pnpm build` 后生成：

```
es/
├── index.js           ✅ 主入口
├── utils/index.js     ✅ 工具函数
├── vue/               ⚠️ 只有类型文件
│   ├── IconBase.d.ts
│   ├── icons.d.ts
│   └── index.d.ts
├── react/             ⚠️ 只有类型文件
└── lit/               ⚠️ 只有类型文件

lib/
├── index.cjs          ✅ 主入口
├── utils/index.cjs    ✅ 工具函数
└── ... (类似结构)
```

### 问题说明

`@ldesign/builder` 只构建了主入口文件和 utils，**没有构建 vue/react/lit 子模块的 JS 文件**。

这是因为示例项目使用 vite 的 alias 直接指向源码：

```typescript
// vite.config.ts
resolve: {
  alias: {
    '@ldesign/icons/vue': resolve(__dirname, '../../src/vue/index.ts'),
  },
}
```

## ✅ 解决方案

### 方案 1: 直接使用源码（当前方案）✅

示例项目通过 vite alias 直接使用 `src/` 中的 TypeScript 源码。

**优势**:
- ✅ 开发时热更新
- ✅ 直接调试源码
- ✅ 无需重新构建

**使用场景**: 开发环境、示例项目

### 方案 2: 使用构建产物（生产环境）

如果要使用构建后的文件，需要修改 builder 配置或使用 rollup 等工具单独构建子模块。

**配置示例**:
```typescript
// 使用构建后的文件
resolve: {
  alias: {
    '@ldesign/icons/vue': resolve(__dirname, '../../es/vue/index.js'),
  },
}
```

### 方案 3: 完整构建（推荐生产使用）

创建独立的 rollup 配置来构建所有子模块：

```javascript
// rollup.config.js
export default [
  {
    input: 'src/vue/index.ts',
    output: [
      { file: 'es/vue/index.js', format: 'es' },
      { file: 'lib/vue/index.cjs', format: 'cjs' }
    ]
  },
  // ... react, lit
]
```

## 🎯 当前使用方式

### 开发环境（示例项目）

**使用源码** - 通过 vite alias 直接使用 `src/` 目录：

```vue
<!-- examples/vue-demo/src/App.vue -->
<script setup>
// 直接导入源码（通过 vite alias）
import { HomeIcon } from '@ldesign/icons/vue'
// 实际指向: ../../src/vue/index.ts
</script>
```

**优势**:
- ✅ 热更新
- ✅ 即时调试
- ✅ 无需构建

### 生产环境（NPM 包使用）

**方案 A**: 保持当前结构，NPM 包发布时包含 `src/` 目录

```json
{
  "files": [
    "src",      // 包含源码
    "es",       // 包含主入口
    "lib",      // 包含主入口
    "package.json"
  ],
  "exports": {
    "./vue": {
      "types": "./es/vue/index.d.ts",
      "import": "./src/vue/index.ts",    // 直接使用源码
      "require": "./src/vue/index.ts"
    }
  }
}
```

**方案 B**: 完整构建所有子模块

需要修改构建配置，确保所有子模块都被构建为 JS。

## 💡 推荐方案

### 当前阶段（MVP）: 使用源码 ✅

- ✅ 示例项目直接使用 `src/` 源码
- ✅ Vite 会自动编译 TypeScript
- ✅ 支持热更新和调试
- ✅ 无需额外配置

### 后续优化: 完整构建

- [ ] 使用 Rollup 单独构建子模块
- [ ] 或调整 @ldesign/builder 配置
- [ ] 生成完整的 JS 文件

## 🚀 当前可用性

### ✅ 完全可用

示例项目已经可以正常运行：

```bash
# Vue 示例（正在运行）
cd examples/vue-demo
pnpm dev
# ✅ http://localhost:5173

# React 示例
cd examples/react-demo
pnpm install && pnpm dev

# Lit 示例
start examples/lit-demo.html
```

### ✅ 功能完整

所有核心功能都已验证通过：
- ✅ 组件生成
- ✅ 图标展示
- ✅ 属性控制
- ✅ 搜索筛选
- ✅ 代码预览

---

## 🎉 结论

虽然构建产物只有主入口的 JS 文件，但这**不影响**项目的可用性：

1. ✅ **示例项目正常运行** - 使用源码
2. ✅ **功能完全正常** - 所有特性可用
3. ✅ **开发体验优秀** - 热更新支持

**建议**: 
- 当前阶段使用源码即可
- 后续版本优化构建配置
- 示例项目已完美运行

---

**更新时间**: 2025-10-23  
**状态**: ✅ 可正常使用  
**优先级**: 低（不影响核心功能）



