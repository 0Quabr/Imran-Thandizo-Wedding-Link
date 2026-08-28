/* =====================================================
   WEDDING WEBSITE
   COMPLETE SCRIPT.JS
   ===================================================== */


/* =====================================================
   1. WEDDING COUNTDOWN
   ===================================================== */

// CHANGE THIS TO THE REAL WEDDING DATE AND TIME
const weddingDate =
    new Date("2026-08-30T07:00:00").getTime();


function updateCountdown() {

    const now =
        new Date().getTime();

    const distance =
        weddingDate - now;


    /* ---------------------------------------------
       WHEN THE WEDDING DAY ARRIVES
       --------------------------------------------- */

    if (distance <= 0) {

        const countdown =
            document.querySelector(".countdown");

        countdown.innerHTML = `
            <div class="wedding-day-message">

                <div class="celebration-icon">
                    💍🎉
                </div>

                <h2>
                    THE BIG DAY IS HERE!
                </h2>

                <p>
                 LET'S CELEBRATE NDI M'BALEYU!!!!!
                </p>

            </div>
        `;

        return;
    }


    /* ---------------------------------------------
       CALCULATE REMAINING TIME
       --------------------------------------------- */

    const days =
        Math.floor(
            distance /
            (1000 * 60 * 60 * 24)
        );


    const hours =
        Math.floor(
            (distance %
                (1000 * 60 * 60 * 24)) /
            (1000 * 60 * 60)
        );


    const minutes =
        Math.floor(
            (distance %
                (1000 * 60 * 60)) /
            (1000 * 60)
        );


    const seconds =
        Math.floor(
            (distance %
                (1000 * 60)) /
            1000
        );


    /* ---------------------------------------------
       DISPLAY COUNTDOWN
       --------------------------------------------- */

    document.getElementById("days").textContent =
        String(days).padStart(2, "0");


    document.getElementById("hours").textContent =
        String(hours).padStart(2, "0");


    document.getElementById("minutes").textContent =
        String(minutes).padStart(2, "0");


    document.getElementById("seconds").textContent =
        String(seconds).padStart(2, "0");

}


/* Start countdown immediately */

updateCountdown();


/* Update every second */

const countdownTimer =
    setInterval(updateCountdown, 1000);

/* ================= PHOTO SLIDER ================= */

const slider = document.getElementById("slider");
const slides = document.getElementById("slides");

let currentSlide = 0;
let startX = 0;
let sliderStarted = false;


/* Show the current photo */

function showSlide() {

    slides.style.transform =
        `translateX(-${currentSlide * 25}%)`;

}


/* Start automatic sliding */

function startSlider() {

    if (sliderStarted) return;

    sliderStarted = true;

    setInterval(function () {

        currentSlide++;

        if (currentSlide > 3) {
            currentSlide = 0;
        }

        showSlide();

    }, 4000);
}


/* Start ONLY when the slider is reached */

if (slider) {

    const observer = new IntersectionObserver(
        function(entries) {

            entries.forEach(function(entry) {

                if (entry.isIntersecting) {
                    startSlider();
                }

            });

        },
        {
            threshold: 0.5
        }
    );

    observer.observe(slider);
}


/* ================= SWIPE ================= */

if (slider) {

    slider.addEventListener("touchstart", function(event) {

        startX = event.touches[0].clientX;

    });


    slider.addEventListener("touchend", function(event) {

        const endX = event.changedTouches[0].clientX;

        const difference = startX - endX;


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
   4. SMOOTH NAVIGATION
   ===================================================== */

document
    .querySelectorAll(".navbar a")
    .forEach(function(link) {

        link.addEventListener(
            "click",
            function(event) {

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

            }
        );

    });


/* ================= PHOTO SLIDER ================= */

document.addEventListener("DOMContentLoaded", function () {

    const slider = document.getElementById("slider");
    const slides = document.getElementById("slides");

    if (!slider || !slides) {
        return;
    }

    let currentSlide = 0;
    let sliderStarted = false;
    let startX = 0;


    /* Show a photo */

    function showSlide() {

        slides.style.transform =
            "translateX(-" + (currentSlide * 100) + "%)";

    }


    /* Automatically change photos */

    function startSlider() {

        if (sliderStarted) {
            return;
        }

        sliderStarted = true;

        setInterval(function () {

            currentSlide++;

            if (currentSlide >= 4) {
                currentSlide = 0;
            }

            showSlide();

        }, 4000);

    }


    /* Start when the slider reaches the screen */

    const observer = new IntersectionObserver(function (entries) {

        if (entries[0].isIntersecting) {

            startSlider();

        }

    }, {
        threshold: 0.3
    });


    observer.observe(slider);


    /* ================= SWIPE ================= */

    slider.addEventListener("touchstart", function (event) {

        startX = event.touches[0].clientX;

    });


    slider.addEventListener("touchend", function (event) {

        const endX = event.changedTouches[0].clientX;

        const difference = startX - endX;


        /* Swipe LEFT */

        if (difference > 50) {

            currentSlide++;

            if (currentSlide >= 4) {
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

});
