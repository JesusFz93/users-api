const {
  getUsers_RP,
  getUser_RP,
  postUser_RP,
  putUser_RP,
  deleteUser_RP,
} = require("../repositories/users.rp");

const { getRole_RP } = require("../repositories/roles.rp");

const { encryptPassword_HP } = require("../helpers");

const getUsers_BL = async () => {
  const reqRows = await getUsers_RP();

  const result = await Promise.all(
    reqRows.map(async (x) => {
      const roleArray = await Promise.all(
        x.roles_id.map(async (role) => {
          const { name } = await getRole_RP("id", role);
          return name;
        })
      );

      return {
        id: x.id,
        roles: roleArray,
        firstName: x.first_name,
        lastName: x.last_name,
        email: x.email,
        userName: x.user_name,
        active: x.active,
        image: x.image,
      };
    })
  );

  return result;
};

const getUser_BL = async (searchCriteria, value) => {
  const reqRow = await getUser_RP(searchCriteria, value);

  if (!!reqRow) {
    const roleArray = await Promise.all(
      reqRow.roles_id.map(async (role) => {
        const { name } = await getRole_RP("id", role);
        return name;
      })
    );

    return {
      id: reqRow.id,
      roles: roleArray,
      firstName: reqRow.first_name,
      lastName: reqRow.last_name,
      email: reqRow.email,
      userName: reqRow.user_name,
      password: reqRow.password,
      phone: reqRow.phone,
      active: reqRow.active,
      image: reqRow.image,
    };
  }

  return reqRow;
};

const postUser_BL = async (newData) => {
  const { rolesId, firstName, lastName, userName, password, ...restData } =
    newData;

  const newUser = {
    ...restData,
    roles_id: rolesId,
    first_name: firstName,
    last_name: lastName,
    user_name: userName,
    password: encryptPassword_HP(password),
  };

  const reqRow = await postUser_RP(newUser);

  const roleArray = await Promise.all(
    reqRow.roles_id.map(async (role) => {
      const { name } = await getRole_RP("id", role);
      return name;
    })
  );

  const data = {
    id: reqRow.id,
    roles: roleArray,
    firstName: reqRow.first_name,
    lastName: reqRow.last_name,
    email: reqRow.email,
    userName: reqRow.user_name,
    password: reqRow.password,
    active: reqRow.active,
  };

  return data;
};

const putUser_BL = async (id, newData) => {
  const { rolesId, firstName, lastName, userName, password, ...restData } =
    newData;

  const updateData = {
    ...restData,
    roles_id: rolesId,
    first_name: firstName,
    last_name: lastName,
    password: encryptPassword_HP(password),
  };

  const reqRow = await putUser_RP(id, updateData);

  const roleArray = await Promise.all(
    reqRow.roles_id.map(async (role) => {
      const { name } = await getRole_RP("id", role);
      return name;
    })
  );

  const result = {
    id: reqRow.id,
    name: reqRow.name,
    roles: roleArray,
    firstName: reqRow.first_name,
    lastName: reqRow.last_name,
    email: reqRow.email,
    userName: reqRow.user_name,
    password: reqRow.password,
    active: reqRow.active,
  };

  return result;
};

const deleteUser_BL = async (id) => {
  const reqRow = await deleteUser_RP(id);

  const roleArray = await Promise.all(
    reqRow.roles_id.map(async (role) => {
      const { name } = await getRole_RP("id", role);
      return name;
    })
  );

  const result = {
    id: reqRow.id,
    roles: roleArray,
    firstName: reqRow.first_name,
    lastName: reqRow.last_name,
    email: reqRow.email,
    userName: reqRow.user_name,
    password: reqRow.password,
    active: reqRow.active,
  };
  return result;
};

module.exports = {
  getUsers_BL,
  getUser_BL,
  postUser_BL,
  putUser_BL,
  deleteUser_BL,
};
