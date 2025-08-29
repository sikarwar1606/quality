const express = require('express')
const router = express.Router();
const {isLoggedIn} = require('./auth')
const Customer_gst = require('./customerSC')



router.post('/redirect',isLoggedIn, async function(req, res){
  
  const batch_number = req.body.batch_number
    const customer_gst = req.body.customer_gst
const plant_code = req.body.plant_code

const a = await Customer_gst.findOne({gst_number:customer_gst})
if(!a){
    return res.send("This GST number is not registered, Please contect to admin")
}
if(a.customer_template === 'C'){
    res.render('coke')
}else if (a.customer_template === 'B'){
    res.render('bisleri')
}else if(a.customer_template==='R'){
    res.render('reliance')
}



})


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
