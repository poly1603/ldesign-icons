import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { IconBase } from '../../../src/react/IconBase'

describe('React IconBase', () => {
  const testPath = 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z'

  it('should render svg element', () => {
    const { container } = render(<IconBase path={testPath} />)
    expect(container.querySelector('svg')).toBeTruthy()
  })

  it('should apply default viewBox', () => {
    const { container } = render(<IconBase path={testPath} />)
    const svg = container.querySelector('svg')
    expect(svg?.getAttribute('viewBox')).toBe('0 0 24 24')
  })

  it('should apply custom viewBox', () => {
    const { container } = render(<IconBase path={testPath} viewBox="0 0 32 32" />)
    const svg = container.querySelector('svg')
    expect(svg?.getAttribute('viewBox')).toBe('0 0 32 32')
  })

  it('should apply size prop', () => {
    const { container } = render(<IconBase path={testPath} size={24} />)
    const svg = container.querySelector('svg')
    expect(svg?.getAttribute('width')).toBe('24px')
    expect(svg?.getAttribute('height')).toBe('24px')
  })

  it('should apply string size', () => {
    const { container } = render(<IconBase path={testPath} size="2em" />)
    const svg = container.querySelector('svg')
    expect(svg?.getAttribute('width')).toBe('2em')
  })

  it('should apply color prop', () => {
    const { container } = render(<IconBase path={testPath} color="red" />)
    const path = container.querySelector('path')
    expect(path?.getAttribute('fill')).toBe('red')
  })

  it('should apply className', () => {
    const { container } = render(<IconBase path={testPath} className="custom-class" />)
    const svg = container.querySelector('svg')
    expect(svg?.className).toContain('custom-class')
  })

  it('should handle multiple paths', () => {
    const paths = ['M...', 'M...']
    const { container } = render(<IconBase path={paths} />)
    const pathElements = container.querySelectorAll('path')
    expect(pathElements.length).toBe(2)
  })

  it('should forward ref', () => {
    const ref = React.createRef<SVGSVGElement>()
    render(<IconBase path={testPath} ref={ref} />)
    expect(ref.current).toBeInstanceOf(SVGSVGElement)
  })
})




