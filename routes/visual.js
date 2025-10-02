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

  try {
    const { date, batch_number, shiftA, shiftB, shiftC, verifiedBy } = req.body;

    if (!date || !batch_number) {
      return res.status(400).json({ 
        success: false, 
        message: "Date and Batch Number are required" 
      });
    }

    // Check if inspection for this batch/date already exists
    let inspection = await VisualReport.findOne({ batch_number, date });

    if (!inspection) {
      // create new document
      inspection = new VisualReport({
        date,
        batch_number,
        shiftA,
        shiftB,
        shiftC,
        verifiedBy
      });
    } else {
      // update existing document
      if (shiftA) inspection.shiftA = shiftA;
      if (shiftB) inspection.shiftB = shiftB;
      if (shiftC) inspection.shiftC = shiftC;
      if (verifiedBy) inspection.verifiedBy = verifiedBy;
    }

    await inspection.save();
    res.json({ success: true, inspection });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
  
});






module.exports = router;
