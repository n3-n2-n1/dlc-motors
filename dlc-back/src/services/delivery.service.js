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

      // stock actual del prod que viene de productos
      const prod = await this.productDAO.getProductByCodigoInt(codigoInt);
      console.log(prod);
      console.log("cantidad", cantidad)

      const futureStock = prod.stockFuturo || 0;
      console.log("stock futuro actual", futureStock)

      const newFutureStock = futureStock + cantidad;

      console.log("nuevo stock futuro", newFutureStock);

      // modificar stock futuro
      return await this.productDAO.updateFutureStock(codigoInt, newFutureStock);
    } catch (error) {
      throw new Error("Error en el servicio" + error.message);
    }
  }

  // 1- Creo pedido
  // 2- Actualizo stock futuro del procuto (+)
  // 3- Updateo el pedido
  // 3a- Si el estado es entregado, actualizo el stock actual del producto y decremento el stock futuro en esa misma cantidad
  // 3a- Si el estado es cancelado, solo decremento el stock futuro en esa misma cantidad

  async updateDeliveryStatus(numImpo, estado, cantidad, codigoInt) {
    try {
      // stock actual del prod que viene de productos
      const prod = await this.productDAO.getProductByCodigoInt(codigoInt);
      console.log(prod);

      const futureStock = prod.stockFuturo;
      console.log("stock futuro actual", futureStock);

      console.log("cantidad", cantidad);
      console.log("stock actual", prod.stock);
      const newFutureStock = futureStock - cantidad;
      const newStock = prod.stock + cantidad;
      console.log("nuevo stock del productitOOOO", newStock);

      console.log(numImpo);
      console.log(estado);
      if (estado === "Entregado") {
        // this.productDAO.modifyStock(newStock, codigoInt);
        this.productDAO.decreaseFutureStock(newFutureStock, codigoInt);
      } else if (estado === "Cancelado") {
        console.log("Se cancelo la entrega del producto, stock revertido");
        this.productDAO.decreaseFutureStock(newFutureStock, codigoInt);
        //Tambien tiene que eliminar el costo
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
