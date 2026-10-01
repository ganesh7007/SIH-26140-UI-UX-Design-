import React, { useState, useEffect, useMemo, useRef } from 'react';

export const ProgressiveHint = ({
  hint,
  hints = [],
  wrongAttempts = 0,
  threshold = 2,
  onPlaySound,
  title = "Stuck? You can see the hint",
  forceShow = false
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [revealedCount, setRevealedCount] = useState(1);
  const [isMinimized, setIsMinimized] = useState(false);
  const playedSoundRef = useRef(false);

  // Normalize hint sources into an array
  const allHints = useMemo(() => {
    if (Array.isArray(hints) && hints.length > 0) return hints;
    if (typeof hint === 'string' && hint.trim().length > 0) return [hint.trim()];
    return [];
  }, [hints, hint]);

  const isEligible = forceShow || wrongAttempts >= threshold;

  // Play a gentle notification sound when hint becomes available for the first time
  useEffect(() => {
    if (isEligible && allHints.length > 0 && !playedSoundRef.current) {
      playedSoundRef.current = true;
      if (onPlaySound) {
        onPlaySound('hint');
      }
    } else if (!isEligible) {
      playedSoundRef.current = false;
      setIsModalOpen(false);
      setIsMinimized(false);
      setRevealedCount(1);
    }
  }, [isEligible, allHints.length, onPlaySound]);

  if (!isEligible || allHints.length === 0) return null;

  const handleRevealNext = (e) => {
    e?.stopPropagation();
    if (revealedCount < allHints.length) {
      if (onPlaySound) onPlaySound('click');
      setRevealedCount((prev) => prev + 1);
    }
  };

  const handleOpenModal = () => {
    if (onPlaySound) onPlaySound('click');
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    if (onPlaySound) onPlaySound('click');
    setIsModalOpen(false);
  };

  return (
    <>
      {/* 1. Bottom Pop-up Notification Banner */}
      {!isMinimized ? (
        <div className="hint-bottom-toast-wrapper">
          <div
            className="hint-bottom-toast-card"
            onClick={handleOpenModal}
            role="button"
            tabIndex={0}
            title="Click to view hint"
          >
            <div className="hint-toast-info">
              <div className="hint-toast-icon-pulse">
                <span className="hint-bulb-emoji">💡</span>
              </div>
              <div className="hint-toast-text-col">
                <div className="hint-toast-header-row">
                  <span className="hint-toast-badge">HINT READY</span>
                  <span className="hint-toast-heading">{title}</span>
                </div>
                <span className="hint-toast-subtext">
                  Tap here to view helpful guidance and boost your answer!
                </span>
              </div>
            </div>

            <div className="hint-toast-actions">
              <button
                type="button"
                className="hint-toast-view-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  handleOpenModal();
                }}
              >
                View Hint →
              </button>
              <button
                type="button"
                className="hint-toast-minimize-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  if (onPlaySound) onPlaySound('click');
                  setIsMinimized(true);
                }}
                title="Minimize Hint"
                aria-label="Minimize Hint"
              >
                ✕
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Minimized Floating Hint Pill */
        <div className="hint-minimized-pill-wrapper">
          <button
            type="button"
            className="hint-minimized-pill-btn"
            onClick={() => {
              if (onPlaySound) onPlaySound('click');
              setIsMinimized(false);
              setIsModalOpen(true);
            }}
            title="Open Hint"
          >
            <span className="hint-pill-bulb">💡</span>
            <span className="hint-pill-label">Hint Available</span>
          </button>
        </div>
      )}

      {/* 2. Expanded Hint Pop-up Modal / Bottom Sheet */}
      {isModalOpen && (
        <div className="hint-modal-overlay" onClick={handleCloseModal}>
          <div
            className="hint-modal-sheet"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <div className="hint-modal-sheet-handle" />

            <div className="hint-modal-header">
              <div className="hint-modal-title-group">
                <div className="hint-modal-icon-badge">
                  <span className="hint-modal-bulb">💡</span>
                </div>
                <div>
                  <h3 className="hint-modal-title">Concept Guidance</h3>
                  <span className="hint-modal-progress">
                    {allHints.length > 1
                      ? `Hint ${revealedCount} of ${allHints.length}`
                      : 'Helpful Clue'}
                  </span>
                </div>
              </div>

              <button
                type="button"
                className="hint-modal-close-btn"
                onClick={handleCloseModal}
                aria-label="Close Hint"
              >
                ✕
              </button>
            </div>

            <div className="hint-modal-body">
              <div className="hint-cards-scroller">
                {allHints.slice(0, revealedCount).map((h, idx) => (
                  <div key={idx} className="hint-bubble-card">
                    {allHints.length > 1 && (
                      <div className="hint-tier-tag">STEP {idx + 1}</div>
                    )}
                    <p className="hint-bubble-text">{h}</p>
                  </div>
                ))}
              </div>

              {revealedCount < allHints.length && (
                <button
                  type="button"
                  className="btn-unlock-next-hint"
                  onClick={handleRevealNext}
                >
                  <span className="unlock-hint-sub">💡 Still need more clarity?</span>
                  <span className="unlock-hint-main">
                    Unlock Next Hint ({revealedCount + 1}/{allHints.length}) →
                  </span>
                </button>
              )}
            </div>

            <div className="hint-modal-footer">
              <button
                type="button"
                className="btn-hint-continue"
                onClick={handleCloseModal}
              >
                Got it, let's solve it! →
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProgressiveHint;
