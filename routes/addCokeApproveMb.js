const express = require("express");
const mongoose = require("mongoose");
const plantSC = require("../models/approvedMbDetails");
const { isLoggedIn } = require("./auth");

const router = express.Router();

router.get('/new', isLoggedIn,(req, res) => {
    let user = req.user.username;
  res.render('add/add_cokeApprovedMb',{user});
});

router.post('/new', isLoggedIn, async (req, res)=>{
    try{
        const newPlant = new plantSC({
            ...req.body
        });
        await newPlant.save();
        let plant_code = newPlant.plant_code;        
        res.render('success/addPlantSuccess', {plant_code});
    }catch(err){
        console.error("Error creating MB details:", err);
        
    }
})

module.exports = router;