import { GetArticlesUseCase } from '../../application/usecases/GetArticlesUseCase.js';
import { ApiGameRepository } from '../../infrastructure/repositories/ApiGameRepository.js';
import '../components/NexusNavbar.js';
import '../components/NexusFooter.js';
import './NewsPage.js';

const view = document.querySelector('news-page');

async function loadArticles() {
	try {
		const articles = await new GetArticlesUseCase(new ApiGameRepository()).execute();
		view.data = articles;
	} catch (error) {
		view.error = `Lỗi nạp danh sách tin tức: ${error.message}`;
	}
}

loadArticles();
