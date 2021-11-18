const express = require("express");
const Celebrity = require('../model/Celebrity');
const router = express.Router();

// LISTING des celebs
router.get("/celebrities", function (req, res, next) {
  Celebrity.find()
    .then(function (celebritiesFromDB) {
        console.log('salut', celebritiesFromDB)
      res.render("celebrities/index", {
        celebrities: celebritiesFromDB, // [ {title: ...}, {}, ... ]
      });
    })
    .catch(function (err) {
      console.log(err);
      next(err); // reponse
    });
});

/*router.get("/books/:bookid/delete", function (req, res, next) {
  Book.findByIdAndDelete(req.params.bookid)
    .then(function () {
      // livre a ete supp
      res.redirect("/books");
    })
    .catch((err) => {
      console.log(err);
      // res.send('oops')
      next(err);
    });
});

router.get("/books/:bookid/edit", function (req, res, next) {
  Book.findById(req.params.bookid)
    .then(function (foundBook) {
      res.render("book-edit", {
        book: foundBook,
      });
    })
    .catch(function (err) {
      console.log(err);
      next(err); // reponse
    });
});

router.post("/books/:bookid/edit", function (req, res, next) {
  Book.findByIdAndUpdate(
    req.params.bookid,
    {
      title: req.body.title,
      author: req.body.author,
      rating: req.body.rating,
      description: req.body.description,
    },
    { new: true }
  )
    .then(function (updatedBook) {
      res.redirect("/books/" + req.params.bookid);
    })
    .catch((err) => console.log(err));
});

// FORM CREATION LIVRE
router.get("/books/create", function (req, res, next) {
  res.render("book-create", {});
});

//
router.post("/books/create", function (req, res, next) {
  console.log("req.bodyy=", req.body);

  Book.create({
    title: req.body.title, // "tata"
    description: req.body.description, // ""
    author: req.body.author, // ""
    rating: Number(req.body.rating),
  })
    .then(function (createdBook) {
      // livre a été créé
      res.redirect("/books"); // reponse
    })
    .catch((err) => {
      console.log(err);
    });
});

// DETAIL D'UN LIVRE
router.get("/books/:bookid", function (req, res, next) {
  Book.findById(req.params.bookid) // "1234"
    .then(function (bookDoc) {
      res.render("book-details", {
        mybook: bookDoc,
      });
    })
    .catch((err) => console.log(err));
});*/

module.exports = router; // require('../book.routes.js)
