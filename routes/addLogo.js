const express = require("express");
const mongoose = require("mongoose");
const logoSC = require("../models/logoSC");
const { isLoggedIn } = require("./auth");

const router = express.Router();

router.get('/new', isLoggedIn, (req, res) => {
  res.render('add/addLogo');
});

router.post('/new', isLoggedIn, async (req, res)=>{
    try{
        const newLogo = new logoSC({
            ...req.body
        });
        let logo = newLogo.logo;
        await newLogo.save();
        res.render('success/addLogoSuccess', {logo});
    }catch(err){
        console.error("Error while adding logo:", err);
        res.render('error')
    }
})

module.exports = router;