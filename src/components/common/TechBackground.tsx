import { useEffect, useState, useRef, useMemo } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, useAnimationFrame } from 'framer-motion';

/**
 * 科技感背景组件
 * 特性：
 * - 深邃渐变基底 + 几何网格
 * - 多层视差光球
 * - 流动光线动画（响应滚动）
 * - 星光点缀
 * - 区域色彩变化
 */
export function TechBackground() {
  const [windowHeight, setWindowHeight] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollY } = useScroll();
  
  // 平滑滚动值
  const smoothScrollY = useSpring(scrollY, {
    stiffness: 50,
    damping: 30,
    restDelta: 0.001
  });

  // 流动光线位置
  const lineProgress = useMotionValue(0);
  
  useEffect(() => {
    setWindowHeight(window.innerHeight);
    setWindowWidth(window.innerWidth);
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 流动光线动画 - 响应滚动加速
  useAnimationFrame((time) => {
    const progress = (time * 0.00008) % 1;
    lineProgress.set(progress);
  });

  // 背景透明度 - 与 Hero 背景消失同步
  const backgroundOpacity = useTransform(
    smoothScrollY,
    [windowHeight * 0.2, windowHeight * 0.5],
    [0, 1]
  );

  // 多层视差效果
  const layer1Y = useTransform(smoothScrollY, [0, windowHeight * 8], [0, -200]);
  const layer2Y = useTransform(smoothScrollY, [0, windowHeight * 8], [0, -120]);
  const layer3Y = useTransform(smoothScrollY, [0, windowHeight * 8], [0, -60]);
  
  // 光球位置视差（水平方向也有微妙移动）
  const orb1X = useTransform(smoothScrollY, [0, windowHeight * 5], [0, 50]);
  const orb2X = useTransform(smoothScrollY, [0, windowHeight * 5], [0, -30]);
  
  // 流动光线响应滚动 - 滚动越快，光线越亮
  const scrollVelocity = useSpring(
    useTransform(scrollY, (value) => {
      const prev = scrollY.getPrevious() || 0;
      return Math.min(Math.abs(value - prev) / 10, 1);
    }),
    { stiffness: 100, damping: 30 }
  );
  
  const lineOpacity = useTransform(scrollVelocity, [0, 1], [0.3, 0.8]);
  
  // 根据滚动位置调整背景氛围色调
  const hueShift = useTransform(
    smoothScrollY,
    [0, windowHeight * 2, windowHeight * 4, windowHeight * 6],
    [0, 10, -5, 5]
  );

  // 生成星点
  const stars = useMemo(() => {
    return Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 1.5 + 0.5,
      opacity: Math.random() * 0.4 + 0.1,
      delay: Math.random() * 5,
    }));
  }, []);

  return (
    <motion.div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{
        opacity: backgroundOpacity,
        zIndex: 1,
      }}
    >
      {/* ===== 第1层：深邃渐变基底 ===== */}
      <motion.div 
        className="absolute inset-0"
        style={{
          filter: useTransform(hueShift, (h) => `hue-rotate(${h}deg)`),
        }}
      >
        <div 
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 150% 100% at 50% -20%, rgba(15, 23, 42, 0.9) 0%, transparent 60%),
              radial-gradient(ellipse 100% 100% at 0% 30%, rgba(25, 25, 60, 0.35) 0%, transparent 50%),
              radial-gradient(ellipse 100% 100% at 100% 70%, rgba(40, 15, 50, 0.25) 0%, transparent 50%),
              linear-gradient(180deg, #010314 0%, #05071a 30%, #0a0818 70%, #020617 100%)
            `,
          }}
        />
      </motion.div>

      {/* ===== 第2层：几何科技网格 ===== */}
      <div className="absolute inset-0" style={{ opacity: 0.025 }}>
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="tech-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path 
                d="M 60 0 L 0 0 0 60" 
                fill="none" 
                stroke="rgba(139, 92, 246, 0.8)" 
                strokeWidth="0.5"
              />
            </pattern>
            <linearGradient id="grid-fade" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="white" stopOpacity="0.3" />
              <stop offset="50%" stopColor="white" stopOpacity="0.6" />
              <stop offset="100%" stopColor="white" stopOpacity="0.2" />
            </linearGradient>
            <mask id="grid-mask">
              <rect width="100%" height="100%" fill="url(#grid-fade)" />
            </mask>
          </defs>
          <rect width="100%" height="100%" fill="url(#tech-grid)" mask="url(#grid-mask)" />
        </svg>
      </div>

      {/* ===== 第3层：星光点缀 ===== */}
      <motion.div 
        className="absolute inset-0"
        style={{ y: layer3Y }}
      >
        {stars.map((star) => (
          <motion.div
            key={star.id}
            className="absolute rounded-full bg-white"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: star.size,
              height: star.size,
              opacity: star.opacity,
            }}
            animate={{
              opacity: [star.opacity, star.opacity * 1.5, star.opacity],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: star.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </motion.div>

      {/* ===== 第4层：主光球视差层 ===== */}
      <motion.div 
        className="absolute inset-0"
        style={{ y: layer1Y }}
      >
        {/* 紫色主光球 - 左上 */}
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 'clamp(400px, 50vw, 700px)',
            height: 'clamp(400px, 50vw, 700px)',
            top: '0%',
            left: '-15%',
            x: orb1X,
            background: `
              radial-gradient(circle, 
                rgba(139, 92, 246, 0.1) 0%, 
                rgba(99, 102, 241, 0.05) 30%,
                rgba(79, 70, 229, 0.02) 60%,
                transparent 80%
              )
            `,
            filter: 'blur(80px)',
          }}
        />
        
        {/* 青色光球 - 右上 */}
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 'clamp(300px, 35vw, 500px)',
            height: 'clamp(300px, 35vw, 500px)',
            top: '10%',
            right: '-8%',
            x: orb2X,
            background: `
              radial-gradient(circle, 
                rgba(6, 182, 212, 0.08) 0%, 
                rgba(34, 211, 238, 0.03) 40%,
                transparent 70%
              )
            `,
            filter: 'blur(70px)',
          }}
        />
      </motion.div>

      {/* ===== 第5层：次要光球视差层 ===== */}
      <motion.div 
        className="absolute inset-0"
        style={{ y: layer2Y }}
      >
        {/* 粉紫光球 - 左中 */}
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 'clamp(350px, 40vw, 550px)',
            height: 'clamp(350px, 40vw, 550px)',
            top: '40%',
            left: '-5%',
            background: `
              radial-gradient(circle, 
                rgba(236, 72, 153, 0.06) 0%, 
                rgba(219, 39, 119, 0.03) 40%,
                transparent 70%
              )
            `,
            filter: 'blur(90px)',
          }}
        />
        
        {/* 靛蓝光球 - 右下 */}
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 'clamp(400px, 45vw, 600px)',
            height: 'clamp(400px, 45vw, 600px)',
            bottom: '10%',
            right: '-10%',
            background: `
              radial-gradient(circle, 
                rgba(99, 102, 241, 0.07) 0%, 
                rgba(129, 140, 248, 0.03) 40%,
                transparent 70%
              )
            `,
            filter: 'blur(85px)',
          }}
        />
        
        {/* 深紫光球 - 底部中间 */}
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 'clamp(300px, 30vw, 450px)',
            height: 'clamp(300px, 30vw, 450px)',
            bottom: '-5%',
            left: '30%',
            background: `
              radial-gradient(circle, 
                rgba(139, 92, 246, 0.05) 0%, 
                transparent 60%
              )
            `,
            filter: 'blur(100px)',
          }}
        />
      </motion.div>

      {/* ===== 第6层：流动光线 ===== */}
      <div className="absolute inset-0 overflow-hidden">
        {/* 斜向流动光线 1 */}
        <motion.div
          className="absolute"
          style={{
            width: '200%',
            height: '1px',
            top: '25%',
            left: '-50%',
            background: 'linear-gradient(90deg, transparent 0%, rgba(139, 92, 246, 0.4) 30%, rgba(6, 182, 212, 0.4) 50%, rgba(139, 92, 246, 0.4) 70%, transparent 100%)',
            transform: 'rotate(-15deg)',
            opacity: lineOpacity,
            x: useTransform(lineProgress, [0, 1], ['-100%', '100%']),
          }}
        />
        
        {/* 斜向流动光线 2 */}
        <motion.div
          className="absolute"
          style={{
            width: '200%',
            height: '1px',
            top: '55%',
            left: '-50%',
            background: 'linear-gradient(90deg, transparent 0%, rgba(236, 72, 153, 0.3) 40%, rgba(99, 102, 241, 0.3) 60%, transparent 100%)',
            transform: 'rotate(10deg)',
            opacity: useTransform(lineOpacity, (o) => o * 0.7),
            x: useTransform(lineProgress, [0, 1], ['100%', '-100%']),
          }}
        />
        
        {/* 水平流动光线 */}
        <motion.div
          className="absolute"
          style={{
            width: '150%',
            height: '1px',
            top: '75%',
            left: '-25%',
            background: 'linear-gradient(90deg, transparent 0%, rgba(6, 182, 212, 0.25) 50%, transparent 100%)',
            opacity: useTransform(lineOpacity, (o) => o * 0.5),
            x: useTransform(lineProgress, [0, 1], ['-50%', '50%']),
          }}
        />
      </div>

      {/* ===== 第7层：顶部渐变遮罩 ===== */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            linear-gradient(180deg, rgba(5, 5, 20, 0.6) 0%, transparent 15%),
            linear-gradient(0deg, rgba(5, 5, 20, 0.4) 0%, transparent 10%)
          `,
        }}
      />

      {/* ===== 第8层：噪点纹理（增加质感） ===== */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: 0.015,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </motion.div>
  );
}

export default TechBackground;
