import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Tag } from 'lucide-react';
import { portfolioData, portfolioCategories, PortfolioItem } from '../../data/portfolio';
import { AnimatedSection } from '../common';

// 作品详情模态框组件
function PortfolioModal({
  item,
  onClose,
}: {
  item: PortfolioItem;
  onClose: () => void;
}) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* 背景遮罩 */}
      <motion.div
        className="absolute inset-0 modal-backdrop"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      {/* 模态框内容 */}
      <motion.div
        className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl glass-strong"
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      >
        {/* 关闭按钮 */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-primary/20 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* 封面图 */}
        <div className="relative h-64 overflow-hidden">
          <img
            src={item.coverImage}
            alt={item.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
          
          {/* 标题覆盖 */}
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
              {item.title}
            </h2>
            <div className="flex flex-wrap gap-2">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full text-xs font-medium bg-primary/20 text-primary border border-primary/30"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* 内容区域 */}
        <div className="p-6 max-h-[calc(90vh-16rem)] overflow-y-auto">
          {/* 描述 */}
          <p className="text-muted-foreground mb-6 text-lg">{item.description}</p>

          {/* Markdown 内容区域 */}
          <div className="prose prose-invert max-w-none">
            {item.detailContent ? (
              <div className="space-y-4">
                {item.detailContent.split('\n').map((line, index) => {
                  if (line.startsWith('## ')) {
                    return (
                      <h2 key={index} className="text-xl font-bold gradient-text mt-6 mb-3">
                        {line.replace('## ', '')}
                      </h2>
                    );
                  }
                  if (line.startsWith('### ')) {
                    return (
                      <h3 key={index} className="text-lg font-semibold text-foreground mt-4 mb-2">
                        {line.replace('### ', '')}
                      </h3>
                    );
                  }
                  if (line.startsWith('- ')) {
                    return (
                      <li key={index} className="text-muted-foreground ml-4">
                        {line.replace('- ', '')}
                      </li>
                    );
                  }
                  if (line.trim()) {
                    return (
                      <p key={index} className="text-muted-foreground">
                        {line}
                      </p>
                    );
                  }
                  return null;
                })}
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <p>详细内容即将更新...</p>
              </div>
            )}
          </div>

          {/* 链接按钮 */}
          {item.link && (
            <div className="mt-8 pt-6 border-t border-border">
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-medium hover:opacity-90 transition-opacity"
              >
                查看完整项目
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

// 作品卡片组件
function PortfolioCard({
  item,
  index,
  onClick,
}: {
  item: PortfolioItem;
  index: number;
  onClick: () => void;
}) {
  const categoryColors: Record<string, string> = {
    'game-analysis': '#f59e0b',
    product: '#10b981',
    aigc: '#8b5cf6',
    design: '#ec4899',
    misc: '#6b7280',
  };

  return (
    <motion.div
      className="group cursor-pointer"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      onClick={onClick}
    >
      <div className="relative glass rounded-2xl overflow-hidden card-hover h-full">
        {/* 封面图 */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={item.coverImage}
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
          
          {/* 分类标签 */}
          <div
            className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium text-white"
            style={{ backgroundColor: categoryColors[item.category] + 'CC' }}
          >
            {portfolioCategories.find((c) => c.id === item.category)?.name ?? '待补充'}
          </div>
        </div>

        {/* 内容 */}
        <div className="p-5">
          <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
            {item.title}
          </h3>
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
            {item.description}
          </p>

          {/* 标签 */}
          <div className="flex flex-wrap gap-2">
            {item.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="flex items-center gap-1 px-2 py-1 rounded-md text-xs bg-muted/50 text-muted-foreground"
              >
                <Tag className="w-3 h-3" />
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* 悬停光效 */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `linear-gradient(135deg, ${categoryColors[item.category]}10 0%, transparent 50%)`,
          }}
        />
      </div>
    </motion.div>
  );
}

export function Portfolio() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);

  const filteredItems =
    activeCategory === 'all'
      ? portfolioData
      : portfolioData.filter((item) => item.category === activeCategory);

  return (
    <section id="portfolio" className="section-padding relative">
      <div className="container-custom">
        <AnimatedSection>
          {/* Section 标题 */}
          <div className="text-center mb-12">
            <motion.span
              className="inline-block px-4 py-1.5 rounded-full text-sm font-medium glass border border-primary/20 text-primary mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              作品集
            </motion.span>
            <motion.h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <span className="gradient-text">Portfolio</span>
            </motion.h2>
            <motion.p
              className="text-muted-foreground text-lg max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              从游戏分析到产品落地，展示我的多维度能力
            </motion.p>
          </div>

          {/* 分类 Tab */}
          <motion.div
            className="flex flex-wrap justify-center gap-3 mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            {portfolioCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                  activeCategory === category.id
                    ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-glow-sm'
                    : 'glass hover:bg-primary/10 text-muted-foreground hover:text-foreground'
                }`}
              >
                {category.name}
              </button>
            ))}
          </motion.div>

          {/* 作品网格 */}
          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
            layout
          >
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item, index) => (
                <PortfolioCard
                  key={item.id}
                  item={item}
                  index={index}
                  onClick={() => setSelectedItem(item)}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        </AnimatedSection>
      </div>

      {/* 作品详情模态框 */}
      <AnimatePresence>
        {selectedItem && (
          <PortfolioModal
            item={selectedItem}
            onClose={() => setSelectedItem(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

export default Portfolio;
