const express = require("express");
const mongoose = require("mongoose");
const cokeCoaDetails = require("./cokeCoaDetailsSC");

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
router.get("/new", (req, res) => {
  res.render("add/addCokeCoaData");
});

// ✅ POST route: save design
router.post("/new", async (req, res) => {
  try {
    
    const newCokeCoaDetails = new cokeCoaDetails({
      ...req.body,
    
    });
let design_name = newCokeCoaDetails.design
    await newCokeCoaDetails.save();
    res.render("addCokeCoaDataSuccess", {design_name});
  } catch (err) {
    console.error("Error creating batch:", err);
    res.status(500).send("Server Error");
  }
});

module.exports = router;