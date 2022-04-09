const validarJWT = require("../middlewares/validar-jwt.mw");

module.exports = {
  ...validarJWT,
};
