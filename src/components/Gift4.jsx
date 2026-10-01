import React from 'react';

export const Gift4 = ({ size = 24, className = '', color = 'currentColor' }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={`gift4-icon ${className}`}
      style={{ color, display: 'inline-block', verticalAlign: 'middle' }}
    >
      {/* Box Body */}
      <path
        d="M 4 11 L 20 11 L 20 20 C 20 20.5523 19.5523 21 19 21 L 5 21 C 4.44772 21 4 20.5523 4 20 L 4 11 Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Box Lid */}
      <path
        d="M 3 8 C 3 7.44772 3.44772 7 4 7 L 20 7 C 20.5523 7 21 7.44772 21 8 L 21 11 L 3 11 L 3 8 Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Vertical Ribbon */}
      <line
        x1="12"
        y1="7"
        x2="12"
        y2="21"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      {/* Bow Loop Left */}
      <path
        d="M 12 7 C 10.5 4 6.5 4 6.5 6 C 6.5 7.5 10 7 12 7 Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Bow Loop Right */}
      <path
        d="M 12 7 C 13.5 4 17.5 4 17.5 6 C 17.5 7.5 14 7 12 7 Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
