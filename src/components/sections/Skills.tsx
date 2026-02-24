import { motion } from 'framer-motion';
import { skillCategories, otherSkills } from '../../data/portfolio';
import { AnimatedSection } from '../common';
import { Cpu, Sparkles } from 'lucide-react';

export function Skills() {
  return (
    <section id="skills" className="section-padding relative overflow-hidden section-bg-gradient-2">
      {/* 背景装饰 */}
      <div className="absolute inset-0 section-grid-dots opacity-20" />
      <div className="floating-orb floating-orb-1" />
      <div className="floating-orb floating-orb-2" />
      
      {/* 顶部分隔线 */}
      <div className="absolute top-0 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-pink-500/30 to-transparent" />

      <div className="container-custom relative z-10">
        <AnimatedSection>
          {/* Section 标题 */}
          <div className="text-center mb-16">
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium glass-card-premium border border-pink-500/20 text-pink-400 mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Cpu className="w-4 h-4" />
              技能展示
            </motion.div>
            <motion.h2
              className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <span className="gradient-text-vivid">Skills</span>
            </motion.h2>
            <motion.p
              className="text-gray-400 text-lg max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              多维度能力矩阵，持续学习成长
            </motion.p>
          </div>

          {/* 技能分类网格 */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {skillCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.name}
                className="glass-card-premium p-8 card-glow-hover"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: categoryIndex * 0.15, duration: 0.6 }}
              >
                {/* 分类标题 */}
                <h3 className="text-xl font-bold gradient-text-vivid mb-8 flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500" />
                  {category.name}
                </h3>

                {/* 技能进度条 */}
                <div className="space-y-6">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: categoryIndex * 0.1 + skillIndex * 0.08 + 0.3 }}
                    >
                      {/* 技能名称和百分比 */}
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-white font-medium">{skill.name}</span>
                        <span className="text-sm text-purple-400 font-semibold">{skill.level}%</span>
                      </div>

                      {/* 进度条 */}
                      <div className="skill-bar-enhanced">
                        <motion.div
                          className="skill-fill"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{
                            delay: categoryIndex * 0.1 + skillIndex * 0.08 + 0.4,
                            duration: 1.2,
                            ease: 'easeOut',
                          }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* 其他技能标签云 */}
          <motion.div
            className="glass-card-premium p-8 card-glow-hover"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <h3 className="text-xl font-bold gradient-text-vivid mb-8 flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-pink-400" />
              其他技能
            </h3>

            <div className="flex flex-wrap gap-3">
              {otherSkills.map((skill, index) => (
                <motion.span
                  key={skill}
                  className="tag-enhanced"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + index * 0.04 }}
                  whileHover={{ scale: 1.08 }}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* 技能总结 */}
          <motion.div
            className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-6"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            {[
              { label: '产品能力', value: '4项', icon: '📊', color: '#8b5cf6' },
              { label: '运营能力', value: '4项', icon: '📈', color: '#ec4899' },
              { label: 'AIGC', value: '4项', icon: '🤖', color: '#06b6d4' },
              { label: '设计工具', value: '4项', icon: '🎨', color: '#f59e0b' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="stat-card group"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7 + index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div 
                  className="text-4xl mb-4 transition-transform duration-300 group-hover:scale-110"
                >
                  {stat.icon}
                </div>
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatedSection>
      </div>
    </section>
  );
}

export default Skills;
