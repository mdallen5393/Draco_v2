import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth";
import firebaseui from 'firebaseui';

// Your Firebase config object
const firebaseConfig = {
  apiKey: 'AIzaSyDhnBjqqa7oQ9jASQxQZLKHz8QiDcq0Daw',
  authDomain: 'holberton-draco.firebaseapp.com',
  projectId: 'holberton-draco',
  storageBucket: 'holberton-draco.appspot.com',
  messagingSenderId: '316650761146',
  appId: '1:316650761146:web:e178596d92e83e469f4b83',
  measurementId: 'G-0VG0RJPC0V',
};

const auth = getAuth(app);

// Initialize FirebaseUI
const ui = new firebaseui.auth.AuthUI(auth);

// FirebaseUI Configuration
const uiConfig = {
  signInSuccessUrl: 'shop.html',
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
  ],
};

// Start FirebaseUI
ui.start('#firebaseui-auth-container', uiConfig);

// Register user with email and password
const email = "user@example.com";
const password = "password123";

createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    const user = userCredential.user;
    console.log("User registered:", user);
  })
  .catch((error) => {
    console.error("Error registering user:", error);
  });

// Sign in with email and password
signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    const user = userCredential.user;
    console.log("User signed in:", user);
  })
  .catch((error) => {
    console.error("Error signing in:", error);
  });

// Sign in with Google as a sign-in provider
const provider = new GoogleAuthProvider();

signInWithPopup(auth, provider)
  .then((result) => {
    const user = result.user;
    console.log("User signed in with Google:", user);
  })
  .catch((error) => {
    console.error("Error signing in with Google:", error);
  });

// Listener to monitor auth state
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("User is signed in:", user);
  } else {
    console.log("No user is signed in.");
  }
});

// Sign out
signOut(auth)
  .then(() => {
    console.log("User signed out.");
  })
  .catch((error) => {
    console.error("Error signing out:", error);
  });
