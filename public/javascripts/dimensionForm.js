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

const savedInspection = JSON.parse(
  document.getElementById("inspection-data").textContent || "{}"
);



let now = new Date();
let currentHours = now.getHours();
function getShiftDate() {
  const now = new Date();
  const hour = now.getHours();

  // If time is before 07:00 AM, use previous day’s date (shift logic)
  if (hour < 7) {
    now.setDate(now.getDate() - 1);
  }

  // Return date in same format as front-end (DD/MM/YYYY)
  const day = String(now.getDate()).padStart(2, '0');
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const year = now.getFullYear();

  return `${day}/${month}/${year}`;
}

// General function to calculate stats
const calculateStats = (selector, minId, maxId, avgId, rangeId) => {
  const inputs = document.querySelectorAll(selector);
  let values = [];

  inputs.forEach(input => {
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
  { selector: '.wtA', minId: '#wtAmin', maxId: '#wtAmax', avgId: '#wtAavg', rangeId: '#wtArange' },
  { selector: '.wtB', minId: '#wtBmin', maxId: '#wtBmax', avgId: '#wtBavg', rangeId: '#wtBrange' },
  { selector: '.wtC', minId: '#wtCmin', maxId: '#wtCmax', avgId: '#wtCavg', rangeId: '#wtCrange' },
  { selector: '.kn', minId: '#knMin', maxId: '#knMax', avgId: '#knAvg', rangeId: '#knRange' },
  { selector: '.ht', minId: '#htMin', maxId: '#htMax', avgId: '#htAvg', rangeId: '#htRange' },
  { selector: '.ttA', minId: '#ttAMin', maxId: '#ttAMax', avgId: '#ttAAvg', rangeId: '#ttARange' },
  { selector: '.tfA', minId: '#tfAMin', maxId: '#tfAMax', avgId: '#tfAAvg', rangeId: '#tfARange' },
  { selector: '.ttB', minId: '#ttBMin', maxId: '#ttBMax', avgId: '#ttBAvg', rangeId: '#ttBRange' },
  { selector: '.tfB', minId: '#tfBMin', maxId: '#tfBMax', avgId: '#tfBAvg', rangeId: '#tfBRange' },
  { selector: '.ttC', minId: '#ttCMin', maxId: '#ttCMax', avgId: '#ttCAvg', rangeId: '#ttCRange' },
  { selector: '.tfC', minId: '#tfCMin', maxId: '#tfCMax', avgId: '#tfCAvg', rangeId: '#tfCRange' },
];
window.onload=function(){
  columns.forEach(col => {
    calculateStats(col.selector, col.minId, col.maxId, col.avgId, col.rangeId);
  })
}
// Add event listeners to all inputs dynamically
columns.forEach(col => {
  const inputs = document.querySelectorAll(col.selector);
  inputs.forEach(input => {
    input.addEventListener('input', () => calculateStats(col.selector, col.minId, col.maxId, col.avgId, col.rangeId));
  });
});



document.getElementById("date").value=getShiftDate()





const batch_number = document.getElementById("batch_number").value;
// const batch_number = document.getElementById("batch_number").textContent.trim();
const date = document.getElementById("date").value;
const mc_no = document.getElementById("mc_no").value;
// const mc_no = document.getElementById("mc_no").value.trim();





window.addEventListener("DOMContentLoaded", () => {
  if (savedInspection) {
    console.log(`This from frontend ${JSON.stringify(savedInspection)}`);
    
    // Example for Shift A
    if (savedInspection.shiftA) {
      
      clA.forEach((cell, i) => {
        cell.value = savedInspection.shiftA.clA[i]; // observations1
      });

      wtA.forEach((cell, i) => {
        cell.value = savedInspection.shiftA.wtA[i]; // observations2
      });
      
      ht.forEach((cell, i) => {
        cell.value = savedInspection.shiftA.ht[i]; // observations3
      });
     
      kn.forEach((cell, i) => {
        cell.value = savedInspection.shiftA.kn[i ]; // observations4
      });
      ttA.forEach((cell, i) => {
        cell.value = savedInspection.shiftA.ttA[i ]; // observations4
      });
      tfA.forEach((cell, i) => {
        cell.value = savedInspection.shiftA.tfA[i ]; // observations4
      });

      document.getElementById("inspector1").value =
        savedInspection.shiftA.inspectedBy;
    }

    if (savedInspection.shiftB) {
      clB.forEach((cell, i) => {
        cell.value = savedInspection.shiftB.clB[i ]; // observations1
      });

      wtB.forEach((cell, i) => {
        cell.value = savedInspection.shiftB.wtB[i ]; // observations2
      });
      ttB.forEach((cell, i) => {
        cell.value = savedInspection.shiftB.ttB[i ]; // observations2
      });
      tfB.forEach((cell, i) => {
        cell.value = savedInspection.shiftB.tfB[i ]; // observations2
      });
      
      
      document.getElementById("inspector1").value =
        savedInspection.shiftA.inspectedBy;
    }

    if (savedInspection.shiftC) {
      clC.forEach((cell, i) => {
        cell.value = savedInspection.shiftC.clC[i ]; // observations1
      });

      wtC.forEach((cell, i) => {
        cell.value = savedInspection.shiftC.wtC[i ]; // observations2
      });
      ttC.forEach((cell, i) => {
        cell.value = savedInspection.shiftC.ttC[i ]; // observations2
      });
      tfC.forEach((cell, i) => {
        cell.value = savedInspection.shiftC.tfC[i ]; // observations2
      });
      
      
      document.getElementById("inspector1").value =
        savedInspection.shiftA.inspectedBy;
    }
  }
});


//Taking data in to a array
let inspection = {
  shiftA: {
    clA: [],
    wtA: [],
    ht: [],
    kn: [],
    ttA: [],
    tfA: [],
    remarksA: "",
    inspectedByA: "",
  },
  shiftB: {
    clB: [],
    wtB: [],
    ttB: [],
    tfB: [],
    remarksB: "",
    inspectedByB: "",
  },
  shiftC: {
    clC: [],
    wtC: [],
    ttC: [],
    tfC: [],
    remarksC: "",
    inspectedByC: "",
  },
  
  verifiedBy: "",
};

async function sendShiftData(shiftName) {
  try {
    inspection.date = date;
    inspection.batch_number = batch_number.textContent;
    inspection.verifiedBy = verifedBy;

    if (currentHours > 7 && currentHours <= 15 && shiftName === "shiftA") {
     
      clA.forEach((cell) => {
        inspection.shiftA.clA.push(cell.value); // Pushing observations
      });
      wtA.forEach((cell) => {
        inspection.shiftA.wtA.push(cell.value);
      });
      ht.forEach((cell) => {
        inspection.shiftA.ht.push(cell.value);
      });
      kn.forEach((cell) => {
        inspection.shiftA.kn.push(cell.value);
      });
      ttA.forEach((cell) => {
        inspection.shiftA.ttA.push(cell.value);
      });
      tfA.forEach((cell) => {
        inspection.shiftA.tfA.push(cell.value);
      });
      let inspector1 = document.getElementById("inspector1").value; //Pushing inspector name
      inspection.shiftA.inspectedBy = inspector1;
    } else if (
      currentHours > 15 &&
      currentHours <= 23 &&
      shiftName === "shiftB"
    ) {
      clA.forEach((cell) => {
        inspection.shiftA.closureNo.push(cell.value); // Pushing observations
      });
      wtA.forEach((cell) => {
        inspection.shiftA.weight.push(cell.value);
      });
      ht.forEach((cell) => {
        inspection.shiftA.height.push(cell.value);
      });
      kn.forEach((cell) => {
        inspection.shiftA.knDia.push(cell.value);
      });
      ttA.forEach((cell) => {
        inspection.shiftA.tt.push(cell.value);
      });
      tfA.forEach((cell) => {
        inspection.shiftA.tf.push(cell.value);
      });
      let inspector1 = document.getElementById("inspector1").value; //Pushing inspector name
      inspection.shiftA.inspectedBy = inspector1;
    } else if (
      (currentHours >= 23 || currentHours < 7) &&
      shiftName === "shiftC"
    ) {
     clA.forEach((cell) => {
        inspection.shiftA.closureNo.push(cell.value); // Pushing observations
      });
      wtA.forEach((cell) => {
        inspection.shiftA.weight.push(cell.value);
      });
      ht.forEach((cell) => {
        inspection.shiftA.height.push(cell.value);
      });
      kn.forEach((cell) => {
        inspection.shiftA.knDia.push(cell.value);
      });
      ttA.forEach((cell) => {
        inspection.shiftA.tt.push(cell.value);
      });
      tfA.forEach((cell) => {
        inspection.shiftA.tf.push(cell.value);
      });
      let inspector1 = document.getElementById("inspector1").value; //Pushing inspector name
      inspection.shiftA.inspectedBy = inspector1;
    } else {
      alert("You are not allowed to make changes here");
    }

    const response = await fetch("/dimension/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        date: document.getElementById("date").value,
        mc_no: mc_no,
        batch_number: document.getElementById("batch_number").value,
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
const activeUser = document.body.dataset.user;

 // Clear all first
    document.getElementById("inspector1").value = "";
    document.getElementById("inspector2").value = "";
    document.getElementById("inspector3").value = "";

    // Set according to shift
    if (currentHours >7 && currentHours <= 15) {
      // 06:00 to 15:59 → shift A
      document.getElementById("inspector1").value = activeUser;
    } else if (currentHours >15&& currentHours <= 23) {
      // 16:00 to 23:59 → shift B
      document.getElementById("inspector2").value = activeUser;
    } else {
      // 00:00 to 06:59 → shift C
      document.getElementById("inspector3").value = activeUser;
    }
