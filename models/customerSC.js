const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  gst_number: { type: String, required: true, unique: true },
  customer_name: String,
  customer_location: String,
  customer_template: String
});

module.exports = mongoose.model('customer_gst', customerSchema);

