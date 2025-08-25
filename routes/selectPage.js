const express = require('express')
const router = express.Router()

app.post('/home', (req, res)=>{
    const {customer, supplier} = req.body;

    if(customer === "coke" && supplier === "secure"){
        res.send("This is secure format and cock is customer")
        
    }
})

module.exports = router;