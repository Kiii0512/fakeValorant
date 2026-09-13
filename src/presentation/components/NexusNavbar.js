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
        nexus-navbar .site-nav__links {
          display: flex;
          align-items: center;
          gap: 28px;
        }
        nexus-navbar .site-nav__links > a {
          display: inline-flex;
          align-items: center;
          height: 100%;
        }
        nexus-navbar .nav-dropdown {
          position: relative;
          display: inline-flex;
          align-items: center;
        }
        nexus-navbar .nav-dropdown summary {
          list-style: none;
          cursor: pointer;
          user-select: none;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          line-height: 1;
        }
        nexus-navbar .nav-dropdown summary::-webkit-details-marker {
          display: none;
        }
        nexus-navbar .nav-dropdown summary .nav-caret {
          width: 8px;
          height: 8px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.2s ease;
          color: var(--cyan, #00f5d4);
        }
        nexus-navbar .nav-dropdown[open] summary .nav-caret {
          transform: rotate(180deg);
        }
        nexus-navbar .nav-dropdown[open] .nav-dropdown__menu {
          display: flex;
          flex-direction: column;
          position: absolute;
          top: 100%;
          left: 0;
          z-index: 1000;
          background: #0f1923;
          border: 1px solid var(--line, #28344e);
          min-width: 170px;
          margin-top: 14px;
        }
        nexus-navbar .nav-dropdown__menu a {
          padding: 10px 16px;
          color: #e8edf2;
          font-size: 12px;
          text-decoration: none;
          transition: background 0.2s ease;
        }
        nexus-navbar .nav-dropdown__menu a:hover {
          background: rgba(0, 245, 212, 0.1);
          color: var(--cyan, #00f5d4);
        }
        nexus-navbar .site-nav__cta {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          line-height: 1;
        }
      </style>
      <header class="site-nav">
        <a class="site-nav__brand nexus-logo" href="index.html" aria-label="Nexus Protocol home">
          <svg class="nexus-logo__mark" viewBox="0 0 36 36" aria-hidden="true"><path class="nexus-logo__outline" d="M5 5h26v26H5z"/><path class="nexus-logo__slash" d="M9 25 25 9h6L15 25z"/><path class="nexus-logo__cut" d="M5 19 19 5h5L10 19z"/></svg>
          <span class="nexus-logo__wordmark"><strong>NEXUS</strong><span> / PROTOCOL</span></span>
        </a>
        <nav class="site-nav__links" aria-label="Primary navigation">
          <details class="nav-dropdown">
            <summary>
              <span>THÔNG TIN TRÒ CHƠI</span>
              <svg class="nav-caret" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1L5 5L9 1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </summary>
            <div class="nav-dropdown__menu">
              <a href="agents.html">ĐẶC VỤ</a>
              <a href="arsenal.html">KHO VŨ KHÍ</a>
              <a href="maps.html">BẢN ĐỒ</a>
            </div>
          </details>

          <details class="nav-dropdown">
            <summary>
              <span>HỖ TRỢ</span>
              <svg class="nav-caret" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1L5 5L9 1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </summary>
            <div class="nav-dropdown__menu">
              <a href="${supportMailto}">HỖ TRỢ</a>
              <a href="specs.html">THÔNG SỐ CẤU HÌNH</a>
            </div>
          </details>

          <a href="news.html">TIN TỨC</a>
          <a href="index.html">TRANG CHỦ</a>
        </nav>
        <a class="button button--volt site-nav__cta" href="agents.html">
          <span>CHƠI NGAY</span>
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 9L9 1M9 1H3M9 1V7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </a>
      </header>`;
  }

  bindHoverDropdowns() {
    const dropdowns = this.querySelectorAll('.nav-dropdown');

    dropdowns.forEach((dropdown) => {
      let closeTimeout = null;

      const openDropdown = () => {
        if (closeTimeout) {
          clearTimeout(closeTimeout);
          closeTimeout = null;
        }
        dropdown.setAttribute('open', '');
      };

      const closeDropdown = () => {
        closeTimeout = setTimeout(() => {
          dropdown.removeAttribute('open');
        }, 120);
      };

      dropdown.addEventListener('mouseenter', openDropdown);
      dropdown.addEventListener('mouseleave', closeDropdown);

      const summary = dropdown.querySelector('summary');
      if (summary) {
        summary.addEventListener('click', (e) => {
          e.preventDefault();
        });
      }
    });
  }
}

customElements.define('nexus-navbar', NexusNavbar);