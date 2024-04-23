// MovementDAO.js
import db from "../database/db.js";
import { ProductDAO } from "./product.dao.js";

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
      const productDao = new ProductDAO(db);

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

            if (tipoMov === 'Ingreso') {
              console.log("cantidad", cantidad)
              productDao.modifyStock(stockAct, codigoInt);
            }

            if (tipoMov === 'Egreso') {
              
              const stockAct = cantidad;
              
              productDao.modifyStockOutcome(codigoInt, stockAct);
              console.log('Egreso restado' + stockAct)
            }

            if (tipoMov === 'Inventario') {
              
              const stockAct = cantidad;
              
              productDao.modifyStock(codigoInt, stockAct);
              console.log('Inventario afecto a stock de producto' + stockAct)
            }


            resolve(results);
            console.log('Stock Actualizado y movimiento añadido por movimiento de ingreso' + cantidad + tipoMov)

          }
        }
      )
      ,
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
