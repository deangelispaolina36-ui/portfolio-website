import { motion } from 'framer-motion';
import { Gamepad2, Timer, Trophy, Zap } from 'lucide-react';
import { gamingProfiles } from '../../data/portfolio';
import { AnimatedSection } from '../common';

// 游戏代表性角色图片映射
const gameCharacterImages: Record<string, string> = {
  moba: '/image/王者荣耀.png',
  fps: '/image/无畏契约.png',
  racing: '/image/QQ飞车.png',
  action: '/image/永劫无间.png',
  steam: '/image/黑神话悟空.png',
};

export function GamingProfile() {
  return (
    <section id="gaming" className="section-padding relative overflow-hidden">
      {/* 背景装饰 - 对角线 */}
      <div className="absolute inset-0 section-diagonal-lines" />
      
      {/* 渐变光晕 */}
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-gradient-radial from-purple-500/10 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-gradient-radial from-pink-500/10 to-transparent rounded-full blur-3xl" />
      
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
              <Gamepad2 className="w-4 h-4" />
              游戏履历
            </motion.div>
            <motion.h2
              className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <span className="gradient-text-vivid">15年游戏深耕</span>
            </motion.h2>
            <motion.p
              className="text-gray-400 text-lg max-w-2xl mx-auto"
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
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                {/* 卡片背景光效 */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl"
                  style={{
                    background: `radial-gradient(circle at center, ${profile.color}30 0%, transparent 70%)`,
                  }}
                />

                {/* 卡片主体 */}
                <div className="game-card-enhanced relative h-full flex flex-col">
                  {/* 顶部装饰线 */}
                  <div
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-1 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-y-0.5"
                    style={{ background: `linear-gradient(90deg, transparent, ${profile.color}, transparent)` }}
                  />

                  {/* 全息投影角色图片区域 */}
                  <div 
                    className="hologram-container relative w-full h-40 rounded-xl mb-4 overflow-hidden"
                    style={{
                      background: `linear-gradient(180deg, ${profile.color}08 0%, ${profile.color}02 100%)`,
                    }}
                  >
                    {/* 全息底座 */}
                    <div 
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-3 rounded-full"
                      style={{
                        background: `radial-gradient(ellipse at center, ${profile.color}60 0%, ${profile.color}20 50%, transparent 70%)`,
                        boxShadow: `0 0 20px ${profile.color}40, 0 0 40px ${profile.color}20`,
                      }}
                    />
                    
                    {/* 扫描线动画 */}
                    <div className="hologram-scanline absolute inset-0 pointer-events-none" />
                    
                    {/* 全息网格背景 */}
                    <div 
                      className="absolute inset-0 opacity-10"
                      style={{
                        backgroundImage: `
                          linear-gradient(${profile.color}20 1px, transparent 1px),
                          linear-gradient(90deg, ${profile.color}20 1px, transparent 1px)
                        `,
                        backgroundSize: '20px 20px',
                      }}
                    />
                    
                    {/* 角色图片 - 全息效果 */}
                    <motion.div
                      className="hologram-image absolute inset-0 flex items-center justify-center p-2"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
                    >
                      <motion.img
                        src={gameCharacterImages[profile.id]}
                        alt={profile.category}
                        className="hologram-character max-w-full max-h-full object-contain relative z-10"
                        style={{
                          filter: `drop-shadow(0 0 10px ${profile.color}80) drop-shadow(0 0 20px ${profile.color}40)`,
                          maxHeight: '130px',
                        }}
                        animate={{
                          y: [0, -5, 0],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        whileHover={{ 
                          scale: 1.1,
                          filter: `drop-shadow(0 0 15px ${profile.color}) drop-shadow(0 0 30px ${profile.color}80)`,
                        }}
                      />
                      
                      {/* 全息故障效果层 */}
                      <div 
                        className="hologram-glitch absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100"
                        style={{
                          background: `linear-gradient(transparent 50%, ${profile.color}10 50%)`,
                          backgroundSize: '100% 4px',
                        }}
                      />
                    </motion.div>
                    
                    {/* 顶部光晕 */}
                    <div 
                      className="absolute top-0 left-0 right-0 h-12"
                      style={{
                        background: `linear-gradient(to bottom, ${profile.color}15 0%, transparent 100%)`,
                      }}
                    />
                    
                    {/* 底部光束 */}
                    <div 
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60%] h-full"
                      style={{
                        background: `linear-gradient(to top, ${profile.color}20 0%, transparent 60%)`,
                        clipPath: 'polygon(20% 100%, 80% 100%, 100% 0%, 0% 0%)',
                      }}
                    />
                    
                    {/* 边角装饰 */}
                    <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 rounded-tl-sm" style={{ borderColor: `${profile.color}50` }} />
                    <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 rounded-tr-sm" style={{ borderColor: `${profile.color}50` }} />
                    <div className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 rounded-bl-sm" style={{ borderColor: `${profile.color}50` }} />
                    <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 rounded-br-sm" style={{ borderColor: `${profile.color}50` }} />
                  </div>

                  {/* 品类名称 */}
                  <h3
                    className="text-xl font-bold mb-3 transition-colors duration-300"
                    style={{ color: profile.color }}
                  >
                    {profile.category}
                  </h3>

                  {/* 游戏列表 */}
                  <div className="space-y-1.5 mb-4">
                    {profile.games.map((game) => (
                      <p key={game} className="text-white/90 font-medium text-sm">
                        {game}
                      </p>
                    ))}
                  </div>

                  {/* 信息区域 - 自动撑开到底部 */}
                  <div className="mt-auto space-y-2">
                    {/* 游戏时长 */}
                    {profile.duration && (
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <Timer className="w-4 h-4" style={{ color: profile.color }} />
                        <span>{profile.duration}</span>
                      </div>
                    )}

                    {/* 成就 */}
                    <div className="flex items-start gap-2 text-sm text-gray-400">
                      <Trophy
                        className="w-4 h-4 mt-0.5 flex-shrink-0"
                        style={{ color: profile.color }}
                      />
                      <span>{profile.achievement}</span>
                    </div>
                  </div>

                  {/* 悬停边框效果 */}
                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{
                      border: `1px solid ${profile.color}40`,
                      boxShadow: `inset 0 0 30px ${profile.color}10`,
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* 底部统计 - 缩小版 */}
          <motion.div
            className="mt-16 flex justify-center gap-4 md:gap-6"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.7 }}
          >
            {[
              { label: '游戏经验', value: '15年+', icon: <Gamepad2 className="w-5 h-5" />, color: '#8b5cf6' },
              { label: '游戏品类', value: '5+', icon: '🎯', color: '#ec4899' },
              { label: '游戏理解', value: '深度', icon: <Zap className="w-5 h-5" />, color: '#06b6d4' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="stat-card-mini group px-6 py-4"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 + index * 0.1 }}
                whileHover={{ y: -3 }}
              >
                <div 
                  className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-2 transition-transform duration-300 group-hover:scale-110"
                  style={{ 
                    background: `linear-gradient(135deg, ${stat.color}20 0%, ${stat.color}05 100%)`,
                    border: `1px solid ${stat.color}30`,
                  }}
                >
                  {typeof stat.icon === 'string' ? (
                    <span className="text-lg">{stat.icon}</span>
                  ) : (
                    <span style={{ color: stat.color }}>{stat.icon}</span>
                  )}
                </div>
                <div className="text-xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-xs text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatedSection>
      </div>
    </section>
  );
}

export default GamingProfile;
