// === Defect Lists ===
const ccmDefects = [
  "Physical Appearance", "Dirty Closures/Oil Mark", "Colour Varialtion", "Odour",
  "Black Spot", "Flow Mark", "Logo Flash", "Logo Damage", "Knurling Damage",
  "Water Leakage", "Buldging", "Pull-up mark position", "Outer Flash",
  "Stripper Flash", "TE Band Flash", "TE Band Shortfill", "Oval Shape",
  "Thread Shear", "Bore Plug Flash", "Inner Core Flash", "Inner Core Damage"
];

const sfmDefects = [
  "Bore Plug Damage", "Pin Mark", "Step Cut", "Ring Cut", "Bridge Missing",
  "Brocken Bridge", "Burr", "Double Bridge", "Knurling Damage",
  "Slitting Mark", "Unfolding"
];

// === DOM Elements ===
const ccmDefectTable = document.getElementById("CCMdefectTable").querySelector("tbody");

// === Build CCM Defects Table ===
for (let row = 0; row < ccmDefects.length; row++) {
  const tr = document.createElement("tr");

  // Defect name column
  const td = document.createElement("td");
  td.textContent = ccmDefects[row];
  td.classList.add("defectName");
  td.colSpan = 3;
  tr.appendChild(td);

  // Shifts A, B, C
  for (let shift = 0; shift < 3; shift++) {
    for (let inpc = 0; inpc < 4; inpc++) {
      const inp = document.createElement("td");
      inp.classList.add("obdefect", `col${inpc}${shift}`);
      inp.id = `shift${shift + 1}_row${row}_col${inpc}`;
      inp.onclick = () => toggleSign(inp);
      tr.appendChild(inp);
    }

    // Remarks column
    const remarks = document.createElement("td");
    remarks.colSpan = 3;
    remarks.classList.add("remarks");
    remarks.id = `remarks_shift${shift + 1}_row${row}`;
    const input = document.createElement("input");
    input.type = "text";
    input.name = `remarks_shift${shift + 1}_row${row}`;
    input.classList.add("remarksInput");
    remarks.appendChild(input);
    tr.appendChild(remarks);
  }

  ccmDefectTable.appendChild(tr);
}

// === Build SFM Defects Table ===
for (let row = 0; row < sfmDefects.length; row++) {
  const tr = document.createElement("tr");

  const td = document.createElement("td");
  td.textContent = sfmDefects[row];
  td.colSpan = 3;
  tr.appendChild(td);

  for (let shift = 0; shift < 3; shift++) {
    for (let inpc = 0; inpc < 4; inpc++) {
      const inp = document.createElement("td");
      inp.classList.add("obdefect", `col${inpc}${shift}`);
      inp.id = `shift${shift + 1}_row${row}_col${inpc}`;
      inp.onclick = () => toggleSign(inp);
      tr.appendChild(inp);
    }

    const remarks = document.createElement("td");
    remarks.colSpan = 3;
    remarks.id = `remarks_shift${shift + 1}_row${row}`;
    const input = document.createElement("input");
    input.type = "text";
    input.name = `remarks_shift${shift + 1}_row${row}`;
    input.classList.add("remarksInput");
    remarks.appendChild(input);
    tr.appendChild(remarks);
  }

  ccmDefectTable.appendChild(tr);
}

// === TE Band Performance ===
const TEband = document.createElement("td");
TEband.textContent = "TE Band Performance";
TEband.rowSpan = 13;
TEband.colSpan = 2;
TEband.classList.add("tebandper");
ccmDefectTable.appendChild(TEband);

for (let row = 0; row < 12; row++) {
  const tr = document.createElement("tr");

  const td = document.createElement("td");
  td.textContent = `Tl.${row + 1}`;
  tr.appendChild(td);

  for (let shift = 0; shift < 3; shift++) {
    for (let inpc = 0; inpc < 4; inpc++) {
      const inp = document.createElement("td");
      inp.classList.add("obdefect", `col${inpc}${shift}tl`);
      inp.id = `shift${shift + 1}_row${row}_col${inpc}tl${inpc}`;
      inp.onclick = () => toggleSign(inp);
      tr.appendChild(inp);
    }

    const remarks = document.createElement("td");
    remarks.colSpan = 3;
    const input = document.createElement("input");
    input.type = "text";
    input.name = `remarks_shift${shift + 1}_row${row}`;
    input.classList.add("remarksInput");
    remarks.appendChild(input);
    tr.appendChild(remarks);
  }

  ccmDefectTable.appendChild(tr);
}

console.log(ccmDefectTable);


// === Toggle defect sign ===
function toggleSign(cell) {
  if (cell.textContent === "✖") {
    cell.textContent = "✔";
    cell.classList.add("defect-found");
  } else if (cell.textContent === "✔") {
    cell.textContent = "✖";
    cell.classList.remove("defect-found");
  } else {
    cell.textContent = "✖"; // default
  }
}

function collectShiftData(shiftNo) {
  const shift = {
    observation1: [], observation2: [], observation3: [], observation4: [],
    remarks: "", inspectedBy: ""
  };

  // Collect CCM defects
  ccmDefects.forEach((defectName, row) => {
    for (let col = 0; col < 4; col++) {
      const cell = document.getElementById(`shift${shiftNo}_row${row}_col${col}`);
      if (cell && cell.textContent === "✔") {
        shift[`observation${col + 1}`].push(defectName);
      }
    }

    const remarkCell = document.querySelector(`#remarks_shift${shiftNo}_row${row} input`);
    if (remarkCell) shift.remarks += `${defectName}: ${remarkCell.value} | `;
  });



  // Collect SFM defects
  sfmDefects.forEach((defectName, row) => {
    const rowIndex = row + ccmDefects.length; // offset for SFM rows
    for (let col = 0; col < 4; col++) {
      const cell = document.getElementById(`shift${shiftNo}_row${rowIndex}_col${col}`);
      if (cell && cell.textContent === "✔") {
        shift[`observation${col + 1}`].push(defectName);
      }
    }

    const remarkCell = document.querySelector(`#remarks_shift${shiftNo}_row${rowIndex} input`);
    if (remarkCell) shift.remarks += `${defectName}: ${remarkCell.value} | `;
  });

  return shift;
}

let shiftData = collectShiftData()
console.log(shiftData);


function collectReportData() {
  return {
    date: new Date(),
    design: document.getElementById("design").value,
    batch_no: document.getElementById("batch_no").value,
    mc_no: document.getElementById("mc_no").value,
    colour: document.getElementById("colour").value,
    logo: document.getElementById("debossed").value,
    shifts: {
      ShiftA: collectShiftData(1),
      ShiftB: collectShiftData(2),
      ShiftC: collectShiftData(3)
    }
  };
}

let anu = collectReportData()
console.log(anu);


// === Time input filling logic ===
const inputs = Array.from({ length: 12 }, (_, i) => document.getElementById(`t${i + 1}`));

inputs.forEach((input, index) => {
  input.addEventListener("input", () => {
    const cols = [
      document.querySelectorAll(".col00"),
      document.querySelectorAll(".col10"),
      document.querySelectorAll(".col20"),
      document.querySelectorAll(".col30"),
      document.querySelectorAll(".col01"),
      document.querySelectorAll(".col11"),
      document.querySelectorAll(".col21"),
      document.querySelectorAll(".col31"),
      document.querySelectorAll(".col02"),
      document.querySelectorAll(".col12"),
      document.querySelectorAll(".col22"),
      document.querySelectorAll(".col32"),
    ];

    const TEBandcols = [
      document.querySelectorAll(".col00tl"),
      document.querySelectorAll(".col10tl"),
      document.querySelectorAll(".col20tl"),
      document.querySelectorAll(".col30tl"),
      document.querySelectorAll(".col01tl"),
      document.querySelectorAll(".col11tl"),
      document.querySelectorAll(".col21tl"),
      document.querySelectorAll(".col31tl"),
      document.querySelectorAll(".col02tl"),
      document.querySelectorAll(".col12tl"),
      document.querySelectorAll(".col22tl"),
      document.querySelectorAll(".col32tl"),
    ];

    cols[index].forEach(cell => cell.textContent = "✖");
    TEBandcols[index].forEach(cell => cell.textContent = "✔");
  });
});

// === Form submission ===
document.getElementById("visualForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const reportData = collectReportData();
  console.log(reportData);
  

  try {
    const res = await fetch("/visual/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reportData)
    });

    if (!res.ok) throw new Error("Failed to save report");

    const data = await res.json();
    console.log("Saved report:", data);
    alert("Report saved successfully!");
  } catch (err) {
    console.error(err);
    alert("Error saving report: " + err.message);
  }
});
