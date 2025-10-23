import React, { forwardRef, type SVGAttributes } from 'react'
import type { IconProps } from '../types'
import { getSvgProps, getIconClass } from '../utils'

export interface ReactIconProps extends IconProps, Omit<SVGAttributes<SVGElement>, 'color'> {
  className?: string
}

/**
 * React 图标基础组件
 */
export const IconBase = forwardRef<SVGSVGElement, ReactIconProps & { path: string | string[], viewBox?: string }>(
  ({ path, viewBox = '0 0 24 24', className, style, ...props }, ref) => {
    const iconProps: IconProps = {
      size: props.size,
      color: props.color,
      strokeWidth: props.strokeWidth,
      spin: props.spin,
      rotate: props.rotate,
      flip: props.flip,
    }

    const svgProps = getSvgProps(iconProps)
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

    return (
      <svg
        ref={ref}
        width={svgProps.width}
        height={svgProps.height}
        viewBox={viewBox}
        className={iconClass}
        style={iconStyle}
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        focusable="false"
        {...props}
      >
        {paths.map((pathData, index) => (
          <path
            key={index}
            d={pathData}
            fill={svgProps.fill}
            stroke="none"
            strokeWidth={svgProps.strokeWidth}
            transform={svgProps.transform}
          />
        ))}
      </svg>
    )
  },
)

IconBase.displayName = 'IconBase'

/**
 * 创建 React 图标组件
 */
export function createReactIcon(name: string, path: string | string[], viewBox = '0 0 24 24') {
  const Component = forwardRef<SVGSVGElement, ReactIconProps>((props, ref) => (
    <IconBase ref={ref} path={path} viewBox={viewBox} {...props} />
  ))

  Component.displayName = `${name}Icon`

  return Component
}






