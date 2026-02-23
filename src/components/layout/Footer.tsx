import { motion } from 'framer-motion';
import { Heart, Gamepad2, ArrowUp } from 'lucide-react';
import { personalInfo } from '../../data/portfolio';

const footerLinks = [
  { name: '首页', href: '#hero' },
  { name: '关于我', href: '#about' },
  { name: '作品集', href: '#portfolio' },
  { name: '联系', href: '#contact' },
];

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative z-10 border-t border-border">
      <div className="container-custom py-12">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          {/* Logo 和简介 */}
          <div className="text-center md:text-left">
            <div className="flex items-center gap-2 justify-center md:justify-start mb-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <Gamepad2 className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold gradient-text">{personalInfo.name}</span>
            </div>
            <p className="text-sm text-muted-foreground">
              游戏产品策划 | AIGC 爱好者
            </p>
          </div>

          {/* 快速链接 */}
          <div className="flex flex-wrap justify-center gap-4">
            {footerLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.href);
                }}
                whileHover={{ y: -2 }}
              >
                {link.name}
              </motion.a>
            ))}
          </div>

          {/* 返回顶部 */}
          <div className="flex justify-center md:justify-end">
            <motion.button
              onClick={scrollToTop}
              className="w-10 h-10 rounded-xl glass flex items-center justify-center hover:bg-primary/10 transition-colors group"
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowUp className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </motion.button>
          </div>
        </div>

        {/* 分割线 */}
        <div className="my-8 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

        {/* 版权信息 */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground/70 mt-2 flex items-center justify-center gap-1">
            用 <Heart className="w-3 h-3 text-red-500 inline" /> 和 AI 制作
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
