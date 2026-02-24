import { motion } from 'framer-motion';
import { ArrowDown, Mail } from 'lucide-react';
import { personalInfo } from '../../data/portfolio';

export function Hero() {
  const scrollToPortfolio = () => {
    document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section 
      id="hero" 
      className="hero-immersive"
      style={{
        backgroundImage: `url('/image/主页头像.png')`,
      }}
    >
      {/* 渐变遮罩层 - 左深右透 */}
      <div className="hero-gradient-overlay" />
      
      {/* 装饰性大数字 "10" - 极低透明度 */}
      <div className="hero-decorative-number">10</div>

      {/* 内容区域 - 左侧 */}
      <div className="hero-content-wrapper">
        <motion.div 
          className="hero-text-content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {/* 英文装饰字 - 极细 */}
          <motion.p
            className="hero-subtitle-en"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            GAME DESIGNER & CONTENT CREATOR
          </motion.p>

          {/* 状态指示器 */}
          <motion.div
            className="hero-status"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <span className="hero-status-dot" />
            <span className="hero-status-text">OPEN TO WORK</span>
          </motion.div>

          {/* 主标题 - 现代无衬线黑体 */}
          <motion.h1
            className="hero-title"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: 'easeOut' }}
          >
            {personalInfo.name}
          </motion.h1>

          {/* Slogan */}
          <motion.p
            className="hero-slogan"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            以玩家视角，构建虚拟世界
          </motion.p>

          {/* 标签 - 文字+圆点分隔 */}
          <motion.div
            className="hero-tags"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            <span>游戏策划</span>
            <span className="hero-tag-dot" />
            <span>内容运营</span>
            <span className="hero-tag-dot" />
            <span>AIGC</span>
          </motion.div>

          {/* CTA 按钮 */}
          <motion.div
            className="hero-buttons"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            {/* 主按钮 - 极光玻璃拟态 */}
            <motion.button
              onClick={scrollToPortfolio}
              className="hero-btn-primary"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              探索作品
            </motion.button>
            
            {/* 次按钮 - 透明+下划线 */}
            <motion.a
              href={`mailto:${personalInfo.email}`}
              className="hero-btn-secondary"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Mail className="w-4 h-4" />
              <span>联系我</span>
            </motion.a>
          </motion.div>

          {/* 底部信息 */}
          <motion.div
            className="hero-footer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <div className="hero-footer-line" />
            <p className="hero-footer-label">CONTACT</p>
            <a 
              href={`mailto:${personalInfo.email}`}
              className="hero-footer-email"
            >
              {personalInfo.email}
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* 滚动提示 */}
      <motion.div
        className="hero-scroll-hint"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        <motion.div
          className="hero-scroll-content"
          onClick={scrollToPortfolio}
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span>SCROLL</span>
          <ArrowDown className="w-4 h-4" />
        </motion.div>
      </motion.div>
    </section>
  );
}

export default Hero;
