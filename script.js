// ==============================
// PORTFOLIO JAVASCRIPT
// Bablu Kumar Portfolio
// ==============================

// Mobile Menu

const menuBtn = document.querySelector(".menu-btn");
const navbar = document.querySelector(".navbar");

menuBtn.addEventListener("click", () => {
    navbar.classList.toggle("active");
});

// Close menu after clicking a link

document.querySelectorAll(".navbar a").forEach(link => {

    link.addEventListener("click", () => {

        navbar.classList.remove("active");

    });

});

// ==============================
// Active Navbar on Scroll
// ==============================

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".navbar a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 120;
        const sectionHeight = section.clientHeight;

        if (pageYOffset >= sectionTop) {
            current = section.getAttribute("id");
        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }

    });

});

// ==============================
// Header Shadow
// ==============================

const header = document.querySelector(".header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {

        header.style.boxShadow = "0 10px 25px rgba(0,0,0,.4)";

    } else {

        header.style.boxShadow = "none";

    }

});
// ==============================
// SCROLL TO TOP BUTTON
// ==============================

const topBtn = document.querySelector(".top-btn");

window.addEventListener("scroll", () => {

    if (window.scrollY > 300) {
        topBtn.style.display = "flex";
    } else {
        topBtn.style.display = "none";
    }

});

// ==============================
// CONTACT FORM VALIDATION
// ==============================

const form = document.getElementById("contact-form");

form.addEventListener("submit", function(e){

    e.preventDefault();

    const name = form.querySelector("input[type='text']").value.trim();
    const email = form.querySelector("input[type='email']").value.trim();
    const message = form.querySelector("textarea").value.trim();

    if(name === ""){
        alert("Please enter your name.");
        return;
    }

    if(email === ""){
        alert("Please enter your email.");
        return;
    }

    if(!email.includes("@")){
        alert("Please enter a valid email.");
        return;
    }

    if(message === ""){
        alert("Please write your message.");
        return;
    }

    alert("Thank you! Your message has been submitted successfully.");

    form.reset();

});

// ==============================
// SMOOTH FADE-IN ANIMATION
// ==============================

const observer = new IntersectionObserver((entries)=>{

    entries.forEach((entry)=>{

        if(entry.isIntersecting){
            entry.target.classList.add("show");
        }

    });

},{
    threshold:0.2
});

document.querySelectorAll("section").forEach((section)=>{
    observer.observe(section);
});

// ==============================
// CURRENT YEAR IN FOOTER
// ==============================

const footerText = document.querySelector(".footer p");

footerText.innerHTML =
`© ${new Date().getFullYear()} Bablu Kumar | All Rights Reserved`;
