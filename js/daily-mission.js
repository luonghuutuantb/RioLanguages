/**
 * Rio English - Daily 5-Minute Habit & Rio English Score Controller
 * daily-mission.js
 */

class DailyMissionController {
  constructor() {
    this.widgetContainer = null;
    this.scoreCardContainer = null;
  }

  init() {
    this.widgetContainer = document.getElementById('daily-5min-widget');
    this.scoreCardContainer = document.getElementById('rio-score-widget');
    this.renderWidget();
    this.renderScoreWidget();
  }

  renderWidget() {
    if (!this.widgetContainer) {
      this.widgetContainer = document.getElementById('daily-5min-widget');
    }
    if (!this.widgetContainer) return;

    const todayData = window.storage._getTodayMissions();
    const missions = todayData.missions;
    const completedCount = Object.values(missions).filter(m => m.done).length;
    const totalCount = 4;
    const percent = Math.round((completedCount / totalCount) * 100);
    const isAllDone = completedCount === totalCount;

    const missionList = [
      missions.listen,
      missions.shadow,
      missions.vocab,
      missions.chat
    ];

    this.widgetContainer.innerHTML = `
      <div class="mission-widget-card ${isAllDone ? 'all-completed' : ''}">
        <div class="mission-widget-header">
          <div class="mission-title-group">
            <div class="mission-icon-halo">⚡</div>
            <div>
              <div class="mission-badge-row">
                <span class="mission-sub-badge">THÓI QUEN VÀNG</span>
                <span class="mission-time-badge">⏱️ 5 Phút Hôm Nay</span>
              </div>
              <h2 class="mission-main-title">Xây dựng phản xạ Tiếng Anh mỗi ngày</h2>
            </div>
          </div>
          <div class="mission-progress-circle-wrap" title="${percent}% Hoàn thành">
            <svg class="mission-ring" viewBox="0 0 36 36">
              <path class="ring-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              <path class="ring-fill" stroke-dasharray="${percent}, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
            </svg>
            <div class="mission-ring-text">
              <strong>${completedCount}</strong>/<span>${totalCount}</span>
            </div>
          </div>
        </div>

        <div class="mission-cards-grid">
          ${missionList.map(m => {
            const isDone = m.done;
            return `
              <div class="mission-item-chip ${isDone ? 'done' : ''}" onclick="dailyMissionCtrl.handleMissionClick('${m.id}', '${m.tab}')">
                <div class="mission-item-left">
                  <span class="mission-item-icon">${m.icon}</span>
                  <div class="mission-item-text">
                    <span class="mission-item-name">${m.name}</span>
                    <span class="mission-item-status">
                      ${isDone ? '✓ Đã xong (+'+m.xp+' XP)' : 'Tiến độ: ' + (m.current || 0) + '/' + m.target}
                    </span>
                  </div>
                </div>
                <div class="mission-item-action">
                  ${isDone ? '<span class="check-pill">✓</span>' : '<button class="chip-go-btn">Làm ngay →</button>'}
                </div>
              </div>
            `;
          }).join('')}
        </div>

        <div class="mission-widget-footer">
          <div class="mission-reward-info">
            <span class="gift-icon">${isAllDone ? '🎉' : '🎁'}</span>
            <span>
              ${isAllDone 
                ? '<strong>Tuyệt vời!</strong> Bạn đã hoàn thành trọn vẹn 5 phút hôm nay (+50 XP Thưởng đã nhận)!' 
                : 'Hoàn thành đủ 4 hoạt động để nhận <strong>+50 XP Thưởng</strong> & giữ vững chuỗi Streak!'}
            </span>
          </div>
          ${isAllDone ? '<span class="shield-badge">🛡️ Streak Đã Được Bảo Vệ</span>' : ''}
        </div>
      </div>
    `;
  }

  renderScoreWidget() {
    if (!this.scoreCardContainer) {
      this.scoreCardContainer = document.getElementById('rio-score-widget');
    }
    if (!this.scoreCardContainer) return;

    const scoreData = window.storage.getRioEnglishScore();
    const { overall, cefr, label, skills } = scoreData;

    this.scoreCardContainer.innerHTML = `
      <div class="rio-score-card">
        <div class="score-card-header">
          <div class="score-header-left">
            <div class="rio-avatar-badge">🦜</div>
            <div>
              <span class="score-card-tag">ĐÁNH GIÁ NĂNG LỰC TOÀN DIỆN</span>
              <h3 class="score-card-title">Chỉ số Rio Languages Score</h3>
            </div>
          </div>
          <button class="score-detail-btn" onclick="app.switchTab('stats')" title="Xem chi tiết tại mục Tiến độ">
            Phân tích chi tiết →
          </button>
        </div>

        <div class="score-body-layout">
          <div class="score-overall-circle">
            <div class="score-number-halo">
              <span class="score-number">${overall}</span>
              <span class="score-max">/100</span>
            </div>
            <div class="cefr-badge-box">
              <span class="cefr-badge-pill">${cefr}</span>
              <span class="cefr-label-text">${label}</span>
            </div>
          </div>

          <div class="score-skills-matrix">
            ${Object.values(skills).map(s => `
              <div class="skill-meter-row">
                <div class="skill-meter-labels">
                  <span class="skill-name">${s.icon} ${s.name}</span>
                  <span class="skill-val"><strong>${s.score}</strong>/100</span>
                </div>
                <div class="skill-meter-bg">
                  <div class="skill-meter-fill" style="width: ${s.score}%"></div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <div class="score-recommendation-bar">
          <span class="rec-icon">💡</span>
          <span class="rec-text">
            <strong>Gợi ý cải thiện:</strong> ${this._getRecommendation(skills)}
          </span>
        </div>
      </div>
    `;
  }

  _getRecommendation(skills) {
    // Find skill with lowest score
    let lowest = null;
    for (const k in skills) {
      if (!lowest || skills[k].score < lowest.score) {
        lowest = skills[k];
      }
    }
    if (lowest && lowest.score < 50) {
      if (lowest.name.includes('Speaking') || lowest.name.includes('Phát âm')) {
        return 'Luyện nói qua Micro trong phần AI Chat để nhanh chóng bứt phá khả năng phản xạ và phát âm!';
      }
      if (lowest.name.includes('Listening')) {
        return 'Nghe 1 bài hội thoại thực tế có phụ đề để cải thiện tai nghe và nối âm bản xứ.';
      }
      if (lowest.name.includes('Vocabulary')) {
        return 'Lật 10 thẻ Flashcard mỗi ngày để tăng vốn từ cốt lõi A2-B1 lên mức tự tin.';
      }
      if (lowest.name.includes('Grammar')) {
        return 'Làm thử 1 bài kiểm tra trắc nghiệm ngữ pháp để chuẩn hóa cấu trúc câu.';
      }
    }
    return 'Duy trì học 5 phút mỗi ngày cùng Rio Languages để thăng hạng lên bậc B2/C1!';
  }

  handleMissionClick(missionId, tabName) {
    if (window.app && tabName) {
      window.app.switchTab(tabName);
    }
  }
}

window.dailyMissionCtrl = new DailyMissionController();
