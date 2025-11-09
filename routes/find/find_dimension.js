const express = require("express");
const { isLoggedIn } = require("../auth");
const dimensionReport = require("../../models/dimension");
const Batch = require("../../models/batchSC");
const mbDetailsSC = require("../../models/mbDetailsSC");
const designSC = require("../../models/specsSC");
const docNo = require("../../models/docNoDetailsSC");

const router = express.Router();


// ✅ STEP 1 — Render form to select a date
router.get("/", isLoggedIn, (req, res) => {
  res.render("find/find_dimension_date");
});


// ✅ STEP 2 — Show list of all machines for selected date
router.get("/:date", isLoggedIn, async (req, res) => {
  const date = req.params.date;
  const user = req.user.username;

  try {
    // Find all inspection reports for this date
    const reports = await dimensionReport
      .find({ date })
      .sort({ mc_no: 1 }); // sort machines alphabetically

    if (!reports.length) {
      return res.send(`No dimension reports found for date: ${date}`);
    }



    const docDetail = await docNo.findOne({ docNo: "SIPL-QA-R-06" });

    // Render machine list
    res.render("find/machine_list", { reports, date, user, docDetail });
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
    const report = await dimensionReport.findOne({
      date,
      batch_number,
      mc_no: { $regex: regex },
    });

    if (!report) {
      return res.status(404).send(`No report found for ${mcId} on ${date}`);
    }
    // console.log(report);

    const latestBatch = await Batch.findOne({ batch_number: report.batch_number });
    // console.log(latestBatch);
    
    const spec = await designSC.findOne({ design: latestBatch.design });
    const mb_detail = await mbDetailsSC.findOne({ mb_code: latestBatch.mb_code });
    const docDetail = await docNo.findOne({ docNo: "SIPL-QA-R-06" });

    res.render("show/show_dimension", {
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

// // ✅ STEP 4 — Print selected reports
// router.post("/print", isLoggedIn, async (req, res) => {
//   try {
//     const { ids } = req.body; // array of _id values from checkboxes

//     if (!ids || !Array.isArray(ids) || ids.length === 0) {
//       return res.status(400).send("No reports selected for printing.");
//     }

//     console.log(ids);
    

//  // Fetch reports from MongoDB
//     const report = await dimensionReport.find({date:ids.date,
//       batch_number:ids.batch_number,
//       mc_no: ids.mc_no});
   
  
    

// const latestBatch = await Batch.findOne({ batch_number: ids.batch_number });

//   console.log(`Batch no ${latestBatch.batch_number}`);

   
    
//     // const spec = await designSC.findOne({ design: latestBatch.design });
//     const mb_detail = await mbDetailsSC.findOne({ mb_code: latestBatch.mb_code });

   
    

//     // Fetch document details (if needed for header)
//     const docDetail = await docNo.findOne({ docNo: "SIPL-QA-R-06" });

//     res.render("show/show_dimension", { report, docDetail,spec,user,mcId,latestBatches: latestBatch,mb_detail });
//   } catch (err) {
//     console.error("Error printing reports:", err);
//     res.status(500).send("Server error while printing.");
//   }
// });


module.exports = router;


