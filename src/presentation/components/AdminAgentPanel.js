const escapeHtml = (value = '') => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#039;');

export class AdminAgentPanel extends HTMLElement {
  set handlers(value) { this._h = value; if (this.isConnected) this.load(); }
  connectedCallback() { this.render(); this.load(); }

  render() {
    this.innerHTML = `
      <section class="admin-panel admin-agent-panel">
        <div class="tab-subbar"><h2>DANH SÁCH ĐẶC VỤ CHIẾN TRƯỜNG</h2><button type="button" class="button button--volt" data-toggle-form>+ THÊM ĐẶC VỤ MỚI</button></div>
        <div data-table>Đang tải danh sách đặc vụ...</div>
        <form data-form hidden>
          <h1 data-form-title>THÊM HỒ SƠ ĐẶC VỤ // AGENT DOSSIER</h1>
          <div class="admin-grid-2"><div class="admin-form-group"><label>Mã ID Đặc vụ</label><input name="id" required placeholder="harbor"></div><div class="admin-form-group"><label>Tên đặc vụ hiển thị</label><input name="name" required placeholder="HARBOR"></div></div>
          <div class="admin-grid-2"><div class="admin-form-group"><label>Số hiệu đặc vụ</label><input name="agent_number" required placeholder="20"></div><div class="admin-form-group"><label>Vai trò chiến thuật</label><select name="role"><option>Controller</option><option>Duelist</option><option>Initiator</option><option>Sentinel</option></select></div></div>
          <div class="admin-form-group"><label>Tiểu sử đặc vụ</label><textarea name="bio" rows="3"></textarea></div>
          <div class="admin-form-group"><label>Ảnh đại diện</label><input type="file" name="avatar" accept="image/*"><img class="admin-media-preview" data-preview="avatar" alt="Preview avatar" hidden></div>
          <h2>BỘ 4 KỸ NĂNG TÁC CHIẾN</h2>
          ${['C', 'Q', 'E', 'X'].map((slot) => `<div class="ability-card" data-slot="${slot}"><div class="admin-form-group"><label>Tên Chiêu [${slot}]</label><input name="${slot}_name" required></div><div class="admin-form-group"><label>Mô tả [${slot}]</label><textarea name="${slot}_desc" rows="2"></textarea></div><div class="file-row"><div class="file-input-box"><span>Icon Chiêu [${slot}]</span><input type="file" name="${slot}_icon" accept="image/*"><img class="admin-media-preview admin-media-preview--icon" data-preview="${slot}_icon" alt="Preview icon ${slot}" hidden></div><div class="file-input-box"><span>Video Chiêu [${slot}]</span><input type="file" name="${slot}_video" accept="video/mp4"><video class="admin-media-preview" data-preview="${slot}_video" controls muted hidden></video></div></div></div>`).join('')}
          <button type="submit" class="admin-submit">LƯU HỒ SƠ ĐẶC VỤ</button>
        </form>
      </section>`;
    this.querySelector('[data-toggle-form]').addEventListener('click', () => this.toggleForm());
    this.querySelector('[data-form]').addEventListener('submit', (event) => this.submit(event));
    this.querySelectorAll('input[type="file"]').forEach((input) => input.addEventListener('change', () => this.previewFile(input)));
  }

  previewFile(input) {
    const preview = this.querySelector(`[data-preview="${input.name}"]`);
    const file = input.files[0];
    if (!preview || !file) return;
    if (preview.dataset.objectUrl) URL.revokeObjectURL(preview.dataset.objectUrl);
    preview.dataset.objectUrl = URL.createObjectURL(file);
    preview.src = preview.dataset.objectUrl;
    preview.hidden = false;
  }

  async load() {
    if (!this._h?.onLoadAgents) return;
    try { this._agents = await this._h.onLoadAgents(); this.renderTable(); } catch (error) { this.querySelector('[data-table]').textContent = `Lỗi tải đặc vụ: ${error.message}`; }
  }

  renderTable() {
    const table = this.querySelector('[data-table]');
    table.innerHTML = `<table class="admin-table"><thead><tr><th>Avatar</th><th>Mã ID</th><th>Tên</th><th>Vai trò</th><th>Hot</th><th>Hành động</th></tr></thead><tbody>${(this._agents || []).map((agent) => { const hot = Boolean(agent.isFeatured ?? agent.is_featured); return `<tr><td><img src="${escapeHtml(agent.avatarUrl || agent.avatar_url || '')}" width="38" height="38" alt=""></td><td><strong>${escapeHtml(agent.id)}</strong></td><td>${escapeHtml(agent.name)}</td><td>${escapeHtml(agent.role)}</td><td><button type="button" class="btn-toggle ${hot ? 'active' : 'inactive'}" data-toggle-agent="${escapeHtml(agent.id)}" data-current="${hot}">${hot ? '★ ĐANG HOT' : '☆ BÌNH THƯỜNG'}</button></td><td><div class="action-group"><button type="button" class="btn-action-edit" data-edit-agent="${escapeHtml(agent.id)}">SỬA</button><button type="button" class="btn-action-del" data-delete-agent="${escapeHtml(agent.id)}">XÓA</button></div></td></tr>`; }).join('') || '<tr><td colspan="6">Chưa có dữ liệu đặc vụ.</td></tr>'}</tbody></table>`;
    table.querySelectorAll('[data-toggle-agent]').forEach((button) => button.addEventListener('click', () => this.toggleFeatured(button)));
    table.querySelectorAll('[data-edit-agent]').forEach((button) => button.addEventListener('click', () => this.populate(this._agents.find((item) => String(item.id) === button.dataset.editAgent))));
    table.querySelectorAll('[data-delete-agent]').forEach((button) => button.addEventListener('click', () => this.delete(button.dataset.deleteAgent)));
  }

  async toggleFeatured(button) { const next = button.dataset.current !== 'true'; button.disabled = true; try { await this._h.onToggleAgentFeatured(button.dataset.toggleAgent, next); const target = this._agents.find((item) => String(item.id) === button.dataset.toggleAgent); if (target) { target.isFeatured = next; target.is_featured = next; } this.renderTable(); } catch (error) { alert(error.message); button.disabled = false; } }
  async delete(id) { if (!confirm(`Bạn có chắc chắn muốn xóa đặc vụ "${id}"?`)) return; try { await this._h.onDeleteAgent(id); await this.load(); } catch (error) { alert(error.message); } }
  toggleForm() { const form = this.querySelector('[data-form]'); form.hidden = !form.hidden; this.querySelector('[data-toggle-form]').textContent = form.hidden ? '+ THÊM ĐẶC VỤ MỚI' : '✕ ĐÓNG FORM'; if (!form.hidden) this.reset(); }

  populate(agent) { if (!agent) return; const form = this.querySelector('[data-form]'); form.hidden = false; this.querySelector('[data-toggle-form]').textContent = '✕ ĐÓNG FORM'; this._editingAvatar = agent.avatarUrl || agent.avatar_url || ''; this._editingId = agent.id; this.querySelector('[data-form-title]').textContent = `CHỈNH SỬA ĐẶC VỤ // ${agent.name}`; const values = { id: agent.id, name: agent.name, agent_number: agent.agentNumber || agent.agent_number, role: agent.role || 'Controller', bio: agent.bio || '' }; Object.entries(values).forEach(([name, value]) => { const input = form.elements[name]; if (input) input.value = value || ''; }); form.elements.id.readOnly = true; (agent.abilities || []).forEach((ability) => { const slot = ability.slotKey || ability.slot_key; if (form.elements[`${slot}_name`]) form.elements[`${slot}_name`].value = ability.name || ''; if (form.elements[`${slot}_desc`]) form.elements[`${slot}_desc`].value = ability.description || ''; }); form.scrollIntoView({ behavior: 'smooth' }); }
  reset() { const form = this.querySelector('[data-form]'); form.reset(); form.elements.id.readOnly = false; this._editingId = null; this._editingAvatar = ''; this.querySelector('[data-form-title]').textContent = 'THÊM HỒ SƠ ĐẶC VỤ // AGENT DOSSIER'; }

  async submit(event) { event.preventDefault(); const form = event.currentTarget; const button = form.querySelector('.admin-submit'); button.disabled = true; try { const avatar = form.elements.avatar.files[0]; const abilities = []; for (const slot of ['C', 'Q', 'E', 'X']) { const icon = form.elements[`${slot}_icon`].files[0]; const video = form.elements[`${slot}_video`].files[0]; abilities.push({ slot_key: slot, name: form.elements[`${slot}_name`].value.trim(), description: form.elements[`${slot}_desc`].value.trim(), icon_url: icon ? await this._h.onUpload(icon, 'agent-media') : '', video_url: video ? await this._h.onUpload(video, 'agent-media') : '' }); } const avatarUrl = avatar ? await this._h.onUpload(avatar, 'agent-media') : this._editingAvatar || ''; await this._h.onSaveAgent({ id: form.elements.id.value.trim().toLowerCase(), name: form.elements.name.value.trim(), agent_number: form.elements.agent_number.value.trim(), role: form.elements.role.value, bio: form.elements.bio.value.trim(), avatar_url: avatarUrl, is_featured: false, abilities }); this.reset(); form.hidden = true; this.querySelector('[data-toggle-form]').textContent = '+ THÊM ĐẶC VỤ MỚI'; await this.load(); } catch (error) { alert(error.message); } finally { button.disabled = false; } }
}

customElements.define('admin-agent-panel', AdminAgentPanel);
