const express = require("express");
const router = express.Router();
const DesignDetailsSC = require("../../models/specsSC"); // adjust path if needed

// GET /api/mbcodes
router.get("/", async (req, res) => {
  try {
    // fetch only the design field from all documents
    const codes = await DesignDetailsSC.find({}, "design -_id");

    // convert to array of strings
    const codeList = codes.map(c => c.design);

    res.json(codeList);
  } catch (err) {
    console.error("Error fetching Design:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
