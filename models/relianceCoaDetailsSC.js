const mongoose = require('mongoose');

const relianceCoaDetailsSchema = new mongoose.Schema({
  design:String,
  product: String,
  rm: String,
  cl_wt: String,
  cl_wt_tol: String,
  cl_ht: String,
   cl_ht_tol: String,
  cl_kn: String,
  cl_kn_tol: String,
  cl_tDia: String,
  cl_tDia_tol: String,
  cl_eDia: String,
  cl_eDia_tol: String,
  cl_plugDia: String,
  cl_plugDia_tol: String,
  cl_maxDia: String,
  cl_maxDia_tol: String,
  lubricationMig: String,
  shelfLife: String,
  cl_sst: String,
  issued_by: String,
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('reliance_coa_details', relianceCoaDetailsSchema);

