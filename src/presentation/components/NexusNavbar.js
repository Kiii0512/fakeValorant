class NexusNavbar extends HTMLElement {
  connectedCallback() {
    this.render();
    this.bindHoverDropdowns();
  }

  render() {
    const supportSubject = encodeURIComponent('Yêu cầu hỗ trợ người chơi');
    const supportMailto = `mailto:hn33860@gmail.com?subject=${supportSubject}`;

    this.innerHTML = `
      <style>
        nexus-navbar {
          display: block;
          position: absolute;
          top: 24px;
          left: 0;
          right: 0;
          z-index: 100;
          padding: 0 24px;
          box-sizing: border-box;
        }

        /* KHUNG CAPSULE CHUẨN */
        nexus-navbar .site-nav {
          max-width: 1600px;
          width: 100%;
          height: 68px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 44px;
          box-sizing: border-box;
          background: rgba(12, 17, 28, 0.82);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 9999px;
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.45);
        }

        /* LOGO & BRAND */
        nexus-navbar .site-nav__brand {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          text-decoration: none;
          color: #fff;
          flex-shrink: 0;
          white-space: nowrap;
        }

        nexus-navbar .brand-icon {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background: rgba(0, 240, 255, 0.1);
          border: 1px solid rgba(0, 240, 255, 0.28);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--cyan, #00f0ff);
          flex-shrink: 0;
        }

        nexus-navbar .brand-icon svg {
          width: 18px !important;
          height: 18px !important;
          max-width: 18px !important;
          max-height: 18px !important;
          display: block;
        }

        nexus-navbar .brand-text {
          font-family: 'Be Vietnam Pro', sans-serif;
          font-size: 16px;
          font-weight: 700;
          letter-spacing: -0.01em;
          color: #fff;
          white-space: nowrap;
        }

        nexus-navbar .brand-text span {
          color: #64748b;
          font-weight: 400;
          font-size: 14px;
        }

        nexus-navbar .version-pill {
          font-family: var(--font-mono, monospace);
          font-size: 11px;
          padding: 3px 10px;
          border-radius: 9999px;
          background: rgba(0, 240, 255, 0.08);
          border: 1px solid rgba(0, 240, 255, 0.22);
          color: var(--cyan, #00f0ff);
          white-space: nowrap;
        }

        /* MENU Ở GIỮA */
        nexus-navbar .site-nav__links {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          flex: 1;
        }

        nexus-navbar .site-nav__links > a,
        nexus-navbar .nav-dropdown summary {
          padding: 8px 18px;
          font-size: 14px;
          font-family: 'Be Vietnam Pro', sans-serif;
          font-weight: 500;
          color: #94a3b8;
          text-decoration: none;
          border-radius: 9999px;
          transition: all 0.2s ease;
          display: inline-flex;
          align-items: center;
          gap: 7px;
          white-space: nowrap;
          flex-shrink: 0;
          line-height: 1.2;
        }

        nexus-navbar .site-nav__links > a:hover,
        nexus-navbar .nav-dropdown summary:hover,
        nexus-navbar .nav-dropdown[open] summary {
          color: #fff;
          background: rgba(255, 255, 255, 0.08);
        }

        nexus-navbar .site-nav__links > a.active {
          background: rgba(255, 255, 255, 0.14);
          color: #fff;
          font-weight: 600;
        }

        /* FIX TRIỆT ĐỂ LỖI MŨI TÊN SVG KHỔNG LỒ */
        nexus-navbar .nav-dropdown {
          position: relative;
          display: inline-flex;
          align-items: center;
        }

        nexus-navbar .nav-dropdown summary {
          list-style: none;
          cursor: pointer;
          user-select: none;
        }

        nexus-navbar .nav-dropdown summary::-webkit-details-marker {
          display: none;
        }

        nexus-navbar .nav-dropdown summary svg.nav-caret {
          width: 8px !important;
          height: 5px !important;
          min-width: 8px !important;
          max-width: 8px !important;
          min-height: 5px !important;
          max-height: 5px !important;
          display: inline-block !important;
          flex-shrink: 0 !important;
          transition: transform 0.2s ease;
          color: #64748b;
        }

        nexus-navbar .nav-dropdown[open] summary svg.nav-caret {
          transform: rotate(180deg);
        }

        nexus-navbar .nav-dropdown[open] .nav-dropdown__menu {
          display: flex;
          flex-direction: column;
          position: absolute;
          top: calc(100% + 14px);
          left: 0;
          background: rgba(13, 19, 32, 0.96);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 14px;
          min-width: 190px;
          padding: 8px;
          box-shadow: 0 16px 36px rgba(0, 0, 0, 0.5);
          z-index: 1000;
        }

        nexus-navbar .nav-dropdown__menu a {
          padding: 10px 14px;
          color: #cbd5e1;
          font-size: 13px;
          font-family: 'Be Vietnam Pro', sans-serif;
          text-decoration: none;
          border-radius: 8px;
          white-space: nowrap;
          transition: all 0.15s ease;
        }

        nexus-navbar .nav-dropdown__menu a:hover {
          background: rgba(0, 240, 255, 0.12);
          color: var(--cyan, #00f0ff);
        }

        /* NÚT CTA BÊN PHẢI */
        nexus-navbar .site-nav__cta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          height: 42px;
          padding: 0 22px;
          border-radius: 9999px;
          font-family: 'Be Vietnam Pro', sans-serif;
          font-size: 14px;
          font-weight: 600;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.18);
          color: #fff;
          text-decoration: none;
          white-space: nowrap;
          flex-shrink: 0;
          transition: all 0.2s ease;
        }

        nexus-navbar .site-nav__cta svg {
          width: 12px !important;
          height: 12px !important;
          max-width: 12px !important;
          max-height: 12px !important;
          display: inline-block;
          flex-shrink: 0;
        }

        nexus-navbar .site-nav__cta:hover {
          background: #fff;
          color: #0b0f17;
          box-shadow: 0 0 24px rgba(255, 255, 255, 0.4);
        }

        /* RESPONSIVE */
        @media (max-width: 1200px) {
          nexus-navbar .site-nav {
            padding: 0 24px;
            height: 62px;
          }
          nexus-navbar .site-nav__links {
            gap: 6px;
          }
          nexus-navbar .site-nav__links > a,
          nexus-navbar .nav-dropdown summary {
            padding: 7px 12px;
            font-size: 13px;
          }
        }

        @media (max-width: 860px) {
          nexus-navbar {
            top: 14px;
            padding: 0 12px;
          }
          nexus-navbar .site-nav {
            height: 54px;
            padding: 0 16px;
          }
          nexus-navbar .site-nav__links,
          nexus-navbar .version-pill {
            display: none;
          }
          nexus-navbar .site-nav__cta {
            height: 36px;
            padding: 0 16px;
            font-size: 12px;
          }
        }
      </style>

      <header class="site-nav">
        <a class="site-nav__brand" href="index.html">
          <div class="brand-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polygon points="12 2 2 7 12 12 22 7 12 2"/>
              <polyline points="2 17 12 22 22 17"/>
              <polyline points="2 12 12 17 22 12"/>
            </svg>
          </div>
          <div class="brand-text">Nexus <span>/ protocol</span></div>
          <span class="version-pill">v8.11</span>
        </a>

        <nav class="site-nav__links">
          <a href="index.html" class="active">Trang Chủ</a>
          <details class="nav-dropdown">
            <summary>
              <span>Thông Tin Trò Chơi</span>
              <svg class="nav-caret" width="8" height="5" viewBox="0 0 8 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1L4 4L7 1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </summary>
            <div class="nav-dropdown__menu">
              <a href="agents.html">Đặc Vụ</a>
              <a href="arsenal.html">Kho Vũ Khí</a>
              <a href="maps.html">Bản Đồ</a>
            </div>
          </details>
          <a href="news.html">Tin Tức</a>
          <details class="nav-dropdown">
            <summary>
              <span>Hỗ Trợ</span>
              <svg class="nav-caret" width="8" height="5" viewBox="0 0 8 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1L4 4L7 1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </summary>
            <div class="nav-dropdown__menu">
              <a href="${supportMailto}">Gửi Yêu Cầu</a>
              <a href="specs.html">Cấu Hình Máy</a>
            </div>
          </details>
        </nav>

        <a class="site-nav__cta" href="agents.html">
          <span>Bắt đầu ngay</span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </a>
      </header>
    `;
  }

  bindHoverDropdowns() {
    this.querySelectorAll('.nav-dropdown').forEach((dropdown) => {
      let timeout = null;
      dropdown.addEventListener('mouseenter', () => {
        if (timeout) clearTimeout(timeout);
        dropdown.setAttribute('open', '');
      });
      dropdown.addEventListener('mouseleave', () => {
        timeout = setTimeout(() => dropdown.removeAttribute('open'), 120);
      });
    });
  }
}

customElements.define('nexus-navbar', NexusNavbar);