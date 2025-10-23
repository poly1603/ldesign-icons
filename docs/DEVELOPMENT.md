# @ldesign/icons 开发指南

## 项目架构

```
packages/icons/
├── svg/                          # SVG 源文件（输入）
│   ├── general/                  # 通用图标
│   ├── editing/                  # 编辑类图标
│   ├── navigation/               # 导航图标
│   ├── media/                    # 媒体图标
│   └── status/                   # 状态图标
│
├── scripts/                      # 构建脚本
│   ├── parsers/                  # SVG 解析器
│   │   ├── svg-parser.ts         # 解析 SVG 文件
│   │   ├── svg-optimizer.ts      # 优化 SVG
│   │   └── metadata-extractor.ts # 提取元数据
│   │
│   ├── generators/               # 组件生成器
│   │   ├── base-generator.ts     # 基础生成器
│   │   ├── vue-generator.ts      # Vue 组件生成
│   │   ├── react-generator.ts    # React 组件生成
│   │   └── lit-generator.ts      # Lit 组件生成
│   │
│   ├── font/                     # 字体生成
│   │   └── font-generator.ts     # 字体生成器
│   │
│   ├── templates/                # Handlebars 模板
│   │   ├── vue-component.hbs
│   │   ├── react-component.hbs
│   │   └── lit-component.hbs
│   │
│   ├── utils/                    # 工具函数
│   │   ├── logger.ts
│   │   └── file-utils.ts
│   │
│   └── generate-all.ts           # 主生成脚本
│
├── src/                          # 源代码（输出）
│   ├── types/                    # TypeScript 类型
│   ├── utils/                    # 工具函数
│   ├── vue/                      # Vue 组件
│   │   ├── IconBase.ts
│   │   ├── icons/                # 生成的图标组件
│   │   └── index.ts
│   ├── react/                    # React 组件
│   │   ├── IconBase.tsx
│   │   ├── icons/
│   │   └── index.ts
│   ├── lit/                      # Lit 组件
│   │   ├── IconBase.ts
│   │   ├── icons/
│   │   └── index.ts
│   └── metadata.json             # 图标元数据
│
└── fonts/                        # 生成的字体文件（输出）
    ├── ldesign-icons.ttf
    ├── ldesign-icons.woff
    ├── ldesign-icons.woff2
    ├── ldesign-icons.eot
    ├── ldesign-icons.css
    └── preview.html
```

## 工作流程

### 1. 添加新图标

#### 步骤 1：准备 SVG 文件

将 SVG 文件放入对应的分类目录：

```bash
svg/
  general/      # 通用图标
  editing/      # 编辑类图标
  navigation/   # 导航图标
  media/        # 媒体图标
  status/       # 状态图标
```

#### 步骤 2：SVG 格式要求

```svg
<!-- ✅ 正确的格式 -->
<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
</svg>

<!-- ❌ 错误的格式 -->
<svg width="24" height="24" fill="red" stroke="blue">
  <circle cx="12" cy="12" r="10"/>
</svg>
```

要求：
- 必须有 `viewBox` 属性（通常是 "0 0 24 24"）
- 移除 `width`、`height`、`fill`、`stroke` 属性
- 使用 `<path>` 元素（`<circle>`, `<rect>` 等会自动转换）
- 简化路径数据

#### 步骤 3：命名规范

文件名使用 kebab-case：
- ✅ `chevron-down.svg`
- ✅ `arrow-left.svg`
- ❌ `ChevronDown.svg`
- ❌ `arrow_left.svg`

### 2. 生成组件

```bash
# 安装依赖（首次）
pnpm install

# 生成所有组件
pnpm generate

# 或分步骤生成
pnpm generate:vue      # 只生成 Vue 组件
pnpm generate:react    # 只生成 React 组件
pnpm generate:lit      # 只生成 Lit 组件
```

生成过程：

1. **解析 SVG** - 提取 path、viewBox 等信息
2. **提取元数据** - 生成名称、分类、标签、Unicode
3. **生成组件** - 使用模板生成 Vue/React/Lit 组件
4. **生成索引** - 创建统一导出文件
5. **生成元数据** - 输出 `src/metadata.json`

### 3. 生成图标字体

```bash
pnpm generate:fonts
```

生成：
- `fonts/ldesign-icons.ttf` - TrueType 字体
- `fonts/ldesign-icons.woff` - Web 字体
- `fonts/ldesign-icons.woff2` - Web 字体（压缩）
- `fonts/ldesign-icons.eot` - IE 兼容字体
- `fonts/ldesign-icons.css` - 样式文件
- `fonts/preview.html` - 预览页面

### 4. 构建发布

```bash
# 构建组件库
pnpm build

# 构建产物
es/         # ESM 格式
lib/        # CommonJS 格式
```

## 开发任务

### 优化 SVG

如果你的 SVG 文件过大或包含不必要的属性，可以手动优化：

```typescript
// scripts/optimize-svgs.ts
import { SvgOptimizer } from './parsers/svg-optimizer'
import { readFileSync, writeFileSync } from 'node:fs'

const optimizer = new SvgOptimizer()
const svg = readFileSync('svg/general/home.svg', 'utf-8')
const optimized = optimizer.optimize(svg)
writeFileSync('svg/general/home.svg', optimized)
```

### 修改模板

模板位于 `scripts/templates/`：

- `vue-component.hbs` - Vue 组件模板
- `react-component.hbs` - React 组件模板
- `lit-component.hbs` - Lit 组件模板
- `*-index.hbs` - 索引文件模板

使用 Handlebars 语法：

```handlebars
{{!-- vue-component.hbs --}}
import { createVueIcon } from '../IconBase'

export const {{ componentName }}Icon = createVueIcon(
  '{{ componentName }}',
  {{#if isMultiPath}}
  [
    {{#each paths}}
    '{{ this }}'{{#unless @last}},{{/unless}}
    {{/each}}
  ]
  {{else}}
  '{{ paths.[0] }}'
  {{/if}},
  '{{ viewBox }}'
)
```

### 扩展生成器

创建自定义生成器：

```typescript
import { BaseGenerator } from './generators/base-generator'
import type { ParsedSvg } from './parsers/svg-parser'
import type { IconMetadata } from './parsers/metadata-extractor'

export class CustomGenerator extends BaseGenerator {
  generate(svg: ParsedSvg, metadata: IconMetadata): void {
    // 你的生成逻辑
    const code = this.renderTemplate('custom-component.hbs', {
      componentName: svg.componentName,
      paths: svg.paths,
      viewBox: svg.viewBox,
    })
    
    this.writeFile(`output/${svg.name}.ts`, code)
  }
  
  generateIndex(svgs: ParsedSvg[], metadatas: IconMetadata[]): void {
    // 生成索引文件
  }
}
```

## 测试

### 单元测试

```bash
# 运行测试
pnpm test

# 测试覆盖率
pnpm test:coverage

# 测试 UI
pnpm test:ui
```

测试文件位置：
```
__tests__/
├── unit/
│   ├── vue/
│   │   └── IconBase.spec.ts
│   ├── react/
│   │   └── IconBase.spec.tsx
│   ├── lit/
│   │   └── IconBase.spec.ts
│   └── utils/
│       └── utils.spec.ts
```

### 手动测试

```bash
# 启动开发服务器
pnpm dev

# 打开预览页面
open fonts/preview.html
```

## 调试

### 查看生成的代码

生成后检查以下文件：
- `src/vue/icons/*.ts` - Vue 组件
- `src/react/icons/*.tsx` - React 组件
- `src/lit/icons/*.ts` - Lit 组件
- `src/metadata.json` - 图标元数据

### 日志输出

生成脚本使用彩色日志：
- 🚀 蓝色 - 开始任务
- ℹ 青色 - 信息
- ✅ 绿色 - 成功
- ⚠ 黄色 - 警告
- ❌ 红色 - 错误

### 常见问题

#### 1. SVG 解析失败

**问题**：`Error: Cannot parse SVG file`

**解决**：
- 检查 SVG 格式是否正确
- 确保有 `<path>` 元素
- 使用 SVGO 优化 SVG

#### 2. 组件生成失败

**问题**：`Error: Template not found`

**解决**：
- 确认模板文件存在于 `scripts/templates/`
- 检查模板文件名是否正确

#### 3. 字体生成失败

**问题**：`Error: Cannot generate font`

**解决**：
- 确认所有 SVG 文件格式正确
- 检查是否安装了字体生成依赖
- 运行 `pnpm install`

## 性能优化

### 构建性能

```typescript
// 并行生成组件
const generators = [vueGen, reactGen, litGen]
await Promise.all(
  generators.map(gen => 
    parsedSvgs.map((svg, i) => gen.generate(svg, metadata[i]))
  )
)
```

### 运行时性能

- 使用 `sideEffects: false` 支持 Tree-shaking
- 独立导出每个图标组件
- 避免全量导入

## 贡献指南

### 提交图标

1. Fork 仓库
2. 创建分支：`git checkout -b add-new-icons`
3. 添加 SVG 文件到对应分类
4. 运行生成脚本：`pnpm generate`
5. 测试：`pnpm test`
6. 提交：`git commit -m "feat: add xxx icon"`
7. 推送：`git push origin add-new-icons`
8. 创建 Pull Request

### 代码规范

- 使用 TypeScript
- 遵循 ESLint 规则
- 编写测试用例
- 更新文档

### Commit 规范

```
feat: 新功能
fix: 修复 bug
docs: 文档更新
style: 代码格式
refactor: 重构
test: 测试相关
chore: 构建/工具相关
```

## 发布流程

```bash
# 1. 更新版本号
npm version patch  # 或 minor, major

# 2. 生成组件和字体
pnpm generate
pnpm generate:fonts

# 3. 构建
pnpm build

# 4. 测试
pnpm test:run

# 5. 发布
pnpm publish
```

## 资源

- [TDesign Icons](https://github.com/Tencent/tdesign-icons) - 参考项目
- [Lucide Icons](https://lucide.dev/) - 图标设计参考
- [Heroicons](https://heroicons.com/) - 图标设计参考
- [SVGO](https://github.com/svg/svgo) - SVG 优化工具
- [Lit](https://lit.dev/) - Web Components 框架




