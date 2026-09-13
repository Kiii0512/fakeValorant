export class AdminGuidePanel extends HTMLElement {
  set handlers(h) {
    this._h = h;
    this.render();
    this.loadGuide();
  }

  connectedCallback() {
    this.render();
    this.loadGuide();
  }

  async loadGuide() {
    try {
      const res = await fetch('http://localhost:5153/api/guide');
      if (!res.ok) return;
      const data = await res.json();
      this.populateGuide(data);
    } catch (e) {
      console.error('Chưa có bài hướng dẫn:', e);
    }
  }

  populateGuide(data) {
    this.querySelector('#guide-title-input').value = data.title || '';
    this.querySelector('#guide-subtitle-input').value = data.subtitle || '';
    this.querySelector('#guide-author-input').value = data.author || 'VALORANT ESPORTS STAFF';
    this._existingBannerUrl = data.bannerImageUrl || '';
    if (this._existingBannerUrl) {
      const preview = this.querySelector('#guide-banner-preview');
      preview.src = this._existingBannerUrl;
      preview.style.display = 'block';
    }

    let chapters = [];
    try {
      chapters = typeof data.chaptersJson === 'string' ? JSON.parse(data.chaptersJson) : (data.chaptersJson || []);
    } catch {
      chapters = [];
    }

    const container = this.querySelector('#chapters-container');
    container.innerHTML = '';
    chapters.forEach(chap => this.addChapterRow(chap));
  }

  render() {
    if (this._rendered) return;
    this._rendered = true;

    this.innerHTML = `
      <section class="admin-guide-panel">
        <div class="tab-subbar">
          <h2 style="margin: 0; font-size: 20px;">QUẢN TRỊ NỘI DUNG // HƯỚNG DẪN TÂN THỦ (BEGINNER'S GUIDE)</h2>
        </div>

        <form id="form-guide" style="background: var(--panel-light, #141721); padding: 24px; border: 1px solid var(--line, #28344e); margin-top: 16px;">
          <div class="admin-grid-2">
            <div class="admin-form-group">
              <label>TIÊU ĐỀ TRANG *</label>
              <input type="text" id="guide-title-input" value="HƯỚNG DẪN TÂN THỦ" required />
            </div>
            <div class="admin-form-group">
              <label>TÁC GIẢ</label>
              <input type="text" id="guide-author-input" value="VALORANT ESPORTS STAFF" />
            </div>
          </div>

          <div class="admin-form-group" style="margin-top: 14px;">
            <label>DÒNG DẪN NHẬP (SUBTITLE)</label>
            <input type="text" id="guide-subtitle-input" value="Bạn muốn chơi giỏi VALORANT? Đây chính là trạm dừng chân đầu tiên của bạn." />
          </div>

          <div class="admin-form-group" style="margin-top: 14px;">
            <label>ẢNH BANNER ĐẦU TRANG *</label>
            <img id="guide-banner-preview" style="max-height: 180px; width: auto; object-fit: cover; margin-bottom: 8px; display: none; border: 1px solid var(--line, #28344e);" />
            <input type="file" id="guide-banner-file" accept="image/*" />
          </div>

          <div style="margin-top: 32px; border-top: 1px solid var(--line, #28344e); padding-top: 20px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
              <div>
                <h3 style="margin: 0; color: var(--cyan, #00f5d4);">DANH SÁCH CÁC CHƯƠNG HỒI (CUỘN DỌC)</h3>
                <small style="color: #8b978f; font-family: monospace;">* Mỗi chương có thể có Ảnh, có Video YouTube hoặc có cả 2 (tối thiểu phải có 1 trong 2)</small>
              </div>
              <button type="button" id="add-chapter-btn" class="button button--volt" style="font-size: 11px; padding: 6px 14px;">+ THÊM CHƯƠNG MỚI</button>
            </div>
            <div id="chapters-container" style="display: flex; flex-direction: column; gap: 20px;"></div>
          </div>

          <button type="submit" id="save-guide-btn" class="admin-submit" style="margin-top: 28px;">LƯU TOÀN BỘ TRANG HƯỚNG DẪN</button>
        </form>
      </section>
    `;

    // Preview tức thì khi chọn file banner mới
    const bannerInput = this.querySelector('#guide-banner-file');
    const bannerPreview = this.querySelector('#guide-banner-preview');
    bannerInput.onchange = () => {
      const file = bannerInput.files[0];
      if (file) {
        bannerPreview.src = URL.createObjectURL(file);
        bannerPreview.style.display = 'block';
      }
    };

    this.querySelector('#add-chapter-btn').onclick = () => this.addChapterRow();
    this.querySelector('#form-guide').onsubmit = (e) => this.submitGuide(e);
  }

  addChapterRow(data = {}) {
    const container = this.querySelector('#chapters-container');
    const index = container.children.length + 1;
    const row = document.createElement('div');
    row.className = 'chapter-item-box';
    row.style.cssText = 'background: rgba(15, 25, 35, 0.7); border: 1px solid var(--line, #28344e); padding: 18px; position: relative;';

    row.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
        <span style="color: var(--cyan, #00f5d4); font-family: var(--font-mono, monospace); font-weight: bold;">CHƯƠNG #${index}</span>
        <button type="button" class="remove-chap-btn" style="background: transparent; border: 1px solid #ff4655; color: #ff4655; padding: 4px 8px; font-size: 10px; cursor: pointer;">XÓA CHƯƠNG</button>
      </div>

      <div class="admin-form-group">
        <label>Tiêu đề chương *</label>
        <input type="text" class="chap-title" value="${data.title || ''}" placeholder="Vd: VALORANT LÀ GÌ?" required />
      </div>

      <div class="admin-form-group" style="margin-top: 10px;">
        <label>Nội dung giới thiệu chi tiết *</label>
        <textarea class="chap-content" rows="4" placeholder="Nhập nội dung chương..." required>${data.content || ''}</textarea>
      </div>

      <div class="admin-grid-2" style="margin-top: 14px; background: rgba(0, 0, 0, 0.25); padding: 14px; border: 1px solid rgba(255,255,255,0.05);">
        <div class="admin-form-group">
          <label style="color: var(--cyan, #00f5d4);">1. VIDEO YOUTUBE (TÙY CHỌN)</label>
          <input type="text" class="chap-video-url" value="${data.videoUrl || ''}" placeholder="https://www.youtube.com/watch?v=..." />
          <small style="color: #6b7280; font-size: 10px;">Dán link YouTube (để trống nếu không dùng video)</small>
        </div>

        <div class="admin-form-group">
          <label style="color: var(--cyan, #00f5d4);">2. HÌNH ẢNH MINH HỌA (TÙY CHỌN)</label>
          ${data.imageUrl ? `
            <div style="display:flex; align-items:center; gap:8px; margin-bottom:6px;">
              <img class="chap-img-thumb" src="${data.imageUrl}" style="width:50px; height:30px; object-fit:cover; border:1px solid #28344e;" />
              <span style="font-size:10px; color:#00f5d4;">Đã có ảnh cũ (chọn file mới nếu muốn đổi)</span>
            </div>
          ` : ''}
          <input type="file" class="chap-image-file" accept="image/*" />
          <input type="hidden" class="chap-existing-image" value="${data.imageUrl || ''}" />
        </div>
      </div>
    `;

    row.querySelector('.remove-chap-btn').onclick = () => {
      row.remove();
      container.querySelectorAll('.chapter-item-box').forEach((box, i) => {
        const span = box.querySelector('span');
        if (span) span.textContent = `CHƯƠNG #${i + 1}`;
      });
    };

    container.appendChild(row);
  }

  // Fallback upload an toàn nếu handler chưa được inject
  async _uploadFile(file) {
    if (this._h?.onUpload) {
      return await this._h.onUpload(file, 'agent-media');
    }
    const fd = new FormData();
    fd.append('file', file);
    const res = await fetch('http://localhost:5153/api/admin/upload?bucket=agent-media', {
      method: 'POST',
      body: fd
    });
    if (!res.ok) throw new Error('Không thể upload ảnh lên máy chủ.');
    const d = await res.json();
    return d.url || d.Url || '';
  }

  async submitGuide(e) {
    e.preventDefault();
    const btn = this.querySelector('#save-guide-btn');
    btn.disabled = true;
    btn.textContent = 'ĐANG LƯU BÀI HƯỚNG DẪN...';

    try {
      let bannerUrl = this._existingBannerUrl;
      const bannerFile = this.querySelector('#guide-banner-file').files[0];
      if (bannerFile) {
        btn.textContent = 'ĐANG TẢI BANNER ĐẦU TRANG...';
        bannerUrl = await this._uploadFile(bannerFile);
      }

      if (!bannerUrl) throw new Error('Vui lòng chọn ảnh Banner đầu trang');

      const chapterRows = Array.from(this.querySelectorAll('.chapter-item-box'));
      if (chapterRows.length === 0) {
        throw new Error('Cần có ít nhất 1 chương nội dung.');
      }

      const chapters = [];

      for (let i = 0; i < chapterRows.length; i++) {
        const row = chapterRows[i];
        const title = row.querySelector('.chap-title').value.trim();
        const content = row.querySelector('.chap-content').value.trim();
        const videoUrl = row.querySelector('.chap-video-url').value.trim();
        let imageUrl = row.querySelector('.chap-existing-image').value;
        const file = row.querySelector('.chap-image-file').files[0];

        if (file) {
          btn.textContent = `ĐANG TẢI ẢNH CHƯƠNG #${i + 1}...`;
          imageUrl = await this._uploadFile(file);
        }

        if (!videoUrl && !imageUrl) {
          throw new Error(`Chương #${i + 1} ("${title || 'Chưa đặt tên'}") chưa có Media nào! Vui lòng nhập link YouTube HOẶC tải ảnh lên (hoặc cả hai).`);
        }

        chapters.push({
          title,
          content,
          videoUrl: videoUrl || '',
          imageUrl: imageUrl || ''
        });
      }

      const payload = {
        title: this.querySelector('#guide-title-input').value.trim(),
        subtitle: this.querySelector('#guide-subtitle-input').value.trim(),
        author: this.querySelector('#guide-author-input').value.trim(),
        bannerImageUrl: bannerUrl,
        chapters: chapters
      };

      const res = await fetch('http://localhost:5153/api/guide', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) throw new Error('Lưu bài hướng dẫn thất bại');
      alert('Đã cập nhật bài Hướng Dẫn Tân Thủ thành công!');
      this.loadGuide();
    } catch (err) {
      alert(err.message);
    } finally {
      btn.disabled = false;
      btn.textContent = 'LƯU TOÀN BỘ TRANG HƯỚNG DẪN';
    }
  }
}

customElements.define('admin-guide-panel', AdminGuidePanel);