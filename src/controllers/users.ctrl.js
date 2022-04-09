const { response, request } = require("express");

const {
  getUsers_BL,
  getUser_BL,
  postUser_BL,
  putUser_BL,
  deleteUser_BL,
} = require("../business-logic/users.bl");

const { GenericResponse, CustomMessages } = require("../helpers");

const getUsers_CT = async (req = request, res = response) => {
  const resp = new GenericResponse();
  try {
    const reqRows = await getUsers_BL();

    resp.msg = "Usuarios obtenidos";
    resp.data = reqRows;

    return res.json(resp);
  } catch (error) {
    resp.ok = false;
    resp.msg = CustomMessages.error_500;

    return res.status(500).json(resp);
  }
};

const getUser_CT = async (req = request, res = response) => {
  const resp = new GenericResponse();
  try {
    const { id } = req.params;

    const reqRow = await getUser_BL("id", id);

    if (reqRow) {
      resp.msg = "Usuario obtenido";
      resp.data = reqRow;

      return res.json(resp);
    } else {
      resp.ok = false;
      resp.msg = `Usuario con el ${id} no existe`;
      resp.data = reqRow;
      return res.status(404).json(resp);
    }
  } catch (error) {
    resp.ok = false;
    resp.msg = CustomMessages.error_500;

    return res.status(500).json(resp);
  }
};

const postUser_CT = async (req = request, res = response) => {
  const resp = new GenericResponse();
  try {
    const { ...body } = req.body;

    const reqRow = await getUser_BL("name", body.userName);

    if (reqRow) {
      resp.ok = false;
      resp.msg = `Usuario ${reqRow.userName}, ya existe`;

      return res.status(400).json(resp);
    }

    const createUser = {
      ...body,
    };

    const createdUser = await postUser_BL(createUser);

    resp.ok = true;
    resp.msg = "Usuario creado";
    resp.data = createdUser;

    return res.status(201).json(resp);
  } catch (error) {
    console.log(error);
    resp.ok = false;
    resp.msg = CustomMessages.error_500;

    return res.status(500).json(resp);
  }
};

const putUser_CT = async (req = request, res = response) => {
  const resp = new GenericResponse();
  try {
    const { id } = req.params;
    const { name, ...body } = req.body;

    const reqRow = await getUser_BL("id", id);

    if (!reqRow) {
      resp.ok = false;
      resp.msg = `Usuario con el ${id} no existe`;

      return res.status(404).json(resp);
    }

    if (body.password === "") {
      delete body.password;
    }

    if (body.rolesId === "") {
      delete body.rolesId;
    }

    const updateUser = {
      ...body,
    };

    const updatedUser = await putUser_BL(id, updateUser);

    resp.msg = "Usuario actualizado";
    resp.data = updatedUser;

    return res.json(resp);
  } catch (error) {
    resp.ok = false;
    resp.msg = CustomMessages.error_500;

    return res.status(500).json(resp);
  }
};

const deleteUser_CT = async (req, res = response) => {
  const resp = new GenericResponse();
  try {
    const { id } = req.params;

    const reqRow = await getUser_BL("id", id);

    if (!reqRow) {
      resp.ok = false;
      resp.msg = `Usuario con el ${id} no existe`;

      return res.status(404).json(resp);
    }

    const deletedUser = await deleteUser_BL(id);

    resp.msg = "Usuario eliminado";
    resp.data = deletedUser;

    return res.json(resp);
  } catch (error) {
    resp.ok = false;
    resp.msg = CustomMessages.error_500;

    return res.status(500).json(resp);
  }
};

module.exports = {
  getUsers_CT,
  getUser_CT,
  postUser_CT,
  putUser_CT,
  deleteUser_CT,
};
