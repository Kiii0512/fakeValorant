export class AdminAgentForm extends HTMLElement {
  set handlers({ onUpload, onSaveAgent, onSaveMap, onSaveWeapon }) {
    this._onUpload = onUpload;
    this._onSaveAgent = onSaveAgent;
    this._onSaveMap = onSaveMap;
    this._onSaveWeapon = onSaveWeapon;
    this.render();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <div class="admin-container">
        <div style="display: flex; gap: 12px; margin-bottom: 32px; border-bottom: 1px solid var(--line); padding-bottom: 18px; flex-wrap: wrap;">
          <button type="button" id="tab-agent-btn" class="button button--cyan" style="min-height: 42px; font-size: 11px;">QUẢN LÝ ĐẶC VỤ</button>
          <button type="button" id="tab-map-btn" class="button button--outline" style="min-height: 42px; font-size: 11px;">QUẢN LÝ BẢN ĐỒ</button>
          <button type="button" id="tab-weapon-btn" class="button button--outline" style="min-height: 42px; font-size: 11px;">QUẢN LÝ VŨ KHÍ</button>
        </div>

        <form id="form-agent">
          <h1>BẢNG QUẢN TRỊ // HỒ SƠ ĐẶC VỤ</h1>
          <div class="admin-grid-2">
            <div class="admin-form-group">
              <label for="agent-id">Mã ID Đặc vụ (Ví dụ: harbor, jett)</label>
              <input type="text" id="agent-id" required placeholder="harbor" />
            </div>
            <div class="admin-form-group">
              <label for="agent-name">Tên đặc vụ hiển thị</label>
              <input type="text" id="agent-name" required placeholder="HARBOR" />
            </div>
          </div>

          <div class="admin-grid-2">
            <div class="admin-form-group">
              <label for="agent-number">Số hiệu đặc vụ (Agent Number)</label>
              <input type="text" id="agent-number" required placeholder="20" />
            </div>
            <div class="admin-form-group">
              <label for="agent-role">Vai trò chiến thuật</label>
              <select id="agent-role">
                <option value="Controller">Controller (Kiểm Soát)</option>
                <option value="Duelist">Duelist (Đấu Sĩ)</option>
                <option value="Initiator">Initiator (Tiên Phong)</option>
                <option value="Sentinel">Sentinel (Hộ Vệ)</option>
              </select>
            </div>
          </div>

          <div class="admin-form-group">
            <label for="agent-bio">Tiểu sử đặc vụ (Bio)</label>
            <textarea id="agent-bio" rows="3" placeholder="Nhập bối cảnh tác chiến của đặc vụ..."></textarea>
          </div>

          <div class="admin-form-group">
            <label for="agent-avatar-file">Ảnh đại diện (Avatar Image)</label>
            <input type="file" id="agent-avatar-file" accept="image/*" />
          </div>

          <h2>Bộ 4 Kỹ Năng Tác Chiến</h2>

          ${['C', 'Q', 'E', 'X'].map(slot => `
            <div class="ability-card" data-slot="${slot}">
              <div class="admin-form-group">
                <label for="${slot}_name">Tên Chiêu [${slot}]</label>
                <input type="text" id="${slot}_name" required placeholder="Tên kỹ năng..." />
              </div>
              <div class="admin-form-group">
                <label for="${slot}_desc">Mô tả [${slot}]</label>
                <textarea id="${slot}_desc" rows="2" placeholder="Mô tả kỹ năng..."></textarea>
              </div>
              <div class="file-row">
                <div class="file-input-box">
                  <span>Icon Chiêu [${slot}]</span>
                  <input type="file" id="${slot}_icon" accept="image/*" />
                </div>
                <div class="file-input-box">
                  <span>Video Chiêu [${slot}] (.mp4)</span>
                  <input type="file" id="${slot}_video" accept="video/mp4" />
                </div>
              </div>
            </div>
          `).join('')}

          <button type="submit" id="submit-agent-btn" class="admin-submit">LƯU HỒ SƠ ĐẶC VỤ LÊN HỆ THỐNG</button>
        </form>

        <form id="form-map" style="display: none;">
          <h1>BẢNG QUẢN TRỊ // BẢN ĐỒ CHIẾN TRƯỜNG</h1>
          <div class="admin-grid-2">
            <div class="admin-form-group">
              <label for="map-id">Mã ID Bản đồ (Ví dụ: summit, corrode, haven)</label>
              <input type="text" id="map-id" required placeholder="summit" />
            </div>
            <div class="admin-form-group">
              <label for="map-name">Tên bản đồ</label>
              <input type="text" id="map-name" required placeholder="SUMMIT" />
            </div>
          </div>

          <div class="admin-form-group">
            <label for="map-location">Vị trí địa lý (Location)</label>
            <input type="text" id="map-location" placeholder="Trung Quốc" />
          </div>

          <div class="admin-form-group">
            <label for="map-notes">Giới thiệu / Bối cảnh bản đồ</label>
            <textarea id="map-notes" rows="4" placeholder="Mô tả chi tiết địa hình và tính chất chiến thuật..."></textarea>
          </div>

          <div class="admin-form-group">
            <label style="display: flex; justify-content: space-between; align-items: center;">
              <span>ALBUM ẢNH BẢN ĐỒ (CHỌN TỪNG ẢNH)</span>
              <button type="button" id="add-map-image-btn" style="background: transparent; border: 1px solid var(--cyan); color: var(--cyan); font-family: var(--mono); font-size: 10px; padding: 6px 12px; cursor: pointer; text-transform: uppercase;">
                + THÊM Ô CHỌN ẢNH
              </button>
            </label>
            <div id="map-images-container" style="display: flex; flex-direction: column; gap: 12px; margin-top: 8px;">
              <div class="map-image-row" style="display: flex; gap: 10px; align-items: center; background: var(--panel-light); padding: 10px 14px; border: 1px solid var(--line);">
                <span class="image-index" style="color: var(--cyan); font-family: var(--mono); font-size: 11px; min-width: 60px;">ẢNH #1</span>
                <input type="file" class="single-map-file" accept="image/*" required style="flex: 1;" />
                <button type="button" class="remove-img-btn" style="background: transparent; border: 1px solid rgba(255,100,112,0.4); color: #ff6470; font-family: var(--mono); font-size: 10px; padding: 8px 12px; cursor: pointer;">XÓA</button>
              </div>
            </div>
          </div>

          <button type="submit" id="submit-map-btn" class="admin-submit">LƯU BẢN ĐỒ VÀO HỆ THỐNG</button>
        </form>

        <form id="form-weapon" style="display: none;">
          <h1>BẢNG QUẢN TRỊ // VŨ KHÍ CHIẾN ĐẤU</h1>
          <div class="admin-grid-2">
            <div class="admin-form-group">
              <label for="wp-id">Mã ID Vũ khí (vd: vandal, phantom, classic)</label>
              <input type="text" id="wp-id" required placeholder="phantom" />
            </div>
            <div class="admin-form-group">
              <label for="wp-name">Tên vũ khí hiển thị</label>
              <input type="text" id="wp-name" required placeholder="PHANTOM" />
            </div>
          </div>

          <div class="admin-grid-2">
            <div class="admin-form-group">
              <label for="wp-category">Phân loại vũ khí</label>
              <select id="wp-category">
                <option value="Sidearms">Sidearms (Súng phụ)</option>
                <option value="SMGs">SMGs (Tiểu liên)</option>
                <option value="Shotguns">Shotguns (Súng săn)</option>
                <option value="Rifles" selected>Rifles (Súng trường)</option>
                <option value="Sniper">Sniper (Bắn tỉa)</option>
                <option value="Heavy">Heavy (Súng máy)</option>
                <option value="Melee">Melee (Cận chiến)</option>
              </select>
            </div>
            <div class="admin-form-group">
              <label for="wp-creds">Giá tiền (Credits)</label>
              <input type="number" id="wp-creds" required placeholder="2900" value="2900" />
            </div>
          </div>

          <div class="file-row" style="margin-bottom: 20px;">
            <div class="file-input-box">
              <span>Ảnh súng chính (bắt buộc)</span>
              <input type="file" id="wp-image-file" accept="image/*" required />
            </div>
            <div class="file-input-box">
              <span>Icon Killfeed (không bắt buộc)</span>
              <input type="file" id="wp-killfeed-file" accept="image/*" />
            </div>
          </div>

          <h2>THÔNG SỐ BẮN (PRIMARY FIRE)</h2>
          <div class="admin-grid-2">
            <div class="admin-form-group">
              <label for="wp-firemode">Chế độ bắn (Fire Mode)</label>
              <input type="text" id="wp-firemode" placeholder="Auto" value="Auto" />
            </div>
            <div class="admin-form-group">
              <label for="wp-firerate">Tốc độ bắn (Fire Rate - rds/sec)</label>
              <input type="number" step="0.01" id="wp-firerate" placeholder="11" value="11" />
            </div>
          </div>

          <div class="admin-grid-2">
            <div class="admin-form-group">
              <label for="wp-wallpen">Độ xuyên tường (Wall Penetration)</label>
              <select id="wp-wallpen">
                <option value="Low">Low (Thấp)</option>
                <option value="Medium" selected>Medium (Trung bình)</option>
                <option value="High">High (Cao)</option>
              </select>
            </div>
            <div class="admin-form-group">
              <label for="wp-runspeed">Tốc độ chạy (Run Speed)</label>
              <input type="text" id="wp-runspeed" placeholder="5.4 m/sec" value="5.4 m/sec" />
            </div>
          </div>

          <div class="admin-grid-2">
            <div class="admin-form-group">
              <label for="wp-equipspeed">Tốc độ trang bị (Equip Speed)</label>
              <input type="text" id="wp-equipspeed" placeholder="1 sec (Normal)" value="1 sec (Normal)" />
            </div>
            <div class="admin-form-group">
              <label for="wp-reloadspeed">Tốc độ nạp đạn (Reload Speed)</label>
              <input type="text" id="wp-reloadspeed" placeholder="2.5 sec" value="2.5 sec" />
            </div>
          </div>

          <div class="admin-grid-2">
            <div class="admin-form-group">
              <label for="wp-mag">Băng đạn (Magazine Size)</label>
              <input type="number" id="wp-mag" placeholder="30" value="30" />
            </div>
            <div class="admin-form-group">
              <label for="wp-reserve">Đạn dự trữ (Reserve Ammo)</label>
              <input type="text" id="wp-reserve" placeholder="90 (3 magazines)" value="90 (3 magazines)" />
            </div>
          </div>

          <div class="admin-form-group" style="margin-top: 24px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
              <h2 style="margin: 0; color: var(--cyan); font-size: 16px;">THÔNG SỐ SÁT THƯƠNG (DAMAGE TIERS)</h2>
              <button type="button" id="add-damage-tier-btn" style="background: transparent; border: 1px solid var(--cyan); color: var(--cyan); font-family: var(--mono); font-size: 10px; padding: 6px 14px; cursor: pointer; text-transform: uppercase;">
                + THÊM CỰ LY SÁT THƯƠNG
              </button>
            </div>

            <div id="damage-tiers-container" style="display: flex; flex-direction: column; gap: 14px;">
              <div class="damage-tier-row" style="background: var(--panel-light); border: 1px solid var(--line); padding: 14px; border-radius: 4px;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                  <span class="tier-index" style="color: var(--cyan); font-size: 11px; font-weight: bold; font-family: var(--mono);">CỰ LY #1</span>
                  <button type="button" class="remove-tier-btn" style="background: transparent; border: 1px solid rgba(255,100,112,0.4); color: #ff6470; font-family: var(--mono); font-size: 10px; padding: 4px 8px; cursor: pointer;">XÓA</button>
                </div>
                <div class="admin-form-group" style="margin-bottom: 10px;">
                  <label>Khoảng cách (vd: 0 - 20m, 20 - 50m)</label>
                  <input type="text" class="tier-range" placeholder="0 - 20m" value="0 - 20m" required />
                </div>
                <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px;">
                  <div>
                    <label style="font-size: 10px;">Head</label>
                    <input type="number" class="tier-head" placeholder="156" value="156" required />
                  </div>
                  <div>
                    <label style="font-size: 10px;">Body</label>
                    <input type="number" class="tier-body" placeholder="39" value="39" required />
                  </div>
                  <div>
                    <label style="font-size: 10px;">Leg</label>
                    <input type="number" class="tier-leg" placeholder="33" value="33" required />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <h2>CHẾ ĐỘ BẮN PHỤ (ALT FIRE)</h2>
          <div class="admin-grid-2">
            <div class="admin-form-group">
              <label for="wp-altfunc">Chức năng phụ (Function)</label>
              <input type="text" id="wp-altfunc" placeholder="Aim down sights" value="Aim down sights" />
            </div>
            <div class="admin-form-group">
              <label for="wp-altzoom">Độ phóng đại (Zoom)</label>
              <input type="text" id="wp-altzoom" placeholder="1.25x" value="1.25x" />
            </div>
          </div>

          <button type="submit" id="submit-weapon-btn" class="admin-submit">LƯU VŨ KHÍ VÀO HỆ THỐNG</button>
        </form>

        <div id="status-msg" class="admin-message" style="display: none;"></div>
      </div>
    `;

    const tabAgentBtn = this.querySelector('#tab-agent-btn');
    const tabMapBtn = this.querySelector('#tab-map-btn');
    const tabWeaponBtn = this.querySelector('#tab-weapon-btn');
    const formAgent = this.querySelector('#form-agent');
    const formMap = this.querySelector('#form-map');
    const formWeapon = this.querySelector('#form-weapon');
    const statusMsg = this.querySelector('#status-msg');

    const switchTab = (activeBtn, activeForm) => {
      [tabAgentBtn, tabMapBtn, tabWeaponBtn].forEach(b => b.className = 'button button--outline');
      [formAgent, formMap, formWeapon].forEach(f => f.style.display = 'none');
      activeBtn.className = 'button button--cyan';
      activeForm.style.display = 'block';
      statusMsg.style.display = 'none';
    };

    tabAgentBtn.onclick = () => switchTab(tabAgentBtn, formAgent);
    tabMapBtn.onclick = () => switchTab(tabMapBtn, formMap);
    tabWeaponBtn.onclick = () => switchTab(tabWeaponBtn, formWeapon);

    const mapContainer = this.querySelector('#map-images-container');
    const addMapImgBtn = this.querySelector('#add-map-image-btn');
    if (addMapImgBtn) {
      addMapImgBtn.onclick = () => {
        const count = mapContainer.querySelectorAll('.map-image-row').length + 1;
        const row = document.createElement('div');
        row.className = 'map-image-row';
        row.style.cssText = 'display: flex; gap: 10px; align-items: center; background: var(--panel-light); padding: 10px 14px; border: 1px solid var(--line);';
        row.innerHTML = `
          <span class="image-index" style="color: var(--cyan); font-family: var(--mono); font-size: 11px; min-width: 60px;">ẢNH #${count}</span>
          <input type="file" class="single-map-file" accept="image/*" required style="flex: 1;" />
          <button type="button" class="remove-img-btn" style="background: transparent; border: 1px solid rgba(255,100,112,0.4); color: #ff6470; font-family: var(--mono); font-size: 10px; padding: 8px 12px; cursor: pointer;">XÓA</button>
        `;
        mapContainer.appendChild(row);
      };

      mapContainer.addEventListener('click', (e) => {
        const removeBtn = e.target.closest('.remove-img-btn');
        if (removeBtn) {
          if (mapContainer.querySelectorAll('.map-image-row').length <= 1) {
            alert('Bản đồ cần ít nhất 1 ảnh');
            return;
          }
          removeBtn.closest('.map-image-row').remove();
          mapContainer.querySelectorAll('.map-image-row').forEach((r, idx) => {
            const span = r.querySelector('.image-index');
            if (span) span.textContent = `ẢNH #${idx + 1}`;
          });
        }
      });
    }

    const tierContainer = this.querySelector('#damage-tiers-container');
    const addTierBtn = this.querySelector('#add-damage-tier-btn');

    if (addTierBtn) {
      addTierBtn.onclick = () => {
        const count = tierContainer.querySelectorAll('.damage-tier-row').length + 1;
        const row = document.createElement('div');
        row.className = 'damage-tier-row';
        row.style.cssText = 'background: var(--panel-light); border: 1px solid var(--line); padding: 14px; border-radius: 4px;';
        row.innerHTML = `
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
            <span class="tier-index" style="color: var(--cyan); font-size: 11px; font-weight: bold; font-family: var(--mono);">CỰ LY #${count}</span>
            <button type="button" class="remove-tier-btn" style="background: transparent; border: 1px solid rgba(255,100,112,0.4); color: #ff6470; font-family: var(--mono); font-size: 10px; padding: 4px 8px; cursor: pointer;">XÓA</button>
          </div>
          <div class="admin-form-group" style="margin-bottom: 10px;">
            <label>Khoảng cách (vd: 20 - 50m)</label>
            <input type="text" class="tier-range" placeholder="20 - 50m" value="20 - 50m" required />
          </div>
          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px;">
            <div>
              <label style="font-size: 10px;">Head</label>
              <input type="number" class="tier-head" placeholder="140" value="140" required />
            </div>
            <div>
              <label style="font-size: 10px;">Body</label>
              <input type="number" class="tier-body" placeholder="35" value="35" required />
            </div>
            <div>
              <label style="font-size: 10px;">Leg</label>
              <input type="number" class="tier-leg" placeholder="29" value="29" required />
            </div>
          </div>
        `;
        tierContainer.appendChild(row);
      };

      tierContainer.addEventListener('click', (e) => {
        const removeBtn = e.target.closest('.remove-tier-btn');
        if (removeBtn) {
          if (tierContainer.querySelectorAll('.damage-tier-row').length <= 1) {
            alert('Vũ khí cần ít nhất 1 mốc cự ly sát thương');
            return;
          }
          removeBtn.closest('.damage-tier-row').remove();
          tierContainer.querySelectorAll('.damage-tier-row').forEach((r, idx) => {
            const span = r.querySelector('.tier-index');
            if (span) span.textContent = `CỰ LY #${idx + 1}`;
          });
        }
      });
    }

    formAgent.onsubmit = async (e) => {
      e.preventDefault();
      const btn = this.querySelector('#submit-agent-btn');
      btn.disabled = true;
      btn.textContent = 'ĐANG TẢI DỮ LIỆU ĐẶC VỤ...';
      statusMsg.style.display = 'none';

      try {
        const avatarFile = this.querySelector('#agent-avatar-file').files[0];
        const avatarUrl = avatarFile ? await this._onUpload(avatarFile) : '';

        const abilitiesPayload = [];
        for (const slot of ['C', 'Q', 'E', 'X']) {
          const iconFile = this.querySelector(`#${slot}_icon`).files[0];
          const videoFile = this.querySelector(`#${slot}_video`).files[0];

          const [iconUrl, videoUrl] = await Promise.all([
            iconFile ? this._onUpload(iconFile) : Promise.resolve(''),
            videoFile ? this._onUpload(videoFile) : Promise.resolve('')
          ]);

          abilitiesPayload.push({
            slot_key: slot,
            name: this.querySelector(`#${slot}_name`).value.trim(),
            description: this.querySelector(`#${slot}_desc`).value.trim(),
            icon_url: iconUrl,
            video_url: videoUrl
          });
        }

        const agentData = {
          id: this.querySelector('#agent-id').value.trim().toLowerCase(),
          name: this.querySelector('#agent-name').value.trim(),
          agent_number: this.querySelector('#agent-number').value.trim(),
          role: this.querySelector('#agent-role').value,
          bio: this.querySelector('#agent-bio').value.trim(),
          avatar_url: avatarUrl,
          is_featured: true,
          abilities: abilitiesPayload
        };

        await this._onSaveAgent(agentData);
        statusMsg.className = 'admin-message msg-success';
        statusMsg.textContent = 'Lưu đặc vụ thành công! Đang chuyển trang...';
        statusMsg.style.display = 'block';
        setTimeout(() => window.location.href = `agent-detail.html?id=${agentData.id}`, 1000);
      } catch (err) {
        statusMsg.className = 'admin-message msg-error';
        statusMsg.textContent = err.message;
        statusMsg.style.display = 'block';
        btn.disabled = false;
        btn.textContent = 'LƯU HỒ SƠ ĐẶC VỤ LÊN HỆ THỐNG';
      }
    };

    formMap.onsubmit = async (e) => {
      e.preventDefault();
      const btn = this.querySelector('#submit-map-btn');
      const files = Array.from(mapContainer.querySelectorAll('.single-map-file')).map(i => i.files[0]).filter(Boolean);

      if (files.length === 0) {
        alert('Vui lòng chọn ít nhất 1 ảnh bản đồ');
        return;
      }

      btn.disabled = true;
      btn.textContent = `ĐANG UPLOAD 0/${files.length} ẢNH LÊN SUPABASE...`;
      statusMsg.style.display = 'none';

      try {
        const uploadedUrls = [];
        for (let i = 0; i < files.length; i++) {
          btn.textContent = `ĐANG UPLOAD ẢNH ${i + 1}/${files.length}...`;
          const url = await this._onUpload(files[i]);
          if (url) uploadedUrls.push(url);
        }

        const mapData = {
          id: this.querySelector('#map-id').value.trim().toLowerCase(),
          name: this.querySelector('#map-name').value.trim(),
          location: this.querySelector('#map-location').value.trim(),
          notes: this.querySelector('#map-notes').value.trim(),
          image_url: uploadedUrls[0] || '',
          is_featured: true,
          gallery: uploadedUrls
        };

        btn.textContent = 'ĐANG LƯU BẢN ĐỒ VÀO DATABASE...';
        await this._onSaveMap(mapData);

        statusMsg.className = 'admin-message msg-success';
        statusMsg.textContent = 'Lưu bản đồ thành công! Đang chuyển hướng sang trang Maps...';
        statusMsg.style.display = 'block';
        setTimeout(() => window.location.href = 'maps.html', 1000);
      } catch (err) {
        statusMsg.className = 'admin-message msg-error';
        statusMsg.textContent = err.message;
        statusMsg.style.display = 'block';
        btn.disabled = false;
        btn.textContent = 'LƯU BẢN ĐỒ VÀO HỆ THỐNG';
      }
    };

    formWeapon.onsubmit = async (e) => {
      e.preventDefault();
      const btn = this.querySelector('#submit-weapon-btn');
      btn.disabled = true;
      btn.textContent = 'ĐANG TẢI LÊN TÀI NGUYÊN VŨ KHÍ...';
      statusMsg.style.display = 'none';

      try {
        const imageFile = this.querySelector('#wp-image-file').files[0];
        const killfeedFile = this.querySelector('#wp-killfeed-file').files[0];

        if (!imageFile) {
          alert('Vui lòng chọn ảnh súng chính');
          btn.disabled = false;
          btn.textContent = 'LƯU VŨ KHÍ VÀO HỆ THỐNG';
          return;
        }

        const imageUrl = await this._onUpload(imageFile);
        let killfeedUrl = '';
        if (killfeedFile) {
          btn.textContent = 'ĐANG UPLOAD KILLFEED ICON...';
          killfeedUrl = await this._onUpload(killfeedFile);
        }

        const tierRows = Array.from(tierContainer.querySelectorAll('.damage-tier-row'));
        const damageTiers = tierRows.map(row => ({
          range: row.querySelector('.tier-range').value.trim(),
          head: parseInt(row.querySelector('.tier-head').value, 10) || 0,
          body: parseInt(row.querySelector('.tier-body').value, 10) || 0,
          leg: parseInt(row.querySelector('.tier-leg').value, 10) || 0
        }));

        const weaponData = {
          id: this.querySelector('#wp-id').value.trim().toLowerCase(),
          name: this.querySelector('#wp-name').value.trim().toUpperCase(),
          category: this.querySelector('#wp-category').value,
          creds: parseInt(this.querySelector('#wp-creds').value, 10) || 0,
          image_url: imageUrl,
          killfeed_icon: killfeedUrl,
          wall_penetration: this.querySelector('#wp-wallpen').value,
          fire_mode: this.querySelector('#wp-firemode').value.trim(),
          fire_rate: parseFloat(this.querySelector('#wp-firerate').value) || 0,
          run_speed: this.querySelector('#wp-runspeed').value.trim(),
          equip_speed: this.querySelector('#wp-equipspeed').value.trim(),
          reload_speed: this.querySelector('#wp-reloadspeed').value.trim(),
          magazine_size: parseInt(this.querySelector('#wp-mag').value, 10) || 0,
          reserve_ammo: this.querySelector('#wp-reserve').value.trim(),
          damage_tiers: damageTiers,
          alt_fire_function: this.querySelector('#wp-altfunc').value.trim(),
          alt_fire_zoom: this.querySelector('#wp-altzoom').value.trim(),
          is_featured: true
        };

        btn.textContent = 'ĐANG LƯU VŨ KHÍ VÀO DATABASE...';
        await this._onSaveWeapon(weaponData);

        statusMsg.className = 'admin-message msg-success';
        statusMsg.textContent = 'Lưu vũ khí thành công! Đang chuyển sang trang Arsenal...';
        statusMsg.style.display = 'block';
        setTimeout(() => window.location.href = 'arsenal.html', 1000);
      } catch (err) {
        statusMsg.className = 'admin-message msg-error';
        statusMsg.textContent = err.message;
        statusMsg.style.display = 'block';
        btn.disabled = false;
        btn.textContent = 'LƯU VŨ KHÍ VÀO HỆ THỐNG';
      }
    };
  }
}

customElements.define('admin-agent-form', AdminAgentForm);