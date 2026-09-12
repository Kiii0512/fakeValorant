export class GetAllMapsUseCase {
  constructor(gameRepository) {
    this.gameRepository = gameRepository;
  }

  async execute() {
    return await this.gameRepository.getMaps();
  }
}