import { GetAllWeaponsUseCase } from '../../application/usecases/GetAllWeaponsUseCase.js';
import { ApiGameRepository } from '../../infrastructure/repositories/ApiGameRepository.js';
import '../components/NexusNavbar.js';
import '../components/NexusFooter.js';
import './ArsenalPage.js';

const repository = new ApiGameRepository();
const getAllWeaponsUseCase = new GetAllWeaponsUseCase(repository);

async function init() {
  const loadingEl = document.getElementById('arsenal-loading');
  const arsenalEl = document.querySelector('arsenal-page');

  try {
    const weapons = await getAllWeaponsUseCase.execute();
    if (loadingEl) loadingEl.style.display = 'none';
    if (arsenalEl) arsenalEl.data = weapons;
  } catch (err) {
    if (loadingEl) {
      loadingEl.innerHTML = `<p style="color:#ff4655;">Lỗi nạp vũ khí: ${err.message}</p>`;
    }
  }
}

init();