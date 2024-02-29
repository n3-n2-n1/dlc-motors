import { userService } from "../services/services.js";

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

export const getUserWithToken = async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1]

    if (!token) {
      return res.status(400).send({
        status: 'error',
        error: 'Incomplete values'
      })
    }

    const user = await userService.decodeUser(token)

    if (!user) {
      return res.status(404).send({
        status: 'error',
        error: 'Error obteniendo datos de usuario'
      })
    }

    return res.status(200).send({
      status: 'success',
      payload: user
    })
  } catch (error) {
    console.error(`${error}`)
    return res.status(500).send({ status: 'error', error: `${error}` })
  }
}

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

    return res.send({
      status: "success",
      message: "Logueado exitosamente",
      token
    });
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
  const token = req.headers.authorization.split(' ')[1]
  const { username } = await userService.decodeUser(token)

  if (!username) {
    return res.status(500).send({
      status: 'error',
      error: 'Error al buscar el usuario a desloguear'
    })
  }
  return res.send({ status: 'success', message: 'Deslogueo correcto' })
}