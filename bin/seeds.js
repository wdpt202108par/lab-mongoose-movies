const mongoose = require('mongoose')
const Celebrity = require('../models/celebrity.js')

mongoose.connect('mongodb://localhost/lab-mongoose-movies')
  .then(function () {
    console.log('Database connected')
  })
  .catch(err => {
    console.log(err)
  })

const celebrityData = [
  {
    name : "Virginie Grimaldi",
    occupation: "Écrivaine ",
    catchPhrase: "J’écris des listes de courses, des post-it et des romans."
  },
  {
    name : "Léonard de Vinci",
    occupation: "Artiste et Scientifique de génie",
    catchPhrase: "Le mouvement est la cause de toute vie."
  },
  {
    name : "Georges Braque",
    occupation: "Artiste Peintre",
    catchPhrase: "Ce n’est pas le peintre qui a commencé, c’est le tableau."
  }
]

Celebrity.create(celebrityData)
  .then(function (celebrityFromDb) {
    console.log(`${celebrityFromDb.length} ont étés crées !`)
    mongoose.connection.close()
  })
  .catch(function(err) {
    console.log(err)
  })