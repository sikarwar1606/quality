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
const dimension_data = require("../models/dimension");
const specSC = require("../models/specsSC");
const docNoDetailsSC = require("../models/docNoDetailsSC");

const puppeteer = require("puppeteer"); // add puppeteer for PDF export

let templateCode;
let inputs;

router.post("/", isLoggedIn, async (req, res) => {
  inputs = req.body;
  try {
    let gst_number = req.body.customer_gst;

    if (!gst_number) {
      return res.send(`GST number is required`)
    }

    let gstDetails = await Customer_gst.findOne({ gst_number: gst_number });

    if (!gstDetails) {
      // return res.status(404).json({ error:  `GST Number${gst_number} not found in database, Please contact to Admin`});
      return res.send(`GST Number ${gst_number} not found in database, Please contact to Admin`)
    }

    let templateCode = gstDetails.customer_template;

    if (templateCode === "R") {
      return res.redirect("/coa/redirect/relianceCoa");
    } else if (templateCode === "C"){
      return res.redirect("/coa/redirect/cokeCoa")
    }else if (templateCode === "L"){
      return res.redirect("/coa/redirect/others")
    }else if (templateCode === "B"){
      return res.redirect("/coa/redirect/bisleriWater")
    }

    // If no matching condition
    return res
      .status(200)
      .json({ message: "Template code not matched", templateCode });
  } catch (error) {
    console.error("Error fetching GST details:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/relianceCoa", isLoggedIn, async (req, res) => {
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
  let rawdocDetails = await docNoDetailsSC.findOne({
    docName: relianceCoaDes.product,
  });
 
    let docDetails = {
      docNo: rawdocDetails.docNo.replace("SIPL", "VFT"),
      revNo: rawdocDetails.revNo,
      revDt: rawdocDetails.revDt,
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

   let coa_design = batch_data.design
  if(batch_data.design === "AB26CSD12 30.41"){
    coa_design = "AB26CSD12 (GME-30.41)"
  }

  let mb_code = batch_data.mb_code;
  let rm = relianceCoaDetailsData.rm;

 const mbDetails = await mbDetailsSC.findOne({ mb_code });

const mbData = {
  mb_code: mbDetails?.mb_code || "N/A",
  mb_sup: mbDetails?.mb_sup || "",
  mb_colour: mbDetails?.mb_colour || "Translucent",
  mb_dosage: mbDetails?.mb_dosage || "N/A",
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
    coa_design,
    docDetails
  });
});

//This route will handle the Bisleri Water coa route
router.get("/bisleriWater", isLoggedIn, async (req, res) => {
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
        avgwt: { $avg: "$data.wt" },
        avght: { $avg: "$data.ht" },
        avgkn: { $avg: "$data.knurling" },
        avgmax: { $avg: "$data.maxDia" },
        avgeDia: { $avg: "$data.eDia" },
        avgplugDia: { $avg: "$data.plugDia" },
        avgplugHt: { $avg: "$data.plugHt" },
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
  const specData = {
    packing_qty: specs.packing_qty,
    product: specs.product,
    cl_type: specs.cl_type
  };

  
  //Taking document details like doc no and rev no from docDetailsSC
  const rawdocDetails = await docNoDetailsSC.findOne({
    docName: specData.product,
  });
  let docDetails;
  if (plant_code === "A" || plant_code === "D") {
    docDetails = rawdocDetails;
  } else {
    docDetails = {
      docNo: rawdocDetails.docNo.replace("SIPL", "VFT"),
      revNo: rawdocDetails.revNo,
      revDt: rawdocDetails.revDt,
    };
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

 

  let mb_code = batch_data.mb_code;
  let rm = batch_data.rm;

 const mbDetails = await mbDetailsSC.findOne({ mb_code });

const mbData = {
  mb_code: mbDetails?.mb_code || "N/A",
  mb_sup: mbDetails?.mb_sup || "",
  mb_colour: mbDetails?.mb_colour || "Translucent",
  mb_dosage: mbDetails?.mb_dosage || "N/A",
};


  const rmDetails = await rmDetailsSC.findOne({ rm: rm });
  const rmData = {
    rm:rm,
    rm_sup: rmDetails.rm_sup,
    rm_type: rmDetails.rm_type,
  };

  const plant_data = {
    plant_name: plant.plant_name,
    plant_location: plant.plant_location,
    plant_add: plant.plant_add,
  };

  

  res.render("coa/bisleriWater", {
    customer_data,
    batch_data,
    plant_data,
    avgData,
    more_info,
    specData,
    mbData,
    rmData,
    docDetails
  });
});

//This route is to handle the coa of coke
router.get("/cokeCoa", async (req, res) => {
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
  const rawdocDetails = await docNoDetailsSC.findOne({
    docName: cokeCoaDes.product,
  });
  let docDetails;
  if (plant_code === "A" || plant_code === "D") {
    docDetails = rawdocDetails;
  } else {
    docDetails = {
      docNo: rawdocDetails.docNo.replace("SIPL", "VFT"),
      revNo: rawdocDetails.revNo,
      revDt: rawdocDetails.revDt,
    };
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
    docDetails,
  });
});
//This route is to handle the coa of coke
router.get("/others", async (req, res) => {
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
        mintdia: { $min: "$data.t_dia" },

        maxwt: { $max: "$data.wt" },
        maxht: { $max: "$data.ht" },
        maxkn: { $max: "$data.knurling" },
        maxtdia: { $max: "$data.t_dia" },

        avgwt: { $avg: "$data.wt" },
        avght: { $avg: "$data.ht" },
        avgkn: { $avg: "$data.knurling" },
        avgtdia: { $avg: "$data.t_dia" },

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

  const plant = await plant_details.findOne({ plant_code });
  const specs = await specSC.findOne({ design: batch.design });

  const customer_data = {
    customer_name: customer.customer_name,
    customer_location: customer.customer_location,
  };

  const specData = {
    packing_qty: specs.packing_qty,
    cl_type: specs.cl_type,
    cl_size_ty: specs.cl_size_ty,
    cl_wt: specs.cl_wt_spec,
    cl_wt_tol: specs.cl_wt_spec_tol,
    cl_ht: specs.cl_ht_spec,
    cl_ht_tol: specs.cl_ht_spec_tol,
    cl_kn: specs.cl_kn_spec,
    cl_kn_tol: specs.cl_kn_spec_tol,
    cl_e_dia: specs.e_dia,
    cl_e_dia_tol: specs.e_dia_tol,
    product: specs.product,
    sst: specs.sst
  };

 

  //Taking document details like doc no and rev no from docDetailsSC
  const rawdocDetails = await docNoDetailsSC.findOne({
    docName: specData.product,
  });
  let docDetails;
  if (plant_code === "A" || plant_code === "D") {
    docDetails = rawdocDetails;
  } else {
    docDetails = {
      docNo: rawdocDetails.docNo.replace("SIPL", "VFT"),
      revNo: rawdocDetails.revNo,
      revDt: rawdocDetails.revDt,
    };
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

  

  res.render("coa/others", {
    batch_data,
    plant_data,
    avgData,
    more_info,
    specData,
    mbData,
    rmData,
    docDetails,
    customer_data

  
  });
});

module.exports = router;
