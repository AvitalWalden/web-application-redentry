const mongoose = require("mongoose");
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema(
  {
    user_email: { type: String, required: true, unique: true },
    user_name: { type: String, required: true },
    user_password: { type: String, required: true },
    premission: { type: String, default: "Regular" }
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  try {
    const hashedhPassword = await bcrypt.hash(this.user_password, 10);
    console.log("ggggg",hashedhPassword)
    this.user_password = hashedhPassword;
    console.log("gggggfffffffffffff",hashedhPassword)

  } catch (err) {
    next(err);
  }
});

module.exports = mongoose.model("Users", userSchema);

