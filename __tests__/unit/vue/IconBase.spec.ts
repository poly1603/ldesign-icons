import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { IconBase } from '../../../src/vue/IconBase'

describe('Vue IconBase', () => {
  const testPath = 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z'

  it('should render svg element', () => {
    const wrapper = mount(IconBase, {
      props: { path: testPath },
    })
    expect(wrapper.find('svg').exists()).toBe(true)
  })

  it('should apply default viewBox', () => {
    const wrapper = mount(IconBase, {
      props: { path: testPath },
    })
    expect(wrapper.find('svg').attributes('viewBox')).toBe('0 0 24 24')
  })

  it('should apply custom viewBox', () => {
    const wrapper = mount(IconBase, {
      props: { path: testPath, viewBox: '0 0 32 32' },
    })
    expect(wrapper.find('svg').attributes('viewBox')).toBe('0 0 32 32')
  })

  it('should apply size prop', () => {
    const wrapper = mount(IconBase, {
      props: { path: testPath, size: 24 },
    })
    expect(wrapper.find('svg').attributes('width')).toBe('24px')
    expect(wrapper.find('svg').attributes('height')).toBe('24px')
  })

  it('should apply string size', () => {
    const wrapper = mount(IconBase, {
      props: { path: testPath, size: '2em' },
    })
    expect(wrapper.find('svg').attributes('width')).toBe('2em')
  })

  it('should apply color prop', () => {
    const wrapper = mount(IconBase, {
      props: { path: testPath, color: 'red' },
    })
    expect(wrapper.find('path').attributes('fill')).toBe('red')
  })

  it('should apply spin class when spin is true', () => {
    const wrapper = mount(IconBase, {
      props: { path: testPath, spin: true },
    })
    expect(wrapper.find('svg').classes()).toContain('ld-icon--spin')
  })

  it('should handle multiple paths', () => {
    const paths = ['M...', 'M...']
    const wrapper = mount(IconBase, {
      props: { path: paths },
    })
    expect(wrapper.findAll('path')).toHaveLength(2)
  })

  it('should apply custom class', () => {
    const wrapper = mount(IconBase, {
      props: { path: testPath },
      attrs: { class: 'custom-class' },
    })
    expect(wrapper.find('svg').classes()).toContain('custom-class')
  })
})




