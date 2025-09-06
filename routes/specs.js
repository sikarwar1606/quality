const express = require("express")
const mongoose = require("mongoose");
const router = express.Router();

const specsSchema = new mongoose.Schema({
  design: String,
  product: String,
  cl_type: String,
  cl_drw: String,
  cl_wt_spec: String,
  cl_wt_spec_tol: String,
  cl_ht_spec_tol: String,
  cl_ht_spec: String,
  cl_kn_spec: String,
  cl_kn_spec_tol: String,
  thickness: String,
  thickness_tol: String,
  t_dia_tol: String,
  t_dia: String,
  e_dia_tol: String,
  e_dia: String,
  plug_dia_tol: String,
  plug_dia: String,
  plug_ht_tol: String,
  plug_ht: String,
  top_flatness: String,
  top_flatness_tol: String,
  max_dia: String,
  max_dia_tol: String,
  slitting_ht: String,
  slitting_ht_tol: String,
  packing_qty: String,
});
const specs  = mongoose.model("specs", specsSchema);
router.get('/new', (req, res)=>{
  res.render('add/specs')
})
router.post('/new', async (req, res)=>{
  try {
      const newspec = new specs({
        ...req.body,
      });
      let design = newspec.design;
      await newspec.save();
      res.render("addSpecsSuccess", { design });
    } catch (err) {
      console.error("Error creating spec:", err);
      res.status(500).send("Server Error");
    }
})

module.exports = router