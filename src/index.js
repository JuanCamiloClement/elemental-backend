const server = require('./app.js');

const PORT = 8080;

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
})