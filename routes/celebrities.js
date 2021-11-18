const express = require("express");
const Celebrity = require('../model/Celebrity');
const router = express.Router();

// LISTING des celebs
router.get("/celebrities", function(req, res, next) {
    Celebrity.find()
        .then(function(celebritiesFromDB) {
            console.log('salut', celebritiesFromDB)
            res.render("celebrities/index", {
                celebrities: celebritiesFromDB, // [ {title: ...}, {}, ... ]
            });
        })
        .catch(function(err) {
            console.log(err);
            next(err); // reponse
        });
});

router.get("/celebrities/new", function(req, res, next) {
    res.render("celebrities/new", {

    });
})

router.post("/celebrities/new", function(req, res, next) {
    console.log("req.body=", req.body);

    Celebrity.create({
            name: req.body.name, // "tata"
            occupation: req.body.occupation, // ""
            catchPhrase: req.body.catchPhrase, // ""
        })
        .then(function(createdCelebrity) {
            // celeb a été créé
            res.redirect("/celebrities"); // reponse
        })
        .catch((err) => {
            console.log(err);
            next(err)
                //res.redirect("/celebrities/new");;

        })
})

router.get("/celebrities/:celebrityId", function(req, res, next) {
    Celebrity.findById(req.params.celebrityId)
        .then(function(celebrityFromDB) {
            console.log('render show', celebrityFromDB)
            res.render("celebrities/show", {
                celebrity: celebrityFromDB, // [ {title: ...}, {}, ... ]
            });
        })
        .catch(function(err) {
            console.log(err);
            next(err); // reponse
        });

});



module.exports = router; // require('../book.routes.js)