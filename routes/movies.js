const express = require("express");
const router = express.Router();
const Movie = require("../model/Movie");
const Celebrity = require("../model/Celebrity");

router.get("/", (req, res, next) => {
  res.render("/movies");
});

router.get("/movies/new", function (req, res, next) {
  Celebrity.find()
    .then(function (celebritiesFromDB) {
      res.render("movies/new", { allCelebrities: celebritiesFromDB });
    })
    .catch(function (err) {
      next(err);
    });
});

router.post("/movies/new", function (req, res, next) {
  console.log("req.body=", req.body); // {title: "", plot: "", cast: [] }

  Movies.create({
    title: req.body.title, // "tata"
    genre: req.body.genre, // ""
    plot: req.body.plot, // ""
    cast: Number(req.body.cast),
  })
    .then(function (createdMovie) {
      console.log(createdMovie);
      // livre a été créé
      res.redirect("/movies"); // reponse
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
