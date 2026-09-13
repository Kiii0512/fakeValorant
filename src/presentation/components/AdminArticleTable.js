import { escapeHtml, formatDate } from './AdminArticleHelpers.js';

export class AdminArticleTable extends HTMLElement {
  set handlers(value) { this._h = value; }
  set data(value) { this._articles = value || []; this.render(); }
  render() {
    this.innerHTML = `<table class="admin-table"><thead><tr><th>Ảnh Bìa</th><th>Ngày Đăng</th><th>Tiêu Đề Bài Viết</th><th>Tác Giả</th><th>Nổi Bật (Tối Đa 3 Bài)</th><th>Hành Động</th></tr></thead><tbody>${this._articles.length === 0 ? '<tr><td colspan="6">Chưa có bài viết nào được đăng.</td></tr>' : this._articles.map((article) => this.renderRow(article)).join('')}</tbody></table>`;
    this.bindActions();
  }
  renderRow(article) {
    const isFeatured = Boolean(article.isFeatured ?? article.is_featured ?? article.IsFeatured ?? false);
    return `<tr><td><img src="${escapeHtml(article.mainImageUrl || article.main_image_url || '')}" width="60" height="34" style="object-fit: cover; border-radius: 2px; background: #141721;" alt=""></td><td>${formatDate(article.publishedAt || article.published_at)}</td><td><strong>${escapeHtml(article.title)}</strong></td><td>${escapeHtml(article.author || 'VALORANT')}</td><td><button type="button" class="btn-toggle ${isFeatured ? 'active' : 'inactive'}" data-article-toggle="${article.id}" data-current="${isFeatured}">${isFeatured ? '★ NỔI BẬT' : '☆ BÌNH THƯỜNG'}</button></td><td><div class="action-group"><a href="/article-detail.html?id=${encodeURIComponent(article.id)}" target="_blank" class="btn-action-edit" style="text-decoration:none; padding:6px 10px;">XEM ↗</a><button type="button" class="btn-action-edit" data-edit-article="${article.id}">SỬA</button><button type="button" class="btn-action-del" data-del-article="${article.id}">XÓA</button></div></td></tr>`;
  }
  bindActions() {
    this.querySelectorAll('[data-article-toggle]').forEach((button) => { button.onclick = () => this.toggleFeatured(button); });
    this.querySelectorAll('[data-edit-article]').forEach((button) => { button.onclick = () => this._h.onEdit(this.find(button.dataset.editArticle)); });
    this.querySelectorAll('[data-del-article]').forEach((button) => { button.onclick = () => this.deleteArticle(button.dataset.delArticle); });
  }
  find(id) { return this._articles.find((article) => String(article.id).toLowerCase() === String(id).toLowerCase()); }
  async toggleFeatured(button) {
    const current = button.dataset.current === 'true';
    const nextState = !current;
    button.disabled = true;
    button.textContent = 'ĐANG ĐỔI...';
    try {
      await this._h.onToggleFeatured(button.dataset.articleToggle, nextState);
      const target = this.find(button.dataset.articleToggle);
      if (target) { target.isFeatured = nextState; target.is_featured = nextState; target.IsFeatured = nextState; }
      button.dataset.current = String(nextState);
      button.className = `btn-toggle ${nextState ? 'active' : 'inactive'}`;
      button.textContent = nextState ? '★ NỔI BẬT' : '☆ BÌNH THƯỜNG';
      button.disabled = false;
      await this._h.onReload();
    } catch (error) {
      alert(error.message || 'Lỗi cập nhật cờ nổi bật');
      button.disabled = false;
      button.className = `btn-toggle ${current ? 'active' : 'inactive'}`;
      button.textContent = current ? '★ NỔI BẬT' : '☆ BÌNH THƯỜNG';
    }
  }
  async deleteArticle(id) {
    if (!confirm('Bạn có chắc chắn muốn xóa vĩnh viễn bài viết này?')) return;
    try { await this._h.onDeleteArticle(id); await this._h.onReload(); } catch (error) { alert(error.message); }
  }
}

customElements.define('admin-article-table', AdminArticleTable);
