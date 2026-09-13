class MapSection extends HTMLElement {
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
        .map-card .tactical-cta-btn {
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
          box-sizing: border-box;
          margin-top: auto;
        }
        .map-card .tactical-cta-btn:hover {
          background: var(--cyan, #00f5d4);
          color: #0a0b10;
          box-shadow: 0 0 16px rgba(0, 245, 212, 0.4);
          transform: translateY(-2px);
        }
        .map-card .tactical-cta-btn span {
          font-size: 14px;
          transition: transform 0.2s ease;
        }
        .map-card .tactical-cta-btn:hover span {
          transform: translateX(4px);
        }
      </style>

      <section class="section maps" id="maps">
        <div class="showcase__heading">
          <div>
            <p class="eyebrow">Theatres // featured index</p>
            <h2>Know the<br><span>ground.</span></h2>
          </div>
          <p class="showcase__intro">Every corner has a cost. Every route tells a story.</p>
        </div>
        <div class="map-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 24px; max-width: 1200px; margin: 0 auto;">
          ${this._data.map((map, index) => {
            let coordsDisplay = "27°28' N 89°38' E";
            if (typeof map.coordinates === 'string' && map.coordinates.trim() !== '') {
              coordsDisplay = map.coordinates;
            } else if (map.coordinates && typeof map.coordinates.latitude === 'number') {
              coordsDisplay = `${map.coordinates.latitude.toFixed(4)} N<br>${Math.abs(map.coordinates.longitude).toFixed(4)} ${map.coordinates.longitude < 0 ? 'W' : 'E'}`;
            }

            const desc = map.description || map.notes || 'Khu vực chiến sự then chốt với các góc giao tranh tầm trung và cận chiến.';

            return `
              <article class="map-card" style="margin: 0; width: 100%; display: flex; flex-direction: column;">
                <div class="map-card__visual">
                  <img src="${map.imageUrl || ''}" alt="${map.name} tactical map" loading="lazy" style="width: 100%; height: 100%; object-fit: cover;">
                  <span class="map-card__index">MAP 0${index + 1}</span>
                  <span class="map-card__coords">${coordsDisplay}</span>
                  ${map.isFeatured ? '<span class="featured-badge"><i></i> ĐÁNG CHÚ Ý // CLASSIFIED</span>' : ''}
                </div>
                <div class="map-card__body">
                  <div>
                    <h3>${map.name}</h3>
                    <p>${map.location || 'N/A'}</p>
                  </div>
                  <span class="map-card__pin">⌖</span>
                </div>
                <p class="map-card__description" style="flex: 1; margin-bottom: 20px; line-height: 1.6;">${desc}</p>
                
                <a class="tactical-cta-btn" href="maps.html#${map.id}">
                  XEM CHI TIẾT <span>→</span>
                </a>
              </article>
            `;
          }).join('')}
        </div>
      </section>
    `;
  }
}

customElements.define('map-section', MapSection);