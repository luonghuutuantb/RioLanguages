/**
 * EngMaster Sentence View Module
 * Renders and manages 1,000 common conversational English sentences
 */

class SentenceViewController {
  constructor() {
    this.container = document.getElementById('sentences-container');
    this.searchInput = document.getElementById('sentence-search-input');
    this.clearSearchBtn = document.getElementById('sentence-clear-search');
    this.topicFilter = document.getElementById('sentence-topic-filter');
    this.statusFilter = document.getElementById('sentence-status-filter');
    this.chipsCarousel = document.getElementById('sentence-topic-chips');
    this.filteredCountEl = document.getElementById('sentences-filtered-count');
    this.prevPageBtn = document.getElementById('sentence-prev-page');
    this.nextPageBtn = document.getElementById('sentence-next-page');
    this.currentPageEl = document.getElementById('sentence-current-page');
    this.totalPagesEl = document.getElementById('sentence-total-pages');
    this.btnPractice = document.getElementById('btn-practice-sentences');

    this.itemsPerPage = 25;
    this.currentPage = 1;
    this.filteredData = [];

    this._initEvents();
  }

  init() {
    this._populateTopics();
    this.applyFilters();
  }

  _populateTopics() {
    const allSentences = window.SENTENCES_DATA || [];
    const topicsMap = new Map();

    allSentences.forEach(s => {
      if (s.topic && !topicsMap.has(s.topic)) {
        topicsMap.set(s.topic, s.topic_vi || s.topic);
      }
    });

    this.topicFilter.innerHTML = '<option value="all">Tất cả 25 tình huống giao tiếp</option>';
    this.chipsCarousel.innerHTML = `
      <div class="topic-chip active" data-topic="all">
        <span>✨ Tất cả tình huống</span>
      </div>
    `;

    topicsMap.forEach((viName, key) => {
      const opt = document.createElement('option');
      opt.value = key;
      opt.textContent = `💬 ${viName}`;
      this.topicFilter.appendChild(opt);

      const chip = document.createElement('div');
      chip.className = 'topic-chip';
      chip.dataset.topic = key;
      chip.innerHTML = `
        <span>💬</span>
        <span>${viName}</span>
      `;
      this.chipsCarousel.appendChild(chip);
    });
  }

  _initEvents() {
    let debounceTimer;
    this.searchInput.addEventListener('input', () => {
      clearTimeout(debounceTimer);
      this.clearSearchBtn.style.display = this.searchInput.value ? 'block' : 'none';
      debounceTimer = setTimeout(() => {
        this.currentPage = 1;
        this.applyFilters();
      }, 250);
    });

    this.clearSearchBtn.addEventListener('click', () => {
      this.searchInput.value = '';
      this.clearSearchBtn.style.display = 'none';
      this.currentPage = 1;
      this.applyFilters();
    });

    this.topicFilter.addEventListener('change', () => {
      this.currentPage = 1;
      this._syncTopicChips(this.topicFilter.value);
      this.applyFilters();
    });

    this.statusFilter.addEventListener('change', () => {
      this.currentPage = 1;
      this.applyFilters();
    });

    this.chipsCarousel.addEventListener('click', (e) => {
      const chip = e.target.closest('.topic-chip');
      if (!chip) return;
      const topic = chip.dataset.topic;
      this.topicFilter.value = topic;
      this._syncTopicChips(topic);
      this.currentPage = 1;
      this.applyFilters();
    });

    this.prevPageBtn.addEventListener('click', () => {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.renderPage();
        this._scrollToTop();
      }
    });

    this.nextPageBtn.addEventListener('click', () => {
      const maxPages = Math.ceil(this.filteredData.length / this.itemsPerPage) || 1;
      if (this.currentPage < maxPages) {
        this.currentPage++;
        this.renderPage();
        this._scrollToTop();
      }
    });

    // Start practice with filtered sentences
    this.btnPractice.addEventListener('click', () => {
      window.quizCtrl.startWithCustomSet(this.filteredData, 'sentences');
      window.app.switchTab('quiz');
    });

    // Sentence Card Controls
    this.container.addEventListener('click', (e) => {
      const audioBtn = e.target.closest('.sentence-audio-btn');
      if (audioBtn) {
        e.stopPropagation();
        const text = audioBtn.dataset.text;
        window.audioCtrl.speak(text);
        return;
      }

      const bookmarkBtn = e.target.closest('.sentence-bookmark-btn');
      if (bookmarkBtn) {
        e.stopPropagation();
        const id = bookmarkBtn.dataset.id;
        const key = `s_${id}`;
        const isMarked = window.storage.toggleBookmark(key);
        bookmarkBtn.classList.toggle('active', isMarked);
        bookmarkBtn.textContent = isMarked ? '🔖' : '🏷️';
        window.app.showToast(isMarked ? 'Đã lưu câu giao tiếp' : 'Đã bỏ lưu');
        return;
      }

      const masterBtn = e.target.closest('.sentence-master-btn');
      if (masterBtn) {
        e.stopPropagation();
        const id = masterBtn.dataset.id;
        const key = `s_${id}`;
        const current = window.storage.getStatus(key);
        const isNowMaster = (current !== 'mastered');
        window.storage.setMastered(key, isNowMaster);
        masterBtn.classList.toggle('active', isNowMaster);
        masterBtn.textContent = isNowMaster ? '⭐' : '☆';
        window.app.updateHeaderStats();
        window.app.showToast(isNowMaster ? 'Đã thuộc câu này (+5 XP)' : 'Đã hủy trạng thái thuộc');
        return;
      }

      const speakTestBtn = e.target.closest('.sentence-speak-btn');
      if (speakTestBtn) {
        e.stopPropagation();
        const en = speakTestBtn.dataset.en;
        const vi = speakTestBtn.dataset.vi;
        window.quizCtrl.startSpeakingWithItem({ en, vi, ipa: '' });
        window.app.switchTab('quiz');
        return;
      }
    });
  }

  _syncTopicChips(topic) {
    const chips = this.chipsCarousel.querySelectorAll('.topic-chip');
    chips.forEach(chip => {
      chip.classList.toggle('active', chip.dataset.topic === topic);
    });
  }

  applyFilters() {
    const query = this.searchInput.value.trim().toLowerCase();
    const topic = this.topicFilter.value;
    const status = this.statusFilter.value;

    const allSentences = window.SENTENCES_DATA || [];

    this.filteredData = allSentences.filter(item => {
      if (topic !== 'all' && item.topic !== topic) return false;

      const key = `s_${item.id}`;
      if (status === 'mastered' && window.storage.getStatus(key) !== 'mastered') return false;
      if (status === 'bookmarked' && !window.storage.isBookmarked(key)) return false;

      if (query) {
        const matchEn = item.en.toLowerCase().includes(query);
        const matchVi = item.vi.toLowerCase().includes(query);
        const matchSit = (item.situation || '').toLowerCase().includes(query);
        if (!matchEn && !matchVi && !matchSit) return false;
      }

      return true;
    });

    this.filteredCountEl.textContent = this.filteredData.length.toLocaleString('vi-VN');
    this.renderPage();
  }

  renderPage() {
    const totalPages = Math.ceil(this.filteredData.length / this.itemsPerPage) || 1;
    this.currentPage = Math.max(1, Math.min(this.currentPage, totalPages));

    this.currentPageEl.textContent = this.currentPage;
    this.totalPagesEl.textContent = totalPages;

    this.prevPageBtn.disabled = (this.currentPage <= 1);
    this.nextPageBtn.disabled = (this.currentPage >= totalPages);

    const startIdx = (this.currentPage - 1) * this.itemsPerPage;
    const pageItems = this.filteredData.slice(startIdx, startIdx + this.itemsPerPage);

    if (pageItems.length === 0) {
      this.container.innerHTML = `
        <div class="search-empty-state">
          <div style="font-size: 40px; margin-bottom: 12px;">💬</div>
          <h3>Không tìm thấy câu giao tiếp nào phù hợp</h3>
          <p style="color: var(--text-muted); margin-top: 6px;">Thử thay đổi từ khóa hoặc bộ lọc tình huống.</p>
        </div>
      `;
      return;
    }

    const html = pageItems.map(item => {
      const key = `s_${item.id}`;
      const isBookmarked = window.storage.isBookmarked(key);
      const isMastered = window.storage.getStatus(key) === 'mastered';

      return `
        <div class="sentence-card" data-id="${item.id}">
          <div class="sentence-card-header">
            <div class="sentence-card-topic">
              <span class="topic-title">${this._escapeHtml(item.topic_vi || item.topic)}</span>
              <span class="topic-sep">•</span>
              <span class="topic-sub">${this._escapeHtml(item.situation || 'Giao tiếp')}</span>
            </div>
            <div class="sentence-card-controls">
              <button class="audio-round-btn sentence-audio-btn" data-text="${this._escapeHtml(item.en)}" title="Nghe phát âm">🔊</button>
              <button class="audio-round-btn sentence-speak-btn" data-en="${this._escapeHtml(item.en)}" data-vi="${this._escapeHtml(item.vi)}" title="Luyện đọc câu này">🎙️</button>
              <button class="bookmark-icon-btn sentence-bookmark-btn ${isBookmarked ? 'active' : ''}" data-id="${item.id}" title="Lưu lại">
                ${isBookmarked ? '🔖' : '🏷️'}
              </button>
              <button class="master-icon-btn sentence-master-btn ${isMastered ? 'active' : ''}" data-id="${item.id}" title="Đánh dấu đã thuộc">
                ${isMastered ? '⭐' : '☆'}
              </button>
            </div>
          </div>
          <div class="sentence-card-body">
            <div class="sentence-en-text">"${this._escapeHtml(item.en)}"</div>
            <div class="sentence-vi-text">${this._escapeHtml(item.vi)}</div>
            ${item.hint ? `<div class="sentence-hint-text">💡 ${this._escapeHtml(item.hint)}</div>` : ''}
          </div>
        </div>
      `;
    }).join('');

    this.container.innerHTML = html;
  }

  _scrollToTop() {
    window.scrollTo({ top: 180, behavior: 'smooth' });
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

window.sentenceView = new SentenceViewController();
