/**
 * React 图标错误边界组件
 * @description 捕获图标渲染错误，提供友好的降级UI
 * @module react/ErrorBoundary
 */

import React, { Component, type ReactNode } from 'react'
import type { IconError } from '../utils/error-handler'

/**
 * 错误边界组件属性
 */
export interface IconErrorBoundaryProps {
  /**
   * 子组件
   */
  children: ReactNode

  /**
   * 降级UI（渲染错误时显示）
   */
  fallback?: ReactNode | ((error: Error, errorInfo: React.ErrorInfo) => ReactNode)

  /**
   * 错误回调
   */
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void

  /**
   * 是否在开发环境显示错误详情
   * @default true
   */
  showErrorDetails?: boolean
}

/**
 * 错误边界组件状态
 */
interface IconErrorBoundaryState {
  /**
   * 是否有错误
   */
  hasError: boolean

  /**
   * 错误对象
   */
  error: Error | null

  /**
   * 错误信息
   */
  errorInfo: React.ErrorInfo | null
}

/**
 * React 图标错误边界组件
 * @description 捕获图标组件渲染错误，防止整个应用崩溃
 * @example
 * ```tsx
 * import { IconErrorBoundary } from '@ldesign/icons/react'
 * 
 * function App() {
 *   return (
 *     <IconErrorBoundary 
 *       fallback={<span>⚠️ 图标加载失败</span>}
 *       onError={(error) => console.error(error)}
 *     >
 *       <HomeIcon />
 *       <SearchIcon />
 *     </IconErrorBoundary>
 *   )
 * }
 * ```
 */
export class IconErrorBoundary extends Component<
  IconErrorBoundaryProps,
  IconErrorBoundaryState
> {
  constructor(props: IconErrorBoundaryProps) {
    super(props)
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    }
  }

  /**
   * 捕获错误
   */
  static getDerivedStateFromError(error: Error): Partial<IconErrorBoundaryState> {
    return {
      hasError: true,
      error,
    }
  }

  /**
   * 组件捕获错误时调用
   */
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    // 更新状态
    this.setState({
      errorInfo,
    })

    // 调用错误回调
    this.props.onError?.(error, errorInfo)

    // 开发环境下输出错误
    if (process.env.NODE_ENV === 'development') {
      console.group('🔴 图标错误边界捕获到错误')
      console.error('错误:', error)
      console.error('错误信息:', errorInfo)
      console.groupEnd()
    }
  }

  /**
   * 重置错误状态
   */
  resetError = (): void => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    })
  }

  /**
   * 渲染
   */
  render(): ReactNode {
    const { hasError, error, errorInfo } = this.state
    const { children, fallback, showErrorDetails = true } = this.props

    if (hasError && error) {
      // 自定义降级UI
      if (fallback) {
        return typeof fallback === 'function'
          ? fallback(error, errorInfo!)
          : fallback
      }

      // 默认降级UI
      return (
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            padding: '4px 8px',
            backgroundColor: '#fff3cd',
            border: '1px solid #ffc107',
            borderRadius: '4px',
            fontSize: '12px',
            color: '#856404',
          }}
        >
          <span role="img" aria-label="警告">
            ⚠️
          </span>
          <span>图标加载失败</span>
          {showErrorDetails && process.env.NODE_ENV === 'development' && (
            <button
              onClick={this.resetError}
              style={{
                marginLeft: '8px',
                padding: '2px 8px',
                fontSize: '12px',
                cursor: 'pointer',
              }}
            >
              重试
            </button>
          )}
        </div>
      )
    }

    return children
  }
}

/**
 * 创建带错误处理的图标组件包装器
 * @description 高阶组件，为图标添加错误边界
 * @param IconComponent - 图标组件
 * @param fallback - 降级UI
 * @returns 带错误边界的图标组件
 * @example
 * ```tsx
 * const SafeHomeIcon = withIconErrorBoundary(HomeIcon, <span>⚠️</span>)
 * ```
 */
export function withIconErrorBoundary<P extends object>(
  IconComponent: React.ComponentType<P>,
  fallback?: ReactNode
): React.FC<P> {
  return function IconWithErrorBoundary(props: P) {
    return (
      <IconErrorBoundary fallback={fallback}>
        <IconComponent {...props} />
      </IconErrorBoundary>
    )
  }
}


