import { motion } from 'framer-motion';
import { Building2, Calendar, MapPin, Star, Users, Play, Zap, Briefcase } from 'lucide-react';
import { experiences } from '../../data/portfolio';
import { AnimatedSection } from '../common';

// 腾讯工作数据指标
const tencentMetrics = [
  { value: '1.1亿+', label: '粉丝矩阵', icon: Users, color: '#8b5cf6' },
  { value: '1.3亿', label: '播放KPI', icon: Play, color: '#ec4899' },
  { value: '70%', label: '效率提升', icon: Zap, color: '#f59e0b' },
];

export function Experience() {
  return (
    <section id="experience" className="section-padding relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0 section-diagonal-lines" />
      <div className="floating-orb floating-orb-2" />
      <div className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-gradient-radial from-purple-500/8 to-transparent rounded-full blur-3xl" />
      
      {/* 顶部分隔线 */}
      <div className="absolute top-0 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />

      <div className="container-custom relative z-10">
        <AnimatedSection>
          {/* Section 标题 */}
          <div className="text-center mb-20">
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium glass-card-premium border border-purple-500/20 text-purple-400 mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Briefcase className="w-4 h-4" />
              工作经历
            </motion.div>
            <motion.h2
              className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <span className="gradient-text-vivid">Experience</span>
            </motion.h2>
            <motion.p
              className="text-gray-400 text-lg max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              在实践中成长，用结果证明能力
            </motion.p>
          </div>

          {/* 时间轴 */}
          <div className="relative max-w-5xl mx-auto">
            {/* 垂直连接线 - 渐变增强 */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 transform md:-translate-x-1/2">
              <div className="w-full h-full bg-gradient-to-b from-purple-500 via-pink-500 to-orange-500 opacity-50" />
              <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-purple-500 via-pink-500 to-orange-500 blur-sm opacity-30" />
            </div>

            {/* 经历卡片 */}
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                className={`relative flex flex-col md:flex-row gap-8 mb-16 last:mb-0 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.7 }}
              >
                {/* 时间轴节点 */}
                <div className="absolute left-8 md:left-1/2 top-0 transform -translate-x-1/2 z-10">
                  <motion.div
                    className="relative"
                    whileInView={{ scale: [0, 1.3, 1] }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 + 0.3 }}
                  >
                    <div className="w-5 h-5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500" />
                    <div className="absolute inset-0 w-5 h-5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 animate-ping opacity-30" />
                  </motion.div>
                </div>

                {/* 卡片内容 */}
                <div
                  className={`flex-1 ml-16 md:ml-0 ${
                    index % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16 md:text-left'
                  }`}
                >
                  <motion.div
                    className="glass-card-premium p-8 card-glow-hover"
                    whileHover={{ y: -5 }}
                  >
                    {/* 公司信息 */}
                    <div className={`flex items-start gap-5 mb-5 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                      {/* 公司 Logo */}
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500/15 to-pink-500/15 flex items-center justify-center flex-shrink-0 border border-purple-500/20">
                        {exp.logo ? (
                          <img src={exp.logo} alt={exp.company} className="w-10 h-10" />
                        ) : (
                          <Building2 className="w-8 h-8 text-purple-400" />
                        )}
                      </div>
                      
                      <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                        <h3 className="text-2xl font-bold text-white">
                          {exp.company}
                        </h3>
                        {exp.department && (
                          <p className="text-purple-400 font-medium mt-1">{exp.department}</p>
                        )}
                        <p className="text-gray-400">{exp.position}</p>
                      </div>
                    </div>

                    {/* 时间和地点 */}
                    <div className={`flex flex-wrap gap-4 mb-6 text-sm ${index % 2 === 0 ? 'md:justify-end' : 'md:justify-start'}`}>
                      <span className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 text-gray-400 border border-white/10">
                        <Calendar className="w-4 h-4 text-purple-400" />
                        {exp.period}
                      </span>
                      <span className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 text-gray-400 border border-white/10">
                        <MapPin className="w-4 h-4 text-pink-400" />
                        {exp.location}
                      </span>
                    </div>

                    {/* 亮点 */}
                    <div className={`space-y-3 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                      {exp.highlights.map((highlight, hIndex) => (
                        <motion.div
                          key={hIndex}
                          className={`flex items-start gap-3 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                          initial={{ opacity: 0, x: index % 2 === 0 ? 20 : -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.2 + hIndex * 0.1 + 0.4 }}
                        >
                          <Star className="w-4 h-4 text-yellow-500 flex-shrink-0 mt-1" />
                          <p className="text-gray-300">{highlight}</p>
                        </motion.div>
                      ))}
                    </div>

                    {/* 腾讯数据指标 - 只在腾讯经历下显示 */}
                    {exp.id === 'tencent' && (
                      <motion.div
                        className="mt-8 pt-8 border-t border-white/10"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.6 }}
                      >
                        <div className={`grid grid-cols-3 gap-4 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                          {tencentMetrics.map((metric, mIndex) => (
                            <motion.div
                              key={mIndex}
                              className="text-center"
                              initial={{ opacity: 0, scale: 0.8 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              viewport={{ once: true }}
                              transition={{ delay: 0.7 + mIndex * 0.1 }}
                            >
                              <div 
                                className="w-12 h-12 mx-auto mb-3 rounded-xl flex items-center justify-center"
                                style={{ 
                                  background: `linear-gradient(135deg, ${metric.color}20 0%, ${metric.color}05 100%)`,
                                  border: `1px solid ${metric.color}30`,
                                }}
                              >
                                <metric.icon className="w-5 h-5" style={{ color: metric.color }} />
                              </div>
                              <p className="text-2xl font-bold gradient-text-vivid">{metric.value}</p>
                              <p className="text-xs text-gray-500 mt-1">{metric.label}</p>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                </div>

                {/* 占位区域 - 用于保持布局 */}
                <div className="hidden md:block flex-1" />
              </motion.div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

export default Experience;
