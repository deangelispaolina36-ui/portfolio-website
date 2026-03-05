import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

/**
 * 简洁版动态背景组件
 * 高端大气的设计：仅保留渐变基底和少量柔和光球
 * 响应滚动位置产生轻微视差效果
 */
export function DynamicBackground() {
  const [windowHeight, setWindowHeight] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollY } = useScroll();
  
  // 平滑滚动值
  const smoothScrollY = useSpring(scrollY, {
    stiffness: 50,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    setWindowHeight(window.innerHeight);
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 背景透明度 - 与 Hero 背景消失同步
  const backgroundOpacity = useTransform(
    smoothScrollY,
    [windowHeight * 0.2, windowHeight * 0.5],
    [0, 1]
  );

  // 轻微视差效果
  const layer1Y = useTransform(smoothScrollY, [0, windowHeight * 5], [0, -150]);
  const layer2Y = useTransform(smoothScrollY, [0, windowHeight * 5], [0, -100]);

  return (
    <motion.div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{
        opacity: backgroundOpacity,
        zIndex: 1,
      }}
    >
      {/* 深色渐变基底 - 简洁高端 */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 120% 80% at 50% 0%, rgba(15, 23, 42, 0.8) 0%, transparent 50%),
            radial-gradient(ellipse 80% 100% at 0% 50%, rgba(30, 27, 75, 0.25) 0%, transparent 40%),
            radial-gradient(ellipse 80% 100% at 100% 50%, rgba(49, 10, 47, 0.2) 0%, transparent 40%),
            linear-gradient(180deg, #020617 0%, #0a0a1a 50%, #020617 100%)
          `,
        }}
      />

      {/* 第一视差层 - 主光球 */}
      <motion.div 
        className="absolute inset-0"
        style={{ y: layer1Y }}
      >
        {/* 紫色光球 - 左上方 */}
        <motion.div
          className="absolute rounded-full"
          style={{
            width: '600px',
            height: '600px',
            top: '5%',
            left: '-10%',
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.08) 0%, rgba(99, 102, 241, 0.03) 40%, transparent 70%)',
            filter: 'blur(100px)',
          }}
        />
        
        {/* 粉色光球 - 右侧 */}
        <motion.div
          className="absolute rounded-full"
          style={{
            width: '500px',
            height: '500px',
            top: '30%',
            right: '-5%',
            background: 'radial-gradient(circle, rgba(236, 72, 153, 0.06) 0%, rgba(219, 39, 119, 0.02) 40%, transparent 70%)',
            filter: 'blur(100px)',
          }}
        />
      </motion.div>

      {/* 第二视差层 - 次要光球 */}
      <motion.div 
        className="absolute inset-0"
        style={{ y: layer2Y }}
      >
        {/* 靛蓝光球 - 中下方 */}
        <motion.div
          className="absolute rounded-full"
          style={{
            width: '450px',
            height: '450px',
            bottom: '20%',
            left: '15%',
            background: 'radial-gradient(circle, rgba(99, 102, 241, 0.06) 0%, transparent 70%)',
            filter: 'blur(100px)',
          }}
        />
      </motion.div>

      {/* 顶部渐变遮罩 - 柔和过渡 */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 100% 60% at 50% 0%, rgba(15, 23, 42, 0.5) 0%, transparent 40%),
            radial-gradient(ellipse 60% 80% at 0% 50%, rgba(30, 27, 75, 0.15) 0%, transparent 35%),
            radial-gradient(ellipse 60% 80% at 100% 50%, rgba(49, 10, 47, 0.1) 0%, transparent 35%)
          `,
        }}
      />
    </motion.div>
  );
}

export default DynamicBackground;
