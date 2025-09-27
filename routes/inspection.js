const express = require("express");
var path = require('path');
// const mongoose = require("mongoose");

const router = express.Router();

router.get('/visual', (req,res)=>{
    res.render('inspection/visual_inspec')
})


module.exports = router;
