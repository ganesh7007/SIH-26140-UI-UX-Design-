import React from 'react';

export const Pattern = ({ className, style, children }) => {
  return (
    <div className={`geometric-pattern-container ${className || ''}`} style={style}>
      {children}
    </div>
  );
};

export default Pattern;
