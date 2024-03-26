import express from "express";
import cors from "cors";
// import cookieParser from "cookie-parser";
import cowsay from "cowsay";
import colors from "colors";

import routerAPI from "./src/routes/routes.js";
import initializePassport from "./src/auth/passport.js";

import config from "./src/config/config.js";

const app = express();
const { PORT } = config;

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

const env = async () => {
  app.use(cors(corsOptions));
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ limit: '50mb', extended: true }));

  // app.use(cookieParser());
  initializePassport();

  routerAPI(app);

  app.listen(PORT, () => {
    console.log(
      cowsay.say({
        text: `Servidor arriba en puerto ${PORT}!`,
        e: "O.o",
      }).rainbow
    );
  });
};

env();
