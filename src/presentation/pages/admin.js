import { CreateAgentUseCase } from '../../application/usecases/CreateAgentUseCase.js';
import { CreateMapUseCase } from '../../application/usecases/CreateMapUseCase.js';
import { CreateWeaponUseCase } from '../../application/usecases/CreateWeaponUseCase.js';
import { CreateArticleUseCase } from '../../application/usecases/CreateArticleUseCase.js';
import { GetArticlesUseCase } from '../../application/usecases/GetArticlesUseCase.js';
import { UploadMediaUseCase } from '../../application/usecases/UploadMediaUseCase.js';
import { ApiGameRepository } from '../../infrastructure/repositories/ApiGameRepository.js';
import { ApiAdminRepository } from '../../infrastructure/repositories/ApiAdminRepository.js';

import '../components/NexusNavbar.js';
import '../components/NexusFooter.js';
import '../components/AdminAgentForm.js';
import '../components/AdminArticleForm.js';

// Khởi tạo Repositories & Use Cases
const adminRepo = new ApiAdminRepository();
const articleRepository = new ApiGameRepository();

const uploadUseCase = new UploadMediaUseCase(adminRepo);
const createAgentUseCase = new CreateAgentUseCase(adminRepo);
const createMapUseCase = new CreateMapUseCase(adminRepo);
const createWeaponUseCase = new CreateWeaponUseCase(adminRepo);
const createArticleUseCase = new CreateArticleUseCase(articleRepository);
const getArticlesUseCase = new GetArticlesUseCase(articleRepository);

// Thiết lập Handlers cho Form Quản trị Đặc vụ / Bản đồ / Vũ khí
const formElement = document.querySelector('admin-agent-form');
if (formElement) {
  formElement.handlers = {
    onUpload: (file, bucket) => uploadUseCase.execute(file, bucket),
    onSaveAgent: (data) => createAgentUseCase.execute(data),
    onSaveMap: (data) => createMapUseCase.execute(data),
    onSaveWeapon: (data) => createWeaponUseCase.execute(data),

    // Data queries & Mutation handlers
    onLoadAgents: () => adminRepo.getAgents(),
    onDeleteAgent: (id) => adminRepo.deleteAgent(id),
    onToggleAgentFeatured: (id, state) => adminRepo.toggleAgentFeatured(id, state),

    onLoadMaps: () => adminRepo.getMaps(),
    onDeleteMap: (id) => adminRepo.deleteMap(id),
    onToggleMapRotation: (id, state) => adminRepo.toggleMapRotation(id, state),

    onLoadWeapons: () => adminRepo.getWeapons(),
    onDeleteWeapon: (id) => adminRepo.deleteWeapon(id),
  };
}

// Thiết lập Handlers cho Form Quản trị Tin tức
const setupArticleFormHandlers = () => {
  const articleForm = document.querySelector('admin-article-form');
  if (articleForm) {
    articleForm.handlers = {
      onSaveArticle: (data) => createArticleUseCase.execute(data),
      onUpdateArticle: (id, data) => articleRepository.updateArticle(id, data),
      onDeleteArticle: (id) => articleRepository.deleteArticle(id),
      onToggleFeatured: (id, state) => articleRepository.toggleArticleFeatured(id, state),
      onLoadArticles: () => getArticlesUseCase.execute(),
      onUpload: (file, bucket) => uploadUseCase.execute(file, bucket),
    };
  }
};

// Đảm bảo DOM và Custom Element đã sẵn sàng trước khi nạp handlers cho tin tức
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', setupArticleFormHandlers);
} else {
  setupArticleFormHandlers();
}