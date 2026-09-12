class NewsPage extends HTMLElement {
  set data(value) { this._data = value; this.render(); }
  connectedCallback() { this.render(); }
  render() {
    if (!this.isConnected || !this._data) return;
    this.innerHTML = `<section class="catalog-page editorial-page"><div class="catalog-hero"><p class="eyebrow">Nexus transmission // newsroom</p><h1>Tin tức<br><em>từ hệ thống.</em></h1><p>Patch notes, esports và nhật ký phát triển. Tín hiệu mới nhất được lưu trữ tại đây.</p></div><div class="article-grid">${this._data.map((article, index) => `<article class="article-card ${article.featured ? 'article-card--featured' : ''}" id="${article.id}"><div class="article-card__top"><span>0${index + 1} // ${article.category}</span><span>${article.readTime}</span></div><div class="article-card__signal">${article.featured ? 'CLASSIFIED TRANSMISSION' : 'ARCHIVE SIGNAL'}</div><div class="article-card__body"><p class="eyebrow">${article.publishedAt}</p><h2>${article.title}</h2><p>${article.excerpt}</p><a class="text-link" href="news.html#${article.id}">Read transmission <span>↗</span></a></div></article>`).join('')}</div></section>`;
  }
}
customElements.define('news-page', NewsPage);
