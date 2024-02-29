import mysql from "mysql";
import config from "../config/config.js";

const {
  db: { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT },
} = config;

const dbConfig = {
  host: DB_HOST, // Host local debido al túnel SSHs
  user: DB_USER, // Tu usuario de la base de datos
  password: DB_PASSWORD, // Tu contraseña de la base de datos
  database: DB_NAME, // El nombre de tu base de datos
  port: DB_PORT, // El puerto local del túnel SSH
};

const db = mysql.createConnection(dbConfig);

// Conectar a la base de datos
db.connect((err) => {
  if (err) {
    console.error("Error al conectar a la base de datos:", err);
  } else {
    console.log("Conexión exitosa a la base de datos");
  }
});

export default db;
