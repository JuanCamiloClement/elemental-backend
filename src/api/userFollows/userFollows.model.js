const { Schema, model } = require('mongoose');

const userFollowsSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    follower: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    }
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const UserFollows = model('userFollows', userFollowsSchema);

module.exports = UserFollows;