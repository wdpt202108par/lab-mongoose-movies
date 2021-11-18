const express = require('express');
const router  = express.Router();

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

module.exports = router;
 
route.get('/celebrity', (req, res, next) => {
  Celebrity.find()
  .then(allTheCelebrityrFromDB) =>{
    console.log("retrieved celebrities from DB:", allTheCelebrityrFromDB);
    res.render('celebrity',{celebrity:allTheCelebrityrFromDB});
  
})

.catch(error => {
  console.log('Error whiel getting the celebrities from the DB:', error);
  
  next(error);
})

