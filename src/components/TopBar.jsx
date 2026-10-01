import React, { useState } from 'react';
import { GemSparkle } from './GemSparkle';
import { CoolSunglassesFace } from './CoolSunglassesFace';
import { ArrowDown } from './ArrowDown';
import { AnimateIcon } from './AnimateIcon';
import GlassSurface from './GlassSurface';
import { COURSES } from '../data/courses';
import { DEFAULT_AVATAR_SRC } from '../data/avatars';
import { NotebookBookmark } from 'reicon-react';
import { CourseIcon, FireIcon, CheckIcon, LockIcon, BookOpenIcon } from './ReiconIcons';
import { AnimatedTooltip } from './AnimatedTooltip';

export const TopBar = ({
  userState,
  activeCourse,
  onSelectCourse,
  onOpenStreak,
  onOpenProfile,
  onOpenLeaderboard,
  onPlaySound,
  onShowToast
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    onPlaySound('click');
    setDropdownOpen(!dropdownOpen);
  };

  const handleCourseClick = (course) => {
    onPlaySound('click');
    if (course.active) {
      onSelectCourse(course.id);
      setDropdownOpen(false);
    } else {
      if (onShowToast) {
        onShowToast({
          type: 'info',
          title: 'Coming Soon',
          message: `${course.title} is coming soon in the next quantum update!`
        });
      }
    }
  };

  const currentCourse = COURSES.find((c) => c.id === activeCourse) || COURSES[0];
  const userAvatar = userState?.avatar;
  const isImageAvatar = userAvatar && (userAvatar.startsWith('data:image') || userAvatar.startsWith('http') || userAvatar.startsWith('/'));

  return (
    <>
      <header className="top-bar">
        {/* Course Dropdown Trigger Button with Animated Radix Tooltip */}
        <AnimatedTooltip
          content="Quantum Courses"
          subcontent={currentCourse.title}
          icon="⚛️"
          accentColor="#7B57FF"
          side="bottom"
          align="start"
        >
          <button
            className="topbar-course-btn-wrapper"
            onClick={toggleDropdown}
            aria-label="Select Quantum Course"
            style={{
              background: 'transparent',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              outline: 'none'
            }}
          >
            <GlassSurface
              width={78}
              height={40}
              borderRadius={14}
              brightness={60}
              opacity={0.95}
              blur={0}
              displace={0}
              distortionScale={-200}
              className="course-glass-pill"
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', color: 'var(--icon-color)' }}>
                <span className="course-pill-icon" style={{ display: 'flex', alignItems: 'center' }}>
                  <NotebookBookmark size={24} color="var(--icon-color)" className="topbar-book-icon" />
                </span>
                <span className="dropdown-caret">
                  <AnimateIcon animateOnHover>
                    <ArrowDown size={14} color="var(--icon-color)" />
                  </AnimateIcon>
                </span>
              </div>
            </GlassSurface>
          </button>
        </AnimatedTooltip>

        {/* Stats Row (Streak, Gems with Animated Radix Tooltips) */}
        <div className="top-bar-stats">
          {/* Animated Tooltip for Streak */}
          <AnimatedTooltip
            content="Daily Streak"
            subcontent={`${userState.streak || 0} Days`}
            icon="🔥"
            accentColor="#FF7A00"
            side="bottom"
          >
            <button
              className="stat-pill streak-pill"
              onClick={() => {
                onPlaySound('click');
                onOpenStreak();
              }}
              aria-label="View Streak Calendar"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
            >
              <span className="stat-icon flame-icon-small" style={{ display: 'flex', alignItems: 'center' }}>
                <FireIcon size={18} color="#FF7A00" />
              </span>
              <span className="stat-value">{userState.streak}</span>
            </button>
          </AnimatedTooltip>

          {/* Animated Tooltip for Quantum Gems (Diamond) */}
          <AnimatedTooltip
            content="Quantum Gems"
            subcontent={`${userState.gems || 0} Gems`}
            icon="💎"
            accentColor="#22D3EE"
            side="bottom"
          >
            <button
              className="stat-pill gem-pill"
              onClick={() => {
                onPlaySound('click');
              }}
              aria-label="Quantum Gems"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
            >
              <span className="stat-icon gem-icon-small" style={{ display: 'flex', alignItems: 'center' }}>
                <GemSparkle size={20} color="#22D3EE" />
              </span>
              <span className="stat-value">{userState.gems}</span>
            </button>
          </AnimatedTooltip>
        </div>

        {/* Dynamic Profile Avatar Button with Animated Radix Tooltip */}
        <AnimatedTooltip
          content="Explorer Profile"
          icon="👑"
          accentColor="#F59E0B"
          side="bottom"
          align="end"
        >
          <button
            className="topbar-avatar-btn"
            onClick={() => {
              onPlaySound('click');
              onOpenProfile();
            }}
            aria-label="Open Profile"
          >
            <div className="topbar-avatar-circle">
              {isImageAvatar ? (
                <img
                  src={userAvatar}
                  alt={userState?.name || 'Custom Avatar'}
                  className="topbar-avatar-img"
                />
              ) : userAvatar ? (
                <span className="topbar-avatar-emoji">{userAvatar}</span>
              ) : (
                <img
                  src={DEFAULT_AVATAR_SRC}
                  alt="Default Avatar"
                  className="topbar-avatar-img"
                />
              )}
            </div>
          </button>
        </AnimatedTooltip>
      </header>

      {/* Course Dropdown Modal / Sheet */}
      {dropdownOpen && (
        <div className="course-dropdown">
          <div className="course-dropdown-backdrop" onClick={() => setDropdownOpen(false)} />
          <div className="course-dropdown-content">
            <div className="course-dropdown-header">
              <h3>MY COURSES</h3>
            </div>
            {COURSES.map((c) => (
              <div
                key={c.id}
                className={`course-row ${c.id === activeCourse ? 'active-course-row' : ''}`}
                onClick={() => handleCourseClick(c)}
              >
                <div
                  className={`course-icon-tile ${c.id === activeCourse ? 'active-tile' : ''}`}
                  style={{
                    background: `${c.color || '#00CD9C'}18`,
                    border: `1px solid ${c.color || '#00CD9C'}55`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <CourseIcon courseId={c.id} iconKey={c.iconKey} color={c.color} size={24} />
                </div>
                <div className="course-row-info">
                  <span className="course-name">{c.title}</span>
                  <span className="course-sub">{c.description}</span>
                </div>
                {c.id === activeCourse ? (
                  <span className="course-check" style={{ display: 'flex', alignItems: 'center' }}>
                    <CheckIcon size={18} color="var(--primary)" />
                  </span>
                ) : !c.active ? (
                  <span className="course-lock" style={{ display: 'flex', alignItems: 'center' }}>
                    <LockIcon size={16} color="var(--text-muted)" />
                  </span>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default TopBar;
