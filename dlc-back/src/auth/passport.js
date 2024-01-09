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
          const { name } = req.body;
          let { role } = req.body;
          
          const newUser = {
            name,
            email: username,
            password: createHash(password),
            role: role || "user",
          };

          const result = await makeUser(newUser);

          console.log(result)

          return done(null, result);
        } catch (error) {
          return done(null, false);
        }
      }
    )
  );

};

module.exports = initializePassport;
