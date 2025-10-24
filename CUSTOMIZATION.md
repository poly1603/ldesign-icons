# Customization Guide

> Add, modify, and manage custom icons in @ldesign/icons

## 🎯 Overview

Learn how to:
- Add custom SVG icons
- Create icon variants
- Build custom icon sets
- Generate icon fonts
- Configure icon defaults

---

## 📦 Adding Custom Icons

### Method 1: Add SVG Files (Recommended)

1. **Place SVG in category folder**:

```bash
packages/icons/svg/custom/my-logo.svg
```

2. **Ensure SVG format**:

```xml
<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="currentColor" stroke-width="2"/>
  <path d="M2 17l10 5 10-5" stroke="currentColor" stroke-width="2"/>
  <path d="M2 12l10 5 10-5" stroke="currentColor" stroke-width="2"/>
</svg>
```

3. **Generate components**:

```bash
cd packages/icons
pnpm generate
```

4. **Use your icon**:

```vue
<template>
  <MyLogoIcon size="32" color="#1890ff" />
</template>

<script setup>
import { MyLogoIcon } from '@ldesign/icons/vue'
</script>
```

### Method 2: Runtime Custom Icons

Create icons at runtime without regenerating:

```typescript
import { createIcon } from '@ldesign/icons/utils'

export const CustomIcon = createIcon({
  name: 'custom-icon',
  viewBox: '0 0 24 24',
  path: 'M12 2L2 7l10 5 10-5-10-5z...',
  category: 'custom',
  tags: ['logo', 'brand']
})
```

---

## 🎨 SVG Optimization

### Recommended SVG Format

```xml
<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- Use currentColor for stroke/fill -->
  <path d="..." stroke="currentColor" stroke-width="2" 
        stroke-linecap="round" stroke-linejoin="round"/>
</svg>
```

### Best Practices

1. **viewBox**: Always use `0 0 24 24` for consistency
2. **Colors**: Use `currentColor` instead of fixed colors
3. **Stroke Width**: Use `2` as default (can be overridden)
4. **Simplify**: Remove unnecessary elements
5. **Optimize**: Run through SVGO

### Automatic Optimization

The build process automatically optimizes SVGs:

```bash
pnpm svg:optimize
```

This runs SVGO with these settings:

```javascript
{
  plugins: [
    'removeDoctype',
    'removeXMLProcInst',
    'removeComments',
    'removeMetadata',
    'removeEditorsNSData',
    'cleanupAttrs',
    'mergeStyles',
    'inlineStyles',
    'minifyStyles',
    'cleanupIDs',
    'removeUselessDefs',
    'cleanupNumericValues',
    'convertColors',
    'removeUnknownsAndDefaults',
    'removeNonInheritableGroupAttrs',
    'removeUselessStrokeAndFill',
    'removeViewBox',
    'cleanupEnableBackground',
    'removeHiddenElems',
    'removeEmptyText',
    'convertShapeToPath',
    'convertEllipseToCircle',
    'moveElemsAttrsToGroup',
    'moveGroupAttrsToElems',
    'collapseGroups',
    'convertPathData',
    'convertTransform',
    'removeEmptyAttrs',
    'removeEmptyContainers',
    'mergePaths',
    'removeUnusedNS',
    'sortAttrs',
    'sortDefsChildren',
    'removeTitle',
    'removeDesc'
  ]
}
```

---

## 🏗️ Creating Icon Variants

### Fill vs Stroke Icons

Create both fill and stroke variants:

```bash
# Stroke version
svg/general/heart.svg

# Fill version  
svg/general/heart-filled.svg
```

The generator automatically detects icon type:

```typescript
// Stroke icon (default)
{
  isStroke: true,
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2
}

// Fill icon (detected)
{
  isStroke: false,
  fill: 'currentColor',
  stroke: 'none'
}
```

### Size Variants

No need for separate files - use the `size` prop:

```vue
<HomeIcon size="16" />  <!-- Small -->
<HomeIcon size="24" />  <!-- Medium -->
<HomeIcon size="32" />  <!-- Large -->
<HomeIcon size="48" />  <!-- XL -->
```

---

## 🎭 Custom Icon Sets

### Create a Brand Icon Set

1. **Create category folder**:

```bash
mkdir packages/icons/svg/brand
```

2. **Add brand SVGs**:

```bash
svg/brand/
  ├── logo.svg
  ├── logo-text.svg
  ├── logo-icon.svg
  └── wordmark.svg
```

3. **Generate**:

```bash
pnpm generate
```

4. **Export as a set**:

```typescript
// src/brand/index.ts
export { LogoIcon } from '../vue/icons/Logo'
export { LogoTextIcon } from '../vue/icons/LogoText'
export { LogoIconIcon } from '../vue/icons/LogoIcon'
export { WordmarkIcon } from '../vue/icons/Wordmark'

// Usage
import * as BrandIcons from '@ldesign/icons/brand'
```

---

## 🔧 Icon Configuration

### Global Configuration

Set global defaults for all icons:

```typescript
import { setIconConfig } from '@ldesign/icons/utils'

setIconConfig({
  defaultSize: '20px',
  defaultColor: '#333',
  defaultStrokeWidth: 1.5,
  classPrefix: 'my-icon'
})
```

### Per-Icon Configuration

Override defaults per icon:

```vue
<template>
  <HomeIcon
    size="24"
    color="#1890ff"
    :strokeWidth="2.5"
    :spin="isLoading"
    :rotate="45"
    flip="horizontal"
  />
</template>
```

---

## 🎪 Icon Fonts

Generate web fonts from your icons:

### Generate Fonts

```bash
pnpm generate:fonts
```

This creates:

```
packages/icons/fonts/
  ├── ldesign-icons.ttf
  ├── ldesign-icons.woff
  ├── ldesign-icons.woff2
  ├── ldesign-icons.eot
  ├── ldesign-icons.css
  └── preview.html
```

### Use Icon Fonts

```html
<link rel="stylesheet" href="@ldesign/icons/fonts/ldesign-icons.css">

<i class="ld-icon-home"></i>
<i class="ld-icon-search"></i>
```

```css
.custom-icon {
  font-family: 'ldesign-icons';
  font-style: normal;
  font-weight: normal;
  line-height: 1;
}

.custom-icon::before {
  content: '\e001'; /* Icon unicode */
}
```

---

## 🔍 Icon Metadata

### Add Custom Metadata

Extend icon metadata for better searchability:

```typescript
// scripts/metadata-custom.ts
import type { IconMetadata } from '../src/types'

export const customMetadata: Record<string, Partial<IconMetadata>> = {
  'my-logo': {
    tags: ['brand', 'logo', 'company', 'identity'],
    aliases: ['brand', 'company-logo'],
    category: 'brand'
  }
}
```

### Use Metadata

```typescript
import { iconRegistry } from '@ldesign/icons/utils'

// Search by tag
const results = iconRegistry.search('logo')

// Get icon info
const info = iconRegistry.get('my-logo')
```

---

## 🎨 Styling Icons

### CSS Customization

```css
/* Global icon styles */
.ld-icon {
  display: inline-block;
  vertical-align: middle;
  transition: all 0.3s ease;
}

.ld-icon:hover {
  transform: scale(1.1);
}

/* Specific icon */
.ld-icon.ld-icon-home {
  color: #1890ff;
}

/* Dark mode */
@media (prefers-color-scheme: dark) {
  .ld-icon {
    color: #e5e7eb;
  }
}
```

### Tailwind CSS

```vue
<HomeIcon class="w-6 h-6 text-blue-500 hover:text-blue-700" />
<SearchIcon class="w-5 h-5 text-gray-400 dark:text-gray-300" />
```

### CSS-in-JS

```tsx
import styled from 'styled-components'
import { HomeIcon } from '@ldesign/icons/react'

const StyledIcon = styled(HomeIcon)`
  color: ${props => props.theme.primary};
  transition: all 0.3s;
  
  &:hover {
    color: ${props => props.theme.primaryHover};
    transform: scale(1.1);
  }
`
```

---

## 🔄 Dynamic Icons

### Icon Selector Component

```vue
<template>
  <component :is="iconComponents[iconName]" v-bind="iconProps" />
</template>

<script setup>
import * as Icons from '@ldesign/icons/vue'

const props = defineProps({
  iconName: String,
  size: { type: [Number, String], default: 24 },
  color: String
})

const iconComponents = Icons
const iconProps = computed(() => ({
  size: props.size,
  color: props.color
}))
</script>
```

### Dynamic Imports

```typescript
// Load icons on demand
async function loadIcon(name: string) {
  const module = await import(`@ldesign/icons/vue/icons/${name}`)
  return module[`${name}Icon`]
}

// Usage
const HomeIcon = await loadIcon('Home')
```

---

## 📊 Icon Registry

### Register Custom Icons

```typescript
import { iconRegistry, createIcon } from '@ldesign/icons/utils'

const customIcon = createIcon({
  name: 'custom',
  viewBox: '0 0 24 24',
  path: 'M...',
  category: 'custom',
  tags: ['special']
})

iconRegistry.register('custom', customIcon)
```

### List All Icons

```typescript
const allIcons = iconRegistry.list()
console.log(`Total icons: ${allIcons.length}`)

// Search
const searchResults = iconRegistry.search('home')

// Check existence
if (iconRegistry.has('home')) {
  const icon = iconRegistry.get('home')
}
```

---

## 🧪 Testing Custom Icons

### Visual Testing

```bash
# Start demo app
cd examples/vue-demo
npm run dev
```

### Unit Testing

```typescript
import { mount } from '@vue/test-utils'
import { MyCustomIcon } from '@ldesign/icons/vue'

describe('MyCustomIcon', () => {
  it('renders correctly', () => {
    const wrapper = mount(MyCustomIcon, {
      props: { size: 24, color: '#ff0000' }
    })
    
    const svg = wrapper.find('svg')
    expect(svg.exists()).toBe(true)
    expect(svg.attributes('width')).toBe('24px')
    expect(svg.attributes('fill')).toBe('#ff0000')
  })
})
```

---

## 📦 Distribution

### Publish Custom Icon Package

```json
{
  "name": "@mycompany/icons",
  "version": "1.0.0",
  "dependencies": {
    "@ldesign/icons": "^0.1.0"
  },
  "exports": {
    "./vue": "./dist/vue/index.js",
    "./react": "./dist/react/index.js"
  }
}
```

### Re-export with Custom Icons

```typescript
// src/index.ts
export * from '@ldesign/icons/vue'
export { MyCustomIcon } from './custom/MyCustomIcon'
```

---

## 🎯 Best Practices

### ✅ Do's

- Use `viewBox="0 0 24 24"` for consistency
- Use `currentColor` for dynamic coloring
- Keep SVG paths simple and optimized
- Add meaningful tags for searchability
- Test icons in dark mode
- Optimize before committing

### ❌ Don'ts

- Don't use fixed colors in SVG
- Don't use complex gradients or effects
- Don't make files too large (>5KB)
- Don't use raster images
- Don't forget to run generation
- Don't skip optimization

---

## 🆘 Troubleshooting

### Icon Not Generating

Check:
1. SVG is in correct category folder
2. SVG is valid XML
3. viewBox is present
4. No syntax errors in paths

### Icon Looks Wrong

Check:
1. viewBox is `0 0 24 24`
2. Paths use `currentColor`
3. strokeWidth is consistent
4. SVG is optimized

### Build Fails

```bash
# Clean and rebuild
pnpm clean
pnpm generate
pnpm build
```

---

## 📚 Resources

- [Icon Catalog](./ICONS_CATALOG.md) - All available icons
- [Usage Guide](./docs/USAGE.md) - API documentation
- [Development Guide](./docs/DEVELOPMENT.md) - Contributing
- [Migration Guide](./MIGRATION_GUIDE.md) - From other libraries

---

**Happy customizing!** 🎨


