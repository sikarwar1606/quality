const express = require("express");
const mongoose = require("mongoose");
const { isLoggedIn } = require("./auth");
const VisualReport = require("../models/visual_inspecSC");
const router = express.Router();
const Batch = require("../models/batchSC");
const mbDetailsSC = require("../models/mbDetailsSC");
const docNo = require("../models/docNoDetailsSC")


function getShiftDate() {
  const now = new Date();
  const hour = now.getHours();

  if (hour < 7) {
    now.setDate(now.getDate() - 1);
  }

  const day = String(now.getDate()).padStart(2, '0');
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const year = now.getFullYear();

  return `${year}-${month}-${day}`; // YYYY-MM-DD local time
}


let inspection;

router.get("/:id", async (req, res) => {
  let user = req.user.username
  const mcId = req.params.id;
  console.log(req.body);
console.log(user);

  try {
    // Aggregate latest batches per machine
    const regex = new RegExp(`(^|\\s*/\\s*)${mcId}(\\s*/\\s*|$)`, "i");

    const latestBatches = await Batch.findOne({ mc_no: { $regex: regex } })
      .sort({ batch_number: -1 })
      .exec();

    if (!latestBatches) {
      return res.status(404).send(`No batch found for machine ${mcId}`);
    }

    //Fetching document details
    let docDetail = await docNo.findOne({docNo:"SIPL-QA-R-05"})

    const mb_code = latestBatches.mb_code;
    const mb_detail = await mbDetailsSC.findOne({ mb_code: mb_code });

    const existingInspection = await VisualReport.findOne({
     date: getShiftDate(),
      mc_no: mcId,
    })

    // console.log(`Existing data ${existingInspection}`);
    
    res.render("inspection/visual_inspec", {user, docDetail, mcId, latestBatches, mb_detail,inspectionReportIncom:existingInspection || null });
  } catch (err) {
    console.error("Error fetching latest batches:", err);
    res.status(500).send("Server error");
  }
});

router.post("/save", isLoggedIn, async (req, res) => {
  try {
    const { date, batch_number, mc_no, shiftA, shiftB, shiftC, verifiedBy } =
      req.body;

    if (!date || !batch_number) {
      return res.status(400).json({
        success: false,
        message: "Date and Batch Number are required",
      });
    }

    // Check if inspection for this batch/date already exists
    inspection = await VisualReport.findOne({ batch_number, date });

    if (!inspection) {
      // create new document
      inspection = new VisualReport({
        date,
        mc_no,
        batch_number,
        shiftA,
        shiftB,
        shiftC,
        verifiedBy,
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
