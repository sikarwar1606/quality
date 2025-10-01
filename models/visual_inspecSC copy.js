// const mongoose = require("mongoose");

// const obserSc = new mongoose.Schema({
//   defectName:['odour', 'flash', 'ring cut'],
//   observation1: ["✓","✓","✓","✓","✓","✓","✓",],
//   observation2: [String],
//   observation3: [String],
//   observation4: [String],
//   remarks: { type: Map, of: String },
//   inspectedBy: { type: String }
// });

// const visualReportSc = new mongoose.Schema({
//   date: { type: Date, required: true },        
//   design: { type: String, required: true },    
//   batch_no: { type: String, required: true },  
//   mc_no: { type: String, required: true },     
//   colour: { type: String, required: true },    
//   logo: { type: String, required: true },      
  
//   shifts: {
//     ShiftA: obserSc,
//     ShiftB: obserSc,
//     ShiftC: obserSc
//   }
// });

// const VisualReport = mongoose.model("visual_report", visualReportSc);



// module.exports = VisualReport;


const mongoose = require("mongoose");

const inspectionSchema = new mongoose.Schema({
  time: { type: String, required: true }, // e.g. "07:10"
  observations: {
    type: Map,
    of: String, 
    // Example: { "Odour": "✓", "Flash": "X", "Ring Cut": "✓", "TL1.1": "✓" }
    required: true
  },
  remarks: { type: String },
  inspectedBy: { type: String }
});

const shiftSchema = new mongoose.Schema({
  inspections: [inspectionSchema] // up to 4 per shift
});

const visualReportSchema = new mongoose.Schema({
  date: { type: Date, required: true },        
  design: { type: String, required: true },    
  batch_no: { type: String, required: true },  
  mc_no: { type: String, required: true },     
  colour: { type: String, required: true },    
  logo: { type: String, required: true },      

  shifts: {
    ShiftA: shiftSchema,
    ShiftB: shiftSchema,
    ShiftC: shiftSchema
  }
});

const VisualReport = mongoose.model("VisualReport", visualReportSchema);

module.exports = VisualReport;
