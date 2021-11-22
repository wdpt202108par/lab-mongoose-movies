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

module.exports = router