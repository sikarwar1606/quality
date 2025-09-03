const mongoose = require('mongoose');

const batchSchema = new mongoose.Schema({
  batch_number: { type: Number, required: true, unique: true },
  date: Date,
  shift:String,
  design: { type: String, required: true, unique: true },
  debossed: { type: String, required: true },
  mc_no: { type: String, required: true},
  rm: { type: String, required: true },
  rm_sup: { type: String, required: true },
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

