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
    const { date, design, batch_no, mc_no, colour, logo, shiftName, inspections } = req.body;

    if (!date || !design || !batch_no || !mc_no || !shiftName || !inspections) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Normalize date for the day
    const start = new Date(date);
    start.setHours(0, 0, 0, 0);
    const end = new Date(date);
    end.setHours(23, 59, 59, 999);

    let report = await VisualReport.findOne({
      batch_no,
      mc_no,
      design,
      date: { $gte: start, $lte: end },
    });

    if (!report) {
      // Create new report if not found
      report = new VisualReport({
        date,
        design,
        batch_no,
        mc_no,
        colour,
        logo,
        shifts: {
          ShiftA: { inspections: [] },
          ShiftB: { inspections: [] },
          ShiftC: { inspections: [] },
        },
      });
    }

    // ✅ Push new inspections to the correct shift
    if (!report.shifts[shiftName]) {
      return res.status(400).json({ message: "Invalid shift name" });
    }

    report.shifts[shiftName].inspections.push(...inspections);

    await report.save();

    res.status(201).json({
      message: "Report updated successfully",
      report,
    });
  } catch (error) {
    console.error("Error saving report:", error);
    res.status(500).json({ message: "Error saving report", error: error.message });
  }
});

module.exports = router;
