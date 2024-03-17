import HistoryServiceDAO from "../dao/history.dao.js";

export default class HistoryService {
  constructor(db) {
    this.HistoryServiceDAO = new HistoryServiceDAO(db);
  }

  async getHistory() {
    try {
      return await this.HistoryServiceDAO.getHistory();
    } catch (error) {
      throw new Error("Error en el servicio" + error.message)
    }
  }

  async createHistory() {
    try {
      return await this.HistoryServiceDAO.createHistory();
    } catch (error) {
      throw new Error("Error en el servicio" + error.message)
    }
  }
}
