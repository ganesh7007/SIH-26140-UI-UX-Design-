import React from 'react';

// Directly toggle theme instantly without screen wipe animation
export const triggerThemeTransition = (e, currentTheme, onUpdateSetting) => {
  const nextTheme = currentTheme === 'light' ? 'dark' : 'light';
  onUpdateSetting('theme', nextTheme);
};

export const ThemeTogglerButton = ({
  theme = 'light',
  onToggle,
  variant = 'default',
  size = 'md',
  showLabel = true
}) => {
  const isDark = theme === 'dark';

  if (variant === 'mobile-item') {
    return (
      <button
        type="button"
        className="mobile-more-item theme-toggler-mobile-item"
        onClick={onToggle}
        aria-label="Toggle Theme Mode"
      >
        <div
          className="more-item-icon-box"
          style={{
            background: isDark ? 'rgba(167, 139, 250, 0.15)' : 'rgba(245, 158, 11, 0.15)',
            color: isDark ? '#A78BFA' : '#F59E0B'
          }}
        >
          <div className="toggler-icon-box">
            <svg
              className="theme-toggler-svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <mask id="moon-mask-id-mobile">
                <rect x="0" y="0" width="100%" height="100%" fill="white" />
                <circle
                  className="moon-cutout-circle"
                  cx={isDark ? '17' : '26'}
                  cy={isDark ? '7' : '2'}
                  r="7"
                  fill="black"
                />
              </mask>

              <circle
                className="sun-moon-center-circle"
                cx="12"
                cy="12"
                r={isDark ? '8' : '5'}
                mask="url(#moon-mask-id-mobile)"
                fill="currentColor"
              />

              <g className="sun-rays-group" style={{ opacity: isDark ? 0 : 1, transform: isDark ? 'scale(0.3) rotate(90deg)' : 'scale(1) rotate(0deg)' }}>
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </g>
            </svg>
          </div>
        </div>

        <div className="more-item-text">
          <span className="more-item-title">
            {isDark ? 'Dark Mode' : 'Light Mode'}
          </span>
          <span className="more-item-sub">
            {isDark ? 'Tap to switch to Light Theme' : 'Tap to switch to Dark Theme'}
          </span>
        </div>
      </button>
    );
  }

  return (
    <button
      className={`theme-toggler-btn variant-${variant} size-${size} ${isDark ? 'is-dark' : 'is-light'}`}
      onClick={onToggle}
      title={`Switch to ${isDark ? 'Light' : 'Dark'} Mode`}
      aria-label="Toggle Theme Mode"
    >
      <div className="toggler-icon-box">
        <svg
          className="theme-toggler-svg"
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <mask id="moon-mask-id">
            <rect x="0" y="0" width="100%" height="100%" fill="white" />
            <circle
              className="moon-cutout-circle"
              cx={isDark ? '17' : '26'}
              cy={isDark ? '7' : '2'}
              r="7"
              fill="black"
            />
          </mask>

          <circle
            className="sun-moon-center-circle"
            cx="12"
            cy="12"
            r={isDark ? '8' : '5'}
            mask="url(#moon-mask-id)"
            fill="currentColor"
          />

          <g className="sun-rays-group" style={{ opacity: isDark ? 0 : 1, transform: isDark ? 'scale(0.3) rotate(90deg)' : 'scale(1) rotate(0deg)' }}>
            <line x1="12" y1="1" x2="12" y2="3" />
            <line x1="12" y1="21" x2="12" y2="23" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="1" y1="12" x2="3" y2="12" />
            <line x1="21" y1="12" x2="23" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
          </g>
        </svg>
      </div>

      {showLabel && (
        <span className="theme-toggle-text">
          {isDark ? 'Dark Mode' : 'Light Mode'}
        </span>
      )}
    </button>
  );
};

export default ThemeTogglerButton;
