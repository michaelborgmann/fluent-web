const mongoose = require('mongoose');
let dbURI = 'mongodb://localhost/fluent';

/*
if (process.env.NODE_ENV === 'production') {
  // dbURI = '<mongodb protocol>://<username>:<password>@<server address>:<port>/<database>'
  //mongo "mongodb+srv://cluster0.e3g4l.mongodb.net/sample_airbnb" --username michael --password onelove

  dbURI = 'mongodb://michael:onelove@cluster0.e3g4l.mongodb.net:27017/fluent'
}
*/

if (process.env.NODE_ENV === 'production') {
  dbURI = process.env.MONGODB_URI;
}

mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true});

mongoose.connection.on('connected', () => {
  console.log(`Mongoose connected to ${dbURI}`);
});
mongoose.connection.on('error', err => {
  console.log('Mongoose connection error X:', err);
});
mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected X');
});

const gracefulShutdown = (msg, callback) => {
  mongoose.connection.close( () => {
    console.log(`Mongoose disconnected through ${msg}`);
  });
}

process.once('SIGUSR2', () => {
  gracefulShutdown('nodemon restart', () => {
    process.kill(process.pid, 'SIGUSR2');
  });
});

process.on('SIGINT', () => {
  gracefulShutdown('app termination', () => {
    process.exit(0);
  });
});

process.on('SIGTERM', () => {
  gracefulShutdown('Heroku app shutdown', () => {
    process.exit(0);
  });
});

require('./locations');
