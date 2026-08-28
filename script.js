/* =====================================================
   WEDDING COUNTDOWN
   ===================================================== */

// CHANGE THIS TO YOUR REAL WEDDING DATE AND TIME
const weddingDate = new Date("2026-12-26T10:00:00").getTime();

function updateCountdown() {

    const now = new Date().getTime();

    const distance = weddingDate - now;


    // If wedding day has arrived
    if (distance <= 0) {

        document.getElementById("days").textContent = "00";
        document.getElementById("hours").textContent = "00";
        document.getElementById("minutes").textContent = "00";
        document.getElementById("seconds").textContent = "00";

        return;
    }


    // Calculate time
    const days = Math.floor(
        distance / (1000 * 60 * 60 * 24)
    );

    const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) /
        (1000 * 60 * 60)
    );

    const minutes = Math.floor(
        (distance % (1000 * 60 * 60)) /
        (1000 * 60)
    );

    const seconds = Math.floor(
        (distance % (1000 * 60)) /
        1000
    );


    // Display countdown
    document.getElementById("days").textContent =
        String(days).padStart(2, "0");

    document.getElementById("hours").textContent =
        String(hours).padStart(2, "0");

    document.getElementById("minutes").textContent =
        String(minutes).padStart(2, "0");

    document.getElementById("seconds").textContent =
        String(seconds).padStart(2, "0");
}


// Start countdown
updateCountdown();

setInterval(updateCountdown, 1000);


/* =====================================================
   PHOTO SLIDER
   ===================================================== */

const slider = document.getElementById("slider");
const slides = document.getElementById("slides");

let currentSlide = 0;
let startX = 0;
let sliderStarted = false;
let slideTimer;


/* Show photo */

function showSlide() {

    slides.style.transform =
        `translateX(-${currentSlide * 100}%)`;

}


/* Start automatic slider */

function startSlider() {

    if (sliderStarted) return;

    sliderStarted = true;

    slideTimer = setInterval(function () {

        currentSlide++;

        if (currentSlide > 3) {
            currentSlide = 0;
        }

        showSlide();

    }, 4000);
}


/* Start slider only when it reaches the screen */

const observer = new IntersectionObserver(function(entries) {

    entries.forEach(function(entry) {

        if (entry.isIntersecting) {

            startSlider();

        }

    });

}, {
    threshold: 0.5
});


if (slider) {
    observer.observe(slider);
}


/* =====================================================
   SWIPE LEFT / RIGHT
   ===================================================== */

if (slider) {

    slider.addEventListener("touchstart", function(event) {

        startX = event.touches[0].clientX;

    });


    slider.addEventListener("touchend", function(event) {

        const endX =
            event.changedTouches[0].clientX;

        const difference =
            startX - endX;


        /* Swipe LEFT */

        if (difference > 50) {

            currentSlide++;

            if (currentSlide > 3) {
                currentSlide = 0;
            }

            showSlide();
        }


        /* Swipe RIGHT */

        if (difference < -50) {

            currentSlide--;

            if (currentSlide < 0) {
                currentSlide = 3;
            }

            showSlide();
        }

    });

}


/* =====================================================
   SMOOTH NAVIGATION
   ===================================================== */

document.querySelectorAll(".navbar a").forEach(function(link) {

    link.addEventListener("click", function(event) {

        const targetId =
            this.getAttribute("href");

        const target =
            document.querySelector(targetId);

        if (target) {

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth"
            });

        }

    });

});
