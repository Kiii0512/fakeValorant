const escapeHtml = (value = '') => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#039;');

const formatDate = (value) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return escapeHtml(value || 'N/A');
  return new Intl.DateTimeFormat('vi-VN').format(date);
};

class NewsPage extends HTMLElement {
  set data(value) { this._data = value; this._error = ''; this.render(); }
  set error(value) { this._error = value; this._data = null; this.render(); }
  connectedCallback() { this.render(); }

  render() {
    if (!this.isConnected) return;
    if (this._error) {
      this.innerHTML = `<section class="news-state news-state--error"><p>${escapeHtml(this._error)}</p><a href="index.html">QUAY LẠI TRANG CHỦ <span>↗</span></a></section>`;
      return;
    }
    if (!this._data) {
      this.innerHTML = '<section class="news-state"><span class="loading-spinner" aria-label="Đang tải"></span><p>ĐANG NHẬN TÍN HIỆU TIN TỨC...</p></section>';
      return;
    }

    this.innerHTML = `
      <section class="news-catalog">
        <header class="news-catalog__hero">
          <p class="eyebrow">VALORANT // NEWSROOM</p>
          <h1>TIN TỨC</h1>
          <p>Cập nhật chiến trường, esports và những tín hiệu mới nhất từ hệ thống Nexus.</p>
        </header>
        <section class="news-catalog__grid" aria-label="Danh sách tin tức">
          ${this._data.length ? this._data.map((article, index) => `
            <a class="news-card" href="/article-detail.html?id=${encodeURIComponent(article.id)}">
              <div class="news-card__image-wrap">
                <img src="${escapeHtml(article.mainImageUrl || article.imageUrl)}" alt="${escapeHtml(article.title)}" loading="lazy">
                <span class="news-card__index">0${index + 1}</span>
              </div>
              <div class="news-card__body">
                <div class="news-card__meta"><span>${escapeHtml(article.category || 'TIN TỨC')}</span><time datetime="${escapeHtml(article.publishedAt)}">${formatDate(article.publishedAt)}</time></div>
                <h2>${escapeHtml(article.title)}</h2>
                <p>${escapeHtml(article.subtitle || article.excerpt || '')}</p>
                <span class="news-card__link">ĐỌC BÀI VIẾT <b>↗</b></span>
              </div>
            </a>`).join('') : '<p class="news-catalog__empty">CHƯA CÓ BÀI VIẾT ĐƯỢC PHÁT HÀNH.</p>'}
        </section>
      </section>`;
  }
}
customElements.define('news-page', NewsPage);
