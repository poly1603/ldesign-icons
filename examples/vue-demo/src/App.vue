<template>
  <div :class="['app', { dark: isDarkMode }]">
    <header class="header">
      <div class="header-content">
        <div class="title-section">
          <h1>@ldesign/icons</h1>
          <p class="subtitle">Vue 3 图标库示例 - 347+ 精美图标</p>
          <div class="stats">
            <span>{{ filteredIcons.length }} / {{ allIcons.length }} 个图标</span>
            <span>{{ categories.length }} 个分类</span>
          </div>
        </div>
        <div class="header-actions">
          <button @click="isDarkMode = !isDarkMode" class="theme-toggle" :title="isDarkMode ? '切换到浅色模式' : '切换到深色模式'">
            <component :is="isDarkMode ? SunIcon : MoonIcon" :size="20" />
          </button>
          <button @click="viewMode = viewMode === 'grid' ? 'list' : 'grid'" class="view-toggle"
            :title="viewMode === 'grid' ? '列表视图' : '网格视图'">
            <component :is="viewMode === 'grid' ? MenuIcon : SquareIcon" :size="20" />
          </button>
        </div>
      </div>
    </header>

    <div class="controls">
      <div class="search-box">
        <SearchIcon class="search-icon" />
        <input v-model="searchQuery" type="text" placeholder="搜索图标名称、分类或标签..." class="search-input" />
        <button v-if="searchQuery" @click="searchQuery = ''" class="clear-btn">
          <CloseIcon :size="16" />
        </button>
      </div>

      <div class="categories">
        <button v-for="cat in ['all', ...categories]" :key="cat"
          :class="['category-btn', { active: selectedCategory === cat }]" @click="selectedCategory = cat">
          {{ cat === 'all' ? '全部' : categoryNames[cat] || cat }}
          <span class="count">{{ getCategoryCount(cat) }}</span>
        </button>
      </div>

      <div class="controls-row">
        <div class="control-group">
          <label>大小:</label>
          <input v-model.number="iconSize" type="range" min="16" max="64" />
          <span class="value">{{ iconSize }}px</span>
        </div>

        <div class="control-group">
          <label>描边宽度:</label>
          <input v-model.number="strokeWidth" type="range" min="0.5" max="4" step="0.5" />
          <span class="value">{{ strokeWidth }}</span>
        </div>

        <div class="control-group">
          <label>颜色:</label>
          <input v-model="iconColor" type="color" class="color-picker" />
          <span class="value">{{ iconColor }}</span>
        </div>
      </div>
    </div>

    <div :class="['icon-container', viewMode]">
      <div v-for="icon in filteredIcons" :key="icon.name"
        :class="['icon-card', { selected: selectedIcons.has(icon.name) }]">
        <div class="card-content" @click="handleIconClick(icon)">
          <div class="icon-preview">
            <component :is="iconComponents[icon.componentName]" :size="iconSize" :color="iconColor"
              :strokeWidth="strokeWidth"
              :spin="icon.name === 'loading' || icon.name === 'loader' || icon.name === 'loader-2'" />
          </div>
          <div class="icon-info">
            <div class="icon-name">{{ icon.componentName }}</div>
            <div class="icon-category">{{ categoryNames[icon.category] }}</div>
          </div>
          <div v-if="viewMode === 'grid'" class="icon-tags">
            <span v-for="tag in icon.tags.slice(0, 3)" :key="tag" class="tag">
              {{ tag }}
            </span>
          </div>
        </div>
        <div class="card-actions">
          <button @click.stop="copyIconCode(icon, 'component')" class="action-btn" title="复制组件代码">
            <CopyIcon :size="14" />
          </button>
          <button @click.stop="copyIconCode(icon, 'svg')" class="action-btn" title="复制 SVG">
            <CodeIcon :size="14" />
          </button>
          <button @click.stop="downloadIcon(icon)" class="action-btn" title="下载 SVG">
            <DownloadIcon :size="14" />
          </button>
          <button @click.stop="toggleIconSelect(icon)" class="action-btn"
            :title="selectedIcons.has(icon.name) ? '取消选择' : '选择'">
            <component :is="selectedIcons.has(icon.name) ? 'CheckIcon' : 'PlusIcon'" :size="14" />
          </button>
        </div>
      </div>
    </div>

    <div v-if="filteredIcons.length === 0" class="empty">
      <SearchIcon :size="64" color="#ccc" />
      <p>未找到匹配的图标</p>
    </div>

    <!-- 批量操作工具栏 -->
    <transition name="slide-up">
      <div v-if="selectedIcons.size > 0" class="batch-toolbar">
        <div class="toolbar-info">
          已选择 <strong>{{ selectedIcons.size }}</strong> 个图标
        </div>
        <div class="toolbar-actions">
          <button @click="downloadSelectedIcons" class="toolbar-btn">
            <DownloadIcon :size="16" />
            下载选中
          </button>
          <button @click="clearSelection" class="toolbar-btn">
            <CloseIcon :size="16" />
            清除选择
          </button>
        </div>
      </div>
    </transition>

    <!-- 代码预览弹窗 -->
    <transition name="fade">
      <div v-if="selectedIcon" class="modal" @click="selectedIcon = null">
        <div class="modal-content" @click.stop>
          <button class="close-btn" @click="selectedIcon = null">
            <CloseIcon />
          </button>

          <div class="modal-header">
            <div class="icon-large">
              <component :is="iconComponents[selectedIcon.componentName]" :size="80" :color="demoColor"
                :strokeWidth="demoStrokeWidth" />
            </div>
            <h2>{{ selectedIcon.componentName }}Icon</h2>
            <p class="icon-meta">{{ categoryNames[selectedIcon.category] }} · {{ selectedIcon.name }}</p>
          </div>

          <div class="tabs">
            <button v-for="tab in ['vue', 'react', 'lit']" :key="tab" :class="['tab', { active: activeTab === tab }]"
              @click="activeTab = tab">
              {{ tab.toUpperCase() }}
            </button>
          </div>

          <div class="code-section">
            <div class="code-header">
              <h3>基础用法</h3>
              <button @click="copyCode(getBasicCode())" class="copy-code-btn">
                <CopyIcon :size="14" />
                复制代码
              </button>
            </div>
            <pre><code>{{ getBasicCode() }}</code></pre>
          </div>

          <div class="code-section">
            <div class="code-header">
              <h3>自定义属性</h3>
              <button @click="copyCode(getAdvancedCode())" class="copy-code-btn">
                <CopyIcon :size="14" />
                复制代码
              </button>
            </div>
            <pre><code>{{ getAdvancedCode() }}</code></pre>
          </div>

          <div class="props-demo">
            <h3>交互式演示</h3>
            <div class="demo-preview">
              <component :is="iconComponents[selectedIcon.componentName]" :size="demoSize" :color="demoColor"
                :strokeWidth="demoStrokeWidth" :rotate="demoRotate" :spin="demoSpin" :flip="demoFlip" />
            </div>

            <div class="demo-controls">
              <div class="demo-row">
                <label>size:</label>
                <input v-model.number="demoSize" type="range" min="16" max="128" />
                <span>{{ demoSize }}px</span>
              </div>

              <div class="demo-row">
                <label>color:</label>
                <input v-model="demoColor" type="color" />
                <span>{{ demoColor }}</span>
              </div>

              <div class="demo-row">
                <label>strokeWidth:</label>
                <input v-model.number="demoStrokeWidth" type="range" min="0.5" max="4" step="0.5" />
                <span>{{ demoStrokeWidth }}</span>
              </div>

              <div class="demo-row">
                <label>rotate:</label>
                <input v-model.number="demoRotate" type="range" min="0" max="360" />
                <span>{{ demoRotate }}°</span>
              </div>

              <div class="demo-row">
                <label>flip:</label>
                <select v-model="demoFlip">
                  <option :value="undefined">none</option>
                  <option value="horizontal">horizontal</option>
                  <option value="vertical">vertical</option>
                  <option value="both">both</option>
                </select>
              </div>

              <div class="demo-row">
                <label>spin:</label>
                <input v-model="demoSpin" type="checkbox" />
                <span>{{ demoSpin }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <!-- Toast 提示 -->
    <transition name="fade">
      <div v-if="toast.show" class="toast">
        <CheckIcon :size="16" />
        {{ toast.message }}
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import * as Icons from '@ldesign/icons/vue'
import metadata from '../../../src/metadata.json'

// 动态导入所有图标组件
const iconComponents = Icons as Record<string, any>

const allIcons = ref(metadata)
const searchQuery = ref('')
const selectedCategory = ref('all')
const iconSize = ref(32)
const strokeWidth = ref(2)
const iconColor = ref('#333333')
const selectedIcon = ref<any>(null)
const isDarkMode = ref(false)
const viewMode = ref<'grid' | 'list'>('grid')
const selectedIcons = ref(new Set<string>())
const activeTab = ref<'vue' | 'react' | 'lit'>('vue')

// 演示属性
const demoSize = ref(48)
const demoColor = ref('#1890ff')
const demoStrokeWidth = ref(2)
const demoRotate = ref(0)
const demoSpin = ref(false)
const demoFlip = ref<'horizontal' | 'vertical' | 'both' | undefined>(undefined)

// Toast
const toast = ref({ show: false, message: '' })

const categoryNames: Record<string, string> = {
  general: '通用',
  editing: '编辑',
  navigation: '导航',
  media: '媒体',
  status: '状态',
  file: '文件',
  communication: '通讯',
  business: '商务',
  weather: '天气',
  devices: '设备',
}

const categories = computed(() => {
  return [...new Set(metadata.map((i: any) => i.category))].sort()
})

const filteredIcons = computed(() => {
  let icons = allIcons.value

  // 分类过滤
  if (selectedCategory.value !== 'all') {
    icons = icons.filter((i: any) => i.category === selectedCategory.value)
  }

  // 搜索过滤
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    icons = icons.filter((i: any) =>
      i.name.includes(query) ||
      i.componentName.toLowerCase().includes(query) ||
      i.category.toLowerCase().includes(query) ||
      i.tags.some((tag: string) => tag.toLowerCase().includes(query)),
    )
  }

  return icons
})

function getCategoryCount(cat: string) {
  if (cat === 'all') return allIcons.value.length
  return allIcons.value.filter((i: any) => i.category === cat).length
}

function handleIconClick(icon: any) {
  selectedIcon.value = icon
  demoSize.value = 48
  demoColor.value = '#1890ff'
  demoStrokeWidth.value = 2
  demoRotate.value = 0
  demoSpin.value = false
  demoFlip.value = undefined
}

function getBasicCode() {
  if (!selectedIcon.value) return ''
  const name = selectedIcon.value.componentName

  if (activeTab.value === 'vue') {
    return `<template>
  <${name}Icon />
</template>

<script setup>
import { ${name}Icon } from '@ldesign/icons/vue'
<\/script>`
  } else if (activeTab.value === 'react') {
    return `import { ${name}Icon } from '@ldesign/icons/react'

function App() {
  return <${name}Icon />
}`
  } else {
    return `<script type="module">
  import '@ldesign/icons/lit'
<\/script>

<ld-icon-${selectedIcon.value.name}></ld-icon-${selectedIcon.value.name}>`
  }
}

function getAdvancedCode() {
  if (!selectedIcon.value) return ''
  const name = selectedIcon.value.componentName

  if (activeTab.value === 'vue') {
    return `<${name}Icon 
  size="${demoSize.value}" 
  color="${demoColor.value}"
  :strokeWidth="${demoStrokeWidth.value}"
  :rotate="${demoRotate.value}"
  :spin="${demoSpin.value}"
  ${demoFlip.value ? `flip="${demoFlip.value}"` : ''}
/>`
  } else if (activeTab.value === 'react') {
    return `<${name}Icon 
  size={${demoSize.value}} 
  color="${demoColor.value}"
  strokeWidth={${demoStrokeWidth.value}}
  rotate={${demoRotate.value}}
  spin={${demoSpin.value}}
  ${demoFlip.value ? `flip="${demoFlip.value}"` : ''}
/>`
  } else {
    return `<ld-icon-${selectedIcon.value.name}
  size="${demoSize.value}" 
  color="${demoColor.value}"
  stroke-width="${demoStrokeWidth.value}"
  rotate="${demoRotate.value}"
  ${demoSpin.value ? 'spin' : ''}
  ${demoFlip.value ? `flip="${demoFlip.value}"` : ''}
></ld-icon-${selectedIcon.value.name}>`
  }
}

function copyCode(code: string) {
  navigator.clipboard.writeText(code)
  showToast('代码已复制到剪贴板')
}

function copyIconCode(icon: any, type: 'component' | 'svg') {
  const name = icon.componentName
  let code = ''

  if (type === 'component') {
    code = `import { ${name}Icon } from '@ldesign/icons/vue'\n\n<${name}Icon size="24" />`
  } else {
    // 简化的 SVG 代码
    code = `<${name}Icon size="24" />`
  }

  navigator.clipboard.writeText(code)
  showToast(`${icon.name} 代码已复制`)
}

function downloadIcon(icon: any) {
  // 创建 SVG 并下载
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  svg.setAttribute('viewBox', icon.viewBox || '0 0 24 24')
  svg.setAttribute('width', '24')
  svg.setAttribute('height', '24')
  svg.setAttribute('fill', 'none')
  svg.setAttribute('stroke', 'currentColor')
  svg.setAttribute('stroke-width', '2')

  icon.paths.forEach((pathData: string) => {
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
    path.setAttribute('d', pathData)
    svg.appendChild(path)
  })

  const svgData = new XMLSerializer().serializeToString(svg)
  const blob = new Blob([svgData], { type: 'image/svg+xml' })
  const url = URL.createObjectURL(blob)

  const a = document.createElement('a')
  a.href = url
  a.download = `${icon.name}.svg`
  a.click()

  URL.revokeObjectURL(url)
  showToast(`${icon.name}.svg 已下载`)
}

function toggleIconSelect(icon: any) {
  if (selectedIcons.value.has(icon.name)) {
    selectedIcons.value.delete(icon.name)
  } else {
    selectedIcons.value.add(icon.name)
  }
  selectedIcons.value = new Set(selectedIcons.value)
}

function clearSelection() {
  selectedIcons.value.clear()
  selectedIcons.value = new Set()
}

function downloadSelectedIcons() {
  const selected = Array.from(selectedIcons.value)
  showToast(`正在下载 ${selected.length} 个图标...`)

  selected.forEach(name => {
    const icon = allIcons.value.find((i: any) => i.name === name)
    if (icon) {
      setTimeout(() => downloadIcon(icon), 100)
    }
  })
}

function showToast(message: string) {
  toast.value.show = true
  toast.value.message = message
  setTimeout(() => {
    toast.value.show = false
  }, 2000)
}

// 提取常用图标组件供模板使用
const {
  SearchIcon,
  CloseIcon,
  SunIcon,
  MoonIcon,
  MenuIcon,
  SquareIcon,
  CopyIcon,
  CodeIcon,
  DownloadIcon,
  CheckIcon,
  PlusIcon,
} = Icons as any
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.app {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #e9ecef 100%);
  transition: all 0.3s ease;
}

.app.dark {
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  color: #e5e7eb;
}

.header {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  padding: 40px 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  position: sticky;
  top: 0;
  z-index: 100;
  transition: all 0.3s ease;
}

.app.dark .header {
  background: rgba(26, 26, 46, 0.9);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.title-section {
  text-align: left;
}

h1 {
  font-size: 48px;
  font-weight: 800;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 8px;
}

.subtitle {
  color: #666;
  font-size: 18px;
  margin-bottom: 12px;
  font-weight: 500;
}

.app.dark .subtitle {
  color: #9ca3af;
}

.stats {
  display: flex;
  gap: 24px;
  font-size: 14px;
  color: #999;
}

.app.dark .stats {
  color: #6b7280;
}

.header-actions {
  display: flex;
  gap: 12px;
}

.theme-toggle,
.view-toggle {
  padding: 12px;
  border: 2px solid #e5e7eb;
  background: white;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.app.dark .theme-toggle,
.app.dark .view-toggle {
  background: #2d3748;
  border-color: #4a5568;
  color: #e5e7eb;
}

.theme-toggle:hover,
.view-toggle:hover {
  border-color: #667eea;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(102, 126, 234, 0.2);
}

.controls {
  max-width: 1200px;
  margin: 30px auto;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.search-box {
  position: relative;
  max-width: 600px;
}

.search-icon {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: #999;
}

.search-input {
  width: 100%;
  padding: 14px 45px 14px 48px;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  font-size: 16px;
  transition: all 0.3s ease;
  background: white;
}

.app.dark .search-input {
  background: #2d3748;
  border-color: #4a5568;
  color: #e5e7eb;
}

.search-input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
}

.clear-btn {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  color: #999;
  transition: all 0.2s;
}

.clear-btn:hover {
  background: #f3f4f6;
  color: #333;
}

.categories {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.category-btn {
  padding: 10px 18px;
  border: 2px solid #e5e7eb;
  background: white;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 14px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;
}

.app.dark .category-btn {
  background: #2d3748;
  border-color: #4a5568;
  color: #e5e7eb;
}

.category-btn:hover {
  border-color: #667eea;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(102, 126, 234, 0.15);
}

.category-btn.active {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-color: transparent;
}

.category-btn .count {
  background: rgba(0, 0, 0, 0.1);
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 12px;
}

.category-btn.active .count {
  background: rgba(255, 255, 255, 0.2);
}

.controls-row {
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
}

.control-group {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;
  font-weight: 500;
}

.control-group label {
  min-width: 80px;
}

.control-group input[type='range'] {
  width: 150px;
  cursor: pointer;
}

.control-group .value {
  min-width: 70px;
  padding: 6px 12px;
  background: #f3f4f6;
  border-radius: 6px;
  font-family: 'Courier New', monospace;
  font-size: 13px;
}

.app.dark .control-group .value {
  background: #374151;
}

.color-picker {
  width: 50px;
  height: 36px;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  cursor: pointer;
}

/* Icon Container */
.icon-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.icon-container.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
}

.icon-container.list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

/* Icon Card */
.icon-card {
  background: white;
  border: 2px solid #e5e7eb;
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
}

.app.dark .icon-card {
  background: #2d3748;
  border-color: #4a5568;
}

.icon-container.grid .icon-card {
  padding: 24px;
}

.icon-container.list .icon-card {
  padding: 16px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.icon-card.selected {
  border-color: #667eea;
  background: rgba(102, 126, 234, 0.05);
}

.icon-card:hover {
  border-color: #667eea;
  box-shadow: 0 12px 24px rgba(102, 126, 234, 0.15);
  transform: translateY(-4px);
}

.app.dark .icon-card:hover {
  box-shadow: 0 12px 24px rgba(102, 126, 234, 0.25);
}

.card-content {
  cursor: pointer;
  flex: 1;
}

.icon-container.list .card-content {
  display: flex;
  align-items: center;
  gap: 20px;
}

.icon-preview {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80px;
  margin-bottom: 16px;
}

.icon-container.list .icon-preview {
  height: auto;
  margin: 0;
  width: 48px;
}

.icon-info {
  text-align: center;
  margin-bottom: 12px;
}

.icon-container.list .icon-info {
  text-align: left;
  margin: 0;
  flex: 1;
}

.icon-name {
  font-weight: 600;
  color: #333;
  margin-bottom: 4px;
  font-size: 14px;
}

.app.dark .icon-name {
  color: #e5e7eb;
}

.icon-category {
  font-size: 12px;
  color: #999;
}

.app.dark .icon-category {
  color: #9ca3af;
}

.icon-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  justify-content: center;
}

.tag {
  font-size: 11px;
  padding: 4px 10px;
  background: #f3f4f6;
  border-radius: 6px;
  color: #666;
  font-weight: 500;
}

.app.dark .tag {
  background: #374151;
  color: #9ca3af;
}

.card-actions {
  display: flex;
  gap: 8px;
  opacity: 0;
  transition: opacity 0.2s;
  margin-top: 12px;
  justify-content: center;
}

.icon-card:hover .card-actions {
  opacity: 1;
}

.icon-container.list .card-actions {
  margin: 0;
  opacity: 1;
}

.action-btn {
  padding: 8px;
  background: #f3f4f6;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.app.dark .action-btn {
  background: #374151;
  color: #e5e7eb;
}

.action-btn:hover {
  background: #667eea;
  color: white;
  transform: scale(1.1);
}

.empty {
  text-align: center;
  padding: 80px 20px;
  color: #999;
}

.empty p {
  margin-top: 20px;
  font-size: 18px;
  font-weight: 500;
}

/* Batch Toolbar */
.batch-toolbar {
  position: fixed;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border: 2px solid #e5e7eb;
  border-radius: 16px;
  padding: 16px 24px;
  display: flex;
  align-items: center;
  gap: 20px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  z-index: 90;
}

.app.dark .batch-toolbar {
  background: rgba(45, 55, 72, 0.95);
  border-color: #4a5568;
}

.toolbar-info {
  font-size: 14px;
  font-weight: 500;
}

.toolbar-actions {
  display: flex;
  gap: 12px;
}

.toolbar-btn {
  padding: 10px 16px;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s;
}

.toolbar-btn:hover {
  background: #764ba2;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(102, 126, 234, 0.3);
}

/* Modal */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
}

.modal-content {
  background: white;
  border-radius: 24px;
  padding: 40px;
  max-width: 800px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
}

.app.dark .modal-content {
  background: #2d3748;
}

.close-btn {
  position: absolute;
  top: 20px;
  right: 20px;
  background: #f3f4f6;
  border: none;
  cursor: pointer;
  padding: 10px;
  border-radius: 8px;
  transition: all 0.2s;
}

.app.dark .close-btn {
  background: #374151;
  color: #e5e7eb;
}

.close-btn:hover {
  background: #667eea;
  color: white;
  transform: rotate(90deg);
}

.modal-header {
  text-align: center;
  margin-bottom: 32px;
}

.icon-large {
  margin-bottom: 16px;
  padding: 24px;
  background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%);
  border-radius: 16px;
  display: inline-flex;
}

.app.dark .icon-large {
  background: linear-gradient(135deg, #374151 0%, #4a5568 100%);
}

.modal-header h2 {
  margin-top: 8px;
  color: #333;
  font-size: 28px;
  font-weight: 700;
}

.app.dark .modal-header h2 {
  color: #e5e7eb;
}

.icon-meta {
  color: #999;
  font-size: 14px;
  margin-top: 8px;
}

.tabs {
  display: flex;
  gap: 8px;
  margin-bottom: 24px;
  border-bottom: 2px solid #e5e7eb;
}

.app.dark .tabs {
  border-color: #4a5568;
}

.tab {
  padding: 12px 24px;
  background: none;
  border: none;
  border-bottom: 2px solid transparent;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  color: #666;
  transition: all 0.2s;
  margin-bottom: -2px;
}

.app.dark .tab {
  color: #9ca3af;
}

.tab:hover {
  color: #667eea;
}

.tab.active {
  color: #667eea;
  border-bottom-color: #667eea;
}

.code-section {
  margin-bottom: 24px;
}

.code-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.code-section h3 {
  font-size: 16px;
  font-weight: 600;
  color: #666;
}

.app.dark .code-section h3 {
  color: #9ca3af;
}

.copy-code-btn {
  padding: 6px 12px;
  background: #f3f4f6;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 13px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.2s;
}

.app.dark .copy-code-btn {
  background: #374151;
  color: #e5e7eb;
}

.copy-code-btn:hover {
  background: #667eea;
  color: white;
}

.code-section pre {
  background: #f5f7fa;
  padding: 20px;
  border-radius: 12px;
  overflow-x: auto;
  border: 2px solid #e5e7eb;
}

.app.dark .code-section pre {
  background: #1a1a2e;
  border-color: #4a5568;
}

.code-section code {
  font-family: 'Monaco', 'Consolas', 'Courier New', monospace;
  font-size: 13px;
  line-height: 1.8;
  color: #333;
}

.app.dark .code-section code {
  color: #e5e7eb;
}

.props-demo {
  margin-top: 32px;
  padding: 24px;
  background: #f9fafb;
  border-radius: 16px;
  border: 2px solid #e5e7eb;
}

.app.dark .props-demo {
  background: #1a1a2e;
  border-color: #4a5568;
}

.props-demo h3 {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 20px;
  color: #333;
}

.app.dark .props-demo h3 {
  color: #e5e7eb;
}

.demo-preview {
  text-align: center;
  padding: 40px;
  background: white;
  border-radius: 12px;
  margin-bottom: 20px;
  border: 2px solid #e5e7eb;
}

.app.dark .demo-preview {
  background: #2d3748;
  border-color: #4a5568;
}

.demo-controls {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.demo-row {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 14px;
  background: white;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
}

.app.dark .demo-row {
  background: #2d3748;
  border-color: #4a5568;
  color: #e5e7eb;
}

.demo-row label {
  min-width: 100px;
  font-weight: 600;
  font-size: 13px;
  font-family: 'Monaco', 'Consolas', monospace;
}

.demo-row input[type='range'] {
  flex: 1;
  cursor: pointer;
}

.demo-row input[type='checkbox'] {
  cursor: pointer;
}

.demo-row select {
  flex: 1;
  padding: 6px 12px;
  border: 2px solid #e5e7eb;
  border-radius: 6px;
  background: white;
  cursor: pointer;
}

.app.dark .demo-row select {
  background: #374151;
  border-color: #4a5568;
  color: #e5e7eb;
}

.demo-row span {
  min-width: 80px;
  text-align: right;
  font-family: 'Monaco', 'Consolas', monospace;
  font-size: 13px;
}

/* Toast */
.toast {
  position: fixed;
  bottom: 30px;
  right: 30px;
  background: rgba(102, 126, 234, 0.95);
  color: white;
  padding: 16px 24px;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: 500;
  z-index: 2000;
  backdrop-filter: blur(10px);
}

/* Animations */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-up-enter-from,
.slide-up-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(20px);
}

/* Responsive */
@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    gap: 20px;
  }

  .title-section {
    text-align: center;
  }

  h1 {
    font-size: 36px;
  }

  .controls-row {
    flex-direction: column;
  }

  .icon-container.grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }

  .modal-content {
    padding: 24px;
  }

  .tabs {
    overflow-x: auto;
  }
}

/* Icon Spin Animation */
:deep(svg) {
  transition: all 0.3s ease;
}

@keyframes ld-icon-spin {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}
</style>
