const userRouter = require('./api/user');
const postRouter = require('./api/post');
const commentRouter = require('./api/comment');
const likeRouter = require('./api/like');
const userFollowsRouter = require('./api/userFollows');

const routes = (app) => {
  app.use('/api/users', userRouter);
  app.use('/api/posts', postRouter);
  app.use('/api/comments', commentRouter);
  app.use('/api/likes', likeRouter);
  app.use('/api/follows', userFollowsRouter);
}

module.exports = routes;