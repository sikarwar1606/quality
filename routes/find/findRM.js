const express = require("express");
const mongoose = require("mongoose");
const rm_details = require("../../models/rmDetailsSC");
const { isLoggedIn } = require("../auth");

const router = express.Router();

router.get('/find', isLoggedIn, (req, res)=>{
  res.render('find/find_rm');
})

router.post('/find', isLoggedIn, (req, res)=>{
  const rm = req.body.rm;
  res.redirect(`/rm/show?rm=${rm}`);
})


router.get("/show", isLoggedIn, async (req, res) => {

  try {
    const rm = req.query.rm
    
    //Awaiting the batch details from the database
    const rmData = await rm_details.findOne({
      rm: rm,
    });
    
    if (!rmData) {
      return res.status(404).send("This resin (material) code does not exist");
    }

    const {rm_sup, rm_type} = rmData;
    res.render('show/show_rmDetails', {rm, rm_sup, rm_type});
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

router.post('/update', isLoggedIn, async (req, res)=>{
  try{
    const rm = req.body.rm;
    if(!rm){
      return res.status(400).send("This rm code does not exist");
    }
    await rm_details.updateOne({rm: rm}, {
      rm: req.body.rm, 
      rm_sup: req.body.rm_sup, 
      rm_type: req.body.rm_type
    })

    res.redirect(`/rm/show?rm=${rm}`);
  }catch(err){res.status(500).send("Server Error")}

});

module.exports = router;
