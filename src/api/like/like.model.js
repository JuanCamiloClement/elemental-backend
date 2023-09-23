const { Schema, model } = require('mongoose');

const likeSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    post: {
      type: Schema.Types.ObjectId,
      ref: 'post',
      required: true,
    }
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const Like = model('like', likeSchema);

module.exports = Like;