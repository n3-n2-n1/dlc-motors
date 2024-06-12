import dotenv from 'dotenv';
import path from 'path';

// Cargar el archivo correcto dependiendo del entorno
const envFile = process.env.NODE_ENV === 'production' ? '.env' : '.env.local';
dotenv.config({ path: path.resolve(process.cwd(), envFile) });

const config = {
  PORT: process.env.PORT || 3000,
  db: {
    DB_HOST: process.env.DB_HOST,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_NAME: process.env.DB_NAME,
    DB_PORT: process.env.DB_PORT,
  },
  jwt: {
    JWT_SECRET: process.env.JWT_SECRET,
  },
};

export default config;
