const { response, request } = require("express");

const {
  getRoles_BL,
  getRole_BL,
  postRole_BL,
  putRole_BL,
  deleteRole_BL,
} = require("../business-logic/roles.bl");

const { GenericResponse, CustomMessages } = require("../helpers");

const getRoles_CT = async (req = request, res = response) => {
  const resp = new GenericResponse();
  try {
    const reqRows = await getRoles_BL();

    resp.msg = "Roles obtenidos";
    resp.data = reqRows;

    return res.json(resp);
  } catch (error) {
    resp.ok = false;
    resp.msg = CustomMessages.error_500;

    return res.status(500).json(resp);
  }
};

const getRole_CT = async (req = request, res = response) => {
  const resp = new GenericResponse();
  try {
    const { id } = req.params;

    const reqRow = await getRole_BL("id", id);

    if (reqRow) {
      resp.msg = "Rol obtenido";
      resp.data = reqRow;

      return res.json(resp);
    } else {
      resp.ok = false;
      resp.msg = `Rol con el ${id} no existe`;
      resp.data = reqRow;
      return res.status(404).json(resp);
    }
  } catch (error) {
    resp.ok = false;
    resp.msg = CustomMessages.error_500;

    return res.status(500).json(resp);
  }
};

const postRole_CT = async (req = request, res = response) => {
  const resp = new GenericResponse();
  try {
    const { ...body } = req.body;

    const reqRow = await getRole_BL("name", body.name);

    if (reqRow) {
      resp.ok = false;
      resp.msg = `Rol ${reqRow.name}, ya existe`;

      return res.status(400).json(resp);
    }

    const createRole = {
      ...body,
    };

    const createdRole = await postRole_BL(createRole);

    resp.ok = true;
    resp.msg = "Rol creado";
    resp.data = createdRole;

    return res.status(201).json(resp);
  } catch (error) {
    console.log(error);
    resp.ok = false;
    resp.msg = CustomMessages.error_500;

    return res.status(500).json(resp);
  }
};

const putRole_CT = async (req = request, res = response) => {
  const resp = new GenericResponse();
  try {
    const { id } = req.params;
    const { name, ...body } = req.body;

    const reqRow = await getRole_BL("id", id);

    if (!reqRow) {
      resp.ok = false;
      resp.msg = `Rol con el ${id} no existe`;

      return res.status(404).json(resp);
    }

    const updateRole = {
      ...body,
    };

    const updatedRole = await putRole_BL(id, updateRole);

    resp.msg = "Rol actualizado";
    resp.data = updatedRole;

    return res.json(resp);
  } catch (error) {
    resp.ok = false;
    resp.msg = CustomMessages.error_500;

    return res.status(500).json(resp);
  }
};

const deleteRole_CT = async (req, res = response) => {
  const resp = new GenericResponse();
  try {
    const { id } = req.params;

    const reqRow = await getRole_BL("id", id);

    if (!reqRow) {
      resp.ok = false;
      resp.msg = `Rol con el ${id} no existe`;

      return res.status(404).json(resp);
    }

    const deletedRole = await deleteRole_BL(id);

    resp.msg = "Rol eliminado";
    resp.data = deletedRole;

    return res.json(resp);
  } catch (error) {
    resp.ok = false;
    resp.msg = CustomMessages.error_500;

    return res.status(500).json(resp);
  }
};

module.exports = {
  getRoles_CT,
  getRole_CT,
  postRole_CT,
  putRole_CT,
  deleteRole_CT,
};
