const express = require("express");
const mongoose = require("mongoose");
const customer_gst = require("../models/customerSC");
const { isLoggedIn } = require("./auth");

const router = express.Router();

// ✅ GET route: render design form
router.get("/new", isLoggedIn,(req, res) => {
  res.render("add/add_customer");
});

// ✅ POST route: save design
router.post("/new", isLoggedIn, async (req, res) => {
  try {
    const newCustomer = new customer_gst({
      ...req.body,
    });
    let customer_name = newCustomer.customer_name;
    await newCustomer.save();
    res.render("success/addCustomerSuccess", { customer_name });
  } catch (err) {
    console.error("Error creating batch:", err);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
