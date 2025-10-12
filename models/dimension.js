const mongoose = require("mongoose");

const shiftASchema = new mongoose.Schema({
  clA: { type: [String], default: [] },
  wtA: { type: [String], default: [] },
  ht: { type: [String], default: [] },
  kn: { type: [String], default: [] },
  ttA: { type: [String], default: [] },
  tfA: { type: [String], default: [] },
  remarksA: { type: [String], default: "" },
  inspectedByA: { type: String, default: "" }
});
const shiftBSchema = new mongoose.Schema({
  clB: { type: [String], default: [] },
  wtB: { type: [String], default: [] },
  ttB: { type: [String], default: [] },
  tfB: { type: [String], default: [] },
  remarksB: { type: [String], default: "" },
  inspectedByB: { type: String, default: "" }
});
const shiftCSchema = new mongoose.Schema({
  clC: { type: [String], default: [] },
  wtC: { type: [String], default: [] },
  ttC: { type: [String], default: [] },
  tfC: { type: [String], default: [] },
  remarksC: { type: [String], default: "" },
  inspectedByC: { type: String, default: "" }
});


const inspectionSchema = new mongoose.Schema({
  date: { type: String, required: true },   // save inspection date
  batch_number: { type: String, required: true },
  mc_no: {type:String, required:true},

  shiftA: { type: shiftASchema, default: () => ({}) },
  shiftB: { type: shiftBSchema, default: () => ({}) },
  shiftC: { type: shiftCSchema, default: () => ({}) },

  verifiedBy: { type: String, default: "" }
});

// Model
const dimension = mongoose.model("dimensions", inspectionSchema);

module.exports = dimension;

