import { MovementDAO } from "../dao/movements.dao.js";

export default class MovementService {
  constructor() {
    this.movementDAO = new MovementDAO();
  }

  async getMovements() {
    try {
      return await this.movementDAO.getMovements();
    } catch (error) {
      throw new Error("Error en el servicio: " + error.message);
    }
  }

  async createMovementInventory() {
    try {
      return await this.movementDAO.createMovementInventory();
    } catch (error) {
      throw new Error("Error en el servicio: " + error.message);
    }
  }

  async createIncomeOutcome() {
    try {
      return await this.movementDAO.createIncomeOutcome();
    } catch (error) {
      throw new Error("Error en el servicio: " + error.message);
    }
  }
}
