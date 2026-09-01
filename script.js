const slides = document.querySelectorAll(".slide");

const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const navigation = document.querySelector(".navigation");

let currentSlide = 0;
let hideTimer;


// ===============================
// TAMPILKAN SLIDE
// ===============================

function showSlide(index) {

    if (index < 0) {
        index = slides.length - 1;
    }

    if (index >= slides.length) {
        index = 0;
    }

    slides.forEach((slide, i) => {
        slide.classList.toggle("active", i === index);
    });

    currentSlide = index;

    // Setiap pindah slide, kembali ke bagian atas
    slides[currentSlide].scrollTop = 0;

    showNavigation();
}


// ===============================
// SLIDE BERIKUTNYA
// ===============================

function nextSlide() {
    showSlide(currentSlide + 1);
}


// ===============================
// SLIDE SEBELUMNYA
// ===============================

function previousSlide() {
    showSlide(currentSlide - 1);
}


// ===============================
// TOMBOL NAVIGASI
// ===============================

nextBtn.addEventListener("click", function () {
    nextSlide();
});

prevBtn.addEventListener("click", function () {
    previousSlide();
});


// ===============================
// AUTO HIDE TOMBOL
// ===============================

function showNavigation() {

    navigation.classList.remove("hide");

    clearTimeout(hideTimer);

    hideTimer = setTimeout(function () {
        navigation.classList.add("hide");
    }, 3000);
}


// ===============================
// MOUSE BERGERAK
// ===============================

document.addEventListener("mousemove", function () {
    showNavigation();
});


// ===============================
// MOUSE MASUK TOMBOL
// ===============================

navigation.addEventListener("mouseenter", function () {

    clearTimeout(hideTimer);

    navigation.classList.remove("hide");
});

navigation.addEventListener("mouseleave", function () {

    showNavigation();
});


// ===============================
// KEYBOARD
// ===============================

document.addEventListener("keydown", function (event) {

    // KANAN → SLIDE BERIKUTNYA
    if (event.key === "ArrowRight") {

        event.preventDefault();

        nextSlide();
    }


    // KIRI → SLIDE SEBELUMNYA
    else if (event.key === "ArrowLeft") {

        event.preventDefault();

        previousSlide();
    }


    // SPACE → SLIDE BERIKUTNYA
    else if (event.key === " ") {

        event.preventDefault();

        nextSlide();
    }


    // PANAH BAWAH → SCROLL KE BAWAH
    else if (event.key === "ArrowDown") {

        event.preventDefault();

        slides[currentSlide].scrollBy({
            top: 150,
            behavior: "smooth"
        });
    }


    // PANAH ATAS → SCROLL KE ATAS
    else if (event.key === "ArrowUp") {

        event.preventDefault();

        slides[currentSlide].scrollBy({
            top: -150,
            behavior: "smooth"
        });
    }


    // HOME → KE ATAS
    else if (event.key === "Home") {

        event.preventDefault();

        slides[currentSlide].scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }


    // END → KE BAWAH
    else if (event.key === "End") {

        event.preventDefault();

        slides[currentSlide].scrollTo({
            top: slides[currentSlide].scrollHeight,
            behavior: "smooth"
        });
    }

    showNavigation();
});


// ===============================
// MOUSE WHEEL
// ===============================

document.addEventListener("wheel", function (event) {

    const activeSlide = slides[currentSlide];

    // Cek apakah isi slide memang lebih tinggi
    const canScroll =
        activeSlide.scrollHeight >
        activeSlide.clientHeight;

    if (canScroll) {

        activeSlide.scrollTop += event.deltaY;
    }

    showNavigation();
}, {
    passive: true
});


// ===============================
// SWIPE HP
// ===============================

let touchStartX = 0;
let touchStartY = 0;

let touchEndX = 0;
let touchEndY = 0;


document.addEventListener("touchstart", function (event) {

    touchStartX =
        event.changedTouches[0].screenX;

    touchStartY =
        event.changedTouches[0].screenY;

    showNavigation();
});


document.addEventListener("touchend", function (event) {

    touchEndX =
        event.changedTouches[0].screenX;

    touchEndY =
        event.changedTouches[0].screenY;


    const differenceX =
        touchStartX - touchEndX;

    const differenceY =
        touchStartY - touchEndY;


    // Pastikan swipe lebih dominan horizontal
    if (
        Math.abs(differenceX) > 50 &&
        Math.abs(differenceX) > Math.abs(differenceY)
    ) {

        if (differenceX > 0) {

            // Swipe kiri
            nextSlide();

        } else {

            // Swipe kanan
            previousSlide();
        }
    }

    showNavigation();
});



showSlide(currentSlide);