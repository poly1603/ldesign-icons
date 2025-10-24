import React, { forwardRef, type SVGAttributes } from 'react'
import type { IconProps } from '../types'
import { getSvgProps, getIconClass, detectStrokeIcon } from '../utils'

export interface ReactIconProps extends IconProps, Omit<SVGAttributes<SVGElement>, 'color'> {
  className?: string
}

/**
 * React 图标基础组件
 */
export const IconBase = forwardRef<SVGSVGElement, ReactIconProps & { path: string | string[], viewBox?: string, isStroke?: boolean }>(
  ({ path, viewBox = '0 0 24 24', className, style, isStroke: isStrokeProp, ...props }, ref) => {
    const iconProps: IconProps = {
      size: props.size,
      color: props.color,
      strokeWidth: props.strokeWidth,
      spin: props.spin,
      rotate: props.rotate,
      flip: props.flip,
    }

    // 自动检测或使用传入的 isStroke
    const isStroke = isStrokeProp !== undefined ? isStrokeProp : detectStrokeIcon(path)

    const svgProps = getSvgProps(iconProps, isStroke)
    const iconClass = getIconClass(iconProps, className)

    const paths = Array.isArray(path) ? path : [path]

    const iconStyle: React.CSSProperties = {
      display: 'inline-block',
      lineHeight: 1,
      flexShrink: 0,
      ...(props.spin && {
        animation: 'ld-icon-spin 1s linear infinite',
      }),
      ...style,
    }

    return React.createElement('svg', {
      ref,
      width: svgProps.width,
      height: svgProps.height,
      viewBox,
      className: iconClass,
      style: iconStyle,
      xmlns: 'http://www.w3.org/2000/svg',
      'aria-hidden': 'true',
      focusable: 'false',
      ...props,
    }, paths.map((pathData, index) =>
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

IconBase.displayName = 'IconBase'

/**
 * 创建 React 图标组件
 */
export function createReactIcon(name: string, path: string | string[], viewBox = '0 0 24 24', isStroke?: boolean) {
  const Component = forwardRef<SVGSVGElement, ReactIconProps>((props, ref) =>
    React.createElement(IconBase, { ref, path, viewBox, isStroke, ...props })
  )

  Component.displayName = `${name}Icon`

  return Component
}






