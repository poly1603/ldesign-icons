import { LitElement, html, css } from 'lit'
import { property } from 'lit/decorators.js'
import { formatSize, getTransform, detectStrokeIcon } from '../utils'
import type { IconProps } from '../types'

/**
 * Lit 图标基础组件
 */
export class LdIconBase extends LitElement {
  @property({ type: String }) paths: string | string[] = ''
  @property({ type: String }) viewBox = '0 0 24 24'
  @property() size?: number | string
  @property({ type: String }) color?: string
  @property({ type: Number }) strokeWidth?: number
  @property({ type: Boolean }) spin = false
  @property({ type: Number }) rotate?: number
  @property({ type: String }) flip?: 'horizontal' | 'vertical' | 'both'
  @property({ type: Boolean }) isStroke?: boolean

  static styles = css`
    :host {
      display: inline-block;
      line-height: 1;
      flex-shrink: 0;
    }
    :host([spin]) svg {
      animation: ld-icon-spin 1s linear infinite;
    }
    @keyframes ld-icon-spin {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
    svg {
      width: var(--icon-size, 1em);
      height: var(--icon-size, 1em);
    }
  `

  render() {
    const iconSize = formatSize(this.size)
    const pathArray = Array.isArray(this.paths) ? this.paths : [this.paths]
    const transform = getTransform({
      rotate: this.rotate,
      flip: this.flip,
    } as IconProps)

    // 自动检测或使用传入的 isStroke
    const isStrokeIcon = this.isStroke !== undefined ? this.isStroke : detectStrokeIcon(this.paths)
    const color = this.color || 'currentColor'
    const strokeWidthValue = this.strokeWidth || 2

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
        aria-hidden="true"
        part="svg"
      >
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
 * 创建 Lit 图标组件
 * @param tagName - 自定义元素标签名
 * @param paths - SVG 路径数据
 * @param viewBox - SVG viewBox
 * @param isStroke - 是否为描边类型图标
 */
export function createLitIcon(
  tagName: string,
  paths: string | string[],
  viewBox = '0 0 24 24',
  isStroke?: boolean,
) {
  class IconElement extends LdIconBase {
    constructor() {
      super()
      this.paths = paths
      this.viewBox = viewBox
      if (isStroke !== undefined) {
        this.isStroke = isStroke
      }
    }
  }

  if (typeof customElements !== 'undefined' && !customElements.get(tagName)) {
    customElements.define(tagName, IconElement)
  }

  return IconElement
}




