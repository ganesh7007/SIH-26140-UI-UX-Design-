import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Strips complex emojis and special markdown characters so Web Speech API speaks clearly.
 */
export const cleanTextForTTS = (text) => {
  if (!text || typeof text !== 'string') return '';
  return text
    .replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{2300}-\u{23FF}]/gu, ' ')
    .replace(/[*_#`~[\]()<>]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
};

/**
 * Parses text into word tokens with character index ranges for accurate SpeechSynthesis boundary mapping.
 */
export const parseTextWords = (text) => {
  if (!text || typeof text !== 'string') return [];
  const regex = /\S+/g;
  const words = [];
  let match;
  while ((match = regex.exec(text)) !== null) {
    words.push({
      text: match[0],
      start: match.index,
      end: match.index + match[0].length,
      index: words.length
    });
  }
  return words;
};

/**
 * Unlock browser audio / speech synthesis on user interaction.
 */
if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  const unlock = () => {
    try {
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      }
    } catch (e) {
      // ignore
    }
  };
  ['click', 'touchstart', 'keydown', 'pointerdown'].forEach((evt) => {
    window.addEventListener(evt, unlock, { capture: true, passive: true });
  });
}

/**
 * Custom Hook for Voice Guided Learning with Word-by-Word Voice Synchronization.
 * Fully compatible with Chrome, Edge, Safari, Firefox, and Windows SAPI speech engines.
 */
export const useVoiceGuidance = ({ rate = 0.95, pitch = 1.1 } = {}) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [activeWordIndex, setActiveWordIndex] = useState(null);
  const [currentText, setCurrentText] = useState('');
  const [words, setWords] = useState([]);
  const [isSupported, setIsSupported] = useState(false);

  const utteranceRef = useRef(null);
  const wordsRef = useRef([]);
  const isMutedRef = useRef(isMuted);
  const voiceListRef = useRef([]);
  const pacerTimerRef = useRef(null);
  const boundaryFiredRef = useRef(false);

  useEffect(() => {
    isMutedRef.current = isMuted;
  }, [isMuted]);

  // Load and cache voices
  const loadVoices = useCallback(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const v = window.speechSynthesis.getVoices();
      if (v && v.length > 0) {
        voiceListRef.current = v;
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window) {
      setIsSupported(true);
      loadVoices();

      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = loadVoices;
      }
    } else {
      setIsSupported(false);
    }

    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      if (pacerTimerRef.current) {
        clearInterval(pacerTimerRef.current);
      }
    };
  }, [loadVoices]);

  // Stop word pacer timer
  const stopPacer = useCallback(() => {
    if (pacerTimerRef.current) {
      clearInterval(pacerTimerRef.current);
      pacerTimerRef.current = null;
    }
  }, []);

  // Stop current speech and reset visual states
  const stop = useCallback(() => {
    stopPacer();
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
      } catch (e) {
        // ignore
      }
    }
    utteranceRef.current = null;
    window._activeVoiceUtterance = null;
    setIsSpeaking(false);
    setIsPaused(false);
    setActiveWordIndex(null);
  }, [stopPacer]);

  // Pause speaking
  const pause = useCallback(() => {
    stopPacer();
    if (typeof window !== 'undefined' && 'speechSynthesis' in window && isSpeaking && !isPaused) {
      try {
        window.speechSynthesis.pause();
      } catch (e) {
        // ignore
      }
      setIsPaused(true);
    }
  }, [isSpeaking, isPaused, stopPacer]);

  // Resume speaking
  const resume = useCallback(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window && isPaused) {
      try {
        window.speechSynthesis.resume();
      } catch (e) {
        // ignore
      }
      setIsPaused(false);
    }
  }, [isPaused]);

  // Find best local/natural English voice
  const getBestVoice = useCallback(() => {
    const list =
      voiceListRef.current.length > 0
        ? voiceListRef.current
        : typeof window !== 'undefined' && window.speechSynthesis
        ? window.speechSynthesis.getVoices()
        : [];
    if (!list || list.length === 0) return null;

    // 1. First priority: Friendly/Natural local voices
    const naturalVoice =
      list.find(
        (v) =>
          v.lang.startsWith('en') &&
          (v.name.includes('Natural') ||
            v.name.includes('Google') ||
            v.name.includes('Samantha') ||
            v.name.includes('David') ||
            v.name.includes('Jenny') ||
            v.name.includes('Aria') ||
            v.name.includes('Zira') ||
            v.name.includes('Daniel') ||
            v.name.includes('Karen'))
      ) ||
      list.find((v) => v.lang.startsWith('en-US')) ||
      list.find((v) => v.lang.startsWith('en')) ||
      list[0];

    return naturalVoice || null;
  }, []);

  // Start intelligent word pacer (fallback for engines that don't fire onboundary)
  const startWordPacer = useCallback((wordList) => {
    stopPacer();
    if (!wordList || wordList.length === 0) return;

    let currentIdx = 0;
    setActiveWordIndex(0);

    // Approximate reading time per word: ~240ms adjusted by length
    const intervalMs = Math.max(160, Math.round(260 / (rate || 1)));

    pacerTimerRef.current = setInterval(() => {
      // If native onboundary is firing, let onboundary take full priority
      if (boundaryFiredRef.current) {
        return;
      }

      currentIdx += 1;
      if (currentIdx < wordList.length) {
        setActiveWordIndex(currentIdx);
      } else {
        stopPacer();
      }
    }, intervalMs);
  }, [rate, stopPacer]);

  // Speak text with boundary word synchronization
  const speak = useCallback(
    (textToSpeak, { onEndCallback } = {}) => {
      if (!textToSpeak || typeof window === 'undefined' || !('speechSynthesis' in window)) {
        return;
      }

      if (isMutedRef.current) {
        return;
      }

      stopPacer();
      boundaryFiredRef.current = false;

      // Cancel previous utterance and unstick engine
      try {
        window.speechSynthesis.cancel();
        if (window.speechSynthesis.paused) {
          window.speechSynthesis.resume();
        }
      } catch (e) {
        // ignore
      }

      const parsedWords = parseTextWords(textToSpeak);
      wordsRef.current = parsedWords;
      setWords(parsedWords);
      setCurrentText(textToSpeak);
      setActiveWordIndex(null);

      const readableText = cleanTextForTTS(textToSpeak) || textToSpeak;
      const utterance = new SpeechSynthesisUtterance(readableText);
      utterance.lang = 'en-US';
      utterance.rate = rate;
      utterance.pitch = pitch;
      utterance.volume = 1.0;

      const voice = getBestVoice();
      if (voice) {
        utterance.voice = voice;
      }

      // 1. onstart
      utterance.onstart = () => {
        setIsSpeaking(true);
        setIsPaused(false);
        if (parsedWords.length > 0) {
          startWordPacer(parsedWords);
        }
      };

      // 2. onboundary (word detection)
      utterance.onboundary = (event) => {
        if (event.name === 'word' || !event.name) {
          boundaryFiredRef.current = true;
          const charIndex = event.charIndex;
          const currentList = wordsRef.current;
          if (!currentList || currentList.length === 0) return;

          const matchedIdx = currentList.findIndex((w, idx) => {
            if (charIndex >= w.start && charIndex <= w.end) return true;
            const next = currentList[idx + 1];
            if (next && charIndex >= w.start && charIndex < next.start) return true;
            return false;
          });

          if (matchedIdx !== -1) {
            setActiveWordIndex(matchedIdx);
          }
        }
      };

      // 3. onpause
      utterance.onpause = () => {
        setIsPaused(true);
        stopPacer();
      };

      // 4. onresume
      utterance.onresume = () => {
        setIsPaused(false);
      };

      // 5. onend
      utterance.onend = () => {
        stopPacer();
        setIsSpeaking(false);
        setIsPaused(false);
        setActiveWordIndex(null);
        utteranceRef.current = null;
        window._activeVoiceUtterance = null;
        if (onEndCallback) onEndCallback();
      };

      // 6. onerror
      utterance.onerror = (e) => {
        stopPacer();
        if (e.error !== 'interrupted' && e.error !== 'canceled') {
          console.warn('SpeechSynthesis error:', e.error);
        }
        setIsSpeaking(false);
        setIsPaused(false);
        setActiveWordIndex(null);
        utteranceRef.current = null;
        window._activeVoiceUtterance = null;
      };

      utteranceRef.current = utterance;
      window._activeVoiceUtterance = utterance;

      // Small async tick to guarantee Chrome cancel cycle has flushed
      setTimeout(() => {
        try {
          if (window.speechSynthesis.paused) {
            window.speechSynthesis.resume();
          }
          window.speechSynthesis.speak(utterance);
        } catch (err) {
          console.warn('speechSynthesis speak failed:', err);
          setIsSpeaking(false);
        }
      }, 40);
    },
    [rate, pitch, getBestVoice, startWordPacer, stopPacer]
  );

  // Replay current text
  const replay = useCallback(() => {
    if (currentText) {
      speak(currentText);
    }
  }, [currentText, speak]);

  // Toggle Mute / Stop
  const toggleMute = useCallback(() => {
    setIsMuted((prev) => {
      const next = !prev;
      if (next) {
        stop();
      }
      return next;
    });
  }, [stop]);

  // Speak short feedback without changing question text or words
  const speakFeedback = useCallback(
    (feedbackText) => {
      if (isMutedRef.current || !feedbackText || typeof window === 'undefined' || !('speechSynthesis' in window)) {
        return;
      }

      stopPacer();
      try {
        window.speechSynthesis.cancel();
        if (window.speechSynthesis.paused) {
          window.speechSynthesis.resume();
        }
      } catch (e) {
        // ignore
      }

      const cleanFeedback = cleanTextForTTS(feedbackText);
      const feedbackUtterance = new SpeechSynthesisUtterance(cleanFeedback);
      feedbackUtterance.lang = 'en-US';
      feedbackUtterance.rate = 1.0;
      feedbackUtterance.pitch = 1.15;
      feedbackUtterance.volume = 1.0;

      const voice = getBestVoice();
      if (voice) {
        feedbackUtterance.voice = voice;
      }

      feedbackUtterance.onstart = () => {
        setIsSpeaking(true);
      };
      feedbackUtterance.onend = () => {
        setIsSpeaking(false);
        setActiveWordIndex(null);
        utteranceRef.current = null;
        window._activeVoiceUtterance = null;
      };
      feedbackUtterance.onerror = () => {
        setIsSpeaking(false);
        setActiveWordIndex(null);
        utteranceRef.current = null;
        window._activeVoiceUtterance = null;
      };

      utteranceRef.current = feedbackUtterance;
      window._activeVoiceUtterance = feedbackUtterance;

      setTimeout(() => {
        try {
          if (window.speechSynthesis.paused) {
            window.speechSynthesis.resume();
          }
          window.speechSynthesis.speak(feedbackUtterance);
        } catch (e) {
          console.warn('feedback speech failed:', e);
        }
      }, 40);
    },
    [getBestVoice, stopPacer]
  );

  return {
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
    stop,
    toggleMute,
    speakFeedback
  };
};

export default useVoiceGuidance;
