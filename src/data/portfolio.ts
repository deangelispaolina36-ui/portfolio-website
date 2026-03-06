// 作品集数据
export interface PortfolioItem {
  id: string;
  title: string;
  category: 'game-analysis' | 'product' | 'aigc' | 'design' | 'misc';
  tags: string[];
  description: string;
  coverImage: string;
  detailContent?: string;
  link?: string;
}

export const portfolioData: PortfolioItem[] = [
  {
    id: 'liujin-tongniu',
    title: '宁夏鎏金铜牛文创项目',
    category: 'product',
    tags: ['从0到1', '商业化', '11万营收'],
    description: '主导文创产品设计与商业化落地，从用户研究到产品交付全流程把控，最终创收11万',
    coverImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop',
    detailContent: `
## 项目背景
宁夏鎏金铜牛是宁夏博物馆的镇馆之宝，具有极高的文化价值。本项目旨在将这一文化IP进行现代化转译，打造年轻人喜爱的文创产品。

## 我的角色
- 项目负责人
- 产品策划
- 商业化设计

## 项目成果
- 💰 总营收：11万元
- 📦 产品线：3个系列，12个SKU
- 👥 服务用户：2000+

## 项目流程
1. 用户研究与需求分析
2. 产品概念设计
3. 供应链整合
4. 营销推广
5. 销售与交付

（此处预留详细内容）
    `,
  },
  {
    id: 'aigc-workflow',
    title: 'AIGC 内容生产 Workflow',
    category: 'aigc',
    tags: ['腾讯实习', '效率提升70%', '多模态'],
    description: '在腾讯成长守护中心实习期间，搭建图文/视频/音频三类 AIGC 工作流，大幅提升团队效率',
    coverImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop',
    detailContent: `
## 项目背景
在腾讯成长守护中心实习期间，负责搭建 AIGC 内容生产工作流，以提升团队内容产出效率。

## 核心成果
- 📈 AI 使用率提升 50%
- ⚡ 内容生产效率提升 70%
- 🎯 覆盖图文、视频、音频三大内容类型

## 工作流设计

### 图文内容工作流
- 使用 GPT-4 进行文案创作
- Midjourney 生成配图
- 自动化排版与发布

### 视频内容工作流
- AI 脚本生成
- 数字人视频制作
- 自动化剪辑流程

### 音频内容工作流
- AI 语音合成
- 背景音乐生成
- 多平台分发

（此处预留详细流程图和数据对比）
    `,
  },
  {
    id: 'ai-gallery',
    title: 'AI 生成作品集',
    category: 'aigc',
    tags: ['Midjourney', 'Stable Diffusion', 'Prompt 设计'],
    description: '展示 AI 图像生成能力与 Prompt 工程技术，包含多种风格的 AI 生成作品',
    coverImage: 'https://images.unsplash.com/photo-1686191128892-3b37add4b844?w=600&h=400&fit=crop',
    detailContent: `
## 作品展示
这是我使用 AI 工具创作的图像作品集，展示了不同风格和主题的 AI 生成能力。

## 使用工具
- Midjourney V6
- Stable Diffusion XL
- ComfyUI 工作流

## Prompt 工程
每张作品都包含详细的 Prompt 说明，展示如何通过精准的提示词控制 AI 输出。

（此处预留作品画廊和 Prompt 说明）
    `,
  },
  {
    id: 'video-works',
    title: '视频作品精选',
    category: 'design',
    tags: ['Premiere', 'After Effects', '短视频'],
    description: '抖音/小红书爆款视频作品，单条最高 200万+ 播放量',
    coverImage: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=600&h=400&fit=crop',
    detailContent: `
## 作品亮点
- 🔥 单条最高播放：200万+
- 📱 平台：抖音、小红书
- 🎬 类型：短视频、Vlog、产品展示

## 代表作品

### 作品1：[视频标题]
- 播放量：200万+
- 点赞：XX万

### 作品2：[视频标题]
- 播放量：XX万
- 点赞：XX万

（此处预留视频嵌入）
    `,
  },
  {
    id: 'design-portfolio',
    title: '设计作品集',
    category: 'design',
    tags: ['Photoshop', '海报', '视觉设计'],
    description: '活动海报、品牌视觉、UI 设计等平面设计作品合集',
    coverImage: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop',
    detailContent: `
## 设计作品展示

### 活动海报
校园活动、品牌推广等海报设计

### 品牌视觉
Logo、VI 系统设计

### UI 设计
App 界面、网页设计

（此处预留作品画廊）
    `,
  },
  {
    id: 'more-coming',
    title: '游戏分析报告 - Coming Soon',
    category: 'game-analysis',
    tags: ['MOBA', '产品分析', '敬请期待'],
    description: '王者荣耀、和平精英等热门游戏的深度产品分析报告，即将上线',
    coverImage: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&h=400&fit=crop',
    detailContent: `
## 即将上线

正在整理以下内容：

### 王者荣耀产品分析
- 核心玩法机制分析
- 用户分层与留存策略
- 商业化模式解读

### 和平精英产品分析
- 战术竞技品类特点
- 赛季系统设计
- 社交功能分析

### 更多游戏分析
- 永劫无间
- 无畏契约
- 原神

敬请期待...
    `,
  },
];

// 作品分类
export const portfolioCategories = [
  { id: 'all', name: '全部' },
  { id: 'game-analysis', name: '游戏分析' },
  { id: 'product', name: '产品项目' },
  { id: 'aigc', name: 'AIGC' },
  { id: 'design', name: '创意设计' },
];

// 游戏履历数据 - 新版结构
export interface GameDetail {
  name: string;
  duration?: string;
  achievements: string[];
}

export interface GamingProfile {
  id: string;
  category: string;
  categoryEn: string;
  games: GameDetail[];
  color: string;
  icon: string;
  gradient: string;
}

export const gamingProfiles: GamingProfile[] = [
  {
    id: 'moba',
    category: 'MOBA',
    categoryEn: 'Multiplayer Online Battle Arena',
    games: [
      {
        name: '王者荣耀',
        duration: '10年',
        achievements: ['百星王者', '巅峰2100', '小国标花木兰', '万战英雄'],
      },
    ],
    color: '#f59e0b',
    icon: '⚔️',
    gradient: 'from-amber-500/20 to-orange-600/20',
  },
  {
    id: 'fps',
    category: 'FPS / Tactical',
    categoryEn: 'First Person Shooter',
    games: [
      {
        name: '和平精英',
        achievements: ['超级王牌'],
      },
      {
        name: '无畏契约',
        achievements: ['超凡'],
      },
      {
        name: '生死狙击',
        duration: '15年',
        achievements: ['高天梯玩家'],
      },
    ],
    color: '#ef4444',
    icon: '🎯',
    gradient: 'from-red-500/20 to-rose-600/20',
  },
  {
    id: 'action',
    category: 'Action',
    categoryEn: 'Action Combat',
    games: [
      {
        name: '永劫无间',
        achievements: ['修罗', '高校榜32'],
      },
      {
        name: '幽灵行者',
        duration: '200h',
        achievements: [],
      },
      {
        name: '黑神话',
        duration: '220h',
        achievements: ['双结局'],
      },
    ],
    color: '#8b5cf6',
    icon: '⚡',
    gradient: 'from-violet-500/20 to-purple-600/20',
  },
  {
    id: 'racing',
    category: 'Racing',
    categoryEn: 'Racing Games',
    games: [
      {
        name: 'QQ飞车',
        achievements: ['绝影星耀'],
      },
      {
        name: '地平线5',
        duration: '400h',
        achievements: ['超跑收藏'],
      },
    ],
    color: '#06b6d4',
    icon: '🏎️',
    gradient: 'from-cyan-500/20 to-teal-600/20',
  },
  {
    id: 'arpg',
    category: 'ARPG',
    categoryEn: 'Action Role-Playing Game',
    games: [
      {
        name: '战双',
        duration: '3年',
        achievements: [],
      },
      {
        name: '鸣潮',
        duration: '1年',
        achievements: [],
      },
    ],
    color: '#ec4899',
    icon: '🗡️',
    gradient: 'from-pink-500/20 to-fuchsia-600/20',
  },
];

// 游戏理解能力维度
export interface GameUnderstanding {
  id: string;
  title: string;
  titleEn: string;
  items: string[];
  color: string;
  icon: string;
}

export const gameUnderstandings: GameUnderstanding[] = [
  {
    id: 'player-ecology',
    title: '玩家生态理解',
    titleEn: 'Player Ecology',
    items: ['玩家分层', '竞技生态', '段位系统', '社区文化'],
    color: '#8b5cf6',
    icon: '👥',
  },
  {
    id: 'game-mechanics',
    title: '游戏机制理解',
    titleEn: 'Game Mechanics',
    items: ['动作反馈', '技能循环', 'Build体系', '数值成长'],
    color: '#06b6d4',
    icon: '⚙️',
  },
  {
    id: 'competitive',
    title: '竞技体验理解',
    titleEn: 'Competitive Experience',
    items: ['操作门槛', '风险收益', '版本环境', 'Meta变化'],
    color: '#f59e0b',
    icon: '🏆',
  },
  {
    id: 'monetization',
    title: '商业化理解',
    titleEn: 'Monetization',
    items: ['皮肤系统', '抽卡机制', '赛季设计', '成长驱动'],
    color: '#ec4899',
    icon: '💎',
  },
];

// 游戏经历总结
export const gameInsight = {
  title: 'GAME INSIGHT',
  paragraphs: [
    '15年以上游戏经历，长期活跃于MOBA、FPS与动作类游戏生态。',
    '对竞技游戏的玩家分层、版本节奏与Meta变化具有持续观察。',
    '同时对动作系统反馈、Boss设计与Build构建保持高度兴趣。',
  ],
  conclusion: '希望将玩家视角转化为产品理解，参与创造更优秀的游戏体验。',
};

// Hero区数据统计
export const gamingStats = [
  { value: '15年+', label: '游戏经验' },
  { value: '10+', label: '深度游戏' },
  { value: '16000h+', label: '累计时长' },
];

// 工作经历数据
export interface Experience {
  id: string;
  company: string;
  department?: string;
  location: string;
  position: string;
  period: string;
  highlights: string[];
  logo?: string;
}

export interface ExperienceMetric {
  value: string;
  label: string;
}

export const experiences: Experience[] = [
  {
    id: 'tencent',
    company: '腾讯 IEG · 成长守护中心',
    department: '互动娱乐事业群（游戏）',
    location: '深圳',
    position: '内容运营实习生',
    period: '2025.09 - 2026.06',
    highlights: [
      '多平台矩阵运营，全网粉丝1.1亿，完成KPI 1.3亿播放',
      '搭建AIGC Workflow，AI使用率+50%，效率+70%',
      '主导内部游戏赛事，3个月策划执行',
    ],
    logo: 'https://www.tencent.com/favicon.ico',
  },
  {
    id: 'kuanglv',
    company: '旷旅科技',
    location: '云南',
    position: '新媒体/用户运营实习生',
    period: '2024.08 - 2024.11',
    highlights: [
      '短视频单条最高播放200万+',
      'KOL合作签约15位，推动销售300万',
    ],
  },
];

// 技能数据
export interface SkillCategory {
  name: string;
  skills: {
    name: string;
    level: number; // 0-100
  }[];
}

export const skillCategories: SkillCategory[] = [
  {
    name: 'AIGC',
    skills: [
      { name: '多模态内容生产 Pipeline（图文/视频/音频）', level: 90 },
      { name: 'ComfyUI 工作流搭建', level: 88 },
      { name: 'Stable Diffusion WebUI', level: 85 },
      { name: 'Midjourney 等 30+ 内容生产 AI 工具', level: 85 },
    ],
  },
  {
    name: '产品能力',
    skills: [
      { name: '用户研究', level: 85 },
      { name: '竞品分析', level: 90 },
      { name: '数据分析', level: 80 },
      { name: '产品文档', level: 85 },
    ],
  },
  {
    name: '运营能力',
    skills: [
      { name: '内容运营', level: 90 },
      { name: '用户运营', level: 85 },
      { name: '活动策划', level: 85 },
      { name: '社群运营', level: 80 },
    ],
  },
  {
    name: '设计工具',
    skills: [
      { name: 'Photoshop', level: 85 },
      { name: 'Premiere', level: 80 },
      { name: 'After Effects', level: 80 },
      { name: 'Figma', level: 50 },
    ],
  },
];

// 其他技能标签
export const otherSkills = [
  '3D建模基础',
  '无人机航拍',
  '多模态生成',
  '视频剪辑',
  '活动执行',
];

// 个人信息
export const personalInfo = {
  name: '王泰然',
  title: '',
  subtitle: '15年游戏经验 × 腾讯实习经历 × AIGC 产品思维',
  email: 'wtairan_nxu@163.com',
  phone: '15769672279',
  wechat: 'vwtairan857',
  education: {
    school: '宁夏大学',
    period: '2022-2026',
    major: '广告学 & 数字化创新创业管理',
  },
  bio: '我是一名热爱游戏的游戏策划人，拥有15年核心玩家经历。在腾讯成长守护中心实习期间，积累了丰富的内容运营和 AIGC 应用经验。我相信只有真正理解玩家，才能做出好的游戏产品。',
  tags: ['游戏策划', '用户运营', 'AIGC', '腾讯实习', '15年玩家'],
  targetCompanies: ['AIGC 深度运用', '腾讯实习生', '15年游戏经验'],
};
