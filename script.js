// Mark that JavaScript is running (enables the scroll animations)
document.documentElement.classList.add("js");

// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Mobile menu
const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.getElementById("nav-links");
menuBtn.addEventListener("click", () => {
  const open = menuBtn.getAttribute("aria-expanded") === "true";
  menuBtn.setAttribute("aria-expanded", String(!open));
  navLinks.classList.toggle("is-open", !open);
});
navLinks.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => {
    menuBtn.setAttribute("aria-expanded", "false");
    navLinks.classList.remove("is-open");
  })
);

// Image fallback: if an image file is missing, show a label instead of a broken image
document.querySelectorAll("img[data-fallback]").forEach((img) => {
  const swap = () => {
    const box = document.createElement("div");
    box.className = "img-fallback";
    box.textContent = img.dataset.fallback;
    img.replaceWith(box);
  };
  if (img.complete && img.naturalWidth === 0) swap();
  else img.addEventListener("error", swap);
});

// Project filters
const filters = document.querySelectorAll(".filter");
const projects = document.querySelectorAll(".project");
filters.forEach((btn) =>
  btn.addEventListener("click", () => {
    filters.forEach((b) => { b.classList.remove("is-active"); b.setAttribute("aria-pressed", "false"); });
    btn.classList.add("is-active");
    btn.setAttribute("aria-pressed", "true");
    const cat = btn.dataset.filter;
    projects.forEach((p) => p.classList.toggle("is-hidden", cat !== "all" && p.dataset.cat !== cat));
  })
);

// Scroll reveal
if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add("is-visible"); io.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
} else {
  document.querySelectorAll(".reveal").forEach((el) => el.classList.add("is-visible"));
}

// Highlight the nav link for the section on screen
const sections = document.querySelectorAll("main section[id]");
const linkFor = (id) => navLinks.querySelector(`a[href="#${id}"]`);
const navIO = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    const link = linkFor(e.target.id);
    if (link && e.isIntersecting) {
      navLinks.querySelectorAll("a").forEach((a) => a.classList.remove("is-current"));
      link.classList.add("is-current");
    }
  });
}, { rootMargin: "-45% 0px -50% 0px" });
sections.forEach((s) => navIO.observe(s));
