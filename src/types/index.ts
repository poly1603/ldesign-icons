/**
 * Icon 组件属性接口
 */
export interface IconProps {
  /**
   * 图标大小
   * @default '1em'
   */
  size?: number | string

  /**
   * 图标颜色
   * @default 'currentColor'
   */
  color?: string

  /**
   * 描边宽度
   * @default 2
   */
  strokeWidth?: number

  /**
   * 是否旋转动画
   * @default false
   */
  spin?: boolean

  /**
   * 旋转角度（度）
   * @default 0
   */
  rotate?: number

  /**
   * 翻转方向
   */
  flip?: 'horizontal' | 'vertical' | 'both'
}

/**
 * 图标定义接口
 */
export interface IconDefinition {
  /**
   * 图标名称
   */
  name: string

  /**
   * ViewBox 属性
   * @default '0 0 24 24'
   */
  viewBox?: string

  /**
   * SVG 路径数据
   */
  path: string | string[]

  /**
   * 图标分类
   */
  category?: string

  /**
   * 图标标签（用于搜索）
   */
  tags?: string[]

  /**
   * 是否为描边类型图标
   * @default false
   */
  isStroke?: boolean
}

/**
 * 图标配置
 */
export interface IconConfig {
  /**
   * 默认大小
   * @default '1em'
   */
  defaultSize?: number | string

  /**
   * 默认颜色
   * @default 'currentColor'
   */
  defaultColor?: string

  /**
   * 默认描边宽度
   * @default 2
   */
  defaultStrokeWidth?: number

  /**
   * 类名前缀
   * @default 'ld-icon'
   */
  classPrefix?: string
}

/**
 * 图标元数据
 */
export interface IconMetadata {
  /**
   * 图标名称
   */
  name: string

  /**
   * 图标分类
   */
  category: string

  /**
   * 图标标签
   */
  tags: string[]

  /**
   * Unicode 码点（用于图标字体）
   */
  unicode?: string
}

/**
 * 图标注册表
 */
export interface IconRegistry {
  /**
   * 注册图标
   */
  register(name: string, definition: IconDefinition): void

  /**
   * 获取图标定义
   */
  get(name: string): IconDefinition | undefined

  /**
   * 检查图标是否存在
   */
  has(name: string): boolean

  /**
   * 获取所有图标名称
   */
  list(): string[]

  /**
   * 搜索图标
   */
  search(query: string): IconMetadata[]
}






