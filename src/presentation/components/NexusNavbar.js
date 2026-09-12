class NexusNavbar extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <header class="site-nav">
        <a class="site-nav__brand nexus-logo" href="index.html" aria-label="Nexus Protocol home">
          <svg class="nexus-logo__mark" viewBox="0 0 36 36" aria-hidden="true"><path class="nexus-logo__outline" d="M5 5h26v26H5z"/><path class="nexus-logo__slash" d="M9 25 25 9h6L15 25z"/><path class="nexus-logo__cut" d="M5 19 19 5h5L10 19z"/></svg>
          <span class="nexus-logo__wordmark"><strong>NEXUS</strong><span> / PROTOCOL</span></span>
        </a>
        <nav class="site-nav__links" aria-label="Primary navigation">
          <details class="nav-dropdown"><summary>THÔNG TIN TRÒ CHƠI <span>⌄</span></summary><div class="nav-dropdown__menu"><a href="agents.html">ĐẶC VỤ</a><a href="arsenal.html">KHO VŨ KHÍ</a><a href="maps.html">BẢN ĐỒ</a></div></details>
          <a href="news.html">TIN TỨC</a><a href="index.html">TRANG CHỦ</a>
        </nav>
        <a class="button button--volt site-nav__cta" href="agents.html">CHƠI NGAY <span>↗</span></a>
      </header>`;
  }
}

customElements.define('nexus-navbar', NexusNavbar);
