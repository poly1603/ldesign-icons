/**
 * 图标动画预设模块
 * @description 提供多种内置的图标动画效果
 * @module animations/presets
 */

import type { IconAnimation, IconAnimationConfig } from '../types'

/**
 * 动画预设配置映射
 * @description 预定义的动画配置，可直接应用到图标
 */
export const animationPresets: Record<IconAnimation, IconAnimationConfig> = {
  /**
   * 旋转动画
   * @description 图标持续360度旋转，常用于加载指示器
   */
  spin: {
    type: 'spin',
    duration: 1000,
    timing: 'linear',
    infinite: true,
  },

  /**
   * 脉冲动画
   * @description 图标缩放脉冲效果，用于吸引注意力
   */
  pulse: {
    type: 'pulse',
    duration: 1000,
    timing: 'ease-in-out',
    infinite: true,
  },

  /**
   * 弹跳动画
   * @description 图标上下弹跳效果
   */
  bounce: {
    type: 'bounce',
    duration: 1000,
    timing: 'ease-in-out',
    infinite: true,
  },

  /**
   * 震动动画
   * @description 图标左右震动效果，用于提示或警告
   */
  shake: {
    type: 'shake',
    duration: 500,
    timing: 'ease-in-out',
    infinite: false,
  },

  /**
   * 翻转动画
   * @description 图标沿Y轴翻转
   */
  flip: {
    type: 'flip',
    duration: 600,
    timing: 'ease-in-out',
    infinite: false,
  },
}

/**
 * CSS 动画关键帧定义
 * @description 所有动画的 CSS keyframes
 */
export const animationKeyframes = `
/* 旋转动画 */
@keyframes ld-icon-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* 脉冲动画 */
@keyframes ld-icon-pulse {
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.8;
  }
}

/* 弹跳动画 */
@keyframes ld-icon-bounce {
  0%, 100% {
    transform: translateY(0);
  }
  25% {
    transform: translateY(-10px);
  }
  50% {
    transform: translateY(0);
  }
  75% {
    transform: translateY(-5px);
  }
}

/* 震动动画 */
@keyframes ld-icon-shake {
  0%, 100% {
    transform: translateX(0);
  }
  10%, 30%, 50%, 70%, 90% {
    transform: translateX(-5px);
  }
  20%, 40%, 60%, 80% {
    transform: translateX(5px);
  }
}

/* 翻转动画 */
@keyframes ld-icon-flip {
  0% {
    transform: rotateY(0);
  }
  50% {
    transform: rotateY(90deg);
  }
  100% {
    transform: rotateY(180deg);
  }
}
`

/**
 * 生成动画 CSS 类
 * @description 为每种动画生成 CSS 类名
 * @param classPrefix - 类名前缀
 * @returns CSS 字符串
 */
export function generateAnimationCSS(classPrefix = 'ld-icon'): string {
  return `
${animationKeyframes}

/* 动画类 */
.${classPrefix}--spin {
  animation: ld-icon-spin 1s linear infinite;
}

.${classPrefix}--pulse {
  animation: ld-icon-pulse 1s ease-in-out infinite;
}

.${classPrefix}--bounce {
  animation: ld-icon-bounce 1s ease-in-out infinite;
}

.${classPrefix}--shake {
  animation: ld-icon-shake 0.5s ease-in-out;
}

.${classPrefix}--flip {
  animation: ld-icon-flip 0.6s ease-in-out;
}
`
}

/**
 * 应用动画到图标
 * @description 根据动画配置生成 CSS 动画字符串
 * @param animation - 动画类型或自定义配置
 * @returns CSS animation 属性值
 * @example
 * ```ts
 * applyAnimation('pulse')
 * // => 'ld-icon-pulse 1s ease-in-out infinite'
 * 
 * applyAnimation({
 *   type: 'spin',
 *   duration: 2000,
 *   timing: 'ease'
 * })
 * // => 'ld-icon-spin 2s ease infinite'
 * ```
 */
export function applyAnimation(
  animation: IconAnimation | IconAnimationConfig
): string {
  const config = typeof animation === 'string'
    ? animationPresets[animation]
    : animation

  const {
    type,
    duration = 1000,
    timing = 'linear',
    infinite = true,
  } = config

  const durationStr = `${duration}ms`
  const iterationCount = infinite ? 'infinite' : '1'

  return `ld-icon-${type} ${durationStr} ${timing} ${iterationCount}`
}

/**
 * 获取动画配置
 * @description 获取预设的动画配置
 * @param animation - 动画类型
 * @returns 动画配置对象
 */
export function getAnimationConfig(
  animation: IconAnimation
): IconAnimationConfig {
  return { ...animationPresets[animation] }
}

/**
 * 检查是否为有效的动画类型
 * @param animation - 要检查的动画名称
 * @returns 是否为有效动画
 */
export function isValidAnimation(animation: string): animation is IconAnimation {
  return animation in animationPresets
}


