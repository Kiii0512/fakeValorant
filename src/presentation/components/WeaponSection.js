class WeaponSection extends HTMLElement {
  set data(value) { this._data = value; this.render(); }
  connectedCallback() { this.render(); }

  render() {
    if (!this.isConnected || !this._data) return;
    this.innerHTML = `<section class="section showcase" id="arsenal"><div class="showcase__heading"><div><p class="eyebrow">Armory // featured inventory</p><h2>Tools of<br><span>the trade.</span></h2></div><p class="showcase__intro">The right tool does not win the fight. The right decision does.</p></div><div class="weapon-grid">${this._data.map((weapon, index) => `<article class="weapon-card"><div class="weapon-card__meta"><span>0${index + 1} // ${weapon.category}</span><span>AVAILABLE</span></div><div class="weapon-card__silhouette weapon-card__silhouette--${weapon.id}" aria-hidden="true"></div>${weapon.isFeatured ? '<span class="featured-badge featured-badge--card"><i></i> ĐÁNG CHÚ Ý // CLASSIFIED</span>' : ''}<div class="weapon-card__title"><h3>${weapon.name}</h3><strong>${weapon.cost.toLocaleString('en-US')} <small>creds</small></strong></div><div class="weapon-card__stats"><span>MAG <b>${weapon.magazineSize}</b></span><span>FIRE RATE <b>${weapon.fireRate}</b></span></div><div class="damage-table"><span>RANGE</span><strong>HEAD</strong><strong>BODY</strong><strong>LEGS</strong><span>0—30M</span><b>${weapon.damage.head}</b><b>${weapon.damage.body}</b><b>${weapon.damage.legs}</b><span>30—50M</span><b>${Math.round(weapon.damage.head * .85)}</b><b>${Math.round(weapon.damage.body * .85)}</b><b>${Math.round(weapon.damage.legs * .85)}</b></div><a class="dossier-button" href="arsenal.html#${weapon.id}">[ ACCESS DOSSIER ]</a></article>`).join('')}</div></section>`;
  }
}

customElements.define('weapon-section', WeaponSection);
