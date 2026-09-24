/**
 * EngMaster Flashcard SRS Module
 * 3D Card flip with Spaced Repetition (Leitner System) and Hotkey Navigation
 */

class FlashcardController {
  constructor() {
    this.card = document.getElementById('flashcard-card');
    this.deckTypeSelect = document.getElementById('fc-deck-type');
    this.deckFilterSelect = document.getElementById('fc-deck-filter');

    this.currentIndexEl = document.getElementById('fc-current-index');
    this.totalCountEl = document.getElementById('fc-total-count');
    this.progressFillEl = document.getElementById('fc-progress-fill');
    this.prevBtn = document.getElementById('fc-prev-btn');
    this.nextBtn = document.getElementById('fc-next-btn');

    // Front elements
    this.frontBadge = document.getElementById('fc-front-badge');
    this.frontBookmarkBtn = document.getElementById('fc-bookmark-btn');
    this.frontTitle = document.getElementById('fc-front-title');
    this.frontIpa = document.getElementById('fc-front-ipa');
    this.frontAudioBtn = document.getElementById('fc-audio-btn');

    // Back elements
    this.backType = document.getElementById('fc-back-type');
    this.backAudioBtn = document.getElementById('fc-back-audio');
    this.backMeaning = document.getElementById('fc-back-meaning');
    this.backExampleEn = document.getElementById('fc-back-example-en');
    this.backExampleVi = document.getElementById('fc-back-example-vi');

    // SRS Buttons
    this.btnAgain = document.getElementById('fc-btn-again');
    this.btnGood = document.getElementById('fc-btn-good');
    this.btnEasy = document.getElementById('fc-btn-easy');

    this.isFlipped = false;
    this.deck = [];
    this.currentIndex = 0;

    this._initEvents();
  }

  init() {
    this._populateDeckFilters();
    this.loadDeck();
  }

  _populateDeckFilters() {
    const type = this.deckTypeSelect.value;
    this.deckFilterSelect.innerHTML = '<option value="all">Tất cả chủ đề</option>';

    if (type === 'vocab' && window.VOCAB_TOPICS) {
      window.VOCAB_TOPICS.forEach(topic => {
        const opt = document.createElement('option');
        opt.value = topic.id;
        opt.textContent = `${topic.icon} ${topic.name_vi}`;
        this.deckFilterSelect.appendChild(opt);
      });
    } else if (type === 'sentences' && window.SENTENCES_DATA) {
      const set = new Set();
      window.SENTENCES_DATA.forEach(s => {
        if (s.topic && !set.has(s.topic)) {
          set.add(s.topic);
          const opt = document.createElement('option');
          opt.value = s.topic;
          opt.textContent = `💬 ${s.topic_vi || s.topic}`;
          this.deckFilterSelect.appendChild(opt);
        }
      });
    } else if (type === 'phrases') {
      this.deckFilterSelect.appendChild(new Option('📘 Cụm Động Từ (Phrasal Verbs)', 'phrasal_verb'));
      this.deckFilterSelect.appendChild(new Option('📗 Cụm Danh Từ (Noun Phrases)', 'noun_phrase'));
      this.deckFilterSelect.appendChild(new Option('📙 Cụm Danh Động Từ (Gerund Phrases)', 'gerund_phrase'));
    }
  }

  _initEvents() {
    // Flip on card click
    this.card.addEventListener('click', () => {
      this.flip();
    });

    // Audio clicks (stop propagation so card doesn't flip when clicking audio)
    this.frontAudioBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this._playCurrentAudio();
    });

    this.backAudioBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this._playCurrentAudio();
    });

    // Bookmark button
    this.frontBookmarkBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const current = this.deck[this.currentIndex];
      if (!current) return;
      const key = current._key;
      const marked = window.storage.toggleBookmark(key);
      this.frontBookmarkBtn.classList.toggle('active', marked);
      this.frontBookmarkBtn.textContent = marked ? '🔖' : '🏷️';
      window.app.showToast(marked ? 'Đã thêm vào danh sách yêu thích' : 'Đã bỏ lưu');
    });

    // Dropdown changes
    this.deckTypeSelect.addEventListener('change', () => {
      this._populateDeckFilters();
      this.loadDeck();
    });

    this.deckFilterSelect.addEventListener('change', () => {
      this.loadDeck();
    });

    // Prev / Next button navigation
    if (this.prevBtn) {
      this.prevBtn.addEventListener('click', () => this.prev());
    }
    if (this.nextBtn) {
      this.nextBtn.addEventListener('click', () => this.next());
    }

    // Touch Swipe Navigation on Mobile (Left swipe = next, Right swipe = prev)
    let touchStartX = 0;
    let touchStartY = 0;
    this.card.addEventListener('touchstart', (e) => {
      if (e.touches && e.touches[0]) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
      }
    }, { passive: true });

    this.card.addEventListener('touchend', (e) => {
      if (e.changedTouches && e.changedTouches[0]) {
        const deltaX = e.changedTouches[0].clientX - touchStartX;
        const deltaY = e.changedTouches[0].clientY - touchStartY;
        // Only trigger horizontal swipe if horizontal movement is dominant
        if (Math.abs(deltaX) > 48 && Math.abs(deltaX) > Math.abs(deltaY) * 1.4) {
          if (deltaX < 0) {
            this.next();
          } else {
            this.prev();
          }
        }
      }
    }, { passive: true });

    // SRS Ratings
    this.btnAgain.addEventListener('click', () => this.rate(1));
    this.btnGood.addEventListener('click', () => this.rate(2));
    this.btnEasy.addEventListener('click', () => this.rate(3));

    // Keyboard Shortcuts (Space, 1, 2, 3, ArrowLeft, ArrowRight, ArrowUp/Down)
    document.addEventListener('keydown', (e) => {
      // Only trigger if flashcard tab is visible and not inside an input field
      if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') return;
      const flashcardView = document.getElementById('view-flashcard');
      if (!flashcardView || !flashcardView.classList.contains('active')) return;

      if (e.code === 'Space' || e.code === 'ArrowUp' || e.code === 'ArrowDown') {
        e.preventDefault();
        this.flip();
      } else if (e.key === '1') {
        this.rate(1);
      } else if (e.key === '2') {
        this.rate(2);
      } else if (e.key === '3') {
        this.rate(3);
      } else if (e.key === 'ArrowLeft') {
        this.prev();
      } else if (e.key === 'ArrowRight') {
        this.next();
      }
    });
  }

  flip() {
    this.isFlipped = !this.isFlipped;
    this.card.classList.toggle('flipped', this.isFlipped);
  }

  prev() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.renderCard();
    }
  }

  next() {
    if (this.currentIndex < this.deck.length - 1) {
      this.currentIndex++;
      this.renderCard();
    }
  }

  loadDeck() {
    const type = this.deckTypeSelect.value;
    const filter = this.deckFilterSelect.value;
    let list = [];

    if (type === 'vocab') {
      const all = window.VOCAB_DATA || [];
      list = (filter === 'all') ? [...all] : all.filter(item => item.topic === filter);
      list = list.map(item => ({
        ...item,
        _key: `v_${item.id}`,
        _isSentence: false
      }));
    } else if (type === 'sentences') {
      const all = window.SENTENCES_DATA || [];
      list = (filter === 'all') ? [...all] : all.filter(item => item.topic === filter);
      list = list.map(item => ({
        ...item,
        _key: `s_${item.id}`,
        _isSentence: true
      }));
    } else if (type === 'phrases') {
      const all = window.PHRASES_DATA || [];
      list = (filter === 'all') ? [...all] : all.filter(item => item.type === filter);
      list = list.map(item => ({
        ...item,
        _key: `p_${item.id}`,
        _isPhrase: true
      }));
    } else if (type === 'bookmarked') {
      const allV = (window.VOCAB_DATA || []).map(i => ({ ...i, _key: `v_${i.id}`, _isSentence: false }));
      const allS = (window.SENTENCES_DATA || []).map(i => ({ ...i, _key: `s_${i.id}`, _isSentence: true }));
      const allP = (window.PHRASES_DATA || []).map(i => ({ ...i, _key: `p_${i.id}`, _isPhrase: true }));
      list = [...allV, ...allS, ...allP].filter(i => window.storage.isBookmarked(i._key));
    } else if (type === 'review') {
      const allV = (window.VOCAB_DATA || []).map(i => ({ ...i, _key: `v_${i.id}`, _isSentence: false }));
      const allS = (window.SENTENCES_DATA || []).map(i => ({ ...i, _key: `s_${i.id}`, _isSentence: true }));
      const allP = (window.PHRASES_DATA || []).map(i => ({ ...i, _key: `p_${i.id}`, _isPhrase: true }));
      list = [...allV, ...allS, ...allP].filter(i => {
        const srs = window.storage.getSRS(i._key);
        return srs.box === 1 && srs.reviewCount > 0;
      });
    }

    // Shuffle deck for variety
    this.deck = this._shuffle(list);
    this.currentIndex = 0;
    this.renderCard();
  }

  _shuffle(arr) {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  renderCard() {
    this.isFlipped = false;
    this.card.classList.remove('flipped');

    if (this.deck.length === 0) {
      this.frontTitle.textContent = 'Trống';
      this.frontIpa.textContent = 'Không có thẻ nào trong bộ này';
      this.frontBadge.textContent = '0 thẻ';
      this.currentIndexEl.textContent = '0';
      this.totalCountEl.textContent = '0';
      this.progressFillEl.style.width = '0%';
      if (this.prevBtn) this.prevBtn.disabled = true;
      if (this.nextBtn) this.nextBtn.disabled = true;
      this.backMeaning.textContent = 'Hãy đổi bộ lọc hoặc thêm từ vựng/câu giao tiếp/cụm từ.';
      this.backExampleEn.textContent = '';
      this.backExampleVi.textContent = '';
      return;
    }

    const item = this.deck[this.currentIndex];
    const total = this.deck.length;

    this.currentIndexEl.textContent = this.currentIndex + 1;
    this.totalCountEl.textContent = total;
    this.progressFillEl.style.width = `${((this.currentIndex + 1) / total) * 100}%`;
    if (this.prevBtn) this.prevBtn.disabled = (this.currentIndex === 0);
    if (this.nextBtn) this.nextBtn.disabled = (this.currentIndex >= total - 1);

    const isMarked = window.storage.isBookmarked(item._key);
    this.frontBookmarkBtn.classList.toggle('active', isMarked);
    this.frontBookmarkBtn.textContent = isMarked ? '🔖' : '🏷️';

    if (item._isPhrase) {
      this.frontBadge.textContent = `${item.level || 'B1'} • ${item.category_name}`;
      this.frontTitle.style.fontSize = '30px';
      this.frontTitle.textContent = item.phrase;
      this.frontIpa.textContent = item.pattern ? `⚡ ${item.pattern}` : '';

      this.backType.textContent = item.category_name;
      this.backMeaning.textContent = item.vi;
      this.backExampleEn.textContent = item.en_example ? `"${item.en_example}"` : '';
      this.backExampleVi.textContent = item.vi_example ? `${item.vi_example} ${item.note ? ' • 💡 ' + item.note : ''}` : '';
    } else if (item._isSentence) {
      this.frontBadge.textContent = `Sentence • ${item.topic_vi || item.topic}`;
      this.frontTitle.style.fontSize = '26px';
      this.frontTitle.textContent = `"${item.en}"`;
      this.frontIpa.textContent = item.situation ? `Tình huống: ${item.situation}` : '';

      this.backType.textContent = 'Giao tiếp';
      this.backMeaning.textContent = item.vi;
      this.backExampleEn.textContent = item.hint ? `💡 Gợi ý: ${item.hint}` : '';
      this.backExampleVi.textContent = '';
    } else {
      this.frontBadge.textContent = `${item.level || 'B1'} • ${item.topic}`;
      this.frontTitle.style.fontSize = '38px';
      this.frontTitle.textContent = item.word;
      this.frontIpa.textContent = item.ipa || '';

      this.backType.textContent = item.type || 'từ vựng';
      this.backMeaning.textContent = item.vi;
      this.backExampleEn.textContent = item.en_example ? `"${item.en_example}"` : '';
      this.backExampleVi.textContent = item.vi_example || '';
    }
  }

  _playCurrentAudio() {
    const item = this.deck[this.currentIndex];
    if (!item) return;
    let text = item.word;
    if (item._isSentence) text = item.en;
    else if (item._isPhrase) text = item.phrase;
    window.audioCtrl.speak(text);
  }

  rate(rating) {
    if (this.deck.length === 0) return;
    const current = this.deck[this.currentIndex];
    if (current) {
      window.storage.updateSRS(current._key, rating);
      window.app.updateHeaderStats();
    }

    if (this.currentIndex < this.deck.length - 1) {
      this.currentIndex++;
      this.renderCard();
    } else {
      window.app.showToast('🎉 Bạn đã hoàn thành hết lượt flashcard này!');
      this.loadDeck();
    }
  }
}

window.flashcardCtrl = new FlashcardController();
