import jwt from "jsonwebtoken";
import config from "../config/config.js";

const {
  jwt: { JWT_SECRET },
} = config;

export const verifyRole = (req, res, next, rolesToVerify) => {
  // const token = req.cookies.userJWT;
  // ! VER DE DONDE MIERDA SACO EL PUTO TOKEN

  if (!token) {
    return res.status(401).send({
      status: "error",
      error: "No authorization token provided.",
    });
  }

  const { role } = jwt.verify(token, JWT_SECRET);

  if (!rolesToVerify.includes(role)) {
    return res.status(403).send({
      status: "error",
      error: "No authorization to access this resource.",
    });
  }

  next();
};
