import { motion } from 'framer-motion';
import { Gamepad2, Timer, Trophy } from 'lucide-react';
import { gamingProfiles } from '../../data/portfolio';
import { AnimatedSection } from '../common';

export function GamingProfile() {
  return (
    <section id="gaming" className="section-padding relative">
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
              游戏履历
            </motion.span>
            <motion.h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <span className="gradient-text">10年游戏深耕</span>
            </motion.h2>
            <motion.p
              className="text-muted-foreground text-lg max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              从玩家到策划，用热爱理解游戏，用专业打造产品
            </motion.p>
          </div>

          {/* 游戏卡片网格 */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {gamingProfiles.map((profile, index) => (
              <motion.div
                key={profile.id}
                className="group relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                {/* 卡片背景光效 */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
                  style={{
                    background: `radial-gradient(circle at center, ${profile.color}40 0%, transparent 70%)`,
                  }}
                />

                {/* 卡片主体 */}
                <div
                  className="relative glass rounded-2xl p-6 h-full card-hover border border-transparent group-hover:border-opacity-50 transition-all duration-300"
                  style={{
                    ['--card-border-color' as string]: profile.color,
                  }}
                >
                  {/* 顶部装饰线 */}
                  <div
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: profile.color }}
                  />

                  {/* 图标 */}
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-4 transition-transform duration-300 group-hover:scale-110"
                    style={{
                      background: `linear-gradient(135deg, ${profile.color}20 0%, ${profile.color}10 100%)`,
                      boxShadow: `0 0 20px ${profile.color}20`,
                    }}
                  >
                    {profile.icon}
                  </div>

                  {/* 品类名称 */}
                  <h3
                    className="text-xl font-bold mb-2 transition-colors duration-300"
                    style={{ color: profile.color }}
                  >
                    {profile.category}
                  </h3>

                  {/* 游戏列表 */}
                  <div className="space-y-1 mb-4">
                    {profile.games.map((game) => (
                      <p key={game} className="text-foreground font-medium">
                        {game}
                      </p>
                    ))}
                  </div>

                  {/* 游戏时长 */}
                  {profile.duration && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <Timer className="w-4 h-4" style={{ color: profile.color }} />
                      <span>游戏时长：{profile.duration}</span>
                    </div>
                  )}

                  {/* 成就 */}
                  <div className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Trophy
                      className="w-4 h-4 mt-0.5 flex-shrink-0"
                      style={{ color: profile.color }}
                    />
                    <span>{profile.achievement}</span>
                  </div>

                  {/* 悬停边框效果 */}
                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{
                      border: `1px solid ${profile.color}50`,
                      boxShadow: `inset 0 0 20px ${profile.color}10`,
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* 底部统计 */}
          <motion.div
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            {[
              { label: '游戏经验', value: '10年+', icon: <Gamepad2 className="w-5 h-5" /> },
              { label: '游戏品类', value: '5大类', icon: '🎯' },
              { label: '最高段位', value: '2000+', icon: '👑' },
              { label: '游戏理解', value: '深度', icon: '💡' },
            ].map((stat, index) => (
              <div
                key={stat.label}
                className="glass rounded-xl p-6 text-center group hover:bg-primary/5 transition-colors"
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                  {typeof stat.icon === 'string' ? (
                    <span className="text-xl">{stat.icon}</span>
                  ) : (
                    <span className="text-primary">{stat.icon}</span>
                  )}
                </div>
                <div className="text-2xl font-bold gradient-text mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </AnimatedSection>
      </div>
    </section>
  );
}

export default GamingProfile;
