/**
 * EngMaster Grammar View Module
 * Manages 16 Comprehensive English Grammar Topics & Interactive Pedagogical Quizzes
 */

class GrammarViewController {
  constructor() {
    this.topicsGrid = document.getElementById('grammar-topics-grid');
    this.searchInput = document.getElementById('grammar-search-input');
    this.clearSearchBtn = document.getElementById('grammar-clear-search');
    this.levelFilter = document.getElementById('grammar-level-filter');
    this.filteredCountEl = document.getElementById('grammar-filtered-count');
    this.quizRunnerModal = document.getElementById('grammar-quiz-modal');
    this.readerModal = document.getElementById('grammar-reader-modal');

    this.activeTopic = null;
    this.quizQuestions = [];
    this.currentQuizIndex = 0;
    this.quizScore = 0;
    this.quizSelectedAnswer = null;
    this.isMixedQuiz = false;

    this._initEvents();
  }

  init() {
    this.renderTopics();
    this.updateProgressSummary();
  }

  getTopics() {
    return window.GRAMMAR_DATA || [];
  }

  _initEvents() {
    if (this.searchInput) {
      let debounce;
      this.searchInput.addEventListener('input', () => {
        clearTimeout(debounce);
        debounce = setTimeout(() => this.renderTopics(), 200);
      });
    }

    if (this.clearSearchBtn) {
      this.clearSearchBtn.addEventListener('click', () => {
        if (this.searchInput) this.searchInput.value = '';
        this.renderTopics();
      });
    }

    if (this.levelFilter) {
      this.levelFilter.addEventListener('change', () => this.renderTopics());
    }

    // Comprehensive Quiz Button
    const mixedTestBtn = document.getElementById('grammar-mixed-quiz-btn');
    if (mixedTestBtn) {
      mixedTestBtn.addEventListener('click', () => this.startComprehensiveQuiz());
    }

    // Modal close listeners
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeReader();
        this.closeQuiz();
      }
    });
  }

  renderTopics() {
    if (!this.topicsGrid) return;

    const query = (this.searchInput?.value || '').trim().toLowerCase();
    const selectedLevel = this.levelFilter?.value || 'all';

    const allTopics = this.getTopics();
    const scores = this.getSavedScores();

    const filtered = allTopics.filter(t => {
      // Level filter
      if (selectedLevel !== 'all') {
        if (!t.level.toLowerCase().includes(selectedLevel.toLowerCase())) {
          return false;
        }
      }

      // Search query
      if (query) {
        const text = `${t.title} ${t.subtitle} ${t.summary}`.toLowerCase();
        return text.includes(query);
      }
      return true;
    });

    if (this.filteredCountEl) {
      this.filteredCountEl.textContent = `${filtered.length} / 16`;
    }

    if (filtered.length === 0) {
      this.topicsGrid.innerHTML = `
        <div class="empty-state-box" style="grid-column: 1 / -1; padding: 48px; text-align: center;">
          <div style="font-size: 3rem; margin-bottom: 12px;">🔍</div>
          <h3 style="margin-bottom: 8px;">Không tìm thấy chuyên đề ngữ pháp phù hợp</h3>
          <p style="color: var(--text-muted);">Vui lòng thử từ khóa khác hoặc điều chỉnh bộ lọc trình độ.</p>
        </div>
      `;
      return;
    }

    this.topicsGrid.innerHTML = filtered.map(topic => {
      const topicScore = scores[topic.id] || null;
      let scoreBadge = `<span class="score-pill not-tested">Chưa kiểm tra</span>`;
      if (topicScore) {
        const pct = Math.round((topicScore.score / topicScore.total) * 100);
        const badgeClass = pct >= 80 ? 'high' : (pct >= 50 ? 'med' : 'low');
        scoreBadge = `<span class="score-pill ${badgeClass}">Điểm: ${topicScore.score}/${topicScore.total} (${pct}%)</span>`;
      }

      const qCount = topic.quiz ? topic.quiz.length : 0;
      const numFormatted = String(topic.id).padStart(2, '0');

      return `
        <div class="grammar-card" data-id="${topic.id}">
          <div class="grammar-card-header">
            <div class="grammar-header-meta">
              <span class="grammar-topic-num">CHUYÊN ĐỀ ${numFormatted}</span>
              <span class="grammar-level-tag">${topic.level}</span>
            </div>
            <div class="grammar-icon-box">${topic.icon || '📖'}</div>
          </div>

          <div class="grammar-card-body">
            <h3 class="grammar-title">${topic.title}</h3>
            <div class="grammar-subtitle">${topic.subtitle}</div>
            <p class="grammar-desc">${topic.summary}</p>

            <div class="grammar-card-footer-info">
              <span class="grammar-meta-item">⏱️ ${topic.readTime || '12 phút'}</span>
              <span class="grammar-meta-item">🎯 ${qCount} câu hỏi</span>
              ${scoreBadge}
            </div>
          </div>

          <div class="grammar-card-actions">
            <button class="grammar-btn grammar-btn-read" onclick="grammarView.openReader(${topic.id})">
              📖 Đọc lý thuyết & công thức
            </button>
            <button class="grammar-btn grammar-btn-quiz" onclick="grammarView.startTopicQuiz(${topic.id})">
              ✏️ Làm bài test (${qCount} câu)
            </button>
          </div>
        </div>
      `;
    }).join('');
  }

  // ==================== READER MODAL ====================
  openReader(topicId) {
    const topic = this.getTopics().find(t => t.id === topicId);
    if (!topic || !this.readerModal) return;

    this.activeTopic = topic;

    const modalTitle = document.getElementById('grammar-reader-title');
    const modalMeta = document.getElementById('grammar-reader-meta');
    const modalBody = document.getElementById('grammar-reader-body');
    const modalStartQuizBtn = document.getElementById('grammar-reader-start-quiz');

    if (modalTitle) {
      modalTitle.innerHTML = `<span style="color: var(--primary-accent); margin-right: 8px;">#${String(topic.id).padStart(2, '0')}</span> ${topic.title}`;
    }

    if (modalMeta) {
      modalMeta.innerHTML = `
        <span class="tag-pill">${topic.level}</span>
        <span class="tag-pill">⏱️ Thời lượng đọc: ${topic.readTime || '12 phút'}</span>
        <span class="tag-pill">✏️ ${topic.quiz?.length || 0} câu hỏi trắc nghiệm</span>
      `;
    }

    if (modalBody) {
      const sectionsHtml = (topic.sections || []).map(sec => `
        <div class="grammar-theory-section">
          <h3 class="theory-heading">${sec.heading}</h3>
          <div class="theory-body">${sec.body}</div>
        </div>
      `).join('');

      modalBody.innerHTML = `
        <div class="grammar-reader-intro">
          <div class="reader-overview-icon">${topic.icon}</div>
          <div class="reader-overview-content">
            <h4>Tổng quan chuyên đề</h4>
            <p>${topic.summary}</p>
          </div>
        </div>
        <div class="grammar-theory-sections-list">
          ${sectionsHtml}
        </div>
      `;
    }

    if (modalStartQuizBtn) {
      modalStartQuizBtn.onclick = () => {
        this.closeReader();
        this.startTopicQuiz(topicId);
      };
    }

    this.readerModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    modalBody.scrollTop = 0;
  }

  closeReader() {
    if (!this.readerModal) return;
    this.readerModal.style.display = 'none';
    document.body.style.overflow = '';
  }

  // ==================== QUIZ ENGINE ====================
  startTopicQuiz(topicId) {
    const topic = this.getTopics().find(t => t.id === topicId);
    if (!topic || !topic.quiz || topic.quiz.length === 0) {
      if (window.app) window.app.showToast('Chuyên đề này chưa có bộ câu hỏi kiểm tra.');
      return;
    }

    this.isMixedQuiz = false;
    this.activeTopic = topic;
    this.quizQuestions = [...topic.quiz];
    this.currentQuizIndex = 0;
    this.quizScore = 0;
    this.quizSelectedAnswer = null;

    this.openQuizModal();
    this.renderQuestion();
  }

  startComprehensiveQuiz() {
    const allTopics = this.getTopics();
    let pool = [];
    allTopics.forEach(t => {
      if (t.quiz) {
        t.quiz.forEach(q => {
          pool.push({
            ...q,
            topicTitle: t.title,
            topicId: t.id
          });
        });
      }
    });

    if (pool.length === 0) {
      if (window.app) window.app.showToast('Chưa có câu hỏi trong ngân hàng đề.');
      return;
    }

    // Shuffle and pick 20 questions
    pool = pool.sort(() => 0.5 - Math.random());
    this.quizQuestions = pool.slice(0, 20);

    this.isMixedQuiz = true;
    this.activeTopic = {
      id: 0,
      title: 'Đấu Trường Ngữ Pháp Tổng Hợp (20 Câu)',
      icon: '🎯'
    };
    this.currentQuizIndex = 0;
    this.quizScore = 0;
    this.quizSelectedAnswer = null;

    this.openQuizModal();
    this.renderQuestion();
  }

  openQuizModal() {
    if (!this.quizRunnerModal) return;
    this.quizRunnerModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }

  closeQuiz() {
    if (!this.quizRunnerModal) return;
    this.quizRunnerModal.style.display = 'none';
    document.body.style.overflow = '';
  }

  renderQuestion() {
    const container = document.getElementById('grammar-quiz-card-content');
    if (!container) return;

    const q = this.quizQuestions[this.currentQuizIndex];
    if (!q) {
      this.renderQuizResults();
      return;
    }

    this.quizSelectedAnswer = null;
    const currentNum = this.currentQuizIndex + 1;
    const totalNum = this.quizQuestions.length;
    const progressPct = ((this.currentQuizIndex) / totalNum) * 100;

    const topicLabel = q.topicTitle || (this.activeTopic ? this.activeTopic.title : 'Ngữ pháp');

    const letters = ['A', 'B', 'C', 'D'];
    const optionsHtml = q.options.map((opt, idx) => `
      <button class="grammar-opt-btn" data-index="${idx}" onclick="grammarView.handleAnswerSelection(${idx})">
        <span class="opt-letter">${letters[idx]}</span>
        <span class="opt-text">${opt}</span>
      </button>
    `).join('');

    container.innerHTML = `
      <div class="quiz-question-header">
        <div class="quiz-step-info">
          <span class="quiz-step-badge">Câu ${currentNum} / ${totalNum}</span>
          <span class="quiz-topic-badge">${topicLabel}</span>
        </div>
        <div class="quiz-score-badge">Điểm hiện tại: <strong>${this.quizScore}</strong></div>
      </div>

      <div class="quiz-progress-bar-bg">
        <div class="quiz-progress-bar-fill" style="width: ${progressPct}%"></div>
      </div>

      <div class="quiz-prompt-box">
        <div class="quiz-prompt-text">${q.question}</div>
      </div>

      <div class="quiz-options-list" id="grammar-options-container">
        ${optionsHtml}
      </div>

      <!-- Explanation Drawer (Hidden until answer chosen) -->
      <div class="quiz-explanation-drawer" id="grammar-quiz-explanation" style="display: none;">
        <div class="explanation-title" id="grammar-explanation-header">
          <span id="explanation-status-icon">💡</span>
          <span id="explanation-status-text">Giải thích chi tiết & Phân tích đáp án</span>
        </div>
        <div class="explanation-body" id="grammar-explanation-body">
          ${q.explanation}
        </div>
        <div class="explanation-actions">
          <button class="grammar-btn grammar-btn-next" id="grammar-next-q-btn" onclick="grammarView.nextQuestion()">
            ${currentNum < totalNum ? 'Câu tiếp theo →' : 'Xem kết quả kiểm tra 🏆'}
          </button>
        </div>
      </div>
    `;
  }

  handleAnswerSelection(chosenIdx) {
    if (this.quizSelectedAnswer !== null) return; // Prevent multiple clicks
    this.quizSelectedAnswer = chosenIdx;

    const q = this.quizQuestions[this.currentQuizIndex];
    const isCorrect = chosenIdx === q.answer;

    const options = document.querySelectorAll('.grammar-opt-btn');
    options.forEach((btn, idx) => {
      btn.disabled = true;
      if (idx === q.answer) {
        btn.classList.add('correct');
      }
      if (idx === chosenIdx && !isCorrect) {
        btn.classList.add('wrong');
      }
    });

    // Score & Audio/Feedback
    if (isCorrect) {
      this.quizScore++;
      if (window.audioCtrl) window.audioCtrl.playTone('correct');
    } else {
      if (window.audioCtrl) window.audioCtrl.playTone('wrong');
    }

    // Reveal Explanation Drawer
    const drawer = document.getElementById('grammar-quiz-explanation');
    const statusHeader = document.getElementById('grammar-explanation-header');
    const statusIcon = document.getElementById('explanation-status-icon');
    const statusText = document.getElementById('explanation-status-text');

    if (drawer) {
      drawer.style.display = 'block';
      if (isCorrect) {
        statusHeader.className = 'explanation-title correct';
        statusIcon.textContent = '🎉 CHÍNH XÁC!';
        statusText.textContent = 'Phân tích quy tắc ngữ pháp:';
      } else {
        statusHeader.className = 'explanation-title wrong';
        statusIcon.textContent = '⚠️ CHƯA CHÍNH XÁC';
        statusText.textContent = 'Xem lại phân tích & bẫy ngữ pháp:';
      }
      drawer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }

  nextQuestion() {
    this.currentQuizIndex++;
    if (this.currentQuizIndex < this.quizQuestions.length) {
      this.renderQuestion();
    } else {
      this.renderQuizResults();
    }
  }

  renderQuizResults() {
    const container = document.getElementById('grammar-quiz-card-content');
    if (!container) return;

    const total = this.quizQuestions.length;
    const score = this.quizScore;
    const pct = Math.round((score / total) * 100);
    const xpEarned = score * 10;

    // Save score
    if (!this.isMixedQuiz && this.activeTopic) {
      this.saveScore(this.activeTopic.id, score, total);
    }

    // Award XP
    if (window.storage && window.storage.addXP) {
      window.storage.addXP(xpEarned);
      if (window.app && window.app.updateHeaderStats) {
        window.app.updateHeaderStats();
      }
    }

    let trophy = '🏆';
    let feedback = 'Xuất sắc! Bạn đã nắm rất vững chuyên đề ngữ pháp này.';
    if (pct < 50) {
      trophy = '🌱';
      feedback = 'Đừng nản lòng! Hãy đọc lại phần lý thuyết và thử sức lại nhé.';
    } else if (pct < 80) {
      trophy = '⭐';
      feedback = 'Khá tốt! Bạn đã nắm được phần lớn kiến thức, hãy ôn kỹ các bẫy ngữ pháp nhé.';
    }

    container.innerHTML = `
      <div class="quiz-results-container">
        <div class="result-trophy">${trophy}</div>
        <h2 class="result-title">Hoàn Thành Bài Kiểm Tra!</h2>
        <div class="result-subtitle">${this.activeTopic ? this.activeTopic.title : 'Đấu trường ngữ pháp'}</div>

        <div class="result-score-circle">
          <div class="score-number">${score} / ${total}</div>
          <div class="score-pct">${pct}% Chính xác</div>
        </div>

        <div class="result-xp-reward">
          <span>⚡ Thưởng kinh nghiệm:</span>
          <strong>+${xpEarned} XP</strong>
        </div>

        <p class="result-feedback-text">${feedback}</p>

        <div class="result-actions">
          <button class="grammar-btn grammar-btn-quiz" onclick="${this.isMixedQuiz ? 'grammarView.startComprehensiveQuiz()' : `grammarView.startTopicQuiz(${this.activeTopic.id})`}">
            🔄 Làm lại bài test
          </button>
          ${!this.isMixedQuiz && this.activeTopic ? `
            <button class="grammar-btn grammar-btn-read" onclick="grammarView.closeQuiz(); grammarView.openReader(${this.activeTopic.id});">
              📖 Xem lại lý thuyết
            </button>
          ` : ''}
          <button class="grammar-btn grammar-btn-neutral" onclick="grammarView.closeQuiz(); grammarView.renderTopics();">
            ✕ Đóng lại
          </button>
        </div>
      </div>
    `;

    this.renderTopics();
    this.updateProgressSummary();
  }

  // ==================== LOCAL STORAGE SCORE MANAGEMENT ====================
  getSavedScores() {
    try {
      return JSON.parse(localStorage.getItem('engmaster_grammar_scores') || '{}');
    } catch (e) {
      return {};
    }
  }

  saveScore(topicId, score, total) {
    const scores = this.getSavedScores();
    const existing = scores[topicId];
    // Keep best score
    if (!existing || (score / total) > (existing.score / existing.total)) {
      scores[topicId] = {
        score,
        total,
        updatedAt: new Date().toISOString()
      };
      try {
        localStorage.setItem('engmaster_grammar_scores', JSON.stringify(scores));
      } catch (e) {
        console.error('Failed to save grammar score', e);
      }
    }
  }

  updateProgressSummary() {
    const scores = this.getSavedScores();
    const totalTopics = 16;
    const completedTopics = Object.keys(scores).length;

    const summaryEl = document.getElementById('grammar-summary-stats');
    if (summaryEl) {
      summaryEl.textContent = `Đã hoàn thành test: ${completedTopics} / ${totalTopics} chuyên đề`;
    }

    const badge = document.getElementById('grammar-count-badge');
    if (badge) {
      badge.textContent = `16 Chuyên Đề`;
    }

    const dashCompleted = document.getElementById('dash-grammar-completed');
    if (dashCompleted) {
      dashCompleted.textContent = `${completedTopics} / 16`;
    }

    const dashBar = document.getElementById('dash-grammar-bar');
    if (dashBar) {
      const pct = Math.round((completedTopics / totalTopics) * 100);
      dashBar.style.width = `${pct}%`;
    }
  }
}

// Instantiate global controller
window.GrammarViewController = GrammarViewController;
window.grammarView = new GrammarViewController();
