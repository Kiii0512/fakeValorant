const escapeHtml = (value = '') => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#039;');

const formatPublishedDate = (value) => {
  if (!value) return 'NGÀY CHƯA XÁC ĐỊNH';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return escapeHtml(value).toUpperCase();
  return new Intl.DateTimeFormat('vi-VN', { day: 'numeric', month: 'long', year: 'numeric' })
    .format(date)
    .toUpperCase();
};

const formatAuthor = (author) => {
  const name = author || 'VALORANT ESPORTS STAFF';
  return /^bởi\s/i.test(name) ? name.toUpperCase() : `BỞI ${name}`.toUpperCase();
};

class ArticleDetailPage extends HTMLElement {
  set data(value) {
    this._data = value;
    this._error = '';
    this.render();
  }

  set error(value) {
    this._error = value;
    this._data = null;
    this.render();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    if (!this.isConnected) return;
    if (this._error) {
      this.innerHTML = `
        <section class="article-detail-state article-detail-state--error" style="padding: 120px 20px; text-align: center;">
          <p style="color: #ff4655; font-family: var(--mono, monospace); margin-bottom: 20px;">${escapeHtml(this._error)}</p>
          <a href="news.html" style="color: var(--cyan, #00f5d4); text-decoration: none; font-weight: bold;">QUAY LẠI TIN TỨC <span>↗</span></a>
        </section>`;
      return;
    }
    if (!this._data) {
      this.innerHTML = `
        <section class="article-detail-state" style="padding: 140px 20px; text-align: center; color: var(--muted, #768079);">
          <p style="font-family: var(--mono, monospace); letter-spacing: 0.1em;">ĐANG NHẬN TÍN HIỆU BÀI VIẾT...</p>
        </section>`;
      return;
    }

    const article = this._data;

    // Tách các đoạn văn bản theo ngắt dòng
    const paragraphs = String(article.content || '').split(/\n\s*\n/).filter(Boolean);
    const contentHtml = paragraphs.map(p => `<p style="margin-bottom: 1.6em; line-height: 1.8; font-size: 17px; color: #383e3a;">${escapeHtml(p).replaceAll('\n', '<br>')}</p>`).join('');

    // Xử lý danh sách ảnh phụ (Sub images gallery)
    let subGallery = [];
    if (article.subImageUrl) {
      subGallery = article.subImageUrl.split(',').map(url => url.trim()).filter(Boolean);
    }
    const hasGallery = subGallery.length > 0;
    const defaultSubImg = hasGallery ? subGallery[0] : '';

    this.innerHTML = `
      <article class="article-detail" style="background: #ece8e1; min-height: 100vh;">
        <!-- HERO BANNER TỐI -->
        <div class="article-detail__hero" style="background: #0f1923; padding: 120px 0 60px 0; border-bottom: 1px solid rgba(255,255,255,0.1);">
          <div style="max-width: 1200px; margin: 0 auto; padding: 0 24px;">
            <div style="position: relative; width: 100%; aspect-ratio: 16 / 9; max-height: 640px; overflow: hidden; border: 1px solid rgba(255,255,255,0.15); box-shadow: 0 20px 50px rgba(0,0,0,0.8);">
              <img src="${escapeHtml(article.mainImageUrl)}" alt="${escapeHtml(article.title)}" style="width: 100%; height: 100%; object-fit: cover; display: block;">
              <div style="position: absolute; bottom: 16px; left: 20px; color: var(--cyan, #00f5d4); font-family: var(--mono, monospace); font-size: 11px; letter-spacing: .12em; background: rgba(15,25,35,0.9); padding: 6px 14px; border: 1px solid rgba(255,255,255,0.2);">
                ARTICLE TRANSMISSION // ID: ${escapeHtml(article.id)}
              </div>
            </div>
          </div>
        </div>

        <!-- THÂN BÀI VIẾT NỀN SÁNG (#ECE8E1) -->
        <section class="article-detail__body" style="max-width: 1200px; margin: 0 auto; padding: 60px 24px 100px 24px;">
          <div style="display: grid; grid-template-columns: 260px 1fr; gap: 60px; align-items: start;">
            
            <!-- CỘT META BÊN TRÁI -->
            <aside style="border-top: 2px solid #0f1923; padding-top: 16px; font-family: var(--mono, monospace);">
              <span style="display: block; color: #ff4655; font-size: 11px; font-weight: bold; letter-spacing: 0.1em; margin-bottom: 12px;">
                BẢN TIN // ${escapeHtml(article.category || 'TIN TỨC')}
              </span>
              <time style="display: block; color: #0f1923; font-size: 13px; font-weight: 700; margin-bottom: 8px;">
                ${formatPublishedDate(article.publishedAt)}
              </time>
              <span style="display: block; color: #768079; font-size: 11px; letter-spacing: 0.05em;">
                ${escapeHtml(formatAuthor(article.author))}
              </span>
            </aside>

            <!-- CỘT NỘI DUNG CHÍNH BÊN PHẢI -->
            <div>
              <p style="color: #ff4655; font-family: var(--mono, monospace); font-size: 12px; font-weight: bold; letter-spacing: .15em; margin: 0 0 16px 0;">
                VALORANT ESPORTS // BẢN TIN CHI TIẾT
              </p>

              <!-- TIÊU ĐỀ KHẮC PHỤC DÍNH FONT -->
              <h1 style="color: #0f1923; font-family: var(--display, 'DIN Next LT Pro', sans-serif); font-size: clamp(34px, 4.5vw, 56px); font-weight: 900; line-height: 1.18; letter-spacing: 0; text-transform: uppercase; margin: 0 0 20px 0; word-break: break-word;">
                ${escapeHtml(article.title)}
              </h1>

              ${article.subtitle ? `
                <p style="color: #555e58; font-size: 20px; line-height: 1.5; font-weight: 500; margin: 0 0 36px 0; border-left: 3px solid #ff4655; padding-left: 16px;">
                  ${escapeHtml(article.subtitle)}
                </p>
              ` : ''}

              <!-- NỘI DUNG VĂN BẢN -->
              <div class="article-content-body" style="border-top: 1px solid rgba(15,25,35,0.15); padding-top: 32px;">
                ${contentHtml || '<p>Nội dung bài viết đang được cập nhật.</p>'}
              </div>

              <!-- KHU VỰC HIỂN THỊ ALBUM ẢNH PHỤ (GIỐNG TRANG BẢN ĐỒ) -->
              ${hasGallery ? `
                <div class="article-gallery-showcase" style="margin-top: 50px; padding-top: 40px; border-top: 2px solid #0f1923;">
                  <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px;">
                    <span style="color: #ff4655; font-family: var(--mono, monospace); font-size: 12px; font-weight: bold; letter-spacing: 0.12em;">
                      HÌNH ẢNH CHI TIẾT // ALBUM ĐÍNH KÈM (${subGallery.length})
                    </span>
                  </div>

                  <!-- VIEWPORT ẢNH LỚN -->
                  <div style="width: 100%; aspect-ratio: 16 / 9; background: #05070b; border: 1px solid rgba(15,25,35,0.2); overflow: hidden; position: relative; box-shadow: 0 10px 30px rgba(0,0,0,0.15);">
                    <img id="article-large-img" src="${defaultSubImg}" alt="Ảnh phụ" style="width: 100%; height: 100%; object-fit: cover; transition: opacity 0.25s ease;" />
                    <div style="position: absolute; bottom: 12px; left: 16px; color: var(--cyan, #00f5d4); font-family: var(--mono, monospace); font-size: 10px; letter-spacing: .12em; background: rgba(15,25,35,0.9); padding: 5px 12px; border: 1px solid rgba(255,255,255,0.1);">
                      TACTICAL SCAN // ATTACHED MEDIA
                    </div>
                  </div>

                  <!-- DÃY THUMBNAIL BẤM CHỌN -->
                  <div id="article-thumb-row" style="display: flex; gap: 12px; overflow-x: auto; padding: 16px 0 8px 0; scroll-behavior: smooth;">
                    ${subGallery.map((imgUrl, imgIdx) => `
                      <button type="button" class="article-sub-thumb ${imgIdx === 0 ? 'active' : ''}" 
                              data-index="${imgIdx}" 
                              data-src="${imgUrl}"
                              style="flex-shrink: 0; width: 140px; aspect-ratio: 16 / 9; padding: 0; background: #0f1923; border: 2px solid ${imgIdx === 0 ? '#ff4655' : 'transparent'}; cursor: pointer; border-radius: 2px; overflow: hidden; opacity: ${imgIdx === 0 ? '1' : '0.6'}; transition: all 0.2s ease;">
                        <img src="${imgUrl}" alt="Ảnh phụ ${imgIdx + 1}" style="width: 100%; height: 100%; object-fit: cover; display: block;" />
                      </button>
                    `).join('')}
                  </div>

                  <!-- THANH TRACKER & MŨI TÊN CHUYỂN SLIDE -->
                  <div style="display: flex; align-items: center; justify-content: space-between; margin-top: 12px; font-family: var(--mono, monospace); font-size: 12px;">
                    <div id="article-numbers" style="display: flex; gap: 14px; font-weight: bold;">
                      ${subGallery.map((_, i) => `
                        <span class="gallery-num ${i === 0 ? 'active' : ''}" data-index="${i}" style="cursor: pointer; color: ${i === 0 ? '#ff4655' : '#768079'};">
                          0${i + 1}
                        </span>
                      `).join('')}
                    </div>

                    <button type="button" id="next-gallery-btn" style="background: transparent; border: 1px solid #0f1923; color: #0f1923; padding: 6px 14px; font-family: var(--mono, monospace); font-size: 11px; cursor: pointer; text-transform: uppercase; font-weight: bold;">
                      ẢNH TIẾP THEO →
                    </button>
                  </div>
                </div>
              ` : ''}

            </div>
          </div>
        </section>
      </article>`;

    if (hasGallery) {
      this.bindGallery(subGallery);
    }
  }

  bindGallery(subGallery) {
    const total = subGallery.length;
    const largeImg = this.querySelector('#article-large-img');
    const thumbnails = this.querySelectorAll('.article-sub-thumb');
    const numbers = this.querySelectorAll('.gallery-num');
    const nextBtn = this.querySelector('#next-gallery-btn');

    let currentIndex = 0;

    const activateSlide = (index) => {
      currentIndex = (index + total) % total;
      const targetSrc = subGallery[currentIndex];

      if (largeImg && largeImg.src !== targetSrc) {
        largeImg.style.opacity = '0.3';
        largeImg.src = targetSrc;
        largeImg.onload = () => { largeImg.style.opacity = '1'; };
      }

      thumbnails.forEach((btn, idx) => {
        const isActive = idx === currentIndex;
        btn.style.borderColor = isActive ? '#ff4655' : 'transparent';
        btn.style.opacity = isActive ? '1' : '0.6';
        btn.classList.toggle('active', isActive);
      });

      numbers.forEach((num, idx) => {
        const isActive = idx === currentIndex;
        num.style.color = isActive ? '#ff4655' : '#768079';
        num.classList.toggle('active', isActive);
      });

      thumbnails[currentIndex]?.scrollIntoView({ behavior: 'smooth', inline: 'nearest', block: 'nearest' });
    };

    thumbnails.forEach(btn => {
      btn.onclick = () => activateSlide(parseInt(btn.dataset.index, 10));
    });

    numbers.forEach(num => {
      num.onclick = () => activateSlide(parseInt(num.dataset.index, 10));
    });

    if (nextBtn) {
      nextBtn.onclick = () => activateSlide(currentIndex + 1);
    }
  }
}

customElements.define('article-detail-page', ArticleDetailPage);