const express = require("express");
const mongoose = require("mongoose");
const customer_gst = require("../models/customerSC");
const { isLoggedIn } = require("./auth");

const router = express.Router();

// ✅ Connect to MongoDB only if not already connected
// if (mongoose.connection.readyState === 0) {
//   mongoose
//     .connect(
//       "mongodb+srv://sikarwar1606:Bu5F9ylZFLFL9ob6@cluster0.epjwokb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
//       { useNewUrlParser: true, useUnifiedTopology: true }
//     )
//     .then(() => console.log("MongoDB connected"))
//     .catch((err) => console.error("MongoDB connection error:", err));
// }

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
    res.render("addCustomerSuccess", { customer_name });
  } catch (err) {
    console.error("Error creating batch:", err);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
