class NexusFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `<footer class="site-footer"><div class="site-footer__brand"><div class="nexus-logo"><svg class="nexus-logo__mark" viewBox="0 0 36 36" aria-hidden="true"><path class="nexus-logo__outline" d="M5 5h26v26H5z"/><path class="nexus-logo__slash" d="M9 25 25 9h6L15 25z"/><path class="nexus-logo__cut" d="M5 19 19 5h5L10 19z"/></svg><span class="nexus-logo__wordmark"><strong>NEXUS</strong><span> / PROTOCOL</span></span></div><p>TACTICAL 5V5 // INTELLIGENCE SYSTEM</p></div><div class="site-footer__note"><span>Project note //</span><p>Một showcase học thuật lấy cảm hứng từ tactical FPS, được xây dựng để thực hành Clean Architecture và native Web Components.</p></div><div class="site-footer__bottom"><span>© 2026 NEXUS PROTOCOL</span><a href="index.html">Back to overview ↑</a></div></footer>`;
  }
}

customElements.define('nexus-footer', NexusFooter);
