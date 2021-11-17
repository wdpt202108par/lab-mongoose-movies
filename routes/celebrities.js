const express = require('express');
const router = express.Router();

const Celebrity = require('../models/Celebrity.model.js')

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


module.exports = router;