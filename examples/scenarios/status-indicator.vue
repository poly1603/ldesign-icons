<template>
  <div class="demo-container">
    <h2>状态指示器示例</h2>
    
    <!-- 消息提示 -->
    <section>
      <h3>消息提示</h3>
      <div class="alerts">
        <div class="alert success">
          <CheckCircleIcon :size="20" />
          <span>操作成功！数据已保存。</span>
        </div>
        <div class="alert info">
          <InfoIcon :size="20" />
          <span>这是一条提示信息。</span>
        </div>
        <div class="alert warning">
          <AlertCircleIcon :size="20" />
          <span>警告：请检查输入的数据。</span>
        </div>
        <div class="alert error">
          <XCircleIcon :size="20" />
          <span>错误：操作失败，请稍后重试。</span>
        </div>
      </div>
    </section>

    <!-- 状态标签 -->
    <section>
      <h3>状态标签</h3>
      <div class="badges">
        <span class="badge success">
          <CheckIcon :size="14" />
          已完成
        </span>
        <span class="badge pending">
          <ClockIcon :size="14" />
          进行中
        </span>
        <span class="badge warning">
          <AlertTriangleIcon :size="14" />
          待处理
        </span>
        <span class="badge error">
          <XIcon :size="14" />
          已取消
        </span>
      </div>
    </section>

    <!-- 加载状态 -->
    <section>
      <h3>加载状态</h3>
      <div class="loaders">
        <div class="loader-item">
          <LoadingIcon :spin="true" :size="32" />
          <span>加载中...</span>
        </div>
        <div class="loader-item">
          <RefreshCwIcon :spin="true" :size="32" color="#3b82f6" />
          <span>刷新中...</span>
        </div>
        <div class="loader-item">
          <DownloadIcon :size="32" color="#10b981" />
          <div class="progress-bar">
            <div class="progress-fill" :style="{ width: `${downloadProgress}%` }"></div>
          </div>
          <span>{{ downloadProgress }}%</span>
        </div>
      </div>
    </section>

    <!-- 状态图标列表 -->
    <section>
      <h3>状态图标列表</h3>
      <div class="status-list">
        <div class="status-item">
          <CheckCircleIcon :size="24" class="icon-success" />
          <div class="status-content">
            <h4>任务已完成</h4>
            <p>所有步骤已成功执行</p>
          </div>
        </div>
        <div class="status-item">
          <LoadingIcon :spin="true" :size="24" class="icon-pending" />
          <div class="status-content">
            <h4>正在处理</h4>
            <p>预计还需要 2 分钟</p>
          </div>
        </div>
        <div class="status-item">
          <AlertCircleIcon :size="24" class="icon-warning" />
          <div class="status-content">
            <h4>需要注意</h4>
            <p>部分数据需要确认</p>
          </div>
        </div>
        <div class="status-item">
          <XCircleIcon :size="24" class="icon-error" />
          <div class="status-content">
            <h4>处理失败</h4>
            <p>请检查错误日志</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 在线状态 -->
    <section>
      <h3>在线状态</h3>
      <div class="user-list">
        <div class="user-item">
          <div class="user-avatar online">
            <UserIcon :size="24" />
            <span class="status-dot"></span>
          </div>
          <span>张三 (在线)</span>
        </div>
        <div class="user-item">
          <div class="user-avatar busy">
            <UserIcon :size="24" />
            <span class="status-dot"></span>
          </div>
          <span>李四 (忙碌)</span>
        </div>
        <div class="user-item">
          <div class="user-avatar offline">
            <UserIcon :size="24" />
            <span class="status-dot"></span>
          </div>
          <span>王五 (离线)</span>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import {
  CheckCircleIcon,
  InfoIcon,
  AlertCircleIcon,
  XCircleIcon,
  CheckIcon,
  ClockIcon,
  AlertTriangleIcon,
  XIcon,
  LoadingIcon,
  RefreshCwIcon,
  DownloadIcon,
  UserIcon,
} from '@ldesign/icons/vue'

const downloadProgress = ref(0)
let interval: number | null = null

onMounted(() => {
  interval = setInterval(() => {
    downloadProgress.value = (downloadProgress.value + 10) % 110
  }, 500) as unknown as number
})

onUnmounted(() => {
  if (interval) clearInterval(interval)
})
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

/* 消息提示 */
.alerts {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.alert {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 1.5rem;
  border-radius: 0.5rem;
  border-left: 4px solid;
}

.alert.success {
  background: #d1fae5;
  border-color: #10b981;
  color: #065f46;
}

.alert.info {
  background: #dbeafe;
  border-color: #3b82f6;
  color: #1e40af;
}

.alert.warning {
  background: #fef3c7;
  border-color: #f59e0b;
  color: #92400e;
}

.alert.error {
  background: #fee2e2;
  border-color: #ef4444;
  color: #991b1b;
}

/* 状态标签 */
.badges {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 500;
}

.badge.success {
  background: #10b981;
  color: white;
}

.badge.pending {
  background: #3b82f6;
  color: white;
}

.badge.warning {
  background: #f59e0b;
  color: white;
}

.badge.error {
  background: #ef4444;
  color: white;
}

/* 加载状态 */
.loaders {
  display: flex;
  gap: 3rem;
  flex-wrap: wrap;
}

.loader-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
}

.progress-bar {
  width: 200px;
  height: 8px;
  background: #e5e7eb;
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #10b981 0%, #059669 100%);
  transition: width 0.3s ease;
}

/* 状态图标列表 */
.status-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.status-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1rem;
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.status-content {
  flex: 1;
}

.status-content h4 {
  margin: 0 0 0.25rem;
  color: #333;
  font-size: 1rem;
}

.status-content p {
  margin: 0;
  color: #666;
  font-size: 0.875rem;
}

.icon-success {
  color: #10b981;
}

.icon-pending {
  color: #3b82f6;
}

.icon-warning {
  color: #f59e0b;
}

.icon-error {
  color: #ef4444;
}

/* 在线状态 */
.user-list {
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
}

.user-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.user-avatar {
  position: relative;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #e5e7eb;
  color: #666;
}

.status-dot {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px solid white;
}

.user-avatar.online .status-dot {
  background: #10b981;
}

.user-avatar.busy .status-dot {
  background: #f59e0b;
}

.user-avatar.offline .status-dot {
  background: #9ca3af;
}
</style>

