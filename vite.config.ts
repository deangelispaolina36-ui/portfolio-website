import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: '0.0.0.0',
    allowedHosts: true
  },
  build: {
    // 启用 CSS 代码分割
    cssCodeSplit: true,
    // 生成 sourcemap 方便调试
    sourcemap: false,
    // 优化构建大小
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // 移除 console.log
        drop_debugger: true, // 移除 debugger
      },
    },
    // 分割代码块
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom'],
          'vendor-motion': ['framer-motion'],
          'vendor-icons': ['lucide-react'],
        },
      },
    },
    // 资源内联阈值
    assetsInlineLimit: 4096,
    // chunk 大小警告阈值
    chunkSizeWarningLimit: 1000,
  },
})
