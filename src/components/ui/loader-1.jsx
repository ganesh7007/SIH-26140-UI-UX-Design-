import React from 'react';
import { cn } from "@/lib/utils";

export const Loader = ({ className, size, color, style }) => {
  // If size is provided as number or string, compute scale relative to default 44.8px
  let computedScale = 1;
  if (size) {
    if (typeof size === 'number') {
      computedScale = size / 44.8;
    } else if (typeof size === 'string') {
      const num = parseFloat(size);
      if (!isNaN(num)) {
        computedScale = num / (size.includes('px') ? 44.8 : 44.8);
      }
    }
  }

  return (
    <div
      className={cn("quantum-orbital-loader-wrapper", className)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        transform: computedScale !== 1 ? `scale(${computedScale})` : undefined,
        transformOrigin: 'center center',
        color: color || '#554cb5',
        ...style
      }}
    >
      <div className="quantum-orbital-loader" />
    </div>
  );
};

export const Component = Loader;
export default Loader;
