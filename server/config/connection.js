const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/plzwurk', {

  useNewUrlParser: true,
  useUnifiedTopology: true,
  // useCreateIndex: true,
  //plzwurk is the name of the database
  // useFindAndModify: false,
});

module.exports = mongoose.connection;
