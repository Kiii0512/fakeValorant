export class GetAgentByIdUseCase {
  constructor(gameRepository) {
    this.gameRepository = gameRepository;
  }

  async execute(id) {
    return await this.gameRepository.getEntityById('agents', id);
  }
}