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



  async createDelivery({cantidad, codigoInt, fecha, desc, numImpo, observaciones}) {
        return new Promise((resolve, reject) => {
      db.query(
        "INSERT INTO delivery (cantidad, fecha, `desc`, numImpo, observaciones) VALUES (?, ?, ?, ?, ?)",
        [cantidad, fecha, desc, numImpo, observaciones],
        (error, results) => {
          if (error) {
            console.error("SQL Error: ", error);
          reject(new Error("Error al crear los pedidos/delivery", error));
          } else {
            resolve(results);
          }
        });
    });
  }

  
}
