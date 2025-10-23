import { readFileSync } from 'node:fs'
import { basename, dirname } from 'node:path'
import { load } from 'cheerio'

/**
 * 解析后的 SVG 数据
 */
export interface ParsedSvg {
  /**  文件名（不含扩展名）：home */
  name: string
  /** 组件名：Home */
  componentName: string
  /** 分类：general */
  category: string
  /** path 数据数组 */
  paths: string[]
  /** viewBox 属性 */
  viewBox: string
  /** 原始文件路径 */
  originalPath: string
}

/**
 * SVG 解析器
 */
export class SvgParser {
  /**
   * 解析 SVG 文件
   * @param filePath - SVG 文件路径
   */
  parse(filePath: string): ParsedSvg {
    const content = readFileSync(filePath, 'utf-8')
    const $ = load(content, { xmlMode: true })
    const svg = $('svg')

    // 提取 paths
    const paths: string[] = []
    svg.find('path').each((_, el) => {
      const d = $(el).attr('d')
      if (d)
        paths.push(d)
    })

    // 提取其他 SVG 元素并转换为 path
    // circle → path
    svg.find('circle').each((_, el) => {
      const cx = $(el).attr('cx') || '0'
      const cy = $(el).attr('cy') || '0'
      const r = $(el).attr('r') || '0'
      const path = this.circleToPath(Number(cx), Number(cy), Number(r))
      paths.push(path)
    })

    // rect → path
    svg.find('rect').each((_, el) => {
      const x = $(el).attr('x') || '0'
      const y = $(el).attr('y') || '0'
      const width = $(el).attr('width') || '0'
      const height = $(el).attr('height') || '0'
      const path = this.rectToPath(Number(x), Number(y), Number(width), Number(height))
      paths.push(path)
    })

    // polygon → path
    svg.find('polygon').each((_, el) => {
      const points = $(el).attr('points') || ''
      const path = this.polygonToPath(points)
      paths.push(path)
    })

    // polyline → path
    svg.find('polyline').each((_, el) => {
      const points = $(el).attr('points') || ''
      const path = this.polylineToPath(points)
      paths.push(path)
    })

    // line → path
    svg.find('line').each((_, el) => {
      const x1 = $(el).attr('x1') || '0'
      const y1 = $(el).attr('y1') || '0'
      const x2 = $(el).attr('x2') || '0'
      const y2 = $(el).attr('y2') || '0'
      const path = `M${x1} ${y1}L${x2} ${y2}`
      paths.push(path)
    })

    // 提取 viewBox
    const viewBox = svg.attr('viewBox') || '0 0 24 24'

    // 解析文件信息
    const fileName = basename(filePath, '.svg')
    const category = basename(dirname(filePath))
    const componentName = this.toComponentName(fileName)

    return {
      name: fileName,
      componentName,
      category,
      paths,
      viewBox,
      originalPath: filePath,
    }
  }

  /**
   * 将 kebab-case 转换为 PascalCase
   * @param name - kebab-case 名称
   */
  private toComponentName(name: string): string {
    return name
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join('')
  }

  /**
   * 将 circle 转换为 path
   */
  private circleToPath(cx: number, cy: number, r: number): string {
    return `M${cx - r},${cy}a${r},${r} 0 1,0 ${r * 2},0a${r},${r} 0 1,0 -${r * 2},0`
  }

  /**
   * 将 rect 转换为 path
   */
  private rectToPath(x: number, y: number, width: number, height: number): string {
    return `M${x},${y}h${width}v${height}h-${width}z`
  }

  /**
   * 将 polygon 转换为 path
   */
  private polygonToPath(points: string): string {
    const coords = points.trim().split(/\s+/)
    if (coords.length < 2)
      return ''

    let path = `M${coords[0]} ${coords[1]}`
    for (let i = 2; i < coords.length; i += 2) {
      path += `L${coords[i]} ${coords[i + 1]}`
    }
    path += 'z'
    return path
  }

  /**
   * 将 polyline 转换为 path
   */
  private polylineToPath(points: string): string {
    const coords = points.trim().split(/\s+/)
    if (coords.length < 2)
      return ''

    let path = `M${coords[0]} ${coords[1]}`
    for (let i = 2; i < coords.length; i += 2) {
      path += `L${coords[i]} ${coords[i + 1]}`
    }
    return path
  }
}




