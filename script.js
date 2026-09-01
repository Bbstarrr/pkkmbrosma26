const slides = document.querySelectorAll(".slide");

const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");

const navigation = document.getElementById("navigation");

let currentSlide = 0;

let hideTimer;


/* =========================
   TAMPILKAN SLIDE
========================= */

function showSlide(index) {

    if (index >= slides.length) {
        currentSlide = 0;
    }

    else if (index < 0) {
        currentSlide = slides.length - 1;
    }

    else {
        currentSlide = index;
    }


    slides.forEach(function(slide) {
        slide.classList.remove("active");
    });


    slides[currentSlide].classList.add("active");
}


/* =========================
   NEXT
========================= */

function nextSlide() {
    showSlide(currentSlide + 1);
}


/* =========================
   PREVIOUS
========================= */

function prevSlide() {
    showSlide(currentSlide - 1);
}


/* =========================
   TOMBOL
========================= */

nextBtn.addEventListener("click", function() {
    nextSlide();
    showNavigation();
});

prevBtn.addEventListener("click", function() {
    prevSlide();
    showNavigation();
});


/* =========================
   KEYBOARD
========================= */

document.addEventListener("keydown", function(event) {

    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
        nextSlide();
        showNavigation();
    }

    if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
        prevSlide();
        showNavigation();
    }

    if (event.key === " ") {
        event.preventDefault();
        nextSlide();
        showNavigation();
    }

});


/* =========================
   NAVIGASI HILANG OTOMATIS
========================= */

function hideNavigation() {

    navigation.classList.add("hidden");

}


function showNavigation() {

    navigation.classList.remove("hidden");

    clearTimeout(hideTimer);

    hideTimer = setTimeout(function() {
        hideNavigation();
    }, 3000);

}


/* =========================
   MOUSE
========================= */

document.addEventListener("mousemove", function() {

    showNavigation();

});


/* =========================
   FULLSCREEN
   Tekan F
========================= */

document.addEventListener("keydown", function(event) {

    if (event.key.toLowerCase() === "f") {

        if (!document.fullscreenElement) {

            document.documentElement.requestFullscreen();

        }

        else {

            document.exitFullscreen();

        }

    }

});


/* =========================
   DOUBLE CLICK FULLSCREEN
========================= */

document.addEventListener("dblclick", function() {

    if (!document.fullscreenElement) {

        document.documentElement.requestFullscreen();

    }

    else {

        document.exitFullscreen();

    }

});


/* =========================
   MULAI
========================= */

showSlide(0);

showNavigation();