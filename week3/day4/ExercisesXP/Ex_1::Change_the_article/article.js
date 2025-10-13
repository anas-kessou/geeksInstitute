// 1. Retrieve and log the <h1>
const h1 = document.querySelector("h1");
console.log(h1);

// 2. Remove the last paragraph in the article
const article = document.querySelector("article");
const lastParagraph = article.lastElementChild;
article.removeChild(lastParagraph);

// 3. Change background color of <h2> to red when clicked
const h2 = document.querySelector("h2");
h2.addEventListener("click", () => {
  h2.style.backgroundColor = "red";
});

// 4. Hide <h3> when clicked
const h3 = document.querySelector("h3");
h3.addEventListener("click", () => {
  h3.style.display = "none";
});

// 5. Make all paragraphs bold when button is clicked
const boldButton = document.getElementById("bold-btn");
const paragraphs = document.querySelectorAll("article p");

boldButton.addEventListener("click", () => {
  paragraphs.forEach(p => {
    p.style.fontWeight = "bold";
  });
});

// BONUS 1: Random font size for <h1> on hover
h1.addEventListener("mouseover", () => {
  const randomSize = Math.floor(Math.random() * 101); // 0 to 100 px
  h1.style.fontSize = `${randomSize}px`;
});

// BONUS 2: Fade out the 2nd paragraph on hover
if (paragraphs[1]) {
  paragraphs[1].addEventListener("mouseover", () => {
    paragraphs[1].classList.add("fade-out");
  });
}
