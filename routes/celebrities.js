const express = require('express');
const router = express.Router();

const Celebrity = require('../models/Celebrity.model.js')

// ITERATION 2 : Listing our celebrities
router.get('/celebrities', function (req, res, next) {
  Celebrity.find()
    .then(function(allcelebrities) {
      res.render('celebrities/index',{allcelebrities});
    })
    .catch(function (err) {
      console.log(err);
      next(err);
    });
})

// ITERATION 4: Adding new celebrities
router.get('/celebrities/new', function(req, res, next){
  res.render('celebrities/new', {})
})

router.post('/celebrities', function(req, res, next){
  const {name, occupation, catchPhrase} = req.body;

  const newCelebrity = new Celebrity({name, occupation, catchPhrase})
  newCelebrity.save()
    .then(function(addedCelebrity){
      res.redirect('/celebrities')
    })
    .catch(function(tryagain){
      res.render('celebrities/new', {tryagain})
    })
})

// ITERATION 5 : Deleting celebrities
router.post('/celebrities/:id/delete', function(req, res, next){
  Celebrity.findByIdAndRemove(req.params.id)
    .then((function(deletedCelebrity){
      res.redirect('/celebrities')
    }))
    .catch(function (err) {
      console.log(err);
      next(err);
    });
})

// ITERATION 6: Editing celebrities
router.get('/celebrities/:id/edit', function(req, res, next){
  Celebrity.findById(req.params.id)
    .then(function (celebrityToUpdate){
      res.render('celebrities/edit', {celebrityToUpdate})
    })
    .catch(function (err) {
      console.log(err);
      next(err);
    });
})

router.post('/celebrities/:id', function(req, res, next){
  const {name, occupation, catchPhrase} = req.body;
  Celebrity.findByIdAndUpdate(
    req.params.id,
    {name, occupation, catchPhrase},
    { new: true} 
    )
    .then(function (updatedCelebrity){
      res.redirect('/celebrities')
    })
    .catch(function (err) {
      console.log(err);
      next(err);
    });
});

// ITERATION 3 : Celebrity details page
router.get('/celebrities/:id', function(req, res, next) {
  Celebrity.findById(req.params.id)
    .then(function (details) {
      res.render('celebrities/show', {details});
    })
    .catch(function(err) {
      console.log(err);
      next(err);
    })
})

module.exports = router;