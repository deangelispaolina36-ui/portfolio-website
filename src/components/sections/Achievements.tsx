import { motion } from 'framer-motion';
import { Trophy, Award, Medal, Star, Calendar, MapPin, Sparkles } from 'lucide-react';
import { AnimatedSection } from '../common';

// 荣誉数据接口
interface Achievement {
  id: string;
  title: string;
  award: string;
  date: string;
  description?: string;
  location?: string;
  highlight?: boolean;
}

// 荣誉数据
const achievements: Record<string, Achievement[]> = {
  national: [
    {
      id: 'computer-design',
      title: '中国大学生计算机设计大赛',
      award: '国家三等奖',
      date: '2024.07',
      description: '鎏金铜牛文创IP设计项目',
      highlight: true
    },
    {
      id: 'simulation-2024',
      title: '全国仿真创新应用大赛',
      award: '全国三等奖',
      date: '2024',
      description: '创新仿真应用设计'
    },
    {
      id: 'simulation-2023',
      title: '全国仿真创新应用大赛',
      award: '全国三等奖',
      date: '2023',
      description: '创新仿真应用设计'
    },
    {
      id: 'innovation-project',
      title: '国家级大学生创新训练项目',
      award: '优秀结题',
      date: '2025.04',
      description: '创新创业训练计划',
      highlight: true
    },
    {
      id: 'expo',
      title: '全国第八届非物质文化遗产博览会',
      award: '参展项目',
      date: '2024.11',
      location: '山东济南',
      description: '鎏金铜牛文创项目受邀参展',
      highlight: true
    }
  ],
  provincial: [
    {
      id: 'computer-design-regional',
      title: '中国大学生计算机设计大赛',
      award: '西北赛区一等奖',
      date: '2024',
      description: '鎏金铜牛文创IP设计项目',
      highlight: true
    },
    {
      id: 'network-editing',
      title: '全国大学生网络编辑创新大赛',
      award: '宁夏赛区一等奖',
      date: '2024.12',
      description: '网络内容创作与编辑'
    },
    {
      id: 'simulation-regional-2024',
      title: '全国仿真创新应用大赛',
      award: '宁夏赛区一等奖',
      date: '2024',
      description: '区域选拔赛'
    },
    {
      id: 'simulation-regional-2023',
      title: '全国仿真创新应用大赛',
      award: '宁夏赛区一等奖',
      date: '2023',
      description: '区域选拔赛'
    },
    {
      id: 'daguangsai',
      title: '全国大学生广告艺术大赛',
      award: '宁夏赛区三等奖',
      date: '2024',
      description: '版权保护公益海报设计'
    },
    {
      id: 'intangible-heritage',
      title: '"石榴花开匠心流韵"宁夏非遗集市',
      award: '参展项目',
      date: '2024',
      description: '省级非遗展示活动'
    }
  ],
  university: [
    {
      id: 'inspirational-figure',
      title: '宁夏大学年度励志人物',
      award: '校级最高荣誉',
      date: '2025',
      description: '全校年度评选',
      highlight: true
    },
    {
      id: 'career-potential',
      title: '职业规划大赛',
      award: '最具职业潜力奖',
      date: '2024',
      description: '特别奖项'
    },
    {
      id: 'digital-micro-major',
      title: '数字化创新创业管理微专业',
      award: '结业证书',
      date: '2025',
      description: '跨学科能力认证'
    },
    {
      id: 'scholarship-2024',
      title: '宁夏大学学业奖学金',
      award: '一等奖',
      date: '2024'
    },
    {
      id: 'scholarship-2023',
      title: '宁夏大学学业奖学金',
      award: '一等奖',
      date: '2023'
    },
    {
      id: 'scholarship-2022',
      title: '宁夏大学学业奖学金',
      award: '一等奖',
      date: '2022'
    }
  ]
};

// 分类配置
const categories = [
  {
    key: 'national',
    title: '国家级荣誉',
    subtitle: 'National Level',
    icon: Trophy,
    color: 'from-amber-400 to-orange-500',
    bgGlow: 'from-amber-500/20 to-orange-500/10',
    borderColor: 'border-amber-500/30',
    iconBg: 'bg-gradient-to-br from-amber-500/20 to-orange-500/10'
  },
  {
    key: 'provincial',
    title: '省/区级荣誉',
    subtitle: 'Provincial Level',
    icon: Award,
    color: 'from-purple-400 to-pink-500',
    bgGlow: 'from-purple-500/20 to-pink-500/10',
    borderColor: 'border-purple-500/30',
    iconBg: 'bg-gradient-to-br from-purple-500/20 to-pink-500/10'
  },
  {
    key: 'university',
    title: '校级荣誉',
    subtitle: 'University Level',
    icon: Medal,
    color: 'from-cyan-400 to-blue-500',
    bgGlow: 'from-cyan-500/20 to-blue-500/10',
    borderColor: 'border-cyan-500/30',
    iconBg: 'bg-gradient-to-br from-cyan-500/20 to-blue-500/10'
  }
];

export function Achievements() {
  return (
    <section id="achievements" className="section-padding relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0 section-diagonal-lines" />
      <div className="floating-orb floating-orb-1" />
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-gradient-radial from-amber-500/8 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-gradient-radial from-purple-500/8 to-transparent rounded-full blur-3xl" />
      
      {/* 顶部分隔线 */}
      <div className="absolute top-0 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />

      <div className="container-custom relative z-10">
        <AnimatedSection>
          {/* Section 标题 */}
          <div className="text-center mb-20">
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium glass-card-premium border border-amber-500/20 text-amber-400 mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Trophy className="w-4 h-4" />
              荣誉与成就
            </motion.div>
            <motion.h2
              className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <span className="gradient-text-vivid">Achievements</span>
            </motion.h2>
            <motion.p
              className="text-gray-400 text-lg max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              竞赛获奖、项目参展、荣誉认可
            </motion.p>
          </div>

          {/* 统计概览 */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            {[
              { value: '5', label: '国家级荣誉', color: 'text-amber-400' },
              { value: '6', label: '省/区级荣誉', color: 'text-purple-400' },
              { value: '6', label: '校级荣誉', color: 'text-cyan-400' },
              { value: '17+', label: '总计荣誉', color: 'text-pink-400' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="glass-card-premium p-6 text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <p className={`text-3xl md:text-4xl font-bold ${stat.color}`}>{stat.value}</p>
                <p className="text-gray-400 text-sm mt-2">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* 荣誉分类展示 */}
          <div className="space-y-16">
            {categories.map((category, catIndex) => (
              <motion.div
                key={category.key}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: catIndex * 0.2 }}
              >
                {/* 分类标题 */}
                <div className="flex items-center gap-4 mb-8">
                  <div className={`w-14 h-14 rounded-2xl ${category.iconBg} flex items-center justify-center border ${category.borderColor}`}>
                    <category.icon className={`w-7 h-7 bg-gradient-to-r ${category.color} bg-clip-text`} style={{ color: category.color.includes('amber') ? '#fbbf24' : category.color.includes('purple') ? '#a855f7' : '#22d3ee' }} />
                  </div>
                  <div>
                    <h3 className={`text-2xl font-bold bg-gradient-to-r ${category.color} bg-clip-text text-transparent`}>
                      {category.title}
                    </h3>
                    <p className="text-gray-500 text-sm">{category.subtitle}</p>
                  </div>
                  <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent ml-4" />
                </div>

                {/* 荣誉卡片网格 */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {achievements[category.key].map((achievement, index) => (
                    <motion.div
                      key={achievement.id}
                      className={`relative glass-card-premium p-6 card-glow-hover ${achievement.highlight ? 'ring-1 ring-amber-500/30' : ''}`}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: catIndex * 0.1 + index * 0.05 }}
                      whileHover={{ y: -5, scale: 1.02 }}
                    >
                      {/* 高亮标记 */}
                      {achievement.highlight && (
                        <div className="absolute -top-2 -right-2">
                          <motion.div
                            className="w-8 h-8 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 flex items-center justify-center"
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                          >
                            <Sparkles className="w-4 h-4 text-white" />
                          </motion.div>
                        </div>
                      )}

                      {/* 奖项等级标签 */}
                      <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium mb-4 bg-gradient-to-r ${category.bgGlow} border ${category.borderColor}`}>
                        <Star className="w-3 h-3" style={{ color: category.color.includes('amber') ? '#fbbf24' : category.color.includes('purple') ? '#a855f7' : '#22d3ee' }} />
                        <span style={{ color: category.color.includes('amber') ? '#fbbf24' : category.color.includes('purple') ? '#a855f7' : '#22d3ee' }}>
                          {achievement.award}
                        </span>
                      </div>

                      {/* 标题 */}
                      <h4 className="text-lg font-semibold text-white mb-2 leading-tight">
                        {achievement.title}
                      </h4>

                      {/* 描述 */}
                      {achievement.description && (
                        <p className="text-gray-400 text-sm mb-4">
                          {achievement.description}
                        </p>
                      )}

                      {/* 时间和地点 */}
                      <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {achievement.date}
                        </span>
                        {achievement.location && (
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {achievement.location}
                          </span>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

export default Achievements;
