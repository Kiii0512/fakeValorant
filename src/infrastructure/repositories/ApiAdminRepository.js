const API_BASE = 'http://localhost:5153/api';

export class ApiAdminRepository {
  async uploadFile(file, bucket = 'agent-media') {
    if (!file) return '';
    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch(`${API_BASE}/admin/upload?bucket=${encodeURIComponent(bucket)}`, {
      method: 'POST',
      body: formData,
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`Upload thất bại: ${errText}`);
    }

    const data = await res.json();
    return data.url || data.Url || '';
  }

  async saveAgent(agentPayload) {
    const res = await fetch(`${API_BASE}/admin/agents`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(agentPayload),
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`Lưu đặc vụ thất bại: ${errText}`);
    }

    return await res.json();
  }

  async saveMap(mapPayload) {
    const res = await fetch(`${API_BASE}/admin/maps`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(mapPayload),
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`Lưu bản đồ thất bại: ${errText}`);
    }

    return await res.json();
  }

  async saveWeapon(weaponPayload) {
    const res = await fetch(`${API_BASE}/admin/weapons`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(weaponPayload),
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`Lưu vũ khí thất bại: ${errText}`);
    }

    return await res.json();
  }
}