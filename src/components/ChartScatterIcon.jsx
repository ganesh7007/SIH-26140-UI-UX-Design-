import React, { useState } from 'react';

export const ChartScatterIcon = ({ size = 24, className = '', color = 'currentColor', animateOnClick = true }) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = (e) => {
    if (animateOnClick) {
      setIsAnimating(true);
      setTimeout(() => {
        setIsAnimating(false);
      }, 650);
    }
  };

  return (
    <span
      className={`animate-chart-scatter-wrapper ${className}`}
      onClick={handleClick}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
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
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ display: 'block' }}
      >
        {/* Chart Axes */}
        <line x1="3.5" y1="3.5" x2="3.5" y2="20.5" />
        <line x1="3.5" y1="20.5" x2="20.5" y2="20.5" />

        {/* Small Refined Scatter Dots (r=1.15) */}
        <circle
          cx="7.5"
          cy="14.5"
          r="1.15"
          fill={color}
          style={{
            transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
            transform: isAnimating ? 'translate(-1.5px, -2.5px) scale(1.15)' : 'translate(0, 0)'
          }}
        />
        <circle
          cx="11"
          cy="8"
          r="1.15"
          fill={color}
          style={{
            transition: 'transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1) 0.04s',
            transform: isAnimating ? 'translate(2px, -3px) scale(1.2)' : 'translate(0, 0)'
          }}
        />
        <circle
          cx="15"
          cy="12"
          r="1.15"
          fill={color}
          style={{
            transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) 0.08s',
            transform: isAnimating ? 'translate(-2px, 2px) scale(1.15)' : 'translate(0, 0)'
          }}
        />
        <circle
          cx="18"
          cy="6.5"
          r="1.15"
          fill={color}
          style={{
            transition: 'transform 0.48s cubic-bezier(0.34, 1.56, 0.64, 1) 0.12s',
            transform: isAnimating ? 'translate(1.5px, -2.5px) scale(1.2)' : 'translate(0, 0)'
          }}
        />
        <circle
          cx="13"
          cy="16.5"
          r="1.15"
          fill={color}
          style={{
            transition: 'transform 0.42s cubic-bezier(0.34, 1.56, 0.64, 1) 0.06s',
            transform: isAnimating ? 'translate(2px, 1.5px) scale(1.15)' : 'translate(0, 0)'
          }}
        />
      </svg>
    </span>
  );
};
