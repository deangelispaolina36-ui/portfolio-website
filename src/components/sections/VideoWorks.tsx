import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Video, Clock, Tag, Film, Plane, Palette, Briefcase, ExternalLink, ChevronRight, Trophy, Calendar } from 'lucide-react';
import { AnimatedSection } from '../common';
import { videoWorksData, videoCategories, videoStats, bilibiliHome, VideoWork } from '../../data/videos';

// B站SVG图标
function BilibiliIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.813 4.653h.854c1.51.054 2.769.578 3.773 1.574 1.004.995 1.524 2.249 1.56 3.76v7.36c-.036 1.51-.556 2.769-1.56 3.773s-2.262 1.524-3.773 1.56H5.333c-1.51-.036-2.769-.556-3.773-1.56S.036 18.858 0 17.347v-7.36c.036-1.511.556-2.765 1.56-3.76 1.004-.996 2.262-1.52 3.773-1.574h.774l-1.174-1.12a1.234 1.234 0 0 1-.373-.906c0-.356.124-.658.373-.907l.027-.027c.267-.249.573-.373.92-.373.347 0 .653.124.92.373L9.653 4.44c.071.071.134.142.187.213h4.267a.836.836 0 0 1 .16-.213l2.853-2.747c.267-.249.573-.373.92-.373.347 0 .662.151.929.4.267.249.391.551.391.907 0 .355-.124.657-.373.906zM5.333 7.24c-.746.018-1.373.276-1.88.773-.506.498-.769 1.13-.786 1.894v7.52c.017.764.28 1.395.786 1.893.507.498 1.134.756 1.88.773h13.334c.746-.017 1.373-.275 1.88-.773.506-.498.769-1.129.786-1.893v-7.52c-.017-.765-.28-1.396-.786-1.894-.507-.497-1.134-.755-1.88-.773zM8 11.107c.373 0 .684.124.933.373.25.249.383.569.4.96v1.173c-.017.391-.15.711-.4.96-.249.25-.56.374-.933.374s-.684-.125-.933-.374c-.25-.249-.383-.569-.4-.96V12.44c.017-.391.15-.711.4-.96.249-.249.56-.373.933-.373zm8 0c.373 0 .684.124.933.373.25.249.383.569.4.96v1.173c-.017.391-.15.711-.4.96-.249.25-.56.374-.933.374s-.684-.125-.933-.374c-.25-.249-.383-.569-.4-.96V12.44c.017-.391.15-.711.4-.96.249-.249.56-.373.933-.373z" />
    </svg>
  );
}

// 分类图标映射（稍大一些用于列表）
const categoryIcons: Record<string, React.ReactNode> = {
  competition: <Film className="w-5 h-5" />,
  aerial: <Plane className="w-5 h-5" />,
  creative: <Palette className="w-5 h-5" />,
  commercial: <Briefcase className="w-5 h-5" />,
};

// 分类颜色映射
const categoryColors: Record<string, { bg: string; text: string; border: string; glow: string }> = {
  competition: { bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/20', glow: 'group-hover:shadow-amber-500/10' },
  aerial: { bg: 'bg-sky-500/10', text: 'text-sky-400', border: 'border-sky-500/20', glow: 'group-hover:shadow-sky-500/10' },
  creative: { bg: 'bg-purple-500/10', text: 'text-purple-400', border: 'border-purple-500/20', glow: 'group-hover:shadow-purple-500/10' },
  commercial: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/20', glow: 'group-hover:shadow-emerald-500/10' },
};

// 紧凑列表项组件
function VideoListItem({ video, index }: { video: VideoWork; index: number }) {
  const category = videoCategories.find((c) => c.id === video.category);
  const colors = categoryColors[video.category] || categoryColors.creative;

  const handleClick = () => {
    if (video.videoUrl) {
      window.open(video.videoUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <motion.div
      className="group cursor-pointer"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      onClick={handleClick}
    >
      <div className={`relative flex items-center gap-4 sm:gap-6 px-5 sm:px-6 py-4 sm:py-5 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.06] hover:border-white/[0.12] transition-all duration-300 group-hover:shadow-lg ${colors.glow}`}>
        {/* 左侧：分类图标 */}
        <div className={`flex-shrink-0 w-11 h-11 sm:w-12 sm:h-12 rounded-xl ${colors.bg} ${colors.border} border flex items-center justify-center ${colors.text} transition-transform duration-300 group-hover:scale-110`}>
          {categoryIcons[video.category]}
        </div>

        {/* 中间：标题 + 标签 */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 sm:gap-3 mb-1.5">
            <h3 className="text-base sm:text-lg font-semibold text-white group-hover:text-purple-300 transition-colors truncate">
              {video.title}
            </h3>
            {video.award && (
              <span className="flex-shrink-0 inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-500/15 border border-amber-500/25 text-amber-400 text-xs font-medium">
                <Trophy className="w-3 h-3" />
                获奖
              </span>
            )}
          </div>
          
          {/* 标签行 */}
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            <span className={`inline-flex items-center gap-1 text-xs font-medium ${colors.text}`}>
              {category?.icon} {category?.name}
            </span>
            <span className="text-white/10">|</span>
            {video.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="hidden sm:inline-flex items-center gap-1 text-xs text-gray-500"
              >
                <Tag className="w-2.5 h-2.5" />
                {tag}
              </span>
            ))}
            {/* 移动端只显示前2个标签 */}
            {video.tags.slice(0, 2).map((tag) => (
              <span
                key={`m-${tag}`}
                className="sm:hidden inline-flex items-center gap-1 text-xs text-gray-500"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* 右侧：时长 + 箭头 */}
        <div className="flex-shrink-0 flex items-center gap-3 sm:gap-4">
          {video.duration && (
            <span className="hidden sm:flex items-center gap-1.5 text-sm text-gray-500 font-mono">
              <Clock className="w-3.5 h-3.5" />
              {video.duration}
            </span>
          )}
          <div className="w-8 h-8 rounded-lg bg-white/[0.04] flex items-center justify-center text-gray-500 group-hover:text-purple-400 group-hover:bg-purple-500/10 transition-all duration-300">
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>

        {/* 悬停高亮线 */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-0 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full group-hover:h-8 transition-all duration-300" />
      </div>
    </motion.div>
  );
}

export function VideoWorks() {
  const [activeCategory, setActiveCategory] = useState('all');

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
          <div className="text-center mb-12">
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

          {/* 分类筛选 + B站入口 - 整合在一行 */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            {/* 分类标签 */}
            <div className="flex flex-wrap gap-2">
              {videoCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`
                    px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300
                    ${activeCategory === category.id
                      ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg shadow-pink-500/25'
                      : 'bg-white/[0.03] hover:bg-white/[0.06] text-gray-400 hover:text-white border border-white/[0.06]'
                    }
                  `}
                >
                  <span className="flex items-center gap-1.5">
                    <span>{category.icon}</span>
                    <span>{category.name}</span>
                  </span>
                </button>
              ))}
            </div>

            {/* B站主页入口 */}
            <a
              href={bilibiliHome}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#00a1d6]/10 hover:bg-[#00a1d6]/20 border border-[#00a1d6]/25 hover:border-[#00a1d6]/40 text-[#00a1d6] font-medium text-sm transition-all duration-300 group"
            >
              <BilibiliIcon className="w-4 h-4" />
              <span>Bilibili 主页</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity" />
            </a>
          </motion.div>

          {/* 视频列表 */}
          <div className="max-w-4xl mx-auto">
            <motion.div className="flex flex-col gap-3" layout>
              <AnimatePresence mode="popLayout">
                {filteredVideos.map((video, index) => (
                  <VideoListItem
                    key={video.id}
                    video={video}
                    index={index}
                  />
                ))}
              </AnimatePresence>
            </motion.div>

            {/* 底部统计 */}
            <motion.div
              className="mt-8 pt-6 border-t border-white/[0.06] flex items-center justify-center gap-6 text-sm text-gray-500"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <span className="flex items-center gap-1.5">
                <Video className="w-3.5 h-3.5" />
                {videoStats.total} 个视频作品
              </span>
              <span className="text-white/10">·</span>
              <span className="flex items-center gap-1.5">
                <Trophy className="w-3.5 h-3.5 text-amber-500" />
                {videoStats.competition} 参赛
              </span>
              <span className="text-white/10">·</span>
              <span className="flex items-center gap-1.5">
                <Plane className="w-3.5 h-3.5 text-sky-500" />
                {videoStats.aerial} 航拍
              </span>
            </motion.div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

export default VideoWorks;
