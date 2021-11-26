const express = require('express');
const router  = express.Router();
const Celebrity = require('../models/celebrity.js')


router.get('/celebrities', (req, res, next) => {
  Celebrity.find({})
      .then((allCelebrities) => {
          console.log("alllll===>", allCelebrities)
          res.render('celebrities/index', {
              celebrities: allCelebrities
          })

      })
      .catch(err => next(err))
})


router.get('/celebrities/:id', (req, res, next) => {
    Celebrity.findById(req.params.id)
        .then((chosenCelebrity) => {
            res.render('celebrities/show', chosenCelebrity)
        })
        .catch(err => next(err))
  })
  

module.exports = router;