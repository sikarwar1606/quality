const express = require("express");
const mongoose = require("mongoose");
const batch_details = require("../models/batchSC");
const { isLoggedIn } = require("./auth");

const router = express.Router();
// let batch_number

router.get('/find', isLoggedIn, (req, res)=>{
  res.render('add/find_batch');
})

router.post('/find', isLoggedIn, (req, res)=>{
  const batch_number = req.body.batch_number;
  res.redirect(`/batch/show?batch_number=${batch_number}`);
})


router.get("/show", isLoggedIn, async (req, res) => {

  try {
    const batch_number = req.query.batch_number
    if(!batch_number){
      return res.status(400).send("Batch number is required (Not found at show route)");
    }
    //Awaiting the batch details from the database
    const batchData = await batch_details.findOne({
      batch_number: batch_number,
    });

    if (!batchData) {
      return res.status(404).send("This batch number does not exist");
    }

    const {date,shift,design,debossed,mc_no,rm,mb_code,mc_speed,issued_by,} = batchData;
    const bDate = date.toLocaleDateString("en-GB");
    res.render('add/show_batch', {bDate,shift,design,debossed,mc_no,rm,mb_code,mc_speed,issued_by,batch_number});
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

router.post('/update', isLoggedIn, async (req, res)=>{
  try{
    const batch_number = req.body.batch_number;
    if(!batch_number){
      return res.status(400).send("Batch number is required (Not found at update route)");
    }
    await batch_details.updateOne({batch_number: batch_number}, {
      shift: req.body.shift,
      design: req.body.design,
      debossed: req.body.debossed,
      mc_no: req.body.mc_no,
      rm: req.body.rm,
      mb_code: req.body.mb_code,
      mc_speed: req.body.mc_speed,
    })

    res.redirect(`/batch/show?batch_number=${batch_number}`);
  }catch(err){res.status(500).send("Server Error")}

});

module.exports = router;
