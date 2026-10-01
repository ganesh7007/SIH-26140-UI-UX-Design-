import React, { useState } from 'react';
import { CupTrophy, TestTube2 } from 'reicon-react';
import { HomeSmile } from './HomeSmile';
import { ShieldIcon, SettingsIcon, MoreHorizontalIcon, Volume2Icon, VolumeXIcon, FireIcon, DumbbellIcon, CloseIcon } from './ReiconIcons';
import { Gift4 } from './Gift4';
import { User } from './UserIcon';
import { AnimateIcon } from './AnimateIcon';
import { ThemeTogglerButton, triggerThemeTransition } from './ThemeTogglerButton';

export const BottomNav = ({
  activeTab,
  onSelectTab,
  onPlaySound,
  userState,
  onUpdateSetting,
  onResetData
}) => {
  const [moreOpen, setMoreOpen] = useState(false);

  const isImageAvatar =
    userState?.avatar &&
    (userState.avatar.startsWith('http') ||
      userState.avatar.startsWith('data:') ||
      userState.avatar.startsWith('/'));

  const tabs = [
    {
      id: 'home',
      icon: <HomeSmile size={24} color="currentColor" />,
      label: 'Learn'
    },
    {
      id: 'leaderboard',
      icon: <CupTrophy size={24} />,
      label: 'Leaderboard'
    },
    {
      id: 'lab',
      icon: (
        <AnimateIcon animateOnClick>
          <TestTube2 size={24} color="currentColor" />
        </AnimateIcon>
      ),
      label: 'Quantum Lab'
    },
    {
      id: 'profile',
      icon: isImageAvatar ? (
        <img
          src={userState.avatar}
          alt="Profile"
          className="bottom-nav-avatar-img"
          style={{
            width: '22px',
            height: '22px',
            borderRadius: '50%',
            objectFit: 'contain'
          }}
        />
      ) : (
        <AnimateIcon animateOnClick>
          <User size={23} color="currentColor" />
        </AnimateIcon>
      ),
      label: 'Profile'
    },
    {
      id: 'more',
      icon: <MoreHorizontalIcon size={25} color="#A78BFA" />,
      label: 'More',
      customClick: () => {
        onPlaySound?.('click');
        setMoreOpen(true);
      }
    }
  ];

  const handleSelectMoreOption = (tabId) => {
    onPlaySound?.('click');
    setMoreOpen(false);
    onSelectTab(tabId);
  };

  return (
    <>
      <nav className="bottom-nav">
        {tabs.map((t) => {
          const isActive = t.id === 'more' ? moreOpen : (activeTab === t.id && !moreOpen);
          return (
            <button
              key={t.id}
              className={`nav-tab ${isActive ? 'active' : ''}`}
              onClick={() => {
                if (t.customClick) {
                  t.customClick();
                } else {
                  onPlaySound?.('click');
                  setMoreOpen(false);
                  onSelectTab(t.id);
                }
              }}
              aria-label={t.label}
            >
              <span className="tab-icon">{t.icon}</span>
            </button>
          );
        })}
      </nav>

      {/* Mobile More Menu Bottom Sheet Modal */}
      {moreOpen && (
        <div className="mobile-more-backdrop" onClick={() => setMoreOpen(false)}>
          <div
            className="mobile-more-sheet"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Sheet Handle */}
            <div className="mobile-more-handle-bar">
              <div className="mobile-more-handle" />
            </div>

            {/* Header */}
            <div className="mobile-more-header">
              <h3>More Options</h3>
              <button
                className="mobile-more-close-btn"
                onClick={() => setMoreOpen(false)}
                aria-label="Close menu"
              >
                <CloseIcon size={18} color="currentColor" />
              </button>
            </div>

            {/* Grid / List of Desktop More Options */}
            <div className="mobile-more-list">
              <button
                className="mobile-more-item"
                onClick={() => handleSelectMoreOption('quests')}
              >
                <div className="more-item-icon-box" style={{ background: 'rgba(56, 189, 248, 0.15)', color: '#38BDF8' }}>
                  <Gift4 size={20} color="#38BDF8" />
                </div>
                <div className="more-item-text">
                  <span className="more-item-title">Quests & Badges</span>
                  <span className="more-item-sub">Claim daily chests and missions</span>
                </div>
              </button>

              <button
                className="mobile-more-item"
                onClick={() => handleSelectMoreOption('streak')}
              >
                <div className="more-item-icon-box" style={{ background: 'rgba(255, 122, 0, 0.15)', color: '#FF7A00' }}>
                  <FireIcon size={20} color="#FF7A00" />
                </div>
                <div className="more-item-text">
                  <span className="more-item-title">Daily Streak</span>
                  <span className="more-item-sub">{userState?.streak || 0} days streak history</span>
                </div>
              </button>

              <button
                className="mobile-more-item"
                onClick={() => handleSelectMoreOption('settings')}
              >
                <div className="more-item-icon-box" style={{ background: 'rgba(167, 139, 250, 0.15)', color: '#A78BFA' }}>
                  <SettingsIcon size={20} color="#A78BFA" />
                </div>
                <div className="more-item-text">
                  <span className="more-item-title">Settings</span>
                  <span className="more-item-sub">Account & preferences</span>
                </div>
              </button>

              {/* Theme Toggler Button */}
              <ThemeTogglerButton
                theme={userState?.theme}
                onToggle={(e) => {
                  onPlaySound?.('click');
                  triggerThemeTransition(e, userState?.theme, onUpdateSetting);
                }}
                variant="mobile-item"
              />

              {/* Sound Toggle */}
              <button
                className="mobile-more-item"
                onClick={() => {
                  onPlaySound?.('click');
                  onUpdateSetting?.('soundEnabled', !userState?.soundEnabled);
                }}
              >
                <div className="more-item-icon-box" style={{ background: userState?.soundEnabled !== false ? 'rgba(0, 205, 156, 0.15)' : 'rgba(239, 68, 68, 0.15)', color: userState?.soundEnabled !== false ? '#00CD9C' : '#EF4444' }}>
                  {userState?.soundEnabled !== false ? (
                    <Volume2Icon size={20} color="#00CD9C" />
                  ) : (
                    <VolumeXIcon size={20} color="#EF4444" />
                  )}
                </div>
                <div className="more-item-text">
                  <span className="more-item-title">Sound Effects</span>
                  <span className="more-item-sub">{userState?.soundEnabled !== false ? 'Enabled' : 'Muted'}</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BottomNav;
