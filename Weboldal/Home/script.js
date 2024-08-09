var games = [
    { 
        nev: "Fortnite",
        kep: "img/fortnite.jpg" 
    },
    {
        nev: "Counter Strike 2",
        kep: "img/cs2.jpg"
    },
    {
        nev: "Rocket League",
        kep: "img/rocketleague.jpg"
    },
    {
        nev: "Grand Theft Auto 5",
        kep: "img/gtav.jpg"
    },
    {
        nev:"Goose Goose Duck",
        kep: "img/goose.jpg"
    }
];
var s = "";
for (let index = 0; index < games.length; index++) {
    s+= `<div class="card" data-tilt style="background-image: url(${games[index].kep});">
<div class="overlay"></div>
<p>Click to See</p>
</div>`;
}
document.getElementById("container").innerHTML = s;


// script.js
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger');
    const menu = document.getElementById('menu');
    const header = document.querySelector('header');

    let lastScrollTop = 0;

    hamburger.addEventListener('click', () => {
        menu.classList.toggle('show');
    });

    
});

// script.js

let lastScrollTop = 0; // Utolsó görgetési pozíció
const header = document.querySelector('header');

window.addEventListener('scroll', function () {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

    if (currentScroll > lastScrollTop) {
        // Ha lefelé görgetünk, csúsztassuk fel a header-t
        header.style.transform = 'translateY(-100%)';
    } else {
        // Ha felfelé görgetünk, csúsztassuk vissza a header-t
        header.style.transform = 'translateY(0)';
    }

    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // Ne engedje, hogy a scrollTop negatív legyen
});
