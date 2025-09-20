const express = require("express");
const mongoose = require("mongoose");
const design_details = require("../../models/specsSC");
const { isLoggedIn } = require("../auth");

const router = express.Router();
// let design

router.get("/find", isLoggedIn, (req, res) => {
  res.render("find/find_design");
});

router.post("/find", isLoggedIn, (req, res) => {
  const design = req.body.design;
  res.redirect(`/design/show?design=${design}`);
});

router.get("/show", isLoggedIn, async (req, res) => {
  try {
    const design = req.query.design;
    if (!design) {
      return res.status(400).send("Design is required");
    }
    //Awaiting the design details from the database
    const designData = await design_details.findOne({
      design: design,
    });
    
    if (!designData) {
      return res.status(404).send("This design does not exist");
    }

    const {product,cl_type,cl_drw,cl_wt_spec,cl_wt_spec_tol,cl_ht_spec_tol, cl_ht_spec,cl_kn_spec,cl_kn_spec_tol,thickness,thickness_tol,t_dia_tol,t_dia,e_dia_tol,e_dia,plug_dia_tol,plug_dia,plug_ht_tol,plug_ht,top_flatness,top_flatness_tol,max_dia,max_dia_tol,slitting_ht,slitting_ht_tol,packing_qty,cl_size_ty, sst}= designData;
    
  
  res.render("show/show_design", { design,product,cl_type,cl_drw,cl_wt_spec,cl_wt_spec_tol,cl_ht_spec_tol, cl_ht_spec,cl_kn_spec,cl_kn_spec_tol,thickness,thickness_tol,t_dia_tol,t_dia,e_dia_tol,e_dia,plug_dia_tol,plug_dia,plug_ht_tol,plug_ht,top_flatness,top_flatness_tol,max_dia,max_dia_tol,slitting_ht,slitting_ht_tol,packing_qty,cl_size_ty,sst });

}catch (err) {
    res.status(500).send("Server Error");
  }
});

router.post("/update", isLoggedIn, async (req, res) => {
  try {
    const design = req.body.design;
    if (!design) {
      return res.status(400).send("Design is required ");
    }
    await design_details.updateOne(
      { design: design },
      {
        ...req.body,
      }
    );

    res.redirect(`/design/show?design=${design}`);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

module.exports = router;
