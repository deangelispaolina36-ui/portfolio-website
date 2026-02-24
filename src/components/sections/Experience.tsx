import { motion } from 'framer-motion';
import { Building2, Calendar, MapPin, Star, Users, Play, Zap } from 'lucide-react';
import { experiences } from '../../data/portfolio';
import { AnimatedSection } from '../common';

// 腾讯工作数据指标
const tencentMetrics = [
  { value: '1.1亿+', label: '粉丝矩阵', icon: Users },
  { value: '1.3亿', label: '播放KPI', icon: Play },
  { value: '70%', label: '效率提升', icon: Zap },
];

export function Experience() {
  return (
    <section id="experience" className="section-padding relative">
      <div className="container-custom">
        <AnimatedSection>
          {/* Section 标题 */}
          <div className="text-center mb-16">
            <motion.span
              className="inline-block px-4 py-1.5 rounded-full text-sm font-medium glass border border-primary/20 text-primary mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              工作经历
            </motion.span>
            <motion.h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <span className="gradient-text">Experience</span>
            </motion.h2>
            <motion.p
              className="text-muted-foreground text-lg max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              在实践中成长，用结果证明能力
            </motion.p>
          </div>

          {/* 时间轴 */}
          <div className="relative max-w-4xl mx-auto">
            {/* 垂直连接线 */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-accent transform md:-translate-x-1/2" />

            {/* 经历卡片 */}
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                className={`relative flex flex-col md:flex-row gap-8 mb-12 last:mb-0 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
              >
                {/* 时间轴节点 */}
                <div className="absolute left-8 md:left-1/2 top-0 transform -translate-x-1/2 z-10">
                  <motion.div
                    className="w-6 h-6 rounded-full bg-gradient-to-r from-primary to-secondary ring-4 ring-background"
                    whileInView={{ scale: [0, 1.2, 1] }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 + 0.3 }}
                  />
                </div>

                {/* 卡片内容 */}
                <div
                  className={`flex-1 ml-16 md:ml-0 ${
                    index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12 md:text-left'
                  }`}
                >
                  <motion.div
                    className="glass rounded-2xl p-6 lg:p-8 card-hover"
                    whileHover={{ y: -5 }}
                  >
                    {/* 公司信息 */}
                    <div className={`flex items-start gap-4 mb-4 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                      {/* 公司 Logo */}
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center flex-shrink-0">
                        {exp.logo ? (
                          <img src={exp.logo} alt={exp.company} className="w-8 h-8" />
                        ) : (
                          <Building2 className="w-7 h-7 text-primary" />
                        )}
                      </div>
                      
                      <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                        <h3 className="text-xl font-bold text-foreground">
                          {exp.company}
                        </h3>
                        {exp.department && (
                          <p className="text-primary font-medium">{exp.department}</p>
                        )}
                        <p className="text-muted-foreground">{exp.position}</p>
                      </div>
                    </div>

                    {/* 时间和地点 */}
                    <div className={`flex flex-wrap gap-4 mb-4 text-sm text-muted-foreground ${index % 2 === 0 ? 'md:justify-end' : 'md:justify-start'}`}>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {exp.period}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
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
                          <Star className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
                          <p className="text-muted-foreground">{highlight}</p>
                        </motion.div>
                      ))}
                    </div>

                    {/* 腾讯数据指标 - 只在腾讯经历下显示 */}
                    {exp.id === 'tencent' && (
                      <motion.div
                        className="mt-6 pt-6 border-t border-white/10"
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
                              <div className="w-10 h-10 mx-auto mb-2 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                                <metric.icon className="w-5 h-5 text-primary" />
                              </div>
                              <p className="text-xl font-bold gradient-text">{metric.value}</p>
                              <p className="text-xs text-muted-foreground">{metric.label}</p>
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
