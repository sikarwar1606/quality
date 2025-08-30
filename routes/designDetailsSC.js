const mongoose = require('mongoose');

const designDetailsSchema = new mongoose.Schema({
  design:String,
  cl_type: String,
  cl_wt_spec: String,
  cl_drw: String,
  cl_fn_ty: String,
  cl_size_ty: String,
  cl_kn_spec: String,
  cl_kn_spec_tol: String,
  cl_wt_spec_tol: String,
  cl_liner_wt_spec: String,
   cl_liner_spec_tol: String,
  cl_ht_spec: String,
   cl_ht_spec_tol: String,
  cl_sst: String,
});

module.exports = mongoose.model('design_details', designDetailsSchema);

