/**
 * EngMaster Main Application Orchestrator
 * Coordinates navigation, tabs, search modal, audio settings, and notifications
 */

class Application {
  constructor() {
    this.currentTab = 'dashboard';

    // Sidebar & Mobile
    this.sidebar = document.getElementById('sidebar');
    this.mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    this.navItems = document.querySelectorAll('.nav-item');
    this.mobileNavBtns = document.querySelectorAll('.mobile-nav-btn');
    this.tabViews = document.querySelectorAll('.tab-view');

    // Header & User
    this.userXpDisplay = document.getElementById('user-xp-display');
    this.userLevelBadge = document.getElementById('user-level-badge');
    this.headerStreakCount = document.getElementById('header-streak-count');
    this.headerMasteredCount = document.getElementById('header-mastered-count');
    this.themeToggleBtn = document.getElementById('theme-toggle');
    this.voiceSelect = document.getElementById('voice-select');
    this.speedBtns = document.querySelectorAll('.speed-btn');

    // Global Search (inline dropdown)
    this.globalSearchInput = document.getElementById('global-search-input');
    this.globalSearchDropdown = document.getElementById('global-search-dropdown');
    this.globalSearchWrapper = document.getElementById('header-search-wrapper');
    // Legacy modal refs (kept for safety, modal is no longer opened)
    this.searchModalOverlay = document.getElementById('search-modal-overlay');
    this.modalSearchInput = document.getElementById('modal-search-input');
    this.modalSearchResults = document.getElementById('modal-search-results');
    this.modalSearchClose = document.getElementById('modal-search-close');

    // Toast Container
    this.toastContainer = document.getElementById('toast-container');

    this._initEvents();
  }

  init() {
    // Apply saved theme
    const savedTheme = window.storage.settings.theme || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);

    // Apply voice settings
    if (this.voiceSelect) {
      this.voiceSelect.value = window.storage.settings.voiceLang || 'en-US';
    }

    // Sync speed buttons
    const currentRate = window.storage.settings.voiceRate || 1.0;
    this.speedBtns.forEach(btn => {
      btn.classList.toggle('active', parseFloat(btn.dataset.rate) === currentRate);
    });

    // Initialize all views
    window.vocabView.init();
    window.sentenceView.init();
    if (window.phraseView) window.phraseView.init();
    if (window.grammarView) window.grammarView.init();
    if (window.listeningView) window.listeningView.init();
    if (window.aiChatView) window.aiChatView.init();
    if (window.upgraderView) window.upgraderView.init();
    if (window.ipaView) window.ipaView.init();
    if (window.chineseView) window.chineseView.init();
    window.flashcardCtrl.init();
    window.quizCtrl.init();
    window.statsCtrl.renderStats();
    if (window.dailyMissionCtrl) window.dailyMissionCtrl.init();

    this.updateHeaderStats();
    this.initDailyHighlights();
    this.updateSidebarAccount();

    // Support URL Hash Navigation (e.g. index.html#chinese:practice or #listening)
    const handleHashNav = (rawHash) => {
      if (!rawHash) return;
      const clean = rawHash.replace('#', '');
      const [mainTab, subTab] = clean.split(':');
      if (mainTab && document.getElementById(`view-${mainTab}`)) {
        this.switchTab(mainTab, subTab || null);
      }
    };
    handleHashNav(window.location.hash);
    window.addEventListener('hashchange', () => {
      handleHashNav(window.location.hash);
    });

    // Check count badges
    const vCount = (window.VOCAB_DATA || []).length;
    const sCount = (window.SENTENCES_DATA || []).length;
    const pCount = (window.PHRASES_DATA || []).length;
    const gCount = (window.GRAMMAR_DATA || []).length;
    const lCount = (window.LISTENING_DIALOGUES || []).length;
    const vBadge = document.getElementById('vocab-count-badge');
    const sBadge = document.getElementById('sentence-count-badge');
    const pBadge = document.getElementById('phrases-count-badge');
    const gBadge = document.getElementById('grammar-count-badge');
    const lBadge = document.getElementById('listening-count-badge');
    if (vBadge) vBadge.textContent = vCount.toLocaleString('vi-VN');
    if (sBadge) sBadge.textContent = sCount.toLocaleString('vi-VN');
    if (pBadge) pBadge.textContent = pCount.toLocaleString('vi-VN');
    if (gBadge) gBadge.textContent = `${gCount} Chuyên Đề`;
    if (lBadge) lBadge.textContent = `${lCount} Kịch Bản`;

    const dashVCount = document.getElementById('dash-total-words');
    const dashSCount = document.getElementById('dash-total-sentences');
    const dashPCount = document.getElementById('dash-total-phrases');
    if (dashVCount) dashVCount.textContent = vCount.toLocaleString('vi-VN');
    if (dashSCount) dashSCount.textContent = sCount.toLocaleString('vi-VN');
    if (dashPCount) dashPCount.textContent = pCount.toLocaleString('vi-VN');
  }

  _initEvents() {
    // Desktop Nav Items
    this.navItems.forEach(item => {
      item.addEventListener('click', () => {
        const tab = item.dataset.tab;
        this.switchTab(tab);
      });
    });

    // Mobile Bottom Nav (handles both English and Chinese items)
    const mobileBottomNav = document.getElementById('mobile-bottom-nav');
    if (mobileBottomNav) {
      mobileBottomNav.addEventListener('click', (e) => {
        const btn = e.target.closest('.mobile-nav-btn');
        if (!btn) return;
        if (btn.dataset.tab) {
          this.switchTab(btn.dataset.tab);
        } else if (btn.dataset.zhTab) {
          const zhTab = btn.dataset.zhTab;
          const practiceTarget = btn.dataset.practiceTabTarget;
          this.switchTab('chinese', zhTab, practiceTarget);
        }
      });
    }

    // Mobile Menu Drawer Toggle
    if (this.mobileMenuToggle) {
      this.mobileMenuToggle.addEventListener('click', () => {
        this.sidebar.classList.toggle('open');
      });
    }

    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', (e) => {
      if (window.innerWidth <= 768 && this.sidebar.classList.contains('open')) {
        if (!this.sidebar.contains(e.target) && !this.mobileMenuToggle.contains(e.target)) {
          this.sidebar.classList.remove('open');
        }
      }
    });

    // Theme Switcher
    this.themeToggleBtn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') || 'dark';
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      window.storage.saveSettings({ theme: next });
      this.showToast(`Đã chuyển sang ${next === 'dark' ? 'Giao diện tối 🌙' : 'Giao diện sáng ☀️'}`);
    });

    // Voice Selection
    if (this.voiceSelect) {
      this.voiceSelect.addEventListener('change', () => {
        window.audioCtrl.setLang(this.voiceSelect.value);
        this.showToast(`Đã chọn giọng đọc ${this.voiceSelect.value === 'en-US' ? 'Anh - Mỹ 🇺🇸' : 'Anh - Anh 🇬🇧'}`);
      });
    }

    // Speed Selectors
    this.speedBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        this.speedBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const rate = parseFloat(btn.dataset.rate);
        window.audioCtrl.setRate(rate);
        this.showToast(`Tốc độ phát âm: ${rate}x`);
      });
    });

    // Global Search Input — inline dropdown
    let searchDebounce;
    const clearBtn = document.getElementById('search-clear-btn');

    this.globalSearchInput.addEventListener('input', () => {
      const q = this.globalSearchInput.value.trim();
      this.globalSearchWrapper.classList.toggle('has-query', q.length > 0);
      if (clearBtn) clearBtn.style.display = q.length > 0 ? 'flex' : 'none';
      clearTimeout(searchDebounce);
      if (!q) {
        this.hideSearchDropdown();
        return;
      }
      searchDebounce = setTimeout(() => {
        this.handleGlobalSearch(q);
      }, 120);
    });

    this.globalSearchInput.addEventListener('focus', () => {
      const q = this.globalSearchInput.value.trim();
      if (clearBtn) clearBtn.style.display = q.length > 0 ? 'flex' : 'none';
      if (q) {
        this.handleGlobalSearch(q);
      } else {
        this.showSearchQuickTips();
      }
    });

    if (clearBtn) {
      clearBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.globalSearchInput.value = '';
        clearBtn.style.display = 'none';
        this.globalSearchWrapper.classList.remove('has-query');
        this.hideSearchDropdown();
        this.globalSearchInput.focus();
      });
    }

    // Close dropdown on outside click
    document.addEventListener('click', (e) => {
      if (this.globalSearchWrapper && !this.globalSearchWrapper.contains(e.target) && !this.globalSearchDropdown.contains(e.target)) {
        this.hideSearchDropdown();
      }
    });

    // Shortcut Ctrl+K / Cmd+K → focus search box
    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        this.globalSearchInput.focus();
        this.globalSearchInput.select();
      } else if (e.key === 'Escape') {
        this.hideSearchDropdown();
        this.globalSearchInput.blur();
      }
    });
  }

  setMobileLanguage(lang, switchMainTab = false) {
    const tabEn = document.getElementById('m-lang-tab-en');
    const tabZh = document.getElementById('m-lang-tab-zh');
    const subnavEn = document.getElementById('mobile-subnav-en');
    const subnavZh = document.getElementById('mobile-subnav-zh');

    if (lang === 'zh') {
      if (tabEn) tabEn.classList.remove('active');
      if (tabZh) tabZh.classList.add('active');
      if (subnavEn) {
        subnavEn.style.display = 'none';
        subnavEn.classList.remove('active');
      }
      if (subnavZh) {
        subnavZh.style.display = 'flex';
        subnavZh.classList.add('active');
      }

      // Also sync sidebar
      this.setSidebarLanguage('zh', false);

      if (switchMainTab && this.currentTab !== 'chinese') {
        const activeZhSub = window.chineseView ? window.chineseView.activeSubTab : 'pinyin';
        this.switchTab('chinese', activeZhSub);
      }
    } else {
      if (tabEn) tabEn.classList.add('active');
      if (tabZh) tabZh.classList.remove('active');
      if (subnavEn) {
        subnavEn.style.display = 'flex';
        subnavEn.classList.add('active');
      }
      if (subnavZh) {
        subnavZh.style.display = 'none';
        subnavZh.classList.remove('active');
      }

      // Also sync sidebar
      this.setSidebarLanguage('en', false);

      if (switchMainTab && this.currentTab === 'chinese') {
        this.switchTab('dashboard');
      }
    }
  }

  setSidebarLanguage(lang, switchMainTab = false) {
    const tabEn = document.getElementById('sidebar-tab-en');
    const tabZh = document.getElementById('sidebar-tab-zh');
    const menuEn = document.getElementById('sidebar-en-menu');
    const menuZh = document.getElementById('sidebar-zh-menu');

    if (lang === 'zh') {
      if (tabEn) tabEn.classList.remove('active');
      if (tabZh) tabZh.classList.add('active');
      if (menuEn) menuEn.style.display = 'none';
      if (menuZh) menuZh.style.display = 'block';

      if (switchMainTab && this.currentTab !== 'chinese') {
        const activeZhSub = window.chineseView ? window.chineseView.activeSubTab : 'pinyin';
        this.switchTab('chinese', activeZhSub);
      }
    } else {
      if (tabEn) tabEn.classList.add('active');
      if (tabZh) tabZh.classList.remove('active');
      if (menuEn) menuEn.style.display = 'block';
      if (menuZh) menuZh.style.display = 'none';

      if (switchMainTab && this.currentTab === 'chinese') {
        this.switchTab('dashboard');
      }
    }
  }

  switchTab(tabId, subTab = null, practiceSubTab = null) {
    this.currentTab = tabId;

    // Update search placeholder by language context & device width
    if (this.globalSearchInput) {
      const isMobile = window.innerWidth <= 768;
      this.globalSearchInput.placeholder = tabId === 'chinese'
        ? (isMobile ? 'Tìm chữ Hán, Pinyin...' : 'Tìm kiếm tiếng Trung, Pinyin, nghĩa tiếng Việt...')
        : (isMobile ? 'Tìm từ vựng, câu...' : 'Tìm kiếm nhanh từ vựng, câu giao tiếp, nghĩa tiếng Việt (Ctrl + K)...');
    }

    // Synchronize Sidebar & Mobile Bottom Nav language view
    if (tabId === 'chinese') {
      this.setSidebarLanguage('zh', false);
      this.setMobileLanguage('zh', false);
    } else {
      this.setSidebarLanguage('en', false);
      this.setMobileLanguage('en', false);
    }

    // Re-query in case DOM has updated
    const navItems = document.querySelectorAll('.nav-item');
    const zhNavItems = document.querySelectorAll('.nav-item-zh');
    const tabViews = document.querySelectorAll('.tab-view');

    // Update Nav items active state
    navItems.forEach(item => {
      item.classList.toggle('active', item.dataset.tab === tabId);
    });

    // Update English Mobile Nav buttons
    const mobileEnBtns = document.querySelectorAll('#mobile-subnav-en .mobile-nav-btn');
    mobileEnBtns.forEach(btn => {
      const isActive = (btn.dataset.tab === tabId);
      btn.classList.toggle('active', isActive);
      if (isActive && tabId !== 'chinese') {
        try {
          btn.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
        } catch (e) {}
      }
    });

    // Show active tab view
    tabViews.forEach(view => {
      view.classList.toggle('active', view.id === `view-${tabId}`);
    });

    // Sync Chinese sub-navigation if Chinese view
    if (tabId === 'chinese' && window.chineseView) {
      const targetSub = subTab || window.chineseView.activeSubTab || 'pinyin';
      window.chineseView.switchSubTab(targetSub);
      if (targetSub === 'practice' && practiceSubTab && window.chineseView.switchPracticeTab) {
        window.chineseView.switchPracticeTab(practiceSubTab);
      }
      zhNavItems.forEach(item => {
        if (targetSub === 'practice' && practiceSubTab) {
          item.classList.toggle('active', item.dataset.zhTab === 'practice' && item.dataset.practiceTabTarget === practiceSubTab);
        } else {
          item.classList.toggle('active', item.dataset.zhTab === targetSub && !item.dataset.practiceTabTarget);
        }
      });

      // Update Chinese Mobile Nav buttons
      const mobileZhBtns = document.querySelectorAll('#mobile-subnav-zh .mobile-nav-btn');
      mobileZhBtns.forEach(btn => {
        let isActive = false;
        if (targetSub === 'practice' && practiceSubTab) {
          isActive = (btn.dataset.zhTab === 'practice' && btn.dataset.practiceTabTarget === practiceSubTab);
        } else {
          isActive = (btn.dataset.zhTab === targetSub && !btn.dataset.practiceTabTarget);
        }
        btn.classList.toggle('active', isActive);
        if (isActive) {
          try {
            btn.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
          } catch (e) {}
        }
      });
    }

    // Sync Top Language Mode Switcher
    const btnModeEn = document.getElementById('btn-mode-en');
    const btnModeZh = document.getElementById('btn-mode-zh');
    if (btnModeEn && btnModeZh) {
      const isZh = tabId === 'chinese';
      btnModeEn.classList.toggle('active', !isZh);
      btnModeZh.classList.toggle('active', isZh);
      btnModeEn.style.background = isZh ? 'transparent' : 'linear-gradient(135deg, #6366f1, #8b5cf6)';
      btnModeEn.style.color = isZh ? '#cbd5e1' : '#fff';
      btnModeZh.style.background = isZh ? 'linear-gradient(135deg, #e11d48, #f59e0b)' : 'transparent';
      btnModeZh.style.color = isZh ? '#fff' : '#cbd5e1';
    }

    // Close mobile sidebar
    if (this.sidebar) this.sidebar.classList.remove('open');

    // If leaving listening tab, stop dialogue audio
    if (tabId !== 'listening' && window.listeningView) {
      window.listeningView.stopAudio();
    }
    // If leaving AI chat tab, stop recording & speech
    if (tabId !== 'aichat' && window.aiChatView) {
      window.aiChatView.onLeaveTab();
    }
    // If leaving Upgrader tab, stop pronunciation recording
    if (tabId !== 'upgrader' && window.upgraderView) {
      window.upgraderView.stopPronRecording();
    }
    // If leaving IPA tab, stop mic practice & audio
    if (tabId !== 'ipa' && window.ipaView) {
      window.ipaView.onLeaveTab();
    }
    // If leaving Chinese tab, stop speech & mic
    if (tabId !== 'chinese' && window.chineseView) {
      window.chineseView.onLeaveTab();
    }

    // Trigger tab specific refresh
    if (tabId === 'stats') {
      window.statsCtrl.renderStats();
    } else if (tabId === 'flashcard') {
      window.flashcardCtrl.loadDeck();
    } else if (tabId === 'grammar' && window.grammarView) {
      window.grammarView.renderTopics();
      window.grammarView.updateProgressSummary();
    } else if (tabId === 'listening' && window.listeningView) {
      // Refresh timeline display if needed
      window.listeningView._updateTimeDisplay();
    } else if (tabId === 'aichat' && window.aiChatView) {
      window.aiChatView.onEnterTab();
    } else if (tabId === 'upgrader' && window.upgraderView) {
      window.upgraderView.onEnterTab();
    } else if (tabId === 'ipa' && window.ipaView) {
      window.ipaView.onEnterTab();
    } else if (tabId === 'chinese' && window.chineseView) {
      window.chineseView.onEnterTab();
    } else if (tabId === 'dashboard' && window.dailyMissionCtrl) {
      window.dailyMissionCtrl.renderWidget();
      window.dailyMissionCtrl.renderScoreWidget();
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  updateHeaderStats() {
    const stats = window.storage.stats;
    const totalMastered = window.storage.mastered.size;

    this.headerStreakCount.textContent = stats.streak || 1;
    this.headerMasteredCount.textContent = totalMastered;
    this.userXpDisplay.textContent = (stats.xp || 0).toLocaleString('vi-VN');

    // User Level Title
    let levelTitle = 'Học viên mới';
    if (stats.xp >= 1500) levelTitle = 'Bậc thầy Anh ngữ 🏆';
    else if (stats.xp >= 800) levelTitle = 'Chuyên gia ngôn ngữ 🎖️';
    else if (stats.xp >= 400) levelTitle = 'Học viên tinh anh ⚡';
    else if (stats.xp >= 150) levelTitle = 'Người học chăm chỉ ⭐';

    this.userLevelBadge.textContent = levelTitle;

    // Update dashboard progress bars
    const allVocab = (window.VOCAB_DATA || []).length || 2500;
    const allSentences = (window.SENTENCES_DATA || []).length || 1000;
    const allPhrases = (window.PHRASES_DATA || []).length || 360;

    let vMastered = 0;
    let sMastered = 0;
    let pMastered = 0;
    window.storage.mastered.forEach(key => {
      if (key.startsWith('v_')) vMastered++;
      else if (key.startsWith('s_')) sMastered++;
      else if (key.startsWith('p_')) pMastered++;
    });

    const vPct = Math.round((vMastered / allVocab) * 100);
    const sPct = Math.round((sMastered / allSentences) * 100);
    const pPct = Math.round((pMastered / allPhrases) * 100);
    const totalPct = Math.round(((vMastered + sMastered + pMastered) / (allVocab + allSentences + allPhrases)) * 100);

    const vBar = document.getElementById('dash-vocab-bar');
    const vText = document.getElementById('dash-vocab-text');
    const sBar = document.getElementById('dash-sentence-bar');
    const sText = document.getElementById('dash-sentence-text');
    const pBar = document.getElementById('dash-phrase-bar');
    const pText = document.getElementById('dash-phrase-text');
    const rateText = document.getElementById('dash-mastered-rate');

    if (vBar) vBar.style.width = `${vPct}%`;
    if (vText) vText.textContent = `${vMastered} / ${allVocab} từ đã thuộc`;
    if (sBar) sBar.style.width = `${sPct}%`;
    if (sText) sText.textContent = `${sMastered} / ${allSentences} câu đã thuộc`;
    if (pBar) pBar.style.width = `${pPct}%`;
    if (pText) pText.textContent = `${pMastered} / ${allPhrases} cụm đã thuộc`;
    if (rateText) rateText.textContent = `${totalPct}%`;
    if (window.grammarView) window.grammarView.updateProgressSummary();
    if (window.dailyMissionCtrl) {
      window.dailyMissionCtrl.renderWidget();
      window.dailyMissionCtrl.renderScoreWidget();
    }
    // Refresh sidebar account display too
    this.updateSidebarAccount();
  }

  /** Refresh the sidebar account card to reflect current account */
  updateSidebarAccount() {
    if (!window.accountManager) return;
    const acc = window.accountManager.currentAccount;
    if (!acc) return;

    const nameEl = document.getElementById('sidebar-account-name');
    const avatarEl = document.getElementById('sidebar-avatar-emoji');
    const circleEl = document.getElementById('sidebar-avatar-circle');

    if (nameEl) nameEl.textContent = acc.name;
    if (avatarEl) avatarEl.textContent = acc.avatar;
    if (circleEl) circleEl.style.background = `linear-gradient(135deg, ${acc.color}, ${acc.color}88)`;
  }

  /**
   * Switch active account — replaces window.storage and re-initializes all views.
   * Called by AccountUI after the user picks a different account.
   */
  switchAccount(accountId) {
    if (!window.accountManager) return;
    const ok = window.accountManager.switchTo(accountId);
    if (!ok) return;

    // Rebuild storage for new account
    window.storage = new AppStorage(accountId);

    // Re-init all views with new data
    if (window.vocabView) window.vocabView.init();
    if (window.sentenceView) window.sentenceView.init();
    if (window.phraseView) window.phraseView.init();
    if (window.grammarView) window.grammarView.init();
    if (window.flashcardCtrl) window.flashcardCtrl.init();
    if (window.quizCtrl) window.quizCtrl.init();
    if (window.statsCtrl) window.statsCtrl.renderStats();
    if (window.dailyMissionCtrl) window.dailyMissionCtrl.init();

    // Apply saved theme from this account
    const savedTheme = window.storage.settings.theme || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);

    this.updateHeaderStats();
    this.updateSidebarAccount();
    this.initDailyHighlights();

    const acc = window.accountManager.currentAccount;
    this.showToast(`👤 Đã chuyển sang tài khoản: ${acc ? acc.name : ''}`, 'success');
  }

  initDailyHighlights() {
    const vocab = window.VOCAB_DATA || [];
    const sentences = window.SENTENCES_DATA || [];
    if (vocab.length === 0 || sentences.length === 0) return;

    // Pick deterministic item based on day of year
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now - start;
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);

    const dailyWord = vocab[dayOfYear % vocab.length];
    const dailySentence = sentences[dayOfYear % sentences.length];

    // Word
    const wTitle = document.getElementById('daily-word-title');
    const wIpa = document.getElementById('daily-word-ipa');
    const wVi = document.getElementById('daily-word-vi');
    const wEx = document.getElementById('daily-word-example');
    const wAudioBtn = document.getElementById('daily-word-audio-btn');

    if (wTitle) wTitle.textContent = dailyWord.word;
    if (wIpa) wIpa.textContent = `${dailyWord.ipa || ''} • (${dailyWord.type || 'word'})`;
    if (wVi) wVi.textContent = dailyWord.vi;
    if (wEx && dailyWord.en_example) {
      wEx.innerHTML = `
        <p class="en">"${dailyWord.en_example}"</p>
        <p class="vi">${dailyWord.vi_example || ''}</p>
      `;
    }
    if (wAudioBtn) {
      wAudioBtn.onclick = () => window.audioCtrl.speak(dailyWord.word);
    }

    // Sentence
    const sTitle = document.getElementById('daily-sentence-title');
    const sContext = document.getElementById('daily-sentence-context');
    const sVi = document.getElementById('daily-sentence-vi');
    const sHint = document.getElementById('daily-sentence-hint');
    const sAudioBtn = document.getElementById('daily-sentence-audio-btn');

    if (sTitle) sTitle.textContent = `"${dailySentence.en}"`;
    if (sContext) sContext.textContent = `Tình huống: ${dailySentence.situation || dailySentence.topic_vi || dailySentence.topic}`;
    if (sVi) sVi.textContent = dailySentence.vi;
    if (sHint) sHint.textContent = `💡 ${dailySentence.hint || 'Câu giao tiếp thông dụng hàng ngày.'}`;
    if (sAudioBtn) {
      sAudioBtn.onclick = () => window.audioCtrl.speak(dailySentence.en);
    }
  }

  // ── Inline Search Dropdown ──────────────────────────────────────────────
  showSearchDropdown(html) {
    if (!this.globalSearchDropdown) return;
    this.globalSearchDropdown.innerHTML = html;
    this.globalSearchDropdown.style.display = 'block';
  }

  hideSearchDropdown() {
    if (!this.globalSearchDropdown) return;
    this.globalSearchDropdown.style.display = 'none';
    this.globalSearchDropdown.innerHTML = '';
    if (this.globalSearchWrapper) {
      this.globalSearchWrapper.classList.remove('has-query');
    }
  }

  showSearchQuickTips() {
    const isChinese = this.currentTab === 'chinese';
    const html = `
      <div class="gsd-quick-tips">
        <div class="gsd-tip-header">
          <span style="font-size: 16px;">${isChinese ? '🇨🇳' : '🇬🇧'}</span>
          <span>${isChinese ? 'Tìm kiếm tiếng Trung' : 'Tìm kiếm tiếng Anh'}</span>
        </div>
        <p class="gsd-tip-text">
          ${isChinese
            ? 'Nhập <strong>Chữ Hán</strong> (你好), <strong>Pinyin</strong> (xiexie), <strong>Hán Việt</strong> hoặc <strong>tiếng Việt</strong>.'
            : 'Nhập <strong>từ vựng</strong> (hello), <strong>câu giao tiếp</strong> (how are you) hoặc <strong>nghĩa tiếng Việt</strong>.'}
        </p>
        <div class="gsd-tip-tags">
          ${isChinese
            ? '<span class="gsd-tip-pill" onclick="app.setSearchQuery(\'你好\')">你好</span><span class="gsd-tip-pill" onclick="app.setSearchQuery(\'xièxie\')">xièxie</span><span class="gsd-tip-pill" onclick="app.setSearchQuery(\'cảm ơn\')">cảm ơn</span><span class="gsd-tip-pill" onclick="app.setSearchQuery(\'ngữ pháp\')">ngữ pháp</span>'
            : '<span class="gsd-tip-pill" onclick="app.setSearchQuery(\'hello\')">hello</span><span class="gsd-tip-pill" onclick="app.setSearchQuery(\'thank you\')">thank you</span><span class="gsd-tip-pill" onclick="app.setSearchQuery(\'xin chào\')">xin chào</span><span class="gsd-tip-pill" onclick="app.setSearchQuery(\'ngữ pháp\')">ngữ pháp</span>'}
        </div>
      </div>
    `;
    this.showSearchDropdown(html);
  }

  setSearchQuery(q) {
    if (!this.globalSearchInput) return;
    this.globalSearchInput.value = q;
    this.globalSearchInput.focus();
    this.handleGlobalSearch(q);
    const clearBtn = document.getElementById('search-clear-btn');
    if (clearBtn) clearBtn.style.display = 'flex';
  }

  handleGlobalSearch(query) {
    if (!query) { this.hideSearchDropdown(); return; }

    const q = query.toLowerCase().trim();
    if (!q) { this.hideSearchDropdown(); return; }

    const isChinese = this.currentTab === 'chinese';
    let html = '';

    if (isChinese) {
      // ── Tiếng Trung ───────────────────────────────────────────────────────
      const vocab   = window.CHINESE_VOCAB_DATA   || [];
      const phrases = window.CHINESE_PHRASES_DATA || [];
      const grammar = window.CHINESE_GRAMMAR_DATA || [];

      const matchedVocab = vocab.filter(v =>
        (v.hanzi   && v.hanzi.includes(query)) ||
        (v.pinyin  && v.pinyin.toLowerCase().includes(q)) ||
        (v.hanviet && v.hanviet.toLowerCase().includes(q)) ||
        (v.vi      && v.vi.toLowerCase().includes(q))
      ).slice(0, 8);

      const matchedPhrases = phrases.filter(p =>
        (p.cn      && p.cn.includes(query)) ||
        (p.pinyin  && p.pinyin.toLowerCase().includes(q)) ||
        (p.vi      && p.vi.toLowerCase().includes(q))
      ).slice(0, 6);

      const matchedGrammar = grammar.filter(g =>
        (g.title    && g.title.toLowerCase().includes(q)) ||
        (g.subtitle && g.subtitle.toLowerCase().includes(q)) ||
        (g.summary  && g.summary.toLowerCase().includes(q))
      ).slice(0, 4);

      if (matchedVocab.length === 0 && matchedPhrases.length === 0 && matchedGrammar.length === 0) {
        html = `<div class="gsd-empty">🔍 Không tìm thấy kết quả cho "${this._escapeHtml(query)}" trong phần Tiếng Trung</div>`;
      } else {
        if (matchedVocab.length > 0) {
          html += `<div class="gsd-section-label" style="color:#e11d48;">🀄 Từ vựng Hán tự (${matchedVocab.length})</div>`;
          html += matchedVocab.map(v => `
            <div class="gsd-item" data-action="zh-vocab" data-hanzi="${this._escapeHtml(v.hanzi || '')}">
              <div class="gsd-item-text">
                <div class="gsd-item-title">
                  <span style="font-size:18px;">${this._escapeHtml(v.hanzi || '')}</span>
                  <span style="font-size:12px;color:var(--text-muted);margin-left:8px;">${this._escapeHtml(v.pinyin || '')}</span>
                  <span style="font-size:11px;color:#f59e0b;margin-left:6px;">${this._escapeHtml(v.hanviet || '')}</span>
                </div>
                <div class="gsd-item-sub">${this._escapeHtml(v.vi || '')}</div>
              </div>
              <button class="gsd-audio-btn" data-text="${this._escapeHtml(v.hanzi || '')}" data-lang="zh-CN" title="Nghe phát âm">🔊</button>
            </div>
          `).join('');
        }

        if (matchedPhrases.length > 0) {
          if (matchedVocab.length > 0) html += '<div class="gsd-divider"></div>';
          html += `<div class="gsd-section-label" style="color:#38bdf8;">💬 Câu & Cụm từ tiếng Trung (${matchedPhrases.length})</div>`;
          html += matchedPhrases.map(p => `
            <div class="gsd-item" data-action="zh-phrase" data-cn="${this._escapeHtml(p.cn || '')}">
              <div class="gsd-item-text">
                <div class="gsd-item-title">
                  <span style="font-size:15px;">${this._escapeHtml(p.cn || '')}</span>
                  <span style="font-size:11px;color:var(--text-muted);margin-left:8px;">${this._escapeHtml(p.pinyin || '')}</span>
                </div>
                <div class="gsd-item-sub">${this._escapeHtml(p.vi || '')}</div>
              </div>
              <button class="gsd-audio-btn" data-text="${this._escapeHtml(p.cn || '')}" data-lang="zh-CN" title="Nghe phát âm">🔊</button>
            </div>
          `).join('');
        }

        if (matchedGrammar.length > 0) {
          if (matchedVocab.length || matchedPhrases.length) html += '<div class="gsd-divider"></div>';
          html += `<div class="gsd-section-label" style="color:#fb923c;">📖 Ngữ pháp (${matchedGrammar.length})</div>`;
          html += matchedGrammar.map(g => `
            <div class="gsd-item" data-action="zh-grammar" data-gr-id="${g.id}">
              <div class="gsd-item-text">
                <div class="gsd-item-title">${g.icon || '📖'} ${this._escapeHtml(g.title || '')} <span style="font-size:10px;color:var(--text-muted);">${g.level || ''}</span></div>
                <div class="gsd-item-sub">${this._escapeHtml(g.subtitle || '')}</div>
              </div>
            </div>
          `).join('');
        }
      }

    } else {
      // ── Tiếng Anh ─────────────────────────────────────────────────────────
      const vocab    = window.VOCAB_DATA    || [];
      const sentences= window.SENTENCES_DATA|| [];
      const phrases  = window.PHRASES_DATA  || [];
      const grammar  = window.GRAMMAR_DATA  || [];

      const matchedVocab     = vocab.filter(v => (v.word && v.word.toLowerCase().includes(q)) || (v.vi && v.vi.toLowerCase().includes(q))).slice(0, 8);
      const matchedSentences = sentences.filter(s => (s.en && s.en.toLowerCase().includes(q)) || (s.vi && s.vi.toLowerCase().includes(q))).slice(0, 6);
      const matchedPhrases   = phrases.filter(p => (p.phrase && p.phrase.toLowerCase().includes(q)) || (p.vi && p.vi.toLowerCase().includes(q)) || (p.pattern && p.pattern.toLowerCase().includes(q))).slice(0, 5);
      const matchedGrammar   = grammar.filter(g => (g.title && g.title.toLowerCase().includes(q)) || (g.subtitle && g.subtitle.toLowerCase().includes(q)) || (g.summary && g.summary.toLowerCase().includes(q))).slice(0, 4);

      if (!matchedVocab.length && !matchedSentences.length && !matchedPhrases.length && !matchedGrammar.length) {
        html = `<div class="gsd-empty">🔍 Không tìm thấy kết quả cho "${this._escapeHtml(query)}"</div>`;
      } else {
        if (matchedVocab.length > 0) {
          html += `<div class="gsd-section-label" style="color:var(--primary);">📚 Từ vựng (${matchedVocab.length})</div>`;
          html += matchedVocab.map(v => `
            <div class="gsd-item" data-action="en-vocab" data-word="${this._escapeHtml(v.word || '')}">
              <div class="gsd-item-text">
                <div class="gsd-item-title">${this._escapeHtml(v.word || '')} <span style="font-size:12px;color:var(--accent-cyan);font-weight:500;">${v.ipa || ''}</span></div>
                <div class="gsd-item-sub">${this._escapeHtml(v.vi || '')}</div>
              </div>
              <button class="gsd-audio-btn" data-text="${this._escapeHtml(v.word || '')}" title="Nghe phát âm">🔊</button>
            </div>
          `).join('');
        }

        if (matchedPhrases.length > 0) {
          if (matchedVocab.length) html += '<div class="gsd-divider"></div>';
          html += `<div class="gsd-section-label" style="color:#38bdf8;">⚡ Cụm từ (${matchedPhrases.length})</div>`;
          html += matchedPhrases.map(p => `
            <div class="gsd-item" data-action="en-phrase" data-phrase="${this._escapeHtml(p.phrase || '')}">
              <div class="gsd-item-text">
                <div class="gsd-item-title">${this._escapeHtml(p.phrase || '')} <span style="font-size:11px;color:var(--text-muted);">(${p.category_name || ''})</span></div>
                <div class="gsd-item-sub">${this._escapeHtml(p.vi || '')}</div>
              </div>
              <button class="gsd-audio-btn" data-text="${this._escapeHtml(p.phrase || '')}" title="Nghe phát âm">🔊</button>
            </div>
          `).join('');
        }

        if (matchedSentences.length > 0) {
          if (matchedVocab.length || matchedPhrases.length) html += '<div class="gsd-divider"></div>';
          html += `<div class="gsd-section-label" style="color:var(--accent-amber);">💬 Câu giao tiếp (${matchedSentences.length})</div>`;
          html += matchedSentences.map(s => `
            <div class="gsd-item" data-action="en-sentence" data-en="${this._escapeHtml(s.en || '')}">
              <div class="gsd-item-text">
                <div class="gsd-item-title">"${this._escapeHtml(s.en || '')}"</div>
                <div class="gsd-item-sub">${this._escapeHtml(s.vi || '')}</div>
              </div>
              <button class="gsd-audio-btn" data-text="${this._escapeHtml(s.en || '')}" title="Nghe phát âm">🔊</button>
            </div>
          `).join('');
        }

        if (matchedGrammar.length > 0) {
          if (matchedVocab.length || matchedPhrases.length || matchedSentences.length) html += '<div class="gsd-divider"></div>';
          html += `<div class="gsd-section-label" style="color:#a855f7;">📖 Ngữ pháp (${matchedGrammar.length})</div>`;
          html += matchedGrammar.map(g => `
            <div class="gsd-item" data-action="en-grammar" data-id="${g.id}">
              <div class="gsd-item-text">
                <div class="gsd-item-title">${g.icon || '📖'} ${this._escapeHtml(g.title || '')} <span style="font-size:11px;color:var(--text-muted);">(${g.level || ''})</span></div>
                <div class="gsd-item-sub">${this._escapeHtml(g.subtitle || '')}</div>
              </div>
            </div>
          `).join('');
        }
      }
    }

    this.showSearchDropdown(html);

    // Attach audio buttons
    this.globalSearchDropdown.querySelectorAll('.gsd-audio-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const lang = btn.dataset.lang;
        if (lang === 'zh-CN') {
          const utter = new SpeechSynthesisUtterance(btn.dataset.text);
          utter.lang = 'zh-CN';
          speechSynthesis.cancel();
          speechSynthesis.speak(utter);
        } else {
          window.audioCtrl.speak(btn.dataset.text);
        }
      });
    });

    // Attach item click to navigate
    this.globalSearchDropdown.querySelectorAll('.gsd-item').forEach(item => {
      item.addEventListener('click', (e) => {
        if (e.target.classList.contains('gsd-audio-btn')) return;
        const action = item.dataset.action;
        this.hideSearchDropdown();
        this.globalSearchInput.value = '';
        this.globalSearchInput.blur();
        const clearBtn = document.getElementById('search-clear-btn');
        if (clearBtn) clearBtn.style.display = 'none';

        if (action === 'zh-vocab') {
          this.switchTab('chinese');
          if (window.chineseView) {
            window.chineseView.switchSubTab('vocab');
            setTimeout(() => {
              const si = document.getElementById('zh-vocab-search');
              if (si) { si.value = item.dataset.hanzi; si.dispatchEvent(new Event('input')); }
            }, 300);
          }
        } else if (action === 'zh-phrase') {
          this.switchTab('chinese');
          if (window.chineseView) {
            window.chineseView.switchSubTab('phrases');
          }
        } else if (action === 'zh-grammar') {
          this.switchTab('chinese');
          if (window.chineseView) {
            window.chineseView.switchSubTab('grammar');
            const grId = item.dataset.grId;
            const g = (window.CHINESE_GRAMMAR_DATA || []).find(x => x.id === grId);
            if (g) setTimeout(() => window.chineseView.openGrammarReader(g), 300);
          }
        } else if (action === 'en-vocab') {
          window.vocabView.searchInput.value = item.dataset.word;
          window.vocabView.applyFilters();
          this.switchTab('vocab');
        } else if (action === 'en-phrase') {
          if (window.phraseView && window.phraseView.searchInput) {
            window.phraseView.searchInput.value = item.dataset.phrase;
            window.phraseView.applyFilters();
          }
          this.switchTab('phrases');
        } else if (action === 'en-sentence') {
          window.sentenceView.searchInput.value = item.dataset.en;
          window.sentenceView.applyFilters();
          this.switchTab('sentences');
        } else if (action === 'en-grammar') {
          const gId = parseInt(item.dataset.id, 10);
          this.switchTab('grammar');
          if (window.grammarView) window.grammarView.openReader(gId);
        }
      });
    });
  }

  showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    let icon = '✓';
    if (type === 'info') icon = 'ℹ';
    if (type === 'warn') icon = '⚠️';

    toast.innerHTML = `
      <span>${icon}</span>
      <span>${this._escapeHtml(message)}</span>
    `;

    this.toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
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

window.app = new Application();
document.addEventListener('DOMContentLoaded', () => {
  window.app.init();
});
