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
    isbn: "9780802131805",
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
    addBookToLibraryFromForm();
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

// Create New Book & Add Book To Library from form
function addBookToLibraryFromForm() {
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

function addBookToLibrary(bookObject) {
  // Check if book already exists by ISBN (if available) or by title and author
  const existingBook = myLibrary.find((libBook) => {
    if (bookObject.isbn && libBook.isbn === bookObject.isbn) {
      return true;
    }
    return (
      libBook.bookName === bookObject.bookName &&
      libBook.authorName === bookObject.authorName
    );
  });

  if (existingBook) {
    showNotification("این کتاب قبلاً به کتابخانه اضافه شده است.", "warning");
    return false; // Indicate book was not added
  }

  myLibrary.push(bookObject);
  createNewBookOnPage(bookObject); // Display the newly added book
  showNotification("کتاب با موفقیت اضافه شد!", "success");
  return true; // Indicate book was added
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

// Search Functionality
// Search Box Elements
const searchContainer = document.querySelector(".search-container"); // Changed to parent container
const searchButtonIcon = document.querySelector(".search-button .bi-search");
const searchInput = document.querySelector(".search-input");
const searchResultsContainer = document.querySelector(
  "#search-results-container"
);

// --- OpenLibrary Search Functionality ---
async function searchOpenLibrary(query) {
  if (!query.trim()) {
    searchResultsContainer.innerHTML = "";
    searchResultsContainer.style.display = "none";
    return;
  }

  // Display loading indicator
  searchResultsContainer.innerHTML =
    '<div class="search-result-item loading">Searching...</div>';
  searchResultsContainer.style.display = "block";

  const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(
    query
  )}&limit=5&fields=key,title,author_name,first_publish_year,isbn,cover_i`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    displaySearchResults(data.docs);
  } catch (error) {
    console.error("Error fetching from OpenLibrary:", error);
    searchResultsContainer.innerHTML =
      '<div class="search-result-item error">Error, try again</div>';
    searchResultsContainer.style.display = "block";
  }
}

function displaySearchResults(books) {
  searchResultsContainer.innerHTML = ""; // Clear previous results or loading message
  if (!books || books.length === 0) {
    searchResultsContainer.innerHTML =
      '<div class="search-result-item">Nothing Found.</div>';
    searchResultsContainer.style.display = "block";
    return;
  }

  books.forEach((book) => {
    const item = document.createElement("div");
    item.classList.add("search-result-item");

    let coverUrl = PLACEHOLDER_IMAGE_URL;
    if (book.cover_i) {
      coverUrl = `https://covers.openlibrary.org/b/id/${book.cover_i}-S.jpg`;
    } else if (book.isbn && book.isbn[0]) {
      // Try ISBN if cover_i is not available
      const cleanedIsbn = String(book.isbn[0]).replace(/-/g, "");
      const isbnPattern = /^(?:\d{9}[\dXx]|\d{13})$/;
      if (isbnPattern.test(cleanedIsbn)) {
        coverUrl = `https://covers.openlibrary.org/b/isbn/${cleanedIsbn}-S.jpg`;
      }
    }

    const authorText = book.author_name
      ? book.author_name.join(", ")
      : "نویسنده نامشخص";
    const publishYearText = book.first_publish_year
      ? `(${book.first_publish_year})`
      : "";

    item.innerHTML = `
      <img src="${coverUrl}" alt="cover image ${book.title}" class="search-result-cover" onerror="this.onerror=null;this.src='${PLACEHOLDER_IMAGE_URL}';">
      <div class="search-result-info">
        <div class="search-result-title">${book.title}</div>
        <div class="search-result-author">${authorText} ${publishYearText}</div>
      </div>
    `;

    item.addEventListener("click", () => {
      const newBook = new Book(
        book.title,
        book.author_name ? book.author_name.join(", ") : "نامشخص",
        null, // Pages not available directly from search
        book.isbn ? book.isbn[0] : null, // Taking the first ISBN
        null, // Genre not available
        book.first_publish_year ? `${book.first_publish_year}-01-01` : null, // Assuming start of year
        "unread" // Default status
      );
      if (addBookToLibrary(newBook)) {
        // Optionally clear search and hide results after adding
        searchInput.value = "";
        searchResultsContainer.innerHTML = "";
        searchResultsContainer.style.display = "none";
      }
    });
    searchResultsContainer.appendChild(item);
  });
  searchResultsContainer.style.display = "block";
}

// Event listener for search input
if (searchInput) {
  searchInput.addEventListener("focus", () => {
    searchContainer.classList.add("input-is-focused");
  });

  searchInput.addEventListener("blur", () => {
    // Delay hiding results to allow click event on results
    setTimeout(() => {
      if (!searchResultsContainer.matches(":hover")) {
        // Hide only if mouse is not over results
        // searchResultsContainer.innerHTML = "";
        // searchResultsContainer.style.display = "none";
      }
    }, 200);
    searchContainer.classList.remove("input-is-focused");
  });

  let searchTimeout;
  searchInput.addEventListener("keyup", (e) => {
    clearTimeout(searchTimeout);
    if (e.key === "Enter") {
      searchOpenLibrary(searchInput.value);
    } else {
      // Debounce search to avoid too many API calls
      searchTimeout = setTimeout(() => {
        searchOpenLibrary(searchInput.value);
      }, 500); // Wait 500ms after user stops typing
    }
  });
}

if (searchButtonIcon) {
  searchButtonIcon.addEventListener("click", () => {
    searchOpenLibrary(searchInput.value);
    // Keep search results visible if search icon is clicked
    if (searchResultsContainer.innerHTML.trim() !== "") {
      searchResultsContainer.style.display = "block";
    }
  });
}

// Helper function to show notifications
function showNotification(message, type = "info") {
  // type can be 'success', 'error', 'warning'
  const notification = document.createElement("div");
  notification.textContent = message;
  notification.style.position = "fixed";
  notification.style.bottom = "20px";
  notification.style.left = "50%";
  notification.style.transform = "translateX(-50%)";
  notification.style.color = "var(--font-color)";
  notification.style.padding = "10px 20px";
  notification.style.borderRadius = "5px";
  notification.style.boxShadow = "0 2px 10px rgba(0,0,0,0.2)";
  notification.style.marginBottom = "4rem";
  notification.style.zIndex = "2000";

  if (type === "success") {
    notification.style.backgroundColor = "var(--primary-color)"; // Or a green color
  } else if (type === "error") {
    notification.style.backgroundColor = "rgb(192, 14, 14)"; // Red
  } else if (type === "warning") {
    notification.style.backgroundColor = "var(--orange)"; // Orange/Yellow
  } else {
    notification.style.backgroundColor = "var(--gray-color)"; // Default
  }

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.remove();
  }, 3000);
}
