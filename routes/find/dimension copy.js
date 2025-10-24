const express = require("express");
// const mongoose = require("mongoose");
const { isLoggedIn } = require("../auth");
const dimensionReport = require("../../models/dimension")
const router = express.Router();
const Batch = require("../../models/batchSC");
const mbDetailsSC = require("../../models/mbDetailsSC");
const designSC = require("../../models/specsSC")
const docNo = require("../../models/docNoDetailsSC")


let inspection;

// router.get('/',(req,res)=>{
//     res.render('find/find_dimension')
// })

router.get("/:id", isLoggedIn, async (req, res) => {
  let user = req.user.username
  const mcId = req.params.id;
  
  

  try {
    // Aggregate latest batches per machine
    const regex = new RegExp(`(^|\\s*/\\s*)${mcId}(\\s*/\\s*|$)`, "i");

    const latestBatches = await Batch.findOne({ mc_no: { $regex: regex } })
      .sort({ batch_number: -1 })
      .exec();

    if (!latestBatches) {
      return res.status(404).send(`No batch found for machine ${mcId}`);
    }

    //Fetching Design details
    let spec = await designSC.findOne({design:latestBatches.design})

    //Fetching document details
    let docDetail = await docNo.findOne({docNo:"SIPL-QA-R-06"})

    const mb_code = latestBatches.mb_code;
    const mb_detail = await mbDetailsSC.findOne({ mb_code: mb_code });

    const existingInspection = await dimensionReport.findOne({
      mc_no: { $regex: regex },
    }).sort({ date: -1 });
    

    res.render("show/show_dimension", {spec, user, docDetail, mcId, latestBatches, mb_detail,inspectionReportIncom:existingInspection || null });
  } catch (err) {
    console.error("Error fetching latest batches:", err);
    res.status(500).send("Server error");
  }
});



module.exports = router;
