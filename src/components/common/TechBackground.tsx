import { useEffect, useState, useRef, useMemo, useCallback } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { useDevicePerformance } from '../../hooks/useDevicePerformance';

/**
 * 增强版科技感背景组件（性能优化版）
 * 根据设备等级自动降级：
 * - high: 完整 12 层特效
 * - medium: 精简特效（去掉 blur 重的光球、减少粒子、关闭流星/脉冲环）
 * - low: 仅静态渐变 + 噪点 + 遮罩（3 层）
 */
export function TechBackground() {
  const deviceLevel = useDevicePerformance();
  const [windowHeight, setWindowHeight] = useState(0);
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // 鼠标位置 — 仅 high 级别使用
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const { scrollY } = useScroll();

  // 平滑鼠标跟随 — 仅 high 级别使用
  const smoothMouseX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  // 平滑滚动值
  const smoothScrollY = useSpring(scrollY, {
    stiffness: 50,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    setWindowHeight(window.innerHeight);
    setMounted(true);
    const handleResize = () => setWindowHeight(window.innerHeight);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 鼠标移动处理 — 仅 high 级别注册
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    },
    [mouseX, mouseY]
  );

  useEffect(() => {
    if (deviceLevel !== 'high') return;
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove, deviceLevel]);

  // 背景透明度
  const backgroundOpacity = useTransform(
    smoothScrollY,
    [windowHeight * 0.2, windowHeight * 0.5],
    [0, 1]
  );

  // 视差 — medium 和 high 使用
  const layer1Y = useTransform(smoothScrollY, [0, windowHeight * 5], [0, -300]);
  const layer2Y = useTransform(smoothScrollY, [0, windowHeight * 5], [0, -180]);
  const layer3Y = useTransform(smoothScrollY, [0, windowHeight * 5], [0, -100]);

  // 鼠标响应光球 — 仅 high
  const winW = typeof window !== 'undefined' ? window.innerWidth : 1920;
  const winH = typeof window !== 'undefined' ? window.innerHeight : 1080;
  const orb1TransformX = useTransform(smoothMouseX, [0, winW], [-50, 50]);
  const orb1TransformY = useTransform(smoothMouseY, [0, winH], [-30, 30]);
  const orb2TransformX = useTransform(smoothMouseX, [0, winW], [30, -30]);
  const orb2TransformY = useTransform(smoothMouseY, [0, winH], [20, -20]);

  // 粒子 — medium: 6 个, high: 20 个
  const particleCount = deviceLevel === 'high' ? 20 : 6;
  const particles = useMemo(() => {
    return Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 2,
      duration: Math.random() * 8 + 12,
      delay: Math.random() * 10,
      color: ['#8B5CF6', '#EC4899', '#6366F1', '#06B6D4'][Math.floor(Math.random() * 4)],
    }));
  }, [particleCount]);

  // 流星 — 仅 high
  const meteors = useMemo(() => {
    return Array.from({ length: 3 }, (_, i) => ({
      id: i,
      startX: Math.random() * 100,
      startY: Math.random() * 30,
      angle: 30 + Math.random() * 30,
      duration: 6 + Math.random() * 4,
      delay: i * 8 + Math.random() * 5,
    }));
  }, []);

  if (!mounted) return null;

  // ============================================================
  // LOW 级别：仅静态渐变 + 噪点 + 遮罩（极轻量）
  // ============================================================
  if (deviceLevel === 'low') {
    return (
      <motion.div
        ref={containerRef}
        className="fixed inset-0 pointer-events-none overflow-hidden"
        style={{ opacity: backgroundOpacity, zIndex: 1 }}
      >
        {/* 静态渐变基底 */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 80% 60% at 50% 0%, rgba(99, 102, 241, 0.12) 0%, transparent 50%),
              radial-gradient(ellipse 60% 50% at 0% 50%, rgba(139, 92, 246, 0.08) 0%, transparent 50%),
              radial-gradient(ellipse 60% 50% at 100% 50%, rgba(236, 72, 153, 0.06) 0%, transparent 50%),
              linear-gradient(180deg, #020617 0%, #0a0818 30%, #0f0a1a 50%, #0a0818 70%, #020617 100%)
            `,
          }}
        />
        {/* 噪点纹理 */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            opacity: 0.03,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />
        {/* 渐变遮罩 */}
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

  // ============================================================
  // MEDIUM 级别：渐变 + 网格 + 精简粒子 + 霓虹边缘光 + 噪点 + 遮罩
  // 去掉：鼠标跟随光球、视差大光球 blur、扫描线、流星、脉冲环、动态光斑
  // ============================================================
  if (deviceLevel === 'medium') {
    return (
      <motion.div
        ref={containerRef}
        className="fixed inset-0 pointer-events-none overflow-hidden"
        style={{ opacity: backgroundOpacity, zIndex: 1 }}
      >
        {/* 第1层：渐变基底 */}
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

        {/* 第2层：霓虹网格 */}
        <div className="absolute inset-0 grid-breathing">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="neon-grid" width="80" height="80" patternUnits="userSpaceOnUse">
                <path d="M 80 0 L 0 0 0 80" fill="none" stroke="url(#grid-gradient)" strokeWidth="0.5" />
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

        {/* 精简粒子（6个，无 blur） */}
        <motion.div className="absolute inset-0" style={{ y: layer2Y }}>
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
                boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
              }}
              animate={{
                y: [-10, -25, -10],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                delay: particle.delay,
                ease: 'easeInOut',
              }}
            />
          ))}
        </motion.div>

        {/* 霓虹边缘光（简化版） */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute top-0 left-0 right-0 h-[1px]"
            style={{
              background:
                'linear-gradient(90deg, transparent 0%, rgba(139, 92, 246, 0.3) 20%, rgba(236, 72, 153, 0.4) 50%, rgba(99, 102, 241, 0.3) 80%, transparent 100%)',
            }}
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>

        {/* 噪点纹理 */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            opacity: 0.03,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* 渐变遮罩 */}
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

  // ============================================================
  // HIGH 级别：完整 12 层特效（保持原有效果不变）
  // ============================================================
  return (
    <motion.div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ opacity: backgroundOpacity, zIndex: 1 }}
    >
      {/* ===== 第1层：深邃渐变基底 ===== */}
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

      {/* ===== 第2层：霓虹网格 ===== */}
      <div className="absolute inset-0 grid-breathing">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="neon-grid" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M 80 0 L 0 0 0 80" fill="none" stroke="url(#grid-gradient)" strokeWidth="0.5" />
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
          background: `radial-gradient(circle, rgba(139, 92, 246, 0.25) 0%, rgba(99, 102, 241, 0.15) 30%, rgba(79, 70, 229, 0.05) 60%, transparent 80%)`,
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
          background: `radial-gradient(circle, rgba(236, 72, 153, 0.2) 0%, rgba(219, 39, 119, 0.1) 40%, transparent 70%)`,
          filter: 'blur(50px)',
        }}
      />

      {/* ===== 第4层：视差光球层 ===== */}
      <motion.div className="absolute inset-0" style={{ y: layer1Y }}>
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 'clamp(350px, 40vw, 550px)',
            height: 'clamp(350px, 40vw, 550px)',
            top: '40%',
            left: '20%',
            background: `radial-gradient(circle, rgba(6, 182, 212, 0.2) 0%, rgba(34, 211, 238, 0.1) 40%, transparent 70%)`,
            filter: 'blur(70px)',
          }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.7, 0.5] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 'clamp(400px, 45vw, 600px)',
            height: 'clamp(400px, 45vw, 600px)',
            bottom: '20%',
            right: '15%',
            background: `radial-gradient(circle, rgba(167, 139, 250, 0.18) 0%, rgba(244, 114, 182, 0.1) 40%, transparent 70%)`,
            filter: 'blur(80px)',
          }}
          animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.6, 0.4] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut', delay: 5 }}
        />
      </motion.div>

      {/* ===== 第5层：浮动粒子 ===== */}
      <motion.div className="absolute inset-0" style={{ y: layer2Y }}>
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
              y: [-10, -30, -10],
              x: [-5, 5, -5],
              opacity: [0.2, 0.5, 0.2],
              scale: [1, 1.15, 1],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: 'easeInOut',
            }}
          />
        ))}
      </motion.div>

      {/* ===== 第6层：扫描线效果 ===== */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute left-0 right-0 h-[1px]"
          style={{
            background:
              'linear-gradient(90deg, transparent 0%, rgba(139, 92, 246, 0.5) 20%, rgba(236, 72, 153, 0.6) 50%, rgba(139, 92, 246, 0.5) 80%, transparent 100%)',
            boxShadow: '0 0 15px rgba(139, 92, 246, 0.3), 0 0 30px rgba(236, 72, 153, 0.2)',
          }}
          animate={{ top: ['-2px', '100%'] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute left-0 right-0 h-[1px]"
          style={{
            background:
              'linear-gradient(90deg, transparent 0%, rgba(6, 182, 212, 0.4) 30%, rgba(99, 102, 241, 0.5) 70%, transparent 100%)',
            boxShadow: '0 0 10px rgba(6, 182, 212, 0.3)',
          }}
          animate={{ top: ['-1px', '100%'] }}
          transition={{ duration: 35, repeat: Infinity, ease: 'linear', delay: 10 }}
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
            animate={{ x: [0, 300], y: [0, 200], opacity: [0, 1, 0] }}
            transition={{ duration: meteor.duration, repeat: Infinity, delay: meteor.delay, ease: 'easeOut' }}
          />
        ))}
      </motion.div>

      {/* ===== 第8层：脉冲环效果 ===== */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute rounded-full border"
          style={{ width: '400px', height: '400px', top: '30%', left: '50%', x: '-50%', borderColor: 'rgba(139, 92, 246, 0.2)' }}
          animate={{ scale: [0.5, 1.8, 2], opacity: [0.5, 0.2, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeOut' }}
        />
        <motion.div
          className="absolute rounded-full border"
          style={{ width: '300px', height: '300px', top: '60%', left: '25%', borderColor: 'rgba(236, 72, 153, 0.15)' }}
          animate={{ scale: [0.5, 1.6, 1.8], opacity: [0.4, 0.15, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeOut', delay: 4 }}
        />
        <motion.div
          className="absolute rounded-full border"
          style={{ width: '350px', height: '350px', top: '20%', right: '20%', borderColor: 'rgba(6, 182, 212, 0.15)' }}
          animate={{ scale: [0.5, 1.4, 1.6], opacity: [0.4, 0.15, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeOut', delay: 8 }}
        />
      </div>

      {/* ===== 第9层：霓虹边缘光 ===== */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-0 left-0 right-0 h-[1px]"
          style={{
            background:
              'linear-gradient(90deg, transparent 0%, rgba(139, 92, 246, 0.4) 20%, rgba(236, 72, 153, 0.5) 50%, rgba(99, 102, 241, 0.4) 80%, transparent 100%)',
            boxShadow: '0 0 15px rgba(139, 92, 246, 0.3), 0 0 30px rgba(236, 72, 153, 0.15)',
          }}
          animate={{ opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[1px]"
          style={{
            background:
              'linear-gradient(90deg, transparent 0%, rgba(6, 182, 212, 0.3) 30%, rgba(99, 102, 241, 0.4) 70%, transparent 100%)',
            boxShadow: '0 0 10px rgba(6, 182, 212, 0.2)',
          }}
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
        />
      </div>

      {/* ===== 第10层：动态光斑 ===== */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: '200px',
          height: '200px',
          background: 'radial-gradient(circle, rgba(167, 139, 250, 0.25) 0%, transparent 70%)',
          filter: 'blur(50px)',
        }}
        animate={{ x: [0, 60, 30, 80, 0], y: [0, 30, 60, 20, 0], scale: [1, 1.15, 0.95, 1.1, 1] }}
        transition={{ duration: 50, repeat: Infinity, ease: 'easeInOut' }}
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
