/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!************************!*\
  !*** ./src/welcome.js ***!
  \************************/
// welcome.js

// Credits to https://www.w3schools.com/js/js_cookies.asp for helping with cookie code

document.addEventListener("DOMContentLoaded", function () {
  var nameForm = document.getElementById("nameForm");
  var nameInput = document.getElementById("nameInput");

  // Handle form submission
  nameForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent default form submission behavior
    submitForm();
  });

  // Handle enter key press
  nameInput.addEventListener("keypress", function (event) {
    document.getElementById("name-taken").style.visibility = "hidden"; // Removes name-taken message when typing
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent default form submission behavior
      submitForm();
    }
  });
  function submitForm() {
    var name = nameInput.value;
    if (name.trim() === "") {
      // Checks if a name has been supplied
      alert("Please enter your name."); // Alerts the user to pick a name
    } else {
      fetch("/create-name", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: name
        })
      }).then(function (response) {
        if (response.ok) {
          createCookie("name", name); // Sets cookie to the name of the user
          if (document.referrer) {
            window.location.href = document.referrer; // If a page sent the user here, it will send the user back to that page
          } else {
            // Otherwise the user is sent to the default page location
            window.location.href = "/";
          }
        } else {
          document.getElementById("name-taken").style.visibility = "visible"; // If response is not ok that means the name is taken
        }
      })["catch"](function (error) {
        console.error("Error:", error);
      });
    }
  }
});
function createCookie(cookieName, cookieValue) {
  var date = new Date();
  // Set expiration date to one month from now
  date.setTime(date.getTime() + 30 * 24 * 60 * 60 * 1000);
  var expires = "expires=" + date.toUTCString();
  document.cookie = cookieName + "=" + cookieValue + ";" + expires + ";path=/";
}
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUcsR0FBRyxHQUFHQyxXQUFXLEdBQUcsR0FBRyxHQUFHSyxPQUFPLEdBQUcsU0FBUztBQUM5RSxDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYXBjc3AtY3JlYXRlLXByb2plY3QtLS1maW5hbC8uL3NyYy93ZWxjb21lLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIHdlbGNvbWUuanNcclxuXHJcbi8vIENyZWRpdHMgdG8gaHR0cHM6Ly93d3cudzNzY2hvb2xzLmNvbS9qcy9qc19jb29raWVzLmFzcCBmb3IgaGVscGluZyB3aXRoIGNvb2tpZSBjb2RlXHJcblxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCBmdW5jdGlvbiAoKSB7XHJcbiAgY29uc3QgbmFtZUZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm5hbWVGb3JtXCIpO1xyXG4gIGNvbnN0IG5hbWVJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibmFtZUlucHV0XCIpO1xyXG5cclxuICAvLyBIYW5kbGUgZm9ybSBzdWJtaXNzaW9uXHJcbiAgbmFtZUZvcm0uYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7IC8vIFByZXZlbnQgZGVmYXVsdCBmb3JtIHN1Ym1pc3Npb24gYmVoYXZpb3JcclxuICAgIHN1Ym1pdEZvcm0oKTtcclxuICB9KTtcclxuXHJcbiAgLy8gSGFuZGxlIGVudGVyIGtleSBwcmVzc1xyXG4gIG5hbWVJbnB1dC5hZGRFdmVudExpc3RlbmVyKFwia2V5cHJlc3NcIiwgZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm5hbWUtdGFrZW5cIikuc3R5bGUudmlzaWJpbGl0eSA9IFwiaGlkZGVuXCI7IC8vIFJlbW92ZXMgbmFtZS10YWtlbiBtZXNzYWdlIHdoZW4gdHlwaW5nXHJcbiAgICBpZiAoZXZlbnQua2V5ID09PSBcIkVudGVyXCIpIHtcclxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTsgLy8gUHJldmVudCBkZWZhdWx0IGZvcm0gc3VibWlzc2lvbiBiZWhhdmlvclxyXG4gICAgICBzdWJtaXRGb3JtKCk7XHJcbiAgICB9XHJcbiAgfSk7XHJcblxyXG4gIGZ1bmN0aW9uIHN1Ym1pdEZvcm0oKSB7XHJcbiAgICBjb25zdCBuYW1lID0gbmFtZUlucHV0LnZhbHVlO1xyXG4gICAgaWYgKG5hbWUudHJpbSgpID09PSBcIlwiKSB7XHJcbiAgICAgIC8vIENoZWNrcyBpZiBhIG5hbWUgaGFzIGJlZW4gc3VwcGxpZWRcclxuICAgICAgYWxlcnQoXCJQbGVhc2UgZW50ZXIgeW91ciBuYW1lLlwiKTsgLy8gQWxlcnRzIHRoZSB1c2VyIHRvIHBpY2sgYSBuYW1lXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBmZXRjaChcIi9jcmVhdGUtbmFtZVwiLCB7XHJcbiAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcclxuICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIixcclxuICAgICAgICB9LFxyXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHsgbmFtZSB9KSxcclxuICAgICAgfSlcclxuICAgICAgICAudGhlbigocmVzcG9uc2UpID0+IHtcclxuICAgICAgICAgIGlmIChyZXNwb25zZS5vaykge1xyXG4gICAgICAgICAgICBjcmVhdGVDb29raWUoXCJuYW1lXCIsIG5hbWUpOyAvLyBTZXRzIGNvb2tpZSB0byB0aGUgbmFtZSBvZiB0aGUgdXNlclxyXG4gICAgICAgICAgICBpZiAoZG9jdW1lbnQucmVmZXJyZXIpIHtcclxuICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGRvY3VtZW50LnJlZmVycmVyOyAvLyBJZiBhIHBhZ2Ugc2VudCB0aGUgdXNlciBoZXJlLCBpdCB3aWxsIHNlbmQgdGhlIHVzZXIgYmFjayB0byB0aGF0IHBhZ2VcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAvLyBPdGhlcndpc2UgdGhlIHVzZXIgaXMgc2VudCB0byB0aGUgZGVmYXVsdCBwYWdlIGxvY2F0aW9uXHJcbiAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBcIi9cIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJuYW1lLXRha2VuXCIpLnN0eWxlLnZpc2liaWxpdHkgPSBcInZpc2libGVcIjsgLy8gSWYgcmVzcG9uc2UgaXMgbm90IG9rIHRoYXQgbWVhbnMgdGhlIG5hbWUgaXMgdGFrZW5cclxuICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcclxuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvcjpcIiwgZXJyb3IpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxufSk7XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVDb29raWUoY29va2llTmFtZSwgY29va2llVmFsdWUpIHtcclxuICBjb25zdCBkYXRlID0gbmV3IERhdGUoKTtcclxuICAvLyBTZXQgZXhwaXJhdGlvbiBkYXRlIHRvIG9uZSBtb250aCBmcm9tIG5vd1xyXG4gIGRhdGUuc2V0VGltZShkYXRlLmdldFRpbWUoKSArIDMwICogMjQgKiA2MCAqIDYwICogMTAwMCk7XHJcbiAgY29uc3QgZXhwaXJlcyA9IFwiZXhwaXJlcz1cIiArIGRhdGUudG9VVENTdHJpbmcoKTtcclxuICBkb2N1bWVudC5jb29raWUgPSBjb29raWVOYW1lICsgXCI9XCIgKyBjb29raWVWYWx1ZSArIFwiO1wiICsgZXhwaXJlcyArIFwiO3BhdGg9L1wiO1xyXG59XHJcbiJdLCJuYW1lcyI6WyJkb2N1bWVudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJuYW1lRm9ybSIsImdldEVsZW1lbnRCeUlkIiwibmFtZUlucHV0IiwiZXZlbnQiLCJwcmV2ZW50RGVmYXVsdCIsInN1Ym1pdEZvcm0iLCJzdHlsZSIsInZpc2liaWxpdHkiLCJrZXkiLCJuYW1lIiwidmFsdWUiLCJ0cmltIiwiYWxlcnQiLCJmZXRjaCIsIm1ldGhvZCIsImhlYWRlcnMiLCJib2R5IiwiSlNPTiIsInN0cmluZ2lmeSIsInRoZW4iLCJyZXNwb25zZSIsIm9rIiwiY3JlYXRlQ29va2llIiwicmVmZXJyZXIiLCJ3aW5kb3ciLCJsb2NhdGlvbiIsImhyZWYiLCJlcnJvciIsImNvbnNvbGUiLCJjb29raWVOYW1lIiwiY29va2llVmFsdWUiLCJkYXRlIiwiRGF0ZSIsInNldFRpbWUiLCJnZXRUaW1lIiwiZXhwaXJlcyIsInRvVVRDU3RyaW5nIiwiY29va2llIl0sInNvdXJjZVJvb3QiOiIifQ==