const { Schema, model, models } = require('mongoose');

const emailRegex = new RegExp('[a-zA-Z0-9]{5,10}@[a-z]{3,10}.[a-z]{2,3}')

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, 'User must have a first name'],
      minlength: [2, 'First name must be at least 2 characters long'],
      maxlength: [10, 'First name must be maximum 10 characters long'],
    },
    lastName: {
      type: String,
      required: [true, 'User must have a last name'],
      minlength: [2, 'Last name must be at least 2 characters long'],
      maxlength: [10, 'First name must be maximum 10 characters long'],
    },
    userName: {
      type: String,
      required: [true, 'User must have a username'],
      minlength: [5, 'Username must be at least 5 characters long'],
      maxlength: [12, 'Username must be maximum 12 characters long'],
      validate: [{
        validator: async (value) => {
          try {
            const user = await models.user.findOne({ userName: value });
            return !user;
          } catch (error) {
            return false;
          }
        },
        message: 'Username already exists',
      }],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      match: [emailRegex, 'Email is not valid'],
      validate: [{
        validator: async (value) => {
          try {
            const user = await models.user.findOne({ email: value });
            return !user;
          } catch (error) {
            return false;
          }
        },
        message: 'Email already exists',
      }],
    },
    password: {
      type: String,
      required: false,
    },
    role: {
      type: String,
      required: true,
      default: 'USER',
    },
    avatar: {
      type: String,
      required: false,
    },
    bio: {
      type: String,
      required: false,
      maxlength: [30, 'Bio must be maximum 20 characters long'],
    },
    validateToken: {
      type: String,
      required: false,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    posts: {
      type: [{
        type: Schema.Types.ObjectId,
        ref: 'post'
      }],
      required: false,
    },
    likes: {
      type: [{
        type: Schema.Types.ObjectId,
        ref: 'like'
      }],
      required: false,
    },
    comments: {
      type: [{
        type: Schema.Types.ObjectId,
        ref: 'comment'
      }],
      required: false,
    },
    followers: {
      type: [{
        type: Schema.Types.ObjectId,
        ref: 'userFollows'
      }],
      required: false,
    },
    follows: {
      type: [{
        type: Schema.Types.ObjectId,
        ref: 'userFollows'
      }],
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