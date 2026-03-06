import { useEffect, useState, useRef, useMemo, useCallback } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';

/**
 * 增强版科技感背景组件
 * 特性：
 * - 鼠标交互响应 - 光球跟随鼠标移动
 * - 滚动视差 - 多层不同速度移动
 * - 动态光线 - 扫描线和脉冲效果
 * - 粒子系统 - 浮动发光粒子
 * - 霓虹网格 - 呼吸发光效果
 */
export function TechBackground() {
  const [windowHeight, setWindowHeight] = useState(0);
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // 鼠标位置
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const { scrollY } = useScroll();
  
  // 平滑鼠标跟随
  const smoothMouseX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  // 平滑滚动值
  const smoothScrollY = useSpring(scrollY, {
    stiffness: 50,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    setWindowHeight(window.innerHeight);
    setMounted(true);
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 鼠标移动处理
  const handleMouseMove = useCallback((e: MouseEvent) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  }, [mouseX, mouseY]);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  // 背景透明度 - 与 Hero 背景消失同步
  const backgroundOpacity = useTransform(
    smoothScrollY,
    [windowHeight * 0.2, windowHeight * 0.5],
    [0, 1]
  );

  // 多层视差效果 - 更大的移动范围
  const layer1Y = useTransform(smoothScrollY, [0, windowHeight * 5], [0, -300]);
  const layer2Y = useTransform(smoothScrollY, [0, windowHeight * 5], [0, -180]);
  const layer3Y = useTransform(smoothScrollY, [0, windowHeight * 5], [0, -100]);
  
  // 鼠标响应的光球位置
  const orb1TransformX = useTransform(smoothMouseX, [0, typeof window !== 'undefined' ? window.innerWidth : 1920], [-50, 50]);
  const orb1TransformY = useTransform(smoothMouseY, [0, typeof window !== 'undefined' ? window.innerHeight : 1080], [-30, 30]);
  const orb2TransformX = useTransform(smoothMouseX, [0, typeof window !== 'undefined' ? window.innerWidth : 1920], [30, -30]);
  const orb2TransformY = useTransform(smoothMouseY, [0, typeof window !== 'undefined' ? window.innerHeight : 1080], [20, -20]);

  // 生成粒子 - 减少数量，放慢速度
  const particles = useMemo(() => {
    return Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 2,
      duration: Math.random() * 8 + 12, // 放慢 3 倍
      delay: Math.random() * 10,
      color: ['#8B5CF6', '#EC4899', '#6366F1', '#06B6D4'][Math.floor(Math.random() * 4)],
    }));
  }, []);

  // 流星效果 - 减少数量，放慢速度
  const meteors = useMemo(() => {
    return Array.from({ length: 3 }, (_, i) => ({
      id: i,
      startX: Math.random() * 100,
      startY: Math.random() * 30,
      angle: 30 + Math.random() * 30,
      duration: 6 + Math.random() * 4, // 放慢 2-3 倍
      delay: i * 8 + Math.random() * 5,
    }));
  }, []);

  if (!mounted) return null;

  return (
    <motion.div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{
        opacity: backgroundOpacity,
        zIndex: 1,
      }}
    >
      {/* ===== 第1层：深邃渐变基底 + 动态颜色 ===== */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 50% 0%, rgba(99, 102, 241, 0.15) 0%, transparent 50%),
            radial-gradient(ellipse 60% 50% at 0% 50%, rgba(139, 92, 246, 0.12) 0%, transparent 50%),
            radial-gradient(ellipse 60% 50% at 100% 50%, rgba(236, 72, 153, 0.1) 0%, transparent 50%),
            radial-gradient(ellipse 80% 40% at 50% 100%, rgba(6, 182, 212, 0.08) 0%, transparent 50%),
            linear-gradient(180deg, #020617 0%, #0a0818 30%, #0f0a1a 50%, #0a0818 70%, #020617 100%)
          `,
        }}
      />

      {/* ===== 第2层：霓虹网格 - 呼吸发光 ===== */}
      <div className="absolute inset-0 grid-breathing">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="neon-grid" width="80" height="80" patternUnits="userSpaceOnUse">
              <path 
                d="M 80 0 L 0 0 0 80" 
                fill="none" 
                stroke="url(#grid-gradient)" 
                strokeWidth="0.5"
              />
            </pattern>
            <linearGradient id="grid-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.15" />
              <stop offset="50%" stopColor="#EC4899" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#6366F1" stopOpacity="0.15" />
            </linearGradient>
            <radialGradient id="grid-fade" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="white" stopOpacity="0.8" />
              <stop offset="70%" stopColor="white" stopOpacity="0.4" />
              <stop offset="100%" stopColor="white" stopOpacity="0.1" />
            </radialGradient>
            <mask id="grid-center-mask">
              <rect width="100%" height="100%" fill="url(#grid-fade)" />
            </mask>
          </defs>
          <rect 
            width="100%" 
            height="100%" 
            fill="url(#neon-grid)" 
            mask="url(#grid-center-mask)"
            className="animate-grid-pulse"
          />
        </svg>
      </div>

      {/* ===== 第3层：鼠标跟随主光球 ===== */}
      <motion.div 
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 'clamp(500px, 60vw, 800px)',
          height: 'clamp(500px, 60vw, 800px)',
          x: orb1TransformX,
          y: orb1TransformY,
          top: '5%',
          left: '-10%',
          background: `
            radial-gradient(circle, 
              rgba(139, 92, 246, 0.25) 0%, 
              rgba(99, 102, 241, 0.15) 30%,
              rgba(79, 70, 229, 0.05) 60%,
              transparent 80%
            )
          `,
          filter: 'blur(60px)',
        }}
      />
      
      <motion.div 
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 'clamp(400px, 50vw, 700px)',
          height: 'clamp(400px, 50vw, 700px)',
          x: orb2TransformX,
          y: orb2TransformY,
          top: '20%',
          right: '-5%',
          background: `
            radial-gradient(circle, 
              rgba(236, 72, 153, 0.2) 0%, 
              rgba(219, 39, 119, 0.1) 40%,
              transparent 70%
            )
          `,
          filter: 'blur(50px)',
        }}
      />

      {/* ===== 第4层：视差光球层 ===== */}
      <motion.div 
        className="absolute inset-0"
        style={{ y: layer1Y }}
      >
        {/* 青色动态光球 */}
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 'clamp(350px, 40vw, 550px)',
            height: 'clamp(350px, 40vw, 550px)',
            top: '40%',
            left: '20%',
            background: `
              radial-gradient(circle, 
                rgba(6, 182, 212, 0.2) 0%, 
                rgba(34, 211, 238, 0.1) 40%,
                transparent 70%
              )
            `,
            filter: 'blur(70px)',
          }}
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.5, 0.7, 0.5],
          }}
          transition={{
            duration: 20, // 从 8 秒放慢到 20 秒
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        {/* 紫粉渐变光球 */}
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 'clamp(400px, 45vw, 600px)',
            height: 'clamp(400px, 45vw, 600px)',
            bottom: '20%',
            right: '15%',
            background: `
              radial-gradient(circle, 
                rgba(167, 139, 250, 0.18) 0%, 
                rgba(244, 114, 182, 0.1) 40%,
                transparent 70%
              )
            `,
            filter: 'blur(80px)',
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{
            duration: 25, // 从 10 秒放慢到 25 秒
            repeat: Infinity,
            ease: "easeInOut",
            delay: 5,
          }}
        />
      </motion.div>

      {/* ===== 第5层：浮动粒子 ===== */}
      <motion.div 
        className="absolute inset-0"
        style={{ y: layer2Y }}
      >
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: particle.size,
              height: particle.size,
              backgroundColor: particle.color,
              boxShadow: `0 0 ${particle.size * 3}px ${particle.color}`,
            }}
            animate={{
              y: [-10, -30, -10], // 减小移动幅度
              x: [-5, 5, -5],
              opacity: [0.2, 0.5, 0.2], // 降低透明度变化
              scale: [1, 1.15, 1],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </motion.div>

      {/* ===== 第6层：扫描线效果 - 放慢速度 ===== */}
      <div className="absolute inset-0 overflow-hidden">
        {/* 水平扫描线 */}
        <motion.div
          className="absolute left-0 right-0 h-[1px]"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(139, 92, 246, 0.5) 20%, rgba(236, 72, 153, 0.6) 50%, rgba(139, 92, 246, 0.5) 80%, transparent 100%)',
            boxShadow: '0 0 15px rgba(139, 92, 246, 0.3), 0 0 30px rgba(236, 72, 153, 0.2)',
          }}
          animate={{
            top: ['-2px', '100%'],
          }}
          transition={{
            duration: 25, // 从 8 秒放慢到 25 秒
            repeat: Infinity,
            ease: "linear",
          }}
        />
        
        {/* 第二条扫描线 - 延迟 */}
        <motion.div
          className="absolute left-0 right-0 h-[1px]"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(6, 182, 212, 0.4) 30%, rgba(99, 102, 241, 0.5) 70%, transparent 100%)',
            boxShadow: '0 0 10px rgba(6, 182, 212, 0.3)',
          }}
          animate={{
            top: ['-1px', '100%'],
          }}
          transition={{
            duration: 35, // 从 12 秒放慢到 35 秒
            repeat: Infinity,
            ease: "linear",
            delay: 10,
          }}
        />
      </div>

      {/* ===== 第7层：流星效果 ===== */}
      <motion.div className="absolute inset-0" style={{ y: layer3Y }}>
        {meteors.map((meteor) => (
          <motion.div
            key={meteor.id}
            className="absolute"
            style={{
              left: `${meteor.startX}%`,
              top: `${meteor.startY}%`,
              width: '150px',
              height: '2px',
              background: `linear-gradient(${meteor.angle}deg, transparent 0%, rgba(139, 92, 246, 0.8) 50%, rgba(255, 255, 255, 0.9) 100%)`,
              borderRadius: '2px',
              transform: `rotate(${meteor.angle}deg)`,
              boxShadow: '0 0 10px rgba(139, 92, 246, 0.6)',
            }}
            animate={{
              x: [0, 300],
              y: [0, 200],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: meteor.duration,
              repeat: Infinity,
              delay: meteor.delay,
              ease: "easeOut",
            }}
          />
        ))}
      </motion.div>

      {/* ===== 第8层：脉冲环效果 - 放慢速度 ===== */}
      <div className="absolute inset-0 overflow-hidden">
        {/* 中心脉冲环 1 */}
        <motion.div
          className="absolute rounded-full border"
          style={{
            width: '400px',
            height: '400px',
            top: '30%',
            left: '50%',
            x: '-50%',
            borderColor: 'rgba(139, 92, 246, 0.2)',
          }}
          animate={{
            scale: [0.5, 1.8, 2],
            opacity: [0.5, 0.2, 0],
          }}
          transition={{
            duration: 12, // 从 4 秒放慢到 12 秒
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
        
        {/* 脉冲环 2 */}
        <motion.div
          className="absolute rounded-full border"
          style={{
            width: '300px',
            height: '300px',
            top: '60%',
            left: '25%',
            borderColor: 'rgba(236, 72, 153, 0.15)',
          }}
          animate={{
            scale: [0.5, 1.6, 1.8],
            opacity: [0.4, 0.15, 0],
          }}
          transition={{
            duration: 15, // 从 5 秒放慢到 15 秒
            repeat: Infinity,
            ease: "easeOut",
            delay: 4,
          }}
        />
        
        {/* 脉冲环 3 */}
        <motion.div
          className="absolute rounded-full border"
          style={{
            width: '350px',
            height: '350px',
            top: '20%',
            right: '20%',
            borderColor: 'rgba(6, 182, 212, 0.15)',
          }}
          animate={{
            scale: [0.5, 1.4, 1.6],
            opacity: [0.4, 0.15, 0],
          }}
          transition={{
            duration: 18, // 从 6 秒放慢到 18 秒
            repeat: Infinity,
            ease: "easeOut",
            delay: 8,
          }}
        />
      </div>

      {/* ===== 第9层：霓虹边缘光 - 放慢速度 ===== */}
      <div className="absolute inset-0 pointer-events-none">
        {/* 顶部光带 */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-[1px]"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(139, 92, 246, 0.4) 20%, rgba(236, 72, 153, 0.5) 50%, rgba(99, 102, 241, 0.4) 80%, transparent 100%)',
            boxShadow: '0 0 15px rgba(139, 92, 246, 0.3), 0 0 30px rgba(236, 72, 153, 0.15)',
          }}
          animate={{
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 8, // 从 3 秒放慢到 8 秒
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        {/* 底部光带 */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[1px]"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(6, 182, 212, 0.3) 30%, rgba(99, 102, 241, 0.4) 70%, transparent 100%)',
            boxShadow: '0 0 10px rgba(6, 182, 212, 0.2)',
          }}
          animate={{
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 10, // 从 4 秒放慢到 10 秒
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3,
          }}
        />
      </div>

      {/* ===== 第10层：动态光斑 - 放慢速度 ===== */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: '200px',
          height: '200px',
          background: 'radial-gradient(circle, rgba(167, 139, 250, 0.25) 0%, transparent 70%)',
          filter: 'blur(50px)',
        }}
        animate={{
          x: [0, 60, 30, 80, 0], // 减小移动范围
          y: [0, 30, 60, 20, 0],
          scale: [1, 1.15, 0.95, 1.1, 1], // 减小缩放幅度
        }}
        transition={{
          duration: 50, // 从 20 秒放慢到 50 秒
          repeat: Infinity,
          ease: "easeInOut",
        }}
        initial={{ top: '40%', left: '60%' }}
      />

      {/* ===== 第11层：噪点纹理 ===== */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: 0.03,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* ===== 第12层：渐变遮罩 ===== */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            linear-gradient(180deg, rgba(2, 6, 23, 0.3) 0%, transparent 10%),
            linear-gradient(0deg, rgba(2, 6, 23, 0.5) 0%, transparent 15%)
          `,
        }}
      />
    </motion.div>
  );
}

export default TechBackground;
