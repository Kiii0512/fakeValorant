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

  setAgentCount(count) {
    const counterEl = this.querySelector('#hero-agent-count');
    if (counterEl && count) {
      counterEl.textContent = `${count} Đặc Vụ`;
    }
  }

  render() {
    this.innerHTML = `
      <style>
        .hero {
          position: relative;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          padding: 130px 24px 60px;
          background: #080b11;
          box-sizing: border-box;
        }

        .hero__bg-video {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: 0;
          opacity: 0.35;
          pointer-events: none;
          filter: contrast(1.08) saturate(0.95);
        }

        .hero__overlay {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 50% 35%, rgba(13, 20, 36, 0.45) 0%, rgba(8, 11, 17, 0.96) 85%);
          z-index: 1;
          pointer-events: none;
        }

        .hero__grid {
          position: absolute;
          inset: 0;
          background-image: linear-gradient(rgba(0, 240, 255, 0.035) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(0, 240, 255, 0.035) 1px, transparent 1px);
          background-size: 64px 64px;
          mask-image: radial-gradient(ellipse at center, rgba(0, 0, 0, 0.8) 0%, transparent 80%);
          -webkit-mask-image: radial-gradient(ellipse at center, rgba(0, 0, 0, 0.8) 0%, transparent 80%);
          pointer-events: none;
          z-index: 2;
        }

        .hero__content {
          position: relative;
          z-index: 10;
          max-width: 860px;
          width: 100%;
          margin: 0 auto;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .hero__badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 18px;
          border-radius: 9999px;
          background: rgba(15, 23, 42, 0.65);
          border: 1px solid rgba(255, 255, 255, 0.09);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          font-family: var(--mono, monospace);
          font-size: 11px;
          letter-spacing: 0.05em;
          color: #e2e8f0;
          margin-bottom: 28px;
        }

        .hero__badge .dot-live {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #00f0ff;
          box-shadow: 0 0 8px #00f0ff;
        }

        .hero__badge .sep {
          color: #475569;
        }

        .hero__badge .text-sub {
          color: #94a3b8;
        }

        .hero h1 {
          font-family: 'Be Vietnam Pro', sans-serif !important;
          font-size: clamp(38px, 6vw, 68px) !important;
          font-weight: 500 !important;
          line-height: 1.15 !important;
          letter-spacing: -0.025em !important;
          text-transform: none !important;
          color: #ffffff;
          margin: 0 0 20px;
        }

        .hero h1 .highlight {
          font-weight: 600;
          color: #dbeafe;
        }

        .hero__dek {
          max-width: 680px;
          font-family: 'Be Vietnam Pro', sans-serif;
          font-size: 15px;
          line-height: 1.65;
          color: #94a3b8;
          margin: 0 0 36px;
          text-align: center;
        }

        .hero__actions {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          margin-top: 0;
          margin-bottom: 64px;
          flex-wrap: wrap;
        }

        .btn-primary-glow {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 12px 28px;
          border-radius: 9999px;
          background: #c7f0ff;
          color: #04131f;
          font-family: 'Be Vietnam Pro', sans-serif;
          font-size: 14px;
          font-weight: 600;
          text-decoration: none;
          box-shadow: 0 0 24px rgba(199, 240, 255, 0.35);
          transition: all 0.2s ease;
        }

        .btn-primary-glow:hover {
          transform: translateY(-2px);
          box-shadow: 0 0 32px rgba(199, 240, 255, 0.6);
        }

        .btn-glass {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 12px 24px;
          border-radius: 9999px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.12);
          color: #e2e8f0;
          font-family: 'Be Vietnam Pro', sans-serif;
          font-size: 14px;
          font-weight: 500;
          text-decoration: none;
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          transition: all 0.2s ease;
        }

        .btn-glass:hover {
          background: rgba(255, 255, 255, 0.1);
          color: #fff;
        }

        .btn-text-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 12px 16px;
          color: #94a3b8;
          font-family: 'Be Vietnam Pro', sans-serif;
          font-size: 14px;
          font-weight: 500;
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .btn-text-link:hover {
          color: #fff;
        }

        .hero__telemetry-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 32px;
          width: 100%;
          max-width: 900px;
          border-top: 1px solid rgba(255, 255, 255, 0.07);
          padding-top: 32px;
        }

        .hero__telemetry-item {
          display: flex;
          flex-direction: column;
          gap: 6px;
          text-align: center;
        }

        .hero__telemetry-item .t-label {
          font-family: var(--mono, monospace);
          font-size: 10px;
          letter-spacing: 0.08em;
          color: #64748b;
          text-transform: uppercase;
        }

        .hero__telemetry-item .t-val {
          font-family: 'Be Vietnam Pro', sans-serif;
          font-size: 14px;
          font-weight: 600;
          color: #e2e8f0;
        }

        .hero__telemetry-item .highlight-cyan {
          color: #00f0ff;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
        }

        .dot-inline {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #00f0ff;
        }

        @media (max-width: 768px) {
          .hero {
            padding: 110px 16px 50px;
          }
          .hero__telemetry-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
          }
        }
      </style>

      <section class="hero" id="top">
        <video class="hero__bg-video" autoplay loop muted playsinline></video>
        <div class="hero__overlay"></div>
        <div class="hero__grid" aria-hidden="true"></div>

        <div class="hero__content">
          <div class="hero__badge">
            <span class="dot-live"></span>
            <span>HỆ THỐNG DỮ LIỆU TÁC CHIẾN</span>
            <span class="sep">•</span>
            <span class="text-sub">v8.11 Live Ingestion</span>
          </div>

          <h1>
            Giao thức chiến thuật<br />
            <span class="highlight">đã được hoàn thiện.</span>
          </h1>

          <p class="hero__dek">
            Hạ tầng dữ liệu chuẩn xác cao dành cho các chiến thuật gia cạnh tranh. Theo dõi từng biến động vũ khí,
            đường cong hiệu quả của đặc vụ và dữ liệu phân hạng thời gian thực.
          </p>

          <div class="hero__actions">
            <a class="btn-primary-glow" href="agents.html">
              <span>Khám Phá Đặc Vụ</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>

            <a class="btn-glass" href="guide.html">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
              <span>Hướng Dẫn Tân Thủ</span>
            </a>

            <a class="btn-text-link" href="news.html">
              <span>Bản Tin Cập Nhật</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M7 17L17 7M17 7H7M17 7V17"/></svg>
            </a>
          </div>

          <div class="hero__telemetry-grid">
            <div class="hero__telemetry-item">
              <span class="t-label">ĐẶC VỤ KHẢ DỤNG</span>
              <strong class="t-val" id="hero-agent-count">25 Đặc Vụ</strong>
            </div>
            <div class="hero__telemetry-item">
              <span class="t-label">DỮ LIỆU ĐỒNG BỘ</span>
              <strong class="t-val highlight-cyan"><span class="dot-inline"></span> Thời gian thực</strong>
            </div>
            <div class="hero__telemetry-item">
              <span class="t-label">ĐỘ CHÍNH XÁC KHO VŨ KHÍ</span>
              <strong class="t-val">99.4% Xác Thực</strong>
            </div>
            <div class="hero__telemetry-item">
              <span class="t-label">PHÂN HẠNG MỤC TIÊU</span>
              <strong class="t-val">Immortal+ Toàn Cầu</strong>
            </div>
          </div>
        </div>
      </section>
    `;

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