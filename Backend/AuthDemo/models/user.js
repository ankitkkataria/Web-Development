const mongoose = require("mongoose");
// Since we're using bcrypt here we also need to require it.
const bcrypt = require("bcrypt");

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

// This function below is a model method that will be accessable on the User model itself it's job is to find if the person entered both username and password right when he was logging in.
userSchema.statics.findByUsernameAndValidate = async function (username,password) {
  const foundUser = await this.findOne({ username });
  if(!foundUser) {
    console.log('Username or Password is wrong'); // If you don't find a user or your passord is wrong then output this.
    return false;
  }
  // If user by that username exists in that case check password validation.
  const isPasswordValid = await bcrypt.compare(password,foundUser.hashedPassword); // First arg is plainTextPassword and second arg is hashedPassword
  if(!isPasswordValid) {
    console.log('Username or Password is wrong'); // If you don't find a user or your passord is wrong then output this.
    return false;
  }
  else {
    return foundUser; // Inacase after login if you want to use it.
  }
  // This is what colt did.
  return isPasswordValid ? foundUser : false;
};

userSchema.pre('save', async function (next) { // Here calling next() will call save itself.
  if(!this.isModified('hashedPassword')) return next(); // This means if the entry in the user that's called hashedPassword has not been modified then we don't need to hash the password again if someone just updates their username or bio in that case there is no need in wasting time on doing the hashing on the password again.
  this.hashedPassword = await bcrypt.hash(this.hashedPassword,12); // I know I know this right side thing makes it confusing but colt had named it password but all we are doing is whatever this user's plaintext password was we are just hashing it and storing it in hashedPassword in the user.
  next(); // This will call save now.

})

const User = mongoose.model("User", userSchema);

module.exports = User;

// Whatever you did in above two lines can also be done on the same one.
// module.exports = mongoose.model('User', userSchema);
