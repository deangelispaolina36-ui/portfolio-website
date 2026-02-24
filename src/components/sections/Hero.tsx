import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowDown, Mail } from 'lucide-react';
import { personalInfo } from '../../data/portfolio';
import { useRef, useEffect, useState } from 'react';

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [windowHeight, setWindowHeight] = useState(0);
  
  // 获取滚动进度
  const { scrollY } = useScroll();
  
  // 使用 spring 让动画更平滑
  const smoothScrollY = useSpring(scrollY, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // 背景图片视差效果
  const backgroundY = useTransform(smoothScrollY, [0, windowHeight], [0, windowHeight * 0.3]);
  const backgroundScale = useTransform(smoothScrollY, [0, windowHeight], [1, 1.15]);
  
  // 底部融合层透明度 - 随滚动增强
  const fadeOverlayOpacity = useTransform(smoothScrollY, [0, windowHeight * 0.5, windowHeight], [0, 0.6, 1]);
  
  // 文字内容视差效果
  const textOpacity = useTransform(smoothScrollY, [0, windowHeight * 0.5], [1, 0]);
  const textY = useTransform(smoothScrollY, [0, windowHeight], [0, -windowHeight * 0.2]);

  useEffect(() => {
    setWindowHeight(window.innerHeight);
    const handleResize = () => setWindowHeight(window.innerHeight);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const scrollToPortfolio = () => {
    document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* 固定定位的背景层 - 全屏背景图 */}
      <div className="fixed inset-0 w-full h-screen z-0 overflow-hidden">
        <motion.div 
          className="hero-parallax-bg"
          style={{
            y: backgroundY,
            scale: backgroundScale,
            backgroundImage: `url('/image/hero-bg.png')`,
          }}
        >
          {/* 智能遮罩层 - 从左到右渐变 */}
          <div className="hero-smart-gradient" />
        </motion.div>
        
        {/* 底部融合过渡层 - 创造无缝过渡效果 */}
        <motion.div 
          className="hero-fade-overlay"
          style={{ opacity: fadeOverlayOpacity }}
        />
      </div>

      {/* 首屏内容区 - 相对定位，可滚动 */}
      <section 
        ref={containerRef}
        id="hero" 
        className="hero-section-parallax"
      >
        {/* 装饰性大数字 */}
        <div className="hero-decorative-number-parallax">10</div>

        {/* 内容区域 - 左侧 */}
        <motion.div 
          className="hero-content-parallax"
          style={{
            opacity: textOpacity,
            y: textY,
          }}
        >
          <div className="hero-text-wrapper">
            {/* 顶部装饰线 + Portfolio标识 */}
            <motion.div
              className="hero-decoration-top"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <span className="hero-decoration-line" />
              <span className="hero-decoration-text">PORTFOLIO 2025</span>
            </motion.div>

            {/* 状态指示器 */}
            <motion.div
              className="hero-status-parallax"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <span className="hero-status-dot-parallax" />
              <span className="hero-status-text-parallax">OPEN TO WORK</span>
            </motion.div>

            {/* 主标题 - 极大无衬线字体 */}
            <motion.h1
              className="hero-title-parallax"
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.9, ease: 'easeOut' }}
            >
              {personalInfo.name}
            </motion.h1>

            {/* Slogan - 细体 */}
            <motion.div
              className="hero-slogan-wrapper"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <div className="hero-slogan-line" />
              <p className="hero-slogan-parallax">
                以玩家视角，构建虚拟世界
              </p>
            </motion.div>

            {/* 副标题标签 */}
            <motion.p
              className="hero-subtitle-parallax"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              10年游戏人 · 腾讯实习 · AIGC 探索者
            </motion.p>

            {/* CTA 按钮组 */}
            <motion.div
              className="hero-buttons-parallax"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              {/* 主按钮 - 毛玻璃拟态 */}
              <motion.button
                onClick={scrollToPortfolio}
                className="hero-btn-glass"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="hero-btn-glass-text">探索作品</span>
                <span className="hero-btn-glass-hover-bg" />
              </motion.button>
              
              {/* 次按钮 - 纯文本链接 */}
              <motion.button
                onClick={scrollToContact}
                className="hero-btn-ghost"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Mail className="w-4 h-4" />
                <span>联系我</span>
              </motion.button>
            </motion.div>

            {/* 底部邮箱信息 */}
            <motion.div
              className="hero-footer-parallax"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
            >
              <div className="hero-footer-line-parallax" />
              <p className="hero-footer-label-parallax">CONTACT</p>
              <a 
                href={`mailto:${personalInfo.email}`}
                className="hero-footer-email-parallax"
              >
                {personalInfo.email}
              </a>
            </motion.div>
          </div>
        </motion.div>

        {/* 右下角英文装饰 */}
        <motion.div
          className="hero-decoration-corner"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <span>IMMERSIVE</span>
          <span>EXPERIENCE</span>
        </motion.div>

        {/* 滚动提示 */}
        <motion.div
          className="hero-scroll-hint-parallax"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <motion.div
            className="hero-scroll-content-parallax"
            onClick={scrollToPortfolio}
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <span>SCROLL</span>
            <ArrowDown className="w-4 h-4" />
          </motion.div>
        </motion.div>
      </section>
    </>
  );
}

export default Hero;
