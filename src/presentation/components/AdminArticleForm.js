import { ApiGameRepository } from '../../infrastructure/repositories/ApiGameRepository.js';
import { createDefaultArticleHandlers } from './AdminArticleHelpers.js';
import { bindMainImage, bindSubImagesContainer, clearMainImage, renderExistingSubImages, setExistingMainImage, setMainImageFile } from './AdminArticleMedia.js';
import './AdminArticleTable.js';

const API_BASE = 'https://fakevalorant-backend.onrender.com/api';

const defaultRepo = new ApiGameRepository();

export class AdminArticleForm extends HTMLElement {
  set handlers(h) {
    this._h = h;
    this.render();
    this.loadArticles();
  }

  connectedCallback() {
    if (!this._h) {
      this._h = createDefaultArticleHandlers(API_BASE, defaultRepo);
    }
    this.render();
    this.loadArticles();
  }

  async loadArticles() {
    try {
      let articles = [];
      if (this._h?.onLoadArticles) {
        articles = await this._h.onLoadArticles();
      }

      if (!articles || articles.length === 0) {
        const res = await fetch(`${API_BASE}/articles`);
        if (res.ok) {
          articles = await res.json();
        }
      }

      this._articles = articles || [];
      this.renderList();
    } catch (error) {
      this.setStatus(error.message, true);
    }
  }

  render() {
    this._mainImageState = { file: null, previewUrl: '' };
    this._editingArticleId = null;
    this._existingSubImages = [];

    this.innerHTML = `
      <style>
        .admin-table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 16px;
          font-family: var(--font-mono, monospace);
          font-size: 12px;
        }
        .admin-table th, .admin-table td {
          padding: 12px 14px;
          border-bottom: 1px solid var(--line, #28344e);
          text-align: left;
          vertical-align: middle;
        }
        .admin-table th {
          color: var(--cyan, #00f5d4);
          text-transform: uppercase;
          font-size: 11px;
          background: rgba(15, 25, 35, 0.7);
        }
        .admin-table tr:hover {
          background: rgba(255, 255, 255, 0.03);
        }
        .btn-toggle {
          padding: 6px 14px;
          font-family: var(--font-mono, monospace);
          font-size: 11px;
          font-weight: bold;
          cursor: pointer;
          border-radius: 2px;
          border: 1px solid transparent;
          transition: all 0.2s ease;
        }
        .btn-toggle.active {
          background: #ff4655 !important;
          color: #ffffff !important;
          border-color: #ff4655 !important;
        }
        .btn-toggle.inactive {
          background: transparent !important;
          border-color: #4a545e !important;
          color: #8b978f !important;
        }
        .btn-toggle:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        .action-group {
          display: flex;
          gap: 8px;
          align-items: center;
        }
        .btn-action-edit {
          background: transparent;
          border: 1px solid var(--cyan, #00f5d4);
          color: var(--cyan, #00f5d4);
          font-family: var(--font-mono, monospace);
          font-size: 10px;
          padding: 6px 12px;
          cursor: pointer;
          font-weight: bold;
        }
        .btn-action-edit:hover {
          background: var(--cyan, #00f5d4);
          color: #0f1923;
        }
        .btn-action-del {
          background: transparent;
          border: 1px solid rgba(255, 70, 85, 0.4);
          color: #ff4655;
          font-family: var(--font-mono, monospace);
          font-size: 10px;
          padding: 6px 12px;
          cursor: pointer;
          font-weight: bold;
        }
        .btn-action-del:hover {
          background: #ff4655;
          color: #fff;
        }
        .tab-subbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }
      </style>

      <section class="admin-article-panel">
        <div class="tab-subbar">
          <h2 style="margin: 0; font-size: 20px;">DANH SÁCH BÀI VIẾT TIN TỨC</h2>
          <button type="button" id="toggle-article-form-btn" class="button button--volt" style="font-size: 11px; padding: 8px 18px;">+ VIẾT BÀI MỚI</button>
        </div>

        <div id="article-status" class="admin-message" hidden></div>

        <admin-article-table id="article-table-wrap">Đang tải danh sách bài viết...</admin-article-table>

        <form id="form-article" style="display: none; margin-top: 36px; padding-top: 28px; border-top: 2px dashed var(--line, #28344e);">
          <h1 id="article-form-title" style="color: var(--cyan, #00f5d4);">BẢNG QUẢN TRỊ // TIN TỨC</h1>
          
          <div class="admin-grid-2">
            <div class="admin-form-group">
              <label for="article-title">Tiêu đề chính *</label>
              <input id="article-title" name="title" type="text" required placeholder="Nhập tiêu đề bài viết">
            </div>
            <div class="admin-form-group">
              <label for="article-author">Tác giả</label>
              <input id="article-author" name="author" type="text" value="VALORANT ESPORTS STAFF">
            </div>
          </div>

          <div class="admin-form-group">
            <label for="article-subtitle">Tiêu đề phụ</label>
            <input id="article-subtitle" name="subtitle" type="text" placeholder="Một dòng dẫn nhập cho bài viết">
          </div>

          <div class="admin-form-group admin-image-field" data-image-field="main">
            <label>ẢNH CHÍNH // MAIN BANNER IMAGE * (Để trống nếu giữ nguyên ảnh khi sửa)</label>
            <div class="admin-image-picker" data-picker>
              <input class="admin-image-picker__input" type="file" accept="image/*">
              <div class="admin-image-picker__empty">
                <span class="admin-image-picker__icon">↑</span>
                <strong>KÉO THẢ HOẶC BẤM ĐỂ CHỌN ẢNH CHÍNH</strong>
                <small>PNG, JPG, WEBP // TỈ LỆ 16:9 KHUYẾN NGHỊ</small>
              </div>
              <div class="admin-image-picker__preview" hidden>
                <img alt="Xem trước ảnh chính">
                <div class="admin-image-picker__overlay">
                  <span>CHỌN ẢNH KHÁC</span>
                  <button type="button" data-remove-image>XÓA ẢNH</button>
                </div>
              </div>
            </div>
          </div>

          <div class="admin-form-group" style="margin-top: 20px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
              <label style="margin-bottom: 0;">ALBUM ẢNH PHỤ (TÙY CHỌN)</label>
              <button type="button" id="add-sub-image-btn" style="background: transparent; border: 1px solid var(--cyan, #00f5d4); color: var(--cyan, #00f5d4); font-family: var(--mono, monospace); font-size: 10px; padding: 6px 12px; cursor: pointer;">
                + THÊM ẢNH PHỤ
              </button>
            </div>
            <div id="sub-images-container" style="display: flex; flex-direction: column; gap: 10px;"></div>
          </div>

          <div class="admin-form-group" style="margin-top: 20px;">
            <label for="article-content">Nội dung bài viết *</label>
            <textarea id="article-content" name="content" rows="14" required placeholder="Tách các đoạn văn bằng một dòng trống..."></textarea>
          </div>

          <button type="submit" id="submit-article-btn" class="admin-submit">ĐĂNG BÀI VIẾT // PUBLISH</button>
        </form>
      </section>
    `;

    bindMainImage(this);
    bindSubImagesContainer(this);

    this.querySelector('#toggle-article-form-btn').onclick = () => {
      this.resetForm();
      const f = this.querySelector('#form-article');
      f.style.display = f.style.display === 'none' ? 'block' : 'none';
      this.querySelector('#toggle-article-form-btn').textContent = f.style.display === 'none' ? '+ VIẾT BÀI MỚI' : '✕ ĐÓNG FORM';
    };

    this.querySelector('#form-article').addEventListener('submit', (e) => this.submitArticle(e));
  }

  bindMainImage() {
    bindMainImage(this);
  }

  setMainImageFile(file) {
    setMainImageFile(this, file);
  }

  setExistingMainImage(url) {
    setExistingMainImage(this, url);
  }

  clearMainImage() {
    clearMainImage(this);
  }

  bindSubImagesContainer() {
    bindSubImagesContainer(this);
  }

  renderList() {
    const table = this.querySelector('#article-table-wrap');
    if (!table) return;
    table.handlers = {
      onToggleFeatured: (id, state) => (this._h?.onToggleFeatured || ((articleId, nextState) => defaultRepo.toggleArticleFeatured(articleId, nextState)))(id, state),
      onDeleteArticle: (id) => (this._h?.onDeleteArticle || ((articleId) => defaultRepo.deleteArticle(articleId)))(id),
      onEdit: (article) => this.populateForm(article),
      onReload: () => this.loadArticles()
    };
    table.data = this._articles || [];
  }

  populateForm(article) {
    const form = this.querySelector('#form-article');
    form.style.display = 'block';
    this.querySelector('#article-form-title').textContent = `CHỈNH SỬA BÀI VIẾT // ${article.title}`;
    this.querySelector('#submit-article-btn').textContent = 'CẬP NHẬT BÀI VIẾT';
    this.querySelector('#toggle-article-form-btn').textContent = '✕ ĐÓNG FORM';

    this._editingArticleId = article.id;
    this.querySelector('#article-title').value = article.title || '';
    this.querySelector('#article-author').value = article.author || 'VALORANT ESPORTS STAFF';
    this.querySelector('#article-subtitle').value = article.subtitle || '';
    this.querySelector('#article-content').value = article.content || '';

    this.setExistingMainImage(article.mainImageUrl || article.main_image_url || '');

    const rawSub = article.subImageUrl || article.sub_image_url || '';
    this._existingSubImages = rawSub ? rawSub.split(',').filter(Boolean) : [];
    const subContainer = this.querySelector('#sub-images-container');
    subContainer.innerHTML = '';
    renderExistingSubImages(this);

    form.scrollIntoView({ behavior: 'smooth' });
  }

  resetForm() {
    const form = this.querySelector('#form-article');
    form.reset();
    this.clearMainImage();
    this._editingArticleId = null;
    this._existingSubImages = [];
    this.querySelector('#article-form-title').textContent = 'BẢNG QUẢN TRỊ // TIN TỨC';
    this.querySelector('#submit-article-btn').textContent = 'ĐĂNG BÀI VIẾT // PUBLISH';
    this.querySelector('#article-author').value = 'VALORANT ESPORTS STAFF';
    this.querySelector('#sub-images-container').innerHTML = '';
  }

  setStatus(message, isError = false) {
    const status = this.querySelector('#article-status');
    if (!status) return;
    status.className = `admin-message ${isError ? 'msg-error' : 'msg-success'}`;
    status.textContent = message;
    status.hidden = false;
  }

  async submitArticle(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const button = this.querySelector('#submit-article-btn');
    const data = Object.fromEntries(new FormData(form).entries());

    button.disabled = true;
    button.textContent = 'ĐANG XỬ LÝ...';
    this.setStatus('');

    try {
      let mainImageUrl = this._mainImageState.previewUrl;
      if (this._mainImageState.file) {
        button.textContent = 'ĐANG TẢI ẢNH CHÍNH LÊN SUPABASE...';
        mainImageUrl = await this._h.onUpload(this._mainImageState.file, 'agent-media');
      }

      if (!mainImageUrl) {
        throw new Error('Vui lòng chọn ảnh chính cho bài viết.');
      }

      const subFiles = Array.from(this.querySelectorAll('.single-sub-file'))
        .map((input) => input.files[0])
        .filter(Boolean);

      const newlyUploadedSubUrls = [];
      for (let i = 0; i < subFiles.length; i++) {
        button.textContent = `ĐANG TẢI ẢNH PHỤ ${i + 1}/${subFiles.length}...`;
        const uploadedUrl = await this._h.onUpload(subFiles[i], 'agent-media');
        if (uploadedUrl) newlyUploadedSubUrls.push(uploadedUrl);
      }

      const totalSubUrls = [...(this._existingSubImages || []), ...newlyUploadedSubUrls];

      data.mainImageUrl = mainImageUrl;
      data.subImageUrl = totalSubUrls.length > 0 ? totalSubUrls.join(',') : null;
      data.subtitle = data.subtitle || null;
      data.author = data.author || 'VALORANT ESPORTS STAFF';

      if (this._editingArticleId) {
        button.textContent = 'ĐANG CẬP NHẬT BÀI VIẾT...';
        await (this._h.onUpdateArticle || ((id, d) => defaultRepo.updateArticle(id, d)))(this._editingArticleId, data);
        this.setStatus('Cập nhật bài viết thành công!');
      } else {
        button.textContent = 'ĐANG ĐĂNG BÀI VIẾT...';
        await (this._h.onSaveArticle || ((d) => defaultRepo.createArticle(d)))(data);
        this.setStatus('Đăng bài viết thành công!');
      }

      this.resetForm();
      form.style.display = 'none';
      this.querySelector('#toggle-article-form-btn').textContent = '+ VIẾT BÀI MỚI';
      await this.loadArticles();
    } catch (error) {
      this.setStatus(error.message, true);
    } finally {
      button.disabled = false;
      button.textContent = this._editingArticleId ? 'CẬP NHẬT BÀI VIẾT' : 'ĐĂNG BÀI VIẾT // PUBLISH';
    }
  }
}

customElements.define('admin-article-form', AdminArticleForm);