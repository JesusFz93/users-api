const { response, request } = require("express");
const jwt = require("jsonwebtoken");

const { getUserByUserNameOrIdAuth_BL } = require("../business-logic/users.bl");

const validarJWT = async (req = request, res = response, next) => {
  const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: "No hay token en la petición",
    });
  }

  try {
    const { id } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

    // leer el usuario que corresponde al id
    const usuario = await getUserByUserNameOrIdAuth_BL("id", id);

    if (!usuario) {
      return res.status(401).json({
        ok: false,
        msg: "Token no válido - usuario no existe DB",
      });
    }

    // Verificar si el uid tiene estado true
    if (!usuario.active) {
      return res.status(401).json({
        ok: false,
        msg: "Token no válido - usuario con estado: false",
      });
    }

    req.usuario = usuario;
    next();
  } catch (error) {
    // console.log(error);
    return res.status(401).json({
      ok: false,
      msg: "Token no válido",
    });
  }
};

module.exports = {
  validarJWT,
};
