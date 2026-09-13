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

  // AGENTS
  async getAgents() {
    const res = await fetch(`${API_BASE}/agents`);
    if (!res.ok) return [];
    return await res.json();
  }

  async saveAgent(agentPayload) {
    const res = await fetch(`${API_BASE}/admin/agents`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(agentPayload),
    });
    if (!res.ok) throw new Error(await res.text());
    return await res.json();
  }

  async deleteAgent(id) {
    const res = await fetch(`${API_BASE}/admin/agents/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Xóa đặc vụ thất bại');
    return await res.json();
  }

async toggleAgentFeatured(id, isFeatured) {
    const res = await fetch(`${API_BASE}/admin/agents/${encodeURIComponent(id)}/toggle-featured`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ is_featured: isFeatured }),
    });
    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`[${res.status}] Cập nhật trạng thái Hot thất bại: ${errText}`);
    }
    return await res.json();
  }

  async toggleMapRotation(id, isFeatured) {
    const res = await fetch(`${API_BASE}/admin/maps/${encodeURIComponent(id)}/toggle-rotation`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ is_featured: isFeatured }),
    });
    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`[${res.status}] Cập nhật xoay tua bản đồ thất bại: ${errText}`);
    }
    return await res.json();
  }

  // MAPS
  async getMaps() {
    const res = await fetch(`${API_BASE}/maps`);
    if (!res.ok) return [];
    return await res.json();
  }

  async saveMap(mapPayload) {
    const res = await fetch(`${API_BASE}/admin/maps`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(mapPayload),
    });
    if (!res.ok) throw new Error(await res.text());
    return await res.json();
  }

  async deleteMap(id) {
    const res = await fetch(`${API_BASE}/admin/maps/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Xóa bản đồ thất bại');
    return await res.json();
  }

  async toggleMapRotation(id, isFeatured) {
    const res = await fetch(`${API_BASE}/admin/maps/${id}/toggle-rotation`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ is_featured: isFeatured }),
    });
    if (!res.ok) throw new Error('Cập nhật xoay tua bản đồ thất bại');
    return await res.json();
  }

  // WEAPONS
  async getWeapons() {
    const res = await fetch(`${API_BASE}/weapons`);
    if (!res.ok) return [];
    return await res.json();
  }

  async saveWeapon(weaponPayload) {
    const res = await fetch(`${API_BASE}/admin/weapons`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(weaponPayload),
    });
    if (!res.ok) throw new Error(await res.text());
    return await res.json();
  }

  async deleteWeapon(id) {
    const res = await fetch(`${API_BASE}/admin/weapons/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Xóa vũ khí thất bại');
    return await res.json();
  }
}