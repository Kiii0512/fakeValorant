export class CreateMapUseCase {
  constructor(adminRepository) {
    this.adminRepository = adminRepository;
  }

  async execute(mapData) {
    return await this.adminRepository.saveMap(mapData);
  }
}