/**
 * EngMaster Real-Life Bilingual Dialogue Player & Comprehension Test View
 * 12 Authentic Real-Life Scenarios with 2-Character Dialogues,
 * Scenario Carousel Showcase, Real-Time Audio Seekbar, Soundwave Visualizer,
 * Live Speaker Avatars, Script Toggles & Comprehensive Test Studio
 */

class ListeningViewController {
  constructor() {
    this.dialogues = window.LISTENING_DIALOGUES || [];
    this.currentDialogueId = 1;
    this.currentTurnIndex = -1;
    this.isPlaying = false;
    this.isPaused = false;
    this.playbackSpeed = 1.0;
    this.showEnglish = true;
    this.showVietnamese = true;
    this.autoScroll = true;

    // Timeline calculation
    this.turnTimings = [];
    this.totalDuration = 0;
    this.currentElapsed = 0;
    this.timerInterval = null;
    this.turnAdvanceTimeout = null;
    this._turnSequenceId = 0;

    // Test states
    this.activeTestMode = 'choose'; // 'choose', 'fill', 'dictation', 'arrange', 'match', 'identify', 'shadowing', 'notetaking'
    this.testModeStates = {}; // dialogueId -> mode -> state
    this.userAnswers = {}; // { [qId]: value }
    this.testSubmitted = false;
    this.arrangeState = {}; // { [qid]: [selected words] }
    this.matchState = { selectedLeft: null, pairs: {} };
    this.shadowingScores = {}; // { [qid]: score }
    this.recognition = null;
    this.isRecordingShadow = false;

    // DOM references
    this.container = null;
    this.topicSelector = null;
    this.carouselTrack = null;
    this.carouselWrapper = null;
    this.dialogueStream = null;
    this.seekbar = null;
    this.currentTimeEl = null;
    this.totalTimeEl = null;
    this.playBtn = null;
    this.audioDeck = null;
    this.liveStatusText = null;
    this.testContainer = null;
  }

  init() {
    this.dialogues = window.LISTENING_DIALOGUES || [];
    this._bindElements();
    this._initEvents();
    this._initSpeechRecognition();
    this._renderCarouselTrack();
    this.selectDialogue(this.currentDialogueId);
  }

  _bindElements() {
    this.container = document.getElementById('view-listening');
    this.topicSelector = document.getElementById('listening-topic-select');
    this.carouselTrack = document.getElementById('scenario-carousel-track');
    this.carouselWrapper = document.getElementById('scenario-carousel-wrapper');
    this.dialogueStream = document.getElementById('dialogue-messages-stream');
    this.seekbar = document.getElementById('listening-seekbar');
    this.currentTimeEl = document.getElementById('listening-current-time');
    this.totalTimeEl = document.getElementById('listening-total-time');
    this.playBtn = document.getElementById('listening-play-btn');
    this.audioDeck = document.getElementById('dialogue-audio-deck');
    this.liveStatusText = document.getElementById('dialogue-live-text');
    this.testContainer = document.getElementById('listening-test-card');
  }

  _initEvents() {
    // Topic select change
    if (this.topicSelector) {
      this.topicSelector.addEventListener('change', (e) => {
        this.selectDialogue(parseInt(e.target.value, 10));
      });
    }

    // Carousel arrows
    const prevBtn = document.getElementById('carousel-prev-btn');
    const nextBtn = document.getElementById('carousel-next-btn');
    if (prevBtn && this.carouselWrapper) {
      prevBtn.addEventListener('click', () => {
        this.carouselWrapper.scrollBy({ left: -260, behavior: 'smooth' });
      });
    }
    if (nextBtn && this.carouselWrapper) {
      nextBtn.addEventListener('click', () => {
        this.carouselWrapper.scrollBy({ left: 260, behavior: 'smooth' });
      });
    }

    // Play / Pause toggle
    if (this.playBtn) {
      this.playBtn.addEventListener('click', () => {
        if (this.isPlaying) {
          this.pause();
        } else {
          this.play();
        }
      });
    }

    // Rewind 5s
    const rewindBtn = document.getElementById('listening-rewind-btn');
    if (rewindBtn) {
      rewindBtn.addEventListener('click', () => this.skipTime(-5));
    }

    // Forward 5s
    const forwardBtn = document.getElementById('listening-forward-btn');
    if (forwardBtn) {
      forwardBtn.addEventListener('click', () => this.skipTime(5));
    }

    // Restart / Replay
    const restartBtn = document.getElementById('listening-restart-btn');
    if (restartBtn) {
      restartBtn.addEventListener('click', () => {
        this.seekTo(0);
        this.play();
      });
    }

    // Seekbar scrubbing
    if (this.seekbar) {
      this.seekbar.addEventListener('input', (e) => {
        const targetSec = parseFloat(e.target.value);
        this.seekTo(targetSec, false);
      });
      this.seekbar.addEventListener('change', (e) => {
        const targetSec = parseFloat(e.target.value);
        this.seekTo(targetSec, true);
      });
    }

    // Speed buttons
    const speedBtns = document.querySelectorAll('.dialogue-speed-btn');
    speedBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        speedBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.setSpeed(parseFloat(btn.dataset.rate));
      });
    });

    // Toggle English script
    const toggleEnBtn = document.getElementById('toggle-en-script-btn');
    if (toggleEnBtn) {
      toggleEnBtn.addEventListener('click', () => {
        this.showEnglish = !this.showEnglish;
        toggleEnBtn.classList.toggle('off', !this.showEnglish);
        toggleEnBtn.innerHTML = this.showEnglish
          ? `👁️ <span class="btn-text">Script tiếng Anh: <strong>BẬT</strong></span>`
          : `🕶️ <span class="btn-text">Script tiếng Anh: <strong>ẨN (Nghe Mù)</strong></span>`;
        if (this.dialogueStream) {
          this.dialogueStream.classList.toggle('hide-en-script', !this.showEnglish);
        }
      });
    }

    // Toggle Vietnamese translation
    const toggleViBtn = document.getElementById('toggle-vi-sub-btn');
    if (toggleViBtn) {
      toggleViBtn.addEventListener('click', () => {
        this.showVietnamese = !this.showVietnamese;
        toggleViBtn.classList.toggle('off', !this.showVietnamese);
        toggleViBtn.innerHTML = this.showVietnamese
          ? `🌐 <span class="btn-text">Phụ đề tiếng Việt: <strong>BẬT</strong></span>`
          : `🔒 <span class="btn-text">Phụ đề tiếng Việt: <strong>ẨN</strong></span>`;
        if (this.dialogueStream) {
          this.dialogueStream.classList.toggle('hide-vi-sub', !this.showVietnamese);
        }
      });
    }

    // Toggle Auto-Scroll
    const toggleScrollBtn = document.getElementById('toggle-autoscroll-btn');
    if (toggleScrollBtn) {
      toggleScrollBtn.addEventListener('click', () => {
        this.autoScroll = !this.autoScroll;
        toggleScrollBtn.classList.toggle('off', !this.autoScroll);
        toggleScrollBtn.innerHTML = this.autoScroll
          ? `📜 <span class="btn-text">Tự cuộn câu: <strong>BẬT</strong></span>`
          : `⏸ <span class="btn-text">Tự cuộn câu: <strong>TẮT</strong></span>`;
      });
    }
  }

  _renderCarouselTrack() {
    if (!this.carouselTrack) return;

    this.carouselTrack.innerHTML = this.dialogues.map((d, index) => {
      const isActive = d.id === this.currentDialogueId;
      return `
        <div class="carousel-card ${isActive ? 'active' : ''}" data-id="${d.id}" id="carousel-card-${d.id}">
          <div class="card-icon-halo">
            <span class="card-emoji">${d.icon}</span>
          </div>
          <div class="card-content">
            <div class="card-badge-row">
              <span class="card-num-badge">#${index + 1}</span>
              <span class="card-level-badge">${d.level}</span>
            </div>
            <h4 class="card-title">${this._escapeHtml(d.title)}</h4>
            <span class="card-en-title">${this._escapeHtml(d.title_en)}</span>
            <div class="card-footer-info">
              <span>💬 ${d.turns.length} câu thoại</span>
              <span>📝 ${d.test ? d.test.length : 0} câu test</span>
            </div>
          </div>
          <div class="card-active-glow"></div>
        </div>
      `;
    }).join('');

    // Attach click listeners to cards
    const cards = this.carouselTrack.querySelectorAll('.carousel-card');
    cards.forEach(card => {
      card.addEventListener('click', () => {
        const id = parseInt(card.dataset.id, 10);
        this.selectDialogue(id);
      });
    });
  }

  _syncCarouselActiveState(dialogueId) {
    if (!this.carouselTrack) return;
    const cards = this.carouselTrack.querySelectorAll('.carousel-card');
    cards.forEach(card => {
      const isMatch = parseInt(card.dataset.id, 10) === dialogueId;
      card.classList.toggle('active', isMatch);
      if (isMatch && this.carouselWrapper) {
        card.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      }
    });

    const counter = document.getElementById('carousel-active-counter');
    if (counter) {
      counter.textContent = `Kịch bản ${dialogueId} / ${this.dialogues.length}`;
    }
  }

  getCurrentDialogue() {
    return this.dialogues.find(d => d.id === this.currentDialogueId) || this.dialogues[0];
  }

  selectDialogue(dialogueId) {
    if (this.turnAdvanceTimeout) {
      clearTimeout(this.turnAdvanceTimeout);
      this.turnAdvanceTimeout = null;
    }
    this._turnSequenceId++;
    this.stopAudio();
    this.currentDialogueId = dialogueId;
    this.currentTurnIndex = -1;
    this.currentElapsed = 0;
    this.userAnswers = {};
    this.testSubmitted = false;

    const dialogue = this.getCurrentDialogue();
    if (!dialogue) return;

    if (this.topicSelector && this.topicSelector.value !== String(dialogueId)) {
      this.topicSelector.value = dialogueId;
    }

    this._syncCarouselActiveState(dialogueId);
    this._calculateTimeline(dialogue);
    this._renderDialogueHeader(dialogue);
    this._renderDialogueStream(dialogue);
    this._renderTestPanel(dialogue);
    this._updateTimeDisplay();
    this._updatePlayButtonState(false);
  }

  _calculateTimeline(dialogue) {
    this.turnTimings = [];
    let cumulative = 0;
    dialogue.turns.forEach((turn, idx) => {
      const words = turn.text.trim().split(/\s+/).filter(Boolean).length;
      // Speech rate ~120 wpm adjusted by speed
      const baseSeconds = (words / (120 * this.playbackSpeed)) * 60;
      // Punctuation pauses (period, comma, question, exclamation)
      const punctuationPauses = (turn.text.match(/[,;]/g) || []).length * 0.35 +
                                (turn.text.match(/[.!?]/g) || []).length * 0.55;
      const duration = Math.max(3.0, baseSeconds + punctuationPauses) + 0.6; // 0.6s inter-turn pause
      const start = cumulative;
      const end = cumulative + duration;
      this.turnTimings.push({
        index: idx,
        id: turn.id,
        start,
        end,
        duration
      });
      cumulative = end;
    });
    this.totalDuration = cumulative;
    if (this.seekbar) {
      this.seekbar.max = this.totalDuration;
      this.seekbar.value = this.currentElapsed;
    }
  }

  _renderDialogueHeader(dialogue) {
    const titleEl = document.getElementById('listening-active-title');
    const badgeEl = document.getElementById('listening-active-category');
    const levelEl = document.getElementById('listening-active-level');
    const turnsEl = document.getElementById('listening-active-turns-count');
    const summaryEl = document.getElementById('listening-active-summary');
    const charactersEl = document.getElementById('listening-active-characters');

    if (titleEl) {
      titleEl.innerHTML = `${dialogue.icon} ${dialogue.title} <span class="dialogue-en-title">(${dialogue.title_en})</span>`;
    }
    if (badgeEl) badgeEl.textContent = dialogue.category;
    if (levelEl) levelEl.textContent = `Trình độ: ${dialogue.level}`;
    if (turnsEl) turnsEl.textContent = `${dialogue.turns.length} Lượt đối thoại`;
    if (summaryEl) summaryEl.textContent = dialogue.summary;

    if (charactersEl) {
      charactersEl.innerHTML = `
        <div class="character-pill spk-a" id="char-badge-A">
          <div class="char-avatar-box">
            <span class="char-avatar">${dialogue.speakerA.avatar}</span>
            <span class="char-wave-ring"></span>
          </div>
          <div class="char-meta">
            <div class="char-name-row">
              <strong class="char-name">${dialogue.speakerA.name}</strong>
              <span class="char-status-tag" id="status-tag-A">Sẵn sàng</span>
            </div>
            <span class="char-role">${dialogue.speakerA.role}</span>
          </div>
        </div>
        <div class="character-pill spk-b" id="char-badge-B">
          <div class="char-avatar-box">
            <span class="char-avatar">${dialogue.speakerB.avatar}</span>
            <span class="char-wave-ring"></span>
          </div>
          <div class="char-meta">
            <div class="char-name-row">
              <strong class="char-name">${dialogue.speakerB.name}</strong>
              <span class="char-status-tag" id="status-tag-B">Sẵn sàng</span>
            </div>
            <span class="char-role">${dialogue.speakerB.role}</span>
          </div>
        </div>
      `;
    }
  }

  _renderDialogueStream(dialogue) {
    if (!this.dialogueStream) return;

    this.dialogueStream.innerHTML = dialogue.turns.map((turn, idx) => {
      const isA = turn.speaker === 'A';
      const speakerInfo = isA ? dialogue.speakerA : dialogue.speakerB;
      const alignment = isA ? 'turn-left' : 'turn-right';

      return `
        <div class="dialogue-turn ${alignment}" id="dialogue-turn-${idx}" data-turn-index="${idx}">
          <div class="turn-avatar-badge" title="${speakerInfo.name}">
            <span class="avatar-icon">${speakerInfo.avatar}</span>
          </div>
          <div class="turn-bubble">
            <div class="turn-header">
              <span class="speaker-name">${speakerInfo.name}</span>
              <span class="speaker-role-tag">${speakerInfo.role.split('(')[0].trim()}</span>
              <span class="turn-live-eq" id="turn-eq-${idx}">
                <span class="b1"></span><span class="b2"></span><span class="b3"></span>
              </span>
              <button class="turn-audio-btn" data-turn-index="${idx}" title="Nghe riêng câu này">
                🔊 Nghe lại
              </button>
            </div>
            <div class="turn-en-text" id="turn-text-${idx}">
              ${this._escapeHtml(turn.text)}
            </div>
            <div class="turn-vi-text">
              ${this._escapeHtml(turn.vi)}
            </div>
            <div class="blind-reveal-hint">
              <span>👁️ Rê chuột hoặc chạm vào để mở xem lời thoại</span>
            </div>
          </div>
        </div>
      `;
    }).join('');

    // Attach individual line click listeners
    const turnBubbles = this.dialogueStream.querySelectorAll('.dialogue-turn');
    turnBubbles.forEach(b => {
      b.addEventListener('click', (e) => {
        if (e.target.closest('.turn-audio-btn')) return;
        const turnIdx = parseInt(b.dataset.turnIndex, 10);
        this.seekToTurn(turnIdx);
      });
    });

    const turnAudioBtns = this.dialogueStream.querySelectorAll('.turn-audio-btn');
    turnAudioBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const turnIdx = parseInt(btn.dataset.turnIndex, 10);
        this.playSingleTurn(turnIdx);
      });
    });
  }

  _initSpeechRecognition() {
    const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRec) {
      try {
        this.recognition = new SpeechRec();
        this.recognition.continuous = false;
        this.recognition.interimResults = false;
        this.recognition.lang = 'en-US';
      } catch (e) {
        this.recognition = null;
      }
    }
  }

  _getDialogueTestData(dialogueId) {
    if (window.LISTENING_TESTS_DATA && window.LISTENING_TESTS_DATA[dialogueId]) {
      return window.LISTENING_TESTS_DATA[dialogueId];
    }
    // Fallback if data not loaded yet
    const d = this.getCurrentDialogue();
    return {
      choose: d ? (d.test || []).filter(q => q.type === 'mcq') : [],
      fill: d ? (d.test || []).filter(q => q.type === 'blank') : [],
      dictation: [],
      arrange: [],
      match: [],
      identify: d ? (d.test || []).filter(q => q.type === 'tf') : [],
      shadowing: [],
      noteTaking: { missionTitle: 'Ghi chú hội thoại', missionPrompt: 'Nghe và ghi chép các ý chính', keyFacts: [] }
    };
  }

  _renderTestPanel(dialogue) {
    if (!this.testContainer) return;
    const testData = this._getDialogueTestData(dialogue.id);

    const modes = [
      { id: 'choose', icon: '🎯', label: 'Choose', desc: 'Trắc nghiệm' },
      { id: 'fill', icon: '✏️', label: 'Fill', desc: 'Điền từ' },
      { id: 'dictation', icon: '✍️', label: 'Dictation', desc: 'Chính tả' },
      { id: 'arrange', icon: '🧩', label: 'Arrange', desc: 'Nối câu' },
      { id: 'match', icon: '🔗', label: 'Match', desc: 'Ghép cặp' },
      { id: 'identify', icon: '👤', label: 'Identify', desc: 'Nhận diện' },
      { id: 'shadowing', icon: '🎙️', label: 'Shadowing', desc: 'Luyện nói' },
      { id: 'notetaking', icon: '📝', label: 'Note-taking', desc: 'Ghi chú' }
    ];

    let html = `
      <div class="test-panel-header">
        <div class="test-header-left">
          <div class="test-header-title-row">
            <span class="test-trophy-icon">🏆</span>
            <h3>Đấu Trường Luyện Tập &amp; Test 8 Kỹ Năng</h3>
          </div>
          <p class="test-header-sub">Chọn 1 trong 8 dạng bài tập bên dưới để rèn luyện toàn diện phản xạ nghe hiểu:</p>
        </div>
        <div class="test-header-badge" id="test-status-badge">
          8 Dạng bài tập
        </div>
      </div>

      <!-- 8-Mode Navigation Tabs Pill Bar -->
      <div class="test-mode-tabs-wrapper">
        <div class="test-mode-tabs-scroll" id="test-mode-tabs-scroll">
          ${modes.map(m => `
            <button class="test-mode-tab-btn ${this.activeTestMode === m.id ? 'active' : ''}" data-mode="${m.id}" type="button">
              <span class="tab-btn-icon">${m.icon}</span>
              <span class="tab-btn-label">${m.label}</span>
            </button>
          `).join('')}
        </div>
      </div>

      <!-- Active Mode Container -->
      <div class="test-active-mode-container" id="test-active-mode-container">
        <!-- Subview rendered dynamically -->
      </div>
    `;

    this.testContainer.innerHTML = html;

    // Bind tab events
    const tabBtns = this.testContainer.querySelectorAll('.test-mode-tab-btn');
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.activeTestMode = btn.dataset.mode;
        this._renderActiveTestMode(dialogue);
      });
    });

    // Render initial active mode
    this._renderActiveTestMode(dialogue);
  }

  _renderActiveTestMode(dialogue) {
    const container = document.getElementById('test-active-mode-container');
    if (!container) return;
    const testData = this._getDialogueTestData(dialogue.id);

    switch (this.activeTestMode) {
      case 'choose':
        this._renderChooseSubView(container, dialogue, testData);
        break;
      case 'fill':
        this._renderFillSubView(container, dialogue, testData);
        break;
      case 'dictation':
        this._renderDictationSubView(container, dialogue, testData);
        break;
      case 'arrange':
        this._renderArrangeSubView(container, dialogue, testData);
        break;
      case 'match':
        this._renderMatchSubView(container, dialogue, testData);
        break;
      case 'identify':
        this._renderIdentifySubView(container, dialogue, testData);
        break;
      case 'shadowing':
        this._renderShadowingSubView(container, dialogue, testData);
        break;
      case 'notetaking':
        this._renderNoteTakingSubView(container, dialogue, testData);
        break;
      default:
        this._renderChooseSubView(container, dialogue, testData);
    }
  }

  // ==========================================
  // 1. CHOOSE SUBVIEW (MCQ)
  // ==========================================
  _renderChooseSubView(container, dialogue, testData) {
    const questions = testData.choose || [];
    let html = `
      <div class="test-mode-subview">
        <div class="mode-intro-banner">
          <div class="mode-intro-text">
            <h4>🎯 Dạng 1: Choose (Trắc Nghiệm Đọc Hiểu)</h4>
            <p>Nghe hội thoại và chọn đáp án chính xác nhất A, B, C hoặc D</p>
          </div>
          <span class="mode-xp-badge">+${questions.length * 15} XP</span>
        </div>

        <div class="test-questions-list">
          ${questions.map((q, idx) => `
            <div class="test-question-card" id="choose-card-${q.id}">
              <div class="q-header">
                <span class="q-number">CÂU ${idx + 1} / ${questions.length}</span>
                <span class="q-type-badge">Multiple Choice</span>
              </div>
              <p class="q-title">${this._escapeHtml(q.question)}</p>
              <div class="q-options-grid">
                ${q.options.map((opt, optIdx) => `
                  <label class="q-option-item" data-qid="${q.id}" data-opt="${optIdx}">
                    <input type="radio" name="choose_${q.id}" value="${optIdx}">
                    <span class="q-opt-marker">${String.fromCharCode(65 + optIdx)}</span>
                    <span class="q-opt-text">${this._escapeHtml(opt)}</span>
                  </label>
                `).join('')}
              </div>
              <div class="q-explanation-box" id="choose-exp-${q.id}" style="display: none;">
                <strong>💡 Giải thích chi tiết:</strong> ${this._escapeHtml(q.explanation)}
              </div>
            </div>
          `).join('')}
        </div>

        <div class="test-panel-footer">
          <div id="choose-score-banner" class="test-score-banner" style="display: none;"></div>
          <div class="test-footer-actions">
            <button class="btn-submit-dialogue-test" id="submit-choose-btn" type="button">
              🚀 Chấm điểm Trắc Nghiệm
            </button>
            <button class="btn-reset-dialogue-test" id="reset-choose-btn" style="display: none;" type="button">
              🔄 Làm lại bài trắc nghiệm
            </button>
          </div>
        </div>
      </div>
    `;

    container.innerHTML = html;

    const submitBtn = container.querySelector('#submit-choose-btn');
    const resetBtn = container.querySelector('#reset-choose-btn');

    if (submitBtn) {
      submitBtn.addEventListener('click', () => {
        let correct = 0;
        questions.forEach(q => {
          const selected = container.querySelector(`input[name="choose_${q.id}"]:checked`);
          const card = container.querySelector(`#choose-card-${q.id}`);
          const expBox = container.querySelector(`#choose-exp-${q.id}`);
          if (expBox) expBox.style.display = 'block';

          const labels = card.querySelectorAll('.q-option-item');
          labels.forEach(l => {
            const optVal = parseInt(l.dataset.opt, 10);
            if (optVal === q.answer) l.classList.add('correct-answer');
            else if (selected && parseInt(selected.value, 10) === optVal && optVal !== q.answer) {
              l.classList.add('wrong-answer');
            }
          });

          if (selected && parseInt(selected.value, 10) === q.answer) {
            correct++;
            if (card) card.classList.add('card-result-correct');
          } else {
            if (card) card.classList.add('card-result-wrong');
          }
        });

        const pct = Math.round((correct / questions.length) * 100);
        const banner = container.querySelector('#choose-score-banner');
        if (banner) {
          banner.style.display = 'flex';
          banner.className = `test-score-banner ${pct >= 75 ? 'banner-pass' : 'banner-retry'}`;
          banner.innerHTML = `
            <div class="score-big-pill">
              <span class="score-num">${correct}/${questions.length}</span>
              <span class="score-pct">${pct}%</span>
            </div>
            <div class="score-feedback">
              <h4>${pct === 100 ? 'Xuất sắc tuyệt đối! 🌟' : (pct >= 75 ? 'Rất tốt! Khả năng nghe hiểu sắc bén 👏' : 'Cần cố gắng thêm! Hãy nghe lại hội thoại nhé 🎧')}</h4>
              <p>${pct >= 75 ? `Bạn đã nhận được <strong>+${correct * 15} XP</strong> rèn luyện phản xạ!` : 'Nghe kỹ các từ khóa và ngữ cảnh để chọn đáp án chính xác.'}</p>
            </div>
          `;
        }

        if (window.storage && window.storage.addXp) {
          window.storage.addXp(correct * 15);
          if (window.app && window.app.updateHeaderStats) window.app.updateHeaderStats();
        }

        submitBtn.style.display = 'none';
        if (resetBtn) resetBtn.style.display = 'inline-flex';
        if (pct >= 75 && window.audioCtrl && window.audioCtrl.playSuccessSound) {
          window.audioCtrl.playSuccessSound();
        }
      });
    }

    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        this._renderChooseSubView(container, dialogue, testData);
      });
    }
  }

  // ==========================================
  // 2. FILL SUBVIEW (Fill-in-the-Blank)
  // ==========================================
  _renderFillSubView(container, dialogue, testData) {
    const questions = testData.fill || [];
    let html = `
      <div class="test-mode-subview">
        <div class="mode-intro-banner">
          <div class="mode-intro-text">
            <h4>✏️ Dạng 2: Fill (Nghe & Điền Từ Vào Chỗ Trống)</h4>
            <p>Gõ từ tiếng Anh còn thiếu vào ô trống, hoặc bấm chọn nhanh từ ngân hàng từ gợi ý</p>
          </div>
          <span class="mode-xp-badge">+${questions.length * 15} XP</span>
        </div>

        <div class="test-questions-list">
          ${questions.map((q, idx) => `
            <div class="test-question-card" id="fill-card-${q.id}">
              <div class="q-header">
                <span class="q-number">CÂU ${idx + 1} / ${questions.length}</span>
                <span class="q-type-badge">Fill-in-the-blank</span>
              </div>
              <div class="q-blank-container">
                <div class="blank-sentence-display">
                  ${this._renderSentenceWithBlank(q.sentence)}
                </div>
                <div class="q-blank-input-row">
                  <input type="text" class="blank-input" id="fill-input-${q.id}" placeholder="Nhập từ còn thiếu..." autocomplete="off">
                  <button class="hint-toggle-btn" data-qid="${q.id}" type="button">💡 Gợi ý</button>
                </div>
                <div class="blank-hint-box" id="fill-hint-${q.id}" style="display: none;">
                  ${this._escapeHtml(q.hint || '')}
                </div>
                <!-- Word Bank Helper -->
                <div class="fill-word-bank-wrap">
                  <span class="word-bank-label">Ngân hàng từ khóa (bấm để điền):</span>
                  <div class="word-bank-chips-row">
                    <button class="wb-chip" data-qid="${q.id}" data-word="${this._escapeHtml(q.correctWord)}" type="button">
                      ${this._escapeHtml(q.correctWord)}
                    </button>
                  </div>
                </div>
              </div>
              <div class="q-explanation-box" id="fill-exp-${q.id}" style="display: none;">
                <strong>💡 Giải thích:</strong> ${this._escapeHtml(q.explanation)}
              </div>
            </div>
          `).join('')}
        </div>

        <div class="test-panel-footer">
          <div id="fill-score-banner" class="test-score-banner" style="display: none;"></div>
          <div class="test-footer-actions">
            <button class="btn-submit-dialogue-test" id="submit-fill-btn" type="button">
              🚀 Chấm điểm Điền Từ
            </button>
            <button class="btn-reset-dialogue-test" id="reset-fill-btn" style="display: none;" type="button">
              🔄 Làm lại bài điền từ
            </button>
          </div>
        </div>
      </div>
    `;

    container.innerHTML = html;

    // Word bank chip click
    container.querySelectorAll('.wb-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const input = container.querySelector(`#fill-input-${chip.dataset.qid}`);
        if (input) {
          input.value = chip.dataset.word;
          input.focus();
        }
      });
    });

    // Hint toggles
    container.querySelectorAll('.hint-toggle-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const box = container.querySelector(`#fill-hint-${btn.dataset.qid}`);
        if (box) box.style.display = box.style.display === 'none' ? 'block' : 'none';
      });
    });

    const submitBtn = container.querySelector('#submit-fill-btn');
    const resetBtn = container.querySelector('#reset-fill-btn');

    if (submitBtn) {
      submitBtn.addEventListener('click', () => {
        let correct = 0;
        questions.forEach(q => {
          const input = container.querySelector(`#fill-input-${q.id}`);
          const card = container.querySelector(`#fill-card-${q.id}`);
          const expBox = container.querySelector(`#fill-exp-${q.id}`);
          if (expBox) expBox.style.display = 'block';

          const userVal = (input ? input.value : '').trim().toLowerCase();
          const target = q.correctWord.trim().toLowerCase();

          if (userVal === target) {
            correct++;
            if (input) input.classList.add('input-correct');
            if (card) card.classList.add('card-result-correct');
          } else {
            if (input) input.classList.add('input-wrong');
            if (card) card.classList.add('card-result-wrong');
          }
        });

        const pct = Math.round((correct / questions.length) * 100);
        const banner = container.querySelector('#fill-score-banner');
        if (banner) {
          banner.style.display = 'flex';
          banner.className = `test-score-banner ${pct >= 75 ? 'banner-pass' : 'banner-retry'}`;
          banner.innerHTML = `
            <div class="score-big-pill">
              <span class="score-num">${correct}/${questions.length}</span>
              <span class="score-pct">${pct}%</span>
            </div>
            <div class="score-feedback">
              <h4>${pct === 100 ? 'Tuyệt đỉnh! Điền đúng 100% 🌟' : (pct >= 75 ? 'Rất tốt! Khả năng bắt từ xuất sắc 👏' : 'Cố gắng lên! Hãy nghe lại để bắt đúng từ 🎧')}</h4>
              <p>Bạn đã nhận được <strong>+${correct * 15} XP</strong>!</p>
            </div>
          `;
        }

        if (window.storage && window.storage.addXp) {
          window.storage.addXp(correct * 15);
          if (window.app && window.app.updateHeaderStats) window.app.updateHeaderStats();
        }

        submitBtn.style.display = 'none';
        if (resetBtn) resetBtn.style.display = 'inline-flex';
        if (pct >= 75 && window.audioCtrl && window.audioCtrl.playSuccessSound) {
          window.audioCtrl.playSuccessSound();
        }
      });
    }

    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        this._renderFillSubView(container, dialogue, testData);
      });
    }
  }

  // ==========================================
  // 3. DICTATION SUBVIEW (Audio Dictation)
  // ==========================================
  _renderDictationSubView(container, dialogue, testData) {
    const items = testData.dictation || [];
    let html = `
      <div class="test-mode-subview">
        <div class="mode-intro-banner">
          <div class="mode-intro-text">
            <h4>✍️ Dạng 3: Dictation (Nghe Chính Tả Từng Câu)</h4>
            <p>Bấm nghe audio (tốc độ 1.0x hoặc 0.75x chậm rõ) và gõ lại nguyên văn câu tiếng Anh</p>
          </div>
          <span class="mode-xp-badge">+${items.length * 20} XP</span>
        </div>

        <div class="test-questions-list">
          ${items.map((item, idx) => `
            <div class="dictation-item-card" id="dict-card-${item.id}">
              <div class="dictation-speaker-bar">
                <div class="dict-speaker-info">
                  <span class="dict-speaker-avatar">🗣️</span>
                  <span>Câu ${idx + 1}: ${this._escapeHtml(item.speaker)}</span>
                </div>
                <div class="dict-audio-actions">
                  <button class="btn-dict-audio" data-text="${this._escapeHtml(item.text)}" data-rate="1.0" type="button">
                    🔊 Nghe 1.0x
                  </button>
                  <button class="btn-dict-audio btn-dict-slow" data-text="${this._escapeHtml(item.text)}" data-rate="0.75" type="button">
                    🐢 Chậm 0.75x
                  </button>
                </div>
              </div>

              <textarea class="dict-textarea" id="dict-input-${item.id}" placeholder="Gõ lại câu tiếng Anh bạn vừa nghe được vào đây..."></textarea>

              <div class="dict-actions-row">
                <button class="btn-dict-check" data-id="${item.id}" data-target="${this._escapeHtml(item.text)}" type="button">
                  🔍 So sánh &amp; Kiểm tra
                </button>
                <button class="btn-dict-reveal" data-id="${item.id}" type="button">
                  👁️ Xem đáp án câu này
                </button>
              </div>

              <div class="dict-diff-box" id="dict-diff-${item.id}" style="display: none;"></div>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    container.innerHTML = html;

    // Audio buttons
    container.querySelectorAll('.btn-dict-audio').forEach(btn => {
      btn.addEventListener('click', () => {
        const text = btn.dataset.text;
        const rate = parseFloat(btn.dataset.rate) || 1.0;
        if (window.audioCtrl) {
          const oldRate = window.audioCtrl.rate;
          window.audioCtrl.rate = rate;
          window.audioCtrl.speak(text, () => {
            window.audioCtrl.rate = oldRate;
          });
        }
      });
    });

    // Check buttons with diff engine
    container.querySelectorAll('.btn-dict-check').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.id;
        const target = btn.dataset.target;
        const input = container.querySelector(`#dict-input-${id}`);
        const diffBox = container.querySelector(`#dict-diff-${id}`);
        const userText = input ? input.value.trim() : '';

        if (!userText) {
          alert('Vui lòng gõ nội dung trước khi kiểm tra nhé!');
          return;
        }

        const diffHtml = this._computeWordDiff(target, userText);
        if (diffBox) {
          diffBox.style.display = 'block';
          diffBox.innerHTML = `
            <div><strong>Phân tích sai khác từng từ:</strong></div>
            <div style="margin-top: 6px;">${diffHtml}</div>
            <div class="dict-target-reveal">
              <strong>Đáp án chuẩn:</strong> ${this._escapeHtml(target)}
            </div>
          `;
        }

        if (window.storage && window.storage.addXp) {
          window.storage.addXp(20);
          if (window.app && window.app.updateHeaderStats) window.app.updateHeaderStats();
        }
      });
    });

    // Reveal buttons
    container.querySelectorAll('.btn-dict-reveal').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.id;
        const item = items.find(i => i.id === id);
        if (item) {
          const input = container.querySelector(`#dict-input-${id}`);
          if (input) input.value = item.text;
          const diffBox = container.querySelector(`#dict-diff-${id}`);
          if (diffBox) {
            diffBox.style.display = 'block';
            diffBox.innerHTML = `
              <div class="dict-target-reveal" style="margin-top:0; border-top:none;">
                <strong>Câu nguyên văn:</strong> ${this._escapeHtml(item.text)}<br>
                <em>Dịch nghĩa: ${this._escapeHtml(item.vi)}</em>
              </div>
            `;
          }
        }
      });
    });
  }

  // ==========================================
  // 4. ARRANGE SUBVIEW (Sentence Builder)
  // ==========================================
  _renderArrangeSubView(container, dialogue, testData) {
    const items = testData.arrange || [];
    this.arrangeState = {};

    items.forEach(it => {
      this.arrangeState[it.id] = [];
    });

    let html = `
      <div class="test-mode-subview">
        <div class="mode-intro-banner">
          <div class="mode-intro-text">
            <h4>🧩 Dạng 4: Arrange (Sắp Xếp Từ Thành Câu Hoàn Chỉnh)</h4>
            <p>Bấm vào các thẻ từ xáo trộn để xếp theo đúng trật tự ngữ pháp của câu hội thoại</p>
          </div>
          <span class="mode-xp-badge">+${items.length * 15} XP</span>
        </div>

        <div class="test-questions-list">
          ${items.map((it, idx) => `
            <div class="arrange-item-card" id="arrange-card-${it.id}">
              <div class="arrange-vi-prompt">
                <span>Câu ${idx + 1}: ${this._escapeHtml(it.vi)}</span>
                <button class="turn-audio-btn" data-text="${this._escapeHtml(it.fullSentence)}" type="button">
                  🔊 Nghe câu
                </button>
              </div>

              <!-- Dropzone slot for constructed sentence -->
              <div class="arrange-dropzone" id="arrange-slot-${it.id}" data-id="${it.id}">
                <span class="arrange-dropzone-placeholder">Bấm các từ bên dưới để đưa vào câu này...</span>
              </div>

              <!-- Scrambled word chips bank -->
              <div class="arrange-bank-zone" id="arrange-bank-${it.id}" data-id="${it.id}">
                ${it.scrambledWords.map((w, wIdx) => `
                  <span class="arrange-chip" data-qid="${it.id}" data-word="${this._escapeHtml(w)}" data-widx="${wIdx}">
                    ${this._escapeHtml(w)}
                  </span>
                `).join('')}
              </div>

              <div class="arrange-footer-bar">
                <div class="arrange-result-feedback" id="arrange-feedback-${it.id}"></div>
                <div style="display: flex; gap: 8px;">
                  <button class="btn-dict-reveal" data-action="reset-arrange" data-id="${it.id}" type="button">
                    🔄 Xếp lại
                  </button>
                  <button class="btn-dict-check" data-action="check-arrange" data-id="${it.id}" data-target="${this._escapeHtml(it.fullSentence)}" type="button">
                    ✅ Kiểm tra trật tự
                  </button>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    container.innerHTML = html;

    // Audio listen
    container.querySelectorAll('.turn-audio-btn').forEach(b => {
      b.addEventListener('click', () => {
        if (window.audioCtrl) window.audioCtrl.speak(b.dataset.text);
      });
    });

    // Chip click handler
    container.querySelectorAll('.arrange-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const qid = chip.dataset.qid;
        const widx = chip.dataset.widx;
        const word = chip.dataset.word;
        const slot = container.querySelector(`#arrange-slot-${qid}`);
        if (!slot) return;

        if (chip.classList.contains('placed-in-slot')) {
          // Return from slot to bank
          chip.classList.remove('placed-in-slot');
          const idxInArr = this.arrangeState[qid].findIndex(x => x.widx === widx);
          if (idxInArr !== -1) this.arrangeState[qid].splice(idxInArr, 1);
          slot.removeChild(chip);
          const bank = container.querySelector(`#arrange-bank-${qid}`);
          if (bank) bank.appendChild(chip);
        } else {
          // Move from bank to slot
          chip.classList.add('placed-in-slot');
          this.arrangeState[qid].push({ widx, word, el: chip });
          slot.appendChild(chip);
        }

        const placeholder = slot.querySelector('.arrange-dropzone-placeholder');
        if (placeholder) {
          placeholder.style.display = this.arrangeState[qid].length > 0 ? 'none' : 'block';
        }
        slot.classList.toggle('has-words', this.arrangeState[qid].length > 0);
      });
    });

    // Check & Reset buttons
    container.querySelectorAll('button[data-action="check-arrange"]').forEach(btn => {
      btn.addEventListener('click', () => {
        const qid = btn.dataset.id;
        const target = btn.dataset.target.trim().replace(/\s+/g, ' ');
        const userWords = (this.arrangeState[qid] || []).map(x => x.word).join(' ').trim();
        const feedback = container.querySelector(`#arrange-feedback-${qid}`);

        if (!userWords) {
          alert('Vui lòng chọn từ để xếp thành câu trước nhé!');
          return;
        }

        if (userWords.toLowerCase() === target.toLowerCase()) {
          if (feedback) {
            feedback.className = 'arrange-result-feedback correct';
            feedback.innerHTML = '🎉 Chính xác 100%! Trật tự ngữ pháp hoàn hảo (+15 XP)';
          }
          if (window.storage && window.storage.addXp) {
            window.storage.addXp(15);
            if (window.app && window.app.updateHeaderStats) window.app.updateHeaderStats();
          }
          if (window.audioCtrl && window.audioCtrl.playSuccessSound) {
            window.audioCtrl.playSuccessSound();
          }
        } else {
          if (feedback) {
            feedback.className = 'arrange-result-feedback wrong';
            feedback.innerHTML = '❌ Chưa đúng trật tự. Hãy bấm "Xếp lại" và thử lại nhé!';
          }
        }
      });
    });

    container.querySelectorAll('button[data-action="reset-arrange"]').forEach(btn => {
      btn.addEventListener('click', () => {
        const qid = btn.dataset.id;
        const slot = container.querySelector(`#arrange-slot-${qid}`);
        const bank = container.querySelector(`#arrange-bank-${qid}`);
        const feedback = container.querySelector(`#arrange-feedback-${qid}`);
        if (!slot || !bank) return;

        const chips = slot.querySelectorAll('.arrange-chip');
        chips.forEach(c => {
          c.classList.remove('placed-in-slot');
          bank.appendChild(c);
        });
        this.arrangeState[qid] = [];
        slot.classList.remove('has-words');
        const placeholder = slot.querySelector('.arrange-dropzone-placeholder');
        if (placeholder) placeholder.style.display = 'block';
        if (feedback) feedback.style.display = 'none';
      });
    });
  }

  // ==========================================
  // 5. MATCH SUBVIEW (Matching Pairs)
  // ==========================================
  _renderMatchSubView(container, dialogue, testData) {
    const pairs = testData.match || [];
    // Shuffle right items
    const shuffledRight = [...pairs].map(p => ({ id: p.id, text: p.right })).sort(() => Math.random() - 0.5);

    this.matchState = {
      selectedLeft: null,
      pairs: {} // leftId -> rightId
    };

    let html = `
      <div class="test-mode-subview">
        <div class="mode-intro-banner">
          <div class="mode-intro-text">
            <h4>🔗 Dạng 5: Match (Nối Cặp Câu Hỏi - Phản Hồi Tương Ứng)</h4>
            <p>Bấm chọn 1 câu ở Cột Trái, sau đó bấm chọn 1 câu phản hồi tương ứng ở Cột Phải</p>
          </div>
          <span class="mode-xp-badge">+${pairs.length * 15} XP</span>
        </div>

        <div class="match-arena-grid">
          <!-- Left Column -->
          <div class="match-column">
            <span class="match-col-title">Vế A (Câu hỏi / Tình huống):</span>
            ${pairs.map((p, idx) => `
              <button class="match-card-btn" id="match-left-${p.id}" data-side="left" data-id="${p.id}" type="button">
                <span>${idx + 1}. ${this._escapeHtml(p.left)}</span>
                <span class="match-pair-tag" id="tag-left-${p.id}" style="display: none;"></span>
              </button>
            `).join('')}
          </div>

          <!-- Right Column -->
          <div class="match-column">
            <span class="match-col-title">Vế B (Câu phản hồi tương ứng):</span>
            ${shuffledRight.map((p) => `
              <button class="match-card-btn" id="match-right-${p.id}" data-side="right" data-id="${p.id}" type="button">
                <span>${this._escapeHtml(p.text)}</span>
                <span class="match-pair-tag" id="tag-right-${p.id}" style="display: none;"></span>
              </button>
            `).join('')}
          </div>
        </div>

        <div class="test-panel-footer" style="margin-top: 20px;">
          <div id="match-score-banner" class="test-score-banner" style="display: none;"></div>
          <div class="test-footer-actions">
            <button class="btn-submit-dialogue-test" id="submit-match-btn" type="button">
              🚀 Kiểm tra các cặp ghép
            </button>
            <button class="btn-reset-dialogue-test" id="reset-match-btn" style="display: none;" type="button">
              🔄 Nối lại từ đầu
            </button>
          </div>
        </div>
      </div>
    `;

    container.innerHTML = html;

    const leftBtns = container.querySelectorAll('.match-card-btn[data-side="left"]');
    const rightBtns = container.querySelectorAll('.match-card-btn[data-side="right"]');

    leftBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        leftBtns.forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        this.matchState.selectedLeft = btn.dataset.id;
      });
    });

    rightBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        if (!this.matchState.selectedLeft) {
          alert('Vui lòng chọn một câu ở Cột Trái trước nhé!');
          return;
        }

        const leftId = this.matchState.selectedLeft;
        const rightId = btn.dataset.id;

        // Establish pair
        this.matchState.pairs[leftId] = rightId;

        const leftBtn = container.querySelector(`#match-left-${leftId}`);
        const rightBtn = btn;

        if (leftBtn) {
          leftBtn.classList.add('paired');
          leftBtn.classList.remove('selected');
          const tagL = leftBtn.querySelector(`#tag-left-${leftId}`);
          if (tagL) {
            tagL.style.display = 'inline-block';
            tagL.textContent = '🔗 Đã ghép';
          }
        }

        if (rightBtn) {
          rightBtn.classList.add('paired');
          const tagR = rightBtn.querySelector(`#tag-right-${rightId}`);
          if (tagR) {
            tagR.style.display = 'inline-block';
            tagR.textContent = '🔗 Đã ghép';
          }
        }

        this.matchState.selectedLeft = null;
      });
    });

    const submitBtn = container.querySelector('#submit-match-btn');
    const resetBtn = container.querySelector('#reset-match-btn');

    if (submitBtn) {
      submitBtn.addEventListener('click', () => {
        let correct = 0;
        pairs.forEach(p => {
          const pairedRightId = this.matchState.pairs[p.id];
          const leftEl = container.querySelector(`#match-left-${p.id}`);
          const rightEl = container.querySelector(`#match-right-${pairedRightId}`);

          if (pairedRightId === p.id) {
            correct++;
            if (leftEl) leftEl.classList.add('card-result-correct');
            if (rightEl) rightEl.classList.add('card-result-correct');
          } else {
            if (leftEl) leftEl.classList.add('paired-wrong');
            if (rightEl) rightEl.classList.add('paired-wrong');
          }
        });

        const pct = Math.round((correct / pairs.length) * 100);
        const banner = container.querySelector('#match-score-banner');
        if (banner) {
          banner.style.display = 'flex';
          banner.className = `test-score-banner ${pct >= 75 ? 'banner-pass' : 'banner-retry'}`;
          banner.innerHTML = `
            <div class="score-big-pill">
              <span class="score-num">${correct}/${pairs.length}</span>
              <span class="score-pct">${pct}%</span>
            </div>
            <div class="score-feedback">
              <h4>${pct === 100 ? 'Tuyệt vời! Ghép đúng toàn bộ các cặp 🌟' : 'Ghép đúng ' + correct + '/' + pairs.length + ' cặp'}</h4>
              <p>Bạn đã nhận được <strong>+${correct * 15} XP</strong>!</p>
            </div>
          `;
        }

        if (window.storage && window.storage.addXp) {
          window.storage.addXp(correct * 15);
          if (window.app && window.app.updateHeaderStats) window.app.updateHeaderStats();
        }

        submitBtn.style.display = 'none';
        if (resetBtn) resetBtn.style.display = 'inline-flex';
        if (pct >= 75 && window.audioCtrl && window.audioCtrl.playSuccessSound) {
          window.audioCtrl.playSuccessSound();
        }
      });
    }

    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        this._renderMatchSubView(container, dialogue, testData);
      });
    }
  }

  // ==========================================
  // 6. IDENTIFY SUBVIEW (Speaker & True/False)
  // ==========================================
  _renderIdentifySubView(container, dialogue, testData) {
    const items = testData.identify || [];
    let html = `
      <div class="test-mode-subview">
        <div class="mode-intro-banner">
          <div class="mode-intro-text">
            <h4>👤 Dạng 6: Identify (Nhận Diện Người Nói & Đúng/Sai)</h4>
            <p>Xác định ai là người phát ngôn câu thoại và phán đoán tính đúng sai của thông tin</p>
          </div>
          <span class="mode-xp-badge">+${items.length * 15} XP</span>
        </div>

        <div class="test-questions-list">
          ${items.map((it, idx) => `
            <div class="identify-card" id="identify-card-${it.id}">
              <div class="q-header">
                <span class="q-number">CÂU ${idx + 1} / ${items.length}</span>
                <span class="q-type-badge">${it.type === 'speaker' ? 'Ai là người nói?' : 'Đúng hay Sai (True/False)'}</span>
              </div>

              ${it.type === 'speaker' ? `
                <div class="identify-quote-bubble">
                  "${this._escapeHtml(it.quote)}"
                </div>
                <div class="identify-options-row">
                  <button class="btn-identify-option" data-id="${it.id}" data-val="A" type="button">
                    <span>${dialogue.speakerA.avatar}</span>
                    <span>${this._escapeHtml(it.speakerA || dialogue.speakerA.name)}</span>
                  </button>
                  <button class="btn-identify-option" data-id="${it.id}" data-val="B" type="button">
                    <span>${dialogue.speakerB.avatar}</span>
                    <span>${this._escapeHtml(it.speakerB || dialogue.speakerB.name)}</span>
                  </button>
                </div>
              ` : `
                <p class="q-title">${this._escapeHtml(it.statement)}</p>
                <div class="identify-options-row">
                  <button class="btn-identify-option" data-id="${it.id}" data-val="true" type="button">
                    <span>✅ Đúng (True)</span>
                  </button>
                  <button class="btn-identify-option" data-id="${it.id}" data-val="false" type="button">
                    <span>❌ Sai (False)</span>
                  </button>
                </div>
              `}

              <div class="q-explanation-box" id="identify-exp-${it.id}" style="display: none;">
                <strong>💡 Giải thích:</strong> ${this._escapeHtml(it.explanation)}
              </div>
            </div>
          `).join('')}
        </div>

        <div class="test-panel-footer">
          <div id="identify-score-banner" class="test-score-banner" style="display: none;"></div>
          <div class="test-footer-actions">
            <button class="btn-submit-dialogue-test" id="submit-identify-btn" type="button">
              🚀 Kiểm tra Nhận Diện
            </button>
            <button class="btn-reset-dialogue-test" id="reset-identify-btn" style="display: none;" type="button">
              🔄 Làm lại bài nhận diện
            </button>
          </div>
        </div>
      </div>
    `;

    container.innerHTML = html;

    const userPicks = {};

    container.querySelectorAll('.btn-identify-option').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.id;
        const val = btn.dataset.val;
        const row = btn.closest('.identify-options-row');
        row.querySelectorAll('.btn-identify-option').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        userPicks[id] = val;
      });
    });

    const submitBtn = container.querySelector('#submit-identify-btn');
    const resetBtn = container.querySelector('#reset-identify-btn');

    if (submitBtn) {
      submitBtn.addEventListener('click', () => {
        let correct = 0;
        items.forEach(it => {
          const card = container.querySelector(`#identify-card-${it.id}`);
          const expBox = container.querySelector(`#identify-exp-${it.id}`);
          if (expBox) expBox.style.display = 'block';

          const pick = userPicks[it.id];
          let isRight = false;

          if (it.type === 'speaker') {
            isRight = (pick === it.answer);
          } else {
            isRight = (String(pick) === String(it.answer));
          }

          if (isRight) {
            correct++;
            if (card) card.classList.add('card-result-correct');
          } else {
            if (card) card.classList.add('card-result-wrong');
          }
        });

        const pct = Math.round((correct / items.length) * 100);
        const banner = container.querySelector('#identify-score-banner');
        if (banner) {
          banner.style.display = 'flex';
          banner.className = `test-score-banner ${pct >= 75 ? 'banner-pass' : 'banner-retry'}`;
          banner.innerHTML = `
            <div class="score-big-pill">
              <span class="score-num">${correct}/${items.length}</span>
              <span class="score-pct">${pct}%</span>
            </div>
            <div class="score-feedback">
              <h4>${pct === 100 ? 'Tuyệt vời! Nhận diện chính xác 100% 🌟' : 'Nhận diện đúng ' + correct + '/' + items.length + ' câu'}</h4>
              <p>Bạn đã nhận được <strong>+${correct * 15} XP</strong>!</p>
            </div>
          `;
        }

        if (window.storage && window.storage.addXp) {
          window.storage.addXp(correct * 15);
          if (window.app && window.app.updateHeaderStats) window.app.updateHeaderStats();
        }

        submitBtn.style.display = 'none';
        if (resetBtn) resetBtn.style.display = 'inline-flex';
        if (pct >= 75 && window.audioCtrl && window.audioCtrl.playSuccessSound) {
          window.audioCtrl.playSuccessSound();
        }
      });
    }

    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        this._renderIdentifySubView(container, dialogue, testData);
      });
    }
  }

  // ==========================================
  // 7. SHADOWING SUBVIEW (Pronunciation Scoring)
  // ==========================================
  _renderShadowingSubView(container, dialogue, testData) {
    const items = testData.shadowing || [];
    let html = `
      <div class="test-mode-subview">
        <div class="mode-intro-banner">
          <div class="mode-intro-text">
            <h4>🎙️ Dạng 7: Shadowing (Luyện Nói Nhại Giọng &amp; Chấm Điểm AI)</h4>
            <p>Nghe giọng đọc mẫu của bản xứ, bấm Micro và phát âm lại để nhận điểm chuẩn xác %</p>
          </div>
          <span class="mode-xp-badge">+${items.length * 25} XP</span>
        </div>

        <div class="test-questions-list">
          ${items.map((it, idx) => `
            <div class="shadowing-card" id="shadow-card-${it.id}">
              <div class="shadowing-target-box">
                <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 4px;">
                  <span class="q-number">CÂU ${idx + 1}: ${this._escapeHtml(it.speaker)}</span>
                  <span class="q-type-badge">Độ khó: ${it.difficulty || 'Chuẩn'}</span>
                </div>
                <div class="shadowing-en">${this._escapeHtml(it.text)}</div>
                <div class="shadowing-vi">${this._escapeHtml(it.vi)}</div>
              </div>

              <div class="shadowing-controls-row">
                <button class="turn-audio-btn" data-text="${this._escapeHtml(it.text)}" type="button">
                  🔊 Nghe giọng mẫu
                </button>
                <button class="btn-shadowing-mic" id="mic-btn-${it.id}" data-id="${it.id}" data-target="${this._escapeHtml(it.text)}" type="button">
                  🎙️ Bấm để nói (Micro)
                </button>
                <button class="btn-dict-reveal" data-action="manual-pass" data-id="${it.id}" type="button">
                  ✓ Tôi đã đọc to câu này
                </button>
              </div>

              <div class="shadowing-feedback-box" id="shadow-feedback-${it.id}" style="display: none;">
                <div class="shadowing-user-transcript" id="shadow-transcript-${it.id}"></div>
                <div class="shadowing-score-badge" id="shadow-score-${it.id}">--%</div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    container.innerHTML = html;

    // Listen audio
    container.querySelectorAll('.turn-audio-btn').forEach(b => {
      b.addEventListener('click', () => {
        if (window.audioCtrl) window.audioCtrl.speak(b.dataset.text);
      });
    });

    // Mic recording
    container.querySelectorAll('.btn-shadowing-mic').forEach(micBtn => {
      micBtn.addEventListener('click', () => {
        const id = micBtn.dataset.id;
        const target = micBtn.dataset.target;
        const feedbackBox = container.querySelector(`#shadow-feedback-${id}`);
        const transcriptEl = container.querySelector(`#shadow-transcript-${id}`);
        const scoreEl = container.querySelector(`#shadow-score-${id}`);

        if (!this.recognition) {
          this._initSpeechRecognition();
        }

        if (!this.recognition) {
          alert('Microphone chưa sẵn sàng. Vui lòng cấp quyền Micro hoặc sử dụng nút "Tôi đã đọc to câu này" để luyện tập nhé!');
          return;
        }

        if (this.isRecordingShadow) {
          try { this.recognition.stop(); } catch(e) {}
          this.isRecordingShadow = false;
          micBtn.classList.remove('recording');
          micBtn.innerHTML = '🎙️ Bấm để nói (Micro)';
          return;
        }

        micBtn.classList.add('recording');
        micBtn.innerHTML = '🔴 Đang nghe... Hãy nói!';
        this.isRecordingShadow = true;

        this.recognition.onresult = (e) => {
          const spoken = e.results[0][0].transcript;
          const score = this._calculateSentenceSimilarity(target, spoken);

          micBtn.classList.remove('recording');
          micBtn.innerHTML = '🎙️ Bấm để nói (Micro)';
          this.isRecordingShadow = false;

          if (feedbackBox) feedbackBox.style.display = 'flex';
          if (transcriptEl) {
            transcriptEl.innerHTML = `<strong>Bạn đã nói:</strong> "${this._escapeHtml(spoken)}"`;
          }
          if (scoreEl) {
            scoreEl.textContent = `${score}%`;
            scoreEl.style.color = score >= 80 ? '#10b981' : (score >= 60 ? '#f59e0b' : '#ef4444');
          }

          if (window.storage && window.storage.addXp) {
            window.storage.addXp(score >= 80 ? 25 : 15);
            if (window.app && window.app.updateHeaderStats) window.app.updateHeaderStats();
          }
          if (score >= 80 && window.audioCtrl && window.audioCtrl.playSuccessSound) {
            window.audioCtrl.playSuccessSound();
          }
        };

        this.recognition.onerror = (err) => {
          micBtn.classList.remove('recording');
          micBtn.innerHTML = '🎙️ Bấm để nói (Micro)';
          this.isRecordingShadow = false;
          console.warn('SpeechRecognition error:', err);
        };

        this.recognition.onend = () => {
          micBtn.classList.remove('recording');
          micBtn.innerHTML = '🎙️ Bấm để nói (Micro)';
          this.isRecordingShadow = false;
        };

        try {
          this.recognition.start();
        } catch (e) {
          micBtn.classList.remove('recording');
          micBtn.innerHTML = '🎙️ Bấm để nói (Micro)';
          this.isRecordingShadow = false;
        }
      });
    });

    // Manual pass button
    container.querySelectorAll('button[data-action="manual-pass"]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.id;
        const feedbackBox = container.querySelector(`#shadow-feedback-${id}`);
        const transcriptEl = container.querySelector(`#shadow-transcript-${id}`);
        const scoreEl = container.querySelector(`#shadow-score-${id}`);

        if (feedbackBox) feedbackBox.style.display = 'flex';
        if (transcriptEl) {
          transcriptEl.innerHTML = `<em>Đã luyện tập phát âm to rõ thành công!</em>`;
        }
        if (scoreEl) {
          scoreEl.textContent = '100%';
          scoreEl.style.color = '#10b981';
        }

        if (window.storage && window.storage.addXp) {
          window.storage.addXp(20);
          if (window.app && window.app.updateHeaderStats) window.app.updateHeaderStats();
        }
        if (window.audioCtrl && window.audioCtrl.playSuccessSound) {
          window.audioCtrl.playSuccessSound();
        }
      });
    });
  }

  // ==========================================
  // 8. NOTE-TAKING SUBVIEW (Guided Notes)
  // ==========================================
  _renderNoteTakingSubView(container, dialogue, testData) {
    const nt = testData.noteTaking || {
      missionTitle: 'Ghi chép thông tin then chốt',
      missionPrompt: 'Hãy nghe đoạn hội thoại và ghi chép lại các chi tiết quan trọng nhất',
      keyFacts: []
    };

    const savedNotesKey = `eng_listening_notes_${dialogue.id}`;
    const savedNotes = localStorage.getItem(savedNotesKey) || '';

    let html = `
      <div class="test-mode-subview">
        <div class="notetaking-mission-card">
          <h4>📝 Dạng 8: Note-taking (${this._escapeHtml(nt.missionTitle)})</h4>
          <p>${this._escapeHtml(nt.missionPrompt)}</p>
        </div>

        <textarea class="notetaking-textarea" id="notetaking-input" placeholder="Vừa nghe vừa ghi chép các từ khóa, thời gian, tên người, số liệu vào đây...">${this._escapeHtml(savedNotes)}</textarea>

        <div class="notetaking-checklist-box">
          <div class="checklist-title-row">
            <h5>🎯 Bảng Checklist Thông Tin Trọng Tâm Cần Bắt Trúng:</h5>
            <span id="notetaking-stats-pill" style="font-size: 12px; font-weight: 800; color: #10b981;"></span>
          </div>
          <div class="checklist-items-grid" id="checklist-items-grid">
            ${nt.keyFacts.map(kf => `
              <span class="keyfact-tag" id="kfact-${kf.key.replace(/\s+/g, '_')}">
                <span>⚪</span>
                <span>${this._escapeHtml(kf.label)}</span>
              </span>
            `).join('')}
          </div>
        </div>

        <div style="display: flex; gap: 10px; align-items: center; justify-content: space-between; flex-wrap: wrap;">
          <button class="btn-dict-check" id="btn-scan-notes" type="button">
            🔍 Quét &amp; Kiểm Tra Từ Khóa Đã Bắt Được
          </button>
          <button class="btn-dict-reveal" id="btn-toggle-sample-notes" type="button">
            👁️ Xem Gợi Ý Ghi Chú Mẫu Chuẩn
          </button>
        </div>

        <div class="sample-note-toggle-box" id="sample-note-drawer" style="display: none;">
          <strong>📋 Ghi chú mẫu tiêu chuẩn:</strong><br>
          ${this._escapeHtml(nt.sampleNotes || '')}
        </div>
      </div>
    `;

    container.innerHTML = html;

    const textarea = container.querySelector('#notetaking-input');
    if (textarea) {
      textarea.addEventListener('input', () => {
        localStorage.setItem(savedNotesKey, textarea.value);
      });
    }

    const scanBtn = container.querySelector('#btn-scan-notes');
    if (scanBtn) {
      scanBtn.addEventListener('click', () => {
        const text = textarea ? textarea.value : '';
        const scanResult = this._scanNoteKeywords(text, nt.keyFacts);

        scanResult.results.forEach(res => {
          const tagEl = container.querySelector(`#kfact-${res.key.replace(/\s+/g, '_')}`);
          if (tagEl) {
            if (res.isCaptured) {
              tagEl.className = 'keyfact-tag captured';
              tagEl.innerHTML = `<span>✅</span> <span>${this._escapeHtml(res.label)}</span>`;
            } else {
              tagEl.className = 'keyfact-tag';
              tagEl.innerHTML = `<span>⚪</span> <span>${this._escapeHtml(res.label)}</span>`;
            }
          }
        });

        const pill = container.querySelector('#notetaking-stats-pill');
        if (pill) {
          pill.textContent = `Bắt trúng: ${scanResult.capturedCount} / ${scanResult.total} mục (${scanResult.pct}%)`;
        }

        if (window.storage && window.storage.addXp) {
          window.storage.addXp(scanResult.capturedCount * 10);
          if (window.app && window.app.updateHeaderStats) window.app.updateHeaderStats();
        }

        if (scanResult.pct >= 60 && window.audioCtrl && window.audioCtrl.playSuccessSound) {
          window.audioCtrl.playSuccessSound();
        }
      });
    }

    const toggleSampleBtn = container.querySelector('#btn-toggle-sample-notes');
    if (toggleSampleBtn) {
      toggleSampleBtn.addEventListener('click', () => {
        const drawer = container.querySelector('#sample-note-drawer');
        if (drawer) {
          drawer.style.display = drawer.style.display === 'none' ? 'block' : 'none';
        }
      });
    }
  }

  _renderSentenceWithBlank(sentence) {
    if (!sentence) return '';
    return this._escapeHtml(sentence).replace(/\[\s*______+\s*\]/g, `<span class="blank-highlight-slot">[ Từ còn thiếu ]</span>`);
  }

  _computeWordDiff(target, input) {
    const targetWords = (target || '').trim().split(/\s+/);
    const inputWords = (input || '').trim().split(/\s+/);

    let html = '';
    targetWords.forEach((tWord, idx) => {
      const cleanT = tWord.toLowerCase().replace(/[^a-z0-9]/g, '');
      const userWord = inputWords[idx];
      const cleanU = userWord ? userWord.toLowerCase().replace(/[^a-z0-9]/g, '') : '';

      if (cleanT === cleanU) {
        html += `<span class="diff-word-correct">${this._escapeHtml(tWord)}</span> `;
      } else if (userWord) {
        html += `<span class="diff-word-wrong" title="Bạn gõ: ${this._escapeHtml(userWord)}">${this._escapeHtml(userWord)}</span> <span class="diff-word-correct">${this._escapeHtml(tWord)}</span> `;
      } else {
        html += `<span class="diff-word-missing">[${this._escapeHtml(tWord)}]</span> `;
      }
    });

    if (inputWords.length > targetWords.length) {
      for (let i = targetWords.length; i < inputWords.length; i++) {
        html += `<span class="diff-word-wrong">${this._escapeHtml(inputWords[i])}</span> `;
      }
    }
    return html;
  }

  _calculateSentenceSimilarity(s1, s2) {
    const clean1 = (s1 || '').toLowerCase().replace(/[^a-z0-9\s]/g, '').trim().split(/\s+/).filter(Boolean);
    const clean2 = (s2 || '').toLowerCase().replace(/[^a-z0-9\s]/g, '').trim().split(/\s+/).filter(Boolean);
    if (!clean1.length || !clean2.length) return 0;

    let matches = 0;
    clean1.forEach(w => {
      if (clean2.includes(w)) matches++;
    });
    return Math.min(100, Math.round((matches / Math.max(clean1.length, clean2.length)) * 100));
  }

  _scanNoteKeywords(noteText, keyFacts) {
    const lowerNote = (noteText || '').toLowerCase();
    let capturedCount = 0;
    const results = (keyFacts || []).map(fact => {
      const match = (fact.synonyms || []).some(syn => lowerNote.includes(syn.toLowerCase()));
      if (match) capturedCount++;
      return { ...fact, isCaptured: match };
    });
    const total = keyFacts.length || 1;
    const pct = Math.round((capturedCount / total) * 100);
    return { results, capturedCount, total: keyFacts.length, pct };
  }

  // ==========================================
  // PLAYBACK & TIMELINE ENGINE
  // ==========================================

  play() {
    this.isPlaying = true;
    this.isPaused = false;
    this._updatePlayButtonState(true);

    if (this.turnAdvanceTimeout) {
      clearTimeout(this.turnAdvanceTimeout);
      this.turnAdvanceTimeout = null;
    }

    if (this.currentTurnIndex === -1 || this.currentElapsed >= this.totalDuration) {
      this.currentTurnIndex = 0;
      this.currentElapsed = 0;
      this._updateTimeDisplay();
    }

    this._startTicker();
    this._playCurrentTurn();
  }

  pause() {
    this.isPlaying = false;
    this.isPaused = true;
    this._turnSequenceId++;
    if (this.turnAdvanceTimeout) {
      clearTimeout(this.turnAdvanceTimeout);
      this.turnAdvanceTimeout = null;
    }
    this._stopTicker();
    if (window.audioCtrl) {
      window.audioCtrl.stop();
    }
    this._updatePlayButtonState(false);
    this._updateLiveSpeakerUI(null);
  }

  stopAudio() {
    this.isPlaying = false;
    this.isPaused = false;
    this._turnSequenceId++;
    if (this.turnAdvanceTimeout) {
      clearTimeout(this.turnAdvanceTimeout);
      this.turnAdvanceTimeout = null;
    }
    this._stopTicker();
    if (window.audioCtrl) {
      window.audioCtrl.stop();
    }
    this._clearActiveHighlights();
    this._updatePlayButtonState(false);
    this._updateLiveSpeakerUI(null);
  }

  _startTicker() {
    this._stopTicker();
    this.timerInterval = setInterval(() => {
      if (!this.isPlaying) return;

      const currentTiming = this.turnTimings[this.currentTurnIndex];
      if (currentTiming) {
        // Progress elapsed time up to turn end while speaker is speaking
        // Turn advance is event-driven by onEnd callback, never prematurely forced by timer
        if (this.currentElapsed < currentTiming.end) {
          this.currentElapsed = Math.min(currentTiming.end, this.currentElapsed + 0.1);
          this._updateTimeDisplay();
        }
      }
    }, 100);
  }

  _stopTicker() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }

  _updateTimeDisplay() {
    if (this.seekbar) {
      this.seekbar.value = this.currentElapsed;
      const pct = (this.currentElapsed / Math.max(1, this.totalDuration)) * 100;
      this.seekbar.style.setProperty('--seek-progress', `${pct}%`);
    }
    if (this.currentTimeEl) {
      this.currentTimeEl.textContent = this._formatTime(this.currentElapsed);
    }
    if (this.totalTimeEl) {
      this.totalTimeEl.textContent = this._formatTime(this.totalDuration);
    }
  }

  _formatTime(seconds) {
    const s = Math.max(0, Math.floor(seconds));
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }

  _updatePlayButtonState(isPlaying) {
    if (!this.playBtn) return;
    if (this.audioDeck) {
      this.audioDeck.classList.toggle('is-playing', isPlaying);
    }

    if (isPlaying) {
      this.playBtn.classList.add('playing');
      this.playBtn.innerHTML = `<span class="play-icon">⏸</span><span class="btn-text">Tạm dừng</span>`;
    } else {
      this.playBtn.classList.remove('playing');
      this.playBtn.innerHTML = `<span class="play-icon">▶</span><span class="btn-text">Phát hội thoại</span>`;
    }
  }

  _updateLiveSpeakerUI(activeSpeakerKey, activeSpeakerName) {
    const badgeA = document.getElementById('char-badge-A');
    const badgeB = document.getElementById('char-badge-B');
    const tagA = document.getElementById('status-tag-A');
    const tagB = document.getElementById('status-tag-B');

    if (badgeA) badgeA.classList.remove('is-speaking');
    if (badgeB) badgeB.classList.remove('is-speaking');
    if (tagA) tagA.textContent = 'Sẵn sàng';
    if (tagB) tagB.textContent = 'Sẵn sàng';

    if (!activeSpeakerKey) {
      if (this.liveStatusText) {
        this.liveStatusText.textContent = this.isPaused ? 'Đang tạm dừng' : 'Sẵn sàng phát';
      }
      return;
    }

    if (activeSpeakerKey === 'A') {
      if (badgeA) badgeA.classList.add('is-speaking');
      if (tagA) tagA.textContent = '🎙️ Đang nói';
      if (tagB) tagB.textContent = '🎧 Lắng nghe';
    } else {
      if (badgeB) badgeB.classList.add('is-speaking');
      if (tagB) tagB.textContent = '🎙️ Đang nói';
      if (tagA) tagA.textContent = '🎧 Lắng nghe';
    }

    if (this.liveStatusText) {
      this.liveStatusText.textContent = `🎙️ ${activeSpeakerName || 'Nhân vật'} đang nói...`;
    }
  }

  seekTo(seconds, resumePlay = false) {
    if (this.turnAdvanceTimeout) {
      clearTimeout(this.turnAdvanceTimeout);
      this.turnAdvanceTimeout = null;
    }
    this._turnSequenceId++;

    const target = Math.max(0, Math.min(seconds, this.totalDuration));
    this.currentElapsed = target;

    // Find which turn corresponds to this timestamp
    const found = this.turnTimings.find(t => target >= t.start && target < t.end);
    const newTurnIndex = found ? found.index : (target >= this.totalDuration ? Math.max(0, this.turnTimings.length - 1) : 0);

    this._updateTimeDisplay();

    this.currentTurnIndex = newTurnIndex;
    this._highlightTurn(this.currentTurnIndex);

    if (this.isPlaying || resumePlay) {
      if (window.audioCtrl) {
        window.audioCtrl.stop();
      }
      this.isPlaying = true;
      this.isPaused = false;
      this._updatePlayButtonState(true);
      this._startTicker();
      this._playCurrentTurn();
    }
  }

  seekToTurn(turnIndex) {
    const timing = this.turnTimings[turnIndex];
    if (!timing) return;
    if (this.turnAdvanceTimeout) {
      clearTimeout(this.turnAdvanceTimeout);
      this.turnAdvanceTimeout = null;
    }
    this._turnSequenceId++;

    this.currentTurnIndex = turnIndex;
    this.currentElapsed = timing.start;
    this._updateTimeDisplay();
    this._highlightTurn(turnIndex);

    if (window.audioCtrl) {
      window.audioCtrl.stop();
    }
    this.isPlaying = true;
    this.isPaused = false;
    this._updatePlayButtonState(true);
    this._startTicker();
    this._playCurrentTurn();
  }

  skipTime(delta) {
    const target = this.currentElapsed + delta;
    this.seekTo(target, this.isPlaying);
  }

  setSpeed(rate) {
    this.playbackSpeed = rate;
    if (window.audioCtrl) {
      window.audioCtrl.setRate(rate);
    }
    const dialogue = this.getCurrentDialogue();
    if (dialogue) {
      this._calculateTimeline(dialogue);
      this._updateTimeDisplay();
    }
    if (this.isPlaying) {
      if (this.turnAdvanceTimeout) {
        clearTimeout(this.turnAdvanceTimeout);
        this.turnAdvanceTimeout = null;
      }
      this._turnSequenceId++;
      if (window.audioCtrl) {
        window.audioCtrl.stop();
      }
      this._playCurrentTurn();
    }
  }

  _highlightTurn(index) {
    this._clearActiveHighlights();
    const turnEl = document.getElementById(`dialogue-turn-${index}`);
    if (turnEl) {
      turnEl.classList.add('active-turn');
      if (this.autoScroll) {
        turnEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }
  }

  _clearActiveHighlights() {
    const turns = this.dialogueStream ? this.dialogueStream.querySelectorAll('.dialogue-turn') : [];
    turns.forEach(t => t.classList.remove('active-turn'));
  }

  _playCurrentTurn() {
    if (!this.isPlaying) return;
    const dialogue = this.getCurrentDialogue();
    if (!dialogue || !dialogue.turns[this.currentTurnIndex]) {
      this.stopAudio();
      return;
    }

    const currentTurnIdx = this.currentTurnIndex;
    const turn = dialogue.turns[currentTurnIdx];
    const timing = this.turnTimings[currentTurnIdx];

    this._turnSequenceId++;
    const currentSeq = this._turnSequenceId;

    this._highlightTurn(currentTurnIdx);

    const isA = turn.speaker === 'A';
    const speakerMeta = isA ? dialogue.speakerA : dialogue.speakerB;

    this._updateLiveSpeakerUI(turn.speaker, speakerMeta.name);

    if (timing && this.currentElapsed < timing.start) {
      this.currentElapsed = timing.start;
      this._updateTimeDisplay();
    }

    if (window.audioCtrl) {
      const voiceGender = speakerMeta.voice || (turn.speaker === 'A' ? 'female' : 'male');
      window.audioCtrl.speak(turn.text, () => {
        // This callback only fires when the current turn has FULLY finished reading!
        if (!this.isPlaying || this._turnSequenceId !== currentSeq || this.currentTurnIndex !== currentTurnIdx) {
          return;
        }

        // Align current elapsed to end of this turn
        if (timing) {
          this.currentElapsed = timing.end;
          this._updateTimeDisplay();
        }

        // Check if there is a next turn
        if (currentTurnIdx < dialogue.turns.length - 1) {
          // Natural conversational pause between speakers (550ms)
          this._updateLiveSpeakerUI(null);
          this.turnAdvanceTimeout = setTimeout(() => {
            if (!this.isPlaying || this._turnSequenceId !== currentSeq || this.currentTurnIndex !== currentTurnIdx) {
              return;
            }
            this.currentTurnIndex++;
            const nextTiming = this.turnTimings[this.currentTurnIndex];
            if (nextTiming) {
              this.currentElapsed = nextTiming.start;
              this._updateTimeDisplay();
            }
            this._playCurrentTurn();
          }, 550);
        } else {
          // Finished all turns!
          this.currentElapsed = this.totalDuration;
          this._updateTimeDisplay();
          this.stopAudio();
          if (this.liveStatusText) {
            this.liveStatusText.textContent = '🎉 Đã nghe xong toàn bộ hội thoại!';
          }
        }
      }, {
        gender: voiceGender,
        rate: this.playbackSpeed
      });
    }
  }

  playSingleTurn(turnIndex) {
    const dialogue = this.getCurrentDialogue();
    if (!dialogue || !dialogue.turns[turnIndex]) return;

    if (this.isPlaying) {
      this.pause();
    }

    if (this.turnAdvanceTimeout) {
      clearTimeout(this.turnAdvanceTimeout);
      this.turnAdvanceTimeout = null;
    }
    this._turnSequenceId++;
    const currentSeq = this._turnSequenceId;

    const turn = dialogue.turns[turnIndex];
    this.currentTurnIndex = turnIndex;
    const timing = this.turnTimings[turnIndex];
    if (timing) {
      this.currentElapsed = timing.start;
      this._updateTimeDisplay();
    }

    this._highlightTurn(turnIndex);

    const isA = turn.speaker === 'A';
    const speakerMeta = isA ? dialogue.speakerA : dialogue.speakerB;

    this._updateLiveSpeakerUI(turn.speaker, speakerMeta.name);

    if (window.audioCtrl) {
      const voiceGender = speakerMeta.voice || (turn.speaker === 'A' ? 'female' : 'male');
      window.audioCtrl.speak(turn.text, () => {
        if (!this.isPlaying && this._turnSequenceId === currentSeq) {
          this._updateLiveSpeakerUI(null);
        }
      }, {
        gender: voiceGender,
        rate: this.playbackSpeed
      });
    }
  }

  _escapeHtml(str) {
    if (!str) return '';
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }
}

window.listeningView = new ListeningViewController();
