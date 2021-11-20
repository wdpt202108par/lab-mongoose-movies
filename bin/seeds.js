require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') })
const mongoose = require("mongoose");
const Celebrity = require("../models/Celebrity.model");
const MONGO_URI = process.env.MONGO_URI

// open connection to database
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});

// create array with 3 objects
const celebrities = [
  {
    name: "Samara",
    occupation: "belly dancer",
    catchPhrase: "..."
  },
  {
    name: "Silas the As",
    occupation: "magician",
    catchPhrase: "Don't be sorry, be better"
  },
  {
    name: "The Eva",
    occupation: "Queen of the night",
    catchPhrase: "Glitters are forever"
  }
]

// create model in database
Celebrity.create(celebrities)
  .then(function() {
    console.log("Connection to database established");
    // close connection to database
    mongoose.connection.close();
  })
  .catch(err => console.log(err))

