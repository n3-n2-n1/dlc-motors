// MovementDAO.js
import db from "../database/db.js";

export class MovementDAO {
  constructor(db) {
    this.db = db;
  }
  async getMovements() {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM movimientos", (error, results) => {
        if (error) {
          console.error("An error occurred while executing the query", error);
          reject(new Error("Error al obtener los productos."));
        } else {
          resolve(results);
        }
      });
    });
  }

  async createMovementInventory(
    fecha,
    codigoInt,
    codOEM,
    desc,
    stock,
    stockAct,
    arreglo,
    usuario,
    tipoMov
  ) {
    return new Promise((resolve, reject) => {
      try {
        db.query(
          "INSERT INTO movimientos (fecha, codigoInt, codOEM, `desc`, stock, stockAct, arreglo, user,tipoMov) VALUES (?,?,?,?,?,?,?,?,?)",
          [
            fecha,
            codigoInt,
            codOEM,
            desc,
            stock,
            stockAct,
            arreglo,
            usuario,
            tipoMov,
          ],
          function (error, results) {
            if (error) {
              console.error(
                "An error occurred while executing the query",
                error
              );
              reject(
                new Error("Error al insertar el movimiento de inventario.")
              );
            } else {
              resolve(results);
            }
          }
        );
        resolve;
      } catch (error) {
        reject(new Error("Error"));
      }
    });
  }

  async createIncomeOutcome(
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
  ) {
    return new Promise((resolve, reject) => {
      console.log(
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
      db.query(
        "INSERT INTO movimientos (fecha, observaciones, codigoInt, codOEM, `desc`, stock, stockAct, det, cantidad, kit, user, tipoMov) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)",
        [
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
        ],
        function (error, results) {
          if (error) {
            console.error("An error occurred while executing the query", error);
            reject(new Error("Error al crear el ingreso/egreso."));
          } else {
            resolve(results);
          }
        }
      ),
        (error, results) => {
          if (error) {
            console.error("Error");
            reject(new Error("Error al pushear el movimiento"));
          } else {
            resolve(results);
          }
        };
    });
  }
}
