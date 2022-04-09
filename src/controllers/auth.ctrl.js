const { generarJWT, comparePassword_HP } = require("../helpers");

const { getUserAuth_BL } = require("../business-logic/auth.bl");

const { GenericResponse, CustomMessages } = require("../helpers");

const login_CT = async (req, res = response) => {
  const resp = new GenericResponse();
  try {
    const { userName, password } = req.body;

    const user = await getUserAuth_BL("name", userName);

    if (!user) {
      resp.ok = false;
      resp.msg = CustomMessages.error_login;

      return res.status(400).json(resp);
    }

    if (!user.active) {
      resp.ok = false;
      resp.msg = "Usuario inactivo";
      return res.status(400).json(resp);
    }

    const validPassword = comparePassword_HP(password, user.contra);

    if (!validPassword) {
      resp.ok = false;
      resp.msg = CustomMessages.error_login;
      return res.status(400).json(resp);
    }

    const token = await generarJWT(user.id);

    const { contra, ...restUser } = user;

    return res.json({
      usuario: restUser,
      token,
    });
  } catch (error) {
    resp.ok = false;
    resp.msg = CustomMessages.error_500;

    return res.status(500).json(resp);
  }
};

const renewToken_CT = async (req, res = response) => {
  const { usuario } = req;

  const token = await generarJWT(usuario.id);

  const { contra, ...restUser } = usuario;

  return res.json({
    usuario: restUser,
    token,
  });
};

module.exports = {
  login_CT,
  renewToken_CT,
};
