const fallbackAbilityIcon = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23e8edf2"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>';

const escapeHtml = (value = '') => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#039;');

class AgentDetailView extends HTMLElement {
  set data(agentData) {
    this._agentData = agentData;
    this.render();
  }

  set error(message) {
    this._error = message;
    this.render();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    if (!this.isConnected) return;
    if (this._error) {
      this.innerHTML = `<div class="detail-state detail-state--error"><p>${escapeHtml(this._error)}</p><a href="agents.html">QUAY LẠI DANH SÁCH ĐẶC VỤ</a></div>`;
      return;
    }
    if (!this._agentData) {
      this.innerHTML = '<div class="detail-state"><div class="loading-spinner"></div><p>ĐANG TRUY XUẤT HỒ SƠ TÁC CHIẾN...</p></div>';
      return;
    }

    const agent = this._agentData.agent || this._agentData;
    const abilities = this._agentData.abilities || agent.abilities || [];
    const avatar = agent.avatar_url || agent.avatarUrl || '';

    this.innerHTML = `
      <div class="detail-container">
        <a href="agents.html" class="back-btn">← QUAY LẠI DANH SÁCH ĐẶC VỤ</a>
        <header class="agent-header">
          ${avatar ? `<img class="agent-avatar-preview" src="${escapeHtml(avatar)}" alt="${escapeHtml(agent.name || agent.codename || 'Agent')}" />` : ''}
          <div class="agent-title-box">
            <span class="badge">${escapeHtml(agent.role || 'CONTROLLER')}</span>
            <h1>${escapeHtml(agent.name || agent.codename || 'AGENT')}</h1>
            <div class="agent-bio-box">${escapeHtml(agent.bio || 'Chưa có thông tin tiểu sử.')}</div>
          </div>
        </header>
        <div class="showcase-grid">
          <div>
            <div class="section-label">KỸ NĂNG ĐẶC ĐỊNH // LOADOUT</div>
            <div class="ability-nav" data-ability-nav></div>
            <div class="ability-info" data-ability-info>
              <h3 data-ability-name>Tên kỹ năng</h3>
              <p data-ability-description>Mô tả kỹ năng</p>
            </div>
          </div>
          <div>
            <div class="section-label">MÔ PHỎNG CHIẾN TRƯỜNG // LIVE FOOTAGE</div>
            <div class="video-viewport">
              <video data-ability-video autoplay loop muted playsinline preload="auto"></video>
              <div class="video-placeholder" data-no-video>
                <span class="video-placeholder__icon">▶</span>
                <span>Chưa có dữ liệu video cho kỹ năng này</span>
              </div>
            </div>
          </div>
        </div>
      </div>`;

    const nav = this.querySelector('[data-ability-nav]');
    if (!abilities.length) {
      this.querySelector('[data-ability-info]').innerHTML = '<p>Chưa có kỹ năng được cập nhật trong hệ thống.</p>';
      this.showNoVideo();
      return;
    }

    abilities.forEach((ability, index) => {
      const key = ability.slot_key || ability.slotKey || 'Q';
      const button = document.createElement('button');
      button.className = `ability-tab${index === 0 ? ' active' : ''}`;
      button.type = 'button';
      button.innerHTML = `<div class="icon-wrapper"><img class="ability-icon" src="${escapeHtml(ability.icon_url || ability.iconUrl || fallbackAbilityIcon)}" alt="${escapeHtml(ability.name || key)}" /></div><span class="slot-key">${escapeHtml(key)}</span>`;
      button.addEventListener('click', () => this.selectAbility(ability, button));
      nav.appendChild(button);
    });
    this.selectAbility(abilities[0], nav.firstElementChild);
  }

  selectAbility(ability, tabElement) {
    this.querySelectorAll('.ability-tab').forEach((tab) => tab.classList.remove('active'));
    tabElement?.classList.add('active');
    const key = ability.slot_key || ability.slotKey || 'Q';
    this.querySelector('[data-ability-name]').textContent = `${key} // ${ability.name || 'KỸ NĂNG'}`;
    this.querySelector('[data-ability-description]').textContent = ability.description || 'Chưa có mô tả kỹ năng.';

    const video = this.querySelector('[data-ability-video]');
    const videoUrl = ability.video_url || ability.videoUrl || '';
    if (!videoUrl.trim()) {
      this.showNoVideo();
      return;
    }
    this.querySelector('[data-no-video]').hidden = true;
    video.hidden = false;
    if (video.src !== videoUrl) {
      video.src = videoUrl;
      video.load();
    }
    video.play().catch(() => {});
  }

  showNoVideo() {
    const video = this.querySelector('[data-ability-video]');
    if (!video) return;
    video.pause();
    video.hidden = true;
    this.querySelector('[data-no-video]').hidden = false;
  }
}

customElements.define('agent-detail-view', AgentDetailView);