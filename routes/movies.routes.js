const express = require("express");
const { render } = require("../app");
const Movie = require("../models/Movie.model.js");
const Celebrity = require("../models/Celebrity.model.js");
const router = express.Router();

router.get("/movies", (req, res, next) => {
    Movie.find()
        .then(function(moviesFromDb) {
            res.render("movies/index", {movies: moviesFromDb})
        })
        .catch(err => next(err))
})

router.get("/movies/new", (req, res, next) => {
    Celebrity.find()
        .then(function(celebritiesFromDb) {
            res.render("movies/new", {celebrities: celebritiesFromDb})
        })
        .catch(err => next(err))
})

router.post("/movies", (req, res, next) => {
    new Movie({
        title: req.body.title,
        genre: req.body.genre,
        plot: req.body.plot,
        cast: req.body.cast,
    }).save()
    .then(function(moviesFromDb) {
        res.redirect("/movies")
    })
    .catch(err => next(err))
})

module.exports = router
