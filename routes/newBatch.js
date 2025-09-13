const express = require("express");
const mongoose = require("mongoose");
const batch_details = require("../models/batchSC");

const router = express.Router();

// ✅ Connect to MongoDB only if not already connected
if (mongoose.connection.readyState === 0) {
  mongoose.connect(
    "mongodb+srv://sikarwar1606:Bu5F9ylZFLFL9ob6@cluster0.epjwokb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));
}

const getNewBatchNo = async () => {
  const lastBatch = await batch_details
    .findOne()
    .sort({ batch_number: -1 })
    .lean();

  const data = lastBatch ? String(lastBatch.batch_number) : null;
  const date = new Date();

  const cYear = String(date.getFullYear()).slice(-2);
  const cMonth = String(date.getMonth() + 1).padStart(2, "0");

  let batch_number;

  if (data) {
    const oYear = data.slice(0, 2);
    const oMonth = data.slice(2, 4);
    const oSerial = data.slice(4);

    if (cYear === oYear && cMonth === oMonth) {
      // same year + same month → increment serial
      const newSerial = String(parseInt(oSerial) + 1).padStart(3, "0");
      batch_number = `${cYear}${cMonth}${newSerial}`;
    } else {
      // same year but new month → reset serial
      const newSerial = String(parseInt(oSerial) + 1).padStart(3, "0");
      batch_number = `${cYear}${cMonth}${newSerial}`;
    }
  } else {
    // first batch ever or new year → reset serial
    batch_number = `${cYear}${cMonth}001`;
  }

  return batch_number;
};

// ✅ GET route: render batch form
router.get("/new", (req, res) => {
  res.render("add/add_batch");
});
let showBatch;
// ✅ POST route: save batch
router.post("/new", async (req, res) => {
  try {
    const batch_number = await getNewBatchNo();
    // showBatch = batch_number

    const newBatchData = new batch_details({
      ...req.body,
      batch_number,
    });

    await newBatchData.save();
    res.render("addBatchSuccess",{batch_number});
  } catch (err) {
    console.error("Error creating batch:", err);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
