/**
 * LRU（Least Recently Used）缓存实现
 * @description 最近最少使用缓存策略，自动淘汰最久未使用的条目
 * @template K - 键类型
 * @template V - 值类型
 */
export class LRUCache<K, V> {
  /**
   * 缓存 Map，保持插入顺序
   * @private
   */
  private cache = new Map<K, V>()

  /**
   * 最大缓存容量
   * @private
   */
  private maxSize: number

  /**
   * 缓存命中统计
   * @private
   */
  private hits = 0

  /**
   * 缓存未命中统计
   * @private
   */
  private misses = 0

  /**
   * 创建 LRU 缓存实例
   * @param maxSize - 最大缓存条目数，默认 100
   */
  constructor(maxSize = 100) {
    this.maxSize = maxSize
  }

  /**
   * 获取缓存值
   * @description 如果键存在，将其移到最近使用位置
   * @param key - 缓存键
   * @returns 缓存值，不存在则返回 undefined
   */
  get(key: K): V | undefined {
    const value = this.cache.get(key)

    if (value === undefined) {
      this.misses++
      return undefined
    }

    this.hits++
    // 删除后重新插入，将该项移到 Map 的末尾（最近使用）
    this.cache.delete(key)
    this.cache.set(key, value)
    return value
  }

  /**
   * 设置缓存值
   * @description 如果超过容量限制，删除最久未使用的条目
   * @param key - 缓存键
   * @param value - 缓存值
   */
  set(key: K, value: V): void {
    // 如果键已存在，先删除
    if (this.cache.has(key)) {
      this.cache.delete(key)
    }

    // 添加新条目
    this.cache.set(key, value)

    // 如果超过容量，删除最旧的条目（Map 的第一个元素）
    if (this.cache.size > this.maxSize) {
      const firstKey = this.cache.keys().next().value
      this.cache.delete(firstKey)
    }
  }

  /**
   * 检查键是否存在
   * @param key - 缓存键
   * @returns 存在返回 true，否则返回 false
   */
  has(key: K): boolean {
    return this.cache.has(key)
  }

  /**
   * 删除缓存项
   * @param key - 缓存键
   * @returns 删除成功返回 true，键不存在返回 false
   */
  delete(key: K): boolean {
    return this.cache.delete(key)
  }

  /**
   * 清空所有缓存
   */
  clear(): void {
    this.cache.clear()
    this.hits = 0
    this.misses = 0
  }

  /**
   * 获取缓存大小
   * @returns 当前缓存的条目数
   */
  get size(): number {
    return this.cache.size
  }

  /**
   * 获取缓存统计信息
   * @returns 统计数据对象
   */
  getStats() {
    const total = this.hits + this.misses
    const hitRate = total > 0 ? this.hits / total : 0

    return {
      hits: this.hits,
      misses: this.misses,
      size: this.cache.size,
      maxSize: this.maxSize,
      hitRate: (hitRate * 100).toFixed(2) + '%',
    }
  }

  /**
   * 获取所有缓存键
   * @returns 键数组
   */
  keys(): K[] {
    return Array.from(this.cache.keys())
  }

  /**
   * 获取所有缓存值
   * @returns 值数组
   */
  values(): V[] {
    return Array.from(this.cache.values())
  }

  /**
   * 获取所有缓存条目
   * @returns 键值对数组
   */
  entries(): [K, V][] {
    return Array.from(this.cache.entries())
  }
}


