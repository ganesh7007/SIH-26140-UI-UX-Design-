/**
 * TTS Service Layer (Text-to-Speech Engine Abstraction)
 * 
 * Provides an extensible interface so the platform can use the native
 * Web Speech API today and easily integrate Cloud/AI TTS in the future.
 */

export class ITTSService {
  speak(text, options = {}) {
    throw new Error('Method speak() must be implemented.');
  }
  pause() {
    throw new Error('Method pause() must be implemented.');
  }
  resume() {
    throw new Error('Method resume() must be implemented.');
  }
  stop() {
    throw new Error('Method stop() must be implemented.');
  }
  getVoices() {
    throw new Error('Method getVoices() must be implemented.');
  }
  isSupported() {
    throw new Error('Method isSupported() must be implemented.');
  }
}

/**
 * Native Browser Web Speech API Implementation of ITTSService
 */
export class BrowserTTSService extends ITTSService {
  constructor() {
    super();
    this.synth = typeof window !== 'undefined' && 'speechSynthesis' in window ? window.speechSynthesis : null;
    this.voices = [];
    this.defaultVoice = null;
    this.rate = 0.95;
    this.pitch = 1.0;
    this.volume = 1.0;
    this.lang = 'en-US';
    this._initialized = false;
    this._keepAliveTimer = null;

    if (this.synth) {
      this._initVoices();
      if (typeof window !== 'undefined' && window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = () => this._initVoices();
      }
    }
  }

  _initVoices() {
    if (!this.synth) return;
    try {
      const v = this.synth.getVoices();
      if (v && v.length > 0) {
        this.voices = v;
        this.defaultVoice = this._findBestEnglishVoice(v);
        this._initialized = true;
      }
    } catch (e) {
      console.warn('TTS voice initialization notice:', e);
    }
  }

  _findBestEnglishVoice(voices) {
    if (!voices || voices.length === 0) return null;

    // Preferred natural sounding English voices across platforms (Edge, Chrome, Mac, iOS, Windows)
    const preferredNames = [
      'Natural', 'Neural', 'Google US English', 'Google UK English Female',
      'Samantha', 'Daniel', 'Karen', 'Serena', 'Arthur', 'Jenny', 'Aria',
      'Microsoft David', 'Microsoft Zira', 'Microsoft Mark'
    ];

    for (const name of preferredNames) {
      const match = voices.find(
        (v) => v.name.toLowerCase().includes(name.toLowerCase()) && v.lang.startsWith('en')
      );
      if (match) return match;
    }

    // Fallback: any en-US or en voice
    const enUS = voices.find((v) => v.lang === 'en-US');
    if (enUS) return enUS;

    const enAny = voices.find((v) => v.lang.startsWith('en'));
    if (enAny) return enAny;

    return voices[0] || null;
  }

  isSupported() {
    return Boolean(this.synth && typeof window !== 'undefined' && 'SpeechSynthesisUtterance' in window);
  }

  getVoices() {
    if (this.voices.length === 0 && this.synth) {
      this._initVoices();
    }
    return this.voices.filter((v) => v.lang.startsWith('en'));
  }

  getDefaultVoice() {
    if (!this.defaultVoice) {
      this._initVoices();
    }
    return this.defaultVoice;
  }

  speak(text, options = {}) {
    if (!this.isSupported() || !text) {
      if (options.onError) options.onError(new Error('Speech synthesis not supported or empty text.'));
      return null;
    }

    try {
      // Cancel previous speech if needed
      this.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = options.lang || this.lang;
      utterance.rate = options.rate !== undefined ? options.rate : this.rate;
      utterance.pitch = options.pitch !== undefined ? options.pitch : this.pitch;
      utterance.volume = options.volume !== undefined ? options.volume : this.volume;

      // Voice assignment
      const voiceToUse = options.voice || this.defaultVoice || this._findBestEnglishVoice(this.voices);
      if (voiceToUse) {
        utterance.voice = voiceToUse;
      }

      // Event Listeners
      if (options.onStart) utterance.onstart = (e) => options.onStart(e);
      if (options.onEnd) {
        utterance.onend = (e) => {
          this._clearKeepAlive();
          options.onEnd(e);
        };
      }
      if (options.onError) {
        utterance.onerror = (e) => {
          this._clearKeepAlive();
          if (e.error !== 'canceled' && e.error !== 'interrupted') {
            options.onError(e);
          }
        };
      }
      if (options.onPause) utterance.onpause = (e) => options.onPause(e);
      if (options.onResume) utterance.onresume = (e) => options.onResume(e);
      if (options.onBoundary) utterance.onboundary = (e) => options.onBoundary(e);

      // Start keep-alive (prevents Chrome browser 15-second utterance timeout bug)
      this._startKeepAlive();

      this.synth.speak(utterance);
      return utterance;
    } catch (err) {
      console.warn('TTS speech execution error:', err);
      if (options.onError) options.onError(err);
      return null;
    }
  }

  pause() {
    if (this.synth && this.synth.speaking) {
      try {
        this.synth.pause();
      } catch (e) {
        console.warn('TTS pause notice:', e);
      }
    }
  }

  resume() {
    if (this.synth && this.synth.paused) {
      try {
        this.synth.resume();
      } catch (e) {
        console.warn('TTS resume notice:', e);
      }
    }
  }

  stop() {
    this.cancel();
  }

  cancel() {
    this._clearKeepAlive();
    if (this.synth) {
      try {
        this.synth.cancel();
      } catch (e) {
        console.warn('TTS cancel notice:', e);
      }
    }
  }

  _startKeepAlive() {
    this._clearKeepAlive();
    this._keepAliveTimer = setInterval(() => {
      if (this.synth && this.synth.speaking && !this.synth.paused) {
        try {
          this.synth.pause();
          this.synth.resume();
        } catch (e) {
          // ignore
        }
      }
    }, 10000);
  }

  _clearKeepAlive() {
    if (this._keepAliveTimer) {
      clearInterval(this._keepAliveTimer);
      this._keepAliveTimer = null;
    }
  }
}

// Export singleton instance for global use
export const browserTTS = new BrowserTTSService();
