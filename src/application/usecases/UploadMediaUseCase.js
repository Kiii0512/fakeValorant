export class UploadMediaUseCase {
  constructor(adminRepository) {
    this.adminRepository = adminRepository;
  }

  async execute(file, bucket = 'agent-media') {
    if (!file) return '';
    return await this.adminRepository.uploadFile(file, bucket);
  }
}