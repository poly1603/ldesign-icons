import { useState, useMemo } from 'react'
import * as Icons from '@ldesign/icons/react'
import metadata from '../../../src/metadata.json'
import './App.css'

// 动态导入所有图标组件
const iconComponents = Icons as Record<string, any>

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

// 提取常用图标
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

interface Toast {
  show: boolean
  message: string
}

function App() {
  // 基础状态
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [iconSize, setIconSize] = useState(32)
  const [strokeWidth, setStrokeWidth] = useState(2)
  const [iconColor, setIconColor] = useState('#333333')
  const [selectedIcon, setSelectedIcon] = useState<any>(null)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [selectedIcons, setSelectedIcons] = useState<Set<string>>(new Set())
  const [activeTab, setActiveTab] = useState<'vue' | 'react' | 'lit'>('react')

  // 演示属性
  const [demoSize, setDemoSize] = useState(48)
  const [demoColor, setDemoColor] = useState('#1890ff')
  const [demoStrokeWidth, setDemoStrokeWidth] = useState(2)
  const [demoRotate, setDemoRotate] = useState(0)
  const [demoSpin, setDemoSpin] = useState(false)
  const [demoFlip, setDemoFlip] = useState<'horizontal' | 'vertical' | 'both' | undefined>(undefined)

  // Toast
  const [toast, setToast] = useState<Toast>({ show: false, message: '' })

  // 计算分类
  const categories = useMemo(() => {
    return [...new Set(metadata.map((i: any) => i.category))].sort()
  }, [])

  // 过滤图标
  const filteredIcons = useMemo(() => {
    let icons = metadata

    if (selectedCategory !== 'all') {
      icons = icons.filter((i: any) => i.category === selectedCategory)
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      icons = icons.filter((i: any) =>
        i.name.includes(query) ||
        i.componentName.toLowerCase().includes(query) ||
        i.category.toLowerCase().includes(query) ||
        i.tags.some((tag: string) => tag.toLowerCase().includes(query))
      )
    }

    return icons
  }, [selectedCategory, searchQuery])

  // 获取分类计数
  const getCategoryCount = (cat: string) => {
    if (cat === 'all') return metadata.length
    return metadata.filter((i: any) => i.category === cat).length
  }

  // 处理图标点击
  const handleIconClick = (icon: any) => {
    setSelectedIcon(icon)
    setDemoSize(48)
    setDemoColor('#1890ff')
    setDemoStrokeWidth(2)
    setDemoRotate(0)
    setDemoSpin(false)
    setDemoFlip(undefined)
  }

  // 生成代码
  const getBasicCode = () => {
    if (!selectedIcon) return ''
    const name = selectedIcon.componentName

    if (activeTab === 'vue') {
      return `<template>
  <${name}Icon />
</template>

<script setup>
import { ${name}Icon } from '@ldesign/icons/vue'
</script>`
    } else if (activeTab === 'react') {
      return `import { ${name}Icon } from '@ldesign/icons/react'

function App() {
  return <${name}Icon />
}`
    } else {
      return `<script type="module">
  import '@ldesign/icons/lit'
</script>

<ld-icon-${selectedIcon.name}></ld-icon-${selectedIcon.name}>`
    }
  }

  const getAdvancedCode = () => {
    if (!selectedIcon) return ''
    const name = selectedIcon.componentName

    if (activeTab === 'vue') {
      return `<${name}Icon 
  size="${demoSize}" 
  color="${demoColor}"
  :strokeWidth="${demoStrokeWidth}"
  :rotate="${demoRotate}"
  :spin="${demoSpin}"
  ${demoFlip ? `flip="${demoFlip}"` : ''}
/>`
    } else if (activeTab === 'react') {
      return `<${name}Icon 
  size={${demoSize}} 
  color="${demoColor}"
  strokeWidth={${demoStrokeWidth}}
  rotate={${demoRotate}}
  spin={${demoSpin}}
  ${demoFlip ? `flip="${demoFlip}"` : ''}
/>`
    } else {
      return `<ld-icon-${selectedIcon.name}
  size="${demoSize}" 
  color="${demoColor}"
  stroke-width="${demoStrokeWidth}"
  rotate="${demoRotate}"
  ${demoSpin ? 'spin' : ''}
  ${demoFlip ? `flip="${demoFlip}"` : ''}
></ld-icon-${selectedIcon.name}>`
    }
  }

  // 复制代码
  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code)
    showToast('代码已复制到剪贴板')
  }

  // 复制图标代码
  const copyIconCode = (icon: any, type: 'component' | 'svg') => {
    const name = icon.componentName
    let code = ''

    if (type === 'component') {
      code = `import { ${name}Icon } from '@ldesign/icons/react'\n\n<${name}Icon size={24} />`
    } else {
      code = `<${name}Icon size={24} />`
    }

    navigator.clipboard.writeText(code)
    showToast(`${icon.name} 代码已复制`)
  }

  // 下载图标
  const downloadIcon = (icon: any) => {
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

  // 切换图标选择
  const toggleIconSelect = (icon: any) => {
    const newSelected = new Set(selectedIcons)
    if (newSelected.has(icon.name)) {
      newSelected.delete(icon.name)
    } else {
      newSelected.add(icon.name)
    }
    setSelectedIcons(newSelected)
  }

  // 清除选择
  const clearSelection = () => {
    setSelectedIcons(new Set())
  }

  // 下载选中的图标
  const downloadSelectedIcons = () => {
    const selected = Array.from(selectedIcons)
    showToast(`正在下载 ${selected.length} 个图标...`)

    selected.forEach(name => {
      const icon = metadata.find((i: any) => i.name === name)
      if (icon) {
        setTimeout(() => downloadIcon(icon), 100)
      }
    })
  }

  // 显示 Toast
  const showToast = (message: string) => {
    setToast({ show: true, message })
    setTimeout(() => {
      setToast({ show: false, message: '' })
    }, 2000)
  }

  return (
    <div className={`app ${isDarkMode ? 'dark' : ''}`}>
      <header className="header">
        <div className="header-content">
          <div className="title-section">
            <h1>@ldesign/icons</h1>
            <p className="subtitle">React 图标库示例 - 347+ 精美图标</p>
            <div className="stats">
              <span>{filteredIcons.length} / {metadata.length} 个图标</span>
              <span>{categories.length} 个分类</span>
            </div>
          </div>
          <div className="header-actions">
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="theme-toggle"
              title={isDarkMode ? '切换到浅色模式' : '切换到深色模式'}
            >
              {isDarkMode ? <SunIcon size={20} /> : <MoonIcon size={20} />}
            </button>
            <button
              onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
              className="view-toggle"
              title={viewMode === 'grid' ? '列表视图' : '网格视图'}
            >
              {viewMode === 'grid' ? <MenuIcon size={20} /> : <SquareIcon size={20} />}
            </button>
          </div>
        </div>
      </header>

      <div className="controls">
        <div className="search-box">
          <SearchIcon className="search-icon" />
          <input
            type="text"
            placeholder="搜索图标名称、分类或标签..."
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="clear-btn">
              <CloseIcon size={16} />
            </button>
          )}
        </div>

        <div className="categories">
          {['all', ...categories].map((cat) => (
            <button
              key={cat}
              className={`category-btn ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat === 'all' ? '全部' : categoryNames[cat] || cat}
              <span className="count">{getCategoryCount(cat)}</span>
            </button>
          ))}
        </div>

        <div className="controls-row">
          <div className="control-group">
            <label>大小:</label>
            <input
              type="range"
              min="16"
              max="64"
              value={iconSize}
              onChange={(e) => setIconSize(Number(e.target.value))}
            />
            <span className="value">{iconSize}px</span>
          </div>

          <div className="control-group">
            <label>描边宽度:</label>
            <input
              type="range"
              min="0.5"
              max="4"
              step="0.5"
              value={strokeWidth}
              onChange={(e) => setStrokeWidth(Number(e.target.value))}
            />
            <span className="value">{strokeWidth}</span>
          </div>

          <div className="control-group">
            <label>颜色:</label>
            <input
              type="color"
              className="color-picker"
              value={iconColor}
              onChange={(e) => setIconColor(e.target.value)}
            />
            <span className="value">{iconColor}</span>
          </div>
        </div>
      </div>

      <div className={`icon-container ${viewMode}`}>
        {filteredIcons.map((icon: any) => {
          const IconComponent = iconComponents[icon.componentName + 'Icon']
          const isSelected = selectedIcons.has(icon.name)

          return (
            <div
              key={icon.name}
              className={`icon-card ${isSelected ? 'selected' : ''}`}
            >
              <div className="card-content" onClick={() => handleIconClick(icon)}>
                <div className="icon-preview">
                  {IconComponent && (
                    <IconComponent
                      size={iconSize}
                      color={iconColor}
                      strokeWidth={strokeWidth}
                      spin={icon.name === 'loading' || icon.name === 'loader' || icon.name === 'loader-2'}
                    />
                  )}
                </div>
                <div className="icon-info">
                  <div className="icon-name">{icon.componentName}</div>
                  <div className="icon-category">{categoryNames[icon.category]}</div>
                </div>
                {viewMode === 'grid' && (
                  <div className="icon-tags">
                    {icon.tags.slice(0, 3).map((tag: string) => (
                      <span key={tag} className="tag">{tag}</span>
                    ))}
                  </div>
                )}
              </div>
              <div className="card-actions">
                <button
                  onClick={(e) => { e.stopPropagation(); copyIconCode(icon, 'component') }}
                  className="action-btn"
                  title="复制组件代码"
                >
                  <CopyIcon size={14} />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); copyIconCode(icon, 'svg') }}
                  className="action-btn"
                  title="复制 SVG"
                >
                  <CodeIcon size={14} />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); downloadIcon(icon) }}
                  className="action-btn"
                  title="下载 SVG"
                >
                  <DownloadIcon size={14} />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); toggleIconSelect(icon) }}
                  className="action-btn"
                  title={isSelected ? '取消选择' : '选择'}
                >
                  {isSelected ? <CheckIcon size={14} /> : <PlusIcon size={14} />}
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {filteredIcons.length === 0 && (
        <div className="empty">
          <SearchIcon size={64} color="#ccc" />
          <p>未找到匹配的图标</p>
        </div>
      )}

      {/* 批量操作工具栏 */}
      {selectedIcons.size > 0 && (
        <div className="batch-toolbar">
          <div className="toolbar-info">
            已选择 <strong>{selectedIcons.size}</strong> 个图标
          </div>
          <div className="toolbar-actions">
            <button onClick={downloadSelectedIcons} className="toolbar-btn">
              <DownloadIcon size={16} />
              下载选中
            </button>
            <button onClick={clearSelection} className="toolbar-btn">
              <CloseIcon size={16} />
              清除选择
            </button>
          </div>
        </div>
      )}

      {/* 代码预览弹窗 */}
      {selectedIcon && (
        <div className="modal" onClick={() => setSelectedIcon(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setSelectedIcon(null)}>
              <CloseIcon />
            </button>

            <div className="modal-header">
              <div className="icon-large">
                {iconComponents[selectedIcon.componentName + 'Icon'] &&
                  React.createElement(iconComponents[selectedIcon.componentName + 'Icon'], {
                    size: 80,
                    color: demoColor,
                    strokeWidth: demoStrokeWidth,
                  })}
              </div>
              <h2>{selectedIcon.componentName}Icon</h2>
              <p className="icon-meta">{categoryNames[selectedIcon.category]} · {selectedIcon.name}</p>
            </div>

            <div className="tabs">
              {(['vue', 'react', 'lit'] as const).map((tab) => (
                <button
                  key={tab}
                  className={`tab ${activeTab === tab ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab.toUpperCase()}
                </button>
              ))}
            </div>

            <div className="code-section">
              <div className="code-header">
                <h3>基础用法</h3>
                <button onClick={() => copyCode(getBasicCode())} className="copy-code-btn">
                  <CopyIcon size={14} />
                  复制代码
                </button>
              </div>
              <pre><code>{getBasicCode()}</code></pre>
            </div>

            <div className="code-section">
              <div className="code-header">
                <h3>自定义属性</h3>
                <button onClick={() => copyCode(getAdvancedCode())} className="copy-code-btn">
                  <CopyIcon size={14} />
                  复制代码
                </button>
              </div>
              <pre><code>{getAdvancedCode()}</code></pre>
            </div>

            <div className="props-demo">
              <h3>交互式演示</h3>
              <div className="demo-preview">
                {iconComponents[selectedIcon.componentName + 'Icon'] &&
                  React.createElement(iconComponents[selectedIcon.componentName + 'Icon'], {
                    size: demoSize,
                    color: demoColor,
                    strokeWidth: demoStrokeWidth,
                    rotate: demoRotate,
                    spin: demoSpin,
                    flip: demoFlip,
                  })}
              </div>

              <div className="demo-controls">
                <div className="demo-row">
                  <label>size:</label>
                  <input
                    type="range"
                    min="16"
                    max="128"
                    value={demoSize}
                    onChange={(e) => setDemoSize(Number(e.target.value))}
                  />
                  <span>{demoSize}px</span>
                </div>

                <div className="demo-row">
                  <label>color:</label>
                  <input
                    type="color"
                    value={demoColor}
                    onChange={(e) => setDemoColor(e.target.value)}
                  />
                  <span>{demoColor}</span>
                </div>

                <div className="demo-row">
                  <label>strokeWidth:</label>
                  <input
                    type="range"
                    min="0.5"
                    max="4"
                    step="0.5"
                    value={demoStrokeWidth}
                    onChange={(e) => setDemoStrokeWidth(Number(e.target.value))}
                  />
                  <span>{demoStrokeWidth}</span>
                </div>

                <div className="demo-row">
                  <label>rotate:</label>
                  <input
                    type="range"
                    min="0"
                    max="360"
                    value={demoRotate}
                    onChange={(e) => setDemoRotate(Number(e.target.value))}
                  />
                  <span>{demoRotate}°</span>
                </div>

                <div className="demo-row">
                  <label>flip:</label>
                  <select
                    value={demoFlip || ''}
                    onChange={(e) => setDemoFlip(e.target.value as any || undefined)}
                  >
                    <option value="">none</option>
                    <option value="horizontal">horizontal</option>
                    <option value="vertical">vertical</option>
                    <option value="both">both</option>
                  </select>
                </div>

                <div className="demo-row">
                  <label>spin:</label>
                  <input
                    type="checkbox"
                    checked={demoSpin}
                    onChange={(e) => setDemoSpin(e.target.checked)}
                  />
                  <span>{String(demoSpin)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Toast 提示 */}
      {toast.show && (
        <div className="toast">
          <CheckIcon size={16} />
          {toast.message}
        </div>
      )}
    </div>
  )
}

export default App
