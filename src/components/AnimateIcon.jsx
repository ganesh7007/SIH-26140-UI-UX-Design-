import React, { useState } from 'react';

export const AnimateIcon = ({
  children,
  animateOnHover = false,
  animateOnClick = true,
  className = '',
  style = {}
}) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = (e) => {
    if (animateOnClick && !isAnimating) {
      setIsAnimating(true);
      setTimeout(() => {
        setIsAnimating(false);
      }, 650);
    }
  };

  return (
    <span
      className={`animate-icon-container ${className}`}
      onClick={handleClick}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        ...style
      }}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            isParentAnimating: isAnimating
          });
        }
        return child;
      })}
    </span>
  );
};
