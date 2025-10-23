import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs'
import { join } from 'node:path'
import fg from 'fast-glob'
import type { IconMetadata } from '../parsers/metadata-extractor'
import { Logger } from '../utils/logger'

/**
 * 字体生成器
 */
export class FontGenerator {
  private fontName = 'ldesign-icons'
  private fontsDir: string
  private logger = new Logger()

  constructor(fontsDir: string) {
    this.fontsDir = fontsDir
    if (!existsSync(fontsDir)) {
      mkdirSync(fontsDir, { recursive: true })
    }
  }

  /**
   * 生成所有字体文件
   */
  async generate(svgFiles: string[], metadata: IconMetadata[]): Promise<void> {
    this.logger.start('开始生成图标字体...')

    try {
      // 1. SVG → SVG Font
      this.logger.info('生成 SVG Font...')
      const svgFont = await this.generateSvgFont(svgFiles, metadata)

      // 2. SVG Font → TTF
      this.logger.info('生成 TTF 字体...')
      const ttfBuffer = await this.generateTTF(svgFont)
      writeFileSync(join(this.fontsDir, `${this.fontName}.ttf`), ttfBuffer)

      // 3. TTF → WOFF
      this.logger.info('生成 WOFF 字体...')
      const woffBuffer = await this.generateWOFF(ttfBuffer)
      writeFileSync(join(this.fontsDir, `${this.fontName}.woff`), woffBuffer)

      // 4. TTF → WOFF2
      this.logger.info('生成 WOFF2 字体...')
      const woff2Buffer = await this.generateWOFF2(ttfBuffer)
      writeFileSync(join(this.fontsDir, `${this.fontName}.woff2`), woff2Buffer)

      // 5. TTF → EOT
      this.logger.info('生成 EOT 字体...')
      const eotBuffer = await this.generateEOT(ttfBuffer)
      writeFileSync(join(this.fontsDir, `${this.fontName}.eot`), eotBuffer)

      // 6. 生成 CSS
      this.logger.info('生成 CSS 文件...')
      const css = this.generateCSS(metadata)
      writeFileSync(join(this.fontsDir, `${this.fontName}.css`), css)

      // 7. 生成预览页面
      this.logger.info('生成预览页面...')
      const html = this.generatePreviewHTML(metadata)
      writeFileSync(join(this.fontsDir, 'preview.html'), html)

      this.logger.success('✅ 字体生成完成！')
      this.logger.info(`\n字体文件位置: ${this.fontsDir}`)
      this.logger.info('  - ldesign-icons.ttf')
      this.logger.info('  - ldesign-icons.woff')
      this.logger.info('  - ldesign-icons.woff2')
      this.logger.info('  - ldesign-icons.eot')
      this.logger.info('  - ldesign-icons.css')
      this.logger.info('  - preview.html')
    }
    catch (error) {
      this.logger.error('字体生成失败', error)
      throw error
    }
  }

  /**
   * 生成 SVG Font
   */
  private async generateSvgFont(
    svgFiles: string[],
    metadata: IconMetadata[],
  ): Promise<string> {
    // 动态导入 CommonJS 模块
    const SVGIcons2SVGFontStreamModule = await import('svgicons2svgfont')
    const SVGIcons2SVGFontStream = (SVGIcons2SVGFontStreamModule as any).default || SVGIcons2SVGFontStreamModule

    return new Promise((resolve, reject) => {
      let svgFont = ''
      const fontStream = new SVGIcons2SVGFontStream({
        fontName: this.fontName,
        fontHeight: 1000,
        normalize: true,
        log: () => { }, // 禁用日志
      })

      fontStream
        .on('data', (chunk: any) => {
          svgFont += chunk
        })
        .on('end', () => resolve(svgFont))
        .on('error', reject)

      svgFiles.forEach((file, index) => {
        const glyph = readFileSync(file) as any
        const meta = metadata[index]

        // 添加元数据
        glyph.metadata = {
          unicode: [meta.unicode],
          name: meta.name,
        }

        fontStream.write(glyph)
      })

      fontStream.end()
    })
  }

  /**
   * 生成 TTF 字体
   */
  private async generateTTF(svgFont: string): Promise<Buffer> {
    const svg2ttfModule = await import('svg2ttf')
    const svg2ttf = (svg2ttfModule as any).default || svg2ttfModule
    const ttf = svg2ttf(svgFont, {})
    return Buffer.from(ttf.buffer)
  }

  /**
   * 生成 WOFF 字体
   */
  private async generateWOFF(ttfBuffer: Buffer): Promise<Buffer> {
    const ttf2woffModule = await import('ttf2woff')
    const ttf2woff = (ttf2woffModule as any).default || ttf2woffModule
    const woff = ttf2woff(ttfBuffer)
    return Buffer.from(woff.buffer)
  }

  /**
   * 生成 WOFF2 字体
   */
  private async generateWOFF2(ttfBuffer: Buffer): Promise<Buffer> {
    const ttf2woff2Module = await import('ttf2woff2')
    const ttf2woff2 = (ttf2woff2Module as any).default || ttf2woff2Module
    return ttf2woff2(ttfBuffer)
  }

  /**
   * 生成 EOT 字体
   */
  private async generateEOT(ttfBuffer: Buffer): Promise<Buffer> {
    const ttf2eotModule = await import('ttf2eot')
    const ttf2eot = (ttf2eotModule as any).default || ttf2eotModule
    const eot = ttf2eot(ttfBuffer)
    return Buffer.from(eot.buffer)
  }

  /**
   * 生成 CSS 文件
   */
  private generateCSS(metadata: IconMetadata[]): string {
    const fontFace = `
@font-face {
  font-family: '${this.fontName}';
  src: url('./${this.fontName}.eot');
  src: url('./${this.fontName}.eot?#iefix') format('embedded-opentype'),
       url('./${this.fontName}.woff2') format('woff2'),
       url('./${this.fontName}.woff') format('woff'),
       url('./${this.fontName}.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
  font-display: block;
}

.ld-icon {
  font-family: '${this.fontName}' !important;
  speak: never;
  font-style: normal;
  font-weight: normal;
  font-variant: normal;
  text-transform: none;
  line-height: 1;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
`

    const iconClasses = metadata
      .map(
        meta => `
.ld-icon-${meta.name}::before {
  content: "${meta.unicode}";
}`,
      )
      .join('\n')

    return fontFace + iconClasses
  }

  /**
   * 生成预览 HTML 页面
   */
  private generatePreviewHTML(metadata: IconMetadata[]): string {
    return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${this.fontName} - 图标字体预览</title>
  <link rel="stylesheet" href="./${this.fontName}.css">
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      padding: 40px 20px;
      background: #f5f5f5;
    }
    
    header {
      text-align: center;
      margin-bottom: 40px;
    }
    
    h1 {
      font-size: 32px;
      color: #333;
      margin-bottom: 10px;
    }
    
    .subtitle {
      color: #666;
      font-size: 16px;
    }
    
    .stats {
      display: flex;
      justify-content: center;
      gap: 30px;
      margin: 20px 0;
      font-size: 14px;
    }
    
    .stat {
      color: #666;
    }
    
    .stat strong {
      color: #1890ff;
      font-size: 20px;
      display: block;
    }
    
    .icon-list {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
      gap: 20px;
      max-width: 1200px;
      margin: 0 auto;
    }
    
    .icon-item {
      background: white;
      text-align: center;
      padding: 20px;
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.2s;
    }
    
    .icon-item:hover {
      border-color: #1890ff;
      box-shadow: 0 4px 12px rgba(24, 144, 255, 0.15);
      transform: translateY(-2px);
    }
    
    .icon-item i {
      font-size: 48px;
      color: #333;
      transition: all 0.2s;
    }
    
    .icon-item:hover i {
      color: #1890ff;
      transform: scale(1.1);
    }
    
    .icon-name {
      display: block;
      margin-top: 12px;
      font-size: 12px;
      color: #666;
      word-break: break-word;
    }
    
    .icon-unicode {
      display: block;
      font-size: 10px;
      color: #999;
      margin-top: 4px;
    }
    
    footer {
      text-align: center;
      margin-top: 60px;
      padding-top: 20px;
      border-top: 1px solid #e5e7eb;
      color: #999;
      font-size: 14px;
    }
  </style>
</head>
<body>
  <header>
    <h1>${this.fontName}</h1>
    <p class="subtitle">图标字体预览</p>
    <div class="stats">
      <div class="stat">
        <strong>${metadata.length}</strong>
        图标总数
      </div>
      <div class="stat">
        <strong>${new Set(metadata.map(m => m.category)).size}</strong>
        分类数量
      </div>
    </div>
  </header>
  
  <div class="icon-list">
    ${metadata
        .map(
          meta => `
    <div class="icon-item" onclick="copyIconClass('${meta.name}')">
      <i class="ld-icon ld-icon-${meta.name}"></i>
      <span class="icon-name">${meta.name}</span>
      <span class="icon-unicode">${meta.unicode.codePointAt(0)?.toString(16).toUpperCase()}</span>
    </div>
    `,
        )
        .join('')}
  </div>
  
  <footer>
    <p>@ldesign/icons - 点击图标复制类名</p>
  </footer>
  
  <script>
    function copyIconClass(name) {
      const className = 'ld-icon ld-icon-' + name;
      navigator.clipboard.writeText(className).then(() => {
        alert('已复制类名: ' + className);
      });
    }
  </script>
</body>
</html>`
  }
}

// 主函数 - 用于直接运行
async function main() {
  const logger = new Logger()

  try {
    // 读取元数据
    const metadataPath = join(process.cwd(), 'src/metadata.json')
    if (!existsSync(metadataPath)) {
      logger.error('元数据文件不存在！请先运行 pnpm generate 生成图标组件')
      process.exit(1)
    }

    const metadata: IconMetadata[] = JSON.parse(readFileSync(metadataPath, 'utf-8'))

    // 查找所有 SVG 文件
    const svgFiles = await fg('svg/**/*.svg', {
      cwd: process.cwd(),
      absolute: true,
    })

    if (svgFiles.length === 0) {
      logger.error('未找到 SVG 文件！')
      process.exit(1)
    }

    // 生成字体
    const fontGen = new FontGenerator(join(process.cwd(), 'fonts'))
    await fontGen.generate(svgFiles, metadata)
  }
  catch (error) {
    logger.error('字体生成失败', error)
    process.exit(1)
  }
}

// 直接运行主函数
main().catch(console.error)


