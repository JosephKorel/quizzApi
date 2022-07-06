const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  profileImage: {
    data: Buffer,
    contentType: String,
  },
});

module.exports = mongoose.model("userinfos", userSchema);
