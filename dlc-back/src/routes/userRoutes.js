const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/userControllers');





//CREAR EL USUARIO
router.post('/usuarios',  (req, res) => {
  try {
    usuariosController.makeUser(req, res);
    res.send('Usuario creado exitosamente.');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al crear el usuario.');
  }
});

// Definir la ruta para obtener usuarios
router.get('/usuarios', (req, res) => {
  // Aquí puedes utilizar la función definida en el controlador
  usuariosController.getUser(req, res);
});

router.post('/login', (req, res) => {
  usuariosController.loginUser(req, res);
});


module.exports = router;