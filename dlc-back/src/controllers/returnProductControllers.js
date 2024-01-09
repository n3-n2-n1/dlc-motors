const db = require("../database/db");

const getReturns = (req, res) => {
  db.query("SELECT * FROM devoluciones", (error, results, fields) => {
    if (error) {
      console.error("An error occurred while executing the query", error);
      res.status(500).json({ error: "Error al abrir la base de datos." });
      return;
    }

    console.log(results);
    res.json(results);
  });
};

const createReturn = (req, res) => {
  const { productCode, description, fixedStock, appliedFix, previousStock, date, productName } = req.body;

  // Realizar la lógica para insertar un nuevo producto en la base de datos
  db.query(
    "INSERT INTO devoluciones (Fecha, Codigo, Descripcion, StockArreglo, Arreglo, Stock, Producto) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [date, productCode, description, fixedStock, appliedFix, previousStock, productName],
    function (error) {
      if (error) {
        console.error("An error occurred while executing the query", error);
        res.status(500).json({ error: "Error al insertar la query.", error });
        return;
      }

      // Get the inserted product
      db.query(
        "SELECT * FROM devoluciones WHERE Codigo = ?",
        [productCode],
        function (error, results, fields) {
          if (error) {
            console.error("An error occurred while executing the query", error);
            res
              .status(500)
              .json({ error: "Error al obtener la devolucion insertado." });
            return;
          }

          res.status(200).json({
            message: "Devolucion insertado correctamente.",
          });

          console.log(results);
        }
      );
    }
  );
};

const deleteReturn = (req, res) => {
  const productId = req.params.pid;

  if (!productId) {
    res.status(400).json({ error: "ID del producto no proporcionado." });
    return;
  }

  db.query(
    "DELETE FROM productos WHERE CodOEM = ?",
    [productId],
    (error, results, fields) => {
      if (error) {
        console.error("An error occurred while executing the query", error);
        res.status(500).json({ error: "Error al abrir la base de datos." });
        return;
      }

      if (results.affectedRows === 0) {
        res.status(404).json({ error: "Producto no encontrado." });
        return;
      }

      res.status(200).json({ message: "Producto eliminado correctamente." });
      console.log("Borrado joya padre");
    }
  );
};

module.exports = {
  createReturn,
  deleteReturn,
  getReturns,
};
