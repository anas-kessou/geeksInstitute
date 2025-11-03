
// 1. Change the id from "navBar" to "socialNetworkNavigation"
const navBarDiv = document.getElementById("navBar");
navBarDiv.setAttribute("id", "socialNetworkNavigation");

// 2. Add a new <li> with the text "Logout"
const ul = document.querySelector("#socialNetworkNavigation ul");

const newLi = document.createElement("li");
const logoutText = document.createTextNode("Logout");
newLi.appendChild(logoutText);
ul.appendChild(newLi);

// 3. Retrieve and display the first and last <li> texts
const firstLiText = ul.firstElementChild.textContent;
const lastLiText = ul.lastElementChild.textContent;

console.log("First <li> text:", firstLiText);
console.log("Last <li> text:", lastLiText);
