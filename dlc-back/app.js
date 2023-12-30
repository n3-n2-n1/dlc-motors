const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const PORT = process.env.PORT || 3000;

// Ruta al archivo de la base de datos SQLite
const dbPath = './productos.db';

app.use(express.json());

// Rutas para CRUD
app.get('/productos', (req, res) => {
  const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE);
  db.all('SELECT * FROM productos', (err, rows) => {
    db.close(); // Cierra la conexión después de realizar la consulta
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

app.post('/productos', (req, res) => {
  const { Codigo, Producto, Rubro, CodBarras, Precio, Stock } = req.body;
  const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE);
  const insertQuery = `
    INSERT INTO productos (Codigo, Producto, Rubro, CodBarras, Precio, Stock)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  db.run(insertQuery, [Codigo, Producto, Rubro, CodBarras, Precio, Stock], function (err) {
    db.close(); // Cierra la conexión después de realizar la inserción
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ id: this.lastID });
  });
});

// ... (agrega las rutas PUT, GET by ID, DELETE según sea necesario)

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en localhost:${PORT}`);
});
