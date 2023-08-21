// controls product pagination
// number of items per page
const itemsPerPage = 8;

// total number of items
const totalItems = 20;

// calculate the number of pages needed
const totalPages = Math.ceil(totalItems / itemsPerPage);

// create an array to hold the page numbers
const pages = [];

// populate the pages array with the page numbers
for (let i = 1; i <= totalPages; i++) {
  pages.push(i);
}

// function to display the current page of items
function displayPage(pageNumber) {
  // calculate the start and end index for the current page
  const startIndex = (pageNumber - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // get the items for the current page
  const currentPageItems = allItems.slice(startIndex, endIndex);

  // display the current page items
  // ...
}

// add event listeners to the pagination buttons
$('.pagination-button').on('click', (event) => {
  // get the page number from the button's data attribute
  const pageNumber = parseInt($(event.target).data('page-number'));

  // display the selected page
  displayPage(pageNumber);
});

// Function to generate the pagination UI
function generatePagination() {
  const paginationList = $(".pagination");

  // Remove existing page numbers
  $(".pagination .page-number").remove();

  // Add page numbers
  for (let i = 0; i < totalPages; i++) {
    const pageNumberItem = $(`<li class="page-item page-number"><a class="page-link" href="#" data-page-number="${i + 1}">${i + 1}</a></li>`);
    paginationList.children(".next-page").before(pageNumberItem);
  }

  // Add click listener to the page numbers
  $(".pagination .page-link").on("click", function(event) {
    event.preventDefault();
    const pageNumber = parseInt($(this).data("page-number"));
    displayPage(pageNumber);
    updatePaginationUI(pageNumber);
  });
}

// Call the function to generate pagination on page load
generatePagination();

// Function to update the pagination UI based on the current page
function updatePaginationUI(currentPage) {
  // Update active page
  $(".pagination .page-number").removeClass("active");
  $(`.pagination .page-link[data-page-number="${currentPage}"]`).parent().addClass("active");

  // Disable/Enable the "Previous" and "Next" buttons
  $(".pagination .prev-page").toggleClass("disabled", currentPage === 1);
  $(".pagination .next-page").toggleClass("disabled", currentPage === totalPages);
}

// Add click listeners for the "Previous" and "Next" buttons
$(".pagination .prev-page").on("click", function(event) {
  event.preventDefault();
  if (!$(this).hasClass("disabled")) {
    const currentPage = $(".pagination .active .page-link").data("page-number");
    displayPage(currentPage - 1);
    updatePaginationUI(currentPage - 1);
  }
});

$(".pagination .next-page").on("click", function(event) {
  event.preventDefault();
  if (!$(this).hasClass("disabled")) {
    const currentPage = $(".pagination .active .page-link").data("page-number");
    displayPage(currentPage + 1);
    updatePaginationUI(currentPage + 1);
  }
});
