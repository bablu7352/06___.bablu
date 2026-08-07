// Smooth scrolling for navigation
document.querySelectorAll("nav a").forEach(link => {
    link.addEventListener("click", function(e) {
        e.preventDefault();
    });
});

// Simple button animation
const btn = document.querySelector("button");

btn.addEventListener("mouseover", () => {
    btn.style.transform = "scale(1.05)";
});

btn.addEventListener("mouseout", () => {
    btn.style.transform = "scale(1)";
});
