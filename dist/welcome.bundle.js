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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUcsR0FBRyxHQUFHQyxXQUFXLEdBQUcsR0FBRyxHQUFHSyxPQUFPLEdBQUcsU0FBUztBQUM5RSxDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYXBjc3AtY3JlYXRlLXByb2plY3QtLS1maW5hbC8uL3NyYy93ZWxjb21lLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIHdlbGNvbWUuanNcblxuLy8gQ3JlZGl0cyB0byBodHRwczovL3d3dy53M3NjaG9vbHMuY29tL2pzL2pzX2Nvb2tpZXMuYXNwIGZvciBoZWxwaW5nIHdpdGggY29va2llIGNvZGVcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgZnVuY3Rpb24gKCkge1xuICBjb25zdCBuYW1lRm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibmFtZUZvcm1cIik7XG4gIGNvbnN0IG5hbWVJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibmFtZUlucHV0XCIpO1xuXG4gIC8vIEhhbmRsZSBmb3JtIHN1Ym1pc3Npb25cbiAgbmFtZUZvcm0uYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpOyAvLyBQcmV2ZW50IGRlZmF1bHQgZm9ybSBzdWJtaXNzaW9uIGJlaGF2aW9yXG4gICAgc3VibWl0Rm9ybSgpO1xuICB9KTtcblxuICAvLyBIYW5kbGUgZW50ZXIga2V5IHByZXNzXG4gIG5hbWVJbnB1dC5hZGRFdmVudExpc3RlbmVyKFwia2V5cHJlc3NcIiwgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJuYW1lLXRha2VuXCIpLnN0eWxlLnZpc2liaWxpdHkgPSBcImhpZGRlblwiOyAvLyBSZW1vdmVzIG5hbWUtdGFrZW4gbWVzc2FnZSB3aGVuIHR5cGluZ1xuICAgIGlmIChldmVudC5rZXkgPT09IFwiRW50ZXJcIikge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTsgLy8gUHJldmVudCBkZWZhdWx0IGZvcm0gc3VibWlzc2lvbiBiZWhhdmlvclxuICAgICAgc3VibWl0Rm9ybSgpO1xuICAgIH1cbiAgfSk7XG5cbiAgZnVuY3Rpb24gc3VibWl0Rm9ybSgpIHtcbiAgICBjb25zdCBuYW1lID0gbmFtZUlucHV0LnZhbHVlO1xuICAgIGlmIChuYW1lLnRyaW0oKSA9PT0gXCJcIikge1xuICAgICAgLy8gQ2hlY2tzIGlmIGEgbmFtZSBoYXMgYmVlbiBzdXBwbGllZFxuICAgICAgYWxlcnQoXCJQbGVhc2UgZW50ZXIgeW91ciBuYW1lLlwiKTsgLy8gQWxlcnRzIHRoZSB1c2VyIHRvIHBpY2sgYSBuYW1lXG4gICAgfSBlbHNlIHtcbiAgICAgIGZldGNoKFwiL2NyZWF0ZS1uYW1lXCIsIHtcbiAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgICAgICB9LFxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7IG5hbWUgfSksXG4gICAgICB9KVxuICAgICAgICAudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICBpZiAocmVzcG9uc2Uub2spIHtcbiAgICAgICAgICAgIGNyZWF0ZUNvb2tpZShcIm5hbWVcIiwgbmFtZSk7IC8vIFNldHMgY29va2llIHRvIHRoZSBuYW1lIG9mIHRoZSB1c2VyXG4gICAgICAgICAgICBpZiAoZG9jdW1lbnQucmVmZXJyZXIpIHtcbiAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBkb2N1bWVudC5yZWZlcnJlcjsgLy8gSWYgYSBwYWdlIHNlbnQgdGhlIHVzZXIgaGVyZSwgaXQgd2lsbCBzZW5kIHRoZSB1c2VyIGJhY2sgdG8gdGhhdCBwYWdlXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAvLyBPdGhlcndpc2UgdGhlIHVzZXIgaXMgc2VudCB0byB0aGUgZGVmYXVsdCBwYWdlIGxvY2F0aW9uXG4gICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gXCIvXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibmFtZS10YWtlblwiKS5zdHlsZS52aXNpYmlsaXR5ID0gXCJ2aXNpYmxlXCI7IC8vIElmIHJlc3BvbnNlIGlzIG5vdCBvayB0aGF0IG1lYW5zIHRoZSBuYW1lIGlzIHRha2VuXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcihcIkVycm9yOlwiLCBlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgfVxufSk7XG5cbmZ1bmN0aW9uIGNyZWF0ZUNvb2tpZShjb29raWVOYW1lLCBjb29raWVWYWx1ZSkge1xuICBjb25zdCBkYXRlID0gbmV3IERhdGUoKTtcbiAgLy8gU2V0IGV4cGlyYXRpb24gZGF0ZSB0byBvbmUgbW9udGggZnJvbSBub3dcbiAgZGF0ZS5zZXRUaW1lKGRhdGUuZ2V0VGltZSgpICsgMzAgKiAyNCAqIDYwICogNjAgKiAxMDAwKTtcbiAgY29uc3QgZXhwaXJlcyA9IFwiZXhwaXJlcz1cIiArIGRhdGUudG9VVENTdHJpbmcoKTtcbiAgZG9jdW1lbnQuY29va2llID0gY29va2llTmFtZSArIFwiPVwiICsgY29va2llVmFsdWUgKyBcIjtcIiArIGV4cGlyZXMgKyBcIjtwYXRoPS9cIjtcbn1cbiJdLCJuYW1lcyI6WyJkb2N1bWVudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJuYW1lRm9ybSIsImdldEVsZW1lbnRCeUlkIiwibmFtZUlucHV0IiwiZXZlbnQiLCJwcmV2ZW50RGVmYXVsdCIsInN1Ym1pdEZvcm0iLCJzdHlsZSIsInZpc2liaWxpdHkiLCJrZXkiLCJuYW1lIiwidmFsdWUiLCJ0cmltIiwiYWxlcnQiLCJmZXRjaCIsIm1ldGhvZCIsImhlYWRlcnMiLCJib2R5IiwiSlNPTiIsInN0cmluZ2lmeSIsInRoZW4iLCJyZXNwb25zZSIsIm9rIiwiY3JlYXRlQ29va2llIiwicmVmZXJyZXIiLCJ3aW5kb3ciLCJsb2NhdGlvbiIsImhyZWYiLCJlcnJvciIsImNvbnNvbGUiLCJjb29raWVOYW1lIiwiY29va2llVmFsdWUiLCJkYXRlIiwiRGF0ZSIsInNldFRpbWUiLCJnZXRUaW1lIiwiZXhwaXJlcyIsInRvVVRDU3RyaW5nIiwiY29va2llIl0sInNvdXJjZVJvb3QiOiIifQ==