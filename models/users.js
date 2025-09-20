const mongoose = require("mongoose");
const plm = require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String }, // keep it if you still want a display name
  user_id: { type: String, unique: true, required: true }, // <-- will be used for login
  user_designation: String,
  role: { type: String, enum: ["admin", "manager", "employee", "hr"], default: "employee" },
  department: String,
  secret: String
}, { timestamps: true });

// 👇 tell passport-local-mongoose to use `user_id` instead of `username`
userSchema.plugin(plm, { usernameField: "user_id" });

module.exports = mongoose.model("User", userSchema);
