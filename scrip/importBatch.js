const mongoose = require('mongoose');
const csv = require("csvtojson");
const Batch = require('../models/batchSC');
const moment = require('moment');
const path = require("path");

// MongoDB Atlas connection
mongoose.connect("mongodb+srv://sikarwar1606:Bu5F9ylZFLFL9ob6@cluster0.epjwokb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");

function parseDate(value) {
    if (!value) return null;

    // Case 1: Excel serial number (e.g., 45915)
    if (!isNaN(value) && Number(value) > 30000) {
        return moment("1899-12-30").add(Number(value), "days").toDate(); 
    }

    // Case 2: Normal dates
    const parsed = moment(value, ["DD/MM/YYYY", "YYYY-MM-DD", "MM-DD-YYYY", "M/D/YYYY"], true);
    return parsed.isValid() ? parsed.toDate() : null;
}

async function importData() {
    try {
        const jsonArray = await csv().fromFile(path.join(__dirname, "batch_details.csv"));
        console.log("📂 CSV Sample (first 3 rows):", jsonArray.slice(0, 3));

        const batchDocs = jsonArray
            .filter(row => row.batch_number && !isNaN(Number(row.batch_number))) // skip bad rows
            .map((row) => ({
                batch_number: Number(row.batch_number),
                date: parseDate(row.date),
                shift: row.shift?.trim() || null,
                design: row.design?.trim() || null,
                debossed: row.debossed?.trim() || null,
                mc_no: row.mc_no?.trim() || null,
                rm: row.rm?.trim() || null,
                mb_code: row.mb_code?.trim() || null,
                mc_speed: row.mc_speed && !isNaN(Number(row.mc_speed)) 
                    ? Number(row.mc_speed) 
                    : null,
                issued_by: row.issued_by?.trim() || null,
            }));

        console.log("📝 Mapped Docs (first 3):", batchDocs.slice(0, 3));

        await Batch.insertMany(batchDocs);
        console.log("✅ Data Imported Successfully!");
        mongoose.connection.close();

    } catch (err) {
        console.error("❌ Error importing data:", err);
        mongoose.connection.close();
    }
}

importData();
