// 作品集数据
export interface PortfolioItem {
  id: string;
  title: string;
  category: 'game-analysis' | 'product' | 'aigc' | 'design';
  tags: string[];
  description: string;
  coverImage: string;
  detailContent?: string;
  link?: string;
}

export const portfolioData: PortfolioItem[] = [
  {
    id: 'wangzhe-analysis',
    title: '王者荣耀产品分析报告',
    category: 'game-analysis',
    tags: ['MOBA', '产品分析', '用户研究'],
    description: '从核心玩法、用户分层、商业化三个维度深度分析王者荣耀的产品设计与商业模式',
    coverImage: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&h=400&fit=crop',
    detailContent: `
## 项目概述
作为一名拥有10年王者荣耀游戏经验的资深玩家，我从产品策划的角度对王者荣耀进行了全面深入的分析。

## 分析维度

### 1. 核心玩法分析
- 英雄设计逻辑与平衡性思考
- 地图机制与节奏把控
- 匹配系统与段位设计

### 2. 用户分层研究
- 新手玩家的引导机制
- 核心玩家的留存策略
- 高端玩家的竞技需求

### 3. 商业化模式
- 皮肤经济的设计策略
- 赛季通行证的价值设计
- 活动运营的节奏规划

## 核心洞察
（此处预留详细内容）
    `,
  },
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
];

// 作品分类
export const portfolioCategories = [
  { id: 'all', name: '全部' },
  { id: 'game-analysis', name: '游戏分析' },
  { id: 'product', name: '产品项目' },
  { id: 'aigc', name: 'AIGC' },
  { id: 'design', name: '创意设计' },
];

// 游戏履历数据
export interface GamingProfile {
  id: string;
  category: string;
  games: string[];
  duration: string;
  achievement: string;
  color: string;
  icon: string;
}

export const gamingProfiles: GamingProfile[] = [
  {
    id: 'moba',
    category: 'MOBA',
    games: ['王者荣耀'],
    duration: '10年',
    achievement: '巅峰2000+，多英雄国标/万战',
    color: '#f59e0b',
    icon: '⚔️',
  },
  {
    id: 'fps',
    category: 'FPS/战术竞技',
    games: ['和平精英', '无畏契约'],
    duration: '8年',
    achievement: '核心体验者',
    color: '#ef4444',
    icon: '🎯',
  },
  {
    id: 'racing',
    category: '竞速',
    games: ['QQ飞车'],
    duration: '8年',
    achievement: '资深玩家',
    color: '#06b6d4',
    icon: '🏎️',
  },
  {
    id: 'action',
    category: '动作竞技',
    games: ['永劫无间'],
    duration: '4年',
    achievement: '硬核玩家',
    color: '#8b5cf6',
    icon: '⚡',
  },
  {
    id: 'steam',
    category: '主机/Steam',
    games: ['3A大作广泛涉猎'],
    duration: '',
    achievement: '广泛涉猎各类大作',
    color: '#3b82f6',
    icon: '🎮',
  },
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

export const experiences: Experience[] = [
  {
    id: 'tencent',
    company: '腾讯科技（深圳）',
    department: '成长守护中心',
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
    name: 'AIGC',
    skills: [
      { name: 'One-stop Workflow', level: 90 },
      { name: 'Midjourney', level: 85 },
      { name: 'Stable Diffusion', level: 80 },
      { name: 'ComfyUI', level: 75 },
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
  title: '游戏产品策划',
  subtitle: '10年核心玩家 × 腾讯实习经历 × AIGC 产品思维',
  email: 'wtairan_nxu@163.com',
  phone: '15769672279',
  wechat: '15769672279',
  education: {
    school: '宁夏大学',
    period: '2022-2026',
    major: '广告学 & 数字化创新创业管理',
  },
  bio: '我是一名热爱游戏的产品策划人，拥有10年核心玩家经历。在腾讯成长守护中心实习期间，积累了丰富的内容运营和 AIGC 应用经验。我相信只有真正理解玩家，才能做出好的游戏产品。',
  tags: ['游戏产品', '用户运营', 'AIGC', '腾讯实习', '10年玩家'],
  targetCompanies: ['腾讯', '网易', '米哈游'],
};
