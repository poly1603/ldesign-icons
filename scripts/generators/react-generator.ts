import { join } from 'node:path'
import { BaseGenerator } from './base-generator'
import type { ParsedSvg } from '../parsers/svg-parser'
import type { IconMetadata } from '../parsers/metadata-extractor'

/**
 * React 组件生成器
 */
export class ReactGenerator extends BaseGenerator {
  /**
   * 生成单个 React 图标组件
   */
  generate(svg: ParsedSvg, metadata: IconMetadata): void {
    const code = this.renderTemplate('react-component.hbs', {
      componentName: svg.componentName,
      paths: svg.paths,
      viewBox: svg.viewBox,
      isMultiPath: svg.paths.length > 1,
    })

    const outputPath = join(this.outputDir, 'icons', `${svg.componentName}.tsx`)
    this.writeFile(outputPath, code)
  }

  /**
   * 生成 React 索引文件
   */
  generateIndex(svgs: ParsedSvg[], metadatas: IconMetadata[]): void {
    const code = this.renderTemplate('react-index.hbs', {
      icons: svgs.map(svg => ({
        componentName: svg.componentName,
      })),
    })

    this.writeFile(join(this.outputDir, 'index.ts'), code)
  }
}




