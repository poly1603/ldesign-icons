import type { IconMetadata } from '../types'

/**
 * Trie 树节点
 * @description 前缀树节点，用于高效的字符串搜索
 */
class TrieNode {
  /**
   * 子节点映射
   */
  children: Map<string, TrieNode> = new Map()

  /**
   * 存储在此节点的图标元数据
   */
  icons: IconMetadata[] = []

  /**
   * 是否为单词结尾
   */
  isEndOfWord = false
}

/**
 * Trie 树（前缀树）实现
 * @description 用于高效的图标名称和标签搜索，时间复杂度 O(m)，m 为搜索词长度
 */
export class Trie {
  /**
   * 树的根节点
   * @private
   */
  private root: TrieNode = new TrieNode()

  /**
   * 插入图标元数据
   * @description 将图标的名称和标签插入到 Trie 树中
   * @param metadata - 图标元数据
   */
  insert(metadata: IconMetadata): void {
    // 插入图标名称
    this.insertWord(metadata.name.toLowerCase(), metadata)

    // 插入所有标签
    metadata.tags.forEach((tag) => {
      this.insertWord(tag.toLowerCase(), metadata)
    })

    // 插入分类
    this.insertWord(metadata.category.toLowerCase(), metadata)
  }

  /**
   * 插入单个词到 Trie 树
   * @private
   * @param word - 要插入的词
   * @param metadata - 关联的图标元数据
   */
  private insertWord(word: string, metadata: IconMetadata): void {
    let node = this.root

    for (const char of word) {
      if (!node.children.has(char)) {
        node.children.set(char, new TrieNode())
      }
      node = node.children.get(char)!

      // 在路径上的每个节点都添加此图标，支持前缀搜索
      if (!node.icons.find(icon => icon.name === metadata.name)) {
        node.icons.push(metadata)
      }
    }

    node.isEndOfWord = true
  }

  /**
   * 搜索匹配的图标
   * @description 查找以给定前缀开头的所有图标
   * @param prefix - 搜索前缀
   * @returns 匹配的图标元数据数组（已去重）
   */
  search(prefix: string): IconMetadata[] {
    const lowerPrefix = prefix.toLowerCase()
    let node = this.root

    // 遍历到前缀的最后一个字符
    for (const char of lowerPrefix) {
      if (!node.children.has(char)) {
        return [] // 前缀不存在
      }
      node = node.children.get(char)!
    }

    // 收集该节点及其所有子节点的图标
    const results = new Map<string, IconMetadata>()

    // 添加当前节点的图标
    node.icons.forEach((icon) => {
      results.set(icon.name, icon)
    })

    // 递归收集所有子节点的图标
    this.collectIcons(node, results)

    return Array.from(results.values())
  }

  /**
   * 递归收集节点及其子节点的所有图标
   * @private
   * @param node - 当前节点
   * @param results - 结果集合（用于去重）
   */
  private collectIcons(node: TrieNode, results: Map<string, IconMetadata>): void {
    node.children.forEach((childNode) => {
      childNode.icons.forEach((icon) => {
        results.set(icon.name, icon)
      })
      this.collectIcons(childNode, results)
    })
  }

  /**
   * 精确匹配搜索
   * @description 查找完全匹配的图标
   * @param word - 搜索词
   * @returns 匹配的图标元数据数组
   */
  exactMatch(word: string): IconMetadata[] {
    const lowerWord = word.toLowerCase()
    let node = this.root

    for (const char of lowerWord) {
      if (!node.children.has(char)) {
        return []
      }
      node = node.children.get(char)!
    }

    return node.isEndOfWord ? node.icons : []
  }

  /**
   * 模糊搜索
   * @description 使用编辑距离进行模糊匹配（容错搜索）
   * @param query - 搜索词
   * @param maxDistance - 最大编辑距离，默认 2
   * @returns 匹配的图标元数据数组
   */
  fuzzySearch(query: string, maxDistance = 2): IconMetadata[] {
    const lowerQuery = query.toLowerCase()
    const results = new Map<string, IconMetadata>()

    // 遍历所有可能的路径
    this.fuzzySearchRecursive(
      this.root,
      lowerQuery,
      0,
      0,
      maxDistance,
      results,
    )

    return Array.from(results.values())
  }

  /**
   * 递归模糊搜索实现
   * @private
   */
  private fuzzySearchRecursive(
    node: TrieNode,
    query: string,
    queryIndex: number,
    distance: number,
    maxDistance: number,
    results: Map<string, IconMetadata>,
  ): void {
    // 如果编辑距离超过最大值，剪枝
    if (distance > maxDistance) {
      return
    }

    // 如果查询已完成
    if (queryIndex === query.length) {
      node.icons.forEach((icon) => {
        results.set(icon.name, icon)
      })
      return
    }

    const char = query[queryIndex]

    // 完全匹配
    if (node.children.has(char)) {
      this.fuzzySearchRecursive(
        node.children.get(char)!,
        query,
        queryIndex + 1,
        distance,
        maxDistance,
        results,
      )
    }

    // 如果还有容错空间，尝试以下操作
    if (distance < maxDistance) {
      // 1. 删除操作：跳过查询中的当前字符
      this.fuzzySearchRecursive(
        node,
        query,
        queryIndex + 1,
        distance + 1,
        maxDistance,
        results,
      )

      // 2. 插入操作：匹配 Trie 中的一个字符但不移动查询指针
      node.children.forEach((childNode) => {
        this.fuzzySearchRecursive(
          childNode,
          query,
          queryIndex,
          distance + 1,
          maxDistance,
          results,
        )
      })

      // 3. 替换操作：用 Trie 中的字符替换查询中的字符
      node.children.forEach((childNode, trieChar) => {
        if (trieChar !== char) {
          this.fuzzySearchRecursive(
            childNode,
            query,
            queryIndex + 1,
            distance + 1,
            maxDistance,
            results,
          )
        }
      })
    }
  }

  /**
   * 清空 Trie 树
   */
  clear(): void {
    this.root = new TrieNode()
  }
}


