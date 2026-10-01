import React, { useEffect } from 'react';

export const LabCompletionModal = ({
  lab,
  onContinue,
  onBackToDashboard,
  onPlaySound = () => {},
  streak = 3
}) => {
  useEffect(() => {
    onPlaySound('correct');
  }, []);

  return (
    <div className="lab-modal-overlay">
      <div className="lab-modal-card">
        {/* Animated Celebration Burst */}
        <div className="celebration-burst">
          <span className="burst-emoji">🎉</span>
        </div>

        <h2 className="modal-title">LAB COMPLETE!</h2>
        <h4 className="modal-subtitle">{lab.title}</h4>

        {/* QXP Reward Pill */}
        <div className="xp-reward-box">
          <span className="xp-icon">⚡</span>
          <span className="xp-amount">+{lab.xpReward} QXP</span>
          <span className="xp-label">Quantum Experience Earned</span>
        </div>

        {/* Badge Unlocked Card */}
        {lab.badge && (
          <div className="badge-unlocked-card">
            <div className="badge-icon-wrap">
              <span className="badge-icon-symbol">{lab.badge.icon}</span>
            </div>
            <div className="badge-info">
              <span className="badge-award-label">🏅 Badge Unlocked!</span>
              <h4 className="badge-name">{lab.badge.name}</h4>
              <p className="badge-desc">{lab.badge.description}</p>
            </div>
          </div>
        )}

        {/* Concepts Discovered */}
        <div className="concepts-summary-box">
          <span className="summary-title">You Discovered:</span>
          <ul className="concepts-list">
            {lab.conceptsLearned.map((concept, idx) => (
              <li key={idx} className="concept-item">
                <span className="check-icon">✓</span>
                <span>{concept}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Streak Update */}
        <div className="lab-streak-banner">
          <span className="streak-flame">🔥</span>
          <span>Quantum Streak: <strong>{streak} Days Active</strong></span>
        </div>

        {/* Action Buttons */}
        <div className="modal-actions-row">
          <button
            type="button"
            className="learn-more-3d-btn btn-variant-success modal-continue-btn"
            onClick={() => {
              onPlaySound('click');
              onContinue();
            }}
          >
            <span className="btn-3d-text">CONTINUE TO NEXT LAB →</span>
          </button>
          <button
            type="button"
            className="learn-more-3d-btn btn-variant-neutral modal-back-btn"
            onClick={() => {
              onPlaySound('click');
              onBackToDashboard();
            }}
          >
            <span className="btn-3d-text">Lab Dashboard</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LabCompletionModal;
