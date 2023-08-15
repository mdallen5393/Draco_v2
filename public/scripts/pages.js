// controls product pagination
// number of items per page
const itemsPerPage = 10;

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
