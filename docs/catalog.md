# 图标目录

浏览所有 347+ 可用图标，点击图标可复制导入代码。

<div class="catalog-header">
  <div class="search-box">
    <input type="text" placeholder="搜索图标..." />
  </div>
  <div class="filters">
    <select class="category-filter">
      <option value="all">所有分类</option>
      <option value="general">通用</option>
      <option value="editing">编辑</option>
      <option value="navigation">导航</option>
      <option value="media">媒体</option>
      <option value="status">状态</option>
      <option value="file">文件</option>
      <option value="communication">通讯</option>
      <option value="business">商务</option>
      <option value="weather">天气</option>
      <option value="devices">设备</option>
    </select>
  </div>
</div>

## 🏠 通用 (42 icons)

日常使用最频繁的通用图标。

<div class="icon-grid">
  <div class="icon-item">
    <HomeIcon />
    <span class="icon-name">HomeIcon</span>
  </div>
  <div class="icon-item">
    <SearchIcon />
    <span class="icon-name">SearchIcon</span>
  </div>
  <div class="icon-item">
    <SettingsIcon />
    <span class="icon-name">SettingsIcon</span>
  </div>
  <div class="icon-item">
    <UserIcon />
    <span class="icon-name">UserIcon</span>
  </div>
  <div class="icon-item">
    <MenuIcon />
    <span class="icon-name">MenuIcon</span>
  </div>
  <div class="icon-item">
    <StarIcon />
    <span class="icon-name">StarIcon</span>
  </div>
  <div class="icon-item">
    <HeartIcon />
    <span class="icon-name">HeartIcon</span>
  </div>
  <div class="icon-item">
    <BookmarkIcon />
    <span class="icon-name">BookmarkIcon</span>
  </div>
</div>

::: details 查看所有通用图标

- `HomeIcon` - 首页
- `SearchIcon` - 搜索
- `SettingsIcon` - 设置
- `UserIcon` - 用户
- `UsersIcon` - 用户组
- `MenuIcon` - 菜单
- `MoreVerticalIcon` - 更多（垂直）
- `MoreHorizontalIcon` - 更多（水平）
- `StarIcon` - 星标
- `HeartIcon` - 喜欢
- `BookmarkIcon` - 书签
- `TagIcon` - 标签
- `FilterIcon` - 过滤
- `GridIcon` - 网格
- `ListIcon` - 列表
- `LayoutIcon` - 布局
- `SidebarIcon` - 侧边栏
- `EyeIcon` - 查看
- `EyeOffIcon` - 隐藏
- `LockIcon` - 锁定
- `UnlockIcon` - 解锁
- `KeyIcon` - 密钥
- `ShieldIcon` - 盾牌
- `BellIcon` - 通知
- `BellOffIcon` - 关闭通知
- `HelpCircleIcon` - 帮助
- `InfoIcon` - 信息
- `AlertCircleIcon` - 警告
- `CheckCircleIcon` - 成功
- `XCircleIcon` - 错误
- `PlusCircleIcon` - 添加
- `MinusCircleIcon` - 减少
- `ClockIcon` - 时钟
- `CalendarIcon` - 日历
- `MapPinIcon` - 位置
- `GlobeIcon` - 全球
- `LinkIcon` - 链接
- `ExternalLinkIcon` - 外部链接
- `HashIcon` - 标签
- `AtSignIcon` - @符号
- `PercentIcon` - 百分号
- `DollarSignIcon` - 美元符号

:::

## ✏️ 编辑 (23 icons)

编辑和操作相关的图标。

<div class="icon-grid">
  <div class="icon-item">
    <EditIcon />
    <span class="icon-name">EditIcon</span>
  </div>
  <div class="icon-item">
    <Edit2Icon />
    <span class="icon-name">Edit2Icon</span>
  </div>
  <div class="icon-item">
    <DeleteIcon />
    <span class="icon-name">DeleteIcon</span>
  </div>
  <div class="icon-item">
    <SaveIcon />
    <span class="icon-name">SaveIcon</span>
  </div>
  <div class="icon-item">
    <CopyIcon />
    <span class="icon-name">CopyIcon</span>
  </div>
  <div class="icon-item">
    <ClipboardIcon />
    <span class="icon-name">ClipboardIcon</span>
  </div>
  <div class="icon-item">
    <ScissorsIcon />
    <span class="icon-name">ScissorsIcon</span>
  </div>
  <div class="icon-item">
    <PaletteIcon />
    <span class="icon-name">PaletteIcon</span>
  </div>
</div>

::: details 查看所有编辑图标

- `EditIcon` - 编辑
- `Edit2Icon` - 编辑2
- `Edit3Icon` - 编辑3
- `DeleteIcon` / `TrashIcon` - 删除
- `Trash2Icon` - 删除2
- `SaveIcon` - 保存
- `CopyIcon` - 复制
- `ClipboardIcon` - 剪贴板
- `ClipboardCheckIcon` - 复制成功
- `ScissorsIcon` - 剪切
- `PaletteIcon` - 调色板
- `BrushIcon` - 画笔
- `PenToolIcon` - 钢笔工具
- `HighlighterIcon` - 高亮
- `TypeIcon` - 文字
- `BoldIcon` - 粗体
- `ItalicIcon` - 斜体
- `UnderlineIcon` - 下划线
- `AlignLeftIcon` - 左对齐
- `AlignCenterIcon` - 居中对齐
- `AlignRightIcon` - 右对齐
- `AlignJustifyIcon` - 两端对齐
- `ColumnsIcon` - 列

:::

## 🧭 导航 (47 icons)

方向、导航和控制相关的图标。

[继续列出其他分类...]

## 💬 使用示例

### Vue 3

```vue
<template>
  <div>
    <HomeIcon />
    <SearchIcon size="24" color="#3b82f6" />
  </div>
</template>

<script setup lang="ts">
import { HomeIcon, SearchIcon } from '@ldesign/icons/vue'
</script>
```

### React

```tsx
import { HomeIcon, SearchIcon } from '@ldesign/icons/react'

function App() {
  return (
    <div>
      <HomeIcon />
      <SearchIcon size={24} color="#3b82f6" />
    </div>
  )
}
```

### Lit / Web Components

```html
<script type="module">
  import '@ldesign/icons/lit'
</script>

<ld-icon-home></ld-icon-home>
<ld-icon-search size="24" color="#3b82f6"></ld-icon-search>
```

## 下一步

- [快速开始](/guide/getting-started) - 学习如何使用图标
- [组件文档](/components/vue) - 查看组件 API
- [示例](/examples/) - 查看更多示例

