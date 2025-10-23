import { optimize } from 'svgo'
import type { Config } from 'svgo'

/**
 * SVG 优化器
 */
export class SvgOptimizer {
  private config: Config = {
    multipass: true,
    plugins: [
      'removeDoctype',
      'removeXMLProcInst',
      'removeComments',
      'removeMetadata',
      'removeTitle',
      'removeDesc',
      'removeUselessDefs',
      'removeEditorsNSData',
      'removeEmptyAttrs',
      'removeHiddenElems',
      'removeEmptyText',
      'removeEmptyContainers',
      'cleanupEnableBackground',
      'convertStyleToAttrs',
      'convertColors',
      'convertPathData',
      'convertTransform',
      'removeUnknownsAndDefaults',
      'removeNonInheritableGroupAttrs',
      'removeUselessStrokeAndFill',
      'cleanupIds',
      'mergePaths',
      'convertShapeToPath',
      'sortAttrs',
      {
        name: 'removeAttrs',
        params: {
          attrs: '(fill|stroke|width|height|class|id|style)',
        },
      },
    ],
  }

  /**
   * 优化 SVG 内容
   * @param svgContent - SVG 字符串
   */
  optimize(svgContent: string): string {
    const result = optimize(svgContent, this.config)
    return result.data
  }
}




