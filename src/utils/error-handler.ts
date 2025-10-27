/**
 * 图标系统错误处理模块
 * @description 提供统一的错误处理机制和自定义错误类型
 * @module utils/error-handler
 */

/**
 * 图标错误基类
 * @description 所有图标相关错误的基类
 */
export class IconError extends Error {
  /**
   * 错误代码
   */
  public code: string

  /**
   * 错误上下文信息
   */
  public context?: Record<string, any>

  constructor(message: string, code: string, context?: Record<string, any>) {
    super(message)
    this.name = 'IconError'
    this.code = code
    this.context = context

    // 确保正确的原型链
    Object.setPrototypeOf(this, IconError.prototype)
  }
}

/**
 * 图标加载错误
 * @description 图标加载失败时抛出
 */
export class IconLoadError extends IconError {
  constructor(iconName: string, framework: string, originalError?: Error) {
    super(
      `无法加载图标 "${iconName}" (${framework})`,
      'ICON_LOAD_ERROR',
      {
        iconName,
        framework,
        originalError: originalError?.message,
      }
    )
    this.name = 'IconLoadError'
    Object.setPrototypeOf(this, IconLoadError.prototype)
  }
}

/**
 * 图标未找到错误
 * @description 请求的图标不存在时抛出
 */
export class IconNotFoundError extends IconError {
  constructor(iconName: string) {
    super(
      `图标 "${iconName}" 未找到`,
      'ICON_NOT_FOUND',
      { iconName }
    )
    this.name = 'IconNotFoundError'
    Object.setPrototypeOf(this, IconNotFoundError.prototype)
  }
}

/**
 * 图标配置错误
 * @description 图标配置无效时抛出
 */
export class IconConfigError extends IconError {
  constructor(message: string, invalidConfig?: any) {
    super(
      `图标配置错误: ${message}`,
      'ICON_CONFIG_ERROR',
      { invalidConfig }
    )
    this.name = 'IconConfigError'
    Object.setPrototypeOf(this, IconConfigError.prototype)
  }
}

/**
 * 图标渲染错误
 * @description 图标渲染失败时抛出
 */
export class IconRenderError extends IconError {
  constructor(iconName: string, message: string) {
    super(
      `图标 "${iconName}" 渲染失败: ${message}`,
      'ICON_RENDER_ERROR',
      { iconName }
    )
    this.name = 'IconRenderError'
    Object.setPrototypeOf(this, IconRenderError.prototype)
  }
}

/**
 * 错误处理器类型
 */
export type ErrorHandler = (error: IconError) => void

/**
 * 全局错误处理器
 * @private
 */
let globalErrorHandler: ErrorHandler | null = null

/**
 * 设置全局错误处理器
 * @description 设置统一的错误处理函数
 * @param handler - 错误处理函数
 * @example
 * ```ts
 * setErrorHandler((error) => {
 *   console.error('图标错误:', error.message)
 *   // 上报到错误监控系统
 *   reportError(error)
 * })
 * ```
 */
export function setErrorHandler(handler: ErrorHandler | null): void {
  globalErrorHandler = handler
}

/**
 * 获取当前错误处理器
 * @returns 当前的错误处理器或 null
 */
export function getErrorHandler(): ErrorHandler | null {
  return globalErrorHandler
}

/**
 * 处理错误
 * @description 使用全局错误处理器处理错误，如果未设置则抛出
 * @param error - 要处理的错误
 * @throws {IconError} 如果没有设置错误处理器
 */
export function handleError(error: IconError): void {
  if (globalErrorHandler) {
    try {
      globalErrorHandler(error)
    } catch (handlerError) {
      console.error('错误处理器执行失败:', handlerError)
      throw error
    }
  } else {
    // 没有错误处理器，直接抛出
    throw error
  }
}

/**
 * 安全执行函数
 * @description 捕获函数执行中的错误并统一处理
 * @param fn - 要执行的函数
 * @param errorFactory - 错误工厂函数
 * @returns 函数执行结果或 undefined（如果出错）
 * @example
 * ```ts
 * const result = safeExecute(
 *   () => loadIcon('home', 'vue'),
 *   (error) => new IconLoadError('home', 'vue', error)
 * )
 * ```
 */
export function safeExecute<T>(
  fn: () => T,
  errorFactory: (error: Error) => IconError
): T | undefined {
  try {
    return fn()
  } catch (error) {
    const iconError = errorFactory(error as Error)
    handleError(iconError)
    return undefined
  }
}

/**
 * 异步安全执行
 * @description 捕获异步函数执行中的错误并统一处理
 * @param fn - 要执行的异步函数
 * @param errorFactory - 错误工厂函数
 * @returns Promise<函数执行结果 | undefined>
 */
export async function safeExecuteAsync<T>(
  fn: () => Promise<T>,
  errorFactory: (error: Error) => IconError
): Promise<T | undefined> {
  try {
    return await fn()
  } catch (error) {
    const iconError = errorFactory(error as Error)
    handleError(iconError)
    return undefined
  }
}

/**
 * 错误日志记录器
 * @description 记录错误到控制台，带格式化输出
 */
export class ErrorLogger {
  /**
   * 是否启用详细日志
   */
  private verbose: boolean

  constructor(verbose = false) {
    this.verbose = verbose
  }

  /**
   * 记录错误
   * @param error - 要记录的错误
   */
  log(error: IconError): void {
    console.group(`❌ ${error.name}`)
    console.error(error.message)

    if (error.code) {
      console.log('错误代码:', error.code)
    }

    if (error.context && this.verbose) {
      console.log('错误上下文:', error.context)
    }

    if (error.stack && this.verbose) {
      console.log('堆栈跟踪:', error.stack)
    }

    console.groupEnd()
  }

  /**
   * 设置详细模式
   */
  setVerbose(verbose: boolean): void {
    this.verbose = verbose
  }
}

/**
 * 默认错误日志记录器
 */
export const defaultErrorLogger = new ErrorLogger(process.env.NODE_ENV === 'development')

/**
 * 创建错误处理器
 * @description 工厂函数，创建带日志记录的错误处理器
 * @param logger - 错误日志记录器
 * @param onError - 额外的错误处理回调
 * @returns 错误处理函数
 */
export function createErrorHandler(
  logger: ErrorLogger = defaultErrorLogger,
  onError?: (error: IconError) => void
): ErrorHandler {
  return (error: IconError) => {
    // 记录日志
    logger.log(error)

    // 执行额外的处理
    onError?.(error)
  }
}


