const express = require('express');
const router  = express.Router();
const Celebrity = require('../models/Celebrity.model')

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

