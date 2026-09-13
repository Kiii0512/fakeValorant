import './AdminAgentPanel.js';
import './AdminMapPanel.js';
import './AdminWeaponPanel.js';
import './AdminArticleForm.js';
import './AdminSettingsPanel.js';
import './AdminGuidePanel.js';

export class AdminAgentForm extends HTMLElement {
  set handlers(value) {
    this._h = value;
    this.render();
    this.bindHandlers();
  }

  connectedCallback() {
    this.render();
    this.bindHandlers();
  }

  render() {
    if (this._rendered) return;
    this._rendered = true;
    this._currentTab = this._currentTab || 'agent';
    this.innerHTML = `
      <div class="admin-container">
        <nav class="admin-tabs" aria-label="Quản lý nội dung">
          <button type="button" class="button button--cyan" data-tab="agent">QUẢN LÝ ĐẶC VỤ</button>
          <button type="button" class="button button--outline" data-tab="map">QUẢN LÝ BẢN ĐỒ</button>
          <button type="button" class="button button--outline" data-tab="weapon">QUẢN LÝ VŨ KHÍ</button>
          <button type="button" class="button button--outline" data-tab="article">QUẢN LÝ TIN TỨC</button>
          <button type="button" class="button button--outline" data-tab="setting">CÀI ĐẶT TRANG CHỦ</button>
          <button type="button" class="button button--outline" data-tab="guide">HƯỚNG DẪN TÂN THỦ</button>
        </nav>
        <div data-panel="agent"><admin-agent-panel></admin-agent-panel></div>
        <div data-panel="map" hidden><admin-map-panel></admin-map-panel></div>
        <div data-panel="weapon" hidden><admin-weapon-panel></admin-weapon-panel></div>
        <div data-panel="article" hidden><admin-article-form></admin-article-form></div>
        <div data-panel="setting" hidden><admin-settings-panel></admin-settings-panel></div>
        <div data-panel="guide" hidden><admin-guide-panel></admin-guide-panel></div>
      </div>`;
    this.querySelectorAll('[data-tab]').forEach((button) => button.addEventListener('click', () => this.selectTab(button.dataset.tab)));
    this.selectTab(this._currentTab);
  }

  bindHandlers() {
    if (!this._h) return;
    const agentPanel = this.querySelector('admin-agent-panel');
    if (agentPanel) agentPanel.handlers = this._h;

    const mapPanel = this.querySelector('admin-map-panel');
    if (mapPanel) mapPanel.handlers = this._h;

    const weaponPanel = this.querySelector('admin-weapon-panel');
    if (weaponPanel) weaponPanel.handlers = this._h;

    const articlePanel = this.querySelector('admin-article-form');
    if (articlePanel) articlePanel.handlers = this._h;

    const settingsPanel = this.querySelector('admin-settings-panel');
    if (settingsPanel) settingsPanel.handlers = this._h;

    const guidePanel = this.querySelector('admin-guide-panel');
    if (guidePanel) guidePanel.handlers = this._h;
  }

  selectTab(tab) {
    this._currentTab = tab;
    this.querySelectorAll('[data-tab]').forEach((button) => {
      button.className = `button ${button.dataset.tab === tab ? 'button--cyan' : 'button--outline'}`;
    });
    this.querySelectorAll('[data-panel]').forEach((panel) => { panel.hidden = panel.dataset.panel !== tab; });
  }
}

customElements.define('admin-agent-form', AdminAgentForm);