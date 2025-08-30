const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("./auth");
const Customer_gst = require("./customerSC");
const batch_details = require("./batchSC")



router.post("/redirect", isLoggedIn, async function (req, res) {
  const batch_number = req.body.batch_number;
  const customer_gst = req.body.customer_gst;
  const plant_code = req.body.plant_code;

//Getting customer data, batch data and plant data on the basis of input of user
  const customer = await Customer_gst.findOne({ gst_number: customer_gst });
  const batch = await batch_details.findOne({batch_number:batch_number})
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
    raw_material: batch.raw_material
 }


  if (customer.customer_template === "C") {
    res.render("coke", { customer_data,batch_data });
  } else if (customer.customer_template === "B") {
    res.render("bisleri");
  } else if (customer.customer_template === "R") {
    res.render("reliance");
  }
});

module.exports = router;

