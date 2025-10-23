import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@ldesign/icons/vue': resolve(__dirname, '../../src/vue/index.ts'),
    },
  },
  server: {
    host: true,
    port: 5004,
    open: false,
  },
})



