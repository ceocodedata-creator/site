// codedata5 — landing page interactions

// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Mobile menu
const toggle = document.getElementById("navToggle");
const links = document.getElementById("navLinks");

toggle.addEventListener("click", () => {
  const open = links.classList.toggle("open");
  toggle.setAttribute("aria-expanded", open);
  toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
});

links.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => {
    links.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  })
);

// Reveal sections on scroll
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);
document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

// Hero parallax: shapes drift with the mouse
const art = document.getElementById("heroArt");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (art && !reduceMotion && window.matchMedia("(pointer: fine)").matches) {
  const layers = art.querySelectorAll("[data-depth]");

  window.addEventListener("mousemove", (e) => {
    const x = e.clientX / window.innerWidth - 0.5;
    const y = e.clientY / window.innerHeight - 0.5;
    layers.forEach((el) => {
      const d = parseFloat(el.dataset.depth) * 30;
      // use the `translate` property so it doesn't fight CSS rotate animations
      el.style.translate = `${x * d}px ${y * d}px`;
    });
  });
}
