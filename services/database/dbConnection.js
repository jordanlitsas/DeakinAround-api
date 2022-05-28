const mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://admin:deakinaroundadmin@deakinaround.mixps.mongodb.net/notification?retryWrites=true&w=majority";

let client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connect(uri);

const db = mongoose.connection;
client.connect((err, db) => {
  if (!err){ console.log("Connected to development database"); }
});



db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function(){
  console.log("Mongoose Connection");
})