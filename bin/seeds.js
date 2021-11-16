const mongoose = require("mongoose")

const Celebrity = require('../models/Celebrity.model')

mongoose.connect("mongodb://localhost/lab-mongoose-movies")
  .then(function(){
    console.log("connected")
  })
  .catch(err => console.log(err))


const celebrities = [
    {
     name:"Madona",
     occupation:"singer",
     catchPhrase:"Like a virgin",
    },
    {
        name:"Withney Houston",
        occupation:"singer",
        catchPhrase:"I will always love you",
    },
    {
        name:"Britney Spears",
        occupation:"singer",
        catchPhrase:"Oops I did it again",
    },
]

Celebrity.create(celebrities)
  .then(function(allcelebrities){
    console.log('celebrities created')
    mongoose.connection.close()
  })
  .catch(err => console.log(err))