import { Router } from "express";
import passport from "passport";

import {
  getUsers,
  getUserByEmail,
  // createUser,
  registerUser,
  loginUser,
  logoutUser,
} from "../controllers/users.controller.js";

const usersRouter = Router();

// Definir la ruta para obtener usuarios
usersRouter.get("/", (req, res) => {
  getUsers(req, res);
});

usersRouter.get("/:email", (req, res) => {
  getUserByEmail(req, res);
});

//CREAR EL USUARIO
usersRouter.post(
  "/register",
  passport.authenticate("register", {
    session: false,
  }),
  // (req, res) => {
  //   try {
  //     createUser(req, res);
  //     res.send("Usuario creado exitosamente.");
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).send("Error al crear el usuario.");
  //   }
  // }
  registerUser
);

usersRouter.post("/login", (req, res) => {
  loginUser(req, res);
});

usersRouter.post("/logout", (req, res) => {
  logoutUser(req, res);
});


export default usersRouter;
