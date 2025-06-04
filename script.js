// @ts-nocheck
// My Books goes here - MY BEAUTIFUL LIBRARY - empty for now
const myLibrary = [
  {
    authorName: "F. Scott Fitzgerald",
    bookName: "The Great Gatsby",
    genre: "classic",
    id: genreateNewId(),
    isbn: "1426354",
    pages: "150",
    publishDate: "2025-06-18",
    status: "read",
  },
  {
    authorName: "Matt Haig",
    bookName: "The Midnight Library",
    genre: "classic",
    id: genreateNewId(),
    isbn: "1426354",
    pages: "150",
    publishDate: "2025-06-18",
    status: "unread",
  },
  {
    authorName: "Sadegh Hedayat",
    bookName: "The Blind Owl",
    genre: "classic",
    id: genreateNewId(),
    isbn: "1426354",
    pages: "150",
    publishDate: "2025-06-18",
    status: "unread",
  },
  {
    authorName: "Mark Manson",
    bookName: "The Subtle Art of Not Giving a F*ck",
    genre: "classic",
    id: genreateNewId(),
    isbn: "1426354",
    pages: "150",
    publishDate: "2025-06-18",
    status: "reading",
  },
];
function genreateNewId() {
  return crypto.randomUUID();
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
function closeDeatilModal() {
  bookDetailsModal.classList.remove("modal-visible");
}

// Event listener to open modal
if (openModalBtn) {
  // Check if button exists
  openModalBtn.addEventListener("click", openModal);
}

// Event listener to close modal via 'X' button
if (closeModalBtn) {
  // Check if button exists
  closeModalBtn.addEventListener("click", closeModal);
}

// Event listener to close modal via 'Cancel' button
if (cancelBtn) {
  // Check if button exists
  cancelBtn.addEventListener("click", closeModal);
}

// Event listener to close modal if user clicks outside of the modal content
window.addEventListener("click", (event) => {
  if (event.target === modal) {
    // Check if the click is on the modal backdrop
    closeModal();
  }
});

// ******************************* MAIN ********************************

// Event listener for form submission
if (addBookForm) {
  // Check if form exists
  addBookForm.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent default form submission
    addBookToLibrary(); // Add New Book To Library with this Function
    // Create New Book On DOM
    createNewBookOnPage();
    // Simple custom notification instead of alert()
    const notification = document.createElement("div");
    notification.textContent = "New book added (check console for data)!";
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
    notification.style.zIndex = "2000"; // Ensure it's above the modal overlay
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.remove();
    }, 3000); // Remove notification after 3 seconds

    addBookForm.reset(); // Reset the form fields
    closeModal(); // Close the modal after submission
    // Log My Library
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
  this.bookName = bookNameInput.value;
  this.authorName = authorNameInput.value;
  this.pages = pagesInput.value;
  this.isbn = isbnInput.value;
  this.genre = genreInput.value;
  this.publishDate = publishDateInput.value;
  this.status = statusInput.value;
}
// Create New Book & Add Book To Library
function addBookToLibrary() {
  // Create New Book
  const newBook = new Book();
  const bookId = crypto.randomUUID(); // genreate random ID for each Book
  newBook.id = bookId;
  // Push New Book To Library
  myLibrary.push(newBook);
}

// Show New Book on DOM - Append ********************
// Get Home Page Books Container
function createNewBookOnPage() {
  const HomePageBooksContainer = document.querySelector(
    "#home-page-books-container"
  );
  // create New Book Modal container
  const bookModal = document.createElement("div");
  bookModal.classList.add("book-modal");
  HomePageBooksContainer.appendChild(bookModal);
  // Create Book Modal img
  const bookImage = document.createElement("img");
  bookImage.setAttribute(
    "src",
    `./assets/images/book-covers/the-subtle-art.jpg`
  );
  bookModal.appendChild(bookImage);
  // Create Book Name
  const bookName = document.createElement("p");
  bookName.classList.add("book-name");
  bookModal.appendChild(bookName);
  // Create Book Author Name
  const bookAuthor = document.createElement("p");
  bookAuthor.classList.add("author");
  bookModal.appendChild(bookAuthor);
  // Create Book Read Status
  const readStatusDiv = document.createElement("div");
  readStatusDiv.classList.add("read-status");
  const readStatus = document.createElement("i");
  readStatus.classList.add("bi");
  bookModal.appendChild(readStatusDiv);
  readStatusDiv.appendChild(readStatus);

  // filling 'em
  bookName.textContent = bookNameInput.value;
  bookAuthor.textContent = authorNameInput.value;
  // read status add
  if (statusInput.value === "read") {
    readStatus.classList.add("bi-check-circle-fill");
  } else if (statusInput.value === "unread") {
    readStatus.classList.add("bi-x-circle-fill");
  } else {
    readStatus.classList.add("bi-hourglass-split");
  }

  // ADD UNIQUE BOOK ID's to DOM BOOK MODALs
  const bookIdonDom = document.createElement("span");
  bookIdonDom.classList.add("book-id");
  const lastAddedBook = myLibrary.length - 1;
  bookIdonDom.textContent = myLibrary[lastAddedBook].id;
  bookIdonDom.style.display = "none";
  bookModal.appendChild(bookIdonDom);
}

// Change Read Status DOM Icon and Array Library ****** ✴️❗
const booksContainer = document.querySelector(".books-container");
if (booksContainer) {
  booksContainer.addEventListener("click", (event) => {
    const readStatusButton = event.target.closest(".read-status");
    let readStatusIcon = null;

    // CHANGE DOM READ STATUS INTERFACE
    if (readStatusButton) {
      readStatusIcon = readStatusButton.querySelector("i");
      if (readStatusIcon) {
        if (readStatusIcon.classList.contains("bi-hourglass-split")) {
          readStatusIcon.classList.remove("bi-hourglass-split");
          readStatusIcon.classList.add("bi-check-circle-fill");
        } else if (readStatusIcon.classList.contains("bi-x-circle-fill")) {
          readStatusIcon.classList.remove("bi-x-circle-fill");
          readStatusIcon.classList.add("bi-hourglass-split");
        } else if (readStatusIcon.classList.contains("bi-check-circle-fill")) {
          readStatusIcon.classList.remove("bi-check-circle-fill");
          readStatusIcon.classList.add("bi-x-circle-fill");
        }
      }
    }

    // Finding Nearest Parent BOOK MODAL CARD
    const bookCard = event.target.closest(".book-modal");

    if (bookCard) {
      const bookIdDom = bookCard.querySelector(".book-id");
      if (bookIdDom) {
        const bookIdValue = bookIdDom.textContent.trim(); // extract exact ID
        for (let i in myLibrary) {
          if (String(myLibrary[i].id) === bookIdValue) {
            const currentBookReadStatusIcon =
              bookCard.querySelector(".read-status i");

            if (currentBookReadStatusIcon) {
              if (
                currentBookReadStatusIcon.classList.contains(
                  "bi-check-circle-fill"
                )
              ) {
                myLibrary[i].status = "read";
              } else if (
                currentBookReadStatusIcon.classList.contains(
                  "bi-hourglass-split"
                )
              ) {
                myLibrary[i].status = "reading";
              } else if (
                currentBookReadStatusIcon.classList.contains("bi-x-circle-fill")
              ) {
                myLibrary[i].status = "unread"; // اصلاح اشتباه تایپی "unred"
              }
              console.log("وضعیت کتاب به‌روز شد:", myLibrary[i]);
              break; // پس از پیدا کردن و به‌روزرسانی کتاب، از حلقه خارج شوید
            }
            break;
          }
        }
      } else {
        console.warn("عنصر .book-id در کارت کتاب پیدا نشد.");
      }
    } else {
      // کلیک خارج از یک کارت کتاب بوده است، نیازی به پردازش ID یا وضعیت نیست
      // console.log("کلیک خارج از یک کارت کتاب انجام شد.");
    }
  });
} else {
  console.error("کانتینر کتاب‌ها (booksContainer) پیدا نشد.");
}

// open books details modal ✴️❗
const closeBookDetailsModalBtn = document.querySelector(
  "#closeBookDetailsModalBtn"
);
closeBookDetailsModalBtn.addEventListener("click", () => {
  closeDeatilModal();
});
const closeDetailsModalFooterBtn = document.querySelector(
  "#closeDetailsModalFooterBtn"
);
closeDetailsModalFooterBtn.addEventListener("click", () => {
  closeDeatilModal();
});

window.addEventListener("click", (event) => {
  if (event.target === bookDetailsModal) {
    closeDeatilModal();
  }
});

// Show Book Details
const detailsBookTitle = document.querySelector("#detailsBookTitle");
const detailsAuthorName = document.querySelector("#detailsAuthorName");
const detailsPages = document.querySelector("#detailsPages");
const detailsIsbn = document.querySelector("#detailsIsbn");
const detailsGenre = document.querySelector("#detailsGenre");
const detailsPublishDate = document.querySelector("#detailsPublishDate");
const detailsStatus = document.querySelector("#detailsStatus");

if (booksContainer) {
  booksContainer.addEventListener("click", (event) => {
    const bookCard = event.target.closest(".book-modal");
    const clickedImg = event.target.closest("img");
    if (clickedImg) {
      openDetailModal();
      const clickedBookId = bookCard.querySelector(".book-id");
      for (let i in myLibrary) {
        if (String(clickedBookId.textContent.trim()) === myLibrary[i].id) {
          detailsBookTitle.textContent = myLibrary[i].bookName;
          detailsAuthorName.textContent = myLibrary[i].authorName;
          detailsPages.textContent = myLibrary[i].pages;
          detailsIsbn.textContent = myLibrary[i].isbn;
          detailsGenre.textContent = myLibrary[i].genre;
          detailsPublishDate.textContent = myLibrary[i].publishDate;
          detailsStatus.textContent = myLibrary[i].status.toUpperCase();
        }
      }
    }
  });
}

// Function For creating Books from MyLibrary Array ✅
function createBooksFromLibrary() {
  const HomePageBooksContainer = document.querySelector(
    "#home-page-books-container"
  );
  //*************************** */
  for (let i in myLibrary) {
    // create New Book Modal container
    const bookModal = document.createElement("div");
    bookModal.classList.add("book-modal");
    HomePageBooksContainer.appendChild(bookModal);
    // Create Book Modal img
    const bookImage = document.createElement("img");
    bookImage.setAttribute(
      "src",
      `./assets/images/book-covers/the-subtle-art.jpg`
    );
    bookModal.appendChild(bookImage);
    // Create Book Name
    const bookName = document.createElement("p");
    bookName.classList.add("book-name");
    bookModal.appendChild(bookName);
    // Create Book Author Name
    const bookAuthor = document.createElement("p");
    bookAuthor.classList.add("author");
    bookModal.appendChild(bookAuthor);
    // Create Book Read Status
    const readStatusDiv = document.createElement("div");
    readStatusDiv.classList.add("read-status");
    const readStatus = document.createElement("i");
    readStatus.classList.add("bi");
    bookModal.appendChild(readStatusDiv);
    readStatusDiv.appendChild(readStatus);
    bookName.textContent = myLibrary[i].bookName;
    bookAuthor.textContent = myLibrary[i].authorName;
    // read status add
    if (myLibrary[i].status === "read") {
      readStatus.classList.add("bi-check-circle-fill");
    } else if (myLibrary[i].status === "unread") {
      readStatus.classList.add("bi-x-circle-fill");
    } else {
      readStatus.classList.add("bi-hourglass-split");
    }

    // ADD UNIQUE BOOK ID's to DOM BOOK MODALs
    const bookIdonDom = document.createElement("span");
    bookIdonDom.classList.add("book-id");
    bookIdonDom.textContent = myLibrary[i].id;
    bookIdonDom.style.display = "none";
    bookModal.appendChild(bookIdonDom);
  }
}
