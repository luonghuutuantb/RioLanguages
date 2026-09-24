/**
 * EngMaster Quiz & Practice Arena Module
 * 4 Interactive Modes: Multiple Choice, Dictation, Sentence Builder, and AI Pronunciation
 */

class QuizController {
  constructor() {
    this.modeTabs = document.querySelectorAll('.quiz-tab-btn');
    this.dataSourceSelect = document.getElementById('quiz-data-source');
    this.lengthSelect = document.getElementById('quiz-length');
    this.startBtn = document.getElementById('btn-start-quiz');
    this.streakCountEl = document.getElementById('quiz-streak-count');

    // Subviews
    this.subviewMC = document.getElementById('quiz-subview-mc');
    this.subviewDict = document.getElementById('quiz-subview-dictation');
    this.subviewBuilder = document.getElementById('quiz-subview-builder');
    this.subviewSpeaking = document.getElementById('quiz-subview-speaking');
    this.summaryScreen = document.getElementById('quiz-summary');

    // MC Elements
    this.mcQCurrent = document.getElementById('mc-q-current');
    this.mcQTotal = document.getElementById('mc-q-total');
    this.mcQuestionWord = document.getElementById('mc-question-word');
    this.mcQuestionIpa = document.getElementById('mc-question-ipa');
    this.mcQuestionAudio = document.getElementById('mc-question-audio');
    this.mcAnswersGrid = document.getElementById('mc-answers-grid');
    this.mcFeedback = document.getElementById('mc-feedback');
    this.mcFeedbackIcon = document.getElementById('mc-feedback-icon');
    this.mcFeedbackTitle = document.getElementById('mc-feedback-title');
    this.mcFeedbackDetail = document.getElementById('mc-feedback-detail');
    this.mcNextBtn = document.getElementById('mc-next-btn');

    // Dictation Elements
    this.dictQCurrent = document.getElementById('dict-q-current');
    this.dictQTotal = document.getElementById('dict-q-total');
    this.dictAudioBtn = document.getElementById('dict-audio-btn');
    this.dictHintText = document.getElementById('dict-hint-text');
    this.dictInput = document.getElementById('dict-input');
    this.dictSubmitBtn = document.getElementById('dict-submit-btn');
    this.dictResult = document.getElementById('dict-result');

    // Sentence Builder Elements
    this.sbQCurrent = document.getElementById('sb-q-current');
    this.sbQTotal = document.getElementById('sb-q-total');
    this.sbTargetVi = document.getElementById('sb-target-vi');
    this.sbDropzone = document.getElementById('sb-dropzone');
    this.sbWordbank = document.getElementById('sb-wordbank');
    this.sbResetBtn = document.getElementById('sb-reset-btn');
    this.sbCheckBtn = document.getElementById('sb-check-btn');
    this.sbFeedback = document.getElementById('sb-feedback');

    // Speaking Elements (new split-screen UI)
    this.spkTargetWord = document.getElementById('spk-target-word');
    this.spkIpaBadge   = document.getElementById('spk-ipa-badge');
    this.spkTargetVi   = document.getElementById('spk-target-vi');
    this.spkQCurrent   = document.getElementById('spk-q-current');
    this.spkQTotal     = document.getElementById('spk-q-total');
    this.spkSampleBtn  = document.getElementById('spk-sample-btn');
    this.spkBigMicBtn  = document.getElementById('spk-big-mic-btn');
    this.spkWaveBars   = document.getElementById('spk-wave-bars');
    this.spkMicHint    = document.getElementById('spk-mic-hint');
    this.spkMicZone    = document.getElementById('spk-mic-zone');
    this.spkResultPanel = document.getElementById('spk-result-panel');
    this.spkScoreFill  = document.getElementById('spk-score-fill');
    this.spkScoreRingVal = document.getElementById('spk-score-ring-val');
    this.spkTranscriptVal = document.getElementById('spk-transcript-val');
    this.spkEvalMsg    = document.getElementById('spk-eval-msg');
    this.spkRetryBtn   = document.getElementById('spk-retry-btn');
    this.spkAdvanceBtn = document.getElementById('spk-advance-btn');
    this.spkAttemptsRow = document.getElementById('spk-attempts-row');
    this.spkSpeedChips = document.querySelectorAll('.spk-speed-chip');
    this._spkRate      = 1.0;   // local rate for speaking panel
    this._spkAttempts  = [];    // attempt scores for current item

    // Summary Elements
    this.summaryScore = document.getElementById('summary-score');
    this.summaryAccuracy = document.getElementById('summary-accuracy');
    this.summaryXp = document.getElementById('summary-xp');
    this.summaryPlayAgainBtn = document.getElementById('summary-play-again-btn');

    this.currentMode = 'mc'; // 'mc', 'dictation', 'builder', 'speaking'
    this.questions = [];
    this.currentIndex = 0;
    this.score = 0;
    this.consecutiveStreak = 0;
    this.builderCurrentWords = [];

    this._initEvents();
  }

  init() {
    this.startSession();
  }

  _initEvents() {
    // Mode Switching
    this.modeTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        this.modeTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        this.currentMode = tab.dataset.mode;
        this.startSession();
      });
    });

    this.startBtn.addEventListener('click', () => this.startSession());
    this.summaryPlayAgainBtn.addEventListener('click', () => this.startSession());

    // MC Audio & Next
    this.mcQuestionAudio.addEventListener('click', () => {
      const q = this.questions[this.currentIndex];
      if (q) window.audioCtrl.speak(q.en);
    });

    this.mcNextBtn.addEventListener('click', () => {
      this.nextQuestion();
    });

    // Keyboard Shortcuts 1, 2, 3, 4 for MC
    document.addEventListener('keydown', (e) => {
      if (this.currentMode !== 'mc') return;
      const quizView = document.getElementById('view-quiz');
      if (!quizView || !quizView.classList.contains('active')) return;
      if (document.activeElement.tagName === 'INPUT') return;

      const keys = ['1', '2', '3', '4'];
      const idx = keys.indexOf(e.key);
      if (idx !== -1) {
        const btns = this.mcAnswersGrid.querySelectorAll('.quiz-choice-btn');
        if (btns[idx] && !btns[idx].disabled) {
          btns[idx].click();
        }
      }
    });

    // Dictation Listen & Submit
    this.dictAudioBtn.addEventListener('click', () => {
      const q = this.questions[this.currentIndex];
      if (q) window.audioCtrl.speak(q.en);
    });

    this.dictSubmitBtn.addEventListener('click', () => this._checkDictation());
    this.dictInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') this._checkDictation();
    });

    // Sentence Builder Actions
    this.sbResetBtn.addEventListener('click', () => this._resetBuilderWords());
    this.sbCheckBtn.addEventListener('click', () => this._checkBuilderSentence());

    // Speaking – sample audio
    if (this.spkSampleBtn) {
      this.spkSampleBtn.addEventListener('click', () => {
        const q = this.questions[this.currentIndex];
        if (!q) return;
        this.spkSampleBtn.classList.add('playing');
        window.audioCtrl.speak(q.en, () => this.spkSampleBtn.classList.remove('playing'), { rate: this._spkRate });
      });
    }

    // Speaking – big mic button
    if (this.spkBigMicBtn) {
      this.spkBigMicBtn.addEventListener('click', () => this._toggleSplitMic());
    }

    // Speaking – retry / next
    if (this.spkRetryBtn) {
      this.spkRetryBtn.addEventListener('click', () => this._resetToMicState());
    }
    if (this.spkAdvanceBtn) {
      this.spkAdvanceBtn.addEventListener('click', () => this.nextQuestion());
    }

    // Speaking – speed chips
    this.spkSpeedChips.forEach(chip => {
      chip.addEventListener('click', () => {
        this.spkSpeedChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        this._spkRate = parseFloat(chip.dataset.spkRate) || 1.0;
      });
    });

  }

  startWithCustomSet(items, source) {
    this.dataSourceSelect.value = source;
    this.startSession(items);
  }

  startSpeakingWithItem(item) {
    this.currentMode = 'speaking';
    this.modeTabs.forEach(t => t.classList.toggle('active', t.dataset.mode === 'speaking'));
    this.questions = [item];
    this.currentIndex = 0;
    this.score = 0;
    this._spkAttempts = [];
    this._showSubview('speaking');
    this._renderSpeaking();
  }

  startSession(customPool = null) {
    this.summaryScreen.style.display = 'none';
    this.currentIndex = 0;
    this.score = 0;

    let pool = customPool || this._getQuestionPool();
    if (pool.length === 0) {
      window.app.showToast('Không có dữ liệu đủ để tạo câu hỏi.', 'warn');
      return;
    }

    const length = parseInt(this.lengthSelect.value, 10) || 10;
    this.questions = this._shuffle(pool).slice(0, length);

    this._showSubview(this.currentMode);
    this.renderCurrentQuestion();
  }

  _getQuestionPool() {
    const src = this.dataSourceSelect.value;
    const vocab = window.VOCAB_DATA || [];
    const sentences = window.SENTENCES_DATA || [];

    if (src === 'vocab') {
      return vocab.map(v => ({
        en: v.word,
        ipa: v.ipa,
        vi: v.vi,
        example_en: v.en_example,
        example_vi: v.vi_example,
        type: v.type,
        _key: `v_${v.id}`
      }));
    } else if (src === 'sentences') {
      return sentences.map(s => ({
        en: s.en,
        ipa: s.situation || '',
        vi: s.vi,
        example_en: '',
        example_vi: '',
        type: 'câu giao tiếp',
        _key: `s_${s.id}`
      }));
    } else if (src === 'bookmarked') {
      const vMarked = vocab.filter(v => window.storage.isBookmarked(`v_${v.id}`)).map(v => ({
        en: v.word, ipa: v.ipa, vi: v.vi, _key: `v_${v.id}`
      }));
      const sMarked = sentences.filter(s => window.storage.isBookmarked(`s_${s.id}`)).map(s => ({
        en: s.en, ipa: '', vi: s.vi, _key: `s_${s.id}`
      }));
      return [...vMarked, ...sMarked];
    } else {
      // Mixed
      const vList = vocab.map(v => ({ en: v.word, ipa: v.ipa, vi: v.vi, _key: `v_${v.id}` }));
      const sList = sentences.map(s => ({ en: s.en, ipa: '', vi: s.vi, _key: `s_${s.id}` }));
      return [...vList, ...sList];
    }
  }

  _shuffle(arr) {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  _showSubview(mode) {
    this.subviewMC.style.display = (mode === 'mc') ? 'block' : 'none';
    this.subviewDict.style.display = (mode === 'dictation') ? 'block' : 'none';
    this.subviewBuilder.style.display = (mode === 'builder') ? 'block' : 'none';
    this.subviewSpeaking.style.display = (mode === 'speaking') ? 'block' : 'none';
  }

  renderCurrentQuestion() {
    if (this.currentIndex >= this.questions.length) {
      this.showSummary();
      return;
    }

    if (this.currentMode === 'mc') this._renderMC();
    else if (this.currentMode === 'dictation') this._renderDictation();
    else if (this.currentMode === 'builder') this._renderBuilder();
    else if (this.currentMode === 'speaking') this._renderSpeaking();
  }

  // ==================== MODE 1: MULTIPLE CHOICE ====================
  _renderMC() {
    const q = this.questions[this.currentIndex];
    const total = this.questions.length;

    this.mcQCurrent.textContent = this.currentIndex + 1;
    this.mcQTotal.textContent = total;
    this.mcQuestionWord.textContent = q.en;
    this.mcQuestionIpa.textContent = q.ipa ? `${q.ipa} • ${q.type || ''}` : '';
    // Auto speak question only if user is actively in quiz tab
    const isQuizActive = window.app && window.app.currentTab === 'quiz';
    if (isQuizActive && window.audioCtrl) {
      window.audioCtrl.speak(q.en);
    }

    // Generate 3 distractors
    const pool = this._getQuestionPool().filter(item => item.vi !== q.vi);
    const shuffledPool = this._shuffle(pool).slice(0, 3);
    const choices = this._shuffle([q.vi, ...shuffledPool.map(p => p.vi)]);

    const letters = ['A', 'B', 'C', 'D'];
    this.mcAnswersGrid.innerHTML = choices.map((choice, idx) => `
      <button class="quiz-choice-btn" data-answer="${this._escapeHtml(choice)}">
        <span class="quiz-choice-key">${letters[idx]}</span>
        <span>${this._escapeHtml(choice)}</span>
      </button>
    `).join('');

    const btns = this.mcAnswersGrid.querySelectorAll('.quiz-choice-btn');
    btns.forEach(btn => {
      btn.addEventListener('click', () => {
        btns.forEach(b => b.disabled = true);
        const selected = btn.dataset.answer;
        const isCorrect = (selected === q.vi);

        if (isCorrect) {
          btn.classList.add('correct');
          this.score++;
          this.consecutiveStreak++;
          this.streakCountEl.textContent = this.consecutiveStreak;
          window.storage.addXP(10);
          this.mcFeedbackIcon.className = 'feedback-icon';
          this.mcFeedbackIcon.textContent = '✓';
          this.mcFeedbackTitle.textContent = 'Chính xác! (+10 XP)';
          this.mcFeedbackDetail.textContent = q.example_en ? `"${q.example_en}"` : '';
        } else {
          btn.classList.add('wrong');
          this.consecutiveStreak = 0;
          this.streakCountEl.textContent = 0;
          // Highlight correct one
          btns.forEach(b => {
            if (b.dataset.answer === q.vi) b.classList.add('correct');
          });
          this.mcFeedbackIcon.className = 'feedback-icon wrong';
          this.mcFeedbackIcon.textContent = '✕';
          this.mcFeedbackTitle.textContent = 'Chưa chính xác!';
          this.mcFeedbackDetail.textContent = `Đáp án đúng là: "${q.vi}"`;
        }

        this.mcFeedback.style.display = 'flex';
      });
    });
  }

  // ==================== MODE 2: DICTATION ====================
  _renderDictation() {
    const q = this.questions[this.currentIndex];
    this.dictQCurrent.textContent = this.currentIndex + 1;
    this.dictQTotal.textContent = this.questions.length;
    this.dictHintText.textContent = `Gợi ý nghĩa: ${q.vi}`;
    this.dictInput.value = '';
    this.dictInput.disabled = false;
    this.dictSubmitBtn.disabled = false;
    this.dictResult.style.display = 'none';

    const isQuizActive = window.app && window.app.currentTab === 'quiz';
    if (isQuizActive && window.audioCtrl) {
      window.audioCtrl.speak(q.en);
    }
    this.dictInput.focus();
  }

  _checkDictation() {
    const q = this.questions[this.currentIndex];
    const userText = this.dictInput.value.trim().toLowerCase();
    const targetText = q.en.trim().toLowerCase();

    this.dictInput.disabled = true;
    this.dictSubmitBtn.disabled = true;
    this.dictResult.style.display = 'block';

    const isMatch = (userText === targetText);

    if (isMatch) {
      this.score++;
      this.consecutiveStreak++;
      this.streakCountEl.textContent = this.consecutiveStreak;
      window.storage.addXP(15);
      this.dictResult.style.background = 'rgba(16, 185, 129, 0.2)';
      this.dictResult.style.color = '#34d399';
      this.dictResult.innerHTML = `✓ Tuyệt vời! Bạn đã gõ hoàn toàn chính xác: <strong>"${q.en}"</strong> (+15 XP)`;
    } else {
      this.consecutiveStreak = 0;
      this.streakCountEl.textContent = 0;
      this.dictResult.style.background = 'rgba(244, 63, 94, 0.2)';
      this.dictResult.style.color = '#fb7185';
      this.dictResult.innerHTML = `✕ Chưa đúng. Câu chuẩn là: <strong>"${q.en}"</strong>`;
    }

    setTimeout(() => {
      this.nextQuestion();
    }, 1800);
  }

  // ==================== MODE 3: SENTENCE BUILDER ====================
  _renderBuilder() {
    const q = this.questions[this.currentIndex];
    this.sbQCurrent.textContent = this.currentIndex + 1;
    this.sbQTotal.textContent = this.questions.length;
    this.sbTargetVi.textContent = `"${q.vi}"`;
    this.sbDropzone.innerHTML = '';
    this.sbFeedback.style.display = 'none';
    this.builderCurrentWords = [];

    // Split target English into words
    const words = q.en.replace(/[.,?!"]/g, '').split(/\s+/).filter(Boolean);
    const scrambled = this._shuffle(words);

    this.sbWordbank.innerHTML = scrambled.map((w, idx) => `
      <div class="word-chip" data-word="${this._escapeHtml(w)}" data-bank-idx="${idx}">
        ${this._escapeHtml(w)}
      </div>
    `).join('');

    // Click bank word to move to dropzone
    const bankChips = this.sbWordbank.querySelectorAll('.word-chip');
    bankChips.forEach(chip => {
      chip.addEventListener('click', () => {
        const word = chip.dataset.word;
        chip.style.visibility = 'hidden';
        this.builderCurrentWords.push({ word, chipRef: chip });
        this._renderDropzone();
      });
    });
  }

  _renderDropzone() {
    this.sbDropzone.innerHTML = this.builderCurrentWords.map((item, idx) => `
      <div class="word-chip" data-dz-idx="${idx}">
        ${this._escapeHtml(item.word)} ✕
      </div>
    `).join('');

    const dzChips = this.sbDropzone.querySelectorAll('.word-chip');
    dzChips.forEach(chip => {
      chip.addEventListener('click', () => {
        const idx = parseInt(chip.dataset.dzIdx, 10);
        const removed = this.builderCurrentWords.splice(idx, 1)[0];
        if (removed && removed.chipRef) removed.chipRef.style.visibility = 'visible';
        this._renderDropzone();
      });
    });
  }

  _resetBuilderWords() {
    this.builderCurrentWords.forEach(item => {
      if (item.chipRef) item.chipRef.style.visibility = 'visible';
    });
    this.builderCurrentWords = [];
    this._renderDropzone();
    this.sbFeedback.style.display = 'none';
  }

  _checkBuilderSentence() {
    const q = this.questions[this.currentIndex];
    const userSentence = this.builderCurrentWords.map(i => i.word).join(' ').toLowerCase();
    const cleanTarget = q.en.replace(/[.,?!"]/g, '').trim().toLowerCase();

    this.sbFeedback.style.display = 'block';

    if (userSentence === cleanTarget) {
      this.score++;
      this.consecutiveStreak++;
      this.streakCountEl.textContent = this.consecutiveStreak;
      window.storage.addXP(15);
      this.sbFeedback.style.color = '#34d399';
      this.sbFeedback.innerHTML = `✓ Hoàn hảo! "${q.en}" (+15 XP)`;
      window.audioCtrl.speak(q.en);
      setTimeout(() => this.nextQuestion(), 1600);
    } else {
      this.consecutiveStreak = 0;
      this.streakCountEl.textContent = 0;
      this.sbFeedback.style.color = '#fb7185';
      this.sbFeedback.innerHTML = `✕ Thứ tự chưa chuẩn. Hãy thử xếp lại hoặc bấm "Làm lại".`;
    }
  }

  // ==================== MODE 4: SPEAKING (SPLIT SCREEN) ====================
  _renderSpeaking() {
    const q = this.questions[this.currentIndex];
    if (!q) return;

    // Update progress counter
    if (this.spkQCurrent) this.spkQCurrent.textContent = this.currentIndex + 1;
    if (this.spkQTotal)   this.spkQTotal.textContent   = this.questions.length;

    // Fill left panel
    this.spkTargetWord.textContent = q.en;
    this.spkIpaBadge.textContent   = q.ipa || '';
    this.spkTargetVi.textContent   = q.vi  || '';

    // Reset attempts for this question
    this._spkAttempts = [];
    if (this.spkAttemptsRow) this.spkAttemptsRow.innerHTML = '';

    // Reset right panel to mic state
    this._resetToMicState();

    // Auto-play sample on load
    const isQuizActive = window.app && window.app.currentTab === 'quiz';
    if (isQuizActive && window.audioCtrl) {
      setTimeout(() => window.audioCtrl.speak(q.en, null, { rate: this._spkRate }), 400);
    }
  }

  _resetToMicState() {
    // Show mic zone, hide result panel
    if (this.spkMicZone)    this.spkMicZone.style.display    = 'flex';
    if (this.spkResultPanel) this.spkResultPanel.classList.remove('visible');
    if (this.spkWaveBars)   this.spkWaveBars.classList.remove('active');
    if (this.spkBigMicBtn)  this.spkBigMicBtn.classList.remove('recording');
    if (this.spkMicHint)    this.spkMicHint.textContent = 'Nhấn nút micro và đọc to câu bên trái';
  }

  _toggleSplitMic() {
    const q = this.questions[this.currentIndex];
    if (!q) return;

    if (this.spkBigMicBtn.classList.contains('recording')) {
      // Stop recording
      window.audioCtrl.stopListening();
      this.spkBigMicBtn.classList.remove('recording');
      this.spkWaveBars.classList.remove('active');
      this.spkMicHint.textContent = 'Đã dừng ghi âm. Nhấn lại để thử.';
      return;
    }

    // Start recording
    this.spkBigMicBtn.classList.add('recording');
    this.spkWaveBars.classList.add('active');
    this.spkMicHint.textContent = 'Đang lắng nghe giọng bạn...';

    window.audioCtrl.startListening(
      q.en,
      (res) => {
        this.spkBigMicBtn.classList.remove('recording');
        this.spkWaveBars.classList.remove('active');
        this._showSpeakingResult(res, q);
      },
      (err) => {
        this.spkBigMicBtn.classList.remove('recording');
        this.spkWaveBars.classList.remove('active');
        this.spkMicHint.textContent = err;
        window.app && window.app.showToast(err, 'warn');
      }
    );
  }

  _showSpeakingResult(res, q) {
    const score = res.similarity; // 0–100
    this._spkAttempts.push(score);

    // Score ring animation (stroke-dasharray = 245, circumference ~ 245)
    const circumference = 245;
    const offset = circumference - (score / 100) * circumference;
    const fill = this.spkScoreFill;
    if (fill) {
      fill.style.strokeDashoffset = offset;
      if (score >= 80)      fill.style.stroke = '#10b981';
      else if (score >= 50) fill.style.stroke = '#f59e0b';
      else                  fill.style.stroke = '#f43f5e';
    }
    if (this.spkScoreRingVal) this.spkScoreRingVal.textContent = `${score}%`;

    // Transcript
    if (this.spkTranscriptVal) this.spkTranscriptVal.textContent = `"${res.transcript}"`;

    // Eval message
    const msg = this.spkEvalMsg;
    if (msg) {
      msg.className = 'spk-eval-msg';
      if (score >= 80) {
        this.score++;
        this.consecutiveStreak++;
        if (this.streakCountEl) this.streakCountEl.textContent = this.consecutiveStreak;
        window.storage.addXP(20);
        msg.classList.add('great');
        msg.textContent = `🎉 Xuất sắc! Phát âm rất chuẩn xác. (+20 XP)`;
      } else if (score >= 50) {
        this.consecutiveStreak = 0;
        if (this.streakCountEl) this.streakCountEl.textContent = 0;
        msg.classList.add('good');
        msg.textContent = `👍 Khá tốt! Chú ý ngữ điệu và các âm cuối câu hơn nhé.`;
      } else {
        this.consecutiveStreak = 0;
        if (this.streakCountEl) this.streakCountEl.textContent = 0;
        msg.classList.add('poor');
        msg.textContent = `🔄 Chưa nhận rõ. Nghe lại giọng mẫu và thử lại nhé!`;
      }
    }

    // Add attempt chip to history row
    if (this.spkAttemptsRow) {
      const chip = document.createElement('div');
      chip.className = `spk-attempt-chip ${score >= 80 ? 'great' : score >= 50 ? 'good' : 'poor'}`;
      chip.textContent = `#${this._spkAttempts.length}: ${score}%`;
      this.spkAttemptsRow.appendChild(chip);
    }

    // Show result panel
    if (this.spkMicZone) this.spkMicZone.style.display = 'none';
    if (this.spkResultPanel) this.spkResultPanel.classList.add('visible');
  }

  // ========== Legacy method alias for backward compat ===========
  _toggleMicRecording() { this._toggleSplitMic(); }
  _renderSpeakingLegacy() { this._renderSpeaking(); }

  nextQuestion() {
    this.currentIndex++;
    this.renderCurrentQuestion();
  }

  showSummary() {
    this._showSubview('');
    this.summaryScreen.style.display = 'block';

    const total = this.questions.length;
    const accuracy = total > 0 ? Math.round((this.score / total) * 100) : 0;
    const xpGained = this.score * 10;

    this.summaryScore.textContent = `${this.score}/${total}`;
    this.summaryAccuracy.textContent = `${accuracy}%`;
    this.summaryXp.textContent = `+${xpGained} XP`;

    window.storage.stats.quizzesCompleted += 1;
    window.storage.saveStats();
    window.app.updateHeaderStats();
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

window.quizCtrl = new QuizController();
