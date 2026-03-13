// 视频作品数据
export interface VideoWork {
  id: string;
  title: string;
  category: 'competition' | 'aerial' | 'creative' | 'commercial';
  description: string;
  thumbnail?: string;
  videoUrl?: string;
  platform?: string;
  tags: string[];
  award?: string;
  date: string;
  duration?: string;
}

// B站主页地址
export const bilibiliHome = 'https://space.bilibili.com/1588534210';

export const videoCategories = [
  { id: 'all', name: '全部', icon: '🎬' },
  { id: 'competition', name: '参赛作品', icon: '🏆' },
  { id: 'aerial', name: '航拍作品', icon: '🚁' },
  { id: 'creative', name: '创意视频', icon: '🎨' },
  { id: 'commercial', name: '商业项目', icon: '💼' },
];

export const videoWorksData: VideoWork[] = [
  {
    id: 'passport-travel',
    title: '《中国护照在手 北非说走就走》',
    category: 'competition',
    description: '第七届大学生网络编辑创新大赛参赛作品，讲述持中国护照畅游北非的旅行故事，展现中国护照的便利与国际影响力。',
    videoUrl: bilibiliHome,
    platform: 'bilibili',
    tags: ['网络编辑大赛', '视听新媒体', '旅行Vlog'],
    award: '第七届大学生网络编辑创新大赛 宁夏赛区一等奖',
    date: '2024',
    duration: '3:20',
  },
  {
    id: 'loyal-soul',
    title: '《忠魂》',
    category: 'creative',
    description: '以历史英雄人物为主题的情感短片，通过视觉叙事传递家国情怀与民族精神。',
    videoUrl: bilibiliHome,
    platform: 'bilibili',
    tags: ['主题短片', '情感表达', '视觉叙事'],
    date: '2024',
    duration: '2:45',
  },
  {
    id: 'drone-final',
    title: '无人机航拍作品集',
    category: 'aerial',
    description: 'DJI无人机拍摄的风景与城市空中摄影作品，展现独特的航拍视角与构图美学。',
    videoUrl: bilibiliHome,
    platform: 'bilibili',
    tags: ['DJI航拍', '风景摄影', '城市空拍'],
    date: '2024',
    duration: '4:30',
  },
  {
    id: 'annual-meeting',
    title: '年会视频',
    category: 'commercial',
    description: '企业年会活动视频制作，包含活动记录、精彩集锦与氛围渲染。',
    videoUrl: bilibiliHome,
    platform: 'bilibili',
    tags: ['活动记录', '企业宣传', '剪辑制作'],
    date: '2024',
    duration: '5:00',
  },
  {
    id: 'group-project',
    title: '团队项目纪录片',
    category: 'creative',
    description: '团队协作项目的全程纪录，展现从策划到执行的完整过程。',
    videoUrl: bilibiliHome,
    platform: 'bilibili',
    tags: ['纪录片', '团队协作', 'Premiere'],
    date: '2024',
    duration: '6:15',
  },
];

// 视频统计数据
export const videoStats = {
  total: videoWorksData.length,
  competition: videoWorksData.filter((v) => v.category === 'competition').length,
  aerial: videoWorksData.filter((v) => v.category === 'aerial').length,
  creative: videoWorksData.filter((v) => v.category === 'creative').length,
  commercial: videoWorksData.filter((v) => v.category === 'commercial').length,
};
