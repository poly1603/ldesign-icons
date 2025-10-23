import fg from 'fast-glob'
import { join } from 'node:path'
import { writeFileSync } from 'node:fs'
import { SvgParser } from './parsers/svg-parser'
import { MetadataExtractor } from './parsers/metadata-extractor'
import { VueGenerator } from './generators/vue-generator'
import { ReactGenerator } from './generators/react-generator'
import { LitGenerator } from './generators/lit-generator'
import { Logger } from './utils/logger'

async function main() {
  const logger = new Logger()
  logger.start('开始生成图标组件...')

  try {
    // 1. 查找所有 SVG 文件
    const svgFiles = await fg('svg/**/*.svg', {
      cwd: process.cwd(),
      absolute: true,
    })

    if (svgFiles.length === 0) {
      logger.warn('未找到 SVG 文件！请确保 svg/ 目录中有图标文件。')
      process.exit(1)
    }

    logger.info(`找到 ${svgFiles.length} 个 SVG 文件`)

    // 2. 解析 SVG
    logger.info('解析 SVG 文件...')
    const parser = new SvgParser()
    const parsedSvgs = svgFiles.map((file) => {
      try {
        return parser.parse(file)
      }
      catch (error) {
        logger.error(`解析 SVG 文件失败: ${file}`, error)
        throw error
      }
    })

    // 3. 提取元数据
    logger.info('提取图标元数据...')
    const extractor = new MetadataExtractor()
    const metadata = extractor.extract(parsedSvgs)

    // 4. 生成 Vue 组件
    logger.info('生成 Vue 组件...')
    const vueGen = new VueGenerator(
      join(process.cwd(), 'scripts/templates'),
      join(process.cwd(), 'src/vue'),
    )
    parsedSvgs.forEach((svg, i) => vueGen.generate(svg, metadata[i]))
    vueGen.generateIndex(parsedSvgs, metadata)
    logger.success(`✨ Vue 组件生成完成 (${parsedSvgs.length} 个)`)

    // 5. 生成 React 组件
    logger.info('生成 React 组件...')
    const reactGen = new ReactGenerator(
      join(process.cwd(), 'scripts/templates'),
      join(process.cwd(), 'src/react'),
    )
    parsedSvgs.forEach((svg, i) => reactGen.generate(svg, metadata[i]))
    reactGen.generateIndex(parsedSvgs, metadata)
    logger.success(`✨ React 组件生成完成 (${parsedSvgs.length} 个)`)

    // 6. 生成 Lit 组件
    logger.info('生成 Lit 组件...')
    const litGen = new LitGenerator(
      join(process.cwd(), 'scripts/templates'),
      join(process.cwd(), 'src/lit'),
    )
    parsedSvgs.forEach((svg, i) => litGen.generate(svg, metadata[i]))
    litGen.generateIndex(parsedSvgs, metadata)
    logger.success(`✨ Lit 组件生成完成 (${parsedSvgs.length} 个)`)

    // 7. 生成元数据 JSON
    logger.info('生成元数据文件...')
    writeFileSync(
      join(process.cwd(), 'src/metadata.json'),
      JSON.stringify(metadata, null, 2),
    )
    logger.success('✨ 元数据文件生成完成')

    // 最终总结
    logger.success(`\n🎉 成功生成 ${parsedSvgs.length} 个图标组件！`)
    logger.info('\n图标分类统计：')
    const categories = metadata.reduce((acc, m) => {
      acc[m.category] = (acc[m.category] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    Object.entries(categories).forEach(([category, count]) => {
      logger.info(`  - ${category}: ${count} 个`)
    })

    logger.info('\n下一步：')
    logger.info('  1. 运行 pnpm build 构建组件库')
    logger.info('  2. 运行 pnpm generate:fonts 生成图标字体')
    logger.info('  3. 查看 src/metadata.json 了解所有图标信息')
  }
  catch (error) {
    logger.error('生成失败', error)
    process.exit(1)
  }
}

main().catch(console.error)




