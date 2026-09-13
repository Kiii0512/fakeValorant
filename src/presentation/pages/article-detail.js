import { GetArticleDetailUseCase } from '../../application/usecases/GetArticleDetailUseCase.js';
import { ApiGameRepository } from '../../infrastructure/repositories/ApiGameRepository.js';
import '../components/NexusNavbar.js';
import '../components/NexusFooter.js';
import './ArticleDetailPage.js';

const view = document.querySelector('article-detail-page');
const articleId = new URLSearchParams(window.location.search).get('id');

async function loadArticle() {
  try {
    const article = await new GetArticleDetailUseCase(new ApiGameRepository()).execute(articleId);
    if (!article) throw new Error('Không tìm thấy bài viết.');
    view.data = article;
  } catch (error) {
    view.error = `Lỗi nạp dữ liệu: ${error.message}`;
  }
}

loadArticle();
