const express = require('express')
const router = express.Router();
const Customer_gst = require('./customerSC')

router.post('/redirect', async (req, res)=>{
    const Customer_gst = req.body.gst_number;
    try{
    const customer = await Customer_gst.findOne({gst_number:gst_number})
    if(customer){
        res.render('Customer name', {customer})

    }else{
        res.render('Customer name not found')
    }
}catch(err){
    console.log(err);
    res.status(500).send("Server Error");
    
}}) 

module.exports = router;



















// Handle form submission
// router.post('/redirect', (req, res) => {
//   const { customer, supplier } = req.body;

//   if (customer === "Hindustan Coca Cola Beverages Ltd.") {
//     res.render('cocacola', { supplier });
//   } else if (customer === "Bisleri International") {
//     res.render('bisleri', { supplier });
//   } else {
//     res.render('error', { message: "Customer not found" });
//   }
// });

// module.exports = router;
