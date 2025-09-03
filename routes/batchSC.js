const mongoose = require('mongoose');

const batchSchema = new mongoose.Schema({
  batch_number: { type: Number, required: true},
  date: Date,
  shift:String,
  design: String,
  debossed: String,
  mc_no:String,
  rm: String,
  rm_sup: String,
  product:String,
  mb_supp: String,
  mb_code:String,
  mb_dosage: String,
  mb_colour:String,
  packing_qty:Number,
  mc_speed: Number,
  issued_by:String
});

module.exports = mongoose.model('batch_details', batchSchema);

