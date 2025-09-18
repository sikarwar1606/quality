const express = require("express");
const mongoose = require("mongoose");
const relianceCoaDetails = require("../models/relianceCoaDetailsSC");
const { isLoggedIn } = require("./auth");

const router = express.Router();

// ✅ Connect to MongoDB only if not already connected
// if (mongoose.connection.readyState === 0) {
//   mongoose.connect(
//     "mongodb+srv://sikarwar1606:Bu5F9ylZFLFL9ob6@cluster0.epjwokb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
//     { useNewUrlParser: true, useUnifiedTopology: true }
//   )
//   .then(() => console.log("MongoDB connected"))
//   .catch(err => console.error("MongoDB connection error:", err));
// }


// ✅ GET route: render design form
router.get("/new",isLoggedIn, (req, res) => {
  res.render("add/addRelianceCoaData");
});

// ✅ POST route: save design
router.post("/new", isLoggedIn,async (req, res) => {
  try {
    
    const newRelianceCoaDetails = new relianceCoaDetails({
      ...req.body,
    
    });
let design_name = newRelianceCoaDetails.design
    await newRelianceCoaDetails.save();
    res.render("success/addRelianceCoaDataSuccess", {design_name});
  } catch (err) {
    console.error("Error creating batch:", err);
    res.status(500).send("Server Error");
  }
});

module.exports = router;