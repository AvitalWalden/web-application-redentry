const UserModel = require("../models/users.model");

exports.createUser = function (input) {  
    return UserModel.create(input);
};

exports.findUserByEmail = function (user_email) {
  return UserModel.findOne({ user_email });
};

exports.findUserById = function (id) {
  return UserModel.findById(id);
};

exports.getAllUsers = function () {
  return UserModel.find();
};

exports.getUser = function (id) {
  return UserModel.findById(id);
};

exports.deleteUserById = function (id) {
  return UserModel.findByIdAndDelete(id);
};

exports.updateUser = async function (id,body) {
  return await UserModel.findByIdAndUpdate(id,body);
};


