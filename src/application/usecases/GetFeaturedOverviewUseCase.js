export class GetFeaturedOverviewUseCase {
  constructor(gameRepository) {
    this.gameRepository = gameRepository;
  }

  execute() {
    return {
      agents: this.gameRepository.getAgents().filter((agent) => agent.isFeatured),
      weapons: this.gameRepository.getWeapons().filter((weapon) => weapon.isFeatured),
      maps: this.gameRepository.getMaps().filter((map) => map.isFeatured),
    };
  }
}
