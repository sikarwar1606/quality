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

// Add event listeners to all inputs dynamically
columns.forEach(col => {
  const inputs = document.querySelectorAll(col.selector);
  inputs.forEach(input => {
    input.addEventListener('input', () => calculateStats(col.selector, col.minId, col.maxId, col.avgId, col.rangeId));
  });
});



document.getElementById("date").value=getShiftDate()



const batch_number = document.getElementById("batch_number").textContent.trim();
const date = document.getElementById("date").value;
const mc_no = document.getElementById("mc_no").textContent.trim();





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
      inspection.shiftA.observation1 = [inputs[1].value]; 
      inspection.shiftA.observation2 = [inputs[2].value];
      inspection.shiftA.observation3 = [inputs[3].value];
      inspection.shiftA.observation4 = [inputs[4].value];

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
