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

// ================================
// 腾讯实习视频数据
// ================================

export interface TencentVideo {
  id: string;
  title: string;
  tags: string[];
  videoUrl: string;
  type: 'trending' | 'ip' | 'series' | 'event';
}

// 抖音账号入口
export const douyinHome = 'https://www.douyin.com/user/MS4wLjABAAAA';

// 精选8个代表作
export const tencentFeaturedVideos: TencentVideo[] = [
  {
    id: 'tc-1',
    title: '听说你想找人代解防沉迷？#RUDE各行各业版',
    tags: ['#防沉迷', '#RUDE', '#热点'],
    videoUrl: 'https://v.douyin.com/BLxv8Z6RXug/',
    type: 'trending',
  },
  {
    id: 'tc-2',
    title: '防沉迷也有属于自己的飞驰人生转场',
    tags: ['#飞驰人生', '#转场'],
    videoUrl: 'https://v.douyin.com/LKD7E67qlJw/',
    type: 'trending',
  },
  {
    id: 'tc-3',
    title: '山的后面是什么【第一集】',
    tags: ['#系列', '#创意叙事'],
    videoUrl: 'https://v.douyin.com/FKt5W6Fm4R0/',
    type: 'series',
  },
  {
    id: 'tc-4',
    title: '请牢牢锁住鹅伴这个圈 #幸福是一个圈',
    tags: ['#鹅伴', '#幸福是一个圈'],
    videoUrl: 'https://v.douyin.com/bsNhs5SSCfU/',
    type: 'ip',
  },
  {
    id: 'tc-5',
    title: '今天我们欢聚在这里 #腾讯27周年',
    tags: ['#腾讯27周年', '#庆典'],
    videoUrl: 'https://v.douyin.com/MmVlrdJb-5M/',
    type: 'event',
  },
  {
    id: 'tc-6',
    title: '当有人问我防沉迷是不是不能解 #桃黑黑',
    tags: ['#桃黑黑', '#防沉迷'],
    videoUrl: 'https://v.douyin.com/qYnCp7dpY_U/',
    type: 'trending',
  },
  {
    id: 'tc-7',
    title: '前方小叶子和鹅伴高萌预警',
    tags: ['#小叶子', '#鹅伴', '#萌物'],
    videoUrl: 'https://v.douyin.com/yDKtvpkdoQM/',
    type: 'ip',
  },
  {
    id: 'tc-8',
    title: '理论讲一百遍，不如实践跑一遍！#闪耀吧少年',
    tags: ['#闪耀吧少年', '#创意'],
    videoUrl: 'https://v.douyin.com/uN7fVJBkPxU/',
    type: 'trending',
  },
];

// 全部31个视频
export const tencentAllVideos: TencentVideo[] = [
  { id: 'tc-all-1', title: '你是否在雪山上救过一只狐狸', tags: ['#创意'], videoUrl: 'https://v.douyin.com/-X5lvpNyVmQ/', type: 'trending' },
  { id: 'tc-all-2', title: '完全公平公正来的 #十二生肖', tags: ['#十二生肖'], videoUrl: 'https://v.douyin.com/3lpLxyBDPB4/', type: 'trending' },
  { id: 'tc-all-3', title: '听说你想找人代解防沉迷？ #RUDE各行各业版', tags: ['#RUDE'], videoUrl: 'https://v.douyin.com/BLxv8Z6RXug/', type: 'trending' },
  { id: 'tc-all-4', title: '防沉迷也有属于自己的飞驰人生转场', tags: ['#飞驰人生'], videoUrl: 'https://v.douyin.com/LKD7E67qlJw/', type: 'trending' },
  { id: 'tc-all-5', title: '周六调休上不了号 #绿色dj', tags: ['#绿色dj'], videoUrl: 'https://v.douyin.com/hpfBjPMvkhY/', type: 'trending' },
  { id: 'tc-all-6', title: '新的一年祝大家马到成功 #新年快乐', tags: ['#新年'], videoUrl: 'https://v.douyin.com/gAiO8MKYjdI/', type: 'event' },
  { id: 'tc-all-7', title: '当有人问我防沉迷是不是不能解 #桃黑黑', tags: ['#桃黑黑'], videoUrl: 'https://v.douyin.com/qYnCp7dpY_U/', type: 'trending' },
  { id: 'tc-all-8', title: '她流一滴泪 #当我在平板黑屏时发现了一滴水', tags: ['#创意'], videoUrl: 'https://v.douyin.com/K2cVx_UJOxI/', type: 'trending' },
  { id: 'tc-all-9', title: '请牢牢锁住鹅伴这个圈 #幸福是一个圈', tags: ['#鹅伴'], videoUrl: 'https://v.douyin.com/bsNhs5SSCfU/', type: 'ip' },
  { id: 'tc-all-10', title: '静下心来，记得八点上号', tags: ['#上号'], videoUrl: 'https://v.douyin.com/mtXxlI5XgRw/', type: 'trending' },
  { id: 'tc-all-11', title: '宝子，该续火花了！ #夜上海', tags: ['#夜上海'], videoUrl: 'https://v.douyin.com/AXgajxyfY84/', type: 'trending' },
  { id: 'tc-all-12', title: '是你的话，守护翻山越岭也要来！', tags: ['#守护'], videoUrl: 'https://v.douyin.com/k9TB77FsMFs/', type: 'ip' },
  { id: 'tc-all-13', title: '山的后面是什么【第二集】', tags: ['#系列'], videoUrl: 'https://v.douyin.com/wBUpAqdjvus/', type: 'series' },
  { id: 'tc-all-14', title: '跟着蛋神煮的完美鸡蛋', tags: ['#创意'], videoUrl: 'https://v.douyin.com/ENaS0v32iwY/', type: 'trending' },
  { id: 'tc-all-15', title: '用这个纸星星打开今晚的八点上号叭', tags: ['#创意'], videoUrl: 'https://v.douyin.com/bM9j0jPAxoM/', type: 'ip' },
  { id: 'tc-all-16', title: '山的后面是什么【第一集】', tags: ['#系列'], videoUrl: 'https://v.douyin.com/FKt5W6Fm4R0/', type: 'series' },
  { id: 'tc-all-17', title: '明月几时有，八点来上号', tags: ['#中秋'], videoUrl: 'https://v.douyin.com/CkRkQVU89TY/', type: 'event' },
  { id: 'tc-all-18', title: '你问我为什么顽固而专一', tags: ['#创意'], videoUrl: 'https://v.douyin.com/58QGv0zM0EA/', type: 'trending' },
  { id: 'tc-all-19', title: '今天我们欢聚在这里 #腾讯27周年', tags: ['#腾讯27周年'], videoUrl: 'https://v.douyin.com/MmVlrdJb-5M/', type: 'event' },
  { id: 'tc-all-20', title: '成长守护班，到！ #抖音音乐班', tags: ['#音乐班'], videoUrl: 'https://v.douyin.com/pdg0wB_IOpw/', type: 'event' },
  { id: 'tc-all-21', title: '前方小叶子和鹅伴高萌', tags: ['#鹅伴'], videoUrl: 'https://v.douyin.com/yDKtvpkdoQM/', type: 'ip' },
  { id: 'tc-all-22', title: '请选择你的二十四节气身份', tags: ['#节气'], videoUrl: 'https://v.douyin.com/klTAZk10JUc/', type: 'event' },
  { id: 'tc-all-23', title: '天青色等烟雨，防沉迷守护你', tags: ['#创意'], videoUrl: 'https://v.douyin.com/LHpZOgexo3I/', type: 'trending' },
  { id: 'tc-all-24', title: '萌物来袭 #星星转场', tags: ['#萌物'], videoUrl: 'https://v.douyin.com/5W3LPlnolFM/', type: 'ip' },
  { id: 'tc-all-25', title: '你的眼睛比星空辽阔 #星空瞳孔转场', tags: ['#转场'], videoUrl: 'https://v.douyin.com/ho-hMd0LbOw/', type: 'trending' },
  { id: 'tc-all-26', title: '没有防沉迷的世界等十八岁后再告诉你', tags: ['#防沉迷'], videoUrl: 'https://v.douyin.com/t9qudFkan9o/', type: 'ip' },
  { id: 'tc-all-27', title: 'My girl我请你再靠近一点点', tags: ['#创意'], videoUrl: 'https://v.douyin.com/EBxQ36CeeN0/', type: 'ip' },
  { id: 'tc-all-28', title: '小叶子，你有多久没有在下五子棋的时候又唱又跳了', tags: ['#小叶子'], videoUrl: 'https://v.douyin.com/GNkH_kSgsnQ/', type: 'ip' },
  { id: 'tc-all-29', title: '我总是一个人 #孤身摇', tags: ['#孤身摇'], videoUrl: 'https://v.douyin.com/VEMCiTzkeLM/', type: 'trending' },
  { id: 'tc-all-30', title: '理论讲一百遍，不如实践跑一遍！ #闪耀吧少年', tags: ['#闪耀吧少年'], videoUrl: 'https://v.douyin.com/uN7fVJBkPxU/', type: 'trending' },
  { id: 'tc-all-31', title: '下班成功，祝大家假期愉快！ #国庆假期', tags: ['#国庆'], videoUrl: 'https://v.douyin.com/7eKfIEWbEj0/', type: 'event' },
];

// 腾讯视频统计
export const tencentVideoStats = {
  total: 31,
  trending: tencentAllVideos.filter((v) => v.type === 'trending').length,
  ip: tencentAllVideos.filter((v) => v.type === 'ip').length,
  series: tencentAllVideos.filter((v) => v.type === 'series').length,
  event: tencentAllVideos.filter((v) => v.type === 'event').length,
};
