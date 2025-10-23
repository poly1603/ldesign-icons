import Handlebars from 'handlebars'
import { readFileSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import type { ParsedSvg } from '../parsers/svg-parser'
import type { IconMetadata } from '../parsers/metadata-extractor'
import { writeFile } from '../utils/file-utils'

/**
 * 基础生成器类
 */
export abstract class BaseGenerator {
  protected templatePath: string
  protected outputDir: string

  constructor(templatePath: string, outputDir: string) {
    this.templatePath = templatePath
    this.outputDir = outputDir
  }

  /**
   * 生成单个图标组件
   */
  abstract generate(svg: ParsedSvg, metadata: IconMetadata): void

  /**
   * 生成索引文件
   */
  abstract generateIndex(svgs: ParsedSvg[], metadatas: IconMetadata[]): void

  /**
   * 渲染模板
   * @param templateFile - 模板文件名
   * @param data - 模板数据
   */
  protected renderTemplate(templateFile: string, data: any): string {
    const templateFilePath = join(this.templatePath, templateFile)

    if (!existsSync(templateFilePath)) {
      throw new Error(`Template file not found: ${templateFilePath}`)
    }

    const templateContent = readFileSync(templateFilePath, 'utf-8')
    const template = Handlebars.compile(templateContent)
    return template(data)
  }

  /**
   * 写入文件
   * @param filePath - 文件路径
   * @param content - 文件内容
   */
  protected writeFile(filePath: string, content: string): void {
    writeFile(filePath, content)
  }
}




