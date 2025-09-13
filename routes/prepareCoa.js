const express = require("express");
const router = express.Router();
const Customer_gst = require("../models/customerSC");
const batch_details = require("../models/batchSC");
const plant_details = require("../models/plantSC");
const cokeCoaDetailsSC = require("../models/cokeCoaDetailsSC");
const mbDetailsSC = require("../models/mbDetailsSC");
const rmDetailsSC = require("../models/rmDetailsSC");
const dimension_data = require("./dimension");
const specSC = require("../models/specsSC");

// ================= MAIN COA ROUTE =================
router.post("/", async function (req, res) {
  const { batch_number, customer_gst, plant_code, invoice_no, invoice_dt, qty, mfd } = req.body;
  const more_info = { inv_no: invoice_no, inv_dt: invoice_dt, qty, mfd };

  try {
    // 1️⃣ Get dimension averages
    const result = await dimension_data.aggregate([
      { $match: { batch_number: batch_number } },
      { $unwind: "$data" },
      {
        $group: {
          _id: "$batch_number",
          minwt: { $min: "$data.wt" },
          minht: { $min: "$data.ht" },
          minkn: { $min: "$data.knurling" },

          maxwt: { $max: "$data.wt" },
          maxht: { $max: "$data.ht" },
          maxkn: { $max: "$data.knurling" },

          avgwt: { $avg: "$data.wt" },
          avght: { $avg: "$data.ht" },
          avgkn: { $avg: "$data.knurling" },
        },
      },
    ]);

    let avgData = result.length > 0 ? result[0] : {};

    // 2️⃣ Detect missing values
    // const missingFields = Object.entries(avgData)
    //   .filter(([key, value]) => value === null || value === undefined)
    //   .map(([key]) => key);

    // if (missingFields.length > 0) {
    //   return res.render("coa_missing_data", {
    //     missingFields,
    //     avgData,
    //     batch_number,
    //   });
    // }

    // 3️⃣ Load other related data
    const batch = await batch_details.findOne({ batch_number });
    if (!batch) {
      return res.send("This batch number does not exist, Please check once");
    }

    const customer = await Customer_gst.findOne({ gst_number: customer_gst });
    if (!customer) {
      return res.send("This GST number is not registered, Please contact admin");
    }

    const cokeCoaDes = await cokeCoaDetailsSC.findOne({ design: batch.design });
    const plant = await plant_details.findOne({ plant_code });
    const specs = await specSC.findOne({ design: batch.design });
    

    const customer_data = {
      customer_name: customer.customer_name,
      customer_location: customer.customer_location,
    };

   

    const cokeCoaDetailsData = {
      cl_type: cokeCoaDes.cl_type,
      cl_drw: cokeCoaDes.cl_drw,
      cl_fn_ty: cokeCoaDes.cl_fn_ty,
      cl_size_ty: cokeCoaDes.cl_size_ty,
      cl_wt: cokeCoaDes.cl_wt,
      cl_wt_tol: cokeCoaDes.cl_wt_tol,
      cl_ht: cokeCoaDes.cl_ht,
      cl_ht_tol: cokeCoaDes.cl_ht_tol,
      cl_kn: cokeCoaDes.cl_kn,
      cl_kn_tol: cokeCoaDes.cl_kn_tol,
      cl_liner_wt: cokeCoaDes.cl_liner_wt,
      cl_liner_wt_tol: cokeCoaDes.cl_liner_wt_tol,
      cl_sst: cokeCoaDes.cl_sst,
      product: cokeCoaDes.product,
    };

    const batch_data = {
      batch_number: batch.batch_number,
      design: batch.design,
      colour: batch.colour,
      debossed: batch.debossed,
      machine_number: batch.machine_number,
      rm: batch.rm,
      mb_code: batch.mb_code,
    };

    const mb_code = batch_data.mb_code;
    const rm = batch_data.rm;
    
    

    const mbDetails = await mbDetailsSC.findOne({ mb_code: mb_code });
     const mbData = {
      mb_code: mbDetails.mb_code,
      mb_sup: mbDetails.mb_sup,
      mb_colour: mbDetails.mb_colour,
      mb_dosage: mbDetails.mb_dosage,
    }

    const rmDetails = await rmDetailsSC.findOne({rm: rm});
    const rmData = {
      rm: rmDetails.rm,
      rm_sup: rmDetails.rm_sup,
      rm_type: rmDetails.rm_type,
    }

    const plant_data = {
      plant_name: plant.plant_name,
      plant_location: plant.plant_location,
      plant_add: plant.plant_add,
    };

    const specData = {
      packing_qty: specs.packing_qty,
    };

    // 4️⃣ Render template depending on customer type
    if (customer.customer_template === "C") {
      res.render("coa/coke", {
        customer_data,
        batch_data,
        plant_data,
        cokeCoaDetailsData,
        avgData,
        more_info,
        specData,
        mbData,
        rmData
      });
    } else if (customer.customer_template === "B") {
      res.render("bisleri");
    } else if (customer.customer_template === "R") {
      res.render("reliance");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Error while generating COA");
  }
});



module.exports = router;
