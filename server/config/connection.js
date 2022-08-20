const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://clarkspencerc:keepinitphresh123@cluster0.8ljzpth.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});

// const mongoose = require('mongoose');

// mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/plzwurk', {

//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   // useCreateIndex: true,
//   //plzwurk is the name of the database
//   // useFindAndModify: false,
// });

module.exports = mongoose.connection;
