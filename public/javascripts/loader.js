// // ✅ Show loader only when clicking elements with class 'loaderReq'
// document.addEventListener("click", function (event) {
//   const target = event.target.closest(".loaderReq");

//   if (!target) return; // if no required class → do nothing

//   // Ignore new tab & javascript-only links
//   if (
//     target.target === "_blank" ||
//     (target.tagName.toLowerCase() === "a" && target.href?.startsWith("javascript:"))
//   ) {
//     return;
//   }

//   // ✅ Show loader just before navigation starts
//   document.getElementById("loader").style.display = "flex";
// });

// // ✅ Hide loader when returning via Back button (bfcache restore)
// window.addEventListener("pageshow", function (event) {
//   if (event.persisted) {
//     document.getElementById("loader").style.display = "none";
//   }
// });

// ✅ Show loader only when clicking elements with class 'loaderReq'
document.addEventListener("click", function (event) {
  const target = event.target.closest(".loaderReq");
  
  if (!target) return;

  const tag = target.tagName.toLowerCase();
  

  // ✅ Ignore if link opening in new tab or javascript link
  if (
    target.target === "_blank" ||
    (tag === "a" && target.href?.startsWith("javascript:"))
  ) {
    return;
  }

  // ✅ If inside a form → validate required inputs
  const form = target.closest("form");
  if (form) {
    if (!form.checkValidity()) {
      form.reportValidity(); // ✅ highlight missing fields
      return; // ❌ stop → do NOT show loader
    }
  }

  // ✅ Show loader only when actual action (submit/navigation) will happen
  document.getElementById("loader").style.display = "flex";
});

// ✅ Hide loader on bfcache restore (back button)
window.addEventListener("pageshow", function (event) {
  if (event.persisted) {
    document.getElementById("loader").style.display = "none";
  }
});
