import React, { useEffect, useMemo } from 'react';
import './VoiceQuestionReader.css';

/**
 * Modern SVG Icons for Voice Controls
 */
export const SpeakerIcon = ({ size = 16, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
    <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
  </svg>
);

export const PauseIcon = ({ size = 16, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="10" y1="5" x2="10" y2="19"></line>
    <line x1="14" y1="5" x2="14" y2="19"></line>
  </svg>
);

export const PlayIcon = ({ size = 16, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="5 3 19 12 5 21 5 3" fill="currentColor"></polygon>
  </svg>
);

export const ReplayIcon = ({ size = 16, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="1 4 1 10 7 10"></polyline>
    <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"></path>
  </svg>
);

export const MuteIcon = ({ size = 16, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
    <line x1="23" y1="9" x2="17" y2="15"></line>
    <line x1="17" y1="9" x2="23" y2="15"></line>
  </svg>
);

/**
 * VoiceQuestionReader Component
 * Integrates Web Speech API with word-by-word visual synchronization.
 */
export const VoiceQuestionReader = ({
  questionText,
  voiceGuidance,
  autoRead = true,
  as: Component = 'h2',
  className = 'lesson-question-title',
  showToolbar = true,
  badgeLabel
}) => {
  const {
    isSupported,
    isSpeaking,
    isPaused,
    isMuted,
    activeWordIndex,
    words,
    currentText,
    speak,
    pause,
    resume,
    replay,
    toggleMute
  } = voiceGuidance;

  // Auto-read on mount or text change
  useEffect(() => {
    if (autoRead && questionText && !isMuted) {
      const timer = setTimeout(() => {
        speak(questionText);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [questionText, autoRead, isMuted, speak]);

  const isCurrentTextSpeaking = isSpeaking && currentText === questionText;
  const isReadingActive = isCurrentTextSpeaking && !isPaused;

  // Split text into words
  const displayWords = useMemo(() => {
    if (isCurrentTextSpeaking && words && words.length > 0) return words;
    if (!questionText) return [];
    return questionText.split(/\s+/).map((word, idx) => ({
      text: word,
      index: idx
    }));
  }, [isCurrentTextSpeaking, words, questionText]);

  return (
    <div className="voice-reader-container">
      {/* Voice Assistant Indicator & Controls Bar */}
      {isSupported && showToolbar && (
        <div className={`voice-reader-header ${isReadingActive ? 'is-speaking' : ''}`}>
          {/* Status Badge */}
          <div
            className={`voice-status-badge ${isReadingActive ? 'status-speaking' : ''}`}
            aria-live="polite"
          >
            <div className="voice-wave-bars" aria-hidden="true">
              <span className="voice-wave-bar"></span>
              <span className="voice-wave-bar"></span>
              <span className="voice-wave-bar"></span>
              <span className="voice-wave-bar"></span>
            </div>
            <span>
              {badgeLabel ||
                (isReadingActive
                  ? 'Reading aloud...'
                  : isPaused && isCurrentTextSpeaking
                  ? 'Speech paused'
                  : isMuted
                  ? 'Voice muted'
                  : 'Voice Guidance')}
            </span>
          </div>

          {/* Controls Group */}
          <div className="voice-controls-group" role="toolbar" aria-label="Voice controls">
            {/* Play / Listen / Resume */}
            {!isCurrentTextSpeaking || isPaused ? (
              <button
                type="button"
                className="voice-control-btn"
                onClick={isPaused && isCurrentTextSpeaking ? resume : () => speak(questionText)}
                title={isPaused && isCurrentTextSpeaking ? 'Resume reading' : 'Listen aloud'}
                aria-label={isPaused && isCurrentTextSpeaking ? 'Resume reading' : 'Listen aloud'}
              >
                {isPaused && isCurrentTextSpeaking ? <PlayIcon size={14} /> : <SpeakerIcon size={14} />}
              </button>
            ) : (
              /* Pause */
              <button
                type="button"
                className="voice-control-btn"
                onClick={pause}
                title="Pause reading"
                aria-label="Pause reading"
              >
                <PauseIcon size={14} />
              </button>
            )}

            {/* Replay */}
            <button
              type="button"
              className="voice-control-btn"
              onClick={() => speak(questionText)}
              title="Replay from start"
              aria-label="Replay from start"
              disabled={!questionText}
            >
              <ReplayIcon size={14} />
            </button>

            {/* Mute / Unmute */}
            <button
              type="button"
              className={`voice-control-btn ${isMuted ? 'is-active' : ''}`}
              onClick={toggleMute}
              title={isMuted ? 'Unmute voice' : 'Mute voice'}
              aria-label={isMuted ? 'Unmute voice' : 'Mute voice'}
            >
              <MuteIcon size={14} />
            </button>
          </div>
        </div>
      )}

      {/* Synchronized Text Element */}
      <Component className={className}>
        {displayWords.map((wordItem, idx) => {
          const isActive = isCurrentTextSpeaking && activeWordIndex === idx;
          const isDimmed = isCurrentTextSpeaking && activeWordIndex !== null && activeWordIndex !== idx;

          return (
            <React.Fragment key={idx}>
              <span
                className={`voice-word ${isActive ? 'is-active' : ''} ${isDimmed ? 'is-dimmed' : ''}`}
                data-word-index={idx}
              >
                {wordItem.text}
              </span>
              {idx < displayWords.length - 1 && <span className="voice-word-space"> </span>}
            </React.Fragment>
          );
        })}
      </Component>
    </div>
  );
};

export default VoiceQuestionReader;
