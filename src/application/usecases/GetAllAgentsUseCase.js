export class GetAllAgentsUseCase {
  constructor(gameRepository) {
    this.gameRepository = gameRepository;
  }

  async execute() {
    return await this.gameRepository.getAgents();
  }
}