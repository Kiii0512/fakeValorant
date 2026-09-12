export class MapsCatalogView extends HTMLElement {
  set data(maps) {
    this._maps = maps || [];
    this.render();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    if (!this._maps || this._maps.length === 0) return;

    this.innerHTML = `
      <section class="catalog-page" style="padding-top: 140px;">
        <div class="catalog-hero" style="border-bottom: 1px solid var(--line); margin-bottom: 60px;">
          <p class="eyebrow">THEATRE DATABASE // GLOBAL COORDINATES</p>
          <h1 style="font-size: clamp(60px, 9vw, 110px); line-height: 0.85; margin-bottom: 24px;">BẢN ĐỒ</h1>
          <p style="color: var(--muted); font-size: 16px; max-width: 580px;">
            Mỗi bản đồ là một đấu trường riêng biệt để phô diễn chiến thuật. Được thiết kế tối ưu cho các pha giao tranh đồng đội.
          </p>
        </div>

        <div class="maps-vertical-list" style="display: flex; flex-direction: column; gap: 110px;">
          ${this._maps.map((map, index) => {
            const gallery = (map.gallery && map.gallery.length > 0) ? map.gallery : (map.imageUrl ? [map.imageUrl] : []);
            const defaultImg = gallery[0] || '';

            return `
              <article class="map-showcase-block" data-map-id="${map.id}">
                <div style="margin-bottom: 28px; max-width: 900px;">
                  <div style="display: flex; align-items: center; gap: 16px; margin-bottom: 10px;">
                    <span style="color: var(--cyan); font-family: var(--mono); font-size: 11px; letter-spacing: .14em; text-transform: uppercase;">
                      THEATRE // 0${index + 1} ${map.location ? `• ${map.location}` : ''}
                    </span>
                    ${map.isFeatured ? '<span class="featured-badge" style="position: static;"><i></i> ACTIVE ROTATION</span>' : ''}
                  </div>
                  <h2 style="color: var(--ink); font-family: var(--display); font-size: clamp(48px, 6vw, 76px); font-weight: 800; letter-spacing: -.03em; line-height: .9; margin: 0 0 16px 0; text-transform: uppercase;">
                    ${map.name}
                  </h2>
                  <p style="color: var(--muted); font-size: 15px; line-height: 1.7; margin: 0;">
                    ${map.description || 'Chưa có thông tin giới thiệu cho bản đồ này.'}
                  </p>
                </div>

                <div class="map-viewport" style="width: 100%; aspect-ratio: 16 / 9; background: #05070b; border: 1px solid var(--line); overflow: hidden; position: relative; box-shadow: 0 16px 40px rgba(0,0,0,0.6);">
                  <img id="large-img-${map.id}" src="${defaultImg}" alt="${map.name}" style="width: 100%; height: 100%; object-fit: cover; transition: opacity 0.25s ease;" />
                  <div style="position: absolute; bottom: 16px; left: 20px; color: var(--cyan); font-family: var(--mono); font-size: 10px; letter-spacing: .12em; background: rgba(10,11,16,0.85); padding: 5px 12px; border: 1px solid var(--line);">
                    TACTICAL SCAN // SECTOR ZOOM
                  </div>
                </div>

                <div class="map-thumbnails-row" id="thumb-row-${map.id}" style="display: flex; gap: 14px; overflow-x: auto; padding: 18px 0 8px 0; scroll-behavior: smooth;">
                  ${gallery.map((imgUrl, imgIdx) => `
                    <button type="button" class="map-thumb-btn ${imgIdx === 0 ? 'active' : ''}" 
                            data-map="${map.id}" 
                            data-index="${imgIdx}"
                            data-src="${imgUrl}"
                            style="flex-shrink: 0; width: 154px; aspect-ratio: 16 / 9; padding: 0; background: var(--panel); border: 1px solid ${imgIdx === 0 ? 'var(--cyan)' : 'var(--line)'}; cursor: pointer; border-radius: 2px; overflow: hidden; opacity: ${imgIdx === 0 ? '1' : '0.5'}; transition: all 0.2s ease;">
                      <img src="${imgUrl}" alt="Thumbnail ${imgIdx + 1}" style="width: 100%; height: 100%; object-fit: cover; display: block;" />
                    </button>
                  `).join('')}
                </div>

                <div class="map-nav-tracker">
                  <div class="map-nav-numbers" id="numbers-${map.id}">
                    ${gallery.map((_, i) => `<span class="${i === 0 ? 'active' : ''}" data-index="${i}">${i + 1}</span>`).join('')}
                  </div>
                  <div class="map-nav-line">
                    <div class="map-nav-indicator" id="indicator-${map.id}" style="width: ${100 / gallery.length}%;"></div>
                  </div>
                  <button type="button" class="map-nav-arrow" data-map="${map.id}" title="Ảnh tiếp theo">→</button>
                </div>
              </article>
            `;
          }).join('')}
        </div>
      </section>
    `;

    this.querySelectorAll('.map-showcase-block').forEach(block => {
      const mapId = block.dataset.mapId;
      const thumbnails = block.querySelectorAll('.map-thumb-btn');
      const total = thumbnails.length;
      if (total === 0) return;

      const largeImg = block.querySelector(`#large-img-${mapId}`);
      const thumbRow = block.querySelector(`#thumb-row-${mapId}`);
      const indicator = block.querySelector(`#indicator-${mapId}`);
      const numberSpans = block.querySelectorAll(`#numbers-${mapId} span`);
      const nextBtn = block.querySelector('.map-nav-arrow');

      let currentIndex = 0;

      const activateSlide = (index) => {
        currentIndex = (index + total) % total;
        const targetBtn = thumbnails[currentIndex];
        const targetSrc = targetBtn.dataset.src;

        if (largeImg && largeImg.src !== targetSrc) {
          largeImg.style.opacity = '0.3';
          largeImg.src = targetSrc;
          largeImg.onload = () => largeImg.style.opacity = '1';
        }

        thumbnails.forEach(b => {
          b.style.borderColor = 'var(--line)';
          b.style.opacity = '0.5';
          b.classList.remove('active');
        });
        targetBtn.style.borderColor = 'var(--cyan)';
        targetBtn.style.opacity = '1';
        targetBtn.classList.add('active');

        targetBtn.scrollIntoView({ behavior: 'smooth', inline: 'nearest', block: 'nearest' });

        numberSpans.forEach((num, idx) => {
          num.classList.toggle('active', idx === currentIndex);
        });
        if (indicator) {
          indicator.style.transform = `translateX(${currentIndex * 100}%)`;
        }
      };

      thumbnails.forEach(btn => {
        btn.onclick = () => activateSlide(parseInt(btn.dataset.index, 10));
      });

      numberSpans.forEach(num => {
        num.onclick = () => activateSlide(parseInt(num.dataset.index, 10));
      });

      if (nextBtn) {
        nextBtn.onclick = () => activateSlide(currentIndex + 1);
      }
    });
  }
}

customElements.define('maps-catalog-view', MapsCatalogView);