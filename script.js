// =========================================
// INSTAGRAM-STYLE PORTFOLIO
// JAVASCRIPT PART 1
// =========================================


// =========================================
// MOBILE MENU
// =========================================

const menuIcon = document.querySelector(".menu-icon");

if (menuIcon) {

    menuIcon.addEventListener("click", () => {

        alert("Menu feature coming soon!");

    });

}


// =========================================
// SMOOTH SCROLL
// =========================================

const navigationLinks = document.querySelectorAll(
    'a[href^="#"]'
);

navigationLinks.forEach(link => {

    link.addEventListener("click", function(event) {

        const targetId = this.getAttribute("href");

        if (
            targetId &&
            targetId !== "#"
        ) {

            const target = document.querySelector(targetId);

            if (target) {

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        }

    });

});


// =========================================
// BACK TO TOP
// =========================================

const backToTop = document.querySelector(".back-to-top");

if (backToTop) {

    window.addEventListener("scroll", () => {

        if (window.scrollY > 400) {

            backToTop.style.opacity = "1";
            backToTop.style.pointerEvents = "auto";

        } else {

            backToTop.style.opacity = "0";
            backToTop.style.pointerEvents = "none";

        }

    });

}
// =========================================
// JAVASCRIPT PART 2
// SCROLL ANIMATION + ACTIVE SECTION
// + CONTACT FORM VALIDATION
// =========================================


// =========================================
// SCROLL REVEAL ANIMATION
// =========================================

const sections = document.querySelectorAll(
    ".content-section, .about, .highlights, .contact-section"
);

const revealSections = () => {

    sections.forEach(section => {

        const sectionTop =
            section.getBoundingClientRect().top;

        const windowHeight = window.innerHeight;

        if (sectionTop < windowHeight - 80) {

            section.classList.add("show");

        }

    });

};

window.addEventListener("scroll", revealSections);

revealSections();


// =========================================
// ACTIVE SECTION
// =========================================

const allSections = document.querySelectorAll(
    "section[id]"
);

const allNavLinks = document.querySelectorAll(
    'a[href^="#"]'
);

window.addEventListener("scroll", () => {

    let currentSection = "";

    allSections.forEach(section => {

        const sectionTop =
            section.offsetTop - 150;

        const sectionHeight =
            section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {

            currentSection = section.getAttribute("id");

        }

    });

    allNavLinks.forEach(link => {

        link.classList.remove("active");

        if (
            link.getAttribute("href") ===
            "#" + currentSection
        ) {

            link.classList.add("active");

        }

    });

});


// =========================================
// CONTACT FORM
// =========================================

const contactForm =
    document.getElementById("contact-form");

if (contactForm) {

    contactForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();

            const name =
                document.getElementById("name").value.trim();

            const email =
                document.getElementById("email").value.trim();

            const message =
                document.getElementById("message").value.trim();


            // Check Name

            if (name.length < 2) {

                alert("Please enter your name.");

                return;

            }


            // Check Email

            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailPattern.test(email)) {

                alert("Please enter a valid email address.");

                return;

            }


            // Check Message

            if (message.length < 5) {

                alert("Please write a message.");

                return;

            }


            // Success

            alert(
                "Thank you " +
                name +
                "! Your message has been submitted."
            );


            contactForm.reset();

        }
    );

}
// =========================================
// JAVASCRIPT PART 3
// MOBILE MENU + HIGHLIGHT INTERACTION
// =========================================


// =========================================
// MOBILE MENU
// =========================================

const menuIcon = document.querySelector(".menu-icon");

const navMenu = document.querySelector(".navbar");

if (menuIcon && navMenu) {

    menuIcon.addEventListener("click", () => {

        navMenu.classList.toggle("active");

        menuIcon.classList.toggle("active");

    });


    // Menu link click hone par menu close

    const menuLinks =
        navMenu.querySelectorAll("a");

    menuLinks.forEach(link => {

        link.addEventListener("click", () => {

            navMenu.classList.remove("active");

            menuIcon.classList.remove("active");

        });

    });

}


// =========================================
// HIGHLIGHT CLICK EFFECT
// =========================================

const highlights =
    document.querySelectorAll(".highlight");

highlights.forEach(item => {

    item.addEventListener("click", () => {

        highlights.forEach(highlight => {

            highlight.classList.remove("selected");

        });

        item.classList.add("selected");

    });

});


// =========================================
// BUTTON CLICK EFFECT
// =========================================

const buttons =
    document.querySelectorAll(
        ".profile-buttons a, .contact-form button"
    );

buttons.forEach(button => {

    button.addEventListener("click", () => {

        button.style.transform = "scale(0.96)";

        setTimeout(() => {

            button.style.transform = "";

        }, 120);

    });

});


// =========================================
// PAGE LOADED EFFECT
// =========================================

window.addEventListener("load", () => {

    document.body.classList.add("loaded");

});
// =========================================
// JAVASCRIPT PART 4
// FINAL POLISH + TYPING EFFECT
// =========================================


// =========================================
// TYPING EFFECT
// =========================================

const profileTitle =
    document.querySelector(".profile-title");

if (profileTitle) {

    const text = "Frontend Developer";

    let index = 0;

    profileTitle.textContent = "";

    function typeText() {

        if (index < text.length) {

            profileTitle.textContent +=
                text.charAt(index);

            index++;

            setTimeout(typeText, 80);

        }

    }

    typeText();

}


// =========================================
// PROFILE INTRO ANIMATION
// =========================================

const profile =
    document.querySelector(".profile");

if (profile) {

    profile.style.opacity = "0";
    profile.style.transform = "translateY(20px)";
    profile.style.transition = "all 0.7s ease";

    setTimeout(() => {

        profile.style.opacity = "1";
        profile.style.transform = "translateY(0)";

    }, 150);

}


// =========================================
// SOCIAL ICON HOVER EFFECT
// =========================================

const socialIcons =
    document.querySelectorAll(
        ".social-section a, .footer-social a"
    );

socialIcons.forEach(icon => {

    icon.addEventListener("mouseenter", () => {

        icon.style.transform =
            "translateY(-4px) scale(1.08)";

    });

    icon.addEventListener("mouseleave", () => {

        icon.style.transform = "";

    });

});


// =========================================
// CURRENT YEAR
// =========================================

const footerText =
    document.querySelector(".footer p");

if (footerText) {

    const currentYear =
        new Date().getFullYear();

    footerText.innerHTML =
        `© ${currentYear} Bablu Kumar. All Rights Reserved.`;

}


// =========================================
// PAGE LOADED
// =========================================

document.addEventListener("DOMContentLoaded", () => {

    document.body.classList.add("portfolio-ready");

});
