import React, { forwardRef, useMemo, memo, type SVGAttributes } from 'react'
import type { IconProps } from '../types'
import { getSvgProps, getIconClass, detectStrokeIcon } from '../utils'

/**
 * React 图标组件属性接口
 * @description 扩展 IconProps，添加 React 特有的属性
 */
export interface ReactIconProps extends IconProps, Omit<SVGAttributes<SVGElement>, 'color'> {
  /**
   * CSS 类名
   */
  className?: string
}

/**
 * React 图标基础组件（未优化版本）
 * @description 所有 React 图标的基础组件，使用 forwardRef 支持 ref 转发
 * @private
 */
const IconBaseInner = forwardRef<SVGSVGElement, ReactIconProps & { path: string | string[], viewBox?: string, isStroke?: boolean }>(
  ({ path, viewBox = '0 0 24 24', className, style, isStroke: isStrokeProp, ariaLabel, role, title, ...props }, ref) => {
    // 提取图标属性
    const iconProps: IconProps = useMemo(() => ({
      size: props.size,
      color: props.color,
      strokeWidth: props.strokeWidth,
      spin: props.spin,
      rotate: props.rotate,
      flip: props.flip,
      ariaLabel,
      role,
      title,
    }), [props.size, props.color, props.strokeWidth, props.spin, props.rotate, props.flip, ariaLabel, role, title])

    // 自动检测或使用传入的图标类型（描边/填充）
    const isStroke = useMemo(
      () => isStrokeProp !== undefined ? isStrokeProp : detectStrokeIcon(path),
      [isStrokeProp, path]
    )

    // 计算 SVG 属性（带缓存）
    const svgProps = useMemo(
      () => getSvgProps(iconProps, isStroke),
      [iconProps, isStroke]
    )

    // 计算 CSS 类名（带缓存）
    const iconClass = useMemo(
      () => getIconClass(iconProps, className),
      [iconProps, className]
    )

    // 标准化路径为数组
    const paths = useMemo(
      () => Array.isArray(path) ? path : [path],
      [path]
    )

    // 计算样式对象（带缓存）
    const iconStyle: React.CSSProperties = useMemo(() => ({
      display: 'inline-block',
      lineHeight: 1,
      flexShrink: 0,
      ...(props.spin && {
        animation: 'ld-icon-spin 1s linear infinite',
      }),
      ...style,
    }), [props.spin, style])

    // 计算可访问性属性
    const ariaAttributes = useMemo(() => ({
      'aria-label': ariaLabel,
      'aria-hidden': ariaLabel ? undefined : 'true',
      'role': role || (ariaLabel ? 'img' : undefined),
    }), [ariaLabel, role])

    return React.createElement('svg', {
      ref,
      width: svgProps.width,
      height: svgProps.height,
      viewBox,
      className: iconClass,
      style: iconStyle,
      xmlns: 'http://www.w3.org/2000/svg',
      focusable: 'false',
      ...ariaAttributes,
      ...props,
    },
      // 添加 title 元素（用于工具提示）
      title && React.createElement('title', { key: 'title' }, title),
      // 渲染路径
      paths.map((pathData, index) =>
        React.createElement('path', {
          key: index,
          d: pathData,
          fill: svgProps.fill,
          stroke: svgProps.stroke,
          strokeWidth: svgProps.strokeWidth,
          strokeLinecap: isStroke ? 'round' : undefined,
          strokeLinejoin: isStroke ? 'round' : undefined,
          transform: svgProps.transform,
        })
      ))
  },
)

IconBaseInner.displayName = 'IconBase'

/**
 * React 图标基础组件（优化版）
 * @description 使用 React.memo 优化，避免不必要的重渲染
 */
export const IconBase = memo(IconBaseInner, (prevProps, nextProps) => {
  // 自定义比较函数，只比较关键属性
  return (
    prevProps.path === nextProps.path &&
    prevProps.viewBox === nextProps.viewBox &&
    prevProps.size === nextProps.size &&
    prevProps.color === nextProps.color &&
    prevProps.strokeWidth === nextProps.strokeWidth &&
    prevProps.spin === nextProps.spin &&
    prevProps.rotate === nextProps.rotate &&
    prevProps.flip === nextProps.flip &&
    prevProps.className === nextProps.className &&
    prevProps.isStroke === nextProps.isStroke &&
    prevProps.ariaLabel === nextProps.ariaLabel &&
    prevProps.role === nextProps.role &&
    prevProps.title === nextProps.title
  )
})

/**
 * 图标组件缓存
 * @description 缓存已创建的图标组件，避免重复创建
 * @private
 */
const iconComponentCache = new Map<string, React.ForwardRefExoticComponent<ReactIconProps & React.RefAttributes<SVGSVGElement>>>()

/**
 * 创建 React 图标组件
 * @description 工厂函数，为每个图标创建优化的 React 组件
 * @param name - 图标名称（PascalCase）
 * @param path - SVG 路径数据
 * @param viewBox - SVG viewBox 属性
 * @param isStroke - 是否为描边类型图标
 * @returns React 图标组件
 * @example
 * ```tsx
 * const HomeIcon = createReactIcon('Home', 'M3 9l9-7...', '0 0 24 24', true)
 * ```
 */
export function createReactIcon(
  name: string,
  path: string | string[],
  viewBox = '0 0 24 24',
  isStroke?: boolean
): React.ForwardRefExoticComponent<ReactIconProps & React.RefAttributes<SVGSVGElement>> {
  // 生成缓存键
  const cacheKey = `${name}-${viewBox}`

  // 检查缓存
  if (iconComponentCache.has(cacheKey)) {
    return iconComponentCache.get(cacheKey)!
  }

  // 创建组件
  const Component = memo(
    forwardRef<SVGSVGElement, ReactIconProps>((props, ref) =>
      React.createElement(IconBase, { ref, path, viewBox, isStroke, ...props })
    )
  )

  Component.displayName = `${name}Icon`

  // 缓存组件
  iconComponentCache.set(cacheKey, Component)

  return Component
}






