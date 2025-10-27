import { LitElement, html, css, nothing } from 'lit'
import { property } from 'lit/decorators.js'
import { formatSize, getTransform, detectStrokeIcon } from '../utils'
import type { IconProps } from '../types'

/**
 * Lit 图标基础组件
 * @description 基于 Web Components 的图标组件，所有 Lit 图标的基类
 */
export class LdIconBase extends LitElement {
  /**
   * SVG 路径数据
   * @description 单个或多个 path 元素的 d 属性值
   */
  @property({ type: String }) paths: string | string[] = ''

  /**
   * SVG ViewBox 属性
   * @description 定义图标的坐标系统
   */
  @property({ type: String }) viewBox = '0 0 24 24'

  /**
   * 图标大小
   * @description 数字将转换为 px，字符串保持不变
   */
  @property() size?: number | string

  /**
   * 图标颜色
   * @description 支持任何有效的 CSS 颜色值
   */
  @property({ type: String }) color?: string

  /**
   * 描边宽度
   * @description 仅对描边类型图标有效
   */
  @property({ type: Number }) strokeWidth?: number

  /**
   * 是否启用旋转动画
   * @description 启用后图标将持续旋转
   */
  @property({ type: Boolean }) spin = false

  /**
   * 旋转角度
   * @description 静态旋转图标到指定角度（度）
   */
  @property({ type: Number }) rotate?: number

  /**
   * 翻转方向
   * @description 水平、垂直或双向翻转
   */
  @property({ type: String }) flip?: 'horizontal' | 'vertical' | 'both'

  /**
   * 是否为描边类型图标
   * @description 如果未提供，将自动检测
   */
  @property({ type: Boolean }) isStroke?: boolean

  /**
   * ARIA 标签
   * @description 为屏幕阅读器提供图标描述
   */
  @property({ type: String }) ariaLabel?: string

  /**
   * ARIA 角色
   * @description 定义图标的语义角色
   */
  @property({ type: String }) role?: string

  /**
   * 标题（工具提示）
   * @description 鼠标悬停时显示的提示文本
   */
  @property({ type: String }) title?: string

  /**
   * 组件样式
   * @description 定义图标的基础样式和动画
   */
  static styles = css`
    /* 宿主元素样式 */
    :host {
      display: inline-block;
      line-height: 1;
      flex-shrink: 0;
    }

    /* 旋转动画 */
    :host([spin]) svg {
      animation: ld-icon-spin 1s linear infinite;
    }

    /* 旋转关键帧 */
    @keyframes ld-icon-spin {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }

    /* SVG 元素样式 */
    svg {
      width: var(--icon-size, 1em);
      height: var(--icon-size, 1em);
    }
  `

  /**
   * 渲染组件
   * @description Lit 渲染方法，生成 SVG 元素
   * @returns TemplateResult
   */
  render() {
    // 格式化图标大小
    const iconSize = formatSize(this.size)

    // 标准化路径为数组
    const pathArray = Array.isArray(this.paths) ? this.paths : [this.paths]

    // 计算 CSS 变换
    const transform = getTransform({
      rotate: this.rotate,
      flip: this.flip,
    } as IconProps)

    // 自动检测或使用传入的图标类型
    const isStrokeIcon = this.isStroke !== undefined ? this.isStroke : detectStrokeIcon(this.paths)
    const color = this.color || 'currentColor'
    const strokeWidthValue = this.strokeWidth || 2

    // 计算可访问性属性
    const ariaHidden = this.ariaLabel ? undefined : 'true'
    const ariaRole = this.role || (this.ariaLabel ? 'img' : undefined)

    return html`
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="${this.viewBox}"
        fill="${isStrokeIcon ? 'none' : color}"
        stroke="${isStrokeIcon ? color : 'none'}"
        stroke-width="${isStrokeIcon ? strokeWidthValue : 0}"
        stroke-linecap="${isStrokeIcon ? 'round' : 'butt'}"
        stroke-linejoin="${isStrokeIcon ? 'round' : 'miter'}"
        style="--icon-size: ${iconSize}; ${transform ? `transform: ${transform}` : ''}"
        aria-hidden="${ariaHidden || nothing}"
        aria-label="${this.ariaLabel || nothing}"
        role="${ariaRole || nothing}"
        focusable="false"
        part="svg"
      >
        ${this.title ? html`<title>${this.title}</title>` : ''}
        ${pathArray.map(p => html`<path d="${p}" part="path" />`)}
      </svg>
    `
  }
}

// 注册基础组件
if (typeof customElements !== 'undefined' && !customElements.get('ld-icon-base')) {
  customElements.define('ld-icon-base', LdIconBase)
}

/**
 * Web Components 类缓存
 * @description 缓存已创建的自定义元素类，避免重复定义
 * @private
 */
const litIconComponentCache = new Map<string, typeof LdIconBase>()

/**
 * 创建 Lit 图标组件
 * @description 工厂函数，为每个图标创建 Web Component 类
 * @param tagName - 自定义元素标签名（kebab-case，如 'ld-icon-home'）
 * @param paths - SVG 路径数据
 * @param viewBox - SVG viewBox 属性
 * @param isStroke - 是否为描边类型图标
 * @returns Web Component 类
 * @example
 * ```ts
 * const HomeIcon = createLitIcon('ld-icon-home', 'M3 9l9-7...', '0 0 24 24', true)
 * ```
 */
export function createLitIcon(
  tagName: string,
  paths: string | string[],
  viewBox = '0 0 24 24',
  isStroke?: boolean,
): typeof LdIconBase {
  // 检查缓存
  if (litIconComponentCache.has(tagName)) {
    return litIconComponentCache.get(tagName)!
  }

  /**
   * 图标元素类
   * @description 继承自 LdIconBase 的具体图标组件
   */
  class IconElement extends LdIconBase {
    constructor() {
      super()
      // 设置固定的路径和 viewBox
      this.paths = paths
      this.viewBox = viewBox
      if (isStroke !== undefined) {
        this.isStroke = isStroke
      }
    }
  }

  // 注册自定义元素（如果尚未注册）
  if (typeof customElements !== 'undefined' && !customElements.get(tagName)) {
    customElements.define(tagName, IconElement)
  }

  // 缓存类定义
  litIconComponentCache.set(tagName, IconElement)

  return IconElement
}




