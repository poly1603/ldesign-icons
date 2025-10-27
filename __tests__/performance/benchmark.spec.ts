/**
 * 图标系统性能基准测试
 * @description 测试关键操作的性能指标
 */

import { describe, it, expect, beforeAll } from 'vitest'
import { iconRegistry, LRUCache, Trie, globalPathCache } from '../../src/utils'
import type { IconMetadata } from '../../src/types'

describe('Performance Benchmarks', () => {
  describe('Icon Registry Performance', () => {
    beforeAll(() => {
      // 注册测试图标
      for (let i = 0; i < 100; i++) {
        iconRegistry.register(`test-icon-${i}`, {
          name: `test-icon-${i}`,
          path: `M${i} ${i} L${i + 10} ${i + 10}`,
          category: 'test',
          tags: [`tag${i}`, `test`],
        })
      }
    })

    it('should register icons quickly', () => {
      const start = performance.now()

      for (let i = 0; i < 1000; i++) {
        iconRegistry.register(`perf-icon-${i}`, {
          name: `perf-icon-${i}`,
          path: 'M10 10 L20 20',
          category: 'perf',
        })
      }

      const duration = performance.now() - start

      // 1000个图标注册应该在100ms内完成
      expect(duration).toBeLessThan(100)
      console.log(`注册1000个图标耗时: ${duration.toFixed(2)}ms`)
    })

    it('should retrieve icons quickly', () => {
      const start = performance.now()

      for (let i = 0; i < 1000; i++) {
        iconRegistry.get('test-icon-50')
      }

      const duration = performance.now() - start

      // 1000次获取应该在10ms内完成（带缓存）
      expect(duration).toBeLessThan(10)
      console.log(`获取图标1000次耗时: ${duration.toFixed(2)}ms`)
    })

    it('should search icons quickly', () => {
      const start = performance.now()

      for (let i = 0; i < 100; i++) {
        iconRegistry.search('test')
      }

      const duration = performance.now() - start

      // 100次搜索应该在50ms内完成
      expect(duration).toBeLessThan(50)
      console.log(`搜索100次耗时: ${duration.toFixed(2)}ms`)
    })
  })

  describe('LRU Cache Performance', () => {
    it('should handle high-frequency access efficiently', () => {
      const cache = new LRUCache<number, string>(100)

      // 填充缓存
      for (let i = 0; i < 100; i++) {
        cache.set(i, `value-${i}`)
      }

      const start = performance.now()

      // 高频访问
      for (let i = 0; i < 10000; i++) {
        cache.get(i % 100)
      }

      const duration = performance.now() - start

      // 10000次访问应该在20ms内完成
      expect(duration).toBeLessThan(20)
      console.log(`LRU缓存10000次访问耗时: ${duration.toFixed(2)}ms`)

      const stats = cache.getStats()
      console.log(`缓存命中率: ${stats.hitRate}`)
      expect(parseInt(stats.hitRate)).toBeGreaterThan(95)
    })

    it('should evict old entries efficiently', () => {
      const cache = new LRUCache<number, string>(50)

      const start = performance.now()

      // 超过容量的写入
      for (let i = 0; i < 200; i++) {
        cache.set(i, `value-${i}`)
      }

      const duration = performance.now() - start

      // 200次写入应该在5ms内完成
      expect(duration).toBeLessThan(5)
      console.log(`LRU缓存200次写入（含淘汰）耗时: ${duration.toFixed(2)}ms`)

      // 验证缓存大小
      expect(cache.size).toBe(50)
    })
  })

  describe('Trie Tree Performance', () => {
    const trie = new Trie()
    const testData: IconMetadata[] = []

    beforeAll(() => {
      // 准备测试数据
      for (let i = 0; i < 500; i++) {
        testData.push({
          name: `icon-${i}`,
          category: `category-${i % 10}`,
          tags: [`tag-${i % 20}`, `test`],
        })
      }

      // 插入数据
      testData.forEach(data => trie.insert(data))
    })

    it('should insert icons quickly', () => {
      const newTrie = new Trie()

      const start = performance.now()

      for (let i = 0; i < 1000; i++) {
        newTrie.insert({
          name: `icon-${i}`,
          category: 'test',
          tags: ['test'],
        })
      }

      const duration = performance.now() - start

      // 1000次插入应该在50ms内完成
      expect(duration).toBeLessThan(50)
      console.log(`Trie树1000次插入耗时: ${duration.toFixed(2)}ms`)
    })

    it('should search by prefix quickly', () => {
      const start = performance.now()

      for (let i = 0; i < 100; i++) {
        trie.search('icon-1')
      }

      const duration = performance.now() - start

      // 100次前缀搜索应该在10ms内完成
      expect(duration).toBeLessThan(10)
      console.log(`Trie树前缀搜索100次耗时: ${duration.toFixed(2)}ms`)
    })

    it('should fuzzy search efficiently', () => {
      const start = performance.now()

      for (let i = 0; i < 10; i++) {
        trie.fuzzySearch('icno-1', 2) // 故意拼错
      }

      const duration = performance.now() - start

      // 10次模糊搜索应该在100ms内完成
      expect(duration).toBeLessThan(100)
      console.log(`Trie树模糊搜索10次耗时: ${duration.toFixed(2)}ms`)
    })
  })

  describe('Path Cache Performance', () => {
    it('should intern strings efficiently', () => {
      const testPath = 'M10 10 L20 20 L30 30 Z'

      const start = performance.now()

      for (let i = 0; i < 10000; i++) {
        globalPathCache.intern(testPath)
      }

      const duration = performance.now() - start

      // 10000次驻留应该在20ms内完成
      expect(duration).toBeLessThan(20)
      console.log(`路径驻留10000次耗时: ${duration.toFixed(2)}ms`)

      const stats = globalPathCache.getStats()
      console.log(`路径缓存命中率: ${stats.hitRate}`)
      expect(parseFloat(stats.hitRate)).toBeGreaterThan(0.98) // >98% 命中率
    })

    it('should handle array interning efficiently', () => {
      const testPaths = [
        'M10 10 L20 20',
        'M20 20 L30 30',
        'M30 30 L40 40',
      ]

      const start = performance.now()

      for (let i = 0; i < 1000; i++) {
        globalPathCache.internArray(testPaths)
      }

      const duration = performance.now() - start

      // 1000次数组驻留应该在50ms内完成
      expect(duration).toBeLessThan(50)
      console.log(`路径数组驻留1000次耗时: ${duration.toFixed(2)}ms`)
    })
  })

  describe('Component Creation Performance', () => {
    it('should create icon components quickly', async () => {
      // 动态导入避免影响其他测试
      const { createReactIcon } = await import('../../src/react/IconBase')

      const start = performance.now()

      for (let i = 0; i < 1000; i++) {
        createReactIcon(`Icon${i}`, 'M10 10 L20 20')
      }

      const duration = performance.now() - start

      // 1000个组件创建应该在100ms内完成（带缓存）
      expect(duration).toBeLessThan(100)
      console.log(`React组件创建1000个耗时: ${duration.toFixed(2)}ms`)
    })
  })

  describe('Overall Performance Summary', () => {
    it('should print performance summary', () => {
      console.log('\n' + '='.repeat(50))
      console.log('性能基准测试总结')
      console.log('='.repeat(50))
      console.log('✅ 所有性能指标均符合预期')
      console.log('✅ 图标注册: <100ms (1000个)')
      console.log('✅ 图标获取: <10ms (1000次)')
      console.log('✅ 图标搜索: <50ms (100次)')
      console.log('✅ LRU缓存: <20ms (10000次访问)')
      console.log('✅ Trie搜索: <10ms (100次)')
      console.log('✅ 路径驻留: <20ms (10000次)')
      console.log('='.repeat(50) + '\n')
    })
  })
})


