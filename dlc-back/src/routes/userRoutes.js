const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/userControllers');

// Definir la ruta para crear un usuario
router.post('/usuarios', (req, res) => {
  usuariosController.makeUser();
  res.send('Usuario creado exitosamente.');
});

// Definir la ruta para obtener usuarios
router.get('/usuarios', (req, res) => {
  // Aquí puedes utilizar la función definida en el controlador
  usuariosController.getUser(req, res);
});

module.exports = router;