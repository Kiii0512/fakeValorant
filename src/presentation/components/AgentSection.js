class AgentSection extends HTMLElement {
  set data(value) {
    this._data = value;
    this.render();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    if (!this.isConnected || !this._data || this._data.length === 0) return;

    this.innerHTML = `
      <style>
        .agent-card .ability-list-custom {
          display: flex;
          gap: 8px;
          margin: 16px 0;
        }
        .agent-card .ability-slot-box {
          position: relative;
          width: 36px;
          height: 36px;
          background: rgba(15, 25, 35, 0.7);
          border: 1px solid rgba(0, 245, 212, 0.3);
          border-radius: 2px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }
        .agent-card .ability-slot-box:hover {
          border-color: var(--cyan, #00f5d4);
          box-shadow: 0 0 10px rgba(0, 245, 212, 0.2);
        }
        .agent-card .ability-slot-box img {
          width: 22px;
          height: 22px;
          object-fit: contain;
          filter: drop-shadow(0 0 2px rgba(0,0,0,0.8));
        }
        .agent-card .ability-slot-box .key-fallback {
          font-family: var(--font-mono, monospace);
          font-weight: 700;
          font-size: 13px;
          color: var(--cyan, #00f5d4);
        }
        .agent-card .ability-slot-box .slot-badge {
          position: absolute;
          bottom: 1px;
          right: 2px;
          font-size: 8px;
          font-family: var(--font-mono, monospace);
          color: rgba(255, 255, 255, 0.4);
          line-height: 1;
        }

        /* Tactical Button mới cực kỳ nổi bật */
        .tactical-cta-btn {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          padding: 12px 16px;
          background: rgba(0, 245, 212, 0.05);
          border: 1px solid var(--cyan, #00f5d4);
          color: var(--cyan, #00f5d4);
          font-family: var(--font-mono, monospace);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1.5px;
          text-decoration: none;
          text-transform: uppercase;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
          box-sizing: border-box;
        }
        .tactical-cta-btn:hover {
          background: var(--cyan, #00f5d4);
          color: #0a0b10;
          box-shadow: 0 0 16px rgba(0, 245, 212, 0.4);
          transform: translateY(-2px);
        }
        .tactical-cta-btn span {
          font-size: 14px;
          transition: transform 0.2s ease;
        }
        .tactical-cta-btn:hover span {
          transform: translateX(4px);
        }
      </style>

      <section class="section showcase" id="agents">
        <div class="showcase__heading">
          <div>
            <p class="eyebrow">Field operatives // featured roster</p>
            <h2>Choose your<br><span>operator.</span></h2>
          </div>
          <p class="showcase__intro">Every agent brings a different answer to the same question: how do we take space?</p>
        </div>
        <div class="agent-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px; max-width: 1200px; margin: 0 auto;">
          ${this._data.map((agent, index) => {
            let abilities = [];
            if (Array.isArray(agent.abilities)) {
              abilities = agent.abilities.map(ab => {
                if (Array.isArray(ab)) return { slot: ab[0], name: ab[1], icon: '' };
                return {
                  slot: ab.slotKey || ab.slot_key || '?',
                  name: ab.name || '',
                  icon: ab.iconUrl || ab.icon_url || ''
                };
              });
            }

            const avatar = agent.avatarUrl || agent.avatar_url || '';
            const codename = agent.codename || agent.name || 'AGENT';
            const role = agent.role || 'Controller';
            const bio = agent.description || agent.bio || 'Thông tin đặc vụ đang được cập nhật.';

            return `
              <article class="agent-card" style="margin: 0; width: 100%;">
                <div class="agent-card__image-wrap">
                  <img class="agent-card__image" src="${avatar}" alt="${codename} agent portrait" loading="lazy">
                  <span class="agent-card__number">0${index + 1} // ${agent.id || index + 1}</span>
                  <span class="agent-card__role">${role}</span>
                  ${agent.isFeatured ? '<span class="featured-badge"><i></i> ĐÁNG CHÚ Ý // CLASSIFIED</span>' : ''}
                </div>
                <div class="agent-card__body">
                  <div class="agent-card__title">
                    <h3>${codename}</h3>
                    <span>ACTIVE</span>
                  </div>
                  <p>${bio.length > 90 ? bio.slice(0, 90) + '...' : bio}</p>
                  
                  <div class="ability-list-custom" aria-label="${codename} abilities">
                    ${abilities.map(ab => `
                      <div class="ability-slot-box" title="${ab.name || ab.slot}">
                        ${ab.icon 
                          ? `<img src="${ab.icon}" alt="${ab.name}" />` 
                          : `<span class="key-fallback">${ab.slot}</span>`
                        }
                        <span class="slot-badge">${ab.slot}</span>
                      </div>
                    `).join('')}
                  </div>

                  <a class="tactical-cta-btn" href="agents.html#${agent.id}">
                    XEM CHI TIẾT <span>→</span>
                  </a>
                </div>
              </article>
            `;
          }).join('')}
        </div>
      </section>
    `;
  }
}

customElements.define('agent-section', AgentSection);