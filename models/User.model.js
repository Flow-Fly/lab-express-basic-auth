const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema({
  /**
   * Be careful to update your User model if you use it differently !
   * You're requesting some emails in the signup form
   * but we have no email in the User model
   */
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
},
  {
   timestamps: true
  }
);

const User = model("User", userSchema);

module.exports = User;
