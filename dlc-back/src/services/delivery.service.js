import db from "../database/db.js";

export default class DeliveryService {
  constructor() {}

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



  async createDelivery() {
    return new Promise((resolve, reject) => {
      db.query(
        "INSERT INTO delivery (fecha, observacion, numImpo, cantidad, codInt, descripcion, oem, productos, stockDeposito, stockAcumulados) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [historialData.accion, historialData.descripcion, historialData.fecha],
        (error, results) => {
          if (error) {
          reject(new Error("Error al crear los pedidos/delivery"));
          } else {
            resolve(results);
          }
        });
    });
  }

  
}
