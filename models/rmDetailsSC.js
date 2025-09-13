const mongoose = require('mongoose');

const rmDetailsSchema = new mongoose.Schema({
  rm:String,
  rm_sup:String,
  rm_type:String,
});

module.exports = mongoose.model('rm_details', rmDetailsSchema);
