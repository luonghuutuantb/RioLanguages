/**
 * =========================================================================
 * Rio Chinese - View Controller (js/chinese-view.js)
 * Manages Pinyin Chart, Strokes & Radicals, 600+ HSK Vocab, 300+ Phrases,
 * 3D Flashcard SRS, Tone Ear-Training Quiz & Voice Practice in Mandarin.
 * =========================================================================
 */

class ChineseViewController {
  constructor() {
    this.activeSubTab = 'pinyin';
    this.activePracticeTab = 'flashcard';

    // Filters
    this.activeVocabTopic = 'all';
    this.activeVocabLevel = 'all';
    this.vocabSearch = '';
    this.vocabBookmarkOnly = false;

    this.activePhraseTopic = 'all';
    this.phraseSearch = '';
    this.phraseBookmarkOnly = false;

    // Flashcard State
    this.flashcardIndex = 0;
    this.flashcardFlipped = false;
    this.flashcardList = [];

    // Quiz State (tone quiz)
    this.quizIndex = 0;
    this.quizScore = 0;
    this.quizQuestions = [];
    this.quizAnswered = false;

    // Chinese MC Quiz
    this.zhQuizItems    = [];
    this.zhQuizIndex    = 0;
    this.zhQuizScore    = 0;
    this.zhQuizStreak   = 0;
    this.zhQuizAnswered = false;

    // Chinese Dictation
    this.zhDictItems  = [];
    this.zhDictIndex  = 0;

    // Chinese Builder
    this.zhBuilderItems       = [];
    this.zhBuilderIndex       = 0;
    this.zhBuilderCurrentWords = [];

    // Speaking split-screen
    this._zhSpkRate     = 1.0;
    this._zhSpkAttempts = [];
    this._zhSpkRecog    = null;
    this._zhSpkRecording = false;

    // Mic Practice (old, kept for backward compat)
    this.isRecording = false;
    this.recognition = null;

    // 1. Reading Comprehension State
    this.activeReadingLevel = 'all';
    this.activeReadingId = null;
    this.readingShowPinyin = true;
    this.readingShowVi = true;

    // 2. AI Conversation State
    this.zhAiScenario = 'free';
    this.zhAiMessages = [];
    this.zhAiShowPinyin = true;
    this.zhAiShowVi = true;
    this.zhAiIsRecording = false;
    this.zhAiRecog = null;
    this.zhAiManualStop = false;
    this.zhAiAccumulated = '';
    this.zhAiPreSpeechText = '';
    this._latestZhAiFinalChunk = '';
    this._zhAiSilenceTimer = null;
    this._rpSilenceTimer = null;
    this.rpIsRecording = false;
    this.rpManualStop = false;
    this.rpAccumulated = '';
    this.rpPreSpeechText = '';
    this._latestRpFinalChunk = '';

    // 3. Weak Vocab State
    this.activeWeakFilter = 'all';

    // 4. HSK Test State
    this.hskLevel = 1;
    this.hskQuestions = [];
    this.hskCurrentIdx = 0;
    this.hskUserAnswers = {};
    this.hskTimerInterval = null;
    this.hskSecondsLeft = 1800;

    // 5. Level Test State
    this.levelQuestions = [];
    this.levelCurrentIdx = 0;
    this.levelUserAnswers = {};

    // 6. Role Play State
    this.currentRoleplayId = null;
    this.rpMessages = [];
    this.rpCompletedObjectives = new Set();
    this.rpShowPinyin = true;
    this.rpShowVi = true;
    this.rpIsRecording = false;
    this.rpRecog = null;

    // 7. SRS State
    this.srsSessionCards = [];
    this.srsCurrentIdx = 0;
    this.srsIsFlipped = false;
    this.srsSessionStats = { total: 0, again: 0, hard: 0, good: 0, easy: 0 };
  }

  init() {
    if (!window.CHINESE_VOCAB_DATA || !window.CHINESE_PINYIN_DATA) {
      console.warn('Chinese data files not loaded yet');
      return;
    }

    this._bindElements();
    this._initEvents();

    this.renderPinyin();
    this.renderStrokes();
    this.renderVocab();
    this.renderPhrases();
    this.renderGrammar();
    this.initFlashcards();
    this.initToneQuiz();
    this._initZhAiSpeechRecognition();
  }

  _bindElements() {
    this.tabBtns = document.querySelectorAll('.zh-tab-btn[data-subtab]');
    this.subPanels = {
      pinyin: document.getElementById('zh-panel-pinyin'),
      strokes: document.getElementById('zh-panel-strokes'),
      vocab: document.getElementById('zh-panel-vocab'),
      phrases: document.getElementById('zh-panel-phrases'),
      practice: document.getElementById('zh-panel-practice'),
      grammar: document.getElementById('zh-panel-grammar'),
      reading: document.getElementById('zh-panel-reading'),
      'zh-ai-chat': document.getElementById('zh-panel-zh-ai-chat'),
      'weak-vocab': document.getElementById('zh-panel-weak-vocab'),
      'hsk-test': document.getElementById('zh-panel-hsk-test'),
      'level-test': document.getElementById('zh-panel-level-test'),
      roleplay: document.getElementById('zh-panel-roleplay'),
      srs: document.getElementById('zh-panel-srs')
    };

    // Pinyin containers
    this.shengmuGrid = document.getElementById('zh-shengmu-grid');
    this.yunmuGrid = document.getElementById('zh-yunmu-grid');

    // Strokes containers
    this.strokesGrid = document.getElementById('zh-strokes-grid');
    this.radicalsGrid = document.getElementById('zh-radicals-grid');
    this.rulesContainer = document.getElementById('zh-rules-container');

    // Vocab elements
    this.vocabGrid = document.getElementById('zh-vocab-grid');
    this.vocabSearchInput = document.getElementById('zh-vocab-search');
    this.vocabLevelFilter = document.getElementById('zh-vocab-level-filter');
    this.vocabTopicFilter = document.getElementById('zh-vocab-topic-filter');
    this.vocabCountBadge = document.getElementById('zh-vocab-count-badge');

    // Phrase elements
    this.phraseGrid = document.getElementById('zh-phrase-grid');
    this.phraseSearchInput = document.getElementById('zh-phrase-search');
    this.phraseTopicFilter = document.getElementById('zh-phrase-topic-filter');
    this.phraseCountBadge = document.getElementById('zh-phrase-count-badge');

    // Practice / Flashcard elements
    this.flashcardHanzi = document.getElementById('zh-fc-hanzi');
    this.flashcardPinyin = document.getElementById('zh-fc-pinyin');
    this.flashcardHanviet = document.getElementById('zh-fc-hanviet');
    this.flashcardVi = document.getElementById('zh-fc-vi');
    this.flashcardCard = document.getElementById('zh-fc-card');
    this.flashcardNextBtn = document.getElementById('zh-fc-next');
    this.flashcardPrevBtn = document.getElementById('zh-fc-prev');
    this.flashcardAudioBtn = document.getElementById('zh-fc-audio');
    this.flashcardProgress = document.getElementById('zh-fc-progress');

    // Mic pronunciation assessment
    this.pronFeedbackArea = document.getElementById('zh-pron-feedback-area');
    this.micStartBtn = document.getElementById('zh-mic-start-btn');
    this.micBtnText = document.getElementById('zh-mic-btn-text');
    this.micTargetSelect = document.getElementById('zh-mic-word-select');

    // Quiz container
    this.quizContainer = document.getElementById('zh-tone-quiz-content');

    // Practice sub-tabs
    this.practiceTabBtns    = document.querySelectorAll('.zh-practice-tab-btn');
    this.practiceSubPanels  = {
      flashcard : document.getElementById('zh-sub-flashcard'),
      quiz      : document.getElementById('zh-sub-quiz'),
      dictation : document.getElementById('zh-sub-dictation'),
      builder   : document.getElementById('zh-sub-builder'),
      speaking  : document.getElementById('zh-sub-speaking'),
    };

    // Bookmark filter chips
    this.vocabBmFilter   = document.getElementById('zh-vocab-bm-filter');
    this.phraseBmFilter  = document.getElementById('zh-phrase-bm-filter');

    // Chinese quiz
    this.zhQuizSourceSel = document.getElementById('zh-quiz-source');
    this.zhQuizStartBtn  = document.getElementById('zh-quiz-start-btn');
    this.zhQuizArena     = document.getElementById('zh-quiz-arena');

    // Chinese dictation
    this.zhDictStartBtn  = document.getElementById('zh-dict-start-btn');
    this.zhDictArena     = document.getElementById('zh-dict-arena');

    // Chinese builder
    this.zhBuilderStartBtn = document.getElementById('zh-builder-start-btn');
    this.zhBuilderArena    = document.getElementById('zh-builder-arena');

    // Split-screen speaking
    this.zhSpkHanzi      = document.getElementById('zh-spk-hanzi');
    this.zhSpkPinyin     = document.getElementById('zh-spk-pinyin');
    this.zhSpkVi         = document.getElementById('zh-spk-vi');
    this.zhSpkCounter    = document.getElementById('zh-spk-counter');
    this.zhSpkSampleBtn  = document.getElementById('zh-spk-sample-btn');
    this.zhSpkMicBtn     = document.getElementById('zh-spk-mic-btn');
    this.zhSpkWaveBars   = document.getElementById('zh-spk-wave-bars');
    this.zhSpkMicHint    = document.getElementById('zh-spk-mic-hint');
    this.zhSpkMicZone    = document.getElementById('zh-spk-mic-zone');
    this.zhSpkResultPanel = document.getElementById('zh-spk-result-panel');
    this.zhSpkScoreFill  = document.getElementById('zh-spk-score-fill');
    this.zhSpkScoreVal   = document.getElementById('zh-spk-score-val');
    this.zhSpkTranscript = document.getElementById('zh-spk-transcript');
    this.zhSpkEvalMsg    = document.getElementById('zh-spk-eval-msg');
    this.zhSpkRetryBtn   = document.getElementById('zh-spk-retry-btn');
    this.zhSpkNextBtn    = document.getElementById('zh-spk-next-btn');
    this.zhSpkAttemptsRow = document.getElementById('zh-spk-attempts-row');
    this.zhSpeedChips    = document.querySelectorAll('.zh-speed-chip');

    // AI Modal
    this.zhAiModalOverlay = document.getElementById('zh-ai-modal-overlay');
    this.zhAiModalOriginal = document.getElementById('zh-ai-modal-original');
    this.zhAiModalBody    = document.getElementById('zh-ai-modal-body');
    this.zhAiModalClose   = document.getElementById('zh-ai-modal-close');

    // Grammar Panel
    this.grammarGrid          = document.getElementById('zh-grammar-grid');
    this.grammarSearchInput   = document.getElementById('zh-grammar-search');
    this.grammarLevelBtns     = document.querySelectorAll('.zh-grammar-level-btn');
    this.grammarReaderOverlay = document.getElementById('zh-grammar-reader-overlay');
    this.grammarReaderTitle   = document.getElementById('zh-gr-reader-title');
    this.grammarReaderBody    = document.getElementById('zh-gr-reader-body');
    this.grammarReaderClose   = document.getElementById('zh-grammar-reader-close');
  }

  _initEvents() {
    // Sub-navigation tabs
    this.tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const subtab = btn.dataset.subtab;
        this.switchSubTab(subtab);
      });
    });

    // Pinyin View Mode Switcher (Horizontal Card vs 2-Column Grid)
    const pinyinToggle = document.getElementById('zh-pinyin-view-toggle');
    if (pinyinToggle) {
      pinyinToggle.querySelectorAll('.zh-view-mode-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const mode = btn.dataset.mode;
          pinyinToggle.querySelectorAll('.zh-view-mode-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          const panel = document.getElementById('zh-panel-pinyin');
          if (panel) {
            panel.classList.toggle('is-grid2', mode === 'grid2');
          }
        });
      });
    }

    // Practice sub-tabs
    this.practiceTabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        this.activePracticeTab = btn.dataset.practiceTab;
        this.practiceTabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        Object.keys(this.practiceSubPanels).forEach(k => {
          const el = this.practiceSubPanels[k];
          if (el) el.classList.toggle('active', k === this.activePracticeTab);
        });
        // Auto-start speaking panel
        if (this.activePracticeTab === 'speaking') this._initZhSpeaking();
      });
    });

    // Vocab Search & Filters
    if (this.vocabSearchInput) {
      this.vocabSearchInput.addEventListener('input', (e) => {
        this.vocabSearch = e.target.value.trim().toLowerCase();
        this.renderVocab();
      });
    }
    if (this.vocabLevelFilter) {
      this.vocabLevelFilter.addEventListener('change', (e) => {
        this.activeVocabLevel = e.target.value;
        this.renderVocab();
      });
    }
    if (this.vocabTopicFilter) {
      this.vocabTopicFilter.addEventListener('change', (e) => {
        this.activeVocabTopic = e.target.value;
        this.renderVocab();
      });
    }
    // Vocab bookmark filter
    if (this.vocabBmFilter) {
      this.vocabBmFilter.addEventListener('click', () => {
        this.vocabBookmarkOnly = !this.vocabBookmarkOnly;
        this.vocabBmFilter.classList.toggle('active', this.vocabBookmarkOnly);
        this.renderVocab();
      });
    }

    // Phrase Search & Filters
    if (this.phraseSearchInput) {
      this.phraseSearchInput.addEventListener('input', (e) => {
        this.phraseSearch = e.target.value.trim().toLowerCase();
        this.renderPhrases();
      });
    }
    if (this.phraseTopicFilter) {
      this.phraseTopicFilter.addEventListener('change', (e) => {
        this.activePhraseTopic = e.target.value;
        this.renderPhrases();
      });
    }
    // Phrase bookmark filter
    if (this.phraseBmFilter) {
      this.phraseBmFilter.addEventListener('click', () => {
        this.phraseBookmarkOnly = !this.phraseBookmarkOnly;
        this.phraseBmFilter.classList.toggle('active', this.phraseBookmarkOnly);
        this.renderPhrases();
      });
    }

    // Flashcard 3D events
    if (this.flashcardCard) {
      this.flashcardCard.addEventListener('click', () => {
        this.flashcardCard.classList.toggle('is-flipped');
      });
    }
    if (this.flashcardNextBtn) {
      this.flashcardNextBtn.addEventListener('click', () => { this.nextFlashcard(); });
    }
    if (this.flashcardPrevBtn) {
      this.flashcardPrevBtn.addEventListener('click', () => { this.prevFlashcard(); });
    }
    if (this.flashcardAudioBtn) {
      this.flashcardAudioBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const currentWord = this.flashcardList[this.flashcardIndex];
        if (currentWord) this.playChineseText(currentWord.hanzi, this._zhSpkRate);
      });
    }

    // Chinese Quiz
    if (this.zhQuizStartBtn) {
      this.zhQuizStartBtn.addEventListener('click', () => this._startZhQuiz());
    }
    // Chinese Dictation
    if (this.zhDictStartBtn) {
      this.zhDictStartBtn.addEventListener('click', () => this._startZhDictation());
    }
    // Chinese Builder
    if (this.zhBuilderStartBtn) {
      this.zhBuilderStartBtn.addEventListener('click', () => this._startZhBuilder());
    }

    // Speed chips
    this.zhSpeedChips.forEach(chip => {
      chip.addEventListener('click', () => {
        this.zhSpeedChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        this._zhSpkRate = parseFloat(chip.dataset.zhRate) || 1.0;
      });
    });

    // Speaking panel
    if (this.zhSpkSampleBtn) {
      this.zhSpkSampleBtn.addEventListener('click', () => {
        const w = this.flashcardList[this.flashcardIndex];
        if (!w) return;
        this.zhSpkSampleBtn.classList.add('playing');
        this.playChineseText(w.hanzi, this._zhSpkRate, () => this.zhSpkSampleBtn.classList.remove('playing'));
      });
    }
    if (this.zhSpkMicBtn)   this.zhSpkMicBtn.addEventListener('click',   () => this._toggleZhMic());
    if (this.zhSpkRetryBtn) this.zhSpkRetryBtn.addEventListener('click',  () => this._zhSpkResetMic());
    if (this.zhSpkNextBtn)  this.zhSpkNextBtn.addEventListener('click',   () => {
      this.nextFlashcard();
      this._initZhSpeaking();
    });

    const zhAiMicBtn = document.getElementById('zh-ai-mic-btn');
    if (zhAiMicBtn) {
      zhAiMicBtn.addEventListener('click', () => this._toggleZhAiMic());
    }
    const zhRpMicBtn = document.getElementById('zh-rp-mic-btn');
    if (zhRpMicBtn) {
      zhRpMicBtn.addEventListener('click', () => this.toggleRoleplayMic());
    }

    // AI Modal
    if (this.zhAiModalClose) {
      this.zhAiModalClose.addEventListener('click', () => {
        if (this.zhAiModalOverlay) this.zhAiModalOverlay.style.display = 'none';
      });
    }
    if (this.zhAiModalOverlay) {
      this.zhAiModalOverlay.addEventListener('click', (e) => {
        if (e.target === this.zhAiModalOverlay) this.zhAiModalOverlay.style.display = 'none';
      });
    }

    // Grammar search & filter
    if (this.grammarSearchInput) {
      this.grammarSearchInput.addEventListener('input', () => this.renderGrammar());
    }
    if (this.grammarLevelBtns) {
      this.grammarLevelBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          this.grammarLevelBtns.forEach(b => {
            b.style.background = 'transparent';
            b.style.color = 'var(--text-muted)';
            b.classList.remove('active');
          });
          btn.style.background = 'rgba(249,115,22,0.15)';
          btn.style.color = '#fb923c';
          btn.classList.add('active');
          this.renderGrammar();
        });
      });
    }
    if (this.grammarReaderClose) {
      this.grammarReaderClose.addEventListener('click', () => this.closeGrammarReader());
    }
    if (this.grammarReaderOverlay) {
      this.grammarReaderOverlay.addEventListener('click', (e) => {
        if (e.target === this.grammarReaderOverlay) this.closeGrammarReader();
      });
    }
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.grammarReaderOverlay && this.grammarReaderOverlay.style.display !== 'none') {
        this.closeGrammarReader();
      }
    });
  }

  switchPracticeTab(practiceTab) {
    if (!practiceTab || !this.practiceSubPanels[practiceTab]) return;
    this.activePracticeTab = practiceTab;
    if (this.practiceTabBtns) {
      this.practiceTabBtns.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.practiceTab === practiceTab);
      });
    }
    Object.keys(this.practiceSubPanels).forEach(key => {
      const el = this.practiceSubPanels[key];
      if (el) el.classList.toggle('active', key === practiceTab);
    });

    // Sync mobile bottom nav Chinese practice buttons
    const mobileZhBtns = document.querySelectorAll('#mobile-subnav-zh .mobile-nav-btn');
    mobileZhBtns.forEach(btn => {
      if (btn.dataset.practiceTabTarget) {
        const isActive = (btn.dataset.practiceTabTarget === practiceTab);
        btn.classList.toggle('active', isActive);
        if (isActive) {
          try {
            btn.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
          } catch (e) {}
        }
      }
    });

    if (practiceTab === 'speaking') {
      this._initZhSpeaking();
    } else if (practiceTab === 'quiz') {
      if (!this.zhQuizItems || !this.zhQuizItems.length) this._startZhQuiz();
    } else if (practiceTab === 'dictation') {
      if (!this.zhDictItems || !this.zhDictItems.length) this._startZhDictation();
    } else if (practiceTab === 'builder') {
      if (!this.zhBuilderItems || !this.zhBuilderItems.length) this._startZhBuilder();
    }
  }

  switchSubTab(subTab) {
    if (!subTab || !this.subPanels[subTab]) return;
    this.activeSubTab = subTab;
    if (this.tabBtns) {
      this.tabBtns.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.subtab === subTab);
      });
    }

    // Sync sidebar Chinese items active state
    const zhNavItems = document.querySelectorAll('.nav-item-zh');
    zhNavItems.forEach(item => {
      item.classList.toggle('active', item.dataset.zhTab === subTab && !item.dataset.practiceTabTarget);
    });

    // Sync mobile bottom nav Chinese buttons
    const mobileZhBtns = document.querySelectorAll('#mobile-subnav-zh .mobile-nav-btn');
    mobileZhBtns.forEach(btn => {
      const isActive = (btn.dataset.zhTab === subTab && !btn.dataset.practiceTabTarget);
      btn.classList.toggle('active', isActive);
      if (isActive) {
        try {
          btn.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
        } catch (e) {}
      }
    });

    Object.keys(this.subPanels).forEach(key => {
      if (this.subPanels[key]) {
        this.subPanels[key].style.display = (key === subTab) ? 'block' : 'none';
      }
    });

    if (subTab === 'practice') {
      this.populateMicWords();
    } else if (subTab === 'reading') {
      this.renderReading();
    } else if (subTab === 'zh-ai-chat') {
      this.initZhAiChat();
    } else if (subTab === 'weak-vocab') {
      this.renderWeakVocab();
    } else if (subTab === 'hsk-test') {
      this.initHskTest();
    } else if (subTab === 'level-test') {
      this.initLevelTest();
    } else if (subTab === 'roleplay') {
      this.renderRoleplay();
    } else if (subTab === 'srs') {
      this.renderSrsDashboard();
    }
  }

  playChineseText(text, rate = 1.0, onEnd = null) {
    if (!window.audioCtrl) return;
    window.audioCtrl.speak(text, onEnd, { lang: 'zh-CN', rate: rate });
  }

  // =========================================================================
  // 1. PINYIN & TONES
  // =========================================================================
  renderPinyin() {
    const data = window.CHINESE_PINYIN_DATA;
    if (!data) return;

    // Render Shengmu (21)
    if (this.shengmuGrid) {
      this.shengmuGrid.innerHTML = '';
      (data.shengmu || []).forEach(sm => {
        const card = document.createElement('div');
        card.className = 'zh-pinyin-card';
        card.innerHTML = `
          <div class="zh-pinyin-symbol-col">
            <div class="pinyin-big">${sm.pinyin}</div>
            <div class="zh-pinyin-audio-badge">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/></svg>
              <span>Nghe</span>
            </div>
          </div>
          <div class="zh-pinyin-info-col">
            <div class="zh-pinyin-header-row">
              <div class="zh-pinyin-name">${sm.name}</div>
              <span class="zh-badge-pill red zh-pinyin-group-pill">${sm.groupName}</span>
            </div>
            <div class="vi-desc">${sm.viCompare}</div>
            <div class="sample-hanzi">Ví dụ: <strong>${sm.examples[0].hanzi}</strong> (${sm.examples[0].pinyin})</div>
          </div>
        `;

        card.addEventListener('click', () => {
          card.classList.add('is-playing');
          this.playChineseText(sm.examples[0].hanzi, 0.9, () => {
            card.classList.remove('is-playing');
          });
        });

        this.shengmuGrid.appendChild(card);
      });
    }

    // Render Yunmu (36)
    if (this.yunmuGrid) {
      this.yunmuGrid.innerHTML = '';
      (data.yunmu || []).forEach(ym => {
        const card = document.createElement('div');
        card.className = 'zh-pinyin-card zh-yunmu-card';
        card.innerHTML = `
          <div class="zh-pinyin-symbol-col">
            <div class="pinyin-big" style="color: #38bdf8;">${ym.symbol}</div>
            <div class="zh-pinyin-audio-badge cyan">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/></svg>
              <span>Nghe</span>
            </div>
          </div>
          <div class="zh-pinyin-info-col">
            <div class="zh-pinyin-header-row">
              <div class="zh-pinyin-name" style="color: #38bdf8;">Vận mẫu /${ym.symbol}/</div>
            </div>
            <div class="vi-desc">${ym.vi}</div>
            <div class="sample-hanzi">${ym.ex}</div>
          </div>
        `;

        card.addEventListener('click', () => {
          card.classList.add('is-playing');
          const sampleWord = ym.ex.match(/\((.*?)\)/);
          const textToSpeak = sampleWord ? sampleWord[1].replace(/[^一-龥]/g, '') : ym.symbol;
          this.playChineseText(textToSpeak || ym.symbol, 0.9, () => {
            card.classList.remove('is-playing');
          });
        });

        this.yunmuGrid.appendChild(card);
      });
    }
  }

  // =========================================================================
  // 2. STROKES & RULES
  // =========================================================================
  renderStrokes() {
    const data = window.CHINESE_STROKES_DATA;
    if (!data) return;

    if (this.strokesGrid) {
      this.strokesGrid.innerHTML = '';
      (data.basicStrokes || []).forEach(st => {
        const card = document.createElement('div');
        card.className = 'zh-stroke-card';
        card.innerHTML = `
          <div class="zh-stroke-symbol">${st.symbol}</div>
          <div class="zh-stroke-info">
            <h4>${st.name} (${st.pinyin})</h4>
            <p><strong>Hướng nét:</strong> ${st.direction}</p>
            <p>${st.desc}</p>
            <p style="margin-top: 4px; color: #fbbf24;">
              Ví dụ: ${st.examples.map(e => `<strong>${e.hanzi}</strong> (${e.vi})`).join(', ')}
            </p>
          </div>
        `;
        this.strokesGrid.appendChild(card);
      });
    }

    if (this.radicalsGrid) {
      this.radicalsGrid.innerHTML = '';
      (data.goldenRadicals || []).forEach(rd => {
        const card = document.createElement('div');
        card.className = 'zh-stroke-card zh-radical-card';
        card.innerHTML = `
          <div class="zh-stroke-symbol" style="background: rgba(16, 185, 129, 0.2); border-color: rgba(16, 185, 129, 0.3); color: #34d399;">
            ${rd.radical}
          </div>
          <div class="zh-stroke-info">
            <h4>${rd.name} (${rd.pinyin})</h4>
            <p>${rd.meaning}</p>
            <p style="margin-top: 4px; color: #6ee7b7;">Chữ chứa bộ này: <strong>${rd.sampleWords}</strong></p>
          </div>
        `;
        this.radicalsGrid.appendChild(card);
      });
    }

    if (this.rulesContainer) {
      this.rulesContainer.innerHTML = '';
      (data.strokeRules || []).forEach(rule => {
        const card = document.createElement('div');
        card.className = 'zh-stroke-card zh-rule-card';
        card.innerHTML = `
          <div class="zh-stroke-symbol" style="background: rgba(236, 72, 153, 0.2); border-color: rgba(236, 72, 153, 0.3); color: #f472b6;">
            ${rule.sampleHanzi}
          </div>
          <div class="zh-stroke-info">
            <h4>${rule.title} • <span style="color: #f472b6;">${rule.cn}</span> (${rule.pinyin})</h4>
            <p>${rule.desc}</p>
            <p style="margin-top: 4px; color: #a7f3d0;">Ví dụ minh họa: <strong>${rule.sampleHanzi}</strong> (${rule.samplePinyin} - ${rule.sampleMeaning})</p>
            <div style="margin-top: 4px; font-size: 12px; color: var(--text-muted);">
              Các bước: ${(rule.steps || []).join(' → ')}
            </div>
          </div>
        `;
        this.rulesContainer.appendChild(card);
      });
    }
  }

  // =========================================================================
  // 3. 600+ HSK VOCABULARY
  // =========================================================================
  renderVocab() {
    if (!this.vocabGrid || !window.CHINESE_VOCAB_DATA) return;

    const list = window.CHINESE_VOCAB_DATA;
    const query = this.vocabSearch;
    const topic = this.activeVocabTopic;
    const level = this.activeVocabLevel;

    const filtered = list.filter(w => {
      if (level !== 'all' && w.level !== level) return false;
      if (topic !== 'all' && w.category !== topic) return false;
      if (this.vocabBookmarkOnly) {
        const bmKey = `zh_v_${w.id || w.hanzi}`;
        if (!window.storage || !window.storage.isBookmarked(bmKey)) return false;
      }
      if (query) {
        const matchHanzi  = w.hanzi.includes(query);
        const matchPinyin = w.pinyin.toLowerCase().includes(query);
        const matchHanviet = (w.hanviet || '').toLowerCase().includes(query);
        const matchVi     = (w.vi || '').toLowerCase().includes(query);
        return matchHanzi || matchPinyin || matchHanviet || matchVi;
      }
      return true;
    });

    if (this.vocabCountBadge) {
      this.vocabCountBadge.textContent = `${filtered.length} / ${list.length} từ`;
    }

    this.vocabGrid.innerHTML = '';

    // Paginate or render first 60 for ultra-smooth UI
    const displayList = filtered.slice(0, 80);

    displayList.forEach(item => {
      const bmKey = `zh_v_${item.id || item.hanzi}`;
      const isBookmarked = window.storage && window.storage.isBookmarked(bmKey);
      const card = document.createElement('div');
      card.className = 'zh-vocab-card';

      card.innerHTML = `
        <div class="zh-vocab-top">
          <div class="zh-hanzi-display">${item.hanzi}</div>
          <div style="display: flex; gap: 4px; align-items: center; flex-wrap: wrap;">
            <span class="zh-badge-pill ${item.level === 'HSK1' ? 'gold' : 'red'}" style="font-size: 10px;">${item.level}</span>
            <span class="zh-hanviet-tag">HV: ${item.hanviet}</span>
            <button class="zh-bookmark-btn ${isBookmarked ? 'bookmarked' : ''}" data-bmkey="${bmKey}" title="Đánh dấu">${isBookmarked ? '❤️' : '🤍'}</button>
          </div>
        </div>
        <div class="zh-pinyin-text">${item.pinyin} • <small style="color: var(--text-muted); font-size: 11px;">(${item.type})</small></div>
        <div class="zh-meaning-text">${item.vi}</div>
        <div class="zh-example-box">
          <div class="cn">${item.example.cn}</div>
          ${item.example.vi ? `<div class="vi">${item.example.vi}</div>` : ''}
        </div>
        <div class="zh-vocab-actions">
          <button class="zh-audio-btn" title="Nghe phát âm">🔊</button>
          <span style="font-size: 11px; color: var(--text-subtle);">Bấm nghe giọng chuẩn Bắc Kinh</span>
        </div>
      `;

      const audioBtn = card.querySelector('.zh-audio-btn');
      audioBtn.addEventListener('click', () => this.playChineseText(item.hanzi, this._zhSpkRate));

      const bmBtn = card.querySelector('.zh-bookmark-btn');
      bmBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const key = bmBtn.dataset.bmkey;
        const was = window.storage.isBookmarked(key);
        if (was) { window.storage.removeBookmark(key); bmBtn.textContent = '🤍'; bmBtn.classList.remove('bookmarked'); }
        else      { window.storage.addBookmark(key);    bmBtn.textContent = '❤️'; bmBtn.classList.add('bookmarked'); }
      });

      this.vocabGrid.appendChild(card);
    });
  }

  // =========================================================================
  // 4. 300+ CONVERSATIONAL PHRASES
  // =========================================================================
  renderPhrases() {
    if (!this.phraseGrid || !window.CHINESE_PHRASES_DATA) return;

    const list = window.CHINESE_PHRASES_DATA;
    const query = this.phraseSearch;
    const topic = this.activePhraseTopic;

    const filtered = list.filter(p => {
      if (topic !== 'all' && p.category !== topic) return false;
      if (this.phraseBookmarkOnly) {
        const bmKey = `zh_p_${p.id || p.cn}`;
        if (!window.storage || !window.storage.isBookmarked(bmKey)) return false;
      }
      if (query) {
        const matchCn = p.cn.includes(query);
        const matchPy = (p.pinyin || '').toLowerCase().includes(query);
        const matchHv = (p.hanviet || '').toLowerCase().includes(query);
        const matchVi = (p.vi || '').toLowerCase().includes(query);
        return matchCn || matchPy || matchHv || matchVi;
      }
      return true;
    });

    if (this.phraseCountBadge) {
      this.phraseCountBadge.textContent = `${filtered.length} câu giao tiếp`;
    }

    this.phraseGrid.innerHTML = '';

    filtered.forEach(p => {
      const bmKey = `zh_p_${p.id || p.cn}`;
      const isBookmarked = window.storage && window.storage.isBookmarked(bmKey);
      const card = document.createElement('div');
      card.className = 'zh-phrase-card';

      card.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 6px;">
          <div class="zh-phrase-cn">${p.cn}</div>
          <div style="display: flex; gap: 5px; flex-shrink: 0; align-items: center;">
            <button class="zh-ai-upgrade-btn" data-cn="${this._esc(p.cn)}" data-pinyin="${this._esc(p.pinyin||'')}" data-vi="${this._esc(p.vi||'')}" title="AI giải thích &amp; nâng cấp">✨ AI</button>
            <button class="zh-audio-btn" title="Nghe câu này">🔊</button>
            <button class="zh-bookmark-btn ${isBookmarked ? 'bookmarked' : ''}" data-bmkey="${bmKey}">${isBookmarked ? '❤️' : '🤍'}</button>
          </div>
        </div>
        <div class="zh-phrase-py">${p.pinyin} ${p.hanviet ? `• [${p.hanviet}]` : ''}</div>
        <div class="zh-phrase-vi">💡 ${p.vi}</div>
        ${p.hint ? `<div style="font-size: 11px; color: var(--text-subtle); margin-top: 4px;">👉 ${p.hint}</div>` : ''}
      `;

      card.querySelector('.zh-audio-btn').addEventListener('click', () => this.playChineseText(p.cn, this._zhSpkRate));
      card.querySelector('.zh-bookmark-btn').addEventListener('click', (e) => {
        e.stopPropagation();
        const btn = e.currentTarget;
        const key = btn.dataset.bmkey;
        const was = window.storage.isBookmarked(key);
        if (was) { window.storage.removeBookmark(key); btn.textContent = '🤍'; btn.classList.remove('bookmarked'); }
        else      { window.storage.addBookmark(key);    btn.textContent = '❤️'; btn.classList.add('bookmarked'); }
      });
      card.querySelector('.zh-ai-upgrade-btn').addEventListener('click', (e) => {
        const btn = e.currentTarget;
        this._openAiUpgrade({ cn: btn.dataset.cn, pinyin: btn.dataset.pinyin, vi: btn.dataset.vi });
      });

      this.phraseGrid.appendChild(card);
    });
  }

  _esc(str) {
    return (str || '').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
  }

  // =========================================================================
  // AI UPGRADE MODAL
  // =========================================================================
  async _openAiUpgrade(phrase) {
    if (!this.zhAiModalOverlay) return;
    this.zhAiModalOverlay.style.display = 'flex';
    if (this.zhAiModalOriginal) {
      this.zhAiModalOriginal.innerHTML = `
        <div class="hanzi">${phrase.cn}</div>
        <div class="pinyin">${phrase.pinyin}</div>
        <div class="vi-text">💡 ${phrase.vi}</div>
      `;
    }
    if (this.zhAiModalBody) {
      this.zhAiModalBody.innerHTML = `<div class="zh-ai-modal-loading">⏳ AI đang phân tích câu tiếng Trung...</div>`;
    }

    try {
      const settings = window.storage ? (window.storage.aiSettings || window.storage.settings) : {};
      const apiKey   = (window.storage?.getApiKey ? window.storage.getApiKey() : settings.geminiApiKey) || '';
      const model    = (window.storage?.getAiModel ? window.storage.getAiModel() : settings.geminiModel) || 'gemini-2.0-flash';
      const prompt   = `Bạn là giáo viên tiếng Trung chuyên nghiệp. Hãy giải thích và nâng cấp câu sau cho người học tiếng Việt:\n\nCâu: ${phrase.cn}\nPinyin: ${phrase.pinyin}\nNghĩa: ${phrase.vi}\n\nHãy cung cấp:\n1. 📖 Phân tích từng từ trong câu (từ + pinyin + nghĩa)\n2. 🗣️ Cách dùng trong giao tiếp thực tế\n3. 💪 1-2 câu tương tự / nâng cấp hơn\n4. ⚠️ Lỗi phổ biến người Việt hay mắc khi dùng câu này\n\nViết ngắn gọn, thân thiện, dễ hiểu.`;

      let responseText = '';
      if (apiKey && window.aiChat) {
        responseText = await window.aiChat._callGemini(prompt, [], apiKey, model);
      } else if (window.aiChat) {
        responseText = await window.aiChat._callGeminiBuiltin(prompt, model);
      } else {
        responseText = `🤖 Chưa kết nối AI. Vui lòng cấu hình Gemini API Key trong Cài đặt AI để sử dụng tính năng này.`;
      }

      if (this.zhAiModalBody) {
        this.zhAiModalBody.innerHTML = `<div class="zh-ai-modal-content">${responseText.replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/\n/g,'<br>')}</div>`;
      }
    } catch (err) {
      if (this.zhAiModalBody) {
        this.zhAiModalBody.innerHTML = `<div class="zh-ai-modal-content" style="color: #fca5a5;">❌ Lỗi: ${err.message}</div>`;
      }
    }
  }

  // =========================================================================
  // CHINESE MC QUIZ
  // =========================================================================
  _getZhPool() {
    const src = this.zhQuizSourceSel ? this.zhQuizSourceSel.value : 'vocab';
    const vocab   = (window.CHINESE_VOCAB_DATA   || []).map(v => ({ hanzi: v.hanzi, pinyin: v.pinyin, vi: v.vi, type: 'vocab' }));
    const phrases = (window.CHINESE_PHRASES_DATA || []).map(p => ({ hanzi: p.cn, pinyin: p.pinyin || '', vi: p.vi, type: 'phrase' }));
    if (src === 'vocab')   return vocab;
    if (src === 'phrases') return phrases;
    return [...vocab, ...phrases];
  }

  _shuffleArr(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  _startZhQuiz() {
    const pool = this._shuffleArr(this._getZhPool());
    this.zhQuizItems    = pool.slice(0, 20);
    this.zhQuizIndex    = 0;
    this.zhQuizScore    = 0;
    this.zhQuizStreak   = 0;
    this._renderZhQuizQuestion();
  }

  _renderZhQuizQuestion() {
    if (!this.zhQuizArena) return;
    if (this.zhQuizIndex >= this.zhQuizItems.length) {
      const total = this.zhQuizItems.length;
      const acc   = Math.round((this.zhQuizScore / total) * 100);
      this.zhQuizArena.innerHTML = `
        <div style="text-align: center; padding: 28px;">
          <div style="font-size: 48px; margin-bottom: 10px;">🏆</div>
          <h3 style="font-size: 20px; color: #fff; margin-bottom: 8px;">Hoàn thành bài Quiz!</h3>
          <p style="color: var(--text-secondary); margin-bottom: 16px;">Đúng <strong>${this.zhQuizScore}/${total}</strong> câu — Độ chính xác: <strong>${acc}%</strong></p>
          <button class="zh-action-btn primary" id="zh-quiz-again-btn">🔄 Chơi lại</button>
        </div>`;
      const again = this.zhQuizArena.querySelector('#zh-quiz-again-btn');
      if (again) again.addEventListener('click', () => this._startZhQuiz());
      return;
    }

    const q    = this.zhQuizItems[this.zhQuizIndex];
    const pool = this._getZhPool().filter(x => x.vi !== q.vi);
    const wrong = this._shuffleArr(pool).slice(0, 3).map(x => x.vi);
    const choices = this._shuffleArr([q.vi, ...wrong]);
    const letters = ['A','B','C','D'];

    this.zhQuizArena.innerHTML = `
      <div class="zh-quiz-top">
        <span class="zh-quiz-counter">Câu ${this.zhQuizIndex + 1} / ${this.zhQuizItems.length}</span>
        <span class="zh-quiz-streak-badge">🔥 Chuỗi: ${this.zhQuizStreak}</span>
      </div>
      <div class="zh-quiz-question-box">
        <div class="zh-quiz-prompt">Nghĩa của từ / câu sau là gì?</div>
        <div class="zh-quiz-hanzi">${q.hanzi}</div>
        ${q.pinyin ? `<div class="zh-quiz-pinyin">${q.pinyin}</div>` : ''}
        <button class="zh-quiz-audio-btn" id="zh-qz-audio">🔊 Nghe phát âm</button>
      </div>
      <div class="zh-quiz-choices" id="zh-qz-choices">
        ${choices.map((c, i) => `
          <button class="zh-quiz-choice-btn" data-answer="${this._esc(c)}">
            <span class="zh-quiz-choice-key">${letters[i]}</span>
            <span>${c}</span>
          </button>`).join('')}
      </div>
      <div class="zh-quiz-feedback-box" id="zh-qz-fb"></div>
    `;

    this.zhQuizArena.querySelector('#zh-qz-audio').addEventListener('click', () => this.playChineseText(q.hanzi, this._zhSpkRate));
    this.playChineseText(q.hanzi, this._zhSpkRate);

    const btns = this.zhQuizArena.querySelectorAll('.zh-quiz-choice-btn');
    btns.forEach(btn => {
      btn.addEventListener('click', () => {
        if (this.zhQuizAnswered) return;
        this.zhQuizAnswered = true;
        btns.forEach(b => b.disabled = true);
        const correct = btn.dataset.answer === q.vi;
        btn.classList.add(correct ? 'correct' : 'wrong');
        if (!correct) btns.forEach(b => { if (b.dataset.answer === q.vi) b.classList.add('correct'); });

        const fb = this.zhQuizArena.querySelector('#zh-qz-fb');
        if (correct) {
          this.zhQuizScore++; this.zhQuizStreak++;
          window.storage && window.storage.addXP(10);
          if (window.storage && window.storage.recordChineseWordResult) window.storage.recordChineseWordResult(q, true);
          if (fb) { fb.style.display = 'flex'; fb.innerHTML = `<span class="fb-icon">🎉</span><span class="fb-text" style="color: #34d399;">Chính xác! +10 XP</span><button class="zh-action-btn primary sm" id="zh-qz-next">Tiếp →</button>`; }
        } else {
          this.zhQuizStreak = 0;
          if (window.storage && window.storage.recordChineseWordResult) window.storage.recordChineseWordResult(q, false);
          if (fb) { fb.style.display = 'flex'; fb.innerHTML = `<span class="fb-icon">❌</span><span class="fb-text" style="color: #fca5a5;">Đáp án đúng: "${q.vi}"</span><button class="zh-action-btn sm" id="zh-qz-next">Tiếp →</button>`; }
        }
        this.zhQuizAnswered = false;
        fb && fb.querySelector('#zh-qz-next') && fb.querySelector('#zh-qz-next').addEventListener('click', () => {
          this.zhQuizIndex++;
          this._renderZhQuizQuestion();
        });
      });
    });
  }

  // =========================================================================
  // CHINESE DICTATION
  // =========================================================================
  _startZhDictation() {
    const pool = this._shuffleArr(this._getZhPool());
    this.zhDictItems = pool.slice(0, 15);
    this.zhDictIndex = 0;
    this._renderZhDictation();
  }

  _renderZhDictation() {
    if (!this.zhDictArena) return;
    if (this.zhDictIndex >= this.zhDictItems.length) {
      this.zhDictArena.innerHTML = `<div style="text-align: center; padding: 28px;"><div style="font-size: 40px;">🏅</div><h3 style="color: #fff; margin: 8px 0;">Hoàn thành nghe chép!</h3><button class="zh-action-btn primary" id="zh-dict-again">🔄 Luyện lại</button></div>`;
      this.zhDictArena.querySelector('#zh-dict-again').addEventListener('click', () => this._startZhDictation());
      return;
    }
    const q = this.zhDictItems[this.zhDictIndex];
    this.zhDictArena.innerHTML = `
      <div class="zh-dict-card">
        <div class="zh-quiz-top">
          <span class="zh-quiz-counter">Câu ${this.zhDictIndex + 1} / ${this.zhDictItems.length}</span>
        </div>
        <button class="zh-dict-audio-big" id="zh-dict-play">🔊</button>
        <div class="zh-dict-hint">Gợi ý nghĩa: ${q.vi}</div>
        <div class="zh-dict-input-row">
          <input class="zh-dict-input" id="zh-dict-input" placeholder="Gõ Pinyin hoặc chữ Hán bạn vừa nghe..." autocomplete="off" autocorrect="off" spellcheck="false">
          <button type="button" class="zh-hw-btn" id="zh-dict-hw-btn" title="Viết tay chữ Hán bạn nghe được" style="width: 42px; height: 42px; font-size: 17px; border-radius: 8px;">✍️</button>
          <button class="zh-dict-submit-btn" id="zh-dict-submit">Kiểm tra</button>
        </div>
        <div class="zh-dict-result" id="zh-dict-result" style="display:none;"></div>
      </div>`;

    const playBtn = this.zhDictArena.querySelector('#zh-dict-play');
    const input   = this.zhDictArena.querySelector('#zh-dict-input');
    const hwBtn   = this.zhDictArena.querySelector('#zh-dict-hw-btn');
    const submit  = this.zhDictArena.querySelector('#zh-dict-submit');
    const result  = this.zhDictArena.querySelector('#zh-dict-result');

    if (hwBtn && window.chineseHandwriting) {
      hwBtn.addEventListener('click', () => {
        window.chineseHandwriting.openFor(input, 'Nghe chép chính tả');
      });
    }

    playBtn.addEventListener('click', () => this.playChineseText(q.hanzi, this._zhSpkRate));
    this.playChineseText(q.hanzi, this._zhSpkRate);
    input.focus();

    const check = () => {
      const val = input.value.trim();
      input.disabled = true; submit.disabled = true; result.style.display = 'block';
      const match = val === q.hanzi || val.toLowerCase() === (q.pinyin || '').toLowerCase() ||
                    window.audioCtrl.calculateSimilarity(val, q.hanzi) >= 80;
      if (match) {
        result.style.background = 'rgba(16, 185, 129, 0.2)'; result.style.color = '#34d399';
        result.innerHTML = `✓ Tuyệt vời! Câu chuẩn: <strong>「${q.hanzi}」</strong> (${q.pinyin})`;
        window.storage && window.storage.addXP(15);
      } else {
        result.style.background = 'rgba(244, 63, 94, 0.2)'; result.style.color = '#fca5a5';
        result.innerHTML = `✕ Câu đúng là: <strong>「${q.hanzi}」</strong> — ${q.pinyin} — ${q.vi}`;
      }
      setTimeout(() => { this.zhDictIndex++; this._renderZhDictation(); }, 2000);
    };
    submit.addEventListener('click', check);
    input.addEventListener('keydown', e => { if (e.key === 'Enter') check(); });
  }

  // =========================================================================
  // CHINESE SENTENCE BUILDER
  // =========================================================================
  _startZhBuilder() {
    const phrases = this._shuffleArr(window.CHINESE_PHRASES_DATA || []).slice(0, 15);
    this.zhBuilderItems        = phrases;
    this.zhBuilderIndex        = 0;
    this.zhBuilderCurrentWords = [];
    this._renderZhBuilder();
  }

  _renderZhBuilder() {
    if (!this.zhBuilderArena) return;
    if (this.zhBuilderIndex >= this.zhBuilderItems.length) {
      this.zhBuilderArena.innerHTML = `<div style="text-align: center; padding: 28px;"><div style="font-size: 40px;">🎊</div><h3 style="color: #fff; margin: 8px 0;">Hoàn thành ghép câu!</h3><button class="zh-action-btn primary" id="zh-bl-again">🔄 Luyện lại</button></div>`;
      this.zhBuilderArena.querySelector('#zh-bl-again').addEventListener('click', () => this._startZhBuilder());
      return;
    }
    const q     = this.zhBuilderItems[this.zhBuilderIndex];
    const chars = [...q.cn]; // Split into individual characters
    const scrambled = this._shuffleArr(chars);
    this.zhBuilderCurrentWords = [];

    this.zhBuilderArena.innerHTML = `
      <div class="zh-builder-card">
        <div class="zh-quiz-top">
          <span class="zh-quiz-counter">Câu ${this.zhBuilderIndex + 1} / ${this.zhBuilderItems.length}</span>
        </div>
        <div class="zh-builder-vi-target">💡 "${q.vi}"</div>
        <div class="zh-builder-dropzone" id="zh-bl-drop"></div>
        <div class="zh-builder-wordbank" id="zh-bl-bank">
          ${scrambled.map((ch, i) => `<div class="zh-word-chip" data-char="${ch}" data-idx="${i}">${ch}</div>`).join('')}
        </div>
        <div class="zh-builder-actions">
          <button class="zh-action-btn sm" id="zh-bl-reset">↩ Làm lại</button>
          <button class="zh-action-btn primary" id="zh-bl-check">✓ Kiểm tra câu</button>
        </div>
        <div class="zh-builder-feedback" id="zh-bl-fb"></div>
      </div>`;

    const bank = this.zhBuilderArena.querySelector('#zh-bl-bank');
    const drop = this.zhBuilderArena.querySelector('#zh-bl-drop');
    const fb   = this.zhBuilderArena.querySelector('#zh-bl-fb');

    const renderDrop = () => {
      drop.innerHTML = this.zhBuilderCurrentWords.map((item, i) =>
        `<div class="zh-word-chip in-drop" data-dz="${i}">${item.char} ✕</div>`).join('');
      drop.querySelectorAll('[data-dz]').forEach(el => {
        el.addEventListener('click', () => {
          const idx = parseInt(el.dataset.dz);
          const removed = this.zhBuilderCurrentWords.splice(idx, 1)[0];
          if (removed && removed.ref) removed.ref.style.visibility = 'visible';
          renderDrop();
        });
      });
    };

    bank.querySelectorAll('.zh-word-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        chip.style.visibility = 'hidden';
        this.zhBuilderCurrentWords.push({ char: chip.dataset.char, ref: chip });
        renderDrop();
      });
    });

    this.zhBuilderArena.querySelector('#zh-bl-reset').addEventListener('click', () => {
      this.zhBuilderCurrentWords.forEach(item => { if (item.ref) item.ref.style.visibility = 'visible'; });
      this.zhBuilderCurrentWords = [];
      renderDrop(); fb.style.display = 'none';
    });

    this.zhBuilderArena.querySelector('#zh-bl-check').addEventListener('click', () => {
      const built = this.zhBuilderCurrentWords.map(i => i.char).join('');
      const isOk  = built === q.cn;
      fb.style.display = 'block';
      if (isOk) {
        fb.style.background = 'rgba(16, 185, 129, 0.15)'; fb.style.color = '#34d399';
        fb.innerHTML = `✓ Hoàn hảo! 「${q.cn}」 (+15 XP)`;
        this.playChineseText(q.cn, this._zhSpkRate);
        window.storage && window.storage.addXP(15);
        setTimeout(() => { this.zhBuilderIndex++; this._renderZhBuilder(); }, 1800);
      } else {
        fb.style.background = 'rgba(244, 63, 94, 0.15)'; fb.style.color = '#fca5a5';
        fb.innerHTML = `✕ Chưa đúng. Thứ tự đúng: 「${q.cn}」 — Hãy thử lại!`;
      }
    });
  }

  // =========================================================================
  // SPLIT-SCREEN SPEAKING (Chinese)
  // =========================================================================
  _initZhSpeaking() {
    const w = this.flashcardList[this.flashcardIndex];
    if (!w) return;
    if (this.zhSpkHanzi)  this.zhSpkHanzi.textContent  = w.hanzi;
    if (this.zhSpkPinyin) this.zhSpkPinyin.textContent  = w.pinyin || '';
    if (this.zhSpkVi)     this.zhSpkVi.textContent      = w.vi || '';
    if (this.zhSpkCounter) this.zhSpkCounter.textContent = `${this.flashcardIndex + 1}/${this.flashcardList.length}`;
    this._zhSpkAttempts = [];
    if (this.zhSpkAttemptsRow) this.zhSpkAttemptsRow.innerHTML = '';
    this._zhSpkResetMic();
    setTimeout(() => this.playChineseText(w.hanzi, this._zhSpkRate), 400);
  }

  _zhSpkResetMic() {
    if (this.zhSpkMicZone)    this.zhSpkMicZone.style.display = 'flex';
    if (this.zhSpkResultPanel) this.zhSpkResultPanel.classList.remove('visible');
    if (this.zhSpkWaveBars)   this.zhSpkWaveBars.classList.remove('active');
    if (this.zhSpkMicBtn)     this.zhSpkMicBtn.classList.remove('recording');
    if (this.zhSpkMicHint)    this.zhSpkMicHint.textContent = 'Nhấn mic và đọc to từ bên trái';
  }

  _toggleZhMic() {
    const w = this.flashcardList[this.flashcardIndex];
    if (!w) return;

    if (this._zhSpkRecording) {
      if (this._zhSpkRecog) { try { this._zhSpkRecog.stop(); } catch(e) {} }
      this._zhSpkRecording = false;
      if (this.zhSpkMicBtn)  this.zhSpkMicBtn.classList.remove('recording');
      if (this.zhSpkWaveBars) this.zhSpkWaveBars.classList.remove('active');
      if (this.zhSpkMicHint) this.zhSpkMicHint.textContent = 'Đã dừng. Nhấn lại để thử.';
      return;
    }

    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) {
      if (this.zhSpkMicHint) this.zhSpkMicHint.textContent = '⚠️ Trình duyệt chưa hỗ trợ nhận diện giọng nói!';
      return;
    }

    this._zhSpkRecog = new SR();
    this._zhSpkRecog.lang = 'zh-CN';
    this._zhSpkRecog.continuous = false;
    this._zhSpkRecog.interimResults = false;
    this._zhSpkRecording = true;
    if (this.zhSpkMicBtn)   this.zhSpkMicBtn.classList.add('recording');
    if (this.zhSpkWaveBars) this.zhSpkWaveBars.classList.add('active');
    if (this.zhSpkMicHint)  this.zhSpkMicHint.textContent = 'Đang lắng nghe...';

    this._zhSpkRecog.onresult = (event) => {
      this._zhSpkRecording = false;
      if (this.zhSpkMicBtn)   this.zhSpkMicBtn.classList.remove('recording');
      if (this.zhSpkWaveBars) this.zhSpkWaveBars.classList.remove('active');
      const transcript = event.results[0][0].transcript.trim();
      const score = window.audioCtrl ? window.audioCtrl.calculateSimilarity(transcript, w.hanzi) : 0;
      this._zhSpkShowResult(score, transcript, w);
    };
    this._zhSpkRecog.onerror = () => {
      this._zhSpkRecording = false;
      if (this.zhSpkMicBtn)   this.zhSpkMicBtn.classList.remove('recording');
      if (this.zhSpkWaveBars) this.zhSpkWaveBars.classList.remove('active');
      if (this.zhSpkMicHint)  this.zhSpkMicHint.textContent = '⚠️ Lỗi micro. Thử lại!';
    };
    this._zhSpkRecog.onend = () => { this._zhSpkRecording = false; };
    try { this._zhSpkRecog.start(); } catch(e) { this._zhSpkRecording = false; }
  }

  _zhSpkShowResult(score, transcript, w) {
    this._zhSpkAttempts.push(score);

    // SVG ring
    const circumference = 245;
    const offset = circumference - (score / 100) * circumference;
    if (this.zhSpkScoreFill) {
      this.zhSpkScoreFill.style.strokeDashoffset = offset;
      this.zhSpkScoreFill.style.stroke = score >= 80 ? '#10b981' : score >= 50 ? '#f59e0b' : '#f43f5e';
    }
    if (this.zhSpkScoreVal) this.zhSpkScoreVal.textContent = `${score}%`;
    if (this.zhSpkTranscript) this.zhSpkTranscript.textContent = `「${transcript}」`;

    // Message
    const msg = this.zhSpkEvalMsg;
    if (msg) {
      msg.className = 'spk-eval-msg';
      if (score >= 80) {
        msg.classList.add('great');
        msg.textContent = '🌟 Xuất sắc! Phát âm tiếng Trung rất chuẩn. (+20 XP)';
        window.storage && window.storage.addXP(20);
        window.audioCtrl && window.audioCtrl.playSuccessSound && window.audioCtrl.playSuccessSound();
      } else if (score >= 50) {
        msg.classList.add('good');
        msg.textContent = '👍 Khá tốt! Chú ý thanh điệu và âm cuối nhé.';
      } else {
        msg.classList.add('poor');
        msg.textContent = `🔄 Chưa nhận rõ. AI nghe thành「${transcript}」. Nghe mẫu và thử lại!`;
      }
    }

    // Attempt chip
    if (this.zhSpkAttemptsRow) {
      const chip = document.createElement('div');
      chip.className = `spk-attempt-chip ${score >= 80 ? 'great' : score >= 50 ? 'good' : 'poor'}`;
      chip.textContent = `#${this._zhSpkAttempts.length}: ${score}%`;
      this.zhSpkAttemptsRow.appendChild(chip);
    }

    if (this.zhSpkMicZone)    this.zhSpkMicZone.style.display = 'none';
    if (this.zhSpkResultPanel) this.zhSpkResultPanel.classList.add('visible');
  }

  // =========================================================================
  // 5. 3D FLASHCARD SRS & MIC PRACTICE
  // =========================================================================
  initFlashcards() {
    if (!window.CHINESE_VOCAB_DATA) return;
    this.flashcardList = [...window.CHINESE_VOCAB_DATA].slice(0, 100);
    this.flashcardIndex = 0;
    this.showFlashcard();
  }

  showFlashcard() {
    if (!this.flashcardList.length || !this.flashcardHanzi) return;

    if (this.flashcardCard) {
      this.flashcardCard.classList.remove('is-flipped');
    }

    const current = this.flashcardList[this.flashcardIndex];
    if (this.flashcardHanzi) this.flashcardHanzi.textContent = current.hanzi;
    if (this.flashcardPinyin) this.flashcardPinyin.textContent = current.pinyin;
    if (this.flashcardHanviet) this.flashcardHanviet.textContent = `Âm Hán Việt: ${current.hanviet}`;
    if (this.flashcardVi) this.flashcardVi.textContent = current.vi;

    if (this.flashcardProgress) {
      this.flashcardProgress.textContent = `Thẻ ${this.flashcardIndex + 1} / ${this.flashcardList.length}`;
    }

    // Synchronize Pronunciation Assessment target with current card
    this.updateAssessmentTarget();
  }

  nextFlashcard() {
    if (this.flashcardIndex < this.flashcardList.length - 1) {
      this.flashcardIndex++;
    } else {
      this.flashcardIndex = 0;
    }
    this.showFlashcard();
  }

  prevFlashcard() {
    if (this.flashcardIndex > 0) {
      this.flashcardIndex--;
    } else {
      this.flashcardIndex = this.flashcardList.length - 1;
    }
    this.showFlashcard();
  }

  updateAssessmentTarget() {
    if (!this.pronFeedbackArea) return;
    const current = (this.flashcardList && this.flashcardList.length) 
      ? this.flashcardList[this.flashcardIndex] 
      : { hanzi: '我', pinyin: 'wǒ', vi: 'Tôi, ta, mình' };

    this.renderAssessmentIdle(current);
  }

  renderAssessmentIdle(word) {
    if (!this.pronFeedbackArea) return;
    const hanzi = word.hanzi || '';
    const pinyin = word.pinyin || '';
    const vi = word.vi || '';

    this.pronFeedbackArea.innerHTML = `
      <div class="zh-pron-box idle">
        <div class="zh-pron-target-header">
          <div class="zh-pron-target-icon">🎯</div>
          <div class="zh-pron-target-info">
            <div class="zh-pron-target-label">TỪ MỤC TIÊU CẦN LUYỆN:</div>
            <div class="zh-pron-target-value">
              <span class="hanzi">${hanzi}</span>
              <span class="pinyin">(${pinyin})</span>
              <span class="meaning">• ${vi}</span>
            </div>
          </div>
          <span class="zh-pron-status-badge ready">Sẵn sàng</span>
        </div>
        <p class="zh-pron-hint">
          👉 Bấm nút <strong>"Bấm để nói qua Micro"</strong> bên dưới và phát âm to rõ từ này để AI chấm điểm độ chuẩn xác (%) và nhận xét chi tiết.
        </p>
      </div>
    `;
  }

  populateMicWords() {
    this.updateAssessmentTarget();
  }

  toggleMicPractice() {
    if (this.isRecording) {
      this.stopMicPractice();
    } else {
      this.startMicPractice();
    }
  }

  startMicPractice() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      if (this.pronFeedbackArea) {
        this.pronFeedbackArea.innerHTML = `
          <div class="zh-pron-box evaluated retry">
            <div style="font-size: 13px; color: #fca5a5; font-weight: 700;">
              ⚠️ Trình duyệt chưa hỗ trợ Web Speech API nhận diện giọng nói. Hãy dùng Google Chrome hoặc Microsoft Edge để luyện nói AI.
            </div>
          </div>
        `;
      }
      return;
    }

    const currentWord = (this.flashcardList && this.flashcardList.length) 
      ? this.flashcardList[this.flashcardIndex] 
      : { hanzi: '我', pinyin: 'wǒ', vi: 'Tôi, ta, mình' };

    try {
      this.recognition = new SpeechRecognition();
      this.recognition.lang = 'zh-CN';
      this.recognition.continuous = false;
      this.recognition.interimResults = false;

      this.isRecording = true;
      if (this.micStartBtn) {
        this.micStartBtn.classList.add('is-recording');
        if (this.micBtnText) {
          this.micBtnText.textContent = '🛑 Đang nghe... Bấm để dừng';
        }
      }

      if (this.pronFeedbackArea) {
        this.pronFeedbackArea.innerHTML = `
          <div class="zh-pron-box listening">
            <div class="zh-pron-listening-header">
              <div class="zh-wave-bars">
                <span></span><span></span><span></span><span></span><span></span>
              </div>
              <div class="zh-listening-text">
                <div class="zh-listening-title">🎙️ Đang lắng nghe giọng bạn...</div>
                <div class="zh-listening-sub">
                  Hãy phát âm to rõ: <strong style="color: #fbbf24; font-size: 16px;">"${currentWord.hanzi}"</strong> <span style="color: #38bdf8;">(${currentWord.pinyin})</span>
                </div>
              </div>
            </div>
          </div>
        `;
      }

      this.recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript.trim();
        const confidence = (event.results[0][0].confidence !== undefined && event.results[0][0].confidence > 0)
          ? event.results[0][0].confidence
          : null;
        this.evaluateChinesePronunciation(transcript, currentWord, confidence);
      };

      this.recognition.onerror = () => {
        if (this.pronFeedbackArea) {
          this.pronFeedbackArea.innerHTML = `
            <div class="zh-pron-box evaluated retry">
              <div style="display: flex; align-items: center; gap: 10px;">
                <span style="font-size: 22px;">⚠️</span>
                <div>
                  <div style="font-size: 13px; font-weight: 800; color: #fca5a5;">Chưa nhận diện được âm thanh</div>
                  <div style="font-size: 12px; color: var(--text-secondary); margin-top: 2px;">
                    Vui lòng kiểm tra quyền Micro của trình duyệt và bấm nói lại to, rõ hơn nhé!
                  </div>
                </div>
              </div>
            </div>
          `;
        }
        this.stopMicPractice();
      };

      this.recognition.onend = () => {
        this.stopMicPractice();
      };

      this.recognition.start();
    } catch (err) {
      console.error('Speech recognition error:', err);
      this.stopMicPractice();
    }
  }

  stopMicPractice() {
    if (this.recognition) {
      try { this.recognition.stop(); } catch (e) {}
      this.recognition = null;
    }
    this.isRecording = false;
    if (this.micStartBtn) {
      this.micStartBtn.classList.remove('is-recording');
      if (this.micBtnText) {
        this.micBtnText.textContent = '🎙️ Bấm để nói lại qua Micro';
      }
    }
  }

  evaluateChinesePronunciation(transcript, targetWord, confidence = null) {
    if (!this.pronFeedbackArea) return;

    const targetHanzi = (targetWord && targetWord.hanzi) ? targetWord.hanzi.trim() : '';
    const targetPinyin = (targetWord && targetWord.pinyin) ? targetWord.pinyin.trim() : '';
    const targetVi = (targetWord && targetWord.vi) ? targetWord.vi.trim() : '';

    const cleanSpoken = transcript.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?!，。！？]/g, "").trim();

    if (!cleanSpoken) {
      this.pronFeedbackArea.innerHTML = `
        <div class="zh-pron-box evaluated retry">
          <div style="font-size: 13px; color: #fca5a5; font-weight: 700;">
            ⚠️ Không phát hiện âm tiết rõ ràng. Hãy phát âm to hơn vào Micro nhé!
          </div>
        </div>
      `;
      return;
    }

    let score = 0;
    let verdict = '';
    let praise = '';
    let badgeType = ''; // 'excellent' | 'good' | 'retry'

    // 1. Exact Match
    if (cleanSpoken === targetHanzi) {
      score = confidence ? Math.min(100, Math.max(92, Math.round(confidence * 100))) : 98;
      verdict = 'Đạt - Xuất sắc!';
      praise = `🌟 Tuyệt vời! Bạn phát âm từ "${targetHanzi}" rất chuẩn xác, khẩu hình và thanh điệu hoàn toàn tự nhiên.`;
      badgeType = 'excellent';
    } 
    // 2. Spoken includes target word
    else if (cleanSpoken.includes(targetHanzi)) {
      score = 86;
      verdict = 'Đạt - Rất tốt!';
      praise = `👍 AI đã nhận diện đúng từ mục tiêu "${targetHanzi}". Khi luyện flashcard, hãy đọc dứt khoát riêng từ này để đạt 100% nhé!`;
      badgeType = 'good';
    }
    // 3. Spoken is part of target word
    else if (targetHanzi.includes(cleanSpoken) && cleanSpoken.length > 0) {
      const ratio = cleanSpoken.length / targetHanzi.length;
      score = Math.round(55 + ratio * 30);
      verdict = `Đạt mức khá (${score}%)`;
      praise = `💡 Bạn đã phát âm đúng phần "${cleanSpoken}". Chú ý đọc đầy đủ cả từ "${targetHanzi}" (${targetPinyin}) nhé!`;
      badgeType = 'good';
    }
    // 4. Tone/pinyin check with vocab dictionary
    else {
      const spokenWordObj = window.CHINESE_VOCAB_DATA 
        ? window.CHINESE_VOCAB_DATA.find(w => w.hanzi === cleanSpoken) 
        : null;
      const spokenPinyin = spokenWordObj ? spokenWordObj.pinyin : '';

      const removeTones = (str) => {
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
      };

      const targetBase = removeTones(targetPinyin);
      const spokenBase = spokenPinyin ? removeTones(spokenPinyin) : '';

      if (spokenBase && targetBase && spokenBase === targetBase) {
        // Same syllable, wrong tone
        score = 72;
        verdict = 'Khá - Cần sửa thanh điệu!';
        praise = `⚠️ Bạn đọc đúng âm tiết cơ bản "${targetBase}" nhưng chưa chuẩn thanh điệu. Từ "${targetHanzi}" mang thanh điệu (${targetPinyin}). Hãy bấm "Nghe phát âm" mẫu rồi thử lại!`;
        badgeType = 'retry';
      } else {
        // Character overlap
        let matchCount = 0;
        for (let ch of targetHanzi) {
          if (cleanSpoken.includes(ch)) matchCount++;
        }

        if (matchCount > 0) {
          score = Math.round((matchCount / targetHanzi.length) * 60);
          verdict = `Cần cố gắng thêm (${score}%)`;
          praise = `AI nhận diện bạn phát âm thành "${cleanSpoken}". Hãy nghe lại âm mẫu từ "${targetHanzi}" (${targetPinyin}) và thử lại nhé!`;
          badgeType = 'retry';
        } else {
          score = Math.floor(Math.random() * 15) + 30; // 30% - 44%
          verdict = 'Chưa đạt - Hãy thử lại!';
          praise = `AI nhận diện thành "${cleanSpoken}" (Từ mẫu: "${targetHanzi}" - ${targetPinyin}). Bạn hãy bấm nút "🔊 Nghe phát âm" để nghe lại và nói lại nhé!`;
          badgeType = 'retry';
        }
      }
    }

    // Award XP if >= 70%
    if (score >= 70) {
      const xpBonus = score >= 88 ? 5 : 3;
      if (window.storage && typeof window.storage.addXP === 'function') {
        window.storage.addXP(xpBonus);
        if (window.app && typeof window.app.updateHeaderStats === 'function') {
          window.app.updateHeaderStats();
        }
      }
      if (window.audioCtrl && typeof window.audioCtrl.playSuccessSound === 'function') {
        window.audioCtrl.playSuccessSound();
      }
    }

    // Render result into DOM
    this.pronFeedbackArea.innerHTML = `
      <div class="zh-pron-box evaluated ${badgeType}">
        <div class="zh-pron-score-row">
          <div class="zh-score-circle ${badgeType}">
            <span class="score-num">${score}%</span>
            <span class="score-label">ĐỘ CHUẨN</span>
          </div>
          <div class="zh-pron-verdict-col">
            <div class="zh-verdict-badge ${badgeType}">${verdict}</div>
            <div class="zh-pron-praise">${praise}</div>
          </div>
        </div>

        <div class="zh-pron-comparison-table">
          <div class="zh-comp-item target">
            <span class="comp-label">🎯 Từ mục tiêu:</span>
            <span class="comp-val">${targetHanzi} <small>(${targetPinyin})</small></span>
          </div>
          <div class="zh-comp-divider">➔</div>
          <div class="zh-comp-item spoken ${badgeType}">
            <span class="comp-label">🗣️ Bạn đã phát âm:</span>
            <span class="comp-val">"${cleanSpoken}"</span>
          </div>
        </div>
      </div>
    `;
  }

  // =========================================================================
  // 6. TONE EAR-TRAINING QUIZ
  // =========================================================================
  initToneQuiz() {
    const data = window.CHINESE_PINYIN_DATA;
    if (!data || !data.quizBank) return;

    this.quizQuestions = [...data.quizBank].sort(() => Math.random() - 0.5);
    this.quizIndex = 0;
    this.quizScore = 0;
    this.renderToneQuiz();
  }

  renderToneQuiz() {
    if (!this.quizContainer) return;

    if (this.quizIndex >= this.quizQuestions.length) {
      this.quizContainer.innerHTML = `
        <div style="text-align: center; padding: 24px;">
          <div style="font-size: 50px;">🏆</div>
          <h3 style="font-size: 22px; color: #ffffff; margin: 8px 0;">Hoàn Thành Luyện Tai Nghe Thanh Điệu!</h3>
          <p style="color: var(--text-secondary); margin-bottom: 16px;">
            Bạn đạt <strong>${this.quizScore} / ${this.quizQuestions.length}</strong> câu chính xác.
          </p>
          <div class="zh-badge-pill gold" style="font-size: 15px; padding: 8px 20px;">
            ⚡ +15 XP Thưởng Luyện Nghe Tiếng Trung
          </div>
          <div style="margin-top: 18px;">
            <button class="zh-action-btn primary" id="zh-quiz-retry-btn">🔄 Luyện tập lại</button>
          </div>
        </div>
      `;

      const retryBtn = this.quizContainer.querySelector('#zh-quiz-retry-btn');
      if (retryBtn) retryBtn.addEventListener('click', () => this.initToneQuiz());
      return;
    }

    const q = this.quizQuestions[this.quizIndex];
    this.quizAnswered = false;

    const optionsHtml = q.options.map((opt, idx) => `
      <button class="zh-filter-pill" style="padding: 12px 18px; font-size: 15px; font-weight: 700; width: 100%; text-align: center;" data-idx="${idx}">
        ${opt}
      </button>
    `).join('');

    this.quizContainer.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
        <span style="font-size: 13px; font-weight: 700; color: #fbbf24;">Câu ${this.quizIndex + 1} / ${this.quizQuestions.length}</span>
        <span class="zh-badge-pill gold">Điểm: ${this.quizScore}</span>
      </div>

      <div style="text-align: center; margin-bottom: 20px;">
        <button id="zh-quiz-play-sound" style="width: 70px; height: 70px; border-radius: 50%; background: linear-gradient(135deg, #e11d48, #f59e0b); color: #fff; font-size: 28px; border: none; cursor: pointer; box-shadow: 0 4px 16px rgba(225, 29, 72, 0.4);">
          🔊
        </button>
        <div style="font-size: 16px; font-weight: 700; color: #ffffff; margin-top: 12px;">
          ${q.question}
        </div>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 16px;" id="zh-quiz-options">
        ${optionsHtml}
      </div>

      <div id="zh-quiz-feedback" style="display: none; padding: 12px; border-radius: 8px; font-size: 13px; margin-bottom: 14px;"></div>

      <div id="zh-quiz-next-box" style="display: none; text-align: center;">
        <button id="zh-quiz-next-btn" class="zh-action-btn primary" style="padding: 10px 24px;">
          Câu tiếp theo ➔
        </button>
      </div>
    `;

    const soundBtn = this.quizContainer.querySelector('#zh-quiz-play-sound');
    soundBtn.addEventListener('click', () => {
      this.playChineseText(q.audioWord, 0.9);
    });

    // Only auto play audio if user is actively on Chinese tab
    const isZhActive = window.app && window.app.currentTab === 'chinese';
    if (isZhActive) {
      setTimeout(() => {
        if (window.app && window.app.currentTab === 'chinese') {
          this.playChineseText(q.audioWord, 0.9);
        }
      }, 200);
    }

    const optionBtns = this.quizContainer.querySelectorAll('#zh-quiz-options button');
    optionBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        if (this.quizAnswered) return;
        this.quizAnswered = true;

        const chosenIdx = parseInt(btn.dataset.idx, 10);
        const fb = this.quizContainer.querySelector('#zh-quiz-feedback');
        const nextBox = this.quizContainer.querySelector('#zh-quiz-next-box');

        optionBtns.forEach((b, i) => {
          b.disabled = true;
          if (i === q.correctIndex) {
            b.style.background = 'rgba(16, 185, 129, 0.3)';
            b.style.borderColor = '#10b981';
            b.style.color = '#6ee7b7';
          } else if (i === chosenIdx) {
            b.style.background = 'rgba(239, 68, 68, 0.3)';
            b.style.borderColor = '#ef4444';
            b.style.color = '#fca5a5';
          }
        });

        if (chosenIdx === q.correctIndex) {
          this.quizScore++;
          if (fb) {
            fb.style.display = 'block';
            fb.style.background = 'rgba(16, 185, 129, 0.15)';
            fb.style.color = '#6ee7b7';
            fb.innerHTML = `🎉 <strong>Chính xác!</strong> ${q.explanation}`;
          }
          if (window.audioCtrl && typeof window.audioCtrl.playSuccessSound === 'function') {
            window.audioCtrl.playSuccessSound();
          }
        } else {
          if (fb) {
            fb.style.display = 'block';
            fb.style.background = 'rgba(239, 68, 68, 0.15)';
            fb.style.color = '#fca5a5';
            fb.innerHTML = `⚠️ <strong>Chưa chính xác!</strong> ${q.explanation}`;
          }
        }

        if (nextBox) nextBox.style.display = 'block';
      });
    });

    const nextBtn = this.quizContainer.querySelector('#zh-quiz-next-btn');
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        this.quizIndex++;
        this.renderToneQuiz();
      });
    }
  }

  // =========================================================================
  // GRAMMAR — Ngữ Pháp Tiếng Trung
  // =========================================================================

  _getLevelColor(level) {
    if (level === 'HSK1') return { bg: 'rgba(34,197,94,0.12)', border: '#22c55e', text: '#4ade80', dot: '🟢' };
    if (level === 'HSK2') return { bg: 'rgba(59,130,246,0.12)', border: '#3b82f6', text: '#60a5fa', dot: '🔵' };
    return { bg: 'rgba(249,115,22,0.12)', border: '#f97316', text: '#fb923c', dot: '🟠' };
  }

  renderGrammar() {
    if (!this.grammarGrid) return;
    const data = window.CHINESE_GRAMMAR_DATA || [];
    const q = this.grammarSearchInput ? this.grammarSearchInput.value.trim().toLowerCase() : '';
    const activeBtn = this.grammarLevelBtns ? [...this.grammarLevelBtns].find(b => b.classList.contains('active')) : null;
    const level = activeBtn ? activeBtn.dataset.grLevel : 'all';

    const filtered = data.filter(g => {
      const matchLevel = level === 'all' || g.level === level;
      const matchQ = !q || g.title.toLowerCase().includes(q) || g.subtitle.toLowerCase().includes(q) || g.summary.toLowerCase().includes(q);
      return matchLevel && matchQ;
    });

    if (filtered.length === 0) {
      this.grammarGrid.innerHTML = `<div style="grid-column:1/-1; text-align:center; padding:40px; color:var(--text-muted); font-size:14px;">🔍 Không tìm thấy chuyên đề nào phù hợp</div>`;
      return;
    }

    this.grammarGrid.innerHTML = filtered.map(g => {
      const lc = this._getLevelColor(g.level);
      return `
        <div class="zh-grammar-card" data-grammar-id="${g.id}" style="
          background: var(--bg-card);
          border: 1px solid var(--glass-border);
          border-left: 4px solid ${lc.border};
          border-radius: 14px;
          padding: 18px;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          flex-direction: column;
          gap: 10px;
        ">
          <div style="display:flex; align-items:flex-start; justify-content:space-between; gap:8px;">
            <div style="display:flex; align-items:center; gap:10px; flex:1;">
              <span style="font-size:22px;">${g.icon}</span>
              <div>
                <div style="font-size:14px; font-weight:800; color:#fff; line-height:1.3;">${g.title}</div>
                <div style="font-size:11px; color:var(--text-muted); margin-top:2px;">${g.subtitle}</div>
              </div>
            </div>
            <span style="
              font-size:10px; font-weight:800; padding:3px 8px;
              border-radius:999px; background:${lc.bg}; color:${lc.text};
              border:1px solid ${lc.border}40; white-space:nowrap; flex-shrink:0;
            ">${lc.dot} ${g.level}</span>
          </div>
          <p style="font-size:12px; color:var(--text-secondary); line-height:1.6; margin:0; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden;">${g.summary}</p>
          <div style="display:flex; align-items:center; justify-content:space-between; margin-top:4px;">
            <span style="font-size:11px; color:var(--text-muted);">${g.examples.length} ví dụ • ${g.structure.length} công thức</span>
            <span style="font-size:11px; color:${lc.text}; font-weight:700;">Xem chi tiết →</span>
          </div>
        </div>
      `;
    }).join('');

    // Attach click events
    this.grammarGrid.querySelectorAll('.zh-grammar-card').forEach(card => {
      card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-3px)';
        card.style.boxShadow = '0 8px 30px rgba(0,0,0,0.3)';
        card.style.borderColor = 'var(--glass-border-hover)';
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
        card.style.boxShadow = '';
        card.style.borderColor = 'var(--glass-border)';
      });
      card.addEventListener('click', () => {
        const g = data.find(x => x.id === card.dataset.grammarId);
        if (g) this.openGrammarReader(g);
      });
    });
  }

  openGrammarReader(g) {
    if (!this.grammarReaderOverlay || !g) return;
    const lc = this._getLevelColor(g.level);

    // Title
    this.grammarReaderTitle.innerHTML = `
      <span style="font-size:22px;">${g.icon}</span>
      <span style="margin-left:8px;">${g.title}</span>
      <span style="font-size:12px; margin-left:10px; padding:3px 8px; border-radius:999px; background:${lc.bg}; color:${lc.text}; font-weight:700;">${lc.dot} ${g.level}</span>
    `;

    // Body
    const structureHtml = g.structure.map(s => `
      <div style="margin-bottom:8px;">
        <div style="font-size:11px; color:var(--text-muted); font-weight:700; text-transform:uppercase; margin-bottom:4px;">${s.label}</div>
        <div style="background:rgba(249,115,22,0.08); border:1px solid rgba(249,115,22,0.2); border-radius:10px; padding:12px 16px; font-size:14px; color:#fb923c; font-weight:700; font-family:'Noto Sans SC', 'Noto Sans TC', sans-serif; letter-spacing:0.05em;">
          ${s.formula}
        </div>
      </div>
    `).join('');

    const examplesHtml = g.examples.map((ex, i) => `
      <div style="display:flex; align-items:center; gap:12px; padding:12px 0; border-bottom:1px solid var(--glass-border);">
        <span style="width:22px; height:22px; border-radius:50%; background:rgba(249,115,22,0.15); color:#fb923c; font-size:11px; font-weight:800; display:flex; align-items:center; justify-content:center; flex-shrink:0;">${i+1}</span>
        <div style="flex:1;">
          <div style="font-size:18px; font-weight:700; color:#fff; font-family:'Noto Sans SC', 'Noto Sans TC', sans-serif; line-height:1.4;">${ex.cn}</div>
          <div style="font-size:12px; color:#fb923c; margin-top:2px; font-style:italic;">${ex.pinyin}</div>
          <div style="font-size:12px; color:var(--text-muted); margin-top:3px;">${ex.vi}</div>
        </div>
        <button class="zh-gr-audio-btn" data-text="${ex.cn}" style="
          background:rgba(249,115,22,0.12); border:1px solid rgba(249,115,22,0.3);
          color:#fb923c; width:36px; height:36px; border-radius:50%; font-size:15px;
          cursor:pointer; flex-shrink:0; display:flex; align-items:center; justify-content:center;
          transition:all 0.15s ease;
        ">🔊</button>
      </div>
    `).join('');

    const notesHtml = g.notes ? `
      <div style="margin-top:20px; background:rgba(99,102,241,0.08); border:1px solid rgba(99,102,241,0.2); border-radius:12px; padding:14px 16px;">
        <div style="font-size:11px; font-weight:800; color:var(--primary); text-transform:uppercase; margin-bottom:6px;">💡 Ghi chú & Mẹo nhớ</div>
        <div style="font-size:13px; color:var(--text-secondary); line-height:1.7; white-space:pre-line;">${g.notes}</div>
      </div>
    ` : '';

    this.grammarReaderBody.innerHTML = `
      <div style="font-size:13px; color:var(--text-secondary); line-height:1.7; margin-bottom:18px;">${g.summary}</div>

      <div style="margin-bottom:20px;">
        <div style="font-size:11px; font-weight:800; color:#fb923c; text-transform:uppercase; margin-bottom:10px;">🔷 Cấu Trúc</div>
        ${structureHtml}
      </div>

      <div>
        <div style="font-size:11px; font-weight:800; color:#60a5fa; text-transform:uppercase; margin-bottom:4px;">📝 Ví Dụ Thực Tế</div>
        ${examplesHtml}
      </div>

      ${notesHtml}
    `;

    // Show
    this.grammarReaderOverlay.style.display = 'flex';
    document.body.style.overflow = 'hidden';

    // Attach audio
    this.grammarReaderOverlay.querySelectorAll('.zh-gr-audio-btn').forEach(btn => {
      btn.addEventListener('mouseenter', () => btn.style.background = 'rgba(249,115,22,0.25)');
      btn.addEventListener('mouseleave', () => btn.style.background = 'rgba(249,115,22,0.12)');
      btn.addEventListener('click', () => {
        const utter = new SpeechSynthesisUtterance(btn.dataset.text);
        utter.lang = 'zh-CN';
        speechSynthesis.cancel();
        speechSynthesis.speak(utter);
      });
    });
  }

  closeGrammarReader() {
    if (this.grammarReaderOverlay) {
      this.grammarReaderOverlay.style.display = 'none';
      document.body.style.overflow = '';
    }
  }
  // =========================================================================
  // 1. ĐỌC HIỂU (READING COMPREHENSION)
  // =========================================================================
  renderReading() {
    const data = window.CHINESE_READING_DATA || [];
    const listContainer = document.getElementById('zh-reading-cards-list');
    if (!listContainer) return;

    // Filter buttons
    const filterBtns = document.querySelectorAll('.zh-rd-level-btn');
    filterBtns.forEach(btn => {
      btn.onclick = () => {
        filterBtns.forEach(b => {
          b.classList.remove('active');
          b.style.background = 'transparent';
          b.style.color = 'var(--text-muted)';
        });
        btn.classList.add('active');
        btn.style.background = 'rgba(139,92,246,0.2)';
        btn.style.color = '#c084fc';
        this.activeReadingLevel = btn.dataset.rdLevel;
        this.renderReadingCards();
      };
    });

    this.renderReadingCards();

    // Toggle controls
    const togglePy = document.getElementById('zh-rd-toggle-pinyin');
    if (togglePy) {
      togglePy.onclick = () => {
        this.readingShowPinyin = !this.readingShowPinyin;
        togglePy.textContent = `🔤 Pinyin: ${this.readingShowPinyin ? 'BẬT' : 'TẮT'}`;
        document.querySelectorAll('.zh-st-pinyin').forEach(el => {
          el.style.display = this.readingShowPinyin ? 'block' : 'none';
        });
      };
    }

    const toggleVi = document.getElementById('zh-rd-toggle-vi');
    if (toggleVi) {
      toggleVi.onclick = () => {
        this.readingShowVi = !this.readingShowVi;
        toggleVi.textContent = `🇻🇳 Dịch: ${this.readingShowVi ? 'BẬT' : 'TẮT'}`;
        document.querySelectorAll('.zh-st-vi').forEach(el => {
          el.style.display = this.readingShowVi ? 'block' : 'none';
        });
      };
    }

    const playAllBtn = document.getElementById('zh-rd-play-all');
    if (playAllBtn) {
      playAllBtn.onclick = () => this.playReadingPassageAll();
    }
  }

  renderReadingCards() {
    const data = window.CHINESE_READING_DATA || [];
    const listContainer = document.getElementById('zh-reading-cards-list');
    if (!listContainer) return;

    const filtered = data.filter(d => this.activeReadingLevel === 'all' || d.level === this.activeReadingLevel);
    listContainer.innerHTML = '';

    if (!filtered.length) {
      listContainer.innerHTML = `<div style="font-size: 12px; color: var(--text-muted); padding: 12px; text-align: center;">Chưa có bài đọc ở cấp độ này</div>`;
      return;
    }

    filtered.forEach((p, idx) => {
      const card = document.createElement('div');
      card.className = `zh-reading-card ${this.activeReadingId === p.id || (!this.activeReadingId && idx === 0) ? 'active' : ''}`;
      card.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
          <span class="zh-badge-pill ${p.level === 'HSK1' ? 'gold' : p.level === 'HSK2' ? 'red' : 'purple'}" style="font-size: 10px;">${p.level}</span>
          <span style="font-size: 11px; color: var(--text-muted);">${(p.questions || []).length} câu hỏi</span>
        </div>
        <div style="font-size: 15px; font-weight: 800; color: #fff;">${p.title}</div>
        <div style="font-size: 12px; color: var(--text-secondary); margin-top: 2px;">${p.titleVi}</div>
      `;
      card.onclick = () => {
        document.querySelectorAll('.zh-reading-card').forEach(c => c.classList.remove('active'));
        card.classList.add('active');
        this.selectReadingPassage(p.id);
      };
      listContainer.appendChild(card);
    });

    if (!this.activeReadingId && filtered.length > 0) {
      this.selectReadingPassage(filtered[0].id);
    }
  }

  selectReadingPassage(id) {
    const data = window.CHINESE_READING_DATA || [];
    const passage = data.find(d => d.id === id) || data[0];
    if (!passage) return;
    this.activeReadingId = passage.id;

    const titleEl = document.getElementById('zh-rd-current-title');
    const subtitleEl = document.getElementById('zh-rd-current-subtitle');
    const sentencesEl = document.getElementById('zh-rd-sentences');
    const questionsEl = document.getElementById('zh-rd-questions');

    if (titleEl) titleEl.textContent = `${passage.title} (${passage.titleVi})`;
    if (subtitleEl) subtitleEl.textContent = `Chủ đề: ${passage.topic || 'Đời sống'} · Trình độ: ${passage.level} · Bấm vào từng câu để nghe phát âm`;

    if (sentencesEl) {
      sentencesEl.innerHTML = (passage.text || []).map((s, idx) => `
        <div class="zh-sentence-item" data-s-idx="${idx}" onclick="chineseView.playChineseSentence(${idx})">
          <div class="zh-st-hanzi">
            <span style="font-size: 12px; color: #f43f5e; opacity: 0.8; font-family: monospace;">#${idx+1}</span>
            <span>${s.cn}</span>
            <button class="zh-bubble-btn" style="margin-left: auto;" title="Nghe câu này">🔊</button>
          </div>
          <div class="zh-st-pinyin" style="display: ${this.readingShowPinyin ? 'block' : 'none'};">${s.pinyin}</div>
          <div class="zh-st-vi" style="display: ${this.readingShowVi ? 'block' : 'none'};">${s.vi}</div>
        </div>
      `).join('');
    }

    if (questionsEl) {
      questionsEl.innerHTML = (passage.questions || []).map((q, qIdx) => `
        <div class="zh-q-item">
          <div style="font-weight: 700; color: #fff; font-size: 14px;">
            <span style="color: #fbbf24;">Câu ${qIdx+1}:</span> ${q.q} <span style="font-size: 12px; color: var(--text-muted); font-weight: normal;">(${q.qVi})</span>
          </div>
          <div class="zh-q-options">
            ${(q.options || []).map((opt, optIdx) => `
              <button class="zh-opt-choice" onclick="chineseView.checkReadingAnswer('${passage.id}', ${qIdx}, ${optIdx}, this)">
                <span>${opt}</span>
                <span style="font-size: 11px; opacity: 0.7;">${(q.optVi && q.optVi[optIdx]) ? q.optVi[optIdx] : ''}</span>
              </button>
            `).join('')}
          </div>
          <div class="zh-rd-q-fb" id="zh-rd-fb-${qIdx}" style="display: none; margin-top: 8px; font-size: 12px;"></div>
        </div>
      `).join('');
    }
  }

  playChineseSentence(idx) {
    const data = window.CHINESE_READING_DATA || [];
    const passage = data.find(d => d.id === this.activeReadingId);
    if (!passage || !passage.text || !passage.text[idx]) return;

    const sentenceItems = document.querySelectorAll('.zh-sentence-item');
    sentenceItems.forEach((el, i) => el.classList.toggle('playing', i === idx));

    this.playChineseText(passage.text[idx].cn, 0.9, () => {
      sentenceItems.forEach(el => el.classList.remove('playing'));
    });
  }

  playReadingPassageAll() {
    const data = window.CHINESE_READING_DATA || [];
    const passage = data.find(d => d.id === this.activeReadingId);
    if (!passage || !passage.text || !passage.text.length) return;

    let cur = 0;
    const playNext = () => {
      if (cur >= passage.text.length) {
        document.querySelectorAll('.zh-sentence-item').forEach(el => el.classList.remove('playing'));
        return;
      }
      const sentenceItems = document.querySelectorAll('.zh-sentence-item');
      sentenceItems.forEach((el, i) => el.classList.toggle('playing', i === cur));
      this.playChineseText(passage.text[cur].cn, 0.9, () => {
        cur++;
        setTimeout(playNext, 400);
      });
    };
    playNext();
  }

  checkReadingAnswer(passageId, qIdx, optIdx, btn) {
    const data = window.CHINESE_READING_DATA || [];
    const passage = data.find(d => d.id === passageId);
    if (!passage || !passage.questions || !passage.questions[qIdx]) return;

    const q = passage.questions[qIdx];
    const parent = btn.closest('.zh-q-item');
    const allBtns = parent.querySelectorAll('.zh-opt-choice');
    allBtns.forEach(b => b.disabled = true);

    const isCorrect = optIdx === q.answer;
    btn.classList.add(isCorrect ? 'correct' : 'wrong');
    if (!isCorrect) {
      if (allBtns[q.answer]) allBtns[q.answer].classList.add('correct');
    }

    const fb = document.getElementById(`zh-rd-fb-${qIdx}`);
    if (fb) {
      fb.style.display = 'block';
      if (isCorrect) {
        fb.innerHTML = `<span style="color: #34d399; font-weight: 700;">✓ Chính xác! +10 XP</span>`;
        if (window.storage && window.storage.addXP) window.storage.addXP(10);
      } else {
        fb.innerHTML = `<span style="color: #f87171; font-weight: 700;">✕ Chưa đúng. Đáp án: ${q.options[q.answer]}</span>`;
      }
    }
  }

  // =========================================================================
  // 2. AI CONVERSATION (TIẾNG TRUNG)
  // =========================================================================
  initZhAiChat() {
    const scenarios = [
      { id: 'free', icon: '🌸', name: 'Tiểu Hoa (Tự do)', desc: 'Gia sư luyện phản xạ mọi chủ đề', welcome: { cn: '你好！我是你的中文老师小华。今天想聊点什么呢？', pinyin: 'Nǐ hǎo! Wǒ shì nǐ de zhōngwén lǎoshī Xiǎohuá. Jīntiān xiǎng liáo diǎn shénme ne?', vi: 'Chào bạn! Tôi là Tiểu Hoa - giáo viên tiếng Trung của bạn. Hôm nay bạn muốn trò chuyện về chủ đề gì?' }, replies: ['你好！很高兴认识你 (Chào cô! Rất vui được gặp cô)', '我想学汉语 (Tôi muốn học tiếng Hán)', '今天天气很好 (Hôm nay thời tiết rất đẹp)'] },
      { id: 'shopping', icon: '🛍️', name: 'Mua sắm Bắc Kinh', desc: 'Hỏi giá, mặc cả, thử đồ', welcome: { cn: '欢迎光临！请问您想买点什么？我们店今天全场打八折哦！', pinyin: 'Huānyíng guānglín! Qǐngwèn nín xiǎng mǎi diǎn shénme? Wǒmen diàn jīntiān quánchǎng dǎ bā zhé o!', vi: 'Kính chào quý khách! Bạn muốn mua gì ạ? Hôm nay cửa hàng chúng tôi giảm giá 20% toàn bộ đó!' }, replies: ['这个多少钱？ (Cái này bao nhiêu tiền?)', '太贵了，便宜一点吧 (Đắt quá, bớt chút đi nhé)', '有别的颜色吗？ (Có màu khác không?)'] },
      { id: 'restaurant', icon: '🍲', name: 'Gọi món quán ăn', desc: 'Xem thực đơn, cay/không cay', welcome: { cn: '服务员在！您好，几位？请坐，这是菜单，请问您想吃点什么？', pinyin: 'Fúwùyuán zài! Nǐ hǎo, jǐ wèi? Qǐng zuò, zhè shì càidān, qǐngwèn nín xiǎng chī diǎn shénme?', vi: 'Có nhân viên đây ạ! Xin chào, mấy vị ạ? Mời ngồi, đây là thực đơn, bạn muốn dùng món gì?' }, replies: ['我们要两份米饭 (Cho chúng tôi 2 phần cơm)', '不要太辣，谢谢 (Đừng làm cay quá nhé, cảm ơn)', '买单！ (Tính tiền!)'] },
      { id: 'travel', icon: '🚕', name: 'Taxi & Hỏi đường', desc: 'Chỉ đường, hỏi khoảng cách', welcome: { cn: '您好，请上车！您要去哪里？', pinyin: 'Nǐ hǎo, qǐng shàng chē! Nín yào qù nǎlǐ?', vi: 'Xin chào, mời lên xe! Bạn muốn đi đâu ạ?' }, replies: ['去北京火车站，谢谢 (Đến ga tàu Bắc Kinh, cảm ơn)', '到那里要多长时间？ (Đến đó mất bao lâu?)', '请在这儿停一下 (Cho tôi dừng ở đây một chút)'] },
      { id: 'interview', icon: '💼', name: 'Phỏng vấn HSK', desc: 'Giới thiệu bản thân & công việc', welcome: { cn: '你好，欢迎来参加面试。请先做个简单的自我介绍吧。', pinyin: 'Nǐ hǎo, huānyíng lái cānjiā miànshì. Qǐng xiān zuò gè jiǎndān de zìwǒ jièshào ba.', vi: 'Xin chào, hoan nghênh bạn đến phỏng vấn. Hãy giới thiệu ngắn gọn về bản thân nhé.' }, replies: ['我叫阮文南，我学习中文两年了 (Tôi tên Nguyễn Văn Nam, học tiếng Trung 2 năm rồi)', '我的专业是国际贸易 (Chuyên ngành của tôi là thương mại quốc tế)', '我通过了HSK3级考试 (Tôi đã thi đỗ chứng chỉ HSK 3)'] }
    ];

    const bar = document.getElementById('zh-ai-scenarios-bar');
    if (bar) {
      bar.innerHTML = scenarios.map(s => `
        <button class="zh-scenario-pill ${s.id === this.zhAiScenario ? 'active' : ''}" data-sc-id="${s.id}" onclick="chineseView.selectZhAiScenario('${s.id}')">
          ${s.icon} ${s.name}
        </button>
      `).join('');
    }

    // Engine badge & Settings
    const engineBadge = document.getElementById('zh-ai-engine-badge');
    if (engineBadge) {
      const apiKey = (window.storage?.aiSettings?.geminiApiKey || '').trim();
      if (apiKey) {
        engineBadge.innerHTML = '🟢 Gemini AI (Trực tuyến)';
        engineBadge.style.color = '#34d399';
        engineBadge.style.borderColor = 'rgba(52, 211, 153, 0.4)';
        engineBadge.title = 'Đang kết nối Google Gemini AI trực tuyến. Bấm để cấu hình Model hoặc API Key.';
      } else {
        engineBadge.innerHTML = '⚡ AI Ngoại tuyến (Cài Key)';
        engineBadge.style.color = '#fbbf24';
        engineBadge.style.borderColor = 'rgba(251, 191, 36, 0.4)';
        engineBadge.title = 'Đang dùng Trợ lý Ngoại tuyến thông minh. Bấm để nhập Gemini API Key miễn phí.';
      }
      engineBadge.onclick = () => {
        if (window.aiChatView && typeof window.aiChatView.openSettingsModal === 'function') {
          window.aiChatView.openSettingsModal();
        } else {
          alert('Hãy vào màn hình AI Chat trong menu để cấu hình Gemini API Key.');
        }
      };
    }

    // Toggle controls
    const togglePy = document.getElementById('zh-ai-toggle-pinyin');
    if (togglePy) {
      togglePy.onclick = () => {
        this.zhAiShowPinyin = !this.zhAiShowPinyin;
        togglePy.textContent = `🔤 Pinyin: ${this.zhAiShowPinyin ? 'BẬT' : 'TẮT'}`;
        document.querySelectorAll('.zh-bubble-pinyin').forEach(el => {
          el.style.display = this.zhAiShowPinyin ? 'block' : 'none';
        });
      };
    }

    const toggleVi = document.getElementById('zh-ai-toggle-vi');
    if (toggleVi) {
      toggleVi.onclick = () => {
        this.zhAiShowVi = !this.zhAiShowVi;
        toggleVi.textContent = `🇻🇳 Nghĩa: ${this.zhAiShowVi ? 'BẬT' : 'TẮT'}`;
        document.querySelectorAll('.zh-bubble-vi').forEach(el => {
          el.style.display = this.zhAiShowVi ? 'block' : 'none';
        });
      };
    }

    const clearBtn = document.getElementById('zh-ai-clear-btn');
    if (clearBtn) {
      clearBtn.onclick = () => {
        this.zhAiMessages = [];
        if (window.storage) window.storage.saveChineseAiChatHistory(this.zhAiScenario, []);
        this.renderZhAiMessages();
      };
    }

    const sendBtn = document.getElementById('zh-ai-send-btn');
    const input = document.getElementById('zh-ai-input');
    if (sendBtn && input) {
      sendBtn.onclick = () => this.sendZhAiUserMessage();
      input.onkeydown = (e) => {
        if (e.key === 'Enter') this.sendZhAiUserMessage();
      };
    }

    const micBtn = document.getElementById('zh-ai-mic-btn');
    if (micBtn) {
      micBtn.onclick = () => this._toggleZhAiMic();
    }
    if (!this.zhAiRecog) {
      this._initZhAiSpeechRecognition();
    }

    // Load history or init default welcome
    if (!this.zhAiMessages || !this.zhAiMessages.length) {
      const saved = window.storage ? window.storage.getChineseAiChatHistory(this.zhAiScenario) : [];
      if (saved && saved.length > 0) {
        this.zhAiMessages = saved;
      } else {
        const sc = scenarios.find(s => s.id === this.zhAiScenario) || scenarios[0];
        this.zhAiMessages = [{
          role: 'ai',
          hanzi: sc.welcome.cn,
          pinyin: sc.welcome.pinyin,
          vi: sc.welcome.vi,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }];
      }
    }

    this.renderZhAiMessages();
    this.renderZhAiQuickReplies();
  }

  selectZhAiScenario(scId) {
    this.zhAiScenario = scId;
    document.querySelectorAll('.zh-scenario-pill').forEach(p => {
      p.classList.toggle('active', p.dataset.scId === scId);
    });

    const saved = window.storage ? window.storage.getChineseAiChatHistory(scId) : [];
    if (saved && saved.length > 0) {
      this.zhAiMessages = saved;
    } else {
      const scenarios = [
        { id: 'free', welcome: { cn: '你好！我是你的中文老师小华。今天想聊点什么呢？', pinyin: 'Nǐ hǎo! Wǒ shì nǐ de zhōngwén lǎoshī Xiǎohuá. Jīntiān xiǎng liáo diǎn shénme ne?', vi: 'Chào bạn! Tôi là Tiểu Hoa - giáo viên tiếng Trung của bạn. Hôm nay bạn muốn trò chuyện về chủ đề gì?' } },
        { id: 'shopping', welcome: { cn: '欢迎光临！请问您想买点什么？我们店今天全场打八折哦！', pinyin: 'Huānyíng guānglín! Qǐngwèn nín xiǎng mǎi diǎn shénme? Wǒmen diàn jīntiān quánchǎng dǎ bā zhé o!', vi: 'Kính chào quý khách! Bạn muốn mua gì ạ? Hôm nay cửa hàng chúng tôi giảm giá 20% toàn bộ đó!' } },
        { id: 'restaurant', welcome: { cn: '服务员在！您好，几位？请坐，这是菜单，请问您想吃点什么？', pinyin: 'Fúwùyuán zài! Nǐ hǎo, jǐ wèi? Qǐng zuò, zhè shì càidān, qǐngwèn nín xiǎng chī diǎn shénme?', vi: 'Có nhân viên đây ạ! Xin chào, mấy vị ạ? Mời ngồi, đây là thực đơn, bạn muốn dùng món gì?' } },
        { id: 'travel', welcome: { cn: '您好，请上车！您要去哪里？', pinyin: 'Nǐ hǎo, qǐng shàng chē! Nín yào qù nǎlǐ?', vi: 'Xin chào, mời lên xe! Bạn muốn đi đâu ạ?' } },
        { id: 'interview', welcome: { cn: '你好，欢迎来参加面试。请先做个简单的自我介绍吧。', pinyin: 'Nǐ hǎo, huānyíng lái cānjiā miànshì. Qǐng xiān zuò gè jiǎndān de zìwǒ jièshào ba.', vi: 'Xin chào, hoan nghênh bạn đến phỏng vấn. Hãy giới thiệu ngắn gọn về bản thân nhé.' } }
      ];
      const sc = scenarios.find(s => s.id === scId) || scenarios[0];
      this.zhAiMessages = [{
        role: 'ai',
        hanzi: sc.welcome.cn,
        pinyin: sc.welcome.pinyin,
        vi: sc.welcome.vi,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }];
    }

    this.renderZhAiMessages();
    this.renderZhAiQuickReplies();
  }

  renderZhAiQuickReplies() {
    const quickBar = document.getElementById('zh-ai-quick-replies');
    if (!quickBar) return;

    const quickData = {
      free: ['你好！很高兴认识你', '今天天气怎么样？', '我想学好中文发音', '你可以教我一句常用语吗？'],
      shopping: ['这个多少钱？', '太贵了，便宜一点吧', '我可以试穿一下吗？', '我要这个，请帮我包起来'],
      restaurant: ['请给我一份菜单', '这个菜辣不辣？', '我要两碗米饭', '服务员，买单！'],
      travel: ['请问去地铁站怎么走？', '到北京饭店多少钱？', '请在这里停车，谢谢', '离这里远不远？'],
      interview: ['我叫阮文南，今年二十五岁', '我学习中文两年了', '我希望能加入贵公司', '谢谢您的时间']
    };

    const chips = quickData[this.zhAiScenario] || quickData.free;
    quickBar.innerHTML = chips.map(c => `
      <div class="zh-quick-chip" onclick="chineseView.selectZhAiQuickReply('${this._esc(c)}')">${c}</div>
    `).join('');
  }

  selectZhAiQuickReply(text) {
    const input = document.getElementById('zh-ai-input');
    if (input) {
      input.value = text;
      this.sendZhAiUserMessage();
    }
  }

  renderZhAiMessages() {
    const stream = document.getElementById('zh-ai-messages-stream');
    if (!stream) return;

    stream.innerHTML = this.zhAiMessages.map(m => {
      const isUser = m.role === 'user';
      const hasChinese = /[\u4e00-\u9fff\u3400-\u4dbf]/.test(m.hanzi);
      return `
        <div class="zh-chat-msg ${isUser ? 'user' : 'ai'}">
          <div class="zh-chat-avatar">${isUser ? '👤' : '🌸'}</div>
          <div class="zh-chat-bubble">
            <div class="zh-bubble-hanzi">${m.hanzi}</div>
            ${m.pinyin ? `<div class="zh-bubble-pinyin" style="display: ${this.zhAiShowPinyin ? 'block' : 'none'};">${m.pinyin}</div>` : ''}
            ${m.vi ? `<div class="zh-bubble-vi" style="display: ${this.zhAiShowVi ? 'block' : 'none'};">💡 ${m.vi}</div>` : ''}
            ${m.tip ? `<div style="font-size: 11px; color: #a78bfa; margin-top: 4px;">👉 ${m.tip}</div>` : ''}
            <div class="zh-bubble-actions">
              ${hasChinese ? `<button class="zh-bubble-btn" onclick="chineseView.playChineseText('${this._esc(m.hanzi)}')">🔊 Nghe</button>` : ''}
              <button class="zh-bubble-btn" onclick="navigator.clipboard.writeText('${this._esc(m.hanzi)}')">📋 Sao chép</button>
              <span style="font-size: 10px; color: var(--text-muted); margin-left: auto;">${m.time || ''}</span>
            </div>
          </div>
        </div>
      `;
    }).join('');

    stream.scrollTop = stream.scrollHeight;
  }

  _showZhAiTypingIndicator() {
    this._removeZhAiTypingIndicator();
    const stream = document.getElementById('zh-ai-messages-stream');
    if (!stream) return;

    const div = document.createElement('div');
    div.className = 'zh-chat-msg ai';
    div.id = 'zh-ai-typing-indicator';
    div.innerHTML = `
      <div class="zh-chat-avatar">🌸</div>
      <div class="zh-chat-bubble" style="padding: 10px 16px;">
        <div class="zh-typing-bubble">
          <div class="zh-typing-dots">
            <span></span><span></span><span></span>
          </div>
          <span class="zh-typing-text">Tiểu Hoa đang suy nghĩ...</span>
        </div>
      </div>
    `;
    stream.appendChild(div);
    stream.scrollTop = stream.scrollHeight;
  }

  _removeZhAiTypingIndicator() {
    const el = document.getElementById('zh-ai-typing-indicator');
    if (el) el.remove();
  }

  async sendZhAiUserMessage() {
    if (this.zhAiIsRecording) {
      this.stopZhAiMic(false);
    }

    const input = document.getElementById('zh-ai-input');
    if (!input) return;
    const text = input.value.trim();
    if (!text) return;
    input.value = '';

    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    this.zhAiMessages.push({ role: 'user', hanzi: text, time: time });
    this.renderZhAiMessages();

    // Show typing dots in message stream
    this._showZhAiTypingIndicator();

    // Show typing status in top header
    const statusText = document.getElementById('zh-ai-status-text');
    if (statusText) statusText.innerHTML = `<span style="color: #fbbf24;">⏳ Tiểu Hoa đang suy nghĩ...</span>`;

    // Process reply
    try {
      const reply = await this._generateZhAiReply(text);
      this._removeZhAiTypingIndicator();
      this.zhAiMessages.push({
        role: 'ai',
        hanzi: reply.hanzi,
        pinyin: reply.pinyin || '',
        vi: reply.vi || '',
        tip: reply.tip || '',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      });
      if (window.storage) window.storage.saveChineseAiChatHistory(this.zhAiScenario, this.zhAiMessages);
      this.renderZhAiMessages();
      this.playChineseText(reply.hanzi, 0.95);
    } catch (e) {
      this._removeZhAiTypingIndicator();
      console.warn('Zh AI Chat reply error:', e);
    } finally {
      this._removeZhAiTypingIndicator();
      if (statusText) statusText.innerHTML = `<span style="width: 6px; height: 6px; border-radius: 50%; background: #10b981; display: inline-block;"></span> Sẵn sàng trò chuyện`;
    }
  }

  _detectInputLanguage(text) {
    if (!text) return 'empty';
    const hasChinese = /[\u4e00-\u9fff\u3400-\u4dbf]/.test(text);
    if (hasChinese) return 'zh';

    const hasVietnamese = /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/i.test(text) ||
      /\b(tôi|mình|em|anh|chị|bạn|không|đâu|chưa|gì|sao|chào|cảm ơn|cám ơn|tạm biệt|thế nào|bao nhiêu|được|có|là|nói|tiếng|học|muốn|biết|giúp|tại sao|người|viết|nghe|này|kia|đó|rồi|quá|lắm|nhé|nha|ạ|ơi|hả|chứ)\b/i.test(text);
    if (hasVietnamese) return 'vi';

    return 'en';
  }

  _generateOfflineZhReply(userText) {
    const raw = (userText || '').trim();
    const lang = this._detectInputLanguage(raw);
    const norm = raw.toLowerCase().trim();

    // 1. NON-CHINESE INPUT (Vietnamese, English, or other Latin)
    if (lang !== 'zh') {
      // 1.1 Meta: Complaint or surprise about language / Why did AI reply
      if (
        /(không|chưa|đâu|chẳng|hổng|not|didn't|don't).*(nói|viết|biết|học|hiểu|dùng|speak|write|know).*(tiếng trung|tiếng hoa|tiếng tàu|tiếng hán|chinese)/i.test(norm) ||
        /(tiếng trung|tiếng hoa|tiếng tàu|tiếng hán|chinese).*(đâu|hả|à|chăng)/i.test(norm) ||
        /(có).*(nói|viết|biết|speak).*(tiếng trung|tiếng hoa|tiếng tàu|tiếng hán|chinese).*(đâu)/i.test(norm) ||
        /(không phải|chưa phải|not).*(tiếng trung|tiếng hoa|tiếng tàu|tiếng hán|chinese)/i.test(norm) ||
        /(nói|viết|gõ|nhập|speak|wrote).*(tiếng việt|tiếng anh|vietnamese|english)/i.test(norm) ||
        /(sao|sao mà|sao lại|tại sao|sao vẫn|vẫn|mà|sao bạn|why|how).*(trả lời|hiểu|biết|phản hồi|reply|understand|answer)/i.test(norm) ||
        /(câu có sẵn|canned|bot|máy móc|tự động|học vẹt)/i.test(norm) ||
        /(hiểu|biết).*(tiếng việt|tiếng anh)/i.test(norm)
      ) {
        return {
          hanzi: '我会说中文，也能听懂你的话哦！你想学怎么用中文说吗？',
          pinyin: 'Wǒ huì shuō zhōngwén, yě néng tīngdǒng nǐ de huà o! Nǐ xiǎng xué zěnme yòng zhōngwén shuō ma?',
          vi: 'Tôi là trợ lý AI nên có thể hiểu tiếng của bạn! Nhưng vì đây là phòng luyện phản xạ tiếng Trung, tôi sẽ luôn trả lời bằng tiếng Trung và hướng dẫn bạn cách diễn đạt nhé.',
          tip: '💡 Bạn vừa nói câu: "Tôi không nói tiếng Trung...". Trong tiếng Trung, bạn có thể nói: "我没说中文呢" (Wǒ méi shuō zhōngwén ne) hoặc "我不会说中文" (Wǒ bù huì shuō zhōngwén - Tôi không biết nói tiếng Trung).'
        };
      }

      // 1.2 "Too much" or related idioms (matching "I am too much")
      if (/\b(too much|too far|over the top|lố quá|quá đáng|quá mức|quá nhiều)\b/i.test(norm)) {
        return {
          hanzi: '我太过分了 / 我太夸张了，你想表达哪个意思呢？',
          pinyin: 'Wǒ tài guòfèn le / Wǒ tài kuāzhāng le, nǐ xiǎng biǎodá nǎge yìsi ne?',
          vi: '"Tôi quá đáng rồi" hay "Tôi làm lố/kịch tính quá rồi", bạn muốn biểu đạt ý nào thế?',
          tip: '💡 Cụm "I am too much" tùy ngữ cảnh: nếu tự trách mình quá đáng dùng "我太过分了" (wǒ tài guòfèn le); nếu đùa là mình làm lố/quá đà dùng "我太夸张了" (wǒ tài kuāzhāng le).'
        };
      }

      // 1.3 Greetings
      if (/\b(chào|xin chào|hello|hi|hey|good morning|good afternoon|good evening)\b/i.test(norm)) {
        return {
          hanzi: '你好！很高兴认识你，今天想和我聊点什么？',
          pinyin: 'Nǐ hǎo! Hěn gāoxìng rènshí nǐ, jīntiān xiǎng hé wǒ liáo diǎn shénme?',
          vi: 'Chào bạn! Rất vui được quen biết bạn, hôm nay bạn muốn trò chuyện điều gì cùng tôi?',
          tip: '💡 "Xin chào" tiếng Trung là "你好" (Nǐ hǎo). Bạn có thể bấm nút Micro hoặc gõ "你好" để Tiểu Hoa cùng bạn luyện khẩu ngữ nhé!'
        };
      }

      // 1.4 Thanks
      if (/\b(cảm ơn|cám ơn|thank|thanks|thx|đa tạ)\b/i.test(norm)) {
        return {
          hanzi: '不客气！随时乐意帮助你。你可以对我说 "谢谢" 哦！',
          pinyin: 'Bù kèqi! Suíshí lèyì bāngzhù nǐ. Nǐ kěyǐ duì wǒ shuō "xièxie" o!',
          vi: 'Không có chi! Rất sẵn lòng giúp bạn. Bạn có thể nói với tôi là "Cảm ơn" bằng tiếng Trung nhé!',
          tip: '💡 "Cảm ơn" tiếng Trung là "谢谢" (Xièxie), đáp lại lịch sự là "不客气" (Bù kèqi) hoặc "不用谢" (Bùyòng xiè).'
        };
      }

      // 1.5 Goodbyes
      if (/\b(tạm biệt|bye|goodbye|hẹn gặp lại|see you|đi ngủ|chúc ngủ ngon|ngủ ngon)\b/i.test(norm)) {
        return {
          hanzi: '再见！祝你今天过得愉快，欢迎随时回来练中文！',
          pinyin: 'Zàijiàn! Zhù nǐ jīntiān guò de yúkuài, huānyíng suíshí huílái liàn zhōngwén!',
          vi: 'Tạm biệt! Chúc bạn một ngày vui vẻ, hoan nghênh bạn quay lại luyện tiếng Trung bất cứ lúc nào!',
          tip: '💡 "Tạm biệt" tiếng Trung là "再见" (Zàijiàn). "Chúc ngủ ngon" là "晚安" (Wǎn\'ān).'
        };
      }

      // 1.6 Identity / Who are you
      if (/\b(bạn là ai|tên gì|tên bạn là gì|who are you|what is your name|tiểu hoa)\b/i.test(norm)) {
        return {
          hanzi: '我叫小华，是你的中文AI助教。你叫什么名字？',
          pinyin: 'Wǒ jiào Xiǎohuá, shì nǐ de zhōngwén AI zhùjiào. Nǐ jiào shénme míngzì?',
          vi: 'Tôi tên là Tiểu Hoa, là trợ lý AI tiếng Trung của bạn. Bạn tên là gì thế?',
          tip: '💡 Hỏi tên: "你叫什么名字？" (Nǐ jiào shénme míngzì?). Trả lời: "我叫 + [Tên]" (Wǒ jiào...).'
        };
      }

      // 1.7 Price / Shopping
      if (/\b(bao nhiêu tiền|giá bao nhiêu|đắt thế|đắt quá|rẻ hơn|bớt đi|mua|bán|how much|cost|price|expensive|cheap)\b/i.test(norm)) {
        return {
          hanzi: '这个多少钱？太贵了，可以便宜一点吗？',
          pinyin: 'Zhège duōshǎo qián? Tài guì le, kěyǐ piányi yīdiǎn ma?',
          vi: '"Cái này bao nhiêu tiền? Đắt quá, có thể rẻ hơn một chút được không?"',
          tip: '💡 Khi mua sắm bạn dùng câu: "这个多少钱？" (Zhège duōshǎo qián? = Cái này bao nhiêu tiền?). Mặc cả: "便宜一点吧" (Piányi yīdiǎn ba!).'
        };
      }

      // 1.8 Food / Restaurant
      if (/\b(ăn gì|món ăn|đói|quán ăn|nhà hàng|thực đơn|menu|tính tiền|thanh toán|ngon|food|eat|hungry|restaurant|order|delicious)\b/i.test(norm)) {
        return {
          hanzi: '服务员，请给我菜单！中国菜真的很好吃。',
          pinyin: 'Fúwùyuán, qǐng gěi wǒ càidān! Zhōngguó cài zhēn de hěn hǎochī.',
          vi: '"Phục vụ ơi, cho tôi xem thực đơn! Món ăn Trung Quốc thật sự rất ngon."',
          tip: '💡 Từ vựng quán ăn: "服务员" (fúwùyuán = phục vụ), "菜单" (càidān = thực đơn), "买单" (mǎidān = tính tiền).'
        };
      }

      // 1.9 Directions / Travel
      if (/\b(ở đâu|đi đường nào|chỉ đường|taxi|xe buýt|xe bus|sân bay|khách sạn|ga tàu|where|direction|hotel|airport|train)\b/i.test(norm)) {
        return {
          hanzi: '请问去北京饭店怎么走？大概需要多长时间？',
          pinyin: 'Qǐngwèn qù Běijīng Fàndiàn zěnme zǒu? Dàgài xūyào duō cháng shíjiān?',
          vi: '"Xin hỏi đi đến khách sạn Bắc Kinh như thế nào? Khoảng bao lâu thì tới nơi?"',
          tip: '💡 Mẫu câu hỏi đường: "请问去...怎么走？" (Qǐngwèn qù... zěnme zǒu?). "Mất bao lâu": "要多长时间？" (Yào duō cháng shíjiān?).'
        };
      }

      // 1.10 Learning / How to say
      if (/\b(học tiếng trung|dạy tôi|nói thế nào|phát âm|pinyin|chữ hán|ngữ pháp|hsk|learn chinese|pronunciation)\b/i.test(norm)) {
        return {
          hanzi: '学好中文要多听多说，你可以跟我读：你好、谢谢、再见！',
          pinyin: 'Xué hǎo zhōngwén yào duō tīng duō shuō, nǐ kěyǐ gēn wǒ dú: nǐ hǎo, xièxie, zàijiàn!',
          vi: 'Học giỏi tiếng Trung cần nghe nhiều nói nhiều, bạn có thể đọc theo tôi: Xin chào, Cảm ơn, Tạm biệt!',
          tip: '💡 Tiếng Trung có 4 thanh điệu. Bạn có thể chọn các nút câu mẫu ở bên dưới để luyện tập phản xạ nhé!'
        };
      }

      // 1.11 Yes / No / Ok
      if (/\b(được|ok|okay|yes|no|không được|đồng ý|chuẩn|đúng rồi|sai rồi|correct|right|wrong)\b/i.test(norm)) {
        return {
          hanzi: '好的！那我们继续往下聊吧。你想聊什么话题？',
          pinyin: 'Hǎo de! Nà wǒmen jìxù wǎng xià liáo ba. Nǐ xiǎng liáo shénme huàtí?',
          vi: 'Được rồi! Vậy chúng mình tiếp tục trò chuyện nhé. Bạn muốn nói về chủ đề gì?',
          tip: '💡 "Được/Ok" tiếng Trung là "好的" (Hǎo de) hoặc "行" (Xíng). "Đúng rồi" là "对了" (Duì le).'
        };
      }

      // 1.12 Fallback for General Vietnamese
      if (lang === 'vi') {
        const snippet = raw.length > 28 ? raw.slice(0, 28) + '...' : raw;
        return {
          hanzi: '我明白你的意思了！建议你试着用中文表达，我们一起练习吧。',
          pinyin: 'Wǒ míngbai nǐ de yìsi le! Jiànyì nǐ shì zhe yòng zhōngwén biǎodá, wǒmen yīqǐ liànxí ba.',
          vi: 'Tôi hiểu ý bạn rồi! Bạn thử chuyển sang nói tiếng Trung xem sao, chúng mình cùng luyện tập nhé.',
          tip: `💡 Bạn vừa nhập tiếng Việt: "${snippet}". Tiểu Hoa hiểu và hướng dẫn bạn, hãy bấm chọn các câu gợi ý bên dưới hoặc bấm nút Micro nói chữ Hán nhé!`
        };
      }

      // 1.13 Fallback for General English / Latin
      const snippet = raw.length > 28 ? raw.slice(0, 28) + '...' : raw;
      return {
        hanzi: 'I understand what you said! Let\'s practice communicating in Chinese together.',
        pinyin: 'Wǒ míngbai nǐ de yìsi le! Wǒmen yīqǐ liànxí yòng zhōngwén jiāoliú ba.',
        vi: 'Tôi hiểu tin nhắn của bạn! Chúng ta hãy cùng luyện giao tiếp bằng tiếng Trung nhé.',
        tip: `💡 You entered: "${snippet}". As your AI Chinese tutor, Tiểu Hoa encourages you to try speaking or typing in Chinese!`
      };
    }

    // 2. CHINESE INPUT (hasChinese === true)
    // 2.1 Greetings
    if (/你好|您好|哈喽|嗨|早安|早上好|晚上好/.test(userText)) {
      return {
        hanzi: '你好！很高兴和你聊天，今天你想聊些什么话题呢？',
        pinyin: 'Nǐ hǎo! Hěn gāoxìng hé nǐ liáotiān, jīntiān nǐ xiǎng liáo xiē shénme huàtí ne?',
        vi: 'Chào bạn! Rất vui được nói chuyện với bạn, hôm nay bạn muốn trò chuyện về chủ đề gì?',
        tip: 'Phản hồi rất tự nhiên! Bạn có thể hỏi lại: "今天天气怎么样？" (Thời tiết hôm nay thế nào?).'
      };
    }

    // 2.2 Name / Identity
    if (/名字|叫什么|你是谁|自我介绍/.test(userText)) {
      return {
        hanzi: '我是你的中文AI私教小华，很高兴认识你！你的中文名字叫什么？',
        pinyin: 'Wǒ shì nǐ de zhōngwén AI sījiào Xiǎohuá, hěn gāoxìng rènshí nǐ! Nǐ de zhōngwén míngzì jiào shénme?',
        vi: 'Tôi là gia sư AI tiếng Trung Tiểu Hoa của bạn, rất vui được làm quen! Tên tiếng Trung của bạn là gì?',
        tip: 'Mẫu trả lời: "我叫..." (Wǒ jiào... = Tôi tên là...).'
      };
    }

    // 2.3 How are you / Mood
    if (/怎么样|好吗|忙|累|开心|难过/.test(userText)) {
      return {
        hanzi: '我很好，谢谢你关心！你今天工作或者学习累不累？',
        pinyin: 'Wǒ hěn hǎo, xièxie nǐ guānxīn! Nǐ jīntiān gōngzuò huòzhě xuéxí lèi bù lèi?',
        vi: 'Tôi rất khỏe, cảm ơn bạn quan tâm! Hôm nay bạn đi làm hay đi học có mệt không?',
        tip: 'Có thể trả lời: "有点儿累" (Hơi mệt một chút) hoặc "一点都不累" (Chẳng mệt chút nào).'
      };
    }

    // 2.4 Weather
    if (/天气|热|冷|下雨|晴|暖和/.test(userText)) {
      return {
        hanzi: '今天天气挺舒服的，温度刚好。你那边经常下雨吗？',
        pinyin: 'Jīntiān tiānqì tǐng shūfu de, wēndù gānghǎo. Nǐ nàbiān jīngcháng xiàyǔ ma?',
        vi: 'Thời tiết hôm nay khá dễ chịu, nhiệt độ vừa vặn. Bên chỗ bạn có hay mưa không?',
        tip: 'Từ vựng: "下雨" (xiàyǔ = mưa), "很热" (hěn rè = rất nóng), "很冷" (hěn lěng = rất lạnh).'
      };
    }

    // 2.5 Food / Drink
    if (/吃|喝|饭|菜|饿|饱|菜单|点菜|辣|米饭/.test(userText)) {
      return {
        hanzi: '中国菜讲究色香味俱全，像麻婆豆腐、宫保鸡丁都特别下饭！你最喜欢吃什么？',
        pinyin: 'Zhōngguó cài jiǎngjiu sè xiāng wèi jùquán, xiàng Mápó dòufu, Gōngbǎo jīdīng dōu tèbié xiàfàn! Nǐ zuì xǐhuan chī shénme?',
        vi: 'Món Trung chú trọng sắc hương vị vẹn toàn, như Đậu phụ Ma Bà, Gà Cung Bảo đều rất tốn cơm! Bạn thích ăn gì nhất?',
        tip: 'Cách nói: "我喜欢吃..." (Tôi thích ăn...).'
      };
    }

    // 2.6 Price / Shopping
    if (/多少钱|贵|便宜|买|卖|试穿|包起来|打折/.test(userText)) {
      return {
        hanzi: '这件衣服质量非常好，今天全场打八折，只要一百五十块钱！',
        pinyin: 'Zhè jiàn yīfu zhìliàng fēicháng hǎo, jīntiān quánchǎng dǎ bā zhé, zhǐ yào yībǎi wǔshí kuài qián!',
        vi: 'Bộ quần áo này chất lượng rất tốt, hôm nay giảm 20%, chỉ có 150 tệ thôi!',
        tip: 'Mặc cả tiếp: "太贵了，便宜一点吧" hoặc "一百块可以吗？"'
      };
    }

    // 2.7 Directions / Travel
    if (/去|哪|路|站|车|远|近|停车|怎么走|出租车|地铁/.test(userText)) {
      return {
        hanzi: '往前一直走，在十字路口向右拐，大概走两百米就到了。',
        pinyin: 'Wǎng qián yīzhí zǒu, zài shízì lùkǒu xiàng yòu guǎi, dàgài zǒu liǎngbǎi mǐ jiù dào le.',
        vi: 'Cứ đi thẳng về phía trước, đến ngã tư rẽ phải, đi khoảng 200m là tới nơi.',
        tip: '"向右拐" (xiàng yòu guǎi) là rẽ phải, "向左拐" (xiàng zuǒ guǎi) là rẽ trái.'
      };
    }

    // 2.8 Learning / Study
    if (/学|中文|汉语|难|发音|生词|拼音|声调/.test(userText)) {
      return {
        hanzi: '你的中文表达越来越棒了！掌握好声调和多开口，你一定能学得很好。',
        pinyin: 'Nǐ de zhōngwén biǎodá yuè lái yuè bàng le! Zhǎngwò hǎo shēngdiào hé duō kāikǒu, nǐ yīdìng néng xué de hěn hǎo.',
        vi: 'Khả năng diễn đạt tiếng Trung của bạn ngày càng cừ! Nắm chắc thanh điệu và chịu khó mở miệng nói, bạn chắc chắn sẽ học rất giỏi.',
        tip: '"越来越" (yuè lái yuè) nghĩa là ngày càng. Ví dụ: "越来越好" (ngày càng tốt).'
      };
    }

    // 2.9 Thanks
    if (/谢谢|多谢|感谢/.test(userText)) {
      return {
        hanzi: '不用客气！能陪你一起练习中文我也很开心，我们继续加油！',
        pinyin: 'Bùyòng kèqi! Néng péi nǐ yīqǐ liànxí zhōngwén wǒ yě hěn kāixīn, wǒmen jìxù jiāyóu!',
        vi: 'Không cần khách sáo! Được cùng bạn luyện tiếng Trung tôi cũng rất vui, chúng ta cùng tiếp tục cố lên!',
        tip: '"不用客气" (Bùyòng kèqi) đồng nghĩa với "不客气".'
      };
    }

    // 2.10 Ok / Agreement
    if (/好的|行|可以|对|是的|没问题/.test(userText)) {
      return {
        hanzi: '太棒了！那我们接着聊，你平时周末喜欢去哪里玩？',
        pinyin: 'Tài bàng le! Nà wǒmen jiēzhe liáo, nǐ píngshí zhōumò xǐhuan qù nǎlǐ wán?',
        vi: 'Tuyệt vời! Vậy chúng mình tiếp tục nói chuyện, ngày thường cuối tuần bạn thích đi đâu chơi?',
        tip: 'Hỏi cuối tuần: "周末你打算做什么？" (Cuối tuần bạn định làm gì?).'
      };
    }

    // 2.11 Scenario-specific fallback pool (4 items each, guaranteed not to repeat consecutive replies)
    const scenarioPools = {
      shopping: [
        { hanzi: '这件衣服质量非常好，只要一百五十块钱！', pinyin: 'Zhè jiàn yīfu zhìliàng fēicháng hǎo, zhǐ yào yībǎi wǔshí kuài qián!', vi: 'Bộ quần áo này chất lượng rất tốt, chỉ có 150 tệ thôi!', tip: 'Mẹo: Bạn có thể đáp lại "太贵了，便宜一点吧" để mặc cả.' },
        { hanzi: '好的，算你便宜点，一百二十块怎么样？', pinyin: 'Hǎo de, suàn nǐ piányi diǎn, yībǎi èrshí kuài zěnmeyàng?', vi: 'Được rồi, bớt cho bạn một chút, 120 tệ thấy thế nào?', tip: 'Mẹo: Bạn có thể nói "成交！(Thành giao/Đồng ý!)" hoặc "一百块可以吗？"' },
        { hanzi: '这款还有黑色和白色的，你想试穿一下哪一个？', pinyin: 'Zhè kuǎn hái yǒu hēisè hé báisè de, nǐ xiǎng shìchuān yíxià nǎ yí gè?', vi: 'Mẫu này còn có màu đen và màu trắng, bạn muốn thử cái nào?', tip: '"试穿" (shìchuān) là mặc thử đồ.' },
        { hanzi: '我们店支持微信和支付宝付款，现金也可以。', pinyin: 'Wǒmen diàn zhīchí Wēixìn hé Zhīfùbǎo fùkuǎn, xiànjīn yě kěyǐ.', vi: 'Cửa hàng chúng tôi hỗ trợ thanh toán WeChat và Alipay, tiền mặt cũng được.', tip: '"现金" (xiànjīn) là tiền mặt.' }
      ],
      restaurant: [
        { hanzi: '好的！宫保鸡丁和麻婆豆腐是我们的招牌菜，要试试吗？', pinyin: 'Hǎo de! Gōngbǎo jīdīng hé mápó dòufu shì wǒmen de zhāopái cài, yào shìshi ma?', vi: 'Dạ được! Gà Cung Bảo và Đậu phụ Ma Bà là món tủ của quán, bạn muốn thử không?', tip: 'Mẹo: Nói "好，来一份 (Được, cho một đĩa)" để gọi món.' },
        { hanzi: '没问题，一共八十八块钱。您用微信还是支付宝？', pinyin: 'Méi wèntí, yīgòng bāshíbā kuài qián. Nín yòng Wēixìn háishì Zhīfùbǎo?', vi: 'Không vấn đề, tổng cộng 88 tệ. Quý khách quét mã WeChat hay Alipay?', tip: 'Mẹo: Ở Trung Quốc phổ biến nhất là quét mã WeChat (微信) hoặc Alipay (支付宝).' },
        { hanzi: '请问您能吃辣吗？我们这里的菜有点微辣。', pinyin: 'Qǐngwèn nín néng chī là ma? Wǒmen zhèlǐ de cài yǒudiǎn wēilà.', vi: 'Xin hỏi bạn có ăn được cay không? Món ăn ở chỗ chúng tôi hơi cay nhẹ một chút.', tip: '"微辣" (wēilà) là cay nhẹ, "不要辣" (bù yào là) là đừng cho cay.' },
        { hanzi: '菜马上就给您端上来，请稍等几分钟！', pinyin: 'Cài mǎshàng jiù gěi nín duān shànglái, qǐng shāoděng jǐ fēnzhōng!', vi: 'Món ăn sẽ bưng lên ngay cho quý khách, xin vui lòng đợi vài phút!', tip: '"稍等" (shāoděng) là xin đợi một lát, rất lịch sự.' }
      ],
      travel: [
        { hanzi: '去火车站大概需要二十分钟，现在路上不堵车。', pinyin: 'Qù huǒchēzhàn dàgài xūyào èrshí fēnzhōng, xiànzài lùshang bù dǔchē.', vi: 'Đi đến ga tàu hỏa mất khoảng 20 phút, đường lúc này không kẹt xe.', tip: 'Mẹo: "不堵车 (bù dǔchē)" nghĩa là không tắc đường.' },
        { hanzi: '往前一直走，在十字路口向右拐就到了。', pinyin: 'Wǎng qián yīzhí zǒu, zài shízì lùkǒu xiàng yòu guǎi jiù dào le.', vi: 'Cứ đi thẳng về phía trước, đến ngã tư rẽ phải là tới nơi.', tip: 'Mẹo: "向右拐 (xiàng yòu guǎi)" là rẽ phải, "向左拐 (xiàng zuǒ guǎi)" là rẽ trái.' },
        { hanzi: '前面就是天安门广场了，请拿好您的随身物品。', pinyin: 'Qiánmiàn jiù shì Tiān\'ānmén Guǎngchǎng le, qǐng ná hǎo nín de suíshēn wùpǐn.', vi: 'Phía trước là Quảng trường Thiên An Môn rồi, xin quý khách cầm chắc đồ đạc mang theo.', tip: '"随身物品" (suíshēn wùpǐn) là đồ dùng mang theo người.' },
        { hanzi: '车费一共是三十二块，请扫码付款，谢谢！', pinyin: 'Chēfèi yīgòng shì sānshí\'èr kuài, qǐng sǎomǎ fùkuǎn, xièxie!', vi: 'Tiền xe tổng cộng là 32 tệ, xin mời quét mã thanh toán, cảm ơn bạn!', tip: '"扫码" (sǎomǎ) nghĩa là quét mã QR.' }
      ],
      interview: [
        { hanzi: '很好！你为什么想来中国公司工作呢？', pinyin: 'Hěn hǎo! Nǐ wèishénme xiǎng lái zhōngguó gōngsī gōngzuò ne?', vi: 'Rất tốt! Vì sao bạn lại muốn làm việc tại công ty Trung Quốc?', tip: 'Mẹo: Trả lời về đam mê ngôn ngữ và cơ hội phát triển sự nghiệp.' },
        { hanzi: '你的中文表达很清晰，听力也很好！我们下周通知你结果。', pinyin: 'Nǐ de zhōngwén biǎodá hěn qīngxī, tīnglì yě hěn hǎo! Wǒmen xià zhōu tōngzhī nǐ jiéguǒ.', vi: 'Khả năng diễn đạt tiếng Trung của bạn rất rõ ràng, nghe cũng rất tốt! Chúng tôi sẽ thông báo kết quả vào tuần sau.', tip: 'Chúc mừng bạn! Nhớ nói "谢谢您，期待您的好消息 (Cảm ơn quý công ty, tôi rất mong tin tốt)"!' },
        { hanzi: '你在上一家公司主要负责什么样的工作？', pinyin: 'Nǐ zài shàng yī jiā gōngsī zhǔyào fùzé shénmeyàng de gōngzuò?', vi: 'Tại công ty trước bạn chủ yếu phụ trách công việc như thế nào?', tip: '"负责" (fùzé) là phụ trách, chịu trách nhiệm.' },
        { hanzi: '请问你对我们公司的薪资待遇有什么期望吗？', pinyin: 'Qǐngwèn nǐ duì wǒmen gōngsī de xīnzī dàiyù yǒu shénme qīwàng ma?', vi: 'Xin hỏi bạn có kỳ vọng gì về chế độ đãi ngộ tiền lương của công ty chúng tôi?', tip: '"薪资待遇" (xīnzī dàiyù) là chế độ lương bổng đãi ngộ.' }
      ],
      free: [
        { hanzi: '你的中文说得真棒！你平时是怎么练习汉语的？', pinyin: 'Nǐ de zhōngwén shuō de zhēn bàng! Nǐ píngshí shì zěnme liànxí hànyǔ de?', vi: 'Tiếng Trung của bạn nói cừ lắm! Bình thường bạn luyện tiếng Hán như thế nào?', tip: 'Lời khen: "真棒 (zhēn bàng)" là tuyệt vời, rất cừ.' },
        { hanzi: '学习中文最重要的就是多听多说，不要害怕说错哦！', pinyin: 'Xuéxí zhōngwén zuì zhòngyào de jiùshì duō tīng duō shuō, bù yào hàipà shuō cuò o!', vi: 'Học tiếng Trung điều quan trọng nhất là nghe nhiều nói nhiều, đừng sợ nói sai nhé!', tip: 'Mẹo: Giữ tinh thần kiên trì luyện tập mỗi ngày 15 phút sẽ tiến bộ vượt bậc.' },
        { hanzi: '你喜欢听中文歌或者看中国电影吗？', pinyin: 'Nǐ xǐhuan tīng zhōngwén gē huòzhě kàn zhōngguó diànyǐng ma?', vi: 'Bạn có thích nghe nhạc tiếng Trung hay xem phim Trung Quốc không?', tip: 'Nghe bài hát và xem phim là cách tuyệt vời để cải thiện ngữ điệu tự nhiên.' },
        { hanzi: '你学中文多久了？打算去中国旅游吗？', pinyin: 'Nǐ xué zhōngwén duō jiǔ le? Dǎsuàn qù Zhōngguó lǚyóu ma?', vi: 'Bạn học tiếng Trung bao lâu rồi? Bạn có dự định đi du lịch Trung Quốc không?', tip: 'Mẫu câu: "我打算..." (Tôi dự định...).' }
      ]
    };

    const pool = scenarioPools[this.zhAiScenario] || scenarioPools.free;
    const filtered = pool.filter(item => item.hanzi !== this._lastZhAiReplyHanzi);
    const chosenPool = filtered.length > 0 ? filtered : pool;
    const choice = chosenPool[Math.floor(Math.random() * chosenPool.length)];
    this._lastZhAiReplyHanzi = choice.hanzi;
    return choice;
  }

  async _generateZhAiReply(userText) {
    const clean = (userText || '').trim();
    if (!clean) {
      return {
        hanzi: '请对我说点什么吧！',
        pinyin: 'Qǐng duì wǒ shuō diǎn shénme ba!',
        vi: 'Xin hãy nói gì đó với tôi nào!',
        tip: 'Bạn có thể bấm Micro hoặc chọn các câu gợi ý bên dưới.'
      };
    }

    const apiKey = (window.storage?.aiSettings?.geminiApiKey || '').trim();
    const model = (window.storage?.getAiModel ? window.storage.getAiModel() : window.storage?.aiSettings?.geminiModel) || 'gemini-3.5-flash';

    if (apiKey) {
      try {
        const scenarioPrompts = {
          free: 'Bạn là Tiểu Hoa (小华), gia sư tiếng Trung kiên nhẫn, vui vẻ và am hiểu văn hóa cho người Việt Nam.',
          shopping: 'Bối cảnh: Người học đang mua sắm tại chợ hoặc trung tâm thương mại Bắc Kinh, bạn là chủ quầy hàng thân thiện.',
          restaurant: 'Bối cảnh: Nhà hàng ẩm thực Trung Hoa, bạn là nhân viên phục vụ tận tình, chu đáo.',
          travel: 'Bối cảnh: Bạn là tài xế taxi Bắc Kinh hoặc người dân địa phương nhiệt tình chỉ đường.',
          interview: 'Bối cảnh: Buổi phỏng vấn xin việc bằng tiếng Trung, bạn là người phỏng vấn chuyên nghiệp nhưng cởi mở.'
        };

        const prompt = `Bạn là Tiểu Hoa (小华), gia sư dạy tiếng Trung thông minh và thân thiện cho người Việt Nam.
Bối cảnh: ${scenarioPrompts[this.zhAiScenario] || scenarioPrompts.free}
Người học vừa gửi/nói: "${clean}"

HƯỚNG DẪN BẮT BUỘC VỀ NGÔN NGỮ:
1. NẾU NGƯỜI HỌC DÙNG TIẾNG VIỆT HOẶC TIẾNG ANH (Không phải chữ Hán):
   - Tuyệt đối không phớt lờ ngôn ngữ của họ! Hãy hiểu câu họ muốn nói.
   - Nếu người học thắc mắc (ví dụ: "sao tôi nói tiếng việt mà bạn vẫn trả lời", "tôi không nói tiếng trung", "I am too much", "xin chào", v.v.): Hãy giải thích thân thiện trong VI và TIP rằng bạn hiểu họ, nhưng vì đây là phòng luyện phản xạ tiếng Trung nên bạn sẽ hướng dẫn cách nói ý đó sang tiếng Trung.
   - HANZI: Câu tiếng Trung chữ Hán giản thể phù hợp nhất để giao tiếp hoặc dịch ý câu của người học sang tiếng Trung.
   - PINYIN: Phiên âm Pinyin chuẩn kèm dấu thanh.
   - VI: Bản dịch nghĩa tiếng Việt tự nhiên của câu tiếng Trung trên.
   - TIP: Lời giải thích cụ thể cho người học bằng tiếng Việt cách diễn đạt câu họ vừa nói sang tiếng Trung, phân tích từ vựng hoặc mẹo học.

2. NẾU NGƯỜI HỌC DÙNG TIẾNG TRUNG:
   - Trả lời bằng tiếng Trung giao tiếp tự nhiên (HSK 1 - 4).
   - HANZI: Câu tiếng Trung giản thể.
   - PINYIN: Phiên âm Pinyin chuẩn.
   - VI: Bản dịch tiếng Việt tự nhiên.
   - TIP: 1 lời khen, mẹo ngữ pháp hoặc câu gợi ý tiếp theo.

BẮT BUỘC TRẢ LỜI ĐÚNG 4 DÒNG THEO MẪU:
HANZI: [Câu tiếng Trung chữ Hán giản thể]
PINYIN: [Phiên âm Pinyin chuẩn kèm dấu thanh]
VI: [Bản dịch tiếng Việt tự nhiên]
TIP: [Giải thích hoặc gợi ý bằng tiếng Việt]`;

        const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
        const ctrl = new AbortController();
        const tid = setTimeout(() => ctrl.abort(), 7500);
        let res;
        const genConfig = {
          temperature: 0.5,
          maxOutputTokens: 350
        };
        if (String(model).includes('3.') || String(model).includes('3-')) {
          genConfig.thinkingConfig = { thinking_level: "LOW" };
        }
        try {
          res = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{ parts: [{ text: prompt }] }],
              generationConfig: genConfig
            }),
            signal: ctrl.signal
          });
        } finally {
          clearTimeout(tid);
        }
        if (res.ok) {
          const json = await res.json();
          const candidate = json.candidates?.[0]?.content?.parts?.[0]?.text || '';
          const hanziMatch = candidate.match(/HANZI:\s*(.*)/i);
          const pinyinMatch = candidate.match(/PINYIN:\s*(.*)/i);
          const viMatch = candidate.match(/VI:\s*(.*)/i);
          const tipMatch = candidate.match(/TIP:\s*(.*)/i);
          if (hanziMatch && hanziMatch[1].trim()) {
            return {
              hanzi: hanziMatch[1].trim(),
              pinyin: pinyinMatch ? pinyinMatch[1].trim() : '',
              vi: viMatch ? viMatch[1].trim() : '',
              tip: tipMatch ? tipMatch[1].trim() : ''
            };
          }
        }
      } catch (e) {
        console.warn('Gemini Chinese API call failed, falling back to smart simulation:', e);
      }
    }

    // Smart contextual offline simulation
    return this._generateOfflineZhReply(clean);
  }

  _clearZhAiSilenceTimer() {
    if (this._zhAiSilenceTimer) {
      clearTimeout(this._zhAiSilenceTimer);
      this._zhAiSilenceTimer = null;
    }
  }

  _resetZhAiSilenceTimer() {
    this._clearZhAiSilenceTimer();
    // Sau khi người dùng ngừng nói 2.5 giây -> Tự động ngắt mic và gửi tin nhắn
    this._zhAiSilenceTimer = setTimeout(() => {
      if (this.zhAiIsRecording) {
        this.stopZhAiMic(true);
      }
    }, 2500);
  }

  _initZhAiSpeechRecognition() {
    const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRec) return;

    try {
      this.zhAiRecog = new SpeechRec();
      this.zhAiRecog.continuous = true;
      this.zhAiRecog.interimResults = true;
      this.zhAiRecog.lang = 'zh-CN';

      this.zhAiRecog.onstart = () => {
        this.zhAiIsRecording = true;
        this._updateZhAiMicUI(true);
      };

      this.zhAiRecog.onresult = (event) => {
        let finalChunk = '';
        let interimChunk = '';
        for (let i = 0; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalChunk += event.results[i][0].transcript + ' ';
          } else {
            interimChunk += event.results[i][0].transcript;
          }
        }

        this._latestZhAiFinalChunk = finalChunk;
        const currentSessionSpoken = (finalChunk + interimChunk).trim();
        const fullSpoken = [this.zhAiAccumulated, currentSessionSpoken].filter(Boolean).join(' ').trim();
        const displayText = [this.zhAiPreSpeechText, fullSpoken].filter(Boolean).join(' ').trim();

        const input = document.getElementById('zh-ai-input');
        if (input) {
          input.value = displayText;
        }

        if (fullSpoken.length > 0) {
          this._resetZhAiSilenceTimer();
        }
      };

      this.zhAiRecog.onerror = (event) => {
        console.warn('Zh AI Speech recognition error:', event.error);
        if (event.error === 'no-speech' || event.error === 'aborted') {
          return;
        }
        this._clearZhAiSilenceTimer();
        this.zhAiIsRecording = false;
        this.zhAiManualStop = true;
        this._updateZhAiMicUI(false);
        if (window.app) {
          if (event.error === 'not-allowed') {
            window.app.showToast('Vui lòng cấp quyền Micro trong Cài đặt ứng dụng để nói tiếng Trung.', 'warning');
          } else {
            window.app.showToast(`Lỗi Micro: ${event.error}`, 'error');
          }
        }
      };

      this.zhAiRecog.onend = () => {
        if (this.zhAiIsRecording && !this.zhAiManualStop) {
          if (this._latestZhAiFinalChunk) {
            this.zhAiAccumulated = [this.zhAiAccumulated, this._latestZhAiFinalChunk].filter(Boolean).join(' ').trim();
            this._latestZhAiFinalChunk = '';
          }
          try {
            this.zhAiRecog.start();
            return;
          } catch (e) {
            console.warn('Could not auto-restart Zh AI recognition:', e);
          }
        }
        this.zhAiIsRecording = false;
        this._updateZhAiMicUI(false);
      };
    } catch (e) {
      console.warn('Error creating Zh AI SpeechRecognition:', e);
      this.zhAiRecog = null;
    }
  }

  _updateZhAiMicUI(isRecording) {
    const micBtn = document.getElementById('zh-ai-mic-btn');
    if (micBtn) {
      micBtn.classList.toggle('recording', isRecording);
      if (isRecording) {
        micBtn.style.background = '#f43f5e';
        micBtn.style.color = '#fff';
        micBtn.style.boxShadow = '0 0 16px rgba(244, 63, 94, 0.8)';
        micBtn.innerHTML = '🛑';
        micBtn.title = 'Đang nghe tiếng Trung... Bấm để xong & gửi';
      } else {
        micBtn.style.background = 'rgba(244,63,94,0.15)';
        micBtn.style.color = '#f43f5e';
        micBtn.style.boxShadow = 'none';
        micBtn.innerHTML = '🎙️';
        micBtn.title = 'Bấm để nói tiếng Trung (dừng 2.5s tự gửi)';
      }
    }

    const statusBox = document.getElementById('zh-ai-mic-status-box');
    if (statusBox) {
      statusBox.classList.toggle('active', isRecording);
      if (isRecording) {
        statusBox.style.display = 'block';
        statusBox.innerHTML = `
          <div style="display: flex; align-items: center; justify-content: space-between; gap: 8px; background: rgba(244, 63, 94, 0.12); border: 1px solid rgba(244, 63, 94, 0.35); border-radius: 12px; padding: 6px 12px; font-size: 12.5px;">
            <div style="display: flex; align-items: center; gap: 8px; color: #f43f5e; font-weight: 600;">
              <span class="mic-wave-pulse" style="display: inline-block; width: 10px; height: 10px; background: #f43f5e; border-radius: 50%; box-shadow: 0 0 8px #f43f5e;"></span>
              <span>Đang lắng nghe tiếng Trung... (Tự gửi sau 2.5s dứt câu)</span>
            </div>
            <div style="display: flex; gap: 6px;">
              <button type="button" id="zh-mic-finish-btn" style="background: #f43f5e; color: #fff; border: none; border-radius: 8px; padding: 4px 10px; font-size: 11.5px; font-weight: 700; cursor: pointer;">Xong &amp; Gửi 📤</button>
              <button type="button" id="zh-mic-cancel-btn" style="background: rgba(255,255,255,0.1); color: var(--text-secondary, #94a3b8); border: 1px solid rgba(255,255,255,0.2); border-radius: 8px; padding: 4px 8px; font-size: 11.5px; cursor: pointer;">Hủy ✕</button>
            </div>
          </div>
        `;
        const finishBtn = document.getElementById('zh-mic-finish-btn');
        const cancelBtn = document.getElementById('zh-mic-cancel-btn');
        if (finishBtn) {
          finishBtn.onclick = (e) => {
            e.stopPropagation();
            this.stopZhAiMic(true);
          };
        }
        if (cancelBtn) {
          cancelBtn.onclick = (e) => {
            e.stopPropagation();
            const input = document.getElementById('zh-ai-input');
            if (input) {
              input.value = this.zhAiPreSpeechText || '';
            }
            this.stopZhAiMic(false);
          };
        }
      } else {
        statusBox.style.display = 'none';
        statusBox.innerHTML = '';
      }
    }
  }

  stopZhAiMic(autoSend = false) {
    this.zhAiManualStop = true;
    this._clearZhAiSilenceTimer();
    this.zhAiIsRecording = false;

    if (this.zhAiRecog) {
      try {
        this.zhAiRecog.stop();
      } catch (e) {}
    }

    this._updateZhAiMicUI(false);

    if (autoSend) {
      const input = document.getElementById('zh-ai-input');
      if (input && input.value.trim().length > 0) {
        this.sendZhAiUserMessage();
      }
    }
  }

  async _toggleZhAiMic() {
    if (!this.zhAiRecog) {
      this._initZhAiSpeechRecognition();
    }

    // Android Native Permission check
    if (window.AndroidSpeech && typeof window.AndroidSpeech.hasPermission === 'function' && !window.AndroidSpeech.hasPermission()) {
      window.AndroidSpeech.requestPermission();
      if (window.app) {
        window.app.showToast('Vui lòng cho phép quyền Micro khi hộp thoại hệ thống xuất hiện.', 'info');
      }
      return;
    }

    // Browser audio permission check if navigator.mediaDevices is supported
    if (!window.AndroidSpeech && navigator.mediaDevices && typeof navigator.mediaDevices.getUserMedia === 'function') {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        stream.getTracks().forEach(track => track.stop());
      } catch (err) {
        console.warn('Microphone permission request error:', err);
        if (window.app) {
          window.app.showToast('Vui lòng cho phép quyền truy cập Micro trên trình duyệt.', 'warning');
        }
        return;
      }
    }

    if (!this.zhAiRecog) {
      if (window.app) {
        window.app.showToast('Microphone chưa được kích hoạt hoặc trình duyệt chưa hỗ trợ Web Speech.', 'warning');
      } else {
        alert('Trình duyệt chưa hỗ trợ nhận diện giọng nói Web Speech.');
      }
      return;
    }

    if (this.zhAiIsRecording) {
      // Người dùng bấm lại nút Micro để hoàn thành và gửi câu nói!
      this.stopZhAiMic(true);
    } else {
      if (window.audioCtrl) {
        window.audioCtrl.stop();
      }
      const input = document.getElementById('zh-ai-input');
      this.zhAiPreSpeechText = (input ? input.value : '').trim();
      this.zhAiAccumulated = '';
      this._latestZhAiFinalChunk = '';
      this.zhAiManualStop = false;
      this.zhAiIsRecording = true;
      this._updateZhAiMicUI(true);

      try {
        this.zhAiRecog.lang = 'zh-CN';
        this.zhAiRecog.start();
      } catch (e) {
        console.warn('Cannot start Zh AI recognition:', e);
        try {
          this.zhAiRecog.stop();
        } catch (_) {}
        setTimeout(() => {
          try {
            if (this.zhAiIsRecording) {
              this.zhAiRecog.lang = 'zh-CN';
              this.zhAiRecog.start();
            }
          } catch (err2) {
            console.error('Retry start Zh AI recognition failed:', err2);
            this.stopZhAiMic(false);
          }
        }, 120);
      }
    }
  }

  // =========================================================================
  // 3. TỪ VỰNG YẾU (WEAK VOCAB SMART REVIEW)
  // =========================================================================
  renderWeakVocab() {
    const totalCountEl = document.getElementById('zh-weak-total-count');
    const cardsGrid = document.getElementById('zh-weak-cards-grid');
    const emptyBox = document.getElementById('zh-weak-empty-box');
    if (!cardsGrid) return;

    const weakMap = window.storage ? window.storage.getChineseWeakWords() : {};
    const weakList = Object.values(weakMap);

    if (totalCountEl) totalCountEl.textContent = weakList.length;

    // Attach buttons
    const btnFc = document.getElementById('zh-weak-practice-fc');
    if (btnFc) btnFc.onclick = () => this.practiceWeakFlashcards();

    const btnQuiz = document.getElementById('zh-weak-practice-quiz');
    if (btnQuiz) btnQuiz.onclick = () => this.practiceWeakQuiz();

    const btnClear = document.getElementById('zh-weak-clear-all');
    if (btnClear) btnClear.onclick = () => this.clearAllWeakWords();

    if (!weakList.length) {
      cardsGrid.style.display = 'none';
      if (emptyBox) emptyBox.style.display = 'block';
      return;
    }

    if (emptyBox) emptyBox.style.display = 'none';
    cardsGrid.style.display = 'grid';

    // Sort by highest error count first
    weakList.sort((a, b) => (b.errorCount || 0) - (a.errorCount || 0));

    cardsGrid.innerHTML = weakList.map(w => `
      <div class="zh-weak-item">
        <span class="zh-weak-count-tag">Sai ${w.errorCount || 1} lần</span>
        <div style="font-size: 28px; font-weight: 800; color: #fff; line-height: 1.2;">${w.hanzi}</div>
        <div style="font-size: 13px; color: #fbbf24; font-family: monospace;">${w.pinyin}</div>
        <div style="font-size: 12px; color: #94a3b8;">Âm Hán Việt: <strong>${w.hanviet || '—'}</strong></div>
        <div style="font-size: 13px; color: var(--text-secondary); margin-top: 4px;">💡 ${w.vi}</div>
        <div style="display: flex; gap: 8px; margin-top: 10px; border-top: 1px solid var(--glass-border); padding-top: 10px;">
          <button class="zh-bubble-btn" onclick="chineseView.playChineseText('${this._esc(w.hanzi)}')">🔊 Nghe</button>
          <button class="zh-bubble-btn" style="color: #34d399; margin-left: auto;" onclick="chineseView.removeWeakWord('${w.id || w.hanzi}')">Đã thuộc ✓</button>
        </div>
      </div>
    `).join('');
  }

  removeWeakWord(id) {
    if (window.storage && window.storage.removeChineseWeakWord) {
      window.storage.removeChineseWeakWord(id);
      this.renderWeakVocab();
      if (window.app && window.app.showToast) window.app.showToast('Đã xóa khỏi danh sách từ vựng yếu', 'success');
    }
  }

  clearAllWeakWords() {
    if (!confirm('Bạn có chắc muốn làm sạch danh sách từ vựng yếu?')) return;
    if (window.storage && window.storage.clearChineseWeakWords) {
      window.storage.clearChineseWeakWords();
      this.renderWeakVocab();
      if (window.app && window.app.showToast) window.app.showToast('Đã làm sạch danh sách từ yếu', 'info');
    }
  }

  practiceWeakFlashcards() {
    const weakMap = window.storage ? window.storage.getChineseWeakWords() : {};
    const weakList = Object.values(weakMap);
    if (!weakList.length) {
      alert('Hiện chưa có từ vựng yếu để ôn tập!');
      return;
    }
    this.flashcardList = weakList.map(w => ({
      hanzi: w.hanzi,
      pinyin: w.pinyin,
      hanviet: w.hanviet,
      vi: w.vi,
      level: w.level || 'HSK1'
    }));
    this.flashcardIndex = 0;
    this.showFlashcard();
    this.switchSubTab('practice');
    this.switchPracticeTab('flashcard');
  }

  practiceWeakQuiz() {
    const weakMap = window.storage ? window.storage.getChineseWeakWords() : {};
    const weakList = Object.values(weakMap);
    if (!weakList.length) {
      alert('Hiện chưa có từ vựng yếu để làm bài test!');
      return;
    }
    this.zhQuizItems = weakList.map(w => ({
      hanzi: w.hanzi,
      pinyin: w.pinyin,
      vi: w.vi,
      type: 'weak'
    }));
    this.zhQuizIndex = 0;
    this.zhQuizScore = 0;
    this.zhQuizStreak = 0;
    this.switchSubTab('practice');
    this.switchPracticeTab('quiz');
    this._renderZhQuizQuestion();
  }

  // =========================================================================
  // 4. HSK TEST MÔ PHỎNG
  // =========================================================================
  initHskTest() {
    const hub = document.getElementById('zh-hsk-hub');
    const arena = document.getElementById('zh-hsk-arena');
    const resultBox = document.getElementById('zh-hsk-result-box');
    if (hub && !this.hskQuestions.length) {
      hub.style.display = 'grid';
      if (arena) arena.style.display = 'none';
      if (resultBox) resultBox.style.display = 'none';
    }
  }

  startHskTest(level = 1) {
    this.hskLevel = level;
    this.hskCurrentIdx = 0;
    this.hskUserAnswers = {};
    this.hskSecondsLeft = level === 1 ? 1800 : 2100; // 30 mins or 35 mins

    const vocabPool = (window.CHINESE_VOCAB_DATA || []).filter(v => level === 1 ? v.level === 'HSK1' : true);
    const phrasePool = (window.CHINESE_PHRASES_DATA || []);
    const shuffledV = this._shuffleArr(vocabPool);
    const shuffledP = this._shuffleArr(phrasePool);

    this.hskQuestions = [];

    // Part 1: Listening (Nghe hiểu) - 12 câu
    for (let i = 0; i < 12; i++) {
      const target = shuffledV[i % shuffledV.length];
      const wrongs = shuffledV.filter(v => v.hanzi !== target.hanzi).slice(0, 3).map(v => v.vi);
      const opts = this._shuffleArr([target.vi, ...wrongs]);
      this.hskQuestions.push({
        section: 'Nghe hiểu (Listening)',
        type: 'listening',
        prompt: 'Nghe phát âm chuẩn và chọn nghĩa tiếng Việt chính xác nhất:',
        audioText: target.hanzi,
        hanzi: target.hanzi,
        pinyin: target.pinyin,
        options: opts,
        answer: opts.indexOf(target.vi),
        explain: `Từ 「${target.hanzi}」 (${target.pinyin}) có nghĩa là "${target.vi}". Âm Hán Việt: ${target.hanviet || '—'}.`
      });
    }

    // Part 2: Reading (Đọc hiểu) - 13 câu
    for (let i = 0; i < 13; i++) {
      const phrase = shuffledP[i % shuffledP.length];
      const wrongs = shuffledP.filter(p => p.cn !== phrase.cn).slice(0, 3).map(p => p.vi);
      const opts = this._shuffleArr([phrase.vi, ...wrongs]);
      this.hskQuestions.push({
        section: 'Đọc hiểu (Reading)',
        type: 'reading',
        prompt: `Đọc câu chữ Hán sau và chọn đáp án dịch nghĩa đúng:`,
        hanzi: phrase.cn,
        pinyin: phrase.pinyin,
        options: opts,
        answer: opts.indexOf(phrase.vi),
        explain: `Câu 「${phrase.cn}」 (${phrase.pinyin}) có nghĩa chuẩn xác là: "${phrase.vi}".`
      });
    }

    // UI Switches
    const hub = document.getElementById('zh-hsk-hub');
    const arena = document.getElementById('zh-hsk-arena');
    const resultBox = document.getElementById('zh-hsk-result-box');
    const levelBadge = document.getElementById('zh-hsk-level-badge');
    const titleEl = document.getElementById('zh-hsk-title');

    if (hub) hub.style.display = 'none';
    if (resultBox) resultBox.style.display = 'none';
    if (arena) arena.style.display = 'flex';

    if (levelBadge) levelBadge.textContent = `HSK CẤP ĐỘ ${level}`;
    if (titleEl) titleEl.textContent = `Đề Thi Mô Phỏng HSK ${level} — 25 Câu`;

    // Start timer
    if (this.hskTimerInterval) clearInterval(this.hskTimerInterval);
    this._updateHskTimerUI();
    this.hskTimerInterval = setInterval(() => {
      this.hskSecondsLeft--;
      this._updateHskTimerUI();
      if (this.hskSecondsLeft <= 0) {
        clearInterval(this.hskTimerInterval);
        alert('Hết giờ làm bài thi!');
        this.submitHskTest();
      }
    }, 1000);

    this.renderHskNavGrid();
    this.renderHskQuestion();
  }

  _updateHskTimerUI() {
    const timerEl = document.getElementById('zh-hsk-timer');
    if (!timerEl) return;
    const m = Math.floor(this.hskSecondsLeft / 60);
    const s = this.hskSecondsLeft % 60;
    timerEl.textContent = `⏱️ ${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  }

  renderHskNavGrid() {
    const grid = document.getElementById('zh-hsk-nav-grid');
    if (!grid) return;
    grid.innerHTML = this.hskQuestions.map((q, idx) => {
      const isAns = this.hskUserAnswers[idx] !== undefined;
      const isCur = idx === this.hskCurrentIdx;
      return `
        <button class="zh-qnav-btn ${isCur ? 'current' : ''} ${isAns ? 'answered' : ''}" onclick="chineseView.jumpHskQuestion(${idx})">
          ${idx + 1}
        </button>
      `;
    }).join('');
  }

  jumpHskQuestion(idx) {
    this.hskCurrentIdx = idx;
    this.renderHskNavGrid();
    this.renderHskQuestion();
  }

  navHskQuestion(dir) {
    const next = this.hskCurrentIdx + dir;
    if (next >= 0 && next < this.hskQuestions.length) {
      this.jumpHskQuestion(next);
    }
  }

  renderHskQuestion() {
    const qContent = document.getElementById('zh-hsk-question-content');
    const counterEl = document.getElementById('zh-hsk-q-counter');
    const prevBtn = document.getElementById('zh-hsk-prev-btn');
    const nextBtn = document.getElementById('zh-hsk-next-btn');
    if (!qContent || !this.hskQuestions.length) return;

    const q = this.hskQuestions[this.hskCurrentIdx];
    const letters = ['A', 'B', 'C', 'D'];

    if (counterEl) counterEl.textContent = `Câu ${this.hskCurrentIdx + 1} / ${this.hskQuestions.length}`;
    if (prevBtn) prevBtn.disabled = this.hskCurrentIdx === 0;
    if (nextBtn) nextBtn.disabled = this.hskCurrentIdx === this.hskQuestions.length - 1;

    qContent.innerHTML = `
      <div style="background: rgba(15,23,42,0.6); border: 1px solid var(--glass-border); border-radius: var(--radius-md); padding: 20px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
          <span class="zh-badge-pill ${q.type === 'listening' ? 'purple' : 'gold'}" style="font-size: 11px;">${q.section}</span>
          <span style="font-size: 12px; color: var(--text-muted);">Câu số ${this.hskCurrentIdx + 1}</span>
        </div>
        <div style="font-size: 15px; font-weight: 700; color: #fff; margin-bottom: 12px;">${q.prompt}</div>

        ${q.type === 'listening' ? `
          <div style="margin: 16px 0; text-align: center;">
            <button class="zh-action-btn primary" onclick="chineseView.playChineseText('${this._esc(q.audioText)}')">
              🔊 Nghe đoạn âm thanh
            </button>
          </div>
        ` : `
          <div style="margin: 16px 0; padding: 14px; background: rgba(0,0,0,0.3); border-radius: 8px; text-align: center;">
            <div style="font-size: 24px; font-weight: 800; color: #fff; letter-spacing: 0.05em;">${q.hanzi}</div>
            <div style="font-size: 13px; color: #fbbf24; font-family: monospace; margin-top: 4px;">${q.pinyin}</div>
          </div>
        `}

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 14px;">
          ${q.options.map((opt, optIdx) => {
            const isSelected = this.hskUserAnswers[this.hskCurrentIdx] === optIdx;
            return `
              <button class="zh-opt-choice ${isSelected ? 'correct' : ''}" style="${isSelected ? 'background: rgba(59,130,246,0.25); border-color: #3b82f6; color: #93c5fd;' : ''}" onclick="chineseView.selectHskAnswer(${optIdx})">
                <span style="font-weight: 800; margin-right: 8px; color: #fbbf24;">${letters[optIdx]}.</span>
                <span>${opt}</span>
              </button>
            `;
          }).join('')}
        </div>
      </div>
    `;

    if (q.type === 'listening') {
      this.playChineseText(q.audioText);
    }
  }

  selectHskAnswer(choiceIdx) {
    this.hskUserAnswers[this.hskCurrentIdx] = choiceIdx;
    this.renderHskNavGrid();
    this.renderHskQuestion();

    // Auto next after 300ms if not last
    if (this.hskCurrentIdx < this.hskQuestions.length - 1) {
      setTimeout(() => this.navHskQuestion(1), 350);
    }
  }

  submitHskTest() {
    if (this.hskTimerInterval) clearInterval(this.hskTimerInterval);

    let correctCount = 0;
    let listeningCorrect = 0;
    let readingCorrect = 0;

    this.hskQuestions.forEach((q, idx) => {
      const userChoice = this.hskUserAnswers[idx];
      const isCorrect = userChoice === q.answer;
      if (isCorrect) {
        correctCount++;
        if (q.type === 'listening') listeningCorrect++;
        else readingCorrect++;
      } else {
        // Track as weak word
        if (window.storage && window.storage.recordChineseWordResult) {
          window.storage.recordChineseWordResult({ hanzi: q.hanzi || q.audioText, pinyin: q.pinyin, vi: q.options[q.answer] }, false);
        }
      }
    });

    // Score on 200 scale (100 listening, 100 reading)
    const listeningTotal = this.hskQuestions.filter(q => q.type === 'listening').length;
    const readingTotal = this.hskQuestions.filter(q => q.type === 'reading').length;
    const scoreListening = Math.round((listeningCorrect / (listeningTotal || 1)) * 100);
    const scoreReading = Math.round((readingCorrect / (readingTotal || 1)) * 100);
    const totalScore = scoreListening + scoreReading;
    const isPass = totalScore >= 120;

    // Save result
    if (window.storage && window.storage.saveChineseTestResult) {
      window.storage.saveChineseTestResult({
        level: this.hskLevel,
        totalScore,
        scoreListening,
        scoreReading,
        isPass
      });
      if (isPass) window.storage.addXP(50);
    }

    const arena = document.getElementById('zh-hsk-arena');
    const resultBox = document.getElementById('zh-hsk-result-box');
    if (arena) arena.style.display = 'none';
    if (!resultBox) return;
    resultBox.style.display = 'block';

    resultBox.innerHTML = `
      <div class="zh-exam-arena">
        <div class="zh-exam-result-banner" style="background: ${isPass ? 'linear-gradient(135deg, rgba(16,185,129,0.2), rgba(59,130,246,0.2))' : 'linear-gradient(135deg, rgba(239,68,68,0.2), rgba(245,158,11,0.2))'};">
          <div style="font-size: 54px;">${isPass ? '🎉' : '💪'}</div>
          <h2 style="color: #fff; font-size: 26px; font-weight: 800;">${isPass ? 'CHÚC MỪNG BẠN ĐÃ ĐỖ KỲ THI!' : 'CỐ GẮNG LÊN, BẠN SẮP ĐẠT ĐƯỢC RỒI!'}</h2>
          <div style="font-size: 40px; font-weight: 900; color: ${isPass ? '#34d399' : '#fbbf24'};">${totalScore} / 200 ĐIỂM</div>
          <span class="zh-badge-pill ${isPass ? 'gold' : 'red'}" style="font-size: 13px; padding: 6px 18px;">
            ${isPass ? '✓ ĐẠT CHỨNG CHỈ HSK' : '✕ CHƯA ĐẠT (CẦN >= 120 ĐIỂM)'}
          </span>
          <div style="display: flex; gap: 24px; margin-top: 10px;">
            <div style="text-align: center;"><div style="font-size: 18px; font-weight: 800; color: #fff;">${scoreListening}/100</div><div style="font-size: 12px; color: var(--text-muted);">Phần Nghe hiểu</div></div>
            <div style="text-align: center;"><div style="font-size: 18px; font-weight: 800; color: #fff;">${scoreReading}/100</div><div style="font-size: 12px; color: var(--text-muted);">Phần Đọc hiểu</div></div>
            <div style="text-align: center;"><div style="font-size: 18px; font-weight: 800; color: #fff;">${correctCount}/${this.hskQuestions.length}</div><div style="font-size: 12px; color: var(--text-muted);">Số câu đúng</div></div>
          </div>
          <div style="display: flex; gap: 10px; margin-top: 14px;">
            <button class="zh-action-btn primary" onclick="chineseView.startHskTest(${this.hskLevel})">🔄 Thi lại lần nữa</button>
            <button class="zh-action-btn sm" onclick="chineseView.initHskTest()">📋 Về trang chọn đề</button>
          </div>
        </div>

        <div style="margin-top: 24px;">
          <h4 style="font-size: 16px; font-weight: 800; color: #fff; margin-bottom: 14px;">🔍 Xem Lại Chi Tiết Từng Câu Hỏi &amp; Đáp Án:</h4>
          <div style="display: flex; flex-direction: column; gap: 12px;">
            ${this.hskQuestions.map((q, idx) => {
              const uAns = this.hskUserAnswers[idx];
              const isCorrect = uAns === q.answer;
              return `
                <div class="zh-q-item" style="border-left: 4px solid ${isCorrect ? '#10b981' : '#ef4444'};">
                  <div style="display: flex; justify-content: space-between; align-items: center;">
                    <strong>Câu ${idx+1}: ${q.hanzi || q.audioText}</strong>
                    <span style="font-size: 12px; font-weight: 700; color: ${isCorrect ? '#34d399' : '#f87171'};">
                      ${isCorrect ? '✓ Đúng' : '✕ Sai'}
                    </span>
                  </div>
                  <div style="font-size: 12px; color: var(--text-secondary); margin-top: 4px;">
                    Đáp án của bạn: <strong style="color: ${isCorrect ? '#34d399' : '#f87171'};">${uAns !== undefined ? q.options[uAns] : 'Chưa chọn'}</strong>
                    ${!isCorrect ? ` · Đáp án đúng: <strong style="color: #34d399;">${q.options[q.answer]}</strong>` : ''}
                  </div>
                  <div style="font-size: 11.5px; color: #fbbf24; margin-top: 4px;">💡 ${q.explain}</div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      </div>
    `;
  }

  // =========================================================================
  // 5. ĐÁNH GIÁ TRÌNH ĐỘ (PLACEMENT TEST)
  // =========================================================================
  initLevelTest() {
    const intro = document.getElementById('zh-level-intro');
    const arena = document.getElementById('zh-level-arena');
    const resultBox = document.getElementById('zh-level-result-box');
    if (intro && !this.levelQuestions.length) {
      intro.style.display = 'block';
      if (arena) arena.style.display = 'none';
      if (resultBox) resultBox.style.display = 'none';
    }
  }

  startLevelTest() {
    this.levelCurrentIdx = 0;
    this.levelUserAnswers = {};

    this.levelQuestions = [
      // 1-5: Pinyin & Thanh điệu
      { cat: 'pinyin', catName: '🔤 Pinyin & Thanh điệu', q: 'Thanh điệu nào trong tiếng Trung có cao độ phẳng cao 5/5, ngân đều dứt khoát?', opts: ['Thanh 1 (mā)', 'Thanh 2 (má)', 'Thanh 3 (mǎ)', 'Thanh 4 (mà)'], ans: 0, exp: 'Thanh 1 (Âm Bình) có độ cao 55, ngân cao đều.' },
      { cat: 'pinyin', catName: '🔤 Pinyin & Thanh điệu', q: 'Khi hai thanh 3 đi liền nhau (ví dụ: 你好 nǐ hǎo), thanh 3 đầu tiên biến âm thành thanh mấy?', opts: ['Thanh 1', 'Thanh 2 (ní hǎo)', 'Thanh 4', 'Thanh nhẹ'], ans: 1, exp: 'Quy tắc biến điệu hai thanh 3: 3 + 3 -> 2 + 3 (Ní hǎo).' },
      { cat: 'pinyin', catName: '🔤 Pinyin & Thanh điệu', q: 'Phụ âm "zh" trong tiếng Hán được phát âm như thế nào?', opts: ['Uốn đầu lưỡi, bật hơi mạnh', 'Uốn đầu lưỡi chạm ngạc cứng, không bật hơi', 'Thẳng lưỡi như chữ "d" tiếng Việt', 'Như chữ "x" tiếng Việt'], ans: 1, exp: '"zh" là âm uốn lưỡi không bật hơi (gần giống tr nặng tiếng Việt).' },
      { cat: 'pinyin', catName: '🔤 Pinyin & Thanh điệu', q: 'Vận mẫu "ü" khi đi với các thanh mẫu "j, q, x" thì được viết như thế nào?', opts: ['Giữ nguyên ü', 'Bỏ hai dấu chấm trên đầu viết thành u (ju, qu, xu)', 'Thêm chữ w phía trước', 'Đổi thành iu'], ans: 1, exp: 'Khi ghép với j, q, x thì ü bỏ hai chấm, nhưng vẫn đọc là âm "uy".' },
      { cat: 'pinyin', catName: '🔤 Pinyin & Thanh điệu', q: 'Từ "不" (bù) khi đứng trước một từ mang thanh 4 (ví dụ: 不对 bù duì) sẽ biến âm thành gì?', opts: ['Giữ nguyên bù (thanh 4)', 'Biến thành bú (thanh 2: bú duì)', 'Biến thành bǔ (thanh 3)', 'Biến thành thanh nhẹ bu'], ans: 1, exp: 'Quy tắc biến âm của 不: đứng trước thanh 4 biến thành thanh 2 (Bú duì).' },

      // 6-10: Chữ Hán & Bộ thủ
      { cat: 'strokes', catName: '✍️ Chữ Hán & Bộ thủ', q: 'Bộ thủ nào sau đây biểu thị ý nghĩa liên quan đến nước và chất lỏng?', opts: ['Bộ Khẩu (口)', 'Bộ Thủy (氵)', 'Bộ Hỏa (灬)', 'Bộ Mộc (木)'], ans: 1, exp: 'Bộ Thủy 氵 liên quan nước, sông suối (ví dụ: 江 sông, 海 biển).' },
      { cat: 'strokes', catName: '✍️ Chữ Hán & Bộ thủ', q: 'Quy tắc viết bút thuận cơ bản nhất của chữ Hán là gì?', opts: ['Dưới trước trên sau', 'Ngang trước sổ sau, trên trước dưới sau', 'Phải trước trái sau', 'Trong trước ngoài sau'], ans: 1, exp: 'Quy tắc cốt lõi: Ngang trước sổ sau, trên trước dưới sau, trái trước phải sau.' },
      { cat: 'strokes', catName: '✍️ Chữ Hán & Bộ thủ', q: 'Chữ "休" (nghỉ ngơi) gồm bộ Nhân đứng (亻- người) và bộ Mộc (木 - cây), mang ý nghĩa gì?', opts: ['Người đốn cây', 'Người tựa vào gốc cây nghỉ ngơi', 'Cây cối sinh trưởng', 'Người trồng cây'], ans: 1, exp: 'Hội ý chữ Hán: Người đứng tựa cây là 休 (Nghỉ ngơi).' },
      { cat: 'strokes', catName: '✍️ Chữ Hán & Bộ thủ', q: 'Nét "Mác" (捺 - Nà) trong 8 nét cơ bản có hướng đi bút như thế nào?', opts: ['Từ dưới hất lên trên bên phải', 'Nằm ngang từ trái sang phải', 'Nghiêng từ trên trái sang dưới phải', 'Thẳng đứng từ trên xuống'], ans: 2, exp: 'Nét Mác nghiêng từ trên trái đổ xuống dưới phải.' },
      { cat: 'strokes', catName: '✍️ Chữ Hán & Bộ thủ', q: 'Bộ "Tâm" (忄hoặc 心) thường xuất hiện trong những chữ biểu thị điều gì?', opts: ['Đồ ăn thức uống', 'Cảm xúc, tư duy, tâm trạng', 'Thời tiết khí hậu', 'Địa điểm nhà cửa'], ans: 1, exp: 'Bộ Tâm liên quan suy nghĩ, tình cảm (ví dụ: 想 nhớ/nghĩ, 怕 sợ).' },

      // 11-15: Vốn từ vựng HSK 1-3
      { cat: 'vocab', catName: '📚 Vốn từ HSK', q: 'Từ "电脑" (diànnǎo) có âm Hán Việt là "Điện Não", nghĩa là gì?', opts: ['Điện thoại di động', 'Máy vi tính (Computer)', 'Tivi truyền hình', 'Tủ lạnh'], ans: 1, exp: 'Điện não = Bộ não điện tử = Máy tính máy tính.' },
      { cat: 'vocab', catName: '📚 Vốn từ HSK', q: 'Đại từ nhân xưng "我们" (wǒmen) có nghĩa là gì?', opts: ['Các bạn', 'Chúng tôi, chúng ta', 'Bọn họ', 'Anh ấy'], ans: 1, exp: 'Wǒmen = Chúng tôi, chúng ta.' },
      { cat: 'vocab', catName: '📚 Vốn từ HSK', q: 'Lượng từ dùng cho sách vở (书) trong tiếng Trung là gì?', opts: ['个 (gè)', '只 (zhī)', '本 (běn)', '张 (zhāng)'], ans: 2, exp: 'Lượng từ của sách là 本 (yì běn shū - một cuốn sách).' },
      { cat: 'vocab', catName: '📚 Vốn từ HSK', q: 'Từ "苹果" (píngguǒ) có nghĩa là gì?', opts: ['Quả táo', 'Quả chuối', 'Quả dưa hấu', 'Quả xoài'], ans: 0, exp: 'Píngguǒ = Quả táo (Âm Hán Việt: Bình Quả).' },
      { cat: 'vocab', catName: '📚 Vốn từ HSK', q: 'Từ "非常" (fēicháng) đồng nghĩa với từ nào sau đây?', opts: ['很少 (rất ít)', '很 / 特别 (rất, vô cùng)', '不想 (không muốn)', '经常 (thường xuyên)'], ans: 1, exp: 'Fēicháng = Vô cùng, rất.' },

      // 16-20: Cấu trúc ngữ pháp
      { cat: 'grammar', catName: '📖 Cấu trúc ngữ pháp', q: 'Trợ từ "的" (de) dùng để biểu thị quan hệ gì trong câu?', opts: ['Sở hữu / Định ngữ (của, miêu tả)', 'Thời quá khứ đã xảy ra', 'Phủ định hành động', 'Câu hỏi nghi vấn'], ans: 0, exp: 'Trợ từ 的 biểu thị sở hữu (wǒ de shū - sách của tôi) hoặc cụm định vị.' },
      { cat: 'grammar', catName: '📖 Cấu trúc ngữ pháp', q: 'Câu hỏi nghi vấn Có... Không đơn giản nhất trong tiếng Hán dùng từ gì ở cuối câu?', opts: ['呢 (ne)', '吗 (ma)', '吧 (ba)', '了 (le)'], ans: 1, exp: 'Khẩu ngữ hỏi Có... không thêm 吗 ở cuối câu (Nǐ hǎo ma?).' },
      { cat: 'grammar', catName: '📖 Cấu trúc ngữ pháp', q: 'Trạng từ chỉ thời gian trong câu tiếng Trung thường đứng ở vị trí nào?', opts: ['Cuối câu sau vị ngữ', 'Trước hoặc ngay sau chủ ngữ', 'Bên trong tân ngữ', 'Chỉ đứng ở vị trí đầu câu duy nhất'], ans: 1, exp: 'Thời gian đứng trước hoặc ngay sau chủ ngữ (ví dụ: Wǒ jīntiān qù...).' },
      { cat: 'grammar', catName: '📖 Cấu trúc ngữ pháp', q: 'Cấu trúc so sánh "A 比 B + Tính từ" (ví dụ: 哥哥比我高) có nghĩa là gì?', opts: ['Anh trai thấp hơn tôi', 'Anh trai cao bằng tôi', 'Anh trai cao hơn tôi', 'Anh trai không cao'], ans: 2, exp: 'Cấu trúc so sánh hơn 比: A hơn B cái gì đó.' },
      { cat: 'grammar', catName: '📖 Cấu trúc ngữ pháp', q: 'Phó từ phủ định quá khứ "没有" (méiyǒu) dùng để phủ định điều gì?', opts: ['Hành động sắp diễn ra', 'Hành động chưa hoặc không xảy ra trong quá khứ', 'Ý chí tương lai', 'Tính cách con người'], ans: 1, exp: 'Phủ định hành động trong quá khứ dùng 没有 (Wǒ méi qù - Tôi chưa đi).' }
    ];

    const intro = document.getElementById('zh-level-intro');
    const arena = document.getElementById('zh-level-arena');
    const resultBox = document.getElementById('zh-level-result-box');

    if (intro) intro.style.display = 'none';
    if (resultBox) resultBox.style.display = 'none';
    if (arena) arena.style.display = 'block';

    this.renderLevelQuestion();
  }

  renderLevelQuestion() {
    const qContent = document.getElementById('zh-level-q-content');
    const catBadge = document.getElementById('zh-level-cat-badge');
    const progressBadge = document.getElementById('zh-level-progress-badge');
    if (!qContent || !this.levelQuestions.length) return;

    const q = this.levelQuestions[this.levelCurrentIdx];
    const letters = ['A', 'B', 'C', 'D'];

    if (catBadge) catBadge.textContent = q.catName;
    if (progressBadge) progressBadge.textContent = `Câu ${this.levelCurrentIdx + 1} / ${this.levelQuestions.length}`;

    qContent.innerHTML = `
      <div style="margin-top: 14px;">
        <h4 style="font-size: 17px; font-weight: 800; color: #fff; line-height: 1.5; margin-bottom: 16px;">${q.q}</h4>
        <div style="display: flex; flex-direction: column; gap: 10px;">
          ${q.opts.map((opt, optIdx) => `
            <button class="zh-opt-choice" style="font-size: 14px; padding: 12px 18px;" onclick="chineseView.selectLevelAnswer(${optIdx})">
              <span><strong style="color: #fbbf24; margin-right: 8px;">${letters[optIdx]}.</strong> ${opt}</span>
              <span style="color: var(--text-muted);">➔</span>
            </button>
          `).join('')}
        </div>
      </div>
    `;
  }

  selectLevelAnswer(choiceIdx) {
    this.levelUserAnswers[this.levelCurrentIdx] = choiceIdx;
    if (this.levelCurrentIdx < this.levelQuestions.length - 1) {
      this.levelCurrentIdx++;
      this.renderLevelQuestion();
    } else {
      this.finishLevelTest();
    }
  }

  finishLevelTest() {
    let scoreTotal = 0;
    const catScores = { pinyin: 0, strokes: 0, vocab: 0, grammar: 0 };

    this.levelQuestions.forEach((q, idx) => {
      const uChoice = this.levelUserAnswers[idx];
      if (uChoice === q.ans) {
        scoreTotal++;
        catScores[q.cat] = (catScores[q.cat] || 0) + 1;
      }
    });

    const percent = Math.round((scoreTotal / this.levelQuestions.length) * 100);

    let levelName = 'Vỡ lòng (Mới bắt đầu)';
    let levelBadgeClass = 'purple';
    let levelDesc = 'Bạn đang ở ngưỡng khởi đầu với tiếng Trung. Hãy tập trung làm chủ bảng Pinyin và 8 nét chữ Hán trước khi học nhiều từ vựng!';
    let roadmap = [
      { text: 'Làm chủ 21 Thanh mẫu & 36 Vận mẫu Pinyin', tab: 'pinyin' },
      { text: 'Tập viết đúng 8 nét & 7 quy tắc bút thuận', tab: 'strokes' }
    ];

    if (percent >= 85) {
      levelName = 'HSK 3 (Trung cấp sơ bộ)';
      levelBadgeClass = 'gold';
      levelDesc = 'Nền tảng cực kỳ xuất sắc! Bạn đã làm chủ phát âm, nhận diện chữ Hán và vốn ngữ pháp vững chắc. Bạn sẵn sàng giao tiếp chuyên sâu.';
      roadmap = [
        { text: 'Luyện đọc hiểu các đoạn văn HSK 3 dài', tab: 'reading' },
        { text: 'Trò chuyện AI Conversation chuyên đề phỏng vấn', tab: 'zh-ai-chat' }
      ];
    } else if (percent >= 60) {
      levelName = 'HSK 2 (Giao tiếp cơ bản)';
      levelBadgeClass = 'red';
      levelDesc = 'Trình độ giao tiếp tốt! Bạn nhận diện chữ Hán chuẩn xác và nắm vững các mẫu câu đàm thoại đời thường.';
      roadmap = [
        { text: 'Chinh phục trọn bộ 25 chuyên đề ngữ pháp HSK 2-3', tab: 'grammar' },
        { text: 'Thử sức với Đề thi mô phỏng HSK 2', tab: 'hsk-test' }
      ];
    } else if (percent >= 35) {
      levelName = 'HSK 1 (Nền tảng vỡ lòng)';
      levelBadgeClass = 'gold';
      levelDesc = 'Bạn đã nắm được các quy tắc Pinyin cơ bản và một số từ vựng thường nhật. Cần trau dồi thêm bộ thủ và ghép câu.';
      roadmap = [
        { text: 'Ôn tập 600+ từ vựng HSK 1 qua Flashcard', tab: 'vocab' },
        { text: 'Luyện 303 câu đàm thoại thực chiến', tab: 'phrases' }
      ];
    }

    const arena = document.getElementById('zh-level-arena');
    const resultBox = document.getElementById('zh-level-result-box');
    if (arena) arena.style.display = 'none';
    if (!resultBox) return;
    resultBox.style.display = 'block';

    resultBox.innerHTML = `
      <div class="zh-exam-arena">
        <div class="zh-exam-result-banner">
          <div style="font-size: 54px;">🏆</div>
          <h2 style="color: #fff; font-size: 24px; font-weight: 800;">KẾT QUẢ ĐÁNH GIÁ TRÌNH ĐỘ</h2>
          <span class="zh-badge-pill ${levelBadgeClass}" style="font-size: 15px; padding: 6px 20px;">
            ${levelName}
          </span>
          <div style="font-size: 32px; font-weight: 900; color: #fbbf24; margin-top: 6px;">
            ${scoreTotal} / ${this.levelQuestions.length} Câu Đúng (${percent}%)
          </div>
          <p style="font-size: 13.5px; color: var(--text-secondary); max-width: 520px; line-height: 1.6; margin: 8px auto 0;">
            ${levelDesc}
          </p>
        </div>

        <div style="margin-top: 20px;">
          <h4 style="font-size: 15px; font-weight: 800; color: #fff; margin-bottom: 12px;">📊 Năng Lực 4 Kỹ Năng Cốt Lõi:</h4>
          <div class="zh-level-radar-grid">
            <div class="zh-radar-card">
              <div style="display: flex; justify-content: space-between; font-weight: 700; color: #fff;">
                <span>🔤 Pinyin &amp; Thanh điệu</span>
                <span style="color: #fbbf24;">${catScores.pinyin}/5</span>
              </div>
              <div style="height: 6px; background: rgba(255,255,255,0.1); border-radius: 999px; overflow: hidden; margin-top: 6px;">
                <div style="width: ${(catScores.pinyin/5)*100}%; height: 100%; background: #fbbf24;"></div>
              </div>
            </div>
            <div class="zh-radar-card">
              <div style="display: flex; justify-content: space-between; font-weight: 700; color: #fff;">
                <span>✍️ Chữ Hán &amp; Nét bút</span>
                <span style="color: #10b981;">${catScores.strokes}/5</span>
              </div>
              <div style="height: 6px; background: rgba(255,255,255,0.1); border-radius: 999px; overflow: hidden; margin-top: 6px;">
                <div style="width: ${(catScores.strokes/5)*100}%; height: 100%; background: #10b981;"></div>
              </div>
            </div>
            <div class="zh-radar-card">
              <div style="display: flex; justify-content: space-between; font-weight: 700; color: #fff;">
                <span>📚 Vốn từ vựng HSK</span>
                <span style="color: #f43f5e;">${catScores.vocab}/5</span>
              </div>
              <div style="height: 6px; background: rgba(255,255,255,0.1); border-radius: 999px; overflow: hidden; margin-top: 6px;">
                <div style="width: ${(catScores.vocab/5)*100}%; height: 100%; background: #f43f5e;"></div>
              </div>
            </div>
            <div class="zh-radar-card">
              <div style="display: flex; justify-content: space-between; font-weight: 700; color: #fff;">
                <span>📖 Cấu trúc ngữ pháp</span>
                <span style="color: #8b5cf6;">${catScores.grammar}/5</span>
              </div>
              <div style="height: 6px; background: rgba(255,255,255,0.1); border-radius: 999px; overflow: hidden; margin-top: 6px;">
                <div style="width: ${(catScores.grammar/5)*100}%; height: 100%; background: #8b5cf6;"></div>
              </div>
            </div>
          </div>
        </div>

        <div style="margin-top: 20px; background: rgba(255,255,255,0.03); border: 1px solid var(--glass-border); border-radius: var(--radius-md); padding: 18px;">
          <h4 style="font-size: 15px; font-weight: 800; color: #fff; margin-bottom: 10px;">🎯 Lộ Trình Đề Xuất Dành Riêng Cho Bạn:</h4>
          <div style="display: flex; flex-direction: column; gap: 8px;">
            ${roadmap.map(r => `
              <div style="display: flex; align-items: center; justify-content: space-between; background: rgba(0,0,0,0.25); padding: 10px 14px; border-radius: 8px;">
                <span style="font-size: 13.5px; color: #e2e8f0;">👉 ${r.text}</span>
                <button class="zh-action-btn primary sm" onclick="app.switchTab('chinese', '${r.tab}')">Học ngay ➔</button>
              </div>
            `).join('')}
          </div>
        </div>

        <div style="text-align: center; margin-top: 16px;">
          <button class="zh-action-btn sm" onclick="chineseView.startLevelTest()">🔄 Làm lại bài đánh giá</button>
        </div>
      </div>
    `;
  }

  // =========================================================================
  // 6. ROLE PLAY (KỊCH BẢN NHẬP VAI TIẾNG TRUNG THỰC TẾ)
  // =========================================================================
  renderRoleplay() {
    const scenarios = window.ZH_ROLEPLAY_SCENARIOS || [];
    const progress = window.storage ? window.storage.getChineseRoleplayProgress() : {};

    const completedCount = Object.values(progress).filter(p => p && p.completed).length;
    const statsBadge = document.getElementById('zh-roleplay-stats-badge');
    if (statsBadge) {
      statsBadge.textContent = `Đã hoàn thành: ${completedCount} / ${scenarios.length} kịch bản`;
    }

    const listView = document.getElementById('zh-roleplay-list-view');
    const arenaView = document.getElementById('zh-roleplay-arena-view');
    if (listView) listView.style.display = 'block';
    if (arenaView) arenaView.style.display = 'none';

    const grid = document.getElementById('zh-roleplay-grid');
    if (!grid) return;

    grid.innerHTML = scenarios.map(s => {
      const p = progress[s.id];
      const isDone = p && p.completed;
      return `
        <div class="zh-roleplay-card ${isDone ? 'completed' : ''}">
          <div class="zh-rp-card-header">
            <span class="zh-rp-avatar">${s.avatar}</span>
            <div class="zh-rp-header-info">
              <span class="zh-badge-pill sm ${isDone ? 'green' : 'purple'}">${s.badge}</span>
              <span class="zh-badge-pill sm yellow">${s.level}</span>
            </div>
          </div>
          <h4 class="zh-rp-card-title">${s.title}</h4>
          <div class="zh-rp-card-cn">${s.titleCn}</div>
          <div class="zh-rp-card-partner">
            👤 <strong>${s.partnerName}</strong> (${s.partnerRole})
          </div>
          <div class="zh-rp-card-location">📍 ${s.location}</div>
          <p class="zh-rp-card-desc">${s.situationDesc}</p>
          <div class="zh-rp-objectives-preview">
            🎯 3 Nhiệm vụ: ${s.objectives.map(o => o.label).join(' • ')}
          </div>
          <div class="zh-rp-card-footer">
            ${isDone ? '<span class="zh-rp-status-tag done">✓ Đã vượt qua</span>' : '<span class="zh-rp-status-tag pending">Chưa hoàn thành</span>'}
            <button class="zh-action-btn primary sm" onclick="chineseView.startRoleplay('${s.id}')">
              ${isDone ? '🔄 Luyện lại' : '🚀 Nhập vai ngay'}
            </button>
          </div>
        </div>
      `;
    }).join('');
  }

  startRoleplay(scId) {
    const scenarios = window.ZH_ROLEPLAY_SCENARIOS || [];
    const sc = scenarios.find(s => s.id === scId) || scenarios[0];
    if (!sc) return;

    this.currentRoleplayId = scId;
    this.rpCompletedObjectives = new Set();
    this.rpMessages = [];

    const listView = document.getElementById('zh-roleplay-list-view');
    const arenaView = document.getElementById('zh-roleplay-arena-view');
    if (listView) listView.style.display = 'none';
    if (arenaView) arenaView.style.display = 'block';

    const partnerInfo = document.getElementById('zh-roleplay-partner-info');
    if (partnerInfo) {
      partnerInfo.innerHTML = `
        <div class="zh-partner-avatar-ring">
          <span class="avatar-emoji">${sc.avatar}</span>
          <span class="live-pulse-dot" title="Trực tuyến"></span>
        </div>
        <div class="zh-partner-meta">
          <div class="partner-top-row">
            <span class="partner-name">${sc.partnerName}</span>
            <span class="partner-role-badge">${sc.partnerRole}</span>
          </div>
          <div class="partner-sub-row">
            <span class="location-tag">📍 ${sc.location}</span>
            <span class="badge-tag">${sc.badge}</span>
          </div>
        </div>
      `;
    }

    const desc = document.getElementById('zh-rp-situation-desc');
    if (desc) desc.textContent = sc.situationDesc;

    this.renderRoleplayObjectives(sc);

    // Quick replies tray
    const quickTray = document.getElementById('zh-rp-quick-replies');
    if (quickTray) {
      quickTray.innerHTML = sc.quickReplies.map((q, idx) => `
        <button class="zh-rp-quick-card" onclick="chineseView.sendRoleplayQuickReply(${idx})">
          <div class="quick-cn">${q.cn}</div>
          <div class="quick-vi">${q.vi}</div>
        </button>
      `).join('');
    }

    // Initial character greeting
    this.rpMessages.push({
      role: 'partner',
      cn: sc.greeting.cn,
      pinyin: sc.greeting.pinyin,
      vi: sc.greeting.vi,
      time: 'Vừa xong'
    });

    this.renderRoleplayMessages();
    this.playChineseText(sc.greeting.cn);
  }

  backToRoleplayList() {
    this.renderRoleplay();
  }

  renderRoleplayObjectives(sc = null) {
    if (!sc) {
      const scenarios = window.ZH_ROLEPLAY_SCENARIOS || [];
      sc = scenarios.find(s => s.id === this.currentRoleplayId) || scenarios[0];
    }
    if (!sc) return;

    const countEl = document.getElementById('zh-rp-objectives-count');
    const totalObj = sc.objectives.length;
    const doneObj = this.rpCompletedObjectives.size;
    const pct = Math.round((doneObj / totalObj) * 100);

    if (countEl) {
      countEl.textContent = `${doneObj}/${totalObj} đạt`;
      countEl.className = doneObj === totalObj ? 'zh-rp-obj-badge done' : 'zh-rp-obj-badge';
    }

    const fillBar = document.getElementById('zh-rp-obj-progress-fill');
    if (fillBar) {
      fillBar.style.width = `${pct}%`;
      if (doneObj === totalObj) fillBar.classList.add('completed');
      else fillBar.classList.remove('completed');
    }

    const listEl = document.getElementById('zh-rp-objectives-list');
    if (listEl) {
      listEl.innerHTML = sc.objectives.map(obj => {
        const isDone = this.rpCompletedObjectives.has(obj.id);
        return `
          <div class="zh-obj-card ${isDone ? 'completed' : ''}">
            <div class="zh-obj-icon">${isDone ? '✅' : '○'}</div>
            <div class="zh-obj-text">${obj.label}</div>
            ${isDone ? '<span class="zh-obj-done-tag">Xong</span>' : ''}
          </div>
        `;
      }).join('');
    }
  }

  checkRoleplayObjectives(text) {
    const scenarios = window.ZH_ROLEPLAY_SCENARIOS || [];
    const sc = scenarios.find(s => s.id === this.currentRoleplayId);
    if (!sc) return;

    let newlyCompleted = false;
    sc.objectives.forEach(obj => {
      if (!this.rpCompletedObjectives.has(obj.id)) {
        const matched = obj.keywords.some(kw => text.includes(kw));
        if (matched) {
          this.rpCompletedObjectives.add(obj.id);
          newlyCompleted = true;
        }
      }
    });

    this.renderRoleplayObjectives(sc);

    if (newlyCompleted && this.rpCompletedObjectives.size === sc.objectives.length) {
      if (window.audioCtrl) {
        window.audioCtrl.speak('太棒了，完成所有任务！', null, { lang: 'zh-CN', rate: 1.1 });
      }
    }
  }

  renderRoleplayMessages() {
    const box = document.getElementById('zh-rp-messages-box');
    if (!box) return;

    const scenarios = window.ZH_ROLEPLAY_SCENARIOS || [];
    const sc = scenarios.find(s => s.id === this.currentRoleplayId) || { avatar: '🤖', partnerName: 'Đối tác', partnerRole: 'Nhân vật' };

    const counter = document.getElementById('zh-rp-turn-counter');
    if (counter) {
      counter.textContent = `Lượt đối thoại phản xạ (${this.rpMessages.length} tin)`;
    }

    box.innerHTML = this.rpMessages.map(m => {
      const isUser = m.role === 'user';
      return `
        <div class="zh-rp-msg-row ${isUser ? 'user' : 'partner'}">
          <div class="zh-rp-msg-avatar">${isUser ? '🧑‍🎓' : sc.avatar}</div>
          <div class="zh-rp-msg-col">
            <div class="zh-rp-msg-author">
              <span class="author-name">${isUser ? 'Bạn (Học viên)' : sc.partnerName}</span>
              ${!isUser ? `<span class="author-role">${sc.partnerRole}</span>` : ''}
            </div>
            <div class="zh-rp-bubble">
              <div class="zh-bubble-cn">${m.cn || m.text}</div>
              ${m.pinyin ? `<div class="zh-bubble-pinyin" style="display: ${this.rpShowPinyin ? 'block' : 'none'};">${m.pinyin}</div>` : ''}
              ${m.vi ? `<div class="zh-bubble-vi" style="display: ${this.rpShowVi ? 'block' : 'none'};">${m.vi}</div>` : ''}
              ${!isUser && m.cn ? `
                <div class="zh-bubble-audio-actions">
                  <button class="zh-audio-pill" onclick="chineseView.playChineseText('${encodeURIComponent(m.cn).replace(/'/g, '%27')}', 1.0)">
                    🔊 Nghe phát âm
                  </button>
                  <button class="zh-audio-pill slow" onclick="chineseView.playChineseText('${encodeURIComponent(m.cn).replace(/'/g, '%27')}', 0.75)">
                    🐢 Đọc chậm
                  </button>
                </div>
              ` : ''}
            </div>
          </div>
        </div>
      `;
    }).join('');

    box.scrollTop = box.scrollHeight;
  }

  sendRoleplayQuickReply(idx) {
    const scenarios = window.ZH_ROLEPLAY_SCENARIOS || [];
    const sc = scenarios.find(s => s.id === this.currentRoleplayId);
    if (!sc || !sc.quickReplies[idx]) return;

    const q = sc.quickReplies[idx];
    this.sendRoleplayUserMessage(q.cn);
  }

  _showRoleplayTypingIndicator(sc) {
    this._removeRoleplayTypingIndicator();
    const box = document.getElementById('zh-rp-messages-box');
    if (!box) return;

    const div = document.createElement('div');
    div.className = 'zh-rp-msg-row partner';
    div.id = 'zh-rp-typing-indicator';
    div.innerHTML = `
      <div class="zh-rp-msg-avatar">${sc ? sc.avatar : '🤖'}</div>
      <div class="zh-rp-msg-col">
        <div class="zh-rp-msg-author">
          <span class="author-name">${sc ? sc.partnerName : 'Nhân vật'}</span>
          <span class="author-role">${sc ? sc.partnerRole : ''}</span>
        </div>
        <div class="zh-rp-bubble" style="padding: 10px 16px;">
          <div class="zh-typing-bubble">
            <div class="zh-typing-dots">
              <span></span><span></span><span></span>
            </div>
            <span class="zh-typing-text">${sc ? sc.partnerName : 'Nhân vật'} đang suy nghĩ...</span>
          </div>
        </div>
      </div>
    `;
    box.appendChild(div);
    box.scrollTop = box.scrollHeight;
  }

  _removeRoleplayTypingIndicator() {
    const el = document.getElementById('zh-rp-typing-indicator');
    if (el) el.remove();
  }

  async sendRoleplayUserMessage(customText = null) {
    if (this.rpIsRecording) {
      this.stopRoleplayMic(false);
    }

    const input = document.getElementById('zh-rp-user-input');
    const text = (customText !== null ? customText : (input ? input.value : '')).trim();
    if (!text) return;

    if (input && customText === null) input.value = '';

    const scenarios = window.ZH_ROLEPLAY_SCENARIOS || [];
    const sc = scenarios.find(s => s.id === this.currentRoleplayId);
    if (!sc) return;

    // Add user message
    this.rpMessages.push({
      role: 'user',
      text: text,
      time: 'Vừa xong'
    });

    this.checkRoleplayObjectives(text);
    this.renderRoleplayMessages();

    // Show typing dots in Roleplay box
    this._showRoleplayTypingIndicator(sc);

    // Generate response
    const apiKey = window.storage ? (window.storage.aiSettings.geminiApiKey || window.storage.settings.geminiApiKey) : '';
    const model = window.storage ? (window.storage.getAiModel ? window.storage.getAiModel() : (window.storage.aiSettings?.geminiModel || 'gemini-3.5-flash')) : 'gemini-3.5-flash';

    if (apiKey && apiKey.trim()) {
      // Call Gemini API for dynamic roleplay
      try {
        const historyText = this.rpMessages.slice(-6).map(m => `${m.role === 'user' ? 'User' : 'Character'}: ${m.cn || m.text}`).join('\n');
        const systemPrompt = `${sc.prompt}\nSituation: ${sc.situationDesc}\nCurrent conversation:\n${historyText}\nUser just said: "${text}".\nRespond in character. Output STRICT JSON format only: {"cn": "Chinese response", "pinyin": "pinyin transcription", "vi": "Vietnamese translation"}`;

        const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey.trim()}`;
        const ctrl = new AbortController();
        const tid = setTimeout(() => ctrl.abort(), 7500);
        let response;
        const rpGenConfig = {
          temperature: 0.5,
          maxOutputTokens: 250
        };
        if (String(model).includes('3.') || String(model).includes('3-')) {
          rpGenConfig.thinkingConfig = { thinking_level: "LOW" };
        }
        try {
          response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{ parts: [{ text: systemPrompt }] }],
              generationConfig: rpGenConfig
            }),
            signal: ctrl.signal
          });
        } finally {
          clearTimeout(tid);
        }

        if (response.ok) {
          const data = await response.json();
          const rawReply = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
          const cleanJson = rawReply.replace(/```json/gi, '').replace(/```/g, '').trim();
          const parsed = JSON.parse(cleanJson);
          if (parsed && parsed.cn) {
            this._removeRoleplayTypingIndicator();
            this.rpMessages.push({
              role: 'partner',
              cn: parsed.cn,
              pinyin: parsed.pinyin || '',
              vi: parsed.vi || '',
              time: 'Vừa xong'
            });
            this.renderRoleplayMessages();
            this.playChineseText(parsed.cn);
            this.saveRoleplayProgress();
            return;
          }
        }
      } catch (err) {
        console.warn('[Roleplay] Gemini API call error, falling back to script:', err);
      }
    }

    // Offline / Scripted fallback response
    let botReply = null;
    for (const sr of sc.scriptedReplies) {
      if (sr.match.some(m => text.includes(m))) {
        botReply = sr.reply;
        break;
      }
    }

    if (!botReply) {
      botReply = {
        cn: '好！我明白了。请问您还有其他需要吗？',
        pinyin: 'Hǎo! Wǒ míngbai le. Qǐngwèn nín hái yǒu qítā xūyào ma?',
        vi: 'Được rồi! Tôi hiểu rồi. Xin hỏi bạn còn cần gì khác không ạ?'
      };
    }

    setTimeout(() => {
      this._removeRoleplayTypingIndicator();
      this.rpMessages.push({
        role: 'partner',
        cn: botReply.cn,
        pinyin: botReply.pinyin,
        vi: botReply.vi,
        time: 'Vừa xong'
      });
      this.renderRoleplayMessages();
      this.playChineseText(botReply.cn);
      this.saveRoleplayProgress();
    }, 700);
  }

  saveRoleplayProgress() {
    if (!window.storage || !this.currentRoleplayId) return;
    const scenarios = window.ZH_ROLEPLAY_SCENARIOS || [];
    const sc = scenarios.find(s => s.id === this.currentRoleplayId);
    const isCompleted = sc && this.rpCompletedObjectives.size >= sc.objectives.length;

    window.storage.saveChineseRoleplayProgress(this.currentRoleplayId, {
      completed: isCompleted,
      completedCount: this.rpCompletedObjectives.size,
      turns: this.rpMessages.length
    });
  }

  finishRoleplayScenario() {
    this.saveRoleplayProgress();
    const scenarios = window.ZH_ROLEPLAY_SCENARIOS || [];
    const sc = scenarios.find(s => s.id === this.currentRoleplayId);
    const isAll = sc && this.rpCompletedObjectives.size >= sc.objectives.length;

    if (window.storage && window.storage.stats) {
      window.storage.stats.xp = (window.storage.stats.xp || 0) + (isAll ? 50 : 25);
      window.storage.stats.roleplaysCompleted = (window.storage.stats.roleplaysCompleted || 0) + 1;
      window.storage.saveStats();
    }

    alert(`🎉 Chúc mừng bạn đã hoàn thành kịch bản "${sc ? sc.title : ''}"!\n\n🎯 Mục tiêu đạt được: ${this.rpCompletedObjectives.size}/${sc ? sc.objectives.length : 3}\n⭐ Nhận thưởng: +${isAll ? 50 : 25} XP`);
    this.backToRoleplayList();
  }

  resetCurrentRoleplay() {
    if (confirm('Bạn có chắc muốn bắt đầu lại kịch bản này từ đầu?')) {
      this.startRoleplay(this.currentRoleplayId);
    }
  }

  toggleRoleplayPinyin() {
    this.rpShowPinyin = !this.rpShowPinyin;
    const btn = document.getElementById('zh-rp-toggle-pinyin');
    if (btn) btn.textContent = `🔤 Pinyin: ${this.rpShowPinyin ? 'BẬT' : 'TẮT'}`;
    document.querySelectorAll('#zh-rp-messages-box .zh-bubble-pinyin').forEach(el => {
      el.style.display = this.rpShowPinyin ? 'block' : 'none';
    });
  }

  toggleRoleplayVi() {
    this.rpShowVi = !this.rpShowVi;
    const btn = document.getElementById('zh-rp-toggle-vi');
    if (btn) btn.textContent = `🇻🇳 Nghĩa: ${this.rpShowVi ? 'BẬT' : 'TẮT'}`;
    document.querySelectorAll('#zh-rp-messages-box .zh-bubble-vi').forEach(el => {
      el.style.display = this.rpShowVi ? 'block' : 'none';
    });
  }

  showRoleplayHelpModal() {
    const scenarios = window.ZH_ROLEPLAY_SCENARIOS || [];
    const sc = scenarios.find(s => s.id === this.currentRoleplayId);
    if (!sc) return;

    const modalContent = sc.helpPrompts.map(h => `
      <div style="background: rgba(0,0,0,0.3); border-radius: 10px; padding: 12px; margin-bottom: 10px; border-left: 3px solid #ec4899;">
        <div style="font-size: 16px; font-weight: 700; color: #fff; margin-bottom: 4px;">${h.cn}</div>
        <div style="font-size: 13px; color: #38bdf8; margin-bottom: 4px;">${h.pinyin}</div>
        <div style="font-size: 13px; color: var(--text-secondary);">${h.vi}</div>
        <button class="zh-action-btn sm" style="margin-top: 8px;" onclick="chineseView.sendRoleplayUserMessage('${encodeURIComponent(h.cn).replace(/'/g, '%27')}'); document.getElementById('zh-roleplay-help-modal').remove();">Dùng câu này ➔</button>
      </div>
    `).join('');

    const modal = document.createElement('div');
    modal.id = 'zh-roleplay-help-modal';
    modal.style.cssText = 'position:fixed; inset:0; background:rgba(0,0,0,0.75); z-index:3000; display:flex; align-items:center; justify-content:center; padding:20px;';
    modal.innerHTML = `
      <div style="background:var(--bg-surface); border:1px solid var(--glass-border); border-radius:18px; max-width:540px; width:100%; padding:24px; max-height:85vh; overflow-y:auto;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
          <h4 style="font-size:17px; font-weight:800; color:#fff;">💡 Câu Thoại Cứu Trợ & Mẫu</h4>
          <button style="background:none; border:none; font-size:20px; color:#fff; cursor:pointer;" onclick="this.closest('#zh-roleplay-help-modal').remove()">✕</button>
        </div>
        <div>${modalContent}</div>
      </div>
    `;
    document.body.appendChild(modal);
  }

  _clearRoleplaySilenceTimer() {
    if (this._rpSilenceTimer) {
      clearTimeout(this._rpSilenceTimer);
      this._rpSilenceTimer = null;
    }
  }

  _resetRoleplaySilenceTimer() {
    this._clearRoleplaySilenceTimer();
    // Sau khi người dùng ngừng nói 2.5 giây -> Tự động gửi
    this._rpSilenceTimer = setTimeout(() => {
      if (this.rpIsRecording) {
        this.stopRoleplayMic(true);
      }
    }, 2500);
  }

  _initRoleplaySpeechRecognition() {
    const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRec) return;

    try {
      this.rpRecog = new SpeechRec();
      this.rpRecog.lang = 'zh-CN';
      this.rpRecog.continuous = true;
      this.rpRecog.interimResults = true;

      this.rpRecog.onstart = () => {
        this.rpIsRecording = true;
        const btn = document.getElementById('zh-rp-mic-btn');
        if (btn) btn.classList.add('recording');
      };

      this.rpRecog.onresult = (e) => {
        let finalChunk = '';
        let interimChunk = '';
        for (let i = 0; i < e.results.length; ++i) {
          if (e.results[i].isFinal) {
            finalChunk += e.results[i][0].transcript + ' ';
          } else {
            interimChunk += e.results[i][0].transcript;
          }
        }

        this._latestRpFinalChunk = finalChunk;
        const currentSessionSpoken = (finalChunk + interimChunk).trim();
        const fullSpoken = [this.rpAccumulated, currentSessionSpoken].filter(Boolean).join(' ').trim();
        const displayText = [this.rpPreSpeechText, fullSpoken].filter(Boolean).join(' ').trim();

        const input = document.getElementById('zh-rp-user-input');
        if (input && displayText) {
          input.value = displayText;
        }

        if (fullSpoken.length > 0) {
          this._resetRoleplaySilenceTimer();
        }
      };

      this.rpRecog.onerror = (e) => {
        if (e.error === 'no-speech' || e.error === 'aborted') return;
        this._clearRoleplaySilenceTimer();
        this.stopRoleplayMic(false);
        if (window.app && e.error === 'not-allowed') {
          window.app.showToast('Vui lòng cấp quyền Micro để nói tiếng Trung.', 'warning');
        }
      };

      this.rpRecog.onend = () => {
        if (this.rpIsRecording && !this.rpManualStop) {
          if (this._latestRpFinalChunk) {
            this.rpAccumulated = [this.rpAccumulated, this._latestRpFinalChunk].filter(Boolean).join(' ').trim();
            this._latestRpFinalChunk = '';
          }
          try {
            this.rpRecog.start();
            return;
          } catch (err) {
            console.warn('Auto-restart RP mic failed:', err);
          }
        }
        this.rpIsRecording = false;
        const btn = document.getElementById('zh-rp-mic-btn');
        if (btn) btn.classList.remove('recording');
      };
    } catch (e) {
      console.warn('Error init RP speech rec:', e);
      this.rpRecog = null;
    }
  }

  stopRoleplayMic(autoSend = false) {
    this._clearRoleplaySilenceTimer();
    this.rpManualStop = true;
    this.rpIsRecording = false;

    if (this.rpRecog) {
      try {
        this.rpRecog.stop();
      } catch (e) {}
    }

    const btn = document.getElementById('zh-rp-mic-btn');
    if (btn) btn.classList.remove('recording');

    if (autoSend) {
      const input = document.getElementById('zh-rp-user-input');
      if (input && input.value.trim()) {
        this.sendRoleplayUserMessage();
      }
    }
  }

  async toggleRoleplayMic() {
    if (!this.rpRecog) {
      this._initRoleplaySpeechRecognition();
    }

    if (window.AndroidSpeech && typeof window.AndroidSpeech.hasPermission === 'function' && !window.AndroidSpeech.hasPermission()) {
      window.AndroidSpeech.requestPermission();
      if (window.app) {
        window.app.showToast('Vui lòng cho phép quyền Micro khi hộp thoại hệ thống xuất hiện.', 'info');
      }
      return;
    }

    if (this.rpIsRecording) {
      this.stopRoleplayMic(true);
      return;
    }

    if (window.audioCtrl) window.audioCtrl.stop();
    const input = document.getElementById('zh-rp-user-input');
    this.rpPreSpeechText = (input ? input.value : '').trim();
    this.rpAccumulated = '';
    this._latestRpFinalChunk = '';
    this.rpManualStop = false;
    this.rpIsRecording = true;
    const btn = document.getElementById('zh-rp-mic-btn');
    if (btn) btn.classList.add('recording');

    try {
      this.rpRecog.lang = 'zh-CN';
      this.rpRecog.start();
    } catch (e) {
      console.warn('Roleplay SpeechRec start failed:', e);
      this.stopRoleplayMic(false);
    }
  }

  // =========================================================================
  // 7. ÔN TẬP THÔNG MINH SRS (SPACED REPETITION SYSTEM)
  // =========================================================================
  renderSrsDashboard() {
    // Check if SRS cards exist; if not, seed initial cards from vocab
    let cards = window.storage ? window.storage.getChineseSrsCards() : {};
    if (Object.keys(cards).length === 0) {
      this.seedSrsFromVocab(30, false);
      cards = window.storage ? window.storage.getChineseSrsCards() : {};
    }

    const now = Date.now();
    const cardList = Object.values(cards);

    const dueCards = cardList.filter(c => c.dueDate <= now);
    const learningCards = cardList.filter(c => (c.repetitions || 0) < 4);
    const masteredCards = cardList.filter(c => (c.repetitions || 0) >= 4);

    const dueEl = document.getElementById('zh-srs-due-count');
    const learningEl = document.getElementById('zh-srs-learning-count');
    const masteredEl = document.getElementById('zh-srs-mastered-count');
    const totalEl = document.getElementById('zh-srs-total-count');

    if (dueEl) dueEl.textContent = dueCards.length;
    if (learningEl) learningEl.textContent = learningCards.length;
    if (masteredEl) masteredEl.textContent = masteredCards.length;
    if (totalEl) totalEl.textContent = cardList.length;

    const startBtn = document.getElementById('zh-srs-start-btn');
    const statusText = document.getElementById('zh-srs-status-text');

    if (dueCards.length > 0) {
      if (startBtn) startBtn.textContent = `⚡ Ôn Tập Ngay (${dueCards.length} từ đến hạn) ➔`;
      if (statusText) statusText.textContent = `Bạn có ${dueCards.length} từ vựng đã đến lịch cần nhắc lại để không bị quên!`;
    } else {
      if (startBtn) startBtn.textContent = `⚡ Luyện Tập Thêm (10 từ đang học) ➔`;
      if (statusText) statusText.textContent = `Tuyệt vời! Bạn đã hoàn thành hết các thẻ cần ôn hôm nay. Bạn có thể luyện tập bổ sung thêm.`;
    }

    // Render table
    const tableEl = document.getElementById('zh-srs-due-list');
    if (tableEl) {
      const displayCards = dueCards.length > 0 ? dueCards.slice(0, 20) : cardList.slice(0, 20);
      tableEl.innerHTML = `
        <table class="zh-srs-table">
          <thead>
            <tr>
              <th>Chữ Hán</th>
              <th>Pinyin</th>
              <th>Nghĩa tiếng Việt</th>
              <th>Cấp HSK</th>
              <th>Số lần ôn</th>
              <th>Chu kỳ</th>
              <th>Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            ${displayCards.map(c => {
              const isDue = c.dueDate <= now;
              const daysLeft = Math.ceil((c.dueDate - now) / (1000 * 60 * 60 * 24));
              return `
                <tr>
                  <td style="font-size: 18px; font-weight: 800; color: #fff;">${c.cn || c.word}</td>
                  <td style="color: #38bdf8; font-weight: 600;">${c.pinyin || ''}</td>
                  <td>${c.vi || c.meaning || ''}</td>
                  <td><span class="zh-badge-pill sm yellow">${c.hsk ? 'HSK ' + c.hsk : 'HSK 1'}</span></td>
                  <td>${c.repetitions || 0} lần</td>
                  <td>${c.interval || 1} ngày</td>
                  <td>
                    ${isDue ? '<span class="zh-badge-pill sm red">Đến hạn</span>' : `<span class="zh-badge-pill sm green">Còn ${daysLeft} ngày</span>`}
                  </td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>
      `;
    }

    const dashView = document.getElementById('zh-srs-dashboard-view');
    const arenaView = document.getElementById('zh-srs-arena-view');
    const resultView = document.getElementById('zh-srs-result-view');
    if (dashView) dashView.style.display = 'block';
    if (arenaView) arenaView.style.display = 'none';
    if (resultView) resultView.style.display = 'none';
  }

  seedSrsFromVocab(count = 30, showNotice = true) {
    if (!window.CHINESE_VOCAB_DATA) return;
    const existing = window.storage ? window.storage.getChineseSrsCards() : {};
    let added = 0;

    for (const word of window.CHINESE_VOCAB_DATA) {
      if (added >= count) break;
      const wordId = 'zh_w_' + (word.id || word.word);
      if (!existing[wordId]) {
        existing[wordId] = {
          id: wordId,
          cn: word.word,
          pinyin: word.pinyin,
          hanviet: word.hanviet || '',
          vi: word.meaning,
          hsk: word.hsk || 1,
          example: word.example || '',
          exampleVi: word.exampleMeaning || '',
          repetitions: 0,
          interval: 1,
          easeFactor: 2.5,
          dueDate: Date.now(),
          state: 'learning'
        };
        added++;
      }
    }

    if (window.storage) window.storage.saveChineseSrsCards(existing);
    if (showNotice) {
      alert(`✅ Đã nạp thành công ${added} từ vựng HSK vào kho Ôn tập thông minh SRS!`);
      this.renderSrsDashboard();
    }
  }

  startSrsSession() {
    let cards = window.storage ? window.storage.getChineseSrsCards() : {};
    const now = Date.now();
    let toReview = Object.values(cards).filter(c => c.dueDate <= now);

    if (toReview.length === 0) {
      toReview = Object.values(cards).slice(0, 15);
    }

    if (toReview.length === 0) {
      this.seedSrsFromVocab(30, false);
      cards = window.storage ? window.storage.getChineseSrsCards() : {};
      toReview = Object.values(cards).slice(0, 15);
    }

    // Shuffle cards slightly for better retention
    this.srsSessionCards = toReview.sort(() => Math.random() - 0.5).slice(0, 20);
    this.srsCurrentIdx = 0;
    this.srsSessionStats = { total: this.srsSessionCards.length, again: 0, hard: 0, good: 0, easy: 0 };

    const dashView = document.getElementById('zh-srs-dashboard-view');
    const arenaView = document.getElementById('zh-srs-arena-view');
    const resultView = document.getElementById('zh-srs-result-view');
    if (dashView) dashView.style.display = 'none';
    if (arenaView) arenaView.style.display = 'block';
    if (resultView) resultView.style.display = 'none';

    this.showCurrentSrsCard();
  }

  showCurrentSrsCard() {
    const card = this.srsSessionCards[this.srsCurrentIdx];
    if (!card) return;

    this.srsIsFlipped = false;

    const progEl = document.getElementById('zh-srs-progress-text');
    if (progEl) progEl.textContent = `Thẻ ${this.srsCurrentIdx + 1} / ${this.srsSessionCards.length}`;

    const frontHanzi = document.getElementById('zh-srs-front-hanzi');
    const backHanzi = document.getElementById('zh-srs-back-hanzi');
    const backPinyin = document.getElementById('zh-srs-back-pinyin');
    const backHanviet = document.getElementById('zh-srs-back-hanviet');
    const backMeaning = document.getElementById('zh-srs-back-meaning');
    const backExample = document.getElementById('zh-srs-back-example');

    if (frontHanzi) frontHanzi.textContent = card.cn || card.word;
    if (backHanzi) backHanzi.textContent = card.cn || card.word;
    if (backPinyin) backPinyin.textContent = card.pinyin || '';
    if (backHanviet) backHanviet.textContent = card.hanviet ? `[Hán Việt: ${card.hanviet}]` : '';
    if (backMeaning) backMeaning.textContent = card.vi || card.meaning || '';
    if (backExample) {
      if (card.example) {
        backExample.innerHTML = `<strong>Ví dụ:</strong> ${card.example} <br><span style="color:var(--text-secondary); font-size:12px;">${card.exampleVi || ''}</span>`;
        backExample.style.display = 'block';
      } else {
        backExample.style.display = 'none';
      }
    }

    const cardEl = document.getElementById('zh-srs-card');
    if (cardEl) cardEl.classList.remove('flipped');

    const ratingBar = document.getElementById('zh-srs-rating-bar');
    if (ratingBar) ratingBar.style.display = 'none';

    this.playChineseText(card.cn || card.word);
  }

  flipSrsCard() {
    const cardEl = document.getElementById('zh-srs-card');
    if (!cardEl) return;

    this.srsIsFlipped = !this.srsIsFlipped;
    if (this.srsIsFlipped) {
      cardEl.classList.add('flipped');
      const ratingBar = document.getElementById('zh-srs-rating-bar');
      if (ratingBar) ratingBar.style.display = 'block';
    } else {
      cardEl.classList.remove('flipped');
    }
  }

  playCurrentSrsAudio() {
    const card = this.srsSessionCards[this.srsCurrentIdx];
    if (card) {
      this.playChineseText(card.cn || card.word);
    }
  }

  answerSrsCard(grade) {
    // grade: 1 (again), 2 (hard), 3 (good), 4 (easy)
    const card = this.srsSessionCards[this.srsCurrentIdx];
    if (!card) return;

    if (grade === 1) this.srsSessionStats.again++;
    else if (grade === 2) this.srsSessionStats.hard++;
    else if (grade === 3) this.srsSessionStats.good++;
    else if (grade === 4) this.srsSessionStats.easy++;

    if (window.storage) {
      window.storage.recordChineseSrsReview(card.id, grade);
      if (window.storage.stats) {
        window.storage.stats.xp = (window.storage.stats.xp || 0) + 5;
        window.storage.stats.flashcardsReviewed = (window.storage.stats.flashcardsReviewed || 0) + 1;
        window.storage.saveStats();
      }
    }

    if (this.srsCurrentIdx < this.srsSessionCards.length - 1) {
      this.srsCurrentIdx++;
      this.showCurrentSrsCard();
    } else {
      this.finishSrsSession();
    }
  }

  finishSrsSession() {
    const arenaView = document.getElementById('zh-srs-arena-view');
    const resultView = document.getElementById('zh-srs-result-view');
    if (arenaView) arenaView.style.display = 'none';
    if (resultView) resultView.style.display = 'block';

    const xpEarned = this.srsSessionCards.length * 5;

    resultView.innerHTML = `
      <div class="zh-srs-result-box" style="background: var(--bg-surface); border: 1px solid var(--glass-border); border-radius: 20px; padding: 40px 30px; text-align: center;">
        <div style="font-size: 56px; margin-bottom: 12px;">🎉</div>
        <h3 style="font-size: 22px; font-weight: 800; color: #fff; margin-bottom: 8px;">Hoàn Thành Phiên Ôn Tập SRS!</h3>
        <p style="font-size: 14px; color: var(--text-secondary); margin-bottom: 24px;">Bạn đã hoàn thành xuất sắc ${this.srsSessionCards.length} thẻ ghi nhớ theo thuật toán ngắt quãng.</p>

        <div style="display: flex; justify-content: center; gap: 16px; margin-bottom: 28px; flex-wrap: wrap;">
          <div style="background: rgba(0,0,0,0.3); padding: 14px 20px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.06);">
            <div style="font-size: 22px; font-weight: 800; color: #10b981;">+${xpEarned}</div>
            <div style="font-size: 11px; color: var(--text-secondary); text-transform: uppercase;">XP Thưởng</div>
          </div>
          <div style="background: rgba(0,0,0,0.3); padding: 14px 20px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.06);">
            <div style="font-size: 22px; font-weight: 800; color: #38bdf8;">${this.srsSessionCards.length}</div>
            <div style="font-size: 11px; color: var(--text-secondary); text-transform: uppercase;">Thẻ đã ôn</div>
          </div>
          <div style="background: rgba(0,0,0,0.3); padding: 14px 20px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.06);">
            <div style="font-size: 22px; font-weight: 800; color: #fbbf24;">${this.srsSessionStats.good + this.srsSessionStats.easy}</div>
            <div style="font-size: 11px; color: var(--text-secondary); text-transform: uppercase;">Nhớ Tốt &amp; Dễ</div>
          </div>
        </div>

        <div style="display: flex; justify-content: center; gap: 12px;">
          <button class="zh-action-btn primary" onclick="chineseView.renderSrsDashboard()">
            ← Quay về Dashboard SRS
          </button>
          <button class="zh-action-btn sm" onclick="chineseView.startSrsSession()">
            🔄 Ôn thêm một phiên nữa
          </button>
        </div>
      </div>
    `;
  }

  exitSrsSession() {
    this.renderSrsDashboard();
  }

  resetSrsConfirm() {
    if (confirm('Bạn có chắc chắn muốn đặt lại toàn bộ tiến độ ôn tập SRS? Toàn bộ lịch ngắt quãng sẽ được tạo mới.')) {
      if (window.storage) window.storage.resetChineseSrsData();
      this.seedSrsFromVocab(30, false);
      this.renderSrsDashboard();
    }
  }

  onEnterTab() {
    this.renderVocab();
  }

  onLeaveTab() {
    this.stopMicPractice();
    if (window.audioCtrl && typeof window.audioCtrl.stop === 'function') {
      window.audioCtrl.stop();
    }
  }
}

// Global instance
window.chineseView = new ChineseViewController();
