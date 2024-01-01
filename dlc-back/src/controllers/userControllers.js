// usuariosController.js
const sqlite3 = require('sqlite3').verbose();

const path = require('path');
const dbPath = path.join(__dirname, '../../productos.db');



//Crear usuario
const makeUser = () => {
  const db = new sqlite3.Database('../../productos.db', sqlite3.OPEN_READWRITE);

  const Nombre = "Testing1";
  const Email = "test1@gmail.com";
  const Password = "test1";
  const selectedRole = "VENDEDOR";

  // Insertar nuevo usuario en la base de datos
  db.run('INSERT INTO usuarios (Nombre, Email, Password, selectedRole) VALUES (?, ?, ?, ?)',
    [Nombre, Email, Password, selectedRole],
    function () {
      db.close();
    }
  );
};



//Obterner usuariosss
const getUser = (req, res) => {
  const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE);

  db.all('SELECT * FROM usuarios', (err, rows) => {
    db.close();

    if (err) {
      console.error(err.message);
      res.status(500).json({ error: 'Error en la consulta a la base de datos.' });
      return;
    }

    res.json(rows);
  });
};

module.exports = {
  makeUser,
  getUser
};
