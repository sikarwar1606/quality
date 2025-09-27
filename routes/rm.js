const express = require("express");
const router = express.Router();
const rmDetailsSC = require("../models/rmDetailsSC"); // adjust path if needed

// GET /api/mbcodes
router.get("/", async (req, res) => {
  try {
    // fetch only the design field from all documents
    const codes = await rmDetailsSC.find({}, "rm -_id");

    // convert to array of strings
    const codeList = codes.map(c => c.rm);

    res.json(codeList);
  } catch (err) {
    console.error("Error fetching Resin:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
