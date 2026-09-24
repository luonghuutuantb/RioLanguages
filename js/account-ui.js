/**
 * Rio Languages — Account UI Controller
 * Handles the Account Switcher Modal (open/close, list, create, delete)
 */

class AccountUI {
  constructor() {
    this._selectedAvatar = '🎯';
    this._selectedColor = '#6366f1';

    this._overlay = document.getElementById('account-modal-overlay');
    this._list    = document.getElementById('acct-list');
    this._form    = document.getElementById('acct-create-form');
    this._addBtn  = document.getElementById('acct-add-btn');
    this._nameInput = document.getElementById('acct-new-name');
    this._previewAvatar = document.getElementById('acct-preview-avatar');
    this._previewName   = document.getElementById('acct-preview-name');
    this._avatarGrid    = document.getElementById('acct-avatar-grid');
    this._colorGrid     = document.getElementById('acct-color-grid');

    this._buildAvatarGrid();
    this._buildColorGrid();
    this._bindNameInput();
  }

  // ── Grid Builders ────────────────────────────────────────────────────────────

  _buildAvatarGrid() {
    if (!this._avatarGrid || !window.accountManager) return;
    const avatars = window.accountManager.avatarChoices;
    this._avatarGrid.innerHTML = '';
    avatars.forEach(emoji => {
      const btn = document.createElement('button');
      btn.className = 'acct-avatar-option' + (emoji === this._selectedAvatar ? ' selected' : '');
      btn.textContent = emoji;
      btn.title = emoji;
      btn.addEventListener('click', () => {
        this._selectedAvatar = emoji;
        this._avatarGrid.querySelectorAll('.acct-avatar-option').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        this._updatePreview();
      });
      this._avatarGrid.appendChild(btn);
    });
  }

  _buildColorGrid() {
    if (!this._colorGrid || !window.accountManager) return;
    const colors = window.accountManager.colorChoices;
    this._colorGrid.innerHTML = '';
    colors.forEach(color => {
      const btn = document.createElement('button');
      btn.className = 'acct-color-option' + (color === this._selectedColor ? ' selected' : '');
      btn.style.background = color;
      btn.title = color;
      btn.addEventListener('click', () => {
        this._selectedColor = color;
        this._colorGrid.querySelectorAll('.acct-color-option').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        this._updatePreview();
      });
      this._colorGrid.appendChild(btn);
    });
  }

  _bindNameInput() {
    if (this._nameInput) {
      this._nameInput.addEventListener('input', () => this._updatePreview());
    }
  }

  _updatePreview() {
    const name = (this._nameInput && this._nameInput.value.trim()) || 'Tên tài khoản';
    if (this._previewAvatar) {
      this._previewAvatar.textContent = this._selectedAvatar;
      this._previewAvatar.style.background = `linear-gradient(135deg, ${this._selectedColor}, ${this._selectedColor}88)`;
    }
    if (this._previewName) {
      this._previewName.textContent = name;
    }
  }

  // ── Account List Render ──────────────────────────────────────────────────────

  _renderList() {
    if (!this._list || !window.accountManager) return;
    const accounts = window.accountManager.accounts;
    const currentId = window.accountManager.currentId;

    this._list.innerHTML = '';

    accounts.forEach(acc => {
      const isActive = acc.id === currentId;
      const stats = window.accountManager.getAccountStats(acc.id);

      // XP label
      const xpLabel = stats.xp.toLocaleString('vi-VN') + ' XP';
      const streakLabel = `🔥 ${stats.streak} ngày`;
      const masteredLabel = `📚 ${stats.mastered} từ`;

      // Level from XP
      let level = 'Học viên mới';
      if (stats.xp >= 1500) level = 'Bậc thầy 🏆';
      else if (stats.xp >= 800) level = 'Chuyên gia 🎖️';
      else if (stats.xp >= 400) level = 'Tinh anh ⚡';
      else if (stats.xp >= 150) level = 'Chăm chỉ ⭐';

      const item = document.createElement('div');
      item.className = 'acct-item' + (isActive ? ' active' : '');
      item.dataset.accountId = acc.id;

      item.innerHTML = `
        <div class="acct-item-avatar" style="background: linear-gradient(135deg, ${acc.color}, ${acc.color}88);">
          ${acc.avatar}
        </div>
        <div class="acct-item-info">
          <div class="acct-item-name">
            <span>${this._esc(acc.name)}</span>
            ${isActive ? '<span class="acct-active-badge">Đang dùng</span>' : ''}
          </div>
          <div class="acct-item-meta">
            <span>${xpLabel}</span>
            <span class="acct-item-meta-sep">•</span>
            <span>${streakLabel}</span>
            <span class="acct-item-meta-sep">•</span>
            <span>${masteredLabel}</span>
          </div>
          <div style="font-size:11px;color:var(--text-subtle);margin-top:2px;">${level}</div>
        </div>
        <div class="acct-item-actions">
          ${!isActive ? `<button class="acct-switch-btn" data-switch="${acc.id}">Chuyển</button>` : ''}
          ${accounts.length > 1 ? `<button class="acct-delete-btn" data-delete="${acc.id}" title="Xóa tài khoản">🗑</button>` : ''}
        </div>
      `;

      this._list.appendChild(item);
    });

    // Bind switch buttons
    this._list.querySelectorAll('[data-switch]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.dataset.switch;
        this.closeModal();
        if (window.app) window.app.switchAccount(id);
        // Reopen to refresh list after a tick
        setTimeout(() => this.openModal(), 600);
      });
    });

    // Bind delete buttons
    this._list.querySelectorAll('[data-delete]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.dataset.delete;
        const acc = window.accountManager.accounts.find(a => a.id === id);
        const name = acc ? acc.name : 'tài khoản này';

        if (!confirm(`Xóa tài khoản "${name}"?\n\nToàn bộ dữ liệu học tập của tài khoản này sẽ bị xóa vĩnh viễn.`)) return;

        const wasActive = id === window.accountManager.currentId;
        const deleted = window.accountManager.deleteAccount(id);
        if (!deleted) return;

        if (wasActive) {
          // Switch to the new currentId
          const newId = window.accountManager.currentId;
          if (window.app) window.app.switchAccount(newId);
        }
        if (window.app) window.app.showToast(`🗑 Đã xóa tài khoản "${name}"`, 'info');
        this._renderList();
      });
    });

    // Whole item click → switch
    this._list.querySelectorAll('.acct-item').forEach(item => {
      item.addEventListener('click', (e) => {
        if (e.target.closest('button')) return;
        const id = item.dataset.accountId;
        if (id === window.accountManager.currentId) return;
        this.closeModal();
        if (window.app) window.app.switchAccount(id);
      });
    });
  }

  // ── Modal Open / Close ───────────────────────────────────────────────────────

  openModal() {
    if (!this._overlay) return;
    this.hideCreateForm();
    this._renderList();
    this._overlay.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }

  closeModal() {
    if (!this._overlay) return;
    this._overlay.style.display = 'none';
    document.body.style.overflow = '';
  }

  handleOverlayClick(event) {
    if (event.target === this._overlay) this.closeModal();
  }

  // ── Create Form ──────────────────────────────────────────────────────────────

  showCreateForm() {
    if (!this._form || !this._addBtn) return;
    this._form.style.display = 'block';
    this._addBtn.style.display = 'none';
    // Reset selections
    this._selectedAvatar = '🎯';
    this._selectedColor = '#6366f1';
    this._buildAvatarGrid();
    this._buildColorGrid();
    if (this._nameInput) {
      this._nameInput.value = '';
      setTimeout(() => this._nameInput.focus(), 50);
    }
    this._updatePreview();
    // Scroll to form
    if (this._form) this._form.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  hideCreateForm() {
    if (!this._form || !this._addBtn) return;
    this._form.style.display = 'none';
    this._addBtn.style.display = 'flex';
  }

  createAccount() {
    if (!window.accountManager) return;
    const name = (this._nameInput && this._nameInput.value.trim()) || '';
    if (!name) {
      if (this._nameInput) {
        this._nameInput.focus();
        this._nameInput.style.borderColor = 'var(--accent-rose)';
        setTimeout(() => { this._nameInput.style.borderColor = ''; }, 1500);
      }
      if (window.app) window.app.showToast('⚠️ Vui lòng nhập tên tài khoản', 'warn');
      return;
    }

    const newAcc = window.accountManager.createAccount(name, this._selectedAvatar, this._selectedColor);
    this.hideCreateForm();
    this._renderList();

    if (window.app) window.app.showToast(`✅ Đã tạo tài khoản "${newAcc.name}"`, 'success');

    // Ask user if they want to switch to new account
    setTimeout(() => {
      if (confirm(`Chuyển sang tài khoản mới "${newAcc.name}" ngay bây giờ?`)) {
        this.closeModal();
        if (window.app) window.app.switchAccount(newAcc.id);
      }
    }, 300);
  }

  // ── Helpers ─────────────────────────────────────────────────────────────────

  _esc(str) {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }
}

// Instantiate when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.accountUI = new AccountUI();
});
