import { Router } from "express";
import passport from "passport";
import { verifyRole } from '../middlewares/auth.js';
import {
  getUsers,
  getUserWithToken,
  registerUser,
  loginUser,
  logoutUser,
  updateUser,
} from "../controllers/users.controller.js";

const usersRouter = Router();

usersRouter.post("/login", loginUser);

usersRouter.post(
  "/register",
  passport.authenticate("register", {
    session: false,
  }),
  registerUser
);

usersRouter.get(
  "/",
  passport.authenticate('jwt', { session: false }),
  // (req, res, next) => verifyRole(req, res, next, ['admin', 'vendedor', "Operador de depósito"]),
  getUsers
);

usersRouter.get(
  "/check",
  passport.authenticate('jwt', { session: false }),
  // (req, res, next) => verifyRole(req, res, next, ['admin', 'vendedor', "Operador de depósito"]),
  getUserWithToken
);

usersRouter.put("/:username", (req, res) => {
    // passport.authenticate('jwt', { session: false }),
  updateUser(req, res);
});

usersRouter.get("/logout", logoutUser);


export default usersRouter;
