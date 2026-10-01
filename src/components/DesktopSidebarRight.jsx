import React from 'react';
import { GemSparkle } from './GemSparkle';
import { AnimatedTooltip } from './AnimatedTooltip';
import { FireIcon } from './ReiconIcons';
import { DEFAULT_AVATAR_SRC } from '../data/avatars';
import { User } from './UserIcon';

export const DesktopSidebarRight = ({
  userState,
  activeCourse,
  onSelectCourse,
  onOpenStreak,
  onOpenLeaderboard,
  onOpenQuests,
  onOpenProfile,
  onOpenLab,
  onPlaySound,
  onContinueJourney
}) => {
  const userAvatar = userState?.avatar;
  const isImageAvatar =
    userAvatar &&
    (userAvatar.startsWith('http') ||
      userAvatar.startsWith('data:') ||
      userAvatar.startsWith('/'));
  return (
    <aside className="desktop-sidebar-right">
      {/* Top Stats Bar with Animated Radix Tooltips */}
      <div className="desktop-right-topbar">

        {/* Streak Pill Tooltip */}
        <AnimatedTooltip
          content="Daily Streak"
          subcontent={`${userState.streak || 15} Days`}
          icon="🔥"
          accentColor="#FF7A00"
          side="bottom"
        >
          <button
            className="desktop-stat-pill streak-pill-btn"
            onClick={() => {
              onPlaySound('click');
              onOpenStreak();
            }}
            aria-label="View Streak Calendar"
          >
            <span className="desktop-stat-icon-flame">
              <FireIcon size={22} color="#FF7A00" />
            </span>
            <span className="desktop-stat-val streak-val">{userState.streak || 15}</span>
          </button>
        </AnimatedTooltip>

        {/* Gems Pill Tooltip */}
        <AnimatedTooltip
          content="Quantum Gems"
          subcontent={`${userState.gems || 1157} Gems`}
          icon="💎"
          accentColor="#22D3EE"
          side="bottom"
        >
          <button
            className="desktop-stat-pill gems-pill-btn"
            onClick={() => onPlaySound('click')}
            aria-label="Quantum Gems"
          >
            <span className="desktop-stat-icon-gem">
              <GemSparkle size={20} color="#22D3EE" />
            </span>
            <span className="desktop-stat-val gems-val">{userState.gems || 1157}</span>
          </button>
        </AnimatedTooltip>

        {/* Current Profile Avatar Pill Tooltip */}
        <AnimatedTooltip
          content="Researcher Profile"
          subcontent={userState.name || "Quantum Explorer"}
          icon="👤"
          accentColor="#A855F7"
          side="bottom"
        >
          <button
            className="desktop-stat-pill desktop-profile-avatar-btn"
            onClick={() => {
              onPlaySound('click');
              onOpenProfile();
            }}
            aria-label="Open Profile"
          >
            <div className="desktop-avatar-circle">
              {isImageAvatar ? (
                <img
                  src={userAvatar}
                  alt={userState?.name || 'Researcher Profile'}
                  className="desktop-avatar-img topbar-avatar-img"
                  width={24}
                  height={24}
                />
              ) : userAvatar ? (
                <span className="desktop-avatar-emoji">{userAvatar}</span>
              ) : (
                <img
                  src={DEFAULT_AVATAR_SRC}
                  alt="Default Avatar"
                  className="desktop-avatar-img topbar-avatar-img"
                  width={24}
                  height={24}
                />
              )}
            </div>
          </button>
        </AnimatedTooltip>
      </div>

      {/* Motivational Emerald League Card (Matching paper-card shape) */}
      <div className="uiverse-paper-card uiverse-league-card">
        <div className="league-card-header-row">
          <span className="title">🏆 Emerald League</span>
          <span className="highlight-tag rank-badge">Rank #2</span>
        </div>

        <p className="description">
          You're ranked <span className="highlight-tag">#2</span>! Complete lessons and earn <span className="highlight-tag xp">+30 XP</span> to overtake 1st place on the leaderboard.
        </p>

        <div className="actions league-card-actions">
          <button
            className="ultimate-3d-btn"
            onClick={() => {
              onPlaySound?.('click');
              onContinueJourney?.();
            }}
          >
            <span className="ripple"></span>
            <span className="btn-text" data-text="▶ Continue Journey">
              ▶ Continue Journey
            </span>
            <span className="icon"></span>
          </button>
          
          <button
            className="view-leaderboard-btn"
            onClick={() => {
              onPlaySound?.('click');
              onOpenLeaderboard?.();
            }}
          >
            View Leaderboard
          </button>
        </div>
      </div>

      {/* Quantum Lab Uiverse Card (Second Image Section) */}
      <div className="uiverse-paper-card uiverse-lab-card">
        <span className="title">🧪 Quantum Lab</span>
        <p className="description">
          Build & test real quantum circuits! Practice with <span className="highlight-tag">Hadamard & CNOT</span> gates to boost your brain with <span className="highlight-tag xp">+50 XP bonus</span> and accelerate your leaderboard rank.
        </p>
        <div className="actions">
          <button
            className="ultimate-3d-btn"
            onClick={() => {
              onPlaySound?.('click');
              onOpenLab?.();
            }}
          >
            <span className="ripple"></span>
            <span className="btn-text" data-text="Practice Lab">
              Practice Lab
            </span>
            <span className="icon"></span>
          </button>
        </div>
      </div>

      {/* Footer Links */}
      <footer className="desktop-sidebar-footer">
        <div className="desktop-footer-links">
          <a href="#about" onClick={(e) => e.preventDefault()}>ABOUT</a>
          <a href="#blog" onClick={(e) => e.preventDefault()}>BLOG</a>
          <a href="#store" onClick={(e) => e.preventDefault()}>STORE</a>
          <a href="#efficacy" onClick={(e) => e.preventDefault()}>EFFICACY</a>
          <a href="#careers" onClick={(e) => e.preventDefault()}>CAREERS</a>
          <a href="#investors" onClick={(e) => e.preventDefault()}>INVESTORS</a>
          <a href="#terms" onClick={(e) => e.preventDefault()}>TERMS</a>
          <a href="#privacy" onClick={(e) => e.preventDefault()}>PRIVACY</a>
        </div>
      </footer>
    </aside>
  );
};

export default DesktopSidebarRight;
