class WeaponSection extends HTMLElement {
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
        .weapon-card__img-box {
          position: relative;
          height: 120px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 16px 0;
          background: rgba(15, 25, 35, 0.4);
          border: 1px solid rgba(255, 255, 255, 0.04);
          overflow: hidden;
        }
        .weapon-card__img-box img {
          max-width: 90%;
          max-height: 90px;
          object-fit: contain;
          filter: drop-shadow(0 6px 12px rgba(0, 0, 0, 0.6));
        }
        .weapon-card .damage-table-fixed {
          display: grid;
          grid-template-columns: 1.6fr 1fr 1fr 1fr;
          row-gap: 6px;
          column-gap: 8px;
          font-family: var(--font-mono, monospace);
          font-size: 11px;
          margin: 18px 0;
          padding-top: 14px;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          padding-bottom: 14px;
        }
        .weapon-card .damage-table-fixed .col-title {
          color: #6d7986;
          font-size: 10px;
          font-weight: 600;
          text-transform: uppercase;
          text-align: right;
        }
        .weapon-card .damage-table-fixed .col-title:first-child,
        .weapon-card .damage-table-fixed .col-range {
          text-align: left;
        }
        .weapon-card .damage-table-fixed .col-val {
          color: #e8edf2;
          text-align: right;
        }
        .weapon-card .damage-table-fixed .col-range {
          color: var(--cyan, #00f0ff);
        }
      </style>

      <section class="section showcase" id="arsenal">
        <div class="showcase__heading">
          <div>
            <p class="eyebrow">Armory // featured inventory</p>
            <h2>Tools of<br><span>the trade.</span></h2>
          </div>
          <p class="showcase__intro">The right tool does not win the fight. The right decision does.</p>
        </div>

        <div class="weapon-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 24px; max-width: 1200px; margin: 0 auto;">
          ${this._data.map((weapon, index) => {
            // Lấy danh sách cự ly thực tế từ Database
            let tiers = Array.isArray(weapon.damageTiers) && weapon.damageTiers.length > 0
              ? weapon.damageTiers
              : (Array.isArray(weapon.damage_tiers) && weapon.damage_tiers.length > 0 ? weapon.damage_tiers : []);

            // Fallback an toàn nếu vũ khí chưa được cấu hình mảng tiers
            if (tiers.length === 0) {
              tiers = [{
                range: '0 - 50m',
                head: weapon.damageHead ?? weapon.damage?.head ?? 156,
                body: weapon.damageBody ?? weapon.damage?.body ?? 39,
                leg: weapon.damageLeg ?? weapon.damage?.legs ?? 33
              }];
            }

            const costVal = weapon.cost ?? weapon.creds ?? 2900;
            const magVal = weapon.magazineSize ?? weapon.magazine_size ?? 30;
            const fireRateVal = weapon.fireRate ?? weapon.fire_rate ?? 11;

            return `
              <article class="weapon-card" style="margin: 0; width: 100%;">
                <div class="weapon-card__meta">
                  <span>0${index + 1} // ${weapon.category || 'RIFLES'}</span>
                  <span>AVAILABLE</span>
                </div>

                <div class="weapon-card__img-box">
                  ${weapon.imageUrl ? `<img src="${weapon.imageUrl}" alt="${weapon.name}">` : ''}
                </div>

                ${weapon.isFeatured ? '<span class="featured-badge featured-badge--card"><i></i> ĐÁNG CHÚ Ý // CLASSIFIED</span>' : ''}

                <div class="weapon-card__title">
                  <h3>${weapon.name}</h3>
                  <strong>${costVal.toLocaleString('en-US')} <small>creds</small></strong>
                </div>

                <div class="weapon-card__stats">
                  <span>MAG <b>${magVal}</b></span>
                  <span>FIRE RATE <b>${fireRateVal}</b></span>
                </div>

                <div class="damage-table-fixed">
                  <span class="col-title" style="text-align: left;">RANGE</span>
                  <span class="col-title">HEAD</span>
                  <span class="col-title">BODY</span>
                  <span class="col-title">LEGS</span>

                  ${tiers.map(t => `
                    <span class="col-range">${t.range || t.Range || '0 - 50m'}</span>
                    <span class="col-val">${t.head ?? t.Head ?? 0}</span>
                    <span class="col-val">${t.body ?? t.Body ?? 0}</span>
                    <span class="col-val">${t.leg ?? t.Leg ?? 0}</span>
                  `).join('')}
                </div>

                <a class="tactical-cta-btn" href="arsenal.html#${weapon.id}" style="margin-top: 16px;">
                  TRUY CẬP HỒ SƠ <span>→</span>
                </a>
              </article>
            `;
          }).join('')}
        </div>
      </section>
    `;
  }
}

customElements.define('weapon-section', WeaponSection);