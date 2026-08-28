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


/* =====================================================
   2. PHOTO SLIDER
   ===================================================== */

const slider =
    document.getElementById("slider");

const slides =
    document.getElementById("slides");


let currentSlide = 0;

let startX = 0;

let sliderStarted = false;

let slideTimer;


/* ---------------------------------------------
   SHOW CURRENT PHOTO
   --------------------------------------------- */

function showSlide() {

    slides.style.transform =
        `translateX(-${currentSlide * 100}%)`;

}


/* ---------------------------------------------
   START AUTOMATIC SLIDING
   --------------------------------------------- */

function startSlider() {

    if (sliderStarted) {
        return;
    }

    sliderStarted = true;


    slideTimer =
        setInterval(function() {

            currentSlide++;

            /* After photo 4, return to photo 1 */

            if (currentSlide > 3) {
                currentSlide = 0;
            }

            showSlide();

        }, 4000);

}


/* ---------------------------------------------
   START SLIDER WHEN GALLERY IS REACHED
   --------------------------------------------- */

if (slider) {

    const observer =
        new IntersectionObserver(
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


/* =====================================================
   3. SWIPE LEFT / RIGHT
   ===================================================== */

if (slider) {


    /* ---------------------------------------------
       TOUCH START
       --------------------------------------------- */

    slider.addEventListener(
        "touchstart",
        function(event) {

            startX =
                event.touches[0].clientX;

        }
    );


    /* ---------------------------------------------
       TOUCH END
       --------------------------------------------- */

    slider.addEventListener(
        "touchend",
        function(event) {

            const endX =
                event.changedTouches[0].clientX;


            const difference =
                startX - endX;


            /* -------------------------------------
               SWIPE LEFT → NEXT PHOTO
               ------------------------------------- */

            if (difference > 50) {

                currentSlide++;


                if (currentSlide > 3) {
                    currentSlide = 0;
                }


                showSlide();

            }


            /* -------------------------------------
               SWIPE RIGHT → PREVIOUS PHOTO
               ------------------------------------- */

            if (difference < -50) {

                currentSlide--;


                if (currentSlide < 0) {
                    currentSlide = 3;
                }


                showSlide();

            }

        }
    );

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
