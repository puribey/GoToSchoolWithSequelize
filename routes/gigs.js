const express = require("express");
const router = express.Router();
const db = require("../config/database");
const Gig = require("../models/Gig");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

// Get gig list
router.get("/", (req, res) =>
  Gig.findAll()
    .then(gigs => {
      res.render("gigs", {
        gigs
      });
    })
    .catch(err => console.log(err))
);

// Display add gig form
router.get("/add", (req, res) => res.render("add"));

// Add a gig
router.post("/add", (req, res) => {
  let { title, technologies, budget, description, contact_email } = req.body;

  // Validate fields e.g.
  let errors = [];
  if (!title) {
    errors.push({ text: "Please add title" });
  }
  if (errors.length > 0) {
    res.render("add", {
      errors,
      title,
      technologies,
      budget,
      description,
      contact_email
    });
  } else {
    if (!budget) {
      budget = "Unknown";
    }
    technologies = technologies.toLowerCase().replace(/, /g, ",");

    // Insert into table
    Gig.create({
      title,
      technologies,
      budget,
      description,
      contact_email
    })
      .then(gig => res.redirect("/gigs"))
      .catch(err => console.log(err));
  }
});

// Search for gigs
router.get("/search", (req, res) => {
  let { term } = req.query;
  // Make lowercase
  term = term.toLowerCase();

  Gig.findAll({
    where: {
      technologies: {
        [Op.like]: "%" + term + "%"
      }
    }
  })
    .then(gigs => res.render("gigs", { gigs }))
    .catch(err => console.log(err));
});

// Delete 

module.exports = router;
