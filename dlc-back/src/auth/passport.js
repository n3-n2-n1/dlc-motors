import passport from "passport";
import local from "passport-local";
import jwt from "passport-jwt";

import { createHash } from "../utils/bcrypt.js";

import { createUser } from "../controllers/users.controller.js";

const LocalStrategy = local.Strategy;
const JwtStrategy = jwt.Strategy;

const JWT_SECRET = process.env.JWT_SECRET || "secret";

const jwtOptions = {
  secretOrKey: JWT_SECRET,
};

const initializePassport = () => {
  passport.use(
    "register",
    new LocalStrategy(
      {
        passReqToCallback: true,
        usernameField: "email",
      },
      async (req, username, password, done) => {
        try {
          const { name } = req.body;
          let { role } = req.body;

          const newUser = {
            name,
            email: username,
            password: createHash(password),
            role: role || "user",
          };

          const result = await createUser(newUser);

          console.log(result);

          return done(null, result);
        } catch (error) {
          return done(null, false);
        }
      }
    )
  );
};

export default initializePassport;
