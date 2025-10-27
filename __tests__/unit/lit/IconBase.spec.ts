/**
 * Lit IconBase 组件测试
 */

import { describe, it, expect, beforeAll } from 'vitest'
import { fixture, html } from '@open-wc/testing'
import { LdIconBase } from '../../../src/lit/IconBase'

describe('Lit IconBase', () => {
  const testPath = 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z'

  beforeAll(() => {
    // 确保组件已注册
    if (!customElements.get('ld-icon-base')) {
      customElements.define('ld-icon-base', LdIconBase)
    }
  })

  it('should render svg element', async () => {
    const el = await fixture<LdIconBase>(html`
      <ld-icon-base .paths=${testPath}></ld-icon-base>
    `)

    const svg = el.shadowRoot!.querySelector('svg')
    expect(svg).toBeTruthy()
  })

  it('should apply default viewBox', async () => {
    const el = await fixture<LdIconBase>(html`
      <ld-icon-base .paths=${testPath}></ld-icon-base>
    `)

    const svg = el.shadowRoot!.querySelector('svg')
    expect(svg?.getAttribute('viewBox')).toBe('0 0 24 24')
  })

  it('should apply custom viewBox', async () => {
    const el = await fixture<LdIconBase>(html`
      <ld-icon-base .paths=${testPath} viewBox="0 0 32 32"></ld-icon-base>
    `)

    const svg = el.shadowRoot!.querySelector('svg')
    expect(svg?.getAttribute('viewBox')).toBe('0 0 32 32')
  })

  it('should apply size prop', async () => {
    const el = await fixture<LdIconBase>(html`
      <ld-icon-base .paths=${testPath} size="24"></ld-icon-base>
    `)

    const svg = el.shadowRoot!.querySelector('svg')
    const style = svg?.getAttribute('style')
    expect(style).toContain('--icon-size: 24px')
  })

  it('should apply string size', async () => {
    const el = await fixture<LdIconBase>(html`
      <ld-icon-base .paths=${testPath} size="2em"></ld-icon-base>
    `)

    const svg = el.shadowRoot!.querySelector('svg')
    const style = svg?.getAttribute('style')
    expect(style).toContain('--icon-size: 2em')
  })

  it('should apply color prop for fill icons', async () => {
    const el = await fixture<LdIconBase>(html`
      <ld-icon-base .paths=${testPath} color="red" .isStroke=${false}></ld-icon-base>
    `)

    const svg = el.shadowRoot!.querySelector('svg')
    expect(svg?.getAttribute('fill')).toBe('red')
  })

  it('should apply color prop for stroke icons', async () => {
    const el = await fixture<LdIconBase>(html`
      <ld-icon-base .paths=${testPath} color="blue" .isStroke=${true}></ld-icon-base>
    `)

    const svg = el.shadowRoot!.querySelector('svg')
    expect(svg?.getAttribute('stroke')).toBe('blue')
    expect(svg?.getAttribute('fill')).toBe('none')
  })

  it('should apply spin attribute', async () => {
    const el = await fixture<LdIconBase>(html`
      <ld-icon-base .paths=${testPath} spin></ld-icon-base>
    `)

    expect(el.hasAttribute('spin')).toBe(true)
  })

  it('should handle multiple paths', async () => {
    const paths = ['M...', 'M...']
    const el = await fixture<LdIconBase>(html`
      <ld-icon-base .paths=${paths}></ld-icon-base>
    `)

    const pathElements = el.shadowRoot!.querySelectorAll('path')
    expect(pathElements.length).toBe(2)
  })

  it('should apply strokeWidth for stroke icons', async () => {
    const el = await fixture<LdIconBase>(html`
      <ld-icon-base .paths=${testPath} .strokeWidth=${3} .isStroke=${true}></ld-icon-base>
    `)

    const svg = el.shadowRoot!.querySelector('svg')
    expect(svg?.getAttribute('stroke-width')).toBe('3')
  })

  it('should apply rotate transform', async () => {
    const el = await fixture<LdIconBase>(html`
      <ld-icon-base .paths=${testPath} .rotate=${90}></ld-icon-base>
    `)

    const svg = el.shadowRoot!.querySelector('svg')
    const style = svg?.getAttribute('style')
    expect(style).toContain('transform: rotate(90deg)')
  })

  it('should apply flip transform', async () => {
    const el = await fixture<LdIconBase>(html`
      <ld-icon-base .paths=${testPath} flip="horizontal"></ld-icon-base>
    `)

    const svg = el.shadowRoot!.querySelector('svg')
    const style = svg?.getAttribute('style')
    expect(style).toContain('scaleX(-1)')
  })

  it('should render title element when provided', async () => {
    const el = await fixture<LdIconBase>(html`
      <ld-icon-base .paths=${testPath} title="Test Icon"></ld-icon-base>
    `)

    const title = el.shadowRoot!.querySelector('title')
    expect(title).toBeTruthy()
    expect(title?.textContent).toBe('Test Icon')
  })

  it('should apply aria-label', async () => {
    const el = await fixture<LdIconBase>(html`
      <ld-icon-base .paths=${testPath} ariaLabel="Home Icon"></ld-icon-base>
    `)

    const svg = el.shadowRoot!.querySelector('svg')
    expect(svg?.getAttribute('aria-label')).toBe('Home Icon')
  })

  it('should set aria-hidden when no ariaLabel', async () => {
    const el = await fixture<LdIconBase>(html`
      <ld-icon-base .paths=${testPath}></ld-icon-base>
    `)

    const svg = el.shadowRoot!.querySelector('svg')
    expect(svg?.getAttribute('aria-hidden')).toBe('true')
  })

  it('should apply custom role', async () => {
    const el = await fixture<LdIconBase>(html`
      <ld-icon-base .paths=${testPath} role="button"></ld-icon-base>
    `)

    const svg = el.shadowRoot!.querySelector('svg')
    expect(svg?.getAttribute('role')).toBe('button')
  })

  it('should use shadow DOM', () => {
    const el = document.createElement('ld-icon-base') as LdIconBase
    expect(el.shadowRoot).toBeTruthy()
  })

  it('should have focusable="false" on svg', async () => {
    const el = await fixture<LdIconBase>(html`
      <ld-icon-base .paths=${testPath}></ld-icon-base>
    `)

    const svg = el.shadowRoot!.querySelector('svg')
    expect(svg?.getAttribute('focusable')).toBe('false')
  })
})
