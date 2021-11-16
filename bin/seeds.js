const celebrity = [
    {
        name: "Tom Cruise",
        occupation : "actor",
        catchParse : "Top gun"
    }
];

const mongoose = require('mongoose');
const Celebrity = require('../models/celebrity.js');

Celebrity.create(celebrity)

.then( function(){
    console.log('connecté 😃')
    mongoose.connection.close()
})
.catch(err => {
    console.log(`ERROR`)});

    Celebrity.create(celebrity)
    .then(celebrityFromDB => {
        console.log(`Celebrity CREES ${celebrityFromDB.length}`);
        mongoose.connection.close();
    })
    .catch(err => console.log(`An error occurred while creating a celebrity files`));