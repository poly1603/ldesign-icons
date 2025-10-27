import type { IconDefinition, IconProps, IconConfig, IconRegistry as IIconRegistry, IconMetadata } from '../types'
import { LRUCache } from './lru-cache'
import { Trie } from './trie'
import { globalPathCache } from './path-cache'

/**
 * 默认图标配置
 * @description 图标系统的全局默认配置
 */
export const defaultConfig: Required<IconConfig> = {
  defaultSize: '1em',
  defaultColor: 'currentColor',
  defaultStrokeWidth: 2,
  classPrefix: 'ld-icon',
}

/**
 * 当前图标配置
 * @private
 */
let currentConfig: Required<IconConfig> = { ...defaultConfig }

/**
 * 设置全局图标配置
 * @description 更新图标系统的全局配置
 * @param config - 部分配置对象
 * @example
 * ```ts
 * setIconConfig({
 *   defaultSize: '24px',
 *   defaultColor: '#1890ff',
 *   defaultStrokeWidth: 1.5
 * })
 * ```
 */
export function setIconConfig(config: Partial<IconConfig>): void {
  currentConfig = { ...currentConfig, ...config }
}

/**
 * 获取当前图标配置
 * @description 返回当前的全局配置（副本）
 * @returns 图标配置对象
 */
export function getIconConfig(): Required<IconConfig> {
  return { ...currentConfig }
}

/**
 * 格式化图标大小
 * @description 将数字转换为 px 单位，字符串保持不变
 * @param size - 图标大小（数字或字符串）
 * @returns 格式化后的大小字符串
 * @example
 * ```ts
 * formatSize(24)      // '24px'
 * formatSize('2em')   // '2em'
 * formatSize()        // '1em' (默认值)
 * ```
 */
export function formatSize(size?: number | string): string {
  if (typeof size === 'number') {
    return `${size}px`
  }
  return size || currentConfig.defaultSize
}

/**
 * 计算CSS变换字符串
 * @description 根据图标属性生成 transform CSS 值
 * @param props - 图标属性
 * @returns transform 字符串，无变换时返回 undefined
 * @example
 * ```ts
 * getTransform({ rotate: 90 })                    // 'rotate(90deg)'
 * getTransform({ flip: 'horizontal' })            // 'scaleX(-1)'
 * getTransform({ rotate: 45, flip: 'vertical' })  // 'rotate(45deg) scaleY(-1)'
 * ```
 */
export function getTransform(props: IconProps): string | undefined {
  const transforms: string[] = []

  // 旋转变换
  if (props.rotate) {
    transforms.push(`rotate(${props.rotate}deg)`)
  }

  // 翻转变换
  if (props.flip) {
    switch (props.flip) {
      case 'horizontal':
        transforms.push('scaleX(-1)')
        break
      case 'vertical':
        transforms.push('scaleY(-1)')
        break
      case 'both':
        transforms.push('scale(-1, -1)')
        break
    }
  }

  return transforms.length > 0 ? transforms.join(' ') : undefined
}

/**
 * 生成图标CSS类名
 * @description 组合基础类名、动画类名和自定义类名
 * @param props - 图标属性
 * @param customClass - 自定义类名
 * @returns 完整的类名字符串
 * @example
 * ```ts
 * getIconClass({})                        // 'ld-icon'
 * getIconClass({ spin: true })            // 'ld-icon ld-icon--spin'
 * getIconClass({}, 'my-icon')             // 'ld-icon my-icon'
 * getIconClass({ spin: true }, 'custom')  // 'ld-icon ld-icon--spin custom'
 * ```
 */
export function getIconClass(props: IconProps, customClass?: string): string {
  const classes = [currentConfig.classPrefix]

  if (props.spin) {
    classes.push(`${currentConfig.classPrefix}--spin`)
  }

  if (customClass) {
    classes.push(customClass)
  }

  return classes.join(' ')
}

/**
 * 规范化图标名称
 * @description 将 PascalCase 或 camelCase 转换为 kebab-case，并移除 'Icon' 后缀
 * @param name - 原始图标名称
 * @returns 规范化后的名称
 * @example
 * ```ts
 * normalizeIconName('HomeIcon')        // 'home'
 * normalizeIconName('ChevronDownIcon') // 'chevron-down'
 * normalizeIconName('ArrowLeft')       // 'arrow-left'
 * ```
 */
export function normalizeIconName(name: string): string {
  return name
    .replace(/([A-Z])/g, '-$1')  // 在大写字母前插入连字符
    .toLowerCase()               // 转小写
    .replace(/^-/, '')          // 移除开头的连字符
    .replace(/icon$/, '')       // 移除 'icon' 后缀
}

/**
 * 驼峰化图标名称
 * @description 将 kebab-case 转换为 PascalCase
 * @param name - kebab-case 格式的名称
 * @returns PascalCase 格式的名称
 * @example
 * ```ts
 * camelizeIconName('home')              // 'Home'
 * camelizeIconName('chevron-down')      // 'ChevronDown'
 * camelizeIconName('arrow-left-circle') // 'ArrowLeftCircle'
 * ```
 */
export function camelizeIconName(name: string): string {
  return name
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join('')
}

/**
 * 图标注册表实现
 * @description 增强版注册表，集成 LRU 缓存和 Trie 树搜索
 */
class IconRegistryImpl implements IIconRegistry {
  /**
   * 图标定义存储
   * @private
   */
  private icons = new Map<string, IconDefinition>()

  /**
   * 图标元数据存储
   * @private
   */
  private metadata = new Map<string, IconMetadata>()

  /**
   * 搜索结果 LRU 缓存
   * @private
   * @description 缓存最近的搜索结果，提升重复搜索性能
   */
  private searchCache = new LRUCache<string, IconMetadata[]>(50)

  /**
   * Trie 树搜索索引
   * @private
   * @description 用于快速前缀搜索和模糊搜索
   */
  private trie = new Trie()

  /**
   * 图标定义 LRU 缓存
   * @private
   * @description 缓存最近访问的图标定义
   */
  private iconCache = new LRUCache<string, IconDefinition>(100)

  /**
   * 注册图标
   * @description 将图标添加到注册表，同时更新搜索索引和缓存
   */
  register(name: string, definition: IconDefinition): void {
    const normalizedName = normalizeIconName(name)

    // 使用路径缓存优化内存
    const optimizedDefinition = {
      ...definition,
      path: Array.isArray(definition.path)
        ? globalPathCache.internArray(definition.path)
        : globalPathCache.intern(definition.path),
    }

    this.icons.set(normalizedName, optimizedDefinition)

    // 存储元数据
    const meta: IconMetadata = {
      name: normalizedName,
      category: definition.category || 'general',
      tags: definition.tags || [],
    }
    this.metadata.set(normalizedName, meta)

    // 添加到 Trie 树索引
    this.trie.insert(meta)

    // 清除搜索缓存（因为新增了图标）
    this.searchCache.clear()
  }

  /**
   * 获取图标定义
   * @description 带 LRU 缓存的获取，提升访问性能
   */
  get(name: string): IconDefinition | undefined {
    const normalizedName = normalizeIconName(name)

    // 先检查缓存
    const cached = this.iconCache.get(normalizedName)
    if (cached) {
      return cached
    }

    // 从主存储获取
    const icon = this.icons.get(normalizedName)
    if (icon) {
      // 加入缓存
      this.iconCache.set(normalizedName, icon)
    }

    return icon
  }

  /**
   * 检查图标是否存在
   */
  has(name: string): boolean {
    return this.icons.has(normalizeIconName(name))
  }

  /**
   * 获取所有图标名称列表
   */
  list(): string[] {
    return Array.from(this.icons.keys())
  }

  /**
   * 搜索图标
   * @description 高性能搜索，集成缓存、Trie 树前缀搜索和模糊搜索
   */
  search(query: string): IconMetadata[] {
    if (!query || query.trim() === '') {
      return []
    }

    const trimmedQuery = query.trim()

    // 检查搜索缓存
    const cached = this.searchCache.get(trimmedQuery)
    if (cached) {
      return cached
    }

    let results: IconMetadata[]

    // 使用 Trie 树进行前缀搜索（快速）
    const trieResults = this.trie.search(trimmedQuery)

    if (trieResults.length > 0) {
      results = trieResults
    } else {
      // 如果前缀搜索无结果，尝试模糊搜索
      results = this.trie.fuzzySearch(trimmedQuery, 2)
    }

    // 如果 Trie 搜索仍无结果，回退到传统搜索
    if (results.length === 0) {
      results = this.fallbackSearch(trimmedQuery)
    }

    // 缓存搜索结果
    this.searchCache.set(trimmedQuery, results)

    return results
  }

  /**
   * 传统搜索方法（回退方案）
   * @private
   * @description 当 Trie 搜索无结果时使用
   */
  private fallbackSearch(query: string): IconMetadata[] {
    const lowerQuery = query.toLowerCase()
    const results: IconMetadata[] = []

    for (const [name, meta] of this.metadata) {
      // 搜索名称
      if (name.includes(lowerQuery)) {
        results.push(meta)
        continue
      }

      // 搜索分类
      if (meta.category.toLowerCase().includes(lowerQuery)) {
        results.push(meta)
        continue
      }

      // 搜索标签
      if (meta.tags.some(tag => tag.toLowerCase().includes(lowerQuery))) {
        results.push(meta)
        continue
      }
    }

    return results
  }

  /**
   * 清空注册表
   * @description 清除所有图标、元数据、缓存和索引
   */
  clear(): void {
    this.icons.clear()
    this.metadata.clear()
    this.searchCache.clear()
    this.iconCache.clear()
    this.trie.clear()
  }

  /**
   * 获取缓存统计信息
   * @description 用于性能监控和调试
   * @returns 缓存统计数据
   */
  getCacheStats() {
    return {
      iconCache: this.iconCache.getStats(),
      searchCache: this.searchCache.getStats(),
      pathCache: globalPathCache.getStats(),
      totalIcons: this.icons.size,
    }
  }
}

/**
 * 全局图标注册表实例
 * @description 应用级单例，管理所有已注册的图标
 */
export const iconRegistry: IIconRegistry = new IconRegistryImpl()

/**
 * 创建并注册自定义图标
 * @description 快捷方法，创建图标定义并自动注册到全局注册表
 * @param definition - 图标定义对象
 * @returns 图标定义对象
 * @example
 * ```ts
 * const myIcon = createIcon({
 *   name: 'my-custom-icon',
 *   path: 'M10 10 L20 20 L10 30 Z',
 *   category: 'custom',
 *   tags: ['custom', 'triangle'],
 *   isStroke: false
 * })
 * ```
 */
export function createIcon(definition: IconDefinition): IconDefinition {
  // 注册图标到全局注册表
  iconRegistry.register(definition.name, definition)
  return definition
}

/**
 * 批量注册图标
 * @description 一次性注册多个图标到全局注册表
 * @param icons - 图标定义对象映射
 * @example
 * ```ts
 * registerIcons({
 *   'icon-1': { name: 'icon-1', path: 'M...' },
 *   'icon-2': { name: 'icon-2', path: 'M...' },
 * })
 * ```
 */
export function registerIcons(icons: Record<string, IconDefinition>): void {
  Object.entries(icons).forEach(([name, definition]) => {
    iconRegistry.register(name, definition)
  })
}

/**
 * SVG 路径检测结果缓存
 * @description 使用 WeakMap 避免内存泄漏
 * @private
 */
const strokeDetectionCache = new Map<string, boolean>()

/**
 * 检测 SVG path 是否为描边类型图标
 * @description 通过分析 path 数据特征判断图标类型，带缓存优化
 * @param pathData - SVG 路径字符串或数组
 * @returns true 表示描边图标，false 表示填充图标
 * @example
 * ```ts
 * detectStrokeIcon('M10 10 L20 20')  // true (简单线条)
 * detectStrokeIcon('M0 0 L10 0 L10 10 L0 10 Z')  // false (闭合填充)
 * ```
 */
export function detectStrokeIcon(pathData: string | string[]): boolean {
  // 生成缓存键
  const cacheKey = Array.isArray(pathData) ? pathData.join('|') : pathData

  // 检查缓存
  if (strokeDetectionCache.has(cacheKey)) {
    return strokeDetectionCache.get(cacheKey)!
  }

  const paths = Array.isArray(pathData) ? pathData : [pathData]

  // 启发式检测算法：
  // stroke 图标特征：
  // 1. 路径相对简单
  // 2. 主要使用 M (moveTo), L (lineTo), C (curveTo), Q (quadraticCurveTo) 命令
  // 3. 闭合命令 (Z) 占比较低

  let isStroke = false

  for (const path of paths) {
    // 统计命令类型
    const zCount = (path.match(/[Zz]/g) || []).length        // 闭合命令
    const commandCount = (path.match(/[MLHVCQTAZmlhvcqtaz]/g) || []).length  // 所有命令

    // 启发式规则：闭合路径占比 < 30% 通常是描边图标
    if (commandCount > 0 && zCount / commandCount < 0.3) {
      isStroke = true
      break
    }
  }

  // 缓存结果
  strokeDetectionCache.set(cacheKey, isStroke)

  // 限制缓存大小，防止内存泄漏
  if (strokeDetectionCache.size > 1000) {
    // 删除最早的50个条目
    const keysToDelete = Array.from(strokeDetectionCache.keys()).slice(0, 50)
    keysToDelete.forEach(key => strokeDetectionCache.delete(key))
  }

  return isStroke
}

/**
 * 获取SVG元素属性
 * @description 根据图标类型和属性生成完整的 SVG 属性对象
 * @param props - 图标属性
 * @param isStroke - 是否为描边类型图标
 * @returns SVG 属性对象
 * @example
 * ```ts
 * // 填充图标
 * getSvgProps({ size: 24, color: 'red' }, false)
 * // => { width: '24px', height: '24px', fill: 'red' }
 * 
 * // 描边图标
 * getSvgProps({ size: '2em', color: 'blue', strokeWidth: 1.5 }, true)
 * // => { width: '2em', height: '2em', fill: 'none', stroke: 'blue', strokeWidth: 1.5 }
 * ```
 */
export function getSvgProps(props: IconProps, isStroke = false): {
  width: string
  height: string
  fill: string
  stroke?: string
  strokeWidth?: number
  transform?: string
  class?: string
} {
  const size = formatSize(props.size)
  const color = props.color || currentConfig.defaultColor

  if (isStroke) {
    // 描边类型图标：无填充，使用 stroke 着色
    return {
      width: size,
      height: size,
      fill: 'none',
      stroke: color,
      strokeWidth: props.strokeWidth || currentConfig.defaultStrokeWidth,
      transform: getTransform(props),
    }
  } else {
    // 填充类型图标：使用 fill 着色
    return {
      width: size,
      height: size,
      fill: color,
      transform: getTransform(props),
    }
  }
}

// 导出工具类和缓存
export { PathCache, globalPathCache } from './path-cache'
export { LRUCache } from './lru-cache'
export { Trie } from './trie'

// 导出错误处理
export {
  IconError,
  IconLoadError,
  IconNotFoundError,
  IconConfigError,
  IconRenderError,
  setErrorHandler,
  getErrorHandler,
  handleError,
  safeExecute,
  safeExecuteAsync,
  ErrorLogger,
  defaultErrorLogger,
  createErrorHandler,
  type ErrorHandler,
} from './error-handler'



