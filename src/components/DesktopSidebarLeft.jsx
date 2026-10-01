import React, { useState, useRef, useEffect } from 'react';
import { CupTrophy, TestTube2 } from 'reicon-react';
import { HomeSmile } from './HomeSmile';
import { Ranking } from './RankingIcon';
import { User } from './UserIcon';
import { ShieldIcon, DumbbellIcon, MoreHorizontalIcon, SettingsIcon, MoonIcon, SunIcon, Volume2Icon, VolumeXIcon, HeadphonesIcon } from './ReiconIcons';
import qubitLogo from '../assets/qubit-logo.png';
import GlassSurface from './GlassSurface';
import { ThemeTogglerButton, triggerThemeTransition } from './ThemeTogglerButton';

export const DesktopSidebarLeft = ({
  activeScreen,
  onNavigate,
  onPlaySound,
  hasUnclaimedQuests,
  userState,
  onUpdateSetting,
  onResetData
}) => {
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);
  const moreRef = useRef(null);
  const navListRef = useRef(null);
  const btnRefs = useRef({});
  const [sliderStyle, setSliderStyle] = useState({ top: 0, height: 48, opacity: 0 });

  // Update sliding glass surface position whenever active screen or more menu changes
  useEffect(() => {
    const updateSlider = () => {
      const activeKey = moreMenuOpen ? 'more' : (btnRefs.current[activeScreen] ? activeScreen : 'more');
      const targetEl = btnRefs.current[activeKey] || btnRefs.current['home'];
      const navList = navListRef.current;
      if (targetEl && navList) {
        const targetRect = targetEl.getBoundingClientRect();
        const navRect = navList.getBoundingClientRect();
        setSliderStyle({
          top: Math.round(targetRect.top - navRect.top),
          height: Math.round(targetRect.height),
          opacity: 1
        });
      }
    };

    updateSlider();
    const t = setTimeout(updateSlider, 40);
    window.addEventListener('resize', updateSlider);
    return () => {
      clearTimeout(t);
      window.removeEventListener('resize', updateSlider);
    };
  }, [activeScreen, moreMenuOpen]);

  // Close more menu on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (moreRef.current && !moreRef.current.contains(e.target)) {
        setMoreMenuOpen(false);
      }
    };
    if (moreMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [moreMenuOpen]);

  const navItems = [
    {
      id: 'home',
      label: 'LEARN',
      icon: (
        <span className="desktop-nav-icon-wrapper nav-icon-learn">
          <HomeSmile size={28} color="#FFC83D" />
        </span>
      )
    },
    {
      id: 'leaderboard',
      label: 'LEADERBOARDS',
      icon: (
        <span className="desktop-nav-icon-wrapper nav-icon-leaderboard">
          <CupTrophy size={26} color="#F59E0B" />
        </span>
      )
    },
    {
      id: 'lab',
      label: 'QUANTUM LAB',
      icon: (
        <span className="desktop-nav-icon-wrapper nav-icon-lab">
          <TestTube2 size={26} color="#00CD9C" />
        </span>
      )
    },
    {
      id: 'profile',
      label: 'PROFILE',
      icon: (
        <span className="desktop-nav-icon-wrapper nav-icon-profile">
          {userState?.avatar && (userState.avatar.startsWith('http') || userState.avatar.startsWith('data:') || userState.avatar.startsWith('/')) ? (
            <img
              src={userState.avatar}
              alt="Profile"
              className="desktop-nav-avatar-img"
              width={26}
              height={26}
            />
          ) : (
            <User size={26} color="currentColor" />
          )}
        </span>
      )
    }
  ];

  return (
    <aside className="desktop-sidebar-left">
      {/* Brand Logo */}
      <div className="desktop-brand-header">
        <button
          className="desktop-brand-btn"
          onClick={() => {
            onPlaySound('click');
            onNavigate('home');
          }}
          aria-label="Qubit Home"
        >
          <img
            src={qubitLogo}
            alt="Qubit"
            className="desktop-brand-logo-img"
          />
        </button>
      </div>

      {/* Navigation List with GlassSurface Sliding Pill */}
      <nav className="desktop-nav-list" ref={navListRef}>
        {/* Animated Sliding Glass Surface Pill */}
        <div
          className="desktop-nav-glass-slider"
          style={{
            transform: `translateY(${sliderStyle.top}px)`,
            height: `${sliderStyle.height}px`,
            opacity: sliderStyle.opacity
          }}
          aria-hidden="true"
        >
          <GlassSurface
            width="100%"
            height={sliderStyle.height}
            borderRadius={14}
            borderWidth={0.06}
            brightness={100}
            opacity={0.96}
            blur={14}
            displace={0}
            distortionScale={0}
            redOffset={0}
            greenOffset={0}
            blueOffset={0}
            backgroundOpacity={0.18}
            className="navbar-active-glass-pill"
          />
        </div>

        {navItems.map((item) => {
          const isActive = activeScreen === item.id && !moreMenuOpen;
          return (
            <button
              key={item.id}
              ref={(el) => (btnRefs.current[item.id] = el)}
              className={`desktop-nav-btn ${isActive ? 'active' : ''}`}
              onClick={() => {
                onPlaySound('click');
                if (item.customClick) {
                  item.customClick();
                } else {
                  onNavigate(item.id);
                }
              }}
            >
              <div className="desktop-nav-btn-inner">
                {item.icon}
                <span className="desktop-nav-label">{item.label}</span>
                {item.badge && <span className="desktop-nav-badge-dot" />}
              </div>
            </button>
          );
        })}

        {/* MORE Menu with Dropdown */}
        <div className="desktop-nav-more-wrapper" ref={moreRef}>
          <button
            ref={(el) => (btnRefs.current['more'] = el)}
            className={`desktop-nav-btn ${moreMenuOpen ? 'active' : ''}`}
            onClick={() => {
              onPlaySound('click');
              setMoreMenuOpen(!moreMenuOpen);
            }}
          >
            <div className="desktop-nav-btn-inner">
              <span className="desktop-nav-icon-wrapper nav-icon-more">
                <MoreHorizontalIcon size={26} color="#A78BFA" />
              </span>
              <span className="desktop-nav-label">MORE</span>
            </div>
          </button>

          {/* More Menu Dropdown Popover */}
          {moreMenuOpen && (
            <div className="desktop-more-menu-dropdown">
              <button
                className="desktop-more-item"
                onClick={() => {
                  onPlaySound('click');
                  setMoreMenuOpen(false);
                  onNavigate('settings');
                }}
              >
                <SettingsIcon size={18} color="var(--text-secondary)" />
                <span>Settings</span>
              </button>

              <ThemeTogglerButton
                theme={userState.theme}
                onToggle={(e) => {
                  onPlaySound('click');
                  triggerThemeTransition(e, userState.theme, onUpdateSetting);
                }}
                variant="dropdown-item"
              />

              <button
                className="desktop-more-item"
                onClick={() => {
                  onPlaySound('click');
                  onUpdateSetting?.('soundEnabled', !userState.soundEnabled);
                }}
              >
                {userState.soundEnabled !== false ? (
                  <Volume2Icon size={18} color="var(--text-secondary)" />
                ) : (
                  <VolumeXIcon size={18} color="#EF4444" />
                )}
                <span>{userState.soundEnabled !== false ? 'Sound Effects On' : 'Sound Effects Off'}</span>
              </button>
            </div>
          )}
        </div>
      </nav>
    </aside>
  );
};

export default DesktopSidebarLeft;
