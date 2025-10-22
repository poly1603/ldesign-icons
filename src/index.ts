/**
 * @ldesign/icons - 统一图标系统
 * 
 * @packageDocumentation
 */

// 导出类型
export type * from './types'

// 导出工具函数
export {
  setIconConfig,
  getIconConfig,
  formatSize,
  getTransform,
  getIconClass,
  normalizeIconName,
  camelizeIconName,
  iconRegistry,
  createIcon,
  registerIcons,
  getSvgProps,
} from './utils'

// 注意：具体的图标组件需要从框架特定的入口导入
// Vue: import { HomeIcon } from '@ldesign/icons/vue'
// React: import { HomeIcon } from '@ldesign/icons/react'

