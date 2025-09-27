const mongoose = require('mongoose');

const logoSchema = new mongoose.Schema({
  logo:String,
  customer:String,
  issuedBy:String,
});

module.exports = mongoose.model('logo_details', logoSchema);
