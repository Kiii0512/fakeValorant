export class CreateArticleUseCase {
  constructor(gameRepository) {
    this.gameRepository = gameRepository;
  }

  async execute(articleData) {
    return await this.gameRepository.createArticle(articleData);
  }
}
