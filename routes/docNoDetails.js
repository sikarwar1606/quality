const express = require("express");
const mongoose = require("mongoose");
const docNoDetailsSC = require("../models/docNoDetailsSC");
const { isLoggedIn } = require("./auth");

const router = express.Router();

router.get('/new', isLoggedIn,(req, res) => {
  res.render('add/addDocNoDetails');
});

router.post('/new', isLoggedIn, async (req, res)=>{
    try{
        const newaddDocNoDetails = new docNoDetailsSC({
            ...req.body
        });
        let docName = newaddDocNoDetails.docName;
        await newaddDocNoDetails.save();
        res.render('success/addDocNoDetailsSuccess', {docName});
    }catch(err){
        console.error("Error creating MB details:", err);
        res.render('error')
    }
})

module.exports = router;