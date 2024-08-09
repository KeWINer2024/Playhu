// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAoBXC0Lng2pGlyu7M2JsHQFIA410mN-UU",
  authDomain: "phub-82977.firebaseapp.com",
  projectId: "phub-82977",
  storageBucket: "phub-82977.appspot.com",
  messagingSenderId: "790596392410",
  appId: "1:790596392410:web:8ff1dfcb99cfe339995ce3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registrationForm');
    const successModal = document.getElementById('successModal');
    const closeModal = document.querySelector('.modal .close');
    const countdownElement = document.getElementById('countdown');

    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Ne töltse újra az oldalt

        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        // Email validáció
        if (!validateEmail(email)) {
            alert('Invalid email address.');
            return;
        }

        // Jelszavak ellenőrzése
        if (password !== confirmPassword) {
            alert('Passwords do not match.');
            return;
        }

        // Firebase regisztráció
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            const userData = {
                email: email,
                username: username
            };
            const docRef = doc(db, "users", user.uid);
            return setDoc(docRef, userData);
        })
        .then(() => {
            // Sikeres regisztráció esetén modal megjelenítése
            successModal.style.display = 'block';

            // Visszaszámláló indítása
            let timeLeft = 4;
            countdownElement.textContent = `Redirecting in ${timeLeft} seconds...`;

            const countdownInterval = setInterval(() => {
                timeLeft--;
                countdownElement.textContent = `Redirecting in ${timeLeft} seconds...`;
                if (timeLeft <= 0) {
                    clearInterval(countdownInterval);
                    window.location.href = '../Login/login.html'; // Irányítás a bejelentkező oldalra
                }
            }, 1000);
        })
        .catch((error) => {
            const errorCode = error.code;
            if (errorCode == 'auth/email-already-in-use') {
                alert('Email already exists');
            } else {
                alert('Unable to create account');
            }
        });
    });

    // Modal bezárása
    closeModal.addEventListener('click', () => {
        successModal.style.display = 'none';
    });

    // Modal bezárása ha kattintunk a háttérre
    window.addEventListener('click', (event) => {
        if (event.target === successModal) {
            successModal.style.display = 'none';
        }
    });

    // Email validációs függvény
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }
});




