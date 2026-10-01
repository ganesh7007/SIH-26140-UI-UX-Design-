import React, { useState } from 'react';

export const Cog = ({
  size = 24,
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
      className={`animate-cog-root ${className}`}
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
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          display: 'block',
          transition: 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
          transform: isAnimating ? 'rotate(180deg)' : 'rotate(0deg)'
        }}
      >
        <path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z" />
        <path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
        <path d="M12 2v2" />
        <path d="M12 22v-2" />
        <path d="m17 20.66-1-1.73" />
        <path d="M11 10.27 7 3.34" />
        <path d="m20.66 17-1.73-1" />
        <path d="m3.34 7 1.73 1" />
        <path d="M14 12h8" />
        <path d="M2 12h2" />
        <path d="m20.66 7-1.73 1" />
        <path d="m3.34 17 1.73-1" />
        <path d="m17 3.34-1 1.73" />
        <path d="m11 13.73-4 6.93" />
      </svg>
    </span>
  );
};

export default Cog;
