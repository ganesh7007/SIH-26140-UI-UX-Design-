import React from 'react';

export const TactileButton = ({
  children,
  onClick,
  disabled = false,
  variant = 'purple',
  className = '',
  style = {},
  ...props
}) => {
  return (
    <div className={`tactile-btn-wrapper ${className}`}>
      <button
        type="button"
        className={`learn-more-3d-btn btn-variant-${variant} ${disabled ? 'is-disabled' : ''}`}
        onClick={onClick}
        disabled={disabled}
        style={style}
        {...props}
      >
        <span className="btn-3d-text">{children}</span>
      </button>
    </div>
  );
};

export default TactileButton;
