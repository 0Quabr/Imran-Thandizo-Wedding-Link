/* =====================================================
   WEDDING WEBSITE - SCRIPT.JS
   ===================================================== */


/* ================= WEDDING DATE ================= */

/*
   Change this date and time to the actual
   wedding date and time.

   Format:
   YYYY-MM-DDTHH:MM:SS
*/

const weddingDate = new Date("2026-08-30T07:00:00").getTime();


/* ================= COUNTDOWN ================= */

const countdown = setInterval(function () {

    // Get the current date and time
    const now = new Date().getTime();

    // Calculate the remaining time
    const distance = weddingDate - now;


    /* ================= TIME CALCULATION ================= */

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


    /* ================= DISPLAY ================= */

    document.getElementById("days").textContent =
        String(days).padStart(2, "0");

    document.getElementById("hours").textContent =
        String(hours).padStart(2, "0");

    document.getElementById("minutes").textContent =
        String(minutes).padStart(2, "0");

    document.getElementById("seconds").textContent =
        String(seconds).padStart(2, "0");


    /* ================= WEDDING DAY ================= */

    if (distance < 0) {

        clearInterval(countdown);

        document.querySelector(".countdown").innerHTML = `
            <div class="wedding-day-message">
                🎉
                <strong>THE BIG DAY IS HERE!</strong>
                <span>Let's cerebrate ndi M'baleyuuuh  💍</span>
            </div>
        `;
    }

}, 1000);


/* =====================================================
   SMOOTH NAVIGATION
   ===================================================== */

document.querySelectorAll('.navbar a').forEach(function (link) {

    link.addEventListener('click', function (event) {

        const targetId = this.getAttribute('href');

        const target = document.querySelector(targetId);

        if (target) {

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth"
            });

        }

    });

});


/* =====================================================
   SIMPLE SCROLL REVEAL
   ===================================================== */

const revealElements = document.querySelectorAll(
    ".detail-card, .program-card, .section-heading"
);


const observer = new IntersectionObserver(
    function (entries) {

        entries.forEach(function (entry) {

            if (entry.isIntersecting) {

                entry.target.style.opacity = "1";

                entry.target.style.transform =
                    "translateY(0)";

                observer.unobserve(entry.target);
            }

        });

    },
    {
        threshold: 0.15
    }
);


/* ================= INITIAL STATE ================= */

revealElements.forEach(function (element) {

    element.style.opacity = "0";

    element.style.transform =
        "translateY(30px)";

    element.style.transition =
        "opacity 0.8s ease, transform 0.8s ease";

    observer.observe(element);

});

