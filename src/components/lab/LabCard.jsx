import React from 'react';

export const LabCard = ({
  lab,
  status, // 'completed' | 'unlocked' | 'locked'
  onStartLab,
  onPlaySound = () => {}
}) => {
  const isCompleted = status === 'completed';
  const isUnlocked = status === 'unlocked';
  const isLocked = status === 'locked';

  const handleClick = () => {
    if (isLocked) {
      onPlaySound('error');
      return;
    }
    onPlaySound('click');
    onStartLab(lab);
  };

  return (
    <div
      className={`lab-card-item lab-status-${status} ${isUnlocked ? 'lab-card-pulse' : ''}`}
      onClick={!isLocked ? handleClick : undefined}
    >
      {/* Top Header Row */}
      <div className="lab-card-top">
        <div className="lab-number-pill">
          <span className="lab-icon">{lab.icon}</span>
          <span className="lab-num-text">{lab.labNumber}</span>
        </div>

        <div className="lab-status-badge">
          {isCompleted && <span className="status-tag completed">✓ Completed</span>}
          {isUnlocked && <span className="status-tag unlocked">🔓 Available</span>}
          {isLocked && <span className="status-tag locked">🔒 Locked</span>}
        </div>
      </div>

      {/* Title & Description */}
      <div className="lab-card-body">
        <h3 className="lab-card-title">{lab.title}</h3>
        <p className="lab-card-desc">{lab.shortDescription}</p>
      </div>

      {/* Meta Tags: Difficulty, Time, QXP */}
      <div className="lab-card-meta">
        <span className="meta-pill difficulty" style={{ borderColor: lab.difficultyColor, color: lab.difficultyColor }}>
          ⭐ {lab.difficulty}
        </span>
        <span className="meta-pill time">⏱ {lab.estimatedTime}</span>
        <span className="meta-pill qxp">⚡ +{lab.xpReward} QXP</span>
      </div>

      {/* Card Action / Footer */}
      <div className="lab-card-footer">
        {isCompleted && (
          <button
            type="button"
            className="btn-secondary btn-3d lab-cta-btn"
            onClick={(e) => {
              e.stopPropagation();
              handleClick();
            }}
          >
            Review Lab ↺
          </button>
        )}

        {isUnlocked && (
          <button
            type="button"
            className="btn-primary btn-3d lab-cta-btn glow-primary"
            onClick={(e) => {
              e.stopPropagation();
              handleClick();
            }}
          >
            Start Lab →
          </button>
        )}

        {isLocked && (
          <div className="locked-helper-text">
            <span>🔒 Complete {lab.prerequisiteLab ? `Lab 0${lab.prerequisiteLab.replace('lab-0', '')}` : 'previous lab'} to unlock</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default LabCard;
