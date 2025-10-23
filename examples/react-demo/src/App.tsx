import { useState } from 'react'
import * as Icons from '@ldesign/icons/react'
import metadata from '../../../src/metadata.json'
import './App.css'

const {
  HomeIcon, SearchIcon, SettingsIcon, UserIcon, MenuIcon,
  EditIcon, DeleteIcon, SaveIcon, CopyIcon,
  ChevronDownIcon, ChevronUpIcon, ChevronLeftIcon, ChevronRightIcon,
  PlayIcon, PauseIcon,
  LoadingIcon, CheckIcon, CloseIcon, HeartIcon, StarIcon,
  DownloadIcon, UploadIcon,
} = Icons as any

const iconComponents: Record<string, any> = {
  Home: HomeIcon, Search: SearchIcon, Settings: SettingsIcon,
  User: UserIcon, Menu: MenuIcon, Edit: EditIcon,
  Delete: DeleteIcon, Save: SaveIcon, Copy: CopyIcon,
  ChevronDown: ChevronDownIcon, ChevronUp: ChevronUpIcon,
  ChevronLeft: ChevronLeftIcon, ChevronRight: ChevronRightIcon,
  Play: PlayIcon, Pause: PauseIcon, Loading: LoadingIcon,
  Check: CheckIcon, Close: CloseIcon, Heart: HeartIcon,
  Star: StarIcon, Download: DownloadIcon, Upload: UploadIcon,
}

const categoryNames: Record<string, string> = {
  general: '通用',
  editing: '编辑',
  navigation: '导航',
  media: '媒体',
  status: '状态',
}

function App() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [iconSize, setIconSize] = useState(32)
  const [iconColor, setIconColor] = useState('#333333')
  const [selectedIcon, setSelectedIcon] = useState<any>(null)

  const categories = [...new Set(metadata.map((i: any) => i.category))]

  const filteredIcons = metadata.filter((icon: any) => {
    const matchCategory = selectedCategory === 'all' || icon.category === selectedCategory
    const matchSearch = !searchQuery ||
      icon.name.includes(searchQuery.toLowerCase()) ||
      icon.componentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      icon.tags.some((tag: string) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    return matchCategory && matchSearch
  })

  return (
    <div className="app">
      <header className="header">
        <h1>@ldesign/icons</h1>
        <p className="subtitle">React 图标库示例</p>
        <div className="stats">
          <span>{metadata.length} 个图标</span>
          <span>{categories.length} 个分类</span>
        </div>
      </header>

      <div className="controls">
        <div className="search-box">
          <SearchIcon className="search-icon" />
          <input
            type="text"
            placeholder="搜索图标..."
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="categories">
          {['all', ...categories].map((cat) => (
            <button
              key={cat}
              className={`category-btn ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat === 'all' ? '全部' : categoryNames[cat] || cat}
            </button>
          ))}
        </div>

        <div className="size-control">
          <label>大小:</label>
          <input
            type="range"
            min="16"
            max="64"
            value={iconSize}
            onChange={(e) => setIconSize(Number(e.target.value))}
          />
          <span>{iconSize}px</span>
        </div>

        <div className="color-control">
          <label>颜色:</label>
          <input
            type="color"
            value={iconColor}
            onChange={(e) => setIconColor(e.target.value)}
          />
          <span>{iconColor}</span>
        </div>
      </div>

      <div className="icon-grid">
        {filteredIcons.map((icon: any) => {
          const IconComponent = iconComponents[icon.componentName]
          return (
            <div
              key={icon.name}
              className="icon-card"
              onClick={() => setSelectedIcon(icon)}
            >
              <div className="icon-preview">
                <IconComponent
                  size={iconSize}
                  color={iconColor}
                  spin={icon.name === 'loading'}
                />
              </div>
              <div className="icon-info">
                <div className="icon-name">{icon.componentName}</div>
                <div className="icon-category">{categoryNames[icon.category]}</div>
              </div>
              <div className="icon-tags">
                {icon.tags.slice(0, 3).map((tag: string) => (
                  <span key={tag} className="tag">
                    {tag}
                  </span>
                ))}
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

      {/* 代码预览弹窗 */}
      {selectedIcon && (
        <div className="modal" onClick={() => setSelectedIcon(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setSelectedIcon(null)}>
              <CloseIcon />
            </button>

            <div className="modal-header">
              {React.createElement(iconComponents[selectedIcon.componentName], {
                size: 64,
                color: iconColor,
              })}
              <h2>{selectedIcon.componentName}Icon</h2>
            </div>

            <div className="code-section">
              <h3>基础用法</h3>
              <pre><code>{`import { ${selectedIcon.componentName}Icon } from '@ldesign/icons/react'

function App() {
  return <${selectedIcon.componentName}Icon />
}`}</code></pre>
            </div>

            <div className="code-section">
              <h3>自定义属性</h3>
              <pre><code>{`<${selectedIcon.componentName}Icon 
  size={24} 
  color="#1890ff"
  spin
  rotate={45}
/>`}</code></pre>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App



