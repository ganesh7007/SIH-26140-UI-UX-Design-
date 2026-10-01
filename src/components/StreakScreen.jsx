import React from 'react';
import { StreakFlame } from './StreakFlame';
import {
  FireIcon,
  LightningIcon,
  CheckIcon,
  CloseIcon,
  ShareIcon,
  CrownStarIcon
} from './ReiconIcons';

export const StreakScreen = ({ userState, onClose, onPlaySound, onOpenCelebration, onShowToast }) => {
  // Calendar dynamic generation based on current date
  const today = new Date();
  const currentMonthName = today.toLocaleString('default', { month: 'long' });
  const currentYear = today.getFullYear();
  const daysInMonth = new Date(currentYear, today.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, today.getMonth(), 1).getDay(); // 0 = Sunday
  
  const todayDay = today.getDate();
  const streakLength = userState.streak || 6;

  // Generate streak array leading up to and including today
  const streakDays = userState.streakDays || Array.from({ length: streakLength }, (_, i) => todayDay - (streakLength - 1) + i).filter(d => d > 0);

  const weekdays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  return (
    <div className="streak-screen-wrapper">
      {/* Orange Streak Hero Header */}
      <div className="streak-header-hero">
        <div className="streak-nav-row">
          <button
            className="streak-close-btn"
            onClick={onClose}
            aria-label="Close Streak"
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <CloseIcon size={16} color="currentColor" />
          </button>
          <span className="streak-nav-title">Streak</span>
          <button
            className="streak-share-btn"
            onClick={() => {
              onPlaySound('click');
              if (navigator.share) {
                navigator.share({
                  title: 'QubitQuest Streak',
                  text: `I have a ${userState.streak} day quantum streak on QubitQuest!`
                }).catch(() => {});
              } else {
                if (onShowToast) {
                  onShowToast({
                    type: 'success',
                    title: 'Streak Shared!',
                    message: `${userState.streak} Day Quantum Streak link copied!`
                  });
                }
              }
            }}
            aria-label="Share Streak"
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <ShareIcon size={18} color="currentColor" />
          </button>
        </div>

        <div className="streak-hero-body">
          <div className="streak-hero-left">
            <h1 className="streak-hero-count">{userState.streak}</h1>
            <span className="streak-hero-label">day streak!</span>
            {onOpenCelebration && (
              <button
                className="streak-celebrate-btn-mini"
                onClick={() => {
                  if (onPlaySound) onPlaySound('click');
                  onOpenCelebration();
                }}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
              >
                <FireIcon size={14} color="#FFFFFF" />
                <span>Celebrate Streak</span>
              </button>
            )}
          </div>

          <div className="streak-hero-flame-wrapper">
            {/* Lottie Animated Fire from Streak Assets */}
            <StreakFlame size={125} />
          </div>
        </div>

        {/* Insight Pill Banner */}
        <div className="streak-insight-pill" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
          <span className="streak-insight-icon" style={{ display: 'flex', alignItems: 'center' }}>
            <LightningIcon size={16} color="#FF7A00" />
          </span>
          <span className="streak-insight-text">
            You earned more XP yesterday than your average!
          </span>
        </div>
      </div>

      {/* Streak Page Body Sections */}
      <div className="streak-page-content">
        {/* Streak Calendar Section */}
        <div className="streak-section-card">
          <div className="streak-section-header">
            <h3>Streak Calendar</h3>
          </div>
          <div className="calendar-month-selector">
            <button className="cal-nav-btn">‹</button>
            <span className="cal-month-title">{currentMonthName} {currentYear}</span>
            <button className="cal-nav-btn">›</button>
          </div>

          <div className="streak-calendar-grid">
            {weekdays.map((w, idx) => (
              <span key={idx} className="cal-day-label">{w}</span>
            ))}

            {/* Empty offset days */}
            {Array.from({ length: firstDayOfMonth }).map((_, idx) => (
              <div key={`empty-${idx}`} className="cal-cell empty-cell"></div>
            ))}

            {/* Month Day Cells */}
            {Array.from({ length: daysInMonth }).map((_, idx) => {
              const day = idx + 1;
              const isStreak = streakDays.includes(day);
              const isToday = day === todayDay;

              return (
                <div
                  key={day}
                  className={`cal-cell ${isStreak ? 'streak-pill-day' : ''} ${isToday ? 'today-cell' : ''}`}
                >
                  {day}
                </div>
              );
            })}
          </div>
        </div>

        {/* Streak Goal Timeline Section */}
        <div className="streak-section-card">
          <div className="streak-section-header">
            <h3>Streak Goal</h3>
          </div>

          <div className="streak-goal-timeline">
            <div className="timeline-track">
              <div className="timeline-fill" style={{ width: `${Math.min(100, (userState.streak / 30) * 100)}%` }}></div>
            </div>

            <div className="timeline-nodes">
              <div className="timeline-node active-node">
                <span className="node-icon" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <CheckIcon size={13} color="#FFFFFF" />
                </span>
                <span className="node-label">{userState.streak}</span>
              </div>
              <div className={`timeline-node ${userState.streak >= 7 ? 'active-node' : 'milestone-node'}`}>
                <span className="node-icon">7</span>
                <span className="node-label">7</span>
              </div>
              <div className={`timeline-node ${userState.streak >= 14 ? 'active-node' : 'milestone-node'}`}>
                <span className="node-icon">14</span>
                <span className="node-label">14</span>
              </div>
              <div className={`timeline-node ${userState.streak >= 30 ? 'active-node' : 'milestone-node'}`}>
                <span className="node-icon">30</span>
                <span className="node-label">30</span>
              </div>
            </div>
          </div>

          <div className="streak-goal-footer">
            <span>{userState.streak} / 30 DAYS</span>
          </div>
        </div>

        {/* Streak Society Section */}
        <div className="streak-section-card streak-society-card">
          <div className="society-header-row">
            <div className="society-title-wrap">
              <CrownStarIcon size={24} color="#F59E0B" />
              <h3>Streak Society</h3>
            </div>
            <span className={`society-vip-tag ${userState.streak >= 7 ? 'active' : 'locked'}`}>
              {userState.streak >= 7 ? '👑 VIP Member' : `${userState.streak} / 7 Days`}
            </span>
          </div>

          <div className="society-progress-wrap">
            <div className="society-progress-track">
              <div
                className="society-progress-fill"
                style={{ width: `${Math.min(100, Math.round(((userState.streak || 0) / 7) * 100))}%` }}
              />
            </div>
          </div>

          <p className="society-desc">
            {userState.streak >= 7 ? (
              <>
                🎉 You are an official member of the <strong>VIP Quantum Streak Society</strong>! Enjoy exclusive perks & community recognition.
              </>
            ) : (
              <>
                Reach a <strong>7 day streak</strong> to join the VIP Quantum Streak Society! You are only{' '}
                <strong>{Math.max(1, 7 - (userState.streak || 0))} day{7 - (userState.streak || 0) === 1 ? '' : 's'} away</strong>.
              </>
            )}
          </p>

          <div className="society-perks-list">
            <div className="society-perk-item">
              <span>🛡️</span>
              <span>1 Free Streak Freeze Protection</span>
            </div>
            <div className="society-perk-item">
              <span>👑</span>
              <span>VIP Golden Society Badge on Leaderboard</span>
            </div>
            <div className="society-perk-item">
              <span>⚡</span>
              <span>Double Weekend XP Boost</span>
            </div>
          </div>

          <button
            className="society-share-btn"
            onClick={() => {
              if (onPlaySound) onPlaySound('click');
              if (navigator.share) {
                navigator.share({
                  title: 'QubitQuest Streak',
                  text: `I have a ${userState.streak} day quantum streak on QubitQuest! Can you beat me?`
                }).catch(() => {});
              } else {
                if (onShowToast) {
                  onShowToast({
                    type: 'success',
                    title: 'Streak Link Copied!',
                    message: `Share your ${userState.streak}-day streak on social media!`
                  });
                }
              }
            }}
          >
            <ShareIcon size={16} color="currentColor" />
            <span>Share Streak with Friends</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default StreakScreen;
