const express = require('express');
const router = express.Router();

const Celebrity = require('../models/celebrity.js');
const Movie = require('../models/movie.js');


// ITERATION 9
router.get('/movies', (req, res, next) => {
    Movie.find({})
        .then(movies => {
            res.render('movies/index', {
                movies: movies
            })
        })
        .catch(err => {
            console.log(`Error while retreiving movies. Error: ${err}`)
            next(err)
        })
})

// ITERATION 8
router.post('/movies', (req, res, next) => {

    // const title = req.body.title;
    // const genre = req.body.genre;
    // const plot = req.body.plot;
    // const cast = req.body.cast;

    const { title, genre, plot, cast } = req.body

    Movie.create({ title, genre, plot, cast })
        .then(createdMovie => {
            console.log(`Movie created: ${createdMovie}`)
            res.redirect('/movies')
        })
        .catch(err => {
            console.log(`Error while creating movie. Error: ${err}`)
            res.render('movies/new');
        })

})


// ITERATION 8
router.get('/movies/new', (req, res, next) => {

    // need to show all celebrities from database

    Celebrity.find({})
        .then(celebritiesFromDb => {
            // celebritiesFromDb = [ {}, {}, {}]
            res.render('movies/new', {
                celebrities: celebritiesFromDb
            })
        })
        .catch(err => {
            console.log(`Error while retrieving celebrities ${err}`)
            next(err)
        })
})

// ITERATION 10
router.get('/movies/:id', (req, res, next) => {
   
    Movie.findById(req.params.id)
        .populate('cast')
        .then(chosenMovie => {
            console.log("movie", chosenMovie)
            res.render('movies/show', {
                movie: chosenMovie
            })
        })
        .catch(err => {
            console.log(`Error while retrieving movie id: ${req.params.id}. Error: ${err}`)
            next(err)
        })
})

// ITERATION 11
router.post('/movies/:id/delete', (req, res, next) => {

    Movie.findByIdAndRemove(req.params.id)
        .then(deletedMovie => res.redirect('/movies'))
        .catch(err => {
            console.log(`Error while deleting movie id: ${req.params.id}. Error: ${err}`)
            next(err)
        })

})

// ITERATION 12
router.get('/movies/:id/edit', (req, res, next) => {

    Celebrity.find({})
        .then(celebritiesFromDb => {
            // console.log("celebritiesFromDb : ", celebritiesFromDb)
  
            Movie.findById(req.params.id)
                .populate('cast') //[ {name, occupation ..}, {}]
                .then(chosenMovie => {

                    // celebritiesFromDb = [{id: "", name: "", occupation: "", catchPhrase: ""}, {}, {}]
                    // chosenMovie = { title: "", ..., cast: [{id: "", name: "", occupation: "", catchPhrase: ""}]}


                    // create an array of id with existing celebrities in the chosen movie's cast  
                    castIds = chosenMovie.cast.map( cast => cast.id)

                    // we need to add a property for each celebrity to indicate if it is in the movie cast
                    celebritiesFromDb.map( celebrity => {

                        // check if one of the celebrity is in the chosen movie's cast
                        if( castIds.includes(celebrity.id) ){
                            celebrity.inCast = true // {id: "", name: "", occupation: "", catchPhrase: "", inCast: true}
                        }
                    })

                    res.render('movies/edit', {
                        movie: chosenMovie, celebrities: celebritiesFromDb
                    })
                
                })
                .catch(err => {
                    console.log(`Error while retrieving movie id: ${req.params.id}. Error: ${err}`)
                    next(err)
                })

        })
        .catch( err => {
            console.log(`Error while retrieving celebrities. Error: ${err}`)
            next(err)
        })

})

// ITERATION 12
router.post('/movies/:id', (req, res, next) => {

    const { title, genre, plot, cast } = req.body

    Movie.findByIdAndUpdate(req.params.id, { title, genre, plot, cast })
        .populate('cast')
        .then(updatedMovie => {
            res.redirect(`/movies/${req.params.id}`)
        })
        .catch(err => {
            console.log(`Error while updating movie id: ${req.params.id}. Error: ${err}`)
            next(err)
        })
})

module.exports = router;