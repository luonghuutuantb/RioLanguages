/**
 * EngMaster Storage Module
 * Manages user progress, bookmarks, mastery status, streaks, and XP in LocalStorage
 * Supports multi-account personalization via userId prefix on all keys
 */

function _buildStorageKeys(prefix) {
  const p = prefix ? prefix + '_' : '';
  return {
    BOOKMARKS: p + 'engmaster_bookmarks',
    MASTERED: p + 'engmaster_mastered',
    LEARNING: p + 'engmaster_learning',
    SRS_DATA: p + 'engmaster_srs_data',
    USER_STATS: p + 'engmaster_user_stats',
    SETTINGS: p + 'engmaster_settings',
    AI_SETTINGS: p + 'engmaster_ai_settings',
    AI_CHATS: p + 'engmaster_ai_chats',
    DAILY_MISSIONS: p + 'engmaster_daily_missions',
    ROLEPLAY_PROGRESS: p + 'engmaster_roleplay_progress',
    ZH_WEAK_WORDS: p + 'rio_chinese_weak_words',
    ZH_TEST_RESULTS: p + 'rio_chinese_test_results',
    ZH_AI_CHATS: p + 'rio_chinese_ai_chats',
    ZH_ROLEPLAY: p + 'rio_chinese_roleplay_progress',
    ZH_SRS_DATA: p + 'rio_chinese_srs_data'
  };
}

class AppStorage {
  constructor(prefix = '') {
    this.prefix = prefix;
    const STORAGE_KEYS = _buildStorageKeys(prefix);
    this._keys = STORAGE_KEYS;
    this.bookmarks = new Set(this._getJson(STORAGE_KEYS.BOOKMARKS, []));
    this.mastered = new Set(this._getJson(STORAGE_KEYS.MASTERED, []));
    this.learning = new Set(this._getJson(STORAGE_KEYS.LEARNING, []));
    this.srsData = this._getJson(STORAGE_KEYS.SRS_DATA, {});
    this.stats = this._getJson(STORAGE_KEYS.USER_STATS, {
      xp: 0,
      streak: 1,
      lastActiveDate: new Date().toISOString().slice(0, 10),
      quizzesCompleted: 0,
      flashcardsReviewed: 0,
      speakingCount: 0,
      listeningCount: 0,
      roleplaysCompleted: 0
    });
    this.settings = this._getJson(STORAGE_KEYS.SETTINGS, {
      theme: 'dark',
      voiceRate: 1.0,
      voiceLang: 'en-US'
    });
    const defaultAiSettings = {
      geminiApiKey: '',
      geminiModel: 'gemini-3.5-flash',
      autoTTS: true,
      showViSub: true,
      grammarFeedback: true
    };
    this.aiSettings = { ...defaultAiSettings, ...this._getJson(STORAGE_KEYS.AI_SETTINGS, {}) };
    // Auto-migrate non-text, audio or invalid models
    const modelLower = String(this.aiSettings.geminiModel || '').toLowerCase();
    if (!this.aiSettings.geminiModel || 
        modelLower.includes('tts') || modelLower.includes('embedding') || modelLower.includes('bidi') || 
        modelLower.includes('imagen') || modelLower.includes('aqa') || modelLower.includes('whisper') || 
        modelLower.includes('audio') || modelLower.includes('transcribe') || modelLower.includes('clip')) {
      this.aiSettings.geminiModel = 'gemini-3.5-flash';
      this._saveJson(STORAGE_KEYS.AI_SETTINGS, this.aiSettings);
    }
    if (this.aiSettings.geminiApiKey) {
      this.settings.geminiApiKey = this.aiSettings.geminiApiKey;
      this.settings.geminiModel = this.aiSettings.geminiModel;
    }
    this.aiChats = this._getJson(STORAGE_KEYS.AI_CHATS, {});
    this.dailyMissions = this._getTodayMissions();
    this.roleplayProgress = this._getJson(STORAGE_KEYS.ROLEPLAY_PROGRESS, {});

    this._checkStreak();
  }

  /** Reload all in-memory data from localStorage (used after account switch) */
  reload() {
    const K = this._keys;
    this.bookmarks = new Set(this._getJson(K.BOOKMARKS, []));
    this.mastered = new Set(this._getJson(K.MASTERED, []));
    this.learning = new Set(this._getJson(K.LEARNING, []));
    this.srsData = this._getJson(K.SRS_DATA, {});
    this.stats = this._getJson(K.USER_STATS, {
      xp: 0, streak: 1,
      lastActiveDate: new Date().toISOString().slice(0, 10),
      quizzesCompleted: 0, flashcardsReviewed: 0,
      speakingCount: 0, listeningCount: 0, roleplaysCompleted: 0
    });
    this.aiChats = this._getJson(K.AI_CHATS, {});
    this.dailyMissions = this._getTodayMissions();
    this.roleplayProgress = this._getJson(K.ROLEPLAY_PROGRESS, {});
    this._checkStreak();
  }

  _getJson(key, defaultVal) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : defaultVal;
    } catch (e) {
      console.warn(`Error reading ${key} from storage:`, e);
      return defaultVal;
    }
  }

  _saveJson(key, val) {
    try {
      localStorage.setItem(key, JSON.stringify(val));
    } catch (e) {
      console.warn(`Error saving ${key} to storage:`, e);
    }
  }

  _checkStreak() {
    const today = new Date().toISOString().slice(0, 10);
    const last = this.stats.lastActiveDate;

    if (last !== today) {
      const lastDate = new Date(last);
      const currentDate = new Date(today);
      const diffDays = Math.round((currentDate - lastDate) / (1000 * 60 * 60 * 24));

      if (diffDays === 1) {
        this.stats.streak += 1;
      } else if (diffDays > 1) {
        this.stats.streak = 1; // streak reset
      }
      this.stats.lastActiveDate = today;
      this.saveStats();
    }
  }

  // Bookmark Management (format: "v_123" for vocab, "s_456" for sentence)
  toggleBookmark(itemKey) {
    if (this.bookmarks.has(itemKey)) {
      this.bookmarks.delete(itemKey);
      this._saveJson(this._keys.BOOKMARKS, Array.from(this.bookmarks));
      return false;
    } else {
      this.bookmarks.add(itemKey);
      this._saveJson(this._keys.BOOKMARKS, Array.from(this.bookmarks));
      return true;
    }
  }

  isBookmarked(itemKey) {
    return this.bookmarks.has(itemKey);
  }

  // Mastery Management
  setMastered(itemKey, isMastered = true) {
    if (isMastered) {
      this.mastered.add(itemKey);
      this.learning.delete(itemKey);
      this.addXP(5);
    } else {
      this.mastered.delete(itemKey);
    }
    this._saveJson(this._keys.MASTERED, Array.from(this.mastered));
    this._saveJson(this._keys.LEARNING, Array.from(this.learning));
  }

  setLearning(itemKey) {
    if (!this.mastered.has(itemKey)) {
      this.learning.add(itemKey);
      this._saveJson(this._keys.LEARNING, Array.from(this.learning));
    }
  }

  getStatus(itemKey) {
    if (this.mastered.has(itemKey)) return 'mastered';
    if (this.learning.has(itemKey)) return 'learning';
    return 'new';
  }

  // SRS Leitner Logic
  updateSRS(itemKey, rating) {
    // rating: 1 = Again, 2 = Good, 3 = Easy
    let current = this.srsData[itemKey] || { box: 1, reviewCount: 0, lastReview: null };
    current.reviewCount += 1;
    current.lastReview = new Date().toISOString();

    if (rating === 3) {
      current.box = Math.min(current.box + 1, 5);
      this.setMastered(itemKey, true);
    } else if (rating === 2) {
      current.box = Math.min(current.box, 3);
      this.setLearning(itemKey);
    } else {
      current.box = 1;
      this.setMastered(itemKey, false);
      this.setLearning(itemKey);
    }

    this.srsData[itemKey] = current;
    this._saveJson(this._keys.SRS_DATA, this.srsData);
    this.stats.flashcardsReviewed += 1;
    this.addXP(2);
    this.updateDailyMission('vocab', 1);
    this.saveStats();
  }

  getSRS(itemKey) {
    return this.srsData[itemKey] || { box: 1, reviewCount: 0 };
  }

  // XP & Gamification
  addXP(amount) {
    this.stats.xp = (this.stats.xp || 0) + amount;
    this.saveStats();
    return this.stats.xp;
  }

  saveStats() {
    this._saveJson(this._keys.USER_STATS, this.stats);
  }

  // ===================== Bookmarks (unified, uses prefixed key) =====================
  _getBookmarks() {
    try {
      const raw = localStorage.getItem(this._keys.BOOKMARKS);
      return raw ? new Set(JSON.parse(raw)) : new Set();
    } catch { return new Set(); }
  }

  _saveBookmarks(set) {
    try { localStorage.setItem(this._keys.BOOKMARKS, JSON.stringify([...set])); } catch {}
  }

  isBookmarked(key) {
    return this._getBookmarks().has(key);
  }

  addBookmark(key) {
    const set = this._getBookmarks();
    set.add(key);
    this._saveBookmarks(set);
  }

  removeBookmark(key) {
    const set = this._getBookmarks();
    set.delete(key);
    this._saveBookmarks(set);
  }

  // Settings
  saveSettings(newSettings) {
    this.settings = { ...this.settings, ...newSettings };
    this._saveJson(this._keys.SETTINGS, this.settings);
  }

  // AI Chat Settings & History
  saveAiSettings(newSettings) {
    if (newSettings && newSettings.geminiModel) {
      const lower = String(newSettings.geminiModel).toLowerCase();
      if (lower.includes('tts') || lower.includes('embedding') || lower.includes('bidi') || lower.includes('audio') || lower.includes('transcribe')) {
        newSettings.geminiModel = 'gemini-2.0-flash';
      }
    }
    this.aiSettings = { ...this.aiSettings, ...newSettings };
    this._saveJson(this._keys.AI_SETTINGS, this.aiSettings);
    if (newSettings.geminiApiKey !== undefined) {
      this.settings.geminiApiKey = newSettings.geminiApiKey;
      this.settings.geminiModel = newSettings.geminiModel || this.aiSettings.geminiModel;
      this._saveJson(this._keys.SETTINGS, this.settings);
    }
  }

  getApiKey() {
    return (this.aiSettings && this.aiSettings.geminiApiKey) || (this.settings && this.settings.geminiApiKey) || '';
  }

  getAiModel() {
    let m = (this.aiSettings && this.aiSettings.geminiModel) || (this.settings && this.settings.geminiModel) || 'gemini-3.5-flash';
    const lower = String(m).toLowerCase();
    if (!m || lower.includes('tts') || lower.includes('embedding') || lower.includes('bidi') || lower.includes('audio') || lower.includes('transcribe')) {
      m = 'gemini-3.5-flash';
      if (this.aiSettings && this.aiSettings.geminiModel !== 'gemini-3.5-flash') {
        this.aiSettings.geminiModel = 'gemini-3.5-flash';
        this._saveJson(this._keys.AI_SETTINGS, this.aiSettings);
      }
      if (this.settings && this.settings.geminiModel !== 'gemini-3.5-flash') {
        this.settings.geminiModel = 'gemini-3.5-flash';
        this._saveJson(this._keys.SETTINGS, this.settings);
      }
    }
    return m;
  }

  getPersonaChatHistory(personaId) {
    return this.aiChats[personaId] || [];
  }

  savePersonaChatHistory(personaId, messages) {
    this.aiChats[personaId] = messages;
    this._saveJson(this._keys.AI_CHATS, this.aiChats);
  }

  clearPersonaChatHistory(personaId) {
    if (this.aiChats[personaId]) {
      delete this.aiChats[personaId];
      this._saveJson(this._keys.AI_CHATS, this.aiChats);
    }
  }

  // Daily 5-Minute Habit Missions
  _getTodayMissions() {
    const today = new Date().toISOString().slice(0, 10);
    const stored = this._getJson(this._keys.DAILY_MISSIONS, null);
    if (stored && stored.date === today) {
      return stored;
    }
    // New Day -> Generate fresh mission sheet
    const fresh = {
      date: today,
      completedCount: 0,
      rewardClaimed: false,
      missions: {
        listen: { id: 'listen', name: '1 phút luyện nghe hội thoại', target: 1, current: 0, done: false, icon: '🎧', tab: 'listening', xp: 15 },
        shadow: { id: 'shadow', name: '2 phút luyện nói & phát âm', target: 2, current: 0, done: false, icon: '🎙️', tab: 'aichat', xp: 20 },
        vocab:  { id: 'vocab',  name: '1 phút ôn 5 từ vựng Flashcard', target: 5, current: 0, done: false, icon: '🎴', tab: 'flashcard', xp: 15 },
        chat:   { id: 'chat',   name: '1 phút tương tác với AI Rio', target: 2, current: 0, done: false, icon: '🦜', tab: 'aichat', xp: 15 }
      }
    };
    this._saveJson(this._keys.DAILY_MISSIONS, fresh);
    return fresh;
  }

  updateDailyMission(missionId, amount = 1) {
    const todayMissions = this._getTodayMissions();
    const item = todayMissions.missions[missionId];
    if (!item) return false;

    item.current = Math.min(item.target, (item.current || 0) + amount);
    const wasDone = item.done;
    if (item.current >= item.target && !item.done) {
      item.done = true;
      todayMissions.completedCount = Object.values(todayMissions.missions).filter(m => m.done).length;
      this.addXP(item.xp);
      if (window.app) {
        window.app.showToast(`🎉 Hoàn thành nhiệm vụ: ${item.name} (+${item.xp} XP)`, 'success');
      }
    }

    // Check if all 4 completed for bonus
    if (todayMissions.completedCount === 4 && !todayMissions.rewardClaimed) {
      todayMissions.rewardClaimed = true;
      this.addXP(50);
      if (window.app) {
        window.app.showToast('🏆 Chúc mừng! Bạn đã hoàn thành 5 Phút Tiếng Anh Hôm Nay (+50 XP Thưởng)!', 'success');
      }
    }

    this.dailyMissions = todayMissions;
    this._saveJson(this._keys.DAILY_MISSIONS, todayMissions);
    if (window.dailyMissionCtrl) {
      window.dailyMissionCtrl.renderWidget();
    }
    return true;
  }

  // Roleplay Objectives Persistence
  getRoleplayStatus(personaId) {
    return this.roleplayProgress[personaId] || { completedIds: [] };
  }

  markRoleplayObjectiveDone(personaId, objectiveId) {
    if (!this.roleplayProgress[personaId]) {
      this.roleplayProgress[personaId] = { completedIds: [] };
    }
    if (!this.roleplayProgress[personaId].completedIds.includes(objectiveId)) {
      this.roleplayProgress[personaId].completedIds.push(objectiveId);
      this._saveJson(this._keys.ROLEPLAY_PROGRESS, this.roleplayProgress);
      this.addXP(15);
      this.stats.roleplaysCompleted = (this.stats.roleplaysCompleted || 0) + 1;
      this.saveStats();
      return true;
    }
    return false;
  }

  incrementSpeaking() {
    this.stats.speakingCount = (this.stats.speakingCount || 0) + 1;
    this.saveStats();
    this.updateDailyMission('shadow', 1);
  }

  incrementListening() {
    this.stats.listeningCount = (this.stats.listeningCount || 0) + 1;
    this.saveStats();
    this.updateDailyMission('listen', 1);
  }

  // Rio English Score (0–100 Matrix Calculator)
  getRioEnglishScore() {
    const allVocabCount = (window.VOCAB_DATA || []).length || 2500;
    const allSentencesCount = (window.SENTENCES_DATA || []).length || 1000;
    const masteredWords = this.mastered.size;

    // 1. Vocab (0-100)
    const vocabScore = Math.min(100, Math.round((masteredWords / 300) * 100) || 12);

    // 2. Listening (0-100)
    const listeningCount = this.stats.listeningCount || 0;
    const listeningScore = Math.min(100, Math.max(10, Math.round(listeningCount * 8)));

    // 3. Speaking (0-100)
    const speakingCount = this.stats.speakingCount || 0;
    const speakingScore = Math.min(100, Math.max(10, Math.round(speakingCount * 10)));

    // 4. Grammar (0-100)
    const quizzes = this.stats.quizzesCompleted || 0;
    const grammarScore = Math.min(100, Math.max(15, Math.round(quizzes * 12)));

    // 5. Pronunciation (0-100)
    const pronScore = Math.min(100, Math.max(15, Math.round((speakingScore * 0.7) + (vocabScore * 0.3))));

    // 6. Fluency (0-100)
    const streakBonus = Math.min(30, (this.stats.streak || 1) * 5);
    const fluencyScore = Math.min(100, Math.max(10, Math.round((speakingScore * 0.5) + streakBonus + 10)));

    // Overall Weighted Average
    const overall = Math.round(
      vocabScore * 0.20 +
      listeningScore * 0.20 +
      speakingScore * 0.25 +
      grammarScore * 0.15 +
      pronScore * 0.10 +
      fluencyScore * 0.10
    );

    let cefr = 'A1';
    let label = 'Sơ cấp (Beginner)';
    if (overall >= 86) { cefr = 'C1'; label = 'Cao cấp (Advanced)'; }
    else if (overall >= 71) { cefr = 'B2'; label = 'Trung cấp trên (Upper-Intermediate)'; }
    else if (overall >= 51) { cefr = 'B1'; label = 'Trung cấp (Intermediate)'; }
    else if (overall >= 26) { cefr = 'A2'; label = 'Tiền trung cấp (Pre-Intermediate)'; }

    return {
      overall,
      cefr,
      label,
      skills: {
        speaking: { name: 'Nói (Speaking)', score: speakingScore, icon: '🗣️' },
        listening: { name: 'Nghe (Listening)', score: listeningScore, icon: '🎧' },
        vocab: { name: 'Từ vựng (Vocabulary)', score: vocabScore, icon: '📚' },
        grammar: { name: 'Ngữ pháp (Grammar)', score: grammarScore, icon: '⚖️' },
        pronunciation: { name: 'Phát âm (Pronunciation)', score: pronScore, icon: '🎙️' },
        fluency: { name: 'Độ trôi chảy (Fluency)', score: fluencyScore, icon: '⚡' }
      }
    };
  }

  // Reset Progress
  resetAll() {
    this.bookmarks.clear();
    this.mastered.clear();
    this.learning.clear();
    this.srsData = {};
    this.stats = {
      xp: 0,
      streak: 1,
      lastActiveDate: new Date().toISOString().slice(0, 10),
      quizzesCompleted: 0,
      flashcardsReviewed: 0,
      speakingCount: 0,
      listeningCount: 0,
      roleplaysCompleted: 0
    };
    this.roleplayProgress = {};
    this._saveJson(this._keys.BOOKMARKS, []);
    this._saveJson(this._keys.MASTERED, []);
    this._saveJson(this._keys.LEARNING, []);
    this._saveJson(this._keys.SRS_DATA, {});
    this._saveJson(this._keys.ROLEPLAY_PROGRESS, {});
    this.dailyMissions = this._getTodayMissions();
    this.saveStats();
  }

  // =========================================================================
  // RIO CHINESE STORAGE HELPERS
  // =========================================================================
  getChineseWeakWords() {
    return this._getJson(this._keys.ZH_WEAK_WORDS, {});
  }

  recordChineseWordResult(word, isCorrect) {
    if (!word || !word.hanzi) return;
    const key = word.id || word.hanzi;
    const current = this.getChineseWeakWords();
    if (!isCorrect) {
      if (!current[key]) {
        current[key] = {
          id: key,
          hanzi: word.hanzi,
          pinyin: word.pinyin || '',
          hanviet: word.hanviet || '',
          vi: word.vi || '',
          level: word.level || 'HSK1',
          category: word.category || 'general',
          errorCount: 1,
          lastFailed: new Date().toISOString()
        };
      } else {
        current[key].errorCount = (current[key].errorCount || 0) + 1;
        current[key].lastFailed = new Date().toISOString();
      }
    } else {
      if (current[key]) {
        current[key].errorCount = (current[key].errorCount || 1) - 1;
        if (current[key].errorCount <= 0) {
          delete current[key];
        }
      }
    }
    this._saveJson(this._keys.ZH_WEAK_WORDS, current);
  }

  removeChineseWeakWord(wordId) {
    const current = this.getChineseWeakWords();
    if (current[wordId]) {
      delete current[wordId];
      this._saveJson(this._keys.ZH_WEAK_WORDS, current);
    }
  }

  clearChineseWeakWords() {
    this._saveJson(this._keys.ZH_WEAK_WORDS, {});
  }

  getChineseTestResults() {
    return this._getJson(this._keys.ZH_TEST_RESULTS, []);
  }

  saveChineseTestResult(result) {
    const list = this.getChineseTestResults();
    list.unshift({
      ...result,
      id: 'zh_test_' + Date.now(),
      date: new Date().toISOString()
    });
    if (list.length > 30) list.length = 30; // keep last 30
    this._saveJson(this._keys.ZH_TEST_RESULTS, list);
  }

  getChineseAiChatHistory(scenarioId = 'default') {
    const all = this._getJson(this._keys.ZH_AI_CHATS, {});
    return all[scenarioId] || [];
  }

  saveChineseAiChatHistory(scenarioId = 'default', messages = []) {
    const all = this._getJson(this._keys.ZH_AI_CHATS, {});
    all[scenarioId] = messages;
    this._saveJson(this._keys.ZH_AI_CHATS, all);
  }

  getChineseRoleplayProgress() {
    return this._getJson(this._keys.ZH_ROLEPLAY, {});
  }

  saveChineseRoleplayProgress(scenarioId, data) {
    const all = this.getChineseRoleplayProgress();
    all[scenarioId] = {
      ...(all[scenarioId] || {}),
      ...data,
      lastPlayed: new Date().toISOString()
    };
    this._saveJson(this._keys.ZH_ROLEPLAY, all);
  }

  getChineseSrsCards() {
    return this._getJson(this._keys.ZH_SRS_DATA, {});
  }

  saveChineseSrsCards(cards) {
    this._saveJson(this._keys.ZH_SRS_DATA, cards);
  }

  recordChineseSrsReview(wordId, grade) {
    // grade: 1 (Quên), 2 (Khó), 3 (Tốt), 4 (Dễ)
    const cards = this.getChineseSrsCards();
    let card = cards[wordId] || {
      id: wordId,
      repetitions: 0,
      interval: 1,
      easeFactor: 2.5,
      dueDate: Date.now(),
      state: 'learning'
    };

    let { repetitions, interval, easeFactor } = card;

    if (grade >= 3) {
      if (repetitions === 0) {
        interval = 1;
      } else if (repetitions === 1) {
        interval = (grade === 4) ? 4 : 3;
      } else {
        const bonus = (grade === 4) ? 1.3 : 1.0;
        interval = Math.max(1, Math.round(interval * easeFactor * bonus));
      }
      repetitions++;
    } else {
      repetitions = 0;
      interval = 1;
    }

    // SuperMemo-2 ease factor formula (grades mapped 1..4 -> 2..5)
    const q = grade + 1; // 2..5
    easeFactor = Math.max(1.3, easeFactor + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02)));

    card.repetitions = repetitions;
    card.interval = interval;
    card.easeFactor = Math.round(easeFactor * 100) / 100;
    card.lastReviewed = Date.now();
    card.dueDate = Date.now() + interval * 24 * 60 * 60 * 1000;
    card.state = (repetitions >= 4) ? 'mastered' : (repetitions >= 1 ? 'review' : 'learning');

    cards[wordId] = card;
    this.saveChineseSrsCards(cards);
    return card;
  }

  resetChineseSrsData() {
    this._saveJson(this._keys.ZH_SRS_DATA, {});
  }
}

// Initialize storage with the current account's prefix
// account-manager.js must be loaded before storage.js
const _activeAccountId = window.accountManager ? window.accountManager.currentId : '';
window.storage = new AppStorage(_activeAccountId);

/**
 * Dynamically queries Google Generative Language API using the user's API Key
 * to discover the exact models supported and active for this specific account.
 */
window.discoverGeminiModels = async function(apiKey) {
  if (!apiKey || !apiKey.trim()) return null;
  const cleanKey = apiKey.trim();

  const apiVersions = ['v1beta', 'v1'];
  for (const ver of apiVersions) {
    try {
      const endpoint = `https://generativelanguage.googleapis.com/${ver}/models?key=${encodeURIComponent(cleanKey)}`;
      const ctrl = new AbortController();
      const tid = setTimeout(() => ctrl.abort(), 3500);
      let res;
      try {
        res = await fetch(endpoint, { signal: ctrl.signal });
      } finally {
        clearTimeout(tid);
      }
      if (res.ok) {
        const data = await res.json();
        const isTextModel = (name) => {
          if (!name || typeof name !== 'string') return false;
          const lower = name.toLowerCase();
          if (lower.includes('tts') || lower.includes('embedding') || lower.includes('bidi') || 
              lower.includes('imagen') || lower.includes('aqa') || lower.includes('computer-use') ||
              lower.includes('whisper') || lower.includes('audio') || lower.includes('robotics') ||
              lower.includes('clip') || lower.includes('transcribe') || lower.includes('veo') ||
              lower.includes('image')) {
            return false;
          }
          return lower.startsWith('gemini-');
        };

        const validModels = (data.models || [])
          .filter(m => Array.isArray(m.supportedGenerationMethods) && m.supportedGenerationMethods.includes('generateContent'))
          .map(m => m.name.replace(/^models\//, ''))
          .filter(isTextModel);

        const rankModel = (name) => {
          if (name === 'gemini-3.5-flash') return 140;
          if (name === 'gemini-3.5-flash-lite') return 135;
          if (name === 'gemini-3.6-flash') return 130;
          if (name === 'gemini-2.0-flash') return 120;
          if (name === 'gemini-2.0-flash-lite') return 115;
          if (name === 'gemini-1.5-flash') return 100;
          if (name === 'gemini-1.5-flash-8b') return 95;
          if (name === 'gemini-1.5-flash-latest') return 90;
          if (name === 'gemini-1.5-pro') return 80;
          if (name === 'gemini-pro') return 70;
          return 50;
        };
        validModels.sort((a, b) => rankModel(b) - rankModel(a));

        if (validModels.length > 0) {
          const recommended = validModels[0] || 'gemini-3.5-flash';

          return {
            apiVersion: ver,
            models: validModels,
            recommended: recommended
          };
        }
      } else {
        const errJson = await res.json().catch(() => ({}));
        if (errJson.error?.message) {
          return { error: errJson.error.message, code: res.status };
        }
      }
    } catch (e) {
      console.warn(`discoverGeminiModels on ${ver} failed:`, e);
    }
  }
  return null;
};
