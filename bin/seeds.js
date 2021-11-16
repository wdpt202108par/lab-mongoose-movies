const mongoose = require('mongoose');
const Celebrity = require('../models/celebrity.js');
mongoose.connect ('mongodb://localhost/lab-mongoose-movies')
.then(function (){
    console.log('connected to mongodb');
    mongoose.connection.close()
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
];

Celebrity.create(celebrities)
.then(function(){
    console.log('created 😃')
})
.catch(err => {
    console.log(`ERROR`)});