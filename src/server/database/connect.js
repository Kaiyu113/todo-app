const mongoose = require('mongoose');

const connectionStr =
  'mongodb+srv://chen-tang:Chuwa123@cluster0.8ywno.mongodb.net/april18Database?retryWrites=true&w=majority';

const connectToMongoose = () => {
  mongoose.connect(connectionStr, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', () => {
    console.log('connected !');
  });
};

module.exports = connectToMongoose;
