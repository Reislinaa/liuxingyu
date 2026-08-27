import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages 子路径: 通过环境变量 VITE_BASE 设置
// 例如: VITE_BASE=/liuxingyu/  → 部署在 https://xxx.github.io/liuxingyu/
// 默认根路径（用于自定义域名或本地预览）
const base = process.env.VITE_BASE || './'

export default defineConfig({
  base,
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true
      }
    }
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  }
})