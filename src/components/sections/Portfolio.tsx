import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Tag, Layers, ChevronLeft, ChevronRight, Image } from 'lucide-react';
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
  const [imageError, setImageError] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [showGallery, setShowGallery] = useState(false);
  
  const hasGallery = item.gallery && item.gallery.length > 0;
  
  const nextImage = () => {
    if (hasGallery) {
      setGalleryIndex((prev) => (prev + 1) % item.gallery!.length);
    }
  };
  
  const prevImage = () => {
    if (hasGallery) {
      setGalleryIndex((prev) => (prev - 1 + item.gallery!.length) % item.gallery!.length);
    }
  };
  
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* 背景遮罩 */}
      <motion.div
        className="absolute inset-0 bg-slate-950/95 backdrop-blur-xl"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      {/* 模态框内容 */}
      <motion.div
        className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-3xl glass-card-premium border border-purple-500/20"
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      >
        {/* 关闭按钮 */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-white/20 transition-colors border border-white/10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* 封面图 */}
        <div className="relative h-72 overflow-hidden">
          {!imageError ? (
            <img
              src={item.coverImage}
              alt={item.title}
              className="w-full h-full object-cover"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 flex items-center justify-center">
              <span className="text-7xl opacity-80">🎨</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />
          
          {/* 画廊按钮 */}
          {hasGallery && (
            <button
              onClick={() => setShowGallery(true)}
              className="absolute top-4 left-4 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md flex items-center gap-2 hover:bg-white/20 transition-colors border border-white/10 text-sm text-white"
            >
              <Image className="w-4 h-4" />
              查看画廊 ({item.gallery!.length})
            </button>
          )}
          
          {/* 标题覆盖 */}
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
              {item.title}
            </h2>
            <div className="flex flex-wrap gap-2">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full text-xs font-medium bg-purple-500/20 text-purple-300 border border-purple-500/30"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* 内容区域 */}
        <div className="p-8 max-h-[calc(90vh-18rem)] overflow-y-auto">
          {/* 描述 */}
          <p className="text-gray-300 mb-8 text-lg leading-relaxed">{item.description}</p>

          {/* 画廊缩略图 */}
          {hasGallery && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Image className="w-5 h-5 text-purple-400" />
                作品画廊
              </h3>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                {item.gallery!.map((img, idx) => (
                  <motion.div
                    key={idx}
                    className="relative aspect-square rounded-lg overflow-hidden cursor-pointer border-2 border-transparent hover:border-purple-500/50 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    onClick={() => {
                      setGalleryIndex(idx);
                      setShowGallery(true);
                    }}
                  >
                    <img
                      src={img}
                      alt={`${item.title} - ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20 hover:bg-black/0 transition-colors" />
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Markdown 内容区域 */}
          <div className="prose prose-invert max-w-none">
            {item.detailContent ? (
              <div className="space-y-4">
                {item.detailContent.split('\n').map((line, index) => {
                  if (line.startsWith('## ')) {
                    return (
                      <h2 key={index} className="text-xl font-bold gradient-text-vivid mt-8 mb-4">
                        {line.replace('## ', '')}
                      </h2>
                    );
                  }
                  if (line.startsWith('### ')) {
                    return (
                      <h3 key={index} className="text-lg font-semibold text-white mt-6 mb-3">
                        {line.replace('### ', '')}
                      </h3>
                    );
                  }
                  if (line.startsWith('- ')) {
                    return (
                      <li key={index} className="text-gray-400 ml-4 list-disc">
                        {line.replace('- ', '')}
                      </li>
                    );
                  }
                  if (line.trim()) {
                    return (
                      <p key={index} className="text-gray-400">
                        {line}
                      </p>
                    );
                  }
                  return null;
                })}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <p>详细内容即将更新...</p>
              </div>
            )}
          </div>

          {/* 链接按钮 */}
          {item.link && (
            <div className="mt-10 pt-8 border-t border-white/10">
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gradient-vivid inline-flex items-center gap-2"
              >
                <span>查看完整项目</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          )}
        </div>
      </motion.div>

      {/* 全屏画廊查看器 */}
      <AnimatePresence>
        {showGallery && hasGallery && (
          <motion.div
            className="fixed inset-0 z-60 bg-black/95 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowGallery(false)}
          >
            {/* 关闭按钮 */}
            <button
              onClick={() => setShowGallery(false)}
              className="absolute top-6 right-6 z-10 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {/* 图片计数 */}
            <div className="absolute top-6 left-6 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md text-white text-sm">
              {galleryIndex + 1} / {item.gallery!.length}
            </div>

            {/* 左箭头 */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              className="absolute left-6 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>

            {/* 图片 */}
            <motion.img
              key={galleryIndex}
              src={item.gallery![galleryIndex]}
              alt={`${item.title} - ${galleryIndex + 1}`}
              className="max-w-[85vw] max-h-[85vh] object-contain rounded-lg"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
            />

            {/* 右箭头 */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              className="absolute right-6 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              <ChevronRight className="w-8 h-8" />
            </button>

            {/* 缩略图导航 */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 px-4 py-3 rounded-2xl bg-white/10 backdrop-blur-md">
              {item.gallery!.map((img, idx) => (
                <button
                  key={idx}
                  onClick={(e) => {
                    e.stopPropagation();
                    setGalleryIndex(idx);
                  }}
                  className={`w-12 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                    idx === galleryIndex ? 'border-purple-500 scale-110' : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
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
  const [imageError, setImageError] = useState(false);
  
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
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      onClick={onClick}
    >
      <div className="portfolio-card-enhanced relative h-full">
        {/* 封面图 */}
        <div className="relative h-52 overflow-hidden rounded-t-2xl">
          {!imageError ? (
            <img
              src={item.coverImage}
              alt={item.title}
              className="card-image w-full h-full object-cover"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 flex items-center justify-center">
              <span className="text-5xl opacity-80">🎨</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
          
          {/* 分类标签 */}
          <div
            className="absolute top-4 left-4 px-3 py-1.5 rounded-full text-xs font-semibold text-white backdrop-blur-md"
            style={{ backgroundColor: categoryColors[item.category] + 'CC' }}
          >
            {portfolioCategories.find((c) => c.id === item.category)?.name ?? '待补充'}
          </div>
          
          {/* 悬停遮罩 */}
          <div className="absolute inset-0 bg-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* 内容 */}
        <div className="p-6">
          <h3 className="text-lg font-bold text-white mb-2 group-hover:text-purple-300 transition-colors line-clamp-2">
            {item.title}
          </h3>
          <p className="text-sm text-gray-400 mb-4 line-clamp-2">
            {item.description}
          </p>

          {/* 标签 */}
          <div className="flex flex-wrap gap-2">
            {item.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="flex items-center gap-1 px-2.5 py-1 rounded-md text-xs bg-white/5 text-gray-400 border border-white/10"
              >
                <Tag className="w-3 h-3" />
                {tag}
              </span>
            ))}
          </div>
        </div>
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
    <section id="portfolio" className="section-padding relative overflow-hidden section-bg-gradient-1">
      {/* 背景装饰 */}
      <div className="absolute inset-0 section-grid-dots opacity-20" />
      <div className="floating-orb floating-orb-1" />
      <div className="floating-orb floating-orb-3" />
      
      {/* 顶部分隔线 */}
      <div className="absolute top-0 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />

      <div className="container-custom relative z-10">
        <AnimatedSection>
          {/* Section 标题 */}
          <div className="text-center mb-14">
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium glass-card-premium border border-purple-500/20 text-purple-400 mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Layers className="w-4 h-4" />
              作品集
            </motion.div>
            <motion.h2
              className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <span className="gradient-text-vivid">Portfolio</span>
            </motion.h2>
            <motion.p
              className="text-gray-400 text-lg max-w-2xl mx-auto"
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
            className="flex flex-wrap justify-center gap-3 mb-14"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            {portfolioCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                  activeCategory === category.id
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/25'
                    : 'glass-card-premium hover:bg-white/5 text-gray-400 hover:text-white border border-white/10'
                }`}
              >
                {category.name}
              </button>
            ))}
          </motion.div>

          {/* 作品网格 */}
          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
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
