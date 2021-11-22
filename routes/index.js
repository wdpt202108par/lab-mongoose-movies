const express = require('express');

const router  = express.Router()
const Movie = require('../models/Movie.model')
const Celebrity = require('../models/Celebrity.model')


/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

// ITERATION 9 : Listing our movies
router.get('/movies', function(req, res, next){
  Movie.find({})
    .then(function(moviesFromDb){
      res.render('movies/index', {moviesFromDb})
    })
    .catch(err => next(err))
})

// ITERATION 8 : Adding new movies
router.get('/movies/new', function(req, res, next){
  Celebrity.find({})
    .populate()
    .then(function(celebritiesFromDb){
      res.render('movies/new', {celebritiesFromDb})
    })
    .catch(err => next(err))
})

router.post('/movies', function(req, res, next){
  const {title, genre, plot, cast} = req.body;
  console.log('cast = ' , cast)
  Movie.create({title, genre, plot, cast})
    .then(function(newMovie){
      res.redirect('/movies')
    })
    .catch(err => next(err))
})

module.exports = router;