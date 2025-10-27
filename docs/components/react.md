# React 组件

@ldesign/icons 为 React 提供了完整的图标组件支持，包括 TypeScript 类型定义。

## 安装

```bash
pnpm add @ldesign/icons
```

确保你的项目使用 React 18+：

```bash
pnpm add react@^18.0.0 react-dom@^18.0.0
```

## 导入

### 按需导入（推荐）

```tsx
import { HomeIcon, SearchIcon, SettingsIcon } from '@ldesign/icons/react'
```

### 类型导入

```tsx
import type { IconProps } from '@ldesign/icons/types'
```

## 基础用法

```tsx
import { HomeIcon } from '@ldesign/icons/react'

function App() {
  return (
    <div>
      <HomeIcon />
    </div>
  )
}
```

## Props

所有 React 图标组件都接受以下 props：

### size

- **类型**：`number | string`
- **默认值**：`'1em'`

```tsx
<HomeIcon size={24} />
<HomeIcon size="1.5em" />
<HomeIcon size="2rem" />
```

### color

- **类型**：`string`
- **默认值**：`'currentColor'`

```tsx
<HomeIcon color="#3b82f6" />
<HomeIcon color="rgb(59, 130, 246)" />
<HomeIcon color="var(--primary-color)" />
```

### strokeWidth

- **类型**：`number`
- **默认值**：`2`

```tsx
<HomeIcon strokeWidth={1} />
<HomeIcon strokeWidth={3} />
```

### spin

- **类型**：`boolean`
- **默认值**：`false`

```tsx
<LoadingIcon spin />
<RefreshCwIcon spin />
```

### rotate

- **类型**：`number`
- **默认值**：`0`

```tsx
<ArrowUpIcon rotate={45} />
<ArrowUpIcon rotate={90} />
```

### flip

- **类型**：`'horizontal' | 'vertical' | 'both'`
- **默认值**：`undefined`

```tsx
<ArrowRightIcon flip="horizontal" />
<ArrowRightIcon flip="vertical" />
<ArrowRightIcon flip="both" />
```

## SVG 属性

支持所有原生 SVG 属性：

```tsx
<HomeIcon
  className="my-icon"
  style={{ cursor: 'pointer' }}
  aria-label="首页"
  data-testid="home-icon"
  onClick={handleClick}
  onMouseEnter={handleMouseEnter}
/>
```

## TypeScript 类型

```tsx
import type { IconProps } from '@ldesign/icons/types'
import type { SVGAttributes } from 'react'

// 完整的图标 Props 类型
interface ReactIconProps extends IconProps, Omit<SVGAttributes<SVGElement>, 'color'> {
  className?: string
}

// 组件类型
type IconComponent = React.ForwardRefExoticComponent<
  ReactIconProps & React.RefAttributes<SVGSVGElement>
>
```

## Ref 转发

所有图标组件都使用 `forwardRef`，可以访问底层 SVG 元素：

```tsx
import { useRef } from 'react'
import { HomeIcon } from '@ldesign/icons/react'

function App() {
  const iconRef = useRef<SVGSVGElement>(null)

  const handleClick = () => {
    if (iconRef.current) {
      console.log('SVG element:', iconRef.current)
    }
  }

  return <HomeIcon ref={iconRef} onClick={handleClick} />
}
```

## Hooks

### 状态管理

```tsx
import { useState } from 'react'
import { HeartIcon } from '@ldesign/icons/react'

function LikeButton() {
  const [liked, setLiked] = useState(false)

  return (
    <HeartIcon
      color={liked ? 'red' : 'currentColor'}
      onClick={() => setLiked(!liked)}
      style={{ cursor: 'pointer' }}
    />
  )
}
```

### 自定义 Hook

```tsx
import { useState, useCallback } from 'react'

function useIcon(initialColor: string = 'currentColor') {
  const [color, setColor] = useState(initialColor)
  const [size, setSize] = useState<number | string>('1em')

  const handleHover = useCallback(() => {
    setColor('#3b82f6')
  }, [])

  const handleLeave = useCallback(() => {
    setColor(initialColor)
  }, [initialColor])

  return {
    props: { color, size },
    handlers: { onMouseEnter: handleHover, onMouseLeave: handleLeave },
    setSize,
  }
}

// 使用
function App() {
  const { props, handlers } = useIcon()

  return <HomeIcon {...props} {...handlers} />
}
```

## 动态图标

### 条件渲染

```tsx
import { PlayIcon, PauseIcon } from '@ldesign/icons/react'

function MediaPlayer() {
  const [playing, setPlaying] = useState(false)

  return (
    <button onClick={() => setPlaying(!playing)}>
      {playing ? <PauseIcon /> : <PlayIcon />}
    </button>
  )
}
```

### 图标映射

```tsx
import {
  CheckCircleIcon,
  AlertCircleIcon,
  XCircleIcon,
  InfoIcon,
} from '@ldesign/icons/react'

const iconMap = {
  success: CheckCircleIcon,
  warning: AlertCircleIcon,
  error: XCircleIcon,
  info: InfoIcon,
}

interface AlertProps {
  type: keyof typeof iconMap
  message: string
}

function Alert({ type, message }: AlertProps) {
  const Icon = iconMap[type]
  return (
    <div className={`alert-${type}`}>
      <Icon />
      <span>{message}</span>
    </div>
  )
}
```

## 性能优化

### React.memo

```tsx
import { memo } from 'react'
import { HomeIcon } from '@ldesign/icons/react'

const MemoizedIcon = memo(HomeIcon)

// 或者自定义比较函数
const MemoizedIconCustom = memo(HomeIcon, (prevProps, nextProps) => {
  return prevProps.size === nextProps.size && prevProps.color === nextProps.color
})
```

### useMemo

```tsx
import { useMemo } from 'react'
import { HomeIcon } from '@ldesign/icons/react'

function App({ size, color }: { size: number; color: string }) {
  const icon = useMemo(
    () => <HomeIcon size={size} color={color} />,
    [size, color]
  )

  return <div>{icon}</div>
}
```

## 与 React 生态系统集成

### React Router

```tsx
import { Link } from 'react-router-dom'
import { HomeIcon } from '@ldesign/icons/react'

function Navigation() {
  return (
    <nav>
      <Link to="/" className="nav-link">
        <HomeIcon />
        <span>首页</span>
      </Link>
    </nav>
  )
}
```

### Redux/Zustand

```tsx
import { create } from 'zustand'
import { HomeIcon, SearchIcon, SettingsIcon } from '@ldesign/icons/react'
import type { ComponentType } from 'react'

interface UIState {
  currentIcon: ComponentType
  setIcon: (icon: ComponentType) => void
}

const useUIStore = create<UIState>((set) => ({
  currentIcon: HomeIcon,
  setIcon: (icon) => set({ currentIcon: icon }),
}))

function App() {
  const { currentIcon: Icon } = useUIStore()
  return <Icon />
}
```

### Next.js

```tsx
// app/page.tsx (App Router)
import { HomeIcon } from '@ldesign/icons/react'

export default function Home() {
  return (
    <div>
      <HomeIcon />
    </div>
  )
}
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

## SSR 支持

完全支持服务端渲染（Next.js、Remix 等）：

```tsx
// 服务端和客户端都可以正常渲染
import { HomeIcon } from '@ldesign/icons/react'

export default function Page() {
  return <HomeIcon />
}
```

## 测试

### Jest + React Testing Library

```tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { HomeIcon } from '@ldesign/icons/react'
import { describe, it, expect, vi } from 'vitest'

describe('HomeIcon', () => {
  it('renders correctly', () => {
    const { container } = render(<HomeIcon />)
    const svg = container.querySelector('svg')
    expect(svg).toBeInTheDocument()
  })

  it('accepts size prop', () => {
    const { container } = render(<HomeIcon size={32} />)
    const svg = container.querySelector('svg')
    expect(svg).toHaveAttribute('width', '32')
    expect(svg).toHaveAttribute('height', '32')
  })

  it('accepts color prop', () => {
    const { container } = render(<HomeIcon color="#3b82f6" />)
    const svg = container.querySelector('svg')
    expect(svg).toHaveAttribute('color', '#3b82f6')
  })

  it('handles click event', () => {
    const handleClick = vi.fn()
    const { container } = render(<HomeIcon onClick={handleClick} />)
    const svg = container.querySelector('svg')
    if (svg) fireEvent.click(svg)
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('forwards ref', () => {
    const ref = React.createRef<SVGSVGElement>()
    render(<HomeIcon ref={ref} />)
    expect(ref.current).toBeInstanceOf(SVGSVGElement)
  })
})
```

## 最佳实践

### ✅ 推荐

```tsx
// 按需导入
import { HomeIcon } from '@ldesign/icons/react'

// 使用语义化的大小
<HomeIcon size="1.5em" />

// 使用 currentColor
<HomeIcon color="currentColor" />

// 使用 memo 优化
const MemoizedIcon = memo(HomeIcon)

// 提取常量
const iconMap = { home: HomeIcon, search: SearchIcon }
```

### ❌ 避免

```tsx
// 不要批量导入
import * as Icons from '@ldesign/icons/react'

// 不要在循环中创建组件
{items.map(item => {
  const Icon = Icons[item.icon] // ❌
  return <Icon key={item.id} />
})}

// 不要使用内联函数作为 props
<HomeIcon onClick={() => handleClick()} /> // ❌
```

## 常见问题

### 为什么 TypeScript 报错？

确保安装了类型定义：

```bash
pnpm add -D @types/react @types/react-dom
```

### 如何在 TypeScript 中使用动态图标？

```tsx
import * as Icons from '@ldesign/icons/react'

type IconName = keyof typeof Icons

function DynamicIcon({ name }: { name: IconName }) {
  const Icon = Icons[name]
  return <Icon />
}
```

### 如何修改默认样式？

```tsx
<HomeIcon
  style={{
    color: '#3b82f6',
    cursor: 'pointer',
  }}
  className="custom-icon"
/>
```

## 下一步

- [Vue 组件](/components/vue) - Vue 使用指南
- [Lit 组件](/components/lit) - Web Components 使用指南
- [API 参考](/advanced/api) - 完整 API 文档
- [示例](/examples/react) - React 示例

