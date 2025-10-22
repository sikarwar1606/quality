const mongoose = require("mongoose");

const data1Schema = new mongoose.Schema({
  shift:{type:String, default:""},
  clA: { type: [String], default: [] },
  wtA: { type: [String], default: [] },
  ht: { type: [String], default: [] },
  kn: { type: [String], default: [] },
  ttA: { type: [String], default: [] },
  tfA: { type: [String], default: [] },
  remarksA: { type: [String], default: "" },
  inspectedByA: { type: String, default: "" }
});
const data2Schema = new mongoose.Schema({
  shift:{type:String, default:""},
  clB: { type: [String], default: [] },
  wtB: { type: [String], default: [] },
  ttB: { type: [String], default: [] },
  tfB: { type: [String], default: [] },
  remarksB: { type: [String], default: "" },
  inspectedByB: { type: String, default: "" }
});
const data3Schema = new mongoose.Schema({
  shift:{type:String, default:""},
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

  data1: { type: data1Schema, default: () => ({}) },
  data2: { type: data2Schema, default: () => ({}) },
  data3: { type: data3Schema, default: () => ({}) },

  verifiedBy: { type: String, default: "" }
});

// Model
const dimension = mongoose.model("dimensions", inspectionSchema);

module.exports = dimension;

