/* =========================================================
   BABLU KUMAR — PORTFOLIO V6.0
   JAVASCRIPT PART 1
   NAVBAR + HEADER + BACK TO TOP
   ========================================================= */


/* ================= SELECT ELEMENTS ================= */

const menuIcon = document.querySelector(".menu-icon");
const navbar = document.querySelector(".navbar");
const menuIconElement = document.querySelector(".menu-icon i");

const header = document.querySelector(".header");
const backToTop = document.querySelector(".back-to-top");

const navLinks = document.querySelectorAll(".navbar a");


/* =========================================================
   MOBILE MENU
   ========================================================= */

if (menuIcon && navbar) {

    menuIcon.addEventListener("click", () => {

        navbar.classList.toggle("active");


        /* Change menu icon */

        if (navbar.classList.contains("active")) {

            menuIconElement.classList.remove("fa-bars");

            menuIconElement.classList.add("fa-xmark");

        } else {

            menuIconElement.classList.remove("fa-xmark");

            menuIconElement.classList.add("fa-bars");

        }

    });

}


/* =========================================================
   CLOSE MOBILE MENU AFTER CLICKING NAV LINK
   ========================================================= */

navLinks.forEach(link => {

    link.addEventListener("click", () => {

        if (!navbar) return;

        navbar.classList.remove("active");


        if (menuIconElement) {

            menuIconElement.classList.remove("fa-xmark");

            menuIconElement.classList.add("fa-bars");

        }

    });

});


/* =========================================================
   HEADER SCROLL EFFECT
   ========================================================= */

function updateHeader() {

    if (!header) return;


    if (window.scrollY > 50) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

}


window.addEventListener("scroll", updateHeader);


/* Run once when page loads */

updateHeader();


/* =========================================================
   ACTIVE NAVIGATION LINK
   ========================================================= */

const sections = document.querySelectorAll("section[id]");


function updateActiveNavigation() {

    const scrollPosition = window.scrollY + 180;


    sections.forEach(section => {

        const sectionTop = section.offsetTop;

        const sectionHeight = section.offsetHeight;

        const sectionId = section.getAttribute("id");


        if (
            scrollPosition >= sectionTop &&
            scrollPosition < sectionTop + sectionHeight
        ) {

            navLinks.forEach(link => {

                link.classList.remove("active");


                const targetLink = document.querySelector(
                    `.navbar a[href="#${sectionId}"]`
                );


                if (targetLink) {

                    targetLink.classList.add("active");

                }

            });

        }

    });

}


window.addEventListener("scroll", updateActiveNavigation);


/* =========================================================
   BACK TO TOP BUTTON
   ========================================================= */

function updateBackToTop() {

    if (!backToTop) return;


    if (window.scrollY > 500) {

        backToTop.classList.add("show");

    } else {

        backToTop.classList.remove("show");

    }

}


window.addEventListener("scroll", updateBackToTop);


/* Run once */

updateBackToTop();


/* =========================================================
   SMOOTH BACK TO TOP
   ========================================================= */

if (backToTop) {

    backToTop.addEventListener("click", event => {

        event.preventDefault();


        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    });

}


/* =========================================================
   JAVASCRIPT PART 1 END
   ========================================================= */
/* =========================================================
   BABLU KUMAR — PORTFOLIO V6.0
   JAVASCRIPT PART 2
   TYPING + SKILLS + FAQ + CURSOR
   ========================================================= */


/* =========================================================
   TYPING ANIMATION
   ========================================================= */

const typingText = document.querySelector(".typing-text");

const typingWords = [
    "Web Designer",
    "Front-End Developer",
    "Creative Coder",
    "UI Enthusiast"
];

let wordIndex = 0;
let characterIndex = 0;
let isDeleting = false;


function typeEffect() {

    if (!typingText) return;


    const currentWord = typingWords[wordIndex];


    if (isDeleting) {

        characterIndex--;

    } else {

        characterIndex++;

    }


    typingText.textContent =
        currentWord.substring(0, characterIndex);


    let typingSpeed = isDeleting ? 55 : 100;


    /* Pause after completing a word */

    if (!isDeleting && characterIndex === currentWord.length) {

        typingSpeed = 1500;

        isDeleting = true;

    }


    /* Move to next word */

    else if (isDeleting && characterIndex === 0) {

        isDeleting = false;

        wordIndex++;

        if (wordIndex >= typingWords.length) {

            wordIndex = 0;

        }

        typingSpeed = 400;

    }


    setTimeout(typeEffect, typingSpeed);

}


/* Start typing */

typeEffect();



/* =========================================================
   SKILL BAR ANIMATION
   ========================================================= */

const skillSection = document.querySelector("#skills");

const skillProgressBars =
    document.querySelectorAll(".skill-progress");

let skillsAnimated = false;


function animateSkills() {

    if (!skillSection || skillsAnimated) return;


    const sectionPosition =
        skillSection.getBoundingClientRect().top;


    const screenHeight =
        window.innerHeight;


    if (sectionPosition < screenHeight * 0.85) {

        skillProgressBars.forEach(bar => {

            /*
             * Width is already defined in CSS.
             * We temporarily set it to zero and
             * then restore the CSS value.
             */

            const targetWidth =
                getComputedStyle(bar).width;


            bar.style.width = "0";


            setTimeout(() => {

                bar.style.width = targetWidth;

            }, 100);

        });


        skillsAnimated = true;

    }

}


window.addEventListener("scroll", animateSkills);

animateSkills();



/* =========================================================
   FAQ ACCORDION
   ========================================================= */

const faqItems =
    document.querySelectorAll(".faq-item");


faqItems.forEach(item => {

    const question =
        item.querySelector(".faq-question");

    const answer =
        item.querySelector(".faq-answer");


    if (!question || !answer) return;


    question.addEventListener("click", () => {


        const isActive =
            item.classList.contains("active");


        /* Close all other FAQ items */

        faqItems.forEach(otherItem => {

            otherItem.classList.remove("active");


            const otherAnswer =
                otherItem.querySelector(".faq-answer");


            if (otherAnswer) {

                otherAnswer.style.maxHeight = null;

            }

        });


        /* Open selected FAQ */

        if (!isActive) {

            item.classList.add("active");

            answer.style.maxHeight =
                answer.scrollHeight + "px";

        }

    });

});



/* =========================================================
   CUSTOM CURSOR
   ========================================================= */

const cursor =
    document.querySelector(".cursor");

const cursorDot =
    document.querySelector(".cursor-dot");


/*
 * Custom cursor is useful on desktop.
 * It is hidden on mobile through CSS.
 */

if (cursor && cursorDot) {

    document.addEventListener("mousemove", event => {

        cursor.style.left =
            event.clientX + "px";

        cursor.style.top =
            event.clientY + "px";


        cursorDot.style.left =
            event.clientX + "px";

        cursorDot.style.top =
            event.clientY + "px";

    });


    /* Interactive hover effect */

    const interactiveElements =
        document.querySelectorAll(
            "a, button, input, textarea, .project-card, .skill-card"
        );


    interactiveElements.forEach(element => {

        element.addEventListener("mouseenter", () => {

            document.body.classList.add("cursor-hover");

        });


        element.addEventListener("mouseleave", () => {

            document.body.classList.remove("cursor-hover");

        });

    });

}



/* =========================================================
   JAVASCRIPT PART 2 END
   ========================================================= */
/* =========================================================
   BABLU KUMAR — PORTFOLIO V6.0
   JAVASCRIPT PART 3 — FINAL
   FORM + REVEAL + YEAR + IMAGE EFFECTS
   ========================================================= */


/* =========================================================
   CONTACT FORM VALIDATION
   ========================================================= */

const contactForm =
    document.querySelector("#contact-form");


if (contactForm) {

    contactForm.addEventListener("submit", function (event) {

        event.preventDefault();


        const name =
            document.querySelector("#name");

        const email =
            document.querySelector("#email");

        const subject =
            document.querySelector("#subject");

        const message =
            document.querySelector("#message");


        /* Basic validation */

        if (
            !name.value.trim() ||
            !email.value.trim() ||
            !subject.value.trim() ||
            !message.value.trim()
        ) {

            showFormMessage(
                "Please fill in all fields.",
                "error"
            );

            return;

        }


        /* Email validation */

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


        if (!emailPattern.test(email.value.trim())) {

            showFormMessage(
                "Please enter a valid email address.",
                "error"
            );

            email.focus();

            return;

        }


        /*
         * Demo form:
         * This does not send an email to a real inbox.
         * A backend/email service can be connected later.
         */

        showFormMessage(
            "Thank you! Your message is ready to be sent.",
            "success"
        );


        contactForm.reset();

    });

}


/* =========================================================
   FORM MESSAGE
   ========================================================= */

function showFormMessage(text, type) {

    let formMessage =
        document.querySelector(".form-message");


    /* Create message if it doesn't exist */

    if (!formMessage) {

        formMessage =
            document.createElement("div");

        formMessage.className =
            "form-message";

        contactForm.appendChild(formMessage);

    }


    formMessage.textContent = text;

    formMessage.className =
        "form-message " + type;


    /* Remove message automatically */

    setTimeout(() => {

        formMessage.classList.remove(type);

    }, 5000);

}



/* =========================================================
   ADD FORM MESSAGE STYLING
   ========================================================= */

const formMessageStyle =
    document.createElement("style");


formMessageStyle.textContent = `

    .form-message {

        margin-top: 15px;

        padding: 12px 15px;

        border-radius: 10px;

        font-size: 12px;

        text-align: center;

        opacity: 0;

        transform: translateY(8px);

        transition: 0.3s ease;

    }


    .form-message.success {

        opacity: 1;

        transform: translateY(0);

        color: #7dd3fc;

        background: rgba(22, 131, 255, 0.08);

        border: 1px solid rgba(22, 131, 255, 0.20);

    }


    .form-message.error {

        opacity: 1;

        transform: translateY(0);

        color: #ff9a9a;

        background: rgba(255, 70, 70, 0.07);

        border: 1px solid rgba(255, 70, 70, 0.15);

    }

`;


document.head.appendChild(formMessageStyle);



/* =========================================================
   AUTOMATIC CURRENT YEAR
   ========================================================= */

const currentYear =
    document.querySelector("#current-year");


if (currentYear) {

    currentYear.textContent =
        new Date().getFullYear();

}



/* =========================================================
   SCROLL REVEAL ANIMATION
   ========================================================= */

const revealElements =
    document.querySelectorAll(
        ".section-heading, " +
        ".about-image, " +
        ".about-content, " +
        ".skill-card, " +
        ".project-card, " +
        ".education-item, " +
        ".certificate-card, " +
        ".contact-card, " +
        ".contact-form-container, " +
        ".faq-item"
    );


/* Add reveal class */

revealElements.forEach(element => {

    element.classList.add("reveal");

});


/* Add reveal CSS */

const revealStyle =
    document.createElement("style");


revealStyle.textContent = `

    .reveal {

        opacity: 0;

        transform: translateY(35px);

        transition:
            opacity 0.7s ease,
            transform 0.7s ease;

    }


    .reveal.reveal-show {

        opacity: 1;

        transform: translateY(0);

    }

`;


document.head.appendChild(revealStyle);



/* =========================================================
   REVEAL OBSERVER
   ========================================================= */

const revealObserver =
    new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "reveal-show"
                    );


                    observer.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: 0.12
        }
    );


revealElements.forEach(element => {

    revealObserver.observe(element);

});



/* =========================================================
   STAGGER CARD ANIMATION
   ========================================================= */

const cardGroups = [
    ".skills-container .skill-card",
    ".projects-container .project-card",
    ".certificates-container .certificate-card",
    ".faq-container .faq-item"
];


cardGroups.forEach(selector => {

    const cards =
        document.querySelectorAll(selector);


    cards.forEach((card, index) => {

        card.style.transitionDelay =
            `${index * 0.08}s`;

    });

});



/* =========================================================
   IMAGE LOADING EFFECT
   ========================================================= */

const portfolioImages =
    document.querySelectorAll("img");


portfolioImages.forEach(image => {

    image.addEventListener("load", () => {

        image.classList.add("image-loaded");

    });


    /*
     * If image is already cached,
     * trigger the effect immediately.
     */

    if (image.complete) {

        image.classList.add("image-loaded");

    }

});


/* Image effect CSS */

const imageStyle =
    document.createElement("style");


imageStyle.textContent = `

    img {

        transition:
            opacity 0.5s ease,
            transform 0.5s ease;

    }


    img.image-loaded {

        opacity: 1;

    }

`;


document.head.appendChild(imageStyle);



/* =========================================================
   PROJECT LINK SAFETY
   ========================================================= */

const projectLinks =
    document.querySelectorAll(
        ".project-overlay a, .certificate-link"
    );


projectLinks.forEach(link => {

    link.addEventListener("click", event => {

        const href =
            link.getAttribute("href");


        /*
         * Prevent empty "#" links from
         * jumping to the top.
         */

        if (!href || href === "#") {

            event.preventDefault();

        }

    });

});



/* =========================================================
   RESIZE HANDLING
   ========================================================= */

window.addEventListener("resize", () => {

    /*
     * Close mobile menu when switching
     * to a larger screen.
     */

    if (window.innerWidth > 900) {

        if (navbar) {

            navbar.classList.remove("active");

        }


        if (menuIconElement) {

            menuIconElement.classList.remove(
                "fa-xmark"
            );

            menuIconElement.classList.add(
                "fa-bars"
            );

        }

    }

});



/* =========================================================
   PORTFOLIO READY
   ========================================================= */

console.log(
    "Bablu Kumar Portfolio V6.0 — Loaded Successfully 🚀"
);


/* =========================================================
   JAVASCRIPT V6.0 COMPLETE
   ========================================================= */
/* =========================================================
   BABLU KUMAR PORTFOLIO V6.1
   JAVASCRIPT PART 1
   ADVANCED NAVIGATION + SCROLL
   ========================================================= */


/* =========================================================
   SELECT ELEMENTS
   ========================================================= */

const v61Header =
    document.querySelector(".header");

const v61Navbar =
    document.querySelector(".navbar");

const v61MenuIcon =
    document.querySelector(".menu-icon");

const v61MenuIconElement =
    document.querySelector(".menu-icon i");

const v61NavLinks =
    document.querySelectorAll(".navbar a");


/* =========================================================
   MOBILE MENU
   ========================================================= */

if (
    v61MenuIcon &&
    v61Navbar
) {

    v61MenuIcon.addEventListener(
        "click",
        () => {

            const isOpen =
                v61Navbar.classList.toggle(
                    "active"
                );


            if (v61MenuIconElement) {

                v61MenuIconElement.classList.toggle(
                    "fa-bars",
                    !isOpen
                );

                v61MenuIconElement.classList.toggle(
                    "fa-xmark",
                    isOpen
                );

            }

        }
    );

}


/* =========================================================
   CLOSE MENU WHEN NAV LINK IS CLICKED
   ========================================================= */

v61NavLinks.forEach(link => {

    link.addEventListener(
        "click",
        () => {

            if (!v61Navbar) return;


            v61Navbar.classList.remove(
                "active"
            );


            if (v61MenuIconElement) {

                v61MenuIconElement.classList.remove(
                    "fa-xmark"
                );

                v61MenuIconElement.classList.add(
                    "fa-bars"
                );

            }

        }
    );

});


/* =========================================================
   HEADER SCROLL STATE
   ========================================================= */

function v61UpdateHeader() {

    if (!v61Header) return;


    if (window.scrollY > 30) {

        v61Header.classList.add(
            "scrolled"
        );

    } else {

        v61Header.classList.remove(
            "scrolled"
        );

    }

}


window.addEventListener(
    "scroll",
    v61UpdateHeader,
    { passive: true }
);


v61UpdateHeader();


/* =========================================================
   ACTIVE NAVIGATION
   ========================================================= */

const v61Sections =
    document.querySelectorAll(
        "section[id]"
    );


function v61UpdateActiveLink() {

    const currentPosition =
        window.scrollY + 200;


    let currentSection = "";


    v61Sections.forEach(section => {

        const sectionTop =
            section.offsetTop;

        const sectionHeight =
            section.offsetHeight;


        if (
            currentPosition >= sectionTop &&
            currentPosition <
                sectionTop + sectionHeight
        ) {

            currentSection =
                section.getAttribute("id");

        }

    });


    v61NavLinks.forEach(link => {

        link.classList.remove(
            "active"
        );


        const href =
            link.getAttribute("href");


        if (
            href ===
            `#${currentSection}`
        ) {

            link.classList.add(
                "active"
            );

        }

    });

}


window.addEventListener(
    "scroll",
    v61UpdateActiveLink,
    { passive: true }
);


v61UpdateActiveLink();


/* =========================================================
   SMOOTH SCROLL
   ========================================================= */

v61NavLinks.forEach(link => {

    link.addEventListener(
        "click",
        event => {

            const targetId =
                link.getAttribute("href");


            if (
                !targetId ||
                targetId === "#"
            ) {
                return;
            }


            const target =
                document.querySelector(
                    targetId
                );


            if (!target) return;


            event.preventDefault();


            const headerHeight =
                v61Header
                    ? v61Header.offsetHeight
                    : 0;


            const targetPosition =
                target.offsetTop -
                headerHeight;


            window.scrollTo({

                top:
                    targetPosition,

                behavior:
                    "smooth"

            });

        }
    );

});


/* =========================================================
   BACK TO TOP
   ========================================================= */

const v61BackToTop =
    document.querySelector(
        ".back-to-top"
    );


function v61UpdateBackToTop() {

    if (!v61BackToTop) return;


    if (window.scrollY > 450) {

        v61BackToTop.classList.add(
            "show"
        );

    } else {

        v61BackToTop.classList.remove(
            "show"
        );

    }

}


window.addEventListener(
    "scroll",
    v61UpdateBackToTop,
    { passive: true }
);


if (v61BackToTop) {

    v61BackToTop.addEventListener(
        "click",
        event => {

            event.preventDefault();


            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        }
    );

}


v61UpdateBackToTop();


/* =========================================================
   ESC KEY — CLOSE MOBILE MENU
   ========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape" &&
            v61Navbar
        ) {

            v61Navbar.classList.remove(
                "active"
            );


            if (v61MenuIconElement) {

                v61MenuIconElement.classList.remove(
                    "fa-xmark"
                );

                v61MenuIconElement.classList.add(
                    "fa-bars"
                );

            }

        }

    }
);


/* =========================================================
   RESIZE FIX
   ========================================================= */

window.addEventListener(
    "resize",
    () => {

        if (
            window.innerWidth > 900 &&
            v61Navbar
        ) {

            v61Navbar.classList.remove(
                "active"
            );


            if (v61MenuIconElement) {

                v61MenuIconElement.classList.remove(
                    "fa-xmark"
                );

                v61MenuIconElement.classList.add(
                    "fa-bars"
                );

            }

        }

    }
);


/* =========================================================
   V6.1 JS PART 1 END
   ========================================================= */
/* =========================================================
   BABLU KUMAR PORTFOLIO V6.1
   JAVASCRIPT PART 2
   ADVANCED REVEAL + CARD ANIMATION
   ========================================================= */


/* =========================================================
   REVEAL ELEMENTS
   ========================================================= */

const v61RevealElements =
    document.querySelectorAll(
        ".section-heading, " +
        ".about-image, " +
        ".about-content, " +
        ".skill-card, " +
        ".project-card, " +
        ".education-item, " +
        ".certificate-card, " +
        ".contact-card, " +
        ".contact-form-container, " +
        ".faq-item"
    );


/* =========================================================
   REVEAL STYLE
   ========================================================= */

const v61RevealStyle =
    document.createElement("style");


v61RevealStyle.textContent = `

    .v61-reveal {

        opacity: 0;

        transform:
            translateY(35px);

        transition:
            opacity 0.75s ease,
            transform 0.75s
            cubic-bezier(
                0.22,
                1,
                0.36,
                1
            );

    }


    .v61-reveal.v61-visible {

        opacity: 1;

        transform:
            translateY(0);

    }

`;


document.head.appendChild(
    v61RevealStyle
);


/* =========================================================
   ADD REVEAL CLASS
   ========================================================= */

v61RevealElements.forEach(
    element => {

        element.classList.add(
            "v61-reveal"
        );

    }
);


/* =========================================================
   INTERSECTION OBSERVER
   ========================================================= */

const v61RevealObserver =
    new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(
                entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "v61-visible"
                        );


                        observer.unobserve(
                            entry.target
                        );

                    }

                }
            );

        },
        {
            threshold: 0.12,

            rootMargin:
                "0px 0px -40px 0px"
        }
    );


v61RevealElements.forEach(
    element => {

        v61RevealObserver.observe(
            element
        );

    }
);


/* =========================================================
   STAGGERED CARD ANIMATION
   ========================================================= */

const v61CardGroups = [

    ".skills-container .skill-card",

    ".projects-container .project-card",

    ".certificates-container .certificate-card",

    ".faq-container .faq-item"

];


v61CardGroups.forEach(
    selector => {

        const cards =
            document.querySelectorAll(
                selector
            );


        cards.forEach(
            (card, index) => {

                card.style.transitionDelay =
                    `${index * 0.08}s`;

            }
        );

    }
);


/* =========================================================
   IMAGE LOADING EFFECT
   ========================================================= */

const v61Images =
    document.querySelectorAll(
        "img"
    );


v61Images.forEach(
    image => {

        image.classList.add(
            "v61-image-loading"
        );


        const markLoaded =
            () => {

                image.classList.remove(
                    "v61-image-loading"
                );

                image.classList.add(
                    "v61-image-loaded"
                );

            };


        if (image.complete) {

            markLoaded();

        } else {

            image.addEventListener(
                "load",
                markLoaded,
                {
                    once: true
                }
            );

        }

    }
);


/* =========================================================
   IMAGE STYLE
   ========================================================= */

const v61ImageStyle =
    document.createElement("style");


v61ImageStyle.textContent = `

    .v61-image-loading {

        opacity: 0;

        filter:
            blur(8px);

        transform:
            scale(1.02);

    }


    .v61-image-loaded {

        opacity: 1;

        filter:
            blur(0);

        transform:
            scale(1);

        transition:
            opacity 0.6s ease,
            filter 0.6s ease,
            transform 0.6s ease;

    }

`;


document.head.appendChild(
    v61ImageStyle
);


/* =========================================================
   SKILL ANIMATION
   ========================================================= */

const v61SkillSection =
    document.querySelector(
        "#skills"
    );


const v61SkillBars =
    document.querySelectorAll(
        ".skill-progress"
    );


let v61SkillsAnimated = false;


function v61AnimateSkills() {

    if (
        !v61SkillSection ||
        v61SkillsAnimated
    ) {
        return;
    }


    const position =
        v61SkillSection
            .getBoundingClientRect()
            .top;


    if (
        position <
        window.innerHeight * 0.85
    ) {

        v61SkillBars.forEach(
            bar => {

                const targetWidth =
                    bar.style.width ||
                    getComputedStyle(
                        bar
                    ).width;


                bar.style.width = "0";


                requestAnimationFrame(
                    () => {

                        requestAnimationFrame(
                            () => {

                                bar.style.width =
                                    targetWidth;

                            }
                        );

                    }
                );

            }
        );


        v61SkillsAnimated = true;

    }

}


window.addEventListener(
    "scroll",
    v61AnimateSkills,
    {
        passive: true
    }
);


v61AnimateSkills();


/* =========================================================
   V6.1 JS PART 2 END
   ========================================================= */
/* =========================================================
   BABLU KUMAR PORTFOLIO V6.1
   JAVASCRIPT PART 3 — FINAL
   TYPING + FAQ + FORM + CURSOR
   ========================================================= */


/* =========================================================
   TYPING ANIMATION
   ========================================================= */

const v61TypingElement =
    document.querySelector(".typing-text");


const v61TypingWords = [

    "Web Designer",

    "Front-End Developer",

    "Creative Coder",

    "UI Enthusiast"

];


let v61WordIndex = 0;

let v61CharacterIndex = 0;

let v61Deleting = false;


function v61TypingEffect() {

    if (!v61TypingElement) {
        return;
    }


    const currentWord =
        v61TypingWords[
            v61WordIndex
        ];


    if (v61Deleting) {

        v61CharacterIndex--;

    } else {

        v61CharacterIndex++;

    }


    v61TypingElement.textContent =
        currentWord.substring(
            0,
            v61CharacterIndex
        );


    let speed =
        v61Deleting
            ? 55
            : 95;


    if (
        !v61Deleting &&
        v61CharacterIndex ===
            currentWord.length
    ) {

        speed = 1400;

        v61Deleting = true;

    }


    else if (
        v61Deleting &&
        v61CharacterIndex === 0
    ) {

        v61Deleting = false;

        v61WordIndex++;

        if (
            v61WordIndex >=
            v61TypingWords.length
        ) {

            v61WordIndex = 0;

        }

        speed = 350;

    }


    setTimeout(
        v61TypingEffect,
        speed
    );

}


if (v61TypingElement) {

    v61TypingEffect();

}


/* =========================================================
   FAQ ACCORDION
   ========================================================= */

const v61FaqItems =
    document.querySelectorAll(
        ".faq-item"
    );


v61FaqItems.forEach(
    item => {

        const question =
            item.querySelector(
                ".faq-question"
            );


        const answer =
            item.querySelector(
                ".faq-answer"
            );


        if (
            !question ||
            !answer
        ) {
            return;
        }


        question.setAttribute(
            "role",
            "button"
        );


        question.setAttribute(
            "tabindex",
            "0"
        );


        function toggleFaq() {

            const isOpen =
                item.classList.contains(
                    "active"
                );


            /* Close all FAQ items */

            v61FaqItems.forEach(
                otherItem => {

                    otherItem.classList.remove(
                        "active"
                    );


                    const otherAnswer =
                        otherItem.querySelector(
                            ".faq-answer"
                        );


                    if (otherAnswer) {

                        otherAnswer.style.maxHeight =
                            null;

                    }

                }
            );


            /* Open selected item */

            if (!isOpen) {

                item.classList.add(
                    "active"
                );


                answer.style.maxHeight =
                    answer.scrollHeight +
                    "px";

            }

        }


        question.addEventListener(
            "click",
            toggleFaq
        );


        question.addEventListener(
            "keydown",
            event => {

                if (
                    event.key === "Enter" ||
                    event.key === " "
                ) {

                    event.preventDefault();

                    toggleFaq();

                }

            }
        );

    }
);


/* =========================================================
   CONTACT FORM
   ========================================================= */

const v61ContactForm =
    document.querySelector(
        "#contact-form"
    );


function v61ShowFormMessage(
    text,
    type
) {

    if (!v61ContactForm) {
        return;
    }


    let message =
        v61ContactForm.querySelector(
            ".v61-form-message"
        );


    if (!message) {

        message =
            document.createElement(
                "div"
            );

        message.className =
            "v61-form-message";

        v61ContactForm.appendChild(
            message
        );

    }


    message.textContent =
        text;


    message.className =
        `v61-form-message ${type}`;


    setTimeout(
        () => {

            message.classList.remove(
                type
            );

        },
        5000
    );

}


if (v61ContactForm) {

    v61ContactForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const name =
                v61ContactForm.querySelector(
                    "#name"
                );


            const email =
                v61ContactForm.querySelector(
                    "#email"
                );


            const subject =
                v61ContactForm.querySelector(
                    "#subject"
                );


            const message =
                v61ContactForm.querySelector(
                    "#message"
                );


            if (
                !name ||
                !email ||
                !subject ||
                !message
            ) {

                return;

            }


            const values = [

                name.value.trim(),

                email.value.trim(),

                subject.value.trim(),

                message.value.trim()

            ];


            if (
                values.some(
                    value => !value
                )
            ) {

                v61ShowFormMessage(
                    "Please fill in all fields.",
                    "error"
                );

                return;

            }


            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


            if (
                !emailPattern.test(
                    email.value.trim()
                )
            ) {

                v61ShowFormMessage(
                    "Please enter a valid email address.",
                    "error"
                );

                email.focus();

                return;

            }


            v61ShowFormMessage(
                "Message validated successfully! Connect an email service to receive it.",
                "success"
            );


            v61ContactForm.reset();

        }
    );

}


/* =========================================================
   FORM MESSAGE STYLE
   ========================================================= */

const v61FormStyle =
    document.createElement(
        "style"
    );


v61FormStyle.textContent = `

    .v61-form-message {

        margin-top: 14px;

        padding: 12px 15px;

        border-radius: 10px;

        font-size: 12px;

        text-align: center;

        animation:
            v61MessageIn
            0.35s ease;

    }


    .v61-form-message.success {

        color: #7dd3fc;

        background:
            rgba(22, 131, 255, 0.08);

        border:
            1px solid
            rgba(85, 183, 255, 0.20);

    }


    .v61-form-message.error {

        color: #ffaaaa;

        background:
            rgba(255, 70, 70, 0.07);

        border:
            1px solid
            rgba(255, 70, 70, 0.15);

    }


    @keyframes v61MessageIn {

        from {

            opacity: 0;

            transform:
                translateY(8px);

        }

        to {

            opacity: 1;

            transform:
                translateY(0);

        }

    }

`;


document.head.appendChild(
    v61FormStyle
);


/* =========================================================
   CURRENT YEAR
   ========================================================= */

const v61Year =
    document.querySelector(
        "#current-year"
    );


if (v61Year) {

    v61Year.textContent =
        new Date().getFullYear();

}


/* =========================================================
   CUSTOM CURSOR
   ========================================================= */

const v61Cursor =
    document.querySelector(
        ".cursor"
    );


const v61CursorDot =
    document.querySelector(
        ".cursor-dot"
    );


if (
    v61Cursor &&
    v61CursorDot &&
    window.matchMedia(
        "(pointer: fine)"
    ).matches
) {

    document.addEventListener(
        "mousemove",
        event => {

            v61Cursor.style.left =
                event.clientX + "px";

            v61Cursor.style.top =
                event.clientY + "px";


            v61CursorDot.style.left =
                event.clientX + "px";

            v61CursorDot.style.top =
                event.clientY + "px";

        }
    );


    const v61InteractiveElements =
        document.querySelectorAll(
            "a, button, input, textarea, " +
            ".project-card, .skill-card, " +
            ".certificate-card"
        );


    v61InteractiveElements.forEach(
        element => {

            element.addEventListener(
                "mouseenter",
                () => {

                    document.body.classList.add(
                        "cursor-hover"
                    );

                }
            );


            element.addEventListener(
                "mouseleave",
                () => {

                    document.body.classList.remove(
                        "cursor-hover"
                    );

                }
            );

        }
    );

}


/* =========================================================
   PORTFOLIO STATUS
   ========================================================= */

console.log(
    "Bablu Kumar Portfolio V6.1 — Fully Loaded 🚀"
);


/* =========================================================
   V6.1 JAVASCRIPT PART 3 END
   ========================================================= */
