import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// 静默处理 Service Worker 注册错误（通常是外部脚本或浏览器插件引起）
const originalRegister = navigator.serviceWorker?.register;
if (originalRegister) {
  navigator.serviceWorker.register = function(...args) {
    return originalRegister.apply(this, args).catch((error: any) => {
      // 只在控制台输出，不影响页面功能
      if (error.name === 'InvalidStateError') {
        console.warn('Service Worker registration blocked by browser state:', error.message);
      } else {
        console.error('Service Worker registration failed:', error);
      }
      // 返回成功状态避免 Promise reject
      return { success: false } as any;
    });
  };
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
