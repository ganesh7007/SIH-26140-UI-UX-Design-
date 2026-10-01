import React, { useState } from 'react';
import { ACHIEVEMENTS_LIST } from '../data/mockData';
import { AVATAR_CHARACTERS } from '../data/avatars';
import { GemSparkle } from './GemSparkle';
import { SettingsIcon } from './SettingsIcon';
import GlassSurface from './GlassSurface';
import {
  FireIcon,
  LightningIcon,
  BookOpenIcon,
  TrophyIcon,
  TargetIcon,
  EditIcon,
  AchievementIcon,
  LockIcon,
  CloseIcon,
  CheckIcon
} from './ReiconIcons';

export const ProfileScreen = ({
  userState,
  onUpdateProfile,
  onOpenAvatarCustomizer,
  onOpenSettings,
  onClaimReward,
  onPlaySound
}) => {
  const [selectedAchievement, setSelectedAchievement] = useState(null);
  const [isEditingName, setIsEditingName] = useState(false);
  const [nameInput, setNameInput] = useState(userState.name || 'Ganesh J');
  const [usernameInput, setUsernameInput] = useState(userState.username || 'qubit_master');
  const [titleInput, setTitleInput] = useState(userState.title || 'QubitMaster');

  const unlockedCount = userState.unlockedAchievements ? userState.unlockedAchievements.length : 3;
  const currentAvatarSrc = userState.avatar || AVATAR_CHARACTERS[0].src;
  const isImageAvatar = typeof currentAvatarSrc === 'string' && (currentAvatarSrc.startsWith('http') || currentAvatarSrc.startsWith('data:') || currentAvatarSrc.startsWith('/'));
  const currentAvatarObj = AVATAR_CHARACTERS.find((a) => a.src === currentAvatarSrc) || AVATAR_CHARACTERS[0];

  const handleOpenEditModal = () => {
    onPlaySound('click');
    setNameInput(userState.name || 'Ganesh J');
    setUsernameInput(userState.username || 'qubit_master');
    setTitleInput(userState.title || 'QubitMaster');
    setIsEditingName(true);
  };

  const handleSaveProfile = (e) => {
    e?.preventDefault();
    const trimmedName = nameInput.trim() || 'Ganesh J';
    const trimmedUsername = usernameInput.trim().replace(/^@/, '') || 'qubit_master';
    const trimmedTitle = titleInput.trim() || 'QubitMaster';

    if (onUpdateProfile) {
      onUpdateProfile({
        name: trimmedName,
        username: trimmedUsername,
        title: trimmedTitle
      });
    }

    onPlaySound('complete');
    setIsEditingName(false);
  };

  const handleClaimAchievement = (ach) => {
    onPlaySound('chest');
    if (onClaimReward) {
      onClaimReward(ach);
    }
    setSelectedAchievement(null);
  };

  const currentDisplayName = userState.name || 'Ganesh J';
  const currentTitle = userState.title || 'QubitMaster';
  const currentUsername = userState.username || 'qubit_master';

  return (
    <div className="profile-screen-wrapper">
      {/* Profile Hero Card */}
      <div className="profile-hero-card">
        <div
          className="profile-avatar-wrapper"
          style={{
            display: 'flex',
            justifyContent: 'center',
            position: 'relative',
            width: '100px',
            height: '100px',
            margin: '0 auto 12px'
          }}
        >
          <GlassSurface
            width={100}
            height={100}
            borderRadius={50}
            brightness={60}
            opacity={0.95}
            blur={14}
            saturation={2}
            distortionScale={-180}
            style={{
              border: '2px solid rgba(0, 205, 156, 0.5)',
              boxShadow: '0 8px 24px rgba(0, 205, 156, 0.25)'
            }}
          >
            {isImageAvatar ? (
              <img
                src={currentAvatarSrc}
                alt={currentAvatarObj.alt}
                width={65}
                height={65}
                style={{
                  display: 'block',
                  objectFit: 'contain',
                  filter: 'drop-shadow(0 3px 6px rgba(0,0,0,0.3))'
                }}
              />
            ) : (
              <span style={{ fontSize: '2.5rem' }}>{currentAvatarSrc}</span>
            )}
          </GlassSurface>

          <button
            className="avatar-edit-badge"
            onClick={() => {
              onPlaySound('click');
              onOpenAvatarCustomizer();
            }}
            title="Edit Avatar"
            style={{
              zIndex: 10,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '6px'
            }}
          >
            <EditIcon size={14} color="#FFFFFF" />
          </button>
        </div>

        {/* Display Name with Quick Edit Option */}
        <div
          className="profile-name-row"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            marginBottom: '2px'
          }}
        >
          <h2 className="profile-display-name">
            {currentDisplayName} <span style={{ color: 'var(--cyan)', fontWeight: 600 }}>({currentTitle})</span>
          </h2>
          <button
            className="profile-edit-name-btn"
            onClick={handleOpenEditModal}
            title="Edit Name & Handle"
            style={{
              background: 'rgba(0, 205, 156, 0.12)',
              border: '1px solid rgba(0, 205, 156, 0.3)',
              borderRadius: '8px',
              padding: '4px 7px',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: 'var(--primary)',
              transition: 'all 0.2s ease'
            }}
          >
            <EditIcon size={13} color="currentColor" />
          </button>
        </div>

        <span className="profile-handle">@{currentUsername} · Joined August 2026</span>

        <div className="profile-league-badge" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
          <GemSparkle size={14} color="var(--cyan)" />
          <span>Diamond League · Rank #2</span>
        </div>
      </div>

      {/* Stats Grid - Using Reicon MCP Vector Icons */}
      <h3 className="section-title">Statistics</h3>
      <div className="profile-stats-grid">
        <div className="pstat-card stat-card-streak">
          <span className="pstat-icon stat-icon-fire">
            <FireIcon size={22} color="#FF7A00" />
          </span>
          <span className="pstat-val">{userState.streak}</span>
          <span className="pstat-lbl">Day Streak</span>
        </div>

        <div className="pstat-card stat-card-xp">
          <span className="pstat-icon stat-icon-xp">
            <LightningIcon size={22} color="#EAB308" />
          </span>
          <span className="pstat-val">{userState.xp}</span>
          <span className="pstat-lbl">Total XP</span>
        </div>

        <div className="pstat-card stat-card-gems">
          <span className="pstat-icon stat-icon-gems">
            <GemSparkle size={20} color="#22D3EE" />
          </span>
          <span className="pstat-val">{userState.gems}</span>
          <span className="pstat-lbl">Quantum Gems</span>
        </div>

        <div className="pstat-card stat-card-lessons">
          <span className="pstat-icon stat-icon-lessons">
            <BookOpenIcon size={22} color="#10B981" />
          </span>
          <span className="pstat-val">{userState.completedLessons ? userState.completedLessons.length : 3}</span>
          <span className="pstat-lbl">Lessons Done</span>
        </div>

        <div className="pstat-card stat-card-units">
          <span className="pstat-icon stat-icon-units">
            <TrophyIcon size={22} color="#F59E0B" />
          </span>
          <span className="pstat-val">{userState.completedUnits ? userState.completedUnits.length : 0}</span>
          <span className="pstat-lbl">Units Mastered</span>
        </div>

        <div className="pstat-card stat-card-accuracy">
          <span className="pstat-icon stat-icon-accuracy">
            <TargetIcon size={22} color="#A855F7" />
          </span>
          <span className="pstat-val">96%</span>
          <span className="pstat-lbl">Accuracy</span>
        </div>
      </div>

      {/* Achievements Section - Using Reicon MCP Icons */}
      <div className="profile-achievements-box">
        <div className="ach-header-row">
          <h3 className="section-title">Achievements</h3>
          <span className="ach-count">
            {unlockedCount} / {ACHIEVEMENTS_LIST.length}
          </span>
        </div>

        <div className="achievements-grid">
          {ACHIEVEMENTS_LIST.map((ach) => {
            const isUnlocked = userState.unlockedAchievements && userState.unlockedAchievements.includes(ach.id);
            const isClaimed = userState.claimedAchievements && userState.claimedAchievements.includes(ach.id);

            return (
              <div
                key={ach.id}
                className={`ach-badge-slot ${isUnlocked ? 'unlocked-slot' : 'locked-slot'}`}
                onClick={() => {
                  onPlaySound('click');
                  setSelectedAchievement({ ...ach, isUnlocked, isClaimed });
                }}
                title={`${ach.name}: ${ach.desc} (${isClaimed ? 'Claimed' : isUnlocked ? 'Reward Available!' : 'Locked'})`}
                style={{ position: 'relative' }}
              >
                <AchievementIcon
                  iconKey={ach.iconKey}
                  color={ach.color}
                  isUnlocked={isUnlocked}
                  size={26}
                />
                {isClaimed && (
                  <span
                    style={{
                      position: 'absolute',
                      top: '-3px',
                      right: '-3px',
                      width: '14px',
                      height: '14px',
                      borderRadius: '50%',
                      background: '#00CD9C',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 2px 5px rgba(0,0,0,0.4)'
                    }}
                  >
                    <CheckIcon size={9} color="#FFFFFF" />
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom spacer for mobile navigation bar clearance */}
      <div className="profile-mobile-spacer" style={{ height: '48px', width: '100%', flexShrink: 0 }} />

      {/* Profile Name Edit Popup Modal */}
      {isEditingName && (
        <div className="modal-overlay">
          <div
            className="chest-modal-backdrop"
            onClick={() => setIsEditingName(false)}
          />
          <div className="profile-edit-dialog">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.25rem',
                  fontWeight: 800,
                  color: 'var(--text-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  margin: 0
                }}
              >
                <EditIcon size={20} color="var(--primary)" /> Edit Profile
              </h3>
              <button
                onClick={() => setIsEditingName(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-muted)',
                  cursor: 'pointer',
                  padding: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                aria-label="Close"
              >
                <CloseIcon size={18} color="currentColor" />
              </button>
            </div>

            <form onSubmit={handleSaveProfile} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label
                  style={{
                    display: 'block',
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    color: 'var(--text-muted)',
                    marginBottom: '6px',
                    textAlign: 'left'
                  }}
                >
                  DISPLAY NAME
                </label>
                <input
                  type="text"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  placeholder="Your Name"
                  maxLength={30}
                  autoFocus
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '12px',
                    border: '1.5px solid var(--border-color)',
                    background: 'var(--bg-input)',
                    color: 'var(--text-primary)',
                    fontFamily: 'inherit',
                    fontSize: '0.95rem',
                    fontWeight: 600,
                    outline: 'none',
                    boxSizing: 'border-box',
                    transition: 'border-color 0.2s'
                  }}
                />
              </div>

              <div>
                <label
                  style={{
                    display: 'block',
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    color: 'var(--text-muted)',
                    marginBottom: '6px',
                    textAlign: 'left'
                  }}
                >
                  USERNAME / HANDLE
                </label>
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                  <span
                    style={{
                      position: 'absolute',
                      left: '12px',
                      color: 'var(--text-muted)',
                      fontWeight: 700,
                      fontSize: '0.9rem'
                    }}
                  >
                    @
                  </span>
                  <input
                    type="text"
                    value={usernameInput}
                    onChange={(e) => setUsernameInput(e.target.value.toLowerCase().replace(/\s+/g, '_'))}
                    placeholder="username"
                    maxLength={25}
                    style={{
                      width: '100%',
                      padding: '10px 14px 10px 28px',
                      borderRadius: '12px',
                      border: '1.5px solid var(--border-color)',
                      background: 'var(--bg-input)',
                      color: 'var(--text-primary)',
                      fontFamily: 'inherit',
                      fontSize: '0.95rem',
                      fontWeight: 600,
                      outline: 'none',
                      boxSizing: 'border-box',
                      transition: 'border-color 0.2s'
                    }}
                  />
                </div>
              </div>

              <div>
                <label
                  style={{
                    display: 'block',
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    color: 'var(--text-muted)',
                    marginBottom: '6px',
                    textAlign: 'left'
                  }}
                >
                  QUANTUM TITLE
                </label>
                <input
                  type="text"
                  value={titleInput}
                  onChange={(e) => setTitleInput(e.target.value)}
                  placeholder="e.g. QubitMaster, Quantum Explorer"
                  maxLength={25}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '12px',
                    border: '1.5px solid var(--border-color)',
                    background: 'var(--bg-input)',
                    color: 'var(--text-primary)',
                    fontFamily: 'inherit',
                    fontSize: '0.95rem',
                    fontWeight: 600,
                    outline: 'none',
                    boxSizing: 'border-box',
                    transition: 'border-color 0.2s'
                  }}
                />
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button
                  type="button"
                  className="btn-secondary btn-3d"
                  onClick={() => setIsEditingName(false)}
                  style={{ flex: 1 }}
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="btn-primary btn-3d"
                  style={{ flex: 2 }}
                >
                  SAVE CHANGES
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Achievement & Reward Detail Popup Modal */}
      {selectedAchievement && (
        <div className="modal-overlay">
          <div
            className="chest-modal-backdrop"
            onClick={() => setSelectedAchievement(null)}
          />
          <div
            className="achievement-detail-dialog"
            style={{
              border: `2px solid ${selectedAchievement.isUnlocked ? selectedAchievement.color : 'var(--border-color)'}`,
              textAlign: 'center',
              boxShadow: selectedAchievement.isUnlocked
                ? `0 16px 40px ${selectedAchievement.color}33`
                : '0 16px 40px rgba(0,0,0,0.5)'
            }}
          >
            <div
              style={{
                width: '80px',
                height: '80px',
                margin: '0 auto 14px',
                borderRadius: '50%',
                background: selectedAchievement.isUnlocked
                  ? `${selectedAchievement.color}22`
                  : 'rgba(255,255,255,0.05)',
                border: `2px solid ${selectedAchievement.isUnlocked ? selectedAchievement.color : 'var(--border-color)'}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: selectedAchievement.isUnlocked
                  ? `0 0 20px ${selectedAchievement.color}55`
                  : 'none'
              }}
            >
              <AchievementIcon
                iconKey={selectedAchievement.iconKey}
                color={selectedAchievement.color}
                isUnlocked={selectedAchievement.isUnlocked}
                size={44}
              />
            </div>

            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.3rem',
                fontWeight: 800,
                color: 'var(--text-primary)',
                marginBottom: '6px'
              }}
            >
              {selectedAchievement.name}
            </h3>

            <p
              style={{
                fontSize: '0.88rem',
                color: 'var(--text-secondary)',
                marginBottom: '16px',
                lineHeight: 1.45
              }}
            >
              {selectedAchievement.desc}
            </p>

            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 18px',
                borderRadius: '20px',
                fontSize: '0.85rem',
                fontWeight: 800,
                marginBottom: '20px',
                background: selectedAchievement.isUnlocked
                  ? 'rgba(0, 205, 156, 0.15)'
                  : 'rgba(255, 255, 255, 0.08)',
                color: selectedAchievement.isUnlocked
                  ? '#00CD9C'
                  : 'var(--text-muted)',
                border: `1px solid ${selectedAchievement.isUnlocked ? '#00CD9C' : 'var(--border-color)'}`
              }}
            >
              {selectedAchievement.isUnlocked ? (
                userState.claimedAchievements && userState.claimedAchievements.includes(selectedAchievement.id) ? (
                  <>
                    <CheckIcon size={16} color="#00CD9C" />
                    <span>REWARD CLAIMED</span>
                  </>
                ) : (
                  <>
                    <CheckIcon size={16} color="#00CD9C" />
                    <span>UNLOCKED · +50 GEMS REWARD</span>
                  </>
                )
              ) : (
                <>
                  <LockIcon size={14} color="var(--text-muted)" />
                  <span>IN PROGRESS</span>
                </>
              )}
            </div>

            {selectedAchievement.isUnlocked ? (
              userState.claimedAchievements && userState.claimedAchievements.includes(selectedAchievement.id) ? (
                <button
                  className="btn-secondary btn-3d"
                  onClick={() => {
                    if (onPlaySound) onPlaySound('click');
                    setSelectedAchievement(null);
                  }}
                  style={{ width: '100%' }}
                >
                  CLOSE
                </button>
              ) : (
                <button
                  className="btn-primary btn-3d"
                  onClick={() => handleClaimAchievement(selectedAchievement)}
                  style={{ width: '100%' }}
                >
                  COLLECT REWARD (+50 GEMS)
                </button>
              )
            ) : (
              <button
                className="btn-secondary btn-3d"
                onClick={() => {
                  if (onPlaySound) onPlaySound('click');
                  setSelectedAchievement(null);
                }}
                style={{ width: '100%' }}
              >
                GOT IT
              </button>
            )}
          </div>
        </div>
      )}

    </div>
  );
};

export default ProfileScreen;
