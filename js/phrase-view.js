/**
 * EngMaster Phrases View Module
 * Renders and filters authentic Phrasal Verbs, Noun Phrases, and Gerund Phrases
 */

class PhraseViewController {
  constructor() {
    this.container = document.getElementById('phrases-container');
    this.searchInput = document.getElementById('phrases-search-input');
    this.clearSearchBtn = document.getElementById('phrases-clear-search');
    this.typeFilter = document.getElementById('phrases-type-filter');
    this.levelFilter = document.getElementById('phrases-level-filter');
    this.statusFilter = document.getElementById('phrases-status-filter');
    this.sortSelect = document.getElementById('phrases-sort-select');
    this.alphabetBar = document.getElementById('phrases-alphabet-bar');
    this.typeChipsContainer = document.getElementById('phrases-type-chips');
    this.filteredCountEl = document.getElementById('phrases-filtered-count');
    this.prevPageBtn = document.getElementById('phrases-prev-page');
    this.nextPageBtn = document.getElementById('phrases-next-page');
    this.currentPageEl = document.getElementById('phrases-current-page');
    this.totalPagesEl = document.getElementById('phrases-total-pages');

    this.itemsPerPage = 24;
    this.currentPage = 1;
    this.selectedLetter = 'all';
    this.selectedType = 'all';
    this.currentSort = 'az';
    this.filteredData = [];

    this._initEvents();
  }

  init() {
    this.applyFilters();
  }

  _initEvents() {
    // Search Typing
    if (this.searchInput) {
      let debounce;
      this.searchInput.addEventListener('input', () => {
        clearTimeout(debounce);
        debounce = setTimeout(() => {
          this.currentPage = 1;
          this.applyFilters();
        }, 200);
      });
    }

    if (this.clearSearchBtn) {
      this.clearSearchBtn.addEventListener('click', () => {
        this.searchInput.value = '';
        this.currentPage = 1;
        this.applyFilters();
      });
    }

    // Type Filter Select
    if (this.typeFilter) {
      this.typeFilter.addEventListener('change', () => {
        this.selectedType = this.typeFilter.value;
        this._syncTypeChips(this.selectedType);
        this.currentPage = 1;
        this.applyFilters();
      });
    }

    // Level Filter
    if (this.levelFilter) {
      this.levelFilter.addEventListener('change', () => {
        this.currentPage = 1;
        this.applyFilters();
      });
    }

    // Status Filter
    if (this.statusFilter) {
      this.statusFilter.addEventListener('change', () => {
        this.currentPage = 1;
        this.applyFilters();
      });
    }

    // Sort Select
    if (this.sortSelect) {
      this.sortSelect.addEventListener('change', () => {
        this.currentSort = this.sortSelect.value;
        this.currentPage = 1;
        this.applyFilters();
      });
    }

    // Alphabet Bar
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

    // Type Chips Click
    if (this.typeChipsContainer) {
      this.typeChipsContainer.addEventListener('click', (e) => {
        const chip = e.target.closest('.topic-chip');
        if (!chip) return;

        this.typeChipsContainer.querySelectorAll('.topic-chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');

        this.selectedType = chip.dataset.type;
        if (this.typeFilter) this.typeFilter.value = this.selectedType;
        this.currentPage = 1;
        this.applyFilters();
      });
    }

    // Pagination
    if (this.prevPageBtn) {
      this.prevPageBtn.addEventListener('click', () => {
        if (this.currentPage > 1) {
          this.currentPage--;
          this.renderCards();
          this._scrollToTop();
        }
      });
    }

    if (this.nextPageBtn) {
      this.nextPageBtn.addEventListener('click', () => {
        const totalPages = Math.ceil(this.filteredData.length / this.itemsPerPage) || 1;
        if (this.currentPage < totalPages) {
          this.currentPage++;
          this.renderCards();
          this._scrollToTop();
        }
      });
    }

    // Container Action Delegation
    if (this.container) {
      this.container.addEventListener('click', (e) => {
        const audioBtn = e.target.closest('.phrase-audio-btn');
        if (audioBtn) {
          e.stopPropagation();
          const phrase = audioBtn.dataset.phrase;
          if (window.audioCtrl) {
            window.audioCtrl.speak(phrase);
          }
          audioBtn.classList.add('playing');
          setTimeout(() => audioBtn.classList.remove('playing'), 600);
          return;
        }

        const bookmarkBtn = e.target.closest('.bookmark-icon-btn');
        if (bookmarkBtn) {
          e.stopPropagation();
          const id = bookmarkBtn.dataset.id;
          const key = `p_${id}`;
          const isBookmarked = window.storage.toggleBookmark(key);
          bookmarkBtn.classList.toggle('active', isBookmarked);
          bookmarkBtn.textContent = isBookmarked ? '🔖' : '🏷️';
          window.app.showToast(isBookmarked ? 'Đã lưu cụm từ vào yêu thích' : 'Đã bỏ lưu cụm từ');
          return;
        }

        const masterBtn = e.target.closest('.master-icon-btn');
        if (masterBtn) {
          e.stopPropagation();
          const id = masterBtn.dataset.id;
          const key = `p_${id}`;
          const current = window.storage.getStatus(key);
          const isNowMaster = (current !== 'mastered');
          window.storage.setMastered(key, isNowMaster);
          masterBtn.classList.toggle('active', isNowMaster);
          masterBtn.textContent = isNowMaster ? '⭐' : '☆';
          window.app.updateHeaderStats();
          window.app.showToast(isNowMaster ? 'Đã đánh dấu thuộc cụm từ này (+5 XP)' : 'Đã hủy trạng thái thuộc');
          return;
        }
      });
    }
  }

  _syncTypeChips(type) {
    if (!this.typeChipsContainer) return;
    const chips = this.typeChipsContainer.querySelectorAll('.topic-chip');
    chips.forEach(chip => {
      chip.classList.toggle('active', chip.dataset.type === type);
    });
  }

  applyFilters() {
    const query = this.searchInput ? this.searchInput.value.trim().toLowerCase() : '';
    const level = this.levelFilter ? this.levelFilter.value : 'all';
    const status = this.statusFilter ? this.statusFilter.value : 'all';

    const allPhrases = window.PHRASES_DATA || [];

    this.filteredData = allPhrases.filter(item => {
      // Type check
      if (this.selectedType !== 'all' && item.type !== this.selectedType) return false;

      // Letter check
      if (this.selectedLetter !== 'all') {
        const firstLetter = item.phrase.trim().charAt(0).toUpperCase();
        if (firstLetter !== this.selectedLetter) return false;
      }

      // Level check
      if (level !== 'all' && item.level !== level) return false;

      // Status check
      const key = `p_${item.id}`;
      if (status === 'mastered' && window.storage.getStatus(key) !== 'mastered') return false;
      if (status === 'learning' && window.storage.getStatus(key) !== 'learning') return false;
      if (status === 'bookmarked' && !window.storage.isBookmarked(key)) return false;

      // Query check
      if (query) {
        const matchPhrase = item.phrase.toLowerCase().includes(query);
        const matchVi = item.vi.toLowerCase().includes(query);
        const matchPattern = item.pattern.toLowerCase().includes(query);
        if (!matchPhrase && !matchVi && !matchPattern) return false;
      }

      return true;
    });

    // Sorting
    const levelRank = { 'A1': 1, 'A2': 2, 'B1': 3, 'B2': 4 };
    if (this.currentSort === 'az') {
      this.filteredData.sort((a, b) => a.phrase.localeCompare(b.phrase));
    } else if (this.currentSort === 'za') {
      this.filteredData.sort((a, b) => b.phrase.localeCompare(a.phrase));
    } else if (this.currentSort === 'level-asc') {
      this.filteredData.sort((a, b) => (levelRank[a.level] || 2) - (levelRank[b.level] || 2));
    } else if (this.currentSort === 'shuffle') {
      this.filteredData.sort(() => Math.random() - 0.5);
    }

    if (this.filteredCountEl) {
      this.filteredCountEl.textContent = this.filteredData.length.toLocaleString('vi-VN');
    }

    this.renderCards();
  }

  renderCards() {
    if (!this.container) return;

    const totalPages = Math.ceil(this.filteredData.length / this.itemsPerPage) || 1;
    if (this.currentPage > totalPages) this.currentPage = totalPages;

    if (this.currentPageEl) this.currentPageEl.textContent = this.currentPage;
    if (this.totalPagesEl) this.totalPagesEl.textContent = totalPages;

    if (this.prevPageBtn) this.prevPageBtn.disabled = (this.currentPage <= 1);
    if (this.nextPageBtn) this.nextPageBtn.disabled = (this.currentPage >= totalPages);

    const startIdx = (this.currentPage - 1) * this.itemsPerPage;
    const pageItems = this.filteredData.slice(startIdx, startIdx + this.itemsPerPage);

    if (pageItems.length === 0) {
      this.container.innerHTML = `
        <div class="search-empty-state" style="grid-column: 1 / -1;">
          <div style="font-size: 40px; margin-bottom: 12px;">🔍</div>
          <h3>Không tìm thấy cụm từ nào phù hợp</h3>
          <p style="color: var(--text-muted); margin-top: 6px;">Thử thay đổi từ khóa tìm kiếm hoặc điều chỉnh lại bộ lọc.</p>
        </div>
      `;
      return;
    }

    const typeIcons = {
      'phrasal_verb': '📘 Cụm Động Từ',
      'noun_phrase': '📗 Cụm Danh Từ',
      'gerund_phrase': '📙 Cụm Danh Động Từ'
    };

    const html = pageItems.map(item => {
      const key = `p_${item.id}`;
      const isBookmarked = window.storage.isBookmarked(key);
      const isMastered = window.storage.getStatus(key) === 'mastered';
      const levelClass = (item.level || 'b1').toLowerCase();
      const typeLabel = typeIcons[item.type] || '💡 Cụm Từ';

      return `
        <div class="phrase-card type-${item.type}" data-id="${item.id}">
          <div class="phrase-card-header">
            <div class="phrase-type-badge ${item.type}">${typeLabel}</div>
            <div class="vocab-card-actions">
              <button class="audio-round-btn phrase-audio-btn" data-phrase="${this._escapeHtml(item.phrase)}" title="Phát âm">🔊</button>
              <button class="bookmark-icon-btn ${isBookmarked ? 'active' : ''}" data-id="${item.id}" title="Đánh dấu thẻ">
                ${isBookmarked ? '🔖' : '🏷️'}
              </button>
              <button class="master-icon-btn ${isMastered ? 'active' : ''}" data-id="${item.id}" title="Đánh dấu đã thuộc">
                ${isMastered ? '⭐' : '☆'}
              </button>
            </div>
          </div>

          <h3 class="phrase-title">${this._escapeHtml(item.phrase)}</h3>

          <div class="phrase-meta">
            <span class="level-tag ${levelClass}">${item.level || 'B1'}</span>
            <span class="phrase-pattern-pill">⚡ ${this._escapeHtml(item.pattern)}</span>
          </div>

          <div class="phrase-vi-meaning">${this._escapeHtml(item.vi)}</div>

          ${item.en_example ? `
            <div class="vocab-example-box">
              <p class="en">"${this._escapeHtml(item.en_example)}"</p>
              <p class="vi">${this._escapeHtml(item.vi_example || '')}</p>
            </div>
          ` : ''}

          ${item.note ? `
            <div class="phrase-note-box">
              <span class="note-icon">💡</span>
              <span class="note-text">${this._escapeHtml(item.note)}</span>
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

window.phraseView = new PhraseViewController();
