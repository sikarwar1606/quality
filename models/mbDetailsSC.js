const mongoose = require('mongoose');

const mbDetailsSchema = new mongoose.Schema({
  mb_code:String,
  mb_sup:String,
  mb_colour:String,
  mb_dosage:String,
});

module.exports = mongoose.model('mb_details', mbDetailsSchema);
