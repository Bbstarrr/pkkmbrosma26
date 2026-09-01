

const slides = document.querySelectorAll(".slide");

const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");


/* ==================================================
   SLIDE STATE
================================================== */

let currentSlide = 0;


/* ==================================================
   SHOW SLIDE
================================================== */

function showSlide(index) {

    if (index < 0) {
        index = slides.length - 1;
    }

    if (index >= slides.length) {
        index = 0;
    }

    slides.forEach((slide, i) => {

        slide.classList.toggle(
            "active",
            i === index
        );

    });

    currentSlide = index;
}


/* ==================================================
   NEXT SLIDE
================================================== */

function nextSlide() {
    showSlide(currentSlide + 1);
}


/* ==================================================
   PREVIOUS SLIDE
================================================== */

function previousSlide() {
    showSlide(currentSlide - 1);
}


/* ==================================================
   BUTTON
================================================== */

nextBtn.addEventListener(
    "click",
    nextSlide
);

prevBtn.addEventListener(
    "click",
    previousSlide
);


/* ==================================================
   KEYBOARD
================================================== */

document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "ArrowRight" ||
            event.key === " "
        ) {

            event.preventDefault();

            nextSlide();
        }


        if (event.key === "ArrowLeft") {

            event.preventDefault();

            previousSlide();
        }

    }
);


/* ==================================================
   TOUCH / SWIPE
================================================== */

let touchStartX = 0;
let touchEndX = 0;


document.addEventListener(
    "touchstart",
    function (event) {

        touchStartX =
            event.changedTouches[0].screenX;

    }
);


document.addEventListener(
    "touchend",
    function (event) {

        touchEndX =
            event.changedTouches[0].screenX;

        const difference =
            touchStartX - touchEndX;


        if (Math.abs(difference) > 50) {

            if (difference > 0) {

                nextSlide();

            } else {

                previousSlide();

            }

        }

    }
);

