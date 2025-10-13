// Step 1: Create an array of books
const allBooks = [
    {
      title: "The Hobbit",
      author: "J.R.R. Tolkien",
      image: "https://covers.openlibrary.org/b/id/8108691-L.jpg",
      alreadyRead: true
    },
    {
      title: "1984",
      author: "George Orwell",
      image: "https://covers.openlibrary.org/b/id/7222246-L.jpg",
      alreadyRead: false
    }
  ];
  
  // Select the section where books will be rendered
  const section = document.querySelector(".listBooks");
  
  // Loop through each book and render it
  allBooks.forEach(book => {
    // Create a div for the book
    const bookDiv = document.createElement("div");
    bookDiv.style.marginBottom = "20px";
  
    // Create text for title and author
    const text = document.createElement("p");
    text.textContent = `${book.title} written by ${book.author}`;
  
    // If already read, make text red
    if (book.alreadyRead) {
      text.style.color = "red";
    }
  
    // Create image element
    const img = document.createElement("img");
    img.src = book.image;
    img.style.width = "100px";
  
    // Append text and image to book div
    bookDiv.appendChild(text);
    bookDiv.appendChild(img);
  
    // Append book div to section
    section.appendChild(bookDiv);
  });
  