import chalk from 'chalk'

/**
 * 日志工具
 */
export class Logger {
  /**
   * 开始日志
   */
  start(message: string): void {
    console.log(chalk.blue('🚀'), message)
  }

  /**
   * 信息日志
   */
  info(message: string): void {
    console.log(chalk.cyan('ℹ'), message)
  }

  /**
   * 成功日志
   */
  success(message: string): void {
    console.log(chalk.green('✅'), message)
  }

  /**
   * 警告日志
   */
  warn(message: string): void {
    console.log(chalk.yellow('⚠'), message)
  }

  /**
   * 错误日志
   */
  error(message: string, error?: any): void {
    console.log(chalk.red('❌'), message)
    if (error) {
      console.error(error)
    }
  }
}




