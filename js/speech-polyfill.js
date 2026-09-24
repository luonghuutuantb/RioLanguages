/**
 * EngMaster Android SpeechRecognition Polyfill
 * Bridges the standard W3C Web Speech API (SpeechRecognition) to Native Android SpeechRecognizer
 * Enables seamless voice input in Android WebView where window.SpeechRecognition is not natively supported.
 */

(function () {
  const NativeSpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  class AndroidSpeechRecognitionPolyfill {
    constructor() {
      this.continuous = false;
      this.interimResults = false;
      this.lang = 'en-US';
      this.maxAlternatives = 1;

      // Event handlers
      this.onstart = null;
      this.onaudiostart = null;
      this.onspeechstart = null;
      this.onspeechend = null;
      this.onaudioend = null;
      this.onresult = null;
      this.onerror = null;
      this.onend = null;

      this._isListening = false;
      this._nativeInstance = null;
      this._listeners = {};
    }

    addEventListener(type, callback) {
      if (!this._listeners[type]) {
        this._listeners[type] = [];
      }
      this._listeners[type].push(callback);
    }

    removeEventListener(type, callback) {
      if (!this._listeners[type]) return;
      this._listeners[type] = this._listeners[type].filter(cb => cb !== callback);
    }

    _dispatchEvent(type, eventObj = {}) {
      // Direct property callback (e.g. this.onresult)
      const propHandler = this['on' + type];
      if (typeof propHandler === 'function') {
        try {
          propHandler.call(this, eventObj);
        } catch (err) {
          console.error(`[SpeechPolyfill] Error in on${type} handler:`, err);
        }
      }

      // addEventListener callbacks
      if (this._listeners[type]) {
        this._listeners[type].forEach(cb => {
          try {
            cb.call(this, eventObj);
          } catch (err) {
            console.error(`[SpeechPolyfill] Error in ${type} event listener:`, err);
          }
        });
      }
    }

    start() {
      // 1. If running inside Android APK with native AndroidSpeech bridge:
      if (window.AndroidSpeech && typeof window.AndroidSpeech.startListening === 'function') {
        if (window.audioCtrl && typeof window.audioCtrl.stop === 'function') {
          window.audioCtrl.stop();
        }

        window._activeSpeechInstance = this;
        this._isListening = true;

        const langToUse = this.lang || 'en-US';
        console.log('[SpeechPolyfill] Starting Android Native SpeechRecognizer with lang:', langToUse);
        try {
          window.AndroidSpeech.startListening(langToUse);
        } catch (e) {
          console.error('[SpeechPolyfill] Failed to invoke AndroidSpeech.startListening:', e);
          this._isListening = false;
          this._dispatchEvent('error', { error: 'audio-capture', message: e.message });
          this._dispatchEvent('end');
        }
        return;
      }

      // 2. Fallback to native browser SpeechRecognition if available (Chrome / Edge on desktop)
      if (NativeSpeechRecognition) {
        if (!this._nativeInstance) {
          this._nativeInstance = new NativeSpeechRecognition();
          this._bindNativeEvents();
        }
        this._nativeInstance.continuous = this.continuous;
        this._nativeInstance.interimResults = this.interimResults;
        this._nativeInstance.lang = this.lang || 'en-US';
        this._isListening = true;
        try {
          this._nativeInstance.start();
        } catch (e) {
          console.warn('[SpeechPolyfill] NativeSpeech start warning:', e);
        }
        return;
      }

      // 3. Neither supported
      console.warn('[SpeechPolyfill] Speech recognition is not available in this environment.');
      if (window.app && typeof window.app.showToast === 'function') {
        window.app.showToast('Microphone chưa sẵn sàng hoặc trình duyệt chưa hỗ trợ.', 'warning');
      }
      this._dispatchEvent('error', { error: 'not-allowed', message: 'Speech recognition not available' });
      this._dispatchEvent('end');
    }

    stop() {
      this._isListening = false;
      if (this._endTimeout) {
        clearTimeout(this._endTimeout);
        this._endTimeout = null;
      }
      if (window.AndroidSpeech && typeof window.AndroidSpeech.stopListening === 'function') {
        try {
          window.AndroidSpeech.stopListening();
        } catch (e) {
          console.warn('[SpeechPolyfill] Error stopping AndroidSpeech:', e);
        }
      } else if (this._nativeInstance) {
        try {
          this._nativeInstance.stop();
        } catch (e) {}
      }
    }

    abort() {
      this._isListening = false;
      if (this._endTimeout) {
        clearTimeout(this._endTimeout);
        this._endTimeout = null;
      }
      if (window.AndroidSpeech && typeof window.AndroidSpeech.cancelListening === 'function') {
        try {
          window.AndroidSpeech.cancelListening();
        } catch (e) {
          console.warn('[SpeechPolyfill] Error canceling AndroidSpeech:', e);
        }
      } else if (this._nativeInstance) {
        try {
          this._nativeInstance.abort();
        } catch (e) {}
      }
      this._dispatchEvent('end');
    }

    _bindNativeEvents() {
      if (!this._nativeInstance) return;
      this._nativeInstance.onstart = (e) => this._dispatchEvent('start', e);
      this._nativeInstance.onaudiostart = (e) => this._dispatchEvent('audiostart', e);
      this._nativeInstance.onspeechstart = (e) => this._dispatchEvent('speechstart', e);
      this._nativeInstance.onspeechend = (e) => this._dispatchEvent('speechend', e);
      this._nativeInstance.onaudioend = (e) => this._dispatchEvent('audioend', e);
      this._nativeInstance.onresult = (e) => this._dispatchEvent('result', e);
      this._nativeInstance.onerror = (e) => {
        this._isListening = false;
        this._dispatchEvent('error', e);
      };
      this._nativeInstance.onend = (e) => {
        this._isListening = false;
        this._dispatchEvent('end', e);
      };
    }
  }

  // Global callbacks invoked by MainActivity.java via evaluateJavascript
  window._onAndroidSpeechStart = function () {
    const inst = window._activeSpeechInstance;
    if (inst) {
      inst._isListening = true;
      inst._dispatchEvent('start');
      inst._dispatchEvent('audiostart');
    }
  };

  window._onAndroidSpeechBeginning = function () {
    const inst = window._activeSpeechInstance;
    if (inst) {
      inst._dispatchEvent('speechstart');
    }
  };

  window._onAndroidSpeechRms = function (rmsdB) {
    window._currentMicRms = rmsdB;
    // Animate mic pulse if element is present
    const pulseEl = document.querySelector('.mic-wave-pulse');
    if (pulseEl) {
      const scale = Math.max(1, Math.min(2.0, 1.0 + (rmsdB / 12.0)));
      pulseEl.style.transform = `scale(${scale})`;
    }
  };

  window._onAndroidSpeechResult = function (text, isFinal) {
    const inst = window._activeSpeechInstance;
    if (!inst) return;

    const transcript = (text || '').trim();
    if (transcript) {
      // Build standard W3C SpeechRecognitionEvent results structure
      const alternative = { transcript: transcript, confidence: 0.95 };
      const resultItem = [alternative];
      resultItem.isFinal = Boolean(isFinal);
      resultItem.length = 1;

      const results = [resultItem];
      results.resultIndex = 0;
      results.length = 1;

      const event = {
        results: results,
        resultIndex: 0,
        interpretation: transcript
      };

      inst._dispatchEvent('result', event);
    }

    if (isFinal) {
      if (inst._endTimeout) {
        clearTimeout(inst._endTimeout);
        inst._endTimeout = null;
      }
      setTimeout(() => {
        if (inst && inst._isListening) {
          inst._isListening = false;
          inst._dispatchEvent('end');
        }
      }, 50);
    }
  };

  window._onAndroidSpeechError = function (errorStr) {
    const inst = window._activeSpeechInstance;
    if (inst) {
      if (inst._endTimeout) {
        clearTimeout(inst._endTimeout);
        inst._endTimeout = null;
      }
      inst._isListening = false;
      inst._dispatchEvent('error', { error: errorStr || 'aborted' });
      inst._dispatchEvent('end');
    }
  };

  window._onAndroidSpeechEnd = function () {
    const inst = window._activeSpeechInstance;
    if (inst) {
      inst._dispatchEvent('speechend');
      inst._dispatchEvent('audioend');
      // Do not dispatch 'end' immediately because Android SpeechRecognizer emits onResults right after onEndOfSpeech.
      // Set a grace timer in case no result or error follows.
      if (inst._endTimeout) clearTimeout(inst._endTimeout);
      inst._endTimeout = setTimeout(() => {
        if (inst._isListening) {
          inst._isListening = false;
          inst._dispatchEvent('end');
        }
      }, 700);
    }
  };

  window._onAndroidPermissionResult = function (permission, granted) {
    console.log(`[SpeechPolyfill] Android permission ${permission}: ${granted}`);
    if (permission === 'RECORD_AUDIO') {
      if (granted) {
        if (window.app && typeof window.app.showToast === 'function') {
          window.app.showToast('Đã cấp quyền Micro! Bạn có thể bấm Micro để nói.', 'success');
        }
      } else {
        if (window.app && typeof window.app.showToast === 'function') {
          window.app.showToast('Ứng dụng cần quyền Micro để nhận diện giọng nói. Vui lòng cho phép trong Cài đặt.', 'warning');
        }
      }
    }
  };

  // Expose polyfill: Always use AndroidSpeechRecognitionPolyfill if Android native bridge is present
  // If running in browser and webkitSpeechRecognition exists, expose standard SpeechRecognition
  if (window.AndroidSpeech) {
    window.SpeechRecognition = AndroidSpeechRecognitionPolyfill;
    window.webkitSpeechRecognition = AndroidSpeechRecognitionPolyfill;
    console.log('[EngMaster] Native Android SpeechRecognition bridge registered successfully.');
  } else if (!window.SpeechRecognition && window.webkitSpeechRecognition) {
    window.SpeechRecognition = window.webkitSpeechRecognition;
    console.log('[EngMaster] Native webkitSpeechRecognition mapped to SpeechRecognition.');
  } else if (!window.SpeechRecognition) {
    window.SpeechRecognition = AndroidSpeechRecognitionPolyfill;
    window.webkitSpeechRecognition = AndroidSpeechRecognitionPolyfill;
    console.log('[EngMaster] SpeechRecognition fallback polyfill registered.');
  }
})();
