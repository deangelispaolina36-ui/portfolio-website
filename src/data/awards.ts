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
    count: 11,
  },
  {
    id: 'school',
    name: '校级',
    nameEn: 'School',
    icon: '🎓',
    color: '#8b5cf6',
    gradient: 'from-violet-500 to-purple-400',
    count: 7,
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
  // ========== 国家级奖项 ==========
  {
    id: 'computer-design-national',
    title: '中国大学生计算机设计大赛 国家三等奖',
    level: 'national',
    date: '2024.07',
    category: '专业竞赛',
    description: '鎏金铜牛文创IP设计项目',
    relatedProject: 'liujin-tongniu',
    highlight: true,
  },
  {
    id: 'simulation-2nd-national',
    title: '第二届全国仿真创新应用大赛本科组 全国三等奖',
    level: 'national',
    date: '2023.11',
    category: '专业竞赛',
  },
  {
    id: 'simulation-3rd-national',
    title: '第三届全国仿真创新应用大赛本科组 全国三等奖',
    level: 'national',
    date: '2024.11',
    category: '专业竞赛',
  },
  {
    id: 'innovation-training',
    title: '优秀国家级大学生创新训练项目',
    level: 'national',
    date: '2025.04',
    category: '创新创业',
    highlight: true,
  },
  {
    id: 'feiyi-expo',
    title: '全国第八届非物质文化遗产博览会 参展',
    level: 'national',
    date: '2024',
    category: '展览参展',
    description: '山东济南，鎏金铜牛文创项目受邀参展',
    relatedProject: 'expo-exhibition',
    highlight: true,
  },

  // ========== 省区级奖项 ==========
  {
    id: 'simulation-2nd-ningxia-1st',
    title: '第二届全国仿真创新应用大赛本科组 宁夏一等奖',
    level: 'provincial',
    date: '2023',
    category: '专业竞赛',
  },
  {
    id: 'simulation-2nd-ningxia-2nd',
    title: '第二届全国仿真创新应用大赛本科组 宁夏二等奖',
    level: 'provincial',
    date: '2023',
    category: '专业竞赛',
  },
  {
    id: 'network-editing',
    title: '第七届全国大学生网络编辑创新大赛 宁夏赛区一等奖',
    level: 'provincial',
    date: '2024.12',
    category: '专业竞赛',
    highlight: true,
  },
  {
    id: 'advertising-art-provincial-2nd',
    title: '全国大学生广告艺术大赛 宁夏赛区二等奖',
    level: 'provincial',
    date: '2024.06',
    category: '广告设计',
  },
  {
    id: 'advertising-art-provincial-3rd',
    title: '全国大学生广告艺术大赛 宁夏赛区三等奖',
    level: 'provincial',
    date: '2024.06',
    category: '广告设计',
    relatedProject: 'daguangsai-poster',
  },
  {
    id: 'computer-design-regional-1st',
    title: '中国大学生计算机设计大赛 西北赛区一等奖',
    level: 'provincial',
    date: '2024',
    category: '专业竞赛',
    relatedProject: 'liujin-tongniu',
  },
  {
    id: 'computer-design-regional-3rd',
    title: '中国大学生计算机设计大赛 西北赛区三等奖',
    level: 'provincial',
    date: '2024',
    category: '专业竞赛',
  },
  {
    id: 'career-planning-provincial',
    title: '全国大学生职业规划大赛 宁夏区赛银奖',
    level: 'provincial',
    date: '2024.03',
    category: '职业规划',
  },
  {
    id: 'simulation-3rd-ningxia-1st',
    title: '第三届全国仿真创新应用大赛本科组 宁夏一等奖',
    level: 'provincial',
    date: '2024',
    category: '专业竞赛',
  },
  {
    id: 'cmau-northwest',
    title: 'CMAU市场研究与商业策划大赛 西北赛区二等奖',
    level: 'provincial',
    date: '2025.05',
    category: '商业策划',
  },
  {
    id: 'ningju-wenchuang',
    title: '"宁聚青春 创见未来"线上文创大赛 区级二等奖',
    level: 'provincial',
    date: '2025',
    category: '创意设计',
  },

  // ========== 校级荣誉 ==========
  {
    id: 'inspirational-figure',
    title: '宁夏大学年度励志人物',
    level: 'school',
    date: '2025',
    category: '荣誉称号',
    description: '全校评选的年度励志人物称号',
    highlight: true,
  },
  {
    id: 'excellent-student-cadre',
    title: '宁夏大学校级优秀学生班干部',
    level: 'school',
    date: '2023',
    category: '荣誉称号',
  },
  {
    id: 'scholarship-second',
    title: '宁夏大学校级二等综合奖学金',
    level: 'school',
    date: '2023',
    category: '奖学金',
  },
  {
    id: 'scholarship-third',
    title: '宁夏大学校级三等综合奖学金',
    level: 'school',
    date: '2024',
    category: '奖学金',
  },
  {
    id: 'career-planning-school-gold',
    title: '全国大学生职业规划大赛 宁夏大学校赛金奖',
    level: 'school',
    date: '2024',
    category: '职业规划',
  },
  {
    id: 'innovation-school-silver',
    title: '中国国际大学生创新大赛 宁夏大学校赛银奖',
    level: 'school',
    date: '2024',
    category: '创新创业',
  },
  {
    id: 'career-potential-award',
    title: '全国大学生职业规划大赛 校赛"最具职业潜力奖"',
    level: 'school',
    date: '2024',
    category: '荣誉称号',
  },

  // ========== 社会实践 ==========
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
    id: 'feiyi-fair',
    title: '"石榴花开匠心流韵"宁夏非遗集市 参展',
    level: 'social',
    date: '2025',
    category: '展览参展',
  },
];

// 额外荣誉统计（小比赛、证书等不单独展示，仅统计数量）
export const additionalHonorsCount = {
  smallCompetitions: 5, // 苇笛读书vlog三等奖、短视频营销挑战赛优秀奖、海报设计比赛、英文短视频比赛、职业规划校级铜奖
  certificates: 2, // 普通话二级甲等、数字化创新创业管理微专业结业证书
  volunteerServices: 4, // 银川马拉松志愿者、市场监督培训班志愿服务、昆明敬老志愿者、无偿献血志愿者
  total: 11,
};

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
  total: awardsData.length + additionalHonorsCount.total,
  national: awardsData.filter((a) => a.level === 'national').length,
  provincial: awardsData.filter((a) => a.level === 'provincial').length,
  school: awardsData.filter((a) => a.level === 'school').length,
  social: awardsData.filter((a) => a.level === 'social').length,
  additionalHonors: additionalHonorsCount.total,
};
