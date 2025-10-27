# API 参考

完整的 API 文档和类型定义。

## IconProps

所有图标组件的基础 Props 类型。

```ts
interface IconProps {
  /**
   * 图标大小
   * @default '1em'
   */
  size?: number | string

  /**
   * 图标颜色
   * @default 'currentColor'
   */
  color?: string

  /**
   * 描边宽度（仅对描边图标生效）
   * @default 2
   */
  strokeWidth?: number

  /**
   * 是否旋转动画
   * @default false
   */
  spin?: boolean

  /**
   * 旋转角度（度数）
   * @default 0
   */
  rotate?: number

  /**
   * 翻转方向
   */
  flip?: 'horizontal' | 'vertical' | 'both'
}
```

## Vue 组件

### Props

```ts
interface VueIconProps extends IconProps {
  /**
   * CSS 类名
   */
  class?: string

  /**
   * 内联样式
   */
  style?: StyleValue
}
```

### 事件

所有原生 DOM 事件：

```ts
interface IconEvents {
  onClick?: (event: MouseEvent) => void
  onMouseenter?: (event: MouseEvent) => void
  onMouseleave?: (event: MouseEvent) => void
  // ... 其他 DOM 事件
}
```

### 示例

```vue
<template>
  <HomeIcon
    :size="24"
    color="#3b82f6"
    :stroke-width="2"
    :spin="false"
    :rotate="0"
    @click="handleClick"
  />
</template>
```

## React 组件

### Props

```ts
import type { SVGAttributes } from 'react'

interface ReactIconProps extends IconProps, Omit<SVGAttributes<SVGElement>, 'color'> {
  /**
   * CSS 类名
   */
  className?: string

  /**
   * Ref 转发
   */
  ref?: React.Ref<SVGSVGElement>
}
```

### 示例

```tsx
<HomeIcon
  size={24}
  color="#3b82f6"
  strokeWidth={2}
  spin={false}
  rotate={0}
  onClick={handleClick}
  ref={iconRef}
/>
```

## Lit 组件

### 属性

```ts
interface LitIconAttributes {
  /**
   * 图标大小
   */
  size?: string

  /**
   * 图标颜色
   */
  color?: string

  /**
   * 描边宽度
   */
  'stroke-width'?: string

  /**
   * 是否旋转
   */
  spin?: boolean | ''

  /**
   * 旋转角度
   */
  rotate?: string

  /**
   * 翻转方向
   */
  flip?: 'horizontal' | 'vertical' | 'both'
}
```

### 示例

```html
<ld-icon-home
  size="24"
  color="#3b82f6"
  stroke-width="2"
  spin
  rotate="45"
></ld-icon-home>
```

## 工具函数

### createIcon

创建自定义图标组件。

```ts
function createIcon(config: IconConfig): IconComponent

interface IconConfig {
  /**
   * 图标名称（用于 displayName）
   */
  name: string

  /**
   * SVG viewBox
   * @default '0 0 24 24'
   */
  viewBox?: string

  /**
   * SVG 路径或内容
   */
  path: string

  /**
   * 是否为描边图标
   * @default true
   */
  stroke?: boolean
}
```

#### Vue 示例

```ts
import { createIcon } from '@ldesign/icons/utils'

export const CustomIcon = createIcon({
  name: 'custom',
  viewBox: '0 0 24 24',
  path: '<path d="M..." />',
  stroke: true
})
```

#### React 示例

```tsx
import { createIcon } from '@ldesign/icons/utils'

export const CustomIcon = createIcon({
  name: 'custom',
  viewBox: '0 0 24 24',
  path: '<path d="M..." />',
})
```

### loadIcon

动态加载图标。

```ts
function loadIcon(name: string): Promise<IconComponent>
```

#### 示例

```ts
const HomeIcon = await loadIcon('Home')
```

### getIconNames

获取所有可用图标名称。

```ts
function getIconNames(): string[]
```

#### 示例

```ts
import { getIconNames } from '@ldesign/icons/utils'

const names = getIconNames()
// ['Home', 'Search', 'Settings', ...]
```

### getIconsByCategory

按分类获取图标。

```ts
function getIconsByCategory(category: IconCategory): string[]

type IconCategory =
  | 'general'
  | 'editing'
  | 'navigation'
  | 'media'
  | 'status'
  | 'file'
  | 'communication'
  | 'business'
  | 'weather'
  | 'devices'
```

#### 示例

```ts
import { getIconsByCategory } from '@ldesign/icons/utils'

const generalIcons = getIconsByCategory('general')
// ['Home', 'Search', 'Settings', ...]
```

## 类型定义

### IconComponent

```ts
// Vue
type VueIconComponent = Component<VueIconProps>

// React
type ReactIconComponent = React.ForwardRefExoticComponent<
  ReactIconProps & React.RefAttributes<SVGSVGElement>
>

// Lit
type LitIconComponent = typeof LitElement
```

### IconMetadata

图标元数据类型。

```ts
interface IconMetadata {
  /**
   * 图标名称
   */
  name: string

  /**
   * 图标分类
   */
  category: IconCategory

  /**
   * 标签（用于搜索）
   */
  tags: string[]

  /**
   * viewBox
   */
  viewBox: string

  /**
   * 是否为描边图标
   */
  stroke: boolean

  /**
   * SVG 路径
   */
  path: string
}
```

## CSS 类

### 预定义类

```css
/* 旋转动画 */
.icon-spin {
  animation: icon-spin 1s linear infinite;
}

@keyframes icon-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* 翻转 */
.icon-flip-horizontal {
  transform: scaleX(-1);
}

.icon-flip-vertical {
  transform: scaleY(-1);
}

.icon-flip-both {
  transform: scale(-1, -1);
}
```

### 使用示例

```vue
<HomeIcon class="icon-spin" />
```

## 常量

### 默认值

```ts
export const DEFAULT_SIZE = '1em'
export const DEFAULT_COLOR = 'currentColor'
export const DEFAULT_STROKE_WIDTH = 2
export const DEFAULT_SPIN = false
export const DEFAULT_ROTATE = 0
```

### 图标分类

```ts
export const ICON_CATEGORIES = [
  'general',
  'editing',
  'navigation',
  'media',
  'status',
  'file',
  'communication',
  'business',
  'weather',
  'devices',
] as const
```

## 错误处理

### IconError

```ts
class IconError extends Error {
  constructor(message: string, public code: string) {
    super(message)
    this.name = 'IconError'
  }
}

// 错误码
export enum IconErrorCode {
  NOT_FOUND = 'ICON_NOT_FOUND',
  INVALID_NAME = 'ICON_INVALID_NAME',
  LOAD_FAILED = 'ICON_LOAD_FAILED',
}
```

### 示例

```ts
try {
  const icon = await loadIcon('NonExistent')
} catch (error) {
  if (error instanceof IconError) {
    if (error.code === IconErrorCode.NOT_FOUND) {
      console.error('图标不存在')
    }
  }
}
```

## 下一步

- [自定义图标](/advanced/custom-icons) - 创建自定义图标
- [动态加载](/advanced/dynamic-loading) - 动态加载图标
- [示例](/examples/) - 查看更多示例

