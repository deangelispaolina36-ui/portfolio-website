import { motion } from 'framer-motion';
import { GraduationCap, Mail, Phone, MessageCircle } from 'lucide-react';
import { personalInfo } from '../../data/portfolio';
import { AnimatedSection } from '../common';

export function About() {
  return (
    <section id="about" className="section-padding relative">
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
              关于我
            </motion.span>
            <motion.h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <span className="gradient-text">About Me</span>
            </motion.h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* 左侧：自我介绍 */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {/* 个人简介 */}
              <div className="glass rounded-2xl p-6 lg:p-8">
                <h3 className="text-xl font-semibold mb-4 gradient-text">个人简介</h3>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  {personalInfo.bio}
                </p>
              </div>

              {/* 标签云 */}
              <div className="glass rounded-2xl p-6 lg:p-8">
                <h3 className="text-xl font-semibold mb-4 gradient-text">核心标签</h3>
                <div className="flex flex-wrap gap-3">
                  {personalInfo.tags.map((tag, index) => (
                    <motion.span
                      key={tag}
                      className="px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 text-foreground tag-cloud-item cursor-default"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* 右侧：教育背景和联系方式 */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {/* 教育背景 */}
              <div className="glass rounded-2xl p-6 lg:p-8">
                <h3 className="text-xl font-semibold mb-4 gradient-text flex items-center gap-2">
                  <GraduationCap className="w-5 h-5" />
                  教育背景
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl">🎓</span>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-foreground">
                        {personalInfo.education.school}
                      </h4>
                      <p className="text-muted-foreground">
                        {personalInfo.education.major}
                      </p>
                      <p className="text-sm text-muted-foreground/70">
                        {personalInfo.education.period}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 联系方式 */}
              <div className="glass rounded-2xl p-6 lg:p-8">
                <h3 className="text-xl font-semibold mb-4 gradient-text">联系方式</h3>
                <div className="space-y-4">
                  <a
                    href={`mailto:${personalInfo.email}`}
                    className="flex items-center gap-4 p-3 rounded-xl hover:bg-primary/10 transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center group-hover:from-primary/30 group-hover:to-secondary/30 transition-colors">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">邮箱</p>
                      <p className="text-foreground font-medium">{personalInfo.email}</p>
                    </div>
                  </a>

                  <a
                    href={`tel:${personalInfo.phone}`}
                    className="flex items-center gap-4 p-3 rounded-xl hover:bg-primary/10 transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center group-hover:from-primary/30 group-hover:to-secondary/30 transition-colors">
                      <Phone className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">电话</p>
                      <p className="text-foreground font-medium">{personalInfo.phone}</p>
                    </div>
                  </a>

                  <div className="flex items-center gap-4 p-3 rounded-xl">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                      <MessageCircle className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">微信</p>
                      <p className="text-foreground font-medium">{personalInfo.wechat}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

export default About;
