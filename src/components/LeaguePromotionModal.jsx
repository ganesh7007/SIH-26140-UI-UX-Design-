import React, { useState, useEffect } from 'react';
import { TransparentBadge } from './TransparentBadge';

export const LeaguePromotionModal = ({
  isOpen,
  league,
  top3Weeks = 3,
  onClose,
  onConfirmPromotion,
  onPlaySound
}) => {
  const [animPhase, setAnimPhase] = useState('locked'); // 'locked' -> 'cracking' -> 'unlocked'

  useEffect(() => {
    if (!isOpen) {
      setAnimPhase('locked');
      return;
    }

    // Sequence the unlock animation
    setAnimPhase('locked');
    const timer1 = setTimeout(() => {
      setAnimPhase('cracking');
      if (onPlaySound) onPlaySound('click');
    }, 900);

    const timer2 = setTimeout(() => {
      setAnimPhase('unlocked');
      if (onPlaySound) onPlaySound('achievement');
    }, 2200);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [isOpen, onPlaySound]);

  if (!isOpen || !league) return null;

  return (
    <div className="league-modal-overlay" onClick={(e) => e.stopPropagation()}>
      <div className="league-modal-backdrop" />

      {/* Confetti Explosion during unlocked phase */}
      {animPhase === 'unlocked' && (
        <div className="league-confetti-container" aria-hidden="true">
          {Array.from({ length: 32 }).map((_, i) => (
            <div
              key={i}
              className={`confetti-particle confetti-p-${i % 8}`}
              style={{
                left: `${(i * 3.1) % 100}%`,
                animationDelay: `${(i * 0.06)}s`,
                backgroundColor: ['#EC4899', '#A855F7', '#38BDF8', '#FBBF24', '#34D399'][i % 5]
              }}
            />
          ))}
        </div>
      )}

      <div className="league-unlock-card">
        {/* Header Tag */}
        <div className="league-unlock-header-badge">
          <span className="league-pulse-dot" />
          <span>WEEKLY SETTLEMENT COMPLETE</span>
        </div>

        {/* Title */}
        <h2 className="league-unlock-title">
          {animPhase === 'unlocked' ? (
            <span className="league-title-gradient">PROMOTED TO {league.name.toUpperCase()}!</span>
          ) : (
            <span>LEAGUE ADVANCEMENT</span>
          )}
        </h2>

        {/* Subtitle / Top 3 Week Counter */}
        <p className="league-unlock-subtitle">
          {animPhase === 'unlocked' ? (
            <>
              ✨ Finished in <strong>Top 3</strong> for <strong>{top3Weeks} consecutive weeks</strong>!
            </>
          ) : (
            <>
              Verifying <strong>Top 3 standings</strong> for Week {top3Weeks}...
            </>
          )}
        </p>

        {/* Central Stage */}
        <div className="league-unlock-stage">
          {/* Radiant Light Beams */}
          {animPhase === 'unlocked' && (
            <div className="unlock-radiant-beams" />
          )}

          {/* Pedestal Stand */}
          <div className="league-modal-pedestal">
            <div className={`league-badge-showcase ${animPhase}`}>
              {animPhase === 'locked' && (
                <div className="locked-shaking-box">
                  <TransparentBadge
                    src={league.badgeUrl}
                    size={135}
                    glowColor={league.color}
                    isLocked={true}
                  />
                </div>
              )}

              {animPhase === 'cracking' && (
                <div className="cracking-shaking-box">
                  <div className="lock-crack-burst">
                    <svg width="56" height="56" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M6.75 8C6.75 5.10051 9.10051 2.75 12 2.75C14.4453 2.75 16.5018 4.42242 17.0846 6.68694C17.1879 7.08808 17.5968 7.32957 17.9979 7.22633C18.3991 7.12308 18.6405 6.7142 18.5373 6.31306C17.788 3.4019 15.1463 1.25 12 1.25C8.27208 1.25 5.25 4.27208 5.25 8V10.0546C4.13525 10.1379 3.40931 10.348 2.87868 10.8787C2 11.7574 2 13.1716 2 16C2 18.8284 2 20.2426 2.87868 21.1213C3.75736 22 5.17157 22 8 22H16C18.8284 22 20.2426 22 21.1213 21.1213C22 20.2426 22 18.8284 22 16C22 13.1716 22 11.7574 21.1213 10.8787C20.2426 10 18.8284 10 16 10H8C7.54849 10 7.13301 10 6.75 10.0036V8Z"
                        fill="#FBBF24"
                      />
                    </svg>
                  </div>
                  <div className="energy-spark-rings" />
                </div>
              )}

              {animPhase === 'unlocked' && (
                <div className="unlocked-burst-box">
                  <TransparentBadge
                    src={league.badgeUrl}
                    size={155}
                    glowColor={league.color}
                    isLocked={false}
                  />
                </div>
              )}
            </div>

            {/* 3D Pedestal Base (Light Theme) */}
            <svg
              className="league-modal-pedestal-svg"
              width="170"
              height="54"
              viewBox="0 0 170 54"
              fill="none"
            >
              <ellipse cx="85" cy="40" rx="76" ry="11" fill="#0F172A" opacity="0.1" />
              <path
                d="M22 24 C 22 18, 148 18, 148 24 L 142 42 C 142 48, 28 48, 28 42 Z"
                fill="#EDE9FE"
              />
              <ellipse
                cx="85"
                cy="24"
                rx="60"
                ry="10"
                fill="#F5F3FF"
                stroke={animPhase === 'unlocked' ? '#8B5CF6' : '#CBD5E1'}
                strokeWidth="2.5"
              />
              {animPhase === 'unlocked' && (
                <ellipse
                  cx="85"
                  cy="24"
                  rx="58"
                  ry="8.5"
                  fill="none"
                  stroke={league.accentColor}
                  strokeWidth="2.5"
                  className="pedestal-halo-pulse"
                />
              )}
            </svg>
          </div>
        </div>

        {/* League Info Box */}
        <div className="league-unlock-meta">
          <div className="league-meta-row">
            <span className="league-meta-label">LEAGUE TIER</span>
            <span className="league-meta-value" style={{ color: league.accentColor }}>
              Tier {league.tier} of 5
            </span>
          </div>
          <div className="league-meta-row">
            <span className="league-meta-label">STATUS</span>
            <span className="league-meta-value green">
              {animPhase === 'unlocked' ? 'UNLOCKED & ACTIVE' : 'PROMOTING...'}
            </span>
          </div>
          <p className="league-tier-desc">{league.description}</p>
        </div>

        {/* Action Button */}
        <div className="league-modal-actions">
          {animPhase === 'unlocked' ? (
            <button
              className="btn-primary btn-3d league-confirm-btn"
              onClick={() => {
                if (onPlaySound) onPlaySound('click');
                onConfirmPromotion(league.tier);
              }}
            >
              CLAIM &amp; ENTER LEAGUE
            </button>
          ) : (
            <button className="btn-secondary league-waiting-btn" disabled>
              Unlocking Badge...
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
