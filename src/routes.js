const user = require('./api/user');

const routes = (app) => {
  app.use('/api/users', user)
}

module.exports = routes;