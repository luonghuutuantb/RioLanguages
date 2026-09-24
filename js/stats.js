/**
 * EngMaster Statistics & Gamification Module
 * Visual charts, CEFR breakdown, mastery ratios, and achievement badges
 */

const BADGES_LIST = [
  { id: 'first_step', icon: '🌱', name: 'Khởi Đầu Mới', desc: 'Bắt đầu học và hoàn thành bài tập đầu tiên', req: (s, m) => m.vocabMastered >= 1 || m.sentencesMastered >= 1 },
  { id: 'vocab_50', icon: '🥉', name: 'Nhập Môn Từ Vựng', desc: 'Thuộc 50 từ vựng cốt lõi', req: (s, m) => m.vocabMastered >= 50 },
  { id: 'vocab_200', icon: '🥈', name: 'Tự Tin Giao Tiếp', desc: 'Thuộc 200 từ vựng', req: (s, m) => m.vocabMastered >= 200 },
  { id: 'vocab_500', icon: '🥇', name: 'Cao Thủ Từ Vựng', desc: 'Thuộc 500 từ vựng', req: (s, m) => m.vocabMastered >= 500 },
  { id: 'vocab_1000', icon: '👑', name: 'Bậc Thầy Ngôn Ngữ', desc: 'Thuộc 1.000 từ vựng', req: (s, m) => m.vocabMastered >= 1000 },
  { id: 'sentences_50', icon: '💬', name: 'Nói Trôi Chảy', desc: 'Thuộc 50 câu giao tiếp thực tế', req: (s, m) => m.sentencesMastered >= 50 },
  { id: 'sentences_200', icon: '✈️', name: 'Vi Vu Thế Giới', desc: 'Thuộc 200 câu giao tiếp', req: (s, m) => m.sentencesMastered >= 200 },
  { id: 'streak_3', icon: '🔥', name: 'Chăm Chỉ Đều Đặn', desc: 'Học liên tục trong 3 ngày', req: (s) => s.streak >= 3 },
  { id: 'streak_7', icon: '⚡', name: 'Kỷ Luật Thép', desc: 'Học liên tục trong 7 ngày', req: (s) => s.streak >= 7 },
  { id: 'quiz_10', icon: '🎯', name: 'Xạ Thủ Trắc Nghiệm', desc: 'Hoàn thành 10 lượt kiểm tra', req: (s) => s.quizzesCompleted >= 10 },
  { id: 'fc_100', icon: '🎴', name: 'Ghi Nhớ Siêu Phàm', desc: 'Đã ôn 100 lượt Flashcard', req: (s) => s.flashcardsReviewed >= 100 },
  { id: 'xp_1000', icon: '💎', name: 'Triệu Phú XP', desc: 'Tích lũy được hơn 1.000 điểm XP', req: (s) => s.xp >= 1000 }
];

class StatsController {
  constructor() {
    this.streakValEl = document.getElementById('stats-streak-val');
    this.xpValEl = document.getElementById('stats-xp-val');
    this.vocabMasteredEl = document.getElementById('stats-vocab-mastered');
    this.sentenceMasteredEl = document.getElementById('stats-sentence-mastered');

    // Bars
    this.barA1Text = document.getElementById('bar-a1-text');
    this.barA1Fill = document.getElementById('bar-a1-fill');
    this.barA2Text = document.getElementById('bar-a2-text');
    this.barA2Fill = document.getElementById('bar-a2-fill');
    this.barB1Text = document.getElementById('bar-b1-text');
    this.barB1Fill = document.getElementById('bar-b1-fill');
    this.barB2Text = document.getElementById('bar-b2-text');
    this.barB2Fill = document.getElementById('bar-b2-fill');

    // Donut
    this.donutFillPath = document.getElementById('donut-fill-path');
    this.donutPercentText = document.getElementById('donut-percent-text');
    this.legendMastered = document.getElementById('legend-mastered');
    this.legendLearning = document.getElementById('legend-learning');
    this.legendNew = document.getElementById('legend-new');

    // Badges
    this.badgesContainer = document.getElementById('badges-container');
    this.resetBtn = document.getElementById('btn-reset-data');

    this._initEvents();
  }

  _initEvents() {
    this.resetBtn.addEventListener('click', () => {
      if (confirm('Bạn có chắc chắn muốn đặt lại toàn bộ tiến độ học, streak và XP về trạng thái ban đầu?')) {
        window.storage.resetAll();
        window.app.updateHeaderStats();
        this.renderStats();
        window.app.showToast('Đã đặt lại toàn bộ dữ liệu.', 'info');
      }
    });
  }

  renderStats() {
    const stats = window.storage.stats;
    const allVocab = window.VOCAB_DATA || [];
    const allSentences = window.SENTENCES_DATA || [];

    // Count Vocab Mastered
    let vocabMastered = 0;
    let vocabLearning = 0;
    const levelCounts = {
      A1: { total: 0, mastered: 0 },
      A2: { total: 0, mastered: 0 },
      B1: { total: 0, mastered: 0 },
      B2: { total: 0, mastered: 0 }
    };

    allVocab.forEach(v => {
      const key = `v_${v.id}`;
      const status = window.storage.getStatus(key);
      const lvl = v.level || 'B1';
      if (!levelCounts[lvl]) levelCounts[lvl] = { total: 0, mastered: 0 };

      levelCounts[lvl].total++;
      if (status === 'mastered') {
        vocabMastered++;
        levelCounts[lvl].mastered++;
      } else if (status === 'learning') {
        vocabLearning++;
      }
    });

    // Count Sentences Mastered
    let sentencesMastered = 0;
    let sentencesLearning = 0;
    allSentences.forEach(s => {
      const key = `s_${s.id}`;
      const status = window.storage.getStatus(key);
      if (status === 'mastered') sentencesMastered++;
      else if (status === 'learning') sentencesLearning++;
    });

    // Update Top Overview Cards
    this.streakValEl.textContent = stats.streak;
    this.xpValEl.textContent = (stats.xp || 0).toLocaleString('vi-VN');
    this.vocabMasteredEl.textContent = `${vocabMastered.toLocaleString('vi-VN')} / ${allVocab.length.toLocaleString('vi-VN')}`;
    this.sentenceMasteredEl.textContent = `${sentencesMastered.toLocaleString('vi-VN')} / ${allSentences.length.toLocaleString('vi-VN')}`;

    // Update CEFR Level Progress Bars
    this._renderLevelBar('a1', levelCounts.A1);
    this._renderLevelBar('a2', levelCounts.A2);
    this._renderLevelBar('b1', levelCounts.B1);
    this._renderLevelBar('b2', levelCounts.B2);

    // Update Donut Chart
    const totalItems = (allVocab.length + allSentences.length) || 3500;
    const totalMastered = vocabMastered + sentencesMastered;
    const totalLearning = vocabLearning + sentencesLearning;
    const totalNew = Math.max(0, totalItems - totalMastered - totalLearning);

    const masteredPercent = Math.round((totalMastered / totalItems) * 100);
    this.donutPercentText.textContent = `${masteredPercent}%`;
    this.donutFillPath.setAttribute('stroke-dasharray', `${masteredPercent}, 100`);

    this.legendMastered.textContent = totalMastered.toLocaleString('vi-VN');
    this.legendLearning.textContent = totalLearning.toLocaleString('vi-VN');
    this.legendNew.textContent = totalNew.toLocaleString('vi-VN');

    // Update Badges
    this._renderBadges(stats, { vocabMastered, sentencesMastered });
  }

  _renderLevelBar(levelKey, data) {
    const textEl = this[`bar${levelKey.toUpperCase()}Text`];
    const fillEl = this[`bar${levelKey.toUpperCase()}Fill`];
    if (!textEl || !fillEl || !data) return;

    textEl.textContent = `${data.mastered} / ${data.total}`;
    const pct = data.total > 0 ? (data.mastered / data.total) * 100 : 0;
    fillEl.style.width = `${pct}%`;
  }

  _renderBadges(stats, metrics) {
    this.badgesContainer.innerHTML = BADGES_LIST.map(badge => {
      const isUnlocked = badge.req(stats, metrics);
      return `
        <div class="badge-card ${isUnlocked ? 'unlocked' : 'locked'}">
          <div class="badge-icon">${badge.icon}</div>
          <div>
            <div class="badge-name">${badge.name} ${isUnlocked ? '✓' : '🔒'}</div>
            <div class="badge-desc">${badge.desc}</div>
          </div>
        </div>
      `;
    }).join('');
  }
}

window.statsCtrl = new StatsController();
