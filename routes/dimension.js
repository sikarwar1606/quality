const mongoose = require('mongoose');

// mongoose.connect("mongodb+srv://sikarwar1606:Bu5F9ylZFLFL9ob6@cluster0.epjwokb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")


const clMesSchema = new mongoose.Schema({
  cl_no: { type: Number, required: true },
  wt: { type: Number, required: true },
  ht: { type: Number, required: true },
  knurling: { type: Number, required: true },
  thickness: { type: Number, required: true }
});

const dimensionSchema = new mongoose.Schema({
  batch_number: { type: String, required: true },
  dop: { type: Date, required: true },
  shift: { type: String, required: true },
  data: [clMesSchema] // Array of closure measurements
}, { timestamps: true });

const dimension  = mongoose.model('dimension', dimensionSchema)

// dimension.create({
//   batch_number: "2501001",
//   dop: new Date("2025-08-29"),
//   shift: "A",
//   data: [
//     { cl_no: 1, wt: 2.35, ht: 16.00, knurling: 28.50, thickness: 1.20 },
//     { cl_no: 2, wt: 2.40, ht: 15.90, knurling: 28.55, thickness: 1.22 },
//     { cl_no: 3, wt: 2.38, ht: 16.05, knurling: 28.52, thickness: 1.19 }
//   ]
// })
// .then(() => console.log("Data Saved"))
// .catch(err => console.error(err));



module.exports = dimension



