const mongoose = require("mongoose");

const shiftASchema = new mongoose.Schema({
  closureNo: { type: [String], default: [] },
  weight: { type: [String], default: [] },
  height: { type: [String], default: [] },
  knDia: { type: [String], default: [] },
  tt: { type: [String], default: [] },
  tf: { type: [String], default: [] },
  remarks: { type: [String], default: "" },
  inspectedBy: { type: String, default: "" }
});
const shiftSchema = new mongoose.Schema({
  closureNo: { type: [String], default: [] },
  weight: { type: [String], default: [] },
  height: { type: [String], default: [] },
  knDia: { type: [String], default: [] },
  tt: { type: [String], default: [] },
  tf: { type: [String], default: [] },
  remarks: { type: [String], default: "" },
  inspectedBy: { type: String, default: "" }
});


const inspectionSchema = new mongoose.Schema({
  date: { type: Date, required: true },   // save inspection date
  batch_number: { type: String, required: true },
  mc_no: {type:String, required:true},

  shiftA: { type: shiftASchema, default: () => ({}) },
  shiftB: { type: shiftSchema, default: () => ({}) },
  shiftC: { type: shiftSchema, default: () => ({}) },

  verifiedBy: { type: String, default: "" }
});

// Model
const dimension = mongoose.model("dimensions", inspectionSchema);

module.exports = dimension;

