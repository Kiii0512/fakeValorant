export class AgentsPage extends HTMLElement {
  constructor() {
    super();
    this._agents = [];
    this._activeRole = 'ALL';
  }

  set data(agents) {
    this._agents = agents || [];
    this.render();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    if (!this._agents || this._agents.length === 0) {
      this.innerHTML = `
        <section class="catalog-page" style="padding-top: 140px; min-height: 60vh; text-align: center;">
          <div class="catalog-hero" style="margin-bottom: 30px;">
            <p class="eyebrow">ROSTER PROTOCOL // AGENTS DATABASE</p>
            <h1 style="font-size: clamp(48px, 7vw, 84px); margin-bottom: 16px;">DANH SÁCH ĐẶC VỤ</h1>
            <p style="color: var(--muted); font-family: var(--mono); font-size: 13px;">Đang nạp hồ sơ chiến thuật đặc vụ từ máy chủ...</p>
          </div>
        </section>
      `;
      return;
    }

    const filtered = this._activeRole === 'ALL'
      ? this._agents
      : this._agents.filter(a => (a.role || '').toUpperCase() === this._activeRole);

    this.innerHTML = `
      <section class="catalog-page" style="padding-top: 140px;">
        <div class="catalog-hero" style="border-bottom: 1px solid var(--line); margin-bottom: 40px; padding-bottom: 24px;">
          <p class="eyebrow">ROSTER PROTOCOL // AGENTS DATABASE</p>
          <h1 style="font-size: clamp(48px, 7vw, 84px); line-height: 0.9; margin-bottom: 20px;">DANH SÁCH ĐẶC VỤ</h1>
          <p style="color: var(--muted); font-size: 15px; max-width: 620px;">
            Tìm hiểu khả năng tác chiến và chi tiết 4 kỹ năng của từng đặc vụ trên chiến trường.
          </p>

          <div style="display: flex; gap: 10px; margin-top: 28px; flex-wrap: wrap;">
            ${['ALL', 'DUELIST', 'INITIATOR', 'CONTROLLER', 'SENTINEL'].map(role => `
              <button type="button" class="role-filter-btn button ${this._activeRole === role ? 'button--cyan' : 'button--outline'}" data-role="${role}" style="min-height: 36px; font-size: 11px; padding: 6px 16px;">
                ${role}
              </button>
            `).join('')}
          </div>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 24px; margin-bottom: 80px;">
          ${filtered.map(agent => {
            const avatar = agent.avatarUrl || agent.fallbackImageUrl || '';
            const fallback = agent.fallbackImageUrl || '';
            const role = agent.role || 'Controller';
            const name = agent.codename || agent.name || 'UNKNOWN';

            return `
              <a href="agent-detail.html?id=${agent.id}" style="text-decoration: none; color: inherit;">
                <div class="weapon-showcase-card" style="height: 100%; border: 1px solid var(--line); background: var(--panel); padding: 20px; transition: all 0.25s ease; cursor: pointer;">
                  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px;">
                    <span style="color: var(--cyan); font-family: var(--mono); font-size: 11px; font-weight: 700;">// ${agent.id.toUpperCase()}</span>
                    <span style="color: #ff4655; font-family: var(--mono); font-size: 11px; text-transform: uppercase;">${role}</span>
                  </div>
                  <div style="width: 100%; height: 260px; display: flex; align-items: center; justify-content: center; overflow: hidden; background: #0c1017; margin-bottom: 16px;">
                    <img src="${avatar}" alt="${name}" style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.3s ease;" onerror="this.src='${fallback}'" />
                  </div>
                  <h3 style="font-family: var(--display); font-size: 32px; margin: 0 0 6px 0; text-transform: uppercase; color: #fff;">
                    ${name}
                  </h3>
                  <p style="color: var(--muted); font-size: 13px; line-height: 1.5; margin: 0; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">
                    ${agent.bio || 'Hồ sơ đặc vụ mật chưa cập nhật.'}
                  </p>
                </div>
              </a>
            `;
          }).join('')}
        </div>
      </section>
    `;

    this.querySelectorAll('.role-filter-btn').forEach(btn => {
      btn.onclick = () => {
        this._activeRole = btn.dataset.role;
        this.render();
      };
    });
  }
}

if (!customElements.get('agents-page')) {
  customElements.define('agents-page', AgentsPage);
}