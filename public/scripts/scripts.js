// fb db info
const firebaseConfig = {
  apiKey: 'AIzaSyDhnBjqqa7oQ9jASQxQZLKHz8QiDcq0Daw',
  authDomain: 'holberton-draco.firebaseapp.com',
  projectId: 'holberton-draco',
  storageBucket: 'holberton-draco.appspot.com',
  messagingSenderId: '316650761146',
  appId: '1:316650761146:web:e178596d92e83e469f4b83',
  measurementId: 'G-0VG0RJPC0V',
};
// create database connection
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore(app);

// Get the unordered list element
let ul = $('#product-list');
let testimonials = $('#testimonials-list');


// Function to load products for a specific page
// Pagination variables
const productsPerPage = 12;
let currentPage = 1;

function loadProductsPage(pageNumber) {
  const productsRef = db.collection('Products');
  const query = productsRef
    .limit(productsPerPage)
    .startAfter((pageNumber - 1) * productsPerPage);

  query.onSnapshot((querySnapshot) => {
    $('#products').empty(); // Empty out the products

    querySnapshot.forEach((doc) => {
      let li = $(`
      <div
        class="card d-flex justify-content-center m-3 shadow"
        style="width: 18rem"
        id="${doc.data().keywords.forEach((keyword) => keyword)}"
      >
        <img
          src="${doc.data().imageURL}"
          class="card-img-top"
          alt="product image"
          style="width: 100%; height: auto"
        />
        <hr style="width: 90%; margin: auto" />
        <div class="card-body d-flex flex-column text-center">
          <div class="d-flex row">
            <h4 class="livvic gold">${doc.data().name}</h4>
            <p>${doc.data().description}</p>
          </div>
        </div>
        <div class="card-footer d-flex pt-3">
          <div class="d-flex mx-2">
            <img
              src="images/misc/galleon_black.png"
              class="pt-2 pb-3"
              style="width: 10%"
            />
            <h2 class="py-1">${doc.data().price}</h2>
          </div>
          <div class="pt-2 mx-2">
            <i
              class="fa-solid fa-cart-shopping"
              onclick="addToCart('${doc.data().name}', '${doc.data().price}')"
            ></i>
          </div>
        </div>
      </div>
    `);
    });
  });
}

loadProductsPage(currentPage);

// Pagination controls
$('#prevPage').on('click', function () {
  if (currentPage > 1) {
    currentPage--;
    loadProductsPage(currentPage);
  }
});

$('#nextPage').on('click', function () {
  currentPage++;
  loadProductsPage(currentPage);
});

// products page content OLD LIKE YOUR MOTHER
// db.collection('Products').onSnapshot((querySnapshot) => {
//   // empty out the products
//   $('#products').empty();
//   // create the products
//   querySnapshot.forEach((doc) => {
//     let li = $(`
//       <div
//         class="card d-flex justify-content-center m-3 shadow"
//         style="width: 18rem"
//         id="${doc.data().keywords.forEach((keyword) => keyword)}"
//       >
//         <img
//           src="${doc.data().imageURL}"
//           class="card-img-top"
//           alt="product image"
//           style="width: 100%; height: auto"
//         />
//         <hr style="width: 90%; margin: auto" />
//         <div class="card-body d-flex flex-column text-center">
//           <div class="d-flex row">
//             <h4 class="livvic gold">${doc.data().name}</h4>
//             <p>${doc.data().description}</p>
//           </div>
//         </div>
//         <div class="card-footer d-flex pt-3">
//           <div class="d-flex mx-2">
//             <img
//               src="images/misc/galleon_black.png"
//               class="pt-2 pb-3"
//               style="width: 10%"
//             />
//             <h2 class="py-1">${doc.data().price}</h2>
//           </div>
//           <div class="pt-2 mx-2">
//             <i
//               class="fa-solid fa-cart-shopping"
//               onclick="addToCart('${doc.data().name}', '${doc.data().price}')"
//             ></i>
//           </div>
//         </div>
//       </div>
//     `);
//     // add the product
//     $('#products').append(li);
//   });
// });

// Testimonials Carousel`
let imagesLoaded = 0;

db.collection('Testimonials')
  .get()
  .then((querySnapshot) => {
    let first = true;
    querySnapshot.forEach((doc) => {
      let li = $(`
      <div class="carousel-item ${first ? 'active' : ''}">
        <div class="container">
          <div class="row d-flex align-items-center">
            <div class="col-sm-12 col-md-4 p-3 image-container">
              <img src="images/misc/pngegg.png" class="rotate border-image" height="150px">
              <img
                src="${doc.data().imageURL}"
                class="content-image rounded-circle mx-auto d-block"
                alt="profile pic"
                style="width: 150px; height: auto"
              />
            </div>
            <div class="col-sm-12 col-md-8 text-center text-md-left p-3 px-md-5">
              <h2 class="text-monospace livvic">${doc.data().name}</h2>
              <h6 class="fw-bold gold">${doc.data().title}</h6>
              <p class="quote">"${doc.data().comment}"</p>
            </div>
          </div>
        </div>
      </div>
    `);
      $('#testimonials').append(li);
      first = false;

      // Add event listener for the load event to the image
      li.find('img.content-image').on('load', () => {
        imagesLoaded++;
        if (imagesLoaded === querySnapshot.size) {
          // All images have finished loading
          setCarouselItemHeight();
        }
      });
    });
  });

// set carousel item height
function setCarouselItemHeight() {
  let maxHeight = 0;
  $('.carousel-item').each(function () {
    let cardHeight = $(this).height();
    if (cardHeight > maxHeight) {
      maxHeight = cardHeight;
    }
  });
  $('.carousel-item').height(maxHeight);
}

// scale carousel with window size
$(window).on('resize', function () {
  let maxHeight = 0;
  $('.carousel-item').height('auto'); // reset the height of all carousel items to auto
  setCarouselItemHeight();
});

// if no items match search, suggest contact page
function doubleCheckProducts() {
  if ($('#products').is(':empty')) {
    $('#products').append(`
    <div class="d-flex p-5">
    <h5 class="livvic text-center">
    Sorry, no products match your description. Please visit our
    <a href="contact.html#contact_form" class="gold">contact page</a> for more information,
    or if you would like to speak with us about carrying your
    favorite dragon care products!
    </h5>
    </div>
    `);
  }
}

// search firestore for given keyword, and display products with it
async function searchKeywords(keyword) {
  // check for empty string
  if (keyword.trim() === '') {
    return;
  }
  // query the db
  let query = db
    .collection('Products')
    .where('keywords', 'array-contains', keyword);
  // empty out the products shown
  $('#products').empty();
  // await the query
  let querySnapshot = await query.get();
  // get the results and display them
  querySnapshot.forEach((doc) => {
    let li = $(`
      <div
        class="card d-flex justify-content-center m-3 shadow"
        style="width: 18rem"
        id="${doc.data().keywords.forEach((keyword) => keyword)}"
      >
        <img
          src="${doc.data().imageURL}"
          class="card-img-top"
          alt="product image"
          style="width: 100%; height: auto"
        />
        <hr style="width: 90%; margin: auto" />
        <div class="card-body d-flex flex-column text-center">
          <div class="d-flex row">
            <h4 class="livvic gold">${doc.data().name}</h4>
            <p>${doc.data().description}</p>
          </div>
        </div>
        <div class="card-footer d-flex pt-3">
          <div class="d-flex mx-2">
            <img
              src="images/misc/galleon_black.png"
              class="pt-2 pb-3"
              style="width: 10%; height: 100%"
            />
            <h2 class="py-1">${doc.data().price}</h2>
          </div>
          <div class="pt-2 mx-2">
            <i class="fa-solid fa-cart-shopping" onclick="addToCart('${
              doc.data().name
            }', '${doc.data().price}')"></i>
          </div>
        </div>
      </div>
    `);
    $('#products').append(li);
  });

  // Adjust pagination controls
  currentPage = 1;
  $('#prevPage').prop('disabled', true); // Disable previous button on first page
  $('#nextPage').prop('disabled', false); // Enable next button on search

  // Load products for the first page
  loadProductsPage(currentPage);
  
  doubleCheckProducts();
}

// press enter on the search field to search
$('#search-bar').on('keyup', function (e) {
  // check if enter is pressed
  if (e.key === 'Enter' || e.keyCode === 13) {
    // search thru keywords
    searchKeywords(this.value);
  }
});

// i need to make the search show all products
