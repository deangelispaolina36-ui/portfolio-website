import { motion } from 'framer-motion';
import { Heart, Gamepad2, ArrowUp } from 'lucide-react';
import { personalInfo } from '../../data/portfolio';

const footerLinks = [
  { name: '首页', href: '#hero' },
  { name: '关于我', href: '#about' },
  { name: '作品集', href: '#portfolio' },
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
    <footer className="relative z-10 border-t border-[#f0f0fa]/5">
      <div className="container-custom py-12">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          {/* Logo 和简介 */}
          <div className="text-center md:text-left">
            <div className="flex items-center gap-2 justify-center md:justify-start mb-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <Gamepad2 className="w-4 h-4 text-[#f0f0fa]" />
              </div>
              <span className="text-lg font-bold tracking-[2px] gradient-text">{personalInfo.name}</span>
            </div>
            <p className="text-sm text-muted-foreground tracking-[1px]">
              创意策划 | AIGC 探索者
            </p>
          </div>

          {/* 快速链接 */}
          <div className="flex flex-wrap justify-center gap-4">
            {footerLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.href}
                className="text-sm text-[#f0f0fa]/40 hover:text-[#f0f0fa] transition-colors tracking-[1px]"
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

          {/* 返回顶部 - SpaceX 幽灵按钮风 */}
          <div className="flex justify-center md:justify-end">
            <motion.button
              onClick={scrollToTop}
              className="w-10 h-10 rounded-full glass flex items-center justify-center border border-[#f0f0fa]/10 hover:border-[#f0f0fa]/25 transition-all group"
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowUp className="w-5 h-5 text-[#f0f0fa]/40 group-hover:text-[#f0f0fa] transition-colors" />
            </motion.button>
          </div>
        </div>

        {/* 分割线 */}
        <div className="my-8 h-px bg-gradient-to-r from-transparent via-[#f0f0fa]/10 to-transparent" />

        {/* 版权信息 */}
        <div className="text-center">
          <p className="text-sm text-[#f0f0fa]/30 tracking-[2px] uppercase">
            © {new Date().getFullYear()} {personalInfo.name}
          </p>
          <p className="text-xs text-[#f0f0fa]/20 mt-2 flex items-center justify-center gap-1 tracking-[1px]">
            用 <Heart className="w-3 h-3 text-red-500/60 inline" /> 和 AI 制作
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
