import React from 'react';

export const StarRings = ({ size = 24, className = '', color = 'currentColor' }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={`star-rings-icon ${className}`}
      style={{ color, display: 'inline-block', verticalAlign: 'middle' }}
    >
      {/* Central 4-point Quantum Star */}
      <path
        d="M 12 5 C 12 8.86599 15.134 12 19 12 C 15.134 12 12 15.134 12 19 C 12 15.134 8.86599 12 5 12 C 8.86599 12 12 8.86599 12 5 Z"
        fill="currentColor"
      />
      {/* Outer Orbital Ring 1 (Tilted Ellipse) */}
      <ellipse
        cx="12"
        cy="12"
        rx="10"
        ry="3.8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        transform="rotate(-25 12 12)"
      />
      {/* Little sparkle dot on orbit */}
      <circle cx="19.5" cy="8.5" r="0.9" fill="currentColor" />
    </svg>
  );
};
