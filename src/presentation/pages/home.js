import { ApiGameRepository } from '../../infrastructure/repositories/ApiGameRepository.js';
import '../components/NexusNavbar.js';
import '../components/HeroSection.js';
import '../components/AgentSection.js';
import '../components/WeaponSection.js';
import '../components/MapSection.js';
import '../components/NexusFooter.js';
import './LandingPage.js';

const repo = new ApiGameRepository();

// Bốc ngẫu nhiên N phần tử khi pool lớn hơn N
const pickRandom = (array, n = 3) => {
  if (!array || array.length <= n) return [...(array || [])];
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, n);
};

const applyHeroVideo = async () => {
  try {
    const res = await fetch('http://localhost:5153/api/admin/settings/hero-video');
    let videoUrl = 'https://assets.contentstack.io/v3/assets/blt0eb2a2986bbfbe7a/blt8efbb7995bc20c56/649cd9b52a55aa13e9a595f5/VALORANT_EPISODE_7_Cinematic_Final_Render_V4_h264.mp4';
    if (res.ok) {
      const data = await res.json();
      if (data.url || data.Url) videoUrl = data.url || data.Url;
    }

    const heroSection = document.querySelector('hero-section');
    if (heroSection && typeof heroSection.setVideoUrl === 'function') {
      heroSection.setVideoUrl(videoUrl);
    }
  } catch (err) {
    console.error('Lỗi khi nạp video nền:', err);
  }
};

const initHomePage = async () => {
  const landingPage = document.querySelector('landing-page');
  if (!landingPage) return;

  try {
    // 1. Tải toàn bộ dữ liệu từ Database
    const [allAgents, allMaps, allWeapons, featuredArticles] = await Promise.all([
      repo.getAgents(),
      repo.getMaps(),
      repo.getWeapons(),
      fetch('http://localhost:5153/api/articles/featured').then(r => r.ok ? r.json() : []).catch(() => [])
    ]);

    // Lọc CHÍNH XÁC những mục có cờ nổi bật (isFeatured == true)
    const hotAgents = (allAgents || []).filter(a => a.isFeatured);
    const rotationMaps = (allMaps || []).filter(m => m.isFeatured);
    const featuredWeapons = (allWeapons || []).filter(w => w.isFeatured);

    const updateRoster = () => {
      // Chỉ lấy đúng những ai được đánh dấu nổi bật
      // Nếu có > 3 thì random 3 mỗi 30s; nếu <= 3 thì hiển thị toàn bộ danh sách đã chọn
      // Trường hợp admin chưa tick ai thì mới fallback hiển thị tạm toàn bộ
      const activeAgents = hotAgents.length > 0 ? hotAgents : allAgents;
      const activeMaps = rotationMaps.length > 0 ? rotationMaps : allMaps;
      const activeWeapons = featuredWeapons.length > 0 ? featuredWeapons : allWeapons;

      landingPage.data = {
        featuredAgents: pickRandom(activeAgents, 3),
        featuredMaps: pickRandom(activeMaps, 3),
        featuredWeapons: pickRandom(activeWeapons, 3),
        featuredArticles: (featuredArticles || []).slice(0, 3)
      };

      applyHeroVideo();
    };

    // Render lần đầu
    updateRoster();

    // 2. Kích hoạt xoay tua 30 giây (chỉ có tác dụng đảo vị trí/chọn ngẫu nhiên khi danh sách có > 3 mục)
    setInterval(updateRoster, 30000);

  } catch (err) {
    console.error('Lỗi khởi tạo dữ liệu trang chủ:', err);
  }
};

initHomePage();