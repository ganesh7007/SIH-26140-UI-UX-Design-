import React, { useEffect } from 'react';
import { GemSparkle } from './GemSparkle';

export const ChestModal = ({ chest, onClose, onClaim, onPlaySound }) => {
  useEffect(() => {
    if (onPlaySound) onPlaySound('chest');
  }, []);

  const handleClaim = () => {
    if (onPlaySound) onPlaySound('click');
    if (onClaim) onClaim(chest);
    if (onClose) onClose();
  };

  return (
    <div className="modal-overlay" style={{ zIndex: 1000 }}>
      <div className="chest-modal-backdrop" onClick={onClose} />
      <div className="chest-modal-dialog">
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '8px' }}>
          Quest Reward Unlocked!
        </h3>
        <div className="chest-reward-card" style={{ margin: '12px 0 16px' }}>
          <span className="reward-loot-icon">
            <GemSparkle size={36} color="#22D3EE" />
          </span>
          <span className="reward-loot-name">
            +{chest?.rewardGems || (chest?.chestType === 'gold' ? 30 : chest?.chestType === 'cyan' ? 20 : 10)} Quantum Gems!
          </span>
        </div>

        <button className="btn-primary btn-3d" onClick={handleClaim} style={{ width: '100%' }}>
          CLAIM & CONTINUE
        </button>
      </div>
    </div>
  );
};

export default ChestModal;
