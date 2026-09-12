export class ArsenalPage extends HTMLElement {
  set data(weapons) {
    this._weapons = weapons || [];
    this.render();
  }

  connectedCallback() {
    this.render();
  }

openWeaponModal(w) {
    const existingModal = document.querySelector('.weapon-specs-modal');
    if (existingModal) existingModal.remove();

    let rawTiers = w.damageTiers ?? w.damage_tiers ?? w.DamageTiers ?? [];
    if (typeof rawTiers === 'string') {
      try {
        rawTiers = JSON.parse(rawTiers);
      } catch {
        rawTiers = [];
      }
    }

    let tiers = [];
    if (Array.isArray(rawTiers) && rawTiers.length > 0) {
      tiers = rawTiers.map(t => ({
        range: t.range || t.Range || t.damageRange || t.damage_range || '0 - 50m',
        head: t.head ?? t.Head ?? t.damageHead ?? t.damage_head ?? 0,
        body: t.body ?? t.Body ?? t.damageBody ?? t.damage_body ?? 0,
        leg: t.leg ?? t.Leg ?? t.damageLeg ?? t.damage_leg ?? 0
      }));
    } else {
      tiers = [{
        range: w.damageRange || w.damage_range || '0 - 50m',
        head: w.damageHead ?? w.damage_head ?? 0,
        body: w.damageBody ?? w.damage_body ?? 0,
        leg: w.damageLeg ?? w.damage_leg ?? 0
      }];
    }

    const cost = w.cost ?? w.creds ?? w.Creds ?? 0;
    const category = w.category || w.Category || 'Rifle';
    const wallPen = w.wallPenetration || w.wall_penetration || w.WallPenetration || 'Medium';
    const killfeedIcon = w.killfeedIcon || w.killfeed_icon || w.KillfeedIcon || '';
    const fireMode = w.fireMode || w.fire_mode || w.FireMode || 'Auto';
    const fireRate = w.fireRate ?? w.fire_rate ?? w.FireRate ?? 0;
    const runSpeed = w.runSpeed || w.run_speed || w.RunSpeed || '5.4 m/sec';
    const equipSpeed = w.equipSpeed || w.equip_speed || w.EquipSpeed || '1.0 sec';
    const reloadSpeed = w.reloadSpeed || w.reload_speed || w.ReloadSpeed || '2.5 sec';
    const magSize = w.magazineSize ?? w.magazine_size ?? w.MagazineSize ?? 25;
    const reserveAmmo = w.reserveAmmo || w.reserve_ammo || w.ReserveAmmo || '50 (2 magazines)';
    const altFunc = w.altFireFunction || w.alt_fire_function || w.AltFireFunction || 'None';
    const altZoom = w.altFireZoom || w.alt_fire_zoom || w.AltFireZoom || 'None';

    const modal = document.createElement('div');
    modal.className = 'weapon-specs-modal';
    modal.innerHTML = `
      <div class="weapon-modal-box">
        <div style="padding: 16px 20px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--line); position: sticky; top: 0; background: #0d1117; z-index: 2;">
          <div>
            <h2 style="margin: 0; font-family: var(--display); font-size: 28px; color: #fff; text-transform: uppercase; letter-spacing: 1px;">${w.name}</h2>
            <span style="color: var(--cyan); font-size: 10px;">${category} // TACTICAL ARSENAL</span>
          </div>
          <button type="button" id="close-modal-btn" style="background: transparent; border: 1px solid var(--line); color: #fff; font-size: 14px; width: 32px; height: 32px; cursor: pointer; transition: all 0.2s;">✕</button>
        </div>

        <div style="background: #080b0f; padding: 24px; text-align: center; border-bottom: 1px solid var(--line);">
          <img src="${w.imageUrl}" alt="${w.name}" style="max-width: 90%; max-height: 120px; object-fit: contain; filter: drop-shadow(0 6px 14px rgba(0,0,0,0.8));" />
        </div>

        <div class="specs-section-header" data-specs-toggle="general" role="button" tabindex="0" aria-expanded="true">
          <span>General</span>
          <span class="specs-section-arrow" aria-hidden="true">▲</span>
        </div>
        <div class="specs-content" data-specs-content="general">
          <table class="specs-table">
            <tr><td class="label-col">Type</td><td class="val-col" style="color: #ff4655; font-weight: bold;">${category}</td></tr>
            <tr><td class="label-col">Credits</td><td class="val-col">¤ ${cost.toLocaleString()}</td></tr>
            <tr><td class="label-col">Wall Penetration</td><td class="val-col">${wallPen}</td></tr>
            ${killfeedIcon ? `<tr><td class="label-col">Killfeed Icon</td><td class="val-col"><img src="${killfeedIcon}" style="height: 18px; filter: brightness(1.6);" /></td></tr>` : ''}
          </table>
        </div>

        <div class="specs-section-header" data-specs-toggle="primary-fire" role="button" tabindex="0" aria-expanded="true">
          <span>Primary Fire</span>
          <span class="specs-section-arrow" aria-hidden="true">▲</span>
        </div>
        <div class="specs-content" data-specs-content="primary-fire">
          <table class="specs-table">
            <tr><td class="label-col">Fire Mode</td><td class="val-col">${fireMode}</td></tr>
            <tr><td class="label-col">Fire Rate</td><td class="val-col">${fireRate} rounds/sec</td></tr>
            <tr><td class="label-col">Run Speed</td><td class="val-col">${runSpeed}</td></tr>
            <tr><td class="label-col">Equip Speeds</td><td class="val-col">${equipSpeed}</td></tr>
            <tr><td class="label-col">Reload Speed</td><td class="val-col">${reloadSpeed}</td></tr>
            <tr><td class="label-col">Magazine</td><td class="val-col">${magSize}</td></tr>
            <tr><td class="label-col">Reserve</td><td class="val-col">${reserveAmmo}</td></tr>
          </table>
        </div>

        <div class="specs-section-header" data-specs-toggle="damage" role="button" tabindex="0" aria-expanded="true">
          <span>Damage</span>
          <span class="specs-section-arrow" aria-hidden="true">▲</span>
        </div>
        <div class="specs-content" data-specs-content="damage">
          <div style="display: grid; grid-template-columns: repeat(${tiers.length}, 1fr); border-bottom: 1px solid rgba(255,255,255,0.06); background: #0c1017;">
            ${tiers.map((tier, idx) => `
              <div style="border-right: ${idx < tiers.length - 1 ? '1px solid rgba(255,255,255,0.08)' : 'none'};">
                <div style="background: rgba(255,255,255,0.04); text-align: center; padding: 10px 0; color: #fff; font-size: 12px; font-weight: 800; border-bottom: 1px solid rgba(255,255,255,0.06); letter-spacing: 0.5px;">
                  ${tier.range}
                </div>
                <div style="padding: 14px 10px; display: flex; flex-direction: column; gap: 8px; text-align: center;">
                  <div style="color: #a1a1aa; font-size: 12px;"><strong style="color: #fff;">Head</strong> - ${tier.head}</div>
                  <div style="color: #a1a1aa; font-size: 12px;"><strong style="color: #fff;">Body</strong> - ${tier.body}</div>
                  <div style="color: #a1a1aa; font-size: 12px;"><strong style="color: #fff;">Leg</strong> - ${tier.leg}</div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <div class="specs-section-header" data-specs-toggle="alt-fire" role="button" tabindex="0" aria-expanded="true">
          <span>Alt Fire</span>
          <span class="specs-section-arrow" aria-hidden="true">▲</span>
        </div>
        <div class="specs-content" data-specs-content="alt-fire">
          <table class="specs-table">
            <tr><td class="label-col">Function</td><td class="val-col">${altFunc}</td></tr>
            <tr><td class="label-col">Zoom</td><td class="val-col">${altZoom}</td></tr>
          </table>
        </div>
      </div>
    `;

    modal.querySelector('#close-modal-btn').onclick = () => modal.remove();
    modal.addEventListener('click', (event) => {
      if (event.target === modal) modal.remove();
      const header = event.target.closest('.specs-section-header');
      if (header) this.toggleSpecsSection(header);
    });
    modal.addEventListener('keydown', (event) => {
      if (!['Enter', ' '].includes(event.key)) return;
      const header = event.target.closest('.specs-section-header');
      if (!header) return;
      event.preventDefault();
      this.toggleSpecsSection(header);
    });

    document.body.appendChild(modal);
  }

  toggleSpecsSection(header) {
    const section = header.dataset.specsToggle;
    const content = header.parentElement.querySelector(`[data-specs-content="${section}"]`);
    const isExpanded = header.getAttribute('aria-expanded') === 'true';
    header.setAttribute('aria-expanded', String(!isExpanded));
    content.hidden = isExpanded;
  }

  render() {
    if (!this._weapons || this._weapons.length === 0) return;

    this.innerHTML = `
      <section class="catalog-page" style="padding-top: 140px;">
        <div class="catalog-hero" style="border-bottom: 1px solid var(--line); margin-bottom: 50px;">
          <p class="eyebrow">ARSENAL PROTOCOL // TACTICAL WEAPONRY</p>
          <h1 style="font-size: clamp(52px, 8vw, 100px); line-height: 0.85; margin-bottom: 24px;">CHỌN VŨ KHÍ CỦA BẠN</h1>
          <p style="color: var(--muted); font-size: 16px; max-width: 600px;">
            Nhẹ, chính xác và có hỏa lực khác nhau cho từng tình huống chiến thuật. Click vào từng vũ khí để xem toàn bộ bảng thông số chi tiết.
          </p>
        </div>

        <div class="arsenal-catalog-grid">
          ${this._weapons.map(w => `
            <div class="weapon-showcase-card" data-id="${w.id}">
              <div class="weapon-card-top">
                <span style="color: var(--cyan); font-family: var(--mono); font-size: 10px; letter-spacing: 1px; text-transform: uppercase;">TYPES // ${w.category}</span>
                <span style="color: var(--volt); font-family: var(--mono); font-weight: 700; font-size: 12px;">¤ ${w.cost.toLocaleString()}</span>
              </div>
              <div class="weapon-img-wrap">
                <img src="${w.imageUrl}" alt="${w.name}" />
              </div>
              <h3 style="color: #fff; font-family: var(--display); font-size: 26px; margin: 0 0 8px 0; text-transform: uppercase;">
                ${w.name}.
              </h3>
              <p style="color: var(--muted); font-size: 13px; line-height: 1.6; margin: 0;">
                Bấm để mở bảng thông số tác chiến chi tiết, độ giật và sát thương từng cự ly.
              </p>
            </div>
          `).join('')}
        </div>
      </section>
    `;

    this.querySelectorAll('.weapon-showcase-card').forEach(card => {
      card.onclick = () => {
        const weaponId = card.dataset.id;
        const weapon = this._weapons.find(x => x.id === weaponId);
        if (weapon) this.openWeaponModal(weapon);
      };
    });
  }
}

customElements.define('arsenal-page', ArsenalPage);