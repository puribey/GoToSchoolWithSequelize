const express = require("express");
const router = express.Router();
const db = require("../config/database");
const Gig = require("../models/Gig");

// Get gig list
router.get("/", (req, res) =>
  Gig.findAll()
    .then(gigs => {
      res.render('gigs', {
          gigs
      });
    })
    .catch(err => console.log(err))
);

// Display add gig form
router.get('/add', (req, res)=> res.render('add'))

// Add a gig
router.post("/add", (req, res) => {

});

module.exports = router;
