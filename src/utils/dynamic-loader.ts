/**
 * 图标动态加载模块
 * @description 实现图标的按需动态加载和预加载策略
 * @module utils/dynamic-loader
 */

import type { IconLoadState, IconPreloadOptions } from '../types'

/**
 * 加载状态管理器
 * @description 跟踪每个图标的加载状态
 * @private
 */
const loadStateMap = new Map<string, IconLoadState>()

/**
 * 图标模块缓存
 * @description 缓存已加载的图标模块
 * @private
 */
const moduleCache = new Map<string, any>()

/**
 * 正在加载的Promise映射
 * @description 防止同一个图标被重复加载
 * @private
 */
const loadingPromises = new Map<string, Promise<any>>()

/**
 * 动态加载图标组件
 * @description 根据图标名称和框架类型动态导入图标
 * @param name - 图标名称（kebab-case）
 * @param framework - 框架类型
 * @returns Promise<图标组件>
 * @throws {Error} 加载失败时抛出错误
 * @example
 * ```ts
 * // Vue
 * const HomeIcon = await loadIcon('home', 'vue')
 * 
 * // React
 * const HomeIcon = await loadIcon('home', 'react')
 * 
 * // Lit
 * const HomeIcon = await loadIcon('home', 'lit')
 * ```
 */
export async function loadIcon(
  name: string,
  framework: 'vue' | 'react' | 'lit' = 'vue'
): Promise<any> {
  const cacheKey = `${framework}:${name}`

  // 检查缓存
  if (moduleCache.has(cacheKey)) {
    return moduleCache.get(cacheKey)
  }

  // 检查是否正在加载
  if (loadingPromises.has(cacheKey)) {
    return loadingPromises.get(cacheKey)
  }

  // 设置加载状态
  loadStateMap.set(cacheKey, 'loading')

  // 创建加载 Promise
  const loadPromise = (async () => {
    try {
      // 根据框架类型构建导入路径
      const modulePath = getModulePath(name, framework)

      // 动态导入模块
      const module = await import(/* @vite-ignore */ modulePath)

      // 提取图标组件
      const iconComponent = extractIconComponent(module, name)

      // 缓存模块
      moduleCache.set(cacheKey, iconComponent)

      // 更新状态
      loadStateMap.set(cacheKey, 'loaded')

      return iconComponent
    } catch (error) {
      // 更新状态为错误
      loadStateMap.set(cacheKey, 'error')

      throw new Error(`Failed to load icon "${name}" for ${framework}: ${error}`)
    } finally {
      // 清除加载Promise
      loadingPromises.delete(cacheKey)
    }
  })()

  // 保存加载Promise
  loadingPromises.set(cacheKey, loadPromise)

  return loadPromise
}

/**
 * 获取模块导入路径
 * @private
 * @param name - 图标名称
 * @param framework - 框架类型
 * @returns 模块路径
 */
function getModulePath(name: string, framework: string): string {
  // 将 kebab-case 转换为 PascalCase
  const componentName = name
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('')

  // 构建路径
  return `@ldesign/icons/${framework}/${componentName}`
}

/**
 * 从模块中提取图标组件
 * @private
 * @param module - 导入的模块
 * @param name - 图标名称
 * @returns 图标组件
 */
function extractIconComponent(module: any, name: string): any {
  // 尝试获取默认导出
  if (module.default) {
    return module.default
  }

  // 尝试获取命名导出
  const componentName = name
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('') + 'Icon'

  if (module[componentName]) {
    return module[componentName]
  }

  throw new Error(`Cannot find icon component in module`)
}

/**
 * 获取图标加载状态
 * @param name - 图标名称
 * @param framework - 框架类型
 * @returns 加载状态
 */
export function getIconLoadState(
  name: string,
  framework: 'vue' | 'react' | 'lit' = 'vue'
): IconLoadState {
  const cacheKey = `${framework}:${name}`
  return loadStateMap.get(cacheKey) || 'idle'
}

/**
 * 预加载图标
 * @description 提前加载常用图标，提升首次使用性能
 * @param options - 预加载选项
 * @returns Promise<void[]>
 * @example
 * ```ts
 * // 预加载常用图标
 * await preloadIcons({
 *   icons: ['home', 'search', 'settings', 'user'],
 *   framework: 'vue',
 *   priority: 'high'
 * })
 * ```
 */
export async function preloadIcons(
  options: IconPreloadOptions
): Promise<void[]> {
  const {
    icons,
    framework = 'vue',
    priority = 'low',
    onComplete,
    onError,
  } = options

  // 根据优先级设置延迟
  const delay = priority === 'high' ? 0 : 100

  // 如果是低优先级，使用 requestIdleCallback
  if (priority === 'low' && typeof requestIdleCallback !== 'undefined') {
    return new Promise((resolve, reject) => {
      requestIdleCallback(async () => {
        try {
          const results = await performPreload(icons, framework)
          onComplete?.()
          resolve(results)
        } catch (error) {
          onError?.(error as Error)
          reject(error)
        }
      })
    })
  }

  // 高优先级直接加载
  try {
    await new Promise(resolve => setTimeout(resolve, delay))
    const results = await performPreload(icons, framework)
    onComplete?.()
    return results
  } catch (error) {
    onError?.(error as Error)
    throw error
  }
}

/**
 * 执行预加载
 * @private
 * @param icons - 图标名称列表
 * @param framework - 框架类型
 * @returns Promise<void[]>
 */
async function performPreload(
  icons: string[],
  framework: 'vue' | 'react' | 'lit'
): Promise<void[]> {
  // 批量并发加载
  const loadPromises = icons.map(icon =>
    loadIcon(icon, framework).catch(error => {
      console.warn(`Failed to preload icon "${icon}":`, error)
      return null
    })
  )

  await Promise.all(loadPromises)
  return []
}

/**
 * 批量加载图标
 * @description 批量加载多个图标
 * @param names - 图标名称数组
 * @param framework - 框架类型
 * @returns Promise<Map<string, any>>
 */
export async function loadIcons(
  names: string[],
  framework: 'vue' | 'react' | 'lit' = 'vue'
): Promise<Map<string, any>> {
  const results = new Map<string, any>()

  // 并发加载所有图标
  await Promise.allSettled(
    names.map(async (name) => {
      try {
        const component = await loadIcon(name, framework)
        results.set(name, component)
      } catch (error) {
        console.error(`Failed to load icon "${name}":`, error)
      }
    })
  )

  return results
}

/**
 * 清除图标缓存
 * @description 清除已缓存的图标模块
 * @param name - 图标名称，不提供则清除所有
 * @param framework - 框架类型
 */
export function clearIconCache(
  name?: string,
  framework?: 'vue' | 'react' | 'lit'
): void {
  if (name && framework) {
    const cacheKey = `${framework}:${name}`
    moduleCache.delete(cacheKey)
    loadStateMap.delete(cacheKey)
  } else {
    moduleCache.clear()
    loadStateMap.clear()
  }
}

/**
 * 获取缓存统计
 * @description 获取缓存的图标数量和状态
 * @returns 缓存统计信息
 */
export function getCacheStats() {
  const stats = {
    total: moduleCache.size,
    byFramework: {
      vue: 0,
      react: 0,
      lit: 0,
    },
    byState: {
      idle: 0,
      loading: 0,
      loaded: 0,
      error: 0,
    },
  }

  for (const key of moduleCache.keys()) {
    const framework = key.split(':')[0] as 'vue' | 'react' | 'lit'
    stats.byFramework[framework]++
  }

  for (const state of loadStateMap.values()) {
    stats.byState[state]++
  }

  return stats
}


