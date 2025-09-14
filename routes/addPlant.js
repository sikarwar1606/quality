const express = require("express");
const mongoose = require("mongoose");
const plantSC = require("../models/plantSC");

const router = express.Router();

router.get('/new', (req, res) => {
  res.render('add/addPlant');
});

router.post('/new', async (req, res)=>{
    try{
        const newPlant = new plantSC({
            ...req.body
        });
        await newPlant.save();
        let plant_code = newPlant.plant_code;        
        res.render('addPlantSuccess', {plant_code});
    }catch(err){
        console.error("Error creating MB details:", err);
        
    }
})

module.exports = router;