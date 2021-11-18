const mongoose = require('mongoose');
const celebrity = require('../models/celebrity.model');
 
const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost/lab-mongoose-movies';
 
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});

const initialCelebrity = [
    {
        name:"Nicky menage", 
        occupation:"entertainer", 
        catchPhrase:"“Refuse to lose, Refuse to be defeated, Refuse to have regrets.”"
    },
    {
        name:"Quart d'heure B", 
        occupation:"Fashion icon",
        catchPhrase:"on top of your head"
    },
    {
        name:"Rihahahana", 
        occupation:"Boss", 
        catchPhrase:"Make money"
    },
];

    celebrity.create(celebrities)
  .then(celebritiesFromDB => {
    console.log(`Created ${celebritiesFromDB.length} celebrities`);
 
    // Once created, close the DB connection
    mongoose.connection.close();
  })
  .catch(err => console.log(`An error occurred while creating a feedback from the DB: ${err}`));
