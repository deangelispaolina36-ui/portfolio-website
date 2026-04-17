import { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Award, Star, Medal, Sparkles } from 'lucide-react';
import { AnimatedSection } from '../common';
import { awardCategories, awardsData, awardStats, additionalHonorsCount, Award as AwardType } from '../../data/awards';
import CountUp from '../reactbits/CountUp';
import SpotlightCard from '../reactbits/SpotlightCard';

// 图标映射
const levelIcons: Record<string, React.ReactNode> = {
  national: <Trophy className="w-5 h-5" />,
  provincial: <Medal className="w-5 h-5" />,
  school: <Award className="w-5 h-5" />,
  social: <Star className="w-5 h-5" />,
};

// 荣誉卡片组件
function AwardCard({ award, index }: { award: AwardType; index: number }) {
  const category = awardCategories.find((c) => c.id === award.level);
  
  return (
    <motion.div
      className="relative group"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
    >
      <SpotlightCard
        className={`
          glass-card-premium p-5 rounded-2xl border border-white/10 
          hover:border-${award.level === 'national' ? 'amber' : 'purple'}-500/30 
          transition-all duration-300 h-full
          ${award.highlight ? 'ring-1 ring-amber-500/30' : ''}
        `}
        spotlightColor={award.level === 'national' ? 'rgba(245, 158, 11, 0.15)' : 'rgba(168, 85, 247, 0.15)'}
      >
        {/* 高亮标记 */}
        {award.highlight && (
          <div className="absolute -top-2 -right-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
          </div>
        )}
        
        {/* 头部 */}
        <div className="flex items-start gap-3 mb-3">
          <div
            className={`
              w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0
              bg-gradient-to-br ${category?.gradient || 'from-purple-500 to-pink-500'}
            `}
          >
            {levelIcons[award.level]}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-white font-semibold text-sm leading-tight mb-1 line-clamp-2">
              {award.title}
            </h3>
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <span>{award.date}</span>
              <span className="w-1 h-1 rounded-full bg-gray-600" />
              <span>{award.category}</span>
            </div>
          </div>
        </div>
        
        {/* 描述 */}
        {award.description && (
          <p className="text-xs text-gray-500 line-clamp-2">
            {award.description}
          </p>
        )}
      </SpotlightCard>
    </motion.div>
  );
}

// 分类标签组件
function CategoryTab({
  category,
  isActive,
  onClick,
}: {
  category: typeof awardCategories[0];
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      onClick={onClick}
      className={`
        relative px-5 py-3 rounded-xl text-sm font-medium transition-all duration-300
        ${isActive
          ? `bg-gradient-to-r ${category.gradient} text-white shadow-lg`
          : 'glass-card-premium hover:bg-white/5 text-gray-400 hover:text-white border border-white/10'
        }
      `}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <span className="flex items-center gap-2">
        <span>{category.icon}</span>
        <span>{category.name}</span>
        <span className={`
          px-2 py-0.5 rounded-full text-xs
          ${isActive ? 'bg-white/20' : 'bg-white/10'}
        `}>
          {category.count}
        </span>
      </span>
    </motion.button>
  );
}

export function Awards() {
  const [activeCategory, setActiveCategory] = useState<string>('national');
  
  const filteredAwards = awardsData.filter((award) => award.level === activeCategory);
  
  return (
    <section id="awards" className="section-padding relative overflow-hidden section-bg-gradient-2">
      {/* 背景装饰 */}
      <div className="absolute inset-0 section-grid-dots opacity-20" />
      <div className="floating-orb floating-orb-2" />
      <div className="floating-orb floating-orb-4" />
      
      {/* 顶部分隔线 */}
      <div className="absolute top-0 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />

      <div className="container-custom relative z-10">
        <AnimatedSection>
          {/* Section 标题 */}
          <div className="text-center mb-14">
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium glass-card-premium border border-amber-500/20 text-amber-400 mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Trophy className="w-4 h-4" />
              荣誉与成就
            </motion.div>
            <motion.h2
              className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <span className="gradient-text-gold">Awards & Honors</span>
            </motion.h2>
            <motion.p
              className="text-gray-400 text-lg max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              从国家级到校级，记录每一次成长与突破
            </motion.p>
          </div>

          {/* 统计概览 */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            {awardCategories.map((cat, index) => (
              <div
                key={cat.id}
                className="glass-card-premium p-5 rounded-2xl border border-white/10 text-center"
              >
                <div className="text-3xl mb-2">{cat.icon}</div>
                <div className={`text-2xl font-bold bg-gradient-to-r ${cat.gradient} bg-clip-text text-transparent`}>
                  <CountUp to={cat.count} from={0} duration={2} delay={0.3 + index * 0.15} />
                </div>
                <div className="text-sm text-gray-400">{cat.name}</div>
              </div>
            ))}
          </motion.div>

          {/* 分类标签 */}
          <motion.div
            className="flex flex-wrap justify-center gap-3 mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            {awardCategories.map((category) => (
              <CategoryTab
                key={category.id}
                category={category}
                isActive={activeCategory === category.id}
                onClick={() => setActiveCategory(category.id)}
              />
            ))}
          </motion.div>

          {/* 荣誉网格 */}
          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {filteredAwards.map((award, index) => (
              <AwardCard key={award.id} award={award} index={index} />
            ))}
          </motion.div>

          {/* 底部总结 */}
          <motion.div
            className="mt-14 text-center space-y-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full glass-card-premium border border-white/10">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <span className="text-gray-300">
                累计获得 <span className="text-amber-400 font-bold">{awardStats.total}</span> 项荣誉，
                其中国家级 <span className="text-amber-400 font-bold">{awardStats.national}</span> 项
              </span>
            </div>
            <div className="text-sm text-gray-500">
              另有 {additionalHonorsCount.smallCompetitions} 项校园赛事奖项、{additionalHonorsCount.certificates} 项资格证书、{additionalHonorsCount.volunteerServices} 项志愿服务经历
            </div>
          </motion.div>
        </AnimatedSection>
      </div>
    </section>
  );
}

export default Awards;
