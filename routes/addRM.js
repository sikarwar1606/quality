const express = require("express");
const mongoose = require("mongoose");
const rmDetailsSC = require("../models/rmDetailsSC");
const { isLoggedIn } = require("./auth");

const router = express.Router();

router.get('/new', isLoggedIn, (req, res) => {
  res.render('add/addrmDetails');
});

router.post('/new', isLoggedIn, async (req, res)=>{
    try{
        const newRMDetails = new rmDetailsSC({
            ...req.body
        });
        let rm = newRMDetails.rm;
        await newRMDetails.save();
        res.render('addRMSuccess', {rm});
    }catch(err){
        console.error("Error creating MB details:", err);
        res.render('error')
    }
})

module.exports = router;