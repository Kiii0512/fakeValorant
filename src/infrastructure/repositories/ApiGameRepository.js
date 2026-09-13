import { AgentEntity, MapEntity, WeaponEntity } from '../../domain/entities/GameEntities.js';
import { ArticleEntity } from '../../domain/entities/ArticleEntity.js';
import { IGameRepository } from '../../domain/repositories/IGameRepository.js';

const API_BASE = 'https://fakevalorant-backend.onrender.com/api';
const normalizeRole = (role = '') => {
  const r = role.toLowerCase();
  if (r.includes('kiểm soát') || r.includes('controller')) return 'Controller';
  if (r.includes('đấu sĩ') || r.includes('duelist')) return 'Duelist';
  if (r.includes('tiên phong') || r.includes('initiator')) return 'Initiator';
  if (r.includes('hộ vệ') || r.includes('sentinel')) return 'Sentinel';
  return role || 'Controller';
};

export class ApiGameRepository extends IGameRepository {
  async getAgents() {
    try {
      const res = await fetch(`${API_BASE}/agents`);
      if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
      const data = await res.json();

return data.map((item) => {
        const rawAbilities = item.abilities || [];
        
        // Lưu trữ cả slot, tên và link icon chiêu thức
        const abilities = rawAbilities.map((ab) => ({
          slotKey: ab.slot_key || ab.slotKey || 'C',
          name: ab.name || '',
          iconUrl: ab.icon_url || ab.iconUrl || '',
          description: ab.description || ''
        }));

        const abilityDetails = {};
        const abilityVideos = {};
        rawAbilities.forEach((ab) => {
          const key = ab.slot_key || ab.slotKey;
          abilityDetails[key] = ab.description;
          if (ab.video_url || ab.videoUrl) {
            abilityVideos[key] = ab.video_url || ab.videoUrl;
          }
        });

return new AgentEntity({
          id: item.id,
          codename: item.name,
          agentNumber: item.agent_number || item.agentNumber || item.number || '',
          role: normalizeRole(item.role),
          bio: item.bio,
          description: item.bio ? (item.bio.slice(0, 75) + '...') : '',
          avatarUrl: item.avatarUrl || item.avatar_url || '',
          abilities: abilities,
          abilityDetails: abilityDetails,
          isFeatured: Boolean(item.isFeatured ?? item.is_featured ?? false)
        });
      });
    } catch (error) {
      console.error('ApiGameRepository.getAgents failed:', error);
      return [];
    }
  }

  async getWeapons() {
    try {
      const res = await fetch(`${API_BASE}/weapons`);
      if (!res.ok) return [];
      const data = await res.json();
      return data.map((w) => {
        let rawTiers = w.damage_tiers ?? w.damageTiers ?? w.DamageTiers ?? [];
        if (typeof rawTiers === 'string') {
          try {
            rawTiers = JSON.parse(rawTiers);
          } catch {
            rawTiers = [];
          }
        }

        return new WeaponEntity({
          id: w.id || w.Id,
          name: w.name || w.Name,
          category: w.category || w.Category,
          cost: w.creds ?? w.Creds ?? 0,
          imageUrl: w.image_url || w.imageUrl || w.ImageUrl,
          killfeedIcon: w.killfeed_icon || w.killfeedIcon || w.KillfeedIcon,
          wallPenetration: w.wall_penetration || w.wallPenetration || w.WallPenetration,
          fireMode: w.fire_mode || w.fireMode || w.FireMode,
          fireRate: w.fire_rate ?? w.fireRate ?? w.FireRate ?? 0,
          runSpeed: w.run_speed || w.runSpeed || w.RunSpeed,
          equipSpeed: w.equip_speed || w.equipSpeed || w.EquipSpeed,
          reloadSpeed: w.reload_speed || w.reloadSpeed || w.ReloadSpeed,
          magazineSize: w.magazine_size ?? w.magazineSize ?? w.MagazineSize ?? 0,
          reserveAmmo: w.reserve_ammo || w.reserveAmmo || w.ReserveAmmo,
          damageRange: w.damage_range || w.damageRange || w.DamageRange,
          damageHead: w.damage_head ?? w.damageHead ?? w.DamageHead ?? 0,
          damageBody: w.damage_body ?? w.damageBody ?? w.DamageBody ?? 0,
          damageLeg: w.damage_leg ?? w.damageLeg ?? w.DamageLeg ?? 0,
          damageTiers: rawTiers,
          altFireFunction: w.alt_fire_function || w.altFireFunction || w.AltFireFunction,
          altFireZoom: w.alt_fire_zoom || w.altFireZoom || w.AltFireZoom,
          isFeatured: Boolean(w.is_featured ?? w.isFeatured ?? false)
        });
      });
    } catch (error) {
      console.error('ApiGameRepository.getWeapons failed:', error);
      return [];
    }
  }

  async getMaps() {
    try {
      const res = await fetch(`${API_BASE}/maps`);
      if (!res.ok) return [];
      const data = await res.json();
      return data.map((m) => new MapEntity({
        id: m.id,
        name: m.name,
        location: m.location,
        coordinates: m.coordinates,
        imageUrl: m.imageUrl || m.image_url,
        description: m.notes,
        isFeatured: Boolean(m.isFeatured ?? m.is_featured ?? false),
        gallery: m.gallery || (m.imageUrl || m.image_url ? [m.imageUrl || m.image_url] : [])
      }));
    } catch (error) {
      console.error('ApiGameRepository.getMaps failed:', error);
      return [];
    }
  }

  async getArticles() {
    try {
      const res = await fetch(`${API_BASE}/articles`);
      if (!res.ok) return [];
      const data = await res.json();
      return Array.isArray(data) ? data.map((article) => new ArticleEntity({
        id: article.id,
        title: article.title,
        subtitle: article.subtitle,
        author: article.author,
        mainImageUrl: article.mainImageUrl || article.main_image_url,
        subImageUrl: article.subImageUrl || article.sub_image_url,
        content: article.content,
        isFeatured: Boolean(article.isFeatured ?? article.is_featured ?? false),
        publishedAt: article.publishedAt || article.published_at
      })) : [];
    } catch (error) {
      console.error('ApiGameRepository.getArticles failed:', error);
      return [];
    }
  }

  async getArticleById(id) {
    try {
      const res = await fetch(`${API_BASE}/articles/${encodeURIComponent(id)}`);
      if (!res.ok) return null;
      const article = await res.json();
      return new ArticleEntity({
        id: article.id,
        title: article.title,
        subtitle: article.subtitle,
        author: article.author,
        mainImageUrl: article.mainImageUrl || article.main_image_url,
        subImageUrl: article.subImageUrl || article.sub_image_url,
        content: article.content,
        isFeatured: Boolean(article.isFeatured ?? article.is_featured ?? false),
        publishedAt: article.publishedAt || article.published_at
      });
    } catch (error) {
      console.error('ApiGameRepository.getArticleById failed:', error);
      return null;
    }
  }

  async createArticle(articleData) {
    const res = await fetch(`${API_BASE}/articles`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(articleData)
    });
    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Đăng bài viết thất bại: ${errorText}`);
    }
    const article = await res.json();
    return new ArticleEntity({
      id: article.id,
      title: article.title,
      subtitle: article.subtitle,
      author: article.author,
      mainImageUrl: article.mainImageUrl || article.main_image_url,
      subImageUrl: article.subImageUrl || article.sub_image_url,
      content: article.content,
      isFeatured: Boolean(article.isFeatured ?? article.is_featured ?? false),
      publishedAt: article.publishedAt || article.published_at
    });
  }

  async updateArticle(id, data) {
    const res = await fetch(`${API_BASE}/articles/${encodeURIComponent(id)}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.text();
      throw new Error(`Cập nhật bài viết thất bại: ${err}`);
    }
    return await res.json();
  }

  async deleteArticle(id) {
    const res = await fetch(`${API_BASE}/articles/${encodeURIComponent(id)}`, { 
      method: 'DELETE' 
    });
    if (!res.ok) throw new Error('Xóa bài viết thất bại');
    return await res.json();
  }

  async toggleArticleFeatured(id, isFeatured) {
    const res = await fetch(`${API_BASE}/articles/${encodeURIComponent(id)}/toggle-featured`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        is_featured: Boolean(isFeatured), 
        isFeatured: Boolean(isFeatured) 
      }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({ message: 'Thao tác thất bại' }));
      throw new Error(err.message || `Lỗi server (${res.status})`);
    }
    return await res.json();
  }

  async getEntityById(type, id) {
    if (type === 'agents') {
      const res = await fetch(`${API_BASE}/agents/${id}`);
      if (!res.ok) return null;
      return await res.json();
    }
    return null;
  }
}