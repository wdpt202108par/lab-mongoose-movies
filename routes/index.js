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

/* GET Deleting celebrities page */
//iteration 8
router.get('/movies/new', (req, res, next)=>{
  Movie.find()
  .then(function (movieList){
    res.render('movies/new', {myMovie : movieList});
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
  res.redirect('/movies');
  })
  .catch(err => {
    console.log(`Error! during creation of movies 😱`);
    next(err);
  })
})









module.exports = router;
