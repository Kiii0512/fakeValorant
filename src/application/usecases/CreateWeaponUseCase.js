export class CreateWeaponUseCase {
  constructor(adminRepository) {
    this.adminRepository = adminRepository;
  }

  async execute(weaponData) {
    return await this.adminRepository.saveWeapon(weaponData);
  }
}