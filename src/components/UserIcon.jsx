import React, { useState } from 'react';

export const User = ({
  size = 24,
  className = '',
  color = 'currentColor',
  animateOnClick = true,
  isParentAnimating = undefined
}) => {
  const [localAnimating, setLocalAnimating] = useState(false);

  const isAnimating = isParentAnimating !== undefined ? isParentAnimating : localAnimating;

  const handleClick = (e) => {
    if (animateOnClick && isParentAnimating === undefined && !localAnimating) {
      setLocalAnimating(true);
      setTimeout(() => setLocalAnimating(false), 650);
    }
  };

  return (
    <span
      className={`animate-user-icon-root ${className}`}
      onClick={handleClick}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: size,
        height: size,
        margin: '0 auto',
        cursor: 'pointer'
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ display: 'block' }}
      >
        {/* Head Node */}
        <circle
          cx="12"
          cy="7"
          r="4"
          style={{
            transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
            transformOrigin: '12px 7px',
            transform: isAnimating ? 'translateY(-2.5px) scale(1.1)' : 'translateY(0) scale(1)'
          }}
        />

        {/* Shoulders / Torso */}
        <path
          d="M 4 21 C 4 17.134 7.58172 14 12 14 C 16.4183 14 20 17.134 20 21"
          style={{
            transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
            transformOrigin: '12px 18px',
            transform: isAnimating ? 'scale(1.05)' : 'scale(1)'
          }}
        />
      </svg>
    </span>
  );
};
