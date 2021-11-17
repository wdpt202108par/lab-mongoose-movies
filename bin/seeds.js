const mongoose = require('mongoose');
const Celebrity = require('../models/celebrity');

//connection for the mongoose && promises 
mongoose.connect ('mongodb://localhost/lab-mongoose-movies')
.then(function (){
    console.log('connected to mongodb');
})
.catch (err => {
    console.log ('Error! connection to mongodb');
})

const celebrities = [
    {
        name: "Tom Cruise",
        occupation : "actor",
        catchParse : "Top gun"
    },
    {
        name: "Oprah",
        occupation : "comedian",
        catchParse : "Hello"
    },
    {
        name: "Beyonce",
        occupation : "singer",
        catchParse : "Halo"
    }
]

//created  the celebrityDB
///////////////// below function is working????
Celebrity.create(celebrities)
    .then(function(celebrityDB){
    console.log(`${celebrityDB.length} have been created 😃`);
    mongoose.connection.close()
})
    .catch(err => {
    console.log('Error! during the creation of the celebrityDB');
});

