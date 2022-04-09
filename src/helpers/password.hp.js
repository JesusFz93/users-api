const bycrypt = require("bcrypt");

const encryptPassword_HP = (password) => {
  const salt = bycrypt.genSaltSync(10);
  return bycrypt.hashSync(password, salt);
};

const comparePassword_HP = (password, encryptedPassword) => {
  return bycrypt.compareSync(password, encryptedPassword);
};

module.exports = { encryptPassword_HP, comparePassword_HP };
