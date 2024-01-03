// productosController.js
const db = require('../database/db');
// const sqlite3 = require('sqlite3').verbose();
// const path = require('path');
// const dbPath = '';


const getErrorProducts = (req, res) => {
    try {
      db.connect((err) => {
        if (err) throw err;
  
        db.query('SELECT * FROM errores', (queryErr, rows) => {
          db.end();
  
          if (queryErr) throw queryErr;
  
          res.json(rows);
        });
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: 'Error en la consulta a la base de datos.' });
    }
  };

  module.exports = {
    getErrorProducts,

  }