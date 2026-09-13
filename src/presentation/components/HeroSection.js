class HeroSection extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  setVideoUrl(url) {
    const video = this.querySelector('.hero__bg-video');
    if (video && url && video.getAttribute('src') !== url) {
      video.src = url;
      video.load();
      video.play().catch(() => {});
    }
  }

  render() {
    // Giữ nguyên 100% cấu trúc class gốc để nhận đúng CSS và Font chữ từ hệ thống
    this.innerHTML = `
      <section class="hero" id="top" style="position: relative; overflow: hidden;">
        <video class="hero__bg-video" autoplay loop muted playsinline style="position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; z-index: 0; opacity: 0.35; pointer-events: none;"></video>
        <div class="hero__grid" aria-hidden="true" style="position: relative; z-index: 1;"></div>
        <div class="hero__content" style="position: relative; z-index: 2;">
          <p class="eyebrow">Nexus Protocol <span>// tactical intelligence bureau</span></p>
          <h1>Own the<br><em>moment.</em></h1>
          <p class="hero__dek">Năm người. Một mục tiêu. Không có chỗ cho sai lầm. Đọc bản đồ, chọn đặc vụ và tạo ra lợi thế trước khi round bắt đầu.</p>
          <div class="hero__actions">
            <a class="button button--cyan" href="agents.html">Scan the roster <span>↗</span></a>
            <a class="text-link" href="guide.html">Read the directives <span>↗</span></a>
          </div>
        </div>
        <p class="hero__telemetry hero__telemetry--top" style="z-index: 2;">SYS.// 05:05:25 // SECTOR 07</p>
        <p class="hero__telemetry hero__telemetry--side" style="z-index: 2;">NEXUS // LIVE COMBAT TELEMETRY</p>
        <p class="hero__status" style="z-index: 2;"><span class="status-dot"></span> All systems nominal <span class="hero__status-rule"></span> Build 2.6.04</p>
      </section>`;

    const video = this.querySelector('.hero__bg-video');
    if (video) {
      video.onended = () => {
        video.currentTime = 0;
        video.play().catch(() => {});
      };
    }
  }
}

customElements.define('hero-section', HeroSection);