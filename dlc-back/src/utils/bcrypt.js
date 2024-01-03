const bcrypt = require("bcrypt");

const createHash = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(12));

const isValidPassword = (user, password) =>
  bcrypt.compareSync(password, user.password);

module.exports = { createHash, isValidPassword };
