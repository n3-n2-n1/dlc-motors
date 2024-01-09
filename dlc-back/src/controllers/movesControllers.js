const db = require("../database/db");

const getMoves = (req, res) => {
  db.query("SELECT * FROM movimientos", (error, results, fields) => {
    if (error) {
      console.error("An error occurred while executing the query", error);
      res.status(500).json({ error: "Error al abrir la base de datos." });
      return;
    }

    console.log(results);
    res.json(results);
  });
};

const createMoves = (req, res) => {
  const {
    date,
    productCode,
    description,
    movementType,
    quantity,
    observations,
    updatedStock,
    fixedStock,
    appliedFix,
  } = req.body;

  console.log(
    date,
    productCode,
    description,
    movementType,

    quantity, // Not inventory
    observations, // Not inventory
    updatedStock, // Not inventory

    fixedStock, // inventory
    appliedFix // inventory
  );

  if (movementType === "Inventario") {
    // Query Inventario
    console.log("QUERY INVENTARIO")
    db.query(
      "INSERT INTO movimientos (date, productCode, description, movementType, fixedStock, appliedFix) VALUES (?,?,?,?,?,?)",
      [date, productCode, description, movementType, fixedStock, appliedFix],
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
          "SELECT * FROM movimientos WHERE date = ?",
          [date],
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

            console.log(results);
          }
        );
      }
    );
  } else {
    console.log("QUERY INGRESO/EGRESO")
    db.query(
      "INSERT INTO movimientos (date, productCode, description, movementType, quantity, observations, updatedStock) VALUES (?,?,?,?,?,?,?)",
      [
        date,
        productCode,
        description,
        movementType,
        quantity,
        observations,
        updatedStock,
      ],
      function (error) {
        if (error) {
          console.error("An error occurred while executing the query", error);
          res.status(500).json({ error: "Error al insertar el producto." });
          return;
        }

        // Get the inserted product
        db.query(
          "SELECT * FROM movimientos WHERE date = ?",
          [date],
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

            console.log(results);
          }
        );
      }
    );
  }
};

module.exports = {
  getMoves,
  createMoves,
};
