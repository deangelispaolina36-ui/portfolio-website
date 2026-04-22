import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { useRef, ReactNode } from 'react';
import { useDevicePerformance } from '../../hooks/useDevicePerformance';

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
 * 丝滑的 Section 过渡效果包装组件（性能优化版）
 * - high: 完整滚动视差 + 分隔光效
 * - medium: 简化滚动（去掉 blur/rotateX），保留分隔线
 * - low: 纯 useInView 淡入，无滚动绑定
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
  const deviceLevel = useDevicePerformance();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, {
    once: false,
    amount: 0.1,
    margin: '0px 0px -100px 0px',
  });

  // ============================================================
  // LOW 级别：纯 InView 淡入，无滚动绑定，极简
  // ============================================================
  if (deviceLevel === 'low') {
    return (
      <motion.section
        ref={sectionRef}
        id={id}
        className={`relative ${className}`}
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.5, delay, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {/* 简化顶部分隔线 — 无动画 */}
        {showTopDivider && (
          <div className="absolute left-[10%] right-[10%] top-0 h-[1px] bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
        )}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: delay + 0.15 }}
        >
          {children}
        </motion.div>
        {showBottomDivider && (
          <div className="absolute left-[10%] right-[10%] bottom-0 h-[1px] bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent" />
        )}
      </motion.section>
    );
  }

  // ============================================================
  // MEDIUM & HIGH 级别：使用滚动绑定
  // ============================================================
  return <SectionTransitionFull
    sectionRef={sectionRef}
    isInView={isInView}
    className={className}
    id={id}
    transitionType={transitionType}
    showTopDivider={showTopDivider}
    showBottomDivider={showBottomDivider}
    delay={delay}
    deviceLevel={deviceLevel}
  >
    {children}
  </SectionTransitionFull>;
}

// 分离为子组件，这样 low 级别完全不会创建 useScroll/useSpring/useTransform
function SectionTransitionFull({
  children,
  sectionRef,
  isInView,
  className,
  id,
  transitionType,
  showTopDivider,
  showBottomDivider,
  delay,
  deviceLevel,
}: {
  children: ReactNode;
  sectionRef: React.RefObject<HTMLElement>;
  isInView: boolean;
  className: string;
  id?: string;
  transitionType: string;
  showTopDivider: boolean;
  showBottomDivider: boolean;
  delay: number;
  deviceLevel: 'medium' | 'high';
}) {
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // 基础动画值（medium + high 共用）
  const opacity = useTransform(
    smoothProgress,
    [0, 0.08, 0.92, 1],
    transitionType === 'reveal' ? [0, 1, 1, 0.95] : [0, 1, 1, 0.9]
  );

  const y = useTransform(
    smoothProgress,
    [0, 0.08, 0.92, 1],
    transitionType === 'slide'
      ? [40, 0, 0, -20]
      : transitionType === 'reveal'
      ? [50, 0, 0, -10]
      : [20, 0, 0, -10]
  );

  const scale = useTransform(
    smoothProgress,
    [0, 0.08, 0.92, 1],
    transitionType === 'scale'
      ? [0.96, 1, 1, 0.98]
      : transitionType === 'reveal'
      ? [0.98, 1, 1, 0.99]
      : [1, 1, 1, 1]
  );

  // blur 和 rotateX 仅 high 使用
  const blur = useTransform(
    smoothProgress,
    [0, 0.08, 0.92, 1],
    deviceLevel === 'high' && transitionType === 'blur' ? [5, 0, 0, 2] : [0, 0, 0, 0]
  );

  const rotateX = useTransform(
    smoothProgress,
    [0, 0.08, 0.92, 1],
    deviceLevel === 'high' && transitionType === 'reveal' ? [3, 0, 0, -1] : [0, 0, 0, 0]
  );

  // 分隔线动画
  const dividerScale = useTransform(smoothProgress, [0, 0.2], [0, 1]);
  const dividerOpacity = useTransform(smoothProgress, [0, 0.2], [0, 1]);

  const useBlurFilter = deviceLevel === 'high' && transitionType === 'blur';
  const useRotate = deviceLevel === 'high' && transitionType === 'reveal';

  return (
    <motion.section
      ref={sectionRef}
      id={id}
      className={`relative ${className}`}
      style={{
        opacity,
        y,
        scale,
        filter: useBlurFilter ? `blur(${blur.get()}px)` : undefined,
        rotateX: useRotate ? rotateX : undefined,
        transformPerspective: useRotate ? 1000 : undefined,
        transformOrigin: 'center center',
      }}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {/* 顶部分隔光效 - SpaceX 深空光谱 */}
      {showTopDivider && (
        <motion.div
          className="absolute left-0 right-0 top-0 h-40 pointer-events-none z-10"
          style={{ opacity: dividerOpacity }}
        >
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(to bottom, rgba(139, 92, 246, 0.06) 0%, rgba(240, 240, 250, 0.02) 30%, transparent 100%)`,
            }}
          />
          <motion.div
            className="absolute top-0 left-[10%] right-[10%] h-[1px]"
            style={{
              background: `linear-gradient(90deg, transparent 0%, rgba(240, 240, 250, 0.2) 20%, rgba(167, 139, 250, 0.5) 50%, rgba(240, 240, 250, 0.2) 80%, transparent 100%)`,
              boxShadow: '0 0 15px rgba(139, 92, 246, 0.3), 0 0 30px rgba(240, 240, 250, 0.1)',
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
        transition={{ duration: 0.6, delay: delay + 0.2 }}
      >
        {children}
      </motion.div>

      {/* 底部分隔光效 - SpaceX 深空光谱 */}
      {showBottomDivider && (
        <motion.div
          className="absolute left-0 right-0 bottom-0 h-40 pointer-events-none z-10"
          style={{ opacity: dividerOpacity }}
        >
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(to top, rgba(99, 102, 241, 0.04) 0%, rgba(240, 240, 250, 0.02) 30%, transparent 100%)`,
            }}
          />
          <motion.div
            className="absolute bottom-0 left-[10%] right-[10%] h-[1px]"
            style={{
              background: `linear-gradient(90deg, transparent 0%, rgba(240, 240, 250, 0.15) 20%, rgba(139, 92, 246, 0.4) 50%, rgba(240, 240, 250, 0.15) 80%, transparent 100%)`,
              boxShadow: '0 0 12px rgba(99, 102, 241, 0.2), 0 0 25px rgba(240, 240, 250, 0.08)',
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
