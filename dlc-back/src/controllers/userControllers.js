// usuariosController.js
const sqlite3 = require('sqlite3').verbose();

const path = require('path');
const dbPath = path.join(__dirname, '../../productos.db');

const jwt = require('jsonwebtoken');
const secretKey = '12233'; // Debes cambiar esto y utilizar una clave segura

const bcrypt = require('bcrypt');

// Función para comparar contraseñas
async function comparePasswords(inputPassword, hashedPassword) {
  try {
    // Compara la contraseña proporcionada con la contraseña almacenada en forma de hash
    const match = await bcrypt.compare(inputPassword, hashedPassword);
    return match;
  } catch (error) {
    // Maneja cualquier error que pueda ocurrir durante la comparación
    console.error('Error al comparar contraseñas:', error);
    throw new Error('Error al comparar contraseñas');
  }
}


// Función para generar un token de sesión (deberías implementar esta función)
function generateSessionToken(userId) {
  const token = jwt.sign({ userId }, secretKey, { expiresIn: '1h' }); // Puedes ajustar el tiempo de expiración según tus necesidades
  return token;
}

// Crear usuario
function makeUser(req, res) {
  const { email, password } = req.body;

  const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE);

  db.run('INSERT INTO usuarios (Email, Password) VALUES (?, ?)', [email, password], (err) => {
    if (err) {
      console.error(err.message);
      res.status(500).json({ error: 'Error al crear el usuario' });
      db.close();  // Asegúrate de cerrar la base de datos en caso de error
    } else {
      db.close();  // Cierra la base de datos después de enviar la respuesta
      return;  // Agrega un return aquí
    }
  });
}



//Obterner usuariosss
const getUser = (req, res) => {
  const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE);

  db.all('SELECT * FROM usuarios', (err, rows) => {
    db.close();

    if (err) {
      console.error(err.message);
      res.status(500).json({ error: 'Error en la consulta a la base de datos.' });
      return;
    }

    res.json(rows);
  });
};



async function getUserByEmail(email) {
  const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE);

  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM usuarios WHERE Email = ?', [email], (err, row) => {
      db.close();

      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
}

//Loguearse
async function loginUser(req, res) {
  const { email, password } = req.body;

  try {
    // Obtener usuario por correo electrónico desde la base de datos
    const user = await getUserByEmail(email);

    if (!user) {
      return res.status(401).json({ error: 'Usuario no encontrado!', email });
    }

    // Verificar si la contraseña coincide (en texto plano)
    if (password !== user.password) {
      return res.status(401).json({ error: 'Contraseña incorrecta' });
    }


    const token = generateSessionToken(user.id);
    // Verificar si la respuesta ya ha sido enviada antes de enviarla nuevamente
    if (!res.headersSent) {
      res.json({ token });
    }

    res.json({ token });
  } catch (error) {
    console.error('Error al intentar iniciar sesión:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}






module.exports = {
  makeUser,
  getUser,
  loginUser,
};
