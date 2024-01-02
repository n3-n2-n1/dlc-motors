// import { FormValues } from "../../pages/Register/Register";
// import express from 'express';
// import sqlite3 from 'sqlite3';


interface User {
    id: number;
    name: string;
    // Otros campos según la estructura de tus datos de usuario
  }

const fetchUser = async (): Promise<User[]> => {
    try {
      const response = await fetch('http://localhost:3000/usuarios');
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const userData: User[] = await response.json();
      return userData;
    } catch (error) {
      console.error('Error fetching user data:', error);
      throw error;
    }
}


export {fetchUser}

// const app = express();
// const dbPath = './productos.db';



// //Esto es una falopa para que funcione no deberia estar acá xd
// interface Request {
//   res: any,
//   req: any
// }


// //Esto tambien es falopa jajajaja 
// interface Values {
//   values: any
// }


// //A esto le falta fijate si funciona bien


// // hay dramas acá con el tema chuncks como q quiero acceder per otira q hay drama con el process ni idea
// const createProduct = () => {

//   app.post('/productos', (req, res) => {
    
//     const { Codigo, Producto, Rubro, CodBarras, Precio, Stock } = req.body;
//     const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE);
//     const insertQuery = `INSERT INTO productos (Codigo, Producto, Rubro, CodBarras, Precio, Stock) VALUES (?, ?, ?, ?, ?, ?)`;

//     db.run(insertQuery, [Codigo, Producto, Rubro, CodBarras, Precio, Stock], function (err) {
//       db.close(); // Cierra la conexión después de realizar la inserción
//       if (err) {
//         res.status(500).json({ error: err.message });
//         return;
//       }
//       res.json({ id: this.lastID });
//     });
//   });

// }

// //A esto le esta faltando inyectarle los valores que capturamos en FormData
// export const createUser = async (userData: FormValues) => {
//   try {
//     const response = await fetch('/usuarios', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(userData),
//     });

//     if (!response.ok) {
//       const errorData = await response.json();
//       throw new Error(errorData.error);
//     }

//     const responseData = await response.json();
//     console.log('User created successfully:', responseData);
//   } catch (error: any) {
//     console.error('Error creating user:', error.message);
//   }
// };


// export const getUsers = () => {

// app.get('/usuarios', (req, res) => {
//   const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE);
//   db.all('SELECT * FROM usuarios', (err, rows) => {
//     db.close(); // Cierra la conexión después de realizar la consulta
//     if (err) {
//       res.status(500).json({ error: err.message });
//       return;
//     }
//     res.json(rows);
//   });
// });

// }



// export default {
//   createProduct,
// }



