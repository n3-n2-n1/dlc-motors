import db from "../database/db.js";

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
  ) {
    return new Promise((resolve, reject) => {
      const stockDeposito = stock !== '' ? parseInt(stock, 10) : 0;

      db.query(
        "INSERT INTO delivery (cantidad, codOEM, codigoInt, `desc`, fecha, numImpo, observaciones, stockDeposito) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        [cantidad, codOEM, codigoInt, desc, fecha, numImpo, observaciones, stockDeposito],
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
}
