// 荣誉数据
export interface Award {
  id: string;
  title: string;
  level: 'national' | 'provincial' | 'school' | 'social';
  date: string;
  category: string;
  description?: string;
  relatedProject?: string;
  highlight?: boolean;
}

export interface AwardCategory {
  id: string;
  name: string;
  nameEn: string;
  icon: string;
  color: string;
  gradient: string;
  count: number;
}

// 奖项分类配置
export const awardCategories: AwardCategory[] = [
  {
    id: 'national',
    name: '国家级',
    nameEn: 'National',
    icon: '🏆',
    color: '#f59e0b',
    gradient: 'from-amber-500 to-yellow-400',
    count: 5,
  },
  {
    id: 'provincial',
    name: '省区级',
    nameEn: 'Provincial',
    icon: '🥈',
    color: '#94a3b8',
    gradient: 'from-slate-400 to-gray-300',
    count: 6,
  },
  {
    id: 'school',
    name: '校级',
    nameEn: 'School',
    icon: '🎓',
    color: '#8b5cf6',
    gradient: 'from-violet-500 to-purple-400',
    count: 6,
  },
  {
    id: 'social',
    name: '社会实践',
    nameEn: 'Social Practice',
    icon: '🌟',
    color: '#06b6d4',
    gradient: 'from-cyan-500 to-teal-400',
    count: 4,
  },
];

// 所有荣誉数据
export const awardsData: Award[] = [
  // 国家级奖项
  {
    id: 'computer-design-national',
    title: '中国大学生计算机设计大赛 国家三等奖',
    level: 'national',
    date: '2024',
    category: '专业竞赛',
    description: '鎏金铜牛文创IP设计项目',
    relatedProject: 'liujin-tongniu',
    highlight: true,
  },
  {
    id: 'feiyi-expo',
    title: '全国第八届非物质文化遗产博览会 参展',
    level: 'national',
    date: '2024.11',
    category: '展览参展',
    description: '山东济南，鎏金铜牛文创项目受邀参展',
    relatedProject: 'expo-exhibition',
    highlight: true,
  },
  {
    id: 'internet-plus-national',
    title: '中国国际大学生创新大赛（互联网+）国家级铜奖',
    level: 'national',
    date: '2024',
    category: '创新创业',
    highlight: true,
  },
  {
    id: 'challenge-cup-national',
    title: '挑战杯大学生创业计划竞赛 国家级铜奖',
    level: 'national',
    date: '2024',
    category: '创新创业',
  },
  {
    id: 'advertising-festival',
    title: '中国大学生广告艺术节学院奖 优秀奖',
    level: 'national',
    date: '2024',
    category: '广告设计',
  },

  // 省区级奖项
  {
    id: 'computer-design-regional',
    title: '中国大学生计算机设计大赛 西北赛区一等奖',
    level: 'provincial',
    date: '2024',
    category: '专业竞赛',
    relatedProject: 'liujin-tongniu',
  },
  {
    id: 'internet-plus-provincial',
    title: '中国国际大学生创新大赛（互联网+）宁夏赛区金奖',
    level: 'provincial',
    date: '2024',
    category: '创新创业',
  },
  {
    id: 'challenge-cup-provincial',
    title: '挑战杯大学生创业计划竞赛 宁夏赛区金奖',
    level: 'provincial',
    date: '2024',
    category: '创新创业',
  },
  {
    id: 'advertising-art-provincial',
    title: '全国大学生广告艺术大赛 宁夏赛区三等奖',
    level: 'provincial',
    date: '2024',
    category: '广告设计',
    relatedProject: 'daguangsai-poster',
  },
  {
    id: 'rural-revitalization',
    title: '乡村振兴"三创"大赛 宁夏赛区三等奖',
    level: 'provincial',
    date: '2024',
    category: '创新创业',
  },
  {
    id: 'feiyi-fair',
    title: '"石榴花开匠心流韵"宁夏非遗集市 参展',
    level: 'provincial',
    date: '2024',
    category: '展览参展',
  },

  // 校级荣誉
  {
    id: 'inspirational-figure',
    title: '宁夏大学年度励志人物',
    level: 'school',
    date: '2024',
    category: '荣誉称号',
    description: '全校评选的年度励志人物称号',
    highlight: true,
  },
  {
    id: 'excellent-student',
    title: '宁夏大学优秀学生',
    level: 'school',
    date: '2023-2024',
    category: '荣誉称号',
  },
  {
    id: 'scholarship-first',
    title: '一等学业奖学金',
    level: 'school',
    date: '2023-2024',
    category: '奖学金',
  },
  {
    id: 'scholarship-second',
    title: '二等学业奖学金',
    level: 'school',
    date: '2022-2023',
    category: '奖学金',
  },
  {
    id: 'merit-student',
    title: '三好学生',
    level: 'school',
    date: '2023-2024',
    category: '荣誉称号',
  },
  {
    id: 'entrepreneurship-scholarship',
    title: '创新创业专项奖学金',
    level: 'school',
    date: '2024',
    category: '奖学金',
  },

  // 社会实践
  {
    id: 'tencent-intern',
    title: '腾讯IEG成长守护中心实习',
    level: 'social',
    date: '2025.09 - 2026.06',
    category: '实习经历',
    description: '内容运营实习生，搭建AIGC Workflow',
    highlight: true,
  },
  {
    id: 'kuanglv-intern',
    title: '旷旅科技新媒体运营实习',
    level: 'social',
    date: '2024.08 - 2024.11',
    category: '实习经历',
    description: '抖音/小红书双平台运营，单条视频200万+播放',
  },
  {
    id: 'liujin-business',
    title: '鎏金铜牛文创项目商业化',
    level: 'social',
    date: '2024',
    category: '创业实践',
    description: '从0到1完成产品设计与落地，创收11万元',
    relatedProject: 'liujin-tongniu',
  },
  {
    id: 'volunteer-service',
    title: '志愿服务与社会实践',
    level: 'social',
    date: '2022-2024',
    category: '志愿服务',
    description: '校级优秀志愿者，累计服务时长100+小时',
  },
];

// 获取按级别分组的荣誉
export function getAwardsByLevel(level: Award['level']): Award[] {
  return awardsData.filter((award) => award.level === level);
}

// 获取重点荣誉
export function getHighlightAwards(): Award[] {
  return awardsData.filter((award) => award.highlight);
}

// 统计数据
export const awardStats = {
  total: awardsData.length,
  national: awardsData.filter((a) => a.level === 'national').length,
  provincial: awardsData.filter((a) => a.level === 'provincial').length,
  school: awardsData.filter((a) => a.level === 'school').length,
  social: awardsData.filter((a) => a.level === 'social').length,
};
