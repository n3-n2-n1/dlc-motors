import { userService } from "../services/services.js";
import config from "../config/config.js";

const {
  jwt: { JWT_COOKIE },
} = config;

export const registerUser = async (req, res) => {
  try {
    return res
      .status(201)
      .send({ status: "success", message: "User registered" });
  } catch (error) {
    return res
      .status(500)
      .send({ status: "error", error: `Failed to register user: ${error}` });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await userService.getUsers();

    if (!users || users.length === 0) {
      return res.status(404).send({
        status: "error",
        error: "No Users found",
      });
    }

    res.status(200).send({
      status: "success",
      payload: users,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      status: "error",
      error: "Failed to get Users",
    });
  }
};

export const getUserByUsername = async (req, res) => {
  const { username } = req.params;

  if (!username) {
    return res.status(400).send({
      status: "error",
      error: "Incomplete values",
    });
  }

  const user = await userService.getUserByUsername(username);

  if (!user || user.length === 0) {
    return res.status(404).send({
      status: "error",
      error: `User with username '${username}' was not found`,
    });
  }

  res.status(200).send({
    status: "success",
    payload: user,
  });
};

//Loguearse
export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .send({ status: "error", error: "Datos incompletos." });
    }

    const user = await userService.getUserByUsername(username);

    if (!user || user.length === 0) {
      return res
        .status(401)
        .json({ error: "Usuario incorrecto o inexistente" });
    }

    if (!userService.passwordValidate(user, password)) {
      return res
        .status(401)
        .send({ status: "error", error: "Contraseña incorrecta." });
    }

    const token = userService.loginUser(user);

    if (!token) {
      return res
        .status(500)
        .send({
          status: "error",
          error: "Error al generar token de autenticación",
        });
    }

    return res
      .cookie(JWT_COOKIE, token, { httpOnly: true })
      .send({ status: "success", message: "Logueado exitosamente" });
  } catch (error) {
    console.error("Error al intentar iniciar sesión:", error);
    res.status(500).json({ error: "Error interno del servidor", error });
  }
};

export const updateUser = async (req, res) => {
  try {
    const username = req.params.username;

    if (!username) {
      return res.status(400).send({
        status: "error",
        error: "Falta el nombre de usuario",
      });
    }

    const userToUpdate = req.body;

    if (!userToUpdate) {
      return res.status(400).send({
        status: "error",
        error: "Faltan los datos del usuario a editar",
      });
    }

    const userUpdated = await userService.editUser(userToUpdate);

    if (!userUpdated) {
      return res.status(404).send({
        status: "error",
        error: `Error al editar el usuario ${username}`,
      });
    }

    res.status(200).send({
      status: "success",
      payload: userUpdated,
    });
  } catch (error) {
    console.error("Error al intentar editar usuario", error);
    res.status(500).send({
      status: "error",
      error: `Error interno del servidor: ${error}`,
    });
  }
};

export const logoutUser = async (req, res) => {
  return sessionStorage.removeItem("miTokenJWT").then(location.reload());
};
