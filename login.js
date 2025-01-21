import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAEUaYXgNfOlHzy7qQkFMZHsHpImpVRO54",
  authDomain: "walletwise2024.firebaseapp.com",
  projectId: "walletwise2024",
  storageBucket: "walletwise2024.firebasestorage.app",
  messagingSenderId: "297434724089",
  appId: "1:297434724089:web:d7b07bdbb92ca6a4be1428"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
auth.languageCode = 'en';

// Email/Password Login
document.getElementById('login-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    alert(`Welcome back, ${userCredential.user.email}`);
    window.location.href = 'dashboard.html';
  } catch (error) {
    let errorMessage;
    switch (error.code) {
      case 'auth/user-not-found':
        errorMessage = 'No account found with this email.';
        break;
      case 'auth/wrong-password':
        errorMessage = 'Incorrect password.';
        break;
      default:
        errorMessage = 'An error occurred.';
    }
    alert(errorMessage);
  }
});
