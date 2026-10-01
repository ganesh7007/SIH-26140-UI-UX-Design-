import React, { useEffect } from 'react';
import {
  FireIcon,
  LightningIcon,
  ShieldIcon,
  CheckIcon
} from './ReiconIcons';

export const StreakCelebrationModal = ({
  streakCount = 7,
  onClose,
  onPlaySound
}) => {
  useEffect(() => {
    if (onPlaySound) onPlaySound('complete');
  }, []);

  // Today & Weekday streak calculations
  const weekdays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const todayIndex = new Date().getDay(); // 0 = Sun, 6 = Sat

  return (
    <div className="modal-overlay streak-modal-overlay" style={{ zIndex: 1000 }}>
      <div className="chest-modal-backdrop" onClick={onClose} />

      <div className="streak-celebration-dialog">
        {/* Static Fire Emblem in place of animated stage */}
        <div style={{ display: 'flex', justifyContent: 'center', margin: '8px 0 16px' }}>
          <div style={{
            width: 72,
            height: 72,
            borderRadius: '50%',
            background: 'rgba(255, 122, 0, 0.16)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '2px solid rgba(255, 122, 0, 0.35)'
          }}>
            <FireIcon size={44} color="#FF7A00" />
          </div>
        </div>

        {/* Streak Hero Count Badge */}
        <div className="streak-badge-pill">
          <span className="streak-badge-fire" style={{ display: 'flex', alignItems: 'center' }}>
            <FireIcon size={18} color="#FF7A00" />
          </span>
          <span className="streak-badge-num">{streakCount}</span>
          <span className="streak-badge-text">DAY STREAK!</span>
        </div>

        {/* Crisp Header Title & Message */}
        <h2 className="streak-celebration-title">Today's Streak Completed!</h2>
        <p className="streak-celebration-sub">
          You've practiced today and kept your quantum streak blazing! Keep going every day to unlock exclusive rewards.
        </p>

        {/* Day-by-Day Mini Weekly Progress Bar */}
        <div className="streak-mini-week-row">
          {weekdays.map((dayName, idx) => {
            const isToday = idx === todayIndex;
            const isCompletedDay = idx <= todayIndex;

            return (
              <div
                key={idx}
                className={`streak-week-day-pill ${
                  isToday ? 'current-today' : isCompletedDay ? 'past-active' : 'future-day'
                }`}
              >
                <span className="week-day-name">{dayName}</span>
                <span className="week-day-dot" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {isToday ? (
                    <FireIcon size={13} color="#FFFFFF" />
                  ) : isCompletedDay ? (
                    <CheckIcon size={12} color="#00CD9C" />
                  ) : (
                    '•'
                  )}
                </span>
              </div>
            );
          })}
        </div>

        {/* Reward Bonus Tag */}
        <div className="streak-bonus-card">
          <div className="streak-bonus-item">
            <span className="bonus-icon" style={{ display: 'flex', alignItems: 'center' }}>
              <LightningIcon size={16} color="#FACC15" />
            </span>
            <span className="bonus-text">Streak Bonus XP</span>
          </div>
          <div className="streak-bonus-item">
            <span className="bonus-icon" style={{ display: 'flex', alignItems: 'center' }}>
              <ShieldIcon size={16} color="#38BDF8" />
            </span>
            <span className="bonus-text">Freeze Active</span>
          </div>
        </div>

        {/* Action Continue Button */}
        <button
          className="btn-primary btn-3d streak-continue-btn"
          onClick={() => {
            if (onPlaySound) onPlaySound('click');
            onClose();
          }}
        >
          CONTINUE
        </button>
      </div>
    </div>
  );
};

export default StreakCelebrationModal;
