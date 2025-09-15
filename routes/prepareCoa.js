const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("./auth");
const Customer_gst = require("../models/customerSC");
const batch_details = require("../models/batchSC");
const plant_details = require("../models/plantSC");
const cokeCoaDetailsSC = require("../models/cokeCoaDetailsSC");
const relianceCoaDetailsSC = require("../models/relianceCoaDetailsSC");
const mbDetailsSC = require("../models/mbDetailsSC");
const rmDetailsSC = require("../models/rmDetailsSC");
const dimension_data = require("./dimension");
const specSC = require("../models/specsSC");
const docNoDetailsSC = require("../models/docNoDetailsSC");

let templateCode;
let inputs;

router.post("/", isLoggedIn, async (req, res) => {
  inputs = req.body;

  let gst_number = req.body.customer_gst;
  gstDetails = await Customer_gst.findOne({ gst_number: gst_number });
  templateCode = gstDetails.customer_template;
  //Condition to redirect on releated coa template
  if (templateCode == "R") {
    res.redirect("/coa/redirect/relianceCoa");
  } else if (templateCode == "C") {
    res.redirect("/coa/redirect/cokeCoa");
  }
});

router.get("/relianceCoa", isLoggedIn, async (req, res) => {
  let inv_no = inputs.invoice_no;
  let inv_dt = new Date(inputs.invoice_dt).toLocaleDateString("en-GB");
  let qty = inputs.qty;
  let mfd = inputs.mfd;
  let batch_number = inputs.batch_number;
  let customer_gst = inputs.customer_gst;
  let plant_code = inputs.plant_code;

  const more_info = { inv_no, inv_dt, qty, mfd };

  const result = await dimension_data.aggregate([
    { $match: { batch_number: batch_number } },
    { $unwind: "$data" },
    {
      $group: {
        _id: "$batch_number",
        avgwt: { $avg: "$data.wt" },
        avght: { $avg: "$data.ht" },
        avgkn: { $avg: "$data.knurling" },
      },
    },
  ]);

  let avgData = result.length > 0 ? result[0] : {};

  // 3️⃣ Load other related data
  const batch = await batch_details.findOne({ batch_number });
  if (!batch) {
    return res.send("This batch number does not exist, Please check once");
  }

  const customer = await Customer_gst.findOne({ gst_number: customer_gst });
  if (!customer) {
    return res.send("This GST number is not registered, Please contact admin");
  }

  const relianceCoaDes = await relianceCoaDetailsSC.findOne({
    design: batch.design,
  });
  const plant = await plant_details.findOne({ plant_code });
  const specs = await specSC.findOne({ design: batch.design });

  const customer_data = {
    customer_name: customer.customer_name,
    customer_location: customer.customer_location,
  };

  const relianceCoaDetailsData = {
    product: relianceCoaDes.product,
    design: relianceCoaDes.design,
    rm: relianceCoaDes.rm,
    cl_wt: relianceCoaDes.cl_wt,
    cl_wt_tol: relianceCoaDes.cl_wt_tol,
    cl_ht: relianceCoaDes.cl_ht,
    cl_ht_tol: relianceCoaDes.cl_ht_tol,
    cl_kn: relianceCoaDes.cl_kn,
    cl_kn_tol: relianceCoaDes.cl_kn_tol,
    cl_tDia: relianceCoaDes.cl_tDia,
    cl_tDia_tol: relianceCoaDes.cl_tDia_tol,
    cl_eDia: relianceCoaDes.cl_eDia,
    cl_eDia_tol: relianceCoaDes.cl_eDia_tol,
    cl_plugDia: relianceCoaDes.cl_plugDia,
    cl_plugDia_tol: relianceCoaDes.cl_plugDia_tol,
    cl_maxDia: relianceCoaDes.cl_maxDia,
    cl_maxDia_tol: relianceCoaDes.cl_maxDia_tol,
    lubricationMig: relianceCoaDes.lubricationMig,
    shelfLife: relianceCoaDes.shelfLife,
    cl_sst: relianceCoaDes.cl_sst,
  };
  //Taking document details like doc no and rev no from docDetailsSC
  const docDetails = await docNoDetailsSC.findOne({docName:cokeCoaDes.product})
  

  const batch_data = {
    batch_number: batch.batch_number,
    design: batch.design,
    colour: batch.colour,
    debossed: batch.debossed,
    machine_number: batch.machine_number,
    rm: batch.rm,
    mb_code: batch.mb_code,
  };

  let mb_code = batch_data.mb_code;
  let rm = relianceCoaDetailsData.rm;

  const mbDetails = await mbDetailsSC.findOne({ mb_code: mb_code });
  const mbData = {
    mb_code: mbDetails.mb_code,
    mb_sup: mbDetails.mb_sup,
    mb_colour: mbDetails.mb_colour,
    mb_dosage: mbDetails.mb_dosage,
  };

  const rmDetails = await rmDetailsSC.findOne({ rm: rm });
  const rmData = {
    rm_sup: rmDetails.rm_sup,
    rm_type: rmDetails.rm_type,
  };

  const plant_data = {
    plant_name: plant.plant_name,
    plant_location: plant.plant_location,
    plant_add: plant.plant_add,
  };

  const specData = {
    packing_qty: specs.packing_qty,
  };

  res.render("coa/reliance", {
    customer_data,
    batch_data,
    plant_data,
    relianceCoaDetailsData,
    avgData,
    more_info,
    specData,
    mbData,
    rmData,
  });
});

//This route is to handle the coa of coke
router.get("/cokeCoa",  async (req, res) => {
  let inv_no = inputs.invoice_no;
  let inv_dt = inputs.invoice_dt;
  let qty = inputs.qty;
  let mfd = inputs.mfd;
  let batch_number = inputs.batch_number;
  let customer_gst = inputs.customer_gst;
  let plant_code = inputs.plant_code;

  const more_info = { inv_no, inv_dt, qty, mfd };

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

  //Taking document details like doc no and rev no from docDetailsSC
    const rawdocDetails = await docNoDetailsSC.findOne({docName:cokeCoaDes.product})
    let docDetails;
    if(plant_code==="A" || plant_code==="D"){
      docDetails = rawdocDetails
    }else{
      docDetails = {
        docNo: rawdocDetails.docNo.replace("SIPL", "VFT"),
        revNo: rawdocDetails.revNo,
        revDt: rawdocDetails.revDt
      }
    }

  
    
    

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
  };

  const rmDetails = await rmDetailsSC.findOne({ rm: rm });
  const rmData = {
    rm: rmDetails.rm,
    rm_sup: rmDetails.rm_sup,
    rm_type: rmDetails.rm_type,
  };

  const plant_data = {
    plant_name: plant.plant_name,
    plant_location: plant.plant_location,
    plant_add: plant.plant_add,
  };

  const specData = {
    packing_qty: specs.packing_qty,
  };

  res.render("coa/coke", {
    customer_data,
    batch_data,
    plant_data,
    cokeCoaDetailsData,
    avgData,
    more_info,
    specData,
    mbData,
    rmData,
    docDetails
  });
});

module.exports = router;
