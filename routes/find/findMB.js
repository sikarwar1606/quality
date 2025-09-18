const express = require("express");
const mongoose = require("mongoose");
const mb_details = require("../../models/mbDetailsSC");
const { isLoggedIn } = require("../auth");

const router = express.Router();

router.get('/find', isLoggedIn, (req, res)=>{
  res.render('find/find_mb');
})

router.post('/find', isLoggedIn, (req, res)=>{
  const mb_code = req.body.mb_code;
  res.redirect(`/mb/show?mb_code=${mb_code}`);
})


router.get("/show", isLoggedIn, async (req, res) => {

  try {
    const mb_code = req.query.mb_code
    if(!mb_code){
      return res.status(400).send("Master Batch Code is wronge");
    }
    //Awaiting the batch details from the database
    const mbData = await mb_details.findOne({
      mb_code: mb_code,
    });

    if (!mbData) {
      return res.status(404).send("This mb code does not exist");
    }

    const {mb_sup, mb_colour, mb_dosage} = mbData;
    res.render('show/show_mbDetails', {mb_code, mb_sup, mb_colour, mb_dosage});
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

router.post('/update', isLoggedIn, async (req, res)=>{
  try{
    const mb_code = req.body.mb_code;
    if(!mb_code){
      return res.status(400).send("This mb code does not exist");
    }
    await mb_details.updateOne({mb_code: mb_code}, {
      mb_code: req.body.mb_code, 
      mb_sup: req.body.mb_sup, 
      mb_colour: req.body.mb_colour, 
      mb_dosage:req.body.mb_dosage
    })

    res.redirect(`/mb/show?mb_code=${mb_code}`);
  }catch(err){res.status(500).send("Server Error")}

});

module.exports = router;
