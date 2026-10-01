import React from 'react';
import { SettingsIcon } from './SettingsIcon';
import { Switch } from './Switch';
import { AnimateIcon } from './AnimateIcon';
import { ArrowLeft } from './ArrowLeft';
import { ThemeTogglerButton, triggerThemeTransition } from './ThemeTogglerButton';

export const SettingsScreen = ({
  userState,
  onUpdateSetting,
  onResetData,
  onClose,
  onPlaySound
}) => {
  return (
    <div className="settings-screen-wrapper">
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
        <h1 style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
          <SettingsIcon size={28} color="var(--purple)" /> Settings
        </h1>
      </div>

      <div className="settings-list">
        {/* Appearance */}
        <div className="settings-card">
          <h4>APPEARANCE</h4>
          <div className="setting-item">
            <span>Theme Mode</span>
            <ThemeTogglerButton
              theme={userState.theme}
              onToggle={(e) => {
                onPlaySound('click');
                triggerThemeTransition(e, userState.theme, onUpdateSetting);
              }}
              variant="pill"
              size="md"
            />
          </div>
        </div>

        {/* Audio */}
        <div className="settings-card">
          <h4>AUDIO & HAPTICS</h4>
          <div className="setting-item">
            <span>Sound Effects</span>
            <Switch
              id="sound_effects_switch"
              checked={userState.soundEnabled !== false}
              onChange={(e) => {
                onPlaySound('click');
                onUpdateSetting('soundEnabled', e.target.checked);
              }}
            />
          </div>
        </div>

        {/* Accessibility */}
        <div className="settings-card">
          <h4>ACCESSIBILITY</h4>
          <div className="setting-item">
            <span>High Contrast</span>
            <Switch
              id="high_contrast_switch"
              checked={!!userState.highContrast}
              onChange={(e) => {
                onPlaySound('click');
                onUpdateSetting('highContrast', e.target.checked);
              }}
            />
          </div>

          <div className="setting-item">
            <span>Reduced Motion</span>
            <Switch
              id="reduced_motion_switch"
              checked={!!userState.reducedMotion}
              onChange={(e) => {
                onPlaySound('click');
                onUpdateSetting('reducedMotion', e.target.checked);
              }}
            />
          </div>
        </div>

        {/* Data & Reset */}
        <div className="settings-card">
          <h4>DATA & STORAGE</h4>
          <div className="setting-item">
            <span>Reset Demo Progress</span>
            <button
              type="button"
              className="learn-more-3d-btn btn-variant-danger"
              style={{ fontSize: '13px', padding: '0.6em 1.4em', minHeight: '38px' }}
              onClick={() => {
                if (window.confirm('Reset all quantum progress back to starting demo state?')) {
                  onPlaySound('click');
                  onResetData();
                }
              }}
            >
              <span className="btn-3d-text">Reset Demo</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
