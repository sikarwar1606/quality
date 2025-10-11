const mongoose = require("mongoose");

const shiftSchema = new mongoose.Schema({
  observation1: { type: [String], default: [] },
  observation2: { type: [String], default: [] },
  observation3: { type: [String], default: [] },
  observation4: { type: [String], default: [] },
  remarks: { type: [String], default: [] },
  inspectedBy: { type: String, default: "" }
});

const inspectionSchema = new mongoose.Schema({
  date: { type: String, required: true },   // save inspection date
  batch_number: { type: String, required: true },
  mc_no: {type:String, required:true},

  shiftA: { type: shiftSchema, default: () => ({}) },
  shiftB: { type: shiftSchema, default: () => ({}) },
  shiftC: { type: shiftSchema, default: () => ({}) },

  verifiedBy: { type: String, default: "" }
});

// Model
const visual_inspection = mongoose.model("visual_inspection", inspectionSchema);

module.exports = visual_inspection;

