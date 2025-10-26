

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
let shiftName1 = document.getElementById("shiftA").value
let shiftName2 = document.getElementById("shiftB").value
let shiftName3 = document.getElementById("shiftC").value



// function getShiftDate() {
//   const now = new Date();
//   const hour = now.getHours();

//   // If time is before 07:00 AM, use previous day’s date (shift logic)
//   if (hour < 7) {
//     now.setDate(now.getDate() - 1);
//   }

//   // Return date in same format as front-end (DD/MM/YYYY)
//   const day = String(now.getDate()).padStart(2, '0');
//   const month = String(now.getMonth() + 1).padStart(2, '0');
//   const year = now.getFullYear();

//   return `${day}-${month}-${year}`;
// }
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









const batch_number = document.getElementById("batch_number").value;
// const batch_number = document.getElementById("batch_number").textContent.trim();
const date = document.getElementById("date").value;
const mc_no = document.getElementById("mc_no").value;
// const mc_no = document.getElementById("mc_no").value.trim();





window.addEventListener("DOMContentLoaded", () => {
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
  
  console.log(savedInspection);
  
  if (savedInspection) {
    document.getElementById("date").value=savedInspection.date||"";
    
    
    // Example for Shift A
    if (savedInspection.data1) {
      
      clA.forEach((cell, i) => {
        cell.value = savedInspection.data1.clA[i] || ""; // observations1
      });

      wtA.forEach((cell, i) => {
        cell.value = savedInspection.data1.wtA[i]|| ""; // observations2
      });
      
      ht.forEach((cell, i) => {
        cell.value = savedInspection.data1.ht[i]|| ""; // observations3
      });
     
      kn.forEach((cell, i) => {
        cell.value = savedInspection.data1.kn[i ]|| ""; // observations4
      });
      ttA.forEach((cell, i) => {
        cell.value = savedInspection.data1.ttA[i ]|| ""; // observations4
      });
      tfA.forEach((cell, i) => {
        cell.value = savedInspection.data1.tfA[i ]|| ""; // observations4
      });

      document.getElementById("inspector1").value =
        savedInspection.data1.inspectedBy|| "";
    }

    if (savedInspection.data2) {
      clB.forEach((cell, i) => {
        cell.value = savedInspection.data2.clB[i ]|| ""; // observations1
      });

      wtB.forEach((cell, i) => {
        cell.value = savedInspection.data2.wtB[i ]|| ""; // observations2
      });
      ttB.forEach((cell, i) => {
        cell.value = savedInspection.data2.ttB[i ]|| ""; // observations2
      });
      tfB.forEach((cell, i) => {
        cell.value = savedInspection.data2.tfB[i ]|| ""; // observations2
      });
      
      
      document.getElementById("inspector1").value =
        savedInspection.data2.inspectedBy || "";
    }

    if (savedInspection.data3) {
      clC.forEach((cell, i) => {
        cell.value = savedInspection.data3.clC[i ]|| ""; // observations1
      });

      wtC.forEach((cell, i) => {
        cell.value = savedInspection.data3.wtC[i ]|| ""; // observations2
      });
      ttC.forEach((cell, i) => {
        cell.value = savedInspection.data3.ttC[i ]|| ""; // observations2
      });
      tfC.forEach((cell, i) => {
        cell.value = savedInspection.data3.tfC[i ]|| ""; // observations2
      });
      
      
      document.getElementById("inspector1").value =
        savedInspection.data3.inspectedBy|| "";
    }
  } else{
    console.log("Data not loaded now");
    
  }
});


// window.addEventListener("DOMContentLoaded", () => {
//   let savedInspection = {};

//   // ✅ Step 1: Safely parse embedded JSON
//   try {
//     const el = document.getElementById("inspection-data");
//     if (el && el.textContent.trim()) {
//       savedInspection = JSON.parse(el.textContent);
//       console.log("✅ Loaded inspection data:", savedInspection);
//     } else {
//       console.warn("⚠️ No inspection data found in script tag.");
//     }
//   } catch (err) {
//     console.error("❌ Error parsing inspection JSON:", err);
//     savedInspection = {};
//   }

//   // ✅ Step 2: Make sure data exists
//   if (!savedInspection || Object.keys(savedInspection).length === 0) {
//     console.warn("⚠️ No saved inspection data available.");
//     return;
//   }

//   // ✅ Step 3: Fill data for Shift A
//   if (savedInspection.data1) {
//     clA.forEach((cell, i) => (cell.value = savedInspection.data1.clA?.[i] || ""));
//     wtA.forEach((cell, i) => (cell.value = savedInspection.data1.wtA?.[i] || ""));
//     ht.forEach((cell, i) => (cell.value = savedInspection.data1.ht?.[i] || ""));
//     kn.forEach((cell, i) => (cell.value = savedInspection.data1.kn?.[i] || ""));
//     ttA.forEach((cell, i) => (cell.value = savedInspection.data1.ttA?.[i] || ""));
//     tfA.forEach((cell, i) => (cell.value = savedInspection.data1.tfA?.[i] || ""));

//     document.getElementById("inspector1").value =
//       savedInspection.data1.inspectedBy || "";
//   }

//   // ✅ Step 4: Fill data for Shift B
//   if (savedInspection.data2) {
//     clB.forEach((cell, i) => (cell.value = savedInspection.data2.clB?.[i] || ""));
//     wtB.forEach((cell, i) => (cell.value = savedInspection.data2.wtB?.[i] || ""));
//     ttB.forEach((cell, i) => (cell.value = savedInspection.data2.ttB?.[i] || ""));
//     tfB.forEach((cell, i) => (cell.value = savedInspection.data2.tfB?.[i] || ""));

//     document.getElementById("inspector2").value =
//       savedInspection.data2.inspectedBy || "";
//   }

//   // ✅ Step 5: Fill data for Shift C
//   if (savedInspection.data3) {
//     clC.forEach((cell, i) => (cell.value = savedInspection.data3.clC?.[i] || ""));
//     wtC.forEach((cell, i) => (cell.value = savedInspection.data3.wtC?.[i] || ""));
//     ttC.forEach((cell, i) => (cell.value = savedInspection.data3.ttC?.[i] || ""));
//     tfC.forEach((cell, i) => (cell.value = savedInspection.data3.tfC?.[i] || ""));

//     document.getElementById("inspector3").value =
//       savedInspection.data3.inspectedBy || "";
//   }

//   console.log("✅ Data applied successfully!");
// });


//Taking data in to a array
let inspection = {
  data1: {
    shift:"",
    clA: [],
    wtA: [],
    ht: [],
    kn: [],
    ttA: [],
    tfA: [],
    remarksA: "",
    inspectedBy: "",
  },
  data2: {
    shift:"",
    clB: [],
    wtB: [],
    ttB: [],
    tfB: [],
    remarksB: "",
    inspectedBy: "",
  },
  data3: {
    shift:"",
    clC: [],
    wtC: [],
    ttC: [],
    tfC: [],
    remarksC: "",
    inspectedBy: "",
  },
  
  verifiedBy: "",
};

async function sendShiftData(shiftName) {
  try {
    inspection.date = date;
    inspection.batch_number = batch_number.textContent;
    inspection.verifiedBy = verifedBy;

    if (shiftName === "data1") {
     
      clA.forEach((cell) => {
        inspection.data1.clA.push(cell.value); // Pushing observations
      });
      wtA.forEach((cell) => {
        inspection.data1.wtA.push(cell.value);
      });
      ht.forEach((cell) => {
        inspection.data1.ht.push(cell.value);
      });
      kn.forEach((cell) => {
        inspection.data1.kn.push(cell.value);
      });
      ttA.forEach((cell) => {
        inspection.data1.ttA.push(cell.value);
      });
      tfA.forEach((cell) => {
        inspection.data1.tfA.push(cell.value);
      });
      inspection.data1.shift=shiftName1;
      let inspector1 = document.getElementById("inspector1").value; //Pushing inspector name
      inspection.data1.inspectedBy = inspector1;

    } else if (shiftName === "data2") {
      clB.forEach((cell) => {
        inspection.data2.clB.push(cell.value); // Pushing observations
      });
      wtB.forEach((cell) => {
        inspection.data2.wtB.push(cell.value);
      });
      ttB.forEach((cell) => {
        inspection.data2.ttB.push(cell.value);
      });
      tfB.forEach((cell) => {
        inspection.data2.tfB.push(cell.value);
      });
      inspection.data2.shift=shiftName2;
      let inspector2 = document.getElementById("inspector2").value; //Pushing inspector name
      inspection.data2.inspectedBy = inspector2;
    } else if (shiftName === "data3") {
     clC.forEach((cell) => {
        inspection.data3.clC.push(cell.value); // Pushing observations
      });
      wtC.forEach((cell) => {
        inspection.data3.wtC.push(cell.value);
      });
      ttC.forEach((cell) => {
        inspection.data3.ttC.push(cell.value);
      });
      tfC.forEach((cell) => {
        inspection.data3.tfC.push(cell.value);
      });
      inspection.data3.shift=shiftName3;
      let inspector3 = document.getElementById("inspector3").value; //Pushing inspector name
      inspection.data3.inspectedBy = inspector3;
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
    alert(`Data saved successfully!`);
  } catch (err) {
    console.error("Error saving shift data:", err);
  }
}
// const activeUser = document.body.dataset.user;

//  // Clear all first
//     document.getElementById("inspector1").value = "";
//     document.getElementById("inspector2").value = "";
//     document.getElementById("inspector3").value = "";

//     // // Set according to shift
//     // if (currentHours >7 && currentHours <= 15) {
//     //   // 06:00 to 15:59 → shift A
//     //   document.getElementById("inspector1").value = activeUser;
//     // } else if (currentHours >15&& currentHours <= 23) {
//     //   // 16:00 to 23:59 → shift B
//     //   document.getElementById("inspector2").value = activeUser;
//     // } else {
//     //   // 00:00 to 06:59 → shift C
//     //   document.getElementById("inspector3").value = activeUser;
//     // }
