import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { name: 'HOME', href: '#hero' },
  { name: 'ABOUT', href: '#about' },
  { name: 'GAMES', href: '#gaming' },
  { name: 'WORKS', href: '#portfolio' },
  { name: 'VIDEO', href: '#videos' },
  { name: 'CAREER', href: '#experience' },
  { name: 'AWARDS', href: '#awards' },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  // 监听滚动
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // 更新当前活动 section
      const sections = navLinks.map((link) => link.href.replace('#', ''));
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 移动端菜单打开时锁定背景滚动
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // 平滑滚动到指定区域
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* 桌面端：左侧垂直极简导航 */}
      <motion.nav
        className="fixed left-8 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col items-center gap-8"
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }}
      >
        {/* 垂直线 - 顶部 */}
        <motion.div 
          className="w-px h-16 bg-gradient-to-b from-transparent to-white/20"
          initial={{ height: 0 }}
          animate={{ height: 64 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        />

        {/* 导航链接 */}
        {navLinks.map((link, index) => (
          <motion.a
            key={link.name}
            href={link.href}
            className={`group relative text-xs tracking-[3px] font-light transition-all duration-300 ${
              activeSection === link.href.replace('#', '')
                ? 'text-white'
                : 'text-white/40 hover:text-white'
            }`}
            style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
            onClick={(e) => {
              e.preventDefault();
              scrollToSection(link.href);
            }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
            whileHover={{ x: 4 }}
          >
            {link.name}
            {/* 活动指示器 */}
            <motion.span
              className={`absolute left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-amber-400 ${
                activeSection === link.href.replace('#', '') ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'
              }`}
              style={{ bottom: '-12px' }}
              layoutId="navIndicator"
            />
          </motion.a>
        ))}

        {/* 垂直线 - 底部 */}
        <motion.div 
          className="w-px h-16 bg-gradient-to-t from-transparent to-white/20"
          initial={{ height: 0 }}
          animate={{ height: 64 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        />

        {/* 联系按钮 */}
        <motion.a
          href="#contact"
          className="text-xs tracking-[3px] font-light text-amber-400/80 hover:text-amber-400 transition-colors"
          style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
          onClick={(e) => {
            e.preventDefault();
            scrollToSection('#contact');
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.5 }}
          whileHover={{ x: 4 }}
        >
          CONTACT
        </motion.a>
      </motion.nav>

      {/* 移动端导航栏 */}
      <motion.div
        className={`fixed top-0 left-0 right-0 z-50 lg:hidden transition-all duration-500 ${
          isScrolled ? 'bg-[#0f172a]/95 backdrop-blur-xl py-4 border-b border-white/5' : 'py-5'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between">
            {/* Logo - 极简文字 */}
            <motion.a
              href="#hero"
              className="flex items-center gap-3"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('#hero');
              }}
            >
              <span className="text-lg font-editorial tracking-wide text-white">TR</span>
              <span className="text-xs text-white/40 tracking-[2px] uppercase">Wang</span>
            </motion.a>

            {/* 菜单按钮 - 极简风格 */}
            <motion.button
              className="w-10 h-10 flex items-center justify-center relative"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="flex flex-col justify-center items-center gap-1.5"
                animate={isMobileMenuOpen ? 'open' : 'closed'}
              >
                <motion.span
                  className="w-6 h-px bg-white block"
                  variants={{
                    open: { rotate: 45, y: 3.5 },
                    closed: { rotate: 0, y: 0 }
                  }}
                  transition={{ duration: 0.3 }}
                />
                <motion.span
                  className="w-6 h-px bg-white block"
                  variants={{
                    open: { rotate: -45, y: -3.5 },
                    closed: { rotate: 0, y: 0 }
                  }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* 移动端全屏菜单 */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* 背景 */}
            <motion.div
              className="absolute inset-0 bg-[#0f172a]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* 菜单内容 */}
            <motion.div
              className="absolute inset-0 flex flex-col items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <nav className="flex flex-col items-center gap-8">
                {navLinks.map((link, index) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    className={`text-2xl font-editorial tracking-[8px] transition-all ${
                      activeSection === link.href.replace('#', '')
                        ? 'text-white'
                        : 'text-white/50 hover:text-white'
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.href);
                    }}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -30 }}
                    transition={{ delay: index * 0.08, duration: 0.4 }}
                  >
                    {link.name}
                  </motion.a>
                ))}
              </nav>

              {/* 底部装饰 */}
              <motion.div
                className="absolute bottom-12 flex flex-col items-center gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <div className="w-px h-12 bg-gradient-to-b from-white/20 to-transparent" />
                <span className="text-xs text-white/30 tracking-[3px]">PORTFOLIO 2026</span>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;
