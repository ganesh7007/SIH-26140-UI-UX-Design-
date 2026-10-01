import React from 'react';

export const GhostSmile = ({ size = 24, className = '', color = 'currentColor' }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={`ghost-smile-icon ${className}`}
      style={{ color, display: 'inline-block', verticalAlign: 'middle' }}
    >
      {/* Ghost Outline */}
      <path
        d="M 12 3 C 7.5817 3 4 6.5817 4 11 L 4 19 C 4 19.8 4.7 20.3 5.4 19.9 L 7.3 18.7 C 7.8 18.4 8.5 18.4 9 18.7 L 11.2 20 C 11.7 20.3 12.3 20.3 12.8 20 L 15 18.7 C 15.5 18.4 16.2 18.4 16.7 18.7 L 18.6 19.9 C 19.3 20.3 20 19.8 20 19 L 20 11 C 20 6.5817 16.4183 3 12 3 Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Eyes */}
      <circle cx="9" cy="10" r="1.5" fill="currentColor" />
      <circle cx="15" cy="10" r="1.5" fill="currentColor" />
      {/* Smile */}
      <path
        d="M 9.5 13.5 C 10.2 14.8 11.8 15.2 12.8 14.8 C 13.5 14.5 14.2 13.8 14.5 13.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
};
