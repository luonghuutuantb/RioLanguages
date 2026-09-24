/**
 * EngMaster Vocabulary View Module
 * Renders and filters 2,500 English vocabulary words
 */

class VocabViewController {
  constructor() {
    this.container = document.getElementById('vocab-container');
    this.searchInput = document.getElementById('vocab-search-input');
    this.clearSearchBtn = document.getElementById('vocab-clear-search');
    this.levelFilter = document.getElementById('vocab-level-filter');
    this.topicFilter = document.getElementById('vocab-topic-filter');
    this.statusFilter = document.getElementById('vocab-status-filter');
    this.sortSelect = document.getElementById('vocab-sort-select');
    this.alphabetBar = document.getElementById('vocab-alphabet-bar');
    this.chipsCarousel = document.getElementById('vocab-topic-chips');
    this.filteredCountEl = document.getElementById('vocab-filtered-count');
    this.prevPageBtn = document.getElementById('vocab-prev-page');
    this.nextPageBtn = document.getElementById('vocab-next-page');
    this.currentPageEl = document.getElementById('vocab-current-page');
    this.totalPagesEl = document.getElementById('vocab-total-pages');
    this.modeGridBtn = document.getElementById('vocab-mode-grid');
    this.modeListBtn = document.getElementById('vocab-mode-list');

    this.itemsPerPage = 36;
    this.currentPage = 1;
    this.currentViewMode = 'grid'; // 'grid' or 'list'
    this.selectedLetter = 'all';
    this.currentSort = 'az';
    this.filteredData = [];

    this._initEvents();
  }

  init() {
    this._populateTopics();
    this.applyFilters();
  }

  _populateTopics() {
    if (!window.VOCAB_TOPICS) return;
    this.topicFilter.innerHTML = '<option value="all">Tất cả 16 chủ đề</option>';
    this.chipsCarousel.innerHTML = `
      <div class="topic-chip active" data-topic="all">
        <span>✨ Tất cả chủ đề</span>
      </div>
    `;

    window.VOCAB_TOPICS.forEach(topic => {
      // Add to select
      const opt = document.createElement('option');
      opt.value = topic.id;
      opt.textContent = `${topic.icon} ${topic.name_vi}`;
      this.topicFilter.appendChild(opt);

      // Add to carousel
      const chip = document.createElement('div');
      chip.className = 'topic-chip';
      chip.dataset.topic = topic.id;
      chip.innerHTML = `
        <span>${topic.icon}</span>
        <span>${topic.name_vi}</span>
      `;
      this.chipsCarousel.appendChild(chip);
    });
  }

  _initEvents() {
    // Search input with debounce
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

    // Dropdowns
    this.levelFilter.addEventListener('change', () => {
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

    // Sort Dropdown
    if (this.sortSelect) {
      this.sortSelect.addEventListener('change', () => {
        this.currentSort = this.sortSelect.value;
        this.currentPage = 1;
        this.applyFilters();
      });
    }

    // Alphabet Bar Selection (A - Z)
    if (this.alphabetBar) {
      this.alphabetBar.addEventListener('click', (e) => {
        const btn = e.target.closest('.alpha-btn');
        if (!btn) return;
        this.alphabetBar.querySelectorAll('.alpha-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.selectedLetter = btn.dataset.letter;
        this.currentPage = 1;
        this.applyFilters();
      });
    }

    // Chips Carousel Click
    this.chipsCarousel.addEventListener('click', (e) => {
      const chip = e.target.closest('.topic-chip');
      if (!chip) return;
      const topicId = chip.dataset.topic;
      this.topicFilter.value = topicId;
      this._syncTopicChips(topicId);
      this.currentPage = 1;
      this.applyFilters();
    });

    // Pagination
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

    // View Mode Toggle
    this.modeGridBtn.addEventListener('click', () => {
      this.currentViewMode = 'grid';
      this.modeGridBtn.classList.add('active');
      this.modeListBtn.classList.remove('active');
      this.container.className = 'vocab-container grid-layout';
    });

    this.modeListBtn.addEventListener('click', () => {
      this.currentViewMode = 'list';
      this.modeListBtn.classList.add('active');
      this.modeGridBtn.classList.remove('active');
      this.container.className = 'vocab-container list-layout';
    });

    // Event Delegation inside Container for Audio & Bookmarks
    this.container.addEventListener('click', (e) => {
      const audioBtn = e.target.closest('.vocab-audio-btn');
      if (audioBtn) {
        e.stopPropagation();
        const word = audioBtn.dataset.word;
        window.audioCtrl.speak(word);
        return;
      }

      const bookmarkBtn = e.target.closest('.bookmark-icon-btn');
      if (bookmarkBtn) {
        e.stopPropagation();
        const id = bookmarkBtn.dataset.id;
        const key = `v_${id}`;
        const isMarked = window.storage.toggleBookmark(key);
        bookmarkBtn.classList.toggle('active', isMarked);
        bookmarkBtn.textContent = isMarked ? '🔖' : '🏷️';
        window.app.showToast(isMarked ? 'Đã thêm vào danh sách yêu thích' : 'Đã bỏ đánh dấu');
        return;
      }

      const masterBtn = e.target.closest('.master-icon-btn');
      if (masterBtn) {
        e.stopPropagation();
        const id = masterBtn.dataset.id;
        const key = `v_${id}`;
        const current = window.storage.getStatus(key);
        const isNowMaster = (current !== 'mastered');
        window.storage.setMastered(key, isNowMaster);
        masterBtn.classList.toggle('active', isNowMaster);
        masterBtn.textContent = isNowMaster ? '⭐' : '☆';
        window.app.updateHeaderStats();
        window.app.showToast(isNowMaster ? 'Đã đánh dấu thuộc từ này (+5 XP)' : 'Đã hủy trạng thái thuộc');
        return;
      }
    });
  }

  _syncTopicChips(topicId) {
    const chips = this.chipsCarousel.querySelectorAll('.topic-chip');
    chips.forEach(chip => {
      chip.classList.toggle('active', chip.dataset.topic === topicId);
    });
  }

  applyFilters() {
    const query = this.searchInput.value.trim().toLowerCase();
    const level = this.levelFilter.value;
    const topic = this.topicFilter.value;
    const status = this.statusFilter.value;

    const allVocab = window.VOCAB_DATA || [];

    this.filteredData = allVocab.filter(item => {
      // Alphabetical letter check
      if (this.selectedLetter !== 'all') {
        const firstLetter = item.word.trim().charAt(0).toUpperCase();
        if (firstLetter !== this.selectedLetter) return false;
      }

      // Level check
      if (level !== 'all' && item.level !== level) return false;

      // Topic check
      if (topic !== 'all' && item.topic !== topic) return false;

      // Status check
      const key = `v_${item.id}`;
      if (status === 'mastered' && window.storage.getStatus(key) !== 'mastered') return false;
      if (status === 'learning' && window.storage.getStatus(key) !== 'learning') return false;
      if (status === 'bookmarked' && !window.storage.isBookmarked(key)) return false;

      // Search Query
      if (query) {
        const matchWord = item.word.toLowerCase().includes(query);
        const matchVi = item.vi.toLowerCase().includes(query);
        const matchIpa = item.ipa.toLowerCase().includes(query);
        if (!matchWord && !matchVi && !matchIpa) return false;
      }

      return true;
    });

    // Sorting
    const levelRank = { 'A1': 1, 'A2': 2, 'B1': 3, 'B2': 4 };
    if (this.currentSort === 'az') {
      this.filteredData.sort((a, b) => a.word.localeCompare(b.word));
    } else if (this.currentSort === 'za') {
      this.filteredData.sort((a, b) => b.word.localeCompare(a.word));
    } else if (this.currentSort === 'level-asc') {
      this.filteredData.sort((a, b) => (levelRank[a.level] || 3) - (levelRank[b.level] || 3) || a.word.localeCompare(b.word));
    } else if (this.currentSort === 'level-desc') {
      this.filteredData.sort((a, b) => (levelRank[b.level] || 3) - (levelRank[a.level] || 3) || a.word.localeCompare(b.word));
    } else if (this.currentSort === 'random') {
      this.filteredData.sort(() => Math.random() - 0.5);
    }

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
        <div class="search-empty-state" style="grid-column: 1 / -1;">
          <div style="font-size: 40px; margin-bottom: 12px;">🔍</div>
          <h3>Không tìm thấy từ vựng nào phù hợp</h3>
          <p style="color: var(--text-muted); margin-top: 6px;">Thử thay đổi từ khóa tìm kiếm hoặc điều chỉnh lại bộ lọc.</p>
        </div>
      `;
      return;
    }

    const html = pageItems.map(item => {
      const key = `v_${item.id}`;
      const isBookmarked = window.storage.isBookmarked(key);
      const isMastered = window.storage.getStatus(key) === 'mastered';
      const levelClass = (item.level || 'b1').toLowerCase();

      return `
        <div class="vocab-card" data-id="${item.id}">
          <div class="vocab-card-header">
            <h3 class="vocab-word-title">${this._escapeHtml(item.word)}</h3>
            <div class="vocab-card-actions">
              <button class="audio-round-btn vocab-audio-btn" data-word="${this._escapeHtml(item.word)}" title="Phát âm">🔊</button>
              <button class="bookmark-icon-btn ${isBookmarked ? 'active' : ''}" data-id="${item.id}" title="Đánh dấu thẻ">
                ${isBookmarked ? '🔖' : '🏷️'}
              </button>
              <button class="master-icon-btn ${isMastered ? 'active' : ''}" data-id="${item.id}" title="Đánh dấu đã thuộc">
                ${isMastered ? '⭐' : '☆'}
              </button>
            </div>
          </div>

          <div class="vocab-card-meta">
            <span class="vocab-ipa">${item.ipa || ''}</span>
            <span class="vocab-type">${item.type || 'word'}</span>
            <span class="level-tag ${levelClass}">${item.level || 'B1'}</span>
          </div>

          <div class="vocab-vi-meaning">${this._escapeHtml(item.vi)}</div>

          ${item.en_example ? `
            <div class="vocab-example-box">
              <p class="en">"${this._escapeHtml(item.en_example)}"</p>
              <p class="vi">${this._escapeHtml(item.vi_example || '')}</p>
            </div>
          ` : ''}
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

window.vocabView = new VocabViewController();
