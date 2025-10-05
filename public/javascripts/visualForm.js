let now = new Date();
let currentHours = now.getHours();
console.log(currentHours);

function getShiftDate() {
  const now = new Date();
  const hour = now.getHours();

  if (hour < 7) {
    now.setDate(now.getDate() - 1);
  }

  const day = String(now.getDate()).padStart(2, "0");
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const year = now.getFullYear();

  return `${year}-${month}-${day}`; // YYYY-MM-DD local time
}

document.getElementById("date").value = getShiftDate();

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

const batch_number = document.getElementById("batch_number").textContent.trim();
const date = document.getElementById("date").value;
const mc_no = document.getElementById("mc_no").textContent.trim();

const ccmDefectTable = document
  .getElementById("CCMdefectTable")
  .querySelector("tbody");

// Build CCM Defects
for (let row = 0; row < ccmDefects.length; row++) {
  let tr = document.createElement("tr");

  // Defect name column (colspan=3 to align with header)
  let td = document.createElement("td");
  td.textContent = ccmDefects[row];
  td.colSpan = 3;
  tr.appendChild(td);

  // For each shift (A, B, C)
  for (let shift = 0; shift < 3; shift++) {
    // 4 toggle cells
    for (let inpc = 0; inpc < 4; inpc++) {
      let inp = document.createElement("td");
      //   inp.textContent = "✖";
      inp.classList.add("obdefect");
      inp.classList.add(`def${inpc}${shift}`);
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
    remarks.classList.add(`remarksCol${shift}`);
    remarks.id = `remarks_shift${shift + 1}_row${row}`;
    remarks.textContent = "";
    tr.appendChild(remarks);
  }

  ccmDefectTable.appendChild(tr);
}

for (let row = 0; row < toolNo.length; row++) {
  let tr = document.createElement("tr");

  // Tool name column (colspan=3 to align with header)
  let td = document.createElement("td");
  td.textContent = `Tool No.${row + 1}`;
  td.colSpan = 3;
  tr.appendChild(td);

  // For each shift (A, B, C)
  for (let shift = 0; shift < 3; shift++) {
    // 4 toggle cells
    for (let inpc = 0; inpc < 4; inpc++) {
      let tl = document.createElement("td");
      //   inp.textContent = "✖";
      tl.classList.add("obdefect");
      tl.classList.add(`tl${inpc}${shift}`);
      tl.classList.add(`col${inpc}${shift}`);
      tl.id = `shift${shift + 1}_row${row}_col${inpc}`;
      tl.onclick = function () {
        toggleSigntl(this);
      };
      tr.appendChild(tl);
    }

    // Remarks column (colspan=3 to match header)
    let remarks = document.createElement("td");
    remarks.colSpan = 3;
    remarks.contentEditable = true; // allow user to type
    remarks.classList.add(`remarksCol${shift}`);
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
  } else {
    cell.textContent = "✖";
    cell.classList.remove("defect-found");
  }
}
// === Toggle defect signs ===
function toggleSigntl(cell) {
  if (cell.textContent === "✔") {
    cell.textContent = "✖";
    cell.classList.add("defect-found");
  } else {
    cell.textContent = "✔";
    cell.classList.remove("defect-found");
  }
}

window.addEventListener("DOMContentLoaded", () => {
  if (savedInspection) {
    // Example for Shift A
    if (savedInspection.shiftA) {
      inputs[1].value = savedInspection.shiftA.observation1[0] || " "; // time
      def00.forEach((cell, i) => {
        cell.textContent = savedInspection.shiftA.observation1[i + 1]; // observations1
      });
      tl00.forEach((cell, i) => {
        cell.textContent = savedInspection.shiftA.observation1[i + 33]; // tool data1
      });

      inputs[2].value = savedInspection.shiftA.observation2[0] || " "; // time2
      def10.forEach((cell, i) => {
        cell.textContent = savedInspection.shiftA.observation2[i + 1]; // observations2
      });
      tl10.forEach((cell, i) => {
        cell.textContent = savedInspection.shiftA.observation2[i + 33]; // tool data2
      });
      inputs[3].value = savedInspection.shiftA.observation3[0] || " "; // time3
      def20.forEach((cell, i) => {
        cell.textContent = savedInspection.shiftA.observation3[i + 1]; // observations3
      });
      tl20.forEach((cell, i) => {
        cell.textContent = savedInspection.shiftA.observation3[i + 33]; // tool data3
      });
      inputs[4].value = savedInspection.shiftA.observation4[0] || " "; // time4
      def30.forEach((cell, i) => {
        cell.textContent = savedInspection.shiftA.observation4[i + 1]; // observations4
      });
      tl30.forEach((cell, i) => {
        cell.textContent = savedInspection.shiftA.observation4[i + 33]; // tool data4
      });
      remarksCol0.forEach((cell, i) => {
        cell.textContent = savedInspection.shiftA.remarks[i];
      });
      document.getElementById("inspector1").value =
        savedInspection.shiftA.inspectedBy;
    }

    if (savedInspection.shiftB) {
      inputs[5].value = savedInspection.shiftB.observation1[0] || " "; // time
      def01.forEach((cell, i) => {
        cell.textContent = savedInspection.shiftB.observation1[i + 1]; // observations1
      });
      tl01.forEach((cell, i) => {
        cell.textContent = savedInspection.shiftB.observation1[i + 33]; // tool data1
      });

      inputs[6].value = savedInspection.shiftB.observation2[0] || " "; // time2
      def11.forEach((cell, i) => {
        cell.textContent = savedInspection.shiftB.observation2[i + 1]; // observations2
      });
      tl11.forEach((cell, i) => {
        cell.textContent = savedInspection.shiftB.observation2[i + 33]; // tool data2
      });
      inputs[7].value = savedInspection.shiftB.observation3[0] || " "; // time3
      def21.forEach((cell, i) => {
        cell.textContent = savedInspection.shiftB.observation3[i + 1]; // observations3
      });
      tl21.forEach((cell, i) => {
        cell.textContent = savedInspection.shiftB.observation3[i + 33]; // tool data3
      });
      inputs[8].value = savedInspection.shiftB.observation4[0] || " "; // time4
      def31.forEach((cell, i) => {
        cell.textContent = savedInspection.shiftB.observation4[i + 1]; // observations4
      });
      tl31.forEach((cell, i) => {
        cell.textContent = savedInspection.shiftB.observation4[i + 33]; // tool data4
      });
      remarksCol1.forEach((cell, i) => {
        cell.textContent = savedInspection.shiftB.remarks[i];
      });
      document.getElementById("inspector2").value =
        savedInspection.shiftB.inspectedBy;
    }

    if (savedInspection.shiftC) {
      inputs[9].value = savedInspection.shiftC.observation1[0] || " "; // time
      def02.forEach((cell, i) => {
        cell.textContent = savedInspection.shiftC.observation1[i + 1]; // observations1
      });
      tl02.forEach((cell, i) => {
        cell.textContent = savedInspection.shiftC.observation1[i + 33]; // tool data1
      });

      inputs[10].value = savedInspection.shiftC.observation2[0] || " "; // time2
      def12.forEach((cell, i) => {
        cell.textContent = savedInspection.shiftC.observation2[i + 1]; // observations2
      });
      tl12.forEach((cell, i) => {
        cell.textContent = savedInspection.shiftC.observation2[i + 33]; // tool data2
      });
      inputs[11].value = savedInspection.shiftC.observation3[0] || " "; // time3
      def22.forEach((cell, i) => {
        cell.textContent = savedInspection.shiftC.observation3[i + 1]; // observations3
      });
      tl22.forEach((cell, i) => {
        cell.textContent = savedInspection.shiftC.observation3[i + 33]; // tool data3
      });
      inputs[12].value = savedInspection.shiftC.observation4[0] || " "; // time4
      def32.forEach((cell, i) => {
        cell.textContent = savedInspection.shiftC.observation4[i + 1]; // observations4
      });
      tl32.forEach((cell, i) => {
        cell.textContent = savedInspection.shiftC.observation4[i + 33]; // tool data4
      });
      remarksCol2.forEach((cell, i) => {
        cell.textContent = savedInspection.shiftC.remarks[i];
      });
      document.getElementById("inspector3").value =
        savedInspection.shiftC.inspectedBy;
    }
  }
});
let inputs = [];
for (let i = 0; i <= 12; i++) {
  inputs.push(document.getElementById(`t${i}`));
}

let def00 = document.querySelectorAll(".def00");
let def10 = document.querySelectorAll(".def10");
let def20 = document.querySelectorAll(".def20");
let def30 = document.querySelectorAll(".def30");
let def01 = document.querySelectorAll(".def01");
let def11 = document.querySelectorAll(".def11");
let def21 = document.querySelectorAll(".def21");
let def31 = document.querySelectorAll(".def31");
let def02 = document.querySelectorAll(".def02");
let def12 = document.querySelectorAll(".def12");
let def22 = document.querySelectorAll(".def22");
let def32 = document.querySelectorAll(".def32");

let tl00 = document.querySelectorAll(".tl00");
let tl10 = document.querySelectorAll(".tl10");
let tl20 = document.querySelectorAll(".tl20");
let tl30 = document.querySelectorAll(".tl30");
let tl01 = document.querySelectorAll(".tl01");
let tl11 = document.querySelectorAll(".tl11");
let tl21 = document.querySelectorAll(".tl21");
let tl31 = document.querySelectorAll(".tl31");
let tl02 = document.querySelectorAll(".tl02");
let tl12 = document.querySelectorAll(".tl12");
let tl22 = document.querySelectorAll(".tl22");
let tl32 = document.querySelectorAll(".tl32");

let remarksCol0 = document.querySelectorAll(".remarksCol0");
let remarksCol1 = document.querySelectorAll(".remarksCol1");
let remarksCol2 = document.querySelectorAll(".remarksCol2");

let defs = [
  def00,
  def10,
  def20,
  def30,
  def01,
  def11,
  def21,
  def31,
  def02,
  def12,
  def22,
  def32,
];

defs.forEach((def, i) => {
  def.forEach((cell) => {
    inputs[i + 1].addEventListener("input", () => {
      cell.textContent = "✖";
    });
  });
});

let tls = [
  tl00,
  tl10,
  tl20,
  tl30,
  tl01,
  tl11,
  tl21,
  tl31,
  tl02,
  tl12,
  tl22,
  tl32,
];
tls.forEach((tl, i) => {
  tl.forEach((cell) => {
    inputs[i + 1].addEventListener("input", () => {
      cell.textContent = "✔";
    });
  });
});

//Taking data in to a array
let inspection = {
  shiftA: {
    observation1: [],
    observation2: [],
    observation3: [],
    observation4: [],
    remarks: [],
    inspectedBy: "",
  },
  shiftB: {
    observation1: [],
    observation2: [],
    observation3: [],
    observation4: [],
    remarks: [],
    inspectedBy: "",
  },
  shiftC: {
    observation1: [],
    observation2: [],
    observation3: [],
    observation4: [],
    remarks: [],
    inspectedBy: "",
  },
  verifiedBy: "",
};

async function sendShiftData(shiftName) {
  try {
    inspection.date = date;
    inspection.batch_number = batch_number.textContent;
    inspection.verifiedBy = verifedBy;

    if (currentHours > 7 && currentHours <= 15 && shiftName === "shiftA") {
      inspection.shiftC.observation1 = [inputs[1].value]; 
      inspection.shiftC.observation2 = [inputs[2].value];
      inspection.shiftC.observation3 = [inputs[3].value];
      inspection.shiftC.observation4 = [inputs[4].value];

      def00.forEach((cell) => {
        inspection.shiftA.observation1.push(cell.textContent); // Pushing observations
      });
      def10.forEach((cell) => {
        inspection.shiftA.observation2.push(cell.textContent);
      });
      def20.forEach((cell) => {
        inspection.shiftA.observation3.push(cell.textContent);
      });
      def30.forEach((cell) => {
        inspection.shiftA.observation4.push(cell.textContent);
      });

      tl00.forEach((cell) => {
        inspection.shiftA.observation1.push(cell.textContent); // Pushing observations
      });
      tl10.forEach((cell) => {
        inspection.shiftA.observation2.push(cell.textContent);
      });
      tl20.forEach((cell) => {
        inspection.shiftA.observation3.push(cell.textContent);
      });
      tl30.forEach((cell) => {
        inspection.shiftA.observation4.push(cell.textContent);
      });

      remarksCol0.forEach((cell, index) => {
        inspection.shiftA.remarks[index] = cell.textContent; // Pushing Remarks
      });
      let inspector1 = document.getElementById("inspector1").value; //Pushing inspector name
      inspection.shiftA.inspectedBy = inspector1;
    } else if (
      currentHours > 15 &&
      currentHours <= 23 &&
      shiftName === "shiftB"
    ) {
      inspection.shiftB.observation1 = [inputs[5].value];
      inspection.shiftB.observation2 = [inputs[6].value];
      inspection.shiftB.observation3 = [inputs[7].value];
      inspection.shiftB.observation4 = [inputs[8].value];

      def01.forEach((cell) => {
        inspection.shiftB.observation1.push(cell.textContent); // Pushing observations
      });
      def11.forEach((cell) => {
        inspection.shiftB.observation2.push(cell.textContent);
      });
      def21.forEach((cell) => {
        inspection.shiftB.observation3.push(cell.textContent);
      });
      def31.forEach((cell) => {
        inspection.shiftB.observation4.push(cell.textContent);
      });

      tl01.forEach((cell) => {
        inspection.shiftB.observation1.push(cell.textContent); // Pushing observations
      });
      tl11.forEach((cell) => {
        inspection.shiftB.observation2.push(cell.textContent);
      });
      tl21.forEach((cell) => {
        inspection.shiftB.observation3.push(cell.textContent);
      });
      tl31.forEach((cell) => {
        inspection.shiftB.observation4.push(cell.textContent);
      });

      remarksCol1.forEach((cell) => {
        inspection.shiftB.remarks.push(cell.textContent); // Pushing Remarks
      });
      let inspector2 = document.getElementById("inspector2").value; //Pushing inspector name
      console.log(inspector2);

      inspection.shiftB.inspectedBy = inspector2;
    } else if (
      (currentHours >= 23 || currentHours < 7) &&
      shiftName === "shiftC"
    ) {
      // for (let obs = 9; obs <= 12; obs++) {
      //   let observation = `observation${obs}`;
      //   inspection.shiftC[observation] = [inputs[obs].value];
      // }

      inspection.shiftC.observation1 = [inputs[9].value]; //Pushing time
      inspection.shiftC.observation2 = [inputs[10].value]; //Pushing time
      inspection.shiftC.observation3 = [inputs[11].value]; //Pushing time
      inspection.shiftC.observation4 = [inputs[12].value]; //Pushing time

      def02.forEach((cell) => {
        inspection.shiftC.observation1.push(cell.textContent); // Pushing observations
      });
      tl02.forEach((cell) => {
        inspection.shiftC.observation1.push(cell.textContent); // Pushing observations
      });

      def12.forEach((cell) => {
        inspection.shiftC.observation2.push(cell.textContent);
      });
      tl12.forEach((cell) => {
        inspection.shiftC.observation2.push(cell.textContent);
      });

      def22.forEach((cell) => {
        inspection.shiftC.observation3.push(cell.textContent);
      });
      tl22.forEach((cell) => {
        inspection.shiftC.observation3.push(cell.textContent);
      });

      def32.forEach((cell) => {
        inspection.shiftC.observation4.push(cell.textContent);
      });
      tl32.forEach((cell) => {
        inspection.shiftC.observation4.push(cell.textContent);
      });

      remarksCol2.forEach((cell) => {
        inspection.shiftC.remarks.push(cell.textContent); // Pushing Remarks
      });
      let inspector3 = document.getElementById("inspector3").value; //Pushing inspector name
      inspection.shiftC.inspectedBy = inspector3;
    } else {
      alert("You are not allowed to make changes here");
    }

    const response = await fetch("/visual/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        date: document.getElementById("date").value,
        mc_no: mc_no,
        batch_number: document.getElementById("batch_number").textContent,
        [shiftName]: inspection[shiftName], // send only selected shift
        verifiedBy: document.getElementById("verifedBy").value,
      }),
    });

    const result = await response.json();
    console.log("Saved:", result);
    alert(`${shiftName} saved successfully!`);
  } catch (err) {
    console.error("Error saving shift data:", err);
  }
}
