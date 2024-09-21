const { Router } = require("express");
const {
  getUsers,
  getUserById,
  updateUser,
  register,
  loginUser,
  deleteUser,
  authUser,
  logOut,
} = require("../controllers/users.controller.js");
const validateResource = require("../middleware/validateResource.js");
const {
  createUserSchema, 
} = require("../schema/users.schema.js");

const { createSessionSchema } = require("../schema/auth.schema.js");

const router = Router();

router.get("/auth", authUser);

router.put("/updateUser/:id", validateResource(createUserSchema), updateUser);

router.delete("/deleteUser/:id", deleteUser);

router.get("/", getUsers);

router.get("/getUserById/:id", getUserById);

router.post("/signup", validateResource(createUserSchema), register);

router.post("/login", validateResource(createSessionSchema), loginUser);

router.get("/logout", logOut)

module.exports = router;
