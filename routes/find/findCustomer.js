const express = require("express");
const mongoose = require("mongoose");
const customerSC = require("../../models/customerSC");
const { isLoggedIn } = require("../auth");

const router = express.Router();
// let batch_number

router.get('/find', isLoggedIn, (req, res)=>{
  res.render('find/find_customer');
})

router.post('/find', isLoggedIn, (req, res)=>{
  const gst_number = req.body.gst_number;
  console.log(`This is the gst number from body${gst_number}`);
  res.redirect(`/customer/show?gst_number=${gst_number}`);
})


router.get("/show", isLoggedIn, async (req, res) => {

  try {
    const gst_number = req.query.gst_number
    if(!gst_number){
      return res.status(400).send("GST number is required");
    }

    console.log(`This is the gst number from query${gst_number}`);
    
    //Awaiting the batch details from the database
    const gstData = await customerSC.findOne({
      gst_number:gst_number
    });

    console.log(`This is the gst date from database ${gstData}`);
    
    if (!gstData) {
      return res.status(404).send("This GST number does not exist");
    }

    const {customer_location, customer_name, customer_template, issued_by} = gstData;
    
    res.render('show/show_customer', {gst_number,customer_location, customer_name, customer_template, issued_by});
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

router.post('/update', isLoggedIn, async (req, res)=>{
  try{
    const gst_number = req.body.gst_number;
    if(!gst_number){
      return res.status(400).send("GST number is required ");
    }
    await customerSC.updateOne({gst_number: gst_number}, {
      gst_number: req.body.gst_number,
      customer_location:req.body.customer_location,
      customer_name:req.body.customer_name,
      customer_template:req.body.customer_template,
      issued_by: req.body.issued_by

    })

    res.redirect(`/customer/show?gst_number=${gst_number}`);
  }catch(err){res.status(500).send("Server Error")}

});

module.exports = router;
