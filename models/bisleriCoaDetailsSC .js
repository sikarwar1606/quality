const mongoose = require('mongoose');

const bisleriWaterCoaDetailsSchema = new mongoose.Schema({
  closureType:String,
  numberOfCavity: Number,
  appearance: String,
  mb_lot_no: String,
  closure_Shade: String,
  cl_ht: String,
   cl_ht_tol: String,
  cl_kn: String,
  cl_kn_tol: String,
  cl_eDia: String,
  cl_eDia_tol: String,
  cl_plugDia: String,
  cl_plugDia_tol: String,
  cl_maxDia: String,
  cl_maxDia_tol: String,
  cl_plug_ht: String,
  cl_plug_ht_tol: String,
  cl_sst: String,
  issued_by: String,
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('bisleriwater_coa_details', bisleriWaterCoaDetailsSchema);

