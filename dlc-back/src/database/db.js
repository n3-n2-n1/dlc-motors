const mysql = require("mysql");

// Configuración de la conexión a la base de datos
const dbConfig = {
  host: "localhost",
  user: "crystal",
  password: "crystal",
  database: "crystal",
  port: 3306,
};

const connection = mysql.createConnection(dbConfig);

// Conectar a la base de datos
connection.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
  } else {
    console.log('Conexión exitosa a la base de datos');
  }
});

module.exports = connection;