import React, { useState, useEffect, useRef } from 'react';
import { INITIAL_USER_STATE } from './data/mockData';
import { playSound } from './utils/audio';
import { TopBar } from './components/TopBar';
import { BottomNav } from './components/BottomNav';
import { DesktopSidebarLeft } from './components/DesktopSidebarLeft';
import { DesktopSidebarRight } from './components/DesktopSidebarRight';
import { HomeScreen } from './components/HomeScreen';
import { LessonModal } from './components/LessonModal';
import { StreakScreen } from './components/StreakScreen';
import { QuestsScreen } from './components/QuestsScreen';
import { LeaderboardScreen } from './components/LeaderboardScreen';
import { LabScreen } from './components/LabScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { AvatarModal } from './components/AvatarModal';
import { SettingsScreen } from './components/SettingsScreen';
import { ChestModal } from './components/ChestModal';
import { LoadingScreen } from './components/LoadingScreen';
import { StreakCelebrationModal } from './components/StreakCelebrationModal';
import { GuidebookModal } from './components/GuidebookModal';
import { UNITS, COURSES } from './data/courses';
import { ToastNotification } from './components/ToastNotification';
import { ErrorScreen } from './components/ErrorScreen';

export const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Load persistent user state
  const [userState, setUserState] = useState(() => {
    try {
      const saved = localStorage.getItem('qubitquest_react_state');
      if (saved) {
        const parsed = JSON.parse(saved);
        // Ensure valid dailyQuests and bonusChests
        const mergedQuests = Array.isArray(parsed.dailyQuests) && parsed.dailyQuests.length > 0
          ? parsed.dailyQuests
          : INITIAL_USER_STATE.dailyQuests;
        const mergedBonusChests = INITIAL_USER_STATE.bonusChests.map(bInit => {
          const found = parsed.bonusChests?.find(b => b.id === bInit.id);
          return found ? { ...bInit, ...found } : bInit;
        });

        return {
          ...INITIAL_USER_STATE,
          ...parsed,
          theme: 'light',
          dailyQuests: mergedQuests,
          bonusChests: mergedBonusChests,
          streakDays: parsed.streakDays || INITIAL_USER_STATE.streakDays
        };
      }
      return { ...INITIAL_USER_STATE, theme: 'light' };
    } catch {
      return { ...INITIAL_USER_STATE, theme: 'light' };
    }
  });

  // Active Screen / Navigation Tab and History Stack
  const [activeScreen, setActiveScreen] = useState('home');
  const [screenHistory, setScreenHistory] = useState(['home']);
  const [activeCourse, setActiveCourse] = useState('qc');
  const mainViewportRef = useRef(null);

  // Auto-scroll center viewport to top whenever activeScreen changes
  useEffect(() => {
    if (mainViewportRef.current) {
      mainViewportRef.current.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
    window.scrollTo({ top: 0, left: 0 });
  }, [activeScreen]);

  const navigateTo = (newScreen) => {
    if (newScreen === activeScreen) return;
    setScreenHistory((prev) => [...prev, activeScreen]);
    setActiveScreen(newScreen);
  };

  const handleGoBack = (fallbackScreen = 'home') => {
    setScreenHistory((prev) => {
      if (prev.length <= 1) {
        setActiveScreen(fallbackScreen);
        return [fallbackScreen];
      }
      const next = [...prev];
      const prevScreen = next.pop();
      setActiveScreen(prevScreen);
      return next;
    });
  };

  const [errorConfig, setErrorConfig] = useState({
    code: '404',
    title: '',
    message: '',
    reason: ''
  });

  // Security & Route Validation (SQLi, XSS, and URL mismatch defense)
  const validateRouteAndSecurity = (rawRoute) => {
    if (!rawRoute) return { isValid: true, route: 'home' };
    const decoded = decodeURIComponent(rawRoute).toLowerCase();

    // Malicious injection pattern detection (XSS / SQLi)
    const isMalicious =
      /<script|javascript:|onload=|onerror=|<svg|<img|union\s+select|insert\s+into|drop\s+table|delete\s+from|'\s*or\s*'|"\s*or\s*"|--|\bexec\b|\bbenchmark\b/i.test(
        decoded
      );

    if (isMalicious) {
      return {
        isValid: false,
        reason: 'security',
        title: 'Security Shield Engaged',
        message: 'Suspicious URL parameter or unauthorized script injection attempt was detected and intercepted.'
      };
    }

    const cleanRoute = decoded.replace(/^[#/]+/, '').trim();
    const validScreens = ['home', 'lab', 'quests', 'leaderboard', 'profile', 'streak', 'avatar', 'settings'];

    if (!cleanRoute) {
      return { isValid: true, route: 'home' };
    }

    if (validScreens.includes(cleanRoute)) {
      return { isValid: true, route: cleanRoute };
    }

    // Check if it's a known unit/lesson route
    const allLessons = UNITS.flatMap((u) => u.lessons || []);
    const matchingLesson = allLessons.find(
      (l) => l.id.toLowerCase() === cleanRoute || l.title?.toLowerCase() === cleanRoute
    );
    if (matchingLesson) {
      return { isValid: true, route: 'home', lesson: matchingLesson };
    }

    return {
      isValid: false,
      reason: 'mismatch',
      title: 'Unrecognized URL Route',
      message: `The requested URL route "${cleanRoute}" was not found or does not exist in the quantum map.`
    };
  };

  // URL Hash Sync & Network State Monitoring
  useEffect(() => {
    const handleUrlChange = () => {
      const hash = window.location.hash || window.location.search;
      if (hash) {
        const result = validateRouteAndSecurity(hash);
        if (!result.isValid) {
          setErrorConfig({
            code: result.reason === 'security' ? '403' : '404',
            title: result.title,
            message: result.message,
            reason: result.reason
          });
          setActiveScreen('404');
        } else if (result.lesson) {
          setActiveScreen('home');
          setActiveLesson(result.lesson);
        } else {
          setActiveScreen(result.route);
        }
      }
    };

    const handleOnlineStatus = () => {
      if (!navigator.onLine) {
        setErrorConfig({
          code: '503',
          title: 'Quantum Connection Lost',
          message: 'You appear to be offline. Please check your internet connection.',
          reason: 'offline'
        });
        setActiveScreen('404');
      }
    };

    handleUrlChange();
    window.addEventListener('hashchange', handleUrlChange);
    window.addEventListener('popstate', handleUrlChange);
    window.addEventListener('offline', handleOnlineStatus);
    return () => {
      window.removeEventListener('hashchange', handleUrlChange);
      window.removeEventListener('popstate', handleUrlChange);
      window.removeEventListener('offline', handleOnlineStatus);
    };
  }, []);

  // Search / Route Resolution
  const handleSearch = (query) => {
    if (!query || !query.trim()) return;
    const q = query.toLowerCase().trim();
    const allLessons = UNITS.flatMap((u) => u.lessons || []);
    const foundLesson = allLessons.find((l) =>
      l.title?.toLowerCase().includes(q) || (l.summary && l.summary.toLowerCase().includes(q))
    );

    if (foundLesson) {
      navigateTo('home');
      handleStartLesson(foundLesson);
    } else if (['lab', 'quantum lab', 'simulator', 'scatter', 'gate', 'h gate', 'x gate'].some((k) => q.includes(k))) {
      navigateTo('lab');
    } else if (['leaderboard', 'rank', 'ranking', 'score', 'trophy'].some((k) => q.includes(k))) {
      navigateTo('leaderboard');
    } else if (['quest', 'quests', 'badge', 'chest', 'gems'].some((k) => q.includes(k))) {
      navigateTo('quests');
    } else if (['profile', 'avatar', 'settings'].some((k) => q.includes(k))) {
      navigateTo('profile');
    } else if (['streak', 'flame', 'calendar'].some((k) => q.includes(k))) {
      navigateTo('streak');
    } else {
      handleShowToast({
        type: 'info',
        title: 'Search Result',
        message: `No matching quantum modules found for "${query}".`
      });
      handlePlaySound('error');
    }
  };

  // Modals
  const [activeLesson, setActiveLesson] = useState(null);
  const [activeChest, setActiveChest] = useState(null);
  const [activeGuidebookUnit, setActiveGuidebookUnit] = useState(null);
  const [showStreakCelebration, setShowStreakCelebration] = useState(false);
  const [toastNotification, setToastNotification] = useState(null);

  // Save to localStorage whenever userState updates
  useEffect(() => {
    try {
      localStorage.setItem('qubitquest_react_state', JSON.stringify(userState));
    } catch (e) { }
  }, [userState]);

  // Apply Theme & Accessibility attributes to document root
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', userState.theme || 'light');
    document.documentElement.setAttribute('data-contrast', userState.highContrast ? 'high' : '');
    document.documentElement.setAttribute('data-motion', userState.reducedMotion ? 'reduced' : '');
  }, [userState.theme, userState.highContrast, userState.reducedMotion]);

  // Sound helper
  const handlePlaySound = (type) => {
    playSound(type, userState.soundEnabled !== false);
  };

  // Show Bottom-Left Professional Toast Notification
  const showToast = (toastData) => {
    if (typeof toastData === 'string') {
      setToastNotification({
        title: toastData,
        type: 'info'
      });
    } else {
      setToastNotification(toastData);
    }
  };

  // Handle lesson start
  const handleStartLesson = (lesson) => {
    setActiveLesson(lesson);
  };

  // Handle lesson completion
  const handleLessonComplete = (lesson, isPerfect) => {
    setActiveLesson(null);
    const xpGained = isPerfect ? 30 : 15;
    const gemsGained = 10;

    showToast({
      type: 'xp',
      title: isPerfect ? 'Mastery! Lesson Completed' : 'Lesson Completed!',
      message: `Earned +${xpGained} XP & +${gemsGained} Quantum Gems!`,
      amount: `+${xpGained} XP`
    });

    const todayDateKey = new Date().toISOString().split('T')[0];
    const isFirstTimeToday = userState.lastStreakCelebrationDate !== todayDateKey;
    const todayDay = new Date().getDate();
    const currentStreakDays = Array.isArray(userState.streakDays) ? userState.streakDays : [todayDay];
    const isNewStreakDay = !currentStreakDays.includes(todayDay);
    const updatedStreak = isNewStreakDay ? (userState.streak || 6) + 1 : (userState.streak || 6);
    const updatedStreakDays = isNewStreakDay ? [...currentStreakDays, todayDay] : currentStreakDays;

    setUserState((prev) => {
      const completed = prev.completedLessons.includes(lesson.id)
        ? prev.completedLessons
        : [...prev.completedLessons, lesson.id];

      // Update quests
      const updatedQuests = prev.dailyQuests.map((q) => {
        if (q.id === 'dq1') return { ...q, current: Math.min(q.target, q.current + 1) };
        if (q.id === 'dq2' && lesson.demo) return { ...q, current: Math.min(q.target, q.current + 1) };
        if (q.id === 'dq3' && isPerfect) return { ...q, current: Math.min(q.target, q.current + 1) };
        return q;
      });

      return {
        ...prev,
        xp: prev.xp + xpGained,
        gems: prev.gems + gemsGained,
        streak: updatedStreak,
        streakDays: updatedStreakDays,
        lastStreakCelebrationDate: todayDateKey,
        completedLessons: completed,
        monthlyPoints: Math.min(prev.monthlyPointsTarget, prev.monthlyPoints + 1),
        dailyQuests: updatedQuests
      };
    });

    // Trigger Streak Celebration Pop-up ONLY IF it's the first time today!
    if (isFirstTimeToday) {
      setTimeout(() => {
        setShowStreakCelebration(true);
      }, 450);
    }
  };

  // Handle Jump Ahead Checkpoint completion (unlocks target and preceding lessons without marking them completed)
  const handleJumpAheadComplete = (unlockedIds, bonusXP = 50) => {
    setUserState((prev) => {
      const prevUnlocked = prev.unlockedLessons || [];
      const updatedUnlocked = Array.from(new Set([...prevUnlocked, ...unlockedIds]));
      return {
        ...prev,
        unlockedLessons: updatedUnlocked,
        xp: prev.xp + bonusXP,
        gems: prev.gems + 20
      };
    });

    showToast({
      type: 'xp',
      title: 'Checkpoint Passed! ⚡',
      message: `Unlocked lessons and earned +${bonusXP} XP!`,
      amount: `+${bonusXP} XP`
    });
  };

  // Handle Quest Chest Open
  const handleClaimChest = (quest) => {
    setActiveChest(quest);
    const gemReward = quest.chestType === 'gold' ? 30 : quest.chestType === 'cyan' ? 20 : 10;
    const xpReward = quest.chestType === 'gold' ? 50 : 25;

    showToast({
      type: 'chest',
      title: `${quest.title} Claimed!`,
      message: `Received +${gemReward} Gems and +${xpReward} XP!`,
      amount: `+${xpReward} XP`
    });

    setUserState((prev) => {
      const updatedQuests = prev.dailyQuests.map((q) => {
        if (q.id === quest.id) {
          return { ...q, claimed: true };
        }
        return q;
      });

      return {
        ...prev,
        gems: prev.gems + gemReward,
        xp: prev.xp + xpReward,
        dailyQuests: updatedQuests
      };
    });
  };

  // Handle Bonus Chest Open
  const handleClaimBonusChest = (bChest) => {
    if (bChest.claimed) return;

    const extraGems = bChest.rewardType === 'gems' || bChest.id === 'bc1' ? 20 : 0;
    const extraXp = bChest.rewardType === 'xp' || bChest.id === 'bc3' ? 40 : 0;

    setUserState((prev) => {
      const updatedBonus = prev.bonusChests.map((b) =>
        b.id === bChest.id ? { ...b, claimed: true } : b
      );
      return {
        ...prev,
        gems: prev.gems + extraGems,
        xp: prev.xp + extraXp,
        bonusChests: updatedBonus
      };
    });

    showToast({
      type: 'chest',
      title: `${bChest.title} Claimed!`,
      message: `Bonus rewards added to your vault!`,
      amount: extraXp ? `+${extraXp} XP` : `+${extraGems} Gems`
    });
  };

  // Check if any daily quests are claimable but unclaimed
  const hasUnclaimedQuests = userState.dailyQuests.some(
    (q) => q.current >= q.target && !q.claimed
  );

  // Handle League Promotion
  const handlePromoteLeague = (newTier) => {
    setUserState((prev) => {
      const currentUnlocked = prev.unlockedLeagues || [1, 2, 3, 4];
      const nextUnlocked = currentUnlocked.includes(newTier)
        ? currentUnlocked
        : [...currentUnlocked, newTier];
      return {
        ...prev,
        currentLeagueTier: newTier,
        unlockedLeagues: nextUnlocked,
        top3Weeks: (prev.top3Weeks || 3) + 1
      };
    });
  };

  // User settings updates
  const handleUpdateSetting = (key, value) => {
    setUserState((prev) => ({
      ...prev,
      [key]: value
    }));
  };

  // Reset demo data
  const handleResetData = () => {
    localStorage.removeItem('qubitquest_react_state');
    setUserState(INITIAL_USER_STATE);
    setActiveScreen('home');
    setScreenHistory(['home']);
    showToast({
      type: 'success',
      title: 'Demo Data Reset',
      message: 'All learning progress has been reset.'
    });
  };

  // Save customized avatar
  const handleSaveAvatar = (newAvatar, newCustomizations = {}) => {
    setUserState((prev) => ({
      ...prev,
      avatar: newAvatar,
      avatarCustomizations: {
        ...prev.avatarCustomizations,
        ...newCustomizations
      }
    }));
    showToast({
      type: 'avatar',
      title: 'Avatar Updated!',
      message: 'Your quantum researcher look has been saved.'
    });
  };

  // Update user profile info
  const handleUpdateProfile = (profileData) => {
    setUserState((prev) => ({
      ...prev,
      ...profileData
    }));
    showToast({
      type: 'profile',
      title: 'Profile Updated!',
      message: 'Your researcher profile details have been saved.'
    });
  };

  // Handle Achievement Reward Claim
  const handleClaimAchievementReward = (ach) => {
    if (userState.claimedAchievements && userState.claimedAchievements.includes(ach.id)) {
      return;
    }
    setUserState((prev) => {
      const alreadyClaimed = Array.isArray(prev.claimedAchievements) ? prev.claimedAchievements : [];
      if (alreadyClaimed.includes(ach.id)) return prev;

      return {
        ...prev,
        gems: prev.gems + 15,
        xp: prev.xp + 35,
        claimedAchievements: [...alreadyClaimed, ach.id]
      };
    });
    showToast({
      type: 'achievement',
      title: 'Achievement Unlocked!',
      message: `Reward claimed for ${ach.name}`,
      amount: '+50 Gems'
    });
  };

  const isErrorScreen =
    activeScreen === '404' ||
    activeScreen === 'error' ||
    !['home', 'lab', 'quests', 'leaderboard', 'profile', 'streak', 'avatar', 'settings'].includes(activeScreen);

  // Standalone Fullscreen 404 / Error Page (Bypasses all sidebars & app navigation)
  if (isErrorScreen) {
    return (
      <div id="app" className="error-fullscreen-app-root">
        {/* Toast Notification */}
        <ToastNotification
          notification={toastNotification}
          onClose={() => setToastNotification(null)}
        />

        <ErrorScreen
          code={errorConfig.code}
          title={errorConfig.title}
          message={errorConfig.message}
          reason={errorConfig.reason}
          onPlaySound={handlePlaySound}
          onRetry={() => {
            window.location.hash = '';
            setActiveScreen('home');
            window.location.reload();
          }}
          onNavigateHome={() => {
            window.location.hash = '';
            setActiveScreen('home');
          }}
        />
      </div>
    );
  }

  return (
    <div id="app" className="desktop-app-layout">
      {/* Quantum Lottie Loading Screen Splash */}
      {isLoading && (
        <LoadingScreen onFinished={() => setIsLoading(false)} minDuration={1400} />
      )}

      {/* Modern Bottom-Left Toast Notification */}
      <ToastNotification
        notification={toastNotification}
        onClose={() => setToastNotification(null)}
      />

      {/* Desktop Left Sidebar (Visible on screens >= 768px, Hidden during active quiz) */}
      {!activeLesson && (
        <DesktopSidebarLeft
          activeScreen={activeScreen}
          onNavigate={navigateTo}
          onPlaySound={handlePlaySound}
          hasUnclaimedQuests={hasUnclaimedQuests}
          userState={userState}
          onUpdateSetting={handleUpdateSetting}
          onResetData={handleResetData}
        />
      )}

      {/* Mobile Top Status Bar (Only visible on screens < 768px) */}
      {!activeLesson && (
        <div className="mobile-only-topbar">
          <TopBar
            userState={userState}
            activeCourse={activeCourse}
            onSelectCourse={(courseId) => setActiveCourse(courseId)}
            onOpenStreak={() => navigateTo('streak')}
            onOpenProfile={() => navigateTo('profile')}
            onOpenLeaderboard={() => navigateTo('leaderboard')}
            onPlaySound={handlePlaySound}
            onShowToast={showToast}
          />
        </div>
      )}

      {/* Center Main Viewport */}
      <div
        ref={mainViewportRef}
        className={`desktop-center-container ${activeScreen !== 'home' ? 'desktop-subpage-view' : ''}`}
      >
        <main className="desktop-main-area">
          {activeScreen === 'home' && (
            <HomeScreen
              userState={userState}
              onStartLesson={handleStartLesson}
              onOpenGuidebook={(unit) => setActiveGuidebookUnit(unit)}
              onPlaySound={handlePlaySound}
              onShowToast={showToast}
              onConfirmJumpAhead={handleJumpAheadComplete}
            />
          )}

          {activeScreen === 'lab' && (
            <LabScreen
              userState={userState}
              setUserState={setUserState}
              onPlaySound={handlePlaySound}
              onShowToast={showToast}
            />
          )}

          {activeScreen === 'quests' && (
            <QuestsScreen
              userState={userState}
              onClaimChest={handleClaimChest}
              onClaimBonusChest={handleClaimBonusChest}
              onPlaySound={handlePlaySound}
              onShowToast={showToast}
            />
          )}

          {activeScreen === 'leaderboard' && (
            <LeaderboardScreen
              userState={userState}
              onContinue={() => navigateTo('home')}
              onPlaySound={handlePlaySound}
              onPromoteLeague={handlePromoteLeague}
              onUpdateUserState={setUserState}
            />
          )}

          {activeScreen === 'profile' && (
            <ProfileScreen
              userState={userState}
              onUpdateProfile={handleUpdateProfile}
              onOpenAvatarCustomizer={() => navigateTo('avatar')}
              onOpenSettings={() => navigateTo('settings')}
              onClaimReward={handleClaimAchievementReward}
              onPlaySound={handlePlaySound}
            />
          )}

          {activeScreen === 'streak' && (
            <StreakScreen
              userState={userState}
              onClose={() => handleGoBack('home')}
              onOpenCelebration={() => setShowStreakCelebration(true)}
              onPlaySound={handlePlaySound}
              onShowToast={showToast}
            />
          )}

          {activeScreen === 'avatar' && (
            <AvatarModal
              userState={userState}
              onSave={handleSaveAvatar}
              onClose={() => handleGoBack('profile')}
              onPlaySound={handlePlaySound}
            />
          )}

          {activeScreen === 'settings' && (
            <SettingsScreen
              userState={userState}
              onUpdateSetting={handleUpdateSetting}
              onResetData={handleResetData}
              onClose={() => handleGoBack('profile')}
              onPlaySound={handlePlaySound}
            />
          )}
        </main>
      </div>

      {/* Desktop Right Sidebar (Widgets & Stats - Visible on desktop viewports) */}
      {!activeLesson && (
        <div className="desktop-only-rightbar">
          <DesktopSidebarRight
            userState={userState}
            activeCourse={activeCourse}
            onSelectCourse={(courseId) => setActiveCourse(courseId)}
            onOpenStreak={() => navigateTo('streak')}
            onOpenLeaderboard={() => navigateTo('leaderboard')}
            onOpenQuests={() => navigateTo('quests')}
            onOpenProfile={() => navigateTo('profile')}
            onOpenLab={() => navigateTo('lab')}
            onPlaySound={handlePlaySound}
            onContinueJourney={() => {
              handlePlaySound('click');
              if (activeScreen !== 'home') {
                navigateTo('home');
              }
              setTimeout(() => {
                const activeEl = document.querySelector('.journey-card.card-active') || document.querySelector('.journey-card');
                if (activeEl) {
                  activeEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
              }, 120);
            }}
          />
        </div>
      )}

      {/* Mobile Bottom Navigation (Only on screens < 768px) */}
      {!activeLesson && (
        <div className="mobile-only-bottomnav">
          <BottomNav
            activeTab={activeScreen}
            onSelectTab={(tabId) => navigateTo(tabId)}
            onPlaySound={handlePlaySound}
            userState={userState}
            onUpdateSetting={handleUpdateSetting}
            onResetData={handleResetData}
          />
        </div>
      )}

      {/* Active Lesson Modal */}
      {activeLesson && (
        <LessonModal
          lesson={activeLesson}
          onClose={() => setActiveLesson(null)}
          onComplete={handleLessonComplete}
          onPlaySound={handlePlaySound}
        />
      )}

      {/* Active Quest Chest Modal */}
      {activeChest && (
        <ChestModal
          chest={activeChest}
          onClose={() => setActiveChest(null)}
          onClaim={() => {
            setActiveChest(null);
          }}
          onPlaySound={handlePlaySound}
        />
      )}

      {/* Unit Guidebook Modal */}
      {activeGuidebookUnit && (
        <GuidebookModal
          unit={activeGuidebookUnit}
          onClose={() => setActiveGuidebookUnit(null)}
          onPlaySound={handlePlaySound}
        />
      )}

      {/* Dual-Layered Lottie Streak Celebration Modal */}
      {showStreakCelebration && (
        <StreakCelebrationModal
          streakCount={userState.streak}
          onClose={() => setShowStreakCelebration(false)}
          onPlaySound={handlePlaySound}
        />
      )}
    </div>
  );
};

export default App;
