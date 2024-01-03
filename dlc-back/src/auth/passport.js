const passport = require("passport");
const local = require("passport-local");
const jwt = require("passport-jwt");

const {createHash} = require("../utils/bcrypt");

const LocalStrategy = local.Strategy;
const JwtStrategy = jwt.Strategy;

const JWT_SECRET = process.env.JWT_SECRET || "secret";

const {makeUser} = require("../controllers/userControllers");

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
          const { first_name, last_name } = req.body;
          let { role } = req.body;

          // const userExists = await userService.checkExistingUser(username);

          // if (userExists) {
          //   console.log("User already exists");
          //   return done(null, false);
          // }

          console.log(createHash(password))

          const newUser = {
            first_name,
            last_name,
            email: username,
            password: createHash(password),
            role: role || "user",
          };

          console.log(newUser)

          // Acá va la función del service para registrar el user
          const result = await makeUser(newUser);

          return done(null, result);
        } catch (error) {
          return done(null, false);
        }
      }
    )
  );

  // passport.use(
  //   "jwt",
  //   new JwtStrategy(jwtOptions, async (jwt_payload, done) => {
  //     try {
  //       return done(null, jwt_payload);
  //     } catch (error) {
  //       return done(error);
  //     }
  //   })
  // );
};

module.exports = initializePassport;
