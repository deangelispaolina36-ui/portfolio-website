import { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface MouseGlowProps {
  /** 光晕颜色，默认紫色 */
  color?: string;
  /** 光晕大小，默认 400px */
  size?: number;
  /** 是否启用呼吸动画 */
  enableBreathing?: boolean;
  /** 光晕不透明度 */
  opacity?: number;
}

/**
 * 全局鼠标跟随光晕组件
 * 使用 Framer Motion 的 spring 动画实现平滑跟随效果
 */
export function MouseGlow({
  color = 'rgba(139, 92, 246, 0.12)',
  size = 500,
  enableBreathing = true,
  opacity = 1,
}: MouseGlowProps) {
  // 使用 motion values 跟踪鼠标位置
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // 使用 spring 动画使跟随更加平滑
  const springConfig = { damping: 25, stiffness: 150, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // 检测是否为触摸设备，触摸设备上不显示鼠标光晕
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - size / 2);
      mouseY.set(e.clientY - size / 2);
    };

    // 初始化位置到屏幕中心
    mouseX.set(window.innerWidth / 2 - size / 2);
    mouseY.set(window.innerHeight / 2 - size / 2);

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY, size]);

  // 触摸设备上不渲染
  if (typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0)) {
    return null;
  }

  return (
    <motion.div
      className="fixed pointer-events-none z-[1]"
      style={{
        width: size,
        height: size,
        x: smoothX,
        y: smoothY,
        opacity,
      }}
    >
      {/* 主光晕 */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: `radial-gradient(circle at center, ${color} 0%, transparent 70%)`,
        }}
        animate={enableBreathing ? {
          scale: [1, 1.1, 1],
          opacity: [0.8, 1, 0.8],
        } : undefined}
        transition={enableBreathing ? {
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        } : undefined}
      />
      
      {/* 内层高亮核心 */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: size * 0.3,
          height: size * 0.3,
          left: '50%',
          top: '50%',
          marginLeft: -(size * 0.15),
          marginTop: -(size * 0.15),
          background: `radial-gradient(circle at center, ${color.replace(/[\d.]+\)$/, '0.2)')} 0%, transparent 70%)`,
        }}
        animate={enableBreathing ? {
          scale: [1, 1.2, 1],
          opacity: [0.6, 1, 0.6],
        } : undefined}
        transition={enableBreathing ? {
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        } : undefined}
      />
    </motion.div>
  );
}

export default MouseGlow;
