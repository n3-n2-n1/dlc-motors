import dotenv from "dotenv";

dotenv.config({ path: ".env" });

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
    JWT_COOKIE: process.env.JWT_COOKIE,
  },
};

export default config;
