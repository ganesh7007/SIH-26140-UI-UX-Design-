import React from 'react';
import * as Tooltip from '@radix-ui/react-tooltip';

export const AnimatedTooltip = ({
  children,
  content,
  subcontent,
  icon,
  side = 'bottom',
  align = 'center',
  sideOffset = 10,
  accentColor = '#FF7A00'
}) => {
  return (
    <Tooltip.Provider delayDuration={80} skipDelayDuration={0}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          {children}
        </Tooltip.Trigger>

        <Tooltip.Portal>
          <Tooltip.Content
            className="animate-ui-tooltip-content"
            side={side}
            align={align}
            sideOffset={sideOffset}
            style={{
              '--accent-color': accentColor
            }}
          >
            <div className="tooltip-inner-card">
              {icon && <span className="tooltip-icon">{icon}</span>}
              <div className="tooltip-text-group">
                <div className="tooltip-title">{content}</div>
                {subcontent && <div className="tooltip-subtitle">{subcontent}</div>}
              </div>
            </div>
            <Tooltip.Arrow className="animate-ui-tooltip-arrow" width={12} height={6} />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};

export default AnimatedTooltip;
