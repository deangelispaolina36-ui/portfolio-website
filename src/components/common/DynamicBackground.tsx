import { useEffect, useState, useRef, useMemo } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

/**
 * 动态科技感背景组件
 * 包含：光球、粒子网格、数据流线条、脉冲环、星光、扫描线等科技元素
 * 所有元素都会响应滚动位置产生视差效果
 */
export function DynamicBackground() {
  const [windowHeight, setWindowHeight] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollY } = useScroll();
  
  // 平滑滚动值
  const smoothScrollY = useSpring(scrollY, {
    stiffness: 50,
    damping: 20,
    restDelta: 0.001
  });

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

  // 背景透明度 - 与 Hero 背景消失同步（Hero 在 30%-50% 消失，这里在 20%-50% 渐显）
  const backgroundOpacity = useTransform(
    smoothScrollY,
    [windowHeight * 0.2, windowHeight * 0.5],
    [0, 1]
  );

  // 多层视差效果
  const layer1Y = useTransform(smoothScrollY, [0, windowHeight * 5], [0, -400]);
  const layer2Y = useTransform(smoothScrollY, [0, windowHeight * 5], [0, -600]);
  const layer3Y = useTransform(smoothScrollY, [0, windowHeight * 5], [0, -250]);
  
  // 旋转效果
  const rotation1 = useTransform(smoothScrollY, [0, windowHeight * 10], [0, 360]);
  const rotation2 = useTransform(smoothScrollY, [0, windowHeight * 10], [0, -180]);
  
  // 缩放效果
  const scale1 = useTransform(smoothScrollY, [0, windowHeight * 3], [1, 1.4]);
  const scale2 = useTransform(smoothScrollY, [0, windowHeight * 3], [1, 0.7]);

  // 横向移动
  const moveX1 = useTransform(smoothScrollY, [0, windowHeight * 5], [0, 150]);
  const moveX2 = useTransform(smoothScrollY, [0, windowHeight * 5], [0, -200]);

  // 生成随机粒子位置
  const particles = useMemo(() => {
    return [...Array(40)].map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 2 + Math.random() * 3,
      delay: Math.random() * 5,
      duration: 3 + Math.random() * 4,
    }));
  }, []);

  // 生成数据流线条
  const dataLines = useMemo(() => {
    return [...Array(8)].map((_, i) => ({
      id: i,
      startY: 10 + i * 12,
      width: 40 + Math.random() * 40,
      delay: i * 0.5,
    }));
  }, []);

  // 生成六边形网格点
  const hexPoints = useMemo(() => {
    const points = [];
    for (let i = 0; i < 12; i++) {
      points.push({
        id: i,
        x: 10 + (i % 4) * 25 + (Math.floor(i / 4) % 2) * 12.5,
        y: 15 + Math.floor(i / 4) * 25,
        delay: i * 0.2,
      });
    }
    return points;
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
      {/* 深色渐变基底 - 科技感深蓝色 */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 150% 100% at 50% 0%, rgba(15, 23, 42, 0.9) 0%, transparent 60%),
            radial-gradient(ellipse 100% 150% at 0% 50%, rgba(30, 27, 75, 0.4) 0%, transparent 50%),
            radial-gradient(ellipse 100% 150% at 100% 50%, rgba(49, 10, 47, 0.3) 0%, transparent 50%),
            linear-gradient(180deg, #020617 0%, #0a0a1a 50%, #020617 100%)
          `,
        }}
      />
      
      {/* === 网格背景层 - 科技感网格 === */}
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(139, 92, 246, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139, 92, 246, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          opacity: useTransform(smoothScrollY, [windowHeight, windowHeight * 2], [0.3, 0.6]),
          y: layer3Y,
        }}
      />

      {/* === 第一视差层 - 大型环境光球 === */}
      <motion.div 
        className="absolute inset-0"
        style={{ y: layer1Y }}
      >
        {/* 紫色光球 - 左上 */}
        <motion.div
          className="absolute rounded-full"
          style={{
            width: '800px',
            height: '800px',
            top: '0%',
            left: '-15%',
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, rgba(99, 102, 241, 0.05) 40%, transparent 70%)',
            filter: 'blur(80px)',
            scale: scale1,
            x: moveX1,
            rotate: rotation1,
          }}
        />
        
        {/* 粉紫光球 - 右上 */}
        <motion.div
          className="absolute rounded-full"
          style={{
            width: '700px',
            height: '700px',
            top: '20%',
            right: '-20%',
            background: 'radial-gradient(circle, rgba(236, 72, 153, 0.12) 0%, rgba(219, 39, 119, 0.04) 40%, transparent 70%)',
            filter: 'blur(90px)',
            scale: scale2,
            x: moveX2,
          }}
        />
        
        {/* 青色光球 - 中右 */}
        <motion.div
          className="absolute rounded-full"
          style={{
            width: '500px',
            height: '500px',
            top: '50%',
            right: '10%',
            background: 'radial-gradient(circle, rgba(6, 182, 212, 0.1) 0%, transparent 70%)',
            filter: 'blur(70px)',
            rotate: rotation2,
          }}
        />
      </motion.div>

      {/* === 第二视差层 - 中型光效 === */}
      <motion.div 
        className="absolute inset-0"
        style={{ y: layer2Y }}
      >
        {/* 靛蓝光球 - 中下 */}
        <motion.div
          className="absolute rounded-full"
          style={{
            width: '600px',
            height: '600px',
            bottom: '15%',
            left: '10%',
            background: 'radial-gradient(circle, rgba(99, 102, 241, 0.12) 0%, transparent 70%)',
            filter: 'blur(75px)',
            rotate: rotation2,
          }}
        />
        
        {/* 紫罗兰光球 - 右下 */}
        <motion.div
          className="absolute rounded-full"
          style={{
            width: '550px',
            height: '550px',
            bottom: '5%',
            right: '0%',
            background: 'radial-gradient(circle, rgba(167, 139, 250, 0.12) 0%, transparent 70%)',
            filter: 'blur(80px)',
            scale: scale1,
          }}
        />
      </motion.div>

      {/* === 科技感数据流线条 === */}
      <div className="absolute inset-0 overflow-hidden">
        {dataLines.map((line) => (
          <motion.div
            key={line.id}
            className="absolute h-[2px] rounded-full"
            style={{
              left: '-10%',
              top: `${line.startY}%`,
              width: `${line.width}%`,
              background: `linear-gradient(90deg, 
                transparent 0%, 
                rgba(139, 92, 246, 0.6) 20%, 
                rgba(167, 139, 250, 0.8) 50%, 
                rgba(139, 92, 246, 0.6) 80%, 
                transparent 100%
              )`,
              boxShadow: '0 0 10px rgba(139, 92, 246, 0.4), 0 0 20px rgba(139, 92, 246, 0.2)',
              opacity: useTransform(
                smoothScrollY,
                [windowHeight * (0.5 + line.delay * 0.1), windowHeight * (1 + line.delay * 0.1)],
                [0, 0.8]
              ),
            }}
            animate={{
              x: ['0%', '150%'],
            }}
            transition={{
              duration: 8 + line.delay,
              repeat: Infinity,
              ease: 'linear',
              delay: line.delay,
            }}
          />
        ))}
      </div>

      {/* === 垂直光柱 === */}
      <motion.div
        className="absolute w-[2px]"
        style={{
          left: '10%',
          top: '10%',
          height: '50%',
          background: 'linear-gradient(to bottom, transparent, rgba(139, 92, 246, 0.5) 20%, rgba(167, 139, 250, 0.7) 50%, rgba(139, 92, 246, 0.5) 80%, transparent)',
          filter: 'blur(1px)',
          boxShadow: '0 0 15px rgba(139, 92, 246, 0.4)',
          y: layer1Y,
          opacity: useTransform(smoothScrollY, [windowHeight, windowHeight * 1.5], [0.2, 0.9]),
        }}
      />
      <motion.div
        className="absolute w-[2px]"
        style={{
          right: '15%',
          top: '20%',
          height: '45%',
          background: 'linear-gradient(to bottom, transparent, rgba(236, 72, 153, 0.4) 20%, rgba(244, 114, 182, 0.6) 50%, rgba(236, 72, 153, 0.4) 80%, transparent)',
          filter: 'blur(1px)',
          boxShadow: '0 0 15px rgba(236, 72, 153, 0.3)',
          y: layer2Y,
          opacity: useTransform(smoothScrollY, [windowHeight, windowHeight * 1.5], [0.15, 0.8]),
        }}
      />
      <motion.div
        className="absolute w-[2px]"
        style={{
          left: '50%',
          top: '30%',
          height: '35%',
          background: 'linear-gradient(to bottom, transparent, rgba(6, 182, 212, 0.4) 20%, rgba(34, 211, 238, 0.6) 50%, rgba(6, 182, 212, 0.4) 80%, transparent)',
          filter: 'blur(1px)',
          boxShadow: '0 0 15px rgba(6, 182, 212, 0.3)',
          y: layer3Y,
          opacity: useTransform(smoothScrollY, [windowHeight * 1.2, windowHeight * 2], [0.1, 0.7]),
        }}
      />

      {/* === 脉冲环 - 科技感雷达效果 === */}
      <motion.div
        className="absolute rounded-full border border-violet-500/30"
        style={{
          width: '400px',
          height: '400px',
          top: '15%',
          left: '20%',
          scale: useTransform(smoothScrollY, [windowHeight, windowHeight * 3], [0.5, 2]),
          opacity: useTransform(smoothScrollY, [windowHeight, windowHeight * 1.5, windowHeight * 3], [0, 0.7, 0]),
        }}
      />
      <motion.div
        className="absolute rounded-full border border-pink-500/25"
        style={{
          width: '500px',
          height: '500px',
          bottom: '20%',
          right: '15%',
          scale: useTransform(smoothScrollY, [windowHeight * 1.2, windowHeight * 4], [0.4, 2.2]),
          opacity: useTransform(smoothScrollY, [windowHeight * 1.2, windowHeight * 2, windowHeight * 4], [0, 0.6, 0]),
        }}
      />
      <motion.div
        className="absolute rounded-full border border-cyan-500/20"
        style={{
          width: '350px',
          height: '350px',
          top: '45%',
          left: '60%',
          scale: useTransform(smoothScrollY, [windowHeight * 0.8, windowHeight * 2.5], [0.6, 1.8]),
          opacity: useTransform(smoothScrollY, [windowHeight * 0.8, windowHeight * 1.5, windowHeight * 2.5], [0, 0.5, 0]),
        }}
      />

      {/* === 六边形网格节点 === */}
      <div className="absolute inset-0">
        {hexPoints.map((point) => (
          <motion.div
            key={point.id}
            className="absolute"
            style={{
              left: `${point.x}%`,
              top: `${point.y}%`,
              y: layer1Y,
            }}
          >
            <motion.div
              className="w-3 h-3 rotate-45 border border-violet-400/40"
              style={{
                boxShadow: '0 0 8px rgba(139, 92, 246, 0.3)',
                opacity: useTransform(
                  smoothScrollY,
                  [windowHeight * (0.6 + point.delay * 0.1), windowHeight * (1.2 + point.delay * 0.1)],
                  [0, 0.8]
                ),
              }}
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.4, 0.9, 0.4],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: point.delay,
              }}
            />
          </motion.div>
        ))}
      </div>

      {/* === 星光粒子层 === */}
      <div className="absolute inset-0">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: particle.size,
              height: particle.size,
              background: particle.id % 3 === 0 
                ? 'rgba(167, 139, 250, 0.9)'
                : particle.id % 3 === 1
                ? 'rgba(236, 72, 153, 0.8)'
                : 'rgba(6, 182, 212, 0.8)',
              boxShadow: particle.id % 3 === 0
                ? '0 0 8px rgba(167, 139, 250, 0.6), 0 0 16px rgba(139, 92, 246, 0.3)'
                : particle.id % 3 === 1
                ? '0 0 8px rgba(236, 72, 153, 0.5), 0 0 16px rgba(236, 72, 153, 0.2)'
                : '0 0 8px rgba(6, 182, 212, 0.5), 0 0 16px rgba(6, 182, 212, 0.2)',
              opacity: useTransform(
                smoothScrollY,
                [windowHeight * (0.5 + particle.delay * 0.05), windowHeight * (1 + particle.delay * 0.05), windowHeight * (3 + particle.delay * 0.05)],
                [0.1, 1, 0.3]
              ),
            }}
            animate={{
              scale: [1, 1.5 + Math.random() * 0.5, 1],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
            }}
          />
        ))}
      </div>

      {/* === 漂浮光点 - 带轨迹 === */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={`float-${i}`}
          className="absolute rounded-full"
          style={{
            left: `${8 + i * 8}%`,
            top: `${12 + (i * 7) % 75}%`,
            width: 6 + (i % 3) * 2,
            height: 6 + (i % 3) * 2,
            background: i % 4 === 0 
              ? 'rgba(167, 139, 250, 0.8)' 
              : i % 4 === 1
              ? 'rgba(236, 72, 153, 0.7)'
              : i % 4 === 2
              ? 'rgba(6, 182, 212, 0.7)'
              : 'rgba(99, 102, 241, 0.8)',
            boxShadow: i % 4 === 0
              ? '0 0 15px rgba(167, 139, 250, 0.6)'
              : i % 4 === 1
              ? '0 0 15px rgba(236, 72, 153, 0.5)'
              : i % 4 === 2
              ? '0 0 15px rgba(6, 182, 212, 0.5)'
              : '0 0 15px rgba(99, 102, 241, 0.6)',
            y: useTransform(
              smoothScrollY,
              [0, windowHeight * 5],
              [0, -120 - i * 40]
            ),
            x: useTransform(
              smoothScrollY,
              [0, windowHeight * 5],
              [0, (i % 2 === 0 ? 1 : -1) * (25 + i * 8)]
            ),
            opacity: useTransform(
              smoothScrollY,
              [windowHeight * 0.4, windowHeight, windowHeight * 4],
              [0.1, 0.9, 0.2]
            ),
          }}
        />
      ))}

      {/* === 扫描线效果 === */}
      <motion.div
        className="absolute left-0 right-0 h-[1px]"
        style={{
          top: '50%',
          background: 'linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.3), rgba(167, 139, 250, 0.5), rgba(139, 92, 246, 0.3), transparent)',
          boxShadow: '0 0 10px rgba(139, 92, 246, 0.3)',
          opacity: useTransform(smoothScrollY, [windowHeight, windowHeight * 2], [0, 0.6]),
        }}
        animate={{
          y: [-200, 200],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut',
        }}
      />

      {/* === 角落装饰 - 科技感边框 === */}
      <motion.div
        className="absolute top-[10%] left-[5%] w-20 h-20"
        style={{
          borderLeft: '2px solid rgba(139, 92, 246, 0.3)',
          borderTop: '2px solid rgba(139, 92, 246, 0.3)',
          opacity: useTransform(smoothScrollY, [windowHeight, windowHeight * 1.5], [0, 0.8]),
        }}
      />
      <motion.div
        className="absolute bottom-[10%] right-[5%] w-20 h-20"
        style={{
          borderRight: '2px solid rgba(236, 72, 153, 0.3)',
          borderBottom: '2px solid rgba(236, 72, 153, 0.3)',
          opacity: useTransform(smoothScrollY, [windowHeight, windowHeight * 1.5], [0, 0.8]),
        }}
      />

      {/* === 渐变遮罩层 === */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 120% 80% at 50% 0%, rgba(15, 23, 42, 0.6) 0%, transparent 50%),
            radial-gradient(ellipse 80% 120% at 0% 50%, rgba(30, 27, 75, 0.2) 0%, transparent 40%),
            radial-gradient(ellipse 80% 120% at 100% 50%, rgba(49, 10, 47, 0.15) 0%, transparent 40%)
          `,
        }}
      />
    </motion.div>
  );
}

export default DynamicBackground;
