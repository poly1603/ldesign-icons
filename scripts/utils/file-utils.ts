import { existsSync, mkdirSync, writeFileSync } from 'node:fs'
import { dirname } from 'node:path'
import prettier from 'prettier'

/**
 * 文件工具函数
 */

/**
 * 确保目录存在，不存在则创建
 */
export function ensureDir(filePath: string): void {
  const dir = dirname(filePath)
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true })
  }
}

/**
 * 写入文件（自动创建目录）
 */
export function writeFile(filePath: string, content: string): void {
  ensureDir(filePath)
  writeFileSync(filePath, content, 'utf-8')
}

/**
 * 格式化代码
 */
export async function formatCode(code: string, parser: 'typescript' | 'babel' = 'typescript'): Promise<string> {
  try {
    return await prettier.format(code, {
      parser,
      semi: false,
      singleQuote: true,
      trailingComma: 'all',
      printWidth: 100,
    })
  }
  catch {
    return code
  }
}

/**
 * 写入格式化后的文件
 */
export async function writeFormattedFile(filePath: string, content: string): Promise<void> {
  const formatted = await formatCode(content)
  writeFile(filePath, formatted)
}




