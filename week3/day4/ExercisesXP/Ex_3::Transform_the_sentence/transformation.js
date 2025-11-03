// Global variable to store all bold items
let allBoldItems = [];

// Function to collect all <strong> elements
function getBoldItems() {
  allBoldItems = document.querySelectorAll("#sentence strong");
}

// Function to highlight bold text (change to blue)
function highlight() {
  allBoldItems.forEach(item => {
    item.style.color = "blue";
  });
}

// Function to return bold text to default (black)
function returnItemsToDefault() {
  allBoldItems.forEach(item => {
    item.style.color = "black";
  });
}

// Get bold items initially
getBoldItems();

// Add event listeners to the paragraph
const paragraph = document.getElementById("sentence");
paragraph.addEventListener("mouseover", highlight);
paragraph.addEventListener("mouseout", returnItemsToDefault);
