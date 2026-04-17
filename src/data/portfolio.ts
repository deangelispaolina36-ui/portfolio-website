// 作品集数据
export interface PortfolioItem {
  id: string;
  title: string;
  category: 'game-analysis' | 'product' | 'aigc' | 'design' | 'misc';
  tags: string[];
  description: string;
  coverImage: string;
  gallery?: string[];  // 作品画廊图片
  detailContent?: string;
  link?: string;
}

export const portfolioData: PortfolioItem[] = [
  {
    id: 'liujin-tongniu',
    title: '宁夏鎏金铜牛文创项目',
    category: 'product',
    tags: ['从0到1', '商业化', '11万营收', '国赛获奖', '非遗博览会'],
    description: '主导文创产品设计与商业化落地，从用户研究到产品交付全流程把控，最终创收11万。荣获中国大学生计算机设计大赛国家三等奖，受邀参展全国非遗博览会。',
    coverImage: '/image/portfolio/liujin/用.jpg',
    gallery: [
      '/image/portfolio/liujin/牛牛冰箱贴2.png',
      '/image/portfolio/liujin/牛牛书签.jpg',
      '/image/portfolio/liujin/生成公仔虚拟人物.png',
      '/image/portfolio/liujin/剪纸1.jpg',
      '/image/portfolio/liujin/制作胡旋舞手办背景.png',
      '/image/portfolio/liujin/用2.png',
    ],
    detailContent: `
## 项目背景
宁夏鎏金铜牛是宁夏博物馆的镇馆之宝，具有极高的文化价值。本项目旨在将这一文化IP进行现代化转译，打造年轻人喜爱的文创产品。

## 我的角色
- 项目负责人
- 产品策划与IP设计
- AIGC辅助创作（虚拟人物、场景设计）
- 商业化落地执行

## 🏆 项目荣誉
- 中国大学生计算机设计大赛 **国家三等奖**
- 中国大学生计算机设计大赛 **西北赛区一等奖**
- 全国第八届非物质文化遗产博览会 **参展项目**
- "石榴花开匠心流韵"宁夏非遗集市 **参展**

## 项目成果
- 💰 总营收：**11万元**
- 📦 产品线：冰箱贴、书签、剪纸、虚拟人物等
- 👥 服务用户：2000+
- 🎨 创新点：AIGC辅助IP形象设计，传统与现代融合

## 产品展示
包含：鎏金铜牛冰箱贴、文创书签、剪纸作品、AIGC生成虚拟人物等
    `,
  },
  {
    id: 'guofeng-illustration',
    title: '国风AI插画系列',
    category: 'aigc',
    tags: ['AIGC', '国风', 'Stable Diffusion', '原创创作'],
    description: '使用AI工具创作的国风主题插画系列，融合传统文化元素与现代AI技术，展现盛世华章与民生安康的美好愿景。',
    coverImage: '/image/portfolio/guofeng/《古代华宫：国之盛世》.jpg',
    gallery: [
      '/image/portfolio/guofeng/《古代华宫：国之盛世》.jpg',
      '/image/portfolio/guofeng/《和风古韵：民之安康》.jpg',
      '/image/portfolio/guofeng/《沙漠绿洲：国之坚韧》.jpg',
      '/image/portfolio/guofeng/《水源寓安：民之根本》.jpg',
    ],
    detailContent: `
## 系列简介
这是一组以"国泰民安"为主题的国风AI插画系列，通过AI技术结合传统美学元素进行创作。

## 作品列表
1. **《古代华宫：国之盛世》** - 展现帝王宫殿的恢弘气势
2. **《和风古韵：民之安康》** - 描绘百姓安居乐业的生活场景
3. **《沙漠绿洲：国之坚韧》** - 象征中华民族的坚韧与开拓精神
4. **《水源寓安：民之根本》** - 表达水源对民生的重要意义

## 技术要点
- 使用 Stable Diffusion 进行创作
- 精心设计的中国风 Prompt 工程
- 后期使用 Photoshop 进行细节优化
- 色彩调控与构图设计

## 创作理念
将传统文化元素与现代AI技术相结合，用科技手段传承和创新中华美学。
    `,
  },
  {
    id: 'daguangsai-poster',
    title: '大广赛版权公益海报',
    category: 'design',
    tags: ['大广赛', '公益海报', '版权保护', '省级三等奖'],
    description: '全国大学生广告艺术大赛参赛作品，以"版权保护"为主题的公益海报设计，荣获宁夏赛区三等奖。',
    coverImage: '/image/portfolio/daguangsai/《剪切与拼凑：原创的枷锁与盗版的剪刀》.png',
    gallery: [
      '/image/portfolio/daguangsai/《剪切与拼凑：原创的枷锁与盗版的剪刀》.png',
      '/image/portfolio/daguangsai/《拼走的灵感，残缺的原创》.jpg',
      '/image/portfolio/daguangsai/大广赛.jpg',
    ],
    detailContent: `
## 作品简介
全国大学生广告艺术大赛（大广赛）参赛作品，以"版权保护"为公益主题进行创作。

## 🏆 获奖情况
全国大学生广告艺术大赛 **宁夏赛区三等奖**

## 作品列表
1. **《剪切与拼凑：原创的枷锁与盗版的剪刀》**
   - 通过剪刀与枷锁的视觉隐喻，表达盗版对原创的伤害
   
2. **《拼走的灵感，残缺的原创》**
   - 以拼图缺失的概念，展现盗版对创作者灵感的剥夺

## 设计理念
- 运用视觉隐喻传达版权保护的重要性
- 简洁有力的画面语言
- 引发观者对知识产权的思考
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
    `,
  },
  {
    id: 'expo-exhibition',
    title: '全国非遗博览会参展',
    category: 'product',
    tags: ['国家级', '非遗文化', '项目落地', '现场展示'],
    description: '鎏金铜牛文创项目受邀参加全国第八届非物质文化遗产博览会，在山东济南进行现场展示与推广。',
    coverImage: '/image/portfolio/expo/微信图片_20241116123911.jpg',
    gallery: [
      '/image/portfolio/expo/微信图片_20241116005329.jpg',
      '/image/portfolio/expo/微信图片_20241116005353.jpg',
      '/image/portfolio/expo/微信图片_20241116005433.jpg',
      '/image/portfolio/expo/微信图片_20241116005439.jpg',
      '/image/portfolio/expo/微信图片_20241116123911.jpg',
      '/image/portfolio/expo/微信图片_20241116123915.jpg',
    ],
    detailContent: `
## 活动简介
全国第八届非物质文化遗产博览会是由文化和旅游部主办的国家级非遗展示盛会，鎏金铜牛文创项目受邀参展。

## 展会信息
- 📍 地点：山东济南
- 📅 时间：2024年11月
- 🎫 级别：国家级文化展会

## 参展内容
- 鎏金铜牛IP文创产品全系列展示
- 现场与观众互动交流
- 文创产品售卖与推广

## 意义与收获
- 项目从校园走向全国舞台
- 获得专业领域认可
- 与全国各地非遗传承人交流学习
- 拓展项目商业化视野
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
    id: 'tencent-chaohe',
    company: '腾讯 IEG · 玩家互动中心',
    department: '互动娱乐事业群（游戏）',
    location: '深圳',
    position: '产品运营实习生',
    period: '2026.02 - 至今',
    highlights: [
      '主导设计"超核AI周报"产品方案，规划数据采集→Prompt整合→大模型生成→页面渲染全链路，调用混元/DeepSeek实现千人千面内容触达',
      '搭建OpenClaw多智能体协同工作流，覆盖业务对接、周报生成等场景，支持企微/微信/QQ端直接操控',
      '深入一线对接超核玩家（大R/超R/顶R）400+人，用户满意度93%，主动建联沉默用户100+',
      '参与超核无忧充值、黑耀卡充值等商业化活动上线，熟悉从策划到上线全流程',
    ],
    logo: 'https://www.tencent.com/favicon.ico',
  },
  {
    id: 'tencent-guardian',
    company: '腾讯 IEG · 成长守护中心',
    department: '互动娱乐事业群（游戏）',
    location: '深圳',
    position: '内容运营实习生',
    period: '2025.09 - 2026.02',
    highlights: [
      '负责抖音/快手/小红书/B站/微博/QQ频道/视频号7平台运营，个人贡献播放量3000万+，产出3条百万级爆款',
      '独立搭建图文/视频/音频三类AIGC生产工作流，输出全链路SOP，推动AI使用率+50%、生产效率+70%',
      '参与选题规划、审核把控、制作协同与复盘迭代，围绕播放/完播/互动/转粉等指标持续优化内容质量',
      '独立策划部门内部赛事（无畏契约/火影忍者/和平精英），搭建高玩组-裁判组-组委会三级执行架构',
    ],
    logo: 'https://www.tencent.com/favicon.ico',
  },
  {
    id: 'kuanglv',
    company: '旷旅科技',
    department: '文旅电商事业部',
    location: '云南',
    position: '新媒体/用户运营实习生',
    period: '2024.08 - 2024.11',
    highlights: [
      '负责抖音/小红书双平台内容运营，短视频单条最高播放200万+',
      '独立策划执行KOL种草合作项目，成功签约15位达人，推动GMV突破300万',
      '搭建私域用户运营体系，社群活跃度提升40%，复购率提升25%',
      '主导品牌视觉升级，产出10+套营销物料，支撑双11等大促活动',
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
  subtitle: '15年游戏经验 × 腾讯IEG双岗实习 × AIGC 产品思维',
  email: 'wtairan_nxu@163.com',
  phone: '15769672279',
  wechat: 'vwtairan857',
  education: {
    school: '宁夏大学',
    period: '2022-2026',
    major: '广告学 & 数字化创新创业管理',
  },
  bio: '我是一名热爱游戏与创意的策划人，拥有15年核心玩家经历。在腾讯IEG先后经历成长守护中心（内容运营）和玩家互动中心（产品运营），积累了丰富的内容运营、AIGC应用和产品设计经验。我相信只有真正理解用户，才能做出好的产品。',
  tags: ['创意策划', '用户运营', 'AIGC', '腾讯实习', '15年玩家'],
  targetCompanies: ['AIGC 深度运用', '腾讯实习生', '15年游戏经验'],
};
