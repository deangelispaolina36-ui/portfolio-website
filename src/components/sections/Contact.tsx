import { motion } from 'framer-motion';
import { Mail, Phone, MessageCircle, Send, MapPin } from 'lucide-react';
import { personalInfo } from '../../data/portfolio';
import { AnimatedSection } from '../common';

export function Contact() {
  return (
    <section id="contact" className="section-padding relative">
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
              联系我
            </motion.span>
            <motion.h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <span className="gradient-text">Contact</span>
            </motion.h2>
            <motion.p
              className="text-muted-foreground text-lg max-w-2xl mx-auto"
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
                className="space-y-6"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                {/* 邮箱 */}
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="group block glass rounded-2xl p-6 card-hover"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center group-hover:from-primary/30 group-hover:to-secondary/30 transition-colors">
                      <Mail className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-muted-foreground mb-1">邮箱</p>
                      <p className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                        {personalInfo.email}
                      </p>
                    </div>
                    <Send className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </div>
                </a>

                {/* 电话 */}
                <a
                  href={`tel:${personalInfo.phone}`}
                  className="group block glass rounded-2xl p-6 card-hover"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center group-hover:from-primary/30 group-hover:to-secondary/30 transition-colors">
                      <Phone className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-muted-foreground mb-1">电话</p>
                      <p className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                        {personalInfo.phone}
                      </p>
                    </div>
                    <Send className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </div>
                </a>

                {/* 微信 */}
                <div className="glass rounded-2xl p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                      <MessageCircle className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-muted-foreground mb-1">微信</p>
                      <p className="text-lg font-semibold text-foreground">
                        {personalInfo.wechat}
                      </p>
                      <p className="text-xs text-muted-foreground/70">同手机号</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* 右侧信息卡片 */}
              <motion.div
                className="glass rounded-2xl p-8 h-fit"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="text-center mb-8">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center mx-auto mb-4">
                    <span className="text-4xl">👋</span>
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    期待与你合作
                  </h3>
                  <p className="text-muted-foreground">
                    随时欢迎通过以上方式联系我
                  </p>
                </div>

                {/* 位置信息 */}
                <div className="flex items-center gap-3 p-4 rounded-xl bg-muted/30 mb-6">
                  <MapPin className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">当前位置</p>
                    <p className="text-foreground font-medium">深圳 / 宁夏</p>
                  </div>
                </div>

                {/* 状态 */}
                <div className="flex items-center gap-3 p-4 rounded-xl bg-green-500/10 border border-green-500/20">
                  <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                  <div>
                    <p className="text-sm text-green-400">当前状态</p>
                    <p className="text-foreground font-medium">正在寻找 游戏策划 / 内容运营 机会</p>
                  </div>
                </div>

                {/* 快捷操作 */}
                <div className="mt-8 space-y-3">
                  <a
                    href={`mailto:${personalInfo.email}?subject=求职咨询 - ${personalInfo.name}`}
                    className="block w-full py-3 px-6 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-semibold text-center hover:opacity-90 transition-opacity btn-neon"
                  >
                    发送邮件
                  </a>
                  <a
                    href={`tel:${personalInfo.phone}`}
                    className="block w-full py-3 px-6 rounded-xl glass border border-primary/30 text-primary font-semibold text-center hover:bg-primary/10 transition-colors"
                  >
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
