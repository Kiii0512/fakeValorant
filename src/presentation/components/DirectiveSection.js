class DirectiveSection extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <section class="section" id="directives">
        <div class="section-heading"><h2>Three rules.<br><span>One edge.</span></h2><p class="section-heading__note">The fundamentals are simple. Execution is not.</p></div>
        <div class="directive__grid">
          <article class="directive-card"><div class="directive-card__top"><span>01 // Position</span><span>01</span></div><div class="directive-card__glyph">◈</div><h3>Read the space</h3><p>Thông tin là tài nguyên. Biết đối thủ ở đâu trước khi họ biết bạn ở đâu.</p><span class="directive-card__line"></span></article>
          <article class="directive-card"><div class="directive-card__top"><span>02 // Timing</span><span>02</span></div><div class="directive-card__glyph">╱</div><h3>Break the rhythm</h3><p>Thay đổi nhịp độ, buộc đối phương phản ứng và lấy lại quyền chủ động.</p><span class="directive-card__line"></span></article>
          <article class="directive-card"><div class="directive-card__top"><span>03 // Intent</span><span>03</span></div><div class="directive-card__glyph">△</div><h3>Commit fully</h3><p>Mỗi quyết định đều có giá trị. Chọn một hướng và biến nó thành lợi thế.</p><span class="directive-card__line"></span></article>
        </div>
      </section>`;
  }
}

customElements.define('directive-section', DirectiveSection);
