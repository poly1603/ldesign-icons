/**
 * SVG Sprite 生成器
 * @description 将多个 SVG 图标合并为单个 Sprite 文件，减少 HTTP 请求
 */

import { readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import fg from 'fast-glob'
import { SvgParser } from '../parsers/svg-parser'
import { Logger } from '../utils/logger'

/**
 * Sprite 生成选项
 */
export interface SpriteOptions {
  /**
   * 输入目录（SVG文件所在目录）
   */
  inputDir: string

  /**
   * 输出文件路径
   */
  outputPath: string

  /**
   * ID 前缀
   * @default 'icon-'
   */
  idPrefix?: string

  /**
   * 是否按分类分组
   * @default false
   */
  groupByCategory?: boolean

  /**
   * 是否生成预览HTML
   * @default true
   */
  generatePreview?: boolean
}

/**
 * SVG Sprite 生成器
 * @description 将多个独立的 SVG 文件合并为一个 Sprite 文件
 */
export class SpriteGenerator {
  private logger = new Logger()
  private parser = new SvgParser()

  /**
   * 生成 Sprite
   * @param options - 生成选项
   */
  async generate(options: SpriteOptions): Promise<void> {
    const {
      inputDir,
      outputPath,
      idPrefix = 'icon-',
      groupByCategory = false,
      generatePreview = true,
    } = options

    this.logger.start('开始生成 SVG Sprite...')

    try {
      // 1. 查找所有 SVG 文件
      const svgFiles = await fg('**/*.svg', {
        cwd: inputDir,
        absolute: true,
      })

      if (svgFiles.length === 0) {
        this.logger.warn('未找到 SVG 文件！')
        return
      }

      this.logger.info(`找到 ${svgFiles.length} 个 SVG 文件`)

      // 2. 解析所有 SVG
      const parsedSvgs = svgFiles.map((file) => this.parser.parse(file))

      // 3. 生成 Sprite 内容
      let spriteContent: string

      if (groupByCategory) {
        spriteContent = this.generateGroupedSprite(parsedSvgs, idPrefix)
      } else {
        spriteContent = this.generateFlatSprite(parsedSvgs, idPrefix)
      }

      // 4. 写入 Sprite 文件
      writeFileSync(outputPath, spriteContent, 'utf-8')
      this.logger.success(`✨ Sprite 文件已生成: ${outputPath}`)

      // 5. 生成预览 HTML
      if (generatePreview) {
        const previewPath = outputPath.replace('.svg', '-preview.html')
        const previewHtml = this.generatePreviewHtml(parsedSvgs, idPrefix)
        writeFileSync(previewPath, previewHtml, 'utf-8')
        this.logger.success(`✨ 预览文件已生成: ${previewPath}`)
      }

      // 6. 输出统计信息
      const stats = this.calculateStats(spriteContent, svgFiles.length)
      this.logger.info('\n统计信息:')
      this.logger.info(`  图标数量: ${svgFiles.length}`)
      this.logger.info(`  Sprite 大小: ${stats.size}`)
      this.logger.info(`  平均每个图标: ${stats.avgSize}`)
      this.logger.info(`  压缩率: ${stats.compressionRatio}`)
    } catch (error) {
      this.logger.error('Sprite 生成失败', error)
      throw error
    }
  }

  /**
   * 生成扁平结构的 Sprite
   * @private
   */
  private generateFlatSprite(svgs: any[], idPrefix: string): string {
    const symbols = svgs
      .map((svg) => {
        const id = `${idPrefix}${svg.name}`
        const paths = svg.paths.map((p: string) => `<path d="${p}"/>`).join('')

        return `  <symbol id="${id}" viewBox="${svg.viewBox}">
    ${paths}
  </symbol>`
      })
      .join('\n')

    return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="display: none;">
${symbols}
</svg>`
  }

  /**
   * 生成分组结构的 Sprite
   * @private
   */
  private generateGroupedSprite(svgs: any[], idPrefix: string): string {
    // 按分类分组
    const grouped = new Map<string, any[]>()

    svgs.forEach((svg) => {
      const category = svg.category || 'general'
      if (!grouped.has(category)) {
        grouped.set(category, [])
      }
      grouped.get(category)!.push(svg)
    })

    // 生成分组的 symbols
    const groups = Array.from(grouped.entries())
      .map(([category, icons]) => {
        const symbols = icons
          .map((svg) => {
            const id = `${idPrefix}${svg.name}`
            const paths = svg.paths.map((p: string) => `<path d="${p}"/>`).join('')

            return `    <symbol id="${id}" viewBox="${svg.viewBox}">
      ${paths}
    </symbol>`
          })
          .join('\n')

        return `  <g id="${idPrefix}group-${category}">
${symbols}
  </g>`
      })
      .join('\n')

    return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="display: none;">
${groups}
</svg>`
  }

  /**
   * 生成预览 HTML
   * @private
   */
  private generatePreviewHtml(svgs: any[], idPrefix: string): string {
    const icons = svgs
      .map((svg) => {
        const id = `${idPrefix}${svg.name}`
        return `
      <div class="icon-item">
        <svg class="icon" width="32" height="32">
          <use xlink:href="#${id}"></use>
        </svg>
        <div class="icon-name">${svg.name}</div>
      </div>`
      })
      .join('')

    return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SVG Sprite 预览</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      padding: 20px;
      background: #f5f5f5;
    }

    h1 {
      margin-bottom: 20px;
      color: #333;
    }

    .icon-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
      gap: 16px;
    }

    .icon-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 16px;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      transition: transform 0.2s;
    }

    .icon-item:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0,0,0,0.15);
    }

    .icon {
      color: #333;
      margin-bottom: 8px;
    }

    .icon-name {
      font-size: 12px;
      color: #666;
      text-align: center;
      word-break: break-all;
    }
  </style>
</head>
<body>
  <h1>SVG Sprite 预览 (${svgs.length} 个图标)</h1>
  
  <div class="icon-grid">
    ${icons}
  </div>

  <script>
    // 加载 Sprite 文件
    fetch('./sprite.svg')
      .then(res => res.text())
      .then(svg => {
        const div = document.createElement('div')
        div.innerHTML = svg
        document.body.insertBefore(div.firstChild, document.body.firstChild)
      })
  </script>
</body>
</html>`
  }

  /**
   * 计算统计信息
   * @private
   */
  private calculateStats(content: string, iconCount: number) {
    const size = Buffer.byteLength(content, 'utf-8')
    const sizeKB = (size / 1024).toFixed(2)
    const avgSize = (size / iconCount / 1024).toFixed(2)

    // 估算压缩率（假设单个SVG平均2KB）
    const estimatedIndividualSize = iconCount * 2 * 1024
    const compressionRatio = ((1 - size / estimatedIndividualSize) * 100).toFixed(1)

    return {
      size: `${sizeKB} KB`,
      avgSize: `${avgSize} KB`,
      compressionRatio: `${compressionRatio}%`,
    }
  }
}

/**
 * 主函数
 */
async function main() {
  const generator = new SpriteGenerator()

  await generator.generate({
    inputDir: join(process.cwd(), 'svg'),
    outputPath: join(process.cwd(), 'dist/sprite.svg'),
    idPrefix: 'ld-icon-',
    groupByCategory: true,
    generatePreview: true,
  })
}

// 如果直接运行此文件
if (require.main === module) {
  main().catch(console.error)
}

