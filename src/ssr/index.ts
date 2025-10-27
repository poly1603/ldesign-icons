/**
 * 服务端渲染（SSR）支持模块
 * @description 提供图标的服务端渲染优化和关键CSS提取
 * @module ssr
 */

import type { IconProps } from '../types'
import { getSvgProps, getIconClass, detectStrokeIcon } from '../utils'

/**
 * SSR 渲染选项
 */
export interface SSRRenderOptions {
  /**
   * 图标名称
   */
  name: string

  /**
   * SVG 路径数据
   */
  path: string | string[]

  /**
   * ViewBox
   * @default '0 0 24 24'
   */
  viewBox?: string

  /**
   * 图标属性
   */
  props?: IconProps

  /**
   * 是否为描边图标
   */
  isStroke?: boolean

  /**
   * 是否内联样式
   * @default true
   */
  inlineStyles?: boolean
}

/**
 * 渲染图标为 HTML 字符串（服务端渲染）
 * @description 在服务端生成图标的 HTML，提升首屏渲染性能
 * @param options - 渲染选项
 * @returns HTML 字符串
 * @example
 * ```ts
 * const html = renderIconToString({
 *   name: 'home',
 *   path: 'M3 9l9-7...',
 *   props: { size: 24, color: 'currentColor' }
 * })
 * ```
 */
export function renderIconToString(options: SSRRenderOptions): string {
  const {
    name,
    path,
    viewBox = '0 0 24 24',
    props = {},
    isStroke: isStrokeProp,
    inlineStyles = true,
  } = options

  // 检测图标类型
  const isStroke =
    isStrokeProp !== undefined ? isStrokeProp : detectStrokeIcon(path)

  // 获取 SVG 属性
  const svgProps = getSvgProps(props, isStroke)

  // 获取类名
  const className = getIconClass(props, `ld-icon-${name}`)

  // 标准化路径
  const paths = Array.isArray(path) ? path : [path]

  // 构建样式
  const styles = inlineStyles
    ? `display: inline-block; line-height: 1; flex-shrink: 0;${props.spin ? ' animation: ld-icon-spin 1s linear infinite;' : ''
    }`
    : ''

  // 构建可访问性属性
  const ariaLabel = props.ariaLabel ? ` aria-label="${escapeHtml(props.ariaLabel)}"` : ''
  const ariaHidden = props.ariaLabel ? '' : ' aria-hidden="true"'
  const role = props.role ? ` role="${props.role}"` : (props.ariaLabel ? ' role="img"' : '')
  const title = props.title ? `<title>${escapeHtml(props.title)}</title>` : ''

  // 生成 HTML
  return `<svg class="${className}" width="${svgProps.width}" height="${svgProps.height}" viewBox="${viewBox}" ${styles ? `style="${styles}" ` : ''
    }fill="${svgProps.fill}" ${svgProps.stroke ? `stroke="${svgProps.stroke}" ` : ''}${svgProps.strokeWidth ? `stroke-width="${svgProps.strokeWidth}" ` : ''
    }${svgProps.transform ? `transform="${svgProps.transform}" ` : ''}xmlns="http://www.w3.org/2000/svg"${ariaLabel}${ariaHidden}${role} focusable="false">${title}${paths
      .map(
        (p) =>
          `<path d="${p}"${isStroke ? ' stroke-linecap="round" stroke-linejoin="round"' : ''}/>`
      )
      .join('')}</svg>`
}

/**
 * 提取关键 CSS
 * @description 提取图标系统所需的关键 CSS，用于内联到 HTML 头部
 * @param iconNames - 需要的图标名称列表
 * @returns CSS 字符串
 * @example
 * ```ts
 * const criticalCSS = extractCriticalCSS(['home', 'search', 'user'])
 * // 在 HTML <head> 中内联
 * <style>${criticalCSS}</style>
 * ```
 */
export function extractCriticalCSS(iconNames?: string[]): string {
  const baseCSS = `
/* 图标基础样式 */
.ld-icon {
  display: inline-block;
  line-height: 1;
  flex-shrink: 0;
}

/* 旋转动画 */
@keyframes ld-icon-spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.ld-icon--spin {
  animation: ld-icon-spin 1s linear infinite;
}
`.trim()

  // 如果提供了图标列表，只包含这些图标的样式
  if (iconNames && iconNames.length > 0) {
    const iconCSS = iconNames
      .map(
        (name) => `
.ld-icon-${name} {
  /* 图标特定样式 */
}`.trim()
      )
      .join('\n\n')

    return `${baseCSS}\n\n${iconCSS}`
  }

  return baseCSS
}

/**
 * 生成预加载链接
 * @description 为常用图标生成预加载 <link> 标签
 * @param iconNames - 要预加载的图标名称
 * @param framework - 框架类型
 * @returns 预加载 link 标签数组
 * @example
 * ```ts
 * const preloadLinks = generatePreloadLinks(['home', 'search'], 'vue')
 * // 在 HTML <head> 中添加
 * preloadLinks.forEach(link => document.head.appendChild(link))
 * ```
 */
export function generatePreloadLinks(
  iconNames: string[],
  framework: 'vue' | 'react' | 'lit' = 'vue'
): string[] {
  return iconNames.map((name) => {
    const modulePath = `/@ldesign/icons/${framework}/${capitalize(name)}Icon`
    return `<link rel="modulepreload" href="${modulePath}">`
  })
}

/**
 * 服务端渲染图标集合
 * @description 批量渲染多个图标为 HTML 字符串
 * @param icons - 图标配置数组
 * @returns HTML 字符串数组
 */
export function renderIconsToString(
  icons: SSRRenderOptions[]
): string[] {
  return icons.map((icon) => renderIconToString(icon))
}

/**
 * 生成 Sprite 引用
 * @description 为 Sprite 模式生成图标引用
 * @param iconName - 图标名称
 * @param spriteUrl - Sprite 文件 URL
 * @param props - 图标属性
 * @returns HTML 字符串
 * @example
 * ```ts
 * const html = renderSpriteIcon('home', '/icons/sprite.svg', { size: 24 })
 * ```
 */
export function renderSpriteIcon(
  iconName: string,
  spriteUrl: string,
  props: IconProps = {}
): string {
  const className = getIconClass(props, `ld-icon-${iconName}`)
  const size = props.size || '1em'
  const sizeStr = typeof size === 'number' ? `${size}px` : size

  return `<svg class="${className}" width="${sizeStr}" height="${sizeStr}" ${props.spin ? 'data-spin="true" ' : ''
    }aria-hidden="true">
  <use xlink:href="${spriteUrl}#ld-icon-${iconName}"></use>
</svg>`
}

/**
 * 辅助函数：首字母大写
 * @private
 */
function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

/**
 * 辅助函数：HTML 转义
 * @private
 */
function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

/**
 * Vue SSR 辅助函数
 * @description 在 Vue SSR 中使用图标
 * @param iconComponent - 图标组件
 * @param props - 属性
 * @returns 渲染结果
 */
export function renderVueIconSSR(
  iconComponent: any,
  props: IconProps = {}
): string {
  // Vue 3 的 SSR 渲染逻辑
  // 这里简化处理，实际应该使用 @vue/server-renderer
  return renderIconToString({
    name: iconComponent.name || 'icon',
    path: iconComponent.path || '',
    viewBox: iconComponent.viewBox,
    props,
    isStroke: iconComponent.isStroke,
  })
}

/**
 * React SSR 辅助函数
 * @description 在 React SSR 中使用图标
 * @param IconComponent - 图标组件
 * @param props - 属性
 * @returns JSX 元素（可以被 renderToString 使用）
 */
export function renderReactIconSSR(
  IconComponent: any,
  props: IconProps = {}
): string {
  // React 的 renderToString 会自动处理
  // 这里提供一个简化的实现
  return renderIconToString({
    name: IconComponent.displayName || 'Icon',
    path: '', // 实际应该从组件中提取
    props,
  })
}

