import { useEffect, useCallback, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';

interface MouseGlowProps {
  /** 主光晕颜色 */
  primaryColor?: string;
  /** 次要光晕颜色 */
  secondaryColor?: string;
  /** 光晕大小 */
  size?: number;
}

/**
 * 稳定流畅的鼠标跟随光效
 * - 多层柔和光晕，自然渐变
 * - 高性能 RAF 更新
 * - 平滑的弹性物理跟随
 * - 所有页面持续生效
 */
export function MouseGlow({
  primaryColor = 'rgba(139, 92, 246, 0.15)',
  secondaryColor = 'rgba(236, 72, 153, 0.1)',
  size = 400,
}: MouseGlowProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const rafId = useRef<number>();
  const lastUpdateTime = useRef(0);
  
  // 鼠标原始位置
  const mouseX = useMotionValue(typeof window !== 'undefined' ? window.innerWidth / 2 : 0);
  const mouseY = useMotionValue(typeof window !== 'undefined' ? window.innerHeight / 2 : 0);
  
  // 最外层光晕 - 最慢、最柔和的跟随
  const outerSpringConfig = { 
    damping: 40, 
    stiffness: 50, 
    mass: 1,
    restDelta: 0.001 
  };
  const outerX = useSpring(mouseX, outerSpringConfig);
  const outerY = useSpring(mouseY, outerSpringConfig);
  
  // 主光晕层 - 中等速度跟随
  const mainSpringConfig = { 
    damping: 30, 
    stiffness: 100, 
    mass: 0.6,
    restDelta: 0.001 
  };
  const mainX = useSpring(mouseX, mainSpringConfig);
  const mainY = useSpring(mouseY, mainSpringConfig);
  
  // 内层光晕 - 较快跟随
  const innerSpringConfig = { 
    damping: 25, 
    stiffness: 150, 
    mass: 0.4,
    restDelta: 0.001 
  };
  const innerX = useSpring(mouseX, innerSpringConfig);
  const innerY = useSpring(mouseY, innerSpringConfig);
  
  // 核心亮点 - 即时跟随
  const coreSpringConfig = { 
    damping: 20, 
    stiffness: 300, 
    mass: 0.2,
    restDelta: 0.001 
  };
  const coreX = useSpring(mouseX, coreSpringConfig);
  const coreY = useSpring(mouseY, coreSpringConfig);

  // 可见性动画
  const visibilityValue = useMotionValue(0);
  const smoothVisibility = useSpring(visibilityValue, { 
    damping: 25, 
    stiffness: 120 
  });

  // 高性能鼠标移动处理
  const handleMouseMove = useCallback((e: MouseEvent) => {
    const now = performance.now();
    
    // 节流：至少间隔 8ms（约 120fps）
    if (now - lastUpdateTime.current < 8) {
      return;
    }
    lastUpdateTime.current = now;

    if (rafId.current) {
      cancelAnimationFrame(rafId.current);
    }
    
    rafId.current = requestAnimationFrame(() => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      
      if (!isVisible) {
        setIsVisible(true);
        visibilityValue.set(1);
      }
    });
  }, [mouseX, mouseY, visibilityValue, isVisible]);

  const handleMouseLeave = useCallback(() => {
    setIsVisible(false);
    visibilityValue.set(0);
  }, [visibilityValue]);

  const handleMouseEnter = useCallback(() => {
    setIsVisible(true);
    visibilityValue.set(1);
  }, [visibilityValue]);

  // 初始化和事件监听
  useEffect(() => {
    setIsMounted(true);
    
    // 检测触摸设备
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    // 初始化位置到屏幕中心
    mouseX.set(window.innerWidth / 2);
    mouseY.set(window.innerHeight / 2);

    // 添加事件监听
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    
    // 监听滚动时保持光效
    const handleScroll = () => {
      // 滚动时保持可见
      if (isVisible) {
        visibilityValue.set(1);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('scroll', handleScroll);
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [handleMouseMove, handleMouseLeave, handleMouseEnter, mouseX, mouseY, visibilityValue, isVisible]);

  // 服务端渲染或触摸设备不渲染
  if (!isMounted) return null;
  if (typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0)) {
    return null;
  }

  return (
    <AnimatePresence>
      {/* 最外层 - 环境光晕（最大、最慢） */}
      <motion.div
        className="fixed pointer-events-none"
        style={{
          width: size * 2,
          height: size * 2,
          x: outerX,
          y: outerY,
          translateX: '-50%',
          translateY: '-50%',
          opacity: smoothVisibility,
          zIndex: 9990,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div 
          className="w-full h-full rounded-full"
          style={{
            background: `radial-gradient(circle at center, 
              rgba(139, 92, 246, 0.03) 0%, 
              rgba(99, 102, 241, 0.02) 30%, 
              transparent 60%
            )`,
            filter: 'blur(60px)',
          }}
        />
      </motion.div>

      {/* 外层 - 大光晕 */}
      <motion.div
        className="fixed pointer-events-none"
        style={{
          width: size * 1.5,
          height: size * 1.5,
          x: outerX,
          y: outerY,
          translateX: '-50%',
          translateY: '-50%',
          opacity: smoothVisibility,
          zIndex: 9991,
        }}
      >
        <div 
          className="w-full h-full rounded-full"
          style={{
            background: `radial-gradient(circle at center, 
              ${secondaryColor} 0%, 
              rgba(99, 102, 241, 0.04) 35%, 
              transparent 65%
            )`,
            filter: 'blur(45px)',
          }}
        />
      </motion.div>

      {/* 主光晕层 */}
      <motion.div
        className="fixed pointer-events-none"
        style={{
          width: size,
          height: size,
          x: mainX,
          y: mainY,
          translateX: '-50%',
          translateY: '-50%',
          opacity: smoothVisibility,
          zIndex: 9992,
        }}
      >
        <div 
          className="w-full h-full rounded-full"
          style={{
            background: `radial-gradient(circle at center, 
              ${primaryColor} 0%, 
              ${secondaryColor} 40%, 
              transparent 70%
            )`,
            filter: 'blur(35px)',
          }}
        />
      </motion.div>

      {/* 内层聚焦光晕 */}
      <motion.div
        className="fixed pointer-events-none"
        style={{
          width: size * 0.45,
          height: size * 0.45,
          x: innerX,
          y: innerY,
          translateX: '-50%',
          translateY: '-50%',
          opacity: smoothVisibility,
          zIndex: 9993,
        }}
      >
        <div 
          className="w-full h-full rounded-full"
          style={{
            background: `radial-gradient(circle at center, 
              rgba(167, 139, 250, 0.2) 0%, 
              rgba(139, 92, 246, 0.1) 50%, 
              transparent 80%
            )`,
            filter: 'blur(20px)',
          }}
        />
      </motion.div>

      {/* 核心光点 */}
      <motion.div
        className="fixed pointer-events-none"
        style={{
          width: size * 0.15,
          height: size * 0.15,
          x: coreX,
          y: coreY,
          translateX: '-50%',
          translateY: '-50%',
          opacity: smoothVisibility,
          zIndex: 9994,
        }}
      >
        <div 
          className="w-full h-full rounded-full"
          style={{
            background: `radial-gradient(circle at center, 
              rgba(199, 183, 255, 0.25) 0%, 
              rgba(167, 139, 250, 0.15) 50%, 
              transparent 80%
            )`,
            filter: 'blur(10px)',
          }}
        />
      </motion.div>

      {/* 中心亮点 - 最小、最快 */}
      <motion.div
        className="fixed pointer-events-none"
        style={{
          width: 8,
          height: 8,
          x: coreX,
          y: coreY,
          translateX: '-50%',
          translateY: '-50%',
          opacity: smoothVisibility,
          zIndex: 9995,
        }}
      >
        <div 
          className="w-full h-full rounded-full"
          style={{
            background: 'rgba(255, 255, 255, 0.5)',
            boxShadow: `
              0 0 6px rgba(199, 183, 255, 0.9),
              0 0 15px rgba(167, 139, 250, 0.6),
              0 0 30px rgba(139, 92, 246, 0.3),
              0 0 45px rgba(139, 92, 246, 0.15)
            `,
          }}
        />
      </motion.div>
    </AnimatePresence>
  );
}

export default MouseGlow;
