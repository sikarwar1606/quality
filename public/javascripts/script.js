const ccmDefects = [
  "Physical Appearance",
  "Dirty Closures/Oil Mark",
  "Colour Varialtion",
  "Odour",
  "Black Spot",
  "Flow Mark",
  "Logo Flash",
  "Logo Damage",
  "Knurling Damage",
  "Water Leakage",
  "Buldging",
  "Pull-up mark position",
  "Outer Flash",
  "Stripper Flash",
  "TE Band Flash",
  "TE Band Shortfill",
  "Oval Shape",
  "Thread Shear",
  "Bore Plug Flash",
  "Inner Core Flash",
  "Inner Core Damage",
];

const sfmDefects = [
  "Bore Plug Damage",
  "Pin Mark",
  "Step Cut",
  "Ring Cut",
  "Bridge Missing",
  "Brocken Bridge",
  "Burr",
  "Double Bridge",
  "Knurling Damage",
  "Slitting Mark",
  "Unfolding",
];
let toolNo = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const ccmDefectTable = document
  .getElementById("CCMdefectTable")
  .querySelector("tbody");

// Build CCM Defects/////////////////////////////////////////////////////////////////////////////////////////////////////////////
for (let row = 0; row < ccmDefects.length; row++) {
  let tr = document.createElement("tr");

  // Defect name column (colspan=3 to align with header)
  let td = document.createElement("td");
  td.textContent = ccmDefects[row];
  td.classList.add("defectName"); //This is to style the column of defect section
  td.colSpan = 3;
  tr.appendChild(td);

  // For each shift (A, B, C)
  for (let shift = 0; shift < 3; shift++) {
    // 4 toggle cells
    for (let inpc = 0; inpc < 4; inpc++) {
      let inp = document.createElement("td");
      //   inp.textContent = "✖";
      inp.classList.add("obdefect");
      inp.classList.add(`col${inpc}${shift}`);
      inp.id = `shift${shift + 1}_row${row}_col${inpc}`;
      inp.onclick = function () {
        toggleSign(this);
      };
      tr.appendChild(inp);
    }

    // Remarks column (colspan=3 to match header)
    let remarks = document.createElement("td");
    remarks.colSpan = 3;
    remarks.contentEditable = true; // allow user to type
    remarks.classList.add("remarks");
    remarks.id = `remarks_shift${shift + 1}_row${row}`;
    let input = document.createElement("input");
    input.type = "text";
    input.name = `remarks_shift${shift + 1}_row${row}`; // important for saving
    input.classList.add("remarksInput");

    remarks.appendChild(input);
    tr.appendChild(remarks);
  }

  ccmDefectTable.appendChild(tr);
}

//Build SFM Defect///////////////////////////////////////////////////////////////////////////////////////////////
for (let row = 0; row < sfmDefects.length; row++) {
  let tr = document.createElement("tr");

  // Defect name column (colspan=3 to align with header)
  let td = document.createElement("td");
  td.textContent = sfmDefects[row];
  td.colSpan = 3;
  tr.appendChild(td);

  // For each shift (A, B, C)
  for (let shift = 0; shift < 3; shift++) {
    // 4 toggle cells
    for (let inpc = 0; inpc < 4; inpc++) {
      let inp = document.createElement("td");
      //   inp.textContent = "✖";
      inp.classList.add("obdefect");
      inp.classList.add(`col${inpc}${shift}`);
      inp.id = `shift${shift + 1}_row${row}_col${inpc}`;
      inp.onclick = function () {
        toggleSign(this);
      };
      tr.appendChild(inp);
    }

    // Remarks column (colspan=3 to match header)
    let remarks = document.createElement("td");
    remarks.colSpan = 3;
    remarks.contentEditable = true; // allow user to type
    remarks.id = `remarks_shift${shift + 1}_row${row}`;
    remarks.textContent = "";
    tr.appendChild(remarks);
  }

  ccmDefectTable.appendChild(tr);
}

/////////////////////////////////////////////////////////////////////////////////////////////////////

//Create Column fo TE Band Performace
let TEband = document.createElement("td");
TEband.textContent = "TE Band Performance";
TEband.rowSpan = 13;
TEband.colSpan = 2;
TEband.classList = "tebandper";
ccmDefectTable.appendChild(TEband);
for (let row = 0; row < 12; row++) {
  let tr = document.createElement("tr");
  // Defect name column (colspan=3 to align with header)
  let td = document.createElement("td");
  td.textContent = `Tl.${row + 1}`;
  tr.appendChild(td);

  // For each shift (A, B, C)
  for (let shift = 0; shift < 3; shift++) {
    // 4 toggle cells
    for (let inpc = 0; inpc < 4; inpc++) {
      let inp = document.createElement("td");
      //   inp.textContent = "✖";
      inp.classList.add("obdefect");
      inp.classList.add(`col${inpc}${shift}tl`);
      inp.id = `shift${shift + 1}_row${row}_col${inpc}tl${inpc}`;
      inp.onclick = function () {
        toggleSign(this);
      };
      tr.appendChild(inp);
    }

    // Remarks column (colspan=3 to match header)
    let remarks = document.createElement("td");
    remarks.colSpan = 3;
    remarks.contentEditable = true; // allow user to type
    remarks.id = `remarks_shift${shift + 1}_row${row}`;
    remarks.textContent = "";
    tr.appendChild(remarks);
  }

  ccmDefectTable.appendChild(tr);
}

// === Toggle defect signs ===
function toggleSign(cell) {
  if (cell.textContent === "✖") {
    cell.textContent = "✔";
    cell.classList.add("defect-found");
  } else if (cell.textContent === "✔") {
    cell.textContent = "✖";
    cell.classList.remove("defect-found");
  } else {
    alert("Nothing to change");
    return; // stop here
  }
}

// Collect all inputs in an array (t1...t12)
const inputs = Array.from({ length: 12 }, (_, i) =>
  document.getElementById(`t${i + 1}`)
);

// Collect column groups (col00...col32)
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

// Attach event listeners dynamically for visual defects
inputs.forEach((input, index) => {
  input.addEventListener("input", () => {
    cols[index].forEach((cell) => {
      cell.textContent = "✖";
    });
  });
});
// Attach event listeners dynamically for te band performance
inputs.forEach((input, index) => {
  input.addEventListener("input", () => {
    TEBandcols[index].forEach((cell) => {
      cell.textContent = "✔";
    });
  });
});
