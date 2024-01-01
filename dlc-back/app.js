const express = require("express")
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');



const app = express();
const PORT = 3000;

// Ruta al archivo de la base de datos SQLite
const dbPath = './productos.db';

// ... (agrega las rutas PUT, GET by ID, DELETE según sea necesario)
const corsOptions = {
  origin: '*',
  credentials: true,            //access-control-allow-credentials:true
  optionSuccessStatus: 200,
}
app.use(cors(corsOptions));

app.use(express.json());

const makeUser = () => {

  app.post('/usuarios', (req, res) => {

    const db = './productos.db';


    const Nombre = "Julio Cesar"
    const Email = "test1@gmail.com"
    const Password = "test1"
    const selectedRole = "VENDEDOR"

    // Insertar nuevo usuario en la base de datos
    db.run('INSERT INTO usuarios (Nombre, Email, Password, selectedRole) VALUES (?, ?, ?, ?)',
      [Nombre, Email, Password, selectedRole],
      console.log('llegue'),
      function () {
        db.close();
      });
  });
}


app.get('/usuarios', (req, res) => {
  const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE);
  db.all('SELECT * FROM usuarios', (err, rows) => {
    db.close(); // Cierra la conexión después de realizar la consulta
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});




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



makeUser();

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en localhost:${PORT}`);
});


