class MapSection extends HTMLElement {
  set data(value) { this._data = value; this.render(); }
  connectedCallback() { this.render(); }

  render() {
    if (!this.isConnected || !this._data) return;
    this.innerHTML = `<section class="section maps" id="maps"><div class="showcase__heading"><div><p class="eyebrow">Theatres // featured index</p><h2>Know the<br><span>ground.</span></h2></div><p class="showcase__intro">Every corner has a cost. Every route tells a story.</p></div><div class="map-grid">${this._data.map((map, index) => `<article class="map-card"><div class="map-card__visual"><img src="${map.imageUrl}" alt="${map.name} tactical map" loading="lazy"><span class="map-card__index">MAP 0${index + 1}</span><span class="map-card__coords">${map.coordinates.latitude.toFixed(4)} N<br>${Math.abs(map.coordinates.longitude).toFixed(4)} ${map.coordinates.longitude < 0 ? 'W' : 'E'}</span>${map.isFeatured ? '<span class="featured-badge"><i></i> ĐÁNG CHÚ Ý // CLASSIFIED</span>' : ''}</div><div class="map-card__body"><div><h3>${map.name}</h3><p>${map.location}</p></div><span class="map-card__pin">⌖</span></div><p class="map-card__description">${map.description}</p><div class="map-card__features">${map.tacticalFeatures.map((feature) => `<span>${feature}</span>`).join('')}</div><a class="dossier-button" href="maps.html#${map.id}">XEM CHI TIẾT <span>→</span></a></article>`).join('')}</div></section>`;
  }
}

customElements.define('map-section', MapSection);
