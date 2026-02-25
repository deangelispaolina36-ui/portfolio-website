import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { useRef, ReactNode } from 'react';

interface SectionTransitionProps {
  children: ReactNode;
  className?: string;
  /** Section 的唯一标识 */
  id?: string;
  /** 过渡效果类型 */
  transitionType?: 'fade' | 'slide' | 'scale' | 'blur' | 'reveal';
  /** 是否显示顶部分隔光效 */
  showTopDivider?: boolean;
  /** 是否显示底部分隔光效 */
  showBottomDivider?: boolean;
  /** 过渡延迟（秒） */
  delay?: number;
}

/**
 * 丝滑的 Section 过渡效果包装组件
 * 为每个页面区域添加自然流畅的进入/离开动画
 */
export function SectionTransition({
  children,
  className = '',
  id,
  transitionType = 'fade',
  showTopDivider = true,
  showBottomDivider = false,
  delay = 0,
}: SectionTransitionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { 
    once: false, 
    amount: 0.1,
    margin: "0px 0px -100px 0px"
  });
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  });

  // 平滑的滚动进度
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // 根据不同过渡类型设置动画值
  const opacity = useTransform(
    smoothProgress,
    [0, 0.15, 0.85, 1],
    transitionType === 'reveal' 
      ? [0, 1, 1, 0.9]
      : [0, 1, 1, 0.85]
  );

  const y = useTransform(
    smoothProgress,
    [0, 0.15, 0.85, 1],
    transitionType === 'slide' 
      ? [80, 0, 0, -40] 
      : transitionType === 'reveal'
      ? [100, 0, 0, -20]
      : [40, 0, 0, -20]
  );

  const scale = useTransform(
    smoothProgress,
    [0, 0.12, 0.88, 1],
    transitionType === 'scale' 
      ? [0.92, 1, 1, 0.97] 
      : transitionType === 'reveal'
      ? [0.95, 1, 1, 0.99]
      : [1, 1, 1, 1]
  );

  const blur = useTransform(
    smoothProgress,
    [0, 0.15, 0.85, 1],
    transitionType === 'blur' 
      ? [10, 0, 0, 5] 
      : [0, 0, 0, 0]
  );

  // 旋转效果（微妙的 3D 感）
  const rotateX = useTransform(
    smoothProgress,
    [0, 0.15, 0.85, 1],
    transitionType === 'reveal'
      ? [5, 0, 0, -2]
      : [0, 0, 0, 0]
  );

  // 分隔线动画
  const dividerScale = useTransform(smoothProgress, [0, 0.2], [0, 1]);
  const dividerOpacity = useTransform(smoothProgress, [0, 0.2], [0, 1]);

  return (
    <motion.section
      ref={sectionRef}
      id={id}
      className={`relative ${className}`}
      style={{
        opacity,
        y,
        scale,
        filter: transitionType === 'blur' ? `blur(${blur.get()}px)` : undefined,
        rotateX: transitionType === 'reveal' ? rotateX : undefined,
        transformPerspective: 1000,
        transformOrigin: 'center center',
      }}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{
        duration: 0.8,
        delay: delay,
        ease: [0.25, 0.1, 0.25, 1], // 丝滑的贝塞尔曲线
      }}
    >
      {/* 顶部分隔光效 */}
      {showTopDivider && (
        <motion.div 
          className="absolute left-0 right-0 top-0 h-40 pointer-events-none z-10"
          style={{
            opacity: dividerOpacity,
          }}
        >
          {/* 渐变光晕 */}
          <div 
            className="absolute inset-0"
            style={{
              background: `linear-gradient(to bottom,
                rgba(139, 92, 246, 0.08) 0%,
                rgba(167, 139, 250, 0.04) 30%,
                transparent 100%
              )`,
            }}
          />
          {/* 霓虹分隔线 */}
          <motion.div 
            className="absolute top-0 left-[10%] right-[10%] h-[1px]"
            style={{
              background: `linear-gradient(90deg,
                transparent 0%,
                rgba(139, 92, 246, 0.5) 20%,
                rgba(167, 139, 250, 0.7) 50%,
                rgba(139, 92, 246, 0.5) 80%,
                transparent 100%
              )`,
              boxShadow: '0 0 15px rgba(139, 92, 246, 0.4), 0 0 30px rgba(139, 92, 246, 0.2)',
              scaleX: dividerScale,
              transformOrigin: 'center',
            }}
          />
        </motion.div>
      )}
      
      {/* 内容区域 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{
          duration: 0.6,
          delay: delay + 0.2,
        }}
      >
        {children}
      </motion.div>
      
      {/* 底部分隔光效 */}
      {showBottomDivider && (
        <motion.div 
          className="absolute left-0 right-0 bottom-0 h-40 pointer-events-none z-10"
          style={{
            opacity: dividerOpacity,
          }}
        >
          {/* 渐变光晕 */}
          <div 
            className="absolute inset-0"
            style={{
              background: `linear-gradient(to top,
                rgba(99, 102, 241, 0.06) 0%,
                rgba(139, 92, 246, 0.03) 30%,
                transparent 100%
              )`,
            }}
          />
          {/* 霓虹分隔线 */}
          <motion.div 
            className="absolute bottom-0 left-[10%] right-[10%] h-[1px]"
            style={{
              background: `linear-gradient(90deg,
                transparent 0%,
                rgba(99, 102, 241, 0.4) 20%,
                rgba(139, 92, 246, 0.6) 50%,
                rgba(99, 102, 241, 0.4) 80%,
                transparent 100%
              )`,
              boxShadow: '0 0 12px rgba(99, 102, 241, 0.3), 0 0 25px rgba(99, 102, 241, 0.15)',
              scaleX: dividerScale,
              transformOrigin: 'center',
            }}
          />
        </motion.div>
      )}
    </motion.section>
  );
}

export default SectionTransition;
