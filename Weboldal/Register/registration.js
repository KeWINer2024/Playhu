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

        // További regisztrációs logika itt (pl. adatok elküldése)

        // Modal megjelenítése
        successModal.style.display = 'block';

        // Visszaszámláló indítása
        let timeLeft = 4;
        countdownElement.textContent = `Redirecting in ${timeLeft} seconds...`;
        
        const countdownInterval = setInterval(() => {
            timeLeft--;
            countdownElement.textContent = `Redirecting in ${timeLeft} seconds...`;
            if (timeLeft <= 0) {
                clearInterval(countdownInterval);
                window.location.href = '../Login/login.html'; // Irányítás a főoldalra
            }
        }, 1000);
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
