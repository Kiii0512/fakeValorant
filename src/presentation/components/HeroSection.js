class HeroSection extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <section class="hero" id="top">
        <div class="hero__grid" aria-hidden="true"></div>
        <div class="hero__content">
          <p class="eyebrow">Nexus Protocol <span>// tactical intelligence bureau</span></p>
          <h1>Own the<br><em>moment.</em></h1>
          <p class="hero__dek">Năm người. Một mục tiêu. Không có chỗ cho sai lầm. Đọc bản đồ, chọn đặc vụ và tạo ra lợi thế trước khi round bắt đầu.</p>
          <div class="hero__actions"><a class="button button--cyan" href="agents.html">Scan the roster <span>↗</span></a><a class="text-link" href="#directives">Read the directives <span>↓</span></a></div>
        </div>
        <p class="hero__telemetry hero__telemetry--top">SYS.// 05:05:25 // SECTOR 07</p>
        <p class="hero__telemetry hero__telemetry--side">NEXUS // LIVE COMBAT TELEMETRY</p>
        <p class="hero__status"><span class="status-dot"></span> All systems nominal <span class="hero__status-rule"></span> Build 2.6.04</p>
      </section>`;
  }
}

customElements.define('hero-section', HeroSection);
