// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword, signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import {
  getFirestore,
  setDoc,
  doc,
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAoBXC0Lng2pGlyu7M2JsHQFIA410mN-UU",
  authDomain: "phub-82977.firebaseapp.com",
  projectId: "phub-82977",
  storageBucket: "phub-82977.appspot.com",
  messagingSenderId: "790596392410",
  appId: "1:790596392410:web:8ff1dfcb99cfe339995ce3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

document.addEventListener("DOMContentLoaded", () => {
  // Handle menu toggle
  window.toggleMenu = function () {
    const menu = document.querySelector(".menu");
    menu.style.display = menu.style.display === "block" ? "none" : "block";
  };

  // Handle form submission
  const loginForm = document.getElementById("login-form");
  loginForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form from submitting normally

    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;
  })
  
  // Toggle password visibility
  window.togglePassword = function () {
    const passwordInput = document.getElementById("login-password");
    const toggleIcon = document.querySelector(".toggle-password");
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
      toggleIcon.textContent = "🙈"; // Eye-off emoji
    } else {
      passwordInput.type = "password";
      toggleIcon.textContent = "👁️"; // Eye emoji
    }
  };
});

const signIn = document.getElementById('submitb');
signIn.addEventListener("click", (event) => {
  event.preventDefault();
  const email = document.getElementById("login-email").value;
  const password = document.getElementById('login-password').value;
  const auth = getAuth();

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      alert("Sikeres");
      const user = userCredential.user;
      localStorage.setItem("loggedInUserId", user.uid);
      window.location.href = "../Home/Home.html";
    })
    .catch((error) => {
      const errorCode = error.code;
      if (errorCode === "auth/invalid-credential") {
        alert("Incorrect Email or Password");
      } else {
        alert("Account does not exist");
      }
    });
});
