import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-storage.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAEUaYXgNfOlHzy7qQkFMZHsHpImpVRO54",
  authDomain: "walletwise2024.firebaseapp.com",
  projectId: "walletwise2024",
  storageBucket: "walletwise2024.appspot.com", // Correct storage bucket
  messagingSenderId: "297434724089",
  appId: "1:297434724089:web:d7b07bdbb92ca6a4be1428"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);

// Signup functionality
const signupForm = document.getElementById("signup-form");

signupForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("signupEmail").value;
  const fullName = document.getElementById("signupFullName").value;
  const password = document.getElementById("signupPassword").value;
  const imageFile = document.getElementById("signupProfilePicture").files[0]; // Corrected ID

  try {
    // Create the user
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    let photoURL = null;

    if (imageFile) {
      // Upload the image to Firebase Storage
      const imageRef = ref(storage, `profileImages/${user.uid}/${imageFile.name}`);
      await uploadBytes(imageRef, imageFile);

      // Get the image URL
      photoURL = await getDownloadURL(imageRef);
      console.log("Image uploaded successfully. Photo URL:", photoURL);
    }

    // Update user profile with display name and photoURL
    console.log("Updating profile with:", { displayName: fullName, photoURL: photoURL });
    await updateProfile(user, {
      displayName: fullName,
      photoURL: photoURL,
    });

    alert("Account created successfully! Welcome, " + fullName);
    window.location.href = "login.html";
  } catch (error) {
    if (error.code === 'auth/email-already-in-use') {
      alert('This email is already registered. Try logging in.');
    } else if (error.code === 'auth/weak-password') {
      alert('Password must be at least 6 characters long.');
    } else if (error.code === 'auth/invalid-email') {
      alert('Invalid email format.');
    } else {
      alert('Error: ' + error.message);
    }
    console.error(error);
  }
});