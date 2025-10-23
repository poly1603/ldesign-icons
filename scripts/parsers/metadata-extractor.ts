import type { ParsedSvg } from './svg-parser'

/**
 * 图标元数据
 */
export interface IconMetadata {
  /** kebab-case: home */
  name: string
  /** PascalCase: Home */
  componentName: string
  /** 分类: general */
  category: string
  /** 标签: ['home', 'house', 'main'] */
  tags: string[]
  /** Unicode: '\uE001' */
  unicode: string
  /** 是否支持 RTL */
  rtl: boolean
  /** 是否废弃 */
  deprecated: boolean
}

/**
 * 元数据提取器
 */
export class MetadataExtractor {
  private unicodeStart = 0xE000

  /**
   * 从解析的 SVG 数据提取元数据
   * @param parsedSvgs - 解析后的 SVG 数据数组
   */
  extract(parsedSvgs: ParsedSvg[]): IconMetadata[] {
    return parsedSvgs.map((svg, index) => ({
      name: svg.name,
      componentName: svg.componentName,
      category: svg.category,
      tags: this.generateTags(svg.name, svg.category),
      unicode: String.fromCharCode(this.unicodeStart + index),
      rtl: this.needsRtl(svg.name),
      deprecated: false,
    }))
  }

  /**
   * 生成搜索标签
   * @param name - 图标名称
   * @param category - 图标分类
   */
  private generateTags(name: string, category: string): string[] {
    // 生成搜索标签
    const base = name.replace(/-/g, ' ')
    const tags = [base, category]

    // 添加同义词
    const synonyms: Record<string, string[]> = {
      'home': ['house', 'main', 'index', '首页', '主页'],
      'search': ['find', 'magnify', 'lookup', '搜索', '查找'],
      'settings': ['config', 'preferences', 'options', '设置', '配置'],
      'user': ['account', 'profile', 'person', '用户', '账户'],
      'menu': ['hamburger', 'navigation', '菜单', '导航'],
      'edit': ['pencil', 'write', 'modify', '编辑', '修改'],
      'delete': ['trash', 'remove', 'bin', '删除', '移除'],
      'save': ['disk', 'storage', '保存', '存储'],
      'copy': ['duplicate', 'clone', '复制', '拷贝'],
      'chevron-down': ['arrow down', 'caret down', '向下', '下拉'],
      'chevron-up': ['arrow up', 'caret up', '向上', '上拉'],
      'chevron-left': ['arrow left', 'caret left', '向左'],
      'chevron-right': ['arrow right', 'caret right', '向右'],
      'play': ['start', 'run', '播放', '开始'],
      'pause': ['stop', 'break', '暂停', '停止'],
      'loading': ['spinner', 'progress', 'wait', '加载', '等待'],
      'check': ['tick', 'done', 'success', '完成', '成功'],
      'close': ['times', 'cancel', 'exit', '关闭', '取消'],
      'heart': ['like', 'favorite', 'love', '喜欢', '收藏'],
      'star': ['favorite', 'bookmark', '星标', '收藏'],
    }

    if (synonyms[name]) {
      tags.push(...synonyms[name])
    }

    // 添加分类相关标签
    const categoryTags: Record<string, string[]> = {
      'general': ['常用', '通用', 'common'],
      'editing': ['编辑', 'edit', 'modify'],
      'navigation': ['导航', '方向', 'direction'],
      'media': ['媒体', '播放', 'play'],
      'status': ['状态', 'state', 'status'],
    }

    if (categoryTags[category]) {
      tags.push(...categoryTags[category])
    }

    return [...new Set(tags)] // 去重
  }

  /**
   * 判断是否需要 RTL 支持（方向性图标）
   * @param name - 图标名称
   */
  private needsRtl(name: string): boolean {
    return /^(arrow|chevron|next|prev|forward|back|left|right)/.test(name)
  }
}




