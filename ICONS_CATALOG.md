# Icons Catalog

> Complete catalog of all 347+ icons in @ldesign/icons

## 📊 Icon Statistics

- **Total Icons**: 347
- **Categories**: 10
- **Frameworks**: Vue 3, React, Lit (Web Components)
- **Source**: Lucide Icons + Custom

## 📂 Categories

### 🏠 General (42 icons)

Common UI elements and symbols.

- ampersand, asterisk, at-sign, award, bookmark
- circle, command, crown, diamond, dot
- equal, eye, eye-off, flag, gem
- hash, heart, hexagon, home, key
- list, lock, medal, menu, minus
- octagon, percent, plus, search, settings
- shield, slash, square, star, tag
- tags, toggle-left, toggle-right, triangle, trophy
- user, users

### ✏️ Editing (23 icons)

Editing and modification actions.

- clipboard, clipboard-check, clipboard-copy, clipboard-list
- copy, crop, delete, edit, eraser
- hand, highlighter, move, paintbrush, palette
- pen-line, pen-tool, pencil, pipette
- save, scissors, trash, trash-2, wand

### 🧭 Navigation (47 icons)

Navigation, arrows, and directional elements.

- arrow-down, arrow-down-left, arrow-down-right
- arrow-left, arrow-right, arrow-up
- arrow-up-left, arrow-up-right
- chevron-down, chevron-left, chevron-right, chevron-up
- chevrons-down, chevrons-left, chevrons-right, chevrons-up
- compass, corner-down-left, corner-down-right
- corner-left-down, corner-left-up
- corner-right-down, corner-right-up
- corner-up-left, corner-up-right
- crosshair, expand, focus, fullscreen
- locate, locate-fixed, map, map-pin
- maximize, minimize, move-diagonal
- move-horizontal, move-vertical
- navigation, pin, pin-off
- scan, scan-line, shrink, target
- zoom-in, zoom-out

### 🎵 Media (35 icons)

Media, music, and video elements.

- aperture, camera, camera-off
- fast-forward, film, focus
- headphones, image, images, instagram
- mic, mic-off, music, music-2, music-3, music-4
- pause, play, podcast, radio
- repeat, repeat-1, rewind, shuffle
- skip-back, skip-forward, speaker
- twitch, video, video-off
- volume, volume-1, volume-2, volume-x
- youtube

### ✅ Status (46 icons)

Status indicators and system states.

- check, close, download, heart
- loading, star, upload
- (and 39 more status and connectivity icons)

### 📄 File (36 icons)

File and folder operations.

- file, file-text, file-plus, file-minus
- file-check, file-x, file-search, file-edit
- folder, folder-plus, folder-minus
- archive, box, package, inbox
- (and 22 more file-related icons)

### 💬 Communication (33 icons)

Communication and messaging.

- mail, inbox, send, send-horizontal
- message-circle, message-square
- phone, phone-call, phone-incoming
- phone-outgoing, phone-missed
- bell, bell-off, bell-ring
- share, share-2, rss, megaphone
- (and 15 more communication icons)

### 💼 Business (30 icons)

Business and productivity.

- briefcase, calendar, clock, timer
- trending-up, trending-down
- bar-chart, line-chart, pie-chart
- dollar-sign, credit-card, wallet
- shopping-cart, shopping-bag, store
- building, warehouse, factory
- (and 14 more business icons)

### 🌤️ Weather (23 icons)

Weather and climate.

- sun, moon, sunrise, sunset
- cloud, cloud-drizzle, cloud-rain
- cloud-snow, cloud-lightning, cloud-fog
- wind, snowflake, thermometer
- droplet, umbrella, rainbow
- (and 7 more weather icons)

### 💻 Devices (32 icons)

Electronic devices and technology.

- smartphone, tablet, laptop, monitor
- tv, watch, airplay, cast
- printer, keyboard, mouse, gamepad
- cpu, hard-drive, usb, bluetooth
- wifi, antenna, satellite, router
- disc, database, server, terminal
- (and 10 more device icons)

## 🎨 Icon Properties

All icons support the following props:

### Common Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `number \| string` | `'1em'` | Icon size |
| `color` | `string` | `'currentColor'` | Icon color |
| `strokeWidth` | `number` | `2` | Stroke width (for stroke icons) |
| `spin` | `boolean` | `false` | Enable rotation animation |
| `rotate` | `number` | `0` | Rotation angle in degrees |
| `flip` | `'horizontal' \| 'vertical' \| 'both'` | - | Flip direction |

### Framework-Specific Props

**Vue**: Accepts all standard HTML attributes, `class`, `style`, event listeners

**React**: Accepts all SVG attributes, `className`, `style`, `ref`

**Lit**: Accepts all standard web component attributes

## 📦 Usage Examples

### Vue 3

```vue
<template>
  <HomeIcon size="24" color="#1890ff" />
  <SearchIcon :strokeWidth="2.5" />
  <LoadingIcon :spin="true" />
</template>

<script setup>
import { HomeIcon, SearchIcon, LoadingIcon } from '@ldesign/icons/vue'
</script>
```

### React

```tsx
import { HomeIcon, SearchIcon, LoadingIcon } from '@ldesign/icons/react'

function App() {
  return (
    <>
      <HomeIcon size={24} color="#1890ff" />
      <SearchIcon strokeWidth={2.5} />
      <LoadingIcon spin />
    </>
  )
}
```

### Lit / Web Components

```html
<script type="module">
  import '@ldesign/icons/lit'
</script>

<ld-icon-home size="24" color="#1890ff"></ld-icon-home>
<ld-icon-search stroke-width="2.5"></ld-icon-search>
<ld-icon-loading spin></ld-icon-loading>
```

## 🔍 Search & Discovery

### By Name

Icons are named using kebab-case in SVG files and PascalCase in components:

- SVG: `arrow-right.svg`
- Vue/React: `ArrowRightIcon`
- Lit: `<ld-icon-arrow-right>`

### By Category

Browse icons by category in the [interactive demo](./examples/vue-demo):

```bash
cd examples/vue-demo
npm install
npm run dev
```

### By Tags

Each icon includes searchable tags in `metadata.json`:

```json
{
  "name": "home",
  "componentName": "Home",
  "category": "general",
  "tags": ["house", "main", "start", "homepage"]
}
```

## 📚 Additional Resources

- [Usage Guide](./docs/USAGE.md) - Detailed API and examples
- [Development Guide](./docs/DEVELOPMENT.md) - Contributing guidelines
- [Migration Guide](./MIGRATION_GUIDE.md) - Migrate from other icon libraries
- [Customization Guide](./CUSTOMIZATION.md) - Add custom icons

## 📄 License

MIT © LDesign Team


