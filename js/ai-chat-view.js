/**
// =========================================================================
// EngMaster AI English Live Conversation Controller (ai-chat-view.js)
// Real-time Dual-Engine (Gemini API + Offline Smart Simulation) Chat & Voice
// =========================================================================
*/

class AIChatViewController {
  constructor() {
    this.personas = window.AI_PERSONAS || [];
    this.activePersona = this.personas[0] || null;
    this.messages = [];
    this.isGenerating = false;
    this.isRecording = false;
    this.recognition = null;
    this.speechSynthesisActive = false;

    // DOM References
    this.container = null;
    this.personaSelector = null;
    this.personaCarousel = null;
    this.messagesStream = null;
    this.inputField = null;
    this.sendBtn = null;
    this.micBtn = null;
    this.micStatusBox = null;
    this.quickRepliesBar = null;
    this.settingsModal = null;
    this.apiKeyInput = null;
    this.engineStatusBadge = null;
  }

  init() {
    this.personas = window.AI_PERSONAS || [];
    this.activePersona = this.personas[0];
    this._bindElements();
    this._initEvents();
    this._initSpeechRecognition();
    this._renderPersonaCards();
    this.selectPersona(this.activePersona.id);
  }

  _bindElements() {
    this.container = document.getElementById('view-aichat');
    this.personaCarousel = document.getElementById('ai-persona-carousel');
    this.messagesStream = document.getElementById('ai-messages-stream');
    this.inputField = document.getElementById('ai-chat-input');
    this.sendBtn = document.getElementById('ai-chat-send-btn');
    this.micBtn = document.getElementById('ai-chat-mic-btn');
    this.micStatusBox = document.getElementById('ai-mic-status-box');
    this.quickRepliesBar = document.getElementById('ai-quick-replies-bar');
    this.engineStatusBadge = document.getElementById('ai-engine-status-badge');
    this.settingsModal = document.getElementById('ai-settings-modal');
    this.apiKeyInput = document.getElementById('ai-gemini-key-input');
    this.modelSelect = document.getElementById('ai-gemini-model-select');
  }

  _initEvents() {
    // Send button
    if (this.sendBtn) {
      this.sendBtn.addEventListener('click', () => this.handleSendMessage());
    }

    // Input Enter key (Shift+Enter for newline)
    if (this.inputField) {
      this.inputField.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          this.handleSendMessage();
        }
      });
      // Auto resize textarea height
      this.inputField.addEventListener('input', () => {
        this.inputField.style.height = 'auto';
        this.inputField.style.height = Math.min(120, this.inputField.scrollHeight) + 'px';
      });
    }

    // Mic button
    if (this.micBtn) {
      this.micBtn.addEventListener('click', () => this.toggleVoiceRecording());
    }

    // Settings Modal Open / Close
    const openSettingsBtn = document.getElementById('ai-open-settings-btn');
    const closeSettingsBtn = document.getElementById('ai-settings-close-btn');
    const cancelSettingsBtn = document.getElementById('ai-cancel-settings-btn');
    const saveSettingsBtn = document.getElementById('ai-save-settings-btn');
    const clearKeyBtn = document.getElementById('ai-clear-key-btn');
    const testKeyBtn = document.getElementById('ai-test-key-btn');

    if (openSettingsBtn && this.settingsModal) {
      openSettingsBtn.addEventListener('click', () => this.openSettingsModal());
    }
    if (closeSettingsBtn && this.settingsModal) {
      closeSettingsBtn.addEventListener('click', () => this.closeSettingsModal());
    }
    if (cancelSettingsBtn && this.settingsModal) {
      cancelSettingsBtn.addEventListener('click', () => this.closeSettingsModal());
    }
    if (this.settingsModal) {
      this.settingsModal.addEventListener('click', (e) => {
        if (e.target === this.settingsModal) this.closeSettingsModal();
      });
    }
    if (saveSettingsBtn) {
      saveSettingsBtn.addEventListener('click', () => this.saveSettings());
    }
    if (clearKeyBtn) {
      clearKeyBtn.addEventListener('click', () => this.clearApiKey());
    }
    if (testKeyBtn) {
      testKeyBtn.addEventListener('click', () => this.testApiKey());
    }

    // New Chat / Reset Chat buttons
    const newChatBtn = document.getElementById('ai-new-chat-btn');
    const resetChatBtn = document.getElementById('ai-reset-chat-btn');
    const personaNewChatBtn = document.getElementById('ai-persona-new-chat-btn');

    const handleNewChat = () => {
      if (this.messages.length <= 1 || confirm(`Bạn có muốn bắt đầu cuộc hội thoại mới với ${this.activePersona.name}?`)) {
        this.resetChat();
      }
    };

    if (newChatBtn) newChatBtn.addEventListener('click', handleNewChat);
    if (resetChatBtn) resetChatBtn.addEventListener('click', handleNewChat);
    if (personaNewChatBtn) personaNewChatBtn.addEventListener('click', handleNewChat);
  }

  _initSpeechRecognition() {
    const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRec) return;

    try {
      this.recognition = new SpeechRec();
      this.recognition.continuous = true;
      this.recognition.interimResults = true;
      this.recognition.lang = 'en-US';

      this.recognition.onstart = () => {
        this.isRecording = true;
        this._updateMicUI(true);
      };

      this.recognition.onresult = (event) => {
        let finalChunk = '';
        let interimChunk = '';
        for (let i = 0; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalChunk += event.results[i][0].transcript + ' ';
          } else {
            interimChunk += event.results[i][0].transcript;
          }
        }

        this._latestFinalChunk = finalChunk;
        const currentSessionSpoken = (finalChunk + interimChunk).trim();
        const fullSpoken = [this.accumulatedSpeech, currentSessionSpoken].filter(Boolean).join(' ').trim();
        const displayText = [this.preSpeechText, fullSpoken].filter(Boolean).join(' ').trim();

        if (this.inputField) {
          this.inputField.value = displayText;
          this.inputField.style.height = 'auto';
          this.inputField.style.height = Math.min(140, this.inputField.scrollHeight) + 'px';
        }

        // Tự động kéo dài thời gian lắng nghe, chỉ hẹn giờ gửi khi đã thu được lời nói
        if (fullSpoken.length > 0) {
          this._resetSilenceTimer();
        }
      };

      this.recognition.onerror = (event) => {
        console.warn('Speech recognition status:', event.error);
        if (event.error === 'no-speech' || event.error === 'aborted') {
          // Người dùng tạm nghỉ hoặc ngắt quãng, không dừng phiên ghi âm
          return;
        }
        this._clearSilenceTimer();
        this.isRecording = false;
        this.isManualStop = true;
        this._updateMicUI(false);
        if (window.app && event.error !== 'not-allowed') {
          window.app.showToast(`Lỗi Micro: ${event.error}`, 'error');
        }
      };

      this.recognition.onend = () => {
        if (this.isRecording && !this.isManualStop) {
          // Trình duyệt tự ngắt kết nối do khoảng lặng ngắn, tự động khởi động lại tiếp tục lắng nghe
          if (this._latestFinalChunk) {
            this.accumulatedSpeech = [this.accumulatedSpeech, this._latestFinalChunk].filter(Boolean).join(' ').trim();
            this._latestFinalChunk = '';
          }
          try {
            this.recognition.start();
            return;
          } catch (e) {
            console.warn('Could not auto-restart recognition:', e);
          }
        }
        this.isRecording = false;
        this._updateMicUI(false);
      };
    } catch (e) {
      console.warn('Error creating SpeechRecognition:', e);
      this.recognition = null;
    }
  }

  _resetSilenceTimer() {
    this._clearSilenceTimer();
    // Chờ 2.5 giây im lặng sau khi dứt câu để tự động gửi
    this._silenceTimer = setTimeout(() => {
      if (this.isRecording) {
        this.stopVoiceRecording(true);
      }
    }, 2500);
  }

  _clearSilenceTimer() {
    if (this._silenceTimer) {
      clearTimeout(this._silenceTimer);
      this._silenceTimer = null;
    }
  }

  _updateMicUI(isRecording) {
    if (!this.micBtn) return;
    this.micBtn.classList.toggle('recording', isRecording);
    this.micBtn.title = isRecording ? 'Bấm để hoàn thành & gửi câu nói' : 'Bấm Micro để nói tiếng Anh';

    if (this.micStatusBox) {
      this.micStatusBox.classList.toggle('active', isRecording);
      if (isRecording) {
        this.micStatusBox.innerHTML = `
          <div class="mic-status-inner">
            <span class="mic-wave-pulse"></span>
            <span class="mic-status-text">Đang lắng nghe... (Tự gửi sau 2.5s dứt câu, hoặc bấm Xong &amp; Gửi).</span>
            <button type="button" class="mic-finish-btn" id="ai-mic-finish-btn">Xong &amp; Gửi 📤</button>
            <button type="button" class="mic-cancel-btn" id="ai-mic-cancel-btn">Hủy ✕</button>
          </div>
        `;
        const finishBtn = document.getElementById('ai-mic-finish-btn');
        const cancelBtn = document.getElementById('ai-mic-cancel-btn');
        if (finishBtn) {
          finishBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.stopVoiceRecording(true);
          });
        }
        if (cancelBtn) {
          cancelBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (this.inputField) {
              this.inputField.value = this.preSpeechText || '';
            }
            this.stopVoiceRecording(false);
          });
        }
      } else {
        this.micStatusBox.innerHTML = '';
      }
    }
  }

  toggleVoiceRecording() {
    if (!this.recognition) {
      this._initSpeechRecognition();
    }

    if (window.AndroidSpeech && typeof window.AndroidSpeech.hasPermission === 'function' && !window.AndroidSpeech.hasPermission()) {
      window.AndroidSpeech.requestPermission();
      if (window.app) {
        window.app.showToast('Vui lòng cho phép quyền Micro khi hộp thoại hệ thống xuất hiện.', 'info');
      }
      return;
    }

    if (!this.recognition) {
      if (window.app) {
        window.app.showToast('Microphone chưa được kích hoạt hoặc chưa cấp quyền. Hãy thử lại.', 'warning');
      }
      return;
    }

    if (this.isRecording) {
      // Người dùng bấm lại nút Micro để kết thúc nói và gửi đi
      this.stopVoiceRecording(true);
    } else {
      if (window.audioCtrl) {
        window.audioCtrl.stop();
      }
      this.preSpeechText = (this.inputField ? this.inputField.value : '').trim();
      this.accumulatedSpeech = '';
      this._latestFinalChunk = '';
      this.isManualStop = false;
      this.isRecording = true;
      this._updateMicUI(true);

      try {
        this.recognition.start();
      } catch (e) {
        console.warn('Cannot start recognition:', e);
      }
    }
  }

  stopVoiceRecording(autoSend = false) {
    this.isManualStop = true;
    this._clearSilenceTimer();
    this.isRecording = false;

    if (this.recognition) {
      try {
        this.recognition.stop();
      } catch (e) {}
    }

    this._updateMicUI(false);

    if (autoSend && this.inputField && this.inputField.value.trim().length > 0) {
      this.handleSendMessage(true);
    }
  }

  _renderPersonaCards() {
    if (!this.personaCarousel) return;
    this.personaCarousel.innerHTML = this.personas.map(p => {
      const isActive = p.id === this.activePersona.id;
      return `
        <button class="ai-persona-card ${isActive ? 'active' : ''}" data-id="${p.id}" type="button">
          <div class="persona-avatar-box">
            <span class="persona-emoji">${p.avatar}</span>
          </div>
          <div class="persona-text">
            <strong class="persona-name">${p.name}</strong>
            <span class="persona-role">${p.badge}</span>
          </div>
          <span class="persona-check-indicator">✓</span>
        </button>
      `;
    }).join('');

    this.personaCarousel.querySelectorAll('.ai-persona-card').forEach(card => {
      card.addEventListener('click', () => {
        const id = card.dataset.id;
        this.selectPersona(id);
      });
    });
  }

  selectPersona(personaId) {
    const found = this.personas.find(p => p.id === personaId);
    if (!found) return;

    this.activePersona = found;

    // Update carousel active state
    if (this.personaCarousel) {
      this.personaCarousel.querySelectorAll('.ai-persona-card').forEach(card => {
        card.classList.toggle('active', card.dataset.id === personaId);
      });
    }

    // Update active header
    const avatarEl = document.getElementById('ai-active-avatar');
    const nameEl = document.getElementById('ai-active-name');
    const roleEl = document.getElementById('ai-active-role');
    const badgeEl = document.getElementById('ai-active-badge');
    const levelEl = document.getElementById('ai-active-level');

    if (avatarEl) avatarEl.textContent = this.activePersona.avatar;
    if (nameEl) nameEl.textContent = this.activePersona.name;
    if (roleEl) roleEl.textContent = this.activePersona.role;
    if (badgeEl) badgeEl.textContent = this.activePersona.badge;
    if (levelEl) levelEl.textContent = this.activePersona.level;

    this._updateEngineStatusUI();

    // Load saved messages or initial greeting
    const saved = window.storage.getPersonaChatHistory(this.activePersona.id);
    if (saved && saved.length > 0) {
      this.messages = saved;
    } else {
      this.messages = [
        {
          id: 'msg_0',
          sender: 'ai',
          text: this.activePersona.greeting,
          vi: this.activePersona.greeting_vi,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ];
      window.storage.savePersonaChatHistory(this.activePersona.id, this.messages);
    }

    this._renderMessages();
    this._renderQuickReplies(this.activePersona.quickReplies);
  }

  _updateEngineStatusUI() {
    if (!this.engineStatusBadge) return;
    const apiKey = (window.storage.aiSettings && window.storage.aiSettings.geminiApiKey || '').trim();
    const model = (window.storage?.getAiModel ? window.storage.getAiModel() : (window.storage.aiSettings && window.storage.aiSettings.geminiModel)) || 'gemini-1.5-flash';
    if (apiKey) {
      let displayName = 'Gemini 1.5 Flash';
      if (model.includes('2.0')) displayName = 'Gemini 2.0 Flash';
      else if (model.includes('1.5-pro')) displayName = 'Gemini 1.5 Pro';
      else if (model.includes('1.5')) displayName = 'Gemini 1.5 Flash';
      else displayName = model;

      this.engineStatusBadge.className = 'ai-engine-badge cloud';
      this.engineStatusBadge.innerHTML = `✨ ${displayName} Active`;
      this.engineStatusBadge.title = `Đang sử dụng mô hình ${model} qua Google AI Studio API Key`;
    } else {
      this.engineStatusBadge.className = 'ai-engine-badge offline';
      this.engineStatusBadge.innerHTML = `⚡ AI Engine Bản Địa (Offline)`;
      this.engineStatusBadge.title = 'Đang dùng bộ máy AI thông minh tích hợp sẵn trong app (Không cần API key)';
    }
  }

  _renderMessages() {
    if (!this.messagesStream) return;

    this.messagesStream.innerHTML = this.messages.map((m, idx) => {
      const isAI = m.sender === 'ai';
      const showVi = !window.storage?.aiSettings || window.storage.aiSettings.showViSub !== false;
      const showGrammar = !window.storage?.aiSettings || window.storage.aiSettings.grammarFeedback !== false;

      const fb = m.grammarFeedback;
      const isError = Boolean(
        fb && (
          fb.has_error === true ||
          fb.hasError === true ||
          (fb.has_error !== false && fb.wrong && fb.correct && fb.wrong.trim().toLowerCase() !== fb.correct.trim().toLowerCase())
        )
      );
      const displayWrong = (fb && fb.wrong) || m.text;
      const displayCorrect = (fb && fb.correct) || m.text;
      const explanation = (fb && fb.explanation) || (isError ? 'Cách diễn đạt chuẩn bản ngữ hơn.' : 'Câu nói của bạn đã chuẩn xác ngữ pháp!');
      const betterPhrasing = (fb && (fb.better_phrasing || fb.betterPhrasing)) || '';

      return `
        <div class="ai-chat-bubble-row ${isAI ? 'from-ai' : 'from-user'}" id="ai-bubble-${m.id}">
          ${isAI ? `
            <div class="bubble-avatar" title="${this.activePersona.name}">
              <span>${this.activePersona.avatar}</span>
            </div>
          ` : ''}

          <div class="bubble-content-card">
            <div class="bubble-header-row">
              <span class="bubble-sender-name">${isAI ? this.activePersona.name : 'Bạn'}</span>
              <span class="bubble-time">${m.timestamp || ''}</span>
              ${m.isVoice ? `<span class="bubble-voice-tag" title="Nói qua Micro">🎙️ Voice</span>` : ''}
              ${isAI ? `
                <button class="bubble-audio-btn" data-msg-idx="${idx}" title="Nghe phát âm">
                  🔊 Nghe
                </button>
              ` : ''}
            </div>

            <div class="bubble-en-text">
              ${this._escapeHtml(m.text)}
            </div>

            ${isAI && m.vi ? `
              <div class="bubble-vi-text ${showVi ? '' : 'hidden-sub'}" id="vi-sub-${m.id}">
                ${this._escapeHtml(m.vi)}
              </div>
            ` : ''}

            ${!isAI && fb && showGrammar ? `
              <div class="bubble-grammar-feedback ${isError ? 'has-error' : 'is-perfect'}">
                ${isError ? `
                  <div class="gf-header">
                    <span class="gf-icon">🛠️</span>
                    <strong>Phát hiện lỗi &amp; Sửa câu bạn nói:</strong>
                  </div>
                  <div class="gf-compare">
                    <div class="gf-row gf-row-wrong">
                      <span class="gf-label">❌ Chưa chuẩn:</span>
                      <span class="gf-wrong"><s>${this._escapeHtml(displayWrong)}</s></span>
                    </div>
                    <div class="gf-row gf-row-correct">
                      <span class="gf-label">✅ Câu chuẩn bản ngữ:</span>
                      <span class="gf-correct">${this._escapeHtml(displayCorrect)}</span>
                      <button class="gf-audio-btn" data-correct-text="${this._escapeHtml(displayCorrect)}" type="button" title="Bấm để nghe phát âm câu đúng">
                        🔊 Nghe câu đúng
                      </button>
                    </div>
                  </div>
                  <div class="gf-explain">
                    💡 <strong>Giải thích:</strong> ${this._escapeHtml(explanation)}
                  </div>
                  ${betterPhrasing ? `
                    <div class="gf-better">
                      🌟 <strong>Gợi ý cách nói tự nhiên khác:</strong> <em>"${this._escapeHtml(betterPhrasing)}"</em>
                    </div>
                  ` : ''}
                ` : `
                  <div class="gf-header is-perfect">
                    <span class="gf-icon">✨</span>
                    <strong>Đánh giá câu nói:</strong>
                    <span class="gf-tag-good">Đúng ngữ pháp</span>
                  </div>
                  <div class="gf-explain">
                    💡 ${this._escapeHtml(explanation)}
                  </div>
                  ${betterPhrasing ? `
                    <div class="gf-better">
                      🌟 <strong>Cách diễn đạt tự nhiên/nâng cao:</strong> <em>"${this._escapeHtml(betterPhrasing)}"</em>
                    </div>
                  ` : ''}
                `}
              </div>
            ` : ''}
          </div>

          ${!isAI ? `
            <div class="bubble-avatar user" title="Bạn">
              <span>👤</span>
            </div>
          ` : ''}
        </div>
      `;
    }).join('');

    // Attach audio click events for AI replies
    this.messagesStream.querySelectorAll('.bubble-audio-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.dataset.msgIdx, 10);
        const msg = this.messages[idx];
        if (msg && window.audioCtrl) {
          window.audioCtrl.speak(msg.text, null, { gender: this.activePersona.gender });
        }
      });
    });

    // Attach audio click events for corrected sentences
    this.messagesStream.querySelectorAll('.gf-audio-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const text = btn.dataset.correctText;
        if (text && window.audioCtrl) {
          window.audioCtrl.speak(text, null, { gender: 'female' });
        }
      });
    });

    this._scrollToBottom();
  }

  _renderQuickReplies(suggestions) {
    if (!this.quickRepliesBar) return;
    if (!suggestions || suggestions.length === 0) {
      this.quickRepliesBar.innerHTML = '';
      return;
    }

    this.quickRepliesBar.innerHTML = `
      <span class="qr-label">Gợi ý trả lời:</span>
      <div class="qr-scroll-track">
        ${suggestions.map(s => `
          <button class="qr-chip-btn" data-text="${this._escapeHtml(s)}" type="button">
            ${this._escapeHtml(s)}
          </button>
        `).join('')}
      </div>
    `;

    this.quickRepliesBar.querySelectorAll('.qr-chip-btn').forEach(chip => {
      chip.addEventListener('click', () => {
        const text = chip.dataset.text;
        if (this.inputField) {
          this.inputField.value = text;
          this.handleSendMessage();
        }
      });
    });
  }

  _scrollToBottom() {
    if (this.messagesStream) {
      setTimeout(() => {
        this.messagesStream.scrollTo({
          top: this.messagesStream.scrollHeight,
          behavior: 'smooth'
        });
      }, 50);
    }
  }

  async handleSendMessage(isVoice = false) {
    if (this.isGenerating) return;
    const text = (this.inputField ? this.inputField.value : '').trim();
    if (!text) return;

    // Clear input and reset height
    if (this.inputField) {
      this.inputField.value = '';
      this.inputField.style.height = 'auto';
    }

    // Check user grammar immediately
    let initialGrammarFeedback = null;
    if (window.AI_OFFLINE_KNOWLEDGE && typeof window.AI_OFFLINE_KNOWLEDGE.checkGrammar === 'function') {
      initialGrammarFeedback = window.AI_OFFLINE_KNOWLEDGE.checkGrammar(text);
    }

    // Add user message
    const userMsg = {
      id: 'msg_' + Date.now(),
      sender: 'user',
      text: text,
      isVoice: isVoice,
      grammarFeedback: initialGrammarFeedback,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    this.messages.push(userMsg);
    this._renderMessages();
    window.storage.savePersonaChatHistory(this.activePersona.id, this.messages);

    // Show AI typing indicator
    this._showTypingIndicator();

    // Call Engine
    this.isGenerating = true;
    try {
      const apiKey = (window.storage?.getApiKey ? window.storage.getApiKey() : (window.storage?.aiSettings?.geminiApiKey || window.storage?.settings?.geminiApiKey || '')).trim();
      let aiResult;

      if (apiKey) {
        try {
          aiResult = await this._callGeminiAPI(apiKey, text);
        } catch (apiErr) {
          console.warn('Gemini API Error, falling back to smart offline simulation:', apiErr);
          aiResult = this._callOfflineEngine(text);
          if (window.app) {
            const errMsg = typeof apiErr?.message === 'string' ? apiErr.message : '';
            const isQuota = errMsg.includes('quota') || errMsg.includes('429');
            const isTimeout = errMsg.includes('Timeout') || errMsg.includes('AbortError') || apiErr.name === 'AbortError';
            const isOverload = errMsg.includes('503') || errMsg.includes('overloaded') || errMsg.includes('UNAVAILABLE');
            if (isQuota) {
              window.app.showToast('⚠️ API Key đã hết hạn mức (quota). AI ngoại tuyến đang trả lời.', 'warning');
            } else if (isTimeout) {
              window.app.showToast('⚠️ Kết nối Gemini quá thời gian chờ. AI ngoại tuyến đang trả lời.', 'warning');
            } else if (isOverload) {
              window.app.showToast('⚠️ Máy chủ Gemini đang quá tải. AI ngoại tuyến đang trả lời.', 'warning');
            } else {
              window.app.showToast(`⚠️ Lỗi API: ${errMsg.slice(0, 60) || 'Không xác định'}. AI ngoại tuyến đang trả lời.`, 'warning');
            }
          }
        }
      } else {
        // Natural thinking delay for offline engine
        await new Promise(r => setTimeout(r, 600));
        aiResult = this._callOfflineEngine(text);
      }

      this._removeTypingIndicator();

      // Cập nhật phản hồi kiểm tra lỗi ngữ pháp và sửa câu vào tin nhắn của người dùng
      if (aiResult.correction) {
        userMsg.grammarFeedback = aiResult.correction;
      }

      // Append AI reply
      const aiMsg = {
        id: 'msg_' + Date.now(),
        sender: 'ai',
        text: aiResult.reply,
        vi: aiResult.vi,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      this.messages.push(aiMsg);
      this._renderMessages();
      window.storage.savePersonaChatHistory(this.activePersona.id, this.messages);

      // Render updated suggestions
      this._renderQuickReplies(aiResult.suggestions || this.activePersona.quickReplies);

      // Award XP for speaking English
      window.storage.addXP(4);
      if (window.app) window.app.updateHeaderStats();

      // Auto TTS for AI reply if enabled
      const autoTTS = window.storage.aiSettings.autoTTS !== false;
      if (autoTTS && window.audioCtrl) {
        setTimeout(() => {
          window.audioCtrl.speak(aiResult.reply, null, { gender: this.activePersona.gender });
        }, 300);
      }
    } catch (e) {
      this._removeTypingIndicator();
      console.error('Error handling AI response:', e);
      if (window.app) window.app.showToast('Có lỗi xảy ra khi xử lý phản hồi AI: ' + e.message, 'error');
    } finally {
      this.isGenerating = false;
    }
  }

  _showTypingIndicator() {
    this._removeTypingIndicator();
    const div = document.createElement('div');
    div.className = 'ai-typing-bubble-row';
    div.id = 'ai-typing-indicator';
    div.innerHTML = `
      <div class="bubble-avatar" title="${this.activePersona.name}">
        <span>${this.activePersona.avatar}</span>
      </div>
      <div class="ai-typing-card">
        <div class="typing-dots">
          <span></span><span></span><span></span>
        </div>
        <span class="typing-text">${this.activePersona.name} đang suy nghĩ...</span>
      </div>
    `;
    if (this.messagesStream) {
      this.messagesStream.appendChild(div);
      this._scrollToBottom();
    }
  }

  _removeTypingIndicator() {
    const el = document.getElementById('ai-typing-indicator');
    if (el) el.remove();
  }

  async _callGeminiAPI(apiKey, userText) {
    // Build clean alternating history for Gemini API
    // 1. Must start with role: 'user'
    // 2. Must strictly alternate: user -> model -> user -> model...
    // 3. Must not have duplicate consecutive turns of the same role
    // 4. Must end with current userText (role: 'user')
    // Note: this.messages already contains the newly pushed user message at the very end
    const pastMessages = (this.messages || []).slice(0, -1).slice(-8);
    const cleanContents = [];

    // If past messages begin with the AI greeting, prepend a natural user greeting
    // so Gemini's conversation sequence strictly begins with 'user'.
    if (pastMessages.length > 0 && pastMessages[0].sender === 'ai') {
      cleanContents.push({
        role: 'user',
        parts: [{ text: `Hello ${this.activePersona.name}!` }]
      });
    }

    for (const msg of pastMessages) {
      if (!msg || !msg.text || !msg.text.trim()) continue;
      const role = msg.sender === 'user' ? 'user' : 'model';
      if (cleanContents.length > 0 && cleanContents[cleanContents.length - 1].role === role) {
        cleanContents[cleanContents.length - 1].parts[0].text += `\n${msg.text.trim()}`;
      } else {
        cleanContents.push({
          role: role,
          parts: [{ text: msg.text.trim() }]
        });
      }
    }

    // Now append current userText, guaranteeing strict alternation
    if (cleanContents.length > 0 && cleanContents[cleanContents.length - 1].role === 'user') {
      cleanContents[cleanContents.length - 1].parts[0].text += `\n${userText.trim()}`;
    } else {
      cleanContents.push({
        role: 'user',
        parts: [{ text: userText.trim() }]
      });
    }

    const systemInstruction = `
${this.activePersona.prompt}

MANDATORY INSTRUCTIONS FOR ENGLISH TEACHING & FEEDBACK (VỪA TRÒ CHUYỆN VỪA PHÁT HIỆN LỖI & SỬA CÂU):
You are chatting with a Vietnamese English learner.
User's latest message: "${userText.replace(/"/g, '\\"')}"

Task 1: CONVERSATION REPLY
Reply naturally in English (1-3 sentences) in character as ${this.activePersona.name} (${this.activePersona.role}).

Task 2: SENTENCE CHECK & GRAMMAR FEEDBACK (BẮT BUỘC KIỂM TRA LỖI):
Carefully examine the user's sentence for:
- Any grammar mistakes (verb tenses, s/es, verb forms, subject-verb agreement, articles a/an/the)
- Preposition errors (e.g. "discuss about", "listen me", "wait me", "marry with", "go to home")
- Vietlish or word-by-word translation (e.g. "I am agree", "I very like", "many money", "how you say", "open the light")
- Awkward structure, missing words, or wrong word choice.

You MUST return strictly valid JSON with this exact structure:
{
  "reply": "Your English conversational reply (1-3 sentences)",
  "vi": "Bản dịch tiếng Việt của câu trả lời trên",
  "feedback": {
    "has_error": true or false,
    "wrong": "The exact flawed part or sentence the user said",
    "correct": "The 100% correct, natural native English sentence",
    "explanation": "Lời giải thích bằng tiếng Việt (1-2 câu) chỉ rõ tại sao sai và cấu trúc chuẩn",
    "better_phrasing": "Một cách diễn đạt tự nhiên hoặc nâng cao hơn của người bản xứ (nếu có)"
  },
  "suggestions": ["3 gợi ý câu tiếp theo mà người học có thể nói"]
}

RULES:
- If the user made ANY mistake, awkwardness, or Vietlish: set "has_error": true, put the flawed part in "wrong", the fixed sentence in "correct", and explain in Vietnamese in "explanation".
- If the user's sentence is 100% correct: set "has_error": false, "correct": "${userText.replace(/"/g, '\\"')}", and give praise and a more advanced phrasing in "better_phrasing".
- Output raw JSON only. Do not wrap in markdown or backticks.
`;

    const model = (window.storage?.getAiModel ? window.storage.getAiModel() : (window.storage.aiSettings && window.storage.aiSettings.geminiModel)) || 'gemini-3.5-flash';
    let endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(apiKey)}`;

    const generationConfig = {
      temperature: 0.65,
      maxOutputTokens: 512
    };

    // If Gemini 3.x (e.g. gemini-3.5-flash), disable deep deliberation thinking delay
    if (String(model).includes('3.') || String(model).includes('3-') || String(model).includes('35')) {
      generationConfig.thinkingConfig = {
        thinking_level: "NONE"
      };
    }

    const payload = {
      system_instruction: {
        parts: [{ text: systemInstruction }]
      },
      contents: cleanContents,
      generationConfig: generationConfig
    };

    let response;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 12000);

    try {
      response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: controller.signal
      });
    } catch (fetchErr) {
      if (fetchErr.name === 'AbortError') {
        throw new Error('Kết nối Gemini API quá thời gian chờ (Timeout > 7.5s)');
      }
      throw fetchErr;
    } finally {
      clearTimeout(timeoutId);
    }

    // If model rejected responseMimeType: "application/json" or thinkingConfig (status 400), retry clean
    if (!response.ok && response.status === 400) {
      try {
        const retryCtrl = new AbortController();
        const retryTid = setTimeout(() => retryCtrl.abort(), 5000);
        const retryResp = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            system_instruction: { parts: [{ text: systemInstruction }] },
            contents: cleanContents,
            generationConfig: {
              temperature: 0.5,
              maxOutputTokens: 450
            }
          }),
          signal: retryCtrl.signal
        });
        clearTimeout(retryTid);
        if (retryResp.ok) {
          response = retryResp;
        }
      } catch (retryErr) {}
    }

    // If model is not recognized or quota exceeded or server busy (404/400/429/503/500), gracefully try official fallback models
    if (!response.ok && (response.status === 404 || response.status === 400 || response.status === 429 || response.status === 503 || response.status === 500)) {
      const fallbackList = ['gemini-3.5-flash', 'gemini-3.5-flash-lite', 'gemini-3.6-flash', 'gemini-2.0-flash', 'gemini-1.5-flash'];
      for (const fbModel of fallbackList) {
        if (fbModel === model) continue;
        try {
          const fbCtrl = new AbortController();
          const fbTid = setTimeout(() => fbCtrl.abort(), 5000);
          const fbEndpoint = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(fbModel)}:generateContent?key=${encodeURIComponent(apiKey)}`;
          const fbGenConfig = {
            temperature: 0.5,
            maxOutputTokens: 450,
            responseMimeType: "application/json"
          };
          if (String(fbModel).includes('3.') || String(fbModel).includes('3-')) {
            fbGenConfig.thinkingConfig = { thinking_level: "LOW" };
          }
          const fbResp = await fetch(fbEndpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              system_instruction: { parts: [{ text: systemInstruction }] },
              contents: cleanContents,
              generationConfig: fbGenConfig
            }),
            signal: fbCtrl.signal
          });
          clearTimeout(fbTid);
          if (fbResp.ok) {
            response = fbResp;
            if (window.storage?.saveAiSettings) {
              window.storage.saveAiSettings({ geminiModel: fbModel });
            }
            break;
          }
        } catch (fbErr) {
          console.warn(`Fallback to ${fbModel} failed:`, fbErr);
        }
      }
    }

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      const errMsg = errData.error?.message || `Gemini API returned status ${response.status}`;
      throw new Error(errMsg);
    }

    const data = await response.json();
    const candidateText = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!candidateText) {
      throw new Error('No candidate returned from Gemini');
    }

    // Robust 3-tier JSON parsing
    let parsed = null;
    try {
      parsed = JSON.parse(candidateText.trim());
    } catch (e1) {
      try {
        const cleaned = candidateText.replace(/```(?:json)?/gi, '').replace(/```/g, '').trim();
        parsed = JSON.parse(cleaned);
      } catch (e2) {
        const jsonMatch = candidateText.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          try {
            parsed = JSON.parse(jsonMatch[0]);
          } catch (e3) {}
        }
      }
    }

    const fallbackOffline = (window.AI_OFFLINE_KNOWLEDGE && typeof window.AI_OFFLINE_KNOWLEDGE.checkGrammar === 'function')
      ? window.AI_OFFLINE_KNOWLEDGE.checkGrammar(userText)
      : null;

    if (!parsed) {
      console.warn('Could not parse Gemini JSON response, candidate was:', candidateText);
      return {
        reply: candidateText,
        vi: '',
        correction: fallbackOffline || {
          has_error: false,
          wrong: userText,
          correct: userText,
          explanation: 'Đã nhận câu nói của bạn.'
        },
        suggestions: this.activePersona.quickReplies
      };
    }

    const fb = parsed.feedback || parsed.correction || parsed.grammarFeedback || parsed.grammar || {};

    let wrong = fb.wrong || fb.original || fb.user_text || userText;
    let correct = fb.correct || fb.corrected || fb.improved || userText;
    let explanation = fb.explanation || fb.explain || fb.reason || '';
    let betterPhrasing = fb.better_phrasing || fb.advanced || fb.natural || '';
    let hasError = false;

    if (fb.has_error !== undefined) {
      hasError = Boolean(fb.has_error);
    } else if (fb.hasError !== undefined) {
      hasError = Boolean(fb.hasError);
    } else if (correct && wrong && correct.trim().toLowerCase() !== wrong.trim().toLowerCase()) {
      hasError = true;
    }

    // Prioritize detecting error if offline engine spotted one
    if (!hasError && fallbackOffline && fallbackOffline.has_error) {
      hasError = true;
      wrong = fallbackOffline.wrong;
      correct = fallbackOffline.correct;
      explanation = fallbackOffline.explanation;
      if (!betterPhrasing) betterPhrasing = fallbackOffline.better_phrasing;
    }

    const correction = {
      has_error: hasError,
      wrong: wrong,
      correct: correct,
      explanation: explanation || (hasError ? 'Cách diễn đạt chuẩn bản ngữ hơn.' : 'Câu nói của bạn đã chuẩn xác ngữ pháp!'),
      better_phrasing: betterPhrasing
    };

    return {
      reply: parsed.reply || candidateText,
      vi: parsed.vi || '',
      correction: correction,
      suggestions: parsed.suggestions || this.activePersona.quickReplies
    };
  }

  _callOfflineEngine(userText) {
    const offlineGrammar = (window.AI_OFFLINE_KNOWLEDGE && typeof window.AI_OFFLINE_KNOWLEDGE.checkGrammar === 'function')
      ? window.AI_OFFLINE_KNOWLEDGE.checkGrammar(userText)
      : null;

    // Dynamic contextual response: acknowledge user's actual words
    const lower = (userText || '').toLowerCase().trim();
    const words = lower.split(/\s+/).filter(Boolean);
    const keyTopic = words.slice(0, 6).join(' ');

    // Rotating pool - never same reply twice in a row
    this._offlineIdx = ((this._offlineIdx || 0) + 1) % 6;
    const connectors = [
      `That's interesting — "${userText.trim()}"! `,
      `I love that you said that! `,
      `Great point! `,
      `Nicely put! `,
      `I appreciate you sharing that! `,
      `That's a great way to express it! `
    ];
    const followUps = [
      'Can you tell me more about your thoughts on this?',
      'How do you feel about that in your daily life?',
      'Could you give me an example of when you experienced this?',
      'What made you think about this topic today?',
      'If you had to explain this to a friend, how would you say it?',
      'What do you think is the most important part of what you just said?'
    ];

    const viConnectors = [
      `Rất thú vị! `,
      `Mình rất thích điều đó! `,
      `Ý kiến hay! `,
      `Diễn đạt tốt lắm! `,
      `Cảm ơn bạn đã chia sẻ! `,
      `Cách dùng từ rất tự nhiên! `
    ];
    const viFollowUps = [
      'Bạn có thể kể thêm về suy nghĩ của mình không?',
      'Điều này ảnh hưởng đến cuộc sống hàng ngày của bạn thế nào?',
      'Bạn có thể cho mình một ví dụ thực tế không?',
      'Điều gì khiến bạn nghĩ đến chủ đề này hôm nay?',
      'Bạn sẽ giải thích điều này với bạn bè như thế nào?',
      'Bạn nghĩ phần quan trọng nhất trong câu vừa nói là gì?'
    ];

    const idx = this._offlineIdx;
    const reply = connectors[idx] + followUps[idx];
    const vi = viConnectors[idx] + viFollowUps[idx];

    const suggestions = [
      'Can we continue this conversation?',
      'How do I say this more naturally?',
      'Let me try to explain it better.'
    ];

    // Note: _callOfflineEngine no longer has the old huge keyword-switch block.
    // All persona-specific and fallback logic now flows here.
    return {
      reply,
      vi,
      correction: offlineGrammar || {
        has_error: false,
        wrong: userText,
        correct: userText,
        explanation: '⚠️ AI ngoại tuyến (offline). Kết nối Gemini API để nhận phản hồi thông minh hơn.'
      },
      suggestions
    };
  }

  _callOfflineEngine_UNUSED_LEGACY(userText) {
    const offlineGrammar = (window.AI_OFFLINE_KNOWLEDGE && typeof window.AI_OFFLINE_KNOWLEDGE.checkGrammar === 'function')
      ? window.AI_OFFLINE_KNOWLEDGE.checkGrammar(userText)
      : null;

    const lower = userText.trim().toLowerCase();
    const personaId = this.activePersona ? this.activePersona.id : 'sarah_tutor';

    // Persona-specific dynamic multi-turn dialogue engines
    if (personaId === 'elena_concierge') {
      // 1. Specific ticket inquiry
      if (/\b(ticket|tickets|admission|pass|entry)\b/i.test(lower)) {
        return {
          reply: "Ticket prices in London vary: West End theater tickets start from £30, the London Eye is around £35, and single subway tube fares are £2.80 with contactless payment. Which tickets would you like me to check or book for you?",
          vi: "Giá vé ở London tùy thuộc vào địa điểm: Vé kịch West End từ £30, vé vòng quay London Eye khoảng £35, và vé tàu điện ngầm là £2.80. Quý khách muốn tôi kiểm tra hoặc đặt vé nào ạ?",
          correction: offlineGrammar,
          suggestions: ["West End theater tickets, please.", "How much are London Eye tickets?", "Subway Oyster card prices, please."]
        };
      }
      // 2. Price / cost / how much / fee
      if (/\b(price|cost|how much|fee|rate|expensive|charge|how much is)\b/i.test(lower)) {
        return {
          reply: "I would be happy to check the exact pricing for you! Are you inquiring about local theater tickets, city tours, or private airport transportation?",
          vi: "Tôi rất sẵn lòng kiểm tra mức giá chính xác cho quý khách! Quý khách đang hỏi về vé xem kịch, tour tham quan hay xe đưa đón sân bay ạ?",
          correction: offlineGrammar,
          suggestions: ["Theater ticket prices, please.", "Airport taxi rates, please.", "Subway fare prices."]
        };
      }
      // 3. Where / directions / maps / how far
      if (/\b(where|direction|directions|map|far|distance|how to get|walk)\b/i.test(lower)) {
        return {
          reply: "Most iconic sights like Piccadilly Circus and Covent Garden are just a 10 to 15-minute walk from our lobby. I would be glad to mark the best walking route on a city map for you!",
          vi: "Hầu hết các địa điểm nổi tiếng như Piccadilly Circus và Covent Garden chỉ cách sảnh khách sạn 10 đến 15 phút đi bộ. Tôi rất vui lòng đánh dấu lộ trình đẹp nhất trên bản đồ cho quý khách!",
          correction: offlineGrammar,
          suggestions: ["Could you give me a city map?", "Where is the nearest tube station?", "Is it safe to walk around at night?"]
        };
      }
      // 4. Taxi / cab
      if (/\b(taxi|cab|uber|a ride|book a car|call a cab|book a taxi)\b/i.test(lower) && !/\b(airport|heathrow|gatwick|station)\b/i.test(lower)) {
        return {
          reply: "Certainly! I have arranged a licensed black cab for you right now. The driver will arrive at the main hotel entrance in about 5 to 7 minutes. Where is your destination today?",
          vi: "Chắc chắn rồi ạ! Tôi đã đặt một chiếc taxi cho quý khách ngay bây giờ. Tài xế sẽ đến cổng chính khách sạn trong khoảng 5-7 phút nữa. Hôm nay quý khách muốn đến đâu ạ?",
          correction: offlineGrammar,
          suggestions: ["To Heathrow Airport, please.", "To the central train station.", "Can I pay by credit card?"]
        };
      }
      // 5. Airport / station
      if (/\b(airport|heathrow|gatwick|flight|plane|station|train station)\b/i.test(lower)) {
        return {
          reply: "Understood! Getting to the airport takes approximately 45 minutes with current traffic. I will inform your driver so you can have a smooth ride.",
          vi: "Đã rõ ạ! Đi đến sân bay sẽ mất khoảng 45 phút theo tình hình giao thông hiện tại. Tôi sẽ dặn tài xế trước để quý khách có một chuyến đi thuận lợi.",
          correction: offlineGrammar,
          suggestions: ["Thank you very much!", "Could you help with my luggage?", "Is there a train alternative?"]
        };
      }
      // 6. Amenities / housekeeping
      if (/\b(towel|blanket|pillow|soap|shampoo|amenity|amenities|water|clean|housekeeping|room service)\b/i.test(lower)) {
        return {
          reply: "Housekeeping has been notified immediately! Fresh supplies will be delivered right to your door in just a few minutes. Is there anything else you need for your room?",
          vi: "Bộ phận buồng phòng đã được thông báo ngay lập tức! Đồ dùng mới sẽ được mang đến tận phòng cho quý khách trong vài phút tới. Quý khách có cần thêm gì nữa không ạ?",
          correction: offlineGrammar,
          suggestions: ["That is all, thank you!", "Could you also bring extra water?", "What time does housekeeping finish?"]
        };
      }
      // 7. Food / restaurant / dining
      if (/\b(breakfast|dinner|lunch|food|restaurant|eat|hungry|dining|buffet)\b/i.test(lower)) {
        return {
          reply: "Our complimentary buffet breakfast is served from 7:00 to 10:30 AM in the Grand Dining Hall. For dinner, there is also an exquisite traditional British bistro right across the street!",
          vi: "Bữa sáng buffet miễn phí được phục vụ từ 7:00 đến 10:30 tại Đại Sảnh Tầng 1. Cho bữa tối, đối diện khách sạn cũng có một nhà hàng ẩm thực Anh truyền thống rất tuyệt vời!",
          correction: offlineGrammar,
          suggestions: ["Do I need a reservation for dinner?", "What time does dinner start?", "Can I have room service instead?"]
        };
      }
      // 8. Checkout
      if (/\b(check out|checkout|leave|bill|late checkout|receipt|card)\b/i.test(lower)) {
        return {
          reply: "Standard checkout time is at 12:00 PM. If you need a late checkout until 2:00 PM, I would be delighted to arrange that complimentary for you!",
          vi: "Giờ trả phòng tiêu chuẩn là 12:00 trưa. Nếu quý khách cần trả phòng muộn đến 2:00 chiều, tôi rất hân hạnh được hỗ trợ miễn phí cho quý khách!",
          correction: offlineGrammar,
          suggestions: ["A late checkout until 2 PM would be great.", "I'll check out now, please.", "Can you hold my bags after checkout?"]
        };
      }
      // 9. Pharmacy / health
      if (/\b(pharmacy|medicine|doctor|hospital|headache|sick|pain)\b/i.test(lower)) {
        return {
          reply: "The nearest pharmacy is Boots on High Street, just a 3-minute walk to the right from our front doors. They are open until 10 PM tonight.",
          vi: "Hiệu thuốc gần nhất là Boots ở phố High Street, chỉ cách cửa chính khách sạn 3 phút đi bộ về bên phải. Họ mở cửa đến 10 giờ tối nay.",
          correction: offlineGrammar,
          suggestions: ["Thank you for the directions.", "Do they sell pain relievers?", "Is there a 24-hour clinic?"]
        };
      }
      // 10. Check-in / Room key / Wi-Fi / Luggage
      if (/\b(check in|checkin|key|card key|wifi|wi-fi|internet|password|luggage|baggage|hold my bags)\b/i.test(lower)) {
        return {
          reply: "Welcome! Our high-speed hotel Wi-Fi network is 'GrandHotel_Guest' and requires no password. If you would like, our concierge bell staff can hold your luggage securely while your room key is prepared.",
          vi: "Chào mừng quý khách! Mạng Wi-Fi tốc độ cao của khách sạn là 'GrandHotel_Guest' không cần mật khẩu. Nếu quý khách muốn, nhân viên có thể cất giữ hành lý an toàn trong khi thẻ phòng đang được chuẩn bị.",
          correction: offlineGrammar,
          suggestions: ["Thank you, please hold my bags.", "What time is checkout tomorrow?", "Could you recommend a dinner spot?"]
        };
      }
      // 11. Thanks / greetings
      if (/\b(thank|thanks|great|perfect|appreciate|wonderful|ok|okay|sure)\b/i.test(lower)) {
        return {
          reply: "It is an absolute pleasure assisting you! Please dial 0 from your room phone anytime if you need recommendations or assistance during your stay.",
          vi: "Rất hân hạnh được phục vụ quý khách! Quý khách có thể bấm phím 0 từ điện thoại trong phòng bất cứ lúc nào nếu cần hỗ trợ thêm nhé.",
          correction: offlineGrammar,
          suggestions: ["Could you recommend a museum nearby?", "What is the Wi-Fi password?", "I'm heading out for a walk now."]
        };
      }

      // Attentive conversational fallback pool for Elena (responds like a real concierge, no fake arrangements)
      this._elenaFallbackIdx = ((this._elenaFallbackIdx || 0) + 1) % 3;
      const elenaPool = [
        {
          reply: "Regarding your question, I would be delighted to assist you with all the details! Could you tell me a little more so I can provide the exact information and arrangements you need?",
          vi: "Về câu hỏi của quý khách, tôi rất hân hạnh được cung cấp đầy đủ thông tin! Quý khách có thể cho tôi biết thêm chi tiết để tôi hỗ trợ chính xác nhất không ạ?",
          suggestions: ["Could you check ticket prices?", "Can you recommend a good restaurant?", "I need help with transportation."]
        },
        {
          reply: "I understand completely! Our concierge team is here to assist with every request. What specific attraction or service would you like to explore?",
          vi: "Tôi hoàn toàn hiểu ạ! Đội ngũ lễ tân luôn sẵn sàng hỗ trợ mọi yêu cầu. Quý khách muốn tìm hiểu thêm về địa điểm tham quan hay dịch vụ cụ thể nào ạ?",
          suggestions: ["Book a taxi for tomorrow morning.", "Recommend a show for tonight.", "What are the best sights nearby?"]
        },
        {
          reply: "Thank you for asking! I'm right here at the concierge desk to help with bookings, sightseeing, and dining. How can I best assist your plans today?",
          vi: "Cảm ơn quý khách đã hỏi! Tôi luôn túc trực tại quầy để hỗ trợ đặt chỗ, tham quan và ăn uống. Tôi có thể giúp gì tốt nhất cho kế hoạch hôm nay của quý khách?",
          suggestions: ["What time is breakfast served?", "Can you arrange theater tickets?", "Where is the nearest subway station?"]
        }
      ];
      const selected = elenaPool[this._elenaFallbackIdx];
      return {
        reply: selected.reply,
        vi: selected.vi,
        correction: offlineGrammar,
        suggestions: selected.suggestions
      };
    }

    if (personaId === 'alex_barista') {
      // 1. Price inquiry first
      if (/\b(price|cost|how much|menu price|charge)\b/i.test(lower)) {
        return {
          reply: "Our drinks range from $3.50 for an espresso or Americano to $5.50 for a large latte or cold brew. Fresh pastries are $3.75 each. What can I get started for you?",
          vi: "Đồ uống của quán có giá từ $3.50 cho espresso hoặc Americano đến $5.50 cho latte lớn hoặc cold brew. Bánh ngọt tươi là $3.75. Bạn muốn dùng món gì nào?",
          correction: offlineGrammar,
          suggestions: ["A large latte with oat milk, please.", "Just an Americano.", "What pastries do you have today?"]
        };
      }
      if (/\b(coffee|latte|cappuccino|americano|espresso|macchiato|cold brew|tea|drink)\b/i.test(lower)) {
        return {
          reply: "Awesome pick! We brew with fresh locally roasted beans. Would you like that hot or iced? And do you prefer oat milk, almond milk, or regular whole milk?",
          vi: "Lựa chọn tuyệt vời! Chúng mình pha từ hạt cà phê rang mới tại chỗ. Bạn thích uống nóng hay đá? Và bạn chọn sữa yến mạch, hạnh nhân hay sữa tươi truyền thống?",
          correction: offlineGrammar,
          suggestions: ["Iced with oat milk, please!", "Hot with whole milk.", "Can you make it less sweet?"]
        };
      }
      if (/\b(milk|oat|almond|soy|sugar|sweet|ice|less ice|size|large|medium|small)\b/i.test(lower)) {
        return {
          reply: "Got it! Customized just the way you like it. Would you like a warm pastry to go with that? Our almond croissants are fresh out of the oven!",
          vi: "Đã rõ ạ! Pha chế đúng chuẩn khẩu vị của bạn nhé. Bạn có muốn thêm bánh ngọt nóng hổi không? Bánh sừng bò hạnh nhân vừa mới ra lò đấy!",
          correction: offlineGrammar,
          suggestions: ["Yes, I'll take a croissant too!", "No thanks, just the drink.", "How much is that in total?"]
        };
      }
      if (/\b(pastry|croissant|cake|muffin|scone|cookie|sandwich|eat|food|snack)\b/i.test(lower)) {
        return {
          reply: "Delicious choice! I'll warm that up for you right now so it's nice and flaky. Your total comes to $6.25.",
          vi: "Lựa chọn ngon tuyệt! Mình sẽ làm nóng bánh lại ngay để vỏ bánh giòn xốp nhé. Tổng cộng của bạn là $6.25.",
          correction: offlineGrammar,
          suggestions: ["Can I pay with Apple Pay?", "Here is cash.", "Can I have a glass of water too?"]
        };
      }
      // Payment inquiry
      if (/\b(pay|card|cash|apple pay|total|receipt|bill)\b/i.test(lower)) {
        return {
          reply: "You can tap your card or phone right on the terminal whenever you're ready! Would you like a printed receipt or by email?",
          vi: "Bạn có thể chạm thẻ hoặc điện thoại lên máy quẹt thẻ bất cứ lúc nào! Bạn có cần in biên lai hay gửi qua email không?",
          correction: offlineGrammar,
          suggestions: ["No receipt needed, thanks.", "Printed receipt, please.", "Thank you, have a great day!"]
        };
      }
      if (/\b(thank|thanks|cool|bye|see you|great|good)\b/i.test(lower)) {
        return {
          reply: "You're very welcome! Here is your drink. Enjoy every sip, and have an awesome day ahead!",
          vi: "Không có chi đâu bạn! Đây là đồ uống của bạn nhé. Chúc bạn một ngày tràn đầy năng lượng và niềm vui!",
          correction: offlineGrammar,
          suggestions: ["Thanks Alex, see you tomorrow!", "What time do you close?", "The coffee smells amazing."]
        };
      }

      this._alexFallbackIdx = ((this._alexFallbackIdx || 0) + 1) % 3;
      const alexPool = [
        {
          reply: "Sounds great! We love having positive vibes here at Central Perk. What else are you up to today?",
          vi: "Nghe hay đấy! Quán mình luôn tràn ngập năng lượng tích cực. Hôm nay bạn còn kế hoạch gì nữa không?",
          suggestions: ["I'm heading to work now.", "Just studying English here.", "Meeting a friend later."]
        },
        {
          reply: "Right on! I can whip that up for you in no time. Take a seat by the window and I'll bring it over.",
          vi: "Chuẩn luôn! Mình sẽ làm xong cho bạn trong nháy mắt. Cứ ngồi bàn cạnh cửa sổ nhé, mình sẽ mang ra ngay.",
          suggestions: ["Thank you so much!", "Does the cafe have Wi-Fi?", "Can I have an extra napkin?"]
        },
        {
          reply: "You got it! Fast, friendly service is our specialty. Anything else I can get started for you today?",
          vi: "Đã có ngay! Nhanh chóng và thân thiện là phương châm của quán. Bạn có muốn gọi thêm gì nữa không?",
          suggestions: ["No, that's everything for today.", "How much does it cost?", "Can I get a cup of ice water?"]
        }
      ];
      const sel = alexPool[this._alexFallbackIdx];
      return { reply: sel.reply, vi: sel.vi, correction: offlineGrammar, suggestions: sel.suggestions };
    }

    if (personaId === 'marco_waiter') {
      // 1. Price inquiry first for Marco
      if (/\b(price|cost|how much|rate|expensive|cheap)\b/i.test(lower)) {
        return {
          reply: "Our starters range from $12 to $18, and main entrees such as our grilled salmon and filet mignon are between $28 and $44. We also offer a 3-course dinner tasting menu for $55 tonight!",
          vi: "Các món khai vị có giá từ $12 đến $18, và các món chính như cá hồi áp chảo hay thăn bò thượng hạng từ $28 đến $44. Tối nay chúng tôi cũng có set menu 3 món với giá $55 ạ!",
          correction: offlineGrammar,
          suggestions: ["The 3-course menu sounds wonderful.", "I'd like to order the salmon, please.", "What wine do you recommend?"]
        };
      }
      if (/\b(drink|water|wine|beer|cocktail|sparkling|juice)\b/i.test(lower)) {
        return {
          reply: "Right away! I will bring chilled sparkling water with fresh lemon to your table. In the meantime, would you like to hear today's chef specials?",
          vi: "Có ngay ạ! Tôi sẽ mang nước khoáng có ga ướp lạnh kèm lát chanh tươi ra bàn cho quý khách. Trong lúc này, quý khách có muốn nghe về món đặc sản hôm nay của bếp trưởng không ạ?",
          correction: offlineGrammar,
          suggestions: ["Yes, what is the chef's special?", "I'm ready to order entrees.", "Could we get bread with olive oil?"]
        };
      }
      if (/\b(steak|salmon|pasta|chicken|pizza|fish|salad|order|special|recommend|starter|appetizer)\b/i.test(lower)) {
        return {
          reply: "An outstanding choice! Our handmade truffle pasta and pan-seared salmon are customer favorites tonight. How would you prefer that prepared?",
          vi: "Một lựa chọn tuyệt hảo! Món mì Ý nấm truffle thủ công và cá hồi áp chảo là hai món được yêu thích nhất tối nay. Quý khách muốn chế biến khẩu vị thế nào ạ?",
          correction: offlineGrammar,
          suggestions: ["Medium rare for the steak, please.", "Less salt on the salmon.", "Could I have salad instead of fries?"]
        };
      }
      if (/\b(allergy|allergic|spicy|salt|dietary|vegetarian|vegan|gluten)\b/i.test(lower)) {
        return {
          reply: "I have noted that with highest priority for our kitchen. Our chef will prepare your dish with extra care to match your dietary needs perfectly.",
          vi: "Tôi đã ghi chú ưu tiên hàng đầu cho nhà bếp rồi ạ. Bếp trưởng sẽ chế biến món ăn cẩn thận để phù hợp hoàn hảo với khẩu vị và yêu cầu của quý khách.",
          correction: offlineGrammar,
          suggestions: ["Thank you for being so attentive.", "Is the dessert gluten-free?", "How long will the food take?"]
        };
      }
      // Bill inquiry for Marco
      if (/\b(bill|check|pay|card|cash|receipt|tip)\b/i.test(lower)) {
        return {
          reply: "Certainly! Here is your check presented in this folder. Please take all the time you need, and I can process payment whenever you're ready.",
          vi: "Dạ vâng! Đây là hóa đơn của quý khách. Quý khách cứ thong thả nhé, tôi có thể thanh toán tiền mặt hoặc thẻ bất cứ khi nào quý khách sẵn sàng.",
          correction: offlineGrammar,
          suggestions: ["Can I pay with credit card?", "The meal was fantastic, compliments to the chef!", "Is tip included in the total?"]
        };
      }
      return {
        reply: "Splendid! It is my pleasure serving you at Bella Vista Bistro tonight. Please let me know if you would like another drink or dessert.",
        vi: "Thật tuyệt vời! Rất hân hạnh được phục vụ quý khách tại Bella Vista Bistro tối nay. Quý khách có muốn dùng thêm đồ uống hay món tráng miệng không ạ?",
        correction: offlineGrammar,
        suggestions: ["Could we see the dessert menu?", "Could we get the check, please?", "Everything was delicious, thank you!"]
      };
    }

    if (personaId === 'david_interviewer') {
      if (/\b(experience|background|software|project|developer|work|job|role|career)\b/i.test(lower)) {
        return {
          reply: "That sounds like very impactful experience. In that position, could you describe a complex technical or business challenge you tackled, and how you delivered results?",
          vi: "Đó là những kinh nghiệm rất giá trị. Trong vị trí đó, bạn có thể chia sẻ một thử thách phức tạp về kỹ thuật hoặc dự án mà bạn đã giải quyết thành công không?",
          correction: offlineGrammar,
          suggestions: ["I led my team to redesign the database architecture.", "I resolved the issue by breaking it into smaller milestones.", "I collaborated closely with product managers."]
        };
      }
      if (/\b(team|communicate|conflict|deadline|pressure|stress|time management)\b/i.test(lower)) {
        return {
          reply: "Effective communication and resilience under pressure are vital in our company. How do you prioritize tasks when multiple high-urgency deadlines land at the same time?",
          vi: "Giao tiếp hiệu quả và sự kiên cường dưới áp lực là điều rất quan trọng tại công ty chúng tôi. Bạn ưu tiên công việc thế nào khi có nhiều thời hạn gấp cùng lúc?",
          correction: offlineGrammar,
          suggestions: ["I prioritize based on impact and reach out early.", "I maintain clear daily goals and automate repetitive tasks.", "I communicate transparently with stakeholders."]
        };
      }
      if (/\b(salary|compensation|pay|benefits|package|offer|range)\b/i.test(lower)) {
        return {
          reply: "We offer a competitive compensation package aligned with market rates and experience, including comprehensive health coverage, annual bonuses, and equity options. We typically discuss exact numbers at the offer stage. Does that sound aligned with your expectations?",
          vi: "Chúng tôi cung cấp mức lương cạnh tranh phù hợp với năng lực thị trường, bao gồm bảo hiểm toàn diện, thưởng hàng năm và quyền chọn cổ phiếu. Mức cụ thể sẽ được trao đổi chi tiết ở vòng chốt offer. Bạn thấy có phù hợp với kỳ vọng không?",
          correction: offlineGrammar,
          suggestions: ["Yes, that aligns with my expectations.", "Could you share the next steps in the process?", "What does a typical workday look like?"]
        };
      }
      if (/\b(culture|vision|environment|company|work life|overtime|remote)\b/i.test(lower)) {
        return {
          reply: "We have a highly collaborative, autonomous culture with hybrid flexibility. We emphasize continuous learning, open feedback, and psychological safety. Is a collaborative environment something you thrive in?",
          vi: "Chúng tôi có văn hóa làm việc hợp tác, tự chủ cao kết hợp làm việc từ xa linh hoạt. Chúng tôi chú trọng tinh thần học hỏi, phản hồi cởi mở và sự an tâm tâm lý. Bạn có cảm thấy phát huy tốt nhất trong môi trường như vậy không?",
          correction: offlineGrammar,
          suggestions: ["Yes, I thrive in collaborative teams.", "How often do you hold team retrospectives?", "What tools do your engineering teams use?"]
        };
      }
      return {
        reply: "Thank you for that clear answer. We value candidates who reflect deeply on their work and demonstrate continuous learning. Do you have any questions for me about our engineering culture or vision?",
        vi: "Cảm ơn câu trả lời rất rõ ràng của bạn. Chúng tôi đánh giá cao những ứng viên có tư duy đúc kết và tinh thần không ngừng học hỏi. Bạn có câu hỏi nào dành cho tôi về văn hóa hay tầm nhìn công ty không?",
        correction: offlineGrammar,
        suggestions: ["What does success look like in the first 90 days?", "How does the team foster technical growth?", "What are the biggest challenges the team faces?"]
      };
    }

    // Default Tutor / Friend dynamic engine (Sarah Tutor & Chris Friend)
    if (/\b(hello|hi|hey|good morning|good evening)\b/i.test(lower)) {
      return {
        reply: `Hi there! It's so wonderful to chat with you today. What topic would you like to talk about or practice together right now?`,
        vi: `Chào bạn! Rất vui được trò chuyện cùng bạn hôm nay. Bạn muốn cùng mình thảo luận hay luyện tập chủ đề gì nào?`,
        correction: offlineGrammar,
        suggestions: ["Can we practice daily conversation?", "Teach me some natural idioms.", "How do I sound more like a native speaker?"]
      };
    }
    if (/\b(how to|how can|how do|improve|fluency|pronounce|practice|study|tips|speak faster)\b/i.test(lower)) {
      return {
        reply: "To build speaking fluency, try the 'Shadowing technique'—listen to native audio and repeat immediately with the same pitch and rhythm. Also, thinking in English for 5 minutes a day makes a huge difference!",
        vi: "Để nói trôi chảy, hãy thử kỹ thuật Shadowing—nghe người bản xứ và nhắc lại ngay lập tức với ngữ điệu tương tự. Ngoài ra, việc tập suy nghĩ bằng tiếng Anh 5 phút mỗi ngày sẽ tạo nên bước nhảy vọt đấy!",
        correction: offlineGrammar,
        suggestions: ["How do I practice shadowing?", "Can we try a short dialogue now?", "What podcasts do you recommend?"]
      };
    }
    if (/^what\s+(is|are|does|do)/i.test(lower)) {
      return {
        reply: `That's a great question to explore in English! Could you provide a bit of context or an example? That way I can explain the exact usage and nuance for you.`,
        vi: `Đó là một câu hỏi rất hay để luyện tiếng Anh! Bạn có thể cho mình thêm một chút ngữ cảnh hoặc ví dụ không? Như vậy mình sẽ giải thích chính xác cách dùng và sắc thái nhé.`,
        correction: offlineGrammar,
        suggestions: ["For example, in a work meeting.", "In casual daily conversation.", "Can you give me a sentence example?"]
      };
    }
    if (/\b(grammar|mistake|correct|learn|improve|idiom|vocab|phrasing)\b/i.test(lower)) {
      return {
        reply: "You're making steady progress! A great native habit is learning words in collocations (cụm từ đi liền nhau) instead of isolated single words. Would you like to practice a few useful collocations now?",
        vi: "Bạn đang tiến bộ rất vững chắc đấy! Một thói quen tuyệt vời của người bản xứ là học từ vựng theo cụm (collocations) thay vì học từng từ riêng lẻ. Bạn có muốn thực hành vài cụm từ thông dụng ngay bây giờ không?",
        correction: offlineGrammar,
        suggestions: ["Yes, teach me 3 common collocations!", "How do I use 'take for granted'?", "Can you give me an example sentence?"]
      };
    }

    // Dynamic rotating pool for Sarah and Chris so they never repeat
    this._chatFallbackIdx = ((this._chatFallbackIdx || 0) + 1) % 4;
    const generalPool = [
      {
        reply: "That is a really interesting perspective! Could you elaborate a bit more on that? I'd love to hear your reasoning.",
        vi: "Đó là một góc nhìn rất thú vị! Bạn có thể chia sẻ thêm về điều đó không? Mình rất muốn lắng nghe thêm suy nghĩ của bạn.",
        suggestions: ["Because it helps me stay focused and relaxed.", "I've been thinking about this for a while.", "What is your opinion on this?"]
      },
      {
        reply: "Great point! Using English to express your personal thoughts like this is the fastest way to build natural fluency. How long have you felt that way?",
        vi: "Ý kiến rất tuyệt! Sử dụng tiếng Anh để diễn đạt suy nghĩ cá nhân thế này là cách nhanh nhất để giao tiếp lưu loát. Bạn đã có suy nghĩ này từ bao lâu rồi?",
        suggestions: ["For quite a few months now.", "Ever since I started my new project.", "It just came to mind recently."]
      },
      {
        reply: "I completely follow your thoughts. If you were explaining this to a friend or coworker, how would you summarize it in one sentence?",
        vi: "Mình hoàn toàn hiểu ý bạn. Nếu bạn giải thích điều này cho bạn bè hay đồng nghiệp, bạn sẽ tóm tắt lại trong một câu thế nào?",
        suggestions: ["It's all about staying consistent and patient.", "Communication is always the key.", "Small daily improvements add up over time."]
      },
      {
        reply: "Nicely articulated! Your sentence structure is coming along very naturally. Shall we take this conversation a step further or try another interesting topic?",
        vi: "Diễn đạt rất tự nhiên! Cấu trúc câu của bạn ngày càng chuẩn bản xứ rồi đấy. Chúng ta đào sâu thêm chủ đề này hay thử một đề tài mới nhé?",
        suggestions: ["Let's try another fun topic!", "Can you teach me a related idiom?", "I'd like to practice ordering food next."]
      }
    ];
    const item = generalPool[this._chatFallbackIdx];
    return {
      reply: item.reply,
      vi: item.vi,
      correction: offlineGrammar,
      suggestions: item.suggestions
    };
  }

  resetChat() {
    if (window.audioCtrl) {
      window.audioCtrl.stop();
    }
    if (this.isRecording) {
      this.stopVoiceRecording(false);
    }
    window.storage.clearPersonaChatHistory(this.activePersona.id);
    this.messages = [
      {
        id: 'msg_0',
        sender: 'ai',
        text: this.activePersona.greeting,
        vi: this.activePersona.greeting_vi,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ];
    window.storage.savePersonaChatHistory(this.activePersona.id, this.messages);
    this._renderMessages();
    this._renderQuickReplies(this.activePersona.quickReplies);

    if (this.inputField) {
      this.inputField.value = '';
      this.inputField.style.height = 'auto';
      this.inputField.focus();
    }

    if (window.app) {
      window.app.showToast(`✨ Đã bắt đầu cuộc hội thoại mới với ${this.activePersona.name}!`, 'success');
    }
  }

  openSettingsModal() {
    if (!this.settingsModal) return;

    // Reset test feedback box
    const feedbackBox = document.getElementById('ai-key-test-feedback');
    if (feedbackBox) {
      feedbackBox.style.display = 'none';
      feedbackBox.innerHTML = '';
      feedbackBox.className = 'ai-key-test-feedback';
    }

    const settings = window.storage.aiSettings || {};
    if (this.apiKeyInput) {
      this.apiKeyInput.value = settings.geminiApiKey || '';
    }
    if (this.modelSelect) {
      this.modelSelect.value = (window.storage?.getAiModel ? window.storage.getAiModel() : settings.geminiModel) || 'gemini-3.5-flash';
    }

    const autoTtsCb = document.getElementById('ai-setting-autotts');
    const showSubCb = document.getElementById('ai-setting-showsub');
    const grammarCb = document.getElementById('ai-setting-grammar');

    if (autoTtsCb) autoTtsCb.checked = settings.autoTTS !== false;
    if (showSubCb) showSubCb.checked = settings.showViSub !== false;
    if (grammarCb) grammarCb.checked = settings.grammarFeedback !== false;

    this.settingsModal.style.display = 'flex';
  }

  closeSettingsModal() {
    if (this.settingsModal) {
      this.settingsModal.style.display = 'none';
    }
  }

  saveSettings() {
    const key = (this.apiKeyInput ? this.apiKeyInput.value : '').trim();
    const model = (this.modelSelect ? this.modelSelect.value : (window.storage?.getAiModel ? window.storage.getAiModel() : 'gemini-3.5-flash'));
    const autoTtsCb = document.getElementById('ai-setting-autotts');
    const showSubCb = document.getElementById('ai-setting-showsub');
    const grammarCb = document.getElementById('ai-setting-grammar');

    window.storage.saveAiSettings({
      geminiApiKey: key,
      geminiModel: model,
      autoTTS: autoTtsCb ? autoTtsCb.checked : true,
      showViSub: showSubCb ? showSubCb.checked : true,
      grammarFeedback: grammarCb ? grammarCb.checked : true
    });

    this._updateEngineStatusUI();
    if (window.upgraderView && typeof window.upgraderView.updateEngineStatus === 'function') {
      window.upgraderView.updateEngineStatus(key ? model : null);
    }
    if (window.roleplayView && typeof window.roleplayView.updateEngineStatus === 'function') {
      window.roleplayView.updateEngineStatus(key ? model : null);
    }
    this._renderMessages();
    this.closeSettingsModal();

    if (window.app) {
      window.app.showToast(`Đã lưu cấu hình AI (${model}) thành công!`, 'success');
    }
  }

  clearApiKey() {
    if (this.apiKeyInput) this.apiKeyInput.value = '';
    const feedbackBox = document.getElementById('ai-key-test-feedback');
    if (feedbackBox) {
      feedbackBox.style.display = 'block';
      feedbackBox.className = 'ai-key-test-feedback';
      feedbackBox.style.background = 'rgba(255,255,255,0.05)';
      feedbackBox.style.color = 'var(--text-secondary)';
      feedbackBox.innerHTML = 'ℹ️ Đã xóa Key. Ứng dụng sẽ dùng AI bản địa (Smart Offline Engine).';
    }
    window.storage.saveAiSettings({ geminiApiKey: '' });
    this._updateEngineStatusUI();
    if (window.upgraderView && typeof window.upgraderView.updateEngineStatus === 'function') {
      window.upgraderView.updateEngineStatus(null);
    }
    if (window.roleplayView && typeof window.roleplayView.updateEngineStatus === 'function') {
      window.roleplayView.updateEngineStatus(null);
    }
    if (window.app) {
      window.app.showToast('Đã xóa API Key. Ứng dụng sẽ dùng AI bản địa.', 'info');
    }
  }

  async testApiKey() {
    const key = (this.apiKeyInput ? this.apiKeyInput.value : '').trim();
    const feedbackBox = document.getElementById('ai-key-test-feedback');
    const testBtn = document.getElementById('ai-test-key-btn');

    if (!key) {
      if (feedbackBox) {
        feedbackBox.style.display = 'block';
        feedbackBox.className = 'ai-key-test-feedback error';
        feedbackBox.innerHTML = '⚠️ <strong>Chưa có Key:</strong> Vui lòng dán Gemini API Key vào ô trên trước khi bấm kiểm tra.';
      }
      if (window.app) window.app.showToast('Vui lòng dán Gemini API Key trước khi kiểm tra!', 'warning');
      return;
    }

    if (testBtn) {
      testBtn.disabled = true;
      testBtn.textContent = '⏳ Đang kiểm tra...';
    }

    if (feedbackBox) {
      feedbackBox.style.display = 'block';
      feedbackBox.className = 'ai-key-test-feedback loading';
      feedbackBox.innerHTML = `⏳ <strong>Đang kết nối:</strong> Đang gửi tín hiệu kiểm tra tới Google Gemini API...`;
    }

    try {
      // 1. Determine candidate models for fast direct probing
      const preferred = (this.modelSelect && this.modelSelect.value) || 
                        (window.storage?.getAiModel ? window.storage.getAiModel() : 'gemini-3.5-flash');
      const testCandidates = Array.from(new Set([preferred, 'gemini-3.5-flash', 'gemini-2.0-flash', 'gemini-1.5-flash']));

      let verifiedModel = null;
      let lastErrorMessage = '';
      let isQuotaExceeded = false;

      // 2. Direct fast probe with strict 4.5s timeout per attempt
      for (const testModel of testCandidates) {
        const ctrl = new AbortController();
        const tid = setTimeout(() => ctrl.abort(), 4500);
        try {
          const genConfig = {
            temperature: 0.2,
            maxOutputTokens: 10
          };
          if (String(testModel).includes('3.') || String(testModel).includes('3-')) {
            genConfig.thinkingConfig = { thinking_level: 'LOW' };
          }
          const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(testModel)}:generateContent?key=${encodeURIComponent(key)}`;
          const response = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{ parts: [{ text: 'Ping' }] }],
              generationConfig: genConfig
            }),
            signal: ctrl.signal
          });
          clearTimeout(tid);

          if (response.ok) {
            verifiedModel = testModel;
            break;
          } else {
            const errData = await response.json().catch(() => ({}));
            const msg = errData.error?.message || `HTTP ${response.status}`;
            lastErrorMessage = msg;

            // If API key is fundamentally rejected, no need to probe other models
            if (response.status === 400 && (msg.includes('API key not valid') || msg.includes('API_KEY_INVALID'))) {
              lastErrorMessage = 'API key không hợp lệ hoặc đã bị vô hiệu hóa trên Google AI Studio.';
              break;
            }
            if (response.status === 429 || msg.includes('RESOURCE_EXHAUSTED') || msg.includes('quota')) {
              isQuotaExceeded = true;
              verifiedModel = testModel; // Key is recognized and valid, just hit quota!
              break;
            }
            // If 404 or other error, continue to next model candidate
          }
        } catch (probeErr) {
          clearTimeout(tid);
          if (probeErr.name === 'AbortError') {
            lastErrorMessage = 'Thời gian kết nối quá 4.5 giây (Timeout). Vui lòng kiểm tra kết nối mạng của bạn.';
          } else {
            lastErrorMessage = probeErr.message || 'Lỗi mạng hoặc CORS không thể kết nối tới Google.';
          }
        }
      }

      if (isQuotaExceeded) {
        if (feedbackBox) {
          feedbackBox.className = 'ai-key-test-feedback info';
          feedbackBox.innerHTML = `⚠️ <strong>Key chính xác nhưng hết hạn mức (Quota Exceeded):</strong><br>Google AI Studio ghi nhận Key đúng, nhưng tài khoản của bạn đang chạm giới hạn lượt gọi miễn phí hôm nay.<br><small style="opacity:0.9">Ứng dụng sẽ tự động chuyển sang AI Bản Địa khi cần.</small>`;
        }
        if (window.app) window.app.showToast('API Key hợp lệ (chạm hạn mức gọi Google)', 'info');
        return;
      }

      if (!verifiedModel) {
        if (feedbackBox) {
          feedbackBox.className = 'ai-key-test-feedback error';
          feedbackBox.innerHTML = `❌ <strong>Kết nối thất bại:</strong> ${this._escapeHtml(lastErrorMessage)}<br><small style="opacity:0.85">Hãy kiểm tra lại API Key hoặc tạo key mới tại <a href="https://aistudio.google.com/app/apikey" target="_blank" style="color:#93c5fd">Google AI Studio</a>.</small>`;
        }
        if (window.app) window.app.showToast('Kiểm tra Key thất bại: ' + lastErrorMessage, 'error');
        return;
      }

      // Success! Update UI immediately!
      if (this.modelSelect) {
        this.modelSelect.value = verifiedModel;
      }
      if (feedbackBox) {
        feedbackBox.className = 'ai-key-test-feedback success';
        feedbackBox.innerHTML = `✅ <strong>Kiểm tra thành công!</strong> API Key hoạt động hoàn hảo.<br>Mô hình phản hồi: <strong>${this._escapeHtml(verifiedModel)}</strong>.<br><small style="opacity:0.9">Hãy bấm <strong>"💾 Lưu Cấu Hình"</strong> bên dưới để áp dụng.</small>`;
      }
      if (window.app) window.app.showToast(`🎉 Kết nối thành công với ${verifiedModel}!`, 'success');

      // 3. Asynchronously background-discover models without blocking the user
      if (window.discoverGeminiModels) {
        window.discoverGeminiModels(key).then(discovery => {
          if (discovery && discovery.models && discovery.models.length > 0) {
            window._cachedGeminiDiscovery = {
              key: key,
              models: discovery.models,
              apiVersion: discovery.apiVersion,
              recommended: discovery.recommended || verifiedModel
            };
            const safeModels = (discovery.models || []).filter(m => {
              const l = m.toLowerCase();
              return !l.includes('tts') && !l.includes('embedding') && !l.includes('bidi') && !l.includes('imagen') && !l.includes('audio');
            });
            if (this.modelSelect && safeModels.length > 0 && this.settingsModal?.style.display !== 'none') {
              const currentVal = this.modelSelect.value || verifiedModel;
              this.modelSelect.innerHTML = safeModels.map(m => `<option value="${m}" ${m === currentVal ? 'selected' : ''}>${m === currentVal ? '⭐ ' : '✨ '}${m}</option>`).join('');
            }
          }
        }).catch(() => {});
      }

    } catch (e) {
      if (feedbackBox) {
        feedbackBox.className = 'ai-key-test-feedback error';
        feedbackBox.innerHTML = `❌ <strong>Lỗi kết nối:</strong> ${this._escapeHtml(e.message)}.<br><small style="opacity:0.85">Vui lòng kiểm tra lại kết nối mạng của bạn.</small>`;
      }
      if (window.app) window.app.showToast(`Lỗi: ${e.message}`, 'error');
    } finally {
      if (testBtn) {
        testBtn.disabled = false;
        testBtn.textContent = '⚡ Kiểm tra Key';
      }
    }
  }

  onLeaveTab() {
    if (this.isRecording) {
      this.stopVoiceRecording(false);
    }
    if (window.audioCtrl) {
      window.audioCtrl.stop();
    }
  }

  onEnterTab() {
    this._scrollToBottom();
    this._updateEngineStatusUI();
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

window.aiChatView = new AIChatViewController();
