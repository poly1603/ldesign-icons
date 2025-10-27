<template>
  <div class="demo-container">
    <h2>导航菜单示例</h2>
    
    <!-- 侧边栏导航 -->
    <section>
      <h3>侧边栏导航</h3>
      <nav class="sidebar">
        <a
          v-for="item in menuItems"
          :key="item.path"
          :href="item.path"
          class="sidebar-item"
          :class="{ active: currentPath === item.path }"
          @click.prevent="currentPath = item.path"
        >
          <component :is="item.icon" :size="20" />
          <span>{{ item.label }}</span>
          <ChevronRightIcon v-if="item.children" :size="16" class="arrow" />
        </a>
      </nav>
    </section>

    <!-- 顶部导航 -->
    <section>
      <h3>顶部导航</h3>
      <nav class="topbar">
        <div class="topbar-start">
          <a href="/" class="logo">
            <HomeIcon :size="24" />
            <span>LDesign</span>
          </a>
          <a
            v-for="item in topbarItems"
            :key="item.path"
            :href="item.path"
            class="topbar-item"
            :class="{ active: currentPath === item.path }"
            @click.prevent="currentPath = item.path"
          >
            {{ item.label }}
          </a>
        </div>
        <div class="topbar-end">
          <button class="topbar-icon-btn">
            <SearchIcon :size="20" />
          </button>
          <button class="topbar-icon-btn">
            <BellIcon :size="20" />
          </button>
          <button class="topbar-icon-btn">
            <UserIcon :size="20" />
          </button>
        </div>
      </nav>
    </section>

    <!-- 底部标签栏（移动端） -->
    <section>
      <h3>底部标签栏</h3>
      <nav class="tabbar">
        <button
          v-for="item in tabbarItems"
          :key="item.path"
          class="tabbar-item"
          :class="{ active: currentTab === item.path }"
          @click="currentTab = item.path"
        >
          <component :is="item.icon" :size="24" />
          <span>{{ item.label }}</span>
        </button>
      </nav>
    </section>

    <!-- 面包屑导航 -->
    <section>
      <h3>面包屑导航</h3>
      <nav class="breadcrumb">
        <a
          v-for="(item, index) in breadcrumbs"
          :key="index"
          :href="item.path"
          class="breadcrumb-item"
        >
          <component :is="item.icon" :size="16" />
          <span>{{ item.label }}</span>
          <ChevronRightIcon v-if="index < breadcrumbs.length - 1" :size="14" class="separator" />
        </a>
      </nav>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  HomeIcon,
  SearchIcon,
  SettingsIcon,
  UserIcon,
  BellIcon,
  FileIcon,
  ChartIcon,
  MessageIcon,
  ChevronRightIcon,
} from '@ldesign/icons/vue'

const currentPath = ref('/')
const currentTab = ref('home')

const menuItems = [
  { path: '/', label: '首页', icon: HomeIcon },
  { path: '/search', label: '搜索', icon: SearchIcon },
  { path: '/files', label: '文件', icon: FileIcon },
  { path: '/chart', label: '数据', icon: ChartIcon },
  { path: '/messages', label: '消息', icon: MessageIcon },
  { path: '/settings', label: '设置', icon: SettingsIcon },
]

const topbarItems = [
  { path: '/', label: '首页' },
  { path: '/products', label: '产品' },
  { path: '/about', label: '关于' },
  { path: '/contact', label: '联系' },
]

const tabbarItems = [
  { path: 'home', label: '首页', icon: HomeIcon },
  { path: 'search', label: '搜索', icon: SearchIcon },
  { path: 'messages', label: '消息', icon: MessageIcon },
  { path: 'profile', label: '我的', icon: UserIcon },
]

const breadcrumbs = [
  { path: '/', label: '首页', icon: HomeIcon },
  { path: '/files', label: '文件', icon: FileIcon },
  { path: '/files/documents', label: '文档', icon: FileIcon },
]
</script>

<style scoped>
.demo-container {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

h2 {
  margin-bottom: 2rem;
  color: #333;
}

section {
  margin-bottom: 3rem;
}

h3 {
  margin-bottom: 1rem;
  color: #666;
  font-size: 1.2rem;
}

/* 侧边栏 */
.sidebar {
  width: 280px;
  background: white;
  border-radius: 1rem;
  padding: 1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.sidebar-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  color: #666;
  text-decoration: none;
  transition: all 0.2s;
  margin-bottom: 0.5rem;
  position: relative;
}

.sidebar-item:hover {
  background: #f3f4f6;
  color: #333;
}

.sidebar-item.active {
  background: #3b82f6;
  color: white;
}

.sidebar-item .arrow {
  margin-left: auto;
}

/* 顶部导航 */
.topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: white;
  border-radius: 1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.topbar-start {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.25rem;
  font-weight: 700;
  color: #3b82f6;
  text-decoration: none;
}

.topbar-item {
  color: #666;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  transition: all 0.2s;
}

.topbar-item:hover {
  background: #f3f4f6;
  color: #333;
}

.topbar-item.active {
  color: #3b82f6;
  font-weight: 600;
}

.topbar-end {
  display: flex;
  gap: 0.5rem;
}

.topbar-icon-btn {
  padding: 0.5rem;
  border: none;
  background: transparent;
  border-radius: 0.5rem;
  cursor: pointer;
  color: #666;
  transition: all 0.2s;
}

.topbar-icon-btn:hover {
  background: #f3f4f6;
  color: #333;
}

/* 底部标签栏 */
.tabbar {
  display: flex;
  justify-content: space-around;
  background: white;
  border-radius: 1rem;
  padding: 0.5rem;
  box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.1);
  max-width: 480px;
  margin: 0 auto;
}

.tabbar-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  padding: 0.75rem 1.5rem;
  border: none;
  background: transparent;
  border-radius: 0.5rem;
  cursor: pointer;
  color: #666;
  font-size: 0.875rem;
  transition: all 0.2s;
  flex: 1;
}

.tabbar-item:hover {
  background: #f3f4f6;
  color: #333;
}

.tabbar-item.active {
  color: #3b82f6;
  font-weight: 600;
}

/* 面包屑 */
.breadcrumb {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.breadcrumb-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #666;
  text-decoration: none;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  transition: all 0.2s;
}

.breadcrumb-item:hover {
  background: #f3f4f6;
  color: #333;
}

.breadcrumb-item:last-child {
  color: #3b82f6;
  font-weight: 600;
}

.breadcrumb-item .separator {
  color: #d1d5db;
  margin-left: 0.5rem;
}
</style>

