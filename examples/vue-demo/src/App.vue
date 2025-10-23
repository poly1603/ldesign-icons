<template>
  <div class="app">
    <header class="header">
      <h1>@ldesign/icons</h1>
      <p class="subtitle">Vue 3 图标库示例</p>
      <div class="stats">
        <span>{{ allIcons.length }} 个图标</span>
        <span>{{ categories.length }} 个分类</span>
      </div>
    </header>

    <div class="controls">
      <div class="search-box">
        <SearchIcon class="search-icon" />
        <input
          v-model="searchQuery"
          type="text"
          placeholder="搜索图标..."
          class="search-input"
        />
      </div>

      <div class="categories">
        <button
          v-for="cat in ['all', ...categories]"
          :key="cat"
          :class="['category-btn', { active: selectedCategory === cat }]"
          @click="selectedCategory = cat"
        >
          {{ cat === 'all' ? '全部' : categoryNames[cat] || cat }}
        </button>
      </div>

      <div class="size-control">
        <label>大小:</label>
        <input v-model.number="iconSize" type="range" min="16" max="64" />
        <span>{{ iconSize }}px</span>
      </div>

      <div class="color-control">
        <label>颜色:</label>
        <input v-model="iconColor" type="color" />
        <span>{{ iconColor }}</span>
      </div>
    </div>

    <div class="icon-grid">
      <div
        v-for="icon in filteredIcons"
        :key="icon.name"
        class="icon-card"
        @click="handleIconClick(icon)"
      >
        <div class="icon-preview">
          <component
            :is="iconComponents[icon.componentName]"
            :size="iconSize"
            :color="iconColor"
            :spin="icon.name === 'loading'"
          />
        </div>
        <div class="icon-info">
          <div class="icon-name">{{ icon.componentName }}</div>
          <div class="icon-category">{{ categoryNames[icon.category] }}</div>
        </div>
        <div class="icon-tags">
          <span v-for="tag in icon.tags.slice(0, 3)" :key="tag" class="tag">
            {{ tag }}
          </span>
        </div>
      </div>
    </div>

    <div v-if="filteredIcons.length === 0" class="empty">
      <SearchIcon :size="64" color="#ccc" />
      <p>未找到匹配的图标</p>
    </div>

    <!-- 代码预览弹窗 -->
    <div v-if="selectedIcon" class="modal" @click="selectedIcon = null">
      <div class="modal-content" @click.stop>
        <button class="close-btn" @click="selectedIcon = null">
          <CloseIcon />
        </button>
        
        <div class="modal-header">
          <component
            :is="iconComponents[selectedIcon.componentName]"
            :size="64"
            :color="iconColor"
          />
          <h2>{{ selectedIcon.componentName }}Icon</h2>
        </div>

        <div class="code-section">
          <h3>基础用法</h3>
          <pre><code>&lt;template&gt;
  &lt;{{ selectedIcon.componentName }}Icon /&gt;
&lt;/template&gt;

&lt;script setup&gt;
import { {{ selectedIcon.componentName }}Icon } from '@ldesign/icons/vue'
&lt;/script&gt;</code></pre>
        </div>

        <div class="code-section">
          <h3>自定义属性</h3>
          <pre><code>&lt;{{ selectedIcon.componentName }}Icon 
  size="24" 
  color="#1890ff"
  :spin="true"
  :rotate="45"
/&gt;</code></pre>
        </div>

        <div class="props-demo">
          <h3>属性演示</h3>
          <div class="demo-row">
            <component
              :is="iconComponents[selectedIcon.componentName]"
              :size="demoSize"
            />
            <label>
              size: <input v-model.number="demoSize" type="range" min="16" max="128" />
              {{ demoSize }}px
            </label>
          </div>

          <div class="demo-row">
            <component
              :is="iconComponents[selectedIcon.componentName]"
              :size="48"
              :color="demoColor"
            />
            <label>
              color: <input v-model="demoColor" type="color" />
              {{ demoColor }}
            </label>
          </div>

          <div class="demo-row">
            <component
              :is="iconComponents[selectedIcon.componentName]"
              :size="48"
              :rotate="demoRotate"
            />
            <label>
              rotate: <input v-model.number="demoRotate" type="range" min="0" max="360" />
              {{ demoRotate }}°
            </label>
          </div>

          <div class="demo-row">
            <component
              :is="iconComponents[selectedIcon.componentName]"
              :size="48"
              :spin="demoSpin"
            />
            <label>
              spin: <input v-model="demoSpin" type="checkbox" />
              {{ demoSpin }}
            </label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import * as Icons from '@ldesign/icons/vue'
import metadata from '../../../src/metadata.json'

// 导入所有图标
const {
  HomeIcon, SearchIcon, SettingsIcon, UserIcon, MenuIcon,
  EditIcon, DeleteIcon, SaveIcon, CopyIcon,
  ChevronDownIcon, ChevronUpIcon, ChevronLeftIcon, ChevronRightIcon,
  PlayIcon, PauseIcon,
  LoadingIcon, CheckIcon, CloseIcon, HeartIcon, StarIcon,
  DownloadIcon, UploadIcon,
} = Icons

const iconComponents: Record<string, any> = {
  Home: HomeIcon,
  Search: SearchIcon,
  Settings: SettingsIcon,
  User: UserIcon,
  Menu: MenuIcon,
  Edit: EditIcon,
  Delete: DeleteIcon,
  Save: SaveIcon,
  Copy: CopyIcon,
  ChevronDown: ChevronDownIcon,
  ChevronUp: ChevronUpIcon,
  ChevronLeft: ChevronLeftIcon,
  ChevronRight: ChevronRightIcon,
  Play: PlayIcon,
  Pause: PauseIcon,
  Loading: LoadingIcon,
  Check: CheckIcon,
  Close: CloseIcon,
  Heart: HeartIcon,
  Star: StarIcon,
  Download: DownloadIcon,
  Upload: UploadIcon,
}

const allIcons = ref(metadata)
const searchQuery = ref('')
const selectedCategory = ref('all')
const iconSize = ref(32)
const iconColor = ref('#333333')
const selectedIcon = ref<any>(null)

// 演示属性
const demoSize = ref(48)
const demoColor = ref('#1890ff')
const demoRotate = ref(0)
const demoSpin = ref(false)

const categoryNames: Record<string, string> = {
  general: '通用',
  editing: '编辑',
  navigation: '导航',
  media: '媒体',
  status: '状态',
}

const categories = computed(() => {
  return [...new Set(metadata.map((i: any) => i.category))]
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
      i.tags.some((tag: string) => tag.toLowerCase().includes(query)),
    )
  }

  return icons
})

function handleIconClick(icon: any) {
  selectedIcon.value = icon
  demoSize.value = 48
  demoColor.value = '#1890ff'
  demoRotate.value = 0
  demoSpin.value = false
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.app {
  min-height: 100vh;
  background: #f5f7fa;
}

.header {
  background: white;
  padding: 40px 20px;
  text-align: center;
  border-bottom: 1px solid #e5e7eb;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

h1 {
  font-size: 42px;
  color: #1890ff;
  margin-bottom: 10px;
}

.subtitle {
  color: #666;
  font-size: 18px;
  margin-bottom: 20px;
}

.stats {
  display: flex;
  justify-content: center;
  gap: 30px;
  font-size: 14px;
  color: #999;
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
  max-width: 500px;
}

.search-icon {
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: #999;
}

.search-input {
  width: 100%;
  padding: 12px 15px 12px 45px;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 16px;
  transition: all 0.3s;
}

.search-input:focus {
  outline: none;
  border-color: #1890ff;
  box-shadow: 0 0 0 3px rgba(24, 144, 255, 0.1);
}

.categories {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.category-btn {
  padding: 8px 16px;
  border: 1px solid #e5e7eb;
  background: white;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 14px;
}

.category-btn:hover {
  border-color: #1890ff;
  color: #1890ff;
}

.category-btn.active {
  background: #1890ff;
  color: white;
  border-color: #1890ff;
}

.size-control,
.color-control {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
}

.size-control input[type='range'],
.color-control input[type='color'] {
  cursor: pointer;
}

.icon-grid {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 20px;
}

.icon-card {
  background: white;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  padding: 24px;
  cursor: pointer;
  transition: all 0.3s;
}

.icon-card:hover {
  border-color: #1890ff;
  box-shadow: 0 8px 20px rgba(24, 144, 255, 0.15);
  transform: translateY(-4px);
}

.icon-preview {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80px;
  margin-bottom: 12px;
}

.icon-info {
  text-align: center;
  margin-bottom: 8px;
}

.icon-name {
  font-weight: 600;
  color: #333;
  margin-bottom: 4px;
  font-size: 14px;
}

.icon-category {
  font-size: 12px;
  color: #999;
}

.icon-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  justify-content: center;
}

.tag {
  font-size: 11px;
  padding: 2px 8px;
  background: #f0f0f0;
  border-radius: 4px;
  color: #666;
}

.empty {
  text-align: center;
  padding: 60px 20px;
  color: #999;
}

.empty p {
  margin-top: 20px;
  font-size: 16px;
}

/* 弹窗样式 */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  border-radius: 16px;
  padding: 40px;
  max-width: 700px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
}

.close-btn {
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 6px;
  transition: background 0.2s;
}

.close-btn:hover {
  background: #f5f5f5;
}

.modal-header {
  text-align: center;
  margin-bottom: 30px;
}

.modal-header h2 {
  margin-top: 16px;
  color: #333;
}

.code-section {
  margin-bottom: 24px;
}

.code-section h3 {
  font-size: 16px;
  margin-bottom: 12px;
  color: #666;
}

.code-section pre {
  background: #f5f7fa;
  padding: 16px;
  border-radius: 8px;
  overflow-x: auto;
}

.code-section code {
  font-family: 'Consolas', 'Monaco', monospace;
  font-size: 13px;
  line-height: 1.6;
  color: #333;
}

.props-demo {
  margin-top: 30px;
  padding: 20px;
  background: #f9fafb;
  border-radius: 8px;
}

.props-demo h3 {
  font-size: 16px;
  margin-bottom: 16px;
  color: #666;
}

.demo-row {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 12px;
  background: white;
  border-radius: 6px;
  margin-bottom: 12px;
}

.demo-row label {
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
}

.demo-row input[type='range'] {
  flex: 1;
}
</style>



