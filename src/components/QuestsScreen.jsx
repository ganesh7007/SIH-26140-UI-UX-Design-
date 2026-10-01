import React, { useState } from 'react';
import { MascotQubi } from './MascotQubi';
import { GemSparkle } from './GemSparkle';
import { Gift4 } from './Gift4';
import {
  TimerIcon,
  ArchiveBoxIcon,
  GiftIcon,
  CrownIcon,
  ShieldIcon,
  LightningIcon,
  QuestChestIcon,
  CheckIcon
} from './ReiconIcons';
import { INITIAL_USER_STATE } from '../data/mockData';

export const QuestsScreen = ({
  userState = {},
  onClaimChest,
  onClaimBonusChest,
  onPlaySound,
  onShowToast
}) => {
  const [selectedBonusChest, setSelectedBonusChest] = useState(null);
  const [showAugustQuestModal, setShowAugustQuestModal] = useState(false);

  // Safe defaults if userState is partially loaded from older localStorage
  const monthlyPoints = Number(userState?.monthlyPoints ?? 8);
  const monthlyPointsTarget = Number(userState?.monthlyPointsTarget ?? 20);
  const progressPercent = Math.min(100, Math.max(0, Math.round((monthlyPoints / Math.max(1, monthlyPointsTarget)) * 100)));

  const dailyQuests = Array.isArray(userState?.dailyQuests) && userState.dailyQuests.length > 0
    ? userState.dailyQuests
    : INITIAL_USER_STATE.dailyQuests;

  const bonusChests = Array.isArray(userState?.bonusChests) && userState.bonusChests.length > 0
    ? userState.bonusChests
    : INITIAL_USER_STATE.bonusChests;

  const handleQuestChestClick = (quest, isCompleted) => {
    if (isCompleted && !quest.claimed) {
      if (onPlaySound) onPlaySound('chest');
      if (onClaimChest) onClaimChest(quest);
    } else if (quest.claimed) {
      if (onPlaySound) onPlaySound('click');
    } else {
      if (onPlaySound) onPlaySound('click');
      if (onShowToast) {
        onShowToast({
          type: 'info',
          title: 'Quest Incomplete',
          message: `Complete "${quest.title}" to open this reward chest!`
        });
      }
    }
  };

  const handleOpenBonusChest = (bChest) => {
    if (onPlaySound) onPlaySound('chest');
    setSelectedBonusChest(bChest);
  };

  const handleClaimBonusReward = () => {
    if (onPlaySound) onPlaySound('click');
    if (onClaimBonusChest && selectedBonusChest) {
      onClaimBonusChest(selectedBonusChest);
    }
    setSelectedBonusChest(null);
  };

  const handleOpenAugustQuestModal = () => {
    if (onPlaySound) onPlaySound('click');
    setShowAugustQuestModal(true);
  };

  const getBonusChestIcon = (iconKey, color, id) => {
    if (iconKey === 'archive-box' || id === 'bc1') return <ArchiveBoxIcon size={28} color={color || '#A78BFA'} />;
    if (iconKey === 'gift' || id === 'bc2') return <GiftIcon size={28} color={color || '#F43F5E'} />;
    if (iconKey === 'crown' || id === 'bc3') return <CrownIcon size={28} color={color || '#FBBF24'} />;
    return <GiftIcon size={28} color={color || '#F43F5E'} />;
  };

  const getRewardIcon = (rewardType, id) => {
    if (rewardType === 'gems' || id === 'bc1') return <GemSparkle size={18} color="#22D3EE" />;
    if (rewardType === 'freeze' || id === 'bc2') return <ShieldIcon size={18} color="#38BDF8" />;
    if (rewardType === 'xp' || id === 'bc3') return <LightningIcon size={18} color="#FACC15" />;
    return <GemSparkle size={18} color="#22D3EE" />;
  };

  return (
    <div className="quests-screen-wrapper">
      {/* Monthly Quest Hero Banner - Clickable with hover & active states */}
      <div
        className="monthly-quest-hero"
        onClick={handleOpenAugustQuestModal}
        style={{ cursor: 'pointer' }}
        title="Click to view August Quest details!"
      >
        <div className="monthly-hero-info">
          <div className="monthly-title-row">
            <h2 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Gift4 size={24} color="#FFFFFF" /> August Quest
            </h2>
            <span
              className="monthly-timer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}
            >
              <TimerIcon size={14} color="var(--primary)" /> 7 DAYS
            </span>
          </div>

          <div className="monthly-points-card">
            <div className="monthly-points-header">
              <span>Earn 20 Quest Points</span>
            </div>
            <div className="monthly-bar-track">
              <div
                className="monthly-bar-fill"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
            <span className="monthly-points-count">
              {monthlyPoints} / {monthlyPointsTarget}
            </span>
          </div>
        </div>

        {/* Mascot in Header */}
        <div className="monthly-mascot-pic">
          <MascotQubi variant="rabbit" size={88} />
        </div>
      </div>

      {/* Daily Quests List */}
      <div className="daily-quests-section">
        <h3 className="section-title">Daily Quests</h3>

        <div className="quests-list">
          {dailyQuests.map((quest) => {
            const currentVal = Number(quest.current || 0);
            const targetVal = Number(quest.target || 1);
            const isCompleted = currentVal >= targetVal;
            const pct = Math.min(100, Math.max(0, Math.round((currentVal / targetVal) * 100)));

            return (
              <div
                key={quest.id}
                className={`quest-row-card ${isCompleted && !quest.claimed ? 'claimable-card' : ''}`}
              >
                <div className="quest-info-block">
                  <div className="quest-info-title">{quest.title}</div>
                  <div className="quest-progress-track">
                    <div
                      className="quest-progress-bar-fill"
                      style={{
                        width: `${pct}%`,
                        background:
                          quest.chestType === 'gold'
                            ? '#FFC83D'
                            : quest.chestType === 'cyan'
                            ? '#22D3EE'
                            : '#5BEA55'
                      }}
                    ></div>
                  </div>
                  <div className="quest-counter-text">
                    {currentVal} / {targetVal}
                  </div>
                </div>

                <button
                  className={`quest-chest-btn ${isCompleted && !quest.claimed ? 'claimable-chest' : ''}`}
                  onClick={() => handleQuestChestClick(quest, isCompleted)}
                  title={quest.claimed ? 'Claimed!' : isCompleted ? 'Claim Reward!' : 'Locked'}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '8px'
                  }}
                >
                  <QuestChestIcon
                    chestType={quest.chestType}
                    size={22}
                    claimed={quest.claimed}
                  />
                </button>
              </div>
            );
          })}
        </div>

        {/* Bonus Daily Mystery Chests Section */}
        <div className="bonus-chests-section">
          <h3>BONUS CHESTS</h3>
          <div className="chests-row">
            {bonusChests.map((bChest) => (
              <div
                key={bChest.id}
                className="bonus-chest-tile"
                onClick={() => handleOpenBonusChest(bChest)}
                style={{
                  cursor: 'pointer',
                  position: 'relative',
                  opacity: bChest.claimed ? 0.75 : 1
                }}
              >
                {bChest.claimed && (
                  <span
                    style={{
                      position: 'absolute',
                      top: '6px',
                      right: '6px',
                      width: '16px',
                      height: '16px',
                      borderRadius: '50%',
                      background: '#00CD9C',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 2px 5px rgba(0,0,0,0.3)',
                      zIndex: 3
                    }}
                  >
                    <CheckIcon size={10} color="#FFFFFF" />
                  </span>
                )}
                <div
                  className="bonus-chest-icon"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '4px'
                  }}
                >
                  {getBonusChestIcon(bChest.iconKey, bChest.color, bChest.id)}
                </div>
                <div className="bonus-chest-title">{bChest.title}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* August Quest Details Modal */}
      {showAugustQuestModal && (
        <div className="modal-overlay" style={{ zIndex: 1000 }}>
          <div
            className="chest-modal-backdrop"
            onClick={() => setShowAugustQuestModal(false)}
          />
          <div
            className="bonus-chest-dialog"
            style={{
              position: 'relative',
              zIndex: 1001,
              width: '90%',
              maxWidth: '350px',
              background: 'var(--bg-card)',
              border: '2px solid #3B82F6',
              borderRadius: '24px',
              padding: '24px 20px',
              textAlign: 'center',
              boxShadow: '0 16px 36px rgba(59, 130, 246, 0.25)'
            }}
          >
            <div
              style={{
                width: '74px',
                height: '74px',
                margin: '0 auto 12px',
                borderRadius: '50%',
                background: 'rgba(59, 130, 246, 0.15)',
                border: '2px solid #3B82F6',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 16px rgba(59, 130, 246, 0.3)'
              }}
            >
              <Gift4 size={38} color="#3B82F6" />
            </div>

            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.25rem',
                fontWeight: 800,
                color: 'var(--text-primary)',
                marginBottom: '6px'
              }}
            >
              August Quest Challenge
            </h3>

            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '14px', lineHeight: 1.4 }}>
              Earn <strong>20 Quest Points</strong> this month to claim the Exclusive August Quantum Badge & 100 Gems!
            </p>

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '10px 14px',
                borderRadius: '14px',
                background: 'rgba(0, 205, 156, 0.1)',
                border: '1px solid rgba(0, 205, 156, 0.25)',
                marginBottom: '18px',
                fontSize: '0.9rem',
                fontWeight: 700
              }}
            >
              <span>Current Progress:</span>
              <span style={{ color: '#00CD9C' }}>{monthlyPoints} / {monthlyPointsTarget} Pts</span>
            </div>

            <button
              className="btn-primary btn-3d"
              onClick={() => {
                if (onPlaySound) onPlaySound('click');
                setShowAugustQuestModal(false);
              }}
              style={{ width: '100%' }}
            >
              GOT IT!
            </button>
          </div>
        </div>
      )}

      {/* Bonus Chest Unlocked Modal */}
      {selectedBonusChest && (
        <div className="modal-overlay" style={{ zIndex: 1000 }}>
          <div
            className="chest-modal-backdrop"
            onClick={() => setSelectedBonusChest(null)}
          />
          <div
            className="bonus-chest-dialog"
            style={{
              position: 'relative',
              zIndex: 1001,
              width: '90%',
              maxWidth: '340px',
              background: 'var(--bg-card)',
              border: `2px solid ${selectedBonusChest.color || 'var(--primary)'}`,
              borderRadius: '24px',
              padding: '24px 20px',
              textAlign: 'center',
              boxShadow: `0 16px 36px ${selectedBonusChest.color || '#00CD9C'}33`
            }}
          >
            <div
              style={{
                width: '70px',
                height: '70px',
                margin: '0 auto 12px',
                borderRadius: '50%',
                background: `${selectedBonusChest.color || '#00CD9C'}22`,
                border: `2px solid ${selectedBonusChest.color || '#00CD9C'}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: `0 0 16px ${selectedBonusChest.color || '#00CD9C'}44`
              }}
            >
              {getBonusChestIcon(selectedBonusChest.iconKey, selectedBonusChest.color, selectedBonusChest.id)}
            </div>

            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.2rem',
                fontWeight: 800,
                color: 'var(--text-primary)',
                marginBottom: '8px'
              }}
            >
              {selectedBonusChest.title}
            </h3>

            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 18px',
                borderRadius: '16px',
                background: selectedBonusChest.claimed ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 205, 156, 0.12)',
                border: selectedBonusChest.claimed ? '1px solid var(--border-color)' : '1px solid rgba(0, 205, 156, 0.3)',
                margin: '12px 0 20px',
                fontWeight: 800,
                fontSize: '1rem',
                color: selectedBonusChest.claimed ? 'var(--text-muted)' : 'var(--text-primary)'
              }}
            >
              {selectedBonusChest.claimed ? (
                <>
                  <CheckIcon size={16} color="#00CD9C" />
                  <span>CLAIMED TODAY</span>
                </>
              ) : (
                <>
                  {getRewardIcon(selectedBonusChest.rewardType, selectedBonusChest.id)}
                  <span>{selectedBonusChest.reward || '+20 Gems'}</span>
                </>
              )}
            </div>

            {selectedBonusChest.claimed ? (
              <button
                className="btn-secondary btn-3d"
                onClick={() => {
                  if (onPlaySound) onPlaySound('click');
                  setSelectedBonusChest(null);
                }}
                style={{ width: '100%' }}
              >
                CLOSE
              </button>
            ) : (
              <button
                className="btn-primary btn-3d"
                onClick={handleClaimBonusReward}
                style={{ width: '100%' }}
              >
                COLLECT REWARD
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestsScreen;
