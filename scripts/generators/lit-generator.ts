import { join } from 'node:path'
import { BaseGenerator } from './base-generator'
import type { ParsedSvg } from '../parsers/svg-parser'
import type { IconMetadata } from '../parsers/metadata-extractor'

/**
 * Lit 组件生成器
 */
export class LitGenerator extends BaseGenerator {
  /**
   * 生成单个 Lit 图标组件
   */
  generate(svg: ParsedSvg, metadata: IconMetadata): void {
    const code = this.renderTemplate('lit-component.hbs', {
      componentName: svg.componentName,
      tagName: `ld-icon-${svg.name}`,
      paths: svg.paths,
      viewBox: svg.viewBox,
      isMultiPath: svg.paths.length > 1,
      isStroke: svg.isStroke,
    })

    const outputPath = join(this.outputDir, 'icons', `${svg.componentName}.ts`)
    this.writeFile(outputPath, code)
  }

  /**
   * 生成 Lit 索引文件
   */
  generateIndex(svgs: ParsedSvg[], metadatas: IconMetadata[]): void {
    // 去重：使用 componentName 作为 key
    const uniqueIcons = new Map<string, { componentName: string; fileName: string; tagName: string }>()

    svgs.forEach(svg => {
      if (!uniqueIcons.has(svg.componentName)) {
        uniqueIcons.set(svg.componentName, {
          componentName: svg.componentName,
          fileName: svg.componentName,
          tagName: `ld-icon-${svg.name}`,
        })
      }
    })

    const code = this.renderTemplate('lit-index.hbs', {
      icons: Array.from(uniqueIcons.values()),
    })

    this.writeFile(join(this.outputDir, 'index.ts'), code)
  }
}




