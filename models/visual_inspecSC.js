const mongoose = require("mongoose");

const inspectionSchema = new mongoose.Schema({
  boservation1:String,
  boservation2:String,
  boservation3:String,
  boservation4:String,
  remarks: String,
  inspectedBy: String
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

  obs:shiftSchema
});

const VisualReport = mongoose.model("VisualReport", visualReportSchema);

module.exports = VisualReport;
