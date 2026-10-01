import React, { useState } from 'react';
import { AVATAR_CHARACTERS } from '../data/avatars';
import GlassSurface from './GlassSurface';
import { AnimateIcon } from './AnimateIcon';
import { ArrowLeft } from './ArrowLeft';

export const AvatarModal = ({ userState, onSave, onClose, onPlaySound }) => {
  const currentAvatarSrc = userState.avatar || AVATAR_CHARACTERS[0].src;
  const [selectedAvatar, setSelectedAvatar] = useState(currentAvatarSrc);

  const handleSelect = (avatarObj) => {
    onPlaySound('click');
    setSelectedAvatar(avatarObj.src);
  };

  const handleSave = () => {
    onPlaySound('correct');
    onSave(selectedAvatar, { face: selectedAvatar });
    onClose();
  };

  const selectedAvatarObj =
    AVATAR_CHARACTERS.find((a) => a.src === selectedAvatar) || AVATAR_CHARACTERS[0];

  return (
    <div className="avatar-modal-screen">
      <div className="screen-header">
        <button
          className="back-btn"
          onClick={() => {
            onPlaySound('click');
            onClose();
          }}
          aria-label="Go Back"
        >
          <AnimateIcon animateOnHover>
            <ArrowLeft size={20} color="currentColor" />
          </AnimateIcon>
        </button>
        <h1>Avatar Customizer</h1>
        <p>Choose your quantum avatar</p>
      </div>

      <div className="avatar-customizer-box" style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
        {/* Live Preview Avatar on Glass Surface */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '8px 0' }}>
          <GlassSurface
            width={130}
            height={130}
            borderRadius={65}
            brightness={60}
            opacity={0.95}
            blur={16}
            saturation={2}
            distortionScale={-180}
            style={{
              border: '2px solid rgba(0, 205, 156, 0.6)',
              boxShadow: '0 10px 30px rgba(0, 205, 156, 0.25), 0 0 20px rgba(0, 205, 156, 0.2)'
            }}
          >
            <img
              src={selectedAvatarObj.src}
              alt={selectedAvatarObj.alt}
              width={85}
              height={85}
              style={{ display: 'block', objectFit: 'contain', filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))' }}
            />
          </GlassSurface>
          <span style={{ marginTop: '10px', fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.05rem', color: 'var(--text-primary)' }}>
            {selectedAvatarObj.name}
          </span>
        </div>

        {/* 9 Avatar Options Grid with Glass Surface Tiles */}
        <div
          className="avatar-options-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '12px',
            width: '100%'
          }}
        >
          {AVATAR_CHARACTERS.map((av) => {
            const isSelected = selectedAvatar === av.src;

            return (
              <button
                key={av.id}
                onClick={() => handleSelect(av)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  padding: 0,
                  cursor: 'pointer',
                  outline: 'none',
                  display: 'flex',
                  justifyContent: 'center'
                }}
              >
                <GlassSurface
                  width="100%"
                  height={96}
                  borderRadius={18}
                  brightness={55}
                  opacity={0.9}
                  blur={12}
                  saturation={1.8}
                  distortionScale={-160}
                  className={`avatar-glass-tile ${isSelected ? 'avatar-glass-selected' : ''}`}
                  style={{
                    border: isSelected ? '2px solid #00CD9C' : '1.5px solid var(--border-color)',
                    boxShadow: isSelected
                      ? '0 0 16px rgba(0, 205, 156, 0.4), inset 0 1px 2px rgba(255,255,255,0.6)'
                      : 'var(--card-shadow)',
                    background: isSelected ? 'rgba(0, 205, 156, 0.15)' : undefined,
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                    <img
                      src={av.src}
                      alt={av.alt}
                      width={52}
                      height={52}
                      style={{ display: 'block', objectFit: 'contain' }}
                    />
                    <span style={{ fontSize: '0.68rem', fontWeight: 800, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '80px' }}>
                      {av.name}
                    </span>
                  </div>
                </GlassSurface>
              </button>
            );
          })}
        </div>

        <button className="btn-primary btn-3d" onClick={handleSave} style={{ width: '100%', marginTop: '10px' }}>
          SAVE AVATAR
        </button>
      </div>
    </div>
  );
};
