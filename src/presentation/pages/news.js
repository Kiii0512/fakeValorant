import { GetNewsUseCase } from '../../application/usecases/GetNewsUseCase.js';
import { MockGameRepository } from '../../infrastructure/repositories/MockGameRepository.js';
import '../components/NexusNavbar.js';
import '../components/NexusFooter.js';
import './NewsPage.js';

const repository = new MockGameRepository();
const articles = new GetNewsUseCase(repository).execute();
document.querySelector('news-page').data = articles;
