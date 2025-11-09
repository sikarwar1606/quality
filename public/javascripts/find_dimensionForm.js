let wtA = document.querySelectorAll(".wtA");
let wtB = document.querySelectorAll(".wtB");
let wtC = document.querySelectorAll(".wtC");
let ttA = document.querySelectorAll(".ttA");
let tfA = document.querySelectorAll(".tfA");
let ttB = document.querySelectorAll(".ttB");
let tfB = document.querySelectorAll(".tfB");
let ttC = document.querySelectorAll(".ttC");
let tfC = document.querySelectorAll(".tfC");
let kn = document.querySelectorAll(".kn");
let ht = document.querySelectorAll(".ht");
let clA = document.querySelectorAll(".clA");
let clB = document.querySelectorAll(".clB");
let clC = document.querySelectorAll(".clC");


function getShiftDate() {
  const now = new Date();
  const hour = now.getHours();

  // If time is before 07:00 AM, use previous day’s date (shift logic)
  if (hour < 7) {
    now.setDate(now.getDate() - 1);
  }

  // Return date in same format as front-end (DD/MM/YYYY)
  const day = String(now.getDate()).padStart(2, "0");
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const year = now.getFullYear();

  return `${day}-${month}-${year}`;
}

const activeUser = document.body.dataset.user;

// Clear all first
document.getElementById("verifedBy").value = activeUser;

// General function to calculate stats
const calculateStats = (selector, minId, maxId, avgId, rangeId) => {
  const inputs = document.querySelectorAll(selector);
  let values = [];

  inputs.forEach((input) => {
    const val = parseFloat(input.value);
    if (!isNaN(val)) values.push(val);
  });

  if (values.length > 0) {
    const min = Math.min(...values);
    const max = Math.max(...values);
    const avg = values.reduce((a, b) => a + b, 0) / values.length;
    const range = max - min;

    if (minId) document.querySelector(minId).textContent = min.toFixed(2);
    if (maxId) document.querySelector(maxId).textContent = max.toFixed(2);
    if (avgId) document.querySelector(avgId).textContent = avg.toFixed(2);
    if (rangeId) document.querySelector(rangeId).textContent = range.toFixed(2);
  } else {
    if (minId) document.querySelector(minId).textContent = " ";
    if (maxId) document.querySelector(maxId).textContent = " ";
    if (avgId) document.querySelector(avgId).textContent = " ";
    if (rangeId) document.querySelector(rangeId).textContent = " ";
  }
};

// Call this function for each column
const columns = [
  {
    selector: ".wtA",
    minId: "#wtAmin",
    maxId: "#wtAmax",
    avgId: "#wtAavg",
    rangeId: "#wtArange",
  },
  {
    selector: ".wtB",
    minId: "#wtBmin",
    maxId: "#wtBmax",
    avgId: "#wtBavg",
    rangeId: "#wtBrange",
  },
  {
    selector: ".wtC",
    minId: "#wtCmin",
    maxId: "#wtCmax",
    avgId: "#wtCavg",
    rangeId: "#wtCrange",
  },
  {
    selector: ".kn",
    minId: "#knMin",
    maxId: "#knMax",
    avgId: "#knAvg",
    rangeId: "#knRange",
  },
  {
    selector: ".ht",
    minId: "#htMin",
    maxId: "#htMax",
    avgId: "#htAvg",
    rangeId: "#htRange",
  },
  {
    selector: ".ttA",
    minId: "#ttAMin",
    maxId: "#ttAMax",
    avgId: "#ttAAvg",
    rangeId: "#ttARange",
  },
  {
    selector: ".tfA",
    minId: "#tfAMin",
    maxId: "#tfAMax",
    avgId: "#tfAAvg",
    rangeId: "#tfARange",
  },
  {
    selector: ".ttB",
    minId: "#ttBMin",
    maxId: "#ttBMax",
    avgId: "#ttBAvg",
    rangeId: "#ttBRange",
  },
  {
    selector: ".tfB",
    minId: "#tfBMin",
    maxId: "#tfBMax",
    avgId: "#tfBAvg",
    rangeId: "#tfBRange",
  },
  {
    selector: ".ttC",
    minId: "#ttCMin",
    maxId: "#ttCMax",
    avgId: "#ttCAvg",
    rangeId: "#ttCRange",
  },
  {
    selector: ".tfC",
    minId: "#tfCMin",
    maxId: "#tfCMax",
    avgId: "#tfCAvg",
    rangeId: "#tfCRange",
  },
];
window.onload = function () {
  columns.forEach((col) => {
    calculateStats(col.selector, col.minId, col.maxId, col.avgId, col.rangeId);
  });
};
// Add event listeners to all inputs dynamically
columns.forEach((col) => {
  const inputs = document.querySelectorAll(col.selector);
  inputs.forEach((input) => {
    input.addEventListener("input", () =>
      calculateStats(col.selector, col.minId, col.maxId, col.avgId, col.rangeId)
    );
  });
});

// document.getElementById("date").value = getShiftDate();

const batch_number = document.getElementById("batch_number").value;
// const batch_number = document.getElementById("batch_number").textContent.trim();
const date = document.getElementById("date").value;
const mc_no = document.getElementById("mc_no").value;
// const mc_no = document.getElementById("mc_no").value.trim();

window.addEventListener("DOMContentLoaded", () => {
  const activeUser = document.body.dataset.user;

  // Helper to safely assign inspector value
  function assignInspector(inspectorId, savedValue) {
    const field = document.getElementById(inspectorId);
    if (field) {
      field.value = savedValue || field.value || activeUser || "";
    }
  }

  let savedInspection = {};

  try {
    const el = document.getElementById("inspection-data");
    if (el && el.textContent.trim()) {
      savedInspection = JSON.parse(el.textContent);
      console.log("Loaded inspection data:", savedInspection);
    }
  } catch (err) {
    console.error("Error parsing inspection JSON:", err);
    savedInspection = {};
  }

  if (savedInspection) {
    assignInspector("verifedBy", savedInspection.verifedBy);
    // if (savedInspection && savedInspection.date === document.getElementById("date").value) {
    // Example for Shift A
    if (savedInspection.data1) {
      document.getElementById("shiftA").value = savedInspection.data1.shift[0];

      clA.forEach((cell, i) => {
        cell.value = savedInspection.data1.clA[i] || ""; // observations1
      });

      wtA.forEach((cell, i) => {
        cell.value = savedInspection.data1.wtA[i] || ""; // observations2
      });

      ht.forEach((cell, i) => {
        cell.value = savedInspection.data1.ht[i] || ""; // observations3
      });

      kn.forEach((cell, i) => {
        cell.value = savedInspection.data1.kn[i] || ""; // observations4
      });
      ttA.forEach((cell, i) => {
        cell.value = savedInspection.data1.ttA[i] || ""; // observations4
      });
      tfA.forEach((cell, i) => {
        cell.value = savedInspection.data1.tfA[i] || ""; // observations4
      });

       document.getElementById("inspector1").value=savedInspection.data1.inspectedByA;
    }

    if (savedInspection.data2) {
      document.getElementById("shiftB").value = savedInspection.data2.shift[0];
      clB.forEach((cell, i) => {
        cell.value = savedInspection.data2.clB[i] || ""; // observations1
      });

      wtB.forEach((cell, i) => {
        cell.value = savedInspection.data2.wtB[i] || ""; // observations2
      });
      ttB.forEach((cell, i) => {
        cell.value = savedInspection.data2.ttB[i] || ""; // observations2
      });
      tfB.forEach((cell, i) => {
        cell.value = savedInspection.data2.tfB[i] || ""; // observations2
      });
      document.getElementById("inspector2").value=savedInspection.data2.inspectedByB;
    }

    if (savedInspection.data3) {
      document.getElementById("shiftC").value = savedInspection.data3.shift[0];
      clC.forEach((cell, i) => {
        cell.value = savedInspection.data3.clC[i] || ""; // observations1
      });

      wtC.forEach((cell, i) => {
        cell.value = savedInspection.data3.wtC[i] || ""; // observations2
      });
      ttC.forEach((cell, i) => {
        cell.value = savedInspection.data3.ttC[i] || ""; // observations2
      });
      tfC.forEach((cell, i) => {
        cell.value = savedInspection.data3.tfC[i] || ""; // observations2
      });

      document.getElementById("inspector3").value=savedInspection.data3.inspectedByC;
    }
  } else {
    console.log("Data not loaded now");
  }
});

//Taking data in to a array
let inspection = {
  data1: {
    shift: "",
    clA: [],
    wtA: [],
    ht: [],
    kn: [],
    ttA: [],
    tfA: [],
    remarksA: "",
  },
  data2: {
    shift: "",
    clB: [],
    wtB: [],
    ttB: [],
    tfB: [],
    remarksB: "",
  },
  data3: {
    shift: "",
    clC: [],
    wtC: [],
    ttC: [],
    tfC: [],
    remarksC: "",
  },

  verifiedBy: "",
};

async function sendShiftData(shiftName) {
  try {
    inspection.date = date;
    inspection.batch_number = batch_number.value; // make sure to use .value

    let shiftInput, dataObj, inspectorInput;

    if (shiftName === "data1") {
      dataObj = inspection.data1;
      shiftInput = document.getElementById("shiftA").value;
      inspectedBy = document.getElementById("inspector1").value;
    } else if (shiftName === "data2") {
      dataObj = inspection.data2;
      shiftInput = document.getElementById("shiftB").value;
      inspectorInput = document.getElementById("inspector2").value;
    } else if (shiftName === "data3") {
      dataObj = inspection.data3;
      shiftInput = document.getElementById("shiftC").value;
      inspectorInput = document.getElementById("inspector3").value;
    } else {
      alert("You are not allowed to make changes here");
      return;
    }

    // Reset arrays before pushing
    dataObj.clA = [];
    dataObj.wtA = [];
    dataObj.ht = [];
    dataObj.kn = [];
    dataObj.ttA = [];
    dataObj.tfA = [];

    // Push values dynamically based on shift
    if (shiftName === "data1") {
      clA.forEach((cell) => dataObj.clA.push(cell.value));
      wtA.forEach((cell) => dataObj.wtA.push(cell.value));
      ht.forEach((cell) => dataObj.ht.push(cell.value));
      kn.forEach((cell) => dataObj.kn.push(cell.value));
      ttA.forEach((cell) => dataObj.ttA.push(cell.value));
      tfA.forEach((cell) => dataObj.tfA.push(cell.value));
    } else if (shiftName === "data2") {
      clB.forEach((cell) => dataObj.clB.push(cell.value));
      wtB.forEach((cell) => dataObj.wtB.push(cell.value));
      ttB.forEach((cell) => dataObj.ttB.push(cell.value));
      tfB.forEach((cell) => dataObj.tfB.push(cell.value));
    } else if (shiftName === "data3") {
      clC.forEach((cell) => dataObj.clC.push(cell.value));
      wtC.forEach((cell) => dataObj.wtC.push(cell.value));
      ttC.forEach((cell) => dataObj.ttC.push(cell.value));
      tfC.forEach((cell) => dataObj.tfC.push(cell.value));
    }

    // Save shift and inspector
    dataObj.shift = shiftInput;
    // dataObj.inspectedBy = inspectorInput;

    const response = await fetch("/dimension/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        date: document.getElementById("date").value,
        mc_no: mc_no,
        verifiedBy:activeUser,
        batch_number: document.getElementById("batch_number").value,
        [shiftName]: dataObj, // send only selected shift
      }),
    });

    const result = await response.json();
    alert("Data saved successfully!");
  } catch (err) {
    console.error("Error saving shift data:", err);
  }
}
