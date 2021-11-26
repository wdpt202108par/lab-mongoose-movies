const express = require('express');
const router = express.Router();
const Celebrity = require('../models/celebrity.js')


router.get('/celebrities', (req, res, next) => {
    Celebrity.find({})
        .then((allCelebrities) => {
            res.render('celebrities/index', {
                celebrities: allCelebrities
            })

        })
        .catch(err => next(err))
})


router.post('/celebrities', (req, res, next) => {

    // const name = req.body.name
    // const occupation = req.body.occupation
    // const catchPhrase = req.body.catchPhrase 

    const { name, occupation, catchPhrase } = req.body

    // ici on peut aussi créer des condition pour le pas accepter des champs vide

    // if(!name || !occupation || !catchPhrase){
    //     res.render('celebrities/new', {message: "name, occupation, phrase fields are required"});
    //     return
    // }

    Celebrity.create({
            name,
            occupation,
            catchPhrase
        })
        .then((createdCelebrity) => {
            console.log(`Celebrity created: ${createdCelebrity}`)
            res.redirect('/celebrities')
        })
        .catch(err => {
            console.log(`Error during creation: ${err}`)
            res.render('celebrities/new');
        })

})

router.get('/celebrities/new', (req, res, next) => {
    res.render('celebrities/new')
})


router.get('/celebrities/:id', (req, res, next) => {
    Celebrity.findById(req.params.id)
        .then((chosenCelebrity) => {
            res.render('celebrities/show', chosenCelebrity)
        })
        .catch(err => next(err))
})

module.exports = router;