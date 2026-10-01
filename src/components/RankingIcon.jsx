import React from 'react';

export const Ranking = ({ size = 24, className = '', color = 'currentColor' }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={`ranking-icon ${className}`}
      style={{ color, display: 'inline-block', verticalAlign: 'middle' }}
    >
      {/* 2nd Place Bar (Left) */}
      <path
        d="M 4 20 L 4 11 C 4 10.4477 4.44772 10 5 10 L 8 10 C 8.55228 10 9 10.4477 9 11 L 9 20"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* 1st Place Bar (Center - Tallest) */}
      <path
        d="M 9.5 20 L 9.5 6 C 9.5 5.44772 9.94772 5 10.5 5 L 13.5 5 C 14.0523 5 14.5 5.44772 14.5 6 L 14.5 20"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* 3rd Place Bar (Right) */}
      <path
        d="M 15 20 L 15 14 C 15 13.4477 15.4477 13 16 13 L 19 13 C 19.5523 13 20 13.4477 20 14 L 20 20"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Base Line */}
      <path
        d="M 2 20 L 22 20"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      {/* Star / Badge on Top of 1st place */}
      <circle cx="12" cy="2.5" r="1" fill="currentColor" />
    </svg>
  );
};
