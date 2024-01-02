// productosController.js
const db = require('../models/db');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbPath = path.join(__dirname, '../../productos.db');


//Crear productitos
const createProducts = (nombre, precio) => {
  // Realizar la lógica para insertar un nuevo producto en la base de datos
  db.run('INSERT INTO productos (Nombre, Precio) VALUES (?, ?)', [nombre, precio], function () {
    // Falta error handling aca
  });
};


//Obtener los productitos
const getProducts = (req, res) => {
  const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.error(err.message);
      res.status(500).json({ error: 'Error al abrir la base de datos.' });
      return;
    }

    db.all('SELECT * FROM productos', (queryErr, rows) => {
      db.close();

      if (queryErr) {
        console.error(queryErr.message);
        res.status(500).json({ error: 'Error en la consulta a la base de datos.' });
        return;
      }

      res.json(rows);
    });
  });
};

const getProductsBySearchTerm = (req, res) => {
  const searchTerm = req.query.searchTerm;
  const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.error(err.message);
      res.status(500).json({ error: 'Error al abrir la base de datos.' });
      return;
    }

    db.all('SELECT * FROM productos WHERE name LIKE ?', [`%${searchTerm}%`], (queryErr, rows) => {
      db.close();

      if (queryErr) {
        console.error(queryErr.message);
        res.status(500).json({ error: 'Error en la consulta a la base de datos.' });
        return;
      }

      res.json(rows);
    });
  });
};


//Eliminar el productito
const deleteProducts = (req, res) => {
  const productId = req.params.id;

  if (!productId) {
    res.status(400).json({ error: 'ID del producto no proporcionado.' });
    return;
  }

  const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE);


  //Manejar bien esto
  // db.run('DELETE FROM productos WHERE id = ?', [productId], (err) => {
  //   db.close();

  //   if (err) {
  //     console.error(err.message);
  //     res.status(500).json({ error: 'Error al eliminar el producto.' });
  //     return;
  //   }

  //   res.json({ message: 'Producto eliminado correctamente.' });
  // });
};

module.exports = {
  createProducts,
  getProducts,
  getProductsBySearchTerm,
  deleteProducts
};
