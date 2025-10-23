import { describe, it, expect, beforeEach } from 'vitest'
import { fixture, html } from '@open-wc/testing'
import { LdIconBase } from '../../../src/lit/IconBase'

describe('Lit IconBase', () => {
  const testPath = 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z'

  beforeEach(() => {
    // 确保自定义元素已注册
    if (!customElements.get('ld-icon-base')) {
      customElements.define('ld-icon-base', LdIconBase)
    }
  })

  it('should render svg element', async () => {
    const el = await fixture<LdIconBase>(html`
      <ld-icon-base paths="${testPath}"></ld-icon-base>
    `)

    const svg = el.shadowRoot?.querySelector('svg')
    expect(svg).toBeTruthy()
  })

  it('should apply default viewBox', async () => {
    const el = await fixture<LdIconBase>(html`
      <ld-icon-base paths="${testPath}"></ld-icon-base>
    `)

    const svg = el.shadowRoot?.querySelector('svg')
    expect(svg?.getAttribute('viewBox')).toBe('0 0 24 24')
  })

  it('should apply custom viewBox', async () => {
    const el = await fixture<LdIconBase>(html`
      <ld-icon-base paths="${testPath}" viewBox="0 0 32 32"></ld-icon-base>
    `)

    const svg = el.shadowRoot?.querySelector('svg')
    expect(svg?.getAttribute('viewBox')).toBe('0 0 32 32')
  })

  it('should apply size prop', async () => {
    const el = await fixture<LdIconBase>(html`
      <ld-icon-base paths="${testPath}" size="24"></ld-icon-base>
    `)

    const svg = el.shadowRoot?.querySelector('svg')
    const style = svg?.getAttribute('style')
    expect(style).toContain('--icon-size: 24px')
  })

  it('should apply color prop', async () => {
    const el = await fixture<LdIconBase>(html`
      <ld-icon-base paths="${testPath}" color="red"></ld-icon-base>
    `)

    const svg = el.shadowRoot?.querySelector('svg')
    expect(svg?.getAttribute('fill')).toBe('red')
  })

  it('should apply spin attribute', async () => {
    const el = await fixture<LdIconBase>(html`
      <ld-icon-base paths="${testPath}" spin></ld-icon-base>
    `)

    expect(el.hasAttribute('spin')).toBe(true)
  })
})




