const express = require("express");
const mongoose = require("mongoose");
const mbDetailsSC = require("../models/mbDetailsSC");

const router = express.Router();

router.get('/new', (req, res) => {
  res.render('add/addmbDetails');
});

router.post('/new', async (req, res)=>{
    try{
        const newMBDetails = new mbDetailsSC({
            ...req.body
        });
        let mb_code = newMBDetails.mb_code;
        await newMBDetails.save();
        res.render('addMBSuccess', {mb_code});
    }catch(err){
        console.error("Error creating MB details:", err);
        res.render('error')
    }
})

module.exports = router;