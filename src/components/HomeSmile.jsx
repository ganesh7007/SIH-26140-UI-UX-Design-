import React from 'react';

export const HomeSmile = ({ size = 24, className = '', color = 'currentColor' }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={`home-smile-icon ${className}`}
      style={{ color, display: 'inline-block', verticalAlign: 'middle' }}
    >
      <path
        d="M 3 9.5 L 12 3 L 21 9.5 L 21 19 C 21 19.5304 20.7893 20.0391 20.4142 20.4142 C 20.0391 20.7893 19.5304 21 19 21 L 5 21 C 4.46957 21 3.96086 20.7893 3.58579 20.4142 C 3.21071 20.0391 3 19.5304 3 19 L 3 9.5 Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M 9 13.5 C 9.8 15.2 11.2 16 12 16 C 12.8 16 14.2 15.2 15 13.5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
