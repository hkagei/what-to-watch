const mongoose = require('mongoose');
const connection = "mongodb+srv://spencercclark:keepinitphresh123@cluster0.8ljzpth.mongodb.net/?retryWrites=true&w=majorityretryWrites=true&w=majorityretryWrites=true&w=majorityretryWrites=true&w=majority";

mongoose.connect(connection, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
  .then(() => console.log("Database Connected Successfully"))
  .catch(err => console.log(err));

// mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/plzwurk', {

//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   // useCreateIndex: true,
//   //plzwurk is the name of the database
//   // useFindAndModify: false,
// });

module.exports = mongoose.connection;
