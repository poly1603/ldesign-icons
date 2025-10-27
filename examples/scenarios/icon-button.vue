<template>
  <div class="demo-container">
    <h2>图标按钮示例</h2>
    
    <!-- 基础按钮 -->
    <section>
      <h3>基础按钮</h3>
      <div class="button-group">
        <button class="icon-btn primary">
          <HomeIcon />
          <span>首页</span>
        </button>
        <button class="icon-btn secondary">
          <SearchIcon />
          <span>搜索</span>
        </button>
        <button class="icon-btn success">
          <CheckIcon />
          <span>确认</span>
        </button>
        <button class="icon-btn danger">
          <TrashIcon />
          <span>删除</span>
        </button>
      </div>
    </section>

    <!-- 只有图标的按钮 -->
    <section>
      <h3>图标按钮（无文字）</h3>
      <div class="button-group">
        <button class="icon-btn-round primary" title="首页">
          <HomeIcon />
        </button>
        <button class="icon-btn-round secondary" title="搜索">
          <SearchIcon />
        </button>
        <button class="icon-btn-round success" title="设置">
          <SettingsIcon />
        </button>
        <button class="icon-btn-round danger" title="删除">
          <TrashIcon />
        </button>
      </div>
    </section>

    <!-- 加载状态 -->
    <section>
      <h3>加载状态</h3>
      <div class="button-group">
        <button class="icon-btn primary" :disabled="loading" @click="handleSubmit">
          <LoadingIcon v-if="loading" :spin="true" />
          <CheckIcon v-else />
          <span>{{ loading ? '提交中...' : '提交' }}</span>
        </button>
        <button class="icon-btn secondary" @click="loading = !loading">
          切换加载状态
        </button>
      </div>
    </section>

    <!-- 按钮组 -->
    <section>
      <h3>按钮组</h3>
      <div class="btn-group">
        <button class="icon-btn-group">
          <BoldIcon />
        </button>
        <button class="icon-btn-group">
          <ItalicIcon />
        </button>
        <button class="icon-btn-group">
          <UnderlineIcon />
        </button>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  HomeIcon,
  SearchIcon,
  CheckIcon,
  TrashIcon,
  SettingsIcon,
  LoadingIcon,
  BoldIcon,
  ItalicIcon,
  UnderlineIcon,
} from '@ldesign/icons/vue'

const loading = ref(false)

const handleSubmit = async () => {
  loading.value = true
  await new Promise(resolve => setTimeout(resolve, 2000))
  loading.value = false
}
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

.button-group {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.icon-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
}

.icon-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.icon-btn.primary {
  background: #3b82f6;
  color: white;
}

.icon-btn.primary:hover:not(:disabled) {
  background: #2563eb;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

.icon-btn.secondary {
  background: #64748b;
  color: white;
}

.icon-btn.secondary:hover:not(:disabled) {
  background: #475569;
  transform: translateY(-2px);
}

.icon-btn.success {
  background: #10b981;
  color: white;
}

.icon-btn.success:hover:not(:disabled) {
  background: #059669;
  transform: translateY(-2px);
}

.icon-btn.danger {
  background: #ef4444;
  color: white;
}

.icon-btn.danger:hover:not(:disabled) {
  background: #dc2626;
  transform: translateY(-2px);
}

.icon-btn-round {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s;
}

.icon-btn-round.primary {
  background: #3b82f6;
  color: white;
}

.icon-btn-round.primary:hover {
  background: #2563eb;
  transform: scale(1.1);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

.icon-btn-round.secondary {
  background: #64748b;
  color: white;
}

.icon-btn-round.secondary:hover {
  background: #475569;
  transform: scale(1.1);
}

.icon-btn-round.success {
  background: #10b981;
  color: white;
}

.icon-btn-round.success:hover {
  background: #059669;
  transform: scale(1.1);
}

.icon-btn-round.danger {
  background: #ef4444;
  color: white;
}

.icon-btn-round.danger:hover {
  background: #dc2626;
  transform: scale(1.1);
}

.btn-group {
  display: inline-flex;
  border: 2px solid #e5e7eb;
  border-radius: 0.5rem;
  overflow: hidden;
}

.icon-btn-group {
  padding: 0.75rem 1rem;
  border: none;
  background: white;
  border-right: 1px solid #e5e7eb;
  cursor: pointer;
  transition: all 0.2s;
}

.icon-btn-group:last-child {
  border-right: none;
}

.icon-btn-group:hover {
  background: #f3f4f6;
}

.icon-btn-group:active {
  background: #3b82f6;
  color: white;
}
</style>

