// fetch user from local storage
// const storedUser = localStorage.getItem('user');
// const user = JSON.parse(storedUser);

// show the cart when page opens
$(document).ready(() => {
  // Retrieving the user from local storage
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/v8/firebase.User
      $('#firebaseui-auth-container').hide();
      const uid = user.uid;
      console.log(uid);
      showCart(uid);
      // ...
    } else {
      // User is signed out
      // ...
    }
  });
});

// show user's cart
async function showCart(userID) {
  const userCart = await db.collection('Carts').doc(userID);
  userCart.onSnapshot((querySnapshot) => {
    console.log(querySnapshot.data());

    // clean out cart and costs
    $('#cart').empty();
    $('#subtotal').empty();
    $('#owls').empty();
    $('#total').empty();

    // track costs
    let subtotal = 0;
    let owls = 0;

    // populate the cart
    querySnapshot.data().products.forEach((product) => {
      // make cart object
      let li = $(`
        <div class="card mb-3">
          <div class="card-body">
            <div class="d-flex justify-content-between">
              <div class="d-flex flex-row align-items-center">
                <div>
                  <img
                    src="${product.imageURL}"
                    class="img-fluid rounded-3" alt="Shopping item" style="width: 65px;"
                  >
                </div>
                <div class="ms-3">
                  <p class="livvic">${product.name}</p>
                </div>
              </div>
              <div class="d-flex flex-row align-items-center">
                <div class="def-number-input number-input">
                  <button
                    onclick="updateCount('${product.id}', 'minus')"
                    class="minus"
                  ></button>
                  <input
                    class="quantity fw-bold text-dark"
                    min="1"
                    name="quantity"
                    value="${product.count}"
                    type="number"
                  >
                  <button
                    onclick="updateCount('${product.id}', 'plus')"
                    class="plus"
                  ></button>
                </div>
                <div style="width: 80px;">
                  <h5 class="mb-0">${product.price * product.count}</h5>
                </div>
                <a
                  href="#!"
                  onclick="removeProduct('${product.id}')"
                  style="color: #cecece;"
                >
                  <i class="fa-solid fa-broom"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      `);

      // add cart object to cart
      $('#cart').append(li);

      // add costs
      subtotal += product.price * product.count;
      owls += product.shipping * product.count;
    });

    // update costs for user's payment method
    $('#subtotal').append(subtotal);
    $('#owls').append(owls);
    $('#total').append(subtotal + owls);
  });
}

// remove a product from user's cart
async function removeProduct(productID) {
  if (firebase.auth().currentUser) {
    // Get the current user's ID
    const userId = firebase.auth().currentUser.uid;

    console.log(`User ${userId} removing productID ${productID} from cart.`);
    try {
      // 1. Get the user's UID from Firebase Authentication.
      const user = firebase.auth().currentUser;
      if (!user) {
        console.log('User not authenticated');
        return;
      }

      // 2. Check if a cart document exists for the user.
      const cartRef = db.collection('Carts').doc(user.uid);
      const cartDoc = await cartRef.get();

      if (cartDoc.exists) {
        // If the cart document exists, get the current cart data.
        let cartData = cartDoc.data();

        // 3. Remove the product from the cart.
        const updatedProducts = cartData.products.filter(
          (product) => product.id !== productID
        );

        // Update the cart document with the new list of products.
        await cartRef.update({ products: updatedProducts });
        console.log('Product removed from cart successfully');

        // show the new cart
        showCart(userId);
      } else {
        console.log('Cart document does not exist');
      }
    } catch (error) {
      console.error('Error removing product from cart:', error);
    }
  } else console.log('No current user');
}

// increment amount of a product in user's cart
async function updateCount(productID, plusMinus) {
  if (firebase.auth().currentUser) {
    // Get the current user's ID
    const userId = firebase.auth().currentUser.uid;

    console.log(
      `User ${userId} updating count of productID ${productID} in cart.`
    );
    try {
      // 1. Get the user's UID from Firebase Authentication.
      const user = firebase.auth().currentUser;
      if (!user) {
        console.log('User not authenticated');
        return;
      }

      // 2. Check if a cart document exists for the user.
      const cartRef = db.collection('Carts').doc(user.uid);
      const cartDoc = await cartRef.get();

      if (cartDoc.exists) {
        // If the cart document exists, get the current cart data.
        let cartData = cartDoc.data();

        // 3. Update the count of the product in the cart.
        const updatedProducts = cartData.products.map((product) => {
          if (product.id === productID) {
            if (plusMinus === 'plus') {
              return { ...product, count: product.count + 1 };
            } else if (plusMinus === 'minus') {
              return { ...product, count: Math.max(0, product.count - 1) };
            }
          } else {
            return product;
          }
        });

        // Update the cart document with the new list of products.
        await cartRef.update({ products: updatedProducts });

        console.log('Product count updated successfully');
      } else {
        console.log('Cart document does not exist');
      }
    } catch (error) {
      console.error('Error updating product count:', error);
    }
  } else console.log('No current user');
}
