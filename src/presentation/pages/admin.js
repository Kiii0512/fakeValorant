import { CreateAgentUseCase } from '../../application/usecases/CreateAgentUseCase.js';
import { CreateMapUseCase } from '../../application/usecases/CreateMapUseCase.js';
import { CreateWeaponUseCase } from '../../application/usecases/CreateWeaponUseCase.js';
import { UploadMediaUseCase } from '../../application/usecases/UploadMediaUseCase.js';
import { ApiAdminRepository } from '../../infrastructure/repositories/ApiAdminRepository.js';
import '../components/NexusNavbar.js';
import '../components/NexusFooter.js';
import '../components/AdminAgentForm.js';

const adminRepo = new ApiAdminRepository();
const uploadUseCase = new UploadMediaUseCase(adminRepo);
const createAgentUseCase = new CreateAgentUseCase(adminRepo);
const createMapUseCase = new CreateMapUseCase(adminRepo);
const createWeaponUseCase = new CreateWeaponUseCase(adminRepo);

const formElement = document.querySelector('admin-agent-form');
if (formElement) {
  formElement.handlers = {
    onUpload: (file) => uploadUseCase.execute(file),
    onSaveAgent: (data) => createAgentUseCase.execute(data),
    onSaveMap: (data) => createMapUseCase.execute(data),
    onSaveWeapon: (data) => createWeaponUseCase.execute(data)
  };
}