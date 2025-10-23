import type { IconDefinition, IconProps, IconConfig, IconRegistry as IIconRegistry, IconMetadata } from '../types'

/**
 * 默认图标配置
 */
export const defaultConfig: Required<IconConfig> = {
  defaultSize: '1em',
  defaultColor: 'currentColor',
  defaultStrokeWidth: 2,
  classPrefix: 'ld-icon',
}

/**
 * 当前图标配置
 */
let currentConfig: Required<IconConfig> = { ...defaultConfig }

/**
 * 设置全局图标配置
 */
export function setIconConfig(config: Partial<IconConfig>): void {
  currentConfig = { ...currentConfig, ...config }
}

/**
 * 获取当前图标配置
 */
export function getIconConfig(): Required<IconConfig> {
  return { ...currentConfig }
}

/**
 * 格式化图标大小
 */
export function formatSize(size?: number | string): string {
  if (typeof size === 'number') {
    return `${size}px`
  }
  return size || currentConfig.defaultSize
}

/**
 * 计算旋转变换
 */
export function getTransform(props: IconProps): string | undefined {
  const transforms: string[] = []

  if (props.rotate) {
    transforms.push(`rotate(${props.rotate}deg)`)
  }

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
 * 生成图标类名
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
 * 规范化图标名称（转为 kebab-case）
 */
export function normalizeIconName(name: string): string {
  return name
    .replace(/([A-Z])/g, '-$1')
    .toLowerCase()
    .replace(/^-/, '')
    .replace(/icon$/, '')
}

/**
 * 驼峰化图标名称（转为 PascalCase）
 */
export function camelizeIconName(name: string): string {
  return name
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join('')
}

/**
 * 图标注册表实现
 */
class IconRegistryImpl implements IIconRegistry {
  private icons = new Map<string, IconDefinition>()
  private metadata = new Map<string, IconMetadata>()

  register(name: string, definition: IconDefinition): void {
    const normalizedName = normalizeIconName(name)
    this.icons.set(normalizedName, definition)

    // 存储元数据
    this.metadata.set(normalizedName, {
      name: normalizedName,
      category: definition.category || 'general',
      tags: definition.tags || [],
    })
  }

  get(name: string): IconDefinition | undefined {
    return this.icons.get(normalizeIconName(name))
  }

  has(name: string): boolean {
    return this.icons.has(normalizeIconName(name))
  }

  list(): string[] {
    return Array.from(this.icons.keys())
  }

  search(query: string): IconMetadata[] {
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

  clear(): void {
    this.icons.clear()
    this.metadata.clear()
  }
}

/**
 * 全局图标注册表
 */
export const iconRegistry: IIconRegistry = new IconRegistryImpl()

/**
 * 创建自定义图标
 */
export function createIcon(definition: IconDefinition): IconDefinition {
  // 注册图标
  iconRegistry.register(definition.name, definition)
  return definition
}

/**
 * 批量注册图标
 */
export function registerIcons(icons: Record<string, IconDefinition>): void {
  Object.entries(icons).forEach(([name, definition]) => {
    iconRegistry.register(name, definition)
  })
}

/**
 * 获取SVG属性
 */
export function getSvgProps(props: IconProps): {
  width: string
  height: string
  fill: string
  stroke?: string
  strokeWidth?: number
  transform?: string
  class?: string
} {
  const size = formatSize(props.size)

  return {
    width: size,
    height: size,
    fill: props.color || currentConfig.defaultColor,
    strokeWidth: props.strokeWidth || currentConfig.defaultStrokeWidth,
    transform: getTransform(props),
  }
}






