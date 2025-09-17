const PDFDocument = require("pdfkit");
const fs = require("fs");

function generateBatchReport(batch) {
  // Build dynamic filename
  const fileName = `${batch.invoice_no}_${batch.batch_number}_${batch.design}_${batch.color}.pdf`
    .replace(/\s+/g, "_"); // replace spaces with underscores (safe filename)

  const doc = new PDFDocument({ margin: 50 });

  // Save PDF to dynamic filename
  doc.pipe(fs.createWriteStream(fileName));

  // Title
  doc.fontSize(20).text("Batch Report", { align: "center" });
  doc.moveDown();

  // Batch details
  doc.fontSize(12).text(`Invoice No: ${batch.invoice_no}`);
  doc.text(`Batch Number: ${batch.batch_number}`);
  doc.text(`Machine No: ${batch.mc_no}`);
  doc.text(`Shift: ${batch.shift}`);
  doc.text(`Design: ${batch.design}`);
  doc.text(`Color: ${batch.color}`);
  doc.text(`Issued By: ${batch.issued_by}`);

  doc.end();

  console.log(`✅ Saved: ${fileName}`);
}



generateBatchReport(batchData);
