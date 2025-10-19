var express = require("express");
var router = express.Router();
const { isLoggedIn } = require("./auth");
const users = require("../models/users");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const Batch = require("../models/batchSC");
const mbDetails = require("../models/mbDetailsSC");

// Passport config
passport.use(
  new LocalStrategy({ usernameField: "user_id" }, users.authenticate())
);

const machineList = [
  "CCM-01", "CCM-02", "CCM-03", "CCM-04", "CCM-06","CCM-07 / CCM-08",
  "CCM-09 / CCM-10", "CCM-12",
  "CCM-14", "CCM-15", "CCM-16", "CCM-17"
];

/* ======================
   GET HOME PAGE
   ====================== */
router.get("/", isLoggedIn, async function (req, res, next) {
  try {
    let latestBatches = [];

    // Run all lookups in parallel for speed
    await Promise.all(
      machineList.map(async (mc) => {
        // const regex = new RegExp(mc); // match CCM-09 even if stored as CCM-09/10/11
        const regex = new RegExp(`(^|\\s*/\\s*)${mc}(\\s*/\\s*|$)`, "i");

        const result = await Batch.aggregate([
          { $match: { mc_no: regex } },
          { $sort: { batch_number: -1 } },
          {
            $group: {
              _id: "$mc_no",
              batch_number: { $first: "$batch_number" },
              date: { $first: "$date" },
              shift: { $first: "$shift" },
              design: { $first: "$design" },
              debossed: { $first: "$debossed" },
              mb_code: { $first: "$mb_code" },
            },
          },
          {
            $lookup: {
              from: "mb_details", // MongoDB collection name
              localField: "mb_code",
              foreignField: "mb_code",
              as: "mb_detail",
            },
          },
          {
            $unwind: {
              path: "$mb_detail",
              preserveNullAndEmptyArrays: true,
            },
          },
          {
            $addFields: {
              colour: "$mb_detail.mb_colour",
            },
          },
          { $limit: 1 },
        ]);

        if (result.length > 0) {
          latestBatches.push({
            mc_no: mc, // ensure it's the exact machine name
            ...result[0],
          });
        }
      })
    );

    // Create EJS lookup map
    const dataMap = {};
    latestBatches.forEach((b) => {
      dataMap[b.mc_no] = b;
    });

    // Get latest batch number overall
    const latestBatchNo = await Batch.findOne().sort({ batch_number: -1 }).exec();

    res.render("home", { machineList, dataMap, latestBatches, latestBatchNo });
  } catch (err) {
    console.error("Error fetching latest batches:", err);
    res.status(500).send("Server error");
  }
});

/* ======================
   AUTH ROUTES
   ====================== */
router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/register", function (req, res) {
  const userdata = new users({
    username: req.body.username,
    user_designation: req.body.user_designation,
    user_id: req.body.user_id,
    role: req.body.role,
    department: req.body.department,
  });

  users.register(userdata, req.body.password).then(function () {
    passport.authenticate("local")(req, res, function () {
      res.redirect("/login");
    });
  });
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
  })
);

router.get("/logout", (req, res, next) => {
  req.logout(function (err) {
    if (err) return next(err);
    res.redirect("/login");
  });
});

/* ======================
   COA ROUTE
   ====================== */
router.get("/coa/coa", isLoggedIn, function (req, res) {
  res.render("coa/coa");
});
router.get("/coa/coaInt", isLoggedIn, function (req, res) {
  res.render("coa/coaInt");
});

module.exports = router;
