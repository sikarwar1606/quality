const mongoose = require('mongoose');

const batchSchema = new mongoose.Schema({
  batch_number: { type: Number, required: true, unique: true },
  design: { type: String, required: true, unique: true },
  colour: { type: String, required: true},
  debossed: { type: String, required: true },
  machine_number: { type: String, required: true},
  master_batch: { type: String, required: true},
  raw_material: { type: String, required: true },
  mb_supp: String,
  mb_code:String,
  mb_dosage: String,
  mb_colour:String,
  product:String
});

module.exports = mongoose.model('batch_details', batchSchema);

