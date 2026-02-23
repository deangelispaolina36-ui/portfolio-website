import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Gamepad2 } from 'lucide-react';

const navLinks = [
  { name: '首页', href: '#hero' },
  { name: '关于我', href: '#about' },
  { name: '游戏履历', href: '#gaming' },
  { name: '作品集', href: '#portfolio' },
  { name: '工作经历', href: '#experience' },
  { name: '技能', href: '#skills' },
  { name: '联系', href: '#contact' },
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
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'glass-strong py-3' : 'py-5'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.a
              href="#hero"
              className="flex items-center gap-2 text-xl font-bold"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('#hero');
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <Gamepad2 className="w-5 h-5 text-white" />
              </div>
              <span className="gradient-text hidden sm:inline">王泰然</span>
            </motion.a>

            {/* 桌面端导航 */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeSection === link.href.replace('#', '')
                      ? 'text-primary bg-primary/10'
                      : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.href);
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {link.name}
                </motion.a>
              ))}
            </div>

            {/* CTA 按钮 */}
            <div className="hidden lg:block">
              <motion.a
                href="#contact"
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-medium text-sm btn-neon"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('#contact');
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                联系我
              </motion.a>
            </div>

            {/* 移动端菜单按钮 */}
            <motion.button
              className="lg:hidden w-10 h-10 rounded-xl glass flex items-center justify-center"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              whileTap={{ scale: 0.9 }}
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* 移动端菜单 */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* 背景遮罩 */}
            <motion.div
              className="absolute inset-0 bg-background/95 backdrop-blur-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* 菜单内容 */}
            <motion.div
              className="absolute top-20 left-4 right-4 glass-strong rounded-2xl p-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            >
              <nav className="space-y-2">
                {navLinks.map((link, index) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    className={`block px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                      activeSection === link.href.replace('#', '')
                        ? 'text-primary bg-primary/10'
                        : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.href);
                    }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    {link.name}
                  </motion.a>
                ))}
              </nav>

              <div className="mt-6 pt-6 border-t border-border">
                <motion.a
                  href="#contact"
                  className="block w-full py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-medium text-center"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('#contact');
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  联系我
                </motion.a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;
