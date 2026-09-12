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

  getEntityById() {
    throw new Error('IGameRepository.getEntityById must be implemented.');
  }
}
