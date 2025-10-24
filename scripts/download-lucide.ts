#!/usr/bin/env tsx
import { writeFileSync, mkdirSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { Logger } from './utils/logger'

const logger = new Logger()

/**
 * Lucide Icons 分类映射
 * 从 Lucide 的图标名映射到我们的分类系统
 */
const categoryMapping: Record<string, string[]> = {
  general: [
    'home', 'search', 'settings', 'user', 'users', 'menu', 'more-horizontal', 'more-vertical',
    'grid', 'list', 'layout', 'sidebar', 'panel', 'command', 'hash', 'at-sign', 'percent',
    'ampersand', 'asterisk', 'plus', 'minus', 'equal', 'slash', 'backslash', 'dot', 'circle',
    'square', 'triangle', 'hexagon', 'octagon', 'diamond', 'star', 'heart', 'bookmark',
    'flag', 'tag', 'tags', 'award', 'medal', 'trophy', 'crown', 'gem', 'key', 'lock',
    'unlock', 'shield', 'eye', 'eye-off', 'filter', 'sliders', 'toggle-left', 'toggle-right',
  ],
  editing: [
    'edit', 'edit-2', 'edit-3', 'delete', 'trash', 'trash-2', 'save', 'copy', 'clipboard',
    'clipboard-copy', 'clipboard-check', 'clipboard-list', 'cut', 'scissors', 'paste',
    'pen-tool', 'pen-line', 'pencil', 'eraser', 'highlighter', 'paintbrush', 'palette',
    'pipette', 'wand', 'magic-wand', 'crop', 'move', 'grab', 'hand',
  ],
  navigation: [
    'chevron-down', 'chevron-up', 'chevron-left', 'chevron-right', 'chevrons-down',
    'chevrons-up', 'chevrons-left', 'chevrons-right', 'arrow-down', 'arrow-up', 'arrow-left',
    'arrow-right', 'arrow-down-left', 'arrow-down-right', 'arrow-up-left', 'arrow-up-right',
    'arrows-down-up', 'arrows-left-right', 'arrows-up-down', 'corner-down-left',
    'corner-down-right', 'corner-up-left', 'corner-up-right', 'corner-left-down',
    'corner-left-up', 'corner-right-down', 'corner-right-up', 'move-diagonal', 'move-horizontal',
    'move-vertical', 'navigation', 'compass', 'map', 'map-pin', 'pin', 'pin-off', 'locate',
    'locate-fixed', 'crosshair', 'focus', 'target', 'maximize', 'minimize', 'fullscreen',
    'shrink', 'expand', 'zoom-in', 'zoom-out', 'scan', 'scan-line',
  ],
  media: [
    'play', 'pause', 'stop', 'skip-back', 'skip-forward', 'fast-forward', 'rewind', 'repeat',
    'repeat-1', 'shuffle', 'music', 'music-2', 'music-3', 'music-4', 'mic', 'mic-2',
    'mic-off', 'volume', 'volume-1', 'volume-2', 'volume-x', 'speaker', 'headphones',
    'radio', 'podcast', 'video', 'video-off', 'film', 'camera', 'camera-off', 'image',
    'images', 'gallery', 'aperture', 'focus', 'instagram', 'youtube', 'twitch',
  ],
  status: [
    'check', 'check-circle', 'check-circle-2', 'check-square', 'x', 'x-circle', 'x-square',
    'close', 'alert-circle', 'alert-triangle', 'alert-octagon', 'info', 'help-circle',
    'question', 'ban', 'slash', 'loader', 'loader-2', 'refresh-cw', 'refresh-ccw', 'rotate-cw',
    'rotate-ccw', 'download', 'upload', 'download-cloud', 'upload-cloud', 'cloud',
    'cloud-drizzle', 'cloud-rain', 'cloud-snow', 'cloud-lightning', 'cloud-fog', 'cloud-off',
    'wifi', 'wifi-off', 'bluetooth', 'bluetooth-connected', 'bluetooth-searching',
    'bluetooth-off', 'signal', 'signal-high', 'signal-medium', 'signal-low', 'signal-zero',
    'battery', 'battery-charging', 'battery-full', 'battery-medium', 'battery-low',
    'battery-warning', 'power', 'power-off', 'zap', 'zap-off', 'plug', 'plug-2',
  ],
  file: [
    'file', 'file-text', 'file-plus', 'file-minus', 'file-check', 'file-x', 'file-search',
    'file-edit', 'file-code', 'file-archive', 'file-audio', 'file-video', 'file-image',
    'file-spreadsheet', 'files', 'folder', 'folder-plus', 'folder-minus', 'folder-check',
    'folder-x', 'folder-search', 'folder-open', 'folders', 'archive', 'box', 'package',
    'package-2', 'package-check', 'package-minus', 'package-plus', 'package-search',
    'package-x', 'inbox', 'hard-drive', 'database', 'server', 'save', 'save-all',
  ],
  communication: [
    'mail', 'inbox', 'send', 'send-horizontal', 'message-circle', 'message-square',
    'messages-square', 'phone', 'phone-call', 'phone-incoming', 'phone-outgoing',
    'phone-missed', 'phone-forwarded', 'phone-off', 'video', 'video-off', 'voicemail',
    'at-sign', 'hash', 'bell', 'bell-off', 'bell-ring', 'bell-dot', 'share', 'share-2',
    'rss', 'megaphone', 'mic', 'mic-off', 'radio', 'antenna', 'satellite', 'wifi',
  ],
  business: [
    'briefcase', 'calendar', 'calendar-days', 'calendar-check', 'calendar-x', 'calendar-plus',
    'calendar-minus', 'calendar-range', 'calendar-clock', 'clock', 'timer', 'alarm-clock',
    'hourglass', 'trending-up', 'trending-down', 'bar-chart', 'bar-chart-2', 'bar-chart-3',
    'bar-chart-4', 'line-chart', 'pie-chart', 'activity', 'dollar-sign', 'credit-card',
    'wallet', 'banknote', 'receipt', 'calculator', 'shopping-cart', 'shopping-bag',
    'store', 'building', 'building-2', 'warehouse', 'factory', 'landmark',
  ],
  weather: [
    'sun', 'moon', 'sunrise', 'sunset', 'cloud', 'cloud-drizzle', 'cloud-rain', 'cloud-snow',
    'cloud-lightning', 'cloud-fog', 'cloud-sun', 'cloud-moon', 'wind', 'snowflake',
    'thermometer', 'thermometer-sun', 'thermometer-snowflake', 'droplet', 'droplets',
    'umbrella', 'rainbow', 'waves', 'tornado', 'volcano',
  ],
  devices: [
    'smartphone', 'tablet', 'laptop', 'monitor', 'tv', 'watch', 'airplay', 'cast', 'speaker',
    'headphones', 'printer', 'scan', 'keyboard', 'mouse', 'gamepad', 'gamepad-2', 'cpu',
    'hard-drive', 'usb', 'bluetooth', 'wifi', 'rss', 'antenna', 'satellite', 'router',
    'disc', 'save', 'database', 'server', 'cloud', 'terminal', 'code', 'code-2',
  ],
}

/**
 * 下载单个 SVG 文件
 */
async function downloadSvg(iconName: string): Promise<string | null> {
  try {
    const url = `https://raw.githubusercontent.com/lucide-icons/lucide/main/icons/${iconName}.svg`
    const response = await fetch(url)

    if (!response.ok) {
      return null
    }

    return await response.text()
  }
  catch (error) {
    logger.error(`下载图标失败: ${iconName}`, error)
    return null
  }
}

/**
 * 主函数
 */
async function main() {
  logger.start('开始下载 Lucide Icons...')

  const svgDir = join(process.cwd(), 'svg')
  let totalDownloaded = 0
  let totalFailed = 0

  for (const [category, icons] of Object.entries(categoryMapping)) {
    const categoryDir = join(svgDir, category)

    // 创建分类目录
    if (!existsSync(categoryDir)) {
      mkdirSync(categoryDir, { recursive: true })
    }

    logger.info(`\n处理分类: ${category} (${icons.length} 个图标)`)

    for (const iconName of icons) {
      const svg = await downloadSvg(iconName)

      if (svg) {
        const outputPath = join(categoryDir, `${iconName}.svg`)
        writeFileSync(outputPath, svg, 'utf-8')
        totalDownloaded++
        process.stdout.write('.')
      }
      else {
        totalFailed++
        process.stdout.write('✗')
      }

      // 避免请求过快
      await new Promise(resolve => setTimeout(resolve, 50))
    }
  }

  logger.success(`\n\n✨ 下载完成！`)
  logger.info(`成功: ${totalDownloaded} 个`)
  logger.info(`失败: ${totalFailed} 个`)
  logger.info(`\n下一步: 运行 pnpm generate 生成组件`)
}

main().catch(console.error)

