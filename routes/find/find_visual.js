const express = require("express");
const mongoose = require("mongoose");
const { isLoggedIn } = require("../auth");
const VisualReport = require("../../models/visual_inspecSC");
const designSC = require("../../models/specsSC");
const router = express.Router();
const Batch = require("../../models/batchSC")
const mbDetailsSC = require("../../models/mbDetailsSC");
const docNo = require("../../models/docNoDetailsSC")

router.get("/", isLoggedIn, (req, res) => {
  // res.render("find/find_visual_inspection_date");
  res.render("find/find_visual_inspection_date ")
});

// ✅ STEP 2 — Show list of all machines for selected date
router.get("/:date", isLoggedIn, async (req, res) => {
  const date = req.params.date;
  const user = req.user.username;

  try {
    // Find all inspection reports for this date
    const reports = await VisualReport
      .find({ date })
      .sort({ mc_no: 1 }); // sort machines alphabetically

    if (!reports.length) {
      return res.send(`No dimension reports found for date: ${date}`);
    }



    const docDetail = await docNo.findOne({ docNo: "SIPL-QA-R-05" });

    // Render machine list
    res.render("find/machine_list_visual", { reports, date, user, docDetail });
  } catch (err) {
    console.error("Error fetching machines:", err);
    res.status(500).send("Server error");
  }
});

// ✅ STEP 3 — Show report for selected date + machine
router.get("/:date/:mcId/:batch_number", isLoggedIn, async (req, res) => {
  const { date, mcId, batch_number } = req.params;
  const user = req.user.username;

  try {
    const regex = new RegExp(`(^|\\s*/\\s*)${mcId}(\\s*/\\s*|$)`, "i");

    // Find the report for that machine and date
    const report = await VisualReport.findOne({
      date,
      batch_number,
      mc_no: { $regex: regex },
    });

    if (!report) {
      return res.status(404).send(`No report found for ${mcId} on ${date}`);
    }
    console.log(report);

    const latestBatch = await Batch.findOne({ batch_number: report.batch_number });
    // console.log(latestBatch);
    
    const spec = await designSC.findOne({ design: latestBatch.design });
    const mb_detail = await mbDetailsSC.findOne({ mb_code: latestBatch.mb_code });
    const docDetail = await docNo.findOne({ docNo: "SIPL-QA-R-06" });

    res.render("show/show_visual_inspec", {
      spec,
      user,
      docDetail,
      mcId,
      latestBatches: latestBatch,
      mb_detail,
      inspectionReportIncom: report,
    });
  } catch (err) {
    console.error("Error fetching report by date and machine:", err);
    res.status(500).send("Server error");
  }
});

//////SAVE VERIFIED BY ROUTE

router.post("/save", isLoggedIn, async (req, res) => {
  try {
    const { date, batch_number, mc_no, verifiedBy } =
      req.body;
      

    if (!date || !batch_number) {
      return res.status(400).json({
        success: false,
        message: "Date and Batch Number are required",
      });
    }

    // Check if inspection for this batch/date already exists
    inspection = await VisualReport.findOne({ batch_number, date, mc_no });
    
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
