export class GetArticlesUseCase {
  constructor(gameRepository) {
    this.gameRepository = gameRepository;
  }

  async execute() {
    return await this.gameRepository.getArticles();
  }
}
