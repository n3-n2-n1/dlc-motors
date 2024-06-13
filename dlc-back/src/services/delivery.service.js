import { DeliveryDAO } from "../dao/delivery.dao.js";
import { ProductDAO } from "../dao/product.dao.js";
import db from "../database/db.js";

export default class DeliveryService {
  constructor() {
    this.deliveryDAO = new DeliveryDAO();
    this.productDAO = new ProductDAO();
  }

  async getDeliveries() {
    try {
      return await this.deliveryDAO.getDeliveries();
    } catch (error) {
      throw new Error("Error en el servicio:" + error.message);
    }
  }

  async createDelivery(
    cantidad,
    codOEM,
    codigoInt,
    desc,
    fecha,
    numImpo,
    observaciones,
    stock,
    stockAcumulado,
    estado
  ) {
    try {
      await this.deliveryDAO.createDeliveries(
        cantidad,
        codOEM,
        codigoInt,
        desc,
        fecha,
        numImpo,
        observaciones,
        stock,
        stockAcumulado,
        estado
      );

      const prod = await this.productDAO.getProductByCodigoInt(codigoInt);
      
      // Verificar que prod existe antes de acceder a stockFuturo
      if (!prod) {
        throw new Error(`Producto con codigoInt ${codigoInt} no encontrado.`);
      }

      const futureStock = prod.stockFuturo || 0;

      const newFutureStock = futureStock + cantidad;

      return await this.productDAO.updateFutureStock(codigoInt, newFutureStock);
    } catch (error) {
      throw new Error("Error en el servicio" + error.message);
    }
  }

  async updateDeliveryStatus(numImpo, estado, cantidad, codigoInt) {
    try {
      const prod = await this.productDAO.getProductByCodigoInt(codigoInt);

      // Verificar que prod existe antes de acceder a stockFuturo
      if (!prod) {
        throw new Error(`Producto con codigoInt ${codigoInt} no encontrado.`);
      }

      const futureStock = prod.stockFuturo !== undefined ? prod.stockFuturo : 0;

      const newFutureStock = futureStock - cantidad;

      if (estado === "Entregado" || estado === "Cancelado") {
        console.log(`${estado === "Entregado" ? "Entrega" : "Cancelación"} de la entrega del producto, stock ajustado.`);
        await this.productDAO.decreaseFutureStock(newFutureStock, codigoInt);
      }

      return await this.deliveryDAO.updateDeliveryStatus(numImpo, estado);
    } catch (error) {
      throw new Error("Error en el servicio" + error.message);
    }
  }

  async createMultipleDelivery(deliveryList) {
    try {
      return await this.deliveryDAO.createMultipleDeliveries(deliveryList);
    } catch (error) {
      throw new Error("Error en el servicio" + error.message);
    }
  }
}
