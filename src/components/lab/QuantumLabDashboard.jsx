import React from 'react';
import LabCard from './LabCard';
import { BASIC_QUANTUM_LABS } from '../../data/quantumLabsData';
import { PersonCheckingLaboratory } from '../PersonCheckingLaboratory';
import { AnimateIcon } from '../AnimateIcon';

export const QuantumLabDashboard = ({
  labProgress,
  onStartLab,
  onOpenFreeformSimulator,
  onResetProgress,
  onPlaySound = () => {}
}) => {
  const completedCount = labProgress.completedLabIds.length;
  const totalLabs = BASIC_QUANTUM_LABS.length;
  const progressPercent = Math.round((completedCount / totalLabs) * 100);

  return (
    <div className="quantum-lab-dashboard">
      {/* Hero Header */}
      <div className="lab-dashboard-hero">
        <div className="hero-icon-title">
          <AnimateIcon animateOnClick>
            <PersonCheckingLaboratory size={36} color="currentColor" />
          </AnimateIcon>
          <div>
            <h1 className="lab-main-heading">Quantum Lab</h1>
            <p className="lab-sub-heading">Learn by Doing · Predict → Build → Run → Understand</p>
          </div>
        </div>

        {/* Gamified Summary Stats */}
        <div className="lab-gamified-stats-bar">
          <div className="stat-badge qxp-stat">
            <span className="stat-icon">⚡</span>
            <div className="stat-text">
              <span className="stat-val">{labProgress.earnedQXP || 0} QXP</span>
              <span className="stat-lbl">Quantum XP</span>
            </div>
          </div>

          <div className="stat-badge streak-stat">
            <span className="stat-icon">🔥</span>
            <div className="stat-text">
              <span className="stat-val">{labProgress.labStreak || 3} Days</span>
              <span className="stat-lbl">Quantum Streak</span>
            </div>
          </div>

          <div className="stat-badge badges-stat">
            <span className="stat-icon">🏅</span>
            <div className="stat-text">
              <span className="stat-val">{labProgress.unlockedBadges ? labProgress.unlockedBadges.length : 0} Badges</span>
              <span className="stat-lbl">Achievements</span>
            </div>
          </div>
        </div>

        {/* Overall Lab Progress Bar */}
        <div className="lab-overall-progress-card">
          <div className="progress-info-row">
            <span className="progress-title">Your Basic Lab Progression</span>
            <span className="progress-fraction">
              <strong>{completedCount}</strong> / {totalLabs} Labs ({progressPercent}%)
            </span>
          </div>
          <div className="lab-progress-track">
            <div
              className="lab-progress-fill"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Mode Switcher Banner */}
      <div className="lab-mode-switch-row">
        <div className="mode-tab active">
          <span>🧪 5 Progressive Basic Labs</span>
        </div>
        <button
          type="button"
          className="mode-tab-button"
          onClick={() => {
            onPlaySound('click');
            onOpenFreeformSimulator();
          }}
        >
          <span>⚡ Freeform State Simulator →</span>
        </button>
      </div>

      {/* Progressive Lab Cards Grid */}
      <div className="lab-cards-grid">
        {BASIC_QUANTUM_LABS.map((lab, index) => {
          let status = 'locked';
          if (labProgress.completedLabIds.includes(lab.id)) {
            status = 'completed';
          } else if (!lab.prerequisiteLab || labProgress.completedLabIds.includes(lab.prerequisiteLab)) {
            status = 'unlocked';
          }

          return (
            <React.Fragment key={lab.id}>
              <LabCard
                lab={lab}
                status={status}
                onStartLab={onStartLab}
                onPlaySound={onPlaySound}
              />
              {index < BASIC_QUANTUM_LABS.length - 1 && (
                <div className="lab-flow-connector">
                  <div className={`connector-line ${status === 'completed' ? 'active' : ''}`} />
                  <span className="connector-arrow">↓</span>
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Footer Reset & Helper */}
      <div className="lab-dashboard-footer">
        {completedCount > 0 && (
          <button
            type="button"
            className="btn-text reset-lab-progress-btn"
            onClick={() => {
              if (window.confirm('Reset your Quantum Lab progression to start fresh from Lab 01?')) {
                onPlaySound('click');
                onResetProgress();
              }
            }}
          >
            ↺ Reset Lab Progress to Lab 01
          </button>
        )}
      </div>
    </div>
  );
};

export default QuantumLabDashboard;
