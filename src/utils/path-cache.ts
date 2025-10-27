/**
 * SVG 路径字符串缓存池
 * @description 使用字符串驻留（String Interning）技术减少内存占用
 * 当多个图标使用相同的 path 数据时，共享同一个字符串实例
 */
export class PathCache {
  /**
   * 路径缓存 Map
   * @private
   */
  private cache = new Map<string, string>()

  /**
   * 缓存统计信息
   * @private
   */
  private stats = {
    hits: 0,      // 缓存命中次数
    misses: 0,    // 缓存未命中次数
    total: 0,     // 驻留的字符串总数
  }

  /**
   * 驻留字符串
   * @description 如果字符串已存在则返回缓存的实例，否则缓存并返回
   * @param path - SVG 路径字符串
   * @returns 驻留后的字符串实例
   * @example
   * ```ts
   * const cache = new PathCache()
   * const path1 = cache.intern('M10 10 L20 20')
   * const path2 = cache.intern('M10 10 L20 20')
   * console.log(path1 === path2) // true - 共享同一个字符串实例
   * ```
   */
  intern(path: string): string {
    const existing = this.cache.get(path)
    if (existing !== undefined) {
      this.stats.hits++
      return existing
    }

    this.stats.misses++
    this.cache.set(path, path)
    this.stats.total = this.cache.size
    return path
  }

  /**
   * 批量驻留路径数组
   * @description 对路径数组中的每个路径进行驻留
   * @param paths - 路径字符串数组
   * @returns 驻留后的路径数组
   */
  internArray(paths: string[]): string[] {
    return paths.map(path => this.intern(path))
  }

  /**
   * 获取缓存统计信息
   * @returns 统计数据对象
   */
  getStats() {
    const hitRate = this.stats.hits + this.stats.misses > 0
      ? this.stats.hits / (this.stats.hits + this.stats.misses)
      : 0

    return {
      ...this.stats,
      hitRate: hitRate.toFixed(2),
      memoryUsage: `${this.stats.total} unique paths`,
    }
  }

  /**
   * 清空缓存
   * @description 释放所有缓存的字符串，重置统计信息
   */
  clear(): void {
    this.cache.clear()
    this.stats = {
      hits: 0,
      misses: 0,
      total: 0,
    }
  }

  /**
   * 获取缓存大小
   * @returns 缓存中驻留的唯一字符串数量
   */
  get size(): number {
    return this.cache.size
  }
}

/**
 * 全局路径缓存实例
 * @description 整个应用共享的路径缓存池
 */
export const globalPathCache = new PathCache()


