const { compare } = require("bcrypt");
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
  const id = request.params.id;
  console.log(request.body)
  const user = await updateUser(id, request.body);
  const newUser = await getUser(id);
  response.send(newUser);
};
exports.deleteUser = async function (request, response) {
  const id = request.params.id;
  await deleteUserById(id);
  response.send("succsed");
};

exports.getUserById = async function (request, response) {
  const id = request.params.id;
  const user = await getUser(id);
  response.send(user);
};

exports.authUser = async function (request, response) {
  try {
    console.log("olopioipuipuopuopuo")
    const token = request.cookies.token;
    console.log(token)

    const decode = await verifyJwt(token, "accessTokenPrivateKey");
    if (!decode)  throw [
      { message: "token is not valid" }];
    response.status(200);
    response.json({ success: true, user: decode._doc || decode });
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
    console.log(error);
    return response.status(500).send(error);
  }
};

exports.register = async function (request, response) {
  const body = request.body;
  try {
    const user = await createUser(body);
    response.status(201).json(user);
  } catch (error) {
    if (error.code === 11000) {
      return response.status(409).send("Account already exist");
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
      ;

    }
    console.log(user_password, user.user_password)
    const isValid = await compare(user_password, user.user_password);
    console.log(isValid, user_password, user.user_password)
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

exports.getCurrentUser = async function (request, response) {
  try {
    return response.status(200).json(response.locals.user);
  } catch (error) {
    console.log(error);
    return response.status(500).send(error);
  }
};

