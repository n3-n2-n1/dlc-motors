const express = require("express");
const router = express.Router();
const usuariosController = require("../controllers/userControllers");
const passport = require("passport");

//CREAR EL USUARIO
router.post(
  "/usuarios/registro",
  passport.authenticate("register", {
    session: false,
  }),
  (req, res) => {
    try {
      usuariosController.makeUser(req, res);
      res.send("Usuario creado exitosamente.");
    } catch (error) {
      console.error(error);
      res.status(500).send("Error al crear el usuario.");
    }
  }
);

// Definir la ruta para obtener usuarios
router.get("/usuarios", (req, res) => {
  // Aquí puedes utilizar la función definida en el controlador
  usuariosController.getUsers(req, res);
});

router.get("/usuarios/:email", (req, res) => {
  // Aquí puedes utilizar la función definida en el controlador
  usuariosController.getUserByEmail(req, res);
});

router.post("/usuarios/login", (req, res) => {
  usuariosController.loginUser(req, res);
});

router.post("/logout", (req, res) => {
  // Aquí puedes utilizar la función definida en el controlador
  usuariosController.logoutUser(req, res);
});

router.post("/404", (req, res) => {
  usuariosController.errorFatal(req,res);
})


module.exports = router;
