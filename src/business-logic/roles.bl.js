const {
  getRoles_RP,
  getRole_RP,
  postRole_RP,
  putRole_RP,
  deleteRole_RP,
} = require("../repositories/roles.rp");

const getRoles_BL = async () => {
  const reqRows = await getRoles_RP();

  const result = reqRows.map((reqRow) => {
    return {
      id: reqRow.id,
      name: reqRow.name,
    };
  });

  return result;
};

const getRole_BL = async (searchCriteria, value) => {
  const reqRow = await getRole_RP(searchCriteria, value);

  if (!!reqRow) {
    return {
      id: reqRow.id,
      name: reqRow.name,
    };
  }

  return reqRow;
};

const postRole_BL = async (newData) => {
  const { catName, ...restData } = newData;

  const newRole = {
    ...restData,
    cat_name: catName,
  };

  const reqRow = await postRole_RP(newRole);

  const result = {
    id: reqRow.id,
    name: reqRow.name,
  };

  return result;
};

const putRole_BL = async (id, newData) => {
  const { name, ...restData } = newData;

  const updateData = {
    ...restData,
  };

  const reqRow = await putRole_RP(id, updateData);

  const result = {
    id: reqRow.id,
    name: reqRow.name,
  };

  return result;
};

const deleteRole_BL = async (id) => {
  const reqRow = await deleteRole_RP(id);

  const result = {
    id: reqRow.id,
    name: reqRow.name,
  };
  return result;
};

module.exports = {
  getRoles_BL,
  getRole_BL,
  postRole_BL,
  putRole_BL,
  deleteRole_BL,
};
