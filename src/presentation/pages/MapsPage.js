class MapsPage extends HTMLElement {
  set data(value) { this._data = value; this.render(); }
  connectedCallback() { this.render(); }
  render() {
    if (!this.isConnected || !this._data) return;
    this.innerHTML = `<section class="catalog-page maps-page"><div class="catalog-hero"><p class="eyebrow">Theatre database // global coordinates</p><h1>Bản đồ<br><em>tác chiến.</em></h1><p>Đọc địa hình. Ghi nhớ callout. Mọi góc khuất đều là một quyết định.</p></div><div class="map-dossier-grid">${this._data.map((map, index) => `<article class="map-dossier-card"><div class="map-dossier-card__visual"><img src="${map.imageUrl}" alt="${map.name} map overview"><span>MAP 0${index + 1} // LIVE SCAN</span><small>${map.coordinates.latitude} N<br>${Math.abs(map.coordinates.longitude)} ${map.coordinates.longitude < 0 ? 'W' : 'E'}</small></div><div class="map-dossier-card__body"><div><p class="eyebrow">${map.location}</p><h2>${map.name}</h2></div><p>${map.description}</p><div class="map-callouts"><span>MINI-MAP CALLOUTS</span><div>${map.callouts.map((callout) => `<b>${callout}</b>`).join('')}</div></div><span class="dossier-button">MỞ HỒ SƠ BẢN ĐỒ <span>→</span></span></div></article>`).join('')}</div></section>`;
  }
}
customElements.define('maps-page', MapsPage);
