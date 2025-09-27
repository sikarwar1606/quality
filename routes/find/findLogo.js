const express = require("express");
const mongoose = require("mongoose");
const logo_details = require("../../models/logoSC");
const { isLoggedIn } = require("../auth");

const router = express.Router();

router.get('/find', isLoggedIn, (req, res)=>{
  res.render('find/find_logo');
})

router.post('/find', isLoggedIn, (req, res)=>{
  const logo = req.body.logo;
  res.redirect(`/find_logo/show?logo=${logo}`);
})


router.get("/show", isLoggedIn, async (req, res) => {

  try {
    const logo = req.query.logo
    if(!logo){
      return res.status(400).send("Logo name is wronge");
    }
    //Awaiting the batch details from the database
    const logoData = await logo_details.findOne({
      logo: logo,
    });

    if (!logoData) {
      return res.status(404).send("This Logo does not exist");
    }

    const {customer} = logoData;
    res.render('show/show_logoDetails', {logo, customer});
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

router.post('/update', isLoggedIn, async (req, res)=>{
  try{
    const logo = req.body.logo;
    if(!logo){
      return res.status(400).send("This logo does not exist");
    }
    await logo_details.updateOne({logo: logo}, {
      logo: req.body.logo, 
      customer: req.body.customer,
    })

    res.redirect(`/find_logo/show?logo=${logo}`);
  }catch(err){res.status(500).send("Server Error")}

});

module.exports = router;
