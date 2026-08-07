/* ===========================
   TYPING EFFECT
=========================== */

const typing = document.getElementById("typing");

const words = [
    "Frontend Developer",
    "Web Designer",
    "JavaScript Developer",
    "UI/UX Enthusiast"
];

let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {

    const currentWord = words[wordIndex];

    if (!deleting) {

        typing.textContent = currentWord.substring(0, charIndex++);

        if (charIndex > currentWord.length) {

            deleting = true;

            setTimeout(typeEffect, 1500);

            return;
        }

    } else {

        typing.textContent = currentWord.substring(0, charIndex--);

        if (charIndex < 0) {

            deleting = false;

            wordIndex++;

            if (wordIndex >= words.length) {

                wordIndex = 0;

            }

        }

    }

    setTimeout(typeEffect, deleting ? 50 : 120);

}

typeEffect();



/* ===========================
   ACTIVE MENU
=========================== */

const navLinks = document.querySelectorAll("nav a");

navLinks.forEach(link => {

    link.addEventListener("click", () => {

        navLinks.forEach(item => item.classList.remove("active"));

        link.classList.add("active");

    });

});
/* ===========================
   THEME TOGGLE
=========================== */

const themeBtn = document.querySelector(".theme-btn");

themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("light-theme");

    if(document.body.classList.contains("light-theme")){

        themeBtn.classList.remove("fa-moon");
        themeBtn.classList.add("fa-sun");

    }else{

        themeBtn.classList.remove("fa-sun");
        themeBtn.classList.add("fa-moon");

    }

});


/* ===========================
   HEADER SHADOW
=========================== */

window.addEventListener("scroll", () => {

    const header = document.querySelector("header");

    if(window.scrollY > 80){

        header.style.boxShadow = "0 5px 25px rgba(0,212,255,.25)";

    }else{

        header.style.boxShadow = "none";

    }

});


/* ===========================
   SCROLL REVEAL ANIMATION
=========================== */

const revealElements = document.querySelectorAll(
".about,.skills,.services,.projects,.education,.certificates,.contact"
);

function revealSection(){

    revealElements.forEach((section)=>{

        const windowHeight = window.innerHeight;

        const top = section.getBoundingClientRect().top;

        if(top < windowHeight - 120){

            section.style.opacity = "1";
            section.style.transform = "translateY(0px)";

        }

    });

}

revealElements.forEach(section=>{

    section.style.opacity="0";
    section.style.transform="translateY(80px)";
    section.style.transition="all .8s ease";

});

window.addEventListener("scroll",revealSection);

revealSection();


/* ===========================
   SKILL BAR ANIMATION
=========================== */

const bars = document.querySelectorAll(".progress span");

function animateBars(){

    bars.forEach(bar=>{

        const value = bar.style.width;

        bar.style.width="0";

        setTimeout(()=>{

            bar.style.width=value;

        },300);

    });

}

animateBars();
