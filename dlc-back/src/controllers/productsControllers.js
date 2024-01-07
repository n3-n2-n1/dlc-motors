// productosController.js
const db = require("../database/db");

//Obtener los productitos
const getProducts = (req, res) => {
  db.query("SELECT * FROM productos", (error, results, fields) => {
    if (error) {
      console.error("An error occurred while executing the query", error);
      res.status(500).json({ error: "Error al abrir la base de datos." });
      return;
    }

    console.log(results);
    res.json(results);
  });
};

const getProductsBySearchTerm = async (req, res) => {
  const searchTerm = req.params.query;
  db.query(
    "SELECT * FROM productos WHERE Producto LIKE ?",
    [`%${searchTerm}%`],
    (error, results, fields) => {
      if (error) {
        console.error("An error occurred while executing the query", error);
        res.status(500).json({ error: "Error al abrir la base de datos." });
        return;
      }
      console.log(results);
      res.json(results);
    }
  );
};

//Crear productitos
const createProduct = (req, res) => {
  const { Codigo, Producto, Rubro, CodBarras, Precio, Stock } = req.body;

  // Realizar la lógica para insertar un nuevo producto en la base de datos
  db.query(
    "INSERT INTO productos (Codigo, Producto, Rubro, CodBarras, Precio, Stock) VALUES (?, ?, ?, ?, ?, ?)",
    [Codigo, Producto, Rubro, CodBarras, Precio, Stock],
    function (error) {
      if (error) {
        console.error("An error occurred while executing the query", error);
        res.status(500).json({ error: "Error al insertar el producto." });
        return;
      }

      // Get the inserted product
      db.query(
        "SELECT * FROM productos WHERE Codigo = ?",
        [Codigo],
        function (error, results, fields) {
          if (error) {
            console.error("An error occurred while executing the query", error);
            res.status(500).json({ error: "Error al obtener el producto insertado." });
            return;
          }

          res.status(200).json({ message: "Producto insertado correctamente.", product: results[0] });

          console.log(results)
        }
      );
    }
  );
};

//Eliminar el productito
const deleteProduct = (req, res) => {
  const productId = req.params.pid;  

  if (!productId) {
    res.status(400).json({ error: "ID del producto no proporcionado." });
    return;
  }

  db.query("DELETE FROM productos WHERE Codigo = ?", [productId], (error, results, fields) => {
    if (error) {
      console.error("An error occurred while executing the query", error);
      res.status(500).json({ error: "Error al abrir la base de datos." });
      return;
    }
  
    if (results.affectedRows === 0) {
      res.status(404).json({ error: "Producto no encontrado." });
      return;
    }
  
    res.status(204).json({ message: "Producto eliminado correctamente." });
  });
};

module.exports = {
  createProduct,
  getProducts,
  getProductsBySearchTerm,
  deleteProduct,
};
