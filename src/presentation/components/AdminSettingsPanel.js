export class AdminSettingsPanel extends HTMLElement {
  set handlers(value) {
    this._h = value;
    if (this.isConnected) this.load();
  }

  connectedCallback() {
    this.render();
    this.load();
  }

  render() {
    this.innerHTML = `
      <section class="admin-settings-panel">
        <div class="tab-subbar"><h2>CÀI ĐẶT TRANG CHỦ // HERO BACKGROUND VIDEO</h2></div>
        <div class="admin-settings-card">
          <div class="admin-form-group"><label>VIDEO NỀN HIỆN TẠI</label><video id="hero-preview-video" controls muted loop></video></div>
          <div class="admin-form-group"><label for="hero-video-url-input">ĐƯỜNG DẪN VIDEO (.MP4, .WEBM)</label><input type="text" id="hero-video-url-input" placeholder="https://domain.com/video.mp4"></div>
          <div class="admin-form-group"><label for="hero-video-file-input">HOẶC TẢI LÊN TỆP VIDEO MỚI</label><input type="file" id="hero-video-file-input" accept="video/mp4,video/webm"></div>
          <button type="button" id="save-hero-video-btn" class="admin-submit">LƯU CÀI ĐẶT VIDEO TRANG CHỦ</button>
          <div id="settings-status" class="admin-message" hidden></div>
        </div>
      </section>`;
    this.querySelector('#save-hero-video-btn').addEventListener('click', () => this.save());
  }

  async load() {
    if (!this.isConnected) return;
    try {
      const response = await fetch('http://localhost:5153/api/admin/settings/hero-video');
      if (!response.ok) return;
      const data = await response.json();
      const url = data.url || data.Url || '';
      this.querySelector('#hero-video-url-input').value = url;
      this.querySelector('#hero-preview-video').src = url;
    } catch (error) {
      this.setStatus(error.message, true);
    }
  }

  setStatus(message, isError = false) {
    const status = this.querySelector('#settings-status');
    status.className = `admin-message ${isError ? 'msg-error' : 'msg-success'}`;
    status.textContent = message;
    status.hidden = false;
  }

  async save() {
    const button = this.querySelector('#save-hero-video-btn');
    const file = this.querySelector('#hero-video-file-input').files[0];
    button.disabled = true;
    button.textContent = 'ĐANG XỬ LÝ...';
    try {
      let url = this.querySelector('#hero-video-url-input').value.trim();
      if (file) {
        button.textContent = 'ĐANG UPLOAD VIDEO...';
        url = await this._h.onUpload(file, 'agent-media');
      }
      if (!url) throw new Error('Vui lòng chọn file video hoặc nhập URL.');
      const response = await fetch('http://localhost:5153/api/admin/settings/hero-video', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ url })
      });
      if (!response.ok) throw new Error('Không thể lưu video vào database.');
      this.querySelector('#hero-video-url-input').value = url;
      this.querySelector('#hero-preview-video').src = url;
      this.setStatus('Cập nhật video trang chủ thành công.');
    } catch (error) {
      this.setStatus(error.message, true);
    } finally {
      button.disabled = false;
      button.textContent = 'LƯU CÀI ĐẶT VIDEO TRANG CHỦ';
    }
  }
}

customElements.define('admin-settings-panel', AdminSettingsPanel);
