const mongoose = require('mongoose');

const docNoDetailsSchema = new mongoose.Schema({
  docNo:{type: String, unique: true},
  revNo:String,
  revDt:String,
  docName:String
});

module.exports = mongoose.model('document_no_details', docNoDetailsSchema);
