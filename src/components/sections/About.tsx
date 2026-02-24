import { motion } from 'framer-motion';
import { GraduationCap, Mail, Phone, Sparkles } from 'lucide-react';
import { personalInfo } from '../../data/portfolio';
import { AnimatedSection } from '../common';

export function About() {
  return (
    <section id="about" className="section-padding relative overflow-hidden">
      {/* 顶部分隔线 */}
      <div className="absolute top-0 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />

      <div className="container-custom relative z-10">
        <AnimatedSection>
          {/* Section 标题 */}
          <div className="text-center mb-12">
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium glass-card-premium border border-purple-500/20 text-purple-400 mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Sparkles className="w-4 h-4" />
              关于我
            </motion.div>
            <motion.h2
              className="text-4xl sm:text-5xl lg:text-6xl font-bold"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <span className="gradient-text-vivid">About Me</span>
            </motion.h2>
          </div>

          {/* 证件照个人名片区域 */}
          <motion.div 
            className="flex flex-col items-center mb-16"
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* 证件照容器 */}
            <div className="profile-photo-wrapper group">
              {/* 外圈光晕 */}
              <div className="profile-photo-glow" />
              
              {/* 照片 */}
              <motion.div 
                className="profile-photo-container"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <img 
                  src="/image/证件照.png" 
                  alt={personalInfo.name}
                  className="profile-photo-image"
                />
                {/* 边框光效 */}
                <div className="profile-photo-border" />
              </motion.div>
            </div>

            {/* 姓名和职位 */}
            <motion.div 
              className="text-center mt-6"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <h3 className="text-2xl font-bold gradient-text-vivid mb-2">{personalInfo.name}</h3>
              <p className="text-gray-400 text-base">游戏产品策划 · AIGC探索者</p>
              <p className="text-purple-400/60 text-sm mt-2">热爱游戏，深耕产品，持续创造价值</p>
            </motion.div>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
            {/* 左侧：自我介绍和标签云 */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              {/* 个人简介 */}
              <div className="glass-card-premium p-8 card-glow-hover">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                    <span className="text-xl">👨‍💻</span>
                  </div>
                  <h3 className="text-xl font-semibold gradient-text-vivid">个人简介</h3>
                </div>
                <p className="text-gray-300 leading-relaxed text-lg">
                  {personalInfo.bio}
                </p>
              </div>

              {/* 标签云 */}
              <div className="glass-card-premium p-8 card-glow-hover">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                    <span className="text-xl">🏷️</span>
                  </div>
                  <h3 className="text-xl font-semibold gradient-text-vivid">核心标签</h3>
                </div>
                <div className="flex flex-wrap gap-3">
                  {personalInfo.tags.map((tag, index) => (
                    <motion.span
                      key={tag}
                      className="tag-enhanced"
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
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              {/* 教育背景 */}
              <div className="glass-card-premium p-8 card-glow-hover">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                    <GraduationCap className="w-5 h-5 text-purple-400" />
                  </div>
                  <h3 className="text-xl font-semibold gradient-text-vivid">教育背景</h3>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 flex items-center justify-center flex-shrink-0 border border-purple-500/20">
                    <span className="text-3xl">🎓</span>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white">
                      {personalInfo.education.school}
                    </h4>
                    <p className="text-purple-300">
                      {personalInfo.education.major}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      {personalInfo.education.period}
                    </p>
                  </div>
                </div>
              </div>

              {/* 联系方式 */}
              <div className="glass-card-premium p-8 card-glow-hover">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                    <span className="text-xl">📬</span>
                  </div>
                  <h3 className="text-xl font-semibold gradient-text-vivid">联系方式</h3>
                </div>
                <div className="space-y-4">
                  <a
                    href={`mailto:${personalInfo.email}`}
                    className="contact-card-enhanced flex items-center gap-4 group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 flex items-center justify-center border border-purple-500/20 group-hover:border-purple-500/40 transition-colors">
                      <Mail className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">邮箱</p>
                      <p className="text-white font-medium group-hover:text-purple-300 transition-colors">{personalInfo.email}</p>
                    </div>
                  </a>

                  <a
                    href={`tel:${personalInfo.phone}`}
                    className="contact-card-enhanced flex items-center gap-4 group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 flex items-center justify-center border border-purple-500/20 group-hover:border-purple-500/40 transition-colors">
                      <Phone className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">电话 / 微信同号</p>
                      <p className="text-white font-medium group-hover:text-purple-300 transition-colors">{personalInfo.phone}</p>
                    </div>
                  </a>
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
