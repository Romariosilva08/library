// Variables handling 'Add Book' button interactions and modal display
const addBookBtn = document.getElementById("add-book-btn");
const plusIcon = document.querySelector(".plus");
const plusVertical = document.querySelector(".vertical-line");
const plusHorizontal = document.querySelector(".horizontal-line");
let isRotated = false;

// Displays the book form UI and handles button interaction logic
addBookBtn.addEventListener("click", () => {
  if (isRotated) {
    addBookBtn.style.border = "0.9px solid var(--primary-text-color)";
    plusVertical.style.width = "0.9px";
    plusHorizontal.style.height = "0.9px";
    plusIcon.style.transform = "rotate(0deg)";
  } else {
    plusIcon.style.transform = "rotate(45deg)";
    addBookBtn.style.border = "2px solid var(--primary-text-color)";
    plusVertical.style.width = "2.5px";
    plusHorizontal.style.height = "2.5px";
  }
  isRotated = !isRotated;
});
