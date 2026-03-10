import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Video, Play, Clock, Tag, Film, Plane, Palette, Briefcase } from 'lucide-react';
import { AnimatedSection } from '../common';
import { videoWorksData, videoCategories, videoStats, VideoWork } from '../../data/videos';

// 分类图标映射
const categoryIcons: Record<string, React.ReactNode> = {
  competition: <Film className="w-4 h-4" />,
  aerial: <Plane className="w-4 h-4" />,
  creative: <Palette className="w-4 h-4" />,
  commercial: <Briefcase className="w-4 h-4" />,
};

// 视频卡片组件
function VideoCard({ video, index, onClick }: { video: VideoWork; index: number; onClick: () => void }) {
  const category = videoCategories.find((c) => c.id === video.category);
  
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
        {/* 封面区域 */}
        <div className="relative h-48 overflow-hidden rounded-t-2xl bg-gradient-to-br from-purple-900/50 to-pink-900/50">
          {/* 视频预览占位 */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-white/20">
              <Play className="w-8 h-8 text-white ml-1" />
            </div>
          </div>
          
          {/* 渐变遮罩 */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
          
          {/* 分类标签 */}
          <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full text-xs font-semibold text-white backdrop-blur-md bg-purple-500/70 flex items-center gap-1.5">
            {categoryIcons[video.category]}
            {category?.name}
          </div>
          
          {/* 时长标签 */}
          {video.duration && (
            <div className="absolute top-4 right-4 px-2 py-1 rounded-md text-xs font-medium text-white backdrop-blur-md bg-black/50 flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {video.duration}
            </div>
          )}
          
          {/* 悬停效果 */}
          <div className="absolute inset-0 bg-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* 内容区域 */}
        <div className="p-6">
          <h3 className="text-lg font-bold text-white mb-2 group-hover:text-purple-300 transition-colors line-clamp-2">
            {video.title}
          </h3>
          <p className="text-sm text-gray-400 mb-4 line-clamp-2">
            {video.description}
          </p>
          
          {/* 标签 */}
          <div className="flex flex-wrap gap-2">
            {video.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="flex items-center gap-1 px-2.5 py-1 rounded-md text-xs bg-white/5 text-gray-400 border border-white/10"
              >
                <Tag className="w-3 h-3" />
                {tag}
              </span>
            ))}
          </div>
          
          {/* 获奖信息 */}
          {video.award && (
            <div className="mt-4 pt-4 border-t border-white/10">
              <span className="text-xs text-amber-400">🏆 {video.award}</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// 视频详情模态框
function VideoModal({ video, onClose }: { video: VideoWork; onClose: () => void }) {
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
      />
      
      {/* 模态框内容 */}
      <motion.div
        className="relative w-full max-w-3xl rounded-3xl glass-card-premium border border-purple-500/20 overflow-hidden"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
      >
        {/* 视频预览区 */}
        <div className="relative aspect-video bg-gradient-to-br from-purple-900/50 to-pink-900/50 flex items-center justify-center">
          <div className="text-center">
            <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center mx-auto mb-4 border border-white/20">
              <Play className="w-10 h-10 text-white ml-1" />
            </div>
            <p className="text-gray-400 text-sm">视频预览功能即将上线</p>
          </div>
        </div>
        
        {/* 内容区 */}
        <div className="p-8">
          <h2 className="text-2xl font-bold text-white mb-3">{video.title}</h2>
          <p className="text-gray-300 mb-6">{video.description}</p>
          
          <div className="flex flex-wrap gap-4 text-sm text-gray-400">
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              {video.duration || '未知时长'}
            </span>
            <span className="flex items-center gap-2">
              <Film className="w-4 h-4" />
              {video.date}
            </span>
          </div>
          
          {video.award && (
            <div className="mt-6 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
              <span className="text-amber-400 font-medium">🏆 {video.award}</span>
            </div>
          )}
          
          <button
            onClick={onClose}
            className="mt-6 w-full py-3 rounded-xl bg-white/10 hover:bg-white/20 transition-colors text-white font-medium"
          >
            关闭
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function VideoWorks() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedVideo, setSelectedVideo] = useState<VideoWork | null>(null);
  
  const filteredVideos = activeCategory === 'all'
    ? videoWorksData
    : videoWorksData.filter((v) => v.category === activeCategory);
  
  return (
    <section id="videos" className="section-padding relative overflow-hidden section-bg-gradient-3">
      {/* 背景装饰 */}
      <div className="absolute inset-0 section-grid-dots opacity-20" />
      <div className="floating-orb floating-orb-1" />
      <div className="floating-orb floating-orb-3" />
      
      {/* 顶部分隔线 */}
      <div className="absolute top-0 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-pink-500/30 to-transparent" />

      <div className="container-custom relative z-10">
        <AnimatedSection>
          {/* Section 标题 */}
          <div className="text-center mb-14">
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium glass-card-premium border border-pink-500/20 text-pink-400 mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Video className="w-4 h-4" />
              视频作品
            </motion.div>
            <motion.h2
              className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <span className="gradient-text-vivid">Video Works</span>
            </motion.h2>
            <motion.p
              className="text-gray-400 text-lg max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              从参赛作品到航拍摄影，用镜头记录精彩瞬间
            </motion.p>
          </div>

          {/* 统计概览 */}
          <motion.div
            className="flex justify-center gap-8 mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <div className="text-center">
              <div className="text-3xl font-bold gradient-text-vivid">{videoStats.total}</div>
              <div className="text-sm text-gray-400">视频作品</div>
            </div>
            <div className="w-px bg-white/10" />
            <div className="text-center">
              <div className="text-3xl font-bold gradient-text-vivid">{videoStats.competition}</div>
              <div className="text-sm text-gray-400">参赛作品</div>
            </div>
            <div className="w-px bg-white/10" />
            <div className="text-center">
              <div className="text-3xl font-bold gradient-text-vivid">{videoStats.aerial}</div>
              <div className="text-sm text-gray-400">航拍作品</div>
            </div>
          </motion.div>

          {/* 分类标签 */}
          <motion.div
            className="flex flex-wrap justify-center gap-3 mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            {videoCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`
                  px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300
                  ${activeCategory === category.id
                    ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg shadow-pink-500/25'
                    : 'glass-card-premium hover:bg-white/5 text-gray-400 hover:text-white border border-white/10'
                  }
                `}
              >
                <span className="flex items-center gap-2">
                  <span>{category.icon}</span>
                  <span>{category.name}</span>
                </span>
              </button>
            ))}
          </motion.div>

          {/* 视频网格 */}
          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
            layout
          >
            <AnimatePresence mode="popLayout">
              {filteredVideos.map((video, index) => (
                <VideoCard
                  key={video.id}
                  video={video}
                  index={index}
                  onClick={() => setSelectedVideo(video)}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        </AnimatedSection>
      </div>

      {/* 视频详情模态框 */}
      <AnimatePresence>
        {selectedVideo && (
          <VideoModal video={selectedVideo} onClose={() => setSelectedVideo(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}

export default VideoWorks;
