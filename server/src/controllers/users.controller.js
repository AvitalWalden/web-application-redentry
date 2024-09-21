const { compare } = require("bcrypt");
const bcrypt = require("bcrypt")

const {
  createUser,
  findUserByEmail,
  findUserById,
  getAllUsers,
  getUser,
  deleteUserById,
  updateUser
} = require("../service/user.service.js");
const { signJwt, verifyJwt } = require("../utils/jwt.js");

exports.getUsers = async function (request, response) {
  try {
    const users = await getAllUsers();
    response.status(200);
    response.json(users);
  } catch (error) {
    response.status(500).send(error);
  }
};

exports.updateUser = async function (request, response) {
  try {
    const id = request.params.id;
    const user = await findUserByEmail(request.body.user_email)
    if (user && user._id != id) {
      throw [
        { message: "This email already exists in the system" }];
    }
    const hashedhPassword = await bcrypt.hash(request.body.user_password, 10);
    request.body.user_password = hashedhPassword;
    await updateUser(id, request.body);
    const newUser = await getUser(id);
    response.send(newUser);
  } catch (error) {
    response.status(500).send(error);
  }

};

exports.deleteUser = async function (request, response) {
  try {
    const id = request.params.id;
    await deleteUserById(id);
    response.send("succsed");
  } catch (error) {
    response.status(500).send(error);
  }
};

exports.getUserById = async function (request, response) {
  try {
    const id = request.params.id;
    const user = await getUser(id);
    response.send(user);
  } catch (error) {
    response.status(500).send(error);
  }
};

exports.authUser = async function (request, response) {
  try {
    const token = request.cookies.token;
    const decode = verifyJwt(token, "accessTokenPrivateKey");
    const id = decode._doc._id;
    const user = await getUser(id);
    if (!decode) throw [
      { message: "token is not valid" }];
    response.status(200);
    response.json({ success: true, user: user });
  } catch (error) {
    response.status(500);
    response.send({ error: error.message });
  }
};

exports.logOut = async function (request, response) {
  try {
    response.clearCookie("token");
    response.status(200);
    response.json({ success: true, message: "success to logOut" });
  } catch (error) {
    return response.status(500).send(error);
  }
};

exports.register = async function (request, response) {
  try {
    const body = request.body;
    const user = await createUser(body);
    user.user_password = "*******";
    //  sign a access token
    const token = signJwt({ ...user }, "accessTokenPrivateKey");
    response.cookie("token", token, { httpOnly: true, maxAge: 1000 * 60 * 60 });
    response.status(201).json(user);
  } catch (error) {
    if (error.code === 11000) {
      return response.status(409).send([
        { message: "Account already exist" }
      ]);
    }
    return response.status(500).send(error);
  }
};

exports.loginUser = async function (request, response) {
  try {
    const { user_email, user_password } = request.body;
    const user = await findUserByEmail(user_email);
    if (!user) {
      throw [
        { message: "user not exists" }
      ]
    }
    const isValid = await compare(user_password, user.user_password);
    if (!isValid) {
      throw [
        { message: "password not valid" }]
    }
    user.user_password = "*******";
    //  sign a access token
    const token = signJwt({ ...user }, "accessTokenPrivateKey");

    response.cookie("token", token, { httpOnly: true, maxAge: 1000 * 60 * 60 });

    return response.status(200).json(user);
  } catch (error) {
    console.log(error);
    return response.status(500).json(error);
  }
};

