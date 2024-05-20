import { ReturnsDAO } from "../dao/returns.dao.js";

export default class ReturnsService {
  constructor() {
    this.ReturnsDAO = new ReturnsDAO();
  }

  async getReturns() {
    try {
      return await this.ReturnsDAO.getReturns();
    } catch (error) {
      throw new Error("Error en el servicio:" + error.message);
    }
  }

  async createReturn(
    cantidad,
    codOEM,
    codigoInt,
    desc,
    detalle,
    fecha,
    kit,
    observaciones,
    stockAnt,
    usuario,
    origen,
    marcasCompatibles,
  ) {
    try {
      console.log("cargo devolucion")
      return await this.ReturnsDAO.createReturn(
        cantidad,
        codOEM,
        codigoInt,
        desc,
        detalle,
        fecha,
        kit,
        observaciones,
        stockAnt,
        usuario,
        origen,
        marcasCompatibles,
      );
    } catch (error) {
      throw new Error("Error en el servicio:" + error.message);
    }
  }

  async deleteReturn() {
    try {
      return await this.ReturnsDAO.deleteReturn();
    } catch (error) {
      throw new Error("Error en el servicio:" + error.message);
    }
  }
}
