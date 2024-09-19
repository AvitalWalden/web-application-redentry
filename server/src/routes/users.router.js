const { Router } = require("express");
const {
  getUsers,
  getUserById,
  updateUser,
  register,
  loginUser,
  getCurrentUser,
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

console.log("auttttttttttttttttttttttttttt")
router.get("/auth", authUser);

router.put("/updateUser/:id", updateUser);

router.delete("/deleteUser/:id", deleteUser);

router.get("/", getUsers);

router.get("/getUserById/:id", getUserById);

router.post("/signup", validateResource(createUserSchema), register);

router.post("/login", validateResource(createSessionSchema), loginUser);


router.get("/me", getCurrentUser);

router.get("/logout", logOut)

module.exports = router;
