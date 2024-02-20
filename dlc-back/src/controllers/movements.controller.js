import db from "../database/db.js";

export const getMovements = (req, res) => {
  db.query("SELECT * FROM movimientos", (error, results, fields) => {
    if (error) {
      console.error("An error occurred while executing the query", error);
      res.status(500).json({ error: "Error al abrir la base de datos." });
      return;
    }
    res.json(results);
  });
};

export const createMovement = (req, res) => {
  const {fecha, codInterno, codOEM, desc, stock, stockReal, stockAct, arreglos,observaciones, det, cantidad,kit
  } = req.body;

  if (desc === "Inventario") {
    // Query Inventario
    console.log("QUERY INVENTARIO")
    db.query(
      "INSERT INTO movimientos (fecha, codInterno, codOEM, ` desc` , stock, stockReal, stockAct, arreglo) VALUES (?,?,?,?,?,?)",
      [fecha, codInterno, codOEM, desc, stock, stockReal, stockAct, arreglo],
      function (error) {
        if (error) {
          console.error("An error occurred while executing the query", error);
          res
            .status(500)
            .json({ error: "Error al insertar el movimiento de inventario." });
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
  } else {
    console.log("QUERY INGRESO/EGRESO")
    db.query(
      "INSERT INTO movimientos (fecha, observaciones, codInterno, codOEM, `desc` , stock, det, cantidad, kit, stockAct) VALUES (?,?,?,?,?,?,?,?,?,?)",
      [
        fecha, observaciones, codInterno, codOEM, desc, stock, det, cantidad, kit, stockAct
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
    );
  }
};
