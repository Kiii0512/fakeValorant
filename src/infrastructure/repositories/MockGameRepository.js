import { AgentEntity, MapEntity, WeaponEntity } from '../../domain/entities/GameEntities.js';
import { ArticleEntity } from '../../domain/entities/ArticleEntity.js';
import { IGameRepository } from '../../domain/repositories/IGameRepository.js';

const agentImage = (id) => `https://media.valorant-api.com/agents/${id}/displayicon.png`;
const mapImage = (id) => `https://media.valorant-api.com/maps/${id}/listviewicon.png`;

export class MockGameRepository extends IGameRepository {
  #agents = [
    new AgentEntity({
      id: 'jett', codename: 'Jett', role: 'Duelist',
      bio: 'Đến từ Hàn Quốc, Jett là đấu sĩ nhanh nhẹn tạo khoảng trống và rời giao tranh trước khi đối thủ kịp phản ứng.', isFeatured: true,
      description: 'Đấu sĩ cơ động, chuyên mở giao tranh và chiếm vị trí cao.', avatarUrl: agentImage('add6443a-41bd-e414-f6ad-e58d267f4e95'),
      abilities: [['C', 'Cloudburst'], ['Q', 'Updraft'], ['E', 'Tailwind'], ['X', 'Blade Storm']],
      abilityDetails: { C: 'Ném một đám mây che tầm nhìn và bẻ hướng khi đang bay.', Q: 'Đẩy Jett lên không trung trong chớp mắt.', E: 'Lướt nhanh theo hướng đang di chuyển.', X: 'Trang bị dao ném chính xác, hồi lại khi hạ gục mục tiêu.' },
    }),
    new AgentEntity({
      id: 'phoenix', codename: 'Phoenix', role: 'Duelist',
      bio: 'Phoenix chiến đấu bằng ngọn lửa của chính mình, tự hồi phục và tái xuất từ những pha mạo hiểm.', isFeatured: true,
      description: 'Đấu sĩ tự chủ, dùng lửa để chia cắt và tái giao tranh.', avatarUrl: agentImage('eb93336a-449b-9c1b-0a54-a891f7921d69'),
      abilities: [['C', 'Blaze'], ['Q', 'Curveball'], ['E', 'Hot Hands'], ['X', 'Run It Back']],
      abilityDetails: { C: 'Dựng tường lửa che tầm nhìn và gây sát thương.', Q: 'Ném quả cầu lửa lóe sáng khi va chạm.', E: 'Tạo vùng lửa gây sát thương và hồi máu.', X: 'Đánh dấu vị trí và trở về đó khi hết thời gian.' },
    }),
    new AgentEntity({
      id: 'omen', codename: 'Omen', role: 'Controller',
      bio: 'Omen là bóng ma của ký ức, săn đuổi trong bóng tối và làm mù đối thủ bằng những đợt khói xuyên bản đồ.', isFeatured: true,
      description: 'Controller kiểm soát tầm nhìn và gây áp lực từ mọi góc độ.', avatarUrl: agentImage('8e253930-4c05-31dd-1b6c-968525494517'),
      abilities: [['C', 'Shrouded Step'], ['Q', 'Paranoia'], ['E', 'Dark Cover'], ['X', 'From the Shadows']],
      abilityDetails: { C: 'Dịch chuyển tức thời đến một vị trí đã chọn.', Q: 'Phóng bóng ma làm giảm tầm nhìn và âm thanh.', E: 'Triển khai quả cầu khói che tầm nhìn.', X: 'Dịch chuyển đến bất kỳ đâu và có thể quay về.' },
    }),
    new AgentEntity({ id: 'sova', codename: 'Sova', role: 'Initiator', bio: 'Sova truy dấu mục tiêu bằng công nghệ tối tân và sự kiên nhẫn của một thợ săn.', description: 'Initiator thu thập thông tin và ép đối thủ lộ vị trí.', avatarUrl: agentImage('ded3520f-4264-bfed-7fbe-7aa0b7a2e2a0'), abilities: [['C', 'Owl Drone'], ['Q', 'Shock Bolt'], ['E', 'Recon Bolt'], ['X', 'Hunter’s Fury']], abilityDetails: { C: 'Điều khiển drone bay để đánh dấu kẻ địch.', Q: 'Bắn mũi tên nổ gây sát thương vùng.', E: 'Mũi tên trinh sát quét vị trí địch.', X: 'Bắn xuyên bản đồ và làm lộ vị trí.' } }),
    new AgentEntity({ id: 'sage', codename: 'Sage', role: 'Sentinel', bio: 'Sage tạo vùng an toàn cho đồng đội và kéo người đã ngã xuống trở lại round đấu.', description: 'Sentinel phòng thủ, hồi phục và khóa chặt tuyến tiến công.', avatarUrl: agentImage('569fdd95-4d10-43ab-ca70-79becc8f8c78'), abilities: [['C', 'Barrier Orb'], ['Q', 'Slow Orb'], ['E', 'Healing Orb'], ['X', 'Resurrection']], abilityDetails: { C: 'Dựng tường chắn các lối vào quan trọng.', Q: 'Tạo vùng làm chậm mọi đơn vị đi qua.', E: 'Hồi máu cho bản thân hoặc đồng đội.', X: 'Hồi sinh một đồng đội đã bị hạ.' } }),
    new AgentEntity({ id: 'kayo', codename: 'KAY/O', role: 'Initiator', bio: 'KAY/O là cỗ máy chiến đấu được chế tạo để vô hiệu hóa năng lực của Radiant.', description: 'Initiator mở giao tranh bằng cách triệt tiêu kỹ năng.', avatarUrl: agentImage('601db64d-43ce-be57-2a40-4abd24953621'), abilities: [['C', 'FRAG/ment'], ['Q', 'FLASH/drive'], ['E', 'ZERO/point'], ['X', 'NULL/cmd']], abilityDetails: { C: 'Ném mảnh lựu đạn nổ nhiều lần theo nhịp.', Q: 'Ném lựu đạn flash với hai chế độ ném.', E: 'Dao xung điện làm lộ và khóa kỹ năng.', X: 'Quá tải năng lượng, có thể được hồi sinh.' } }),
    new AgentEntity({ id: 'killjoy', codename: 'Killjoy', role: 'Sentinel', bio: 'Killjoy bảo vệ lãnh thổ bằng những phát minh cơ khí thông minh và cực kỳ khó chịu.', description: 'Sentinel kiểm soát khu vực bằng thiết bị tự động.', avatarUrl: agentImage('4311d9c9-3c83-4502-bc95-5c6f6f5f9f9a'), abilities: [['C', 'Nanoswarm'], ['Q', 'Alarmbot'], ['E', 'Turret'], ['X', 'Lockdown']], abilityDetails: { C: 'Ném lựu đạn tạo vùng nano gây sát thương.', Q: 'Đặt bot săn mục tiêu và gây Vulnerable.', E: 'Triển khai turret tự động bắn kẻ địch.', X: 'Thiết bị khống chế mọi kẻ địch trong vùng.' } }),
  ];

  #weapons = [
    new WeaponEntity({ id: 'vandal', name: 'Vandal', category: 'Rifle', cost: 2900, magazineSize: 25, fireRate: 9.75, damage: { head: 160, body: 40, legs: 34 }, range: '0-50 m', bulletSpeed: '9,000 m/s', isFeatured: true }),
    new WeaponEntity({ id: 'phantom', name: 'Phantom', category: 'Rifle', cost: 2900, magazineSize: 30, fireRate: 11, damage: { head: 156, body: 39, legs: 33 }, range: '0-30 m', bulletSpeed: '9,000 m/s', isFeatured: true }),
    new WeaponEntity({ id: 'operator', name: 'Operator', category: 'Sniper', cost: 4700, magazineSize: 5, fireRate: 0.6, damage: { head: 255, body: 150, legs: 120 }, range: '0-50 m', bulletSpeed: '12,000 m/s', isFeatured: true }),
    new WeaponEntity({ id: 'ghost', name: 'Ghost', category: 'Sidearm', cost: 500, magazineSize: 15, fireRate: 6.75, damage: { head: 105, body: 30, legs: 26 }, range: '0-30 m', bulletSpeed: '6,000 m/s' }),
    new WeaponEntity({ id: 'spectre', name: 'Spectre', category: 'SMG', cost: 1600, magazineSize: 30, fireRate: 13.33, damage: { head: 78, body: 26, legs: 22 }, range: '0-20 m', bulletSpeed: '5,500 m/s' }),
    new WeaponEntity({ id: 'bulldog', name: 'Bulldog', category: 'Rifle', cost: 2050, magazineSize: 24, fireRate: 9.15, damage: { head: 116, body: 35, legs: 30 }, range: '0-50 m', bulletSpeed: '8,000 m/s' }),
  ];

  #maps = [
    new MapEntity({ id: 'haven', name: 'Haven', location: 'Thimphu, Bhutan', coordinates: { latitude: 27.4728, longitude: 89.6393 }, description: 'Một tu viện cổ với ba khu vực đặt Spike, tạo ra nhiều lựa chọn xoay vòng và retake.', tacticalFeatures: ['Ba site A/B/C', 'Long sightline tại C Long', 'Garage kết nối khu C'], callouts: ['A Long', 'C Long', 'Garage', 'Mid Courtyard', 'B Site'], imageUrl: mapImage('2bee0dc9-4ffe-519b-1cbd-7fbe763a6047'), isFeatured: true }),
    new MapEntity({ id: 'bind', name: 'Bind', location: 'Rabat, Morocco', coordinates: { latitude: 34.0209, longitude: -6.8416 }, description: 'Bản đồ hai site không có khu vực giữa, bù lại có hai cổng dịch chuyển một chiều.', tacticalFeatures: ['Hai teleport một chiều', 'B Lobby gây áp lực nhanh', 'Hookah kiểm soát site B'], callouts: ['A Short', 'Hookah', 'B Long', 'Showers', 'Teleporter'], imageUrl: mapImage('2c9d57ec-4431-9c5e-2939-8f9ef6dd5cba'), isFeatured: true }),
    new MapEntity({ id: 'ascent', name: 'Ascent', location: 'Venice, Italy', coordinates: { latitude: 45.4408, longitude: 12.3155 }, description: 'Quảng trường mở chia đôi bản đồ bằng Mid, với các cửa cơ động có thể đóng để giữ site.', tacticalFeatures: ['Mid quyết định quyền kiểm soát', 'Cửa cơ động A/B', 'Market là điểm xoay vòng'], callouts: ['A Main', 'Tree', 'Market', 'B Main', 'Mid Pizza'], imageUrl: mapImage('7eaecc1b-4337-bbf6-6ab9-04b8f06b3319') }),
  ];

  #articles = [
    new ArticleEntity({ id: 'patch-26-04', title: 'Protocol 26.04: Tín hiệu mới trên chiến trường', excerpt: 'Phân tích thay đổi cân bằng, hệ thống replay và những đường ngắm vừa được mở.', category: 'PATCH NOTES', publishedAt: '04.09.2026', readTime: '06 MIN', featured: true }),
    new ArticleEntity({ id: 'masters-recap', title: 'Masters // Seoul: Round đấu không thể đoán trước', excerpt: 'Những lựa chọn chiến thuật định hình trận chung kết và meta kiểm soát thông tin.', category: 'ESPORTS', publishedAt: '28.08.2026', readTime: '08 MIN' }),
    new ArticleEntity({ id: 'dev-diary-07', title: 'Dev Diary 07: Thiết kế âm thanh của một cú clutch', excerpt: 'Đội ngũ âm thanh nói về khoảng lặng, bước chân và cách thông tin đi qua một round.', category: 'DEV DIARY', publishedAt: '19.08.2026', readTime: '05 MIN' }),
  ];

  getAgents() { return this.#agents; }
  getWeapons() { return this.#weapons; }
  getMaps() { return this.#maps; }
  getArticles() { return this.#articles; }
  getArticleById(id) { return this.#articles.find((article) => article.id === id) ?? null; }
  createArticle(articleData) { return new ArticleEntity({ ...articleData, id: `mock-${Date.now()}`, publishedAt: new Date().toISOString() }); }

  getEntityById(type, id) {
    const collection = { agents: this.#agents, weapons: this.#weapons, maps: this.#maps }[type];
    return collection?.find((entity) => entity.id === id) ?? null;
  }
}
