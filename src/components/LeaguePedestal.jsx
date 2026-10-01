import React from 'react';
import { TransparentBadge } from './TransparentBadge';

export const LeaguePedestal = ({
  league,
  isActive = false,
  isUnlocked = false,
  size = 78,
  onClick
}) => {
  return (
    <div
      className={`league-pedestal-container ${isActive ? 'is-active' : ''} ${isUnlocked ? 'is-unlocked' : 'is-locked'}`}
      onClick={onClick}
      title={`${league.name} (Tier ${league.tier})${isActive ? ' - Current League' : !isUnlocked ? ' - Locked (Finish Top 3 to unlock)' : ''}`}
    >
      {/* Active Indicator Pulse Ring */}
      {isActive && (
        <div className="active-pedestal-beacon" />
      )}

      {/* Floating Badge (Increased Size & Pristine Transparency) */}
      <div className="pedestal-badge-wrapper">
        <TransparentBadge
          src={league.badgeUrl}
          alt={league.name}
          size={size}
          glowColor={league.color}
          isLocked={!isUnlocked}
        />
      </div>

      {/* Duolingo Light Theme 3D Pedestal Stand (Larger Scale) */}
      <div className="pedestal-stand-graphic">
        <svg width="84" height="34" viewBox="0 0 84 34" fill="none">
          {/* Bottom shadow */}
          <ellipse cx="42" cy="30" rx="38" ry="4" fill="#0F172A" opacity="0.08" />

          {/* Pedestal Base */}
          <path
            d="M10 16 C 10 11, 74 11, 74 16 L 68 29 C 68 32, 16 32, 16 29 Z"
            fill={isActive ? '#DDD6FE' : isUnlocked ? '#E2E8F0' : '#F1F5F9'}
          />

          {/* Pedestal Top Rim */}
          <ellipse
            cx="42"
            cy="16"
            rx="32"
            ry="5.5"
            fill={isActive ? '#EDE9FE' : isUnlocked ? '#F8FAFC' : '#E2E8F0'}
            stroke={isActive ? '#8B5CF6' : isUnlocked ? '#CBD5E1' : '#E2E8F0'}
            strokeWidth={isActive ? '2.5' : '1.5'}
          />

          {/* Active League Highlight Rim */}
          {isActive && (
            <path
              d="M16 16 C 24 20.5, 60 20.5, 68 16"
              stroke="#8B5CF6"
              strokeWidth="3"
              strokeLinecap="round"
              filter="drop-shadow(0 0 6px rgba(139, 92, 246, 0.5))"
            />
          )}
        </svg>
      </div>
    </div>
  );
};
