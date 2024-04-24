// welcome.js

// Credits to https://www.w3schools.com/js/js_cookies.asp for helping with cookie code

document.addEventListener("DOMContentLoaded", function () {
  const nameForm = document.getElementById("nameForm");
  const nameInput = document.getElementById("nameInput");

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
    const name = nameInput.value;
    if (name.trim() === "") {
      // Checks if a name has been supplied
      alert("Please enter your name."); // Alerts the user to pick a name
    } else {
      fetch("/create-name", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      })
        .then((response) => {
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
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }
});

function createCookie(cookieName, cookieValue) {
  const date = new Date();
  // Set expiration date to one month from now
  date.setTime(date.getTime() + 30 * 24 * 60 * 60 * 1000);
  const expires = "expires=" + date.toUTCString();
  document.cookie = cookieName + "=" + cookieValue + ";" + expires + ";path=/";
}
