const mongoose = require('mongoose');

let connection;

const connect = async () => {
  if (connection) return;

  const MONGO_URI = 'mongodb+srv://juancamiloclement:clement25-98@elementaldb.nkqfac9.mongodb.net/elemental';

  connection = mongoose.connection;

  connection.once('open', () => {
    console.log('Connected to MongoDB');
  });

  connection.on('disconnected', () => {
    console.log('Disconnected form MongoDB');
  });

  connection.on('error', (error) => {
    console.log('Error connecting to MongoDB', error);
  });

  await mongoose.connect(MONGO_URI);
}

module.exports = connect;