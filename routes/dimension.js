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




module.exports = dimension



