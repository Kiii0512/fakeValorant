const viperPortrait = 'https://media.valorant-api.com/agents/707eab51-4836-f488-046a-cda6bf494859/fullportrait.png';

class SpecsPage extends HTMLElement {
  connectedCallback() {
    this.initialize();
  }

  initialize() {
    if (!this.hasChildNodes()) this.render();
  }

  render() {
    this.innerHTML = `
      <section class="specs-page">
        <div class="specs-hero">
          <div class="specs-hero__grid"></div>
          <div class="specs-hero__content">
            <p class="eyebrow">NEXUS SUPPORT // SYSTEM REQUIREMENTS</p>
            <h1 style="font-family: var(--display, 'DIN Next LT Pro', sans-serif); font-size: clamp(48px, 7vw, 84px); font-weight: 900; line-height: 1.15; letter-spacing: 0.02em; text-transform: uppercase; margin: 0 0 20px 0;">
              CẤU HÌNH
              <em style="display: block; font-style: normal; color: #ff4655; margin-top: 4px;">NEXUS PROTOCOL.</em>
            </h1>
            <p class="specs-hero__dek">Chuẩn bị hệ thống của bạn cho những pha giao tranh chiến thuật ổn định, chính xác và không độ trễ.</p>
          </div>
          <div class="specs-hero__art" aria-label="Viper agent artwork">
            <div class="specs-hero__diamond"></div>
            <img src="${viperPortrait}" alt="Viper agent portrait" />
            <span class="specs-hero__telemetry">AGENT // VIPER // SYSTEM READY</span>
          </div>
          <div class="specs-hero__status"><i></i> SYSTEM CHECK // READY</div>
        </div>

        <section class="specs-board" aria-labelledby="specs-board-title">
          <div class="specs-board__intro">
            <p class="eyebrow">HARDWARE PROTOCOL // 01</p>
            <h2 id="specs-board-title" style="font-family: var(--display, 'DIN Next LT Pro', sans-serif); font-size: clamp(38px, 5vw, 64px); font-weight: 900; line-height: 1.18; letter-spacing: 0.02em; text-transform: uppercase; margin: 0 0 16px 0;">
              THÔNG SỐ
              <span style="display: block; color: #ff4655; margin-top: 4px;">CỐT LÕI.</span>
            </h2>
            <p>Trải nghiệm chiến đấu được tối ưu cho nhiều cấp độ phần cứng. Kiểm tra các yêu cầu nền tảng trước khi triển khai.</p>
          </div>
          <div class="specs-core-grid">
            <article class="specs-core-card"><span>HỆ ĐIỀU HÀNH</span><strong>Windows 10 64-bit+</strong><small>Windows 11 64-bit được hỗ trợ</small></article>
            <article class="specs-core-card"><span>CPU FEATURE / RAM</span><strong>SSE 4.2 / AVX</strong><small>RAM tối thiểu 4GB</small></article>
            <article class="specs-core-card"><span>VRAM</span><strong>1GB</strong><small>DirectX 11 compatible GPU</small></article>
          </div>

          <div class="specs-performance">
            <div class="specs-performance__heading">
              <div>
                <p class="eyebrow">PERFORMANCE TIERS // 02</p>
                <h2 style="font-family: var(--display, 'DIN Next LT Pro', sans-serif); font-size: clamp(38px, 5vw, 64px); font-weight: 900; line-height: 1.18; letter-spacing: 0.02em; text-transform: uppercase; margin: 0 0 16px 0;">
                  CHỌN MỨC
                  <span style="display: block; color: #ff4655; margin-top: 4px;">HIỆU NĂNG.</span>
                </h2>
              </div>
              <p>Ba profile phần cứng cho một tín hiệu chiến đấu ổn định.</p>
            </div>
            <div class="specs-table-wrap">
              <table class="specs-table-grid">
                <thead><tr><th>LINH KIỆN</th><th>CẤU HÌNH TỐI THIỂU <b>30 FPS</b></th><th>CẤU HÌNH KHUYẾN NGHỊ <b>60 FPS</b></th><th>CẤU HÌNH CAO <b>144+ FPS</b></th></tr></thead>
                <tbody>
                  <tr><th>CPU</th><td>Intel Core 2 Duo E8400</td><td>Intel i3-4150</td><td>Intel Core i5-9400F<br><small>AMD Ryzen 5 2600X</small></td></tr>
                  <tr><th>GPU</th><td>Intel HD 4000</td><td>GeForce GT 730</td><td>GeForce GTX 1050 Ti<br><small>AMD Radeon R7 370</small></td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </section>`;
  }
}

customElements.define('specs-page', SpecsPage);