const mongoose = require('mongoose')

const Celebrity = require('../models/Celebrity.model')

mongoose.connect("mongodb://localhost/lab-mongoose-movies")
  .then(function () {
    console.log('connected')
  })
  .catch (err => {
    console.log(err)
  })


const celebrities = [{
  name:"Madonna",
  occupation:"Singer",
  catchPhrase:"Like a virgin",
  },
  {
  name:"Whitney Houston",
  occupation:"Singer",
  catchPhrase:"I will always love you",
  },
  {
  name:"Britney Spears",
  occupation:"Singer",
  catchPhrase:"Oops I did it again",
  },
]

Celebrity.create(celebrities)
  .then(function (celebritiesFromDb) {
    console.log(`${celebritiesFromDb.length} celebrities created`)
    mongoose.connection.close()
  })
  .catch(err => console.log(err))
