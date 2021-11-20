const express = require("express");
const router = express.Router();
const Celebrity = require("../models/celebrity");
const Movie = require("../models/Movie");

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

/* GET celebrities page */
//iteration 2
router.get("/celebrities", (req, res, next) => {
  Celebrity.find()
    .then(function (celebrityDB) {
      res.render("celebrities/index", { myCeleb: celebrityDB });
      console.log("Connected to the port 3000😎");
    })
    .catch(function (err) {
      console.log("Error! During open the celebrtiy page");
    });
});

/* GET Adding New celebrities page */
//  bon ordre!!!
//iteration 4
router.get("/celebrities/new", (req, res, next) => {
  res.render("celebrities/new", {});
});

//POST
router.post("/celebrities", function (req, res, next) {
  Celebrity.create({
    name: req.body.name,
    occupation: req.body.occupation,
    catchPhrase: req.body.catchPhrase,
  })
    .then(function (createdCelebrity) {
      res.redirect("/celebrities");
    })
    .catch((err) => {
      console.log("Error! creating new celebrities");
    });
});

/* GET celebrities id page */
//iteration 3
router.get("/celebrities/:id", (req, res, next) => {
  Celebrity.findById(req.params.id)
    .then(function (celebrityList) {
      res.render("celebrities/show", { myCeleb: celebrityList });
    })
    .catch(function (err) {
      console.log(`Error! ID celebrity page  not found🥵!`);
      next(err);
    });
});

/* GET Deleting celebrities page */
//iteration 5
router.post("/celebrities/:id/delete", function (req, res, next) {
  Celebrity.findByIdAndRemove(req.params.id)
    .then(function () {
      res.redirect("/celebrities");
    })
    .catch((err) => {
      console.log("Error! celebrity delete error!");
      next(err);
    });
});

/* GET  adding new movies page */
//iteration 8
//promise all
router.get('/movies/new', (req, res, next)=>{
  /*
  const movies = Movies.find
  const celebs = Celebrity.find

  Promise.all([movies, celebs])
    .then(values => {
      console.log(values) // {moives: [{}, {}], celebs: [{}, {}]}
      res.render(mypage, {data: values})
    })
  */
  // we should put celebrity() inside the movie()
    Movie.find()
  .then(function (movieList){
    Celebrity.find()
      .then(celebritiesFromDB => {
        res.render('movies/new', {myMovie : movieList, myCeleb: celebritiesFromDB});
      })
      .catch(err => {next(err)})
  })
  .catch(function (err){
    console.log(`Error! Movie new page not found 🥲`);
    next (err);
  });
});

router.post('/movies', function (req, res, next){
  const {title, genre, plot, cast} = req.body;
  // same as  Movie.create()
  new Movie ({
    title,
    genre,
    plot,
    cast,
  }).save()
  .then(function (newMovie){
    res.redirect("/celebrities");
  })
  .catch(err => {
    console.log(`Error! during creation of movies 😱`);
    next(err);
  })
})

/* GET listing our movies */
//iteration 9
router.get("/movies", (req, res, next) => {
  Movie.find()
    .then(function (movieDB) {
      res.render("movies/index", { allMovie: movieDB });
    })
    .catch(function (err) {
      console.log("Error! During open the celebrtiy page");
      next(err);
    });
});

/* POST The movie details page */
//iteration 10
//router.get('/movies')



/* POST Deleting  movies */
//iteration 11




module.exports = router;
