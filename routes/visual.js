const express = require("express");
const mongoose = require("mongoose");
const { isLoggedIn } = require("./auth");
const VisualReport = require("../models/visual_inspecSC");
const router = express.Router();

// Render visual inspection page
router.get("/", isLoggedIn, (req, res) => {
  res.render("inspection/visual_inspec");
});

router.post("/save", isLoggedIn, async (req, res) => {

  let data = req.body
  console.log(data.observation1);
  

});





module.exports = router;
