

// register user with email and password

const email = "user@example.com";
const password = "password123";

firebase.auth().createUserWithEmailAndPassword(email, password)
  .then((userCredential) => {
    const user = userCredential.user;
    console.log("User registered:", user);
  })
  .catch((error) => {
    console.error("Error registering user:", error);
  });

// sign in with email and password
firebase.auth().signInWithEmailAndPassword(email, password)
  .then((userCredential) => {
    const user = userCredential.user;
    console.log("User signed in:", user);
  })
  .catch((error) => {
    console.error("Error signing in:", error);
  });

// sign in with google as sign in provider
const provider = new firebase.auth.GoogleAuthProvider();

firebase.auth().signInWithPopup(provider)
  .then((result) => {
    const user = result.user;
    console.log("User signed in with Google:", user);
  })
  .catch((error) => {
    console.error("Error signing in with Google:", error);
  });

// listener to monitor auth state
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    console.log("User is signed in:", user);
  } else {
    console.log("No user is signed in.");
  }
});

// sign out  
firebase.auth().signOut()
  .then(() => {
    console.log("User signed out.");
  })
  .catch((error) => {
    console.error("Error signing out:", error);
  });
