/**
 * =========================================================================
 * Rio Chinese - Chinese Handwriting Recognition Controller (js/chinese-handwriting.js)
 * Nhận diện chữ viết tay Tiếng Trung mượt mà với Canvas Điền Tự Cách (田字格),
 * Google Input Tools Handwriting IME, tra cứu tức thì Pinyin & Âm Hán Việt.
 * =========================================================================
 */

class ChineseHandwritingController {
  constructor() {
    this.targetInput = null;
    this.targetName = 'Nhập liệu';
    this.strokes = []; // Array of strokes: [ [ [x...], [y...], [t...] ] ]
    this.strokePaths = []; // Array of { points: [ {x,y} ] } for re-rendering
    this.currentPoints = [];
    this.isDrawing = false;
    this.recognizeTimer = null;
    this.isOpen = false;
    this.candidates = [];
    this.selectedCandidate = null;
    this.vocabMap = null;

    // Offline basic stroke database
    this.offlineStrokeMap = {
      1: ['一', '丨', '丿', '丶', '乙', '亅'],
      2: ['十', '人', '八', '入', '二', '几', '七', '卜', '又', '力', '刀', '丁'],
      3: ['三', '大', '口', '山', '子', '女', '小', '工', '个', '么', '门', '也', '下', '上'],
      4: ['中', '天', '不', '文', '月', '日', '水', '火', '手', '心', '开', '车', '牛', '王'],
      5: ['你', '好', '生', '用', '白', '出', '正', '去', '四', '民', '电', '打', '本', '东']
    };
  }

  init() {
    this._injectDom();
    this._bindDomElements();
    this._bindEvents();
    this._buildVocabMap();
    this.autoAttachInputs();

    // Auto-rebind whenever subtabs change
    document.addEventListener('click', () => {
      setTimeout(() => this.autoAttachInputs(), 300);
    });

    console.log('✓ Rio Chinese Handwriting Recognition Initialized');
  }

  /* --- Tạo Map tra cứu Pinyin, Hán Việt và Nghĩa từ dữ liệu sẵn có --- */
  _buildVocabMap() {
    this.vocabMap = new Map();
    if (Array.isArray(window.CHINESE_VOCAB_DATA)) {
      window.CHINESE_VOCAB_DATA.forEach(v => {
        if (v && v.hanzi) {
          // Lưu cả từ đơn và từ ghép
          if (!this.vocabMap.has(v.hanzi)) {
            this.vocabMap.set(v.hanzi, {
              pinyin: v.pinyin || '',
              hanviet: v.hanviet || '',
              vi: v.vi || ''
            });
          }
          // Nếu là từ ghép 2-3 chữ, tách ký tự đơn nếu chưa có
          if (v.hanzi.length > 1) {
            const chars = Array.from(v.hanzi);
            const pinyins = (v.pinyin || '').split(' ');
            const hanviets = (v.hanviet || '').split(' ');
            chars.forEach((c, idx) => {
              if (!this.vocabMap.has(c)) {
                this.vocabMap.set(c, {
                  pinyin: pinyins[idx] || '',
                  hanviet: hanviets[idx] || '',
                  vi: `Trong: ${v.hanzi} (${v.vi})`
                });
              }
            });
          }
        }
      });
    }

    // Bổ sung dữ liệu 8 nét cơ bản
    if (window.CHINESE_STROKES_DATA && Array.isArray(window.CHINESE_STROKES_DATA.basicStrokes)) {
      window.CHINESE_STROKES_DATA.basicStrokes.forEach(s => {
        if (s.symbol && !this.vocabMap.has(s.symbol)) {
          this.vocabMap.set(s.symbol, {
            pinyin: s.pinyin || '',
            hanviet: s.name || '',
            vi: s.desc || 'Nét cơ bản'
          });
        }
      });
    }
  }

  /* --- Tự động gắn nút viết tay vào các ô tìm kiếm / ô nhập trong Tiếng Trung --- */
  autoAttachInputs() {
    const inputTargets = [
      { id: 'zh-vocab-search', name: 'Tìm từ vựng HSK' },
      { id: 'zh-phrase-search', name: 'Tìm mẫu câu' },
      { id: 'zh-grammar-search', name: 'Tìm ngữ pháp' },
      { id: 'zh-ai-input', name: 'Gia sư AI tiếng Trung' },
      { id: 'zh-rp-user-input', name: 'Hội thoại Roleplay' },
      { id: 'zh-dict-input', name: 'Nghe chép chính tả' }
    ];

    inputTargets.forEach(target => {
      const inputEl = document.getElementById(target.id);
      if (!inputEl) return;

      // Kiểm tra xem đã có nút viết tay chưa
      let btn = inputEl.parentElement.querySelector(`.zh-hw-btn[data-for="${target.id}"]`);
      if (btn) return;

      btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'zh-hw-btn';
      btn.dataset.for = target.id;
      btn.title = 'Viết tay chữ Hán (Handwriting)';
      btn.innerHTML = '✍️';
      btn.setAttribute('aria-label', `Viết tay cho ${target.name}`);

      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.openFor(inputEl, target.name);
      });

      // Vị trí gắn nút:
      if (inputEl.parentElement && inputEl.parentElement.classList.contains('zh-search-box')) {
        inputEl.parentElement.classList.add('has-hw-btn');
        inputEl.parentElement.appendChild(btn);
      } else if (inputEl.parentElement && inputEl.parentElement.classList.contains('zh-aichat-input-bar')) {
        // Gắn trước ô input
        inputEl.parentElement.insertBefore(btn, inputEl);
      } else if (inputEl.parentElement && inputEl.parentElement.classList.contains('zh-rp-input-bar')) {
        // Gắn cạnh mic button
        const mic = inputEl.parentElement.querySelector('#zh-rp-mic-btn');
        if (mic) {
          inputEl.parentElement.insertBefore(btn, mic);
        } else {
          inputEl.parentElement.appendChild(btn);
        }
      } else if (inputEl.parentElement && inputEl.parentElement.classList.contains('zh-dict-input-row')) {
        inputEl.parentElement.insertBefore(btn, inputEl.nextSibling);
      } else {
        inputEl.parentElement.appendChild(btn);
      }
    });
  }

  /* --- Cấu trúc HTML của Bảng Viết Tay --- */
  _injectDom() {
    if (document.getElementById('zh-hw-overlay')) return;

    const overlay = document.createElement('div');
    overlay.id = 'zh-hw-overlay';
    overlay.className = 'zh-hw-overlay';
    overlay.innerHTML = `
      <div class="zh-hw-panel" id="zh-hw-panel" role="dialog" aria-modal="true" aria-labelledby="zh-hw-title-text">
        <!-- Header -->
        <div class="zh-hw-header">
          <div class="zh-hw-title-row">
            <span class="zh-hw-title-icon">✍️</span>
            <span class="zh-hw-title-text" id="zh-hw-title-text">Viết Tay Chữ Hán</span>
            <span class="zh-hw-target-badge" id="zh-hw-target-badge">Tìm kiếm</span>
          </div>
          <button type="button" class="zh-hw-close-btn" id="zh-hw-close-btn" title="Đóng bảng viết tay (Esc)">✕</button>
        </div>

        <!-- Input Preview Bar -->
        <div class="zh-hw-input-preview-bar">
          <span style="font-size: 11px; color: var(--text-muted); font-weight: 700;">Đang nhập:</span>
          <div class="zh-hw-preview-text" id="zh-hw-preview-text"></div>
          <button type="button" class="zh-hw-quick-act-btn" id="zh-hw-space-btn" title="Thêm dấu cách">␣ Cách</button>
          <button type="button" class="zh-hw-quick-act-btn" id="zh-hw-backspace-btn" title="Xóa ký tự cuối">⌫ Xóa</button>
        </div>

        <!-- Candidates Row (Thanh ứng viên) -->
        <div class="zh-hw-candidates-row" id="zh-hw-candidates-row">
          <div class="zh-hw-candidates-empty" id="zh-hw-candidates-empty">
            <span>✍️ Hãy vẽ chữ Hán vào ô bên dưới...</span>
          </div>
        </div>

        <!-- Canvas Stage Điền Tự Cách -->
        <div class="zh-hw-canvas-stage">
          <div class="zh-hw-tianzige-box" id="zh-hw-tianzige-box">
            <div class="zh-hw-grid-guide"></div>
            <div class="zh-hw-watermark" id="zh-hw-watermark">
              <span class="zh-hw-watermark-icon">田</span>
              <span>Viết chữ Hán vào đây</span>
            </div>
            <canvas class="zh-hw-canvas" id="zh-hw-canvas"></canvas>
          </div>
        </div>

        <!-- Detail Card (Hiển thị Pinyin & Hán Việt khi có chữ được chọn) -->
        <div class="zh-hw-detail-card" id="zh-hw-detail-card" style="display: none;">
          <div class="zh-hw-detail-main">
            <span class="zh-hw-detail-hanzi" id="zh-hw-detail-hanzi">你</span>
            <span class="zh-hw-detail-pinyin" id="zh-hw-detail-pinyin">nǐ</span>
            <span class="zh-hw-detail-vi" id="zh-hw-detail-vi">[Nhĩ] Bạn, anh, chị</span>
          </div>
          <button type="button" class="zh-hw-speak-btn" id="zh-hw-speak-btn" title="Phát âm chữ này">🔊</button>
        </div>

        <!-- Action Toolbar -->
        <div class="zh-hw-actions-bar">
          <div class="zh-hw-actions-left">
            <button type="button" class="zh-hw-tool-btn" id="zh-hw-undo-btn" title="Hoàn tác nét gần nhất">
              <span>↩️</span> Hoàn tác nét
            </button>
            <button type="button" class="zh-hw-tool-btn warn" id="zh-hw-clear-btn" title="Xóa toàn bộ nét vẽ">
              <span>🗑️</span> Xóa bảng
            </button>
          </div>
          <div class="zh-hw-actions-right">
            <button type="button" class="zh-hw-tool-btn" id="zh-hw-copy-btn" title="Sao chép chữ vào bộ nhớ">
              <span>📋</span> Sao chép
            </button>
            <button type="button" class="zh-hw-tool-btn primary" id="zh-hw-done-btn">
              <span>✓</span> Xong
            </button>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(overlay);
  }

  _bindDomElements() {
    this.overlay = document.getElementById('zh-hw-overlay');
    this.panel = document.getElementById('zh-hw-panel');
    this.canvasBox = document.getElementById('zh-hw-tianzige-box');
    this.canvas = document.getElementById('zh-hw-canvas');
    this.ctx = this.canvas.getContext('2d');

    this.titleBadge = document.getElementById('zh-hw-target-badge');
    this.previewText = document.getElementById('zh-hw-preview-text');
    this.candidatesRow = document.getElementById('zh-hw-candidates-row');
    this.candidatesEmpty = document.getElementById('zh-hw-candidates-empty');
    this.watermark = document.getElementById('zh-hw-watermark');

    this.detailCard = document.getElementById('zh-hw-detail-card');
    this.detailHanzi = document.getElementById('zh-hw-detail-hanzi');
    this.detailPinyin = document.getElementById('zh-hw-detail-pinyin');
    this.detailVi = document.getElementById('zh-hw-detail-vi');
    this.speakBtn = document.getElementById('zh-hw-speak-btn');

    this.closeBtn = document.getElementById('zh-hw-close-btn');
    this.undoBtn = document.getElementById('zh-hw-undo-btn');
    this.clearBtn = document.getElementById('zh-hw-clear-btn');
    this.spaceBtn = document.getElementById('zh-hw-space-btn');
    this.backspaceBtn = document.getElementById('zh-hw-backspace-btn');
    this.copyBtn = document.getElementById('zh-hw-copy-btn');
    this.doneBtn = document.getElementById('zh-hw-done-btn');
  }

  _bindEvents() {
    // Đóng khi click ngoài panel
    this.overlay.addEventListener('click', (e) => {
      if (e.target === this.overlay) {
        this.closeModal();
      }
    });

    this.closeBtn.addEventListener('click', () => this.closeModal());
    this.doneBtn.addEventListener('click', () => this.closeModal());

    // Phím tắt bàn phím vật lý
    window.addEventListener('keydown', (e) => {
      if (!this.isOpen) return;
      if (e.key === 'Escape') {
        e.preventDefault();
        this.closeModal();
      } else if (e.key === 'Backspace' && document.activeElement !== this.targetInput) {
        this.handleBackspace();
      }
    });

    // Toolbar buttons
    this.undoBtn.addEventListener('click', () => this.undoStroke());
    this.clearBtn.addEventListener('click', () => this.clearCanvas());
    this.spaceBtn.addEventListener('click', () => this.insertText(' '));
    this.backspaceBtn.addEventListener('click', () => this.handleBackspace());
    this.copyBtn.addEventListener('click', () => this.copyPreviewText());

    this.speakBtn.addEventListener('click', () => {
      if (this.selectedCandidate) {
        this.playChinese(this.selectedCandidate);
      }
    });

    // Pointer events trên Canvas (Hỗ trợ Chuột, Cảm ứng, Apple Pencil / Stylus)
    this.canvas.addEventListener('pointerdown', (e) => this._onPointerDown(e));
    this.canvas.addEventListener('pointermove', (e) => this._onPointerMove(e));
    this.canvas.addEventListener('pointerup', (e) => this._onPointerUp(e));
    this.canvas.addEventListener('pointercancel', (e) => this._onPointerUp(e));
    this.canvas.addEventListener('pointerleave', (e) => {
      if (this.isDrawing) this._onPointerUp(e);
    });

    // Resize canvas khi cửa sổ thay đổi
    window.addEventListener('resize', () => {
      if (this.isOpen) {
        this._resizeCanvas();
        this._redrawStrokes();
      }
    });
  }

  /* --- Quản lý hiển thị Modal --- */
  openFor(inputElement, titleName = 'Tìm kiếm') {
    this.targetInput = inputElement;
    this.targetName = titleName;
    this.openModal();
  }

  openModal() {
    this.isOpen = true;
    this.overlay.classList.add('open');

    // Cập nhật nhãn target
    if (this.titleBadge) {
      this.titleBadge.textContent = this.targetName || 'Tiếng Trung';
    }

    this._syncPreviewText();
    this._resizeCanvas();
    this.clearCanvas();

    // Đánh dấu active trên nút vừa mở
    document.querySelectorAll('.zh-hw-btn').forEach(b => b.classList.remove('active'));
    if (this.targetInput && this.targetInput.id) {
      const activeBtn = document.querySelector(`.zh-hw-btn[data-for="${this.targetInput.id}"]`);
      if (activeBtn) activeBtn.classList.add('active');
    }
  }

  closeModal() {
    this.isOpen = false;
    this.overlay.classList.remove('open');
    document.querySelectorAll('.zh-hw-btn').forEach(b => b.classList.remove('active'));

    // Trả lại focus cho input nếu cần
    if (this.targetInput) {
      try {
        this.targetInput.focus();
      } catch (e) {}
    }
  }

  _syncPreviewText() {
    if (!this.previewText) return;
    const val = this.targetInput ? this.targetInput.value : '';
    this.previewText.textContent = val;
  }

  /* --- Cấu hình kích thước Canvas theo tỉ lệ màn hình (Hi-DPI Retina) --- */
  _resizeCanvas() {
    if (!this.canvasBox || !this.canvas) return;
    const rect = this.canvasBox.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    this.canvasWidth = rect.width;
    this.canvasHeight = rect.height;

    this.canvas.width = rect.width * dpr;
    this.canvas.height = rect.height * dpr;
    this.canvas.style.width = `${rect.width}px`;
    this.canvas.style.height = `${rect.height}px`;

    this.ctx.scale(dpr, dpr);
    this.ctx.lineCap = 'round';
    this.ctx.lineJoin = 'round';
  }

  /* --- Xử lý sự kiện Vẽ nét (Pointer Events) --- */
  _getCanvasPoint(e) {
    const rect = this.canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      t: Date.now()
    };
  }

  _onPointerDown(e) {
    e.preventDefault();
    this.canvas.setPointerCapture(e.pointerId);
    this.isDrawing = true;

    if (this.recognizeTimer) {
      clearTimeout(this.recognizeTimer);
      this.recognizeTimer = null;
    }

    const pt = this._getCanvasPoint(e);
    this.currentPoints = [pt];
    this.watermark.classList.add('hidden');

    this.ctx.beginPath();
    this.ctx.strokeStyle = '#fef08a';
    this.ctx.lineWidth = 7;
    this.ctx.shadowColor = 'rgba(245, 158, 11, 0.5)';
    this.ctx.shadowBlur = 6;
    this.ctx.moveTo(pt.x, pt.y);
    this.ctx.lineTo(pt.x + 0.1, pt.y + 0.1);
    this.ctx.stroke();
  }

  _onPointerMove(e) {
    if (!this.isDrawing) return;
    e.preventDefault();

    const pt = this._getCanvasPoint(e);
    this.currentPoints.push(pt);

    // Vẽ nét mượt với quadratic curve
    const pts = this.currentPoints;
    if (pts.length >= 3) {
      const xc = (pts[pts.length - 1].x + pts[pts.length - 2].x) / 2;
      const yc = (pts[pts.length - 1].y + pts[pts.length - 2].y) / 2;

      this.ctx.beginPath();
      this.ctx.strokeStyle = '#fef08a';
      this.ctx.lineWidth = 7;
      this.ctx.shadowColor = 'rgba(245, 158, 11, 0.5)';
      this.ctx.shadowBlur = 6;
      this.ctx.moveTo(pts[pts.length - 2].x, pts[pts.length - 2].y);
      this.ctx.quadraticCurveTo(pts[pts.length - 2].x, pts[pts.length - 2].y, xc, yc);
      this.ctx.stroke();
    } else {
      this.ctx.lineTo(pt.x, pt.y);
      this.ctx.stroke();
    }
  }

  _onPointerUp(e) {
    if (!this.isDrawing) return;
    this.isDrawing = false;
    try {
      this.canvas.releasePointerCapture(e.pointerId);
    } catch (err) {}

    if (this.currentPoints.length > 0) {
      // Lưu nét vẽ cho hiển thị lại
      this.strokePaths.push([...this.currentPoints]);

      // Định dạng nét cho Google Input Tools IME: [ [x0, x1...], [y0, y1...], [t0, t1...] ]
      const xs = this.currentPoints.map(p => Math.round(p.x));
      const ys = this.currentPoints.map(p => Math.round(p.y));
      const ts = this.currentPoints.map((p, idx) => idx * 16);
      this.strokes.push([xs, ys, ts]);

      this.currentPoints = [];
    }

    // Debounce nhận diện: tự động gửi sau 260ms khi người dùng nhấc bút
    this.recognizeTimer = setTimeout(() => {
      this.recognizeStrokes();
    }, 260);
  }

  /* --- Vẽ lại tất cả các nét trên canvas --- */
  _redrawStrokes() {
    const dpr = window.devicePixelRatio || 1;
    this.ctx.clearRect(0, 0, this.canvasWidth * dpr, this.canvasHeight * dpr);

    if (this.strokePaths.length === 0) {
      this.watermark.classList.remove('hidden');
      return;
    }

    this.watermark.classList.add('hidden');

    this.strokePaths.forEach(pts => {
      if (!pts || pts.length === 0) return;
      this.ctx.beginPath();
      this.ctx.strokeStyle = '#fef08a';
      this.ctx.lineWidth = 7;
      this.ctx.shadowColor = 'rgba(245, 158, 11, 0.5)';
      this.ctx.shadowBlur = 6;
      this.ctx.moveTo(pts[0].x, pts[0].y);

      if (pts.length === 1) {
        this.ctx.lineTo(pts[0].x + 0.1, pts[0].y + 0.1);
        this.ctx.stroke();
        return;
      }

      for (let i = 1; i < pts.length - 1; i++) {
        const xc = (pts[i].x + pts[i + 1].x) / 2;
        const yc = (pts[i].y + pts[i + 1].y) / 2;
        this.ctx.quadraticCurveTo(pts[i].x, pts[i].y, xc, yc);
      }
      this.ctx.lineTo(pts[pts.length - 1].x, pts[pts.length - 1].y);
      this.ctx.stroke();
    });
  }

  /* --- Hoàn tác nét vẽ (Undo) --- */
  undoStroke() {
    if (this.strokePaths.length === 0) return;
    this.strokePaths.pop();
    this.strokes.pop();
    this._redrawStrokes();

    if (this.strokePaths.length > 0) {
      this.recognizeStrokes();
    } else {
      this._renderEmptyCandidates();
      this.detailCard.style.display = 'none';
    }
  }

  /* --- Xóa sạch bảng vẽ (Clear) --- */
  clearCanvas() {
    this.strokePaths = [];
    this.strokes = [];
    this.currentPoints = [];
    if (this.recognizeTimer) {
      clearTimeout(this.recognizeTimer);
      this.recognizeTimer = null;
    }
    this._redrawStrokes();
    this._renderEmptyCandidates();
    this.detailCard.style.display = 'none';
  }

  /* --- Gọi API Google Input Tools Handwriting IME --- */
  async recognizeStrokes() {
    if (this.strokes.length === 0) {
      this._renderEmptyCandidates();
      return;
    }

    this._renderRecognizing();

    const payload = {
      options: 'enable_pre_space',
      requests: [
        {
          writing_guide: {
            writing_area_width: Math.round(this.canvasWidth || 300),
            writing_area_height: Math.round(this.canvasHeight || 300)
          },
          ink: this.strokes,
          language: 'zh'
        }
      ]
    };

    try {
      const response = await fetch('https://inputtools.google.com/request?ime=handwriting&app=mobilesearch&cs=1&oe=UTF-8', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) throw new Error(`HTTP error ${response.status}`);
      const data = await response.json();

      if (data && data[0] === 'SUCCESS' && data[1] && data[1][0] && Array.isArray(data[1][0][1])) {
        const rawCandidates = data[1][0][1];
        this._processCandidates(rawCandidates);
      } else {
        this._fallbackOfflineRecognition();
      }
    } catch (err) {
      console.warn('Google IME online failed or offline, switching to fallback:', err.message);
      this._fallbackOfflineRecognition();
    }
  }

  /* --- Xử lý ứng viên và làm giàu dữ liệu Hán Việt/Pinyin --- */
  _processCandidates(rawChars) {
    if (!rawChars || rawChars.length === 0) {
      this._renderEmptyCandidates('Không tìm thấy chữ phù hợp');
      return;
    }

    // Lọc bỏ ký tự rỗng và trùng lặp
    const uniqueChars = Array.from(new Set(rawChars)).slice(0, 10);

    this.candidates = uniqueChars.map(char => {
      const info = (this.vocabMap && this.vocabMap.get(char)) || null;
      return {
        hanzi: char,
        pinyin: info ? info.pinyin : '',
        hanviet: info ? info.hanviet : '',
        vi: info ? info.vi : ''
      };
    });

    this._renderCandidates();

    // Hiển thị thông tin ứng viên số 1 lên detail card
    if (this.candidates.length > 0) {
      this._showDetail(this.candidates[0]);
    }
  }

  /* --- Nhận diện Offline cơ bản khi mất kết nối mạng --- */
  _fallbackOfflineRecognition() {
    const strokeCount = this.strokes.length;
    let list = this.offlineStrokeMap[strokeCount] || this.offlineStrokeMap[strokeCount > 5 ? 5 : 1];

    this.candidates = list.slice(0, 8).map(char => {
      const info = (this.vocabMap && this.vocabMap.get(char)) || null;
      return {
        hanzi: char,
        pinyin: info ? info.pinyin : '',
        hanviet: info ? info.hanviet : '',
        vi: info ? info.vi : ''
      };
    });

    this._renderCandidates(true);
    if (this.candidates.length > 0) {
      this._showDetail(this.candidates[0]);
    }
  }

  _renderRecognizing() {
    this.candidatesRow.innerHTML = `
      <div class="zh-hw-candidates-empty">
        <span class="zh-hw-recognizing-spinner"></span>
        <span>Đang nhận diện chữ Hán...</span>
      </div>
    `;
  }

  _renderEmptyCandidates(msg = '✍️ Hãy vẽ chữ Hán vào ô bên dưới...') {
    this.candidatesRow.innerHTML = `
      <div class="zh-hw-candidates-empty">
        <span>${msg}</span>
      </div>
    `;
  }

  _renderCandidates(isOffline = false) {
    if (this.candidates.length === 0) {
      this._renderEmptyCandidates();
      return;
    }

    const offlineBadge = isOffline
      ? `<span style="font-size: 10px; color: #f59e0b; padding: 2px 6px; background: rgba(245,158,11,0.15); border-radius: 4px; margin-right: 4px;">Offline</span>`
      : '';

    this.candidatesRow.innerHTML = offlineBadge + this.candidates.map((cand, idx) => `
      <button type="button" class="zh-hw-candidate-item" data-idx="${idx}" title="${cand.pinyin ? cand.pinyin + ' • ' : ''}${cand.hanviet || ''}">
        <span class="zh-hw-cand-hanzi">${cand.hanzi}</span>
        <span class="zh-hw-cand-sub">${cand.pinyin || cand.hanviet || '—'}</span>
      </button>
    `).join('');

    // Bắt sự kiện chọn ứng viên
    this.candidatesRow.querySelectorAll('.zh-hw-candidate-item').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.dataset.idx, 10);
        const cand = this.candidates[idx];
        if (cand) {
          this.selectCandidate(cand);
        }
      });
      // Di chuột xem trước thông tin
      btn.addEventListener('mouseenter', () => {
        const idx = parseInt(btn.dataset.idx, 10);
        const cand = this.candidates[idx];
        if (cand) this._showDetail(cand);
      });
    });
  }

  /* --- Hiển thị thông tin chi tiết: Pinyin, Hán Việt, Nghĩa & Phát âm --- */
  _showDetail(cand) {
    this.selectedCandidate = cand.hanzi;
    this.detailHanzi.textContent = cand.hanzi;
    this.detailPinyin.textContent = cand.pinyin || '';

    let viText = '';
    if (cand.hanviet) viText += `[${cand.hanviet}] `;
    if (cand.vi) viText += cand.vi;
    this.detailVi.textContent = viText || 'Chữ Hán';

    this.detailCard.style.display = 'flex';
  }

  /* --- Chọn ứng viên: chèn vào ô nhập & tự động dọn bảng để viết chữ kế tiếp --- */
  selectCandidate(cand) {
    const char = cand.hanzi;
    this.insertText(char);

    // Hiệu ứng rung phản hồi xúc giác nhẹ (Haptic Feedback) trên mobile
    if (window.navigator && window.navigator.vibrate) {
      try { window.navigator.vibrate(12); } catch (e) {}
    }

    // Tự động xóa bảng để tiếp tục viết chữ tiếp theo (viết liên tục)
    this.clearCanvas();
  }

  /* --- Chèn văn bản vào vị trí con trỏ của Target Input --- */
  insertText(text) {
    if (!this.targetInput) return;

    const input = this.targetInput;
    const start = input.selectionStart || input.value.length;
    const end = input.selectionEnd || input.value.length;
    const oldVal = input.value;

    const newVal = oldVal.substring(0, start) + text + oldVal.substring(end);
    input.value = newVal;

    const newPos = start + text.length;
    try {
      input.setSelectionRange(newPos, newPos);
    } catch (e) {}

    // Kích hoạt các sự kiện input / change để cập nhật bộ lọc tìm kiếm
    input.dispatchEvent(new Event('input', { bubbles: true }));
    input.dispatchEvent(new Event('change', { bubbles: true }));

    this._syncPreviewText();
  }

  /* --- Xóa ký tự cuối (Backspace) --- */
  handleBackspace() {
    if (!this.targetInput) return;
    const input = this.targetInput;
    const start = input.selectionStart || input.value.length;
    const end = input.selectionEnd || input.value.length;
    const val = input.value;

    if (start === 0 && end === 0) return;

    let newVal, newPos;
    if (start !== end) {
      newVal = val.substring(0, start) + val.substring(end);
      newPos = start;
    } else {
      // Xóa 1 ký tự trước con trỏ
      newVal = val.substring(0, start - 1) + val.substring(start);
      newPos = start - 1;
    }

    input.value = newVal;
    try {
      input.setSelectionRange(newPos, newPos);
    } catch (e) {}

    input.dispatchEvent(new Event('input', { bubbles: true }));
    input.dispatchEvent(new Event('change', { bubbles: true }));
    this._syncPreviewText();
  }

  /* --- Sao chép nội dung vào Clipboard --- */
  async copyPreviewText() {
    const text = this.targetInput ? this.targetInput.value : (this.selectedCandidate || '');
    if (!text) return;

    try {
      await navigator.clipboard.writeText(text);
      if (window.app && typeof window.app.showToast === 'function') {
        window.app.showToast(`Đã sao chép: "${text}"`, 'success');
      } else {
        alert(`Đã sao chép: "${text}"`);
      }
    } catch (e) {
      console.warn('Copy failed:', e);
    }
  }

  /* --- Phát âm chuẩn tiếng Trung --- */
  playChinese(text) {
    if (!text) return;
    if (window.chineseView && typeof window.chineseView.playChineseText === 'function') {
      window.chineseView.playChineseText(text);
    } else if (window.audioCtrl && typeof window.audioCtrl.speakChinese === 'function') {
      window.audioCtrl.speakChinese(text);
    } else if ('speechSynthesis' in window) {
      const u = new SpeechSynthesisUtterance(text);
      u.lang = 'zh-CN';
      u.rate = 0.9;
      window.speechSynthesis.speak(u);
    }
  }
}

// Khởi tạo Singleton controller và tự gắn cờ toàn cục
window.chineseHandwriting = new ChineseHandwritingController();

// Tự động khởi tạo khi DOM sẵn sàng
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => window.chineseHandwriting.init());
} else {
  window.chineseHandwriting.init();
}
