const express = require("express");
const mongoose = require("mongoose");
const cokeCoaDetails = require("../models/cokeCoaDetailsSC");
const { isLoggedIn } = require("./auth");

const router = express.Router();
//GET route: render design form
router.get("/new", (req, res) => {
  res.render("add/addCokeCoaData");
});

//  POST route: save design
router.post("/new", isLoggedIn, async (req, res) => {
  try {
    const newCokeCoaDetails = new cokeCoaDetails({
      ...req.body,
    });
    let design_name = newCokeCoaDetails.design;
    await newCokeCoaDetails.save();
    res.render("success/addCokeCoaDataSuccess", { design_name });
  } catch (err) {
    console.error("Error creating batch:", err);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
