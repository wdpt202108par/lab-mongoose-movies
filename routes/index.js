const express = require('express');
const router  = express.Router();

const Celebrity = require('../models/celebrity');
const Movie = require('../models/Movie');

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

//MOVIE'S ROUTES
router.get('/movies/new', (req, res, next) => {
  Celebrity.find()
    .then(function (celebriesFromDb) {
      console.log("message !! : ", celebriesFromDb)
      res.render("movies/new", {
        celebrity : celebriesFromDb
      })
    })
    .catch((error) => {
      next(err);
    })  
});

router.post('/movies/new', (req, res, next) => {
  const { title, genre, plot, cast} =  req.body;

  newMovie = new Movie({ title, genre, plot, cast }).save()
    .then(function(newMovieFromDb) {
      res.redirect('/movies')
    })
    .catch((error) => {
      next(err);
    })
});

//ITERATION 9 : MOVIE LIST 
router.get('/movies', (req, res, next) => {
  Movie.find()
    .then(function (moviesFromDb) {
      res.render('movies/index', {
        mymovies : moviesFromDb
      });
    })
    .catch((error) => {
      next(err);
    })
});

//ITERATION 11 : DELETE
router.post("/movies/:movieid/delete", function (req, res, next) {
  Movie.findByIdAndDelete(req.params.movieid)
  .then(function () {
      res.redirect("/movies")
      })
  .catch(function (err) {
      console.log(err);
      next(err); 
  });
});

//ITERATION 12 : EDIT
router.get("/movies/:movieid/edit", function (req, res, next) {
  Movie.findById(req.params.movieid)
  .then(function (foundMovie) {

    //Celebrity.find()
      //.then(celebritiesFromDb => {
  
        //celebritiesFromDb.forEach((celebrities, i) => {
        //if (foundMovie.celebrity.includes(celebrities.id)) {
          //celebritiesFromDb[i].selected = true;
        //}
      //})

      res.render("movies/edit", {
        movie: foundMovie,
        //celebrities : celebritiesFromDb
      });
    //})
  })
  .catch(function (err) {
      console.log(err);
      next(err); 
  });
});

/*router.post("/movies/:movieid/edit"), function (req, res, next) { 
  Movie.findByIdAndUpdate(
    req.params.movieid,
    {
    title: req.body.title,
    genre: req.body.genre,
    plot: req.body.plot,
    cast: req.body.cast
    },
    { new: true }
  )
   .then(function (updatedMovie) {
      res.redirect("/movies");
    })
   .catch((err) => {
     console.log(err);
     next(err); 
    });
});
*/


//ITERATION 10 : MOVIE DETAIL 
router.get("/movies/:movieid", function (req, res, next) {
  Movie.findById(req.params.movieid)
  .populate('cast')
  .then(function (foundMovie) {
    console.log("message: ", foundMovie)
      res.render("movies/show", {
        movie: foundMovie,
      });
  })
  .catch(function (err) {
      console.log(err);
      next(err); 
  });
});

module.exports = router;