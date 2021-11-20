const express = require('express');
const router  = express.Router()
const Movie = require('../models/Movie.model')

// ITERATION 10 : Movie details
router.get('/movies/:id', function(req, res, next){
    Movie.findById(req.params.id)
        .populate('Movie')
        .then(function(movieDetails){
            res.render('movies/show', {movieDetails})
        })
        .catch (err => next(err))
})

module.exports = router