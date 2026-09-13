class AgentSection extends HTMLElement {
  set data(agents) {
    this._agents = agents;
    this.render();
  }

  connectedCallback() {
    this.render();
  }

  // Tỉ lệ pick ngẫu nhiên luôn trên 70% (từ 70.1% đến 89.9%)
  getRandomPickRate() {
    return (70 + Math.random() * 19.8).toFixed(1);
  }

  render() {
    const agents = this._agents || [];

    this.innerHTML = `
      <style>
        .agent-section-wrapper {
          padding: 80px 24px;
          max-width: 1480px;
          margin: 0 auto;
        }

        .agent-section-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 48px;
        }

        .agent-section-header .eyebrow {
          font-family: var(--font-mono, monospace);
          font-size: 11px;
          color: var(--cyan, #00f0ff);
          letter-spacing: 0.12em;
          text-transform: uppercase;
          margin-bottom: 8px;
        }

        .agent-section-header h2 {
          font-family: 'Be Vietnam Pro', sans-serif;
          font-size: 36px;
          font-weight: 700;
          color: #fff;
          margin: 0;
          letter-spacing: -0.02em;
        }

        .agent-section-header h2 span {
          color: var(--cyan, #00f0ff);
        }

        /* GRID CHỨA CÁC CARD ĐẶC VỤ */
        .agent-cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
          gap: 32px;
        }

        /* CARD ĐẶC VỤ BO VIỀN PHONG CÁCH TÍM GLASSMORPHISM */
        .agent-tactical-card {
          position: relative;
          background: #090e17;
          border-radius: 28px;
          padding: 24px;
          display: flex;
          flex-direction: column;
          box-sizing: border-box;
          border: 1px solid rgba(138, 92, 246, 0.4);
          box-shadow: 0 0 25px rgba(138, 92, 246, 0.15), inset 0 0 15px rgba(138, 92, 246, 0.05);
          transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
        }

        .agent-tactical-card:hover {
          transform: translateY(-6px);
          border-color: rgba(168, 85, 247, 0.85);
          box-shadow: 0 0 35px rgba(168, 85, 247, 0.3), inset 0 0 20px rgba(168, 85, 247, 0.1);
        }

        /* DÒNG HEADER CARD: ROLE & HOT PICK BADGE */
        .agent-card-meta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 16px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
          margin-bottom: 18px;
        }

        .agent-role-title {
          font-family: 'Be Vietnam Pro', sans-serif;
          font-size: 13px;
          color: #7e8b9b;
          font-weight: 500;
        }

        .hot-pick-badge {
          font-family: 'Be Vietnam Pro', sans-serif;
          font-size: 12px;
          font-weight: 600;
          padding: 4px 14px;
          border-radius: 9999px;
          background: rgba(0, 240, 255, 0.06);
          border: 1px solid rgba(0, 240, 255, 0.3);
          color: #38bdf8;
          display: inline-flex;
          align-items: center;
          gap: 5px;
        }

        /* KHUNG CHỨA ẢNH ĐẶC VỤ */
        .agent-visual-box {
          position: relative;
          width: 100%;
          height: 250px;
          border-radius: 20px;
          overflow: hidden;
          background: radial-gradient(circle at 50% 30%, #1a273e 0%, #0a0f19 100%);
          border: 1px solid rgba(255, 255, 255, 0.05);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 22px;
        }

        .agent-visual-box img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          object-position: center center;
          transition: transform 0.4s ease;
          filter: drop-shadow(0 14px 24px rgba(0, 0, 0, 0.75));
        }

        .agent-tactical-card:hover .agent-visual-box img {
          transform: scale(1.06);
        }

        /* THÔNG TIN TÊN & TỶ LỆ PICK */
        .agent-info-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 8px;
        }

        .agent-name {
          font-family: 'Be Vietnam Pro', sans-serif;
          font-size: 26px;
          font-weight: 700;
          color: #ffffff;
          margin: 0;
          letter-spacing: -0.01em;
          text-transform: uppercase;
        }

        .pick-rate-pill {
          font-family: var(--font-mono, monospace);
          font-size: 13px;
          font-weight: 600;
          padding: 3px 10px;
          border-radius: 8px;
          background: rgba(56, 189, 248, 0.12);
          color: #38bdf8;
          border: 1px solid rgba(56, 189, 248, 0.2);
        }

        .agent-short-desc {
          font-family: 'Be Vietnam Pro', sans-serif;
          font-size: 13px;
          color: #8392a5;
          line-height: 1.5;
          margin: 0 0 18px 0;
          min-height: 38px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* DANH SÁCH CHIÊU THỨC DẠNG CAPSULE */
        .agent-abilities-wrap {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 24px;
        }

        .ability-pill {
          font-family: 'Be Vietnam Pro', sans-serif;
          font-size: 11px;
          font-weight: 500;
          padding: 6px 12px;
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: #94a3b8;
          transition: all 0.2s ease;
        }

        .ability-pill.ultimate {
          background: rgba(56, 189, 248, 0.08);
          border-color: rgba(56, 189, 248, 0.3);
          color: #38bdf8;
        }

        /* NÚT XEM HỒ SƠ ĐẶC VỤ */
        .btn-view-profile {
          margin-top: auto;
          width: 100%;
          height: 48px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          border-radius: 9999px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #f1f5f9;
          font-family: 'Be Vietnam Pro', sans-serif;
          font-size: 14px;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.2s ease;
        }

        .btn-view-profile:hover {
          background: #ffffff;
          color: #090e17;
          box-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
        }

        .btn-view-profile svg {
          transition: transform 0.2s ease;
        }

        .btn-view-profile:hover svg {
          transform: translateX(4px);
        }
      </style>

      <section class="agent-section-wrapper" id="featured-agents">
        <div class="agent-section-header">
          <div>
            <p class="eyebrow">ROSTER PROTOCOL // FIELD OPERATIVES</p>
            <h2>ĐẶC VỤ <span>NỔI BẬT.</span></h2>
          </div>
        </div>

        <div class="agent-cards-grid">
          ${
            agents.length === 0
              ? '<p style="color: #64748b; font-family: monospace;">Đang đồng bộ dữ liệu đặc vụ...</p>'
              : agents
                  .map((agent, index) => {
                    const pickRate = this.getRandomPickRate();

                    // 1. TÊN ĐẶC VỤ (Lấy từ codename đã gán trong Repository)
                    const agentName = agent.codename || agent.name || agent.displayName || 'OPERATIVE';

                    // 2. SỐ THỨ TỰ ĐẶC VỤ (Lấy từ agentNumber nếu có, nếu chưa thì fallback index)
                    const rawNumber = agent.agentNumber || agent.agent_number || (index + 1);
                    const formattedNumber = String(rawNumber).padStart(2, '0');

                    // 3. ROLE
                    const roleName = agent.role || 'Tactician';

                    // 4. LINK ẢNH PORTRAIT (Lấy avatarUrl đã gán trong Repository)
                    const agentImg = agent.avatarUrl || agent.avatar_url || '';

                    // 5. MÔ TẢ NGẮN (Lấy bio hoặc description)
                    const agentDesc = agent.bio || agent.description || 'Chuyên gia tác chiến chiến thuật cao cấp.';

                    // 6. KỸ NĂNG (Lấy danh sách name từ mảng abilities đã map)
                    const abilities = agent.abilities || [];

                    return `
                      <div class="agent-tactical-card">
                        <div class="agent-card-meta">
                          <span class="agent-role-title">Agent ${formattedNumber} • ${roleName}</span>
                          <span class="hot-pick-badge">Hot Pick</span>
                        </div>

                        <div class="agent-visual-box">
                          ${
                            agentImg
                              ? `<img src="${agentImg}" alt="${agentName}" loading="lazy" onerror="this.style.display='none'" />`
                              : `<div style="color: #475569; font-family: monospace; font-size: 11px;">NO IMAGE</div>`
                          }
                        </div>

                        <div class="agent-info-row">
                          <h3 class="agent-name">${agentName}</h3>
                          <span class="pick-rate-pill">${pickRate}%</span>
                        </div>

                        <p class="agent-short-desc">${agentDesc}</p>

                        <div class="agent-abilities-wrap">
                          ${
                            abilities.length > 0
                              ? abilities
                                  .slice(0, 3)
                                  .map(
                                    (ab, i) =>
                                      `<span class="ability-pill ${i === 2 ? 'ultimate' : ''}">${
                                        ab.name || 'Chiêu thức'
                                      }</span>`
                                  )
                                  .join('')
                              : `<span class="ability-pill">Combat Ready</span><span class="ability-pill ultimate">Tactical Mastery</span>`
                          }
                        </div>

                        <a href="agents.html" class="btn-view-profile">
                          <span>View Profile</span>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                            <path d="M5 12h14M12 5l7 7-7 7"/>
                          </svg>
                        </a>
                      </div>
                    `;
                  })
                  .join('')
          }
        </div>
      </section>
    `;
  }
}

customElements.define('agent-section', AgentSection);