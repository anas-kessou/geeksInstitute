// Retrieve the div and log it
const containerDiv = document.getElementById('container');
console.log(containerDiv);

// Change "Pete" to "Richard"
const firstUl = document.querySelectorAll('.list')[0];
firstUl.children[1].textContent = "Richard";

// Delete the second <li> of the second <ul>
const secondUl = document.querySelectorAll('.list')[1];
secondUl.removeChild(secondUl.children[1]); // Removes "Sarah"

// Change the name of the first <li> of each <ul> to your name
const allUls = document.querySelectorAll('.list');
allUls.forEach(ul => {
  ul.firstElementChild.textContent = "YourName"; // Replace with your actual name
});

// Add class "student_list" to both <ul>s
allUls.forEach(ul => {
  ul.classList.add("student_list");
});

// Add classes "university" and "attendance" to the first <ul>
firstUl.classList.add("university", "attendance");

// Add light blue background and padding to the <div>
containerDiv.style.backgroundColor = "lightblue";
containerDiv.style.padding = "20px";

// Hide the <li> containing "Dan"
const allLis = document.querySelectorAll('li');
allLis.forEach(li => {
  if (li.textContent === "Dan") {
    li.style.display = "none";
  }
});

// Add a border to the <li> containing "Richard"
allLis.forEach(li => {
  if (li.textContent === "Richard") {
    li.style.border = "2px solid black";
  }
});

// Change font size of entire body
document.body.style.fontSize = "18px";

// Bonus: If background is light blue, alert "Hello x and y"
if (containerDiv.style.backgroundColor === "lightblue") {
  const firstUlItems = firstUl.querySelectorAll('li');
  const user1 = firstUlItems[0].textContent;
  const user2 = firstUlItems[1].textContent;
  alert(`Hello ${user1} and ${user2}`);
}
