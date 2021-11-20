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

//ITERATION 4 : NEW CREATE
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

 //ITERATION 6 : EDIT
 router.get("/celebrities/:celebrityid/edit", function (req, res, next) {
  Celebrity.findById(req.params.celebrityid)
  .then(function (foundCelebrity) {
      res.render("celebrities/edit", {
        celebrity: foundCelebrity,
      });
  })
  .catch(function (err) {
      console.log(err);
      next(err); 
  });
});

router.post("/celebrities/:celebrityid", function (req, res, next) { 
  Celebrity.findByIdAndUpdate(
    req.params.celebrityid,
    {
    name: req.body.name,
    occupation: req.body.occupation,
    catchPhrase: req.body.catchPhrase
    },
    { new: true }
  )
   .then(function (updatedCelebrity) {
      res.redirect("/celebrities");
  })
   .catch((err) => {
     console.log(err);
     next(err); 
   });
});

 //ITERATION 3 : DETAILS
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

 //ITERATION 5 : DELETE
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