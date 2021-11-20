const mongoose = require("mongoose");
const Celebrity = require("../models/Celebrity.model")

const celebrity =[
    {   name: "Lola Mara",
        occupation: "Singer",
        catchPhrase: "J'aime la chanson"
    },
    {   name: "Pierre Luni",
        occupation: "Musicien",
        catchPhrase: "J'aime la guitare"
    },
    {   name: "Gabi Jean",
        occupation: "Surf",
        catchPhrase: "J'aime les vagues"
    }
]

mongoose
  .connect("mongodb://localhost/lab-mongoose-movies", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  })
  .then((x) => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);
  })
  .catch((err) => {
    console.error("Error connecting to mongo: ", err);
  });

Celebrity.create(celebrity)
    .then(celebrityFromDB => {
        console.log(`Created ${celebrityFromDB.length} celebrity`);

        mongoose.connection.close();
    })
    .catch(err => console.log(`An error occurred while creating movies from the DB: ${err}`));

   
