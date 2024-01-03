// productosController.js
const db = require('../models/db');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbPath = path.join(__dirname, '../../productos.db');


const getErrorProducts = (req, res) => {
    const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err) => {
        try {
            if (err) throw err;

            db.all('SELECT * FROM errores', (queryErr, rows) => {
                db.close();

                if (queryErr) throw queryErr;

                res.json(rows);
            });
        } catch (error) {
            console.error(error.message);
            res.status(500).json({ error: 'Error en la consulta a la base de datos.' });
        }
    });
};


  module.exports = {
    getErrorProducts,

  }