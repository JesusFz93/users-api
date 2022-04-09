const Role = require("../models/role.model");

const getRoles_RP = async () => {
  return await Role.find();
};

const getRole_RP = async (searchCriteria, value) => {
  switch (searchCriteria) {
    case "name":
      return await Role.findOne({ name: value });
    case "id":
      return await Role.findById(value);
    default:
      return { id: 1, name: "NO_ROLE_CRITERIA" };
  }
};

const postRole_RP = async (newData) => {
  const newRole = new Role(newData);

  return await newRole.save();
};

const putRole_RP = async (id, newData) => {
  return await Role.findByIdAndUpdate(id, newData, { new: true });
};

const deleteRole_RP = async (id) => {
  return await Role.findByIdAndRemove(id);
};

module.exports = {
  getRoles_RP,
  getRole_RP,
  postRole_RP,
  putRole_RP,
  deleteRole_RP,
};
