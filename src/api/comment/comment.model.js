const { Schema, model } = require('mongoose');

const commentSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
      minlength: [2, 'Comment must be at least 2 characters long'],
      maxlength: [128, 'Comment must be maximum 128 characters long'],
    },
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

const Comment = model('comment', commentSchema);

module.exports = Comment;