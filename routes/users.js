const mongoose = require("mongoose")
const plm = require("passport-local-mongoose")

// mongoose.connect("mongodb+srv://sikarwar1606:Bu5F9ylZFLFL9ob6@cluster0.epjwokb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")

const userSchema = mongoose.Schema({
  username: String,
  user_designation: String,
  user_id: String,
  secret: String
});

userSchema.plugin(plm);

module.exports = mongoose.model("user", userSchema);
