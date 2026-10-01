import React from 'react';
import { FireIcon } from './ReiconIcons';

export const StreakFlame = ({ size = 80, className = '', style = {} }) => {
  return (
    <div
      className={`streak-flame-static-container ${className}`}
      style={{
        width: size,
        height: size,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'none',
        userSelect: 'none',
        ...style
      }}
    >
      <FireIcon size={size * 0.85} color="#FF7A00" />
    </div>
  );
};

export default StreakFlame;
