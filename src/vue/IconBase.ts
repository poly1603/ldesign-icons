import { defineComponent, computed, h, type PropType, type CSSProperties } from 'vue'
import type { IconProps } from '../types'
import { getSvgProps, getIconClass, detectStrokeIcon } from '../utils'

/**
 * Vue 图标基础组件
 * @description 所有 Vue 图标的基础组件，使用计算属性缓存优化渲染性能
 */
export const IconBase = defineComponent({
  name: 'IconBase',

  props: {
    /**
     * 图标大小
     * @description 数字将转换为 px，字符串保持不变
     */
    size: {
      type: [Number, String] as PropType<number | string>,
      default: undefined,
    },

    /**
     * 图标颜色
     * @description 支持任何有效的 CSS 颜色值
     */
    color: {
      type: String,
      default: undefined,
    },

    /**
     * 描边宽度
     * @description 仅对描边类型图标有效
     */
    strokeWidth: {
      type: Number,
      default: undefined,
    },

    /**
     * 是否启用旋转动画
     * @description 启用后图标将持续旋转
     */
    spin: {
      type: Boolean,
      default: false,
    },

    /**
     * 旋转角度
     * @description 静态旋转图标到指定角度（度）
     */
    rotate: {
      type: Number,
      default: 0,
    },

    /**
     * 翻转方向
     * @description 水平、垂直或双向翻转
     */
    flip: {
      type: String as PropType<'horizontal' | 'vertical' | 'both'>,
      default: undefined,
    },

    /**
     * SVG ViewBox 属性
     * @description 定义图标的坐标系统
     */
    viewBox: {
      type: String,
      default: '0 0 24 24',
    },

    /**
     * SVG 路径数据
     * @description 单个或多个 path 元素的 d 属性值
     */
    path: {
      type: [String, Array] as PropType<string | string[]>,
      required: true,
    },

    /**
     * 是否为描边类型图标
     * @description 如果未提供，将自动检测
     */
    isStroke: {
      type: Boolean,
      default: undefined,
    },

    /**
     * ARIA 标签
     * @description 为屏幕阅读器提供图标描述
     */
    ariaLabel: {
      type: String,
      default: undefined,
    },

    /**
     * ARIA 角色
     * @description 定义图标的语义角色
     */
    role: {
      type: String,
      default: undefined,
    },

    /**
     * 标题（工具提示）
     * @description 鼠标悬停时显示的提示文本
     */
    title: {
      type: String,
      default: undefined,
    },
  },

  setup(props, { attrs }) {
    // 图标属性对象（带缓存）
    const iconProps = computed<IconProps>(() => ({
      size: props.size,
      color: props.color,
      strokeWidth: props.strokeWidth,
      spin: props.spin,
      rotate: props.rotate,
      flip: props.flip,
      ariaLabel: props.ariaLabel,
      role: props.role,
      title: props.title,
    }))

    // 自动检测或使用传入的图标类型（带缓存）
    const isStrokeIcon = computed(() => {
      if (props.isStroke !== undefined) {
        return props.isStroke
      }
      return detectStrokeIcon(props.path)
    })

    // SVG 属性（带缓存）
    const svgProps = computed(() => getSvgProps(iconProps.value, isStrokeIcon.value))

    // CSS 类名（带缓存）
    const className = computed(() => {
      const customClass = typeof attrs.class === 'string' ? attrs.class : ''
      return getIconClass(iconProps.value, customClass)
    })

    // 样式对象（带缓存）
    const style = computed<CSSProperties>(() => {
      const baseStyle: CSSProperties = {
        display: 'inline-block',
        lineHeight: 1,
        flexShrink: 0,
      }

      // 添加旋转动画
      if (props.spin) {
        baseStyle.animation = 'ld-icon-spin 1s linear infinite'
      }

      return {
        ...baseStyle,
        ...(typeof attrs.style === 'object' ? attrs.style : {}),
      }
    })

    // 路径数组（带缓存）
    const paths = computed(() => Array.isArray(props.path) ? props.path : [props.path])

    // 可访问性属性（带缓存）
    const ariaAttributes = computed(() => ({
      'aria-label': props.ariaLabel,
      'aria-hidden': props.ariaLabel ? undefined : 'true',
      'role': props.role || (props.ariaLabel ? 'img' : undefined),
    }))

    return () => {
      // 构建子元素数组
      const children = []

      // 添加 title 元素（用于工具提示）
      if (props.title) {
        children.push(h('title', props.title))
      }

      // 添加路径元素
      children.push(
        ...paths.value.map((pathData, index) =>
          h('path', {
            key: index,
            d: pathData,
            fill: svgProps.value.fill,
            stroke: svgProps.value.stroke,
            strokeWidth: svgProps.value.strokeWidth,
            strokeLinecap: isStrokeIcon.value ? 'round' : undefined,
            strokeLinejoin: isStrokeIcon.value ? 'round' : undefined,
          })
        )
      )

      return h(
        'svg',
        {
          ...svgProps.value,
          viewBox: props.viewBox,
          class: className.value,
          style: style.value,
          xmlns: 'http://www.w3.org/2000/svg',
          focusable: 'false',
          ...ariaAttributes.value,
        },
        children
      )
    }
  },
})

/**
 * 图标组件缓存
 * @description 缓存已创建的 Vue 图标组件，避免重复创建
 * @private
 */
const vueIconComponentCache = new Map<string, ReturnType<typeof defineComponent>>()

/**
 * 创建 Vue 图标组件
 * @description 工厂函数，为每个图标创建优化的 Vue 组件
 * @param name - 图标名称（PascalCase）
 * @param path - SVG 路径数据
 * @param viewBox - SVG viewBox 属性
 * @param isStroke - 是否为描边类型图标
 * @returns Vue 图标组件
 * @example
 * ```ts
 * const HomeIcon = createVueIcon('Home', 'M3 9l9-7...', '0 0 24 24', true)
 * ```
 */
export function createVueIcon(
  name: string,
  path: string | string[],
  viewBox = '0 0 24 24',
  isStroke?: boolean
) {
  // 生成缓存键
  const cacheKey = `${name}-${viewBox}`

  // 检查缓存
  if (vueIconComponentCache.has(cacheKey)) {
    return vueIconComponentCache.get(cacheKey)!
  }

  // 创建组件
  const component = defineComponent({
    name: `${name}Icon`,

    props: {
      size: {
        type: [Number, String] as PropType<number | string>,
        default: undefined,
      },
      color: {
        type: String,
        default: undefined,
      },
      strokeWidth: {
        type: Number,
        default: undefined,
      },
      spin: {
        type: Boolean,
        default: false,
      },
      rotate: {
        type: Number,
        default: 0,
      },
      flip: {
        type: String as PropType<'horizontal' | 'vertical' | 'both'>,
        default: undefined,
      },
      ariaLabel: {
        type: String,
        default: undefined,
      },
      role: {
        type: String,
        default: undefined,
      },
      title: {
        type: String,
        default: undefined,
      },
    },

    setup(props, { attrs }) {
      return () =>
        h(IconBase, {
          ...props,
          ...attrs,
          path,
          viewBox,
          isStroke,
        })
    },
  })

  // 缓存组件
  vueIconComponentCache.set(cacheKey, component)

  return component
}






