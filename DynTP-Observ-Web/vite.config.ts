import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    host: '0.0.0.0', // 监听 IP，允许局域网访问
    port: 80,      // 前端端口
    strictPort: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8081', // 后端地址
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})
