const express = require("express");
const router = express.Router();
const batchSC = require("../../models/batchSC"); // adjust path if needed

// GET /api/mbcodes
router.get("/", async (req, res) => {
  try {
    // fetch only the design field from all documents
    const codes = await batchSC.find({}, "batch_number -_id");

    // convert to array of strings
    const batchList = codes.map(c => c.batch_number);

    res.json(batchList);
    
  } catch (err) {
    console.error("Error fetching logo:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
