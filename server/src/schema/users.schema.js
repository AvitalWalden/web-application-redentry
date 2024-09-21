const { object, string } = require("zod");
exports.createUserSchema = object({
  body: object({
    user_name: string({
      required_error: "name is required",
    }),
    user_password: string({
      required_error: "Password is required",
    }).min(6, "Password is too short - should be min 6 chars"),
    user_email: string({
      required_error: "Email is required",
    }).email("Not a valid email"),
  })
});