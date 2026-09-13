export class IGameRepository {
  getAgents() {
    throw new Error('IGameRepository.getAgents must be implemented.');
  }

  getWeapons() {
    throw new Error('IGameRepository.getWeapons must be implemented.');
  }

  getMaps() {
    throw new Error('IGameRepository.getMaps must be implemented.');
  }

  getArticles() {
    throw new Error('IGameRepository.getArticles must be implemented.');
  }

  getArticleById() {
    throw new Error('IGameRepository.getArticleById must be implemented.');
  }

  createArticle() {
    throw new Error('IGameRepository.createArticle must be implemented.');
  }

  getEntityById() {
    throw new Error('IGameRepository.getEntityById must be implemented.');
  }
}
