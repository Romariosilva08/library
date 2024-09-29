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
  instructionsContainer.style.visibility = "hidden";

  if (isRotated) {
    formContainer.style.right = "-33.3%";

    addBookBtn.style.border = "0.9px solid var(--primary-text-color)";
    plusVertical.style.width = "0.9px";
    plusVertical.style.backgroundColor = "var(--primary-text-color)";
    plusHorizontal.style.height = "0.9px";
    plusHorizontal.style.backgroundColor = "var(--primary-text-color)";
    plusIcon.style.transform = "rotate(0deg)";
  } else {
    formContainer.style.right = "0";

    plusIcon.style.transform = "rotate(45deg)";
    addBookBtn.style.border = "2px solid var(--accent-button-color)";
    plusVertical.style.width = "2.5px";
    plusVertical.style.backgroundColor = "var(--accent-button-color)";
    plusHorizontal.style.height = "2.5px";
    plusHorizontal.style.backgroundColor = "var(--accent-button-color)";
  }
  isRotated = !isRotated;
});
