const mongoose = require("mongoose");

const cokeApprovedMbSchema = new mongoose.Schema({
  mb_colour: String,
  mb_code: String,
  mb_percent: String,
  issued_by: String,
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("cokeApprovedMb", cokeApprovedMbSchema);
