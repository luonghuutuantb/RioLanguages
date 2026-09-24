/**
 * EngMaster Audio & Speech Module
 * Handles Web Speech API text-to-speech and speech recognition for pronunciation
 */

class AudioController {
  constructor() {
    this.synth = window.speechSynthesis;
    this.voices = [];
    this.rate = window.storage.settings.voiceRate || 1.0;
    this.lang = window.storage.settings.voiceLang || 'en-US';
    this.recognition = null;
    this.isRecording = false;

    this._initVoices();
    this._initRecognition();
  }

  _initVoices() {
    if (!this.synth) return;
    const updateVoices = () => {
      this.voices = this.synth.getVoices();
    };
    updateVoices();
    if (this.synth.onvoiceschanged !== undefined) {
      this.synth.onvoiceschanged = updateVoices;
    }
  }

  _initRecognition() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = false;
      this.recognition.interimResults = false;
      this.recognition.lang = 'en-US';
    }
  }

  setRate(rate) {
    this.rate = parseFloat(rate) || 1.0;
    window.storage.saveSettings({ voiceRate: this.rate });
  }

  setLang(lang) {
    this.lang = lang;
    window.storage.saveSettings({ voiceLang: this.lang });
  }

  /**
   * Stop all ongoing speech / audio
   */
  stop() {
    if (this._safetyTimer) {
      clearTimeout(this._safetyTimer);
      this._safetyTimer = null;
    }
    // Cancel any pending clause micro-pause timer
    if (this._clauseTimer) {
      clearTimeout(this._clauseTimer);
      this._clauseTimer = null;
    }
    this._stopped = true; // signal clause chain to halt
    // 1. Android Native TTS
    if (window.AndroidTTS && typeof window.AndroidTTS.stop === 'function') {
      try { window.AndroidTTS.stop(); } catch (e) {}
    }
    // 2. Web Speech API
    if (this.synth) {
      try {
        this.synth.cancel();
      } catch (e) {}
    }
    this.currentUtterance = null;
    // 3. HTML5 Audio fallback
    if (this.currentAudio) {
      try {
        this.currentAudio.pause();
        this.currentAudio = null;
      } catch (e) {}
    }
  }

  /**
   * Speak English text with native pronunciation
   * Priority: Android Native TTS -> Web Speech API -> Online Multi-CDN Audio Fallback
   */
  speak(text, onEnd, options = {}) {
    // Strip emojis, markdown symbols, and excess whitespace for clean pronunciation
    const cleanText = (text || '')
      .replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FAFF}]/gu, '')
      .replace(/[*_~`#>[\]()]/g, '')
      .replace(/\s+/g, ' ')
      .trim();

    if (!cleanText) {
      if (typeof onEnd === 'function') onEnd();
      return;
    }

    if (window.storage && typeof window.storage.incrementListening === 'function') {
      window.storage.incrementListening();
    }

    // Stop current audio before speaking new text
    this.stop();
    this._stopped = false; // reset stop flag for new utterance

    const effectiveRate = (options && typeof options.rate === 'number') ? options.rate : (this.rate || 1.0);
    const gender = options && options.gender ? String(options.gender).toLowerCase() : null;

    let callbackCalled = false;
    const safeOnEnd = () => {
      if (callbackCalled) return;
      callbackCalled = true;
      if (this._safetyTimer) {
        clearTimeout(this._safetyTimer);
        this._safetyTimer = null;
      }
      this.currentUtterance = null;
      if (typeof onEnd === 'function') {
        onEnd();
      }
    };

    // Strategy 1: Android Native TTS Bridge (runs inside APK)
    if (window.AndroidTTS && typeof window.AndroidTTS.speak === 'function') {
      try {
        const handled = window.AndroidTTS.speak(cleanText, this.lang || 'en-US', effectiveRate);
        // If handled successfully by native Android TTS or MediaPlayer
        if (handled !== false) {
          const words = cleanText.split(/\s+/).length;
          const estMs = Math.max(1200, (words / (2.0 * effectiveRate)) * 1000);
          this._safetyTimer = setTimeout(safeOnEnd, estMs);
          return;
        }
      } catch (e) {
        console.warn('AndroidTTS error, falling back to web/online audio:', e);
      }
    }

    // Strategy 2: Web Speech API (Desktop Chrome, Edge, Safari)
    if (this.synth && window.speechSynthesis) {
      try {
        if (this.synth.paused) {
          try { this.synth.resume(); } catch(err) {}
        }

        const isChinese = (options && (options.lang === 'zh-CN' || options.lang === 'zh')) || /[\u4e00-\u9fa5]/.test(cleanText);
        const targetLang = isChinese ? 'zh-CN' : ((options && options.lang) ? options.lang : (this.lang || 'en-US'));

        // --- Voice selection: prefer neural/high-quality voices ---
        const pickVoice = (lang, genderHint) => {
          if (this.voices.length === 0) return null;
          if (isChinese) {
            const zhVoices = this.voices.filter(v => v.lang && v.lang.toLowerCase().startsWith('zh'));
            return zhVoices.find(v => /xiaoxiao|yunxi|huihui|yaoyao|kangkang|google.*zh/i.test(v.name)) || zhVoices[0] || null;
          }
          const enVoices = this.voices.filter(v => v.lang && v.lang.toLowerCase().startsWith('en'));
          // Priority 1: Microsoft Neural voices (Edge / Windows TTS)
          const neuralVoice = enVoices.find(v =>
            /microsoft.*(jenny|aria|ana|guy|eric|andrew|brian|ryan|emma|jane|amber|ashley|brandon|christopher|cora|davis|elizabeth|jacob|jason|jason|liam|michelle|monica|nancy|roger|sara|steffan|tony|william|ava|allison|samantha|oliver|nicky|moira|karen|tessa|joanna|salli|kendra|kimberly|ivy|joanna|justin|joey|matthew|russell)/i.test(v.name)
          );
          if (neuralVoice) return neuralVoice;
          // Priority 2: Google voices
          const googleVoice = enVoices.find(v => /google/i.test(v.name) && v.lang.toLowerCase().startsWith('en'));
          if (googleVoice) return googleVoice;
          // Priority 3: Gender-specific fallback
          if (genderHint === 'female') {
            return enVoices.find(v => /female|zira|jenny|samantha|victoria|karen|susan|cynthia/i.test(v.name)) ||
                   enVoices.find(v => v.lang === lang) || enVoices[0];
          } else if (genderHint === 'male') {
            return enVoices.find(v => /male|david|mark|guy|james|george|alex|daniel/i.test(v.name)) ||
                   enVoices.find(v => v.lang === lang) || enVoices[0];
          }
          return enVoices.find(v => v.lang === lang) || enVoices[0] || null;
        };

        // --- Prosody: sentence-type aware pitch and rate ---
        const basePitch = (options && typeof options.pitch === 'number') ? options.pitch : 1.0;
        const isQuestion = /\?\s*$/.test(cleanText);
        const isExclamation = /!\s*$/.test(cleanText);

        // --- Natural chunking: split into clauses for rhythm ---
        // Split on sentence-ending punctuation but keep the delimiter
        const splitClauses = (text) => {
          const raw = text.split(/(?<=[.!?,;:])\s+/);
          // Merge very short fragments with next
          const merged = [];
          let buf = '';
          for (const part of raw) {
            buf += (buf ? ' ' : '') + part;
            if (buf.split(/\s+/).length >= 3 || /[.!?]$/.test(buf.trim())) {
              merged.push(buf.trim());
              buf = '';
            }
          }
          if (buf.trim()) merged.push(buf.trim());
          return merged.length > 0 ? merged : [text];
        };

        const clauses = isChinese ? [cleanText] : splitClauses(cleanText);
        const totalWords = cleanText.split(/\s+/).length;
        const maxWaitMs = Math.max(5000, ((totalWords / (1.2 * effectiveRate)) * 1000) + 4000);
        this._safetyTimer = setTimeout(safeOnEnd, maxWaitMs);

        // Speak clauses sequentially with natural micro-pauses
        const speakClauses = (index) => {
          if (index >= clauses.length) {
            safeOnEnd();
            return;
          }
          const clause = clauses[index];
          const isLastClause = (index === clauses.length - 1);

          const utt = new SpeechSynthesisUtterance(clause);
          utt.lang = targetLang;
          utt.rate = effectiveRate * (isLastClause && isQuestion ? 0.95 : isLastClause ? 0.97 : 1.0);

          // Pitch: questions rise, exclamations lift, statements natural
          const clauseIsQuestion = /\?\s*$/.test(clause);
          const clauseIsExcl = /!\s*$/.test(clause);
          utt.pitch = basePitch +
            (clauseIsQuestion ? 0.12 : 0) +
            (clauseIsExcl ? 0.08 : 0) +
            // Tiny natural jitter (±0.04) for liveliness
            ((Math.random() - 0.5) * 0.08);

          const chosenVoice = pickVoice(targetLang, gender);
          if (chosenVoice) utt.voice = chosenVoice;

          utt.onend = () => {
            if (!this._stopped && index < clauses.length - 1) {
              // Natural micro-pause between clauses (80–180 ms)
              const pauseMs = 80 + Math.random() * 100;
              this._clauseTimer = setTimeout(() => speakClauses(index + 1), pauseMs);
            } else {
              safeOnEnd();
            }
          };
          utt.onerror = (e) => {
            if (e.error !== 'interrupted' && e.error !== 'canceled') {
              console.warn('Utterance error:', e.error);
            }
            safeOnEnd();
          };

          this.currentUtterance = utt;
          this.synth.speak(utt);
        };

        speakClauses(0);
        return;
      } catch (e) {
        console.warn('Web Speech API error, falling back to online audio:', e);
      }
    }

    // Strategy 3: Multi-tier Online Audio Fallback
    this._fallbackOnlineAudio(cleanText, safeOnEnd, options);
  }

  /**
   * Fallback online high-fidelity native English audio stream
   * Tier 1: Youdao Native Pronunciation CDN (Fast, crystal-clear MP3, US/UK)
   * Tier 2: Google Translate TTS CDN
   */
  _fallbackOnlineAudio(text, onEnd, options = {}) {
    try {
      const isChinese = (options && (options.lang === 'zh-CN' || options.lang === 'zh')) || /[\u4e00-\u9fa5]/.test(text);
      const langCode = isChinese ? 'zh-CN' : ((this.lang === 'en-GB') ? 'en-GB' : 'en');
      const encoded = encodeURIComponent(text);
      const youdaoType = (langCode === 'en-GB') ? 1 : 2;
      const youdaoUrl = isChinese
        ? `https://dict.youdao.com/dictvoice?audio=${encoded}&le=zh`
        : `https://dict.youdao.com/dictvoice?audio=${encoded}&type=${youdaoType}`;
      const googleUrl = `https://translate.google.com/translate_tts?ie=UTF-8&tl=${langCode}&client=tw-ob&q=${encoded}`;

      const effectiveRate = (options && typeof options.rate === 'number') ? options.rate : (this.rate || 1.0);
      let finished = false;
      const handleDone = () => {
        if (finished) return;
        finished = true;
        if (typeof onEnd === 'function') onEnd();
      };

      const primaryAudio = new Audio(youdaoUrl);
      primaryAudio.playbackRate = effectiveRate;
      this.currentAudio = primaryAudio;

      primaryAudio.onended = handleDone;
      primaryAudio.onerror = () => {
        // Failover to secondary Google TTS stream
        try {
          const fallbackAudio = new Audio(googleUrl);
          fallbackAudio.playbackRate = effectiveRate;
          this.currentAudio = fallbackAudio;
          fallbackAudio.onended = handleDone;
          fallbackAudio.onerror = handleDone;
          fallbackAudio.play().catch(handleDone);
        } catch(e) {
          handleDone();
        }
      };

      const p = primaryAudio.play();
      if (p !== undefined) {
        p.catch(() => {
          // If browser prevented autoplay or network failed, try fallback stream
          try {
            const fallbackAudio = new Audio(googleUrl);
            fallbackAudio.playbackRate = effectiveRate;
            this.currentAudio = fallbackAudio;
            fallbackAudio.onended = handleDone;
            fallbackAudio.onerror = handleDone;
            fallbackAudio.play().catch(handleDone);
          } catch(e) {
            handleDone();
          }
        });
      }
    } catch (err) {
      console.warn('Fallback online TTS error:', err);
      if (typeof onEnd === 'function') onEnd();
    }
  }

  /**
   * Play simple feedback tone for correct / wrong answers
   */
  playTone(type) {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === 'correct') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
        osc.frequency.setValueAtTime(880, ctx.currentTime + 0.08); // A5
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
        osc.start();
        osc.stop(ctx.currentTime + 0.3);
      } else {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(220, ctx.currentTime); // A3
        osc.frequency.setValueAtTime(164.81, ctx.currentTime + 0.1); // E3
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.35);
        osc.start();
        osc.stop(ctx.currentTime + 0.35);
      }
    } catch (e) {}
  }

  /**
   * Sound effect for answering correctly / earning XP
   */
  playSuccessSound() {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
      osc.frequency.setValueAtTime(880, ctx.currentTime + 0.1); // A5
      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.35);
      osc.start();
      osc.stop(ctx.currentTime + 0.35);
    } catch(e) {}
  }

  /**
   * Listen for user speech via microphone
   */
  startListening(targetPhrase, onResult, onError, options = {}) {
    if (!this.recognition) {
      if (onError) onError('Trình duyệt của bạn chưa hỗ trợ nhận diện giọng nói qua Micro. Hãy thử trên Google Chrome hoặc Edge.');
      return;
    }

    const isChinese = (options && (options.lang === 'zh-CN' || options.lang === 'zh')) || /[\u4e00-\u9fa5]/.test(targetPhrase || '');
    this.recognition.lang = isChinese ? 'zh-CN' : ((options && options.lang) ? options.lang : 'en-US');

    if (this.isRecording) {
      this.recognition.stop();
      this.isRecording = false;
      return;
    }

    this.isRecording = true;

    this.recognition.onresult = (event) => {
      this.isRecording = false;
      const transcript = event.results[0][0].transcript.trim();
      const confidence = event.results[0][0].confidence;
      const similarity = this.calculateSimilarity(transcript, targetPhrase);

      if (onResult) {
        onResult({
          transcript: transcript,
          confidence: confidence,
          similarity: similarity
        });
      }
    };

    this.recognition.onerror = (event) => {
      this.isRecording = false;
      console.warn('Speech recognition error:', event.error);
      if (onError) onError(`Lỗi micro: ${event.error}. Vui lòng cấp quyền truy cập micro.`);
    };

    this.recognition.onend = () => {
      this.isRecording = false;
    };

    try {
      this.recognition.start();
    } catch (e) {
      this.isRecording = false;
      if (onError) onError('Không thể khởi động micro.');
    }
  }

  stopListening() {
    if (this.recognition && this.isRecording) {
      this.recognition.stop();
      this.isRecording = false;
    }
  }

  /**
   * Levenshtein Distance & Token Match Similarity
   */
  calculateSimilarity(str1, str2) {
    const s1 = str1.toLowerCase().replace(/[^a-z0-9 ]/g, '').trim();
    const s2 = str2.toLowerCase().replace(/[^a-z0-9 ]/g, '').trim();

    if (s1 === s2) return 100;
    if (!s1 || !s2) return 0;

    const track = Array(s2.length + 1).fill(null).map(() =>
      Array(s1.length + 1).fill(null));

    for (let i = 0; i <= s1.length; i += 1) track[0][i] = i;
    for (let j = 0; j <= s2.length; j += 1) track[j][0] = j;

    for (let j = 1; j <= s2.length; j += 1) {
      for (let i = 1; i <= s1.length; i += 1) {
        const indicator = s1[i - 1] === s2[j - 1] ? 0 : 1;
        track[j][i] = Math.min(
          track[j][i - 1] + 1, // deletion
          track[j - 1][i] + 1, // insertion
          track[j - 1][i - 1] + indicator // substitution
        );
      }
    }

    const distance = track[s2.length][s1.length];
    const maxLen = Math.max(s1.length, s2.length);
    const score = Math.round(((maxLen - distance) / maxLen) * 100);
    return Math.max(0, Math.min(100, score));
  }
}

window.audioCtrl = new AudioController();
