const mongoose = require('mongoose');

const batchSchema = new mongoose.Schema({
  batch_number: { type: Number, required: true},
  date: Date,
  shift:String,
  design: String,
  debossed: String,
  mc_no:{ type: [String], default: [] },
  rm: String,
  mb_code:String,
  mc_speed: Number,
  issued_by:String
});

module.exports = mongoose.model('batch_details', batchSchema);

