const mongoose = require("mongoose");
const timestamp = require("mongoose-timestamp");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  family: { type: String, required: false },
  age: { type: Number, required: false },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  isActive: { type: Boolean, default: false },
  avatarUrl: { type: String, required: false }
}); 

mongoose.plugin(timestamp);

const User = mongoose.model("User", userSchema);

module.exports = User;
