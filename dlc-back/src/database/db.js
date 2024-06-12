import mysql from 'mysql';
import config from '../config/config.js';

// Configuración de la base de datos desde config.js
const dbConfig = {
  host: config.db.DB_HOST,
  user: config.db.DB_USER,
  password: config.db.DB_PASSWORD,
  database: config.db.DB_NAME,
  port: config.db.DB_PORT,
};

let connection;

function handleDisconnect() {
  connection = mysql.createConnection(dbConfig);

  connection.connect((err) => {
    if (err) {
      console.error('Error al conectar a la base de datos:', err);
      setTimeout(handleDisconnect, 2000);
    } else {
      console.log('Conexión exitosa a la base de datos');
    }
  });

  connection.on('error', (err) => {
    console.error('Error en la conexión:', err);
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      handleDisconnect();
    } else {
      throw err;
    }
  });
}

handleDisconnect();

export default connection;
