const mongoose = require('mongoose');

const cokeCoaDetailsSchema = new mongoose.Schema({
  design:String,
  product: String,
  cl_type: String,
  cl_wt: String,
  cl_drw: String,
  cl_fn_ty: String,
  cl_size_ty: String,
  cl_kn: String,
  cl_kn_tol: String,
  cl_wt_tol: String,
  cl_liner_wt: String,
  cl_liner_wt_tol: String,
  cl_ht: String,
  cl_ht_tol: String,
  cl_sst: String,
  issued_by: String,
  rm:String,
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('coke_coa_details', cokeCoaDetailsSchema);

