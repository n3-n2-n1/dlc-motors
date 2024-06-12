import passport from "passport";
import local from "passport-local";
import jwt from "passport-jwt";

import { createHash } from "../utils/bcrypt.js";

import config from "../config/config.js";

import { userService } from "../services/services.js";


const JWT_SECRET = 'secret';

const LocalStrategy = local.Strategy;
const JwtStrategy = jwt.Strategy;
const extractJwt = jwt.ExtractJwt;

const jwtOptions = {
  secretOrKey: JWT_SECRET,
  jwtFromRequest: extractJwt.fromAuthHeaderAsBearerToken()
};

const initializePassport = () => {
  passport.use(
    "register",
    new LocalStrategy(
      {
        passReqToCallback: true,
        usernameField: "username",
      },
      async (req, username, password, done) => {
        try {
          let { name, role } = req.body;
          
          const newUser = {
            username: username,
            name: name,
            password: createHash(password),
            role: role || "user",
          };
          
          const result = await userService.registerUser(newUser);

          return done(null, result);
        } catch (error) {
          console.log("Error de passport:", error)
          return done(null, false);
        }
      }
    )
  );

  passport.use(
    'jwt',
    new JwtStrategy(jwtOptions, async (jwt_payload, done) => {
      try {
        return done(null, jwt_payload)
      } catch (error) {
        return done(error)
      }
    })
  )
};

export default initializePassport;
