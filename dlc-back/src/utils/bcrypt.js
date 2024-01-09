import bcrypt from "bcrypt";

export const createHash = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(12));

export const isValidPassword = (user, password) =>
  bcrypt.compareSync(password, user.password);
