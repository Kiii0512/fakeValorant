export class GetNewsUseCase {
  constructor(gameRepository) { this.gameRepository = gameRepository; }
  execute(category = null) {
    const articles = this.gameRepository.getArticles();
    return category ? articles.filter((article) => article.category === category) : articles;
  }
}
