/**
 * Vue 图标错误处理组件
 * @description 捕获图标渲染错误，提供友好的降级UI
 * @module vue/ErrorBoundary
 */

import { defineComponent, h, type VNode, type PropType } from 'vue'

/**
 * Vue 图标错误边界组件
 * @description 使用 onErrorCaptured 钩子捕获子组件错误
 * @example
 * ```vue
 * <template>
 *   <IconErrorBoundary @error="handleError">
 *     <HomeIcon />
 *     <SearchIcon />
 *   </IconErrorBoundary>
 * </template>
 * 
 * <script setup>
 * import { IconErrorBoundary } from '@ldesign/icons/vue'
 * 
 * const handleError = (error) => {
 *   console.error('图标错误:', error)
 * }
 * </script>
 * ```
 */
export const IconErrorBoundary = defineComponent({
  name: 'IconErrorBoundary',

  props: {
    /**
     * 降级UI（渲染错误时显示）
     * @description 可以是组件或VNode
     */
    fallback: {
      type: [Object, Function] as PropType<VNode | (() => VNode)>,
      default: undefined,
    },

    /**
     * 是否在开发环境显示错误详情
     */
    showErrorDetails: {
      type: Boolean,
      default: true,
    },
  },

  emits: {
    /**
     * 错误事件
     */
    error: (error: Error, instance: any, info: string) => true,
  },

  setup(props, { slots, emit }) {
    // 错误状态
    let hasError = false
    let errorMessage = ''

    /**
     * 捕获错误
     */
    const errorCaptured = (
      error: Error,
      instance: any,
      info: string
    ): boolean => {
      hasError = true
      errorMessage = error.message

      // 触发错误事件
      emit('error', error, instance, info)

      // 开发环境下输出错误
      if (process.env.NODE_ENV === 'development') {
        console.group('🔴 Vue 图标错误边界捕获到错误')
        console.error('错误:', error)
        console.error('实例:', instance)
        console.error('信息:', info)
        console.groupEnd()
      }

      // 返回 false 阻止错误继续传播
      return false
    }

    /**
     * 重置错误
     */
    const resetError = (): void => {
      hasError = false
      errorMessage = ''
    }

    return () => {
      // 如果有错误，渲染降级UI
      if (hasError) {
        // 自定义降级UI
        if (props.fallback) {
          return typeof props.fallback === 'function'
            ? props.fallback()
            : props.fallback
        }

        // 默认降级UI
        return h(
          'div',
          {
            style: {
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              padding: '4px 8px',
              backgroundColor: '#fff3cd',
              border: '1px solid #ffc107',
              borderRadius: '4px',
              fontSize: '12px',
              color: '#856404',
            },
          },
          [
            h('span', { role: 'img', 'aria-label': '警告' }, '⚠️'),
            h('span', '图标加载失败'),
            props.showErrorDetails &&
            process.env.NODE_ENV === 'development' &&
            h(
              'button',
              {
                onClick: resetError,
                style: {
                  marginLeft: '8px',
                  padding: '2px 8px',
                  fontSize: '12px',
                  cursor: 'pointer',
                },
              },
              '重试'
            ),
          ].filter(Boolean)
        )
      }

      // 正常渲染子组件
      return h(
        'div',
        {
          onErrorCaptured: errorCaptured,
        },
        slots.default?.()
      )
    }
  },
})

/**
 * 创建带错误处理的图标组件包装器
 * @description 包装图标组件，添加错误边界
 * @param iconComponent - 图标组件
 * @param fallback - 降级UI
 * @returns 带错误边界的图标组件
 * @example
 * ```ts
 * import { HomeIcon } from '@ldesign/icons/vue'
 * 
 * const SafeHomeIcon = withIconErrorBoundary(HomeIcon, () => h('span', '⚠️'))
 * ```
 */
export function withIconErrorBoundary(
  iconComponent: any,
  fallback?: VNode | (() => VNode)
) {
  return defineComponent({
    name: `${iconComponent.name}WithErrorBoundary`,
    props: iconComponent.props,
    setup(props, { attrs }) {
      return () =>
        h(
          IconErrorBoundary,
          { fallback },
          {
            default: () => h(iconComponent, { ...props, ...attrs }),
          }
        )
    },
  })
}


