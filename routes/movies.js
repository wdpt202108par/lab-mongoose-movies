const express = require('express');
const Celebrity = require('../models/Celebrity.model');
const router  = express.Router()
const Movie = require('../models/Movie.model')

// ITERATION 10 : Movie details
router.get('/movies/:id', function(req, res, next){
    Movie.findById(req.params.id)
        .populate({
            path: 'cast',
            select: 'name -_id'})
        .then(function(movieDetails){
            res.render('movies/show', {movieDetails})
        })
        .catch (err => next(err))
})

// ITERATION 11 : Deleting movies
router.post('/movies/:id/delete', function(req, res, next){
    Movie.findByIdAndRemove(req.params.id)
      .then((function(deletedMovie){
        res.redirect('/movies')
      }))
      .catch(function (err) {
        console.log(err);
        next(err);
      });
})

// ITERATION 12 : Editing movies
router.get('/movies/:id/edit', function(req, res, next){
    Movie.findById(req.params.id)
      .then(function (movieToUpdate){
        Celebrity.find().then(function (celebrities) {
        //     celebrities.forEach((celebrity, i) => {
        //         if (movieToUpdate.celebrity.includes(celebrity.id)) {
        //             celebrities[i].selected= true;
        //         }
        //     }) 
        res.render('movies/edit', {movieToUpdate, celebrities})
      }).catch(err => next(err))
      }).catch(err => next(err))
})
  
router.post('/movies/:id', function(req, res, next){
  const {title, genre, plot, cast} = req.body;
    Movie.findByIdAndUpdate(
      req.params.id,
      {title, genre, plot, cast},
      { new: true} 
      )
      .then(function (updatedMovies){
        res.redirect('/movies/' + req.params.id)
      })
      .catch(function (err) {
        console.log(err);
        next(err);
      });
});

module.exports = router