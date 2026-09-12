export class GetAllWeaponsUseCase {
  constructor(gameRepository) { this.gameRepository = gameRepository; }
  execute() { return this.gameRepository.getWeapons(); }
}
