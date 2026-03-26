const { useEffect } = require("react");

// NAVBAR TOGGLE
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// CLOSE MENU ON LINK CLICK
document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
  });
});

// FADE-IN ON SCROLL
const faders = document.querySelectorAll(".fade-in, .slide-up");

const appearOptions = { threshold: 0.2, rootMargin: "0px 0px -50px 0px" };

const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
  entries.forEach(entry => {
    if(!entry.isIntersecting) return;
    entry.classList.add("appear");
    appearOnScroll.unobserve(entry);
  });
}, appearOptions);

faders.forEach(fader => {
  appearOnScroll.observe(fader);
});


