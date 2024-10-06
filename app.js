// Variables handling 'Add Book' button interactions and modal display
const addBookBtn = document.getElementById("add-book-btn");
const plusIcon = document.querySelector(".plus");
const plusVertical = document.querySelector(".vertical-line");
const plusHorizontal = document.querySelector(".horizontal-line");
const formContainer = document.querySelector(".form-container");
const instructionsContainer = document.querySelector("#instructions-container");
let isRotated = false;

// Displays the book form UI and handles button interaction logic
addBookBtn.addEventListener("click", () => {
  instructionsContainer.style.transform = "translateY(-200px)";

  if (isRotated) {
    formContainer.style.right = "-33.3%";
    console.log("Modal Closed");

    addBookBtn.style.border = "0.9px solid var(--primary-text-color)";
    plusVertical.style.width = "0.9px";
    plusVertical.style.backgroundColor = "var(--primary-text-color)";
    plusHorizontal.style.height = "0.9px";
    plusHorizontal.style.backgroundColor = "var(--primary-text-color)";
    plusIcon.style.transform = "rotate(0deg)";
  } else {
    formContainer.style.right = "0";
    console.log("Modal Opened");

    plusIcon.style.transform = "rotate(45deg)";
    addBookBtn.style.border = "2px solid var(--accent-button-color)";
    plusVertical.style.width = "2.5px";
    plusVertical.style.backgroundColor = "var(--accent-button-color)";
    plusHorizontal.style.height = "2.5px";
    plusHorizontal.style.backgroundColor = "var(--accent-button-color)";
  }
  isRotated = !isRotated;
});

// Library and book classes are used to append new books and update the UI accordingly
class Library {
  constructor(bookAmount = 0, bookList = new Map()) {
    this.bookAmount = bookAmount;
    this.bookList = bookList;
  }

  addBook(book, htmlElement) {
    this.bookList.set(htmlElement, book);
    this.bookList += 1;
  }
}

class Book {
  constructor(title, author, pages, isRead = false) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
  }

  // Creates and returns a book HTML element
  displayBook(library) {
    const bookElement = document.createElement("div");
    bookElement.classList.add("book-grid__book");
    setTimeout(() => {
      bookElement.style.animation = "none";
    }, 500);
    

    const bookInfoDiv = document.createElement("div");
    bookInfoDiv.classList.add("book-grid__info");
    bookElement.appendChild(bookInfoDiv);

    const bookTitle = document.createElement("span");
    bookTitle.innerText = this.title;
    bookTitle.classList.add("book-grid__title");
    bookInfoDiv.appendChild(bookTitle);

    const bookPages = document.createElement("span");
    bookPages.innerText = this.pages;
    bookPages.classList.add("book-grid__pages");
    bookInfoDiv.appendChild(bookPages);

    const bookAuthor = document.createElement("span");
    bookAuthor.innerText = this.author;
    bookAuthor.classList.add("book-grid__author");
    bookInfoDiv.appendChild(bookAuthor);

    const upperHr = document.createElement("hr");
    bookElement.appendChild(upperHr);

    const bookActions = document.createElement("div");
    bookActions.classList.add("book-grid__actions");
    bookElement.appendChild(bookActions);

    const status = document.createElement("span");
    status.classList.add("book-grid__status");

    const statusBtn = document.createElement("button");
    statusBtn.classList.add("book-grid__button");
    statusBtn.classList.add("book-grid__button--status");
    if (this.isRead) {
      status.innerText = "Complete";
      statusBtn.innerText = "Read";
    } else {
      status.innerText = "In progress";
      statusBtn.innerText = "Not Read";
    }

    statusBtn.addEventListener("click", (event) => {
      this.updateStatus(status, event);
      console.log(this.isRead);
    });
    bookActions.appendChild(statusBtn);

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("book-grid__button");
    deleteBtn.classList.add("book-grid__button--delete");
    deleteBtn.addEventListener("click", () => {
      bookElement.style.animation = "book-fade-out 0.5s ease-out forwards";
      setTimeout(() => {
        bookElement.remove();
        library.delete(bookElement);
      }, 500);
      
    });
    deleteBtn.innerText = "Delete";
    bookActions.appendChild(deleteBtn);

    const lowerHr = upperHr.cloneNode(false);
    bookElement.appendChild(lowerHr);

    bookElement.appendChild(status);

    return bookElement;
  }

  updateStatus(statusSpan, event) {
    if (this.isRead) {
      this.isRead = !this.isRead;
      statusSpan.innerText = "In progress";

      event.target.innerText = "Not Read";
    } else {
      this.isRead = !this.isRead;
      statusSpan.innerText = "Complete";

      event.target.innerText = "Read";
    }
  }
}

// VLibrary class
const vLibrary = new Library();

// Form variables
const bookGrid = document.querySelector(".book-grid");
const bookForm = document.querySelector("form");
const titleInput = document.querySelectorAll('input[type="text"]')[0];
const authorInput = document.querySelectorAll('input[type="text"]')[1];
const pageInput = document.querySelector('input[type="number"]');
const isReadInput = document.querySelector('input[type="checkbox"]');

bookForm.addEventListener("submit", (event) => {
  event.preventDefault();

  titleInput.setCustomValidity("");
  authorInput.setCustomValidity("");
  pageInput.setCustomValidity("");

  let hasErrors = false;

  // Set custom validity for title if empty
  if (titleInput.value.trim() === "") {
    titleInput.setCustomValidity("Please provide a book title!");
    hasErrors = true;
  }

  // Set custom validity for author if empty
  if (authorInput.value.trim() === "") {
    authorInput.setCustomValidity("Please provide a book author!");
    hasErrors = true;
  }

  // Set custom validity for pageInput if value is less than or equal to 0
  if (pageInput.value <= 0) {
    pageInput.setCustomValidity("Page amount must be greater than zero!");
    hasErrors = true;
  }

  if (hasErrors) {
    titleInput.reportValidity();
    authorInput.reportValidity();
    pageInput.reportValidity();
  } else {
    let newBook = new Book(
      titleInput.value,
      authorInput.value,
      pageInput.value,
      isReadInput.checked
    );

    const newBookElmnt = newBook.displayBook(vLibrary);
    bookGrid.appendChild(newBookElmnt);
    vLibrary.bookList.set(newBookElmnt, newBook);
  }
});

// Clear error messages when user starts typing in title
titleInput.addEventListener("input", () => {
  titleInput.setCustomValidity(""); // Clear any custom validity message
});

// Clear error messages when user starts typing in author
authorInput.addEventListener("input", () => {
  authorInput.setCustomValidity(""); // Clear any custom validity message
});

// Clear error messages when user inputs a valid page amount
pageInput.addEventListener("input", () => {
  if (pageInput.value > 0) {
    pageInput.setCustomValidity(""); // Clear any custom validity message
  }
});
