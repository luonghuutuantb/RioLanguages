/**
 * =========================================================================
 * Rio English - Expression Upgrader Controller (upgrader-view.js)
 * Standalone studio for transforming Vietnamese thoughts or basic English
 * into 3 native tiers (Basic, Natural, Advanced C1) + Pronunciation Tester.
 * =========================================================================
 */

class UpgraderViewController {
  constructor() {
    this.currentData = null;
    this.isUpgrading = false;
    this.activePronTarget = null;
    this.recognition = null;
    this.isRecording = false;

    // DOM Elements
    this.inputArea = null;
    this.submitBtn = null;
    this.resultsContainer = null;
    this.engineBadge = null;
    this.pronBox = null;
  }

  init() {
    this._bindElements();
    this._initEvents();
    this._initSpeechRecognition();
    this.updateEngineStatus();
  }

  onEnterTab() {
    this.updateEngineStatus();
  }

  updateEngineStatus(activeModelName = null) {
    const apiKey = (window.storage?.getApiKey ? window.storage.getApiKey() : (window.storage?.aiSettings?.geminiApiKey || window.storage?.settings?.geminiApiKey || '')).trim();
    const model = activeModelName || (window.storage?.getAiModel ? window.storage.getAiModel() : (window.storage?.aiSettings?.geminiModel || 'gemini-3.5-flash'));
    if (this.engineBadge) {
      if (apiKey) {
        this.engineBadge.className = 'results-badge cloud';
        this.engineBadge.textContent = `✨ Gemini AI Live (${model})`;
        this.engineBadge.title = `Đang kết nối mô hình ${model}`;
      } else {
        this.engineBadge.className = 'results-badge offline';
        this.engineBadge.textContent = '⚡ Bộ máy Offline';
        this.engineBadge.title = 'Chưa có Gemini API Key, đang dùng bộ dữ liệu offline';
      }
    }
  }

  _bindElements() {
    this.inputArea = document.getElementById('upgrader-main-input');
    this.submitBtn = document.getElementById('upgrader-main-submit');
    this.resultsContainer = document.getElementById('upgrader-main-results');
    this.engineBadge = document.getElementById('upgrader-engine-badge');
    this.pronBox = document.getElementById('upgrader-pron-box');
  }

  _initEvents() {
    if (this.submitBtn) {
      this.submitBtn.addEventListener('click', () => this.handleUpgrade());
    }

    if (this.inputArea) {
      this.inputArea.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          this.handleUpgrade();
        }
      });
    }

    // Sample chips with robust event delegation
    const chipsContainer = document.querySelector('.upgrader-sample-chips');
    if (chipsContainer) {
      chipsContainer.addEventListener('click', (e) => {
        const chip = e.target.closest('.upgrader-studio-chip');
        if (chip) {
          const text = chip.dataset.text || chip.textContent.replace(/^[^a-zA-Z0-9À-ỹ\s]+/, '').trim();
          if (this.inputArea) {
            this.inputArea.value = text;
            this.handleUpgrade();
          }
        }
      });
    }
  }

  async handleUpgrade() {
    if (this.isUpgrading) return;
    const text = (this.inputArea ? this.inputArea.value : '').trim();
    if (!text) {
      if (window.app) window.app.showToast('Vui lòng nhập câu bạn muốn nâng cấp!', 'warning');
      return;
    }

    this.isUpgrading = true;
    if (this.submitBtn) {
      this.submitBtn.disabled = true;
      this.submitBtn.innerHTML = '<span>⏳ Đang phân tích...</span>';
    }

    try {
      const result = await this._performUpgrade(text);
      this.currentData = result;
      this.renderResults(result);

      if (window.app) {
        window.app.showToast('Đã nâng cấp câu thành 3 cấp độ bản xứ! 💎', 'success');
      }
    } catch (err) {
      console.error('Upgrade error:', err);
      if (window.app) window.app.showToast('Có lỗi xảy ra khi nâng cấp câu.', 'error');
    } finally {
      this.isUpgrading = false;
      if (this.submitBtn) {
        this.submitBtn.disabled = false;
        this.submitBtn.innerHTML = '<span>🚀 Nâng Cấp Ngay</span>';
      }
    }
  }

  async _performUpgrade(inputText) {
    const apiKey = (window.storage?.getApiKey ? window.storage.getApiKey() : (window.storage?.aiSettings?.geminiApiKey || window.storage?.settings?.geminiApiKey || '')).trim();

    // 1. Try Gemini AI if key is available
    if (apiKey) {
      const isTextModel = (name) => {
        if (!name || typeof name !== 'string') return false;
        const lower = name.toLowerCase();
        if (lower.includes('tts') || lower.includes('embedding') || lower.includes('bidi') || 
            lower.includes('imagen') || lower.includes('aqa') || lower.includes('computer-use') ||
            lower.includes('whisper') || lower.includes('audio') || lower.includes('robotics')) {
          return false;
        }
        return lower.startsWith('gemini-');
      };

      let candidateModels = [];
      let apiVersion = 'v1beta';

      if (window._cachedGeminiDiscovery && window._cachedGeminiDiscovery.key === apiKey) {
        candidateModels = (window._cachedGeminiDiscovery.models || []).filter(isTextModel);
        apiVersion = window._cachedGeminiDiscovery.apiVersion || 'v1beta';
      } else if (window.discoverGeminiModels) {
        const discovery = await window.discoverGeminiModels(apiKey);
        if (discovery && discovery.models && discovery.models.length > 0) {
          const filteredModels = discovery.models.filter(isTextModel);
          const safeRecommended = isTextModel(discovery.recommended) ? discovery.recommended : (filteredModels[0] || 'gemini-3.5-flash');
          window._cachedGeminiDiscovery = {
            key: apiKey,
            models: filteredModels,
            apiVersion: discovery.apiVersion,
            recommended: safeRecommended
          };
          candidateModels = [safeRecommended, ...filteredModels.filter(m => m !== safeRecommended)];
          apiVersion = discovery.apiVersion;
        } else if (discovery && discovery.error) {
          const isQuota = typeof discovery.error === 'string' && (
            discovery.error.includes('quota') || discovery.error.includes('RESOURCE_EXHAUSTED') || discovery.error.includes('limit: 0') || discovery.code === 429
          );
          if (window.app) {
            if (isQuota) {
              window.app.showToast('ℹ️ API Key chạm hạn mức Google. Đang dùng bộ máy nâng cấp Offline chất lượng cao.', 'info');
            } else {
              window.app.showToast('ℹ️ Đang dùng bộ máy nâng cấp Offline.', 'info');
            }
          }
          const offlineRes = window.upgradeExpressionOffline ? window.upgradeExpressionOffline(inputText) : null;
          if (offlineRes) {
            offlineRes.isLiveAI = false;
            offlineRes.apiError = discovery.error;
            return offlineRes;
          }
        }
      }

      const preferredModel = (window.storage?.getAiModel ? window.storage.getAiModel() : 'gemini-3.5-flash');
      candidateModels = Array.from(new Set([
        preferredModel,
        ...candidateModels,
        'gemini-3.5-flash',
        'gemini-3.5-flash-lite',
        'gemini-3.6-flash',
        'gemini-2.0-flash',
        'gemini-1.5-flash'
      ])).filter(isTextModel);

      const prompt = `You are an expert native English linguistics coach. Transform this user phrase (which can be Vietnamese or simple English): "${inputText}".
Output strictly valid JSON with this exact schema:
{
  "query": "${inputText.replace(/"/g, '\\"')}",
  "isLiveAI": true,
  "basic": {
    "text": "Simple English sentence",
    "ipa": "/IPA transcription/",
    "note": "Vietnamese note explaining structure and meaning"
  },
  "natural": {
    "text": "Natural conversational native English with common idioms/collocations",
    "ipa": "/IPA transcription/",
    "note": "Vietnamese note highlighting native nuance and why it sounds authentic"
  },
  "advanced": {
    "text": "Advanced C1/C2 professional/academic phrasing",
    "ipa": "/IPA transcription/",
    "note": "Vietnamese note explaining high-level vocabulary and context"
  }
}
CRITICAL: Do NOT wrap in markdown or backticks. Return raw JSON text only.`;

      let lastApiError = null;
      for (const model of candidateModels.slice(0, 4)) {
        try {
          const endpoint = `https://generativelanguage.googleapis.com/${apiVersion}/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(apiKey)}`;
          const genConfig = {
            temperature: 0.3,
            maxOutputTokens: 1600,
            responseMimeType: 'application/json'
          };
          if (String(model).includes('3.') || String(model).includes('3-')) {
            genConfig.thinkingConfig = { thinking_level: 'LOW' };
          }
          let res = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{ parts: [{ text: prompt }] }],
              generationConfig: genConfig
            })
          });

          // Fallback if responseMimeType is not supported on model
          if (!res.ok && res.status === 400) {
            try {
              const retryRes = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  contents: [{ parts: [{ text: prompt }] }],
                  generationConfig: {
                    temperature: 0.3,
                    maxOutputTokens: 1600
                  }
                })
              });
              if (retryRes.ok) {
                res = retryRes;
              }
            } catch (retryErr) {}
          }

          if (res.ok) {
            const data = await res.json();
            const raw = data.candidates?.[0]?.content?.parts?.[0]?.text;
            if (raw) {
              let parsed = null;
              try {
                parsed = JSON.parse(raw.trim());
              } catch (e1) {
                try {
                  const cleaned = raw.replace(/```(?:json)?/gi, '').replace(/```/g, '').trim();
                  parsed = JSON.parse(cleaned);
                } catch (e2) {
                  const jsonMatch = raw.match(/\{[\s\S]*\}/);
                  if (jsonMatch) {
                    try { parsed = JSON.parse(jsonMatch[0]); } catch (e3) {}
                  }
                }
              }

              if (parsed && (parsed.basic?.text || parsed.basic) && (parsed.natural?.text || parsed.natural)) {
                parsed.isLiveAI = true;
                parsed.activeModel = model;
                if (window.storage?.saveAiSettings) {
                  window.storage.saveAiSettings({ geminiModel: model });
                }
                this.updateEngineStatus(model);
                return parsed;
              } else {
                console.warn('Gemini response parsed but missing expected tiers:', raw);
                lastApiError = 'Dữ liệu JSON từ AI thiếu các cấp độ';
              }
            } else {
              const finishReason = data.candidates?.[0]?.finishReason;
              lastApiError = `AI dừng phản hồi (${finishReason || 'empty'})`;
            }
          } else {
            const errData = await res.json().catch(() => ({}));
            const errMsg = errData.error?.message || `HTTP ${res.status}`;
            console.warn(`Model ${model} returned error:`, errMsg);
            lastApiError = errMsg;
          }
        } catch (e) {
          console.warn(`Attempt with ${model} failed:`, e);
          lastApiError = e.message;
        }
      }

      if (lastApiError && window.app) {
        const isQuota = typeof lastApiError === 'string' && (
          lastApiError.includes('quota') || 
          lastApiError.includes('RESOURCE_EXHAUSTED') || 
          lastApiError.includes('limit: 0') || 
          lastApiError.includes('429')
        );
        if (isQuota) {
          window.app.showToast('ℹ️ API Key chạm hạn mức Google. Đã tự động kích hoạt bộ máy Offline chất lượng cao.', 'info');
        } else {
          window.app.showToast('ℹ️ Đã tự động chuyển sang bộ máy nâng cấp Offline.', 'info');
        }
      }

      // 2. Fallback to smart offline DB & rule engine
      this.updateEngineStatus();
      if (window.upgradeExpressionOffline) {
        const res = window.upgradeExpressionOffline(inputText);
        res.isLiveAI = false;
        res.apiError = lastApiError;
        return res;
      }
    }

    // Fallback when no API Key
    this.updateEngineStatus();
    if (window.upgradeExpressionOffline) {
      const res = window.upgradeExpressionOffline(inputText);
      res.isLiveAI = false;
      return res;
    }

    return {
      query: inputText,
      isLiveAI: false,
      basic: { text: "I would like to book a hotel room, please.", ipa: "/aɪ wʊd laɪk tuː bʊk ə hoʊˈtɛl ruːm/", note: "Mẫu câu cơ bản, rõ ràng." },
      natural: { text: "I'd like to make a reservation for a double room, please.", ipa: "/aɪd laɪk tuː meɪk ə ˌrɛzərˈveɪʃən/", note: "Cụm 'make a reservation' chuẩn phong cách bản xứ." },
      advanced: { text: "I wish to inquire about availability and reserve a deluxe suite for my upcoming itinerary.", ipa: "/aɪ wɪʃ tuː ɪnˈkwaɪər/", note: "Văn phong học thuật & thương gia cao cấp." }
    };
  }

  renderResults(data) {
    if (!this.resultsContainer || !data) return;

    const bannerHtml = data.isLiveAI ? `
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; padding: 10px 14px; background: rgba(14, 165, 233, 0.08); border-radius: var(--radius-md); border: 1px solid rgba(14, 165, 233, 0.25); flex-wrap: wrap; gap: 8px;">
        <span style="font-size: 13.5px; font-weight: 700; color: var(--text-primary);">🎯 Câu bạn nhập: <em style="color: #38bdf8;">"${this._escapeHtml(data.query)}"</em></span>
        <span class="results-badge cloud">✨ Gemini AI Live (${this._escapeHtml(data.activeModel || 'Live')})</span>
      </div>
    ` : `
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; padding: 10px 14px; background: rgba(245, 158, 11, 0.08); border-radius: var(--radius-md); border: 1px solid rgba(245, 158, 11, 0.25); flex-wrap: wrap; gap: 8px;">
        <span style="font-size: 13.5px; font-weight: 700; color: var(--text-primary);">🎯 Ý cần diễn đạt: <em style="color: #f59e0b;">"${this._escapeHtml(data.query)}"</em></span>
        <div style="display: flex; align-items: center; gap: 8px;">
          ${data.apiError ? `<span style="font-size: 11px; color: #f87171; max-width: 240px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" title="${this._escapeHtml(data.apiError)}">⚠️ Lỗi: ${this._escapeHtml(data.apiError)}</span>` : ''}
          <span class="results-badge offline">⚡ Bộ máy Offline</span>
          <button type="button" class="btn btn-sm btn-secondary" onclick="if(window.aiChatView) aiChatView.openSettingsModal()" style="font-size: 11px; padding: 2px 8px; background: rgba(245, 158, 11, 0.15); border-color: rgba(245, 158, 11, 0.4); color: #f59e0b;">⚙️ Cài đặt AI</button>
        </div>
      </div>
    `;

    this.resultsContainer.innerHTML = `
      ${bannerHtml}
      <div class="upgrader-tiers-grid">
        <!-- Tier 1: Basic -->
        <div class="tier-card tier-basic">
          <div>
            <div class="tier-badge-row">
              <span class="tier-pill pill-basic">🟢 CẤP ĐỘ 1: BASIC</span>
              <span class="tier-level-tag">A1 - A2 • Đơn giản, trực diện</span>
            </div>
            <div class="tier-sentence-box">
              <div class="tier-english">${this._escapeHtml(data.basic.text)}</div>
              ${data.basic.ipa ? `<div class="tier-ipa">${this._escapeHtml(data.basic.ipa)}</div>` : ''}
            </div>
            <div class="tier-note">${this._escapeHtml(data.basic.note)}</div>
          </div>
          <div class="tier-actions">
            <button type="button" class="tier-action-btn primary btn-speak-tier" data-tier="basic">🔊 Nghe</button>
            <button type="button" class="tier-action-btn btn-copy-tier" data-tier="basic">📋 Sao chép</button>
            <button type="button" class="tier-action-btn tier-practice-btn btn-practice-tier" data-tier="basic">🎙️ Luyện nói</button>
          </div>
        </div>

        <!-- Tier 2: Natural (Featured) -->
        <div class="tier-card tier-natural featured">
          <div class="tier-featured-ribbon">⭐ KHUYÊN DÙNG</div>
          <div>
            <div class="tier-badge-row">
              <span class="tier-pill pill-natural">🔵 CẤP ĐỘ 2: NATURAL</span>
              <span class="tier-level-tag">B1 - B2 • Tự nhiên chuẩn bản xứ</span>
            </div>
            <div class="tier-sentence-box">
              <div class="tier-english">${this._escapeHtml(data.natural.text)}</div>
              ${data.natural.ipa ? `<div class="tier-ipa">${this._escapeHtml(data.natural.ipa)}</div>` : ''}
            </div>
            <div class="tier-nuance-box">
              <strong>💡 Sắc thái bản xứ:</strong><br>
              ${this._escapeHtml(data.natural.note)}
            </div>
          </div>
          <div class="tier-actions">
            <button type="button" class="tier-action-btn primary btn-speak-tier" data-tier="natural">🔊 Nghe</button>
            <button type="button" class="tier-action-btn btn-copy-tier" data-tier="natural">📋 Sao chép</button>
            <button type="button" class="tier-action-btn tier-practice-btn btn-practice-tier" data-tier="natural">🎙️ Luyện nói</button>
          </div>
        </div>

        <!-- Tier 3: Advanced -->
        <div class="tier-card tier-advanced">
          <div>
            <div class="tier-badge-row">
              <span class="tier-pill pill-advanced">🟣 CẤP ĐỘ 3: ADVANCED C1</span>
              <span class="tier-level-tag">C1 - C2 • Sang trọng & Chuyên nghiệp</span>
            </div>
            <div class="tier-sentence-box">
              <div class="tier-english">${this._escapeHtml(data.advanced.text)}</div>
              ${data.advanced.ipa ? `<div class="tier-ipa">${this._escapeHtml(data.advanced.ipa)}</div>` : ''}
            </div>
            <div class="tier-note">${this._escapeHtml(data.advanced.note)}</div>
          </div>
          <div class="tier-actions">
            <button type="button" class="tier-action-btn primary btn-speak-tier" data-tier="advanced">🔊 Nghe</button>
            <button type="button" class="tier-action-btn btn-copy-tier" data-tier="advanced">📋 Sao chép</button>
            <button type="button" class="tier-action-btn tier-practice-btn btn-practice-tier" data-tier="advanced">🎙️ Luyện nói</button>
          </div>
        </div>
      </div>
    `;

    // Bind action buttons
    this.resultsContainer.querySelectorAll('.btn-speak-tier').forEach(btn => {
      btn.addEventListener('click', () => {
        const tier = btn.dataset.tier;
        const textToSpeak = data[tier]?.text;
        if (textToSpeak && window.audioCtrl) {
          window.audioCtrl.speak(textToSpeak);
        }
      });
    });

    this.resultsContainer.querySelectorAll('.btn-copy-tier').forEach(btn => {
      btn.addEventListener('click', () => {
        const tier = btn.dataset.tier;
        const textToCopy = data[tier]?.text;
        if (textToCopy) {
          navigator.clipboard.writeText(textToCopy).then(() => {
            if (window.app) window.app.showToast('Đã sao chép câu vào clipboard! 📋', 'success');
          });
        }
      });
    });

    this.resultsContainer.querySelectorAll('.btn-practice-tier').forEach(btn => {
      btn.addEventListener('click', () => {
        const tier = btn.dataset.tier;
        const targetText = data[tier]?.text;
        if (targetText) {
          this.openPronunciationPractice(targetText, tier);
        }
      });
    });

    this.resultsContainer.style.display = 'block';
  }

  openPronunciationPractice(sentence, tierName) {
    if (!this.pronBox) return;
    this.activePronTarget = sentence;

    this.pronBox.innerHTML = `
      <div class="pron-practice-header">
        <span class="pron-title">🎙️ Thử Thách Phát Âm Câu (${tierName.toUpperCase()}):</span>
        <span class="pron-status-text" id="studio-pron-status">Nhấn micro và đọc to câu dưới đây</span>
      </div>
      <div class="pron-target-display">"${this._escapeHtml(sentence)}"</div>
      <div class="pron-mic-control-row">
        <button type="button" class="pron-mic-btn" id="studio-pron-mic-btn">
          <span>🎙️</span>
          <span id="studio-pron-mic-label">Bấm để nói</span>
        </button>
        <button type="button" class="tier-action-btn" id="studio-pron-listen-btn">🔊 Nghe câu mẫu</button>
        <div class="pron-score-result" id="studio-pron-score" style="display: none;"></div>
      </div>
    `;

    this.pronBox.style.display = 'block';
    this.pronBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    const micBtn = document.getElementById('studio-pron-mic-btn');
    const listenBtn = document.getElementById('studio-pron-listen-btn');

    if (listenBtn) {
      listenBtn.addEventListener('click', () => {
        if (window.audioCtrl) window.audioCtrl.speak(sentence);
      });
    }

    if (micBtn) {
      micBtn.addEventListener('click', () => this.togglePronRecording());
    }
  }

  _initSpeechRecognition() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    try {
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = false;
      this.recognition.interimResults = false;
      this.recognition.lang = 'en-US';

      this.recognition.onstart = () => {
        this.isRecording = true;
        const micBtn = document.getElementById('studio-pron-mic-btn');
        const micLabel = document.getElementById('studio-pron-mic-label');
        const statusText = document.getElementById('studio-pron-status');

        if (micBtn) micBtn.classList.add('recording');
        if (micLabel) micLabel.textContent = 'Đang ghi âm...';
        if (statusText) statusText.textContent = '🔴 Đang lắng nghe... Bạn hãy đọc to câu trên!';
      };

      this.recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        this.evaluatePronunciation(transcript);
      };

      this.recognition.onerror = (e) => {
        console.warn('Pronunciation test error:', e.error);
        this.stopPronRecording();
        const statusText = document.getElementById('studio-pron-status');
        if (statusText) statusText.textContent = '❌ Không nhận diện được âm thanh. Hãy thử lại!';
      };

      this.recognition.onend = () => {
        this.stopPronRecording();
      };
    } catch (e) {
      console.warn('Web speech recognition init error in upgrader:', e);
    }
  }

  togglePronRecording() {
    if (!this.recognition) {
      if (window.app) window.app.showToast('Micro không được hỗ trợ trên trình duyệt này.', 'error');
      return;
    }
    if (this.isRecording) {
      this.stopPronRecording();
    } else {
      try {
        this.recognition.start();
      } catch (e) {
        console.warn(e);
      }
    }
  }

  stopPronRecording() {
    this.isRecording = false;
    const micBtn = document.getElementById('studio-pron-mic-btn');
    const micLabel = document.getElementById('studio-pron-mic-label');
    if (micBtn) micBtn.classList.remove('recording');
    if (micLabel) micLabel.textContent = 'Bấm để nói lại';
    if (this.recognition) {
      try { this.recognition.stop(); } catch (e) {}
    }
  }

  evaluatePronunciation(spokenText) {
    const target = this.activePronTarget || '';
    const scoreContainer = document.getElementById('studio-pron-score');
    const statusText = document.getElementById('studio-pron-status');
    if (!scoreContainer) return;

    const sim = this._calculateSimilarity(spokenText.toLowerCase(), target.toLowerCase());
    const pct = Math.round(sim * 100);

    let praise = 'Khá tốt! Hãy cố gắng luyện tập thêm nhịp điệu.';
    let circleColor = '#f59e0b';

    if (pct >= 85) {
      praise = '🌟 Xuất sắc! Phát âm rất chuẩn xác và rõ ràng.';
      circleColor = '#10b981';
      if (window.storage) {
        window.storage.addXp(10, 'Luyện phát âm chuẩn câu nâng cấp');
        if (window.app) window.app.updateHeaderStats();
      }
    } else if (pct < 60) {
      praise = 'Cố gắng phát âm rõ từng từ ngữ nhé!';
      circleColor = '#ef4444';
    }

    if (statusText) {
      statusText.textContent = `Bạn đã nói: "${spokenText}"`;
    }

    scoreContainer.style.display = 'flex';
    scoreContainer.innerHTML = `
      <div class="score-circle" style="color: ${circleColor}; border-color: ${circleColor};">${pct}%</div>
      <div class="score-praise">${praise}</div>
    `;
  }

  _calculateSimilarity(s1, s2) {
    const clean1 = s1.replace(/[^a-z0-9\s]/g, '').trim();
    const clean2 = s2.replace(/[^a-z0-9\s]/g, '').trim();
    if (!clean1 || !clean2) return 0;
    if (clean1 === clean2) return 1;

    const words1 = clean1.split(/\s+/);
    const words2 = clean2.split(/\s+/);

    let matches = 0;
    words1.forEach(w => {
      if (words2.includes(w)) matches++;
    });

    const wordScore = (2 * matches) / (words1.length + words2.length);
    return Math.min(1, Math.max(0, wordScore));
  }

  _escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }
}

window.upgraderView = new UpgraderViewController();
