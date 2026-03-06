import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gamepad2, ChevronDown, Sparkles } from 'lucide-react';
import { gamingProfiles, gameUnderstandings, gameInsight, gamingStats } from '../../data/portfolio';
import { AnimatedSection } from '../common';

// 游戏Logo图片映射
const gameLogoImages: Record<string, string> = {
  moba: '/image/王者荣耀.png',
  fps: '/image/无畏契约.png',
  racing: '/image/QQ飞车.png',
  action: '/image/永劫无间.png',
  arpg: '/image/黑神话悟空.png',
};

export function GamingProfile() {
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  const toggleCard = (id: string) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  return (
    <section id="gaming" className="section-padding relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0 section-diagonal-lines opacity-30" />
      
      {/* 渐变光晕 */}
      <div className="absolute top-1/4 left-0 w-[600px] h-[600px] bg-gradient-radial from-purple-500/8 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-gradient-radial from-pink-500/8 to-transparent rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-cyan-500/5 to-transparent rounded-full blur-3xl" />
      
      {/* 顶部分隔线 */}
      <div className="absolute top-0 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-pink-500/30 to-transparent" />

      <div className="container-custom relative z-10">
        <AnimatedSection>
          {/* ========== 模块一：Hero 区 ========== */}
          <div className="text-center mb-20">
            {/* 顶部标签 */}
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium glass-card-premium border border-pink-500/20 text-pink-400 mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Gamepad2 className="w-4 h-4" />
              游戏履历
            </motion.div>

            {/* 主标题 */}
            <motion.div
              className="mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <span className="text-sm md:text-base tracking-[0.3em] text-gray-400 font-light uppercase">
                Game Experience
              </span>
            </motion.div>
            
            <motion.h2
              className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
            >
              <span className="gradient-text-vivid">15年核心玩家经历</span>
            </motion.h2>

            {/* 副标题 */}
            <motion.p
              className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              From Player to Game Operator
            </motion.p>
            <motion.p
              className="text-gray-500 text-sm md:text-base max-w-2xl mx-auto mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25 }}
            >
              长期漫游于竞技与动作类游戏生态 · 理解版本、机制与玩家行为
            </motion.p>

            {/* 三个核心数据 */}
            <motion.div
              className="flex justify-center gap-8 md:gap-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              {gamingStats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="text-center group"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.35 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="text-3xl md:text-4xl lg:text-5xl font-bold gradient-text-vivid mb-2 group-hover:scale-110 transition-transform">
                    {stat.value}
                  </div>
                  <div className="text-xs md:text-sm text-gray-400 tracking-wider">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* ========== 模块二：核心游戏履历卡片 ========== */}
          <motion.div
            className="mb-24"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
              {gamingProfiles.map((profile, index) => (
                <motion.div
                  key={profile.id}
                  className="relative group"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * index, duration: 0.5 }}
                >
                  {/* 卡片背景光效 */}
                  <div
                    className="absolute -inset-2 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-xl"
                    style={{
                      background: `radial-gradient(circle at center, ${profile.color}40 0%, transparent 70%)`,
                    }}
                  />

                  {/* 卡片主体 */}
                  <motion.div
                    className="relative rounded-2xl overflow-hidden cursor-pointer"
                    style={{
                      background: `linear-gradient(180deg, rgba(30,30,40,0.9) 0%, rgba(20,20,30,0.95) 100%)`,
                      border: `1px solid ${profile.color}20`,
                      minHeight: expandedCard === profile.id ? 'auto' : '320px',
                    }}
                    onClick={() => toggleCard(profile.id)}
                    whileHover={{ 
                      y: -8,
                      boxShadow: `0 20px 40px -10px ${profile.color}30`,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* 顶部装饰条 */}
                    <div
                      className="h-1 w-full"
                      style={{ background: `linear-gradient(90deg, ${profile.color}60, ${profile.color}20)` }}
                    />

                    {/* 游戏Logo区域 */}
                    <div 
                      className="relative h-32 md:h-40 flex items-center justify-center overflow-hidden"
                      style={{
                        background: `radial-gradient(circle at center, ${profile.color}15 0%, transparent 70%)`,
                      }}
                    >
                      {/* 网格背景 */}
                      <div 
                        className="absolute inset-0 opacity-20"
                        style={{
                          backgroundImage: `
                            linear-gradient(${profile.color}10 1px, transparent 1px),
                            linear-gradient(90deg, ${profile.color}10 1px, transparent 1px)
                          `,
                          backgroundSize: '30px 30px',
                        }}
                      />
                      
                      {/* Logo图片 */}
                      <motion.img
                        src={gameLogoImages[profile.id]}
                        alt={profile.category}
                        className="max-w-[80%] max-h-[100px] object-contain relative z-10"
                        style={{
                          filter: `drop-shadow(0 0 15px ${profile.color}60)`,
                        }}
                        animate={{ y: [0, -3, 0] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      />

                      {/* 边角装饰 */}
                      <div className="absolute top-3 left-3 w-3 h-3 border-l-2 border-t-2 rounded-tl-sm" style={{ borderColor: `${profile.color}40` }} />
                      <div className="absolute top-3 right-3 w-3 h-3 border-r-2 border-t-2 rounded-tr-sm" style={{ borderColor: `${profile.color}40` }} />
                    </div>

                    {/* 类型标签 */}
                    <div className="px-4 pt-4 pb-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3
                            className="text-lg md:text-xl font-bold"
                            style={{ color: profile.color }}
                          >
                            {profile.category}
                          </h3>
                          <p className="text-xs text-gray-500 mt-0.5">
                            {profile.categoryEn}
                          </p>
                        </div>
                        <motion.div
                          animate={{ rotate: expandedCard === profile.id ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <ChevronDown 
                            className="w-5 h-5 text-gray-400" 
                            style={{ color: expandedCard === profile.id ? profile.color : undefined }}
                          />
                        </motion.div>
                      </div>
                    </div>

                    {/* 展开的游戏详情 */}
                    <AnimatePresence>
                      {expandedCard === profile.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="px-4 pb-4 space-y-3">
                            <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-700 to-transparent" />
                            {profile.games.map((game, gameIndex) => (
                              <motion.div
                                key={game.name}
                                className="p-3 rounded-xl"
                                style={{ background: `${profile.color}08` }}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: gameIndex * 0.1 }}
                              >
                                <div className="flex items-center justify-between mb-2">
                                  <span className="font-medium text-white text-sm">
                                    {game.name}
                                  </span>
                                  {game.duration && (
                                    <span 
                                      className="text-xs px-2 py-0.5 rounded-full"
                                      style={{ 
                                        background: `${profile.color}20`,
                                        color: profile.color 
                                      }}
                                    >
                                      {game.duration}
                                    </span>
                                  )}
                                </div>
                                {game.achievements.length > 0 && (
                                  <div className="flex flex-wrap gap-1.5">
                                    {game.achievements.map((achievement) => (
                                      <span
                                        key={achievement}
                                        className="text-xs px-2 py-0.5 rounded-md bg-white/5 text-gray-400"
                                      >
                                        {achievement}
                                      </span>
                                    ))}
                                  </div>
                                )}
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* 未展开时显示的简略信息 */}
                    {expandedCard !== profile.id && (
                      <div className="px-4 pb-4">
                        <div className="text-sm text-gray-400">
                          {profile.games.length} 款深度游戏
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          点击查看详情 →
                        </div>
                      </div>
                    )}

                    {/* 悬停边框 */}
                    <div
                      className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                      style={{
                        border: `1px solid ${profile.color}50`,
                        boxShadow: `inset 0 0 40px ${profile.color}10`,
                      }}
                    />
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ========== 模块三：游戏理解能力 ========== */}
          <motion.div
            className="mb-24"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            {/* 标题 */}
            <div className="text-center mb-12">
              <motion.span
                className="text-sm md:text-base tracking-[0.3em] text-gray-400 font-light uppercase"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                Game Understanding
              </motion.span>
              <motion.h3
                className="text-2xl md:text-3xl font-bold mt-2 text-white"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                游戏理解能力
              </motion.h3>
            </div>

            {/* 四个能力维度卡片 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {gameUnderstandings.map((understanding, index) => (
                <motion.div
                  key={understanding.id}
                  className="group relative"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  {/* 背景光效 */}
                  <div
                    className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-lg"
                    style={{
                      background: `radial-gradient(circle at center, ${understanding.color}30 0%, transparent 70%)`,
                    }}
                  />

                  <motion.div
                    className="relative p-6 rounded-2xl h-full"
                    style={{
                      background: `linear-gradient(180deg, rgba(30,30,40,0.8) 0%, rgba(20,20,30,0.9) 100%)`,
                      border: `1px solid ${understanding.color}15`,
                    }}
                    whileHover={{ 
                      y: -5,
                      boxShadow: `0 15px 30px -10px ${understanding.color}20`,
                    }}
                  >
                    {/* 图标 */}
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4"
                      style={{
                        background: `linear-gradient(135deg, ${understanding.color}20 0%, ${understanding.color}05 100%)`,
                        border: `1px solid ${understanding.color}30`,
                      }}
                    >
                      {understanding.icon}
                    </div>

                    {/* 标题 */}
                    <h4
                      className="text-lg font-bold mb-1"
                      style={{ color: understanding.color }}
                    >
                      {understanding.title}
                    </h4>
                    <p className="text-xs text-gray-500 mb-4">
                      {understanding.titleEn}
                    </p>

                    {/* 能力标签 */}
                    <div className="flex flex-wrap gap-2">
                      {understanding.items.map((item) => (
                        <span
                          key={item}
                          className="text-xs px-2.5 py-1 rounded-lg transition-all duration-300"
                          style={{
                            background: `${understanding.color}10`,
                            color: 'rgba(255,255,255,0.7)',
                            border: `1px solid ${understanding.color}20`,
                          }}
                        >
                          {item}
                        </span>
                      ))}
                    </div>

                    {/* 悬停边框 */}
                    <div
                      className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                      style={{
                        border: `1px solid ${understanding.color}40`,
                      }}
                    />
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ========== 模块四：游戏经历总结 ========== */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            {/* 背景装饰 */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-500/5 via-transparent to-pink-500/5" />
            
            <div 
              className="relative p-8 md:p-12 rounded-3xl text-center"
              style={{
                background: 'linear-gradient(180deg, rgba(30,30,40,0.6) 0%, rgba(20,20,30,0.8) 100%)',
                border: '1px solid rgba(139,92,246,0.2)',
              }}
            >
              {/* 装饰图标 */}
              <motion.div
                className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6"
                style={{
                  background: 'linear-gradient(135deg, rgba(139,92,246,0.2) 0%, rgba(236,72,153,0.1) 100%)',
                  border: '1px solid rgba(139,92,246,0.3)',
                }}
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <Sparkles className="w-8 h-8 text-purple-400" />
              </motion.div>

              {/* 标题 */}
              <motion.h3
                className="text-sm md:text-base tracking-[0.3em] text-gray-400 font-light uppercase mb-6"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                {gameInsight.title}
              </motion.h3>

              {/* 内容段落 */}
              <motion.div
                className="max-w-3xl mx-auto space-y-3 mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                {gameInsight.paragraphs.map((paragraph, index) => (
                  <p key={index} className="text-gray-300 text-base md:text-lg leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </motion.div>

              {/* 分隔线 */}
              <div className="w-24 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent mx-auto mb-6" />

              {/* 结论 */}
              <motion.p
                className="text-lg md:text-xl font-medium gradient-text-vivid max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
              >
                {gameInsight.conclusion}
              </motion.p>

              {/* 底部装饰 */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-pink-500/30 to-transparent" />
            </div>
          </motion.div>
        </AnimatedSection>
      </div>
    </section>
  );
}

export default GamingProfile;
