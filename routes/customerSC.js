const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  gst_number: { type: String, required: true, unique: true },
  plant_name: String,
  plant_location: String
});

module.exports = mongoose.model('customer_gst', customerSchema);

