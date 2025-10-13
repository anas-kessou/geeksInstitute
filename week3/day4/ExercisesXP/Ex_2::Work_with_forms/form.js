// 1. Retrieve and log the form
const form = document.querySelector("form");
console.log("Form element:", form);

// 2. Retrieve the inputs by their ID
const fnameInput = document.getElementById("fname");
const lnameInput = document.getElementById("lname");
console.log("First name input (by ID):", fnameInput);
console.log("Last name input (by ID):", lnameInput);

// 3. Retrieve the inputs by their name attribute
const firstNameByName = document.getElementsByName("firstname")[0];
const lastNameByName = document.getElementsByName("lastname")[0];
console.log("First name input (by name):", firstNameByName);
console.log("Last name input (by name):", lastNameByName);

// 4. Add submit event listener to the form
form.addEventListener("submit", function(event) {
  event.preventDefault(); // Prevents the page from refreshing on submit

  // Get input values
  const firstName = fnameInput.value.trim();
  const lastName = lnameInput.value.trim();

  // Check if fields are not empty
  if (firstName === "" || lastName === "") {
    alert("Please fill in both first and last name.");
    return;
  }

  // Get the <ul>
  const ul = document.querySelector(".usersAnswer");

  // Clear previous results (optional)
  ul.innerHTML = "";

  // Create <li> for each value and append
  const li1 = document.createElement("li");
  li1.textContent = firstName;
  ul.appendChild(li1);

  const li2 = document.createElement("li");
  li2.textContent = lastName;
  ul.appendChild(li2);

  // Optionally clear the input fields
  form.reset();
});
