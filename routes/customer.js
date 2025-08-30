const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("./auth");
const Customer_gst = require("./customerSC");
const batch_details = require("./batchSC")
const plant_details = require("./plantSC")
const design_details = require("./designDetailsSC")



router.post("/redirect", isLoggedIn, async function (req, res) {
  const batch_number = req.body.batch_number;
  const customer_gst = req.body.customer_gst;
  const plant_code = req.body.plant_code;

//Getting customer data, batch data and plant data on the basis of input of user
  const customer = await Customer_gst.findOne({ gst_number: customer_gst });
  const batch = await batch_details.findOne({batch_number:batch_number});
  const plant = await plant_details.findOne({plant_code:plant_code});
  //Checking if provided data (gst number) exist in database or not
  if (!customer) {
    return res.send(
      "This GST number is not registered, Please contect to admin"
    );
  }

  const customer_data = { 
    customer_name: customer.customer_name,
    customer_location: customer.customer_location,
 };
 const batch_data = {
    batch_number: batch.batch_number,
    design: batch.design,
    colour: batch.colour,
    debossed: batch.debossed,
    machine_number: batch.machine_number,
    raw_material: batch.raw_material,
    raw_material_supp: batch.raw_material_supp,
    mb_code: batch.mb_code,
    mb_colour:batch.mb_colour,
    mb_dosage: batch.mb_dosage,
    mb_supp: batch.mb_supp,
    product:batch.product
 }
 const plant_data = {
  plant_name: plant.plant_name,
  plant_location:plant.plant_location,
  plant_add: plant.plant_add
 }
 const design = batch_data.design
 const designData = await design_details.findOne({design:design})
 
 const design_data = {
  cl_type: designData.cl_type,
  cl_drw: designData.cl_drw,
  cl_fn_ty:designData.cl_fn_ty,
  cl_size_ty: designData.cl_size_ty,
  cl_kn_spec: designData.cl_kn_spec,
  cl_kn_spec_tol: designData.cl_kn_spec_tol,
  cl_liner_wt_spec: designData.cl_liner_wt_spec,
  cl_liner_wt_spec_tol:designData.cl_liner_spec_tol,
  cl_wt_spec: designData.cl_wt_spec,
  cl_wt_spec_tol: designData.cl_wt_spec_tol,
  cl_ht_spec: designData.cl_ht_spec,
  cl_ht_spec_tol:designData.cl_ht_spec_tol,
  cl_sst: designData.cl_sst
  
 }
 
 


  if (customer.customer_template === "C") {
    res.render("coke", { customer_data,batch_data, plant_data, design_data });
  } else if (customer.customer_template === "B") {
    res.render("bisleri");
  } else if (customer.customer_template === "R") {
    res.render("reliance");
  }
});

module.exports = router;

