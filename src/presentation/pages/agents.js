import { GetAllAgentsUseCase } from '../../application/usecases/GetAllAgentsUseCase.js';
import { ApiGameRepository } from '../../infrastructure/repositories/ApiGameRepository.js';
import '../components/NexusNavbar.js';
import '../components/NexusFooter.js';
import './AgentsPage.js';

const repository = new ApiGameRepository();

const fallbackImages = {
  jett: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=900&q=85',
  phoenix: 'https://images.unsplash.com/photo-1560253023-3ec5d502959f?auto=format&fit=crop&w=900&q=85',
  omen: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=900&q=85',
  sova: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=900&q=85',
  sage: 'https://images.unsplash.com/photo-1511882150382-421056c89033?auto=format&fit=crop&w=900&q=85',
  kayo: 'https://images.unsplash.com/photo-1547394765-185e1e68f34e?auto=format&fit=crop&w=900&q=85',
  killjoy: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=900&q=85',
  harbor: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=900&q=85'
};

async function initPage() {
  const pageElement = document.querySelector('agents-page') || document.querySelector('agents-catalog-view');

  try {
    const rawAgents = await new GetAllAgentsUseCase(repository).execute();

    const agents = rawAgents.map((agent) => ({
      ...agent,
      avatarUrl: agent.avatarUrl || fallbackImages[agent.id] || fallbackImages.jett,
      fallbackImageUrl: fallbackImages[agent.id] || fallbackImages.jett,
    }));

    if (pageElement) {
      pageElement.data = agents;
    }
  } catch (error) {
    console.error('Lỗi khi tải danh sách đặc vụ:', error);
  }
}

initPage();