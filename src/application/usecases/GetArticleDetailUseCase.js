export class GetArticleDetailUseCase {
  constructor(gameRepository) {
    this.gameRepository = gameRepository;
  }

  async execute(id) {
    if (id) return this.gameRepository.getArticleById(id);

    const articles = await this.gameRepository.getArticles();
    return articles.reduce((latest, article) => {
      if (!latest) return article;
      return new Date(article.publishedAt) > new Date(latest.publishedAt) ? article : latest;
    }, null);
  }
}
