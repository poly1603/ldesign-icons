/**
 * @ldesign/icons - 统一图标系统
 * @description 企业级 SVG 图标库，支持 React/Vue/Lit 三大框架
 * @packageDocumentation
 * @version 0.1.0
 * @author LDesign Team
 * 
 * @example
 * ```ts
 * // Vue
 * import { HomeIcon } from '@ldesign/icons/vue'
 * 
 * // React
 * import { HomeIcon } from '@ldesign/icons/react'
 * 
 * // Lit (Web Components)
 * import '@ldesign/icons/lit'
 * ```
 */

// ==================== 类型定义 ====================
export type * from './types'

// ==================== 核心工具 ====================
export {
  // 配置管理
  setIconConfig,
  getIconConfig,

  // 工具函数
  formatSize,
  getTransform,
  getIconClass,
  normalizeIconName,
  camelizeIconName,
  getSvgProps,

  // 图标注册
  iconRegistry,
  createIcon,
  registerIcons,

  // 缓存工具
  PathCache,
  globalPathCache,
  LRUCache,
  Trie,
} from './utils'

// ==================== 动态加载 ====================
export {
  loadIcon,
  loadIcons,
  preloadIcons,
  getIconLoadState,
  clearIconCache,
  getCacheStats,
} from './utils/dynamic-loader'

// ==================== 动画预设 ====================
export {
  animationPresets,
  animationKeyframes,
  generateAnimationCSS,
  applyAnimation,
  getAnimationConfig,
  isValidAnimation,
} from './animations/presets'

// ==================== 错误处理 ====================
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
} from './utils/error-handler'

// ==================== SSR 支持 ====================
export {
  renderIconToString,
  renderIconsToString,
  extractCriticalCSS,
  generatePreloadLinks,
  renderSpriteIcon,
  renderVueIconSSR,
  renderReactIconSSR,
  type SSRRenderOptions,
} from './ssr'

/**
 * @remarks
 * 具体的图标组件需要从框架特定的入口导入：
 * - Vue 3: `@ldesign/icons/vue`
 * - React: `@ldesign/icons/react`
 * - Lit: `@ldesign/icons/lit`
 * 
 * 支持按需导入，Tree-shaking 友好，只打包实际使用的图标。
 * 
 * SSR 支持：
 * - 使用 `renderIconToString` 进行服务端渲染
 * - 使用 `extractCriticalCSS` 提取关键CSS
 * - 使用 `generatePreloadLinks` 生成预加载链接
 */






