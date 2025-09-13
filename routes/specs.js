const express = require("express")
const mongoose = require("mongoose");
const router = express.Router();
const specs = require("../models/specsSC");

// const specs  = mongoose.model("specs", specsSchema);
router.get('/new', (req, res)=>{
  res.render('add/specs')
})
router.post('/new', async (req, res)=>{
  try {
      const newspec = new specs({
        ...req.body,
      });
      let design = newspec.design;
      await newspec.save();
      res.render("addSpecsSuccess", { design });
    } catch (err) {
      console.error("Error creating spec:", err);
      res.status(500).send("Server Error");
    }
})

module.exports = router