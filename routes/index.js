const express = require('express');
const router  = express.Router();
const Celebrity = require('../models/celebrity');

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

/* GET celebrities page */
//iteration 2 
router.get('/celebrities', (req, res, next) =>{
  Celebrity.find()
  .then(function (celebrityDB){
    console.log("New error ", celebrityDB);
    res.render('celebrities/index', {myCeleb: celebrityDB});
    console.log('Connected to the port 3000😎');
  })
  .catch(function (err){
    console.log('Error! During open the celebrtiy page');
  })
})

/* GET celebrities id page */
//iteration 3
router.get('/celebrities/:id', (req, res, next)=> {
  Celebrity.findById(req.params.id)
  .then(function (celebrityList){
    res.render('celebrities/show', {myCeleb:celebrityList
    });
  })
  .catch(function (err){
    console.log(`Error! ID celebrity page  not found🥵!`)
  })
})

module.exports = router;