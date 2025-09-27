const express = require("express");
const router = express.Router();
const mbDetailsSC = require("../models/mbDetailsSC"); // adjust path if needed

// GET /api/mbcodes
router.get("/", async (req, res) => {
  try {
    // fetch only the mb_code field from all documents
    const codes = await mbDetailsSC.find({}, "mb_code -_id");

    // convert to array of strings
    const codeList = codes.map(c => c.mb_code);

    res.json(codeList);
  } catch (err) {
    console.error("Error fetching MB codes:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
