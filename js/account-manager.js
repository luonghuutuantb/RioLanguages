/**
 * Rio Languages - Account Manager
 * Manages multiple user accounts with isolated learning data
 * Each account gets a unique ID used as prefix for all localStorage keys
 */

const ACCOUNT_STORE_KEY = 'rio_accounts_meta';

// Legacy storage keys (used before account system was introduced)
const LEGACY_KEYS = [
  'engmaster_bookmarks',
  'engmaster_mastered',
  'engmaster_learning',
  'engmaster_srs_data',
  'engmaster_user_stats',
  'engmaster_settings',
  'engmaster_ai_settings',
  'engmaster_ai_chats',
  'engmaster_daily_missions',
  'engmaster_roleplay_progress',
  'rio_chinese_weak_words',
  'rio_chinese_test_results',
  'rio_chinese_ai_chats',
  'rio_chinese_roleplay_progress',
  'rio_chinese_srs_data',
  'rio_bookmarks'
];

const ACCOUNT_AVATARS = ['🎯', '🦜', '🌟', '🚀', '🦊', '🐉', '🎓', '🌈', '🎵', '🏆', '🦁', '🐬', '🦋', '🌺', '⚡', '🎭'];
const ACCOUNT_COLORS = [
  '#6366f1', '#8b5cf6', '#06b6d4', '#10b981',
  '#f59e0b', '#ef4444', '#ec4899', '#3b82f6',
  '#14b8a6', '#f97316', '#84cc16', '#a855f7'
];

class AccountManager {
  constructor() {
    this._data = null;
    this._init();
  }

  _init() {
    let data = this._loadData();

    if (!data || !Array.isArray(data.accounts) || data.accounts.length === 0) {
      // First run — create default account and migrate any existing data
      const defaultAccount = this._createAccountObj('Học Viên', '🎯', '#6366f1');
      data = { accounts: [defaultAccount], currentId: defaultAccount.id };
      this._saveData(data);
      this._migrateLegacyData(defaultAccount.id);
    }

    // Validate currentId still exists
    if (!data.accounts.find(a => a.id === data.currentId)) {
      data.currentId = data.accounts[0].id;
      this._saveData(data);
    }

    this._data = data;
  }

  // ── Private Helpers ─────────────────────────────────────────────────────────

  _loadData() {
    try {
      const raw = localStorage.getItem(ACCOUNT_STORE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }

  _saveData(data) {
    try {
      localStorage.setItem(ACCOUNT_STORE_KEY, JSON.stringify(data));
      this._data = data;
    } catch (e) {
      console.warn('[AccountManager] Could not save account data:', e);
    }
  }

  _createAccountObj(name, avatar, color) {
    return {
      id: 'acc_' + Date.now() + '_' + Math.random().toString(36).slice(2, 6),
      name: name.trim() || 'Học Viên',
      avatar: avatar || '🎯',
      color: color || '#6366f1',
      createdAt: new Date().toISOString()
    };
  }

  /**
   * Copies legacy (non-prefixed) localStorage keys to the given account's prefix.
   * This ensures existing data is preserved when the account system is first enabled.
   */
  _migrateLegacyData(accountId) {
    let migrated = 0;
    for (const key of LEGACY_KEYS) {
      const val = localStorage.getItem(key);
      if (val !== null) {
        localStorage.setItem(`${accountId}_${key}`, val);
        migrated++;
      }
    }
    if (migrated > 0) {
      console.info(`[AccountManager] Migrated ${migrated} legacy storage keys → ${accountId}`);
    }
  }

  // ── Public API ───────────────────────────────────────────────────────────────

  get currentId() {
    return this._data.currentId;
  }

  get currentAccount() {
    return this._data.accounts.find(a => a.id === this._data.currentId) || this._data.accounts[0];
  }

  get accounts() {
    return [...this._data.accounts];
  }

  /**
   * Create a new account. Returns the created account object.
   */
  createAccount(name, avatar, color) {
    const acc = this._createAccountObj(name, avatar, color);
    this._data.accounts.push(acc);
    this._saveData(this._data);
    return acc;
  }

  /**
   * Switch the active account. Returns true on success.
   */
  switchTo(accountId) {
    if (!this._data.accounts.find(a => a.id === accountId)) return false;
    this._data.currentId = accountId;
    this._saveData(this._data);
    return true;
  }

  /**
   * Update name/avatar/color for an account.
   */
  updateAccount(accountId, updates) {
    const acc = this._data.accounts.find(a => a.id === accountId);
    if (!acc) return;
    if (updates.name) acc.name = updates.name.trim() || acc.name;
    if (updates.avatar) acc.avatar = updates.avatar;
    if (updates.color) acc.color = updates.color;
    this._saveData(this._data);
  }

  /**
   * Delete an account and all its stored data.
   * Cannot delete the last remaining account.
   * Returns true on success.
   */
  deleteAccount(accountId) {
    if (this._data.accounts.length <= 1) return false;

    // Purge all prefixed keys for this account
    const prefix = accountId + '_';
    const keysToDelete = [];
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && k.startsWith(prefix)) keysToDelete.push(k);
    }
    keysToDelete.forEach(k => localStorage.removeItem(k));

    this._data.accounts = this._data.accounts.filter(a => a.id !== accountId);

    // If deleted account was active, switch to first remaining
    if (this._data.currentId === accountId) {
      this._data.currentId = this._data.accounts[0].id;
    }
    this._saveData(this._data);
    return true;
  }

  /**
   * Get a summary of an account's stats for display (reads directly from localStorage
   * without constructing a full AppStorage instance).
   */
  getAccountStats(accountId) {
    try {
      const statsKey = `${accountId}_engmaster_user_stats`;
      const masteredKey = `${accountId}_engmaster_mastered`;
      const statsRaw = localStorage.getItem(statsKey);
      const masteredRaw = localStorage.getItem(masteredKey);

      const stats = statsRaw ? JSON.parse(statsRaw) : {};
      const mastered = masteredRaw ? JSON.parse(masteredRaw) : [];

      return {
        xp: stats.xp || 0,
        streak: stats.streak || 1,
        mastered: mastered.length || 0
      };
    } catch {
      return { xp: 0, streak: 1, mastered: 0 };
    }
  }

  /** Returns available avatar choices */
  get avatarChoices() { return ACCOUNT_AVATARS; }

  /** Returns available color choices */
  get colorChoices() { return ACCOUNT_COLORS; }
}

window.accountManager = new AccountManager();
