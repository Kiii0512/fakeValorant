export class CreateAgentUseCase {
  constructor(adminRepository) {
    this.adminRepository = adminRepository;
  }

  async execute(payload) {
    return await this.adminRepository.saveAgent(payload);
  }
}