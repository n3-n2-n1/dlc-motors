import db from "../database/db.js";
import jwt from "jsonwebtoken";

import { isValidPassword } from "../utils/bcrypt.js";

const secretKey = "12233"; // Debes cambiar esto y utilizar una clave segura

// Función para comparar contraseñas
async function passwordValidate (user, password) {
  return isValidPassword(user, password)
}

// Función para generar un token de sesión (deberías implementar esta función)
function generateSessionToken(userId) {
  const token = jwt.sign({ userId }, secretKey, { expiresIn: "1h" }); // Puedes ajustar el tiempo de expiración según tus necesidades
  return token;
}


export const createUser = async (newUser, res) => {
  const { name, email, password, role } = newUser;

  // console.log(newUser);

  db.query(
    "INSERT INTO usuarios (name, email, password, role) VALUES (?, ?, ?, ?)",
    [name, email, password, role],
    (err, results) => {
      if (err) {
        console.error(err.message);
        res.status(500).json({ error: "Error al crear el usuario" });
        return;
      }
      console.log(results);
      console.log('usuario creado')
    }
  );
};

export const getUsers = (req, res) => {
  db.query("SELECT * FROM usuarios", (err, results) => {
    if (err) {
      console.error(err.message);
      res.status(500).json({ error: "Error al obtener los usuarios" });
      return;
    }
    console.log(results);
    res.json(results);
  });
};

export const getUserByEmail = async (req, res) => {
  const email = req.params.email;

  db.query("SELECT * FROM usuarios WHERE Email = ?", [email], (err, results) => {
    if (err) {
      console.error(err.message);
      res.status(500).json({ error: `Error al obtener el usuario ${email}.` });
      return;
    }

    if (results.length === 0) {
      res.status(404).json({ error: `No se encontró el usuario ${email}.` });
      return;
    }

    res.json(results[0]);
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