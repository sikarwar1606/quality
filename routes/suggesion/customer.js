const express = require("express");
const router = express.Router();
const customerSC = require("../../models/customerSC"); // adjust path if needed

// GET /api/mbcodes
router.get("/", async (req, res) => {
  try {
    // fetch only the design field from all documents
    const codes = await customerSC.find({}, "gst_number -_id");

    // convert to array of strings
    const customerList = codes.map(c => c.gst_number);

    res.json(customerList);
  } catch (err) {
    console.error("Error fetching logo:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
