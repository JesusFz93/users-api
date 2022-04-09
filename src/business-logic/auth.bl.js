const { getUser_RP } = require("../repositories/users.rp");
const { getRole_RP } = require("../repositories/roles.rp");

const getUserAuth_BL = async (searchCriteria, value) => {
  const result = await getUser_RP(searchCriteria, value);

  if (!!result) {
    const roleArray = await Promise.all(
      result.roles_id.map(async (role) => {
        const { name } = await getRole_RP("id", role);
        return name;
      })
    );
    return {
      id: result.id,
      roles: roleArray,
      firstName: result.first_name,
      lastName: result.last_name,
      email: result.email,
      userName: result.user_name,
      contra: result.password,
      active: result.active,
      image: result.image,
    };
  }

  return result;
};

module.exports = {
  getUserAuth_BL,
};
