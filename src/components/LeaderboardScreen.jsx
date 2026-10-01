import React, { useState } from 'react';
import { LEAGUES_DATA, DUOLINGO_SCREENSHOT_USERS } from '../data/leaguesData';
import { DEFAULT_AVATAR_SRC } from '../data/avatars';
import { LeaguePedestal } from './LeaguePedestal';
import { LeaguePromotionModal } from './LeaguePromotionModal';
import { MedalIcon } from './ReiconIcons';

export const LeaderboardScreen = ({
  userState = {},
  onContinue,
  onPlaySound,
  onPromoteLeague,
  onUpdateUserState
}) => {
  // Local state initialized from userState
  const [currentTier, setCurrentTier] = useState(userState.currentLeagueTier || 4);
  const [unlockedTiers, setUnlockedTiers] = useState(userState.unlockedLeagues || [1, 2, 3, 4]);
  const [top3Weeks, setTop3Weeks] = useState(userState.top3Weeks || 3);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [targetUnlockLeague, setTargetUnlockLeague] = useState(null);
  const [selectedLeaguePreview, setSelectedLeaguePreview] = useState(null);

  // Active League Object
  const currentLeague = LEAGUES_DATA.find((l) => l.tier === currentTier) || LEAGUES_DATA[3];

  // Next League to unlock (if any)
  const nextLeague = LEAGUES_DATA.find((l) => l.tier === currentTier + 1);

  // Merge current user's live XP & avatar into screenshot leaderboard
  const users = DUOLINGO_SCREENSHOT_USERS.map((u) => {
    if (u.isUser) {
      const displayName = userState.name || 'Ganesh J';
      return {
        ...u,
        xp: Math.max(u.xp, userState.xp || 798),
        name: displayName,
        avatar: userState.avatar || DEFAULT_AVATAR_SRC
      };
    }
    return u;
  }).sort((a, b) => b.xp - a.xp);

  // Check if current user is in Top 3
  const userRank = users.findIndex((u) => u.isUser) + 1;
  const isInTop3 = userRank <= 3;

  // Trigger Promotion Unlock Modal
  const handleTriggerPromotion = () => {
    if (onPlaySound) onPlaySound('click');
    const toUnlock = nextLeague || currentLeague;
    setTargetUnlockLeague(toUnlock);
    setIsModalOpen(true);
  };

  // Confirm Promotion from Modal
  const handleConfirmPromotion = (newTier) => {
    const nextUnlocked = unlockedTiers.includes(newTier)
      ? unlockedTiers
      : [...unlockedTiers, newTier];
    
    setCurrentTier(newTier);
    setUnlockedTiers(nextUnlocked);
    setTop3Weeks((prev) => prev + 1);
    setIsModalOpen(false);

    if (onPromoteLeague) {
      onPromoteLeague(newTier);
    } else if (onUpdateUserState) {
      onUpdateUserState((prev) => ({
        ...prev,
        currentLeagueTier: newTier,
        unlockedLeagues: nextUnlocked,
        top3Weeks: (prev.top3Weeks || 3) + 1
      }));
    }
  };

  // Reset demo state if user wants to re-test the animation
  const handleResetDemo = () => {
    setCurrentTier(4);
    setUnlockedTiers([1, 2, 3, 4]);
    setTop3Weeks(3);
    if (onPlaySound) onPlaySound('pop');
  };

  return (
    <div className="leaderboard-screen-wrapper duolingo-theme">
      {/* Duolingo League Top Header & 5 Pedestals */}
      <div className="duo-league-header-card">
        {/* Top title & timer row */}
        <div className="duo-league-title-row">
          <div className="duo-league-name-heading">
            <h2>{currentLeague.name}</h2>
          </div>
          <div className="duo-league-timer-pill">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2.2" />
              <path d="M12 7V12L15 15" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
            </svg>
            <span>20 HOURS</span>
          </div>
        </div>

        {/* 5 Badges Pedestal Row */}
        <div className="duo-pedestals-row">
          {LEAGUES_DATA.map((league) => {
            const isActive = league.tier === currentTier;
            const isUnlocked = unlockedTiers.includes(league.tier);
            return (
              <LeaguePedestal
                key={league.id}
                league={league}
                isActive={isActive}
                isUnlocked={isUnlocked}
                onClick={() => {
                  if (onPlaySound) onPlaySound('click');
                  setSelectedLeaguePreview(league);
                }}
              />
            );
          })}
        </div>

        {/* Top 3 Promotion Zone Banner & Action */}
        <div className="duo-promotion-status-box">
          <div className="duo-promo-info">
            <div className="duo-promo-badge">
              <span className="flame-icon">🔥</span>
              <span>{top3Weeks} WEEKS IN TOP 3</span>
            </div>
            <p className="duo-promo-text">
              {isInTop3 ? (
                <>
                  You're in the <strong>Promotion Zone (#{userRank})</strong>!{' '}
                  {nextLeague ? `Finish Top 3 this week to unlock the ${nextLeague.name} badge!` : `You've achieved the highest league!`}
                </>
              ) : (
                <>Reach the Top 3 to qualify for promotion and unlock the next league badge!</>
              )}
            </p>
          </div>

          {/* Action Trigger for Weekly Settlement & Unlock Animation */}
          {nextLeague && (
            <button
              className="duo-unlock-trigger-btn"
              onClick={handleTriggerPromotion}
              title="Click to simulate weekly finish and play the badge unlock animation!"
            >
              <span>⚡ Complete Week &amp; Unlock {nextLeague.shortName}</span>
            </button>
          )}

          {/* If already max tier (tier 5 unlocked) */}
          {!nextLeague && (
            <div className="duo-max-league-badge">
              <span>👑 Pinnacle Master Reached!</span>
              <button className="duo-reset-link" onClick={handleResetDemo}>
                (Reset Demo)
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Selected League Tooltip / Quick Detail (if clicked) */}
      {selectedLeaguePreview && (
        <div className="duo-league-info-modal">
          <div className="duo-info-card">
            <div className="duo-info-header">
              <h3 style={{ color: selectedLeaguePreview.accentColor }}>
                {selectedLeaguePreview.name}
              </h3>
              <button
                className="duo-info-close"
                onClick={() => setSelectedLeaguePreview(null)}
              >
                ✕
              </button>
            </div>
            <p>{selectedLeaguePreview.description}</p>
            <div className="duo-info-meta">
              <span>
                Status:{' '}
                <strong style={{ color: unlockedTiers.includes(selectedLeaguePreview.tier) ? '#4ADE80' : '#94A3B8' }}>
                  {selectedLeaguePreview.tier === currentTier
                    ? 'Current Active League'
                    : unlockedTiers.includes(selectedLeaguePreview.tier)
                    ? 'Unlocked'
                    : 'Locked (Requires Top 3 Finish)'}
                </strong>
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Duolingo Leaderboard Card */}
      <div className="duo-leaderboard-card">
        <div className="duo-entries-list">
          {users.map((user, idx) => {
            const rank = idx + 1;
            let rankBadge = null;

            if (rank <= 3) {
              rankBadge = <MedalIcon rank={rank} size={26} />;
            } else {
              rankBadge = <span className="duo-rank-num">{rank}</span>;
            }

            const isUserRow = user.isUser;

            // Render row
            const rowElement = (
              <div
                key={user.id}
                className={`duo-entry-row ${isUserRow ? 'duo-current-user-row' : ''}`}
              >
                {/* Rank Badge */}
                <div className="duo-badge-col">{rankBadge}</div>

                {/* Avatar with optional country flag */}
                <div className="duo-avatar-col">
                  <img
                    src={user.avatar || DEFAULT_AVATAR_SRC}
                    alt={user.name}
                    width={38}
                    height={38}
                    style={{ objectFit: 'contain' }}
                  />
                  {user.online && <span className="duo-online-dot" />}
                </div>

                {/* Name & Flag */}
                <div className="duo-name-col">
                  <span className="duo-username">{user.name}</span>
                  {user.flag && <span className="duo-user-flag">{user.flag}</span>}
                </div>

                {/* XP */}
                <div className="duo-xp-col">
                  <span>{user.xp} XP</span>
                </div>
              </div>
            );

            // After Rank 8, render the PROMOTION ZONE and DEMOTION ZONE dividers (matching Duolingo screenshot)
            if (rank === 8) {
              return (
                <React.Fragment key={user.id}>
                  {rowElement}
                  <div className="duo-zone-divider promotion-zone">
                    <span className="duo-zone-arrow">▲</span>
                    <span className="duo-zone-label">PROMOTION ZONE</span>
                    <span className="duo-zone-arrow">▲</span>
                  </div>
                  <div className="duo-zone-divider demotion-zone">
                    <span className="duo-zone-arrow">▼</span>
                    <span className="duo-zone-label">DEMOTION ZONE</span>
                    <span className="duo-zone-arrow">▼</span>
                  </div>
                </React.Fragment>
              );
            }

            return rowElement;
          })}
        </div>
      </div>

      {/* Bottom Continue Action */}
      <div className="duo-bottom-action">
        <button
          className="btn-primary btn-3d duo-continue-btn"
          onClick={() => {
            if (onPlaySound) onPlaySound('click');
            onContinue();
          }}
        >
          CONTINUE
        </button>
      </div>

      {/* Duolingo Unlock Animation Celebration Modal */}
      <LeaguePromotionModal
        isOpen={isModalOpen}
        league={targetUnlockLeague}
        top3Weeks={top3Weeks}
        onClose={() => setIsModalOpen(false)}
        onConfirmPromotion={handleConfirmPromotion}
        onPlaySound={onPlaySound}
      />
    </div>
  );
};

export default LeaderboardScreen;
