const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  gstNumber: { type: Number, required: true, unique: true },
  name: String,
  location: String
});

module.exports = mongoose.model('customer_gst', customerSchema);
