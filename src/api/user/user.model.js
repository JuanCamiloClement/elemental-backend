const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    firstName: String,
    lastName: String,
    userName: String,
    email: String,
    password: String,
    bio: {
      type: String,
      required: false,
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const User = model('user', userSchema);

module.exports = User;