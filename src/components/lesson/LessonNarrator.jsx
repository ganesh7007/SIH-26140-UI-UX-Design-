import React from 'react';
import './LessonNarrator.css';

/**
 * Modern SVG Icons for Speaker and Mute
 */
export const SpeakerActiveIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor"></polygon>
    <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
    <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
  </svg>
);

export const SpeakerIdleIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
    <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
  </svg>
);

export const MuteIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
    <line x1="23" y1="9" x2="17" y2="15"></line>
    <line x1="17" y1="9" x2="23" y2="15"></line>
  </svg>
);

/**
 * Compact Speaker / Mute Toggle Button
 * Positioned beside Question titles & Card headings
 */
export const VoiceSpeakerButton = ({
  narrator,
  size = 36,
  className = ''
}) => {
  if (!narrator || !narrator.isSupported) return null;

  const { isSpeaking, toggle } = narrator;

  return (
    <button
      type="button"
      className={`voice-speaker-btn ${isSpeaking ? 'voice-speaker-btn--speaking' : ''} ${className}`}
      onClick={(e) => {
        e.stopPropagation();
        toggle();
      }}
      aria-label={isSpeaking ? 'Mute voice narration' : 'Read section aloud'}
      title={isSpeaking ? 'Mute voice' : 'Read aloud'}
      style={{ width: size, height: size }}
    >
      {isSpeaking ? (
        <span className="voice-icon-box">
          <SpeakerActiveIcon size={size * 0.55} />
          <span className="voice-mini-pulse"></span>
        </span>
      ) : (
        <SpeakerIdleIcon size={size * 0.55} />
      )}
    </button>
  );
};

/**
 * NarratedText: Renders educational text with synchronized sentence highlights
 */
export const NarratedText = ({
  text,
  sectionId,
  narrator,
  className = '',
  as: Component = 'span'
}) => {
  if (!text || typeof text !== 'string') return null;

  const rawSentences = text
    .split(/(?<=[.?!])\s+/)
    .map((s) => s.trim())
    .filter(Boolean);

  const sentences = rawSentences.length > 0 ? rawSentences : [text];

  const activeSentenceId = narrator?.activeSentenceId;
  const isSpeaking = narrator?.isSpeaking;

  return (
    <Component className={`narrated-text-wrapper ${className}`}>
      {sentences.map((sentence, idx) => {
        const sentenceId = `${sectionId || 'sec'}-s-${idx}`;
        const isActive = isSpeaking && activeSentenceId === sentenceId;

        return (
          <span
            key={idx}
            className={`narrator-sentence ${isActive ? 'narrator-sentence--active' : ''}`}
          >
            {sentence}{' '}
          </span>
        );
      })}
    </Component>
  );
};

// Also export LessonNarrator as an alias to VoiceSpeakerButton for backward compatibility
export const LessonNarrator = VoiceSpeakerButton;
