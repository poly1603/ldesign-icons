import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@ldesign/icons/react': resolve(__dirname, '../../src/react/index.tsx'),
    },
  },
  server: {
    host: true,
    port: 5003,
    open: false,
  }
})



