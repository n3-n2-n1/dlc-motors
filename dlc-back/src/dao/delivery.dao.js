import db from "../database/db.js";
import { ProductDAO } from "./product.dao.js";
export class DeliveryDAO {
  constructor(db) {
    this.db = db;
  }

  async getDeliveries() {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM delivery", (error, results) => {
        if (error) {
          console.error("An error occurred while executing the query", error);
          reject(new Error("Error al obtener el historial."));
        } else {
          resolve(results);
        }
      });
    });
  }

  async createDeliveries(
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
    return new Promise((resolve, reject) => {
      const stockDeposito = stock !== "" ? parseInt(stock, 10) : 0;

      db.query(
        "INSERT INTO delivery (cantidad, codOEM, codigoInt, `desc`, fecha, numImpo, observaciones, stockDeposito, stockAcumulado, estado) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
          cantidad,
          codOEM,
          codigoInt,
          desc,
          fecha,
          numImpo,
          observaciones,
          stockDeposito,
          stockAcumulado,
          estado,
        ],
        (error, results) => {
          if (error) {
            console.error("SQL Error: ", error);
            reject(new Error("Error al crear los pedidos/delivery", error));
          } else {
            resolve(results);
          }
        }
      );
    });
  }

  async updateDeliveryStatus(numImpo, estado) {
    return new Promise((resolve, reject) => {
      db.query(
        "UPDATE delivery SET estado = ? WHERE numImpo = ?",
        [estado, numImpo],
        async (error, results) => {
          if (error) {
            console.error("SQL Error: ", error);
            reject(new Error("Error al actualizar el estado del delivery"));
          } else {
            if (estado === "Entregado") {
              try {
                console.log(
                  "Stock actualizado debido a la entrega del delivery."
                );
              } catch (errorStock) {
                console.error("Error al actualizar el stock: ", errorStock);
                reject(errorStock);
              }
            } else {
              console.log(
                `El delivery ${numImpo} ha sido ${estado}, no se requiere ajuste de stock real.`
              );
            }
            resolve(results);
          }
        }
      );
    });
  }

  async createMultipleDeliveries(deliveryList) {
    try {
      const values = deliveryList.map((delivery) => [
        delivery.cantidad,
        delivery.codOEM,
        delivery.codigoInt,
        delivery.desc,
        delivery.fecha,
        delivery.numImpo,
        delivery.observaciones,
        delivery.stock,
        delivery.stockAcumulado,
        delivery.estado,
      ]);

      const query =
        "INSERT INTO delivery (cantidad, codOEM, codigoINT, desc, fecha, numImpo, observaciones, stock, stockAcumulado, estado) VALUES ?";

      return new Promise((resolve, reject) => {
        db.query(query, [values], function (error, results) {
          if (error) {
            console.error("Error while the query", error);
            reject(new Error("Error al obtener los delivery"));
          } else {
            resolve(results);
          }
        });
      });
    } catch (error) {
      throw error;
    }
  }
}
