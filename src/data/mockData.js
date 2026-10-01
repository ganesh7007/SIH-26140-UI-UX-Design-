export const INITIAL_USER_STATE = {
  name: 'Ganesh J',
  username: 'qubit_master',
  title: 'QubitMaster',
  streak: 6,
  xp: 912,
  gems: 711,
  rank: 2,
  level: 1,
  levelName: 'Quantum Beginner',
  monthlyQuestXP: 360,
  monthlyQuestTarget: 500,
  monthlyPoints: 16,
  monthlyPointsTarget: 20,
  completedLessons: [],
  completedUnits: [],
  unlockedLessons: [],
  unlockedAchievements: ['first_qubit', 'xp_500', 'gem_collector'],
  claimedAchievements: [],
  lastStreakCelebrationDate: null,
  currentLeagueTier: 4,
  unlockedLeagues: [1, 2, 3, 4],
  top3Weeks: 3,
  theme: 'light',
  soundEnabled: true,
  highContrast: false,
  reducedMotion: false,
  avatar: 'https://cdn.reicon.dev/alien-character-reading-book.svg',
  avatarSelections: {
    face: 'https://cdn.reicon.dev/alien-character-reading-book.svg'
  },
  dailyQuests: [
    {
      id: 'dq1',
      title: 'Complete 1 lesson',
      current: 1,
      target: 1,
      claimed: false,
      chestType: 'wood',
      rewardGems: 10,
      rewardXP: 15
    },
    {
      id: 'dq2',
      title: 'Do 1 Quantum demo lesson',
      current: 1,
      target: 1,
      claimed: false,
      chestType: 'cyan',
      rewardGems: 20,
      rewardXP: 25
    },
    {
      id: 'dq3',
      title: 'Get 2 perfect lessons',
      current: 0,
      target: 2,
      claimed: false,
      chestType: 'gold',
      rewardGems: 50,
      rewardXP: 50
    }
  ],
  bonusChests: [
    { id: 'bc1', title: 'Daily Quantum Crate', iconKey: 'archive-box', color: '#A78BFA', claimed: false, reward: '+20 Gems', rewardType: 'gems' },
    { id: 'bc2', title: 'Streak Society Vault', iconKey: 'gift', color: '#F43F5E', claimed: false, reward: 'Streak Freeze', rewardType: 'freeze' },
    { id: 'bc3', title: 'Grand Qubit Trove', iconKey: 'crown', color: '#FBBF24', claimed: false, reward: '+100 XP Boost', rewardType: 'xp' }
  ],
  streakDays: [22, 23, 24, 25, 26, 27] // 6 consecutive days leading up to today (August 27, 2026)
};

export const LEADERBOARD_USERS = [
  { id: 'u1', rank: 1, name: 'Disha Pal', xp: 1275, avatar: 'https://cdn.reicon.dev/panda-character-reading-book.svg', isUser: false },
  { id: 'u2', rank: 2, name: 'Ganesh J (You)', xp: 912, avatar: 'https://cdn.reicon.dev/alien-character-reading-book.svg', isUser: true, online: true },
  { id: 'u3', rank: 3, name: 'munoz', xp: 515, avatar: 'https://cdn.reicon.dev/koala-character-reading-book.svg', isUser: false },
  { id: 'u4', rank: 4, name: 'Сергей Бабуля', xp: 511, avatar: 'https://cdn.reicon.dev/owl-character-reading-book.svg', isUser: false },
  { id: 'u5', rank: 5, name: 'الزهراء ( أم أبيها ) بن عبدات', xp: 496, avatar: 'https://cdn.reicon.dev/cat-character-reading-book.svg', isUser: false },
  { id: 'u6', rank: 6, name: 'Manuel', xp: 372, avatar: 'https://cdn.reicon.dev/dragon-character-reading-book.svg', isUser: false },
  { id: 'u7', rank: 7, name: '心水', xp: 213, avatar: 'https://cdn.reicon.dev/child-picture-book.svg', isUser: false },
  { id: 'u8', rank: 8, name: 'Mona Sri', xp: 176, avatar: 'https://cdn.reicon.dev/angel.svg', isUser: false }
];

export const ACHIEVEMENTS_LIST = [
  { id: 'first_qubit', name: 'First Qubit', icon: '🏆', iconKey: 'cup-trophy', color: '#F59E0B', desc: 'Complete Unit 1' },
  { id: 'gate_explorer', name: 'Gate Explorer', icon: '⚛️', iconKey: 'atom', color: '#06B6D4', desc: 'Complete Unit 3 (Quantum Gates)' },
  { id: 'entangled', name: 'Entangled', icon: '🔗', iconKey: 'link2', color: '#8B5CF6', desc: 'Complete Unit 5 (Entanglement)' },
  { id: 'quantum_thinker', name: 'Quantum Thinker', icon: '🧠', iconKey: 'bulb-bolt', color: '#FBBF24', desc: 'Complete 10 lessons' },
  { id: 'streak_7', name: 'Streak Master', icon: '🔥', iconKey: 'fire', color: '#FF7A00', desc: 'Reach a 7-day streak' },
  { id: 'xp_500', name: 'XP Hunter', icon: '⚡', iconKey: 'bolt-lightning', color: '#EAB308', desc: 'Earn 500 total XP' },
  { id: 'circuit_builder', name: 'Circuit Builder', icon: '🔌', iconKey: 'cpu-bolt', color: '#10B981', desc: 'Complete Unit 4 (Circuits)' },
  { id: 'algorithm_ace', name: 'Algorithm Ace', icon: '🧮', iconKey: 'math', color: '#3B82F6', desc: 'Complete Unit 7 (Algorithms)' },
  { id: 'quantum_master', name: 'Quantum Master', icon: '🌌', iconKey: 'crown-star', color: '#EC4899', desc: 'Complete all 10 units' },
  { id: 'perfect_circuit', name: 'Perfect Circuit', icon: '💫', iconKey: 'star-sparkle', color: '#00CD9C', desc: 'Complete 5 lessons with 0 mistakes' },
  { id: 'gem_collector', name: 'Gem Collector', icon: '💎', iconKey: 'gem-sparkle', color: '#22D3EE', desc: 'Collect 500 Quantum Gems' },
  { id: 'dedicated', name: 'Dedicated Learner', icon: '📖', iconKey: 'diploma', color: '#6366F1', desc: 'Complete 20 lessons' }
];

export const AVATAR_CUSTOMIZATION = {
  face: ['🧑‍🔬', '👩‍🔬', '👨‍🔬', '🧑‍💻', '👩‍💻', '👨‍🚀', '🧙‍♂️', '🦸'],
  hair: ['💇', '💇‍♀️', '💇‍♂️', '👱', '🧑‍🦰', '🧑‍🦱', '🧑‍🦳', '👑'],
  outfit: ['🥼', '👔', '👕', '🧥', '🦺', '🥋', '👗', '👘'],
  aura: ['🟣', '🔵', '🟢', '🔴', '🟡', '✨', '🌈', '💎'],
  accessory: ['🎓', '🕶️', '👓', '🎩', '🎧', '👑', '🥽', '🪄'],
  companion: ['⚛️', '🌀', '✨', '💫', '🌟', '🔮', '🪐', '🤖']
};
