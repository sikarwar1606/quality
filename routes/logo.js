const express = require("express");
const router = express.Router();
const logoDetailsSC = require("../models/logoSC"); // adjust path if needed

// GET /api/mbcodes
router.get("/", async (req, res) => {
  try {
    // fetch only the design field from all documents
    const codes = await logoDetailsSC.find({}, "logo -_id");

    // convert to array of strings
    const codeList = codes.map(c => c.logo);

    res.json(codeList);
  } catch (err) {
    console.error("Error fetching logo:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
