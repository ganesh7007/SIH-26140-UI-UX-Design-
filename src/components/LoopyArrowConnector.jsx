import React from 'react';

export const LoopyArrowConnector = ({ variant = 'loop', color = 'emerald', className = '' }) => {
  // Determine color stroke values
  const colorMap = {
    emerald: {
      stroke: '#10B981',
      glow: 'rgba(16, 185, 129, 0.4)',
    },
    purple: {
      stroke: '#8B5CF6',
      glow: 'rgba(139, 92, 246, 0.4)',
    },
    sky: {
      stroke: '#0284C7',
      glow: 'rgba(2, 132, 199, 0.4)',
    },
    amber: {
      stroke: '#F59E0B',
      glow: 'rgba(245, 158, 11, 0.4)',
    },
    slate: {
      stroke: '#94A3B8',
      glow: 'rgba(148, 163, 184, 0.2)',
    },
  };

  const currentColor = colorMap[color] || colorMap.emerald;

  // The loopy dashed arrow path matching the user's reference diagram
  // Loops around itself and points cleanly downward with an arrow head
  if (variant === 'loop-alt') {
    return (
      <div className={`loopy-arrow-container ${className}`}>
        <svg
          width="48"
          height="64"
          viewBox="0 0 48 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="loopy-arrow-svg"
        >
          {/* Subtle Glow Filter */}
          <defs>
            <filter id={`arrow-glow-${color}`} x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="1" stdDeviation="2" floodColor={currentColor.glow} />
            </filter>
          </defs>

          {/* Mirrored Loop Path */}
          <path
            d="M 32,2 C 26,14 10,16 10,28 C 10,40 38,36 38,24 C 38,12 18,18 20,44 C 21,50 22,54 24,56"
            stroke={currentColor.stroke}
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="5 4"
            filter={`url(#arrow-glow-${color})`}
          />

          {/* Downward Arrow Head */}
          <polygon
            points="24,62 18,52 30,52"
            fill={currentColor.stroke}
          />
        </svg>
      </div>
    );
  }

  return (
    <div className={`loopy-arrow-container ${className}`}>
      <svg
        width="48"
        height="64"
        viewBox="0 0 48 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="loopy-arrow-svg"
      >
        <defs>
          <filter id={`arrow-glow-def-${color}`} x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="1" stdDeviation="2" floodColor={currentColor.glow} />
          </filter>
        </defs>

        {/* Playful Loopy Curved Dashed Path matching uploaded reference image */}
        <path
          d="M 16,2 C 22,14 38,16 38,28 C 38,40 10,36 10,24 C 10,12 30,18 28,44 C 27,50 26,54 24,56"
          stroke={currentColor.stroke}
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="5 4"
          filter={`url(#arrow-glow-def-${color})`}
        />

        {/* Downward Arrow Head */}
        <polygon
          points="24,62 18,52 30,52"
          fill={currentColor.stroke}
        />
      </svg>
    </div>
  );
};

export default LoopyArrowConnector;
