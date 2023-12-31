// show the cart when page opens
$(document).ready(() => {
  // Retrieving the user from local storage
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/v8/firebase.User
      $('#firebaseui-auth-container').hide();
      document.getElementById('search-shop').style.visibility = 'visible';

      // get firebase user id
      const uid = user.uid;
      console.log(uid);
      // ...
    } else {
      // User is signed out
      // ...
    }
  });
});

// add a product to the user's cart
async function addToCart(productDoc) {
  if (firebase.auth().currentUser) {
    // Get the current user's ID
    const userId = firebase.auth().currentUser.uid;

    console.log(`User ${userId} adding productID ${productDoc} to cart.`);
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

      let cartData = { products: [] };

      if (cartDoc.exists) {
        // If the cart document exists, get the current cart data.
        cartData = cartDoc.data();
      } else {
        // If the cart document doesn't exist, create it.
        await cartRef.set(cartData);
      }

      // 3. Add the product to the cart.
      const docRef = await db.collection('Products').doc(productDoc);
      docRef
        .get()
        .then(async (doc) => {
          const productData = doc.data(); // Get the product data

          // Check if the product already exists in the user's cart
          let productIndex = -1;
          for (let i = 0; i < cartData.products.length; i++) {
            if (cartData.products[i].id === doc.id) {
              productIndex = i;
              break;
            }
          }

          let updatedProducts;
          if (productIndex === -1) {
            // The product does not exist in the user's cart, so add it
            const productWithId = { ...productData, id: doc.id, count: 1 }; // Add the document ID and count to the product data
            updatedProducts = [...cartData.products, productWithId];
          } else {
            // The product already exists in the user's cart, so increment its count
            updatedProducts = [...cartData.products];
            updatedProducts[productIndex].count++;
          }

          // Update the cart document with the new list of products.
          await cartRef.update({ products: updatedProducts });

          console.log('Product added to cart successfully');
          alert('Product added to cart successfully');
        })
        .catch((err) => {
          console.log(`Error finding product: ${err.message}`);
        });
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
  } else console.log('No current user');
}
