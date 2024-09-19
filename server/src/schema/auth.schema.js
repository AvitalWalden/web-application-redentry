const { object, string } = require("zod"); 

exports.createSessionSchema = object({
  body: object({
    user_email: string({
      required_error: "Email is required",
    }).email("Invalid email or password"),
    user_password: string({
      required_error: "Password is required",
    }).min(6, "Invalid email or password"),
  }),
});

