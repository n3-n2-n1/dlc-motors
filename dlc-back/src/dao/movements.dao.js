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
    codInterno,
    codOEM,
    desc,
    stock,
    stockReal,
    stockAct,
    arreglos,
    observaciones,
    det,
    cantidad,
    kit
  ) {
    return new Promise((resolve, reject) => {
      try {
        db.query(
          "INSERT INTO movimientos (fecha, codInterno, codOEM, ` desc` , stock, stockReal, stockAct, arreglo) VALUES (?,?,?,?,?,?)",
          [
            fecha,
            codInterno,
            codOEM,
            desc,
            stock,
            stockReal,
            stockAct,
            arreglo,
          ],
          function (error) {
            if (error) {
              console.error(
                "An error occurred while executing the query",
                error
              );
              res.status(500).json({
                error: "Error al insertar el movimiento de inventario.",
              });
              return;
            }

            // Get the inserted product
            db.query(
              "SELECT * FROM movimientos WHERE fecha = ?",
              [fecha],
              function (error, results) {
                if (error) {
                  console.error(
                    "An error occurred while executing the query",
                    error
                  );
                  res.status(500).json({
                    error:
                      "Error al obtener el movimiento de inventario insertado.",
                  });
                  return;
                }

                res.status(200).json({
                  message: "Movimiento de inventario insertado correctamente.",
                  product: results[0],
                });
              }
            );
          }
        );
        resolve;
      } catch (error) {
        reject(new Error("Error"));
      }
    });
  }

  async createIncomeOutcome(
    fecha,
    codInterno,
    codOEM,
    desc,
    stock,
    stockReal,
    stockAct,
    arreglos,
    observaciones,
    det,
    cantidad,
    kit
  ) {
    return new Promise((resolve, reject) => {
      db.query(
        "INSERT INTO movimientos (fecha, observaciones, codInterno, codOEM, `desc` , stock, det, cantidad, kit, stockAct) VALUES (?,?,?,?,?,?,?,?,?,?)",
        [
          fecha,
          observaciones,
          codInterno,
          codOEM,
          desc,
          stock,
          det,
          cantidad,
          kit,
          stockAct,
        ],
        function (error) {
          if (error) {
            console.error("An error occurred while executing the query", error);
            res.status(500).json({ error: "Error al insertar el producto." });
            return;
          }

          // Get the inserted product
          db.query(
            "SELECT * FROM movimientos WHERE fecha = ?",
            [fecha],
            function (error, results, fields) {
              if (error) {
                console.error(
                  "An error occurred while executing the query",
                  error
                );
                res
                  .status(500)
                  .json({ error: "Error al obtener el producto insertado." });
                return;
              }

              res.status(200).json({
                message: "Producto insertado correctamente.",
                product: results[0],
              });
            }
          );
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
