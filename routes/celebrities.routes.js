const express = require("express");
const Celebrity = require("../models/Celebrity.model.js");
const router  = express.Router();

router.get("/celebrities", (req, res, next) => {
  Celebrity.find({})
    .then(function(celebritiesFromDb) {
      console.log(`data: ${celebritiesFromDb}`)
      res.render("celebrities/index", {celebrities: celebritiesFromDb});
    })
    .catch(err => next(err));
})

router.get("/celebrities/new", (req, res, next) => {
  res.render("celebrities/new");
})

router.post("/celebrities", (req, res, next) => {
  new Celebrity({
    name: req.body.name,
    occupation: req.body.occupation,
    catchPhrase: req.body.catchPhrase
  }).save()
    .then(newCeleb => res.redirect("/celebrities"))
    .catch(err => res.render("celebrities/new"))
})

router.get("/celebrities/:id", (req, res, next) => {
  Celebrity.findById(req.params.id)
    .then(function(celebrityFromDb) {
      res.render("celebrities/show", {celebrity: celebrityFromDb});
    })
    .catch(err => next(err))
})

router.post("/celebrities/:id/delete", (req, res, next) => {
  Celebrity.findByIdAndRemove(req.params.id)
    .then(celeb => res.redirect("/celebrities"))
    .catch(err => next(err))
})

router.get("/celebrities/:id/edit", (req, res, next) => {
  Celebrity.findById(req.params.id)
    .then(function(celebrityFromDb) {
      res.render("celebrities/edit", {celebrity: celebrityFromDb});
    })
    .catch(err => next(err))
})

router.post("/celebrities/:id", (req, res, next) => {
  let updatedCeleb = {
    name: req.body.name,
    occupation: req.body.occupation,
    catchPhrase: req.body.catchPhrase
  }

  Celebrity.update({_id: req.params.id}, updatedCeleb)
    .then(celeb => res.redirect("/celebrities"))
    .catch(err => next(err))
})

module.exports = router;