const express = require('express');
const router  = express.Router();
const Celebrity = require('../models/Celebrity.model')

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/celebrities', function(req, res, next) {
  Celebrity.find()
    .then(function(allcelebrities){
      console.log('HEY')
      res.render('celebrities/index', {allcelebrities})
    })
    .catch(err => {next(err)})
})

module.exports = router;
