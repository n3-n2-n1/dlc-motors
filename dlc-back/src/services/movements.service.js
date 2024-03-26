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

  async createMovementInventory(movement) {
    try {
      const {
        fecha,
        codigoInt,
        codOEM,
        desc,
        stock,
        stockAct,
        arreglo,
        usuario,
        tipoMov,
      } = movement;

      return await this.movementDAO.createMovementInventory(
        fecha,
        codigoInt,
        codOEM,
        desc,
        stock,
        stockAct,
        arreglo,
        usuario,
        tipoMov
      );
    } catch (error) {
      throw new Error("Error en el servicio: " + error.message);
    }
  }

  async createIncomeOutcome(movement) {
    try {
      const {
        date,
        observaciones,
        codigoInt,
        codOEM,
        desc,
        stock,
        stockAct,
        detalle,
        cantidad,
        kit,
        usuario,
        tipoMov,
      } = movement;

      return await this.movementDAO.createIncomeOutcome(
        date,
        observaciones,
        codigoInt,
        codOEM,
        desc,
        stock,
        stockAct,
        detalle,
        cantidad,
        kit,
        usuario,
        tipoMov
      );
    } catch (error) {
      throw new Error("Error en el servicio: " + error.message);
    }
  }
}
