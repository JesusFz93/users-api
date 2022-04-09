const User = require("../models/user.model");

const getUsers_RP = async () => {
  return await User.find();
};

const getUser_RP = async (searchCriteria, value) => {
  switch (searchCriteria) {
    case "name":
      return await User.findOne({ user_name: value });
    case "id":
      return await User.findById(value);
    default:
      return null;
  }
};

const postUser_RP = async (newData) => {
  const newUser = new User(newData);

  return await newUser.save();
};

const putUser_RP = async (id, newData) => {
  return await User.findByIdAndUpdate(id, newData, { new: true });
};

const deleteUser_RP = async (id) => {
  return await User.findByIdAndRemove(id);
};

module.exports = {
  getUsers_RP,
  getUser_RP,
  postUser_RP,
  putUser_RP,
  deleteUser_RP,
};
