const express = require('express');
const router  = express.Router();
const celebrity = require('../models/celebrity');

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

/* GET celebrities page */
//iteration 2 
router.get('/celebrities', (req, res, next) =>{
  celebrity.find()
  .then(function (celebrityDB){
    res.render('celebrities/index', {myCeleb : celebrityDB});
    console.log('Connected to the port 3000');
  })
  .catch(function (err){
    console.log('Error! Durint open the celebrtiy page');
  })
})

module.exports = router;