import React from 'react';
import { Cog } from './Cog';
import { AnimateIcon } from './AnimateIcon';

export const SettingsIcon = ({ size = 26, className = '', color = 'currentColor', animateOnClick = true }) => {
  return (
    <AnimateIcon animateOnHover animateOnClick={animateOnClick} className={className}>
      <Cog size={size} color={color} />
    </AnimateIcon>
  );
};

export default SettingsIcon;
