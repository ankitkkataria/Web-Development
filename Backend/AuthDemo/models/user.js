const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username cannot be blank"],
  },
  hashedPassword: {
    type: String,
    required: [true, "Password cannot be blank"],
  },
});

const User = mongoose.model('User',userSchema);
module.exports = User;

// Whatever you did in above two lines can also be done on the same one.
// module.exports = mongoose.model('User', userSchema);