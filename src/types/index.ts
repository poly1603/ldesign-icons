/**
 * 图标组件属性接口
 * @description 定义所有图标组件通用的属性配置
 */
export interface IconProps {
  /**
   * 图标大小
   * @description 可以是数字（将转换为px）或带单位的字符串（如 '1em', '2rem'）
   * @default '1em'
   * @example
   * ```tsx
   * <Icon size={24} />      // 24px
   * <Icon size="2em" />     // 2em
   * ```
   */
  size?: number | string

  /**
   * 图标颜色
   * @description 支持任何有效的CSS颜色值，默认继承父元素文本颜色
   * @default 'currentColor'
   * @example
   * ```tsx
   * <Icon color="#1890ff" />
   * <Icon color="rgb(255, 0, 0)" />
   * ```
   */
  color?: string

  /**
   * 描边宽度
   * @description 仅对描边类型（stroke）图标有效，数值越大线条越粗
   * @default 2
   * @example
   * ```tsx
   * <Icon strokeWidth={1.5} />  // 细线条
   * <Icon strokeWidth={3} />    // 粗线条
   * ```
   */
  strokeWidth?: number

  /**
   * 是否启用旋转动画
   * @description 启用后图标将持续旋转，常用于加载指示器
   * @default false
   * @example
   * ```tsx
   * <LoadingIcon spin />
   * ```
   */
  spin?: boolean

  /**
   * 旋转角度（度）
   * @description 静态旋转图标到指定角度，0-360度
   * @default 0
   * @example
   * ```tsx
   * <ArrowIcon rotate={90} />   // 顺时针旋转90度
   * <ArrowIcon rotate={180} />  // 旋转180度
   * ```
   */
  rotate?: number

  /**
   * 翻转方向
   * @description 水平、垂直或双向翻转图标
   * @example
   * ```tsx
   * <Icon flip="horizontal" />  // 水平翻转
   * <Icon flip="vertical" />    // 垂直翻转
   * <Icon flip="both" />        // 双向翻转
   * ```
   */
  flip?: 'horizontal' | 'vertical' | 'both'

  /**
   * ARIA 标签
   * @description 为屏幕阅读器提供图标描述，提升可访问性
   * @example
   * ```tsx
   * <Icon ariaLabel="关闭对话框" />
   * ```
   */
  ariaLabel?: string

  /**
   * ARIA 角色
   * @description 定义图标的语义角色
   * @default 'img'
   * @example
   * ```tsx
   * <Icon role="img" />
   * ```
   */
  role?: string

  /**
   * 标题（鼠标悬停提示）
   * @description 鼠标悬停时显示的提示文本
   * @example
   * ```tsx
   * <Icon title="这是一个搜索图标" />
   * ```
   */
  title?: string
}

/**
 * 图标定义接口
 * @description 定义单个图标的完整元数据和渲染信息
 */
export interface IconDefinition {
  /**
   * 图标名称
   * @description 图标的唯一标识符，使用 kebab-case 格式
   * @example 'home', 'arrow-left', 'chevron-down'
   */
  name: string

  /**
   * ViewBox 属性
   * @description SVG 的视图框，定义图标的坐标系统和可见区域
   * @default '0 0 24 24'
   * @example '0 0 24 24', '0 0 32 32'
   */
  viewBox?: string

  /**
   * SVG 路径数据
   * @description SVG path 元素的 d 属性值，可以是单个路径或多个路径数组
   * @example
   * ```ts
   * // 单路径
   * path: 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z'
   * // 多路径
   * path: ['M...', 'M...']
   * ```
   */
  path: string | string[]

  /**
   * 图标分类
   * @description 图标所属的功能分类，用于组织和筛选
   * @example 'general', 'navigation', 'media', 'file'
   */
  category?: string

  /**
   * 图标标签（用于搜索）
   * @description 与图标相关的关键词，用于增强搜索匹配
   * @example ['house', 'building', 'homepage', '首页', '主页']
   */
  tags?: string[]

  /**
   * 是否为描边类型图标
   * @description 
   * - true: 描边图标（stroke），使用 stroke 属性着色
   * - false: 填充图标（filled），使用 fill 属性着色
   * @default false
   */
  isStroke?: boolean
}

/**
 * 图标全局配置接口
 * @description 用于设置图标系统的默认行为和样式
 */
export interface IconConfig {
  /**
   * 默认图标大小
   * @description 未指定 size 属性时使用的默认值
   * @default '1em'
   */
  defaultSize?: number | string

  /**
   * 默认图标颜色
   * @description 未指定 color 属性时使用的默认值，'currentColor' 会继承父元素文本颜色
   * @default 'currentColor'
   */
  defaultColor?: string

  /**
   * 默认描边宽度
   * @description 描边类型图标的默认线条粗细
   * @default 2
   */
  defaultStrokeWidth?: number

  /**
   * CSS 类名前缀
   * @description 所有图标元素的 CSS 类名前缀，用于样式隔离
   * @default 'ld-icon'
   */
  classPrefix?: string
}

/**
 * 图标元数据接口
 * @description 图标的搜索和展示元数据
 */
export interface IconMetadata {
  /**
   * 图标名称
   * @description 图标的规范化名称（kebab-case）
   */
  name: string

  /**
   * 图标分类
   * @description 所属的功能分类
   */
  category: string

  /**
   * 图标标签
   * @description 用于搜索的关键词列表
   */
  tags: string[]

  /**
   * Unicode 码点（用于图标字体）
   * @description 在图标字体中对应的 Unicode 编码
   * @example 'e001', 'e002'
   */
  unicode?: string
}

/**
 * 图标注册表接口
 * @description 管理图标的注册、查询和搜索
 */
export interface IconRegistry {
  /**
   * 注册图标
   * @description 将图标定义添加到注册表中
   * @param name - 图标名称（kebab-case）
   * @param definition - 图标定义对象
   * @example
   * ```ts
   * registry.register('home', {
   *   name: 'home',
   *   path: 'M3 9l9-7...',
   *   category: 'general'
   * })
   * ```
   */
  register(name: string, definition: IconDefinition): void

  /**
   * 获取图标定义
   * @description 根据名称获取图标的完整定义
   * @param name - 图标名称
   * @returns 图标定义对象，不存在则返回 undefined
   */
  get(name: string): IconDefinition | undefined

  /**
   * 检查图标是否存在
   * @description 判断指定名称的图标是否已注册
   * @param name - 图标名称
   * @returns 存在返回 true，否则返回 false
   */
  has(name: string): boolean

  /**
   * 获取所有图标名称
   * @description 返回已注册的所有图标名称列表
   * @returns 图标名称数组
   */
  list(): string[]

  /**
   * 搜索图标
   * @description 根据关键词搜索匹配的图标
   * @param query - 搜索关键词
   * @returns 匹配的图标元数据数组
   * @example
   * ```ts
   * const results = registry.search('arrow')
   * // 返回所有名称、分类或标签包含 'arrow' 的图标
   * ```
   */
  search(query: string): IconMetadata[]
}

/**
 * 图标动画类型
 * @description 内置的图标动画效果
 */
export type IconAnimation = 'spin' | 'pulse' | 'bounce' | 'shake' | 'flip'

/**
 * 图标动画配置
 * @description 配置图标动画的行为参数
 */
export interface IconAnimationConfig {
  /**
   * 动画类型
   */
  type: IconAnimation

  /**
   * 动画持续时间（毫秒）
   * @default 1000
   */
  duration?: number

  /**
   * 动画时间函数
   * @default 'linear'
   */
  timing?: 'linear' | 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out'

  /**
   * 是否无限循环
   * @default true
   */
  infinite?: boolean
}

/**
 * 图标加载状态
 * @description 动态加载图标时的状态
 */
export type IconLoadState = 'idle' | 'loading' | 'loaded' | 'error'

/**
 * 图标预加载选项
 * @description 配置图标预加载行为
 */
export interface IconPreloadOptions {
  /**
   * 要预加载的图标名称列表
   */
  icons: string[]

  /**
   * 目标框架
   * @default 'vue'
   */
  framework?: 'vue' | 'react' | 'lit'

  /**
   * 预加载优先级
   * @default 'low'
   */
  priority?: 'high' | 'low'

  /**
   * 加载完成回调
   */
  onComplete?: () => void

  /**
   * 加载错误回调
   */
  onError?: (error: Error) => void
}





