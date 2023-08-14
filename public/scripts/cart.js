// when page loads
$(document).ready(showCart());

// shows the cart
function showCart() {
  let cart = getCartFromStorage();
  // loop thru cart and make html elements from it
  for (let item of cart) {
    cart.forEach((item) => {
      let itemElem = $(`
        <div class="card mb-3">
          <div class="card-body">
            <div class="d-flex justify-content-between">
              <div class="d-flex flex-row align-items-center">
                <div>
                  <img
                    src=""
                    class="img-fluid rounded-3" alt="Shopping item" style="width: 65px;">
                </div>
                <div class="ms-3">
                  <h5 class="livvic">Samsung galaxy Note 10 </h5>
                </div>
              </div>
              <div class="d-flex flex-row align-items-center">
                <div style="width: 50px;">
                  <h5 class="fw-normal mb-0">2</h5>
                </div>
                <div style="width: 80px;">
                  <h5 class="mb-0">$900</h5>
                </div>
                <a href="#!" style="color: #cecece;"><i class="fa-solid fa-broom"></i></a>
              </div>
            </div>
          </div>
        </div>
      `);
      $('.item').append(itemElem);
    });
  }
  console.log(cart);
}

// get our cart
function getCartFromStorage() {
  let cart = JSON.parse(sessionStorage.getItem('cart')) || [];
  return cart;
}

// adds a product to the session cart
function addToCart(data) {
  // retrieve current cart or create new one
  let cart = getCartFromStorage();
  // check whether item is in cart already (if so, update quantity)
  let itemIndex = cart.findIndex((item) => item.name === data.name);
  if (itemIndex !== -1) {
    cart[itemIndex].quantity += data.quantity;
  } else {
    cart.push({ name: data.name, price: data.price, quantity: 1 });
  }
  // save updated cart
  sessionStorage.setItem('cart', JSON.stringify(cart));

  // update cart count
  // add cart count to button at the top and in burger
}

// remove an item from cart, or lower the count
function removeFromCart(item) {
  let cart = getCartFromStorage();
  let itemIndex = cart.findIndex((cartItem) => cartItem.name === item);
  if (itemIndex !== -1) {
    cart.splice(itemIndex, 1);
    sessionStorage.setItem('cart', JSON.stringify(cart));
  }
}

// empty cart
function clearCart() {
  sessionStorage.clear();
}

// example cart usage
// $('#addToCartButton').on('click', () => {
//   let name = 'Example Product';
//   let price = 125;
//   let quantity = 1;
//   console.log('pressed');
//   addToCart(name, price, quantity);
//   showCart();
// });
