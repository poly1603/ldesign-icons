import { describe, it, expect } from 'vitest'
import {
  formatSize,
  getTransform,
  getIconClass,
  normalizeIconName,
  camelizeIconName,
} from '../../../src/utils'

describe('utils', () => {
  describe('formatSize', () => {
    it('should format number to px', () => {
      expect(formatSize(24)).toBe('24px')
      expect(formatSize(16)).toBe('16px')
    })

    it('should return string as is', () => {
      expect(formatSize('1em')).toBe('1em')
      expect(formatSize('2rem')).toBe('2rem')
    })

    it('should return default size when undefined', () => {
      expect(formatSize(undefined)).toBe('1em')
    })
  })

  describe('getTransform', () => {
    it('should return undefined when no transform', () => {
      expect(getTransform({})).toBeUndefined()
    })

    it('should handle rotate', () => {
      expect(getTransform({ rotate: 45 })).toBe('rotate(45deg)')
    })

    it('should handle horizontal flip', () => {
      expect(getTransform({ flip: 'horizontal' })).toBe('scaleX(-1)')
    })

    it('should handle vertical flip', () => {
      expect(getTransform({ flip: 'vertical' })).toBe('scaleY(-1)')
    })

    it('should handle both flip', () => {
      expect(getTransform({ flip: 'both' })).toBe('scale(-1, -1)')
    })

    it('should combine rotate and flip', () => {
      expect(getTransform({ rotate: 90, flip: 'horizontal' })).toBe(
        'rotate(90deg) scaleX(-1)',
      )
    })
  })

  describe('getIconClass', () => {
    it('should return base class', () => {
      expect(getIconClass({})).toBe('ld-icon')
    })

    it('should add spin class', () => {
      expect(getIconClass({ spin: true })).toBe('ld-icon ld-icon--spin')
    })

    it('should add custom class', () => {
      expect(getIconClass({}, 'my-class')).toBe('ld-icon my-class')
    })

    it('should combine all classes', () => {
      expect(getIconClass({ spin: true }, 'custom')).toBe(
        'ld-icon ld-icon--spin custom',
      )
    })
  })

  describe('normalizeIconName', () => {
    it('should convert to kebab-case', () => {
      expect(normalizeIconName('HomeIcon')).toBe('home')
      expect(normalizeIconName('ChevronDownIcon')).toBe('chevron-down')
    })

    it('should remove Icon suffix', () => {
      expect(normalizeIconName('SearchIcon')).toBe('search')
    })

    it('should handle already normalized names', () => {
      expect(normalizeIconName('home')).toBe('home')
    })
  })

  describe('camelizeIconName', () => {
    it('should convert to PascalCase', () => {
      expect(camelizeIconName('home')).toBe('Home')
      expect(camelizeIconName('chevron-down')).toBe('ChevronDown')
      expect(camelizeIconName('arrow-left-circle')).toBe('ArrowLeftCircle')
    })
  })
})




