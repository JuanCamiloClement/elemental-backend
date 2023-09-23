const { Schema, model } = require('mongoose');

const postSchema = new Schema(
  {
    url: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    likes: {
      type: [{
        type: Schema.Types.ObjectId,
        ref: 'likes',
      }],
      required: false,
    },
    comments: {
      type: [{
        type: Schema.Types.ObjectId,
        ref: 'comment',
      }],
      required: false,
    }
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const Post = model('post', postSchema);

module.exports = Post;