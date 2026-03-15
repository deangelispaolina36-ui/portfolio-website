import { motion } from 'framer-motion';
import { Mail, Phone, MessageCircle, Send, MapPin, Heart } from 'lucide-react';
import { personalInfo } from '../../data/portfolio';
import { AnimatedSection } from '../common';

export function Contact() {
  return (
    <section id="contact" className="section-padding relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0 section-diagonal-lines" />
      <div className="floating-orb floating-orb-1" />
      <div className="floating-orb floating-orb-3" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-radial from-purple-500/10 to-transparent rounded-full blur-3xl" />
      
      {/* 顶部分隔线 */}
      <div className="absolute top-0 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />

      <div className="container-custom relative z-10">
        <AnimatedSection>
          {/* Section 标题 */}
          <div className="text-center mb-16">
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium glass-card-premium border border-purple-500/20 text-purple-400 mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Heart className="w-4 h-4" />
              联系我
            </motion.div>
            <motion.h2
              className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <span className="gradient-text-vivid">Contact</span>
            </motion.h2>
            <motion.p
              className="text-gray-400 text-lg max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              期待与你交流，共同探讨游戏产品的无限可能
            </motion.p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {/* 联系方式卡片 */}
              <motion.div
                className="space-y-5"
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                {/* 邮箱 */}
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="contact-card-enhanced group block p-4 sm:p-6"
                >
                  <div className="flex items-center gap-4 sm:gap-5">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-purple-500/15 to-pink-500/15 flex items-center justify-center border border-purple-500/20 group-hover:border-purple-500/40 transition-all duration-300 group-hover:scale-110 flex-shrink-0">
                      <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-500 mb-1">邮箱</p>
                      <p className="text-base sm:text-lg font-semibold text-white group-hover:text-purple-300 transition-colors">
                        {personalInfo.email}
                      </p>
                    </div>
                    <Send className="w-5 h-5 text-gray-600 group-hover:text-purple-400 group-hover:translate-x-1 transition-all hidden sm:block" />
                  </div>
                </a>

                {/* 电话 */}
                <a
                  href={`tel:${personalInfo.phone}`}
                  className="contact-card-enhanced group block p-4 sm:p-6"
                >
                  <div className="flex items-center gap-4 sm:gap-5">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-purple-500/15 to-pink-500/15 flex items-center justify-center border border-purple-500/20 group-hover:border-purple-500/40 transition-all duration-300 group-hover:scale-110 flex-shrink-0">
                      <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-pink-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-500 mb-1">电话</p>
                      <p className="text-base sm:text-lg font-semibold text-white group-hover:text-pink-300 transition-colors">
                        {personalInfo.phone}
                      </p>
                    </div>
                    <Send className="w-5 h-5 text-gray-600 group-hover:text-pink-400 group-hover:translate-x-1 transition-all hidden sm:block" />
                  </div>
                </a>

                {/* 微信 */}
                <div className="contact-card-enhanced p-4 sm:p-6">
                  <div className="flex items-center gap-4 sm:gap-5">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-green-500/15 to-emerald-500/15 flex items-center justify-center border border-green-500/20 flex-shrink-0">
                      <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-500 mb-1">微信</p>
                      <p className="text-base sm:text-lg font-semibold text-white">
                        {personalInfo.wechat}
                      </p>
                      <p className="text-xs text-gray-600 mt-0.5">同手机号</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* 右侧信息卡片 */}
              <motion.div
                className="glass-card-premium p-6 sm:p-8 h-fit card-glow-hover"
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                <div className="text-center mb-6 sm:mb-8">
                  <motion.div 
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mx-auto mb-4 sm:mb-5 shadow-lg shadow-purple-500/30"
                    whileHover={{ scale: 1.05, rotate: 5 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <span className="text-4xl sm:text-5xl">👋</span>
                  </motion.div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    期待与你合作
                  </h3>
                  <p className="text-gray-400">
                    随时欢迎通过以上方式联系我
                  </p>
                </div>

                {/* 位置信息 */}
                <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">当前位置</p>
                    <p className="text-white font-medium">深圳</p>
                  </div>
                </div>

                {/* 状态 */}
                <div className="flex items-center gap-4 p-4 rounded-xl bg-green-500/10 border border-green-500/20 mb-6 sm:mb-8">
                  <div className="relative">
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                    <div className="absolute inset-0 w-3 h-3 rounded-full bg-green-500 animate-ping opacity-50" />
                  </div>
                  <div>
                    <p className="text-sm text-green-400">当前状态</p>
                    <p className="text-sm sm:text-base text-white font-medium">正在寻找 运营 / 产品 / 策划 等机会</p>
                  </div>
                </div>

                {/* 快捷操作 */}
                <div className="space-y-3">
                  <a
                    href={`mailto:${personalInfo.email}?subject=求职咨询 - ${personalInfo.name}`}
                    className="btn-gradient-vivid w-full flex items-center justify-center gap-2"
                  >
                    <Mail className="w-4 h-4" />
                    <span>发送邮件</span>
                  </a>
                  <a
                    href={`tel:${personalInfo.phone}`}
                    className="block w-full py-3 px-6 rounded-xl glass-card-premium border border-purple-500/30 text-purple-400 font-semibold text-center hover:bg-purple-500/10 transition-colors"
                  >
                    <Phone className="w-4 h-4 inline mr-2" />
                    拨打电话
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

export default Contact;
