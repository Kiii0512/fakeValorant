class NexusFooter extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <footer class="site-footer">
        <div class="footer-container">
          
          <!-- SOCIAL BUTTONS -->
          <div class="footer-social-list">
            <!-- FACEBOOK -->
            <a href="https://www.facebook.com/nguyen.huy.hoang.171890" target="_blank" rel="noopener noreferrer" aria-label="Facebook" class="footer-social-btn">
              <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95C18.05 21.45 22 17.19 22 12z"/>
              </svg>
            </a>

            <!-- YOUTUBE -->
            <a href="https://www.youtube.com/@valorant" target="_blank" rel="noopener noreferrer" aria-label="YouTube" class="footer-social-btn">
              <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                <path d="M21.58 7.19a2.5 2.5 0 0 0-1.76-1.77C18.26 5 12 5 12 5s-6.26 0-7.82.42A2.5 2.5 0 0 0 2.42 7.19C2 8.75 2 12 2 12s0 3.25.42 4.81a2.5 2.5 0 0 0 1.76 1.77c1.56.42 7.82.42 7.82.42s6.26 0 7.82-.42a2.5 2.5 0 0 0 1.76-1.77C22 15.25 22 12 22 12s0-3.25-.42-4.81zM10 15V9l5.2 3L10 15z"/>
              </svg>
            </a>

            <!-- INSTAGRAM -->
            <a href="https://www.instagram.com/hh.nhinkiiine?stkn=cndtc2xiZWQxcGMz" target="_blank" rel="noopener noreferrer" aria-label="Instagram" class="footer-social-btn">
              <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
          </div>

          <!-- LOGOS BRAND -->
          <div class="footer-brand-logos">
            <span style="font-family: var(--font-display, sans-serif); font-size: 20px; font-weight: 900; letter-spacing: 0.12em; color: #ffffff;">
              KIII <span style="color: #ff4655;">STUDIO</span>
            </span>
            <span class="footer-brand-divider"></span>
            <span style="font-family: var(--font-display, sans-serif); font-size: 20px; font-weight: 900; letter-spacing: 0.08em; color: #ff8a00;">
              MHT <span style="color: #ffffff;">GROUP</span>
            </span>
          </div>

          <!-- LEGAL TEXT (BẢN QUYỀN & GIẤY PHÉP) -->
          <div class="footer-legal-content">
            <p>
              © năm 2020 - 2026 bởi Kiii Studio, Inc. KIII STUDIO, Nexus Protocol và mọi logo liên quan là nhãn hiệu, nhãn hiệu dịch vụ và/hoặc nhãn hiệu đã đăng ký của KIII STUDIO, Inc.
            </p>
            <p style="color: #a1ada5; font-weight: 600;">
              Công Ty Cổ Phần Tập Đoàn MHT.
            </p>
            <p>
              Địa chỉ: 55 Đ. Giải Phóng, Bạch Mai, Hà Nội, Việt Nam.
            </p>
            <p>
              Điện thoại: 0877781362
            </p>
            <p>
              Giấy phép cung cấp dịch vụ trò chơi điện tử G1 trên mạng số 45/GP-PTTH&TTĐT do Cục Phát thanh, truyền hình và thông tin điện tử cấp ngày 27/02/2025.
            </p>
            <p>
              Quyết định phát hành trò chơi điện tử G1 trên mạng số 262/QĐ-PTTH&TTĐT do Cục Phát thanh, truyền hình và thông tin điện tử cấp ngày 20/06/2025.
            </p>
            <p>
              <a href="https://kiiihh.is-great.org/index.html?i=1" target="_blank" rel="noopener noreferrer" style="color: #a1ada5; text-decoration: underline; word-break: break-all;">
                https://kiiihh.is-great.org/index.html?i=1
              </a>
            </p>
          </div>

          <!-- POLICY LINKS -->
          <nav aria-label="Footer navigation" class="footer-nav-links">
            <a href="#">CHÍNH SÁCH BẢO MẬT</a>
            <a href="#">ĐIỀU KHOẢN SỬ DỤNG (KIII)</a>
            <a href="#">ĐIỀU KHOẢN SỬ DỤNG (MHT)</a>
            <a href="#">TÙY CHỌN COOKIES</a>
          </nav>

          <!-- 18+ BADGE -->
          <div class="footer-rating-badge">
            <span class="footer-rating-age">
              18+
            </span>
            <span class="footer-rating-desc">
              Chơi quá 180 phút một ngày sẽ ảnh hưởng xấu đến sức khoẻ
            </span>
          </div>

        </div>
      </footer>
    `;
  }
}

customElements.define('nexus-footer', NexusFooter);