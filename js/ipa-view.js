/**
 * =========================================================================
 * Rio English - IPA Studio View Controller (ipa-view.js)
 * Interactive 44 IPA Chart, Sound Detail Drawer, Minimal Pairs Trainer,
 * Voice Pronunciation Tester & Ear-Training Quiz Game.
 * =========================================================================
 */

class IpaViewController {
  constructor() {
    this.activeSubTab = 'chart'; // 'chart' | 'pairs' | 'quiz'
    this.activeFilter = 'all'; // 'all' | 'monophthong' | 'diphthong' | 'unvoiced' | 'voiced'
    this.searchQuery = '';
    this.activeSound = null;
    this.isRecordingPractice = false;
    this.recognition = null;

    // Quiz State
    this.quizIndex = 0;
    this.quizScore = 0;
    this.quizAnswered = false;
    this.currentQuizQuestions = [];

    // All 44 sounds cache
    this.allSounds = [];
  }

  init() {
    if (!window.IPA_DATA) {
      console.warn('IPA_DATA is not loaded yet');
      return;
    }

    // Flatten all 44 sounds for easy search
    this.allSounds = [
      ...(window.IPA_DATA.vowels || []),
      ...(window.IPA_DATA.consonants || [])
    ];

    this._bindElements();
    this._initEvents();
    this.renderChart();
    this.renderMinimalPairs();
    this.initQuiz();
  }

  _bindElements() {
    this.viewContainer = document.getElementById('view-ipa');
    this.tabBtns = document.querySelectorAll('.ipa-tab-btn');
    this.subPanels = {
      chart: document.getElementById('ipa-panel-chart'),
      pairs: document.getElementById('ipa-panel-pairs'),
      quiz: document.getElementById('ipa-panel-quiz')
    };

    // Filter pills & search
    this.filterPills = document.querySelectorAll('.ipa-filter-pill');
    this.searchInput = document.getElementById('ipa-search-input');
    this.clearSearchBtn = document.getElementById('ipa-clear-search');

    // Chart containers
    this.gridMonophthongs = document.getElementById('ipa-grid-monophthongs');
    this.gridDiphthongs = document.getElementById('ipa-grid-diphthongs');
    this.gridUnvoiced = document.getElementById('ipa-grid-unvoiced');
    this.gridVoiced = document.getElementById('ipa-grid-voiced');

    // Sections to hide when filtered
    this.sectionMonophthongs = document.getElementById('ipa-sec-monophthongs');
    this.sectionDiphthongs = document.getElementById('ipa-sec-diphthongs');
    this.sectionUnvoiced = document.getElementById('ipa-sec-unvoiced');
    this.sectionVoiced = document.getElementById('ipa-sec-voiced');

    // Drawer elements
    this.drawerOverlay = document.getElementById('ipa-sound-drawer');
    this.drawerCloseBtn = document.getElementById('ipa-drawer-close');
    this.drawerSymbol = document.getElementById('ipa-drawer-symbol');
    this.drawerName = document.getElementById('ipa-drawer-name');
    this.drawerTags = document.getElementById('ipa-drawer-tags');
    this.drawerAudioNormal = document.getElementById('ipa-drawer-audio-normal');
    this.drawerAudioSlow = document.getElementById('ipa-drawer-audio-slow');
    this.mouthLips = document.getElementById('ipa-mouth-lips');
    this.mouthTongue = document.getElementById('ipa-mouth-tongue');
    this.mouthJaw = document.getElementById('ipa-mouth-jaw');
    this.tipsVi = document.getElementById('ipa-tips-vi');
    this.examplesList = document.getElementById('ipa-examples-list');

    // Mic practice
    this.micSelectWord = document.getElementById('ipa-mic-word-select');
    this.micBtn = document.getElementById('ipa-mic-start-btn');
    this.micFeedback = document.getElementById('ipa-mic-feedback');

    // Minimal Pairs
    this.pairsContainer = document.getElementById('ipa-pairs-list');

    // Quiz elements
    this.quizContainer = document.getElementById('ipa-quiz-card-content');
  }

  _initEvents() {
    // Sub-navigation tabs
    this.tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetTab = btn.dataset.subtab;
        this.switchSubTab(targetTab);
      });
    });

    // Chart Category Filter Pills
    this.filterPills.forEach(pill => {
      pill.addEventListener('click', () => {
        this.filterPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        this.activeFilter = pill.dataset.filter;
        this.renderChart();
      });
    });

    // Search Input
    if (this.searchInput) {
      this.searchInput.addEventListener('input', (e) => {
        this.searchQuery = e.target.value.trim().toLowerCase();
        if (this.clearSearchBtn) {
          this.clearSearchBtn.style.display = this.searchQuery ? 'block' : 'none';
        }
        this.renderChart();
      });
    }

    if (this.clearSearchBtn) {
      this.clearSearchBtn.addEventListener('click', () => {
        this.searchInput.value = '';
        this.searchQuery = '';
        this.clearSearchBtn.style.display = 'none';
        this.renderChart();
      });
    }

    // Sound Detail Drawer Close
    if (this.drawerCloseBtn) {
      this.drawerCloseBtn.addEventListener('click', () => this.closeDetail());
    }
    if (this.drawerOverlay) {
      this.drawerOverlay.addEventListener('click', (e) => {
        if (e.target === this.drawerOverlay) this.closeDetail();
      });
    }

    // ESC to close drawer
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.drawerOverlay && this.drawerOverlay.classList.contains('active')) {
        this.closeDetail();
      }
    });

    // Drawer Audio Buttons
    if (this.drawerAudioNormal) {
      this.drawerAudioNormal.addEventListener('click', () => {
        if (!this.activeSound) return;
        const word = this.activeSound.examples && this.activeSound.examples[0] ? this.activeSound.examples[0].word : '';
        this.playAudioText(word || this.activeSound.symbol, 1.0);
      });
    }
    if (this.drawerAudioSlow) {
      this.drawerAudioSlow.addEventListener('click', () => {
        if (!this.activeSound) return;
        const word = this.activeSound.examples && this.activeSound.examples[0] ? this.activeSound.examples[0].word : '';
        this.playAudioText(word || this.activeSound.symbol, 0.7);
      });
    }

    // Mic Practice
    if (this.micBtn) {
      this.micBtn.addEventListener('click', () => {
        this.toggleMicPractice();
      });
    }
  }

  switchSubTab(subTab) {
    this.activeSubTab = subTab;
    this.tabBtns.forEach(b => {
      b.classList.toggle('active', b.dataset.subtab === subTab);
    });

    Object.keys(this.subPanels).forEach(key => {
      if (this.subPanels[key]) {
        this.subPanels[key].style.display = (key === subTab) ? 'block' : 'none';
      }
    });

    if (subTab === 'quiz' && this.quizIndex === 0 && !this.quizAnswered) {
      this.initQuiz();
    }
  }

  // =========================================================================
  // 1. RENDER IPA CHART
  // =========================================================================
  renderChart() {
    if (!window.IPA_DATA) return;

    const query = this.searchQuery;
    const filter = this.activeFilter;

    // Filter predicate
    const matches = (sound) => {
      if (!sound) return false;
      // Filter category
      if (filter !== 'all') {
        if (filter === 'monophthong' && sound.group !== 'monophthong') return false;
        if (filter === 'diphthong' && sound.group !== 'diphthong') return false;
        if (filter === 'unvoiced' && sound.group !== 'unvoiced') return false;
        if (filter === 'voiced' && sound.group !== 'voiced') return false;
      }
      // Filter search
      if (query) {
        const symbolMatch = sound.symbol.toLowerCase().includes(query);
        const nameMatch = sound.name.toLowerCase().includes(query);
        const exampleMatch = (sound.examples || []).some(ex =>
          ex.word.toLowerCase().includes(query) ||
          ex.vi.toLowerCase().includes(query) ||
          ex.ipa.toLowerCase().includes(query)
        );
        return symbolMatch || nameMatch || exampleMatch;
      }
      return true;
    };

    const vowels = window.IPA_DATA.vowels || [];
    const consonants = window.IPA_DATA.consonants || [];

    const monophthongs = vowels.filter(v => v.group === 'monophthong' && matches(v));
    const diphthongs = vowels.filter(v => v.group === 'diphthong' && matches(v));
    const unvoiced = consonants.filter(c => c.group === 'unvoiced' && matches(c));
    const voiced = consonants.filter(c => c.group === 'voiced' && matches(c));

    // Render each grid
    this._renderGrid(this.gridMonophthongs, monophthongs, 'cat-monophthong');
    this._renderGrid(this.gridDiphthongs, diphthongs, 'cat-diphthong');
    this._renderGrid(this.gridUnvoiced, unvoiced, 'cat-unvoiced');
    this._renderGrid(this.gridVoiced, voiced, 'cat-voiced');

    // Show/hide sections based on count
    if (this.sectionMonophthongs) this.sectionMonophthongs.style.display = monophthongs.length > 0 ? 'block' : 'none';
    if (this.sectionDiphthongs) this.sectionDiphthongs.style.display = diphthongs.length > 0 ? 'block' : 'none';
    if (this.sectionUnvoiced) this.sectionUnvoiced.style.display = unvoiced.length > 0 ? 'block' : 'none';
    if (this.sectionVoiced) this.sectionVoiced.style.display = voiced.length > 0 ? 'block' : 'none';

    // Update counter labels
    const countMonophthongEl = document.getElementById('count-monophthongs');
    const countDiphthongEl = document.getElementById('count-diphthongs');
    const countUnvoicedEl = document.getElementById('count-unvoiced');
    const countVoicedEl = document.getElementById('count-voiced');
    if (countMonophthongEl) countMonophthongEl.textContent = `${monophthongs.length} âm`;
    if (countDiphthongEl) countDiphthongEl.textContent = `${diphthongs.length} âm`;
    if (countUnvoicedEl) countUnvoicedEl.textContent = `${unvoiced.length} âm`;
    if (countVoicedEl) countVoicedEl.textContent = `${voiced.length} âm`;
  }

  _renderGrid(container, sounds, categoryClass) {
    if (!container) return;
    container.innerHTML = '';

    sounds.forEach(sound => {
      const card = document.createElement('div');
      card.className = `ipa-card ${categoryClass}`;
      card.dataset.soundId = sound.id;

      // Tag styling
      let tagClass = 'ipa-tag';
      if (sound.type === 'vowel_long') tagClass += ' vowel-long';
      else if (sound.type === 'vowel_short') tagClass += ' vowel-short';
      else if (sound.group === 'diphthong') tagClass += ' diphthong';
      else if (sound.group === 'unvoiced') tagClass += ' unvoiced';
      else if (sound.group === 'voiced') tagClass += ' voiced';

      const firstEx = (sound.examples && sound.examples[0]) || { word: '', ipa: '', vi: '', highlight: '' };
      const highlightedWord = this._formatHighlight(firstEx.word, firstEx.highlight);

      card.innerHTML = `
        <div class="ipa-card-top">
          <span class="${tagClass}">${sound.typeLabel || 'Âm IPA'}</span>
          <button class="ipa-audio-trigger" title="Nghe phát âm">🔊</button>
        </div>
        <div class="ipa-symbol-display">/${sound.symbol}/</div>
        <div class="ipa-sound-name">${sound.name}</div>
        <div class="ipa-example-preview">
          <span class="ipa-example-word">${highlightedWord}</span>
          <span class="ipa-example-vi">${firstEx.vi}</span>
        </div>
      `;

      // Click card to open drawer
      card.addEventListener('click', (e) => {
        // If clicking the audio trigger, just play
        if (e.target.closest('.ipa-audio-trigger')) {
          e.stopPropagation();
          this.playCardAudio(sound, card);
        } else {
          this.openSoundDetail(sound.id);
        }
      });

      container.appendChild(card);
    });
  }

  _formatHighlight(word, highlight) {
    if (!word) return '';
    if (!highlight) return word;
    const regex = new RegExp(`(${highlight})`, 'i');
    return word.replace(regex, '<mark>$1</mark>');
  }

  playCardAudio(sound, cardEl) {
    if (!sound) return;
    const word = sound.examples && sound.examples[0] ? sound.examples[0].word : '';
    const textToSpeak = word || sound.symbol;

    if (cardEl) {
      cardEl.classList.add('is-playing');
    }

    this.playAudioText(textToSpeak, 1.0, () => {
      if (cardEl) cardEl.classList.remove('is-playing');
    });
  }

  playAudioText(text, rate = 1.0, onEnd = null) {
    if (!window.audioCtrl) return;
    const oldRate = window.audioCtrl.rate;
    window.audioCtrl.rate = rate;
    window.audioCtrl.speak(text, () => {
      window.audioCtrl.rate = oldRate;
      if (typeof onEnd === 'function') onEnd();
    });
  }

  // =========================================================================
  // 2. SOUND DETAIL DRAWER / MODAL
  // =========================================================================
  openSoundDetail(soundId) {
    const sound = this.allSounds.find(s => s.id === soundId);
    if (!sound) return;

    this.activeSound = sound;

    // Header info
    if (this.drawerSymbol) this.drawerSymbol.textContent = `/${sound.symbol}/`;
    if (this.drawerName) this.drawerName.textContent = sound.name;

    if (this.drawerTags) {
      this.drawerTags.innerHTML = `
        <span class="ipa-badge-pill vowels">${sound.typeLabel || 'Phát âm'}</span>
        ${sound.duration ? `<span class="ipa-badge-pill">⏱️ ${sound.duration}</span>` : ''}
        <span class="ipa-badge-pill">${sound.vocalCords || 'Thanh quản'}</span>
      `;
    }

    // 3-step mouth guide
    const guide = sound.mouthGuide || {};
    if (this.mouthLips) this.mouthLips.textContent = guide.lips || 'Môi tự nhiên, không gò bó.';
    if (this.mouthTongue) this.mouthTongue.textContent = guide.tongue || 'Lưỡi đặt đúng vị trí khoang miệng.';
    if (this.mouthJaw) this.mouthJaw.textContent = guide.jaw || guide.action || 'Hàm mở tự nhiên theo âm.';

    // Vietnamese learner tips
    if (this.tipsVi) this.tipsVi.textContent = sound.tipsVi || 'Hãy luyện tập thường xuyên để quen khẩu hình.';

    // Example words
    if (this.examplesList) {
      this.examplesList.innerHTML = '';
      (sound.examples || []).forEach(ex => {
        const item = document.createElement('div');
        item.className = 'ipa-example-item';
        item.innerHTML = `
          <div class="ipa-example-text">
            <div class="word">${this._formatHighlight(ex.word, ex.highlight)}</div>
            <div class="meta">${ex.ipa} • ${ex.vi}</div>
          </div>
          <div class="ipa-example-actions">
            <button class="ipa-play-word-btn" title="Nghe từ này">🔊</button>
          </div>
        `;

        const playBtn = item.querySelector('.ipa-play-word-btn');
        playBtn.addEventListener('click', () => {
          this.playAudioText(ex.word, 1.0);
        });

        this.examplesList.appendChild(item);
      });
    }

    // Populate mic practice options
    if (this.micSelectWord) {
      this.micSelectWord.innerHTML = '';
      (sound.examples || []).forEach(ex => {
        const opt = document.createElement('option');
        opt.value = ex.word;
        opt.textContent = `${ex.word} (${ex.ipa} - ${ex.vi})`;
        this.micSelectWord.appendChild(opt);
      });
    }

    // Reset mic feedback
    if (this.micFeedback) {
      this.micFeedback.className = 'ipa-mic-result-feedback';
      this.micFeedback.style.display = 'none';
      this.micFeedback.textContent = '';
    }

    // Open drawer
    if (this.drawerOverlay) {
      this.drawerOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  closeDetail() {
    if (this.drawerOverlay) {
      this.drawerOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }
    this.stopMicPractice();
    this.activeSound = null;
  }

  // =========================================================================
  // 3. MIC PRONUNCIATION PRACTICE
  // =========================================================================
  toggleMicPractice() {
    if (this.isRecordingPractice) {
      this.stopMicPractice();
    } else {
      this.startMicPractice();
    }
  }

  startMicPractice() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Trình duyệt của bạn chưa hỗ trợ nhận diện giọng nói (Web Speech API). Hãy dùng Google Chrome hoặc Microsoft Edge.');
      return;
    }

    const targetWord = (this.micSelectWord ? this.micSelectWord.value : '').trim().toLowerCase();
    if (!targetWord) return;

    try {
      this.recognition = new SpeechRecognition();
      this.recognition.lang = 'en-US';
      this.recognition.continuous = false;
      this.recognition.interimResults = false;

      this.isRecordingPractice = true;
      if (this.micBtn) {
        this.micBtn.classList.add('recording');
        this.micBtn.innerHTML = '🛑 Đang lắng nghe... Hãy nói to rõ!';
      }

      if (this.micFeedback) {
        this.micFeedback.style.display = 'block';
        this.micFeedback.className = 'ipa-mic-result-feedback';
        this.micFeedback.textContent = `🎙️ Hãy phát âm từ "${targetWord}" vào micro...`;
      }

      this.recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript.trim().toLowerCase();
        this.evaluatePronunciation(transcript, targetWord);
      };

      this.recognition.onerror = (e) => {
        console.warn('Speech recognition error:', e);
        if (this.micFeedback) {
          this.micFeedback.className = 'ipa-mic-result-feedback retry';
          this.micFeedback.textContent = '⚠️ Không nhận diện được âm thanh. Vui lòng kiểm tra quyền Micro và thử lại!';
        }
        this.stopMicPractice();
      };

      this.recognition.onend = () => {
        this.stopMicPractice();
      };

      this.recognition.start();
    } catch (err) {
      console.error(err);
      this.stopMicPractice();
    }
  }

  stopMicPractice() {
    if (this.recognition) {
      try { this.recognition.stop(); } catch (e) {}
      this.recognition = null;
    }
    this.isRecordingPractice = false;
    if (this.micBtn) {
      this.micBtn.classList.remove('recording');
      this.micBtn.innerHTML = '🎙️ Luyện phát âm qua Mic';
    }
  }

  evaluatePronunciation(transcript, targetWord) {
    if (!this.micFeedback) return;

    // Clean punctuation
    const cleanSpoken = transcript.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "").trim();
    const isMatch = cleanSpoken.includes(targetWord) || targetWord.includes(cleanSpoken);

    if (isMatch) {
      this.micFeedback.className = 'ipa-mic-result-feedback success';
      this.micFeedback.innerHTML = `🎉 <strong>Chính xác tuyệt vời!</strong> Bạn vừa nói: "<em>${cleanSpoken}</em>" (+3 XP).`;

      // Award XP
      if (window.storage && typeof window.storage.addXP === 'function') {
        window.storage.addXP(3);
        if (window.app && typeof window.app.updateHeaderStats === 'function') {
          window.app.updateHeaderStats();
        }
      }
      if (window.audioCtrl && typeof window.audioCtrl.playSuccessSound === 'function') {
        window.audioCtrl.playSuccessSound();
      }
    } else {
      this.micFeedback.className = 'ipa-mic-result-feedback retry';
      this.micFeedback.innerHTML = `💡 AI nhận diện được: "<em>${cleanSpoken}</em>" (Từ mục tiêu: <strong>${targetWord}</strong>). Bạn hãy nghe lại âm mẫu và thử lại nhé!`;
    }
  }

  // =========================================================================
  // 4. MINIMAL PAIRS TRAINER (Cặp âm dễ nhầm lẫn)
  // =========================================================================
  renderMinimalPairs() {
    if (!this.pairsContainer || !window.IPA_DATA || !window.IPA_DATA.minimalPairs) return;

    this.pairsContainer.innerHTML = '';

    window.IPA_DATA.minimalPairs.forEach(pair => {
      const card = document.createElement('div');
      card.className = 'ipa-pair-card';

      const wordsHtml = (pair.pairs || []).map(p => `
        <div class="ipa-pair-word-row">
          <div class="ipa-pair-col">
            <div class="ipa-pair-word-info">
              <span class="w">${p.wordA}</span>
              <span class="p">${p.ipaA}</span>
              <span class="m">${p.viA}</span>
            </div>
            <button class="ipa-play-word-btn" data-word="${p.wordA}" title="Nghe âm A">🔊</button>
          </div>

          <button class="ipa-pair-compare-btn" data-worda="${p.wordA}" data-wordb="${p.wordB}" title="Nghe liên tiếp so sánh">
            ⚡ A ➔ B
          </button>

          <div class="ipa-pair-col">
            <div class="ipa-pair-word-info">
              <span class="w">${p.wordB}</span>
              <span class="p">${p.ipaB}</span>
              <span class="m">${p.viB}</span>
            </div>
            <button class="ipa-play-word-btn" data-word="${p.wordB}" title="Nghe âm B">🔊</button>
          </div>
        </div>
      `).join('');

      card.innerHTML = `
        <div class="ipa-pair-header">
          <div class="ipa-pair-duel">
            <div class="ipa-pair-badge sound-a">/${pair.soundA}/</div>
            <div class="ipa-pair-vs">VS</div>
            <div class="ipa-pair-badge sound-b">/${pair.soundB}/</div>
          </div>
          <span class="ipa-badge-pill vowels">${pair.title}</span>
        </div>
        <p class="ipa-pair-desc">💡 ${pair.desc}</p>
        <div class="ipa-pair-words-grid">
          ${wordsHtml}
        </div>
      `;

      // Event listeners for word audio buttons
      card.querySelectorAll('.ipa-play-word-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const word = btn.dataset.word;
          this.playAudioText(word, 1.0);
        });
      });

      // Compare A -> B sequential playback
      card.querySelectorAll('.ipa-pair-compare-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const wordA = btn.dataset.worda;
          const wordB = btn.dataset.wordb;
          this.playConsecutiveWords(wordA, wordB, btn);
        });
      });

      this.pairsContainer.appendChild(card);
    });
  }

  playConsecutiveWords(wordA, wordB, btnEl) {
    if (!window.audioCtrl) return;
    if (btnEl) btnEl.style.opacity = '0.6';

    window.audioCtrl.speak(wordA, () => {
      setTimeout(() => {
        window.audioCtrl.speak(wordB, () => {
          if (btnEl) btnEl.style.opacity = '1';
        });
      }, 500);
    });
  }

  // =========================================================================
  // 5. EAR-TRAINING QUIZ GAME (Luyện tai nghe)
  // =========================================================================
  initQuiz() {
    if (!window.IPA_DATA || !window.IPA_DATA.quizBank) return;

    // Shuffle questions
    this.currentQuizQuestions = [...window.IPA_DATA.quizBank].sort(() => Math.random() - 0.5);
    this.quizIndex = 0;
    this.quizScore = 0;
    this.quizAnswered = false;

    this.renderQuizQuestion();
  }

  renderQuizQuestion() {
    if (!this.quizContainer) return;

    if (this.quizIndex >= this.currentQuizQuestions.length) {
      this.renderQuizComplete();
      return;
    }

    const q = this.currentQuizQuestions[this.quizIndex];
    this.quizAnswered = false;

    const optionsHtml = q.options.map(opt => `
      <button class="ipa-quiz-option-btn" data-opt="${opt}">/${opt}/</button>
    `).join('');

    this.quizContainer.innerHTML = `
      <div class="ipa-quiz-header">
        <span class="ipa-quiz-progress-text">Câu hỏi ${this.quizIndex + 1} / ${this.currentQuizQuestions.length}</span>
        <span class="ipa-quiz-score-badge">Điểm: ${this.quizScore}</span>
      </div>

      <button class="ipa-quiz-audio-circle" id="ipa-quiz-audio-btn" title="Bấm để nghe âm thanh">
        🔊
      </button>

      <div class="ipa-quiz-prompt">${q.question}</div>

      <div class="ipa-quiz-options-grid">
        ${optionsHtml}
      </div>

      <div class="ipa-quiz-feedback-box" id="ipa-quiz-feedback"></div>

      <div style="display: none; margin-top: 16px;" id="ipa-quiz-next-wrap">
        <button class="ipa-quiz-next-btn" id="ipa-quiz-next-btn">
          ${this.quizIndex + 1 === this.currentQuizQuestions.length ? 'Hoàn thành bài kiểm tra 🏆' : 'Câu tiếp theo ➔'}
        </button>
      </div>
    `;

    // Listen button
    const audioBtn = this.quizContainer.querySelector('#ipa-quiz-audio-btn');
    if (audioBtn) {
      audioBtn.addEventListener('click', () => {
        this.playAudioText(q.audioWord, 0.9);
      });
      // Only auto play audio if user is actively on IPA tab
      const isIpaActive = window.app && window.app.currentTab === 'ipa';
      if (isIpaActive) {
        setTimeout(() => {
          if (window.app && window.app.currentTab === 'ipa') {
            this.playAudioText(q.audioWord, 0.9);
          }
        }, 300);
      }
    }

    // Option buttons
    const optionBtns = this.quizContainer.querySelectorAll('.ipa-quiz-option-btn');
    optionBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        this.handleQuizAnswer(btn.dataset.opt, q, optionBtns);
      });
    });

    // Next button
    const nextBtn = this.quizContainer.querySelector('#ipa-quiz-next-btn');
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        this.quizIndex++;
        this.renderQuizQuestion();
      });
    }
  }

  handleQuizAnswer(chosenIpa, question, allBtns) {
    if (this.quizAnswered) return;
    this.quizAnswered = true;

    // Disable all buttons
    allBtns.forEach(b => {
      b.disabled = true;
      if (b.dataset.opt === question.correctIpa) {
        b.classList.add('correct');
      } else if (b.dataset.opt === chosenIpa) {
        b.classList.add('wrong');
      }
    });

    const fb = this.quizContainer.querySelector('#ipa-quiz-feedback');
    const nextWrap = this.quizContainer.querySelector('#ipa-quiz-next-wrap');

    const isCorrect = chosenIpa === question.correctIpa;

    if (isCorrect) {
      this.quizScore++;
      const scoreBadge = this.quizContainer.querySelector('.ipa-quiz-score-badge');
      if (scoreBadge) scoreBadge.textContent = `Điểm: ${this.quizScore}`;

      if (fb) {
        fb.className = 'ipa-quiz-feedback-box active correct-fb';
        fb.innerHTML = `<strong>Chính xác! 🎉</strong> ${question.explanation}`;
      }
      if (window.audioCtrl && typeof window.audioCtrl.playSuccessSound === 'function') {
        window.audioCtrl.playSuccessSound();
      }
    } else {
      if (fb) {
        fb.className = 'ipa-quiz-feedback-box active wrong-fb';
        fb.innerHTML = `<strong>Chưa đúng!</strong> Đáp án đúng là <strong>/${question.correctIpa}/</strong>.<br>${question.explanation}`;
      }
    }

    if (nextWrap) {
      nextWrap.style.display = 'block';
    }
  }

  renderQuizComplete() {
    const total = this.currentQuizQuestions.length;
    const earnedXp = Math.max(10, this.quizScore * 2);

    // Award completion XP
    if (window.storage && typeof window.storage.addXP === 'function') {
      window.storage.addXP(earnedXp);
      if (window.app && typeof window.app.updateHeaderStats === 'function') {
        window.app.updateHeaderStats();
      }
    }

    this.quizContainer.innerHTML = `
      <div class="ipa-quiz-completed-box">
        <div class="ipa-quiz-completed-icon">🏆</div>
        <h3 style="font-size: 24px; color: #ffffff; font-weight: 800;">Hoàn Thành Luyện Tai Nghe!</h3>
        <p style="color: var(--text-secondary); font-size: 15px;">
          Bạn đã đạt <strong>${this.quizScore} / ${total}</strong> điểm chính xác.
        </p>
        <div class="ipa-quiz-reward-xp">
          ⚡ +${earnedXp} XP Thưởng Luyện Nghe
        </div>
        <button class="ipa-quiz-next-btn" id="ipa-quiz-retry-btn" style="margin-top: 14px;">
          🔄 Luyện tập lại với câu hỏi mới
        </button>
      </div>
    `;

    const retryBtn = this.quizContainer.querySelector('#ipa-quiz-retry-btn');
    if (retryBtn) {
      retryBtn.addEventListener('click', () => {
        this.initQuiz();
      });
    }
  }

  onEnterTab() {
    // Re-render chart in case filters or theme changed
    this.renderChart();
  }

  onLeaveTab() {
    this.closeDetail();
    this.stopMicPractice();
    if (window.audioCtrl && typeof window.audioCtrl.stop === 'function') {
      window.audioCtrl.stop();
    }
  }
}

// Global instance
window.ipaView = new IpaViewController();
