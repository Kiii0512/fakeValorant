import { GetAgentByIdUseCase } from '../../application/usecases/GetAgentByIdUseCase.js';
import { ApiGameRepository } from '../../infrastructure/repositories/ApiGameRepository.js';
import '../components/NexusNavbar.js';
import '../components/NexusFooter.js';
import '../components/AgentDetailView.js';

const view = document.querySelector('agent-detail-view');
const agentId = new URLSearchParams(window.location.search).get('id') || 'harbor';

async function loadAgent() {
  try {
    const agent = await new GetAgentByIdUseCase(new ApiGameRepository()).execute(agentId);
    if (!agent) throw new Error('Không tìm thấy dữ liệu đặc vụ.');
    view.data = agent;
  } catch (error) {
    view.error = `Lỗi nạp dữ liệu: ${error.message}`;
  }
}

loadAgent();
