import React, { useEffect, useState } from 'react';

export const LoadingScreen = ({ onFinished, minDuration = 600 }) => {
  const [loadingText, setLoadingText] = useState('Initializing Quantum Realm...');
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => {
        if (onFinished) onFinished();
      }, 100);
    }, minDuration);

    return () => clearTimeout(timer);
  }, [minDuration, onFinished]);

  return (
    <div
      className={`quantum-loading-overlay ${fadeOut ? 'loading-fade-out' : ''}`}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: 'var(--bg-primary, #131F24)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '16px',
        opacity: fadeOut ? 0 : 1,
        pointerEvents: fadeOut ? 'none' : 'auto'
      }}
    >
      <div
        style={{
          width: '240px',
          maxWidth: '85vw',
          height: '110px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '8px'
        }}
      >
        <img
          src="/qubit-logo.png"
          alt="Qubit"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            filter: 'drop-shadow(0 8px 24px rgba(0, 0, 0, 0.4))'
          }}
        />
      </div>

      <div style={{ textAlign: 'center' }}>
        <p
          style={{
            fontSize: '0.82rem',
            fontWeight: 600,
            color: 'var(--cyan, #22D3EE)',
            minHeight: '20px'
          }}
        >
          {loadingText}
        </p>
      </div>

      {/* Mini Quantum Static Bar */}
      <div
        style={{
          width: '140px',
          height: '4px',
          borderRadius: '4px',
          background: 'linear-gradient(90deg, #00CD9C, #22D3EE, #8B5CF6)',
          overflow: 'hidden'
        }}
      />
    </div>
  );
};

export default LoadingScreen;
