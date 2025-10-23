import { defineComponent, computed, h, type PropType, type CSSProperties } from 'vue'
import type { IconProps } from '../types'
import { getSvgProps, getIconClass } from '../utils'

/**
 * Vue 图标基础组件
 */
export const IconBase = defineComponent({
  name: 'IconBase',

  props: {
    /**
     * 图标大小
     */
    size: {
      type: [Number, String] as PropType<number | string>,
      default: undefined,
    },

    /**
     * 图标颜色
     */
    color: {
      type: String,
      default: undefined,
    },

    /**
     * 描边宽度
     */
    strokeWidth: {
      type: Number,
      default: undefined,
    },

    /**
     * 是否旋转动画
     */
    spin: {
      type: Boolean,
      default: false,
    },

    /**
     * 旋转角度
     */
    rotate: {
      type: Number,
      default: 0,
    },

    /**
     * 翻转方向
     */
    flip: {
      type: String as PropType<'horizontal' | 'vertical' | 'both'>,
      default: undefined,
    },

    /**
     * ViewBox
     */
    viewBox: {
      type: String,
      default: '0 0 24 24',
    },

    /**
     * SVG 路径
     */
    path: {
      type: [String, Array] as PropType<string | string[]>,
      required: true,
    },
  },

  setup(props, { attrs }) {
    const iconProps = computed<IconProps>(() => ({
      size: props.size,
      color: props.color,
      strokeWidth: props.strokeWidth,
      spin: props.spin,
      rotate: props.rotate,
      flip: props.flip,
    }))

    const svgProps = computed(() => getSvgProps(iconProps.value))

    const className = computed(() => {
      const customClass = typeof attrs.class === 'string' ? attrs.class : ''
      return getIconClass(iconProps.value, customClass)
    })

    const style = computed<CSSProperties>(() => {
      const baseStyle: CSSProperties = {
        display: 'inline-block',
        lineHeight: 1,
        flexShrink: 0,
      }

      if (props.spin) {
        baseStyle.animation = 'ld-icon-spin 1s linear infinite'
      }

      return {
        ...baseStyle,
        ...(typeof attrs.style === 'object' ? attrs.style : {}),
      }
    })

    return () => {
      const paths = Array.isArray(props.path) ? props.path : [props.path]

      return h(
        'svg',
        {
          ...svgProps.value,
          viewBox: props.viewBox,
          class: className.value,
          style: style.value,
          xmlns: 'http://www.w3.org/2000/svg',
          'aria-hidden': 'true',
          focusable: 'false',
        },
        paths.map((pathData, index) =>
          h('path', {
            key: index,
            d: pathData,
            fill: svgProps.value.fill,
            stroke: 'none',
          }),
        ),
      )
    }
  },
})

/**
 * 创建 Vue 图标组件
 */
export function createVueIcon(name: string, path: string | string[], viewBox = '0 0 24 24') {
  return defineComponent({
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
    },
    setup(props, { attrs }) {
      return () =>
        h(IconBase, {
          ...props,
          ...attrs,
          path,
          viewBox,
        })
    },
  })
}






