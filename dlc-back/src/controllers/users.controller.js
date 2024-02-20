import {userService}  from "../services/services.js";

// export const createUser = async (newUser, res) => {
//   const { name, password, role } = newUser;

//   // console.log(newUser);

//   db.query(
//     "INSERT INTO usuarios (name, password, role) VALUES (?, ?, ?, ?)",
//     [name, password, role],
//     (err, results) => {
//       if (err) {
//         console.error(err.message);
//         res.status(500).json({ error: "Error al crear el usuario" });
//         return;
//       }
//     }
//   );
// };

export const registerUser = async (req, res) => {
  try {
    console.log("user registrado")
    // return res
    //   .status(201)
    //   .send({ status: 'success', message: 'User registered' })
  } catch (error) {
    console.trace(`Failed to register user: ${error}`)
    // return res
    //   .status(500)
    //   .send({ status: 'error', error: 'Failed to register user' })
  }
}

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

export const getUserByEmail = async (req, res) => {
  const { email } = req.params;

  if (!email) {
    return res.status(400).send({
      status: "error",
      error: "Incomplete values",
    });
  }

  const user = await userService.getUserByEmail(email);

  if (!user || user.length === 0) {
    return res.status(404).send({
      status: "error",
      error: `User with email '${email}' was not found`,
    });
  }

  res.status(200).send({
    status: "success",
    payload: user,
  });
};

export const getUserByEmailAlt = (email) => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM usuarios WHERE Email = ?", [email], (err, results) => {
      if (err) {
        console.error(`Error al obtener el usuario ${email}: ${err}`);
        reject(err);
      } else if (results.length === 0) {
        console.error(`No se encontró el usuario ${email}.`);
        resolve(null);
      } else {
        resolve(results[0]);
      }
    });
  });
};

//Loguearse
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .send({ status: 'error', error: 'Datos incompletos.' })
    }

    // Obtener usuario por correo electrónico desde la base de datos
    // Esto vuela cuando se refactoriza a MVC piola
    const user = await getUserByEmailAlt(email);

    if (!user) {
      return res.status(401).json({ error: "Usuario incorrecto", email });
    }

    if (!passwordValidate(user, password)) {
      return res
        .status(401)
        .send({ status: 'error', error: 'Contraseña incorrecta.' })
        // generalizar este mensaje luego
    }
s
    // // Verificar si la contraseña coincide (en texto plano)
    // if (password !== user.password) {
    //   return res.status(401).json({ error: "Contraseña incorrecta" });
    // }

    const token = generateSessionToken(user.email);
    // Verificar si la respuesta ya ha sido enviada antes de enviarla nuevamente
    if (!res.headersSent) {
      res.json({ token });
    }
  } catch (error) {
    console.error("Error al intentar iniciar sesión:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}


// export const errorFatal = async (req, res) =>{
//   return res
//   .status(401)
//   .send({ status: 'error', error: 'Contraseña incorrecta.' })
// }


export const logoutUser = async (req, res) => {
  return sessionStorage.removeItem('miTokenJWT').then(
    location.reload()
  )
}