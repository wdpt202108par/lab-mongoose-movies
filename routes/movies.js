const express = require("express");
const router = express.Router();
const Movie = require("../model/Movie");
const Celebrity = require("../model/Celebrity");

//
router.get("/movies", function(req, res, next) {
    Movie.find()
        .then(function(moviesFromDB) {
            console.log('salut', moviesFromDB)
            res.render("movies/index", {
                movies: moviesFromDB, // [ {title: ...}, {}, ... ]
            });
        })
        .catch(function(err) {
            console.log(err);
            next(err); // reponse
        });
});



router.get("/movies/new", function(req, res, next) {
    Celebrity.find()
        .then(function(celebritiesFromDB) {
            res.render("movies/new", { allCelebrities: celebritiesFromDB });
        })
        .catch(function(err) {
            next(err);
        });
});

router.post("/movies/new", function(req, res, next) {
    console.log("req.body=", req.body); // {title: "", plot: "", cast: [] }

    Movie.create({
        title: req.body.title, // "tata"
        genre: req.body.genre, // ""
        plot: req.body.plot, // ""
        cast: req.body.cast,
    })

    .then(function(createdMovie) {
            console.log(createdMovie);
            // livre a été créé
            res.redirect("/movies"); // reponse
        })
        .catch((err) => {
            console.log("erreur création du film", err);
            res.redirect("/movies/new"); // reponse
        });
});

router.get("/movies/:moviesId", function(req, res, next) {
    Movies.findById(req.params.celebrityId)
        .then(function(moviesFromDB) {
            console.log('render movies', moviesFromDB)
            res.render("movies/show", {
                movies: moviesFromDB, // [ {title: ...}, {}, ... ]
            });
        })
        .catch(function(err) {
            console.log(err);
            next(err); // reponse
        });

});

module.exports = router;