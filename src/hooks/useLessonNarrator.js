import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { browserTTS } from '../services/ttsService';
import { formatForNarration, splitIntoSentences } from '../utils/quantumTTSDictionary';

/**
 * useLessonNarrator
 * 
 * Production-ready React hook for Duolingo-style sentence-by-sentence
 * voice narration. Speaks once upon entering a section and provides
 * a clean toggle (Speak / Mute) with zero looping.
 */
export const useLessonNarrator = ({
  sections = [],
  sectionKey = '',
  autoPlay = true,
  defaultRate = 0.95,
  defaultPitch = 1.0,
  onAllCompleted
} = {}) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const [rate, setRate] = useState(defaultRate);
  const [pitch, setPitch] = useState(defaultPitch);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [isSupported, setIsSupported] = useState(false);

  const currentIndexRef = useRef(0);
  const isPlayingRef = useRef(false);
  const isPausedRef = useRef(false);
  const rateRef = useRef(rate);
  const voiceRef = useRef(selectedVoice);
  const sentencesRef = useRef([]);
  const lastSpokenKeyRef = useRef(null);

  // Flatten and normalize input sections into discrete sentence items
  const sentenceQueue = useMemo(() => {
    if (!Array.isArray(sections) || sections.length === 0) return [];

    const queue = [];
    sections.forEach((sec, sIdx) => {
      if (!sec) return;

      // Direct string section
      if (typeof sec === 'string') {
        const sentences = splitIntoSentences(sec);
        sentences.forEach((s, idx) => {
          queue.push({
            id: `sec-${sIdx}-s-${idx}`,
            sectionId: `sec-${sIdx}`,
            visualText: s,
            spokenText: formatForNarration(s)
          });
        });
        return;
      }

      // Object section with visualText / narrationText
      const visual = sec.visualText || sec.text || sec.title || '';
      const customNarration = sec.narrationText || sec.spokenText;

      if (customNarration) {
        queue.push({
          id: sec.id || `sec-${sIdx}`,
          sectionId: sec.sectionId || sec.id || `sec-${sIdx}`,
          visualText: visual || customNarration,
          spokenText: formatForNarration(visual, customNarration)
        });
      } else if (visual) {
        const sentences = splitIntoSentences(visual);
        sentences.forEach((s, idx) => {
          queue.push({
            id: `${sec.id || `sec-${sIdx}`}-s-${idx}`,
            sectionId: sec.id || `sec-${sIdx}`,
            visualText: s,
            spokenText: formatForNarration(s)
          });
        });
      }
    });

    return queue;
  }, [sections]);

  useEffect(() => {
    sentencesRef.current = sentenceQueue;
  }, [sentenceQueue]);

  useEffect(() => {
    rateRef.current = rate;
  }, [rate]);

  useEffect(() => {
    voiceRef.current = selectedVoice;
  }, [selectedVoice]);

  // Load available voices
  useEffect(() => {
    const supported = browserTTS.isSupported();
    setIsSupported(supported);

    if (supported) {
      const v = browserTTS.getVoices();
      setVoices(v);
      const best = browserTTS.getDefaultVoice();
      setSelectedVoice(best);
      voiceRef.current = best;
    }
  }, []);

  // Internal sentence speech speaker
  const speakSentenceAt = useCallback((index) => {
    const queue = sentencesRef.current;
    if (!queue || index < 0 || index >= queue.length) {
      setIsSpeaking(false);
      setIsPaused(false);
      setIsCompleted(true);
      isPlayingRef.current = false;
      if (onAllCompleted) onAllCompleted();
      return;
    }

    const item = queue[index];
    if (!item || !item.spokenText) {
      speakSentenceAt(index + 1);
      return;
    }

    currentIndexRef.current = index;
    setCurrentSentenceIndex(index);
    setIsSpeaking(true);
    setIsPaused(false);
    setIsCompleted(false);
    isPlayingRef.current = true;
    isPausedRef.current = false;

    browserTTS.speak(item.spokenText, {
      rate: rateRef.current,
      pitch: defaultPitch,
      voice: voiceRef.current,
      onStart: () => {
        setIsSpeaking(true);
        setIsPaused(false);
        setAutoplayBlocked(false);
      },
      onEnd: () => {
        if (!isPlayingRef.current) return;
        const nextIdx = currentIndexRef.current + 1;
        if (nextIdx < sentencesRef.current.length) {
          // Natural 120ms pause between sentences
          setTimeout(() => {
            if (isPlayingRef.current && !isPausedRef.current) {
              speakSentenceAt(nextIdx);
            }
          }, 120);
        } else {
          // Finished all sentences for this section: stop completely!
          setIsSpeaking(false);
          setIsPaused(false);
          setIsCompleted(true);
          isPlayingRef.current = false;
          if (onAllCompleted) onAllCompleted();
        }
      },
      onError: (err) => {
        console.warn('Speech error on sentence:', item.id, err);
        if (err?.error === 'not-allowed') {
          setAutoplayBlocked(true);
        }
        setIsSpeaking(false);
        isPlayingRef.current = false;
      }
    });
  }, [defaultPitch, onAllCompleted]);

  // Stop / Mute Narration
  const stop = useCallback(() => {
    browserTTS.cancel();
    setIsSpeaking(false);
    setIsPaused(false);
    isPlayingRef.current = false;
    isPausedRef.current = false;
  }, []);

  // Play / Start Narration (Once)
  const play = useCallback(() => {
    setAutoplayBlocked(false);
    stop();
    currentIndexRef.current = 0;
    setCurrentSentenceIndex(0);
    setIsCompleted(false);
    setTimeout(() => {
      speakSentenceAt(0);
    }, 40);
  }, [stop, speakSentenceAt]);

  // Replay from beginning
  const replay = useCallback(() => {
    play();
  }, [play]);

  // Toggle Speak / Mute
  const toggle = useCallback(() => {
    if (isPlayingRef.current || isSpeaking) {
      stop();
    } else {
      play();
    }
  }, [isSpeaking, stop, play]);

  // Auto-play when section key changes (ONLY ONCE per section, no looping!)
  const effectiveKey = sectionKey || sentenceQueue.map((s) => s.id).join('|');

  useEffect(() => {
    if (!effectiveKey || sentenceQueue.length === 0) return;

    // Check if this is a new section that has not yet been spoken
    if (lastSpokenKeyRef.current !== effectiveKey) {
      lastSpokenKeyRef.current = effectiveKey;
      stop();
      currentIndexRef.current = 0;
      setCurrentSentenceIndex(0);
      setIsCompleted(false);

      let timer;
      if (autoPlay && isSupported) {
        timer = setTimeout(() => {
          try {
            speakSentenceAt(0);
          } catch (e) {
            setAutoplayBlocked(true);
          }
        }, 200);
      }

      return () => {
        if (timer) clearTimeout(timer);
        browserTTS.cancel();
        isPlayingRef.current = false;
        isPausedRef.current = false;
      };
    }
  }, [effectiveKey, sentenceQueue.length, autoPlay, isSupported, speakSentenceAt, stop]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      browserTTS.cancel();
      isPlayingRef.current = false;
      isPausedRef.current = false;
    };
  }, []);

  const activeSentence = sentenceQueue[currentSentenceIndex] || null;
  const activeSentenceId = isSpeaking ? activeSentence?.id : null;

  return {
    isSupported,
    isSpeaking,
    isPaused,
    isReady: !isSpeaking && !isPaused && !isCompleted,
    isCompleted,
    currentSentenceIndex,
    activeSentence,
    activeSentenceId,
    sentenceQueue,
    rate,
    voices,
    selectedVoice,
    autoplayBlocked,
    // Actions
    play,
    stop,
    replay,
    toggle
  };
};
