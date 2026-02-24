import { motion } from 'framer-motion';
import { Download, ArrowDown, Mail, Phone } from 'lucide-react';
import { personalInfo } from '../../data/portfolio';

export function Hero() {
  const scrollToPortfolio = () => {
    document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="container-custom w-full">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
          {/* 左侧：文字内容 */}
          <motion.div
            className="flex-1 text-center lg:text-left"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            {/* 标签 */}
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-sm text-muted-foreground">正在寻找运营或产品相关的工作</span>
            </motion.div>

            {/* 主标题 */}
            <motion.h1
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold font-display mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <span className="text-foreground">{personalInfo.name}</span>
              {personalInfo.title?.trim() && (
                <>
                  <span className="mx-4 text-muted-foreground">|</span>
                  <span className="text-lg sm:text-xl lg:text-2xl text-muted-foreground font-semibold">
                    {personalInfo.title}
                  </span>
                </>
              )}
            </motion.h1>

            {/* 副标题 */}
            <motion.p
              className="text-lg sm:text-xl lg:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              {personalInfo.subtitle}
            </motion.p>

            {/* 目标公司标签 */}
            <motion.div
              className="flex flex-wrap gap-3 justify-center lg:justify-start mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              {personalInfo.targetCompanies.map((company, index) => (
                <span
                  key={company}
                  className="px-4 py-1.5 rounded-full text-sm font-medium glass border border-primary/20 text-primary"
                  style={{
                    animationDelay: `${index * 0.1}s`,
                  }}
                >
                  {company}
                </span>
              ))}
            </motion.div>

            {/* CTA 按钮 */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <button
                onClick={scrollToPortfolio}
                className="group relative px-8 py-4 bg-gradient-to-r from-primary to-secondary rounded-xl font-semibold text-white overflow-hidden btn-neon"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  查看作品
                  <ArrowDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
                </span>
              </button>
              
              <a
                href="/resume.pdf"
                download="王泰然-游戏产品策划-简历.pdf"
                className="px-8 py-4 rounded-xl font-semibold glass border border-white/10 hover:border-primary/50 hover:bg-primary/10 transition-all duration-300"
              >
                <span className="flex items-center justify-center gap-2">
                  <Download className="w-5 h-5" />
                  下载简历
                </span>
              </a>
            </motion.div>

            {/* 快捷联系方式 */}
            <motion.div
              className="flex flex-wrap gap-6 justify-center lg:justify-start mt-8 text-sm text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              <a
                href={`mailto:${personalInfo.email}`}
                className="flex items-center gap-2 hover:text-primary transition-colors"
              >
                <Mail className="w-4 h-4" />
                {personalInfo.email}
              </a>
              <a
                href={`tel:${personalInfo.phone}`}
                className="flex items-center gap-2 hover:text-primary transition-colors"
              >
                <Phone className="w-4 h-4" />
                {personalInfo.phone}
              </a>
            </motion.div>
          </motion.div>

          {/* 右侧：头像 */}
          <motion.div
            className="flex-shrink-0"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8, ease: 'easeOut' }}
          >
            <div className="relative">
              {/* 光晕背景 */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/30 to-secondary/30 blur-3xl scale-125" />
              
              {/* 六边形边框 */}
              <div className="relative">
                <div className="hexagon w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 bg-gradient-to-br from-primary to-secondary p-1">
                  <div className="hexagon w-full h-full bg-card flex items-center justify-center overflow-hidden">
                    {/* 真实头像 */}
                    <img
                      src="/image/证件照.png"
                      alt={personalInfo.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* 装饰元素 */}
                <motion.div
                  className="absolute -top-4 -right-4 w-8 h-8 rounded-full bg-gradient-to-r from-primary to-secondary"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <motion.div
                  className="absolute -bottom-2 -left-2 w-6 h-6 rounded-full bg-accent"
                  animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
                />
                <motion.div
                  className="absolute top-1/2 -right-8 w-4 h-4 rounded-full bg-secondary"
                  animate={{ y: [-10, 10, -10], opacity: [0.3, 0.8, 0.3] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* 滚动提示 */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        <motion.div
          className="flex flex-col items-center gap-2 text-muted-foreground cursor-pointer"
          onClick={scrollToPortfolio}
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <span className="text-sm">向下滚动</span>
          <ArrowDown className="w-5 h-5" />
        </motion.div>
      </motion.div>
    </section>
  );
}

export default Hero;
