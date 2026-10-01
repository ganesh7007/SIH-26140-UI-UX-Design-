import React, { useState } from 'react';

export const ArrowLeft = ({
  size = 20,
  className = '',
  color = 'currentColor',
  animateOnHover = false,
  animateOnClick = false,
  isParentAnimating = undefined
}) => {
  const [localAnimating, setLocalAnimating] = useState(false);

  const isAnimating = isParentAnimating !== undefined ? isParentAnimating : localAnimating;

  const handleMouseEnter = () => {
    if (animateOnHover && isParentAnimating === undefined) {
      setLocalAnimating(true);
    }
  };

  const handleMouseLeave = () => {
    if (animateOnHover && isParentAnimating === undefined) {
      setLocalAnimating(false);
    }
  };

  const handleClick = () => {
    if (animateOnClick && isParentAnimating === undefined) {
      setLocalAnimating(true);
      setTimeout(() => setLocalAnimating(false), 500);
    }
  };

  return (
    <span
      className={`animate-arrow-left-root ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: size,
        height: size,
        margin: '0 auto'
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ display: 'block' }}
      >
        <line
          x1="19"
          y1="12"
          x2="5"
          y2="12"
          style={{
            transition: 'transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
            transform: isAnimating ? 'translateX(-3px)' : 'translateX(0)'
          }}
        />
        <polyline
          points="12 19 5 12 12 5"
          style={{
            transition: 'transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
            transform: isAnimating ? 'translateX(-3px)' : 'translateX(0)'
          }}
        />
      </svg>
    </span>
  );
};

export default ArrowLeft;
