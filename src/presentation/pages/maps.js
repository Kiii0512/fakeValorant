import { GetAllMapsUseCase } from '../../application/usecases/GetAllMapsUseCase.js';
import { ApiGameRepository } from '../../infrastructure/repositories/ApiGameRepository.js';
import '../components/NexusNavbar.js';
import '../components/NexusFooter.js';
import '../components/MapsCatalogView.js';

const repository = new ApiGameRepository();
const getAllMapsUseCase = new GetAllMapsUseCase(repository);

async function init() {
  const loadingEl = document.getElementById('maps-loading');
  const catalogEl = document.querySelector('maps-catalog-view');

  try {
    const maps = await getAllMapsUseCase.execute();
    if (loadingEl) loadingEl.style.display = 'none';
    if (catalogEl) catalogEl.data = maps;
  } catch (err) {
    if (loadingEl) {
      loadingEl.innerHTML = `<p style="color:#ff4655;">Lỗi nạp dữ liệu bản đồ: ${err.message}</p>`;
    }
  }
}

init();