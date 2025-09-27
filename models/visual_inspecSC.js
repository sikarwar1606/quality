const mongoose = require("mongoose");

const obserSc = new mongoose.Schema({
  observation1: [String],
  observation2: [String],
  observation3: [String],
  observation4: [String],
  remarks: { type: String },
  inspectedBy: { type: String }
});

const visualReportSc = new mongoose.Schema({
  date: { type: Date, required: true },        
  design: { type: String, required: true },    
  batch_no: { type: String, required: true },  
  mc_no: { type: String, required: true },     
  colour: { type: String, required: true },    
  logo: { type: String, required: true },      
  
  shifts: {
    ShiftA: obserSc,
    ShiftB: obserSc,
    ShiftC: obserSc
  }
});

const VisualReport = mongoose.model("visual_report", visualReportSc);

// ✅ Correct way to insert
async function insertSample() {
  const data1 = await VisualReport.create({
    date: new Date("2025-01-09"),
    design: "S1881CSD001",
    batch_no: "2301001",
    mc_no: "CCM15",
    colour: "Blue",
    logo: "Coca cola",
    shifts: {
      ShiftA: {
        observation1: ["A","X","X","X","X"],
        observation2: ["X","A","X","X","X"],
        observation3: ["X","X","X","X","X"],
        observation4: ["X","X","X","X","X"],
        remarks: "",
        inspectedBy: "Jagan"
      }
    }
  });

  // console.log("Inserted Data:", data1);
}
VisualReport.find({ batch_no: "2301001", date: new Date('2025-01-01') })
  .then(docs => {
    docs.forEach(doc => {
      // console.log("ShiftA Observation1:", doc.shifts.ShiftA);
    });
  })
  .catch(err => console.error(err));


// insertSample()

module.exports = VisualReport;
