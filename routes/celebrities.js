const express = require('express');
const Celebrity = require("../models/celebrity");
const router  = express.Router();

/* GET celebrities page */
router.get('/celebrities', (req, res, next) => {
    Celebrity.find()
    .then(function (celebritiesfromdb) {
      res.render("celebrities/index", {
        mycelebrities: celebritiesfromdb,
      });
    })
    .catch(function (err) {
      console.log(err);
      next(err); 
    });
});

//ITERATION 4
router.get("/celebrities/new", function (req, res) {
    res.render ("celebrities/new", {});
 });
 
 
 router.post("/celebrities/new", function (req, res, next) { 
 
    Celebrity.create({
     name: req.body.name,
     occupation: req.body.occupation,
     catchPhrase: req.body.catchPhrase
     })
     .then(function (createdCelebrity) {
       res.redirect("/celebrities");
     })
     .catch((err) => {
       console.log(err);
       res.redirect("/celebrities/new");
     });
 });

 //ITERATION3
router.get("/celebrities/:celebrityid", function (req, res, next) {
    Celebrity.findById(req.params.celebrityid)
    .then(function (foundCelebrity) {
        res.render("celebrities/show", {
          celebrity: foundCelebrity,
        });
    })
    .catch(function (err) {
        console.log(err);
        next(err); 
    });
});

 //ITERATION3
 router.post("/celebrities/:celebrityid/delete", function (req, res, next) {
    Celebrity.findByIdAndDelete(req.params.celebrityid)
    .then(function () {
        res.redirect("/celebrities")
        })
    .catch(function (err) {
        console.log(err);
        next(err); 
    });
 });


module.exports = router;