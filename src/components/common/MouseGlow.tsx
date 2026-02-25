import { useEffect, useState, useCallback } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

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
 * 全局鼠标跟随光晕组件 - 增强版
 * 使用 Framer Motion 的 spring 动画实现平滑跟随效果
 * 新增：多层光晕、速度感应、涟漪效果
 */
export function MouseGlow({
  color = 'rgba(139, 92, 246, 0.15)',
  size = 450,
  enableBreathing = true,
  opacity = 1,
}: MouseGlowProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [velocity, setVelocity] = useState({ x: 0, y: 0 });
  
  // 使用 motion values 跟踪鼠标位置
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // 跟踪上一次位置用于计算速度
  const prevX = useMotionValue(0);
  const prevY = useMotionValue(0);

  // 快速跟随层 - 紧跟鼠标
  const fastSpringConfig = { damping: 20, stiffness: 300, mass: 0.3 };
  const fastX = useSpring(mouseX, fastSpringConfig);
  const fastY = useSpring(mouseY, fastSpringConfig);

  // 中速跟随层 - 略有延迟
  const mediumSpringConfig = { damping: 25, stiffness: 150, mass: 0.5 };
  const mediumX = useSpring(mouseX, mediumSpringConfig);
  const mediumY = useSpring(mouseY, mediumSpringConfig);

  // 慢速跟随层 - 更大延迟，创造拖尾效果
  const slowSpringConfig = { damping: 30, stiffness: 80, mass: 0.8 };
  const slowX = useSpring(mouseX, slowSpringConfig);
  const slowY = useSpring(mouseY, slowSpringConfig);

  // 基于速度调整大小
  const dynamicScale = useTransform(
    [fastX, fastY],
    ([latestX, latestY]: number[]) => {
      const speed = Math.sqrt(velocity.x ** 2 + velocity.y ** 2);
      return 1 + Math.min(speed * 0.0005, 0.3);
    }
  );

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const newX = e.clientX - size / 2;
    const newY = e.clientY - size / 2;
    
    // 计算速度
    const dx = newX - prevX.get();
    const dy = newY - prevY.get();
    setVelocity({ x: dx, y: dy });
    
    prevX.set(newX);
    prevY.set(newY);
    mouseX.set(newX);
    mouseY.set(newY);
    
    if (!isVisible) setIsVisible(true);
  }, [mouseX, mouseY, prevX, prevY, size, isVisible]);

  useEffect(() => {
    // 检测是否为触摸设备
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    // 初始化位置
    mouseX.set(window.innerWidth / 2 - size / 2);
    mouseY.set(window.innerHeight / 2 - size / 2);
    prevX.set(window.innerWidth / 2 - size / 2);
    prevY.set(window.innerHeight / 2 - size / 2);

    window.addEventListener('mousemove', handleMouseMove);
    
    // 鼠标离开窗口时隐藏
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);
    
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [handleMouseMove, mouseX, mouseY, prevX, prevY, size]);

  // 触摸设备上不渲染
  if (typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0)) {
    return null;
  }

  return (
    <>
      {/* 第一层：最外层大光晕 - 慢速跟随 */}
      <motion.div
        className="fixed pointer-events-none z-[1]"
        style={{
          width: size * 1.5,
          height: size * 1.5,
          x: slowX,
          y: slowY,
          marginLeft: -size * 0.25,
          marginTop: -size * 0.25,
          opacity: isVisible ? opacity * 0.4 : 0,
        }}
        transition={{ opacity: { duration: 0.3 } }}
      >
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: `radial-gradient(circle at center, rgba(139, 92, 246, 0.06) 0%, rgba(236, 72, 153, 0.03) 40%, transparent 70%)`,
          }}
          animate={enableBreathing ? {
            scale: [1, 1.08, 1],
            opacity: [0.5, 0.8, 0.5],
          } : undefined}
          transition={enableBreathing ? {
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          } : undefined}
        />
      </motion.div>

      {/* 第二层：中层光晕 - 中速跟随 */}
      <motion.div
        className="fixed pointer-events-none z-[2]"
        style={{
          width: size,
          height: size,
          x: mediumX,
          y: mediumY,
          opacity: isVisible ? opacity * 0.7 : 0,
        }}
        transition={{ opacity: { duration: 0.2 } }}
      >
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: `radial-gradient(circle at center, ${color} 0%, rgba(236, 72, 153, 0.08) 40%, transparent 70%)`,
          }}
          animate={enableBreathing ? {
            scale: [1, 1.12, 1],
            opacity: [0.7, 1, 0.7],
          } : undefined}
          transition={enableBreathing ? {
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          } : undefined}
        />
      </motion.div>

      {/* 第三层：核心光晕 - 快速跟随 */}
      <motion.div
        className="fixed pointer-events-none z-[3]"
        style={{
          width: size * 0.6,
          height: size * 0.6,
          x: fastX,
          y: fastY,
          marginLeft: size * 0.2,
          marginTop: size * 0.2,
          opacity: isVisible ? opacity : 0,
          scale: dynamicScale,
        }}
        transition={{ opacity: { duration: 0.15 } }}
      >
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: `radial-gradient(circle at center, rgba(167, 139, 250, 0.25) 0%, rgba(139, 92, 246, 0.12) 40%, transparent 70%)`,
          }}
          animate={enableBreathing ? {
            scale: [1, 1.15, 1],
            opacity: [0.8, 1, 0.8],
          } : undefined}
          transition={enableBreathing ? {
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          } : undefined}
        />
        
        {/* 高亮核心点 */}
        <motion.div
          className="absolute rounded-full"
          style={{
            width: '30%',
            height: '30%',
            left: '35%',
            top: '35%',
            background: `radial-gradient(circle at center, rgba(255, 255, 255, 0.15) 0%, rgba(167, 139, 250, 0.1) 50%, transparent 70%)`,
          }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </motion.div>

      {/* 第四层：鼠标指针光点 - 即时跟随 */}
      <motion.div
        className="fixed pointer-events-none z-[4]"
        style={{
          width: 8,
          height: 8,
          x: mouseX,
          y: mouseY,
          marginLeft: size / 2 - 4,
          marginTop: size / 2 - 4,
          opacity: isVisible ? 0.9 : 0,
        }}
        transition={{ opacity: { duration: 0.1 } }}
      >
        <motion.div
          className="absolute inset-0 rounded-full bg-white/30"
          style={{
            boxShadow: '0 0 15px rgba(167, 139, 250, 0.6), 0 0 30px rgba(139, 92, 246, 0.4)',
          }}
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </motion.div>
    </>
  );
}

export default MouseGlow;
