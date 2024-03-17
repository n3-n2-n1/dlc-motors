import { DeliveryDAO } from "../dao/delivery.dao.js";
import db from "../database/db.js";

export default class DeliveryService {
  constructor() {
    this.deliveryDAO = new DeliveryDAO();
  }

  async getDeliveries() {
    try {
      return await this.deliveryDAO.getDeliveries();
    } catch (error) {
      throw new Error("Error en el servicio:" + error.message);
    }
  }



  async createDelivery({cantidad, codigoInt, fecha, desc, numImpo, observaciones}) {
    try {
      return await this.deliveryDAO.createDeliveries(cantidad, codigoInt, fecha, desc, numImpo, observaciones)
    } catch (error) {
      throw new Error("Error en el servicio" + error.message)
    }
  }

  
}
