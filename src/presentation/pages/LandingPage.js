class LandingPage extends HTMLElement {
  set data(value) {
    this._data = value;
    if (!this._isInitialized) {
      this.renderStatic();
    }
    this.updateSections();
  }

  connectedCallback() {
    if (!this._isInitialized) {
      this.renderStatic();
    }
    if (this._data) {
      this.updateSections();
    }
  }

  renderStatic() {
    this.innerHTML = `
      <div class="landing-view">
        <hero-section></hero-section>

        <!-- ĐẶC VỤ NỔI BẬT -->
        <agent-section></agent-section>
        <div class="view-cta">
          <p>ROSTER // COMPLETE FIELD INDEX AVAILABLE</p>
          <a class="button button--outline" href="agents.html">XEM TẤT CẢ ĐẶC VỤ <span>→</span></a>
        </div>

        <!-- VŨ KHÍ NỔI BẬT -->
        <weapon-section></weapon-section>
        <div class="view-cta">
          <p>ARMORY // ALL WEAPON SYSTEMS</p>
          <a class="button button--outline" href="arsenal.html">KHÁM PHÁ KHO VŨ KHÍ <span>→</span></a>
        </div>

        <!-- BẢN ĐỒ CHIẾN TRƯỜNG -->
        <map-section></map-section>
        <div class="view-cta">
          <p>THEATRES // GLOBAL MAP INDEX</p>
          <a class="button button--outline" href="maps.html">CHIẾN TRƯỜNG TOÀN CẢNH <span>→</span></a>
        </div>

        <!-- TIN TỨC NỔI BẬT -->
        <section class="section showcase" id="featured-news" style="padding: 60px 0; border-top: 1px solid var(--line, #28344e);">
          <div class="showcase__heading" style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 36px;">
            <div>
              <p class="eyebrow" style="color: var(--cyan, #00f5d4); font-family: var(--font-mono, monospace); font-size: 11px; margin-bottom: 8px;">TRANSMISSIONS // LATEST DISPATCHES</p>
              <h2 style="font-size: 32px; font-weight: 700; margin: 0; text-transform: uppercase;">TIN TỨC <span style="color: var(--cyan, #00f5d4);">NỔI BẬT.</span></h2>
            </div>
            <a class="button button--outline" href="news.html" style="font-size: 11px;">TẤT CẢ BÀI VIẾT <span>→</span></a>
          </div>
          <div id="featured-news-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 24px;"></div>
        </section>
      </div>
    `;
    this._isInitialized = true;
  }

  updateSections() {
    if (!this._data) return;

    const agents = this._data.featuredAgents || this._data.agents || [];
    const weapons = this._data.featuredWeapons || this._data.weapons || [];
    const maps = this._data.featuredMaps || this._data.maps || [];
    const articles = this._data.featuredArticles || this._data.articles || [];

    const agentComp = this.querySelector('agent-section');
    if (agentComp) agentComp.data = agents;

    const weaponComp = this.querySelector('weapon-section');
    if (weaponComp) weaponComp.data = weapons;

    const mapComp = this.querySelector('map-section');
    if (mapComp) mapComp.data = maps;

    const newsGrid = this.querySelector('#featured-news-grid');
    if (newsGrid) {
      newsGrid.innerHTML = articles.length === 0
        ? '<p style="color:#8b978f; font-family:monospace;">Chưa có bài viết nổi bật nào.</p>'
        : articles.map(art => `
            <a href="article-detail.html?id=${encodeURIComponent(art.id)}" style="display: flex; flex-direction: column; background: var(--panel-light, #141721); border: 1px solid var(--line, #28344e); text-decoration: none; color: inherit; transition: transform 0.2s, border-color 0.2s;" onmouseover="this.style.borderColor='var(--cyan)'; this.style.transform='translateY(-4px)'" onmouseout="this.style.borderColor='var(--line)'; this.style.transform='none'">
              <div style="width: 100%; height: 180px; overflow: hidden; position: relative;">
                <img src="${art.mainImageUrl || art.main_image_url || ''}" alt="${art.title}" style="width: 100%; height: 100%; object-fit: cover;" loading="lazy" />
                <span style="position: absolute; top: 10px; left: 10px; background: #ff4655; color: #fff; font-family: monospace; font-size: 10px; font-weight: bold; padding: 3px 8px;">FEATURED</span>
              </div>
              <div style="padding: 20px; display: flex; flex-direction: column; flex: 1;">
                <span style="font-size: 11px; font-family: monospace; color: var(--cyan, #00f5d4); margin-bottom: 8px;">${art.author || 'VALORANT STAFF'}</span>
                <h3 style="font-size: 18px; line-height: 1.4; margin: 0 0 10px 0; font-weight: bold;">${art.title}</h3>
                <p style="font-size: 13px; color: #8b978f; line-height: 1.5; margin: 0 0 16px 0; flex: 1;">${art.subtitle || ''}</p>
                <span style="font-size: 11px; font-family: monospace; color: #fff; font-weight: bold;">ĐỌC BÀI VIẾT ↗</span>
              </div>
            </a>
          `).join('');
    }
  }
}

customElements.define('landing-page', LandingPage);