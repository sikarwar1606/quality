const mongoose = require('mongoose');

const plantSchema = new mongoose.Schema({
  plant_code: { type: String, required: true, unique: true },
  plant_name: String,
  plant_location: String,
  plant_add: String
});

module.exports = mongoose.model('plant_codes', plantSchema);

