import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from 'framer-motion';
import { Video, Clock, Tag, Film, Plane, Palette, Briefcase, ExternalLink, ChevronRight, Trophy, ChevronDown, ChevronUp } from 'lucide-react';
import { AnimatedSection } from '../common';
import {
  videoWorksData, videoCategories, videoStats, bilibiliHome, VideoWork,
  tencentFeaturedVideos, tencentAllVideos, tencentVideoStats, TencentVideo,
} from '../../data/videos';
import { useEffect } from 'react';

// B站SVG图标
function BilibiliIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.813 4.653h.854c1.51.054 2.769.578 3.773 1.574 1.004.995 1.524 2.249 1.56 3.76v7.36c-.036 1.51-.556 2.769-1.56 3.773s-2.262 1.524-3.773 1.56H5.333c-1.51-.036-2.769-.556-3.773-1.56S.036 18.858 0 17.347v-7.36c.036-1.511.556-2.765 1.56-3.76 1.004-.996 2.262-1.52 3.773-1.574h.774l-1.174-1.12a1.234 1.234 0 0 1-.373-.906c0-.356.124-.658.373-.907l.027-.027c.267-.249.573-.373.92-.373.347 0 .653.124.92.373L9.653 4.44c.071.071.134.142.187.213h4.267a.836.836 0 0 1 .16-.213l2.853-2.747c.267-.249.573-.373.92-.373.347 0 .662.151.929.4.267.249.391.551.391.907 0 .355-.124.657-.373.906zM5.333 7.24c-.746.018-1.373.276-1.88.773-.506.498-.769 1.13-.786 1.894v7.52c.017.764.28 1.395.786 1.893.507.498 1.134.756 1.88.773h13.334c.746-.017 1.373-.275 1.88-.773.506-.498.769-1.129.786-1.893v-7.52c-.017-.765-.28-1.396-.786-1.894-.507-.497-1.134-.755-1.88-.773zM8 11.107c.373 0 .684.124.933.373.25.249.383.569.4.96v1.173c-.017.391-.15.711-.4.96-.249.25-.56.374-.933.374s-.684-.125-.933-.374c-.25-.249-.383-.569-.4-.96V12.44c.017-.391.15-.711.4-.96.249-.249.56-.373.933-.373zm8 0c.373 0 .684.124.933.373.25.249.383.569.4.96v1.173c-.017.391-.15.711-.4.96-.249.25-.56.374-.933.374s-.684-.125-.933-.374c-.25-.249-.383-.569-.4-.96V12.44c.017-.391.15-.711.4-.96.249-.249.56-.373.933-.373z" />
    </svg>
  );
}

// 抖音SVG图标
function DouyinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.525 2.01c1.27-.018 2.533-.007 3.795-.012.084 1.44.588 2.9 1.605 3.91 1.02 1.04 2.458 1.573 3.875 1.706v3.62c-1.322-.047-2.65-.345-3.828-.925-.52-.267-.996-.584-1.438-.94-.005 3.27.01 6.54-.02 9.808-.086 1.647-.71 3.27-1.776 4.502-1.65 1.95-4.33 2.99-6.9 2.773-1.66-.12-3.268-.74-4.585-1.75-2.24-1.7-3.48-4.66-3.068-7.47.22-1.62.93-3.16 2.02-4.37 1.53-1.72 3.76-2.75 6.04-2.87.03 1.42-.01 2.84-.03 4.26-.92-.18-1.93-.02-2.7.48-.59.37-1.04.95-1.28 1.6-.2.47-.15 1-.15 1.5.17 1.66 1.72 3.1 3.39 2.92 1.07-.04 2.08-.67 2.67-1.55.19-.3.38-.62.41-.98.1-1.46.07-2.92.08-4.38.01-4.16-.01-8.31.01-12.47z" />
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

// 腾讯视频卡片类型配置
const tencentTypeConfig: Record<string, { label: string; icon: string; color: string; borderColor: string; bgColor: string }> = {
  trending: { label: '热点创意', icon: '🔥', color: 'text-cyan-300', borderColor: 'border-cyan-500/20', bgColor: 'bg-cyan-500/10' },
  ip: { label: 'IP角色', icon: '🐧', color: 'text-green-300', borderColor: 'border-green-500/20', bgColor: 'bg-green-500/10' },
  series: { label: '系列内容', icon: '📺', color: 'text-teal-300', borderColor: 'border-teal-500/20', bgColor: 'bg-teal-500/10' },
  event: { label: '事件热点', icon: '🎉', color: 'text-emerald-300', borderColor: 'border-emerald-500/20', bgColor: 'bg-emerald-500/10' },
};

// 数字滚动动画组件
function AnimatedCounter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const unsubscribe = rounded.on('change', (latest) => {
      setDisplayValue(latest);
    });
    return unsubscribe;
  }, [rounded]);

  return (
    <motion.span
      onViewportEnter={() => {
        animate(count, value, { duration: 2, ease: 'easeOut' });
      }}
      viewport={{ once: true }}
    >
      {displayValue}{suffix}
    </motion.span>
  );
}

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

// 腾讯视频卡片组件
function TencentVideoCard({ video, index }: { video: TencentVideo; index: number }) {
  const config = tencentTypeConfig[video.type] || tencentTypeConfig.trending;
  
  return (
    <motion.a
      href={video.videoUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="tencent-video-card group block flex-shrink-0 w-[280px] scroll-snap-start"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      whileHover={{ y: -6 }}
    >
      <div className="relative h-full p-5 rounded-2xl border border-white/[0.08] bg-white/[0.02] hover:bg-teal-500/[0.04] hover:border-teal-500/25 transition-all duration-400 overflow-hidden">
        {/* 类型色条 */}
        <div className={`absolute bottom-0 left-[20%] right-[20%] h-0.5 rounded-sm opacity-60 ${
          video.type === 'trending' ? 'bg-gradient-to-r from-transparent via-cyan-400 to-transparent' :
          video.type === 'ip' ? 'bg-gradient-to-r from-transparent via-green-400 to-transparent' :
          video.type === 'series' ? 'bg-gradient-to-r from-transparent via-teal-400 to-transparent' :
          'bg-gradient-to-r from-transparent via-emerald-400 to-transparent'
        }`} />

        {/* 卡片头部 */}
        <div className="flex justify-between items-start mb-4">
          <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-semibold ${config.bgColor} ${config.color} ${config.borderColor} border`}>
            {config.icon} {config.label}
          </span>
          <DouyinIcon className="w-4 h-4 text-gray-600 opacity-40 group-hover:opacity-80 transition-opacity" />
        </div>

        {/* 标题 */}
        <h4 className="text-[15px] font-semibold text-gray-200 leading-relaxed mb-3 line-clamp-2 group-hover:text-teal-300 transition-colors">
          {video.title}
        </h4>

        {/* 标签 */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {video.tags.map((tag) => (
            <span key={tag} className="inline-flex items-center px-2.5 py-0.5 rounded-md text-[11px] bg-white/[0.04] text-gray-500 border border-white/[0.06]">
              {tag}
            </span>
          ))}
        </div>

        {/* 底部 */}
        <div className="flex justify-between items-center pt-3 border-t border-white/[0.06]">
          <span className="flex items-center gap-1.5 text-[11px] text-gray-600">
            <DouyinIcon className="w-3 h-3" />
            抖音
          </span>
          <span className="flex items-center gap-1 text-xs text-teal-500 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
            观看视频 →
          </span>
        </div>
      </div>
    </motion.a>
  );
}

// 腾讯实习展区组件
function TencentVideoShowcase() {
  const [isExpanded, setIsExpanded] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  // 拖拽滚动处理
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    isDragging.current = true;
    startX.current = e.pageX - (scrollRef.current?.offsetLeft || 0);
    scrollLeft.current = scrollRef.current?.scrollLeft || 0;
    if (scrollRef.current) scrollRef.current.style.cursor = 'grabbing';
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const x = e.pageX - (scrollRef.current?.offsetLeft || 0);
    const walk = (x - startX.current) * 2;
    if (scrollRef.current) scrollRef.current.scrollLeft = scrollLeft.current - walk;
  }, []);

  const handleMouseUp = useCallback(() => {
    isDragging.current = false;
    if (scrollRef.current) scrollRef.current.style.cursor = 'grab';
  }, []);

  return (
    <div className="mt-0">
      {/* 展区头部 */}
      <motion.div
        className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div>
          <h3 className="text-2xl sm:text-[28px] font-bold mb-2">
            <span className="bg-gradient-to-r from-teal-300 via-teal-400 to-teal-600 bg-clip-text text-transparent inline-flex items-center gap-3">
              🛡️ 腾讯成长守护
            </span>
          </h3>
          <p className="text-gray-500 text-sm">
            商业内容运营 — 独立完成 31 个短视频作品 · 全平台累计播放 6000万+
          </p>
        </div>
        <a
          href="https://www.douyin.com/user/MS4wLjABAAAA"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-black/40 hover:bg-black/60 border border-white/10 hover:border-white/20 text-white font-medium text-sm transition-all duration-300 hover:-translate-y-0.5"
        >
          <DouyinIcon className="w-4 h-4" />
          <span>抖音账号</span>
          <ExternalLink className="w-3.5 h-3.5 opacity-60" />
        </a>
      </motion.div>

      {/* 数据面板 */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
      >
        {[
          { icon: '📹', value: 31, suffix: '', label: '独立完成作品', gradientFrom: 'from-teal-300', gradientTo: 'to-teal-500', borderGradient: 'via-teal-500' },
          { icon: '▶️', value: 6000, suffix: '万+', label: '全平台播放量', gradientFrom: 'from-cyan-300', gradientTo: 'to-cyan-500', borderGradient: 'via-cyan-500' },
          { icon: '👥', value: 1.1, suffix: '亿+', label: '粉丝矩阵覆盖', gradientFrom: 'from-teal-200', gradientTo: 'to-teal-600', borderGradient: 'via-teal-600' },
        ].map((item, i) => (
          <motion.div
            key={i}
            className="relative glass-card-premium p-7 text-center overflow-hidden group hover:bg-teal-500/[0.05] hover:border-teal-500/20 hover:-translate-y-1 transition-all duration-400"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 + i * 0.1 }}
          >
            {/* 底部高亮线 */}
            <div className={`absolute bottom-0 left-[10%] right-[10%] h-0.5 rounded-sm bg-gradient-to-r from-transparent ${item.borderGradient} to-transparent`} />
            
            <div className={`w-12 h-12 mx-auto mb-4 rounded-xl flex items-center justify-center text-xl bg-teal-500/10 border border-teal-500/20`}>
              {item.icon}
            </div>
            <p className={`text-4xl font-extrabold bg-gradient-to-br ${item.gradientFrom} ${item.gradientTo} bg-clip-text text-transparent font-heading mb-1.5`}>
              {item.suffix === '亿+' ? (
                <AnimatedCounter value={item.value} suffix="亿+" />
              ) : item.suffix === '万+' ? (
                <AnimatedCounter value={item.value} suffix="万+" />
              ) : (
                <AnimatedCounter value={item.value} />
              )}
            </p>
            <p className="text-[13px] text-gray-500">{item.label}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* 卡片墙标题 */}
      <motion.div
        className="flex items-center justify-between mb-5"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
      >
        <h4 className="text-base font-semibold text-gray-400 flex items-center gap-2">
          <span className="text-teal-500">✦</span> 精选代表作
        </h4>
        <span className="text-xs text-gray-600 flex items-center gap-1.5">
          ← 滑动查看更多 →
        </span>
      </motion.div>

      {/* 横向滚动卡片墙 */}
      <motion.div
        ref={scrollRef}
        className="tencent-card-scroll overflow-x-auto overflow-y-hidden pb-4 mb-8 cursor-grab"
        style={{ scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch' }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex gap-4 w-max">
          {tencentFeaturedVideos.map((video, index) => (
            <TencentVideoCard key={video.id} video={video} index={index} />
          ))}
        </div>
      </motion.div>

      {/* 展开全部按钮 */}
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
      >
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl text-sm font-semibold text-teal-500 bg-teal-500/[0.08] border border-teal-500/20 hover:bg-teal-500/[0.15] hover:border-teal-500/40 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-teal-500/15 transition-all duration-300 tracking-wide"
        >
          {isExpanded ? '收起列表' : `查看全部 ${tencentVideoStats.total} 个作品`}
          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </motion.div>

      {/* 展开后的完整列表 */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-8"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          >
            {tencentAllVideos.map((video, index) => (
              <motion.a
                key={video.id}
                href={video.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 px-4 py-3 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-teal-500/[0.05] hover:border-teal-500/20 hover:translate-x-1 transition-all duration-300"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.02 }}
              >
                <span className="flex-shrink-0 w-7 h-7 rounded-lg bg-teal-500/[0.08] border border-teal-500/15 flex items-center justify-center text-[11px] font-bold text-teal-500 font-mono">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="flex-1 text-[13px] text-gray-400 truncate group-hover:text-gray-200 transition-colors">
                  {video.title}
                </span>
                <span className="flex-shrink-0 text-sm text-gray-600 group-hover:text-teal-500 group-hover:translate-x-0.5 transition-all">
                  →
                </span>
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* 底部统计 */}
      <motion.div
        className="flex items-center justify-center gap-4 sm:gap-6 pt-6 border-t border-white/[0.06] text-[13px] text-gray-600 flex-wrap"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
      >
        <span>📹 {tencentVideoStats.total} 个独立作品</span>
        <span className="text-white/10">·</span>
        <span>🔥 热点创意 {tencentVideoStats.trending}个</span>
        <span className="text-white/10">·</span>
        <span>🐧 IP角色 {tencentVideoStats.ip}个</span>
        <span className="text-white/10">·</span>
        <span>📺 系列 {tencentVideoStats.series}个</span>
        <span className="text-white/10">·</span>
        <span>🎉 事件热点 {tencentVideoStats.event}个</span>
      </motion.div>
    </div>
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

          {/* ===== 个人创作区 ===== */}
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

          {/* ===== 视觉分隔带 ===== */}
          <motion.div
            className="flex items-center gap-6 my-16 px-5"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-teal-500/40 to-transparent" />
            <span className="text-xs font-semibold tracking-[3px] uppercase text-teal-500/70 whitespace-nowrap">
              Commercial Works @ Tencent
            </span>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-teal-500/40 to-transparent" />
          </motion.div>

          {/* ===== 腾讯实习展区 ===== */}
          <TencentVideoShowcase />

        </AnimatedSection>
      </div>
    </section>
  );
}

export default VideoWorks;
