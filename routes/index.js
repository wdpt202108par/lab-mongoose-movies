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


router.get('/celebrities/:_id', (req, res, next) =>{
  Celebrity

  .findById(req.params._id)
  .then(celebrityFromDB => {
    res.render('celebrities/show', celebrityFromDB) //{name:totot,, occupation: titi}
  })

  .catch(error => {
    console.log('Error while getting the celebrities from the DB:', error);

    next(error);
  })
  
})

router.get("/celebrities/new", req, res, netx => {
  res.render("/celebrities/new");
})

router.post("celebrities", req, res, next => {
  let newCeleb = Celebrity({
    name: req.body.name,
    occupation: req.body.occupation,
    catchPhrase: req.body.catchPhrase
  })
  
newCeleb
.save()
.then(celeb => res.redirect("/celebrities"))
.catch(error => res.render("celebrities/new"))

})


