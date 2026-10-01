// Duolingo-style League Tiers & Badge Assets for QubitQuest
// Cloudinary links supplied by user:
// 1. Blue (Sapphire)
// 2. Green (Emerald)
// 3. Rose (Ruby)
// 4. Purple (Obsidian)
// 5. Crystal Crown (Top Badge)

export const LEAGUES_DATA = [
  {
    id: 'sapphire',
    tier: 1,
    name: 'Sapphire League',
    shortName: 'Sapphire',
    color: '#0284C7',
    rgb: '2, 132, 199',
    accentColor: '#38BDF8',
    pedestalColor: '#1E3A5F',
    badgeUrl: 'https://res.cloudinary.com/dfjtvivgv/image/upload/v1790492668/1790437251021_oxfsnh.jpg',
    description: 'Entry-level league. Master basic quantum states to advance.',
    requiredTop3Weeks: 1,
  },
  {
    id: 'emerald',
    tier: 2,
    name: 'Emerald League',
    shortName: 'Emerald',
    color: '#16A34A',
    rgb: '22, 163, 74',
    accentColor: '#4ADE80',
    pedestalColor: '#1A4D2E',
    badgeUrl: 'https://res.cloudinary.com/dfjtvivgv/image/upload/v1790492669/1790437520321_mbafx4.jpg',
    description: 'Intermediate league. Build quantum superposition gates.',
    requiredTop3Weeks: 1,
  },
  {
    id: 'ruby',
    tier: 3,
    name: 'Ruby League',
    shortName: 'Ruby',
    color: '#E11D48',
    rgb: '225, 29, 72',
    accentColor: '#FB7185',
    pedestalColor: '#4D1A28',
    badgeUrl: 'https://res.cloudinary.com/dfjtvivgv/image/upload/v1790492668/math_jctz0u.jpg',
    description: 'Advanced league. Entanglement and complex algorithms.',
    requiredTop3Weeks: 2,
  },
  {
    id: 'obsidian',
    tier: 4,
    name: 'Obsidian League',
    shortName: 'Obsidian',
    color: '#8B5CF6',
    rgb: '139, 92, 246',
    accentColor: '#C084FC',
    pedestalColor: '#2D1B4E',
    badgeUrl: 'https://res.cloudinary.com/dfjtvivgv/image/upload/v1790493061/6370e323-71a4-4fc0-9417-1c53053a30d7_mryzxv.png',
    description: 'Elite league. Stay in Top 3 for 3 weeks to earn the Crystal Crown!',
    requiredTop3Weeks: 3,
  },
  {
    id: 'crystal_crown',
    tier: 5,
    name: 'Crystal Crown League',
    shortName: 'Crown',
    color: '#EC4899',
    rgb: '236, 72, 153',
    accentColor: '#F472B6',
    pedestalColor: '#4A1D36',
    badgeUrl: 'https://res.cloudinary.com/dfjtvivgv/image/upload/v1790492672/Purple_Neon_Crystal_Crown_Badge_fbtx3z.png',
    description: 'The pinnacle league of QubitQuest. Only quantum grandmasters dwell here.',
    requiredTop3Weeks: 3,
  }
];

export const DUOLINGO_SCREENSHOT_USERS = [
  { id: 'u_user', rank: 1, name: 'Ganesh J', xp: 798, isUser: true, online: true, avatar: 'https://cdn.reicon.dev/alien-character-reading-book.svg' },
  { id: 'u_tori', rank: 2, name: 'Tori', flag: '🇯🇵 6', xp: 568, isUser: false, avatar: 'https://cdn.reicon.dev/owl-character-reading-book.svg' },
  { id: 'u_guoyun', rank: 3, name: '过云雨', xp: 378, isUser: false, avatar: 'https://cdn.reicon.dev/panda-character-reading-book.svg' },
  { id: 'u_pacifica', rank: 4, name: 'Pacifica', xp: 283, isUser: false, avatar: 'https://cdn.reicon.dev/koala-character-reading-book.svg' },
  { id: 'u_hui', rank: 5, name: '恢', xp: 170, isUser: false, avatar: 'https://cdn.reicon.dev/cat-character-reading-book.svg' },
  { id: 'u_zou', rank: 6, name: '走错啦', xp: 157, isUser: false, avatar: 'https://cdn.reicon.dev/dragon-character-reading-book.svg' },
  { id: 'u_alsu', rank: 7, name: 'Алсу Халитова', flag: '🇺🇸 18', xp: 152, isUser: false, avatar: 'https://cdn.reicon.dev/angel.svg' },
  { id: 'u_asima', rank: 8, name: 'Asima Mohanty', flag: '🇺🇸 1', xp: 150, isUser: false, avatar: 'https://cdn.reicon.dev/child-picture-book.svg' },
  { id: 'u_fu', rank: 9, name: '馥.', flag: '🇯🇵 18', xp: 148, isUser: false, avatar: 'https://cdn.reicon.dev/koala-character-reading-book.svg' },
  { id: 'u_dilyara', rank: 10, name: 'Dilyara Muhametkazy', xp: 139, isUser: false, avatar: 'https://cdn.reicon.dev/panda-character-reading-book.svg' }
];
