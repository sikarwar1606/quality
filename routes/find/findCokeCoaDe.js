const express = require("express");
const mongoose = require("mongoose");
const cokeCoa_details = require("../../models/cokeCoaDetailsSC");
const { isLoggedIn } = require("../auth");

const router = express.Router();
// let design

router.get('/find', isLoggedIn, (req, res)=>{
  res.render('find/find_cokecoade');
})

router.post('/find', isLoggedIn, (req, res)=>{
  const design = req.body.design;
  res.redirect(`/cokecoade/show?design=${design}`);
})


router.get("/show", isLoggedIn, async (req, res) => {

  try {
    const design = req.query.design
    
    
    if(!design){
      return res.status(400).send("Design is required");
    }
    //Awaiting the batch details from the database
    const cokeCoaData = await cokeCoa_details.findOne({
      design: design,
    });
    if (!cokeCoaData) {
      return res.status(404).send("This design does not exist");
    }

    console.log(cokeCoaData);
    
    // const {product,rm,cl_wt,cl_wt_tol,cl_ht, cl_ht_tol,cl_kn,cl_kn_tol,cl_tDia,cl_tDia_tol,cl_eDia,cl_eDia_tol,cl_plugDia,cl_plugDia_tol,cl_maxDia,cl_maxDia_tol,lubricationMig,shelfLife,cl_sst,issued_by,} = CokeCoaData;
    const {product, cl_type, cl_wt, cl_drw, cl_fn_ty, cl_size_ty, cl_kn, cl_kn_tol, cl_wt_tol, cl_liner_wt, cl_liner_wt_tol, cl_ht, cl_ht_tol, cl_sst, issued_by, date} = cokeCoaData;
    res.render('show/show_cokecoade', {design,product, cl_type, cl_wt, cl_drw, cl_fn_ty, cl_size_ty, cl_kn, cl_kn_tol, cl_wt_tol, cl_liner_wt, cl_liner_wt_tol,cl_ht, cl_ht_tol, cl_sst, issued_by,});
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

router.post('/update', isLoggedIn, async (req, res)=>{
  try{
    const design = req.body.design;
    if(!design){
      return res.status(400).send("Design is required");
    }
    await cokeCoa_details.updateOne({design: design}, {
      ...req.body
    })

    res.redirect(`/cokecoade/show?design=${design}`);
  }catch(err){res.status(500).send("Server Error")}

});

module.exports = router;
