const express = require('express');
const router  = express.Router();
const Celebrity = require('../models/Celebrity.model.js')
const Movie = require("../models/Movie.model.js")

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

module.exports = router;
 
router.get('/celebrities', (req, res, next) => {
  Celebrity.find()
  .then(allTheCelebritiesFromDB => {
    console.log('Retrieved celebritiers from DB:', allTheCelebritiesFromDB);
    res.render('celebrities/index',{ celebrity: allTheCelebritiesFromDB });
  
  })

  .catch(error => {
    console.log('Error while getting the celebrities from the DB:', error);
  
    next(error);
  });
});

// creation celebs
router.get("/celebrities/new", (req, res, netx) => {
  res.render("celebrities/new", {});
})

router.get('/celebrities/:_id', (req, res, next) =>{
  Celebrity

  .findById(req.params._id)
  .then(celebrityFromDB => {
    res.render('celebrities/show', celebrityFromDB) //{name:totot,, occupation: titi}
  })

  .catch(error => {
    console.log('Error while getting the celebrities from the DB:', error);

    next(error);
  })
  
})

router.get("/movies", (req, res, next)=>{

})


router.post("celebrities", (req, res, next) => {
  let newCeleb = Celebrity({
    name: req.body.name,
    occupation: req.body.occupation,
    catchPhrase: req.body.catchPhrase
  })
  
newCeleb
.save()
.then(celeb => res.redirect("/celebrities"))
.catch(error => res.render("celebrities/new"))

})


// Créer la route Movie

router.get('/movies', (req, res, next) => {
  Movie.find()
  .then(allTheMoviesFromDB => {
    console.log('Retrieved celebritiers from DB:', allTheMoviesFromDB);
    res.render('movies/index',{ movies: allTheMoviesFromDB });
  
  })

  .catch(error => {
    console.log('Error while getting the movies from the DB:', error);
  
    next(error);
  });
});

router.get('/movies/new', (req, res, next) => {
  Celebrity.find()
    .then( celebritiesFromDB => {
      res.render('movies/new', {celebrities: celebritiesFromDB})
    })

})

router.post('/movies/new', (req, res,) => {
  let title = req.body.title;
  let genre = req.body.genre;
  let plot = req.body.plot;
  let cast = req.body.cast;
  Movie.create({title, genre, plot, cast})
  .then(createdMovie => {
    console.log('created movie', createdMovie);
    res.redirect('/movies');
  
  })

  .catch(error => {
    console.log('Error while getting the movies from the DB:', error);
  });
});


