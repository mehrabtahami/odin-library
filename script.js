// @ts-nocheck

// ⭐⭐⭐ Placeholder image URL if a book cover isn't found or ISBN is invalid
const PLACEHOLDER_IMAGE_URL = "./assets/images/no-cover.png";

// My Books goes here - MY BEAUTIFUL LIBRARY
const myLibrary = [
  {
    authorName: "F. Scott Fitzgerald",
    bookName: "The Great Gatsby",
    genre: "classic",
    id: generateNewId(),
    isbn: "9780743273565", // ⭐ Updated with a valid ISBN - now it fetch Data with ISBN using OPEN LIBRARY API ⭐
    pages: "180",
    publishDate: "1925-04-10",
    status: "read",
  },
  {
    authorName: "Matt Haig",
    bookName: "The Midnight Library",
    genre: "Contemporary Fiction",
    id: generateNewId(),
    isbn: "9780525559474",
    pages: "304",
    publishDate: "2020-08-13",
    status: "unread",
  },
  {
    authorName: "Sadegh Hedayat",
    bookName: "The Blind Owl",
    genre: "Philosophical Novel",
    id: generateNewId(),
    isbn: "9780802144278",
    pages: "160",
    publishDate: "1937-01-01",
    status: "unread",
  },
  {
    authorName: "Mark Manson",
    bookName: "The Subtle Art of Not Giving a F*ck",
    genre: "Self-help",
    id: generateNewId(),
    isbn: "9780062457714",
    pages: "224",
    publishDate: "2016-09-13",
    status: "reading",
  },
];

function generateNewId() {
  return crypto.randomUUID();
}

// ⭐ Helper function to get book cover URL ⭐
function getBookCoverUrl(book) {
  if (book && book.isbn) {
    const cleanedIsbn = String(book.isbn).replace(/-/g, "");
    // Basic validation for ISBN-like pattern (10 or 13 digits) REGEX
    const isbnPattern = /^(?:\d{9}[\dXx]|\d{13})$/;
    if (isbnPattern.test(cleanedIsbn)) {
      return `https://covers.openlibrary.org/b/isbn/${cleanedIsbn}-M.jpg`;
    }
  }
  // Fallback for books without a valid ISBN pattern or no ISBN at all
  return PLACEHOLDER_IMAGE_URL;
}

createBooksFromLibrary();

// Get modal element
const modal = document.querySelector("#addBookModal");
const bookDetailsModal = document.querySelector("#bookDetailsModal");

// Get open modal button
const openModalBtn = document.querySelector(".addnewbook-button");

// Get close modal button (the 'X' icon)
const closeModalBtn = document.querySelector("#closeModalBtn");

// Get cancel button (inside the form)
const cancelBtn = document.querySelector("#cancelBtn");

// Get the form
const addBookForm = document.querySelector("#addBookForm");

// Function to open the modal
function openModal() {
  modal.classList.add("modal-visible");
}
function openDetailModal() {
  bookDetailsModal.classList.add("modal-visible");
}
// Function to close the modal
function closeModal() {
  modal.classList.remove("modal-visible");
}
function closeDetailsModal() {
  bookDetailsModal.classList.remove("modal-visible");
}

// Event listener to open modal
if (openModalBtn) {
  openModalBtn.addEventListener("click", openModal);
}

// Event listener to close modal via 'X' button
if (closeModalBtn) {
  closeModalBtn.addEventListener("click", closeModal);
}

// Event listener to close modal via 'Cancel' button
if (cancelBtn) {
  cancelBtn.addEventListener("click", closeModal);
}

// Event listener to close modal if user clicks outside of the modal content
window.addEventListener("click", (event) => {
  if (event.target === modal) {
    closeModal();
  }
  if (event.target === bookDetailsModal) {
    // ⭐⭐⭐ Added for details modal consistency
    closeDetailsModal();
  }
});

// ******************************* MAIN ********************************

// Event listener for form submission
if (addBookForm) {
  addBookForm.addEventListener("submit", (event) => {
    event.preventDefault();
    addBookToLibrary();
    createNewBookOnPage(); // This will now use the new image logic
    const notification = document.createElement("div");
    notification.textContent = "New book added!";
    notification.style.position = "fixed";
    notification.style.bottom = "20px";
    notification.style.left = "50%";
    notification.style.transform = "translateX(-50%)";
    notification.style.backgroundColor = "var(--primary-color)";
    notification.style.color = "var(--font-color)";
    notification.style.padding = "10px 20px";
    notification.style.borderRadius = "5px";
    notification.style.boxShadow = "0 2px 10px rgba(0,0,0,0.2)";
    notification.style.marginBottom = "4rem";
    notification.style.zIndex = "2000";
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.remove();
    }, 3000);

    addBookForm.reset();
    closeModal();
    console.log(myLibrary);
  });
}

// Get Form Data - Variables
const bookNameInput = document.querySelector("#bookName");
const authorNameInput = document.querySelector("#authorName");
const pagesInput = document.querySelector("#pages");
const isbnInput = document.querySelector("#isbn");
const genreInput = document.querySelector("#genre");
const publishDateInput = document.querySelector("#publishDate");
const statusInput = document.querySelector("#status");

// New Book Object Constructors
function Book(bookName, authorName, pages, isbn, genre, publishDate, status) {
  this.bookName = bookName;
  this.authorName = authorName;
  this.pages = pages;
  this.isbn = isbn;
  this.genre = genre;
  this.publishDate = publishDate;
  this.status = status;
  this.id = generateNewId();
}

// Create New Book & Add Book To Library
function addBookToLibrary() {
  const newBook = new Book(
    bookNameInput.value,
    authorNameInput.value,
    pagesInput.value,
    isbnInput.value,
    genreInput.value,
    publishDateInput.value,
    statusInput.value
  );
  myLibrary.push(newBook);
}

// Show New Book on DOM - Append ********************
function createNewBookOnPage() {
  const HomePageBooksContainer = document.querySelector(
    "#home-page-books-container"
  );
  const lastAddedBook = myLibrary[myLibrary.length - 1]; // Get the most recently added book

  const bookModal = document.createElement("div");
  bookModal.classList.add("book-modal");
  HomePageBooksContainer.appendChild(bookModal);
  // Create Book Modal img
  const bookImage = document.createElement("img");
  // ⭐⭐⭐ Use the helper function to get the cover URL
  bookImage.src = getBookCoverUrl(lastAddedBook);
  // ⭐⭐⭐ Add an error handler for the image
  bookImage.onerror = function () {
    this.src = PLACEHOLDER_IMAGE_URL; // Fallback to placeholder if image fails to load
  };
  bookModal.appendChild(bookImage);

  const bookName = document.createElement("p");
  bookName.classList.add("book-name");
  bookName.textContent = lastAddedBook.bookName;
  bookModal.appendChild(bookName);

  const bookAuthor = document.createElement("p");
  bookAuthor.classList.add("author");
  bookAuthor.textContent = lastAddedBook.authorName;
  bookModal.appendChild(bookAuthor);

  // Create Book Read Status
  const readStatusDiv = document.createElement("div");
  readStatusDiv.classList.add("read-status");
  const readStatusIconElement = document.createElement("i");
  readStatusIconElement.classList.add("bi");
  readStatusDiv.appendChild(readStatusIconElement);
  bookModal.appendChild(readStatusDiv);

  // filling 'em
  if (lastAddedBook.status === "read") {
    readStatusIconElement.classList.add("bi-check-circle-fill");
  } else if (lastAddedBook.status === "unread") {
    readStatusIconElement.classList.add("bi-x-circle-fill");
  } else {
    readStatusIconElement.classList.add("bi-hourglass-split");
  }

  const bookIdonDom = document.createElement("span");
  bookIdonDom.classList.add("book-id");
  bookIdonDom.textContent = lastAddedBook.id;
  bookIdonDom.style.display = "none";
  bookModal.appendChild(bookIdonDom);
}

// Change Read Status DOM Icon and Array Library ****** ✴️❗
const booksContainer = document.querySelector("#home-page-books-container");

if (booksContainer) {
  booksContainer.addEventListener("click", (event) => {
    const bookCard = event.target.closest(".book-modal");
    const bookIdElement = bookCard.querySelector(".book-id");
    const bookIdValue = bookIdElement.textContent.trim();

    const bookInLibrary = myLibrary.find(
      (book) => String(book.id) === bookIdValue
    );

    if (!bookInLibrary) {
      console.warn(`Book with ID ${bookIdValue} not found in library.`);
      return;
    }

    // Handle read status change
    const readStatusButton = event.target.closest(".read-status");
    if (readStatusButton) {
      const readStatusIcon = readStatusButton.querySelector("i");
      if (readStatusIcon) {
        if (readStatusIcon.classList.contains("bi-hourglass-split")) {
          readStatusIcon.classList.remove("bi-hourglass-split");
          readStatusIcon.classList.add("bi-check-circle-fill");
          bookInLibrary.status = "read";
        } else if (readStatusIcon.classList.contains("bi-x-circle-fill")) {
          readStatusIcon.classList.remove("bi-x-circle-fill");
          readStatusIcon.classList.add("bi-hourglass-split");
          bookInLibrary.status = "reading";
        } else if (readStatusIcon.classList.contains("bi-check-circle-fill")) {
          readStatusIcon.classList.remove("bi-check-circle-fill");
          readStatusIcon.classList.add("bi-x-circle-fill");
          bookInLibrary.status = "unread";
        }
        console.log("Book status updated:", bookInLibrary);
      }
    }

    // Handle opening book details modal when image is clicked
    // Ensure the clicked target is an IMG tag and is a direct child of bookCard (the main cover)
    if (
      event.target.tagName === "IMG" &&
      event.target.parentElement === bookCard
    ) {
      openDetailModal();
      detailsBookTitle.textContent = bookInLibrary.bookName;
      detailsAuthorName.textContent = bookInLibrary.authorName;
      detailsPages.textContent = bookInLibrary.pages;
      detailsIsbn.textContent = bookInLibrary.isbn;
      detailsGenre.textContent = bookInLibrary.genre;
      detailsPublishDate.textContent = bookInLibrary.publishDate;
      detailsStatus.textContent = bookInLibrary.status
        ? String(bookInLibrary.status).toUpperCase()
        : "";
    }
  });
} else {
  console.error("Books container (#home-page-books-container) not found.");
}

// open books details modal ✴️❗
const closeBookDetailsModalBtn = document.querySelector(
  "#closeBookDetailsModalBtn"
);
if (closeBookDetailsModalBtn) {
  closeBookDetailsModalBtn.addEventListener("click", closeDetailsModal);
}

const closeDetailsModalFooterBtn = document.querySelector(
  "#closeDetailsModalFooterBtn"
);
if (closeDetailsModalFooterBtn) {
  closeDetailsModalFooterBtn.addEventListener("click", closeDetailsModal);
}

// Show Book Details - Elements
const detailsBookTitle = document.querySelector("#detailsBookTitle");
const detailsAuthorName = document.querySelector("#detailsAuthorName");
const detailsPages = document.querySelector("#detailsPages");
const detailsIsbn = document.querySelector("#detailsIsbn");
const detailsGenre = document.querySelector("#detailsGenre");
const detailsPublishDate = document.querySelector("#detailsPublishDate");
const detailsStatus = document.querySelector("#detailsStatus");

// Function For creating Books from MyLibrary Array ✅
function createBooksFromLibrary() {
  const HomePageBooksContainer = document.querySelector(
    "#home-page-books-container"
  );
  // Null Check
  if (!HomePageBooksContainer) {
    console.error(
      "#home-page-books-container not found for initial book loading."
    );
    return;
  }

  for (let i in myLibrary) {
    const currentBook = myLibrary[i]; // ⭐ Use currentBook for clarity
    const bookModal = document.createElement("div");
    bookModal.classList.add("book-modal");
    HomePageBooksContainer.appendChild(bookModal);

    const bookImage = document.createElement("img");
    // ⭐ Use the helper function to get the cover URL
    bookImage.src = getBookCoverUrl(currentBook);
    // ⭐ Add an error handler for the image
    bookImage.onerror = function () {
      this.src = PLACEHOLDER_IMAGE_URL; // Fallback to placeholder if image fails to load
    };
    bookModal.appendChild(bookImage);

    const bookName = document.createElement("p");
    bookName.classList.add("book-name");
    bookName.textContent = currentBook.bookName;
    bookModal.appendChild(bookName);

    const bookAuthor = document.createElement("p");
    bookAuthor.classList.add("author");
    bookAuthor.textContent = currentBook.authorName;
    bookModal.appendChild(bookAuthor);

    const readStatusDiv = document.createElement("div");
    readStatusDiv.classList.add("read-status");
    const readStatusIconElement = document.createElement("i");
    readStatusIconElement.classList.add("bi");
    readStatusDiv.appendChild(readStatusIconElement);
    bookModal.appendChild(readStatusDiv);

    if (currentBook.status === "read") {
      readStatusIconElement.classList.add("bi-check-circle-fill");
    } else if (currentBook.status === "unread") {
      readStatusIconElement.classList.add("bi-x-circle-fill");
    } else {
      readStatusIconElement.classList.add("bi-hourglass-split");
    }
    // ADD UNIQUE BOOK ID's to DOM BOOK MODALs
    const bookIdonDom = document.createElement("span");
    bookIdonDom.classList.add("book-id");
    bookIdonDom.textContent = currentBook.id;
    bookIdonDom.style.display = "none";
    bookModal.appendChild(bookIdonDom);
  }
}

// Search Button Activate and Animation 🔍
const searchBox = document.querySelector(".search-button");
const searchBoxButton = searchBox.querySelector("i");
const searchBoxInput = document.querySelector(".search-input");
let searchBoxValue;
searchBoxInput.addEventListener("focus", () => {
  searchBox.classList.add("input-is-focused");
});

searchBoxInput.addEventListener("blur", () => {
  searchBox.classList.remove("input-is-focused");
});

searchBoxButton.addEventListener("click", (e) => {
  searchBoxValue = searchBoxInput.value;
  console.log(`Search Input is = ${searchBoxValue}`);
});

searchBoxInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter" || e.keyCode === 13) {
    searchBoxValue = searchBoxInput.value;
    console.log(`Search Input is = ${searchBoxValue}`);
  }
});
