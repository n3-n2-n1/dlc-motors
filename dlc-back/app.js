const express = require("express");
const cors = require('cors');
const usuariosRoutes = require('./src/routes/userRoutes');
const productosRoutes = require('./src/routes/productsRoutes');
const errorProductsRoutes = require('./src/routes/errorProductsRoutes');
const initializePassport = require('./src/auth/passport');
// const mysql = require('mysql');

const app = express();
const PORT = 3000;

const corsOptions = {
  origin: '*',
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());


// Usa los routers exportados
app.use(usuariosRoutes);
app.use(productosRoutes);
app.use(errorProductsRoutes);
initializePassport();

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en localhost:${PORT}`);
});
