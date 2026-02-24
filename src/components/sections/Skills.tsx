import { motion } from 'framer-motion';
import { skillCategories, otherSkills } from '../../data/portfolio';
import { AnimatedSection } from '../common';

export function Skills() {
  return (
    <section id="skills" className="section-padding relative">
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
              技能展示
            </motion.span>
            <motion.h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <span className="gradient-text">Skills</span>
            </motion.h2>
            <motion.p
              className="text-muted-foreground text-lg max-w-2xl mx-auto"
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
                className="glass rounded-2xl p-6 lg:p-8"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: categoryIndex * 0.1, duration: 0.5 }}
              >
                {/* 分类标题 */}
                <h3 className="text-xl font-bold gradient-text mb-6 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-gradient-to-r from-primary to-secondary" />
                  {category.name}
                </h3>

                {/* 技能进度条 */}
                <div className="space-y-5">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: categoryIndex * 0.1 + skillIndex * 0.05 + 0.2 }}
                    >
                      {/* 技能名称和百分比 */}
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-foreground font-medium">{skill.name}</span>
                        <span className="text-sm text-muted-foreground">{skill.level}%</span>
                      </div>

                      {/* 进度条背景 */}
                      <div className="h-2.5 rounded-full bg-muted/50 overflow-hidden">
                        <motion.div
                          className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{
                            delay: categoryIndex * 0.1 + skillIndex * 0.05 + 0.3,
                            duration: 1,
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
            className="glass rounded-2xl p-6 lg:p-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <h3 className="text-xl font-bold gradient-text mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-gradient-to-r from-primary to-secondary" />
              其他技能
            </h3>

            <div className="flex flex-wrap gap-3">
              {otherSkills.map((skill, index) => (
                <motion.span
                  key={skill}
                  className="px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 text-foreground tag-cloud-item cursor-default hover:from-primary/20 hover:to-secondary/20 transition-colors"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + index * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* 技能总结 */}
          <motion.div
            className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            {[
              { label: '产品能力', value: '4项', icon: '📊' },
              { label: '运营能力', value: '4项', icon: '📈' },
              { label: 'AIGC', value: '4项', icon: '🤖' },
              { label: '设计工具', value: '4项', icon: '🎨' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="glass rounded-xl p-4 text-center group hover:bg-primary/5 transition-colors"
              >
                <div className="text-2xl mb-2">{stat.icon}</div>
                <div className="text-lg font-bold gradient-text">{stat.value}</div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </AnimatedSection>
      </div>
    </section>
  );
}

export default Skills;
