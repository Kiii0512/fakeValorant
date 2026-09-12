class LandingPage extends HTMLElement {
  set data(value) { this._data = value; this.render(); }
  connectedCallback() { this.render(); }
  render() {
    if (!this.isConnected || !this._data) return;
    this.innerHTML = `<div class="landing-view"><hero-section></hero-section><agent-section></agent-section><div class="view-cta"><p>ROSTER // COMPLETE FIELD INDEX AVAILABLE</p><a class="button button--outline" href="agents.html">XEM TẤT CẢ ĐẶC VỤ <span>→</span></a></div><weapon-section></weapon-section><div class="view-cta"><p>ARMORY // ALL WEAPON SYSTEMS</p><a class="button button--outline" href="arsenal.html">KHÁM PHÁ KHO VŨ KHÍ <span>→</span></a></div><map-section></map-section><div class="view-cta"><p>THEATRES // GLOBAL MAP INDEX</p><a class="button button--outline" href="maps.html">CHIẾN TRƯỜNG TOÀN CẢNH <span>→</span></a></div></div>`;
    this.querySelector('agent-section').data = this._data.agents;
    this.querySelector('weapon-section').data = this._data.weapons;
    this.querySelector('map-section').data = this._data.maps;
  }
}
customElements.define('landing-page', LandingPage);
